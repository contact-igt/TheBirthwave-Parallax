import { vaginismusClinicians } from "@/content/vaginismus-landing-content";
import { getDoctorBySlug, doctors } from "@/content/doctors-content";
import { PortraitPlaceholder } from "@/components/ui/portrait-placeholder";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import { VaginismusReveal } from "./vaginismus-reveal";

/**
 * Section 7 — The People Behind Your Care.
 * 4-person multidisciplinary clinical team:
 * Dr. Santoshi Nandigam, Dr. Adithi Nair, Dr. Amudha Varshini, and Deepa.
 */
export function VaginismusClinician() {
  return (
    <section
      id="vaginismus-clinician"
      aria-labelledby="vaginismus-clinician-heading"
      className="relative isolate border-t border-[var(--color-border)] bg-paper section-pad"
    >
      <VaginismusReveal className="container-birthwave">
        <div className="max-w-3xl">
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

        {/* 4 Team Members Grid */}
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:gap-12">
          {vaginismusClinicians.team.map((member) => {
            const doctor = getDoctorBySlug(member.slug);
            const doctorIndex = doctor ? doctors.findIndex((d) => d.slug === doctor.slug) : 0;
            const photo = doctor ? doctor.photo : { src: null, alt: member.name, placeholderLabel: member.name };

            return (
              <div
                key={member.slug}
                className="flex flex-col justify-between rounded-xs border border-[var(--color-border)] bg-[var(--vaginismus-rose-wash)]/30 p-6 sm:p-8"
              >
                <div>
                  <div className="max-w-[220px]">
                    <PortraitPlaceholder photo={photo} index={doctorIndex} className="w-full" />
                  </div>

                  <h3 className="mt-6 text-xl font-semibold text-ink sm:text-2xl">
                    {member.name}
                  </h3>

                  {member.credentials ? (
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[var(--tracking-wider)] text-terracotta-deep">
                      {member.credentials}
                    </p>
                  ) : null}

                  <p className="mt-1 font-body text-sm font-medium text-ink-soft">
                    {member.role}
                  </p>

                  <div className="mt-5 space-y-3 text-sm leading-[var(--leading-relaxed)] text-ink-soft">
                    {member.description.split("\n\n").map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                  </div>
                </div>

                <div className="mt-6 border-t border-[var(--color-border)] pt-4">
                  <CtaLink href={member.cta.href}>{member.cta.label}</CtaLink>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing note & CTA */}
        <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-xs border border-[var(--color-border)] bg-paper p-8 sm:flex-row sm:items-center">
          <p className="max-w-2xl text-base leading-[var(--leading-relaxed)] text-ink">
            {vaginismusClinicians.closing}
          </p>
          <Button href={vaginismusClinicians.cta.href} variant="primary" className="shrink-0">
            {vaginismusClinicians.cta.label}
          </Button>
        </div>
      </VaginismusReveal>
    </section>
  );
}
