import { postpartumClinician } from "@/content/postpartum-care-landing-content";
import { getDoctorBySlug, doctors } from "@/content/doctors-content";
import { PortraitPlaceholder } from "@/components/ui/portrait-placeholder";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import { PostpartumReveal } from "./postpartum-care-reveal";

/**
 * Section 6 — The People Behind Your Care. `doctors-content.ts` maps
 * exactly TWO confirmed clinicians to this slug via their own
 * `relatedCareSlugs` — Dr. Amudha Varshini and Dr. Adithi Nair — so, unlike
 * the single-clinician sections `gynaecology-clinician.tsx`/
 * `lactation-clinician.tsx` establish, this section shows both side by
 * side rather than picking one. Each profile's name, credentials, role and
 * portrait status are read directly from that single source of truth, so
 * this section can never drift from the confirmed roster or invent a
 * postpartum-specific qualification for either of them. Two profiles,
 * shown as a restrained two-column split (one column on mobile) — not a
 * card grid — matching this page's own "no card-heavy SaaS UI" constraint.
 */
export function PostpartumClinician() {
  const profiles = postpartumClinician.doctorSlugs
    .map((slug) => getDoctorBySlug(slug))
    .filter((doctor): doctor is NonNullable<typeof doctor> => Boolean(doctor));

  if (profiles.length === 0) return null;

  return (
    <section id="postpartum-clinician" aria-labelledby="postpartum-clinician-heading" className="relative isolate border-t border-[var(--color-border)] bg-paper section-pad">
      <PostpartumReveal className="container-birthwave">
        <p className="eyebrow">{postpartumClinician.eyebrow}</p>
        <h2 id="postpartum-clinician-heading" className="mt-4 max-w-xl text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {postpartumClinician.heading}
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
                    <CtaLink href={`/doctors/${doctor.slug}`}>{postpartumClinician.profileLabel}</CtaLink>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10">
          <Button href={postpartumClinician.bookHref} variant="primary">
            {postpartumClinician.bookLabel}
          </Button>
        </div>
      </PostpartumReveal>
    </section>
  );
}
