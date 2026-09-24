import { fertilityClinician } from "@/content/fertility-preconception-landing-content";
import { getDoctorBySlug } from "@/content/doctors-content";
import { PortraitPlaceholder } from "@/components/ui/portrait-placeholder";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import { FertilityReveal } from "./fertility-preconception-reveal";

/**
 * Section 5 — The People Behind Your Care. Unlike the other four landing
 * pages (none of which have a confirmed clinician mapping), this page has
 * exactly one: `doctors-content.ts` maps Dr. Bharathy Kandasamy to
 * "fertility-preconception" via her own `relatedCareSlugs` (see this
 * page's content file for why the Founder is NOT used here). Her name,
 * credentials, role and portrait status are read directly from that single
 * source of truth rather than re-typed, so this section can never drift
 * from the confirmed roster. `PortraitPlaceholder` renders the same
 * built-visual placeholder every other person on this site uses until real
 * photography is approved (her `photo.src` is `null` today).
 */
export function FertilityClinician() {
  const doctor = getDoctorBySlug(fertilityClinician.doctorSlug);
  if (!doctor) return null;

  return (
    <section id="fertility-clinician" aria-labelledby="fertility-clinician-heading" className="relative isolate border-t border-[var(--color-border)] bg-paper section-pad">
      <FertilityReveal className="container-birthwave grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
        <PortraitPlaceholder photo={doctor.photo} index={1} className="max-w-sm" />

        <div className="max-w-xl">
          <p className="eyebrow">{fertilityClinician.eyebrow}</p>
          <h2 id="fertility-clinician-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {fertilityClinician.heading}
          </h2>

          <h3 className="mt-6 text-xl font-semibold text-ink">{doctor.name}</h3>
          <p className="mt-2 text-sm text-ink-soft">{doctor.credentials}</p>
          <p className="mt-1 text-sm text-ink-soft">{doctor.role}</p>

          <p className="mt-6 border-l-2 border-terracotta pl-4 text-base leading-[var(--leading-relaxed)] text-ink-soft">{fertilityClinician.philosophy}</p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href={fertilityClinician.bookHref} variant="primary">
              {fertilityClinician.bookLabel}
            </Button>
            <CtaLink href={fertilityClinician.profileHref}>{fertilityClinician.viewProfileLabel}</CtaLink>
          </div>
        </div>
      </FertilityReveal>
    </section>
  );
}
