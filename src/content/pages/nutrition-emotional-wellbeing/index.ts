/**
 * Nutrition & Emotional Well-being — landing page content & imagery.
 *
 * All content (text) and imagery (image paths/positions) for the Nutrition &
 * Emotional Well-being service page live here.
 */

// ─── IMAGERY ──────────────────────────────────────────────────────────────────

import { portraitGradient } from "@/components/ui/portrait-gradient";
import { servicesImagery } from "@/content/services-imagery";

/**
 * `hero` reuses the one real, approved illustration this service already
 * has — `services-imagery.ts`'s own `nutrition-emotional-wellbeing` key
 * (`/images/services/nutrition-emotional-wellbeing-ai-preview-v1.webp`,
 * already live on the plain `/services` listing) — with its own alt text
 * accurate to where it appears on THIS page.
 *
 * The other four conceptual spots have no dedicated approved image yet. They
 * render the site's established "built visual placeholder". Full generation
 * briefs live in `docs/nutrition-emotional-wellbeing-ai-imagery.md`.
 */
export const nutritionImagery = {
  hero: {
    src: servicesImagery["nutrition-emotional-wellbeing"].src,
    alt: "AI-generated illustration: A pregnant woman talks with a wellness professional over a balanced, home-cooked meal.",
    focalPoint: { mobile: "30% 20%", desktop: "38% 22%" },
  },
  introduction: {
    alt: "AI-generated illustration pending: a supportive conversation in warm, natural surroundings.",
    gradient: portraitGradient(1),
  },
  nutrition: {
    alt: "AI-generated illustration pending: a natural meal-preparation or nourishment moment, no diet-culture styling.",
    gradient: portraitGradient(2),
  },
  "emotional-wellbeing": {
    alt: "AI-generated illustration pending: a quiet, reflective or supportive conversation scene.",
    gradient: portraitGradient(0),
  },
  "first-consultation": {
    alt: "AI-generated illustration pending: a warm, respectful well-being consultation scene.",
    gradient: portraitGradient(1),
  },
} as const;

export type NutritionImageKey = keyof typeof nutritionImagery;

// ─── CONTENT ──────────────────────────────────────────────────────────────────

export const nutritionHero = {
  eyebrow: "WHOLE-PERSON SUPPORT",
  heading: "Nutrition & Emotional Well-being",
  supportingHeadline: "Support for how you nourish yourself, how you feel, and how you adjust through different stages of women's health.",
  body: "Your nutritional and emotional needs can change while preparing for pregnancy, during pregnancy and after birth.",
  bodySecondary:
    "At BirthWave, nutrition and emotional well-being are supported by dedicated professionals, so you can ask questions, understand what your body and mind may need, and receive guidance relevant to your stage of care.",
  primaryCta: { label: "BOOK A CONSULTATION ↗", href: "#enquiry" },
  secondaryCta: { label: "Explore Support Options ↓", href: "#nutrition-intro" },
} as const;

export const nutritionIntro = {
  eyebrow: "SUPPORT BEYOND APPOINTMENTS",
  heading: "Your physical and emotional well-being both matter.",
  paragraphs: [
    "Pregnancy, fertility journeys, birth and postpartum recovery can affect your appetite, energy, routines, body and emotions in different ways.",
    "You may have a specific concern, or you may simply want guidance about eating well, coping with changes or feeling more supported during this stage of life.",
    "At BirthWave, you don't have to fit every concern into one category. Start with what you're experiencing, and the team can help you identify the appropriate support.",
  ],
  themes: [
    {
      title: "Nutrition Support",
      body: "Discuss food, changing nutritional needs, eating patterns, energy and practical ways to nourish yourself according to your stage of care.",
    },
    {
      title: "Emotional Well-being Support",
      body: "Talk through stress, emotional changes, adjustment, overwhelm or other concerns affecting how you're feeling during your fertility, pregnancy or postpartum journey.",
    },
  ],
  cta: { label: "BOOK A CONSULTATION ↗", href: "#enquiry" },
} as const;

export const nutritionCovers = {
  eyebrow: "WHAT WE CAN SUPPORT YOU WITH",
  heading: "Support that responds to where you are right now.",
  steps: [
    {
      number: "01",
      title: "PREGNANCY NUTRITION",
      body: "Discuss changing nutritional needs during pregnancy, everyday food choices, eating patterns and practical questions about nourishing yourself as pregnancy progresses.",
    },
    {
      number: "02",
      title: "FERTILITY & PRECONCEPTION NUTRITION",
      body: "Receive nutrition guidance while preparing for pregnancy or alongside your fertility and preconception care.",
    },
    {
      number: "03",
      title: "POSTPARTUM NUTRITION & RECOVERY",
      body: "Discuss nourishment, changing routines and nutritional needs during recovery after childbirth and while adjusting to life with a newborn.",
    },
    {
      number: "04",
      title: "EMOTIONAL WELL-BEING",
      body: "Talk about stress, emotional adjustment, overwhelm, worries or changes in how you're feeling during fertility care, pregnancy or the postpartum period.",
    },
  ],
  note: "The type of support recommended will depend on your individual needs and consultation.",
} as const;

export const nutritionTogether = {
  eyebrow: "CONNECTED WELL-BEING",
  heading: "Care does not always fit neatly into one category.",
  body: "Food, energy, sleep, recovery and emotional well-being can influence how you experience different stages of women's health.",
  bodySecondary:
    "You might come in with a nutrition question and also want to talk about how you're coping with change. Or you may be feeling emotionally overwhelmed while your eating patterns and everyday routines have also changed.\n\nBirthWave's multidisciplinary approach allows different areas of support to connect when relevant, while keeping each professional's role clear.",
  themes: [
    {
      title: "NOURISHING YOURSELF",
      body: "Discuss eating patterns, nutrition and changing needs during fertility care, pregnancy, postpartum recovery and other stages of women's health.",
    },
    {
      title: "WHEN ENERGY & ROUTINES CHANGE",
      body: "Explore practical nutrition and lifestyle concerns when appetite, energy or everyday routines become difficult to manage.",
    },
    {
      title: "WHEN EMOTIONS FEEL HARDER TO MANAGE",
      body: "Have a dedicated space to discuss stress, adjustment, worries, overwhelm or emotional changes with the appropriate professional.",
    },
    {
      title: "WHEN MORE SUPPORT MAY BE NEEDED",
      body: "If your concern needs a different type or level of professional care, the team can discuss an appropriate next step or referral with you.",
    },
  ],
  note: "Nutrition and emotional well-being support connect with broader care when clinically appropriate.",
  cta: { label: "TALK TO THE CARE TEAM ↗", href: "#enquiry" },
} as const;

export const nutritionFirstConsultation = {
  eyebrow: "YOUR FIRST CONVERSATION",
  heading: "You can start with what feels most important to you right now.",
  intro: "You don't need to arrive with everything figured out. Begin with the question, concern or change that brought you in.",
  steps: [
    {
      number: "01",
      title: "SHARE WHAT BRINGS YOU IN",
      body: "Tell us what you're experiencing and what you would like support with — whether it relates to nutrition, emotional well-being or both.",
    },
    {
      number: "02",
      title: "UNDERSTAND THE CONTEXT",
      body: "Your professional will discuss relevant information about your current stage of care, health, routines, concerns and goals.",
    },
    {
      number: "03",
      title: "DISCUSS YOUR NEXT STEPS",
      body: "Based on the consultation, you'll receive guidance relevant to your needs and understand whether follow-up or another BirthWave service may be helpful.",
    },
  ],
  note: "Recommendations and follow-up are individualised according to the consultation and the professional's scope of care.",
  cta: { label: "BOOK A WELL-BEING CONSULTATION ↗", href: "#enquiry" },
} as const;

export const nutritionClinician = {
  eyebrow: "THE PEOPLE BEHIND YOUR CARE",
  heading: "Different needs.\nThe right professional for each conversation.",
  doctorSlugs: ["deepa", "sherene"],
  customDescriptions: {
    deepa: "Supportive conversations around emotional adjustment, stress, overwhelm and psychological well-being during different stages of women's health.",
    sherene: "Nutrition guidance across preconception, pregnancy, postpartum recovery and other stages where nutritional needs may change.",
  },
  profileLabel: "View Full Profile ↗",
  bookLabel: "BOOK A CONSULTATION ↗",
  bookHref: "#enquiry",
} as const;

export const nutritionPractical = {
  eyebrow: "BEFORE YOUR VISIT",
  heading: "A few practical details before you book.",
  facilityPhotoPendingLabel: "The BirthWave Consultation Center",
  info: [
    {
      label: "Consultation Location",
      lines: ["The BirthWave", "Mahalingapuram Main Road,", "Nungambakkam, Chennai – 600034"],
    },
    {
      label: "Choose Your Support",
      lines: ["Nutrition Support", "or", "Emotional Well-being Support"],
    },
    {
      label: "Who You'll Meet",
      lines: [
        "Nutrition consultations — Sherene, Nutritionist",
        "Emotional well-being consultations — Deepa, M.Sc Psychology",
      ],
    },
    {
      label: "What to Bring",
      lines: ["If relevant, bring recent prescriptions, test reports or other medical records connected to your current BirthWave care."],
    },
    {
      label: "Consultation Duration",
      lines: ["[Confirm with BirthWave]"],
    },
    {
      label: "Consultation Fee",
      lines: ["[Confirm with BirthWave]"],
    },
    {
      label: "Follow-up",
      lines: ["Follow-up recommendations depend on your individual consultation and support needs."],
    },
    {
      label: "Booking",
      lines: ["Call or WhatsApp", "+91 93630 31925"],
    },
  ],
} as const;

export const nutritionFaq = {
  eyebrow: "GOOD TO KNOW",
  heading: "Questions about Nutrition & Emotional Well-being",
  items: [
    {
      question: "Who can seek nutrition and emotional well-being support at BirthWave?",
      answer: "Support may be relevant at different stages, including preconception, pregnancy and postpartum recovery. The appropriate professional and type of consultation will depend on what you would like help with.",
    },
    {
      question: "Can I get nutrition guidance during pregnancy?",
      answer: "Yes. You can discuss pregnancy nutrition, changing nutritional needs, eating patterns and practical food-related questions with BirthWave's nutrition professional.",
    },
    {
      question: "Does BirthWave provide nutrition support while trying to conceive?",
      answer: "Nutrition can form part of preconception and fertility support. Your individual needs can be discussed during a nutrition consultation and coordinated with your broader care where relevant.",
    },
    {
      question: "Can I get nutrition support after childbirth?",
      answer: "Yes. Postpartum nutrition consultations can address changing nutritional needs, recovery, eating routines and nourishment during the period after childbirth.",
    },
    {
      question: "What can I discuss during an emotional well-being consultation?",
      answer: "You can talk about stress, adjustment, overwhelm, worries, emotional changes or other concerns affecting how you're feeling. The consultation provides space to understand what you're experiencing and discuss appropriate next steps.",
    },
    {
      question: "Do I need to have a specific emotional problem before booking?",
      answer: "No. You may come with a particular concern or simply because you would like support understanding and navigating emotional changes during this stage of your life.",
    },
    {
      question: "What if I need support beyond what BirthWave provides?",
      answer: "If your concern requires another type or level of professional support, the team can discuss an appropriate next step or referral with you.",
    },
    {
      question: "Can nutrition and emotional well-being support be part of my pregnancy care?",
      answer: "Yes. These services can complement your antenatal care where relevant. They are separate areas of professional support but can connect with your broader BirthWave care.",
    },
    {
      question: "Will I need more than one consultation?",
      answer: "That depends on your individual needs. After your first consultation, the professional can discuss whether follow-up would be useful and what that may involve.",
    },
    {
      question: "What should I do if I feel unsafe or need urgent mental-health support?",
      answer: "BirthWave's website and routine consultation enquiry service are not emergency services. If you or someone else is in immediate danger or requires urgent mental-health care, seek appropriate emergency medical assistance immediately.",
    },
  ],
} as const;

export const nutritionRelatedCare = {
  eyebrow: "CONNECTED CARE",
  heading: "Well-being support can connect with the rest of your BirthWave journey.",
  note: "Nutrition and emotional well-being are available as dedicated areas of support and can complement other BirthWave services when relevant to your care.",
  services: [
    {
      title: "Pregnancy & Antenatal Care ↗",
      description: "Pregnancy monitoring, consultations and preparation throughout your antenatal journey.",
      href: "/services/pregnancy-antenatal-care",
    },
    {
      title: "Fertility & Preconception ↗",
      description: "Support while preparing for pregnancy and navigating fertility concerns.",
      href: "/services/fertility-preconception",
    },
    {
      title: "Postpartum Recovery & Care ↗",
      description: "Connected support for recovery and adjustment after childbirth.",
      href: "/services/postpartum-care",
    },
    {
      title: "Lactation & Breastfeeding Support ↗",
      description: "Preparation and guidance around breastfeeding and early feeding concerns.",
      href: "/services/lactation",
    },
  ],
} as const;

export const nutritionEnquiry = {
  eyebrow: "START WITH A CONVERSATION",
  heading: "Start your well-being journey with a consultation.",
  body: "Whether you have questions about nutrition, are adjusting to emotional changes, or want support during pregnancy or postpartum recovery, request a consultation with our team.",
  fields: {
    name: "Full name",
    contact: "Phone number or email",
    message: "What would you like to discuss about nutrition or emotional well-being? (optional)",
  },
  submitLabel: "REQUEST A CONSULTATION",
  formNote: "This form is for appointment information and non-urgent enquiries. It is not an emergency medical or mental-health service.",
  urgentNote: "This webpage and enquiry form are not an emergency service. If you or someone else may be in immediate danger, contact local emergency services or an appropriate urgent-care service immediately.",
  previewNotice: "Preview — enquiry integration pending.",
  previewResult: "This is a design preview. No enquiry has been sent — connect this form to a real enquiry endpoint before publishing.",
} as const;

export const nutritionMobileCta = {
  label: "BOOK A CONSULTATION",
  href: "#enquiry",
} as const;
