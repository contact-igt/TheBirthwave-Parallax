import { lactationClinician } from "@/content/lactation-landing-content";
import { getDoctorBySlug, doctors } from "@/content/doctors-content";
import { PortraitPlaceholder } from "@/components/ui/portrait-placeholder";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import { LactationReveal } from "./lactation-reveal";

/**
 * Section 6 — The People Behind Your Care. `doctors-content.ts` maps
 * exactly one confirmed clinician to this slug: Sheethal Sathya, via her own
 * `relatedCareSlugs: ["birth-preparation", "lactation", "pregnancy-antenatal-care"]`
 * — the same confirmed-mapping pattern `gynaecology-clinician.tsx` already
 * uses for Dr. Bharathy Kandasamy. Her name, role and special focus are read
 * directly from that single source of truth rather than re-typed, so this
 * section can never drift from the confirmed roster. She is never described
 * as a doctor, paediatrician, obstetrician or IBCLC — none of those are
 * confirmed for her. `PortraitPlaceholder` renders her real approved photo
 * when `doctor.photo.src` is set, or the same built-visual placeholder
 * every other person on this site uses otherwise — reading `doctor.photo`
 * directly means this section never needs updating either way.
 */
export function LactationClinician() {
  const doctor = getDoctorBySlug(lactationClinician.doctorSlug);
  if (!doctor) return null;
  const doctorIndex = doctors.findIndex((d) => d.slug === doctor.slug);

  return (
    <section id="lactation-clinician" aria-labelledby="lactation-clinician-heading" className="relative isolate border-t border-[var(--color-border)] bg-paper section-pad">
      <LactationReveal className="container-birthwave grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
        <PortraitPlaceholder photo={doctor.photo} index={doctorIndex} className="max-w-sm" />

        <div className="max-w-xl">
          <p className="eyebrow">{lactationClinician.eyebrow}</p>
          <h2 id="lactation-clinician-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {lactationClinician.heading}
          </h2>

          <h3 className="mt-6 text-xl font-semibold text-ink">{doctor.name}</h3>
          <p className="mt-2 text-sm text-ink-soft">{doctor.role}</p>
          {doctor.specialFocus ? <p className="mt-1 text-sm text-ink-soft">{doctor.specialFocus}</p> : null}

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <CtaLink href={`/doctors/${doctor.slug}`}>{lactationClinician.profileLabel}</CtaLink>
            <Button href={lactationClinician.bookHref} variant="primary">
              {lactationClinician.bookLabel}
            </Button>
          </div>
        </div>
      </LactationReveal>
    </section>
  );
}
