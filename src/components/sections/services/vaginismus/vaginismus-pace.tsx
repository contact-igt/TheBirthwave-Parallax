import { vaginismusPace } from "@/content/vaginismus-landing-content";
import { VaginismusImage } from "./vaginismus-image";
import { VaginismusReveal } from "./vaginismus-reveal";

/**
 * Section 4 — Care At Your Pace. Three short editorial points beside a
 * calm image, matching `fertility-preconception-preparing.tsx`'s own
 * points-plus-image composition. No `drift`/parallax and no pinned or
 * scrubbed motion — per the brief's own "no scrub or pinned animation"
 * instruction for this section specifically.
 */
export function VaginismusPace() {
  return (
    <section id="vaginismus-pace" aria-labelledby="vaginismus-pace-heading" className="relative isolate bg-[var(--vaginismus-sky-wash)] section-pad">
      <VaginismusReveal className="container-birthwave grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <div className="max-w-xl">
          <p className="eyebrow">{vaginismusPace.eyebrow}</p>
          <h2 id="vaginismus-pace-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {vaginismusPace.heading}
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg leading-[var(--leading-relaxed)] text-ink-soft">{vaginismusPace.body}</p>

          <div className="mt-8 flex flex-col">
            {vaginismusPace.points.map((point) => (
              <div key={point.title} className="border-t border-[var(--color-border)] py-5">
                <h3 className="font-body text-sm font-semibold tracking-[var(--tracking-wider)] text-ink">{point.title}</h3>
                <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{point.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-2xl border-l-2 border-terracotta pl-4 text-sm text-ink-soft">{vaginismusPace.note}</p>
        </div>

        <VaginismusImage imageKey="care-at-your-pace" corner="br" aspect="aspect-[4/4.5] sm:aspect-[5/4] lg:aspect-[4/4.5]" />
      </VaginismusReveal>
    </section>
  );
}
