import { CareServiceHero } from "@/components/sections/services/care-service-hero";
import { vaginismusHero, vaginismusImagery } from "@/content/pages/vaginismus";

export function VaginismusHero() {
  const image = vaginismusImagery.hero;

  return (
    <CareServiceHero
      id="vaginismus-hero"
      eyebrow={vaginismusHero.eyebrow}
      heading={vaginismusHero.heading}
      supporting={vaginismusHero.supportingHeadline}
      body={vaginismusHero.body}
      primaryCta={vaginismusHero.primaryCta}
      secondaryCta={vaginismusHero.secondaryCta}
      image={{ src: image.src, alt: image.alt, focalPoint: image.focalPoint }}
      disclosure="AI-generated illustration"
    />
  );
}
