import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { pregnancyLandingRelatedCare } from "@/content/pregnancy-antenatal-landing-content";
import { getServiceBySlug } from "@/content/services-content";
import { PregnancyReveal } from "./pregnancy-antenatal-reveal";

function getCategoryTheme(eyebrow: string) {
  const normalized = eyebrow.toLowerCase();
  if (normalized.includes("preparing")) {
    return {
      pillBg: "bg-[#F3E8E2]",
      pillText: "text-[#8A4737]",
      pillBorder: "border-[#CA9585]/35",
      dotColor: "bg-coral",
      accentGradient: "from-coral via-terracotta to-coral",
    };
  }
  if (normalized.includes("options")) {
    return {
      pillBg: "bg-[#FAF6F2]",
      pillText: "text-[#352B29]",
      pillBorder: "border-[#CA9585]/35",
      dotColor: "bg-[#CA9585]",
      accentGradient: "from-terracotta via-coral to-terracotta",
    };
  }
  return {
    pillBg: "bg-[#F3E8E2]",
    pillText: "text-[#8A4737]",
    pillBorder: "border-[#CA9585]/35",
    dotColor: "bg-coral",
    accentGradient: "from-coral via-[#CA9585] to-coral",
  };
}

/**
 * Related Care — dedicated landing page section redesigned with The Birthwave brand palette:
 * - Warm Ivory (#FAF6F2) and Soft Rose (#F3E8E2) canvas with ambient Dusty Rose glows.
 * - Tactile, premium cards with architectural rounding, subtle terracotta borders,
 *   warm rose category pills, and animated circular arrow buttons.
 * - Balanced layout: 2x2 grid for first 4 services, plus a featured full-width card
 *   for the 5th service with a responsive horizontal flow.
 */
export function PregnancyAntenatalRelatedCare() {
  const relatedServices = pregnancyLandingRelatedCare.slugs
    .map((slug) => getServiceBySlug(slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  return (
    <section
      id="pregnancy-antenatal-related-care"
      aria-labelledby="pregnancy-antenatal-related-care-heading"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#FAF6F2_0%,#F3E8E2_45%,#FAF6F2_100%)] py-20 sm:py-28"
    >
      {/* Ambient Brand Color Halos */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/4 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(202,149,133,0.2)_0%,transparent_70%)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-1/4 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(248,131,121,0.15)_0%,transparent_70%)] blur-2xl"
      />

      <PregnancyReveal className="container-birthwave">
        {/* Header Block */}
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#CA9585]/35 bg-[#F3E8E2] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#8A4737]">
            <span className="size-1.5 rounded-full bg-coral" aria-hidden="true" />
            {pregnancyLandingRelatedCare.eyebrow}
          </span>

          <h2
            id="pregnancy-antenatal-related-care-heading"
            className="mt-4 text-[clamp(1.9rem,1.5rem+1.8vw,2.8rem)] font-semibold leading-[1.12] tracking-[var(--tracking-tight)] text-[#352B29]"
          >
            {pregnancyLandingRelatedCare.heading}
          </h2>

          <p className="mt-3 text-base leading-relaxed text-[#746764]">
            {pregnancyLandingRelatedCare.note}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {relatedServices.map((service, index) => {
            const theme = getCategoryTheme(service.eyebrow);
            const isFeatured = index === 4; // 5th card spans full width for balanced rhythm

            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-[#CA9585]/30 bg-white/85 p-7 sm:p-8 backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#CA9585] hover:bg-white hover:shadow-[0_16px_36px_-8px_rgba(202,149,133,0.22)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#352B29] ${
                  isFeatured ? "sm:col-span-2 sm:flex-row sm:items-center sm:gap-8" : ""
                }`}
              >
                {/* Top Subtle Brand Gradient Stripe on Hover */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${theme.accentGradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />

                <div className={isFeatured ? "max-w-2xl" : ""}>
                  {/* Category Pill */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wider uppercase ${theme.pillBg} ${theme.pillText} ${theme.pillBorder}`}
                    >
                      <span className={`size-1.5 rounded-full ${theme.dotColor}`} aria-hidden="true" />
                      {service.eyebrow}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className="mt-3.5 font-display text-xl font-semibold leading-snug text-[#352B29] transition-colors duration-200 group-hover:text-coral sm:text-2xl">
                    {service.name}
                  </h3>

                  {/* Service Description */}
                  <p className="mt-2 text-sm leading-relaxed text-[#746764]">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Footer / Action Indicator */}
                <div
                  className={`mt-6 flex items-center justify-between border-t border-[#CA9585]/15 pt-4 transition-colors duration-200 ${
                    isFeatured
                      ? "sm:mt-0 sm:shrink-0 sm:border-t-0 sm:pt-0"
                      : "w-full"
                  }`}
                >
                  <span className="text-xs font-semibold text-[#8A4737] transition-colors duration-200 group-hover:text-coral">
                    Explore {service.name}
                  </span>

                  <span
                    aria-hidden="true"
                    className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#CA9585]/20 bg-[#F3E8E2] text-[#352B29] shadow-xs transition-all duration-300 group-hover:scale-105 group-hover:border-coral group-hover:bg-coral group-hover:text-white"
                  >
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </PregnancyReveal>
    </section>
  );
}
