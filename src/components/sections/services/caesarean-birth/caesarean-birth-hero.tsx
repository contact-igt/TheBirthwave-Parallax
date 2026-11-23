import { CareServiceHero } from "@/components/sections/services/care-service-hero";
import { caesareanBirthHero } from "@/content/pages/caesarean-birth";
import { caesareanBirthImagery } from "@/content/pages/caesarean-birth";

export function CaesareanBirthHero() {
  return (
    <CareServiceHero
      id="caesarean-birth-hero"
      eyebrow={caesareanBirthHero.eyebrow}
      heading={caesareanBirthHero.heading}
      supporting={caesareanBirthHero.supportingHeadline}
      body={caesareanBirthHero.body}
      primaryCta={caesareanBirthHero.primaryCta}
      secondaryCta={caesareanBirthHero.secondaryCta}
      image={{
        src: caesareanBirthImagery.hero.src,
        alt: caesareanBirthImagery.hero.alt,
        objectPosition: caesareanBirthImagery.hero.objectPosition,
      }}
    />
  );
}
