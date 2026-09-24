import { newbornClinician } from "@/content/newborn-pediatric-care-landing-content";
import { getDoctorBySlug, doctors } from "@/content/doctors-content";
import { PortraitPlaceholder } from "@/components/ui/portrait-placeholder";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import { NewbornReveal } from "./newborn-pediatric-care-reveal";

/**
 * Section 6 — The People Behind Your Child's Care. `doctors-content.ts`
 * maps exactly one confirmed clinician to this slug: Dr. Deepika Sivathanu,
 * via her own `relatedCareSlugs: ["newborn-pediatric-care"]` — the same
 * confirmed-mapping pattern `gynaecology-clinician.tsx`/
 * `lactation-clinician.tsx` already use for their own single profile. Her
 * name, credentials, role and portrait status are read directly from that
 * single source of truth rather than re-typed, so this section can never
 * drift from the confirmed roster. No years of experience, neonatal
 * specialist title, NICU experience, vaccination expertise, hospital
 * affiliation, award or treatment outcome is invented for her.
 */
export function NewbornClinician() {
  const doctor = getDoctorBySlug(newbornClinician.doctorSlug);
  if (!doctor) return null;
  const doctorIndex = doctors.findIndex((d) => d.slug === doctor.slug);

  return (
    <section id="newborn-clinician" aria-labelledby="newborn-clinician-heading" className="relative isolate border-t border-[var(--color-border)] bg-paper section-pad">
      <NewbornReveal className="container-birthwave grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
        <PortraitPlaceholder photo={doctor.photo} index={doctorIndex} className="max-w-sm" />

        <div className="max-w-xl">
          <p className="eyebrow">{newbornClinician.eyebrow}</p>
          <h2 id="newborn-clinician-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {newbornClinician.heading}
          </h2>

          <h3 className="mt-6 text-xl font-semibold text-ink">{doctor.name}</h3>
          {doctor.credentials ? <p className="mt-2 text-sm text-ink-soft">{doctor.credentials}</p> : null}
          <p className="mt-1 text-sm text-ink-soft">{doctor.role}</p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href={newbornClinician.bookHref} variant="primary">
              {newbornClinician.bookLabel}
            </Button>
            <CtaLink href={`/doctors/${doctor.slug}`}>{newbornClinician.profileLabel}</CtaLink>
          </div>
        </div>
      </NewbornReveal>
    </section>
  );
}
