/**
 * Fertility & Preconception — dedicated landing page content.
 *
 * A SEPARATE content file from `services-content.ts`, exactly like the other
 * four dedicated landing pages: that file's own `fertility-preconception`
 * entry (name, slug, shortDescription, overview, highlights, media.alt) is
 * the shared service record every other consumer reads (Quick Overview, the
 * Sticky Showcase, Find the Right Care, `generateStaticParams`) — untouched
 * by this page. Everything below is this landing page's own, additional
 * copy, built only from that record's three confirmed facts (preconception
 * health guidance, fertility conversations, planning support).
 *
 * SCOPE: nothing below expands this service into IVF, IUI, ovarian
 * stimulation, egg freezing, fertility surgery, guaranteed conception or an
 * infertility-treatment package — none of those are confirmed anywhere in
 * this project. No test, scan, laboratory panel, hormone test, semen
 * analysis, treatment protocol, success rate, timeline to pregnancy, fee or
 * medication plan is invented; every fact this project cannot currently
 * verify is left as an explicit bracketed placeholder, the same pattern the
 * other four landing pages already establish.
 *
 * CLINICIAN SECTION: `doctors-content.ts` maps exactly one confirmed
 * clinician to this slug — Dr. Bharathy Kandasamy carries
 * `relatedCareSlugs: ["fertility-preconception", "gynaecology"]`. The
 * Founder's own "Holistic Fertility Coach" special focus is NOT, on its
 * own, a confirmed assignment to this specific programme (she carries no
 * `relatedCareSlugs` at all, unlike every other profile that has one) —
 * exactly the "assume a listed doctor provides this service unless
 * confirmed" mistake the brief rules out, and the same reasoning
 * `vbac-landing-content.ts` already documents for its own clinician
 * section. Only Dr. Bharathy Kandasamy's confirmed name, credentials and
 * role appear below — no invented years of experience, procedure counts,
 * conception rates or awards.
 *
 * IMAGES: five original placeholder subjects are mapped in
 * `fertility-preconception-landing-imagery.ts` (no image-generation tool is
 * available in this session — see that file's own top comment and
 * `docs/fertility-preconception-ai-imagery.md` for the pending generation
 * briefs). The clinician portrait slot is separate and reserved for
 * approved real photography, never an AI illustration.
 */

export const fertilityHero = {
  eyebrow: "FERTILITY & PRECONCEPTION",
  heading: "Fertility & Preconception",
  supportingHeadline: "Start with understanding. Plan with clarity.",
  body: "Whether you are preparing for pregnancy, beginning to think about fertility or simply want to understand your health before trying to conceive, a preconception consultation gives you space to ask questions and plan your next steps.",
  primaryCta: { label: "Book a Preconception Consultation", href: "#fertility-enquiry" },
  secondaryCta: { label: "See what the consultation covers ↓", href: "#fertility-covers" },
} as const;

export const fertilityWhoThisIsFor = {
  eyebrow: "IS THIS THE RIGHT PLACE TO START?",
  heading: "Planning pregnancy, or simply wanting to understand your fertility better?",
  points: [
    "You are planning to try for pregnancy and want to prepare beforehand.",
    "You have questions about fertility or reproductive health before trying to conceive.",
    "You want to review your health, history and concerns before pregnancy.",
    "You are not sure what your next step should be and want a professional conversation first.",
  ],
  closing: "The right next step depends on your individual history and circumstances.",
} as const;

export const fertilityConsultationCovers = {
  eyebrow: "WHAT WE TALK THROUGH",
  heading: "A consultation built around where you are starting from.",
  imageKey: "consultation" as const,
  steps: [
    {
      number: "01",
      title: "Your health and history",
      body: "Discuss relevant medical, menstrual, reproductive and pregnancy history available to you.",
    },
    {
      number: "02",
      title: "Your plans and questions",
      body: "Talk about when you may want to try for pregnancy and what you would like to understand beforehand.",
    },
    {
      number: "03",
      title: "Your concerns",
      body: "Bring questions about fertility, previous experiences or anything making you uncertain about the next step.",
    },
    {
      number: "04",
      title: "Planning what comes next",
      body: "Your clinician can explain what follow-up conversations, assessments or care may be appropriate based on your individual circumstances.",
    },
  ],
} as const;

export const fertilityPreparing = {
  eyebrow: "BEFORE PREGNANCY",
  heading: "Preparation can begin before a positive pregnancy test.",
  body: "Preconception care creates space to look at your health, questions and plans before pregnancy begins.",
  imageKey: "preparing" as const,
  points: [
    {
      title: "UNDERSTAND YOUR STARTING POINT",
      body: "Discuss your health history, reproductive concerns and previous experiences.",
    },
    {
      title: "ASK EARLY QUESTIONS",
      body: "Bring the things you want clarified before trying for pregnancy.",
    },
    {
      title: "PLAN THE NEXT STEP",
      body: "Understand whether any follow-up, specialist input or additional discussion may be appropriate.",
    },
  ],
  note: "Preconception care does not guarantee pregnancy or predict how quickly conception may occur.",
} as const;

/**
 * The People Behind Your Care — the one confirmed clinician mapped to this
 * slug (see this file's own top comment). Deliberately no bio: nothing is
 * confirmed for Dr. Bharathy Kandasamy beyond name, credentials and role in
 * `doctors-content.ts`, so none is shown here rather than invented.
 */
export const fertilityClinician = {
  eyebrow: "THE PEOPLE BEHIND YOUR CARE",
  heading: "Start the journey with a conversation that considers what may come next.",
  doctorSlug: "dr-bharathy-kandasamy",
  philosophy: "The Birthwave approaches women's health, pregnancy, birth and recovery as one continuous care journey.",
  profileHref: "/doctors/dr-bharathy-kandasamy",
  viewProfileLabel: "View Full Profile",
  bookLabel: "Book Consultation",
  bookHref: "#fertility-enquiry",
} as const;

export const fertilityFirstConsultation = {
  eyebrow: "YOUR FIRST CONVERSATION",
  heading: "Bring your history. Bring your questions.",
  imageKey: "first-consultation" as const,
  steps: [
    {
      number: "01",
      title: "Share your starting point",
      body: "Talk about your health, reproductive history and what brings you in now.",
    },
    {
      number: "02",
      title: "Discuss what matters to you",
      body: "Ask questions about fertility, pregnancy planning and concerns you want to understand.",
    },
    {
      number: "03",
      title: "Clarify what happens next",
      body: "Understand whether follow-up, further discussion or additional care may be recommended.",
    },
  ],
  cta: { label: "Book a Preconception Consultation", href: "#fertility-enquiry" },
} as const;

/**
 * Practical Information — every field below is an explicit
 * confirmed-pending placeholder except Provider, which is the one
 * confirmed fact this project has (see this file's own top comment). No
 * verified consultation location, records checklist, booking process, fee
 * or contact detail exists anywhere in this project yet.
 */
export const fertilityPractical = {
  eyebrow: "BEFORE YOU VISIT",
  heading: "Know what to bring—and what still needs to be confirmed.",
  facilityPhotoPendingLabel: "Actual consultation-space photograph\nApproved photography pending",
  info: [
    { label: "Consultation location", lines: ["[To be confirmed by The Birthwave]"] },
    { label: "Provider", lines: ["Dr. Bharathy Kandasamy", "Gynaecologist · Laparoscopic Surgeon · Advanced Fertility Specialist"] },
    { label: "Records to bring", lines: ["[To be confirmed by The Birthwave — ask the team]"] },
    { label: "Booking process", lines: ["[To be confirmed by The Birthwave]"] },
    { label: "Consultation fee", lines: ["[To be confirmed by The Birthwave]"] },
    { label: "Follow-up process", lines: ["[To be confirmed by The Birthwave]"] },
    { label: "Contact details", lines: ["[To be confirmed by The Birthwave]"] },
  ],
} as const;

export const fertilityFaq = {
  eyebrow: "Good to Know",
  heading: "Questions before you visit.",
  items: [
    {
      question: "When should I consider a preconception consultation?",
      answer: "You may choose to have a preconception conversation before trying for pregnancy if you want to discuss your health, fertility questions or preparation in advance.",
    },
    {
      question: "Is this only for people having difficulty conceiving?",
      answer: "No. Preconception care can also be useful for people who are simply planning pregnancy and want to understand their health and next steps beforehand.",
    },
    {
      question: "Does a fertility consultation mean I will need treatment?",
      answer: "Not necessarily. The purpose of the consultation is to understand your individual situation and discuss what, if anything, may be appropriate next.",
    },
    {
      question: "Will I need tests?",
      answer: "Testing depends on your individual history and clinical circumstances. This will be discussed with you directly rather than listed here in advance.",
    },
    {
      question: "What should I bring to the appointment?",
      answer: "[Approved clinic guidance on what to bring will appear here.]",
    },
    {
      question: "Can you guarantee pregnancy?",
      answer: "No. Fertility and pregnancy outcomes cannot be guaranteed.",
    },
    {
      question: "What if I become pregnant after booking?",
      answer: "The appropriate next care pathway can be discussed with The Birthwave team, including transition into Pregnancy & Antenatal Care where relevant.",
    },
  ],
} as const;

/**
 * Related Care — restrained links to three separate, existing services
 * (their real names/slugs read from `services-content.ts`, never
 * re-typed). Vaginismus & Intimate Wellness is deliberately not included:
 * no confirmed clinician mapping in `doctors-content.ts` links it to
 * fertility/preconception care, unlike Gynaecology (Dr. Bharathy
 * Kandasamy's own second `relatedCareSlugs` entry).
 */
export const fertilityRelatedCare = {
  eyebrow: "Related Care",
  heading: "Explore related, separate services.",
  note: "These are separate services at The Birthwave, not automatically included in a preconception consultation.",
  slugs: ["gynaecology", "pregnancy-antenatal-care", "nutrition-emotional-wellbeing"],
} as const;

/**
 * Final Enquiry — TODO(infra): exactly like the other four landing pages'
 * own forms, no backend endpoint or verified inbox exists yet to actually
 * receive a submission. Shows the same honest "design preview, not
 * connected" pattern rather than a fake submission-success message.
 * Deliberately short: full name, a single phone-or-email contact field,
 * and an optional message. Nothing here is written to browser storage.
 */
export const fertilityEnquiry = {
  eyebrow: "PLAN YOUR NEXT STEP",
  heading: "Start with a conversation before pregnancy begins.",
  body: "Enquire about The Birthwave's Fertility & Preconception consultation and understand how to begin.",
  fields: {
    name: "Full name",
    contact: "Phone number or email",
    message: "What would you like to discuss about fertility or preconception care? (optional)",
  },
  submitLabel: "Send Enquiry",
  urgentNote: "This form is for appointment information and non-urgent enquiries. For urgent medical concerns, contact your healthcare provider or local emergency service.",
  previewNotice: "Preview — this form is not yet connected to a live enquiry inbox.",
  previewResult: "This is a design preview. No enquiry has been sent — connect this form to a real enquiry endpoint before publishing.",
} as const;

export const fertilityMobileCta = {
  label: "Book a Consultation",
  href: "#fertility-enquiry",
} as const;
