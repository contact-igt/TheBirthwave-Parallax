import { CareServiceHero } from "@/components/sections/services/care-service-hero";
import { fertilityHero, fertilityImagery } from "@/content/pages/fertility-preconception";

export function FertilityHero() {
  const image = fertilityImagery.hero;

  return (
    <CareServiceHero
      id="fertility-hero"
      eyebrow={fertilityHero.eyebrow}
      heading={fertilityHero.heading}
      supporting={fertilityHero.supportingLine}
      body={fertilityHero.body}
      primaryCta={fertilityHero.primaryCta}
      secondaryCta={fertilityHero.secondaryCta}
      image={{ src: image.src, alt: image.alt, objectPosition: image.objectPosition }}
      disclosure="AI-generated illustration"
      location={`${fertilityHero.location} · ${fertilityHero.locationNote}`}
    />
  );
}
