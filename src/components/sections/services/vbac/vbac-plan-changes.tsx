import { vbacPlanChanges } from "@/content/pages/vbac";
import { VbacReveal } from "./vbac-reveal";

/**
 * Section 09 — IF THE BIRTH PLAN CHANGES / REASSURANCE QUOTE:
 * Simple, spacious centered editorial quote with generous whitespace and subtle divider accents. No cards.
 */
export function VbacPlanChanges() {
  return (
    <section id="vbac-plan-changes" aria-labelledby="vbac-plan-changes-heading" className="relative isolate overflow-hidden bg-paper border-t border-[var(--color-border)] py-20 md:py-28 text-center">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[url('/images/natural-birth/natural-birth-labour-background-v1.png')] bg-cover bg-center" />
      <VbacReveal className="container-birthwave max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-terracotta/40" />
          <p className="eyebrow">{vbacPlanChanges.eyebrow}</p>
          <span className="h-px w-8 bg-terracotta/40" />
        </div>

        <h2 id="vbac-plan-changes-heading" className="mt-6 text-[clamp(2.1rem,1.5rem+2.8vw,3.6rem)] leading-[1.12] font-semibold tracking-[var(--tracking-tight)] text-ink">
          “{vbacPlanChanges.heading}”
        </h2>

        <div className="mt-8 max-w-2xl mx-auto space-y-4 text-base leading-[var(--leading-relaxed)] text-ink-soft sm:text-lg">
          {vbacPlanChanges.paragraphs.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-[var(--color-border)]" />
          <span className="font-body text-xs font-semibold tracking-widest text-terracotta uppercase">
            The Birthwave Philosophy
          </span>
          <span className="h-px w-12 bg-[var(--color-border)]" />
        </div>
      </VbacReveal>
    </section>
  );
}
