/** Temporary AI illustrations used only on /services. Replace each asset here with approved clinic photography. */
export const servicesImagery = {
  "services-hero": { src: "/images/services/services-hero-ai-preview-v1.webp", alt: "AI-generated illustration: A mother cradles her sleeping newborn beside a softly lit window." },
  // Pregnancy & Antenatal Care landing page — its own dedicated hero
  // background, copied in from the approved visual reference (see
  // pregnancy-antenatal-landing-content.ts's own header comment) and
  // three keys that deliberately REUSE existing /services image files
  // rather than duplicating the binary asset — a different `imageKey`
  // per usage context, so each carries its own accurate alt/caption text
  // for where it actually appears on this page, without a second copy of
  // the file itself.
  "pregnancy-antenatal-hero": {
    src: "/images/services/pregnancy-antenatal-care-hero-ai-preview-v1.webp",
    alt: "AI-generated illustration: A pregnant woman in a softly lit, warm interior.",
  },
  "pregnancy-antenatal-checkins-scans": {
    src: "/images/services/pregnancy-antenatal-care-ai-preview-v1.webp",
    alt: "AI-generated illustration: A pregnant woman talks with a clinician during an antenatal consultation.",
  },
  "pregnancy-antenatal-wellbeing-birth-prep": {
    src: "/images/services/birth-preparation-ai-preview-v1.webp",
    alt: "AI-generated illustration: An expectant couple practises calm breathing with a childbirth educator.",
  },
  "pregnancy-antenatal-first-consultation": {
    src: "/images/services/gynaecology-ai-preview-v1.webp",
    alt: "AI-generated illustration: A woman discusses her health with a clinician in a calm consultation room.",
  },
  "pregnancy-antenatal-care-team": {
    src: "/images/services/connected-care-ai-preview-v1.webp",
    alt: "AI-generated illustration: Three care professionals discuss care together around a table.",
  },
  "fertility-preconception": { src: "/images/services/fertility-preconception-ai-preview-v1.webp", alt: "AI-generated illustration: A couple talks with a clinician about planning a pregnancy." },
  "vaginismus": { src: "/images/services/vaginismus-ai-preview-v1.webp", alt: "AI-generated illustration: A woman has a private, supportive conversation with a clinician." },
  "gynaecology": { src: "/images/services/gynaecology-ai-preview-v1.webp", alt: "AI-generated illustration: A woman discusses her health with a clinician in a calm consultation room." },
  "pregnancy-antenatal-care": { src: "/images/services/pregnancy-antenatal-care-ai-preview-v1.webp", alt: "AI-generated illustration: A pregnant woman talks with a clinician during an antenatal consultation." },
  "nutrition-emotional-wellbeing": { src: "/images/services/nutrition-emotional-wellbeing-ai-preview-v1.webp", alt: "AI-generated illustration: A pregnant woman discusses everyday nutrition and wellbeing with a care professional." },
  "birth-preparation": { src: "/images/services/birth-preparation-ai-preview-v1.webp", alt: "AI-generated illustration: An expectant couple practises calm breathing with a childbirth educator." },
  "normal-birth-delivery": { src: "/images/services/normal-birth-delivery-ai-preview-v1.webp", alt: "AI-generated illustration: A pregnant woman receives reassurance from her partner and a care professional during labour." },
  "vbac": { src: "/images/services/vbac-ai-preview-v1.webp", alt: "AI-generated illustration: An expectant couple discusses birth options with a clinician." },
  "postpartum-care": { src: "/images/services/postpartum-care-ai-preview-v1.webp", alt: "AI-generated illustration: A resting new mother talks with a clinician about her recovery." },
  "lactation": { src: "/images/services/lactation-ai-preview-v1.webp", alt: "AI-generated illustration: A mother holds her newborn during a feeding-support consultation." },
  "newborn-pediatric-care": { src: "/images/services/newborn-pediatric-care-ai-preview-v1.webp", alt: "AI-generated illustration: Parents hold their newborn during a conversation with a paediatric clinician." },
  "connected-care": { src: "/images/services/connected-care-ai-preview-v1.webp", alt: "AI-generated illustration: Three care professionals discuss care together around a table." },
} as const;

export type ServicesImageKey = keyof typeof servicesImagery;
