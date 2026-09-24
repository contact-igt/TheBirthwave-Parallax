/**
 * Services content — The Birth Wave
 *
 * Our Care / Treatments master page (Phase 1). The 11 services below are
 * the confirmed, approved list — names, order and slugs are the source of
 * truth for both this file and the `/services` master page
 * (`services-care-journey.tsx` and its siblings). Descriptions,
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

/** The 12 confirmed services, in their own approved order. This
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
    slug: "natural-birth",
    eyebrow: "Birth Preparation",
    name: "Natural Birth",
    shortDescription:
      "Planning and support around birth preferences, preparation and informed choices while allowing for flexibility if circumstances change.",
    heroStatement: "Prepare for the birth you hope for — with space for informed choices and flexibility along the way.",
    overview:
      "Natural birth support covers birth preferences, preparation and informed-choice conversations, while remaining flexible if your circumstances or labour change.",
    highlights: ["Birth-preference conversations", "Preparation for informed choices", "Flexibility if plans need to change"],
    media: { alt: "Natural birth planning and support — approved photography pending" },
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
  /** One short, factual line introducing the chapter — read by the Care
   * Journey section's own chapter spread, alongside its one chapter image.
   * Not a clinical claim or outcome, same restraint as `shortDescription`
   * above. */
  intro: string;
  slugs: string[];
}

const CARE_CHAPTERS_RAW: CareChapter[] = [
  {
    id: "before",
    label: "Before / Women's Health",
    intro: "Preconception planning, gynaecological care and intimate wellness — women's health support before pregnancy begins.",
    slugs: ["fertility-preconception", "vaginismus", "gynaecology"],
  },
  {
    id: "pregnancy",
    label: "Pregnancy",
    intro: "Regular antenatal care alongside nutrition and emotional wellbeing guidance, through every trimester.",
    slugs: ["pregnancy-antenatal-care", "nutrition-emotional-wellbeing"],
  },
  {
    id: "birth-preparation",
    label: "Birth Preparation",
    intro: "Childbirth education and preparation conversations, so you feel ready for what's ahead.",
    slugs: ["birth-preparation", "natural-birth"],
  },
  {
    id: "birth",
    label: "Birth",
    intro: "Support through labour and delivery, including guidance for a vaginal birth after caesarean.",
    slugs: ["normal-birth-delivery", "vbac"],
  },
  {
    id: "after-birth",
    label: "After Birth",
    intro: "Recovery, breastfeeding support and newborn care, continuing well beyond the birth itself.",
    slugs: ["postpartum-care", "lactation", "newborn-pediatric-care"],
  },
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

/** Flat presentation order (all 11, chapter by chapter) — read by the Care
 * Journey section for each service link's own global 01–11 index. */
export const servicesShowcaseOrder: ServiceContent[] = careChapters.flatMap((c) => c.services);

export const servicesHero = {
  eyebrow: "Our Care",
  headlineLines: ["Care for every stage.", "Connected by one philosophy."],
  supporting:
    "From women's health and pregnancy to birth, recovery and newborn care, explore the support available throughout your journey.",
  primaryCta: { label: "Explore Treatments", href: "#treatment-showcase" },
  secondaryCta: { label: "Book a Consultation", href: "/#connect" },
  media: { alt: "A mother and newborn together — approved photography pending" },
} as const;

/**
 * Care Journey — Section 02 (chapter-level editorial refinement). Replaces
 * the earlier Quick Overview + Sticky Showcase pair: one editorial spread
 * per chapter (one image, asymmetric service links) instead of a plain
 * link directory followed by a separately image-heavy, per-service
 * showcase.
 */
export const careJourneyIntro = {
  eyebrow: "At A Glance",
  heading: "Eleven areas of care, five connected stages.",
  /** Visible jump link to Find the Right Care, for a visitor who wants a
   * direct answer rather than reading all five chapters. Points at
   * `#find-the-right-care`, the id that section's own `<section>` carries. */
  jumpLabel: "Not sure where to start?",
  jumpHref: "#find-the-right-care",
} as const;

/** "Find the Right Care" — a decision helper, not a second directory: five
 * plain-language starting points for a visitor who doesn't know which
 * service name they need, each pointing at `services`' own real name(s)/
 * slug(s) rather than inventing new category labels. Every service NOT
 * named here already has its own direct link in the Care Journey section
 * above — this section doesn't need to repeat that full listing, only
 * cover the handful of starting questions visitors actually arrive with.
 * A `secondary` answer (VBAC, under "Preparing for birth?") renders at
 * lower visual weight — a related, high-intent route worth surfacing
 * without competing with the row's own primary answer. No diagnosis
 * language: each answer names where the conversation starts, not a
 * clinical determination. */
export const findTheRightCare = {
  eyebrow: "Not Sure Where To Start?",
  heading: "Find the right care.",
  intro: "A few common starting points if you're not sure which service fits.",
  pairings: [
    {
      question: "Planning a pregnancy?",
      answers: [{ label: "Fertility & Preconception", slug: "fertility-preconception" }],
    },
    {
      question: "Already pregnant?",
      answers: [{ label: "Pregnancy & Antenatal Care", slug: "pregnancy-antenatal-care" }],
    },
    {
      question: "Preparing for birth?",
      answers: [
        { label: "Birth Preparation & Childbirth Education", slug: "birth-preparation" },
        { label: "VBAC", slug: "vbac", secondary: true },
      ],
    },
    {
      question: "Recovering after birth?",
      answers: [{ label: "Postpartum Recovery & Care", slug: "postpartum-care" }],
    },
    {
      question: "Need feeding or newborn support?",
      answers: [
        { label: "Lactation & Breastfeeding Support", slug: "lactation" },
        { label: "Newborn & Pediatric Care", slug: "newborn-pediatric-care" },
      ],
    },
  ],
} as const;

/** Connected Care / Why BirthWave — an original editorial section for
 * this page, deliberately not About's own cinematic treatment (per the
 * brief). */
export const connectedCare = {
  eyebrow: "Why The Birthwave",
  heading: "Care changes as your needs change.",
  body: "The Birthwave brings different areas of care together so that your journey does not have to restart at every stage.",
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
