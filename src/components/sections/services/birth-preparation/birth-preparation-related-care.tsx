import { birthPrepRelatedCare } from "@/content/birth-preparation-landing-content";
import { BirthPrepReveal } from "./birth-preparation-reveal";
import { CtaLink } from "@/components/ui/cta-link";

/**
 * Section 11 — Related Care.
 */
export function BirthPrepRelatedCare() {
  return (
    <section id="birth-prep-related-care" aria-labelledby="birth-prep-related-care-heading" className="relative isolate border-t border-[var(--color-border)] bg-paper section-pad">
      <BirthPrepReveal className="container-birthwave">
        <p className="eyebrow">{birthPrepRelatedCare.eyebrow}</p>
        <h2 id="birth-prep-related-care-heading" className="mt-4 max-w-xl text-[clamp(1.6rem,1.3rem+1.4vw,2.4rem)] leading-[1.15] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {birthPrepRelatedCare.heading}
        </h2>

        <ul className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {birthPrepRelatedCare.services.map((service) => (
            <li key={service.href} className="border-t border-[var(--color-border)] pt-5">
              <CtaLink href={service.href}>{service.title}</CtaLink>
              <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{service.description}</p>
            </li>
          ))}
        </ul>
      </BirthPrepReveal>
    </section>
  );
}
