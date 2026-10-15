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
    href: "https://wa.me/917904251378",
  },
  media: {
    src: "/images/web-ready/contactus.JPG",
    alt: "A warm, supportive consultation setting at The Birthwave",
  },
} as const;

/**
 * Confirmed contact details — live and in use.
 * Components read directly from this dictionary.
 */
export const contactPlaceholders = {
  phone: "+91 93630 31925",
  whatsapp: "+91 79042 51378",
  email: "drsantoshi@thebirthwave.com",
  clinicAddress:
    "No. 8/15, Mahalingapuram Main Road, Nungambakkam, Chennai \u2013 600034",
  consultationTimings: "[The Birthwave confirmation needed: consultation timings]",
} as const;

export const contactDirectDetails = {
  heading: "Contact Info",
  items: [
    {
      id: "whatsapp-chat",
      label: "WhatsApp",
      confirmed: true,
      value: "+91 79042 51378",
      actionHref: "https://wa.me/917904251378" as string | undefined,
      note: "Message the team on WhatsApp.",
    },
    {
      id: "call",
      label: "Phone",
      confirmed: true,
      value: "+91 93630 31925",
      actionHref: "tel:+919363031925" as string | undefined,
      note: "Primary phone line for patient support and enquiries.",
    },
    {
      id: "whatsapp",
      label: "Phone",
      confirmed: true,
      value: "+91 98407 98472",
      actionHref: "tel:+919840798472" as string | undefined,
      note: "Secondary phone line.",
    },
    {
      id: "email",
      label: "Email",
      confirmed: true,
      value: "drsantoshi@thebirthwave.com",
      actionHref: "mailto:drsantoshi@thebirthwave.com" as string | undefined,
      note: "Send appointment enquiries or general clinical questions.",
    },
    {
      id: "visit",
      label: "Address",
      confirmed: true,
      value:
        "No. 8/15, Mahalingapuram Main Road, Nungambakkam, Chennai \u2013 600034",
      actionHref: "https://maps.app.goo.gl/7bLsmm87HDyki1DJA" as string | undefined,
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
