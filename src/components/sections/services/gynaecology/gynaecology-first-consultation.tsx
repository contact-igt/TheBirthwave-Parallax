import { gynaecologyFirstConsultation } from "@/content/gynaecology-landing-content";
import { GynaecologyImage } from "./gynaecology-image";
import { GynaecologyReveal } from "./gynaecology-reveal";
import { Button } from "@/components/ui/button";

/**
 * Section 6 — Your First Consultation. Image beside three steps kept in
 * normal document flow, matching `fertility-preconception-first-consultation.tsx`.
 * No same-day diagnosis, test, scan, procedure, medication or outcome is
 * promised.
 */
export function GynaecologyFirstConsultation() {
  return (
    <section id="gynaecology-first-consultation" aria-labelledby="gynaecology-first-consultation-heading" className="relative isolate bg-paper section-pad">
      <GynaecologyReveal className="container-birthwave">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <GynaecologyImage imageKey="first-consultation" corner="tl" aspect="aspect-[4/5]" className="order-2 lg:order-1" />

          <div className="order-1 max-w-xl lg:order-2">
            <p className="eyebrow">{gynaecologyFirstConsultation.eyebrow}</p>
            <h2 id="gynaecology-first-consultation-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
              {gynaecologyFirstConsultation.heading}
            </h2>

            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {gynaecologyFirstConsultation.steps.map((step) => (
                <div key={step.number} className="border-t border-[var(--color-border)] pt-5">
                  <span className="font-body text-xs font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
                    {step.number} — {step.title}
                  </span>
                  <p className="mt-3 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{step.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Button href={gynaecologyFirstConsultation.cta.href} variant="primary">
                {gynaecologyFirstConsultation.cta.label}
              </Button>
            </div>
          </div>
        </div>
      </GynaecologyReveal>
    </section>
  );
}
