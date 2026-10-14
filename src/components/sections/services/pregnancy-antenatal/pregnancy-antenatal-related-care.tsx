import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { pregnancyLandingRelatedCare } from "@/content/pregnancy-antenatal-landing-content";
import { PregnancyReveal } from "./pregnancy-antenatal-reveal";
import { Button } from "@/components/ui/button";

/**
 * Section 10 — Related Care.
 * 8 interrelated services supporting pregnancy, childbirth preparation, and postpartum recovery.
 */
export function PregnancyAntenatalRelatedCare() {
  return (
    <section
      id="pregnancy-antenatal-related-care"
      aria-labelledby="pregnancy-antenatal-related-care-heading"
      className="relative isolate overflow-hidden bg-white border-t border-[#CA9585]/30 py-20 sm:py-28"
    >
      {/* Ambient Brand Color Halos */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/4 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(202,149,133,0.15)_0%,transparent_70%)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-1/4 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(93,174,219,0.12)_0%,transparent_70%)] blur-2xl"
      />

      <PregnancyReveal className="container-birthwave">
        {/* Header Block */}
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#CA9585]/40 bg-[#FFF1EC] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#7A4F44]">
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
            {pregnancyLandingRelatedCare.supportingLine}
          </p>
        </div>

        {/* 8 Related Services Grid */}
        <div className="mt-12 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pregnancyLandingRelatedCare.services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#CA9585]/25 bg-[#FFF8F6] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#CA9585] hover:bg-white hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#352B29]"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-body text-base font-semibold text-[#352B29] group-hover:text-coral transition-colors">
                    {service.title.replace(/\s*↗$/, "")}
                  </h3>
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#FFF1EC] text-[#7A4F44] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-coral group-hover:text-white">
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </div>
                </div>

                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#746764]">
                  {service.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <Button href={pregnancyLandingRelatedCare.cta.href} variant="ghost" withArrow={true}>
            {pregnancyLandingRelatedCare.cta.label.replace(/\s*↗$/, "")}
          </Button>
        </div>
      </PregnancyReveal>
    </section>
  );
}
