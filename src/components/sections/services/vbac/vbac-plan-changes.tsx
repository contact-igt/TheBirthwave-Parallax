import { vbacPlanChanges } from "@/content/pages/vbac";
import { VbacReveal } from "./vbac-reveal";

/**
 * Section 09 — IF THE BIRTH PLAN CHANGES:
 * Care that adapts with safety, clear communication, and non-judgmental support.
 */
export function VbacPlanChanges() {
  return (
    <section id="vbac-plan-changes" aria-labelledby="vbac-plan-changes-heading" className="relative isolate bg-[var(--vbac-sky-wash)] section-pad">
      <VbacReveal className="container-birthwave max-w-3xl">
        <p className="eyebrow">{vbacPlanChanges.eyebrow}</p>
        <h2 id="vbac-plan-changes-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {vbacPlanChanges.heading}
        </h2>

        <div className="mt-6 space-y-4 text-base leading-[var(--leading-relaxed)] text-ink-soft sm:text-lg">
          {vbacPlanChanges.paragraphs.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
      </VbacReveal>
    </section>
  );
}
