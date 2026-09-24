import { normalBirthConsultation } from "@/content/normal-birth-delivery-landing-content";
import { NormalBirthReveal } from "./normal-birth-delivery-reveal";
import { Button } from "@/components/ui/button";

/** Section 6 — Delivery-Care Consultation. Three steps kept in normal
 * document flow, matching `pregnancy-antenatal-care-includes.tsx`'s own
 * first-consultation steps and `birth-preparation-info-sections.tsx`'s own
 * how-to-begin steps. */
export function NormalBirthConsultation() {
  return (
    <section id="nbd-consultation" aria-labelledby="nbd-consultation-heading" className="relative isolate bg-paper section-pad">
      <NormalBirthReveal className="container-birthwave">
        <p className="eyebrow">{normalBirthConsultation.eyebrow}</p>
        <h2 id="nbd-consultation-heading" className="mt-4 max-w-xl text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {normalBirthConsultation.heading}
        </h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {normalBirthConsultation.steps.map((step) => (
            <div key={step.number} className="border-t border-[var(--color-border)] pt-5">
              <span className="font-body text-xs font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
                {step.number} — {step.title}
              </span>
              <p className="mt-3 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Button href={normalBirthConsultation.cta.href} variant="primary">
            {normalBirthConsultation.cta.label}
          </Button>
        </div>
      </NormalBirthReveal>
    </section>
  );
}
