/**
 * Fertility & Preconception — page-local imagery.
 *
 * Both photographs are AI-generated illustrations (files in
 * public/images/generated) and are disclosed as such in a caption under each
 * frame. The clinician portrait is separate: it is read from the doctor
 * record in doctors-content.ts, never from this file. Replace `src` here when
 * approved clinic photography exists.
 */
export const fertilityImagery = {
  hero: {
    src: "/images/generated/consultation.jpeg",
    alt: "A woman and a man sit side by side at a wooden table, talking with a female clinician who holds a pen above an open notebook.",
    objectPosition: "50% 45%",
  },
  covers: {
    src: "/images/generated/g-consultation2.jpeg",
    alt: "A woman and a clinician in pink scrubs sit close together at a wooden table, writing in an open notebook.",
    objectPosition: "50% 40%",
  },
} as const;

export const fertilityImageDisclosure = "AI-generated illustration";

export type FertilityImageKey = keyof typeof fertilityImagery;
