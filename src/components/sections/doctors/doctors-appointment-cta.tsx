import { doctorsAppointmentCta } from "@/content/doctors-content";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";

/**
 * Section 05 — Final Appointment CTA. This page's own warm close — not a
 * third copy of the homepage's Final CTA or About's own Appointment CTA
 * (both distinct sections, both untouched). No dark ink surface: that
 * tonal break stays reserved for the homepage's own Final CTA + footer,
 * per that section's own comment.
 */
export function DoctorsAppointmentCta() {
  return (
    <section
      id="doctors-appointment-cta"
      aria-labelledby="doctors-appointment-cta-heading"
      className="relative isolate bg-paper-dim py-(--space-section-sm)"
    >
      <div className="container-birthwave max-w-xl">
        <h2
          id="doctors-appointment-cta-heading"
          className="text-[clamp(2rem,1.6rem+1.8vw,2.85rem)] leading-[1.1] font-semibold text-ink"
        >
          {doctorsAppointmentCta.headingLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <p className="mt-5 text-lg leading-[var(--leading-relaxed)] text-ink-soft">
          {doctorsAppointmentCta.supporting}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Button href={doctorsAppointmentCta.primaryCta.href} variant="primary">
            {doctorsAppointmentCta.primaryCta.label}
          </Button>
          <CtaLink href={doctorsAppointmentCta.secondaryCta.href}>{doctorsAppointmentCta.secondaryCta.label}</CtaLink>
        </div>
      </div>
    </section>
  );
}
