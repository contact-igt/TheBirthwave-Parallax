/**
 * Natural Birth — landing page content & imagery.
 *
 * All content (text) and imagery (image paths/positions) for the Natural
 * Birth service page live here.
 */

// ─── IMAGERY ──────────────────────────────────────────────────────────────────

import type { HeroFocalPoint } from "@/lib/hero-focal-point";

export const naturalBirthImagery = {
  hero: {
    src: "/images/natural-birth/natural-birth-hero.png",
    alt: "Pregnant woman seated calmly, reflecting on natural birth preferences in a sunlit room",
    focalPoint: {
      mobile: "65% 30%",
      desktop: "70% 35%",
    } satisfies HeroFocalPoint,
  },
  "preference-not-promise": {
    src: "/images/natural-birth/natural-birth-preference-not-promise.png",
    alt: "Pregnant woman discussing birth preferences with her care team",
    objectPosition: "50% 35%",
  },
  consultation: {
    src: "/images/natural-birth/natural-birth-preference-not-promise.png",
    alt: "Pregnant woman discussing birth preferences with her care team",
    objectPosition: "50% 35%",
  },
  preferences: {
    src: "/images/natural-birth/natural-birth-birth-plan-conversation.png",
    alt: "Birth plan open during a conversation about labour support options",
    objectPosition: "50% 40%",
  },
  preparation: {
    src: "/images/natural-birth/natural-birth-understanding-options.png",
    alt: "Expectant mother gently stretching on a floor cushion in preparation for labour",
    objectPosition: "50% 35%",
  },
  flexibility: {
    src: "/images/natural-birth/natural-birth-flexible-pathways.png",
    alt: "Clinician and expectant mother in an open, reassuring conversation about flexible birth pathways",
    objectPosition: "50% 35%",
  },
  practical: {
    src: "/images/natural-birth/natural-birth-practical-questions.png",
    alt: "Expectant parents preparing practical questions for natural birth planning",
    objectPosition: "50% 40%",
  },
} as const;

export type NaturalBirthImageKey = keyof typeof naturalBirthImagery;

// ─── CONTENT ──────────────────────────────────────────────────────────────────

export const naturalBirthHero = {
  eyebrow: "YOUR BIRTH, YOUR PREFERENCES",
  heading: "Natural Birth",
  supportingHeadline:
    "Prepare for the birth you hope for, with informed choices and individualised care.",
  body: [
    "Natural Birth at The Birthwave focuses on supporting the body's natural labour process while keeping you and your newborn's wellbeing at the centre of every decision.",
    "From understanding labour and preparing your birth plan to exploring movement, comfort and pain-relief options, we help you prepare for birth with clarity.",
    "Every pregnancy is different. Your preferences matter, and your care plan may adapt as labour progresses.",
  ],
  primaryCta: { label: "DISCUSS YOUR BIRTH PREFERENCES ↗", href: "#enquiry" },
  secondaryCta: {
    label: "EXPLORE OUR NATURAL BIRTH APPROACH ↓",
    href: "#natural-birth-approach",
  },
} as const;

export const naturalBirthApproach = {
  eyebrow: "UNDERSTANDING THE APPROACH",
  heading: "Natural Birth is about supporting your body, not avoiding medical care.",
  paragraphs: [
    "Natural Birth focuses on supporting physiological labour, encouraging informed choices and avoiding unnecessary interventions when clinically appropriate.",
    "At The Birthwave, this approach includes:",
  ],
  elements: [
    {
      title: "MOVEMENT & POSITIONING",
      body: "Explore movement and comfortable labour positions suited to your pregnancy.",
    },
    {
      title: "BREATHING & RELAXATION",
      body: "Learn breathing, relaxation and comfort techniques that may help during contractions.",
    },
    {
      title: "SUPPORT DURING LABOUR",
      body: "Discuss your preferences for emotional support, birth companionship and communication.",
    },
    {
      title: "PAIN-RELIEF CHOICES",
      body: "Understand non-medical comfort measures and available medical pain-relief options.",
    },
    {
      title: "MEDICAL CARE WHEN NEEDED",
      body: "Monitoring and medical interventions remain available considerations whenever clinically necessary.",
    },
  ],
  closing:
    "Natural Birth does not mean refusing medical care. Your health and your newborn's wellbeing guide every decision.",
} as const;

export const naturalBirthPreferences = {
  eyebrow: "YOUR BIRTH PLAN",
  heading: "A birth plan helps your care team understand what matters to you.",
  intro:
    "Your birth plan is a way to share your preferences and expectations before labour begins. It should also allow flexibility if circumstances change.",
  themes: [
    {
      title: "MOVEMENT & COMFORT",
      body: "Discuss preferred labour positions, movement and relaxation techniques.",
    },
    {
      title: "BIRTH PARTNER & SUPPORT",
      body: "Talk about who you would like beside you and how they can support you.",
    },
    {
      title: "PAIN-RELIEF PREFERENCES",
      body: "Explore your options for managing discomfort during labour.",
    },
    {
      title: "COMMUNICATION & DECISIONS",
      body: "Share how you would like medical recommendations and changes explained.",
    },
    {
      title: "AFTER-BIRTH PREFERENCES",
      body: "Discuss early contact, newborn care and feeding preferences where clinically appropriate.",
    },
  ],
  closing:
    "A birth plan is a guide for communication, not a guarantee of a particular birth experience.",
  cta: { label: "TALK ABOUT YOUR BIRTH PLAN ↗", href: "#enquiry" },
} as const;

export const naturalBirthSupport = {
  eyebrow: "PREPARING FOR LABOUR",
  heading: "Birth preparation begins before labour does.",
  paragraphs: [
    "Understanding labour and preparing during pregnancy can help you feel more informed about the choices ahead.",
  ],
  steps: [
    {
      number: "01",
      title: "UNDERSTAND LABOUR",
      body: "Learn about contractions, the stages of labour, early signs and when to contact your maternity team.",
    },
    {
      number: "02",
      title: "PREPARE YOUR BODY",
      body: "Explore pregnancy-appropriate movement, breathing, relaxation and comfort techniques.",
    },
    {
      number: "03",
      title: "INVOLVE YOUR BIRTH PARTNER",
      body: "Discuss how your partner can provide practical and emotional support during labour.",
    },
    {
      number: "04",
      title: "PREPARE FOR DIFFERENT POSSIBILITIES",
      body: "Understand your preferences, pain-relief choices and why plans may change when medical care is needed.",
    },
  ],
  cta: {
    label: "EXPLORE BIRTH PREPARATION & CHILDBIRTH EDUCATION ↗",
    href: "/services/birth-preparation",
  },
} as const;

export const naturalBirthWhenLabourBegins = {
  eyebrow: "DURING LABOUR",
  heading: "Supporting you through each stage of labour.",
  intro: [
    "Labour progresses differently for every woman. Your comfort, preferences and medical needs may change along the way.",
  ],
  points: [
    {
      number: "01",
      title: "MOVEMENT & POSITIONS",
      body: "Walking, changing positions or remaining mobile may be possible depending on your clinical needs.",
    },
    {
      number: "02",
      title: "BREATHING & COMFORT",
      body: "Breathing, relaxation and other comfort measures may help you cope with contractions.",
    },
    {
      number: "03",
      title: "LABOUR COMPANIONSHIP",
      body: "Your chosen support person may offer reassurance and practical assistance, subject to facility arrangements.",
    },
    {
      number: "04",
      title: "MONITORING & PAIN RELIEF",
      body: "Your maternity team monitors your progress and your newborn's wellbeing, with pain-relief and other care options discussed as needed.",
    },
  ],
} as const;

export const naturalBirthFlexibility = {
  eyebrow: "CARE THAT ADAPTS WITH YOU",
  heading: "Your preferences still matter when birth plans change.",
  paragraphs: [
    "Sometimes labour progresses differently from what was expected.",
    "Additional monitoring, induction, assisted vaginal birth or Caesarean birth may be recommended depending on your circumstances.",
    "If a change becomes necessary, your maternity team can explain why, discuss the available options and involve you in decisions whenever possible.",
    "A different birth pathway does not mean your preparation was wasted.",
    "The priority is appropriate medical care while respecting your needs and preferences.",
  ],
} as const;

export const naturalBirthJourney = {
  eyebrow: "START WITH A CONVERSATION",
  heading: "Birth preparation begins with understanding your pregnancy.",
  intro:
    "You do not need to arrive with a completed birth plan. Start by discussing what matters to you.",
  steps: [
    {
      number: "01",
      title: "SHARE YOUR PREGNANCY JOURNEY",
      body: "Talk about your pregnancy, medical history and any concerns relevant to birth.",
    },
    {
      number: "02",
      title: "DISCUSS YOUR PREFERENCES",
      body: "Explain what Natural Birth means to you and the experience you hope for.",
    },
    {
      number: "03",
      title: "UNDERSTAND YOUR OPTIONS",
      body: "Discuss labour preparation, comfort measures, medical considerations and appropriate next steps.",
    },
  ],
  cta: { label: "DISCUSS NATURAL BIRTH ↗", href: "#enquiry" },
} as const;

export const naturalBirthClinician = {
  eyebrow: "THE PEOPLE BEHIND YOUR CARE",
  heading: "Birth preparation begins with a conversation.",
  doctor: {
    name: "Dr. Santoshini Nandigam",
    role: "Founder · Obstetrician & Gynaecologist",
    credentials: "MBBS, DNB – Obstetrics & Gynaecology",
    specialtyBadge: "Natural Birth, VBAC and Pregnancy Care",
    paragraphs: [
      "Dr. Santoshini discusses your pregnancy, birth preferences and available care options to help you make informed decisions.",
      "Birth planning considers both your preferences and the medical needs of you and your newborn.",
    ],
    photo: "/images/clinic/dr-santoshi.JPG",
    primaryCta: { label: "VIEW DOCTOR PROFILE ↗", href: "/doctors/dr-santoshi-nandigam" },
  },
} as const;

export const naturalBirthPractical = {
  eyebrow: "PRACTICAL INFORMATION",
  heading: "Questions worth discussing before your due date.",
  info: [
    {
      label: "Consultation Location",
      lines: ["The Birthwave, Mahalingapuram Main Road, Nungambakkam, Chennai – 600034."],
    },
    {
      label: "Consulting Obstetrician",
      lines: ["Dr. Santoshini Nandigam"],
    },
    {
      label: "Delivery Location",
      lines: ["Confirm the delivery facility and available maternity services with the team."],
    },
    {
      label: "Birth Partner",
      lines: ["Discuss whether a chosen companion can attend labour and birth."],
    },
    {
      label: "Movement & Pain Relief",
      lines: ["Ask about facility-specific arrangements and clinically appropriate options."],
    },
    {
      label: "What to Bring",
      lines: [
        "Relevant pregnancy records, scan reports, prescriptions and previous birth records, if available.",
      ],
    },
    {
      label: "Appointments",
      lines: ["Contact the appointment team to arrange a consultation."],
    },
    {
      label: "Contact",
      lines: ["+91 93630 31925"],
    },
  ],
} as const;

export const naturalBirthFaq = {
  eyebrow: "GOOD TO KNOW",
  heading: "Questions about Natural Birth",
  items: [
    {
      question: "What does Natural Birth mean?",
      answer:
        "Natural Birth focuses on supporting physiological labour and vaginal birth, while avoiding unnecessary medical interventions when appropriate. Medical care remains an important part of safe childbirth.",
    },
    {
      question: "Is Natural Birth the same as Vaginal Delivery?",
      answer:
        "Not exactly. Vaginal Delivery describes how a newborn is born. Natural Birth describes an approach to labour that supports the body's natural processes when clinically appropriate.",
    },
    {
      question: "Can Natural Birth be guaranteed?",
      answer:
        "No. Labour can develop unexpectedly, and medical recommendations may change depending on your pregnancy and your newborn's wellbeing.",
    },
    {
      question: "Can I have pain relief during Natural Birth?",
      answer:
        "Yes. You can discuss both non-medical comfort techniques and available medical pain-relief options. Your preferences can also change during labour.",
    },
    {
      question: "Can I move or choose different positions during labour?",
      answer:
        "Movement and different labour positions may be possible depending on your comfort, medical needs and delivery-facility arrangements.",
    },
    {
      question: "Can my partner be present during labour?",
      answer:
        "A chosen birth companion can provide emotional and practical support. Attendance arrangements should be confirmed with your delivery facility.",
    },
    {
      question: "Can I prepare a birth plan?",
      answer:
        "Yes. A birth plan helps you communicate your preferences for labour, comfort, support and medical decisions while allowing flexibility when needed.",
    },
    {
      question: "Is water birth an option?",
      answer:
        "Water birth may be considered for some pregnancies following clinical assessment. Availability, suitability and facility arrangements should be discussed with your maternity team.",
    },
    {
      question: "What happens if a Caesarean becomes necessary?",
      answer:
        "Your maternity team may recommend a Caesarean if clinical circumstances require it. They can explain the reasons, available choices and next steps.",
    },
    {
      question: "Can I consider Natural Birth after a previous Caesarean?",
      answer:
        "Some women may be suitable for VBAC (Vaginal Birth After Caesarean). Your previous birth history and current pregnancy need individual assessment.",
      ctaLink: { label: "EXPLORE VBAC ↗", href: "/services/vbac" },
    },
  ],
} as const;

export const naturalBirthEnquiry = {
  eyebrow: "START YOUR BIRTH CONVERSATION",
  heading: "Thinking about Natural Birth?",
  body: [
    "Whether you are early in pregnancy or approaching your due date, you can discuss your birth preferences, understand your options and prepare for labour.",
    "Contact The Birthwave to arrange a consultation.",
  ],
  fields: {
    name: "Full Name",
    phone: "Phone Number",
    email: "Email (optional)",
    message: "What would you like to discuss? (optional)",
    messagePlaceholder: "Share your questions about Natural Birth or birth preparation.",
  },
  submitLabel: "SEND ENQUIRY",
  footerNote:
    "For appointment enquiries only. If you have an urgent pregnancy-related concern, contact your healthcare provider or an emergency medical service.",
} as const;

export const naturalBirthMobileCta = {
  label: "DISCUSS YOUR BIRTH PREFERENCES",
  href: "#enquiry",
} as const;

export const naturalBirthRelatedCare = {
  eyebrow: "CONNECTED BIRTH CARE",
  heading: "Support for pregnancy, birth and recovery.",
  intro: "Explore other services that may be relevant to your care.",
  services: [
    {
      title: "Pregnancy & Antenatal Care →",
      description: "Pregnancy consultations, monitoring and guidance.",
      href: "/services/pregnancy-antenatal-care",
    },
    {
      title: "Birth Preparation & Childbirth Education →",
      description: "Learn about labour, comfort techniques, birth plans and partner involvement.",
      href: "/services/birth-preparation",
    },
    {
      title: "VBAC (Vaginal Birth After Caesarean) →",
      description:
        "Information and individual assessment for women considering vaginal birth after a previous Caesarean.",
      href: "/services/vbac",
    },
    {
      title: "Fertility & Preconception →",
      description: "Reproductive health consultations and planning for future pregnancies.",
      href: "/services/fertility-preconception",
    },
  ],
} as const;
