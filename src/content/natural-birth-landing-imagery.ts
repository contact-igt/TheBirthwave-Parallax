import type { HeroFocalPoint } from "@/lib/hero-focal-point";

/**
 * Natural Birth — page-local imagery configuration.
 *
 * Dedicated generated illustrations wired for each active slot:
 * - hero: wide landscape (16:9) expectant mother in a calm, natural setting with copy-safe negative space
 * - preference-not-promise / consultation: 4:5 birth preferences conversation
 * - preferences: 4:5 birth plan conversation
 * - preparation: 4:5 understanding options and movement/rest preparation
 * - flexibility: 4:5 reassuring conversation on flexible birth pathways
 * - practical: 4:5 practical questions confirmation
 *
 * The clinician portrait (Dr. Santoshi Nandigam) is separate and managed
 * through doctors-content.ts.
 */
export const naturalBirthImagery = {
  hero: {
    src: "/images/natural-birth/natural-birth-hero.png",
    alt: "Pregnant woman seated calmly, reflecting on natural birth preferences in a sunlit room",
    focalPoint: {
      mobile: "65% 30%",
      desktop: "70% 35%",
    } satisfies HeroFocalPoint,
  },
  "preference-not-promise": {
    src: "/images/natural-birth/natural-birth-preference-not-promise.png",
    alt: "Pregnant woman discussing birth preferences with her care team",
    objectPosition: "50% 35%",
  },
  consultation: {
    src: "/images/natural-birth/natural-birth-preference-not-promise.png",
    alt: "Pregnant woman discussing birth preferences with her care team",
    objectPosition: "50% 35%",
  },
  preferences: {
    src: "/images/natural-birth/natural-birth-birth-plan-conversation.png",
    alt: "Birth plan open during a conversation about labour support options",
    objectPosition: "50% 40%",
  },
  preparation: {
    src: "/images/natural-birth/natural-birth-understanding-options.png",
    alt: "Expectant mother gently stretching on a floor cushion in preparation for labour",
    objectPosition: "50% 35%",
  },
  flexibility: {
    src: "/images/natural-birth/natural-birth-flexible-pathways.png",
    alt: "Clinician and expectant mother in an open, reassuring conversation about flexible birth pathways",
    objectPosition: "50% 35%",
  },
  practical: {
    src: "/images/natural-birth/natural-birth-practical-questions.png",
    alt: "Expectant parents preparing practical questions for natural birth planning",
    objectPosition: "50% 40%",
  },
} as const;

export type NaturalBirthImageKey = keyof typeof naturalBirthImagery;
