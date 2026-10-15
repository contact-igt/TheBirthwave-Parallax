/**
 * Newborn & Pediatric Care — landing page content & imagery.
 *
 * All content (text) and imagery (image paths/positions) for the Newborn &
 * Pediatric Care service page live here.
 */

// ─── IMAGERY ──────────────────────────────────────────────────────────────────

import { portraitGradient } from "@/components/ui/portrait-gradient";
import { servicesImagery } from "@/content/services-imagery";

/**
 * `hero` reuses the one real, approved illustration this service already
 * has — `services-imagery.ts`'s own `newborn-pediatric-care` key
 * (`/images/services/newborn-pediatric-care-ai-preview-v1.webp`, already live
 * on the plain `/services` listing) — with its own alt text accurate to where
 * it appears on THIS page.
 *
 * The other four conceptual spots have no dedicated approved image yet. They
 * render the site's established "built visual placeholder". Full generation
 * briefs live in `docs/newborn-pediatric-care-ai-imagery.md`.
 */
export const newbornImagery = {
  hero: {
    src: servicesImagery["newborn-pediatric-care"].src,
    alt: "Both parents hold their newborn while talking with a paediatrician in a calm, home-adjacent room.",
    focalPoint: { mobile: "32% 30%", desktop: "38% 24%" },
  },
  introduction: {
    alt: "A parent noticing and interacting with their baby in a warm everyday environment.",
    gradient: portraitGradient(1),
  },
  consultation: {
    alt: "A paediatrician speaking with a parent while their baby is present.",
    gradient: portraitGradient(2),
  },
  "daily-care": {
    alt: "A natural parent-and-baby daily routine moment.",
    gradient: portraitGradient(0),
  },
  "first-visit": {
    alt: "A warm, respectful pediatric consultation scene.",
    gradient: portraitGradient(1),
  },
} as const;

export type NewbornImageKey = keyof typeof newbornImagery;

// ─── CONTENT ──────────────────────────────────────────────────────────────────

export const newbornHero = {
  eyebrow: "NEWBORN & CHILD CARE",
  heading: "Newborn & Pediatric Care",
  supportingHeadline: "A place to bring the questions that begin when your baby arrives.",
  body: "The early days with a newborn can bring new routines, new observations and plenty of questions.",
  bodySecondary:
    "You may want to ask about feeding, growth, behaviour, general health or something that simply feels different from what you expected. A pediatric consultation gives you space to describe what you are noticing and understand what may need attention next.",
  primaryCta: { label: "Book a Pediatric Consultation", href: "/contact" },
  secondaryCta: { label: "Explore what the visit may cover ↓", href: "#what-we-cover" },
} as const;

export const newbornIntro = {
  eyebrow: "QUESTIONS ARE PART OF THE JOURNEY",
  heading: "You do not need to know whether something is 'normal' before asking about it.",
  paragraphs: [
    "New parents notice a lot.",
    "Feeding patterns, sleep, crying, growth, skin changes, movement, behaviour and daily routines can all bring questions.",
    "Sometimes you simply want reassurance. Sometimes a concern needs closer clinical attention.",
    "A pediatric consultation is a place to explain what you are seeing and understand what your child may need next.",
  ],
  themes: [
    { title: "Early questions", body: "Bring the things you have noticed since birth, even if you are not sure how important they are." },
    { title: "General health", body: "Discuss concerns about your baby or child's health and what your paediatrician recommends next." },
    { title: "Ongoing questions", body: "As your child grows, new questions may come up and can be discussed in follow-up care." },
  ],
  cta: { label: "Book a Consultation", href: "/contact" },
} as const;

export const newbornCovers = {
  eyebrow: "WHAT WE CAN TALK THROUGH",
  heading: "Start with what you have noticed about your baby or child.",
  steps: [
    { number: "01", title: "What brings you in", body: "Share the question, symptom, change or concern that prompted the appointment." },
    { number: "02", title: "Your child's recent history", body: "Discuss relevant information about birth, feeding, health or recent changes where appropriate." },
    { number: "03", title: "Your questions", body: "Bring the things you want clarified about your child's health, feeding, growth or day-to-day behaviour." },
    { number: "04", title: "What happens next", body: "Your paediatrician can explain whether observation, follow-up, further assessment or another type of care may be appropriate." },
  ],
  note: "The exact assessment and recommendations depend on your child's individual circumstances.",
} as const;

export const newbornQuestions = {
  eyebrow: "START WITH WHAT YOU'VE NOTICED",
  heading: "Small questions and bigger concerns can both begin with a conversation.",
  themes: [
    { title: "Feeding questions", body: "Bring questions about your baby's feeding experience and ask what type of support may be appropriate." },
    { title: "Growth & changes", body: "If you have noticed changes in your baby or child and want to understand them better, bring those observations to the consultation." },
    { title: "Sleep, crying & daily routines", body: "Talk about patterns or behaviours you are unsure about without trying to diagnose the cause yourself." },
    { title: "When something feels different", body: "If your child seems unwell or something changes unexpectedly, contact an appropriate healthcare professional." },
  ],
  note: "Some symptoms in babies and children may need urgent medical assessment. This page and enquiry form are not an emergency service.",
  cta: { label: "Discuss Your Child's Care", href: "#enquiry" },
} as const;

export const newbornFirstConsultation = {
  eyebrow: "YOUR FIRST VISIT",
  heading: "Bring your observations. Bring your questions.",
  steps: [
    { number: "01", title: "Tell us what you have noticed", body: "Share the main reason for the visit and any recent changes that concern you." },
    { number: "02", title: "Give the relevant context", body: "Your paediatrician may ask about birth history, feeding, recent health or other background depending on the concern." },
    { number: "03", title: "Understand the next step", body: "Ask what follow-up, further assessment or additional care may be appropriate." },
  ],
  note: "Diagnosis in one visit, tests, medications, vaccinations, procedures and specific growth assessments are never assumed — what's appropriate depends on your child's individual consultation.",
  cta: { label: "Book a Pediatric Consultation", href: "/contact" },
} as const;

export const newbornClinician = {
  eyebrow: "THE PEOPLE BEHIND YOUR CHILD'S CARE",
  heading: "A pediatric conversation centred around your questions.",
  doctorSlug: "dr-deepika-sivathanu",
  profileLabel: "View Full Profile",
  bookLabel: "Book Consultation",
  bookHref: "/contact",
} as const;

export const newbornPractical = {
  eyebrow: "BEFORE YOUR VISIT",
  heading: "A few practical details before you book.",
  intro: "Some details are still being confirmed. Where that's the case, we say so plainly below rather than guessing.",
  facilityPhotoPendingLabel: "Actual consultation-space photograph\nApproved photography pending",
  info: [
    { label: "Consultation location", lines: ["[The Birthwave confirmation needed: pediatric consultation location]"] },
    { label: "Age range", lines: ["[The Birthwave confirmation needed: age range accepted by this service]"] },
    { label: "Consultation format", lines: ["[The Birthwave confirmation needed: in-person / online availability]"] },
    { label: "What to bring", lines: ["[The Birthwave confirmation needed: records or items to bring]"] },
    { label: "Vaccinations", lines: ["[The Birthwave confirmation needed: whether vaccination services are offered]"] },
    { label: "Consultation duration", lines: ["[The Birthwave confirmation needed: duration]"] },
    { label: "Fee", lines: ["[The Birthwave confirmation needed: consultation fee]"] },
    { label: "Follow-up", lines: ["[The Birthwave confirmation needed: follow-up process]"] },
    { label: "Booking", lines: ["[The Birthwave confirmation needed: booking method / phone / WhatsApp]"] },
    { label: "Urgent concerns", lines: ["[The Birthwave confirmation needed: clinic-specific urgent-care instructions]"] },
  ],
} as const;

export const newbornFaq = {
  eyebrow: "Good to Know",
  heading: "Questions before you enquire.",
  items: [
    {
      question: "When should I book a pediatric consultation?",
      answer: "You may book when you have a question or concern about your baby or child's health and want it reviewed by a paediatrician. The urgency depends on your child's symptoms and circumstances.",
    },
    {
      question: "Can I bring my newborn for general questions even if they do not seem unwell?",
      answer: "Yes, parents may have questions even when there is no obvious illness. Ask The Birthwave care team which appointment is appropriate.",
    },
    {
      question: "Can I ask about feeding?",
      answer: "Yes, feeding questions can be discussed. The Birthwave also has a dedicated Lactation & Breastfeeding Support service where appropriate.",
    },
    {
      question: "Do you provide vaccinations?",
      answer: "[The Birthwave confirmation needed: vaccination availability]",
    },
    {
      question: "Do you monitor growth and development?",
      answer: "[The Birthwave confirmation needed: growth/development assessment scope]",
    },
    {
      question: "What should I bring to the appointment?",
      answer: "[The Birthwave confirmation needed: pediatric appointment checklist]",
    },
    {
      question: "Can I book an online consultation?",
      answer: "[The Birthwave confirmation needed: teleconsultation availability]",
    },
    {
      question: "What age children do you see?",
      answer: "[The Birthwave confirmation needed: service age range]",
    },
    {
      question: "What if my baby or child becomes suddenly unwell?",
      answer: "This webpage and enquiry form are for non-urgent appointment information. If your baby or child has a severe, sudden or urgent health concern, seek urgent medical assessment through your treating healthcare team or local emergency service.",
    },
  ],
} as const;

export const newbornRelatedCare = {
  eyebrow: "CONNECTED CARE",
  heading: "Support around both parent and baby.",
  note: "These are separate services at The Birthwave, not automatically included in Newborn & Pediatric Care.",
  slugs: ["lactation", "postpartum-care", "pregnancy-antenatal-care", "nutrition-emotional-wellbeing"],
} as const;

export const newbornEnquiry = {
  eyebrow: "PLAN THE NEXT STEP",
  heading: "Bring your questions about your baby or child.",
  body: "Enquire about The Birthwave's Newborn & Pediatric Care and understand how to begin a consultation.",
  fields: {
    name: "Full name",
    contact: "Phone number or email",
    message: "What would you like to discuss about your baby or child? (optional)",
  },
  submitLabel: "Send Enquiry",
  formNote: "This form is for appointment information and non-urgent enquiries. It is not an emergency medical service.",
  urgentNote: "This webpage and enquiry form are for non-urgent appointment information. If your baby or child has a severe, sudden or urgent health concern, seek urgent medical assessment through your treating healthcare team or local emergency service.",
  previewNotice: "Preview — enquiry integration pending.",
  previewResult: "This is a design preview. No enquiry has been sent — connect this form to a real enquiry endpoint before publishing.",
} as const;

export const newbornMobileCta = {
  label: "Book a Pediatric Consultation",
  href: "/contact",
} as const;
