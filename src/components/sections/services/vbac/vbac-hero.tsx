import { CareServiceHero } from "@/components/sections/services/care-service-hero";
import { vbacHero, vbacImagery } from "@/content/pages/vbac";

export function VbacHero() {
  const image = vbacImagery.hero as {
    src?: string;
    alt: string;
    gradient?: string;
    objectPosition?: string;
  };

  return (
    <CareServiceHero
      id="vbac-hero"
      eyebrow={vbacHero.eyebrow}
      heading={vbacHero.heading}
      supporting={vbacHero.supportingLine}
      body={vbacHero.body}
      primaryCta={vbacHero.primaryCta}
      secondaryCta={vbacHero.secondaryCta}
      image={image.src ? { src: image.src, alt: image.alt, objectPosition: image.objectPosition } : undefined}
      fallbackLabel={image.alt}
      fallbackGradient={image.gradient}
    />
  );
}
