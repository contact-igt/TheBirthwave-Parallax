import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { careDiscovery } from "@/content/site-content";
import { Button } from "@/components/ui/button";
import { AnimatedContent } from "@/components/ui/animations/animated-content";
import { CareWaveBackground } from "@/components/ui/backgrounds/care-wave-background";

/**
 * Service Overview Section
 *
 * Requirements:
 * - Use the heading: "Find the care you need."
 * - Preserve all six pathways and their existing destinations.
 * - Reduce excessive card height and padding on mobile.
 * - Keep links prominent and easy to scan.
 * - Replace all serif styling; Poppins for headings, Plus Jakarta Sans for body.
 */
export function CareDiscoverySection() {
  const categoryIndices = [
    "01 · WELLNESS",
    "02 · ANTENATAL",
    "03 · PREPARATION",
    "04 · LABOUR & BIRTH",
    "05 · POSTPARTUM",
    "06 · PAEDIATRIC",
  ];

  return (
    <section
      id="care-discovery"
      aria-labelledby="care-discovery-heading"
      className="relative isolate overflow-hidden bg-[#F3E8E2] py-16 sm:py-20 lg:py-28"
    >
      {/* Animated flowing care waves & edge washes */}
      <CareWaveBackground preset="services" />

      {/* Gentle gradient blend at top & bottom for seamless transitions */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#FAF6F2] to-transparent opacity-80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#FAF6F2] to-transparent opacity-80"
      />

      <div className="container-birthwave relative z-10">
        {/* Section Heading Block */}
        <div className="mx-auto max-w-[48rem] text-center">
          <div className="inline-flex items-center justify-center gap-2">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-terracotta"
            />
            <p className="eyebrow mx-auto !tracking-[0.16em] uppercase text-terracotta-deep">
              CARE OVERVIEW
            </p>
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-terracotta"
            />
          </div>
          <h2
            id="care-discovery-heading"
            className="mt-3.5 text-balance font-display text-[clamp(2.3rem,1.9rem+2.4vw,3.75rem)] font-semibold leading-[1.08] tracking-[var(--tracking-tight)] text-ink"
          >
            Find the care you need.
          </h2>
          <p className="mt-3.5 font-body text-base leading-[1.65] text-ink-soft sm:text-lg">
            Explore dedicated care pathways tailored to each stage of your journey.
          </p>
        </div>

        {/* 3-Column × 2-Row Editorial Pathways (compact & mobile-refined) */}
        <ul className="mx-auto mt-12 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-7 list-none">
          {careDiscovery.services.map((service, index) => (
            <li key={service.title} className="h-full">
              <AnimatedContent
                distance={14}
                duration={0.45}
                ease="power2.out"
                threshold={0.1}
                rowStagger={0.07}
                className="group relative flex h-full flex-col justify-between rounded-xl sm:rounded-2xl border border-ink/8 bg-paper/60 p-5 sm:p-6 lg:p-7 shadow-xs transition-all duration-300 ease-[var(--ease-signature)] hover:border-terracotta/40 hover:bg-white hover:shadow-sm"
              >
                <div>
                  {/* Category Index & Micro Header */}
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xs font-semibold tracking-[0.14em] text-terracotta-deep/80 transition-colors duration-300 group-hover:text-terracotta">
                      {categoryIndices[index] || `0${index + 1}`}
                    </span>
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 rounded-full bg-terracotta/40 transition-colors duration-300 group-hover:bg-terracotta"
                    />
                  </div>

                  {/* Pathway Title */}
                  <h3 className="mt-3 font-display text-[clamp(1.15rem,1.05rem+0.4vw,1.35rem)] font-semibold leading-[1.25] text-ink transition-colors duration-300 group-hover:text-ink">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2.5 font-body text-sm sm:text-[0.9375rem] leading-[1.6] text-ink-soft transition-colors duration-300 group-hover:text-ink/90">
                    {service.description}
                  </p>
                </div>

                {/* Pathway Link — prominent and easy to scan */}
                <div className="mt-5 pt-3.5 border-t border-ink/6">
                  <Link
                    href={service.cta.href}
                    className="inline-flex items-center gap-1.5 font-body text-sm font-semibold !text-terracotta-deep transition-colors duration-200 group-hover:!text-ink"
                  >
                    <span className="border-b border-current/30 pb-0.5 transition-colors group-hover:border-current">
                      {service.cta.label}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3.5 transition-transform duration-200 ease-[var(--ease-signature)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-x-0"
                    />
                  </Link>
                </div>
              </AnimatedContent>
            </li>
          ))}
        </ul>

        {/* View All Services CTA Button */}
        <div className="mt-12 flex justify-center sm:mt-14 lg:mt-16">
          <Button
            href={careDiscovery.viewAllCta.href}
            variant="ghost"
            className="border-ink/20 bg-paper/80 px-8 py-3.5 transition-all hover:border-ink hover:bg-paper"
          >
            {careDiscovery.viewAllCta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
