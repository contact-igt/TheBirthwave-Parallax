import { birthPrepRelatedCare } from "@/content/birth-preparation-landing-content";
import { getServiceBySlug } from "@/content/services-content";
import { BirthPrepReveal } from "./birth-preparation-reveal";
import { CtaLink } from "@/components/ui/cta-link";

/**
 * Section 11 — Related Care. A restrained group of links to four
 * EXISTING, separate services — names/slugs/hrefs all read from
 * `services-content.ts` rather than re-typed, so this can never drift
 * from the real, confirmed 01–11 list. Explicitly not another large image
 * gallery, and explicitly not framed as inclusions of this page's own
 * programme (see `note` below).
 */
export function BirthPrepRelatedCare() {
  const relatedServices = birthPrepRelatedCare.slugs
    .map((slug) => getServiceBySlug(slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  return (
    <section id="birth-prep-related-care" aria-labelledby="birth-prep-related-care-heading" className="relative isolate border-t border-[var(--color-border)] bg-paper section-pad">
      <BirthPrepReveal className="container-birthwave">
        <p className="eyebrow">{birthPrepRelatedCare.eyebrow}</p>
        <h2 id="birth-prep-related-care-heading" className="mt-4 max-w-xl text-[clamp(1.6rem,1.3rem+1.4vw,2.4rem)] leading-[1.15] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {birthPrepRelatedCare.heading}
        </h2>
        <p className="mt-3 max-w-[52ch] text-sm text-ink-soft">{birthPrepRelatedCare.note}</p>

        <ul className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {relatedServices.map((service) => (
            <li key={service.slug} className="border-t border-[var(--color-border)] pt-4">
              <CtaLink href={`/services/${service.slug}`}>{service.name}</CtaLink>
            </li>
          ))}
        </ul>
      </BirthPrepReveal>
    </section>
  );
}
