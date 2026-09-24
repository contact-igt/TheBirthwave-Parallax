import { lactationFirstConsultation } from "@/content/lactation-landing-content";
import { LactationImage } from "./lactation-image";
import { LactationReveal } from "./lactation-reveal";
import { Button } from "@/components/ui/button";

/**
 * Section 5 — Your First Conversation. Image beside three steps kept in
 * normal document flow, matching `vaginismus-first-consultation.tsx`. No
 * physical exam, immediate diagnosis, specific intervention, session count
 * or outcome timeline is promised — `note` states plainly that observation
 * and assessment are never automatic.
 */
export function LactationFirstConsultation() {
  return (
    <section id="lactation-first-consultation" aria-labelledby="lactation-first-consultation-heading" className="relative isolate bg-paper section-pad">
      <LactationReveal className="container-birthwave">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <LactationImage imageKey="first-consultation" corner="tl" aspect="aspect-[4/3]" className="order-2 lg:order-1" />

          <div className="order-1 max-w-xl lg:order-2">
            <p className="eyebrow">{lactationFirstConsultation.eyebrow}</p>
            <h2 id="lactation-first-consultation-heading" className="mt-4 max-w-xl text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
              {lactationFirstConsultation.heading}
            </h2>

            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {lactationFirstConsultation.steps.map((step) => (
                <div key={step.number} className="border-t border-[var(--color-border)] pt-5">
                  <span className="font-body text-xs font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
                    {step.number} — {step.title}
                  </span>
                  <p className="mt-3 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{step.body}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 max-w-2xl border-l-2 border-terracotta pl-4 text-sm text-ink-soft">{lactationFirstConsultation.note}</p>

            <div className="mt-10">
              <Button href={lactationFirstConsultation.cta.href} variant="primary">
                {lactationFirstConsultation.cta.label}
              </Button>
            </div>
          </div>
        </div>
      </LactationReveal>
    </section>
  );
}
