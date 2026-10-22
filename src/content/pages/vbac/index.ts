/**
 * VBAC (Vaginal Birth After Caesarean) — landing page content & imagery.
 *
 * All content (text) and imagery (image paths/positions) for the VBAC
 * service page live here.
 */

// ─── IMAGERY ──────────────────────────────────────────────────────────────────

import { portraitGradient } from "@/components/ui/portrait-gradient";

/**
 * No image-generation tool was available while this page was built, so every
 * slot below is an honest "built visual placeholder" — the same
 * gradient-panel-plus-caption mechanism `MediaPlaceholder` already uses
 * site-wide for approved-photography-pending spots — rather than a real
 * photograph, a reused/relabeled image from another service's page, or a
 * fabricated file. `gradient` reuses `portraitGradient`'s existing three
 * confirmed brand hues (terracotta, sky, coral) cycled by index; no new
 * colour is invented for this page. Full generation briefs for all five
 * subjects live in `docs/vbac-ai-imagery.md` — swapping a real `src` in once
 * approved photography/illustration exists is the only change either
 * `VbacImage` or `VbacHero` will need.
 */
export const vbacImagery = {
  hero: {
    src: "/images/clinic/observation.webp",
    alt: "A thoughtful expectant mother and her partner near a sunlit window.",
    gradient: portraitGradient(0),
  },
  consultation: {
    src: "/images/services/service5.jpg",
    alt: "A calm one-to-one maternity-care consultation.",
    gradient: portraitGradient(1),
  },
  "birth-history": {
    alt: "A reflective conversation about a personal birth history, no medical records shown.",
    gradient: portraitGradient(2),
  },
  planning: {
    src: "/images/services/planning2.jpg",
    alt: "A couple discussing birth preferences together at home.",
    gradient: portraitGradient(0),
  },
  "next-steps": {
    alt: "A warm, practical preparation moment at home.",
    gradient: portraitGradient(1),
  },
} as const;

export type VbacImageKey = keyof typeof vbacImagery;

// ─── CONTENT ──────────────────────────────────────────────────────────────────

export const vbacHero = {
  eyebrow: "BIRTH AFTER CAESAREAN",
  heading: "Had a C-section before? Let's talk about your birth options this time.",
  supportingLine: "A previous caesarean doesn't always mean your next birth must be the same.",
  body: [
    "VBAC (Vaginal Birth After Caesarean) may be an option for some women who have previously had a C-section.",
    "At The Birthwave, Dr. Santoshi Nandigam helps you understand your previous birth, assess your current pregnancy and explore the birth options that may be appropriate for you.",
  ],
  primaryCta: { label: "DISCUSS VBAC WITH DR. SANTOSHINI ↗", href: "#vbac-enquiry" },
  secondaryCta: { label: "UNDERSTAND VBAC ↓", href: "#vbac-story" },
} as const;

export const vbacIntro = {
  eyebrow: "UNDERSTANDING YOUR OPTIONS",
  heading: "One previous C-section doesn't tell the whole story of your next birth.",
  intro: [
    "VBAC means giving birth vaginally after a previous caesarean.",
    "Whether it may be suitable for you depends on your previous birth, medical history and current pregnancy.",
  ],
  cards: [
    {
      title: "Your previous birth",
      body: "Understand why your earlier caesarean was performed and whether there were complications.",
    },
    {
      title: "Your current pregnancy",
      body: "Review your health, your baby's wellbeing and how your pregnancy is progressing.",
    },
    {
      title: "Your previous caesarean records",
      body: "The type of incision made on your uterus and your previous surgical records can help guide the assessment.",
    },
  ],
} as const;

export const vbacConsultationCover = {
  eyebrow: "STARTING THE CONVERSATION",
  heading: "Understanding whether VBAC may be an option for you.",
  topics: [
    {
      title: "Your previous birth",
      body: "Discuss your earlier caesarean, the reason it was performed and any previous vaginal births.",
    },
    {
      title: "Your current pregnancy",
      body: "Understand the medical factors that may influence your birth options.",
    },
    {
      title: "Your preferences",
      body: "Talk about your previous birth experience, concerns and what you hope for this time.",
    },
  ],
} as const;

export const vbacBenefitsRisks = {
  eyebrow: "MAKING AN INFORMED DECISION",
  heading: "Understand both options before deciding.",
  intro:
    "After a previous caesarean, you may be able to consider VBAC or a planned repeat caesarean. Both have benefits and risks.",
  cards: [
    {
      title: "Potential benefits of VBAC",
      body: "A successful vaginal birth avoids another operation and may allow a shorter hospital stay and quicker recovery.",
      tag: "Benefits",
    },
    {
      title: "Risks to understand",
      body: "VBAC carries a small but important risk of uterine scar rupture. Some women may require an emergency caesarean during labour.",
      tag: "Risks",
    },
    {
      title: "Planned repeat caesarean",
      body: "A repeat caesarean is another birth option, with its own benefits, surgical risks and implications for future pregnancies.",
      tag: "Alternative",
    },
  ],
  closing: "Your obstetrician will help you understand these considerations based on your individual circumstances.",
  cta: { label: "DISCUSS YOUR BIRTH OPTIONS ↗", href: "#vbac-enquiry" },
} as const;

export const vbacAssessmentFactors = {
  eyebrow: "YOUR INDIVIDUAL ASSESSMENT",
  heading: "Every pregnancy deserves an individual assessment.",
  intro: "Your obstetrician may consider:",
  factors: [
    {
      title: "Previous caesarean",
      body: "The reason for your previous surgery and any complications.",
    },
    {
      title: "Uterine incision",
      body: "The type of incision made on your uterus during your previous caesarean.",
    },
    {
      title: "Previous vaginal birth",
      body: "Whether you have delivered vaginally before.",
    },
    {
      title: "Current pregnancy",
      body: "Your health, your baby's wellbeing and any pregnancy-related complications.",
    },
    {
      title: "Your birth preferences",
      body: "Your concerns, expectations and plans for future pregnancies.",
    },
  ],
} as const;

export const vbacPlanningLabour = {
  eyebrow: "PREPARING FOR BIRTH",
  heading: "Prepare for the birth you hope for, while understanding your options.",
  intro: "If VBAC is considered suitable, your obstetrician can guide you through planning for labour.",
  phases: [
    {
      title: "Before labour",
      body: "Understand when to contact your maternity team and what to do when labour begins.",
    },
    {
      title: "During labour",
      body: "Discuss monitoring, comfort measures and available pain-relief options.",
    },
    {
      title: "If plans change",
      body: "Understand when assisted vaginal birth or an emergency caesarean may become necessary.",
    },
  ],
  requirementNote:
    "Planned VBAC requires appropriate fetal monitoring and a maternity facility with immediate access to emergency caesarean care and blood transfusion services.",
} as const;

export const vbacFirstVisit = {
  eyebrow: "YOUR FIRST CONVERSATION",
  heading: "Bring your history. Bring your questions.",
  steps: [
    {
      number: "01",
      title: "Review your previous birth",
      body: "Share your earlier caesarean experience and relevant medical records.",
    },
    {
      number: "02",
      title: "Discuss this pregnancy",
      body: "Talk about your current health, concerns and birth preferences.",
    },
    {
      number: "03",
      title: "Understand your options",
      body: "Discuss whether VBAC may be appropriate and what the next steps could involve.",
    },
  ],
  cta: { label: "BOOK A VBAC CONSULTATION ↗", href: "/contact" },
} as const;

export const vbacClinician = {
  eyebrow: "THE PERSON BEHIND YOUR CARE",
  heading: "Your previous birth matters. So does your next one.",
  doctor: {
    slug: "dr-santoshi-nandigam",
    name: "Dr. Santoshi Nandigam",
    credentials: "MBBS, DNB – Obstetrics & Gynaecology",
    role: "Founder · Obstetrician & Gynaecologist",
    specialtyBadge: "Natural Birth & VBAC Care",
    paragraphs: [
      "A previous caesarean may leave you with questions about your next pregnancy and delivery.",
      "Dr. Santoshi's approach focuses on understanding your previous experience, reviewing your current pregnancy and discussing your birth options with you.",
    ],
    photo: "/images/doctors/dr-santoshi-web.jpg",
    primaryCta: { label: "BOOK A CONSULTATION ↗", href: "/contact" },
    secondaryCta: { label: "VIEW FULL PROFILE ↗", href: "/doctors/dr-santoshi-nandigam" },
  },
} as const;

export const vbacPlanChanges = {
  eyebrow: "CARE THAT ADAPTS",
  heading: "A change in the birth plan doesn't mean your preparation was wasted.",
  paragraphs: [
    "Labour can be unpredictable, even when VBAC has been carefully planned.",
    "If labour does not progress as expected or concerns arise about you or your baby, your obstetric team may recommend a different approach.",
    "The priority is appropriate medical care, clear communication and informed decisions as circumstances change.",
  ],
} as const;

export const vbacPractical = {
  eyebrow: "BEFORE YOUR CONSULTATION",
  heading: "What to know before you visit.",
  items: [
    {
      label: "Consultation location",
      lines: [
        "The Birthwave",
        "Mahalingapuram Main Road, Nungambakkam, Chennai – 600034",
      ],
    },
    {
      label: "Consulting doctor",
      lines: [
        "Dr. Santoshi Nandigam",
        "Obstetrician & Gynaecologist",
      ],
    },
    {
      label: "What to bring",
      lines: [
        "Previous caesarean records, discharge summary, operative notes if available, recent scans and current pregnancy records.",
      ],
    },
    {
      label: "Appointments",
      lines: ["Consultations by appointment."],
    },
    {
      label: "Contact",
      lines: ["+91 93630 31925"],
    },
  ],
  cta: { label: "BOOK A CONSULTATION ↗", href: "/contact" },
} as const;

export const vbacFaq = {
  eyebrow: "GOOD TO KNOW",
  heading: "Questions about VBAC.",
  items: [
    {
      question: "What does VBAC mean?",
      answer:
        "VBAC stands for Vaginal Birth After Caesarean. It means delivering vaginally after having had a caesarean in an earlier pregnancy.",
    },
    {
      question: "Can I have a vaginal delivery after a C-section?",
      answer:
        "Possibly. A previous C-section does not automatically rule out vaginal birth. Your obstetrician will assess your previous surgery and current pregnancy before discussing whether VBAC is appropriate.",
    },
    {
      question: "How likely am I to have a successful VBAC?",
      answer:
        "According to the Royal College of Obstetricians and Gynaecologists (RCOG), about three in four women with one previous caesarean whose labour begins naturally give birth vaginally when planning VBAC. Individual chances vary.",
    },
    {
      question: "Is VBAC safe?",
      answer:
        "VBAC may be a suitable option for selected women, but it has risks, including uterine scar rupture and the possibility of emergency caesarean. Your obstetrician will discuss the risks and benefits of VBAC and repeat caesarean with you.",
    },
    {
      question: "Can I consider VBAC after two C-sections?",
      answer:
        "It may be considered in selected circumstances, following specialist assessment of your previous surgeries, uterine scars and current pregnancy.",
    },
    {
      question: "What if labour needs to be induced?",
      answer:
        "Induction may increase the risk of uterine rupture and emergency caesarean. Your obstetrician will discuss whether induction is appropriate and what alternatives are available.",
    },
    {
      question: "Does planning VBAC guarantee vaginal delivery?",
      answer:
        "No. Even when VBAC is considered suitable, the final mode of birth depends on how labour progresses and the wellbeing of you and your baby.",
    },
    {
      question: "What happens if VBAC is no longer suitable?",
      answer:
        "Your obstetrician will explain the reasons and discuss other birth options, which may include a caesarean.",
    },
  ],
} as const;

export const vbacEnquiry = {
  eyebrow: "START THE CONVERSATION",
  heading: "Thinking about vaginal birth after a C-section?",
  body: [
    "Your previous birth is part of your story, but it doesn't have to determine every decision about your next one.",
    "Meet Dr. Santoshi Nandigam to discuss your pregnancy, previous caesarean and the birth options that may be appropriate for you.",
  ],
  primaryCta: "BOOK A VBAC CONSULTATION ↗",
  whatsappCta: "CHAT ON WHATSAPP ↗",
  whatsappUrl: "https://wa.me/917904251378",
  phone: "+91 93630 31925",
  fields: {
    name: "Full Name",
    phone: "Phone Number",
    caesareanCount: "How many previous caesarean births have you had?",
    discussionTopic: "What would you like to discuss?",
  },
  caesareanOptions: ["1", "2", "More than 2"] as const,
  discussionOptions: [
    "VBAC after a previous C-section",
    "Birth options",
    "Previous birth experience",
    "Current pregnancy",
    "Other",
  ] as const,
  submitLabel: "REQUEST A CONSULTATION",
} as const;

export const vbacMobileCta = {
  label: "Book a VBAC Consultation",
  href: "/contact",
} as const;

export const vbacRelatedCare = {
  eyebrow: "CONTINUE YOUR CARE",
  heading: "Explore care around pregnancy, birth and recovery.",
  services: [
    {
      title: "Pregnancy & Antenatal Care ↗",
      description: "Medical care, monitoring and support throughout your pregnancy.",
      href: "/services/pregnancy-antenatal-care",
    },
    {
      title: "Natural Birth ↗",
      description: "A physiological, low-intervention approach supported by clinical safety.",
      href: "/services/natural-birth",
    },
    {
      title: "Birth Preparation & Childbirth Education ↗",
      description: "Practical preparation, labour comfort, partner roles and newborn care.",
      href: "/services/birth-preparation",
    },
    {
      title: "Fertility & Preconception ↗",
      description: "Reproductive health consultations and planning for future pregnancies.",
      href: "/services/fertility-preconception",
    },
  ],
} as const;
