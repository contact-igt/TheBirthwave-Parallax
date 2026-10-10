import { fertilityRelatedCare } from "@/content/fertility-preconception-landing-content";
import { getServiceBySlug } from "@/content/services-content";
import { CtaLink } from "@/components/ui/cta-link";

/**
 * Related care — compact and secondary: a heading and plain text links.
 * Names and hrefs are read from `services-content.ts`, never retyped, so each
 * label always matches its destination page's current title.
 */
export function FertilityRelatedCare() {
  const relatedServices = fertilityRelatedCare.slugs
    .map((slug) => getServiceBySlug(slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  return (
    <section id="fertility-related-care" aria-labelledby="fertility-related-care-heading" className="relative isolate scroll-mt-[var(--header-height)] bg-paper py-14 sm:py-16">
      <div className="container-birthwave">
        <p className="eyebrow">{fertilityRelatedCare.eyebrow}</p>
        <h2 id="fertility-related-care-heading" className="mt-3 max-w-xl text-xl leading-snug font-semibold text-ink">
          {fertilityRelatedCare.heading}
        </h2>

        <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-2">
          {relatedServices.map((service) => (
            <li key={service.slug}>
              <CtaLink href={`/services/${service.slug}`}>{service.name}</CtaLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
