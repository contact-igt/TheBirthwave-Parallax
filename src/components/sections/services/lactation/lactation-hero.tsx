import { CareServiceHero } from "@/components/sections/services/care-service-hero";
import { lactationHero, lactationImagery } from "@/content/pages/lactation";

export function LactationHero() {
  const image = lactationImagery.hero;

  return (
    <CareServiceHero
      id="lactation-hero"
      eyebrow={lactationHero.eyebrow}
      heading={lactationHero.heading}
      supporting={lactationHero.supportingHeadline}
      body={[lactationHero.body, lactationHero.bodySecondary]}
      primaryCta={lactationHero.primaryCta}
      secondaryCta={lactationHero.secondaryCta}
      image={{ src: image.src, alt: image.alt, focalPoint: image.focalPoint }}
      disclosure="AI-generated illustration"
    />
  );
}
