/**
 * Nutrition & Emotional Well-being — dedicated landing page content.
 *
 * A SEPARATE content file from `services-content.ts`, exactly like the other
 * nine dedicated landing pages: that file's own `nutrition-emotional-wellbeing`
 * entry (name, slug, shortDescription, heroStatement, overview, highlights,
 * media.alt) is the shared service record every other consumer reads (Quick
 * Overview, the Sticky Showcase, Find the Right Care, `generateStaticParams`)
 * — untouched by this page. Everything below is this landing page's own,
 * additional copy, transcribed from the confirmed brief for this page.
 *
 * TONE: calm, supportive, practical, non-judgmental, inclusive, clinically
 * responsible. No diet-culture language, no weight-loss language, no "clean
 * eating," no body-shaming, no "perfect diet" messaging, no "just stay
 * positive," no minimising emotional concerns, no promised mood improvement,
 * no promised pregnancy outcome, no mental-health diagnosis language, no
 * implication that nutrition alone solves emotional or medical problems.
 * Emotional well-being support is never positioned as a substitute for
 * medical or mental-health care.
 *
 * SCOPE: nothing below expands this service into diet plans, weight-loss
 * programmes, eating-disorder treatment, psychiatric care, psychotherapy,
 * counselling programmes, medication management, anxiety/depression
 * diagnosis, nutritional supplements, laboratory testing or pregnancy diet
 * packages — none of those are confirmed anywhere in this project. Every
 * operational fact this project cannot currently verify is left as an
 * explicit bracketed "[BirthWave confirmation needed: ...]" placeholder,
 * the same pattern the other dedicated landing pages already establish —
 * never silently filled with a plausible-sounding guess.
 *
 * CARE TEAM: `doctors-content.ts` maps exactly two confirmed team members to
 * this slug via their own `relatedCareSlugs` — Deepa (M.Sc Psychology,
 * "Emotional Well-being Support") and Sherene ("Nutritionist", no further
 * credentials confirmed). Both shown, read live from `doctors-content.ts`
 * rather than re-typed, so this section can never drift from the confirmed
 * roster. Neither is described as a psychologist, therapist, counsellor,
 * clinical psychologist or dietitian — none of those titles are confirmed.
 *
 * IMAGES: `nutrition-emotional-wellbeing-landing-imagery.ts` reuses the one
 * real, approved illustration already generated for this service
 * (`/images/services/nutrition-emotional-wellbeing-ai-preview-v1.webp`,
 * already live on the plain `/services` listing) for the hero — inspected
 * and confirmed accurate: a pregnant woman in conversation with a wellness
 * professional over a balanced, unstyled meal, no diet-culture staging. The
 * other four conceptual spots have no dedicated approved image yet — see
 * `docs/nutrition-emotional-wellbeing-ai-imagery.md` for the pending
 * generation briefs.
 */

export const nutritionHero = {
  eyebrow: "WHOLE-PERSON SUPPORT",
  heading: "Nutrition & Emotional Well-being",
  supportingHeadline: "Space to talk about nourishment, energy, emotions and the changes around your care journey.",
  body: "Nutrition and emotional well-being can shape how you experience pregnancy, recovery and everyday health.",
  bodySecondary:
    "You may have questions about eating well, energy, changing needs, stress, emotional adjustment or simply how to feel more supported through a period of change. A consultation gives you space to talk through what you are experiencing and understand what kind of support may be appropriate next.",
  primaryCta: { label: "Book a Well-being Consultation", href: "#enquiry" },
  secondaryCta: { label: "Explore how support works ↓", href: "#what-we-cover" },
} as const;

export const nutritionIntro = {
  eyebrow: "SUPPORT BEYOND SYMPTOMS",
  heading: "Your physical and emotional experience are both worth talking about.",
  paragraphs: [
    "Periods of change can affect appetite, energy, routine, sleep, confidence and emotional well-being in different ways.",
    "You may arrive with a specific question, or simply know that something feels harder to manage than usual.",
    "You do not need to decide whether your concern is “nutrition” or “emotional well-being” before asking for support.",
    "A consultation can help you describe what you are experiencing and understand what kind of follow-up may be appropriate.",
  ],
  themes: [
    { title: "Nourishment", body: "Discuss questions around eating, changing nutritional needs or difficulties maintaining a comfortable routine." },
    { title: "Energy & daily life", body: "Talk about how food, rest and day-to-day demands are affecting how you feel." },
    { title: "Emotional well-being", body: "Bring questions about stress, adjustment, overwhelm or emotional changes you want to understand better." },
  ],
  cta: { label: "Book a Consultation", href: "#enquiry" },
} as const;

/**
 * What This Support May Include — anchors `#what-we-cover`, the hero's own
 * secondary link target. Four numbered steps beside one image, matching
 * `lactation-covers.tsx`/`postpartum-care-covers.tsx`'s own numbered-steps
 * composition. Step 04 explicitly leaves the next step to the care team's
 * own explanation, never an automatic assessment.
 */
export const nutritionCovers = {
  eyebrow: "WHAT WE CAN TALK THROUGH",
  heading: "Start with what feels most relevant to you right now.",
  steps: [
    { number: "01", title: "Your current experience", body: "Share what has changed, what feels difficult or what you would like to understand." },
    { number: "02", title: "Your routines and needs", body: "Discuss eating patterns, energy, daily demands or emotional adjustments where relevant." },
    { number: "03", title: "Your questions", body: "Bring anything you want clarified about nutrition, well-being or the next step." },
    { number: "04", title: "What happens next", body: "Understand whether further guidance, another service from The Birthwave or additional clinical support may be appropriate." },
  ],
  note: "The exact advice and follow-up depend on your individual circumstances.",
} as const;

/**
 * Nutrition and Emotional Well-being Together. Four themes beside a quiet
 * reflective image, matching `postpartum-care-recovery.tsx`'s own
 * points-plus-image composition. Closes with an explicit "not a substitute
 * for urgent medical or mental-health care" note.
 */
export const nutritionTogether = {
  eyebrow: "CONNECTED WELL-BEING",
  heading: "Care does not always fit neatly into one category.",
  body: "Nutrition, energy, recovery, stress and emotional adjustment can overlap.",
  bodySecondary: "That does not mean every concern has the same cause or the same solution. The aim of the consultation is to understand what you are experiencing and help clarify which kind of support may be useful next.",
  themes: [
    { title: "Nourishing yourself", body: "Talk about eating, appetite, routines or nutritional questions relevant to your stage of care." },
    { title: "When energy feels low", body: "Discuss how day-to-day demands, rest and nourishment may be affecting your routine." },
    { title: "When emotions feel harder to manage", body: "Bring questions about stress, overwhelm or emotional changes you want to talk through." },
    { title: "When more support may be needed", body: "If a concern falls outside this service's scope, your care team can help explain what type of professional support may be more appropriate." },
  ],
  note: "Nutrition and emotional-well-being support do not replace urgent medical or mental-health care.",
  cta: { label: "Talk to the Care Team", href: "#enquiry" },
} as const;

export const nutritionFirstConsultation = {
  eyebrow: "YOUR FIRST CONVERSATION",
  heading: "You can start with what feels hardest to manage right now.",
  steps: [
    { number: "01", title: "Share what brings you in", body: "Explain the nutrition, energy or emotional-well-being questions you would like to discuss." },
    { number: "02", title: "Talk through the context", body: "Share relevant information about your current stage of care, routines or recent changes." },
    { number: "03", title: "Understand your next step", body: "Ask what follow-up, guidance or additional professional support may be appropriate." },
  ],
  note: "A meal plan, counselling, therapy, diagnosis, supplements or tests are never assumed — what's appropriate depends on your individual consultation.",
  cta: { label: "Book a Well-being Consultation", href: "#enquiry" },
} as const;

/**
 * Care Team — `doctors-content.ts` maps exactly TWO confirmed team members
 * to this slug (see this file's own top comment): Deepa and Sherene. Both
 * shown; names, credentials, roles and portrait status are read directly
 * from that single source of truth in
 * `nutrition-emotional-wellbeing-clinician.tsx` rather than re-typed here,
 * so this section can never drift from the confirmed roster.
 */
export const nutritionClinician = {
  eyebrow: "THE PEOPLE BEHIND YOUR CARE",
  heading: "Support shaped around the questions you bring.",
  doctorSlugs: ["deepa", "sherene"],
  profileLabel: "View Full Profile",
  bookLabel: "Book Consultation",
  bookHref: "#enquiry",
} as const;

/**
 * Practical Information — every field is an explicit confirmed-pending
 * placeholder, the same pattern the other dedicated landing pages already
 * establish for unconfirmed operational detail.
 */
export const nutritionPractical = {
  eyebrow: "BEFORE YOUR VISIT",
  heading: "A few practical details before you book.",
  intro: "Some details are still being confirmed. Where that's the case, we say so plainly below rather than guessing.",
  facilityPhotoPendingLabel: "Actual consultation-space photograph\nApproved photography pending",
  info: [
    { label: "Consultation location", lines: ["[The Birthwave confirmation needed: consultation location]"] },
    { label: "Consultation format", lines: ["[The Birthwave confirmation needed: in-person / online availability]"] },
    { label: "Which professional you will meet", lines: ["[The Birthwave confirmation needed: booking / provider assignment process]"] },
    { label: "What to bring", lines: ["[The Birthwave confirmation needed: what to bring]"] },
    { label: "Consultation duration", lines: ["[The Birthwave confirmation needed: duration]"] },
    { label: "Fee", lines: ["[The Birthwave confirmation needed: consultation fee]"] },
    { label: "Follow-up", lines: ["[The Birthwave confirmation needed: follow-up process]"] },
    { label: "Booking", lines: ["[The Birthwave confirmation needed: booking method / phone / WhatsApp]"] },
  ],
} as const;

export const nutritionFaq = {
  eyebrow: "Good to Know",
  heading: "Questions before you enquire.",
  items: [
    {
      question: "Who is Nutrition & Emotional Well-being support for?",
      answer: "You may consider a consultation if you have questions about nutrition, changing routines, energy or emotional adjustment and want to understand what kind of support may be appropriate.",
    },
    {
      question: "Do I need to have a specific problem before booking?",
      answer: "No. You may have a specific concern or simply want to talk through changes and questions you have noticed.",
    },
    {
      question: "Will I receive a diet plan?",
      answer: "[The Birthwave confirmation needed: whether personalised nutrition plans are offered]",
    },
    {
      question: "Can I discuss emotional concerns?",
      answer: "Yes, emotional well-being can be part of the conversation within the confirmed scope of this service.",
    },
    {
      question: "Is this mental-health treatment?",
      answer: "This service provides emotional-well-being support within The Birthwave's confirmed care scope. If you need specialist mental-health assessment or treatment, ask the care team what type of professional support is appropriate.",
    },
    {
      question: "Can I discuss nutrition during pregnancy or postpartum?",
      answer: "Yes, nutrition questions may arise at different stages of care. The appropriate guidance depends on your individual circumstances.",
    },
    {
      question: "Will I need tests?",
      answer: "Testing is not assumed as part of this service. If any assessment is recommended, your care team should explain why.",
    },
    {
      question: "How many sessions will I need?",
      answer: "That depends on your individual circumstances and the type of support recommended.",
    },
    {
      question: "What if I am experiencing severe emotional distress or feel unsafe?",
      answer: "This webpage and enquiry form are not an emergency mental-health service. If you or someone else may be in immediate danger, contact local emergency services or an appropriate urgent-care service immediately.",
    },
  ],
} as const;

/**
 * Related Care — restrained links to four EXISTING, separate services
 * (their real names/slugs read from `services-content.ts`, never re-typed),
 * explicitly not framed as bundled care.
 */
export const nutritionRelatedCare = {
  eyebrow: "CONNECTED CARE",
  heading: "Support can connect with other parts of your journey with The Birthwave.",
  note: "These are separate services at The Birthwave, not automatically bundled with Nutrition & Emotional Well-being.",
  slugs: ["pregnancy-antenatal-care", "fertility-preconception", "postpartum-care", "lactation"],
} as const;

/**
 * Final Enquiry — TODO(infra): exactly like the other nine landing pages'
 * own forms, no backend endpoint or verified enquiry inbox exists yet.
 * Shows the same honest "design preview, not connected" pattern rather than
 * a fake submission-success message. Deliberately short: full name, a
 * single phone-or-email contact field, and an optional message. Nothing
 * here is written to browser storage.
 */
export const nutritionEnquiry = {
  eyebrow: "START WITH A CONVERSATION",
  heading: "You do not need to have everything figured out before asking for support.",
  body: "Enquire about The Birthwave's Nutrition & Emotional Well-being service and understand how to begin a consultation.",
  fields: {
    name: "Full name",
    contact: "Phone number or email",
    message: "What would you like to discuss about nutrition or emotional well-being? (optional)",
  },
  submitLabel: "Send Enquiry",
  formNote: "This form is for appointment information and non-urgent enquiries. It is not an emergency medical or mental-health service.",
  urgentNote: "This webpage and enquiry form are not an emergency service. If you or someone else may be in immediate danger, contact local emergency services or an appropriate urgent-care service immediately.",
  previewNotice: "Preview — enquiry integration pending.",
  previewResult: "This is a design preview. No enquiry has been sent — connect this form to a real enquiry endpoint before publishing.",
} as const;

export const nutritionMobileCta = {
  label: "Book a Well-being Consultation",
  href: "#enquiry",
} as const;
