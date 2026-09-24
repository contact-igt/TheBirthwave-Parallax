import { vbacFirstVisit } from "@/content/vbac-landing-content";
import { VbacReveal } from "./vbac-reveal";

/** Section 6 — Your First Consultation. Three steps kept in normal document
 * flow, matching `normal-birth-delivery-consultation.tsx`'s own three-step
 * layout. No invented records, review processes, fees, session duration or
 * appointment format. */
export function VbacFirstVisit() {
  return (
    <section id="vbac-first-visit" aria-labelledby="vbac-first-visit-heading" className="relative isolate bg-paper section-pad">
      <VbacReveal className="container-birthwave">
        <p className="eyebrow">{vbacFirstVisit.eyebrow}</p>
        <h2 id="vbac-first-visit-heading" className="mt-4 max-w-xl text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {vbacFirstVisit.heading}
        </h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {vbacFirstVisit.steps.map((step) => (
            <div key={step.number} className="border-t border-[var(--color-border)] pt-5">
              <span className="font-body text-xs font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
                {step.number} — {step.title}
              </span>
              <p className="mt-3 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{step.body}</p>
            </div>
          ))}
        </div>
      </VbacReveal>
    </section>
  );
}
