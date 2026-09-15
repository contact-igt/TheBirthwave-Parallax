"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./reduced-motion";

/**
 * Scroll-triggered reveal "scenes" — when a settle/wipe effect fires, not
 * what it looks like (see image-motion.ts for the wipe geometry, and each
 * section's own className for the settle's transform/opacity). A scene is
 * just an IntersectionObserver config plus a stagger interval; sections
 * import a named scene instead of writing threshold/rootMargin/stagger
 * numbers inline.
 */

interface ScrollRevealOptions {
  /** 0–1, how much of the element must be visible before it reveals. */
  threshold?: number;
  /** Bias the trigger point — negative pulls it earlier (before full entry). */
  rootMargin?: string;
}

/**
 * Fires once when an element scrolls into view, for the small, targeted
 * "settle into place" moments used across the page (never a repeated
 * fade-up applied uniformly everywhere — each section using this picks
 * its own offset/property to animate).
 *
 * Under prefers-reduced-motion, `revealed` is `true` from the very first
 * render — no observer is ever attached, so there's no hidden initial
 * state and therefore no flash of invisible content while JS hydrates.
 */
export function useScrollReveal<T extends HTMLElement>({
  threshold = 0.2,
  rootMargin = "0px 0px -10% 0px",
}: ScrollRevealOptions = {}) {
  const ref = useRef<T | null>(null);
  const reducedMotion = useReducedMotion();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // Under reduced motion the hook always reports `revealed: true` (see
    // the return statement below) without ever touching this state, so
    // there's no hidden→visible flash while waiting for an effect to run.
    if (reducedMotion) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, [reducedMotion, threshold, rootMargin]);

  return { ref, revealed: reducedMotion ? true : revealed };
}

/**
 * Tracks whether an element currently sits in a narrow band near the
 * viewport's vertical center — unlike `useScrollReveal`, this toggles
 * both ways as the visitor scrolls up or down, for a "currently in
 * focus" state rather than a one-time reveal. Used by Care's three
 * principles (see care-section.tsx): each becomes visually dominant
 * while centered, quiet otherwise, independent of scroll direction.
 *
 * Deliberately not a GSAP scene: Care's dominant/quiet toggle isn't one
 * of the site's four named parallax moments (hero, philosophy, journey,
 * final CTA) — a plain IntersectionObserver is the right amount of
 * mechanism for it, consistent with the rest of this file.
 *
 * Under prefers-reduced-motion, always reports `focused: true` — every
 * principle stays in its fully "dominant" state rather than dimmed,
 * since there's no scroll-driven toggle to dim it back in.
 */
export function useScrollFocus<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const reducedMotion = useReducedMotion();
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFocused(entry.isIntersecting),
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, [reducedMotion]);

  return { ref, focused: reducedMotion ? true : focused };
}
