import { CareServiceHero } from "@/components/sections/services/care-service-hero";
import { normalBirthHero } from "@/content/normal-birth-delivery-landing-content";
import { normalBirthImagery } from "@/content/normal-birth-delivery-imagery";

export function NormalBirthHero() {
  const image = normalBirthImagery.hero;
  return (
    <CareServiceHero
      id="normal-birth-hero"
      eyebrow={normalBirthHero.eyebrow}
      heading={normalBirthHero.headingLines.join(" ")}
      supporting={normalBirthHero.supportingHeadline}
      body={`${normalBirthHero.body} ${normalBirthHero.bodySecondary}`}
      primaryCta={normalBirthHero.primaryCta}
      secondaryCta={normalBirthHero.secondaryCta}
      image={{ src: image.src, alt: image.alt, objectPosition: image.objectPosition }}
      disclosure="AI-generated illustration"
    />
  );
}
