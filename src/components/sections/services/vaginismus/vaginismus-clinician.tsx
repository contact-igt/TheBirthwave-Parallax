import { vaginismusClinicians } from "@/content/pages/vaginismus";
import { getDoctorBySlug, doctors } from "@/content/doctors-content";
import { PortraitPlaceholder } from "@/components/ui/portrait-placeholder";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import { VaginismusReveal } from "./vaginismus-reveal";

/**
 * Section 7 — The People Behind Your Care.
 * 4-person multidisciplinary clinical team:
 * Dr. Santoshi Nandigam, Dr. Adithi Nair, Dr. Amudha Varshini, and Deepa.
 *
 * Layout redesign: a full-width spotlight card for each clinician
 * (portrait left, credentials + description right) on desktop —
 * replacing the symmetric 2×2 card grid. This mirrors the premium
 * doctor-spotlight treatment on the Pregnancy & Antenatal Care page
 * and gives each care professional their own editorial presence.
 */
export function VaginismusClinician() {
  return (
    <section
      id="vaginismus-clinician"
      aria-labelledby="vaginismus-clinician-heading"
      className="relative isolate border-t border-[var(--color-border)] bg-paper section-pad"
    >
      <VaginismusReveal className="container-birthwave">
        {/* Section header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <p className="eyebrow">{vaginismusClinicians.eyebrow}</p>
          <h2
            id="vaginismus-clinician-heading"
            className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink"
          >
            {vaginismusClinicians.heading}
          </h2>
          <p className="mt-4 text-base leading-[var(--leading-relaxed)] text-ink-soft">
            {vaginismusClinicians.intro}
          </p>
        </div>

        {/* Clinician spotlight cards — stacked vertically */}
        <div className="space-y-6">
          {vaginismusClinicians.team.map((member, memberIdx) => {
            const doctor = getDoctorBySlug(member.slug);
            const doctorIndex = doctor
              ? doctors.findIndex((d) => d.slug === doctor.slug)
              : memberIdx;
            const photo = doctor
              ? doctor.photo
              : { src: null, alt: member.name, placeholderLabel: member.name };

            return (
              <article
                key={member.slug}
                className="overflow-hidden rounded-xs border border-[var(--color-border)] bg-[var(--vaginismus-rose-wash)]/30 grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr]"
              >
                {/* Portrait */}
                <div className="h-64 sm:h-72 lg:h-auto bg-paper-dim overflow-hidden">
                  <div className="h-full w-full [&>*]:h-full [&>*]:w-full [&>*]:rounded-none">
                    <PortraitPlaceholder
                      photo={photo}
                      index={doctorIndex}
                      className="h-full w-full rounded-none object-cover"
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col justify-between p-7 sm:p-8 lg:p-10">
                  <div>
                    {/* Role tag */}
                    <div className="inline-flex items-center gap-2 mb-4">
                      <span
                        aria-hidden="true"
                        className="size-1.5 rounded-full bg-terracotta-deep"
                      />
                      <span className="font-body text-[0.6875rem] font-semibold uppercase tracking-[var(--tracking-wider)] text-terracotta-deep">
                        {member.role}
                      </span>
                    </div>

                    <h3 className="text-2xl font-semibold text-ink sm:text-3xl">
                      {member.name}
                    </h3>

                    {member.credentials ? (
                      <p className="mt-1 font-body text-xs font-semibold uppercase tracking-[var(--tracking-wider)] text-ink-soft">
                        {member.credentials}
                      </p>
                    ) : null}

                    <div className="mt-5 space-y-3 text-sm leading-[var(--leading-relaxed)] text-ink-soft">
                      {member.description.split("\n\n").map((para, pIdx) => (
                        <p key={pIdx}>{para}</p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-7 border-t border-[var(--color-border)] pt-5">
                    <CtaLink href={member.cta.href}>{member.cta.label}</CtaLink>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Closing note & CTA */}
        <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-xs border border-[var(--color-border)] bg-[var(--vaginismus-sky-wash)] p-8 sm:flex-row sm:items-center">
          <p className="max-w-2xl text-base leading-[var(--leading-relaxed)] text-ink">
            {vaginismusClinicians.closing}
          </p>
          <Button
            href={vaginismusClinicians.cta.href}
            variant="primary"
            className="shrink-0"
          >
            {vaginismusClinicians.cta.label}
          </Button>
        </div>
      </VaginismusReveal>
    </section>
  );
}
