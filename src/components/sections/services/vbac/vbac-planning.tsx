import { vbacAssessmentFactors, vbacPlanningLabour } from "@/content/pages/vbac";
import { VbacImage } from "./vbac-image";
import { VbacReveal } from "./vbac-reveal";

/**
 * Section 05 — WHAT MAY INFLUENCE THE DISCUSSION? / TOPICS COVERED:
 * Cleaner editorial strip with 5 numbered items, thin separators, and strong numbering.
 */
export function VbacAssessmentFactors() {
  return (
    <section id="vbac-assessment" aria-labelledby="vbac-assessment-heading" className="relative isolate bg-paper section-pad border-t border-[var(--color-border)]">
      <VbacReveal className="container-birthwave">
        <div className="max-w-2xl">
          <p className="eyebrow">{vbacAssessmentFactors.eyebrow}</p>
          <h2 id="vbac-assessment-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {vbacAssessmentFactors.heading}
          </h2>
          <p className="mt-4 text-base font-medium text-ink sm:text-lg">
            {vbacAssessmentFactors.intro}
          </p>
        </div>

        {/* 5-item horizontal editorial strip on desktop, clean list on mobile */}
        <div className="mt-10 overflow-hidden rounded-sm border border-[var(--color-border)] bg-paper shadow-2xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-[var(--color-border)]">
            {vbacAssessmentFactors.factors.map((factor, idx) => (
              <div
                key={factor.title}
                className="p-6 lg:p-5 xl:p-6 flex flex-col justify-between hover:bg-paper-dim/40 transition-colors"
              >
                <div>
                  <span className="font-body text-xs font-semibold tracking-wider text-terracotta-deep uppercase">
                    0{idx + 1}
                  </span>
                  <h3 className="mt-2 text-base font-semibold text-ink">{factor.title}</h3>
                  <p className="mt-2 text-xs lg:text-sm leading-[var(--leading-relaxed)] text-ink-soft">
                    {factor.body}
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-[var(--color-border)]/60 text-[0.6875rem] font-medium tracking-wide text-ink-soft uppercase">
                  Assessment Focus
                </div>
              </div>
            ))}
          </div>
        </div>
      </VbacReveal>
    </section>
  );
}

/**
 * Section 06 — PLANNING LABOUR AFTER A CAESAREAN / PREPARE FOR BIRTH:
 * Clean split: Left content with vertical structured list (icon, title, body, dividers); Right editorial image.
 */
export function VbacPlanningLabour() {
  return (
    <section id="vbac-planning" aria-labelledby="vbac-planning-heading" className="relative isolate bg-[var(--vbac-sky-wash)] section-pad border-t border-[var(--color-border)]">
      <VbacReveal className="container-birthwave">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          {/* Left Column: Heading, intro, vertical preparation list */}
          <div className="max-w-xl">
            <p className="eyebrow">{vbacPlanningLabour.eyebrow}</p>
            <h2 id="vbac-planning-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
              {vbacPlanningLabour.heading}
            </h2>
            <p className="mt-4 text-base leading-[var(--leading-relaxed)] text-ink-soft sm:text-lg">
              {vbacPlanningLabour.intro}
            </p>

            {/* Vertical structured list with subtle dividers */}
            <div className="mt-8 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
              {vbacPlanningLabour.phases.map((phase, idx) => (
                <div key={phase.title} className="py-4.5 flex items-start gap-4">
                  <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-paper border border-[var(--color-border)] text-terracotta-deep font-body text-xs font-semibold shadow-2xs">
                    0{idx + 1}
                  </div>
                  <div>
                    <h3 className="font-body text-base font-semibold text-ink">{phase.title}</h3>
                    <p className="mt-1 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{phase.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 border-l-2 border-terracotta pl-4 text-xs leading-relaxed text-ink-soft">
              {vbacPlanningLabour.requirementNote}
            </p>
          </div>

          {/* Right Column: Editorial Framed Media */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="overflow-hidden rounded-tr-panel rounded-tl-sm rounded-br-sm rounded-bl-panel border border-[var(--color-border)] bg-paper shadow-sm p-2 sm:p-2.5">
              <VbacImage
                imageKey="planning"
                corner="br"
                aspect="aspect-[4/4.5] sm:aspect-[5/4] lg:aspect-[4/4.8]"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </VbacReveal>
    </section>
  );
}

// Backwards compatibility alias
export const VbacPlanning = VbacPlanningLabour;
