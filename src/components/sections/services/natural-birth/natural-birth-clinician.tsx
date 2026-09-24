import { naturalBirthClinician } from "@/content/natural-birth-landing-content";
import { doctors } from "@/content/doctors-content";
import { PortraitPlaceholder } from "@/components/ui/portrait-placeholder";
import { Button } from "@/components/ui/button";
import { NaturalBirthReveal } from "./natural-birth-reveal";

/**
 * Section 07 — Care Team. Unlike `vbac-clinician.tsx`'s deliberately
 * neutral no-name placeholder (no confirmed VBAC-specific assignment
 * exists), this page has one directly confirmed, on-topic identity: the
 * Founder's own `doctors-content.ts` record already carries "Natural
 * Birth & VBAC Specialist" as part of her confirmed `specialFocus`. Every
 * field below (name, role, credentials, specialFocus, photo) is read
 * live from that single source of truth, never re-typed here — nothing
 * invented (no experience years, birth counts, success rates or hospital
 * affiliation).
 */
export function NaturalBirthClinician() {
  const founder = doctors.find((doctor) => doctor.team === "founder");
  if (!founder) return null;

  return (
    <section id="natural-birth-clinician" aria-labelledby="natural-birth-clinician-heading" className="relative isolate border-t border-[var(--color-border)] bg-paper section-pad">
      <NaturalBirthReveal className="container-birthwave grid gap-10 lg:grid-cols-[0.7fr_1fr] lg:items-center lg:gap-16">
        <PortraitPlaceholder photo={founder.photo} className="max-w-sm" />

        <div className="max-w-xl">
          <p className="eyebrow">{naturalBirthClinician.eyebrow}</p>
          <h2
            id="natural-birth-clinician-heading"
            className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink"
          >
            {naturalBirthClinician.heading}
          </h2>

          <h3 className="mt-6 text-xl font-semibold text-ink">{founder.name}</h3>
          <p className="mt-1 text-base text-ink-soft">{founder.role}</p>
          {founder.credentials ? <p className="mt-2 font-medium text-terracotta-deep">{founder.credentials}</p> : null}
          {founder.specialFocus ? <p className="mt-2 text-base text-ink-soft">{founder.specialFocus}</p> : null}

          <div className="mt-8">
            <Button href={naturalBirthClinician.cta.href} variant="primary">
              {naturalBirthClinician.cta.label}
            </Button>
          </div>
        </div>
      </NaturalBirthReveal>
    </section>
  );
}
