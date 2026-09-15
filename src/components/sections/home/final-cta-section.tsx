"use client";

import Image from "next/image";
import { finalCta } from "@/content/site-content";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import { useParallax } from "@/motion/image-motion";
import { useScrollReveal } from "@/motion/scroll-scenes";
import { emergenceBand, finalCtaEmergence } from "@/motion/section-transitions";
import { cx } from "@/lib/cx";

/**
 * The closing invitation — approved copy (see site-content.ts), given
 * verbatim for this rework. Large statement, supporting line, one primary
 * and one secondary action, no boxed card. The dark (ink) surface is the
 * one tonal break in the page, reserved for this and the footer, so the
 * ending reads as one composed moment rather than another light section.
 *
 * It doesn't cut in as a hard rectangle: a wide paper-tinted band fades
 * across the top of the ink fill (`--space-fade-final`, wider than the
 * `--space-fade-strong` other transitions use) so the warm-to-dark-brown
 * shift reads as a held approach, not a snap — the fourth of the site's
 * four named parallax moments, alongside the resolving BirthWave line
 * above the headline, which drifts at its own slight rate via the same
 * `useParallax` hook the hero's own background uses.
 *
 * Background photograph (docs/implementation-brief.md §32): a full-bleed
 * atmospheric wash behind everything above — the brief is explicit this
 * section "must remain primarily typographic," so it stays low opacity
 * with a dark overlay on top, "only hints of imagery," never a visible
 * photograph competing with the close. Its own drift reuses the same
 * `useParallax` hook (a small factor, ~4% of scroll delta) rather than a
 * new ScrollTrigger scene — "no major new parallax chapter," per the
 * brief.
 */
export function FinalCtaSection() {
  const pathRef = useParallax<HTMLDivElement>({ factor: 0.08, maxOffsetPx: 18 });
  const bgImageRef = useParallax<HTMLDivElement>({ factor: 0.04, maxOffsetPx: 14 });
  // "Brief entrance, then remain visible" (homepage motion-coherence
  // pass): the text column previously had no motion of its own at all —
  // always at full opacity from first paint, unlike every other section's
  // own settle-on-entry moment. One-shot only (`useScrollReveal`, the
  // same IntersectionObserver hook Care's own companion visual already
  // uses), not scroll-linked: it fires once, stays revealed, and never
  // re-hides on reverse scroll — a closing section should not disappear
  // again on the way back up.
  const { ref: textRevealRef, revealed } = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="connect"
      aria-labelledby="final-cta-heading"
      // overflow-hidden added alongside the new background image
      // (docs/implementation-brief.md §32): its own `scale-110` (the same
      // overscan technique Hero's own background already uses) bled
      // 5vw past each edge without it — confirmed as the exact cause of
      // a measured 72px horizontal overflow at 1440px, not guessed.
      className="relative isolate overflow-hidden bg-ink py-(--space-section)"
    >
      <div
        ref={bgImageRef}
        aria-hidden="true"
        style={{ transform: "translate3d(0, var(--parallax-y, 0px), 0)" }}
        className="absolute inset-0 -z-10 scale-110 opacity-[0.34]"
      >
        <Image
          src={finalCta.media.src}
          alt={finalCta.media.alt}
          fill
          sizes="100vw"
          className="object-cover object-[35%_45%]"
        />
      </div>
      {/* Dark overlay — keeps the wash reading as "hints of imagery," not
          a visible photograph, and guarantees the headline/CTA hold full
          contrast regardless of what's underneath. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/60" />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-(--space-fade-final)"
        style={{ backgroundImage: emergenceBand.fromPaper(finalCtaEmergence.top) }}
      />

      <div className="container-birthwave relative z-10">
        <div
          ref={pathRef}
          aria-hidden="true"
          className="w-40 text-coral/70 sm:w-52"
          style={{ transform: "translate3d(0, var(--parallax-y, 0px), 0)" }}
        >
          {/* The BirthWave line, resolved: it opens with the same gentle
              undulation Journey's path carries throughout, then flattens
              into a calm, settled line by its end — drawn once, static,
              not another scroll-scrubbed draw. This is where the line the
              Journey section traced finishes. */}
          <svg viewBox="0 0 240 40" fill="none" focusable="false">
            <path
              d="M4 22 C 38 4, 66 38, 98 20 S 158 8, 196 20 L 236 20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div
          ref={textRevealRef}
          className={cx(
            "mt-8 max-w-3xl transition-[transform,opacity] duration-[var(--duration-slow)] ease-[var(--ease-signature)] motion-reduce:translate-y-0 motion-reduce:opacity-100 sm:mt-10",
            revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
          )}
        >
          {/* Mobile rework (docs/implementation-brief.md §38): the base
              clamp used to bottom out at 2rem (32px), under the requested
              ~2.4–3.4rem mobile target — `sm:`+ is untouched (a separate
              override below restores the exact original formula there,
              so nothing changes at real desktop widths). */}
          <p
            id="final-cta-heading"
            className="text-[clamp(2.4rem,2rem+2.6vw,3.2rem)] leading-[1.08] font-semibold text-paper sm:text-[clamp(2rem,1.3rem+2.8vw,4rem)]"
          >
            {finalCta.statementLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>

          <p className="mt-6 max-w-xl text-lg leading-[var(--leading-relaxed)] text-paper/75">
            {finalCta.supporting}
          </p>

          {/* §38: stacked, full-width primary CTA below `sm` — the
              previous single-row `flex-wrap` let the primary button and
              the secondary text link sit side by side at any width,
              which on a narrow phone crowded two touch targets into one
              cramped row rather than "strong stacked controls." `sm:`+
              (640px+) returns to the original single row exactly. */}
          <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-10 sm:gap-y-5">
            <Button href={finalCta.primaryCta.href} variant="primary" className="w-full justify-center sm:w-auto">
              {finalCta.primaryCta.label}
            </Button>
            <CtaLink href={finalCta.secondaryCta.href} tone="inverted" className="text-lg">
              {finalCta.secondaryCta.label}
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}
