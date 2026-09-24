import { naturalBirthSupport } from "@/content/natural-birth-landing-content";
import { NaturalBirthImage } from "./natural-birth-image";
import { NaturalBirthReveal } from "./natural-birth-reveal";

/**
 * Section 04 — Supporting the Birth You Hope For. Deliberately distinct
 * from `birth-preparation-landing-content.ts`'s own education/readiness
 * framing (see this section's content file comment) — three numbered
 * steps opposite a preparation-moment image, not a childbirth-education
 * curriculum.
 */
export function NaturalBirthSupport() {
  return (
    <section id="natural-birth-support" aria-labelledby="natural-birth-support-heading" className="relative isolate bg-[var(--color-paper-dim)] section-pad">
      <NaturalBirthReveal className="container-birthwave grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
        <NaturalBirthImage imageKey="preparation" corner="tl" aspect="aspect-[4/5] sm:aspect-[4/4.9]" />

        <div className="max-w-xl">
          <p className="eyebrow">{naturalBirthSupport.eyebrow}</p>
          <h2
            id="natural-birth-support-heading"
            className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink"
          >
            {naturalBirthSupport.heading}
          </h2>
          <p className="mt-4 max-w-[52ch] text-base leading-[var(--leading-relaxed)] text-ink-soft">{naturalBirthSupport.body}</p>

          <div className="mt-8 flex flex-col">
            {naturalBirthSupport.steps.map((step) => (
              <div key={step.number} className="border-t border-[var(--color-border)] py-5">
                <span className="font-body text-xs font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
                  {step.number} — {step.title}
                </span>
                <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </NaturalBirthReveal>
    </section>
  );
}
