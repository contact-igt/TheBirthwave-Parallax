import { servicesFinalCta } from "@/content/services-content";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";

/**
 * Section 06 — Final Appointment CTA. This page's own warm close, the
 * same restrained "heading + supporting line + two CTAs" shape
 * `doctors-appointment-cta.tsx` already establishes — not a third copy
 * of the homepage's own Final CTA or About's own Appointment CTA (both
 * distinct sections, both untouched). Resolves to the same confirmed
 * `/#connect` destination as every other appointment CTA on the site —
 * no fabricated contact details or booking flow.
 */
export function ServicesFinalCta() {
  return (
    <section aria-labelledby="services-final-cta-heading" className="relative isolate bg-paper-dim py-(--space-section-sm)">
      <div className="container-birthwave max-w-xl">
        <h2
          id="services-final-cta-heading"
          className="text-[clamp(2rem,1.6rem+1.8vw,2.85rem)] leading-[1.1] font-semibold text-ink"
        >
          {servicesFinalCta.headingLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Button href={servicesFinalCta.primaryCta.href} variant="primary">
            {servicesFinalCta.primaryCta.label}
          </Button>
          <CtaLink href={servicesFinalCta.secondaryCta.href}>{servicesFinalCta.secondaryCta.label}</CtaLink>
        </div>
      </div>
    </section>
  );
}
