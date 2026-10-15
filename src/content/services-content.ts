/**
 * Services content — The Birth Wave
 *
 * Master content file for /services.
 * Defines the 7 chapters and comprehensive service listings,
 * along with the decision helper, hero, philosophy, and CTAs.
 */

export type CareGroup =
  | "womens-health"
  | "planning-a-pregnancy"
  | "pregnancy-care"
  | "preparing-for-birth"
  | "birth-options"
  | "after-birth"
  | "baby-care";

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
  group: CareGroup;
}

export const servicesIntro = {
  eyebrow: "Our Care",
  heading: "Care for every stage. Connected by one philosophy.",
  body: "From women's health and pregnancy to birth, recovery and newborn care, explore the support available throughout your journey.",
} as const;

/** Complete list of services across the 7 care chapters. */
export const services: ServiceContent[] = [
  // ── Chapter 01: Women's Health ──────────────────────────────────────────
  {
    slug: "adolescent-health",
    eyebrow: "Women's Health",
    name: "Adolescent Health",
    shortDescription:
      "Support for girls and young women navigating periods, menstrual concerns, hormonal changes and early reproductive health questions.",
    heroStatement: "Support through early reproductive health and adolescence.",
    overview:
      "Navigating adolescence brings rapid hormonal and physical changes. We offer gentle, supportive care for menstrual health, cycle changes, and early questions in a reassuring environment.",
    highlights: ["Menstrual health guidance", "Hormonal changes support", "Open, reassuring conversations"],
    media: { alt: "Adolescent health consultation — approved photography pending" },
    group: "womens-health",
  },
  {
    slug: "gynaecology",
    eyebrow: "Women's Health",
    name: "Gynaecology & Women’s Wellness",
    shortDescription:
      "Care for period concerns, pelvic health, hormonal changes and other common gynaecological needs.",
    heroStatement: "Women's health care, at every stage.",
    overview:
      "Gynaecological care covering general women's wellness, from routine visits to specific concerns, ensuring proactive and compassionate support.",
    highlights: ["Routine gynaecological visits", "Women's wellness guidance", "A consistent point of contact"],
    media: { alt: "Gynaecology and women's wellness care — approved photography pending" },
    group: "womens-health",
  },
  {
    slug: "pcos-menstrual-health",
    eyebrow: "Women's Health",
    name: "PCOS & Menstrual Health",
    shortDescription:
      "Assessment and support for PCOS, irregular periods and related hormonal concerns.",
    heroStatement: "Clear answers and holistic care for PCOS and cycle health.",
    overview:
      "Comprehensive assessment and compassionate management for polycystic ovary syndrome, irregular cycles, and metabolic health tailored to each woman.",
    highlights: ["PCOS assessment & diagnostics", "Cycle regularity guidance", "Metabolic & lifestyle support"],
    media: { alt: "PCOS and menstrual health care — approved photography pending" },
    group: "womens-health",
  },
  {
    slug: "vaginismus",
    eyebrow: "Women's Health",
    name: "Vaginismus & Intimate Wellness",
    shortDescription:
      "Supportive, sensitive care for intimate health concerns in a private and respectful environment.",
    heroStatement: "Care for vaginismus and intimate wellness.",
    overview:
      "A private, supportive space to discuss vaginismus and related concerns around intimate wellness, guided at your own pace without pressure.",
    highlights: ["Private, judgment-free conversations", "Guidance at your own pace", "Ongoing supportive care"],
    media: { alt: "Vaginismus and intimate wellness care — approved photography pending" },
    group: "womens-health",
  },
  {
    slug: "weight-metabolic-wellness",
    eyebrow: "Women's Health",
    name: "Weight & Metabolic Wellness",
    shortDescription:
      "Guidance for obesity, healthy weight management and lifestyle-related concerns, considered as part of overall women’s health.",
    heroStatement: "Sustainable, medical support for metabolic balance.",
    overview:
      "Evidence-based support for healthy weight management, insulin sensitivity, and lifestyle health tailored to women's changing biology.",
    highlights: ["Metabolic health reviews", "Sustainable lifestyle planning", "Empathetic, non-stigmatising guidance"],
    media: { alt: "Weight and metabolic wellness consultation — approved photography pending" },
    group: "womens-health",
  },
  {
    slug: "mental-emotional-wellbeing",
    eyebrow: "Women's Health",
    name: "Mental & Emotional Well-being",
    shortDescription:
      "Support for emotional and mental health concerns that may arise during adolescence, reproductive years, pregnancy, postpartum, perimenopause and menopause.",
    heroStatement: "Caring for how you feel through every transition.",
    overview:
      "Dedicated mental and emotional well-being consultations to support you through life's transitions, hormonal shifts, and emotional challenges.",
    highlights: ["Emotional health check-ins", "Hormonal transition support", "Integrated psychological care"],
    media: { alt: "Mental and emotional well-being consultation — approved photography pending" },
    group: "womens-health",
  },
  {
    slug: "menopause-care",
    eyebrow: "Women's Health",
    name: "Perimenopause, Menopause & Post-Menopause",
    shortDescription:
      "Care for hormonal changes, symptoms and long-term well-being as women move through menopause and beyond.",
    heroStatement: "Navigating the perimenopause and menopause transition with clarity.",
    overview:
      "Expert support for perimenopausal and menopausal symptom management, bone and cardiovascular health, and long-term wellness.",
    highlights: ["Symptom & hormonal assessment", "Lifestyle & wellness strategies", "Long-term health screening"],
    media: { alt: "Perimenopause and menopause care consultation — approved photography pending" },
    group: "womens-health",
  },
  {
    slug: "preventive-health",
    eyebrow: "Women's Health",
    name: "Preventive Women’s Health",
    shortDescription:
      "Routine screening and preventive care, including breast health, cervical screening and regular women’s health checks.",
    heroStatement: "Proactive, routine health checks to protect your future.",
    overview:
      "Regular preventive screenings, Pap smears, breast checks, and proactive health assessments designed to keep you well.",
    highlights: ["Cervical & breast screening", "Annual wellness exams", "Proactive health mapping"],
    media: { alt: "Preventive women's health screening — approved photography pending" },
    group: "womens-health",
  },

  // ── Chapter 02: Planning a Pregnancy ────────────────────────────────────
  {
    slug: "fertility-preconception",
    eyebrow: "Planning a Pregnancy",
    name: "Fertility & Preconception",
    shortDescription:
      "Support for couples and individuals preparing for pregnancy, including fertility evaluation, counselling and preconception guidance.",
    heroStatement: "Planning a pregnancy starts here.",
    overview:
      "Preconception care covers what to consider and prepare for before trying to conceive, alongside fertility guidance where needed.",
    highlights: ["Preconception health guidance", "Fertility conversations", "Planning support"],
    media: { alt: "Fertility and preconception care — approved photography pending" },
    group: "planning-a-pregnancy",
  },
  {
    slug: "preconception-health",
    eyebrow: "Planning a Pregnancy",
    name: "Preconception Health",
    shortDescription:
      "Review your overall health, lifestyle, nutrition and any medical concerns before conception.",
    heroStatement: "Optimise your health before conception begins.",
    overview:
      "A thorough medical, lifestyle, and nutritional review before conceiving to ensure the healthiest start for you and your future baby.",
    highlights: ["Pre-pregnancy health checks", "Nutrition & supplement guidance", "Medical history review"],
    media: { alt: "Preconception health consultation — approved photography pending" },
    group: "planning-a-pregnancy",
  },
  {
    slug: "conscious-pregnancy-prep",
    eyebrow: "Planning a Pregnancy",
    name: "Conscious Pregnancy Preparation",
    shortDescription:
      "Preparation can also include emotional well-being, mindfulness and practices that help you approach pregnancy with greater awareness and confidence.",
    heroStatement: "Mindful and intentional preparation for pregnancy.",
    overview:
      "Bringing awareness, mindfulness, and emotional grounding into your pre-pregnancy journey so you can step into pregnancy feeling centred.",
    highlights: ["Mindfulness & emotional readiness", "Partner alignment", "Conscious wellness practices"],
    media: { alt: "Conscious pregnancy preparation session — approved photography pending" },
    group: "planning-a-pregnancy",
  },

  // ── Chapter 03: Pregnancy Care ──────────────────────────────────────────
  {
    slug: "pregnancy-antenatal-care",
    eyebrow: "Pregnancy Care",
    name: "Pregnancy & Antenatal Care",
    shortDescription:
      "Regular monitoring, consultations and guidance throughout pregnancy.",
    heroStatement: "Care through every stage of pregnancy, built around you.",
    overview:
      "Antenatal care follows you from the first trimester onward — regular check-ins, screening guidance and a consistent point of contact as your pregnancy progresses.",
    highlights: ["Trimester-by-trimester check-ins", "Screening and scan guidance", "One consistent care team throughout"],
    media: { alt: "Pregnancy and antenatal care — approved photography pending" },
    group: "pregnancy-care",
  },
  {
    slug: "nutrition-pregnancy",
    eyebrow: "Pregnancy Care",
    name: "Nutrition During Pregnancy",
    shortDescription:
      "Practical support for nutrition and lifestyle as your pregnancy progresses.",
    heroStatement: "Nourishing yourself and your growing baby.",
    overview:
      "Evidence-based nutrition planning to support healthy fetal development, manage common pregnancy symptoms, and sustain your daily energy.",
    highlights: ["Trimester-specific meal planning", "Gestational nutrition guidance", "Lifestyle & energy support"],
    media: { alt: "Nutrition during pregnancy consultation — approved photography pending" },
    group: "pregnancy-care",
  },
  {
    slug: "garbh-sanskar",
    eyebrow: "Pregnancy Care",
    name: "Conscious Pregnancy & Garbh Sanskar",
    shortDescription:
      "Supportive practices that may include relaxation, mindfulness, music, positive routines, nutrition and bonding activities during pregnancy, based on your preferences.",
    heroStatement: "Deepening the connection with your baby from the womb.",
    overview:
      "Holistic, time-tested practices combining prenatal meditation, music, positive routines, and bonding activities to support peaceful pregnancy.",
    highlights: ["Relaxation & meditation", "Maternal-fetal bonding", "Positive lifestyle routines"],
    media: { alt: "Garbh Sanskar and conscious pregnancy session — approved photography pending" },
    group: "pregnancy-care",
  },
  {
    slug: "nutrition-emotional-wellbeing",
    eyebrow: "Pregnancy Care",
    name: "Mental & Emotional Well-being During Pregnancy",
    shortDescription:
      "Support for emotional changes, concerns and mental well-being throughout pregnancy.",
    heroStatement: "Emotional wellbeing through pregnancy.",
    overview:
      "Gentle, compassionate space to address prenatal anxiety, emotional shifts, and mental health as you journey toward birth.",
    highlights: ["Prenatal anxiety support", "Emotional coping strategies", "Safe, non-judgmental space"],
    media: { alt: "Mental and emotional well-being during pregnancy — approved photography pending" },
    group: "pregnancy-care",
  },

  // ── Chapter 04: Preparing for Birth ─────────────────────────────────────
  {
    slug: "birth-preparation",
    eyebrow: "Preparing for Birth",
    name: "Birth Preparation & Childbirth Education",
    shortDescription:
      "Understand the stages of labour, comfort measures, birth options and what to expect during delivery.",
    heroStatement: "Preparing for birth, with confidence.",
    overview:
      "Birth preparation and childbirth education to help you understand what to expect and feel ready for delivery.",
    highlights: ["Childbirth education sessions", "Birth planning conversations", "Preparing what to expect"],
    media: { alt: "Birth preparation and childbirth education — approved photography pending" },
    group: "preparing-for-birth",
  },
  {
    slug: "birth-planning",
    eyebrow: "Preparing for Birth",
    name: "Birth Planning",
    shortDescription:
      "Discuss your preferences, expectations and available birth options with your care team before labour begins.",
    heroStatement: "Creating your personal, flexible birth plan.",
    overview:
      "Work together with your obstetrician and midwives to articulate your preferences, pain-relief choices, and birth wishes.",
    highlights: ["Informed choice exploration", "Birth preference drafting", "Flexibility & safety planning"],
    media: { alt: "Birth planning conversation — approved photography pending" },
    group: "preparing-for-birth",
  },
  {
    slug: "partner-preparation",
    eyebrow: "Preparing for Birth",
    name: "Partner Preparation & Involvement",
    shortDescription:
      "Partners can play an important role during pregnancy and labour. Preparation helps them understand how to provide practical and emotional support.",
    heroStatement: "Empowering partners as active birth advocates.",
    overview:
      "Equipping partners with practical massage techniques, breathing support, emotional reassurance, and advocacy tools for labour.",
    highlights: ["Hands-on comfort techniques", "Labour advocacy skills", "Emotional support strategies"],
    media: { alt: "Partner preparation workshop — approved photography pending" },
    group: "preparing-for-birth",
  },
  {
    slug: "doula-support",
    eyebrow: "Preparing for Birth",
    name: "Doula Support",
    shortDescription:
      "Where available, a doula may provide non-medical emotional, physical and practical support during pregnancy, labour and birth alongside the medical care team.",
    heroStatement: "Continuous, nurturing presence through labour and birth.",
    overview:
      "Dedicated doula accompaniment offering continuous physical comfort, verbal encouragement, and postpartum transition support.",
    highlights: ["Continuous labour support", "Physical comfort measures", "Non-medical holistic care"],
    media: { alt: "Doula support consultation — approved photography pending" },
    group: "preparing-for-birth",
  },

  // ── Chapter 05: Birth Options ───────────────────────────────────────────
  {
    slug: "natural-birth",
    eyebrow: "Birth Options",
    name: "Natural Birth",
    shortDescription:
      "Support for women who would like to explore a natural approach to labour and birth where appropriate.",
    heroStatement: "Prepare for the birth you hope for — with space for informed choices and flexibility along the way.",
    overview:
      "Natural birth support covers birth preferences, preparation and informed-choice conversations, while remaining flexible if your circumstances or labour change.",
    highlights: ["Birth-preference conversations", "Preparation for informed choices", "Flexibility if plans need to change"],
    media: { alt: "Natural birth planning and support — approved photography pending" },
    group: "birth-options",
  },
  {
    slug: "normal-birth-delivery",
    eyebrow: "Birth Options",
    name: "Vaginal Birth",
    shortDescription:
      "Guidance and support for vaginal delivery based on your individual pregnancy and medical needs.",
    heroStatement: "Care built around a normal, supported delivery.",
    overview:
      "Delivery care focused on supporting a normal vaginal birth, with guidance through labour and delivery itself.",
    highlights: ["Labour support", "Delivery care", "Continuity from antenatal visits through to birth"],
    media: { alt: "Normal birth and delivery care — approved photography pending" },
    group: "birth-options",
  },
  {
    slug: "vbac",
    eyebrow: "Birth Options",
    name: "VBAC — Vaginal Birth After Caesarean",
    shortDescription:
      "For suitable women, VBAC may be discussed as an option after a previous caesarean birth.",
    heroStatement: "Considering a vaginal birth after a caesarean.",
    overview:
      "For women considering a vaginal birth after a previous caesarean, this care area covers what to discuss, plan for and expect.",
    highlights: ["Eligibility conversations", "Birth planning support", "Care through labour and delivery"],
    media: { alt: "VBAC care — approved photography pending" },
    group: "birth-options",
  },
  {
    slug: "water-birth",
    eyebrow: "Birth Options",
    name: "Water Birth",
    shortDescription:
      "Water birth may be considered where clinically appropriate and where the necessary facilities and support are available.",
    heroStatement: "Warm-water immersion for gentle labour and birth.",
    overview:
      "Utilising hydrotherapy for pain relief, relaxation, and gentle transitions during suitable labours with full clinical safety.",
    highlights: ["Hydrotherapy pain relief", "Gentle transition for baby", "Clinical safety monitoring"],
    media: { alt: "Water birth consultation — approved photography pending" },
    group: "birth-options",
  },

  // ── Chapter 06: After Birth ─────────────────────────────────────────────
  {
    slug: "postpartum-care",
    eyebrow: "After Birth",
    name: "Postpartum Recovery & Care",
    shortDescription:
      "Follow-up support for physical recovery, healing and general well-being after delivery.",
    heroStatement: "Care that continues after birth.",
    overview:
      "Postpartum care supports physical recovery and wellbeing in the weeks and months following delivery.",
    highlights: [
      "Postpartum recovery check-ins",
      "Physical and emotional wellbeing support",
      "Continuity from birth into recovery",
    ],
    media: { alt: "Postpartum recovery and care — approved photography pending" },
    group: "after-birth",
  },
  {
    slug: "lactation",
    eyebrow: "After Birth",
    name: "Lactation & Breastfeeding Support",
    shortDescription:
      "Guidance and support for breastfeeding concerns and feeding-related questions.",
    heroStatement: "Support through breastfeeding, from day one.",
    overview:
      "Lactation support to help with breastfeeding in the early days and throughout, for both mother and baby.",
    highlights: ["Early breastfeeding support", "Ongoing lactation guidance", "Support for common feeding concerns"],
    media: { alt: "Lactation and breastfeeding support — approved photography pending" },
    group: "after-birth",
  },
  {
    slug: "postpartum-mental-health",
    eyebrow: "After Birth",
    name: "Postpartum Mental & Emotional Well-being",
    shortDescription:
      "Support for emotional changes, adjustment and mental well-being during the postpartum period.",
    heroStatement: "Nurturing the mother's emotional heart after birth.",
    overview:
      "Compassionate assessment and proactive support for postpartum blues, anxiety, depression, and maternal adjustment.",
    highlights: ["Postpartum emotional screening", "Adjustment counseling", "Supportive care networks"],
    media: { alt: "Postpartum mental health support — approved photography pending" },
    group: "after-birth",
  },
  {
    slug: "early-parenting-support",
    eyebrow: "After Birth",
    name: "Early Parenting Support",
    shortDescription:
      "Practical guidance as you begin caring for your newborn and adjust to the early stages of parenthood.",
    heroStatement: "Confidence and calm in the fourth trimester.",
    overview:
      "Helping you find your rhythm with baby sleep, settling, diapering, bathing, and navigating early family transitions.",
    highlights: ["Soothing & settling techniques", "Sleep rhythm guidance", "Fourth-trimester transition support"],
    media: { alt: "Early parenting support session — approved photography pending" },
    group: "after-birth",
  },

  // ── Chapter 07: Baby Care ───────────────────────────────────────────────
  {
    slug: "newborn-care",
    eyebrow: "Baby Care",
    name: "Newborn Care",
    shortDescription:
      "Support for your baby’s early health, growth and development.",
    heroStatement: "Dedicated care for your newborn's crucial first weeks.",
    overview:
      "Comprehensive neonatal check-ups, jaundice screening, weight tracking, and developmental milestones.",
    highlights: ["First-week check-ins", "Growth & milestone tracking", "Gentle neonatal evaluations"],
    media: { alt: "Newborn care consultation — approved photography pending" },
    group: "baby-care",
  },
  {
    slug: "newborn-pediatric-care",
    eyebrow: "Baby Care",
    name: "Paediatric Care",
    shortDescription:
      "Medical support and guidance for common concerns during infancy and early childhood.",
    heroStatement: "Care for your newborn, from the very start.",
    overview:
      "Newborn and pediatric care covering your baby's early days and ongoing growth and development.",
    highlights: ["Newborn check-ins", "Pediatric guidance", "Support as your baby grows"],
    media: { alt: "Newborn and pediatric care — approved photography pending" },
    group: "baby-care",
  },
  {
    slug: "feeding-growth",
    eyebrow: "Baby Care",
    name: "Feeding & Growth",
    shortDescription:
      "Guidance around feeding, growth and early developmental needs.",
    heroStatement: "Monitoring nutrition and growth with confidence.",
    overview:
      "Expert advice on bottle feeding, solids introduction, growth curves, and digestive comfort for your growing baby.",
    highlights: ["Growth curve tracking", "Weaning & solids guidance", "Digestive comfort support"],
    media: { alt: "Feeding and growth consultation — approved photography pending" },
    group: "baby-care",
  },
  {
    slug: "parenting-guidance",
    eyebrow: "Baby Care",
    name: "Parenting Guidance",
    shortDescription:
      "Practical support for parents as they understand their baby’s needs and build confidence during the early months.",
    heroStatement: "Reassurance and wisdom for the parenting journey.",
    overview:
      "Developmentally informed guidance to decode baby cues, foster secure attachment, and ease parental anxiety.",
    highlights: ["Decoding infant cues", "Attachment-focused parenting", "Partner team dynamics"],
    media: { alt: "Parenting guidance consultation — approved photography pending" },
    group: "baby-care",
  },
];

export function getServiceBySlug(slug: string): ServiceContent | undefined {
  return services.find((service) => service.slug === slug);
}

/**
 * Presentation map for the /services master page across the 7 care chapters.
 */
export interface CareChapter {
  id: CareGroup;
  label: string;
  eyebrow: string;
  heading: string;
  intro: string;
  slugs: string[];
  note?: string;
}

const CARE_CHAPTERS_RAW: CareChapter[] = [
  {
    id: "womens-health",
    label: "Women's Health",
    eyebrow: "Women's Health",
    heading: "Care for your health, not just pregnancy.",
    intro:
      "Women’s healthcare begins long before pregnancy and continues through every stage of life. The Birthwave brings together preventive care, gynaecological support, intimate wellness, hormonal health and long-term well-being.",
    slugs: [
      "adolescent-health",
      "gynaecology",
      "pcos-menstrual-health",
      "vaginismus",
      "weight-metabolic-wellness",
      "mental-emotional-wellbeing",
      "menopause-care",
      "preventive-health",
    ],
  },
  {
    id: "planning-a-pregnancy",
    label: "Planning a Pregnancy",
    eyebrow: "Planning a Pregnancy",
    heading: "Thinking about pregnancy?",
    intro:
      "You don’t have to wait until you’re pregnant to begin preparing. Preconception care can help you understand your health, fertility, nutrition and any concerns before pregnancy begins.",
    slugs: ["fertility-preconception", "preconception-health", "conscious-pregnancy-prep"],
  },
  {
    id: "pregnancy-care",
    label: "Pregnancy Care",
    eyebrow: "Pregnancy Care",
    heading: "Care that grows with your pregnancy.",
    intro:
      "Pregnancy brings different needs at every stage. Antenatal care at The Birthwave is designed to support both medical health and overall well-being throughout the pregnancy journey.",
    slugs: [
      "pregnancy-antenatal-care",
      "nutrition-pregnancy",
      "garbh-sanskar",
      "nutrition-emotional-wellbeing",
    ],
  },
  {
    id: "preparing-for-birth",
    label: "Preparing for Birth",
    eyebrow: "Preparing for Birth",
    heading: "Understand birth before labour begins.",
    intro:
      "Birth preparation gives you time to understand your options, ask questions and feel more prepared for labour and delivery.",
    slugs: ["birth-preparation", "birth-planning", "partner-preparation", "doula-support"],
  },
  {
    id: "birth-options",
    label: "Birth Options",
    eyebrow: "Birth Options",
    heading: "Understanding your birth options.",
    intro:
      "Every pregnancy and labour is different. Your birth plan should take your health, pregnancy and individual circumstances into account.",
    note: "Your care team can help you understand which options may be suitable for you.",
    slugs: ["natural-birth", "normal-birth-delivery", "vbac", "water-birth"],
  },
  {
    id: "after-birth",
    label: "After Birth",
    eyebrow: "After Birth",
    heading: "Your care doesn’t end with delivery.",
    intro:
      "The weeks and months after birth bring physical, emotional and practical changes. Postpartum care supports recovery while helping you adjust to life with your baby.",
    slugs: ["postpartum-care", "lactation", "postpartum-mental-health", "early-parenting-support"],
  },
  {
    id: "baby-care",
    label: "Baby Care",
    eyebrow: "Baby Care",
    heading: "Care for your baby’s beginning.",
    intro:
      "The early months bring new questions for every parent. The Birthwave supports your baby’s health while helping you feel more confident in your role as a parent.",
    slugs: ["newborn-care", "newborn-pediatric-care", "feeding-growth", "parenting-guidance"],
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

/** Flat presentation order (all services, chapter by chapter) — read by the Care
 * Journey section for each service link's own global index. */
export const servicesShowcaseOrder: ServiceContent[] = careChapters.flatMap((c) => c.services);

// ── Section 01 — Hero (Exact prompt copy) ───────────────────────────────────

export const servicesHero = {
  eyebrow: "OUR SERVICES",
  heading: "Care for where you are now—and what comes next.",
  headlineLines: ["Care for where you are now—", "and what comes next."],
  description:
    "Explore care for women’s health, pregnancy preparation, pregnancy, recovery and your baby’s early years. Start with what matters to you, and find the support that fits your stage of life.",
  supporting:
    "Explore care for women’s health, pregnancy preparation, pregnancy, recovery and your baby’s early years. Start with what matters to you, and find the support that fits your stage of life.",
  primaryCta: { label: "Find your care", href: "#find-care" },
  secondaryCta: { label: "Request an appointment", href: "/contact" },
  note: "Consultations by appointment · Chennai",
  media: {
    alt: "A mother and newborn together in a calm, softly lit consultation setting.",
  },
} as const;

// ── Section 02 — Doorways Care Finder ("What can we help you with?") ──────────

export interface CareFinderLink {
  label: string;
  href: string;
  isAnchor: boolean;
}

export interface CareFinderColumn {
  number: string;
  heading: string;
  imageKey: "care-finder-your-health" | "care-finder-pregnancy-birth" | "care-finder-after-birth-baby";
  imageAlt: string;
  imageFocalPoint: string;
  links: CareFinderLink[];
}

export const doorwaysCareFinder = {
  eyebrow: "FIND YOUR CARE",
  heading: "A place for every part of you.",
  description: "Choose where you are today. We’ll help you find your next step.",
  columns: [
    {
      number: "01",
      heading: "Your health",
      imageKey: "care-finder-your-health" as const,
      imageAlt: "A woman discusses her health and wellbeing with a clinician in a calm consultation setting.",
      imageFocalPoint: "center 22%",
      links: [
        { label: "Women’s healthcare", href: "#womens-health", isAnchor: true },
        { label: "Weight & metabolic health", href: "/services/weight-metabolic-wellness", isAnchor: false },
        { label: "Emotional well-being", href: "/services/mental-emotional-wellbeing", isAnchor: false },
        { label: "Perimenopause & menopause", href: "/services/menopause-care", isAnchor: false },
        { label: "Preventive screening", href: "/services/preventive-health", isAnchor: false },
      ],
    },
    {
      number: "02",
      heading: "Pregnancy & birth",
      imageKey: "care-finder-pregnancy-birth" as const,
      imageAlt: "A couple in a consultation discussing pregnancy and birth options.",
      imageFocalPoint: "center 25%",
      links: [
        { label: "Planning a pregnancy", href: "#planning-a-pregnancy", isAnchor: true },
        { label: "Pregnancy care", href: "#pregnancy-care", isAnchor: true },
        { label: "Preparing for birth", href: "#preparing-for-birth", isAnchor: true },
        { label: "Exploring birth options", href: "#birth-options", isAnchor: true },
      ],
    },
    {
      number: "03",
      heading: "After birth & baby",
      imageKey: "care-finder-after-birth-baby" as const,
      imageAlt: "A mother holds her newborn during a consultation.",
      imageFocalPoint: "center 20%",
      links: [
        { label: "Recovery after birth", href: "#after-birth", isAnchor: true },
        { label: "Care for your baby", href: "#baby-care", isAnchor: true },
      ],
    },
  ] satisfies CareFinderColumn[],
  helpPanel: {
    heading: "Unsure where to begin?",
    linkText: "Talk to our team",
    linkHref: "/contact",
  },
} as const;

/** Preserved compact care finder options for backwards-compatibility. */
export const compactCareFinder = {
  eyebrow: doorwaysCareFinder.eyebrow,
  heading: doorwaysCareFinder.heading,
  intro: doorwaysCareFinder.description,
  options: [
    {
      intent: "Women’s healthcare",
      detail: "Gynaecology, menstrual health, PCOS, intimate wellness and preventive care.",
      href: "#womens-health",
      targetLabel: "Women’s Health",
    },
    {
      intent: "Weight & metabolic health",
      detail: "Support for healthy weight management, insulin sensitivity and lifestyle wellness.",
      href: "/services/weight-metabolic-wellness",
      targetLabel: "Weight & Metabolic Wellness",
    },
    {
      intent: "Emotional well-being",
      detail: "Mental and emotional health support through every stage of a woman’s life.",
      href: "/services/mental-emotional-wellbeing",
      targetLabel: "Mental & Emotional Well-being",
    },
    {
      intent: "Planning a pregnancy",
      detail: "Preconception health reviews, fertility support and conscious preparation.",
      href: "#planning-a-pregnancy",
      targetLabel: "Planning a Pregnancy",
    },
    {
      intent: "Pregnancy care",
      detail: "Antenatal check-ins, prenatal nutrition, Garbh Sanskar and ongoing guidance.",
      href: "#pregnancy-care",
      targetLabel: "Pregnancy Care",
    },
    {
      intent: "Preparing for birth",
      detail: "Childbirth education, birth planning, partner involvement and doula support.",
      href: "#preparing-for-birth",
      targetLabel: "Preparing for Birth",
    },
    {
      intent: "Exploring birth options",
      detail: "Natural birth, vaginal birth, VBAC and water birth considerations.",
      href: "#birth-options",
      targetLabel: "Birth Options",
    },
    {
      intent: "Recovery after birth",
      detail: "Postpartum physical recovery, breastfeeding support and maternal adjustment.",
      href: "#after-birth",
      targetLabel: "After Birth",
    },
    {
      intent: "Care for your baby",
      detail: "Newborn evaluations, paediatric care, growth tracking and parenting guidance.",
      href: "#baby-care",
      targetLabel: "Baby Care",
    },
    {
      intent: "Perimenopause & menopause",
      detail: "Care for hormonal changes, symptom management and long-term health.",
      href: "/services/menopause-care",
      targetLabel: "Perimenopause & Menopause",
    },
    {
      intent: "Preventive screening",
      detail: "Routine women’s health checks, including breast and cervical screening.",
      href: "/services/preventive-health",
      targetLabel: "Preventive Screening",
    },
  ],
} as const;

/** Alias for backward compatibility if imported elsewhere. */
export const findTheRightCare = {
  eyebrow: compactCareFinder.eyebrow,
  heading: compactCareFinder.heading,
  intro: compactCareFinder.intro,
  pairings: compactCareFinder.options.map((opt) => ({
    question: opt.intent,
    description: opt.detail,
    answers: [{ label: opt.targetLabel, slug: opt.href.replace(/^#/, "").replace(/^\/services\//, "") }],
  })),
} as const;

export const findHelpCta = {
  eyebrow: "Not Sure Where to Start?",
  heading: "You don’t need to know the name of the service you need.",
  body: "Sometimes you know something doesn’t feel right, but you’re not sure which specialist or service to choose. Tell us what you’re experiencing, and our team can help guide you towards the appropriate care.",
  primaryCta: { label: "Find Your Care", href: "#find-care" },
  secondaryCta: {
    label: "Chat on WhatsApp",
    href: "https://wa.me/917904251378",
  },
} as const;

// ── Section 04 — Care Philosophy ("One Connected Journey") ─────────────────

export const connectedCare = {
  eyebrow: "OUR APPROACH TO CARE",
  heading: "Different services. One connected approach to care.",
  philosophyLines: [
    "At The Birthwave, women’s health is not viewed as a series of isolated appointments.",
    "Our approach considers the wider picture — your physical health, emotional well-being, lifestyle, reproductive health and stage of life.",
    "The aim is to provide care that listens, explains and adapts as your needs change.",
  ],
  body:
    "Care connects from one stage to the next so you don't have to experience each transition as a separate journey.",
  cta: { label: "About The Birthwave", href: "/about" },
} as const;

// ── Section 05 — Final Appointment CTA (Combined dark closure) ─────────────

export const servicesFinalCta = {
  eyebrow: "START WHERE YOU ARE",
  heading: "Ready to begin, or not sure where to start?",
  headingLines: ["Ready to begin, or not sure", "where to start?"],
  supporting:
    "Whether you know exactly which service you need or simply want guidance on the right place to begin, our care team is here to listen and help you take the next step.",
  primaryCta: { label: "Request an appointment", href: "/contact" },
  secondaryCta: {
    label: "Chat on WhatsApp",
    href: "https://wa.me/917904251378",
  },
  phoneLabel: "Call",
  phoneNumber: "+91 93630 31925",
  phoneHref: "tel:+919363031925",
  note: "Consultations by appointment · Mahalingapuram, Nungambakkam, Chennai",
} as const;
