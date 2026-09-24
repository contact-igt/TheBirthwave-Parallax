/** Page-local AI illustrations. Replace sources here when approved photographs are available. */
export const normalBirthImagery = {
  hero: {
    src: "/images/services/normal-birth-delivery-hero-ai-preview-v1.webp",
    alt: "AI-generated illustration: An expectant mother in a sage dress sits beside her partner near a sunlit window.",
    objectPosition: "85% 45%",
  },
  consultation: {
    src: "/images/services/normal-birth-delivery-consultation-ai-preview-v1.webp",
    alt: "AI-generated illustration: A pregnant woman and a female care professional talk across a wooden desk.",
    objectPosition: "50% 45%",
  },
  "labour-support": {
    src: "/images/services/normal-birth-delivery-labour-support-ai-preview-v1.webp",
    alt: "AI-generated illustration: A seated expectant mother holds her partner's hand while a care professional looks on.",
    objectPosition: "52% 42%",
  },
  "after-birth": {
    src: "/images/services/normal-birth-delivery-after-birth-ai-preview-v1.webp",
    alt: "AI-generated illustration: A mother holds her newborn while speaking with a care professional seated beside her.",
    objectPosition: "50% 42%",
  },
  "birth-preferences": {
    src: "/images/services/normal-birth-delivery-birth-preferences-ai-preview-v1.webp",
    alt: "AI-generated illustration: An expectant couple sits together with an open notebook during a planning conversation.",
    objectPosition: "50% 40%",
  },
} as const;

export type NormalBirthImageKey = keyof typeof normalBirthImagery;
