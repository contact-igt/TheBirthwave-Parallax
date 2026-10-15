/**
 * Gynaecology & Women's Wellness — landing page content & imagery.
 *
 * All content (text) and imagery (image paths/positions) for the Gynaecology
 * service page live here.
 */

// ─── IMAGERY ──────────────────────────────────────────────────────────────────

import type { HeroFocalPoint } from "@/lib/hero-focal-point";

export const gynaecologyImagery = {
  hero: {
    src: "/images/web-ready/service1.JPG",
    alt: "Woman speaking with a gynaecologist during a consultation",
    focalPoint: {
      mobile: "70% 35%",
      desktop: "75% 35%",
    } satisfies HeroFocalPoint,
  },
  "who-this-is-for": {
    src: "/images/generated/g-consultation.jpeg",
    alt: "Woman discussing a women's health concern with a clinician",
    objectPosition: "50% 40%",
  },
  consultation: {
    src: "/images/generated/g-consultation2.jpeg",
    alt: "Patient and clinician reviewing health questions together",
    objectPosition: "50% 35%",
  },
  "health-questions": {
    src: "/images/generated/g-consultation3.jpeg",
    alt: "Woman attending a routine women's health consultation",
    objectPosition: "50% 40%",
  },
  "first-consultation": {
    src: "/images/generated/g-preparation.jpeg",
    alt: "Woman preparing questions for a gynaecology consultation",
    objectPosition: "50% 40%",
  },
  practical: {
    src: "/images/generated/g-preparation2.jpeg",
    alt: "Woman preparing for an upcoming clinic appointment",
    objectPosition: "45% 35%",
  },
} as const;

export type GynaecologyImageKey = keyof typeof gynaecologyImagery;

// ─── CONTENT ──────────────────────────────────────────────────────────────────

export const gynaecologyHero = {
  eyebrow: "WOMEN'S HEALTH & GYNAECOLOGY",
  heading: "Gynaecology care for every stage of a woman's life.",
  supportingHeadline: "From periods and reproductive health to contraception, preconception and changing concerns — start with care that listens before deciding what comes next.",
  body: "Whether something has recently changed or you have been managing a concern for some time, a gynaecology consultation gives you space to discuss your symptoms, understand possible next steps and receive care based on your individual health needs.",
  primaryCta: { label: "BOOK A GYNAECOLOGY CONSULTATION", href: "/contact" },
  secondaryCta: { label: "Explore what we can help with ↓", href: "#gynaecology-covers" },
} as const;

export const gynaecologyWho = {
  eyebrow: "IS THIS THE RIGHT PLACE TO START?",
  heading: "You don't need to know exactly what's wrong before seeing a gynaecologist.",
  intro: "Women often come to us because something has changed, something has been bothering them, or they simply want clarity about their reproductive health.",
  points: [
    "Periods have become irregular, painful, heavy or different from usual.",
    "You're experiencing pelvic pain, unusual discharge, discomfort or other intimate-health concerns.",
    "You have questions about PMOS, contraception or reproductive health.",
    "You're planning a pregnancy and want to understand your health beforehand.",
    "You want a routine gynaecology consultation, follow-up or guidance about a previous report or diagnosis.",
  ],
  closing: "You do not need to decide which service or test you need before booking. Your consultation can help determine the appropriate next step.",
  imageKey: "who-this-is-for" as const,
} as const;

export const gynaecologyCovers = {
  eyebrow: "YOUR GYNAECOLOGY CONSULTATION",
  heading: "We start with what you're experiencing — and understand the bigger picture.",
  imageKey: "consultation" as const,
  steps: [
    {
      number: "01",
      title: "What brings you in",
      body: "Tell us about the symptom, change or health concern that brought you to the consultation — including when it started and how it is affecting you.",
    },
    {
      number: "02",
      title: "Your health history",
      body: "Your doctor may discuss your menstrual cycles, reproductive and pregnancy history, medications, previous conditions, treatments or relevant family history.",
    },
    {
      number: "03",
      title: "Assessment, when appropriate",
      body: "Depending on your concern, your doctor may discuss whether an examination, investigation, scan or test would be useful. Not everyone needs the same assessment.",
    },
    {
      number: "04",
      title: "Your next step",
      body: "Once your concerns and history are understood, your doctor can explain the appropriate next steps, which may include treatment, further evaluation, follow-up or another area of care.",
    },
  ],
} as const;

export const gynaecologyWhenToConsider = {
  eyebrow: "WOMEN'S HEALTH CONCERNS",
  heading: "You don't need to wait until a concern feels urgent to ask about it.",
  intro: "Gynaecological concerns can look different at different stages of life. If something feels different from your usual, persists or is affecting your everyday wellbeing, it is reasonable to discuss it.",
  imageKey: "health-questions" as const,
  points: [
    {
      title: "MENSTRUAL CONCERNS",
      body: "Irregular periods, painful periods, heavy bleeding, missed periods or changes in your usual menstrual cycle.",
    },
    {
      title: "PMOS",
      body: "Discuss irregular cycles and other concerns that may be associated with polycystic ovary syndrome, along with appropriate evaluation and ongoing care.",
    },
    {
      title: "PELVIC & INTIMATE HEALTH",
      body: "Pelvic pain, unusual vaginal discharge, discomfort, itching or other changes you would like assessed.",
    },
    {
      title: "CONTRACEPTION & REPRODUCTIVE HEALTH",
      body: "Discuss contraceptive choices, reproductive-health questions and what may be appropriate for your individual needs.",
    },
    {
      title: "PRECONCEPTION & FERTILITY QUESTIONS",
      body: "If you are thinking about pregnancy, discuss your menstrual and reproductive history and whether further preconception or fertility care may be relevant.",
    },
    {
      title: "PREVENTIVE & FOLLOW-UP CARE",
      body: "Routine gynaecology consultations, review of previous results, follow-up of an existing concern or discussion about recommended screening.",
    },
  ],
  note: "Symptoms can have many possible causes. Your consultation is used to understand your individual situation rather than diagnose a condition from symptoms alone.",
} as const;

export const gynaecologyClinicians = {
  eyebrow: "THE PEOPLE BEHIND YOUR CARE",
  heading: "Women's healthcare that begins with understanding you.",
  clinicians: [
    {
      doctorSlug: "dr-santoshi-nandigam",
      philosophy:
        "Every woman's health journey is unique. Your consultation is an unhurried, listening-first space to understand your symptoms, cycle health, and personal concerns before deciding any next steps together.",
      highlight:
        "Compassionate, evidence-based care tailored to your individual health and stage of life.",
      profileHref: "/doctors/dr-santoshi-nandigam",
      viewProfileLabel: "View Full Profile",
      bookLabel: "BOOK CONSULTATION",
      bookHref: "/contact",
    },
    {
      doctorSlug: "dr-bharathy-kandasamy",
      philosophy:
        "Whether you are visiting with a new symptom, an ongoing concern or questions about your reproductive health, your consultation begins with understanding your history and what matters to you.",
      highlight:
        "Clear explanations, thoughtful assessment and care planned around your individual needs.",
      profileHref: "/doctors/dr-bharathy-kandasamy",
      viewProfileLabel: "View Full Profile",
      bookLabel: "BOOK CONSULTATION",
      bookHref: "/contact",
    },
  ],
} as const;

export const gynaecologyClinician = {
  ...gynaecologyClinicians.clinicians[1],
  eyebrow: gynaecologyClinicians.eyebrow,
  heading: gynaecologyClinicians.heading,
} as const;

export const gynaecologyFirstConsultation = {
  eyebrow: "YOUR FIRST CONSULTATION",
  heading: "Come with your questions. We'll work through what matters.",
  imageKey: "first-consultation" as const,
  steps: [
    {
      number: "01",
      title: "TELL US WHAT YOU'VE NOTICED",
      body: "Describe your symptoms, menstrual changes, discomfort or reproductive-health concerns, including when they began.",
    },
    {
      number: "02",
      title: "REVIEW YOUR HEALTH HISTORY",
      body: "Your doctor may ask about menstrual cycles, pregnancies, medications, previous treatments, medical conditions or reports relevant to your concern.",
    },
    {
      number: "03",
      title: "UNDERSTAND YOUR OPTIONS",
      body: "Your doctor will explain whether treatment, further assessment, investigations, follow-up or another type of care may be appropriate.",
    },
  ],
  cta: { label: "BOOK A GYNAECOLOGY CONSULTATION", href: "/contact" },
} as const;

export const gynaecologyPractical = {
  eyebrow: "BEFORE YOUR VISIT",
  heading: "A little preparation can make your consultation more useful.",
  facilityPhotoPendingLabel: "Actual consultation-space photograph — approved photography pending",
  info: [
    {
      label: "Previous medical records",
      lines: ["Bring relevant prescriptions, scan reports, blood-test results or previous treatment records if you have them."],
    },
    {
      label: "Menstrual information",
      lines: ["If relevant, note the first day of your last period and any recent changes in your cycle."],
    },
    {
      label: "Current medications",
      lines: ["Keep a list or photo of medicines and supplements you currently take."],
    },
    {
      label: "Your symptoms",
      lines: ["It can help to note when your symptoms began, how often they occur and anything you have noticed that makes them better or worse."],
    },
    {
      label: "Your questions",
      lines: ["Write down anything you want to ask so you do not have to remember everything during the consultation."],
    },
    {
      label: "Booking & contact",
      lines: ["For appointments or questions before your visit, contact The Birthwave team."],
    },
  ],
  phone: "+91 93630 31925",
} as const;

export const gynaecologyFaq = {
  eyebrow: "GOOD TO KNOW",
  heading: "Questions about gynaecology care",
  items: [
    {
      question: "When should I see a gynaecologist?",
      answer: "You can consult a gynaecologist if you notice changes in your periods, pelvic discomfort, unusual discharge, reproductive-health concerns or symptoms that are persistent or affecting your daily life. You can also book for routine care, contraception, preconception discussions or follow-up.",
    },
    {
      question: "Do I need to know what condition I have before booking?",
      answer: "No. You do not need a diagnosis before your consultation. Your doctor can begin with your symptoms and medical history and advise whether further assessment is appropriate.",
    },
    {
      question: "Will I need a physical examination?",
      answer: "Not every consultation requires the same examination. Whether an examination is recommended depends on your symptoms, history and reason for visiting. Your doctor can explain what is being recommended and why.",
    },
    {
      question: "Will I need scans or blood tests?",
      answer: "Not necessarily. Tests or imaging are recommended based on your individual symptoms and clinical assessment rather than being automatically required for every patient.",
    },
    {
      question: "Can I consult for irregular, painful or heavy periods?",
      answer: "Yes. Changes in the timing, duration, flow or pain associated with your periods can be discussed during a gynaecology consultation.",
    },
    {
      question: "Can I discuss PCOS or PCOD?",
      answer: "Yes. If you have previously been diagnosed with PCOS/PCOD or have concerns such as irregular cycles, you can discuss your symptoms, previous reports and appropriate next steps with your doctor.",
    },
    {
      question: "Can I discuss fertility during a gynaecology appointment?",
      answer: "Yes. Initial reproductive and fertility questions can be discussed. If more focused fertility assessment or preconception care is appropriate, your doctor can guide you towards the relevant The Birthwave service.",
    },
    {
      question: "Can I discuss contraception?",
      answer: "Yes. A gynaecology consultation can include a discussion about contraceptive options and which may be appropriate based on your preferences and medical history.",
    },
    {
      question: "Can I bring my previous reports or prescriptions?",
      answer: "Yes. Previous scan reports, blood-test results, prescriptions and relevant medical records can help your doctor understand your history.",
    },
    {
      question: "What if my symptoms suddenly become severe?",
      answer: "Severe pain, very heavy bleeding, fainting, breathing difficulty or other symptoms that feel like an emergency should not wait for a routine website appointment. Seek urgent medical care.",
    },
  ],
} as const;

export const gynaecologyRelatedCare = {
  eyebrow: "RELATED CARE",
  heading: "Your next step may connect to another area of care.",
  note: "Depending on what you would like support with, you may also want to explore:",
  items: [
    {
      slug: "fertility-preconception",
      label: "Fertility & Preconception",
      description: "Planning pregnancy, fertility questions and preconception guidance.",
    },
    {
      slug: "vaginismus",
      label: "Vaginismus & Intimate Wellness",
      description: "Support for painful penetration, pelvic-floor concerns and intimate wellbeing.",
    },
    {
      slug: "pregnancy-antenatal-care",
      label: "Pregnancy & Antenatal Care",
      description: "Ongoing medical care and support throughout pregnancy.",
    },
    {
      slug: "nutrition-emotional-wellbeing",
      label: "Nutrition & Emotional Wellbeing",
      description: "Additional support for nutrition, emotional health and overall wellbeing.",
    },
  ],
} as const;

export const gynaecologyEnquiry = {
  eyebrow: "PLAN YOUR NEXT STEP",
  heading: "Have a women's health concern you'd like to discuss?",
  body: "You don't need to have the answers before you book. Start with a gynaecology consultation and talk through your symptoms, questions or reproductive-health concerns with your doctor.",
  primaryCta: "BOOK A GYNAECOLOGY CONSULTATION",
  whatsapp: "CHAT ON WHATSAPP",
  phone: "+91 93630 31925",
  fields: {
    name: "Full name",
    contact: "Phone number or email",
    message: "What would you like to discuss at your consultation? (optional)",
  },
  submitLabel: "Send Enquiry",
  urgentNote: "This form is for appointment information and non-urgent enquiries. For urgent medical concerns, contact your healthcare provider or local emergency service.",
  previewNotice: "Preview — this form is not yet connected to a live enquiry inbox.",
  previewResult: "This is a design preview. No enquiry has been sent — connect this form to a real enquiry endpoint before publishing.",
} as const;

export const gynaecologyMobileCta = {
  label: "Book a Consultation",
  href: "/contact",
} as const;
