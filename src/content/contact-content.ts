/**
 * Contact page content — The Birthwave
 *
 * Simple, premium, conversion-focused content definitions for /contact.
 */

export const contactHero = {
  eyebrow: "CONTACT",
  h1: "Get in touch, or book an appointment.",
  body: "Call, message us on WhatsApp, or leave your details below. We’ll help guide the next step.",
  primaryCta: {
    label: "Book an Appointment",
    href: "#contact-form",
  },
  secondaryCta: {
    label: "Message on WhatsApp",
    href: "#contact-details",
  },
  media: {
    src: "/brand/about/about-belief-poster.jpg",
    alt: "A warm, supportive consultation setting at The Birthwave",
  },
} as const;

/**
 * Centralized development placeholders awaiting client confirmation.
 * Edit values here once confirmed; components read directly from this dictionary.
 */
export const contactPlaceholders = {
  phone: "[Birthwave confirmation needed: phone number]",
  whatsapp: "[Birthwave confirmation needed: WhatsApp number]",
  email: "[Birthwave confirmation needed: email address]",
  clinicAddress: "[Birthwave confirmation needed: clinic address]",
  consultationTimings: "[Birthwave confirmation needed: consultation timings]",
} as const;

export const contactDirectDetails = {
  heading: "Direct contact",
  items: [
    {
      id: "call",
      label: "CALL",
      confirmed: false,
      value: contactPlaceholders.phone,
      actionHref: undefined as string | undefined,
      note: "Primary phone line for patient support and enquiries.",
    },
    {
      id: "whatsapp",
      label: "WHATSAPP",
      confirmed: false,
      value: contactPlaceholders.whatsapp,
      actionHref: undefined as string | undefined,
      note: "Message directly for consultation and scheduling assistance.",
    },
    {
      id: "email",
      label: "EMAIL",
      confirmed: false,
      value: contactPlaceholders.email,
      actionHref: undefined as string | undefined,
      note: "Send appointment enquiries or general clinical questions.",
    },
    {
      id: "visit",
      label: "VISIT",
      confirmed: false,
      value: contactPlaceholders.clinicAddress,
      actionHref: undefined as string | undefined,
      note: "Consultations are by appointment in a calm, private environment.",
    },
  ],
} as const;

export const contactEnquiryForm = {
  heading: "Send an enquiry",
  supportingLine: "Leave your details and we’ll help guide the next step.",
  fields: {
    name: "Name",
    phone: "Phone",
    email: "Email (optional)",
    serviceHelp: "What do you need help with?",
    message: "Message (optional)",
    consent:
      "The Birthwave may contact me regarding this enquiry or appointment request.",
  },
  serviceOptions: [
    "Pregnancy & Antenatal Care",
    "Normal Birth & Delivery Care",
    "VBAC (Vaginal Birth After Caesarean)",
    "Fertility & Preconception",
    "Vaginismus & Intimate Wellness",
    "Gynaecology & Women's Wellness",
    "Lactation & Breastfeeding Support",
    "Birth Preparation & Childbirth Education",
    "Natural Birth",
    "Postpartum Recovery & Care",
    "Nutrition & Emotional Well-being",
    "Newborn & Pediatric Care",
    "Not sure yet",
    "General enquiry",
  ] as const,
  submitLabel: "SEND ENQUIRY",
  whatsappLabel: "Message on WhatsApp",
  nonUrgentNote:
    "This contact page is for non-urgent enquiries and appointment information.",
  previewNotice: "Preview — enquiry integration pending",
  previewResult:
    "This is a design preview. No request has been sent — connect this form to a real enquiry endpoint before publishing.",
} as const;
