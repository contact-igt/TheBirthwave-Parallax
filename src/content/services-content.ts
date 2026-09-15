/**
 * Services content — The Birth Wave
 *
 * Our Care / Treatments master page (Phase 1). The 11 services below are
 * the confirmed, approved list — names, order and slugs are the source of
 * truth for both this file and the `/services` master page
 * (`services-sticky-showcase.tsx` and its siblings). Descriptions,
 * overviews and highlights are newly written here (none existed before —
 * the previous version of this file was three unrelated structural
 * placeholders, "Your First/Second/Third Service"), kept deliberately
 * short and factual: what each care area covers, not a clinical claim, an
 * outcome, a success rate or a qualification. No service beyond these 11
 * is invented anywhere this file is consumed.
 *
 * `ServiceContent`'s shape is unchanged from before this pass — the
 * existing `service-page-template.tsx` (individual `/services/[slug]`
 * pages, out of scope for this phase) reads exactly the same fields it
 * always did (`eyebrow`, `name`, `heroStatement`, `overview`,
 * `highlights`, `media.alt`); real content now flows through that
 * unmodified template instead of placeholder copy. `group` is the one
 * new, optional field, added for the master page's own chapter-mood
 * grouping (see `SERVICE_SHOWCASE_ORDER` below) — nothing existing reads
 * or depends on it.
 */

export type CareGroup = "before" | "pregnancy" | "birth-preparation" | "birth" | "after-birth";

export interface ServiceContent {
  slug: string;
  eyebrow: string;
  name: string;
  /** One line, used in listings/overview/showcase. */
  shortDescription: string;
  /** Short statement for the service's own page header. */
  heroStatement: string;
  overview: string;
  highlights: string[];
  media: {
    alt: string;
  };
  /** Which of the master page's five atmosphere groups this service
   * belongs to — presentation-only, read by the sticky showcase to order
   * its own scenes and blend background tone; the confirmed 01–11 order
   * itself (this array's own order) is untouched and is what every other
   * consumer (Quick Care Overview, the plain listing, route generation)
   * still uses. */
  group: CareGroup;
}

export const servicesIntro = {
  eyebrow: "Our Care",
  heading: "Care for every stage. Connected by one philosophy.",
  body: "From women's health and pregnancy to birth, recovery and newborn care, explore the support available throughout your journey.",
} as const;

/** The 11 confirmed services, in their own approved 01–11 order. This
 * order is the source of truth for routing (`generateStaticParams`),
 * the plain listing, and Quick Care Overview — never reordered. */
export const services: ServiceContent[] = [
  {
    slug: "pregnancy-antenatal-care",
    eyebrow: "Pregnancy",
    name: "Pregnancy & Antenatal Care",
    shortDescription: "Regular check-ins and guidance through every trimester, from your first visit to your due date.",
    heroStatement: "Care through every stage of pregnancy, built around you.",
    overview:
      "Antenatal care follows you from the first trimester onward — regular check-ins, screening guidance and a consistent point of contact as your pregnancy progresses.",
    highlights: ["Trimester-by-trimester check-ins", "Screening and scan guidance", "One consistent care team throughout"],
    media: { alt: "Pregnancy and antenatal care — approved photography pending" },
    group: "pregnancy",
  },
  {
    slug: "normal-birth-delivery",
    eyebrow: "Birth",
    name: "Normal Birth & Delivery Care",
    shortDescription: "Support for a normal vaginal delivery, from labour through to birth.",
    heroStatement: "Care built around a normal, supported delivery.",
    overview:
      "Delivery care focused on supporting a normal vaginal birth, with guidance through labour and delivery itself.",
    highlights: ["Labour support", "Delivery care", "Continuity from antenatal visits through to birth"],
    media: { alt: "Normal birth and delivery care — approved photography pending" },
    group: "birth",
  },
  {
    slug: "vbac",
    eyebrow: "Birth",
    name: "VBAC (Vaginal Birth After Caesarean)",
    shortDescription: "Guidance and support for a vaginal birth after a previous caesarean.",
    heroStatement: "Considering a vaginal birth after a caesarean.",
    overview:
      "For women considering a vaginal birth after a previous caesarean, this care area covers what to discuss, plan for and expect.",
    highlights: ["Eligibility conversations", "Birth planning support", "Care through labour and delivery"],
    media: { alt: "VBAC care — approved photography pending" },
    group: "birth",
  },
  {
    slug: "fertility-preconception",
    eyebrow: "Before",
    name: "Fertility & Preconception",
    shortDescription: "Support and guidance for those planning a pregnancy.",
    heroStatement: "Planning a pregnancy starts here.",
    overview:
      "Preconception care covers what to consider and prepare for before trying to conceive, alongside fertility guidance where needed.",
    highlights: ["Preconception health guidance", "Fertility conversations", "Planning support"],
    media: { alt: "Fertility and preconception care — approved photography pending" },
    group: "before",
  },
  {
    slug: "vaginismus",
    eyebrow: "Before",
    name: "Vaginismus & Intimate Wellness",
    shortDescription: "Support for vaginismus and other aspects of intimate wellness.",
    heroStatement: "Care for vaginismus and intimate wellness.",
    overview: "A private, supportive space to discuss vaginismus and related concerns around intimate wellness.",
    highlights: ["Private, judgment-free conversations", "Guidance at your own pace", "Ongoing support"],
    media: { alt: "Vaginismus and intimate wellness care — approved photography pending" },
    group: "before",
  },
  {
    slug: "gynaecology",
    eyebrow: "Before",
    name: "Gynaecology & Women's Wellness",
    shortDescription: "General gynaecological care and women's wellness support.",
    heroStatement: "Women's health care, at every stage.",
    overview: "Gynaecological care covering general women's wellness, from routine visits to specific concerns.",
    highlights: ["Routine gynaecological visits", "Women's wellness guidance", "A consistent point of contact"],
    media: { alt: "Gynaecology and women's wellness care — approved photography pending" },
    group: "before",
  },
  {
    slug: "lactation",
    eyebrow: "After Birth",
    name: "Lactation & Breastfeeding Support",
    shortDescription: "Breastfeeding guidance and lactation support after birth.",
    heroStatement: "Support through breastfeeding, from day one.",
    overview:
      "Lactation support to help with breastfeeding in the early days and throughout, for both mother and baby.",
    highlights: ["Early breastfeeding support", "Ongoing lactation guidance", "Support for common feeding concerns"],
    media: { alt: "Lactation and breastfeeding support — approved photography pending" },
    group: "after-birth",
  },
  {
    slug: "birth-preparation",
    eyebrow: "Birth Preparation",
    name: "Birth Preparation & Childbirth Education",
    shortDescription: "Childbirth education and preparation ahead of delivery.",
    heroStatement: "Preparing for birth, with confidence.",
    overview:
      "Birth preparation and childbirth education to help you understand what to expect and feel ready for delivery.",
    highlights: ["Childbirth education sessions", "Birth planning conversations", "Preparing what to expect"],
    media: { alt: "Birth preparation and childbirth education — approved photography pending" },
    group: "birth-preparation",
  },
  {
    slug: "postpartum-care",
    eyebrow: "After Birth",
    name: "Postpartum Recovery & Care",
    shortDescription: "Recovery support and care in the weeks and months after birth.",
    heroStatement: "Care that continues after birth.",
    overview: "Postpartum care supports physical recovery and wellbeing in the weeks and months following delivery.",
    highlights: [
      "Postpartum recovery check-ins",
      "Physical and emotional wellbeing support",
      "Continuity from birth into recovery",
    ],
    media: { alt: "Postpartum recovery and care — approved photography pending" },
    group: "after-birth",
  },
  {
    slug: "nutrition-emotional-wellbeing",
    eyebrow: "Pregnancy",
    name: "Nutrition & Emotional Well-being",
    shortDescription: "Nutrition guidance and emotional wellbeing support through pregnancy and beyond.",
    heroStatement: "Nutrition and emotional wellbeing, supported together.",
    overview:
      "Guidance on nutrition alongside emotional wellbeing support, recognising that care during pregnancy and beyond covers both.",
    highlights: ["Nutrition guidance", "Emotional wellbeing support", "Support through pregnancy and postpartum"],
    media: { alt: "Nutrition and emotional wellbeing support — approved photography pending" },
    group: "pregnancy",
  },
  {
    slug: "newborn-pediatric-care",
    eyebrow: "After Birth",
    name: "Newborn & Pediatric Care",
    shortDescription: "Care and guidance for your newborn and growing child.",
    heroStatement: "Care for your newborn, from the very start.",
    overview: "Newborn and pediatric care covering your baby's early days and ongoing growth and development.",
    highlights: ["Newborn check-ins", "Pediatric guidance", "Support as your baby grows"],
    media: { alt: "Newborn and pediatric care — approved photography pending" },
    group: "after-birth",
  },
];

export function getServiceBySlug(slug: string): ServiceContent | undefined {
  return services.find((service) => service.slug === slug);
}

/**
 * /services-only presentation map, keyed by the existing approved slugs
 * above — this is the single source of truth for how the master page
 * (Quick Overview's chapter grouping, the Sticky Treatment Showcase, the
 * background-wash chapter boundaries) orders and labels the 11 services.
 * It does not reorder or mutate `services` itself (routes,
 * `generateStaticParams`, the 01–11 numbering everything else uses are
 * untouched) — every slug below is confirmed against that same array at
 * module load (`buildChapter` throws if a slug doesn't exist there).
 *
 * Chapter order and membership match the brief's own confirmed chapter
 * sequence exactly (Before/Women's Health → Pregnancy → Birth Preparation
 * → Birth → After Birth) — five chapters, not implying every visitor
 * follows this sequence or that "before" only concerns pregnancy.
 */
export interface CareChapter {
  id: CareGroup;
  label: string;
  slugs: string[];
}

const CARE_CHAPTERS_RAW: CareChapter[] = [
  { id: "before", label: "Before / Women's Health", slugs: ["fertility-preconception", "vaginismus", "gynaecology"] },
  { id: "pregnancy", label: "Pregnancy", slugs: ["pregnancy-antenatal-care", "nutrition-emotional-wellbeing"] },
  { id: "birth-preparation", label: "Birth Preparation", slugs: ["birth-preparation"] },
  { id: "birth", label: "Birth", slugs: ["normal-birth-delivery", "vbac"] },
  { id: "after-birth", label: "After Birth", slugs: ["postpartum-care", "lactation", "newborn-pediatric-care"] },
];

function buildChapter(chapter: CareChapter): CareChapter & { services: ServiceContent[] } {
  const resolved = chapter.slugs.map((slug) => {
    const service = services.find((s) => s.slug === slug);
    if (!service) throw new Error(`services-content.ts: presentation map references unknown slug "${slug}"`);
    return service;
  });
  return { ...chapter, services: resolved };
}

export const careChapters = CARE_CHAPTERS_RAW.map(buildChapter);

/** Flat presentation order (all 11, chapter by chapter) — read by Quick
 * Overview's own full listing and by the normal-flow vertical fallback,
 * which always shows every service regardless of prototype scope. */
export const servicesShowcaseOrder: ServiceContent[] = careChapters.flatMap((c) => c.services);

/** Each chapter's own contiguous 0-based scene-index range within
 * `servicesShowcaseOrder` — derived from the real per-chapter service
 * counts above, not hand-duplicated, so it can't silently drift out of
 * sync with `careChapters` the way a separately hardcoded table could.
 * Drives the Sticky Treatment Showcase's background-wash blend. */
export const careChapterSceneRanges: Record<string, [number, number]> = (() => {
  const ranges: Record<string, [number, number]> = {};
  let cursor = 0;
  for (const chapter of careChapters) {
    const start = cursor;
    const end = cursor + chapter.services.length - 1;
    ranges[chapter.id] = [start, end];
    cursor = end + 1;
  }
  return ranges;
})();

export const servicesHero = {
  eyebrow: "Our Care",
  headlineLines: ["Care for every stage.", "Connected by one philosophy."],
  supporting:
    "From women's health and pregnancy to birth, recovery and newborn care, explore the support available throughout your journey.",
  primaryCta: { label: "Explore Treatments", href: "#treatment-showcase" },
  secondaryCta: { label: "Book a Consultation", href: "/#connect" },
  media: { alt: "A mother and newborn together — approved photography pending" },
} as const;

export const servicesQuickOverview = {
  eyebrow: "At A Glance",
  heading: "Eleven areas of care, one connected journey.",
  /** Visible skip link, targeting Section 04 (Find the Right Care) —
   * lets a keyboard/screen-reader visitor bypass the Treatment Showcase
   * entirely rather than tabbing through its own (long) reading
   * sequence. Points at `#find-the-right-care`, the id that section's
   * own `<section>` carries. */
  skipLabel: "Skip treatment showcase",
  skipHref: "#find-the-right-care",
} as const;

export const servicesShowcaseIntro = {
  eyebrow: "Explore Our Care",
  heading: "Every stage, closely supported.",
} as const;

/** "Find the Right Care" — the confirmed concern → service pairings,
 * reusing `services`' own real names/slugs rather than inventing new
 * category labels. No diagnosis language: each answer names where the
 * conversation starts, not a clinical determination. */
export const findTheRightCare = {
  eyebrow: "Not Sure Where To Start?",
  heading: "Find the right care.",
  intro: "A few common starting points — not a diagnosis, just a place to begin the conversation.",
  pairings: [
    { question: "Planning a pregnancy?", answerLabel: "Fertility & Preconception", slug: "fertility-preconception" },
    { question: "Already pregnant?", answerLabel: "Pregnancy & Antenatal Care", slug: "pregnancy-antenatal-care" },
    { question: "Planning for birth?", answerLabel: "Birth Preparation & Childbirth Education", slug: "birth-preparation" },
    { question: "Considering VBAC?", answerLabel: "VBAC", slug: "vbac" },
    { question: "Recovering after birth?", answerLabel: "Postpartum Recovery & Care", slug: "postpartum-care" },
    { question: "Breastfeeding support?", answerLabel: "Lactation & Breastfeeding Support", slug: "lactation" },
    { question: "Concern about women's health?", answerLabel: "Gynaecology & Women's Wellness", slug: "gynaecology" },
    { question: "Need newborn support?", answerLabel: "Newborn & Pediatric Care", slug: "newborn-pediatric-care" },
  ],
} as const;

/** Connected Care / Why BirthWave — an original editorial section for
 * this page, deliberately not About's own cinematic treatment (per the
 * brief). */
export const connectedCare = {
  eyebrow: "Why BirthWave",
  heading: "Care changes as your needs change.",
  body: "BirthWave brings different areas of care together so that your journey does not have to restart at every stage.",
  media: { alt: "Care team in conversation — approved photography pending" },
} as const;

export const servicesFinalCta = {
  headingLines: ["Not sure which care is right for you?", "Start with a conversation."],
  primaryCta: { label: "Book a Consultation", href: "/#connect" },
  secondaryCta: {
    label: "WhatsApp Us",
    href: "/#connect",
    todo: "No verified WhatsApp number exists for this project — mirrors doctors-content.ts's own doctorsAppointmentCta.secondaryCta, which resolves to the same closing anchor rather than a fabricated wa.me link.",
  },
} as const;
