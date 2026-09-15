"use client";

import { useEffect, useRef } from "react";
import { care } from "@/content/site-content";
import { useScrollFocus, useScrollReveal } from "@/motion/scroll-scenes";
import { useReducedMotion } from "@/motion/reduced-motion";
import { useParallax } from "@/motion/image-motion";
import { cx } from "@/lib/cx";

/**
 * "What guides how we care for you" — a two-zone editorial layout
 * (docs/implementation-brief.md §34): LEFT holds the sticky headline
 * with one persistent companion visual directly beneath it; RIGHT holds
 * the three principles in a comfortably wide reading column, each still
 * taking visual focus as it crosses the viewport's centre
 * (`useScrollFocus`, unchanged). No cards anywhere — hairline rules
 * only, and the visual itself carries a minimal, uniform radius (not the
 * site's deep-corner "panel" signature used elsewhere), no border,
 * shadow or card chrome.
 *
 * §37: the LEFT column's visual is now a single approved video
 * (`/brand/care.mp4`, found during that pass — not the three per-
 * principle .jpg photos §32 had cycled through as the visitor scrolled).
 * One stable companion for the whole section — it does not change as
 * principles come into focus, and there's no longer a second, mobile-
 * only per-principle image (each principle used to carry its own inline
 * photo below `lg`; the section now shows the one video once, in the
 * same position, at every width). That removed a real amount of state
 * and markup this file no longer needs: `activeIndex`, the `onFocus`
 * wiring between `CareSection` and `PrincipleBlock`, the three-photo
 * stacked/crossfaded `CareVisual`, and the CSS-only reduced-motion
 * fallback that used to swap between the sticky pane and each
 * principle's own inline image (`.care-sticky-visual`/
 * `.care-inline-visual`, formerly in globals.css — deleted, since there's
 * nothing left to swap between).
 *
 * The testimonial that used to close this section (a placeholder quote,
 * explicitly not a real one) has been removed rather than carried
 * forward — see the note on `care` in site-content.ts.
 */
export function CareSection() {
  return (
    <section id="care-trust" aria-labelledby="care-heading" className="section-pad relative isolate">
      <div className="container-birthwave grid gap-12 lg:grid-cols-[4fr_8fr] lg:gap-10 xl:gap-14">
        <div className="lg:sticky lg:top-[calc(var(--header-height)+3.5rem)] lg:self-start">
          {/* Mobile rework (docs/implementation-brief.md §38): the base
              clamp used to bottom out at 2.25rem (36px), under the
              requested ~2.6–3.8rem mobile heading target — `lg:`+
              restores the exact original formula, so desktop (this
              section has no side-by-side layout below `lg` anyway) is
              unaffected. */}
          <h2
            id="care-heading"
            className="text-[clamp(2.6rem,2.2rem+2.8vw,3.5rem)] leading-[0.98] font-semibold tracking-[var(--tracking-tight)] text-ink lg:text-[clamp(2.25rem,1.5rem+3vw,4.25rem)]"
          >
            {care.headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>

          <CareVisual />
        </div>

        <div className="flex flex-col divide-y divide-[var(--color-border)] border-t border-[var(--color-border)]">
          {care.principles.map((principle) => (
            <PrincipleBlock key={principle.index} principle={principle} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * The single companion visual — sits directly below the heading, inside
 * the same `lg:sticky` column, at every viewport width (docs/
 * implementation-brief.md §37: previously desktop-sticky vs. per-
 * principle-mobile-inline; now one element, one position, always).
 * Sized to roughly 80% of the left column's own width, capped at 22rem
 * (352px) — "a premium editorial companion visual," not a large
 * dominant photo. Same unconditional-`<video>`, imperative-play pattern
 * as Hero's own video and the dark scene's (hero-section.tsx,
 * immersive-section.tsx) — `poster` is a real frame extracted from this
 * exact clip, shown at rest and under reduced motion; `aria-hidden`
 * since a silent, muted, looping companion clip is decorative the same
 * way those two already are. A restrained settle on scroll-entry reuses
 * the existing `useScrollReveal` hook (a one-shot IntersectionObserver,
 * already used elsewhere on the page for exactly this kind of moment,
 * rather than a new one written here) plus the existing `useParallax`
 * hook for a very small drift — never resized, never swapped, never tied
 * to which principle is currently focused.
 */
function CareVisual() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref: revealRef, revealed } = useScrollReveal<HTMLDivElement>();
  const parallaxRef = useParallax<HTMLDivElement>({ factor: 0.05, maxOffsetPx: 10, minViewportWidth: 1024 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (reducedMotion) {
      el.pause();
    } else {
      el.play().catch(() => {});
    }
  }, [reducedMotion]);

  return (
    <div
      ref={parallaxRef}
      style={{ transform: "translate3d(0, var(--parallax-y, 0px), 0)" }}
      className="mt-8 w-[80%] max-w-[22rem] xl:mt-10"
    >
      <div
        ref={revealRef}
        className={cx(
          // `motion-reduce:` (pure CSS, media-query driven) rather than the
          // `revealed`/`reducedMotion` JS values alone: under reduced
          // motion, `useScrollReveal` reports `revealed: true` from the
          // very first client render (no IntersectionObserver ever
          // attaches — see its own doc comment), so there's never a real
          // state *transition* for this element, only a same-value initial
          // read. React's hydration reconciler doesn't diff/patch plain
          // attributes on that first pass, only structural mismatches — so
          // without a CSS fallback the server-rendered `opacity-0
          // translate-y-3` (computed build-time, with no `window`) would
          // stay stuck on screen forever, never corrected, even though the
          // component's actual state is already correct. The media query
          // sidesteps that entirely: it's evaluated by the browser itself,
          // identically on server and client markup, so there's nothing to
          // mismatch.
          "transition-[transform,opacity] duration-[var(--duration-slow)] ease-[var(--ease-signature)] motion-reduce:translate-y-0 motion-reduce:opacity-100",
          revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
        )}
      >
        <div className="relative aspect-[1122/1402] w-full overflow-hidden rounded-sm">
          <video
            ref={videoRef}
            aria-hidden="true"
            muted
            loop
            playsInline
            preload="metadata"
            poster={care.media.posterSrc}
            disablePictureInPicture
            disableRemotePlayback
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={care.media.videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
}

function PrincipleBlock({ principle }: { principle: (typeof care.principles)[number] }) {
  const { ref, focused } = useScrollFocus<HTMLDivElement>();

  return (
    <div ref={ref} className="py-14 sm:py-20">
      <div className="flex gap-6 sm:gap-10">
        <span
          className={cx(
            "font-display shrink-0 text-xl font-semibold transition-colors duration-[var(--duration-base)]",
            focused ? "text-terracotta" : "text-ink-soft/50",
          )}
        >
          {principle.index}
        </span>
        <div>
          {/* Label 12–14px (docs/implementation-brief.md §34 — was
              `text-sm`/15px) — the site's own `--text-xs` token (13px),
              not a bespoke value. */}
          <p
            className={cx(
              "font-body text-xs font-semibold tracking-[var(--tracking-wider)] uppercase transition-colors duration-[var(--duration-base)]",
              focused ? "text-terracotta" : "text-ink-soft/50",
            )}
          >
            {principle.label}
          </p>
          {/* Statement 32–44px, capped at 38ch (docs/implementation-
              brief.md §34 — was `text-2xl sm:text-3xl`, reaching up to
              54px at wide viewports inside a column too narrow for it,
              which was exactly what forced "understanding" / "your
              history" / etc. onto their own giant lines). An explicit
              clamp instead of the token classes, for precise control
              over both ends of the range regardless of breakpoint. */}
          <p
            className={cx(
              // Scale, not font-size: a transform stays off the layout/reflow
              // path the way opacity does, font-size wouldn't.
              "mt-2 max-w-[38ch] origin-left text-balance text-[clamp(2rem,1.5rem+1.5vw,2.75rem)] leading-[1.25] transition-[transform,opacity,color] duration-[var(--duration-slow)] ease-[var(--ease-signature)]",
              focused ? "scale-100 font-medium text-ink" : "scale-95 text-ink-soft",
            )}
          >
            {principle.statement}
          </p>
        </div>
      </div>
    </div>
  );
}
