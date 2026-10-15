import { vbacFirstVisit } from "@/content/pages/vbac";
import { VbacReveal } from "./vbac-reveal";
import { Button } from "@/components/ui/button";

/**
 * Section 07 — YOUR FIRST CONSULTATION:
 * 3 clear steps for the initial conversation, plus booking CTA.
 */
export function VbacFirstVisit() {
  return (
    <section id="vbac-first-visit" aria-labelledby="vbac-first-visit-heading" className="relative isolate bg-paper section-pad border-t border-[var(--color-border)]">
      <VbacReveal className="container-birthwave">
        <p className="eyebrow">{vbacFirstVisit.eyebrow}</p>
        <h2 id="vbac-first-visit-heading" className="mt-4 max-w-xl text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {vbacFirstVisit.heading}
        </h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {vbacFirstVisit.steps.map((step) => (
            <div key={step.number} className="rounded-xs border border-[var(--color-border)] bg-[var(--vbac-coral-wash)]/30 p-6">
              <span className="font-body text-xs font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
                {step.number}
              </span>
              <h3 className="mt-2 text-base font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Button href={vbacFirstVisit.cta.href} variant="primary">
            {vbacFirstVisit.cta.label.replace(/\s*↗$/, "")}
          </Button>
        </div>
      </VbacReveal>
    </section>
  );
}
