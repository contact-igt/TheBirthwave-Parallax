import { CareServiceHero } from "@/components/sections/services/care-service-hero";
import { gynaecologyHero, gynaecologyImagery } from "@/content/pages/gynaecology";

export function GynaecologyHero() {
  const image = gynaecologyImagery.hero;

  return (
    <CareServiceHero
      id="gynaecology-hero"
      eyebrow={gynaecologyHero.eyebrow}
      heading={gynaecologyHero.heading}
      supporting={gynaecologyHero.supportingHeadline}
      body={gynaecologyHero.body}
      primaryCta={gynaecologyHero.primaryCta}
      secondaryCta={gynaecologyHero.secondaryCta}
      image={{ src: image.src, alt: image.alt, focalPoint: image.focalPoint }}
      disclosure="AI-generated illustration"
    />
  );
}
