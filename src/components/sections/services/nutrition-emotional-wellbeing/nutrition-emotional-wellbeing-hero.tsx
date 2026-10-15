import { CareServiceHero } from "@/components/sections/services/care-service-hero";
import { nutritionHero, nutritionImagery } from "@/content/pages/nutrition-emotional-wellbeing";

export function NutritionHero() {
  const image = nutritionImagery.hero;

  return (
    <CareServiceHero
      id="nutrition-hero"
      eyebrow={nutritionHero.eyebrow}
      heading={nutritionHero.heading}
      supporting={nutritionHero.supportingHeadline}
      body={[nutritionHero.body, nutritionHero.bodySecondary]}
      primaryCta={nutritionHero.primaryCta}
      secondaryCta={nutritionHero.secondaryCta}
      image={{ src: image.src, alt: image.alt, focalPoint: image.focalPoint }}
      disclosure="AI-generated illustration"
    />
  );
}
