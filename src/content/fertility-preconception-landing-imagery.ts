import type { HeroFocalPoint } from "@/lib/hero-focal-point";
import { portraitGradient } from "@/components/ui/portrait-gradient";

/**
 * Fertility & Preconception — page-local imagery configuration.
 *
 * Generated illustrations wired for each active slot on this page:
 * - hero: wide 16:9 maternal editorial in daylight
 * - consultation: 4:5 clinician-patient health-history discussion
 * - preparing: 4:5 wellbeing routine & pregnancy preparation
 * - first-consultation: 4:5 first conversation & questions discussion
 * - practical: 16:9 consultation room with clinician and patient
 *
 * Who-this-is-for is text-led by design and retains its gradient fallback.
 * The clinician portrait (Dr. Bharathy Kandasamy) is separate and managed
 * through doctors-content.ts.
 */
export const fertilityImagery = {
  hero: {
    src: "/images/generated/maternal-editorial-daylight-16x9.png",
    alt: "Woman in a fertility and preconception consultation",
    focalPoint: {
      mobile: "25% 20%",
      desktop: "30% 20%",
    } satisfies HeroFocalPoint,
  },
  "who-this-is-for": {
    alt: "Woman reflecting quietly while planning her next step",
    gradient: portraitGradient(2),
  },
  consultation: {
    src: "/images/generated/consultation.jpeg",
    alt: "Woman speaking with a clinician during a fertility consultation",
    objectPosition: "50% 35%",
  },
  preparing: {
    src: "/images/generated/preparation-1.jpeg",
    alt: "Woman preparing for pregnancy through a wellbeing routine",
    objectPosition: "55% 30%",
  },
  "first-consultation": {
    src: "/images/generated/consultation-2.jpeg",
    alt: "Couple discussing fertility questions during a consultation",
    objectPosition: "50% 30%",
  },
  practical: {
    src: "/images/generated/fertility-home.jpeg",
    alt: "Woman preparing for an upcoming fertility consultation",
    objectPosition: "82% 35%",
  },
} as const;

export type FertilityImageKey = keyof typeof fertilityImagery;
