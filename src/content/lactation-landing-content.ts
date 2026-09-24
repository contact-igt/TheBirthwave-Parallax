/**
 * Lactation & Breastfeeding Support — dedicated landing page content.
 *
 * A SEPARATE content file from `services-content.ts`, exactly like the other
 * seven dedicated landing pages: that file's own `lactation` entry (name,
 * slug, shortDescription, heroStatement, overview, highlights, media.alt) is
 * the shared service record every other consumer reads (Quick Overview, the
 * Sticky Showcase, Find the Right Care, `generateStaticParams`) — untouched
 * by this page. Everything below is this landing page's own, additional
 * copy, transcribed from the confirmed brief for this page.
 *
 * SCOPE: nothing below claims a guaranteed breastfeeding success, guaranteed
 * latch improvement, guaranteed increase in milk supply, pain-free
 * breastfeeding, specific feeding outcome, treatment duration, session
 * count, home visit, online appointment, procedure, medication or specific
 * clinical assessment — none of those are confirmed anywhere in this
 * project. Every operational fact this project cannot currently verify
 * (location, format, home visits, duration, fee, follow-up, booking method,
 * feeding-observation policy, accompaniment policy) is left as an explicit
 * bracketed "[BirthWave confirmation needed: ...]" placeholder, the same
 * "say so plainly" pattern the other dedicated landing pages already
 * establish for unconfirmed operational detail — never silently filled with
 * a plausible-sounding guess.
 *
 * CLINICIAN SECTION: `doctors-content.ts` maps exactly one confirmed
 * clinician to this slug — Sheethal Sathya, via her own
 * `relatedCareSlugs: ["birth-preparation", "lactation", "pregnancy-antenatal-care"]`.
 * Her confirmed role ("DONA-certified Birth Doula, Lactation Counsellor")
 * and special focus ("Childbirth Educator · Lactation Consultant") are shown
 * exactly as recorded there — she is never described as a doctor,
 * paediatrician, obstetrician or IBCLC, none of which are confirmed for her.
 * Her portrait renders directly from `doctor.photo` (real approved
 * photography where `doctors-content.ts` provides a `src`, the shared
 * `PortraitPlaceholder` gradient otherwise) — this page never hardcodes
 * either state.
 *
 * IMAGES: `lactation-landing-imagery.ts` reuses the one real, approved
 * illustration already generated for this service
 * (`/images/services/lactation-ai-preview-v1.webp`, already live on the
 * plain `/services` listing via `services-imagery.ts`'s own `lactation` key)
 * for the hero. No image-generation tool is available in this session for
 * the other four conceptual spots (Trust-Building Introduction, What We Can
 * Talk Through, Questions & Planning Support, First Consultation), so those
 * render the site's established gradient `MediaPlaceholder` — see
 * `docs/lactation-ai-imagery.md` for the pending generation briefs.
 */

export const lactationHero = {
  eyebrow: "BREASTFEEDING & LACTATION",
  heading: "Lactation & Breastfeeding Support",
  supportingHeadline: "Support for the questions that can begin before birth and continue after your baby arrives.",
  body: "Breastfeeding can bring questions at different stages — while you are preparing during pregnancy, when feeding begins after birth, or as you and your baby adjust over time.",
  bodySecondary: "A lactation consultation gives you space to talk about what you are experiencing, understand what may need attention and discuss the next step with The Birthwave care team.",
  primaryCta: { label: "Book a Lactation Consultation", href: "#enquiry" },
  secondaryCta: { label: "Explore how support works ↓", href: "#what-we-cover" },
} as const;

export const lactationIntro = {
  eyebrow: "SUPPORT CAN START WITH A QUESTION",
  heading: "Feeding does not have to feel straightforward from the first day.",
  paragraphs: [
    "Every parent and baby begins differently.",
    "You may be preparing before birth and wondering what to expect. You may have already started feeding and want to talk through something that feels uncomfortable, confusing or different from what you expected.",
    "Or you may simply want reassurance about what you are noticing.",
    "You do not need to decide for yourself whether something is a “feeding problem” before asking for support. A consultation can be a place to describe what is happening and understand what may be appropriate next.",
  ],
  themes: [
    { title: "Before birth", body: "Ask questions and understand what you may want to know before breastfeeding begins." },
    { title: "In the early days", body: "Talk about your experience once feeding has started and bring forward anything you are unsure about." },
    { title: "As feeding changes", body: "Return with new questions as you and your baby move through different stages." },
  ],
  cta: { label: "Book a Consultation", href: "#enquiry" },
} as const;

/**
 * What We Can Talk Through — anchors `#what-we-cover`, the hero's own
 * secondary link target. Four items as a single numbered list beside one
 * substantial image, matching `vaginismus-covers.tsx`'s own
 * image-plus-numbered-steps composition. Step 04 explicitly leaves the next
 * step to the care team's own explanation, never an automatic assessment.
 */
export const lactationCovers = {
  eyebrow: "WHAT WE CAN TALK THROUGH",
  heading: "Start with what you and your baby are experiencing.",
  steps: [
    { number: "01", title: "Your feeding experience", body: "Talk about how feeding has been going so far and what feels comfortable, difficult or unclear." },
    { number: "02", title: "Your questions", body: "Bring questions about breastfeeding, feeding patterns, comfort or preparation before your baby arrives." },
    { number: "03", title: "Your baby and your circumstances", body: "Share relevant information about your baby, birth and feeding journey where appropriate." },
    { number: "04", title: "What happens next", body: "Understand whether further guidance, follow-up or another care service from The Birthwave may be appropriate." },
  ],
  note: "The exact assessment and recommendations depend on your individual situation.",
} as const;

/**
 * Questions & Planning Support. Four themes beside a portrait "preparing
 * before birth" image, matching `gynaecology-when-to-consider.tsx`'s own
 * points-plus-image composition. Closes with an explicit routing note for
 * persistent pain or growth/health concerns, rather than implying this page
 * can assess those itself.
 */
export const lactationQuestions = {
  eyebrow: "QUESTIONS ARE WELCOME",
  heading: "You can ask about feeding before you know exactly what you need.",
  body: "Some parents come with one specific question. Others arrive with several things they want to understand.",
  bodySecondary: "Your consultation can begin with the experience you are having rather than a self-diagnosis.",
  themes: [
    { title: "Preparing before birth", body: "Talk about the questions you want answered before breastfeeding begins." },
    { title: "When feeding feels uncomfortable", body: "Describe what you are experiencing and ask what should be assessed or discussed next." },
    { title: "When feeding feels difficult or uncertain", body: "Bring your observations and questions rather than trying to determine the cause on your own." },
    { title: "When things change", body: "Feeding may feel different as your baby grows. You can return with new questions when circumstances change." },
  ],
  note: "Persistent pain, concerns about your baby’s feeding or growth, or concerns about your own health may require clinical assessment. Ask The Birthwave care team what type of appointment is appropriate.",
  cta: { label: "Discuss Your Feeding Questions", href: "#enquiry" },
} as const;

export const lactationFirstConsultation = {
  eyebrow: "YOUR FIRST CONVERSATION",
  heading: "Bring your questions. Start from where you are.",
  steps: [
    { number: "01", title: "Tell us what brings you in", body: "Share whether you are preparing before birth or already feeding your baby, and explain what you would like help understanding." },
    { number: "02", title: "Talk through your experience", body: "The conversation can focus on what you have noticed, what concerns you and what you would like clarified." },
    { number: "03", title: "Understand your next step", body: "Ask what follow-up, further assessment or additional care may be appropriate for you and your baby." },
  ],
  note: "Observation, physical assessment and any particular intervention depend on what is appropriate for your consultation — none is automatic.",
  cta: { label: "Book a Lactation Consultation", href: "#enquiry" },
} as const;

/**
 * Care Team — `doctors-content.ts` maps exactly one confirmed clinician to
 * this slug (see this file's own top comment): Sheethal Sathya. Her name,
 * role, special focus and portrait status are read directly from that
 * single source of truth in `lactation-clinician.tsx` rather than re-typed
 * here, so this section can never drift from the confirmed roster.
 */
export const lactationClinician = {
  eyebrow: "THE PEOPLE BEHIND YOUR CARE",
  heading: "Support centred around your questions and feeding experience.",
  doctorSlug: "sheethal-sathya",
  profileLabel: "View Full Profile",
  bookLabel: "Book a Lactation Consultation",
  bookHref: "#enquiry",
} as const;

/**
 * Practical Information — every field is an explicit confirmed-pending
 * placeholder, the same pattern the other dedicated landing pages already
 * establish for unconfirmed operational detail.
 */
export const lactationPractical = {
  eyebrow: "BEFORE YOUR VISIT",
  heading: "A few practical details before you book.",
  intro: "Some details are still being confirmed. Where that's the case, we say so plainly below rather than guessing.",
  facilityPhotoPendingLabel: "Actual consultation-space photograph\nApproved photography pending",
  info: [
    { label: "Consultation location", lines: ["[The Birthwave confirmation needed: lactation consultation location]"] },
    { label: "Consultation format", lines: ["[The Birthwave confirmation needed: in-person / online consultation availability]"] },
    { label: "Home visits", lines: ["[The Birthwave confirmation needed: whether home visits are offered]"] },
    { label: "What to bring", lines: ["[The Birthwave confirmation needed: what parents should bring]"] },
    { label: "Duration", lines: ["[The Birthwave confirmation needed: consultation duration]"] },
    { label: "Fee", lines: ["[The Birthwave confirmation needed: consultation fee]"] },
    { label: "Follow-up", lines: ["[The Birthwave confirmation needed: follow-up process]"] },
    { label: "Booking", lines: ["[The Birthwave confirmation needed: booking method / phone / WhatsApp]"] },
  ],
} as const;

export const lactationFaq = {
  eyebrow: "Good to Know",
  heading: "Questions before you enquire.",
  items: [
    {
      question: "Can I book a lactation consultation before my baby is born?",
      answer: "You can ask The Birthwave about breastfeeding preparation during pregnancy. Confirm with the care team which consultation is appropriate for your stage.",
    },
    {
      question: "Do I need to be experiencing a breastfeeding problem before booking?",
      answer: "No. You may also want guidance while preparing for breastfeeding or simply have questions you would like to discuss.",
    },
    {
      question: "What happens during a lactation consultation?",
      answer: "The consultation can begin with your feeding experience, your concerns and the questions you want answered. Any further assessment or guidance depends on your individual circumstances.",
    },
    {
      question: "Will someone watch my baby feed?",
      answer: "[The Birthwave confirmation needed: whether feeding observation is routinely offered or included]",
    },
    {
      question: "What if breastfeeding is painful?",
      answer: "Persistent pain is worth discussing with an appropriate healthcare professional. A consultation can help you explain what you are experiencing and understand what type of assessment or follow-up may be appropriate.",
    },
    {
      question: "Can I bring my baby to the appointment?",
      answer: "[The Birthwave confirmation needed: appointment and accompaniment arrangements]",
    },
    {
      question: "Can my partner or support person attend?",
      answer: "[The Birthwave confirmation needed: support-person policy]",
    },
    {
      question: "Do you provide home lactation visits?",
      answer: "[The Birthwave confirmation needed: home-visit availability]",
    },
    {
      question: "How many consultations will I need?",
      answer: "That depends on your individual circumstances and the guidance recommended after your consultation.",
    },
    {
      question: "What if I am worried about my baby's health or feeding urgently?",
      answer: "This webpage and enquiry form are not an emergency service. If you are concerned about your baby's immediate health or have an urgent medical concern, contact your treating healthcare team or local emergency service.",
    },
  ],
} as const;

/**
 * Related Care — restrained links to four EXISTING, separate services
 * (their real names/slugs read from `services-content.ts`, never re-typed),
 * explicitly not framed as automatic inclusions of lactation care.
 */
export const lactationRelatedCare = {
  eyebrow: "CONNECTED CARE",
  heading: "Support around the stages before and after birth.",
  note: "These are separate services at The Birthwave, not automatically included in Lactation & Breastfeeding Support.",
  slugs: ["birth-preparation", "postpartum-care", "newborn-pediatric-care", "pregnancy-antenatal-care"],
} as const;

/**
 * Final Enquiry — TODO(infra): exactly like the other seven landing pages'
 * own forms, no backend endpoint or verified enquiry inbox exists yet.
 * Shows the same honest "design preview, not connected" pattern rather than
 * a fake submission-success message. Deliberately short: full name, a
 * single phone-or-email contact field, and an optional message — no medical
 * history or health information, reinforced by the visible note and the
 * urgent-care line. Nothing here is written to browser storage.
 */
export const lactationEnquiry = {
  eyebrow: "START WITH A CONVERSATION",
  heading: "Feeding questions are enough reason to ask.",
  body: "Enquire about The Birthwave's Lactation & Breastfeeding Support and understand how to begin a consultation.",
  bodySecondary: "You do not need to know exactly what kind of support you need before getting in touch.",
  fields: {
    name: "Full name",
    contact: "Phone number or email",
    message: "What would you like to discuss about breastfeeding or feeding support? (optional)",
  },
  submitLabel: "Send Enquiry",
  formNote: "This form is for appointment information and non-urgent enquiries. It is not an emergency medical service.",
  urgentNote: "This webpage and enquiry form are not an emergency service. If you are concerned about your baby's immediate health, contact your treating healthcare team or local emergency service.",
  previewNotice: "Preview — enquiry integration pending.",
  previewResult: "This is a design preview. No enquiry has been sent — connect this form to a real enquiry endpoint before publishing.",
} as const;

export const lactationMobileCta = {
  label: "Book a Lactation Consultation",
  href: "#enquiry",
} as const;
