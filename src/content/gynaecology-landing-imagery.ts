import type { HeroFocalPoint } from "@/lib/hero-focal-point";

/**
 * Gynaecology & Women's Wellness — page-local imagery configuration.
 *
 * Dedicated generated illustrations wired for each active slot:
 * - hero: wide landscape consultation with clinician & patient, copy-safe negative space
 * - who-this-is-for: 4:5 first conversation discussion
 * - consultation: 4:5 symptoms, history & questions review over notebook
 * - health-questions: 4:5 early & preventive care consultation
 * - first-consultation: 4:5 preparing questions with notebook
 * - practical: 4:5 preparing items & notebook for upcoming clinic visit
 *
 * The clinician portrait (Dr. Bharathy Kandasamy) is separate and managed
 * through doctors-content.ts.
 */
export const gynaecologyImagery = {
  hero: {
    src: "/images/generated/g-hero.jpeg",
    alt: "Woman speaking with a gynaecologist during a consultation",
    focalPoint: {
      mobile: "70% 35%",
      desktop: "75% 35%",
    } satisfies HeroFocalPoint,
  },
  "who-this-is-for": {
    src: "/images/generated/g-consultation.jpeg",
    alt: "Woman discussing a women’s health concern with a clinician",
    objectPosition: "50% 40%",
  },
  consultation: {
    src: "/images/generated/g-consultation2.jpeg",
    alt: "Patient and clinician reviewing health questions together",
    objectPosition: "50% 35%",
  },
  "health-questions": {
    src: "/images/generated/g-consultation3.jpeg",
    alt: "Woman attending a routine women’s health consultation",
    objectPosition: "50% 40%",
  },
  "first-consultation": {
    src: "/images/generated/g-preparation.jpeg",
    alt: "Woman preparing questions for a gynaecology consultation",
    objectPosition: "50% 40%",
  },
  practical: {
    src: "/images/generated/g-preparation2.jpeg",
    alt: "Woman preparing for an upcoming clinic appointment",
    objectPosition: "45% 35%",
  },
} as const;

export type GynaecologyImageKey = keyof typeof gynaecologyImagery;
