import { CareServiceHero } from "@/components/sections/services/care-service-hero";
import { naturalBirthHero, naturalBirthImagery } from "@/content/pages/natural-birth";

export function NaturalBirthHero() {
  const image = naturalBirthImagery.hero;

  return (
    <CareServiceHero
      id="natural-birth-hero"
      eyebrow={naturalBirthHero.eyebrow}
      heading={naturalBirthHero.heading}
      supporting={naturalBirthHero.supportingHeadline}
      body={naturalBirthHero.body}
      primaryCta={naturalBirthHero.primaryCta}
      secondaryCta={naturalBirthHero.secondaryCta}
      image={{ src: image.src, alt: image.alt, focalPoint: image.focalPoint }}
    />
  );
}
