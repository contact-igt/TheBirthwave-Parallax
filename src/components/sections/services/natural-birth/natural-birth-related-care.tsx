import { naturalBirthRelatedCare } from "@/content/natural-birth-landing-content";
import { NaturalBirthReveal } from "./natural-birth-reveal";
import { CtaLink } from "@/components/ui/cta-link";

/**
 * Section 12 — Connected Birth Care.
 */
export function NaturalBirthRelatedCare() {
  return (
    <section id="natural-birth-related-care" aria-labelledby="natural-birth-related-care-heading" className="relative isolate border-t border-[var(--color-border)] bg-paper section-pad">
      <NaturalBirthReveal className="container-birthwave">
        <p className="eyebrow">{naturalBirthRelatedCare.eyebrow}</p>
        <h2
          id="natural-birth-related-care-heading"
          className="mt-4 max-w-xl text-[clamp(1.6rem,1.3rem+1.4vw,2.4rem)] leading-[1.15] font-semibold tracking-[var(--tracking-tight)] text-ink"
        >
          {naturalBirthRelatedCare.heading}
        </h2>
        <p className="mt-3 max-w-[60ch] text-sm text-ink-soft">{naturalBirthRelatedCare.intro}</p>

        <ul className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {naturalBirthRelatedCare.services.map((service) => (
            <li key={service.href} className="border-t border-[var(--color-border)] pt-5">
              <CtaLink href={service.href}>{service.title}</CtaLink>
              <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{service.description}</p>
            </li>
          ))}
        </ul>
      </NaturalBirthReveal>
    </section>
  );
}
