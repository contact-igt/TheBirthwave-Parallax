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
    // Source photo is 1440x810 (16:9), subject seated at roughly the
    // right two-thirds with a wide, genuinely empty wall on the left —
    // already composed for this hero's own text-left/subject-right
    // treatment, unchanged from this page's original approved crop.
    focalPoint: { mobile: "75% 30%", desktop: "65% center" },
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
  // Birth Preparation & Childbirth Education landing page — its own
  // dedicated section keys, reusing existing approved illustration FILES
  // (no image-generation tool was available for this pass) but each with
  // its own alt text accurate to where it actually appears on THIS page,
  // exactly like the pregnancy-antenatal landing page's own reuse pattern
  // above. No two of these five keys share the same underlying file, so
  // the page itself never repeats one photograph across its own sections.
  "birth-prep-landing-hero": {
    src: "/images/services/birth-preparation-ai-preview-v1.webp",
    alt: "AI-generated illustration: An expectant couple practises calm breathing with a childbirth educator.",
    // Source photo is 1122x1402 (portrait), three people spread across
    // nearly its full width with all three faces sitting high, around
    // 22-25% down — inside this wide/short hero container the crop is
    // always width-bound (the full image width shows regardless of the
    // `x` value), so only `y` actually changes what's visible. The
    // previous desktop value ("60% center", y=50%) cropped a band well
    // below every face; fixed to keep the same high band mobile already
    // used. Confirmed by screenshot at 1440x650/1024x768.
    focalPoint: { mobile: "70% 25%", desktop: "60% 18%" },
  },
  "birth-prep-landing-consultation": {
    src: "/images/services/gynaecology-ai-preview-v1.webp",
    alt: "AI-generated illustration: An expectant parent in an attentive preparation conversation with a member of the care team.",
  },
  "birth-prep-landing-learning-labour": {
    src: "/images/services/pregnancy-antenatal-care-ai-preview-v1.webp",
    alt: "AI-generated illustration: An expectant parent talks through labour and birth questions with a member of the care team.",
  },
  "birth-prep-landing-learning-support": {
    src: "/images/services/fertility-preconception-ai-preview-v1.webp",
    alt: "AI-generated illustration: An expectant couple talks with a member of the care team about preparation and support.",
  },
  "birth-prep-landing-preferences": {
    src: "/images/services/vbac-ai-preview-v1.webp",
    alt: "AI-generated illustration: An expectant couple discusses birth preferences and options with a clinician.",
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
  // Care Journey — Section 02's own five chapter-level images (one per
  // chapter, replacing the earlier one-image-per-service pattern). Each
  // REUSES an existing approved file rather than duplicating the binary
  // asset, with its own alt text accurate to how it represents the whole
  // chapter here — the same reuse pattern the birth-prep-landing-* keys
  // above already establish.
  "care-journey-before": {
    src: "/images/services/gynaecology-ai-preview-v1.webp",
    alt: "AI-generated illustration: A woman discusses her health and wellbeing with a clinician in a calm consultation room.",
  },
  "care-journey-pregnancy": {
    src: "/images/services/pregnancy-antenatal-care-ai-preview-v1.webp",
    alt: "AI-generated illustration: A pregnant woman talks with a clinician during an antenatal consultation.",
  },
  "care-journey-birth-preparation": {
    src: "/images/services/birth-preparation-ai-preview-v1.webp",
    alt: "AI-generated illustration: An expectant couple practises calm breathing with a childbirth educator.",
  },
  "care-journey-birth": {
    src: "/images/services/vbac-ai-preview-v1.webp",
    alt: "AI-generated illustration: An expectant couple discusses birth plans and options with a clinician.",
  },
  "care-journey-after-birth": {
    src: "/images/services/lactation-ai-preview-v1.webp",
    alt: "AI-generated illustration: A mother holds her newborn during a feeding-support consultation.",
  },
} as const;

export type ServicesImageKey = keyof typeof servicesImagery;
