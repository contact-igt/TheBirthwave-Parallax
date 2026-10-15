import { naturalBirthSupport } from "@/content/pages/natural-birth";
import { NaturalBirthImage } from "./natural-birth-image";
import { NaturalBirthReveal } from "./natural-birth-reveal";
import { Button } from "@/components/ui/button";

/**
 * Section 04 — Preparing During Pregnancy.
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
          {naturalBirthSupport.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 max-w-[52ch] text-base leading-[var(--leading-relaxed)] text-ink-soft">
              {paragraph}
            </p>
          ))}

          <div className="mt-8 flex flex-col">
            {naturalBirthSupport.steps.map((step) => (
              <div key={step.number} className="border-t border-[var(--color-border)] py-4 first:border-t-0">
                <span className="font-body text-xs font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
                  {step.number} — {step.title}
                </span>
                <p className="mt-1.5 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{step.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Button href={naturalBirthSupport.cta.href} variant="primary">
              {naturalBirthSupport.cta.label.replace(/\s*↗$/, "")}
            </Button>
          </div>
        </div>
      </NaturalBirthReveal>
    </section>
  );
}
