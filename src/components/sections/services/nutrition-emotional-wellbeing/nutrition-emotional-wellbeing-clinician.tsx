import { nutritionClinician } from "@/content/nutrition-emotional-wellbeing-landing-content";
import { getDoctorBySlug, doctors } from "@/content/doctors-content";
import { PortraitPlaceholder } from "@/components/ui/portrait-placeholder";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import { NutritionReveal } from "./nutrition-emotional-wellbeing-reveal";

/**
 * Section 6 — The People Behind Your Care. `doctors-content.ts` maps
 * exactly TWO confirmed team members to this slug via their own
 * `relatedCareSlugs` — Deepa (M.Sc Psychology, "Emotional Well-being
 * Support") and Sherene ("Nutritionist", no further credentials
 * confirmed) — so, matching `postpartum-care-clinician.tsx`'s own
 * two-profile precedent, this section shows both side by side rather than
 * picking one. Each profile's name, credentials, role and portrait status
 * are read directly from that single source of truth, so this section can
 * never drift from the confirmed roster or invent a psychologist,
 * therapist, counsellor, clinical psychologist or dietitian title for
 * either of them. Two profiles, shown as a restrained two-column split
 * (one column on mobile) — not a card grid — matching this page's own "no
 * card-heavy SaaS UI" constraint.
 */
export function NutritionClinician() {
  const profiles = nutritionClinician.doctorSlugs
    .map((slug) => getDoctorBySlug(slug))
    .filter((doctor): doctor is NonNullable<typeof doctor> => Boolean(doctor));

  if (profiles.length === 0) return null;

  return (
    <section id="nutrition-clinician" aria-labelledby="nutrition-clinician-heading" className="relative isolate border-t border-[var(--color-border)] bg-paper section-pad">
      <NutritionReveal className="container-birthwave">
        <p className="eyebrow">{nutritionClinician.eyebrow}</p>
        <h2 id="nutrition-clinician-heading" className="mt-4 max-w-xl text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {nutritionClinician.heading}
        </h2>

        <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:gap-16">
          {profiles.map((doctor) => {
            const doctorIndex = doctors.findIndex((d) => d.slug === doctor.slug);
            return (
              <div key={doctor.slug} className="flex flex-col gap-6 border-t border-[var(--color-border)] pt-8 sm:flex-row sm:items-start">
                <PortraitPlaceholder photo={doctor.photo} index={doctorIndex} className="w-full max-w-[180px] shrink-0" />

                <div>
                  <h3 className="text-lg font-semibold text-ink">{doctor.name}</h3>
                  {doctor.credentials ? <p className="mt-1 text-sm text-ink-soft">{doctor.credentials}</p> : null}
                  <p className="mt-1 text-sm text-ink-soft">{doctor.role}</p>

                  <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <CtaLink href={`/doctors/${doctor.slug}`}>{nutritionClinician.profileLabel}</CtaLink>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10">
          <Button href={nutritionClinician.bookHref} variant="primary">
            {nutritionClinician.bookLabel}
          </Button>
        </div>
      </NutritionReveal>
    </section>
  );
}
