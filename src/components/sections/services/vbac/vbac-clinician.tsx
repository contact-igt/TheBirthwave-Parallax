import { vbacClinician } from "@/content/vbac-landing-content";
import { PortraitPlaceholder } from "@/components/ui/portrait-placeholder";
import { VbacReveal } from "./vbac-reveal";

/**
 * Section 7 — The People Involved. No confirmed VBAC-specific clinician is
 * assigned to this page (see the content file's own top comment — the
 * founder's "VBAC Specialist" special focus is not, on its own, a
 * confirmed assignment, and the brief explicitly rules out auto-assigning
 * the founder or anyone else here). Deliberately no name/credentials pair
 * — this is a neutral statement about how care will be arranged, not a
 * placeholder standing in for one specific still-unconfirmed person.
 */
export function VbacClinician() {
  return (
    <section id="vbac-clinician" aria-labelledby="vbac-clinician-heading" className="relative isolate border-t border-[var(--color-border)] bg-paper section-pad">
      <VbacReveal className="container-birthwave grid gap-10 lg:grid-cols-[0.7fr_1fr] lg:items-center lg:gap-16">
        <PortraitPlaceholder photo={{ src: null, alt: vbacClinician.portraitPendingLabel, placeholderLabel: vbacClinician.portraitPendingLabel }} index={2} className="max-w-sm" />

        <div className="max-w-xl">
          <p className="eyebrow">{vbacClinician.eyebrow}</p>
          <h2 id="vbac-clinician-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {vbacClinician.heading}
          </h2>
          <p className="mt-6 border-l-2 border-terracotta pl-4 text-lg leading-[var(--leading-relaxed)] font-medium text-ink">{vbacClinician.statement}</p>
          <p className="mt-5 text-base leading-[var(--leading-relaxed)] text-ink-soft">{vbacClinician.body}</p>
        </div>
      </VbacReveal>
    </section>
  );
}
