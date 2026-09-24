import { fertilityFirstConsultation } from "@/content/fertility-preconception-landing-content";
import { FertilityImage } from "./fertility-preconception-image";
import { FertilityReveal } from "./fertility-preconception-reveal";
import { Button } from "@/components/ui/button";

/**
 * Section 6 — Your First Consultation. Image beside three steps kept in
 * normal document flow, matching `pregnancy-antenatal-care-includes.tsx`'s
 * own First Consultation section. No investigation, treatment, fertility
 * outcome, appointment time or response time is promised.
 */
export function FertilityFirstConsultation() {
  return (
    <section id="fertility-first-consultation" aria-labelledby="fertility-first-consultation-heading" className="relative isolate bg-paper section-pad">
      <FertilityReveal className="container-birthwave">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <FertilityImage imageKey={fertilityFirstConsultation.imageKey} corner="tl" aspect="aspect-[4/5]" className="order-2 lg:order-1" />

          <div className="order-1 max-w-xl lg:order-2">
            <p className="eyebrow">{fertilityFirstConsultation.eyebrow}</p>
            <h2 id="fertility-first-consultation-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
              {fertilityFirstConsultation.heading}
            </h2>

            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {fertilityFirstConsultation.steps.map((step) => (
                <div key={step.number} className="border-t border-[var(--color-border)] pt-5">
                  <span className="font-body text-xs font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
                    {step.number} — {step.title}
                  </span>
                  <p className="mt-3 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{step.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Button href={fertilityFirstConsultation.cta.href} variant="primary">
                {fertilityFirstConsultation.cta.label}
              </Button>
            </div>
          </div>
        </div>
      </FertilityReveal>
    </section>
  );
}
