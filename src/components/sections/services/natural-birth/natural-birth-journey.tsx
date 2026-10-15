import { naturalBirthJourney } from "@/content/pages/natural-birth";
import { NaturalBirthReveal } from "./natural-birth-reveal";
import { Button } from "@/components/ui/button";

/** Section 7 — Start With A Conversation. Three steps side by side in a row,
 * with the CTA below. */
export function NaturalBirthJourney() {
  return (
    <section
      id="natural-birth-journey"
      aria-labelledby="natural-birth-journey-heading"
      className="relative isolate overflow-hidden bg-paper bg-[url('/images/natural-birth/natural-birth-approach-background-v1.png')] bg-cover bg-[position:80%_center] lg:bg-center section-pad"
    >
      <NaturalBirthReveal className="container-birthwave relative z-10">
        <p className="eyebrow">{naturalBirthJourney.eyebrow}</p>
        <h2
          id="natural-birth-journey-heading"
          className="mt-4 max-w-xl text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink"
        >
          {naturalBirthJourney.heading}
        </h2>
        <p className="mt-4 max-w-[56ch] text-base leading-[var(--leading-relaxed)] text-ink-soft">{naturalBirthJourney.intro}</p>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {naturalBirthJourney.steps.map((step) => (
            <div key={step.number} className="border-t border-[var(--color-border)] pt-5">
              <span className="font-body text-xs font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
                {step.number} — {step.title}
              </span>
              <p className="mt-3 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Button href={naturalBirthJourney.cta.href} variant="primary">
            {naturalBirthJourney.cta.label.replace(/\s*↗$/, "")}
          </Button>
        </div>
      </NaturalBirthReveal>
    </section>
  );
}
