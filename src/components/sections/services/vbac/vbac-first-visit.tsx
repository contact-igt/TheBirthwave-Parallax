import { vbacFirstVisit } from "@/content/pages/vbac";
import { VbacReveal } from "./vbac-reveal";
import { Button } from "@/components/ui/button";

/**
 * Section 07 — YOUR FIRST CONSULTATION:
 * 3-step process timeline (horizontal on desktop, vertical timeline on mobile), avoiding heavy cards.
 */
export function VbacFirstVisit() {
  return (
    <section id="vbac-first-visit" aria-labelledby="vbac-first-visit-heading" className="relative isolate overflow-hidden bg-paper section-pad border-t border-[var(--color-border)]">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[url('/images/services/birth-prep-learning-experience-background-v1.png')] bg-cover bg-center" />
      <VbacReveal className="container-birthwave">
        <div className="max-w-2xl md:mx-auto md:text-center">
          <p className="eyebrow">{vbacFirstVisit.eyebrow}</p>
          <h2 id="vbac-first-visit-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {vbacFirstVisit.heading}
          </h2>
        </div>

        {/* 3-step timeline process: Horizontal on desktop, vertical timeline on mobile */}
        <div className="relative mt-12 md:mt-16">
          {/* Desktop horizontal track line */}
          <div
            className="hidden md:block absolute top-6 left-[18%] right-[18%] h-px bg-[var(--color-border)] z-0"
            aria-hidden="true"
          />

          <div className="relative border-l border-[var(--color-border)] pl-7 ml-3.5 space-y-10 md:space-y-0 md:border-l-0 md:pl-0 md:ml-0 md:grid md:grid-cols-3 md:gap-8">
            {vbacFirstVisit.steps.map((step) => (
              <div
                key={step.number}
                className="relative z-10 flex flex-col md:items-center md:text-center"
              >
                {/* Step indicator node */}
                <div className="absolute -left-[2.8rem] md:static md:left-auto size-11 md:size-12 rounded-full border border-[var(--color-border)] bg-paper flex items-center justify-center font-body text-xs md:text-sm font-semibold text-terracotta-deep shadow-2xs mb-4">
                  {step.number}
                </div>

                <h3 className="text-base sm:text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft max-w-xs">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-start md:justify-center">
          <Button href={vbacFirstVisit.cta.href} variant="primary">
            {vbacFirstVisit.cta.label.replace(/\s*↗$/, "")}
          </Button>
        </div>
      </VbacReveal>
    </section>
  );
}
