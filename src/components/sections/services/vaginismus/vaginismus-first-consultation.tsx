import { vaginismusFirstConsultation } from "@/content/vaginismus-landing-content";
import { VaginismusImage } from "./vaginismus-image";
import { VaginismusReveal } from "./vaginismus-reveal";
import { Button } from "@/components/ui/button";

/**
 * Section 6 — Your First Consultation. Image beside three steps kept in
 * normal document flow, matching `fertility-preconception-first-consultation.tsx`.
 * No physical exam, immediate diagnosis, specific treatment, session count
 * or outcome timeline is promised.
 */
export function VaginismusFirstConsultation() {
  return (
    <section id="vaginismus-first-consultation" aria-labelledby="vaginismus-first-consultation-heading" className="relative isolate bg-paper section-pad">
      <VaginismusReveal className="container-birthwave">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <VaginismusImage imageKey="first-consultation" corner="tl" aspect="aspect-[4/5]" className="order-2 lg:order-1" />

          <div className="order-1 max-w-xl lg:order-2">
            <p className="eyebrow">{vaginismusFirstConsultation.eyebrow}</p>
            <h2 id="vaginismus-first-consultation-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
              {vaginismusFirstConsultation.heading}
            </h2>

            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {vaginismusFirstConsultation.steps.map((step) => (
                <div key={step.number} className="border-t border-[var(--color-border)] pt-5">
                  <span className="font-body text-xs font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
                    {step.number} — {step.title}
                  </span>
                  <p className="mt-3 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{step.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Button href={vaginismusFirstConsultation.cta.href} variant="primary">
                {vaginismusFirstConsultation.cta.label}
              </Button>
            </div>
          </div>
        </div>
      </VaginismusReveal>
    </section>
  );
}
