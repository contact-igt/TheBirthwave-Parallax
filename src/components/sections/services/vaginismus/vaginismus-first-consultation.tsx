import { vaginismusFirstConsultation } from "@/content/pages/vaginismus";
import { VaginismusImage } from "./vaginismus-image";
import { VaginismusReveal } from "./vaginismus-reveal";
import { Button } from "@/components/ui/button";

/**
 * Section 8 — Your First Conversation.
 * 3 clear, unhurried steps emphasizing no pre-diagnosis required,
 * safe listening, and collaborative option exploring.
 */
export function VaginismusFirstConsultation() {
  return (
    <section
      id="vaginismus-first-consultation"
      aria-labelledby="vaginismus-first-consultation-heading"
      className="relative isolate bg-paper section-pad"
    >
      <VaginismusReveal className="container-birthwave">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div className="order-2 lg:order-1">
            <VaginismusImage
              imageKey="first-consultation"
              corner="tl"
              aspect="aspect-[4/5]"
              className="w-full"
            />
          </div>

          <div className="order-1 max-w-xl lg:order-2">
            <p className="eyebrow">{vaginismusFirstConsultation.eyebrow}</p>
            <h2
              id="vaginismus-first-consultation-heading"
              className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink"
            >
              {vaginismusFirstConsultation.heading}
            </h2>

            <div className="mt-8 flex flex-col divide-y divide-[var(--color-border)]">
              {vaginismusFirstConsultation.steps.map((step) => (
                <div key={step.number} className="py-6 first:pt-2">
                  <span className="font-body text-xs font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
                    {step.number} — {step.title}
                  </span>
                  <p className="mt-2 text-base leading-[var(--leading-relaxed)] text-ink-soft">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8">
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
