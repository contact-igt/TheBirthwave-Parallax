import { birthPrepTeam } from "@/content/birth-preparation-landing-content";
import { getDoctorBySlug, doctors } from "@/content/doctors-content";
import { PortraitPlaceholder } from "@/components/ui/portrait-placeholder";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import { BirthPrepReveal } from "./birth-preparation-reveal";
import { Flower2 } from "lucide-react";

/**
 * Section 07 — Meet the People Behind the Workshop.
 * Multidisciplinary team: Dr. Santoshi Nandigam, Sheethal Sathya, Dr. Deepika Sivathanu,
 * and Prenatal Yoga & Movement specialist facilitators.
 */
export function BirthPrepTeam() {
  return (
    <section
      id="birth-prep-team"
      aria-labelledby="birth-prep-team-heading"
      className="relative isolate border-t border-[var(--color-border)] bg-paper section-pad"
    >
      <BirthPrepReveal className="container-birthwave">
        <div className="max-w-3xl">
          <p className="eyebrow">{birthPrepTeam.eyebrow}</p>
          <h2
            id="birth-prep-team-heading"
            className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink"
          >
            {birthPrepTeam.heading}
          </h2>
          <p className="mt-4 text-base leading-[var(--leading-relaxed)] text-ink-soft">
            {birthPrepTeam.intro}
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {birthPrepTeam.members.map((member) => {
            const doctor = getDoctorBySlug(member.slug);
            const doctorIndex = doctor ? doctors.findIndex((d) => d.slug === doctor.slug) : -1;
            const photo = doctor ? doctor.photo : null;

            return (
              <div
                key={member.slug}
                className="flex flex-col justify-between rounded-xs border border-[var(--color-border)] bg-[var(--birth-prep-rose-wash)]/30 p-6"
              >
                <div>
                  {photo ? (
                    <div className="overflow-hidden rounded-tl-panel rounded-tr-xs rounded-br-xs rounded-bl-xs">
                      <PortraitPlaceholder photo={photo} index={doctorIndex} className="w-full aspect-[4/5]" />
                    </div>
                  ) : (
                    <div className="flex aspect-[4/5] w-full flex-col items-center justify-center rounded-tl-panel rounded-tr-xs rounded-br-xs rounded-bl-xs bg-paper-warm text-ink-soft">
                      <Flower2 className="size-12 text-terracotta" aria-hidden="true" />
                      <span className="mt-3 font-body text-xs font-semibold tracking-wider uppercase text-terracotta-deep">
                        Yoga & Movement
                      </span>
                    </div>
                  )}

                  <h3 className="mt-5 text-lg font-semibold text-ink">{member.name}</h3>

                  {member.credentials ? (
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[var(--tracking-wider)] text-terracotta-deep">
                      {member.credentials}
                    </p>
                  ) : null}

                  <p className="mt-1 font-body text-xs font-medium text-ink-soft">{member.role}</p>

                  <p className="mt-4 text-sm leading-[var(--leading-relaxed)] text-ink-soft">
                    {member.bio}
                  </p>
                </div>

                <div className="mt-6 border-t border-[var(--color-border)] pt-4">
                  <CtaLink href={member.cta.href}>{member.cta.label}</CtaLink>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex justify-start">
          <Button href={birthPrepTeam.closingCta.href} variant="ghost">
            {birthPrepTeam.closingCta.label}
          </Button>
        </div>
      </BirthPrepReveal>
    </section>
  );
}
