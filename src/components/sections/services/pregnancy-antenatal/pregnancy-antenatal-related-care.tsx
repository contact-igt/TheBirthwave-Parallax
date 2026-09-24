import { pregnancyLandingRelatedCare } from "@/content/pregnancy-antenatal-landing-content";
import { getServiceBySlug } from "@/content/services-content";
import { PregnancyReveal } from "./pregnancy-antenatal-reveal";
import { CtaLink } from "@/components/ui/cta-link";

/**
 * Related Care — site-architecture audit: this page was the one dedicated
 * service landing page without a Related Care section (see
 * `pregnancyLandingRelatedCare`'s own comment). Same pattern every other
 * such section on the site already uses: a restrained group of links to
 * four EXISTING, separate services — names/slugs/hrefs all read from
 * `services-content.ts` rather than re-typed, so this can never drift
 * from the real, confirmed 01–11 list. Explicitly not framed as automatic
 * inclusions of antenatal care.
 */
export function PregnancyAntenatalRelatedCare() {
  const relatedServices = pregnancyLandingRelatedCare.slugs
    .map((slug) => getServiceBySlug(slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  return (
    <section
      id="pregnancy-antenatal-related-care"
      aria-labelledby="pregnancy-antenatal-related-care-heading"
      className="relative isolate border-t border-[var(--color-border)] bg-paper section-pad"
    >
      <PregnancyReveal className="container-birthwave">
        <p className="eyebrow">{pregnancyLandingRelatedCare.eyebrow}</p>
        <h2
          id="pregnancy-antenatal-related-care-heading"
          className="mt-4 max-w-xl text-[clamp(1.6rem,1.3rem+1.4vw,2.4rem)] leading-[1.15] font-semibold tracking-[var(--tracking-tight)] text-ink"
        >
          {pregnancyLandingRelatedCare.heading}
        </h2>
        <p className="mt-3 max-w-[52ch] text-sm text-ink-soft">{pregnancyLandingRelatedCare.note}</p>

        <ul className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {relatedServices.map((service) => (
            <li key={service.slug} className="border-t border-[var(--color-border)] pt-4">
              <CtaLink href={`/services/${service.slug}`}>{service.name}</CtaLink>
            </li>
          ))}
        </ul>
      </PregnancyReveal>
    </section>
  );
}
