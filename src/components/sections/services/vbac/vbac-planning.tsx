import { vbacPlanning } from "@/content/vbac-landing-content";
import { VbacImage } from "./vbac-image";
import { VbacReveal } from "./vbac-reveal";

/**
 * Section 5 — Planning With Flexibility. A quiet wash background with a
 * warm planning image opposite a compact list — matching the same
 * text-plus-image-with-list composition `normal-birth-delivery-preferences.tsx`
 * already establishes for a comparable need. Explicitly not presented as a
 * guaranteed birth-plan outcome.
 */
export function VbacPlanning() {
  return (
    <section id="vbac-planning" aria-labelledby="vbac-planning-heading" className="relative isolate bg-[var(--vbac-sky-wash)] section-pad">
      <VbacReveal className="container-birthwave grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <div className="max-w-xl">
          <p className="eyebrow">{vbacPlanning.eyebrow}</p>
          <h2 id="vbac-planning-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {vbacPlanning.heading}
          </h2>

          {vbacPlanning.body.map((paragraph) => (
            <p key={paragraph} className="mt-4 max-w-[52ch] text-base leading-[var(--leading-relaxed)] text-ink-soft">
              {paragraph}
            </p>
          ))}

          <div className="mt-8 flex flex-col">
            {vbacPlanning.items.map((item) => (
              <p key={item} className="border-t border-[var(--color-border)] py-3 font-body text-sm font-medium text-ink first:pt-0">
                {item}
              </p>
            ))}
          </div>
        </div>

        <VbacImage imageKey="planning" corner="br" aspect="aspect-[4/4.5] sm:aspect-[5/4] lg:aspect-[4/4.5]" />
      </VbacReveal>
    </section>
  );
}
