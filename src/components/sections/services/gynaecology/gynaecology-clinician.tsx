import { gynaecologyClinician } from "@/content/gynaecology-landing-content";
import { getDoctorBySlug, doctors } from "@/content/doctors-content";
import { PortraitPlaceholder } from "@/components/ui/portrait-placeholder";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import { GynaecologyReveal } from "./gynaecology-reveal";

/**
 * Section 5 — The People Behind Your Care. `doctors-content.ts` maps
 * exactly one confirmed clinician to this slug: Dr. Bharathy Kandasamy, via
 * her own `relatedCareSlugs: ["fertility-preconception", "gynaecology"]` —
 * the same confirmed mapping `fertility-preconception-clinician.tsx` already
 * uses for her Fertility & Preconception section. Her name, credentials,
 * role and portrait status are read directly from that single source of
 * truth rather than re-typed, so this section can never drift from the
 * confirmed roster. Both `credentials` and `role` ARE confirmed for her
 * (unlike Vaginismus's Dr. Adithi Nair, who has no confirmed credentials),
 * so both render here. `PortraitPlaceholder` renders the same built-visual
 * placeholder every other person on this site uses until real photography
 * is approved (her `photo.src` is `null` today).
 */
export function GynaecologyClinician() {
  const doctor = getDoctorBySlug(gynaecologyClinician.doctorSlug);
  if (!doctor) return null;
  const doctorIndex = doctors.findIndex((d) => d.slug === doctor.slug);

  return (
    <section id="gynaecology-clinician" aria-labelledby="gynaecology-clinician-heading" className="relative isolate border-t border-[var(--color-border)] bg-paper section-pad">
      <GynaecologyReveal className="container-birthwave grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
        <PortraitPlaceholder photo={doctor.photo} index={doctorIndex} className="max-w-sm" />

        <div className="max-w-xl">
          <p className="eyebrow">{gynaecologyClinician.eyebrow}</p>
          <h2 id="gynaecology-clinician-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {gynaecologyClinician.heading}
          </h2>

          <h3 className="mt-6 text-xl font-semibold text-ink">{doctor.name}</h3>
          {doctor.credentials ? <p className="mt-2 text-sm text-ink-soft">{doctor.credentials}</p> : null}
          <p className="mt-1 text-sm text-ink-soft">{doctor.role}</p>

          <p className="mt-6 border-l-2 border-terracotta pl-4 text-base leading-[var(--leading-relaxed)] text-ink-soft">{gynaecologyClinician.philosophy}</p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href={gynaecologyClinician.bookHref} variant="primary">
              {gynaecologyClinician.bookLabel}
            </Button>
            <CtaLink href={gynaecologyClinician.profileHref}>{gynaecologyClinician.viewProfileLabel}</CtaLink>
          </div>
        </div>
      </GynaecologyReveal>
    </section>
  );
}
