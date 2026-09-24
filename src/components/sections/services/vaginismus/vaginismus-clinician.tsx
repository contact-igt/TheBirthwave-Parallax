import { vaginismusClinician } from "@/content/vaginismus-landing-content";
import { getDoctorBySlug, doctors } from "@/content/doctors-content";
import { PortraitPlaceholder } from "@/components/ui/portrait-placeholder";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import { VaginismusReveal } from "./vaginismus-reveal";

/**
 * Section 5 — The People Behind Your Care. `doctors-content.ts` maps
 * exactly one confirmed clinician to this slug: Dr. Adithi Nair, via her
 * own `relatedCareSlugs: ["vaginismus", "postpartum-care"]`. Her name, role
 * and portrait status are read directly from that single source of truth
 * rather than re-typed. No qualification (`credentials`) or biography is
 * confirmed for her anywhere in this project, so — unlike
 * `FertilityClinician`, which does have a confirmed `credentials` string to
 * show — that line is simply omitted here rather than shown as `undefined`
 * or invented. `PortraitPlaceholder` renders the same built-visual
 * placeholder every other person on this site uses until real photography
 * is approved (her `photo.src` is `null` today).
 */
export function VaginismusClinician() {
  const doctor = getDoctorBySlug(vaginismusClinician.doctorSlug);
  if (!doctor) return null;
  const doctorIndex = doctors.findIndex((d) => d.slug === doctor.slug);

  return (
    <section id="vaginismus-clinician" aria-labelledby="vaginismus-clinician-heading" className="relative isolate border-t border-[var(--color-border)] bg-paper section-pad">
      <VaginismusReveal className="container-birthwave grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
        <PortraitPlaceholder photo={doctor.photo} index={doctorIndex} className="max-w-sm" />

        <div className="max-w-xl">
          <p className="eyebrow">{vaginismusClinician.eyebrow}</p>
          <h2 id="vaginismus-clinician-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {vaginismusClinician.heading}
          </h2>

          <h3 className="mt-6 text-xl font-semibold text-ink">{doctor.name}</h3>
          {doctor.credentials ? <p className="mt-2 text-sm text-ink-soft">{doctor.credentials}</p> : null}
          <p className="mt-1 text-sm text-ink-soft">{doctor.role}</p>

          <p className="mt-6 border-l-2 border-terracotta pl-4 text-base leading-[var(--leading-relaxed)] text-ink-soft">{vaginismusClinician.philosophy}</p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href={vaginismusClinician.bookHref} variant="primary">
              {vaginismusClinician.bookLabel}
            </Button>
            <CtaLink href={vaginismusClinician.profileHref}>{vaginismusClinician.viewProfileLabel}</CtaLink>
          </div>
        </div>
      </VaginismusReveal>
    </section>
  );
}
