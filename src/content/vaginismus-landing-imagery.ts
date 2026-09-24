import type { HeroFocalPoint } from "@/lib/hero-focal-point";

/**
 * Vaginismus & Intimate Wellness — page-local imagery configuration.
 *
 * Dedicated generated illustrations wired for each active slot:
 * - hero: wide landscape consultation with clinician & patient, copy-safe negative space
 * - who-this-is-for: 4:5 first conversation discussion
 * - consultation: 4:5 understanding symptoms & experiences review
 * - care-at-your-pace: 4:5 calm supportive consultation discussion
 * - first-consultation: 4:5 preparing questions with notebook
 * - practical: 4:5 packing notebook into bag for upcoming clinic visit
 *
 * The clinician portrait (Dr. Adithi Nair) is separate and managed
 * through doctors-content.ts.
 */
export const vaginismusImagery = {
  hero: {
    src: "/images/generated/v-banner.png",
    alt: "Woman speaking privately with a clinician",
    focalPoint: {
      mobile: "68% 42%",
      desktop: "72% 42%",
    } satisfies HeroFocalPoint,
  },
  "who-this-is-for": {
    src: "/images/generated/v-consultation.png",
    alt: "Woman discussing an intimate wellness concern with a clinician",
    objectPosition: "50% 38%",
  },
  consultation: {
    src: "/images/generated/v-understanding.png",
    alt: "Patient and clinician discussing health questions together",
    objectPosition: "50% 40%",
  },
  "care-at-your-pace": {
    src: "/images/generated/v-discussion.png",
    alt: "Woman having a calm supportive consultation",
    objectPosition: "50% 38%",
  },
  "first-consultation": {
    src: "/images/generated/v-questions.png",
    alt: "Woman preparing questions before an intimate wellness appointment",
    objectPosition: "50% 40%",
  },
  practical: {
    src: "/images/generated/v-beforevisit.png",
    alt: "Woman preparing for an upcoming clinic visit",
    objectPosition: "50% 35%",
  },
} as const;

export type VaginismusImageKey = keyof typeof vaginismusImagery;
