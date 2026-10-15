/**
 * Lactation & Breastfeeding Support — landing page content & imagery.
 *
 * All content (text) and imagery (image paths/positions) for the Lactation
 * service page live here.
 */

// ─── IMAGERY ──────────────────────────────────────────────────────────────────

import { portraitGradient } from "@/components/ui/portrait-gradient";
import { servicesImagery } from "@/content/services-imagery";

/**
 * `hero` reuses the one real, approved illustration this service already
 * has — `services-imagery.ts`'s own `lactation` key
 * (`/images/services/lactation-ai-preview-v1.webp`, already live on the
 * plain `/services` listing) — with its own alt text accurate to where it
 * appears on THIS page.
 *
 * The other four conceptual spots have no dedicated approved image yet.
 * They render the site's established "built visual placeholder"
 * (`MediaPlaceholder`'s gradient-panel-plus-caption mechanism). Full
 * generation briefs live in `docs/lactation-ai-imagery.md`.
 */
export const lactationImagery = {
  hero: {
    src: servicesImagery.lactation.src,
    alt: "A mother holds her newborn while talking with a lactation care professional in a calm, warmly lit room.",
    focalPoint: { mobile: "28% 20%", desktop: "30% 24%" },
  },
  consultation: {
    alt: "A lactation counsellor speaking with a mother who is holding her baby.",
    gradient: portraitGradient(0),
  },
  "feeding-support": {
    alt: "A warm, everyday parent-and-newborn feeding moment.",
    gradient: portraitGradient(1),
  },
  "preparing-before-birth": {
    alt: "A pregnant woman thinking through feeding preparation.",
    gradient: portraitGradient(2),
  },
  "first-consultation": {
    alt: "A parent asking questions in a supportive lactation-care setting.",
    gradient: portraitGradient(0),
  },
} as const;

export type LactationImageKey = keyof typeof lactationImagery;

// ─── CONTENT ──────────────────────────────────────────────────────────────────

export const lactationHero = {
  eyebrow: "BREASTFEEDING & LACTATION",
  heading: "Lactation & Breastfeeding Support",
  supportingHeadline: "Support for the questions that can begin before birth and continue after your baby arrives.",
  body: "Breastfeeding can bring questions at different stages — while you are preparing during pregnancy, when feeding begins after birth, or as you and your baby adjust over time.",
  bodySecondary: "A lactation consultation gives you space to talk about what you are experiencing, understand what may need attention and discuss the next step with The Birthwave care team.",
  primaryCta: { label: "Book a Lactation Consultation", href: "/contact" },
  secondaryCta: { label: "Explore how support works ↓", href: "#what-we-cover" },
} as const;

export const lactationIntro = {
  eyebrow: "SUPPORT CAN START WITH A QUESTION",
  heading: "Feeding does not have to feel straightforward from the first day.",
  paragraphs: [
    "Every parent and baby begins differently.",
    "You may be preparing before birth and wondering what to expect. You may have already started feeding and want to talk through something that feels uncomfortable, confusing or different from what you expected.",
    "Or you may simply want reassurance about what you are noticing.",
    "You do not need to decide for yourself whether something is a 'feeding problem' before asking for support. A consultation can be a place to describe what is happening and understand what may be appropriate next.",
  ],
  themes: [
    { title: "Before birth", body: "Ask questions and understand what you may want to know before breastfeeding begins." },
    { title: "In the early days", body: "Talk about your experience once feeding has started and bring forward anything you are unsure about." },
    { title: "As feeding changes", body: "Return with new questions as you and your baby move through different stages." },
  ],
  cta: { label: "Book a Consultation", href: "/contact" },
} as const;

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
  note: "Persistent pain, concerns about your baby's feeding or growth, or concerns about your own health may require clinical assessment. Ask The Birthwave care team what type of appointment is appropriate.",
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
  cta: { label: "Book a Lactation Consultation", href: "/contact" },
} as const;

export const lactationClinician = {
  eyebrow: "THE PEOPLE BEHIND YOUR CARE",
  heading: "Support centred around your questions and feeding experience.",
  doctorSlug: "sheethal-sathya",
  profileLabel: "View Full Profile",
  bookLabel: "Book a Lactation Consultation",
  bookHref: "/contact",
} as const;

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

export const lactationRelatedCare = {
  eyebrow: "CONNECTED CARE",
  heading: "Support around the stages before and after birth.",
  note: "These are separate services at The Birthwave, not automatically included in Lactation & Breastfeeding Support.",
  slugs: ["birth-preparation", "postpartum-care", "newborn-pediatric-care", "pregnancy-antenatal-care"],
} as const;

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
  href: "/contact",
} as const;
