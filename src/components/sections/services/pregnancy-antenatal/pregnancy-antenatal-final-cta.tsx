import Image from "next/image";
import { pregnancyLandingFinalCta } from "@/content/pregnancy-antenatal-landing-content";
import { servicesImagery } from "@/content/services-imagery";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import { PregnancyReveal } from "./pregnancy-antenatal-reveal";

/**
 * Section 10 — Final CTA: Emotionally resonant close before the footer.
 *
 * Warm dusty-rose into rich espresso backdrop with maternal fabric atmosphere,
 * reassuring headline, and smooth transition into the footer.
 */
export function PregnancyAntenatalFinalCta() {
  const visual = servicesImagery["pregnancy-antenatal-final-cta"];

  return (
    <section
      id="pregnancy-final-cta"
      aria-labelledby="pregnancy-final-cta-heading"
      className="relative isolate overflow-hidden bg-[#352B29] text-[#FAF6F2] py-20 sm:py-28 lg:py-32"
    >
      {/* Background Maternity Fabric Visual */}
      <div className="pointer-events-none absolute inset-0 -z-20 opacity-40">
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: visual.objectPosition }}
        />
      </div>

      {/* Warm Dusty-Rose / Espresso Gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_40%,rgba(202,149,133,0.3)_0%,transparent_65%),linear-gradient(180deg,rgba(53,43,41,0.7)_0%,rgba(53,43,41,0.92)_60%,#241a17_100%)]"
      />

      {/* Gentle top transition from preceding light section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-[linear-gradient(180deg,rgba(250,246,242,0.1)_0%,transparent_100%)]"
      />

      <PregnancyReveal className="container-birthwave relative z-10 max-w-4xl text-center">
        <p className="eyebrow font-semibold tracking-widest" style={{ color: "#F88379" }}>
          {pregnancyLandingFinalCta.eyebrow}
        </p>

        <h2
          id="pregnancy-final-cta-heading"
          className="mt-5 text-[clamp(2.4rem,1.8rem+2.8vw,4.2rem)] font-semibold leading-[1.08] tracking-[var(--tracking-tight)]"
          style={{ color: "#FAF6F2" }}
        >
          {pregnancyLandingFinalCta.heading}
        </h2>

        <p
          className="mx-auto mt-6 max-w-2xl text-lg leading-[var(--leading-relaxed)] sm:text-xl"
          style={{ color: "rgba(250, 246, 242, 0.9)" }}
        >
          {pregnancyLandingFinalCta.supporting}
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <Button href={pregnancyLandingFinalCta.primaryCta.href} variant="primary">
            {pregnancyLandingFinalCta.primaryCta.label}
          </Button>
          <CtaLink href={pregnancyLandingFinalCta.secondaryCta.href} className="text-[#FAF6F2] hover:text-coral">
            {pregnancyLandingFinalCta.secondaryCta.label}
          </CtaLink>
        </div>

        {/* Reassurance Benefit Badges */}
        <div
          className="mt-12 flex flex-wrap items-center justify-center gap-6 border-t border-white/15 pt-8 text-xs font-medium tracking-wide"
          style={{ color: "rgba(250, 246, 242, 0.85)" }}
        >
          {pregnancyLandingFinalCta.benefits.map((benefit) => (
            <span key={benefit} className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-coral" aria-hidden="true" />
              <span>{benefit}</span>
            </span>
          ))}
        </div>
      </PregnancyReveal>

      {/* Seamless footer transition: gentle blend into site-footer #241a17 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-[linear-gradient(0deg,#241a17_0%,transparent_100%)]"
      />
    </section>
  );
}
