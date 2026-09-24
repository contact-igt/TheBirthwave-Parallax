import { newbornCovers } from "@/content/newborn-pediatric-care-landing-content";
import { NewbornImage } from "./newborn-pediatric-care-image";
import { NewbornReveal } from "./newborn-pediatric-care-reveal";

/**
 * Section 3 — What the Consultation May Cover. Carries the `what-we-cover`
 * id the hero's own secondary link targets. Image beside a stacked
 * four-step numbered list, matching `lactation-covers.tsx`/
 * `postpartum-care-covers.tsx`'s own numbered-steps composition. Step 04
 * explicitly leaves the next step to the paediatrician's own explanation —
 * never an automatic assessment.
 */
export function NewbornCovers() {
  return (
    <section id="what-we-cover" aria-labelledby="newborn-covers-heading" className="relative isolate scroll-mt-[var(--header-height)] bg-paper section-pad">
      <NewbornReveal className="container-birthwave">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <NewbornImage imageKey="consultation" corner="bl" aspect="aspect-[4/3]" />

          <div className="max-w-xl">
            <p className="eyebrow">{newbornCovers.eyebrow}</p>
            <h2 id="newborn-covers-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
              {newbornCovers.heading}
            </h2>

            <div className="mt-8 flex flex-col">
              {newbornCovers.steps.map((step) => (
                <div key={step.number} className="flex gap-4 border-t border-[var(--color-border)] py-6 first:border-t-0 first:pt-2">
                  <span className="mt-0.5 font-body text-sm text-terracotta-deep">{step.number}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                    <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 border-l-2 border-terracotta pl-4 text-sm text-ink-soft">{newbornCovers.note}</p>
          </div>
        </div>
      </NewbornReveal>
    </section>
  );
}
