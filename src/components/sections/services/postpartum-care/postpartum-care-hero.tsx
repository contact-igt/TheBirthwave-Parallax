import { CareServiceHero } from "@/components/sections/services/care-service-hero";
import { postpartumHero, postpartumImagery } from "@/content/pages/postpartum-care";

export function PostpartumHero() {
  const image = postpartumImagery.hero;

  return (
    <CareServiceHero
      id="postpartum-hero"
      eyebrow={postpartumHero.eyebrow}
      heading={postpartumHero.heading}
      supporting={postpartumHero.supportingHeadline}
      body={[postpartumHero.body, postpartumHero.bodySecondary]}
      primaryCta={postpartumHero.primaryCta}
      secondaryCta={postpartumHero.secondaryCta}
      fallbackLabel={image.alt}
      fallbackGradient={image.gradient}
    />
  );
}
