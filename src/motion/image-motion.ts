"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "./reduced-motion";

/**
 * Image/media motion: scroll-linked transform hooks (parallax drift, the
 * one cinematic scale-in) plus the shared clip-path wipe used for reveal
 * transitions. Section components import a named preset from here rather
 * than writing factors/offsets/scales inline — see docs/implementation-brief.md
 * §11 for why (and what a "settle" vs a "drift" vs a "wipe" is for).
 */

// ---------------------------------------------------------------------
// useParallax — a single translateY drift via `--parallax-y`.
// ---------------------------------------------------------------------

interface ParallaxOptions {
  /** Fraction of scroll delta the element trails by. Small = subtle. */
  factor?: number;
  /** Clamp the resulting offset so the layer never drifts too far. */
  maxOffsetPx?: number;
  /** Disable below this viewport width — mobile gets a static layout. */
  minViewportWidth?: number;
}

/**
 * Attaches a restrained scroll-parallax effect to an element via a CSS
 * custom property (`--parallax-y`), consumed in the component's own
 * transform so this hook never fights React's render cycle.
 *
 * Off entirely when `prefers-reduced-motion: reduce` is set, or below
 * `minViewportWidth` — mobile gets the final static layout, not a
 * cramped version of the desktop motion. Only runs the scroll/rAF loop
 * while the element is actually in the viewport.
 */
export function useParallax<T extends HTMLElement>({
  factor = 0.15,
  maxOffsetPx = 48,
  minViewportWidth = 768,
}: ParallaxOptions = {}) {
  const ref = useRef<T | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (reducedMotion) {
      node.style.setProperty("--parallax-y", "0px");
      return;
    }

    let ticking = false;
    let inView = false;

    const clamp = (value: number, limit: number) =>
      Math.max(-limit, Math.min(limit, value));

    const apply = () => {
      ticking = false;
      if (!inView) return;
      if (window.innerWidth < minViewportWidth) {
        node.style.setProperty("--parallax-y", "0px");
        return;
      }
      const rect = node.getBoundingClientRect();
      const viewportMid = window.innerHeight / 2;
      const elementMid = rect.top + rect.height / 2;
      const distanceFromCenter = elementMid - viewportMid;
      const offset = clamp(-distanceFromCenter * factor, maxOffsetPx);
      node.style.setProperty("--parallax-y", `${offset.toFixed(2)}px`);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) onScroll();
      },
      { rootMargin: "20% 0px 20% 0px" },
    );
    observer.observe(node);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    apply();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [factor, maxOffsetPx, minViewportWidth, reducedMotion]);

  return ref;
}

/** Hero's background layer. Untouched since the hero was signed off — see
 * docs/implementation-brief.md — this preset only relocates the same two
 * numbers that were previously inline in hero-section.tsx. */
export const heroBackgroundParallax: Required<
  Pick<ParallaxOptions, "factor" | "maxOffsetPx">
> = {
  factor: 0.1,
  maxOffsetPx: 32,
};

// ---------------------------------------------------------------------
// useExitDrift — one-directional drift+fade as a section scrolls away,
// originally built for the hero→Philosophy transition (homepage rework,
// §24): distinct from `useParallax` above, which trails a fixed
// viewport-center point symmetrically both ways. This tracks how far a
// section has scrolled *past* the top of the viewport specifically, so
// text can drift up and fade as the visitor leaves it, without the
// to-and-fro `useParallax` gives a centered element.
//
// §40 briefly replaced this with a bespoke per-phase system
// (hero-transition.ts, since deleted) that gave Hero's headline and its
// supporting copy/CTA independently-tuned exit timing, tied to a
// dedicated sticky "exit stage" with its own reserved scroll distance.
// That stage — and the reserved interval it left before Philosophy's own
// wording appeared — was the later-reported problem a further rework
// removed; this hook is back in active use in hero-section.tsx as the
// whole text column's one exit mechanism, exactly the "general-purpose
// utility" role this comment previously left it for.
// ---------------------------------------------------------------------

interface ExitDriftOptions {
  /** Px of upward drift once the section has fully scrolled past. */
  maxDriftPx?: number;
  /** Opacity floor once the section has fully scrolled past — never 0,
   * so departing content dims rather than snapping invisible. */
  minOpacity?: number;
  minViewportWidth?: number;
}

export function useExitDrift<T extends HTMLElement>({
  maxDriftPx = 56,
  minOpacity = 0.25,
  minViewportWidth = 768,
}: ExitDriftOptions = {}) {
  const ref = useRef<T | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const section = node.closest("section");
    if (!section) return;

    if (reducedMotion) {
      node.style.setProperty("--exit-y", "0px");
      node.style.setProperty("--exit-opacity", "1");
      return;
    }

    let ticking = false;
    let inView = false;

    const apply = () => {
      ticking = false;
      if (!inView) return;
      if (window.innerWidth < minViewportWidth) {
        node.style.setProperty("--exit-y", "0px");
        node.style.setProperty("--exit-opacity", "1");
        return;
      }
      const rect = section.getBoundingClientRect();
      // 0 while the section's top is still at/below the viewport top;
      // 1 once it's scrolled a full section-height past it.
      const progress = Math.max(0, Math.min(1, -rect.top / Math.max(rect.height, 1)));
      node.style.setProperty("--exit-y", `${(-maxDriftPx * progress).toFixed(2)}px`);
      node.style.setProperty("--exit-opacity", `${(1 - progress * (1 - minOpacity)).toFixed(3)}`);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    };

    // rootMargin extends downward so the listener stays attached while
    // the section is scrolling *out* the top, not just while it's still
    // fully in view — otherwise the drift would freeze mid-transition
    // the moment the section's own bottom edge left the viewport.
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) onScroll();
      },
      { rootMargin: "0px 0px 100% 0px" },
    );
    observer.observe(section);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    apply();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reducedMotion, maxDriftPx, minOpacity, minViewportWidth]);

  return ref;
}

// ---------------------------------------------------------------------
// useHandoffProgress — ONE shared progress controller for the Hero →
// Philosophy handoff, used from BOTH sides (Hero's own outgoing media,
// Philosophy's incoming group), replacing the previous opacity-only
// `useEnterReveal`. A straight opacity fade on the photo alone (the prior
// version) still left every OTHER layer in the incoming group — the
// readability overlay, the bottom wash — permanently at full strength,
// which is exactly what read as "a straight horizontal seam remains":
// those overlays never faded, so their own rectangular edges were always
// there regardless of the photo's own opacity. This hook instead drives
// a *position* (`--handoff-progress`, `--handoff-y`, and optionally
// `--handoff-mask-y`) that the caller applies to transforms/masks on
// whatever it renders — critically, applied to ONE wrapper around the
// COMPLETE incoming visual group in Philosophy (photo + both overlays
// together), so there is no separately-timed layer left behind to leave
// a seam.
//
// `edge: "top"` (Philosophy's own use): measures how far the ancestor
// `<section>`'s own top — reconstructed via `+ overlapPx` to undo a
// negative-margin overlap, exactly as the previous hook did — has
// scrolled up past the viewport's bottom.
// `edge: "bottom"` (Hero's own use, `overlapPx` not needed): measures
// how far the ancestor `<section>`'s own BOTTOM has scrolled past the
// viewport's bottom — the same physical boundary, measured from Hero's
// own side instead of Philosophy's, so both sides derive an equivalent
// progress value from the one real scroll position without either
// needing a reference to the other's DOM node.
//
// Measures the closest ancestor `<section>`, not the ref'd node itself —
// the ref'd node typically sits inside a separately `useParallax`-
// transformed wrapper, and `getBoundingClientRect()` reports the
// POST-transform painted position; reading the ref'd node's own rect fed
// unrelated parallax offset into this math (confirmed via measurement,
// during this feature's own earlier iteration, as a small residual that
// never fully returned to 0). The section itself carries no transform.
// ---------------------------------------------------------------------

interface HandoffProgressOptions {
  /** Px this element's own box already overlaps the section before it —
   * the exact magnitude of a negative top margin the caller applied.
   * Only meaningful with `edge: "top"`. */
  overlapPx?: number;
  /** Px of scroll distance the handoff spans once triggered. */
  rangePx?: number;
  /** Which edge of the ancestor `<section>` to track. */
  edge?: "top" | "bottom";
  /** Px of upward drift applied at progress 1, exposed as `--handoff-y`
   * for the caller's own transform — 0 to skip. */
  maxTranslatePx?: number;
  /** `--handoff-mask-y` interpolates linearly between these two px
   * values across progress 0→1 — omit both to skip setting it. */
  maskTravelStartPx?: number;
  maskTravelEndPx?: number;
}

export function useHandoffProgress<T extends HTMLElement>({
  overlapPx = 0,
  rangePx = 240,
  edge = "top",
  maxTranslatePx = 0,
  maskTravelStartPx,
  maskTravelEndPx,
}: HandoffProgressOptions = {}) {
  const ref = useRef<T | null>(null);
  const reducedMotion = useReducedMotion();
  const hasMaskTravel = maskTravelStartPx !== undefined && maskTravelEndPx !== undefined;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const section = node.closest("section");
    if (!section) return;

    if (reducedMotion) {
      // Settled end-state, not the mid-transition look, frozen — reduced
      // motion gets the plain, fully-revealed, static layout throughout.
      node.style.setProperty("--handoff-progress", "1");
      node.style.setProperty("--handoff-y", "0px");
      if (hasMaskTravel) node.style.setProperty("--handoff-mask-y", `${maskTravelEndPx}px`);
      return;
    }

    let ticking = false;

    const apply = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const edgeValue = edge === "top" ? rect.top + overlapPx : rect.bottom;
      const progress = Math.max(0, Math.min(1, (window.innerHeight - edgeValue) / rangePx));
      node.style.setProperty("--handoff-progress", progress.toFixed(3));
      node.style.setProperty("--handoff-y", `${(-maxTranslatePx * progress).toFixed(2)}px`);
      if (hasMaskTravel) {
        const y = maskTravelStartPx! + (maskTravelEndPx! - maskTravelStartPx!) * progress;
        node.style.setProperty("--handoff-mask-y", `${y.toFixed(1)}px`);
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    apply();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reducedMotion, overlapPx, rangePx, edge, maxTranslatePx, hasMaskTravel, maskTravelStartPx, maskTravelEndPx]);

  return ref;
}

// `useScrollDrift`/`immersiveBackgroundDrift` — Immersive's original
// hand-rolled zoom-settle — were retired in the interaction-correction
// pass (docs/implementation-brief.md §25) once that section moved onto
// the same pinned-GSAP-timeline system Philosophy and Journey already
// use, for real differential-speed parallax across three planes rather
// than one scroll listener driving a single drift+scale.

// ---------------------------------------------------------------------
// Wipe reveal — a left-to-right clip-path, the site's alternative to an
// opacity crossfade. Used by Pathways' panel switch (image) and Trust's
// commitment list (text) — same geometry, different trigger.
// ---------------------------------------------------------------------

export const wipeReveal = {
  hiddenClip: "inset(0 100% 0 0)",
  revealedClip: "inset(0 0% 0 0)",
} as const;
