import Image from "next/image";
import { birthPrepTeam } from "@/content/birth-preparation-landing-content";
import { getDoctorBySlug, doctors } from "@/content/doctors-content";
import { PortraitPlaceholder } from "@/components/ui/portrait-placeholder";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import { BirthPrepReveal } from "./birth-preparation-reveal";

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
      className="relative isolate overflow-hidden bg-paper section-pad"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[url('/images/services/birth-prep-team-background-v1.jpg')] bg-cover bg-center" />

      <BirthPrepReveal className="container-birthwave relative z-10">
        <div className="max-w-3xl">
          <p className="eyebrow">{birthPrepTeam.eyebrow}</p>
          <h2
            id="birth-prep-team-heading"
            className="mt-4 text-[clamp(2.1rem,1.5rem+2.5vw,3.35rem)] leading-[1.12] font-semibold tracking-[var(--tracking-tight)] text-ink"
          >
            {birthPrepTeam.heading}
          </h2>
          <p className="mt-4 text-base leading-[var(--leading-relaxed)] text-ink-soft sm:text-lg">
            {birthPrepTeam.intro}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {birthPrepTeam.members.map((member) => {
            const doctor = getDoctorBySlug(member.slug);
            const doctorIndex = doctor ? doctors.findIndex((d) => d.slug === doctor.slug) : -1;
            const photo = doctor ? doctor.photo : null;

            return (
              <div
                key={member.slug}
                className="group flex flex-col justify-between rounded-2xl border border-[color-mix(in_srgb,var(--color-terracotta)_20%,var(--color-border))] bg-white/90 p-5 sm:p-6 backdrop-blur-sm shadow-[0_8px_25px_-12px_rgba(75,47,38,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-terracotta/40 hover:bg-white hover:shadow-[0_18px_36px_-12px_rgba(75,47,38,0.22)]"
              >
                <div>
                  {photo ? (
                    <div className="overflow-hidden rounded-tl-panel rounded-tr-sm rounded-br-sm rounded-bl-sm bg-paper-dim shadow-xs">
                      <PortraitPlaceholder
                        photo={photo}
                        index={doctorIndex}
                        className="w-full aspect-[4/5] object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                      />
                    </div>
                  ) : (
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-tl-panel rounded-tr-sm rounded-br-sm rounded-bl-sm bg-paper-dim shadow-xs">
                      <Image
                        src="/images/doctors/dr-amudha-varshini.jpg"
                        alt="Dr. Amudha Varshini, prenatal and postpartum yoga specialist"
                        fill
                        style={{ objectPosition: "50% 30%" }}
                        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                      />
                    </div>
                  )}

                  {/* Name with fixed vertical baseline */}
                  <div className="mt-5 min-h-[3rem] flex items-center">
                    <h3 className="font-body text-[1.125rem] font-semibold leading-snug tracking-tight text-ink">
                      {member.name}
                    </h3>
                  </div>

                  {/* Credentials with unified min-height */}
                  <div className="mt-2 min-h-[2.25rem] flex items-center">
                    {member.credentials ? (
                      <p className="text-[0.72rem] font-semibold uppercase tracking-wider text-terracotta-deep leading-tight">
                        {member.credentials}
                      </p>
                    ) : null}
                  </div>

                  {/* Role with unified min-height */}
                  <div className="mt-1.5 min-h-[2rem] flex items-center">
                    <p className="font-body text-xs font-medium text-ink-soft leading-tight">
                      {member.role}
                    </p>
                  </div>

                  {/* Biography with refined divider and breathing room */}
                  <div className="mt-4 pt-3.5 border-t border-[color-mix(in_srgb,var(--color-terracotta)_14%,var(--color-border))]">
                    <p className="text-sm leading-[1.65] text-ink-soft">
                      {member.bio}
                    </p>
                  </div>
                </div>

                {/* Bottom CTA Link */}
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
