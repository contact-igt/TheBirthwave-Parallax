import { CareServiceHero } from "@/components/sections/services/care-service-hero";
import { newbornHero, newbornImagery } from "@/content/pages/newborn-pediatric-care";

export function NewbornHero() {
  const image = newbornImagery.hero;

  return (
    <CareServiceHero
      id="newborn-hero"
      eyebrow={newbornHero.eyebrow}
      heading={newbornHero.heading}
      supporting={newbornHero.supportingHeadline}
      body={[newbornHero.body, newbornHero.bodySecondary]}
      primaryCta={newbornHero.primaryCta}
      secondaryCta={newbornHero.secondaryCta}
      image={{ src: image.src, alt: image.alt, focalPoint: image.focalPoint }}
      disclosure="AI-generated illustration"
    />
  );
}
