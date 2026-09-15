import { aboutAppointmentCta } from "@/content/about-content";
import { Button } from "@/components/ui/button";

// One atmospheric wash (brand hues only), not a flat color band — echoes
// the cinematic canvas's own atmosphere at the top of the page without
// repeating it exactly, so the page's close rhymes with its opening.
const CTA_ATMOSPHERE = [
  "radial-gradient(60% 70% at 85% 15%, color-mix(in srgb, var(--color-coral) 22%, transparent) 0%, transparent 70%)",
  "radial-gradient(55% 60% at 10% 90%, color-mix(in srgb, var(--color-terracotta) 26%, transparent) 0%, transparent 72%)",
  "linear-gradient(to bottom, var(--color-paper) 0%, var(--color-paper-dim) 30%, var(--color-paper-dim) 100%)",
].join(", ");

/**
 * Section 09 — Final Appointment CTA, rebuilt with one atmospheric visual
 * wash behind an enlarged statement (visual architecture rework) — still
 * deliberately simpler than the homepage's own Final CTA (no photograph,
 * no parallax, one action) and still no dark-ink surface (that tonal
 * break stays reserved for the homepage's Final CTA + footer).
 */
export function AboutAppointmentCta() {
  return (
    <section
      id="about-appointment-cta"
      aria-labelledby="about-appointment-cta-heading"
      data-about-scene="appointment-cta"
      className="relative isolate overflow-hidden py-(--space-section)"
      style={{ backgroundImage: CTA_ATMOSPHERE }}
    >
      <div className="container-birthwave max-w-2xl">
        <h2
          id="about-appointment-cta-heading"
          className="text-[clamp(2.75rem,2rem+3.6vw,4.5rem)] leading-[1.04] font-semibold tracking-[var(--tracking-tight)] text-ink"
        >
          {aboutAppointmentCta.heading}
        </h2>
        <p className="mt-6 max-w-lg text-xl leading-[var(--leading-relaxed)] text-ink-soft">
          {aboutAppointmentCta.supporting}
        </p>
        <div className="mt-10">
          <Button href={aboutAppointmentCta.primaryCta.href} variant="primary">
            {aboutAppointmentCta.primaryCta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
