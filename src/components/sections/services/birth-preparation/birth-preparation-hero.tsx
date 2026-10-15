import { CareServiceHero } from "@/components/sections/services/care-service-hero";
import { birthPrepHero } from "@/content/birth-preparation-landing-content";
import { servicesImagery } from "@/content/services-imagery";

export function BirthPrepHero() {
  const image = servicesImagery["birth-prep-landing-hero"];
  return (
    <CareServiceHero
      id="birth-prep-hero"
      eyebrow={birthPrepHero.eyebrow}
      heading={birthPrepHero.heading}
      supporting={birthPrepHero.supportingHeadline}
      body={birthPrepHero.body.join("\n\n")}
      primaryCta={birthPrepHero.primaryCta}
      secondaryCta={birthPrepHero.secondaryCta}
      image={{ src: image.src, alt: image.alt, focalPoint: image.focalPoint }}
      backgroundImage="/images/web-ready/exp01320.jpg"
    />
  );
}
