import { newbornFirstConsultation } from "@/content/newborn-pediatric-care-landing-content";
import { NewbornImage } from "./newborn-pediatric-care-image";
import { NewbornReveal } from "./newborn-pediatric-care-reveal";
import { Button } from "@/components/ui/button";

/**
 * Section 5 — Your First Visit. Image beside three steps kept in normal
 * document flow, matching `lactation-first-consultation.tsx`/
 * `postpartum-care-first-consultation.tsx`. No diagnosis, test, medication,
 * vaccination, procedure or specific growth assessment is promised — `note`
 * states plainly that none of those is automatic.
 */
export function NewbornFirstConsultation() {
  return (
    <section id="newborn-first-consultation" aria-labelledby="newborn-first-consultation-heading" className="relative isolate bg-paper section-pad">
      <NewbornReveal className="container-birthwave">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <NewbornImage imageKey="first-visit" corner="tl" aspect="aspect-[4/3]" className="order-2 lg:order-1" />

          <div className="order-1 max-w-xl lg:order-2">
            <p className="eyebrow">{newbornFirstConsultation.eyebrow}</p>
            <h2 id="newborn-first-consultation-heading" className="mt-4 max-w-xl text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
              {newbornFirstConsultation.heading}
            </h2>

            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {newbornFirstConsultation.steps.map((step) => (
                <div key={step.number} className="border-t border-[var(--color-border)] pt-5">
                  <span className="font-body text-xs font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
                    {step.number} — {step.title}
                  </span>
                  <p className="mt-3 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{step.body}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 max-w-2xl border-l-2 border-terracotta pl-4 text-sm text-ink-soft">{newbornFirstConsultation.note}</p>

            <div className="mt-10">
              <Button href={newbornFirstConsultation.cta.href} variant="primary">
                {newbornFirstConsultation.cta.label}
              </Button>
            </div>
          </div>
        </div>
      </NewbornReveal>
    </section>
  );
}
