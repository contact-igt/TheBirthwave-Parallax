import { naturalBirthJourney } from "@/content/natural-birth-landing-content";
import { NaturalBirthReveal } from "./natural-birth-reveal";
import { Button } from "@/components/ui/button";

/** Section 06 — Your Consultation Journey. Four steps kept in normal
 * document flow, matching `vbac-first-visit.tsx`'s own step-grid layout.
 * No invented records, review processes, fees, session duration or
 * appointment format. */
export function NaturalBirthJourney() {
  return (
    <section id="natural-birth-journey" aria-labelledby="natural-birth-journey-heading" className="relative isolate bg-paper section-pad">
      <NaturalBirthReveal className="container-birthwave">
        <p className="eyebrow">{naturalBirthJourney.eyebrow}</p>
        <h2
          id="natural-birth-journey-heading"
          className="mt-4 max-w-xl text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink"
        >
          {naturalBirthJourney.heading}
        </h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
            {naturalBirthJourney.cta.label}
          </Button>
        </div>
      </NaturalBirthReveal>
    </section>
  );
}
