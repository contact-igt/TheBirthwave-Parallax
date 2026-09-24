import { fertilityPreparing } from "@/content/fertility-preconception-landing-content";
import { FertilityImage } from "./fertility-preconception-image";
import { FertilityReveal } from "./fertility-preconception-reveal";

/**
 * Section 4 — Preparing Before Pregnancy. Three editorial points beside a
 * substantial image, matching `pregnancy-antenatal-info-sections.tsx`'s own
 * Approach composition and `vbac-planning.tsx`'s text-plus-image-with-list
 * layout. The closing note is explicit that preconception care does not
 * guarantee pregnancy or a conception timeline.
 */
export function FertilityPreparing() {
  return (
    <section id="fertility-preparing" aria-labelledby="fertility-preparing-heading" className="relative isolate bg-[var(--fertility-sky-wash)] section-pad">
      <FertilityReveal className="container-birthwave grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <div className="max-w-xl">
          <p className="eyebrow">{fertilityPreparing.eyebrow}</p>
          <h2 id="fertility-preparing-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {fertilityPreparing.heading}
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg leading-[var(--leading-relaxed)] text-ink-soft">{fertilityPreparing.body}</p>

          <div className="mt-8 flex flex-col">
            {fertilityPreparing.points.map((point) => (
              <div key={point.title} className="border-t border-[var(--color-border)] py-5">
                <h3 className="font-body text-sm font-semibold tracking-[var(--tracking-wider)] text-ink">{point.title}</h3>
                <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{point.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-2xl border-l-2 border-terracotta pl-4 text-sm text-ink-soft">{fertilityPreparing.note}</p>
        </div>

        <FertilityImage imageKey={fertilityPreparing.imageKey} corner="br" aspect="aspect-[4/4.5] sm:aspect-[5/4] lg:aspect-[4/4.5]" />
      </FertilityReveal>
    </section>
  );
}
