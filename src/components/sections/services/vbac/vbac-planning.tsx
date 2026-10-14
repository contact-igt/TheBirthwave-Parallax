import { vbacAssessmentFactors, vbacPlanningLabour } from "@/content/vbac-landing-content";
import { VbacImage } from "./vbac-image";
import { VbacReveal } from "./vbac-reveal";

/**
 * Section 05 — WHAT MAY INFLUENCE THE DISCUSSION?
 * 5 individual assessment considerations.
 */
export function VbacAssessmentFactors() {
  return (
    <section id="vbac-assessment" aria-labelledby="vbac-assessment-heading" className="relative isolate bg-paper section-pad">
      <VbacReveal className="container-birthwave">
        <div className="max-w-2xl">
          <p className="eyebrow">{vbacAssessmentFactors.eyebrow}</p>
          <h2 id="vbac-assessment-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {vbacAssessmentFactors.heading}
          </h2>
          <p className="mt-4 text-base font-medium text-ink">
            {vbacAssessmentFactors.intro}
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vbacAssessmentFactors.factors.map((factor) => (
            <div
              key={factor.title}
              className="rounded-xs border border-[var(--color-border)] bg-[var(--vbac-sky-wash)]/40 p-6"
            >
              <h3 className="font-body text-base font-semibold text-ink">{factor.title}</h3>
              <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{factor.body}</p>
            </div>
          ))}
        </div>
      </VbacReveal>
    </section>
  );
}

/**
 * Section 06 — PLANNING LABOUR AFTER A CAESAREAN:
 * Before labour, during labour, and if plans change.
 */
export function VbacPlanningLabour() {
  return (
    <section id="vbac-planning" aria-labelledby="vbac-planning-heading" className="relative isolate bg-[var(--vbac-sky-wash)] section-pad">
      <VbacReveal className="container-birthwave grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <div className="max-w-xl">
          <p className="eyebrow">{vbacPlanningLabour.eyebrow}</p>
          <h2 id="vbac-planning-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {vbacPlanningLabour.heading}
          </h2>
          <p className="mt-4 text-base leading-[var(--leading-relaxed)] text-ink-soft">
            {vbacPlanningLabour.intro}
          </p>

          <div className="mt-8 flex flex-col gap-5">
            {vbacPlanningLabour.phases.map((phase) => (
              <div key={phase.title} className="rounded-xs border border-[var(--color-border)] bg-paper p-5">
                <h3 className="font-body text-base font-semibold text-ink">{phase.title}</h3>
                <p className="mt-1.5 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{phase.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 border-l-2 border-terracotta pl-4 text-xs leading-relaxed text-ink-soft">
            {vbacPlanningLabour.requirementNote}
          </p>
        </div>

        <VbacImage imageKey="planning" corner="br" aspect="aspect-[4/4.5] sm:aspect-[5/4] lg:aspect-[4/4.5]" />
      </VbacReveal>
    </section>
  );
}

// Backwards compatibility alias
export const VbacPlanning = VbacPlanningLabour;
