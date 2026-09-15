"use client";

import { connectedCare } from "@/content/services-content";
import { ServicesEditorialImage } from "./services-editorial-image";
import { useScrollReveal } from "@/motion/scroll-scenes";
import { cx } from "@/lib/cx";

/**
 * Section 05 — Connected Care / Why BirthWave (existing-page refinement).
 * "One meaningful image and stable, readable text... one-shot entrance
 * only" — an earlier version of this section carried two continuously
 * `useParallax`-drifting image layers, which the current brief rules out
 * directly ("do not add continuous parallax elsewhere during this
 * phase"). Replaced with a single image and the same one-shot
 * reveal-on-scroll `find-the-right-care.tsx` already uses
 * (`useScrollReveal`) — small movement, once, then the content stays
 * visible scrolling back up (that hook's own established behaviour, not
 * new here).
 */
export function ConnectedCare() {
  const { ref, revealed } = useScrollReveal<HTMLDivElement>();

  return (
    <section aria-labelledby="connected-care-heading" className="relative isolate overflow-hidden bg-paper section-pad">
      <div
        ref={ref}
        className={cx(
          "container-birthwave grid gap-14 transition-[transform,opacity] duration-[var(--duration-slow)] ease-[var(--ease-signature)] motion-reduce:translate-y-0 motion-reduce:opacity-100 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20",
          revealed ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        )}
      >
        <ServicesEditorialImage
          imageKey="connected-care"
          corner="tr"
          aspect="aspect-[4/5]"
          className="w-full max-w-md lg:max-w-none"
        />

        <div className="max-w-lg">
          <p className="eyebrow">{connectedCare.eyebrow}</p>
          <h2
            id="connected-care-heading"
            className="mt-4 text-[clamp(2.1rem,1.6rem+2.2vw,3rem)] leading-[1.08] font-semibold tracking-[var(--tracking-tight)] text-ink"
          >
            {connectedCare.heading}
          </h2>
          <p className="mt-5 max-w-[44ch] text-lg leading-[var(--leading-relaxed)] text-ink-soft">{connectedCare.body}</p>
        </div>
      </div>
    </section>
  );
}
