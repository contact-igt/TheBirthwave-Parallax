import { CareServiceHero } from "@/components/sections/services/care-service-hero";
import { pregnancyLandingHero } from "@/content/pregnancy-antenatal-landing-content";
import { servicesImagery } from "@/content/services-imagery";

export function PregnancyAntenatalHero() {
  const image = servicesImagery["pregnancy-antenatal-hero"];

  return (
    <CareServiceHero
      id="pregnancy-hero"
      eyebrow={pregnancyLandingHero.eyebrow}
      heading={pregnancyLandingHero.headingLines.join(" ")}
      supporting={pregnancyLandingHero.supportingLine}
      body={pregnancyLandingHero.body}
      primaryCta={pregnancyLandingHero.primaryCta}
      secondaryCta={pregnancyLandingHero.secondaryCta}
      image={{ src: image.src, alt: image.alt, objectPosition: "74% 14%" }}
      disclosure="AI-generated illustration"
      location={pregnancyLandingHero.location}
    />
  );
}
