/**
 * Fertility & Preconception — dedicated landing page content.
 *
 * Ten sections, in this order, each with its own purpose:
 *  01 Hero — identify the service and invite a consultation
 *  02 Who is this for — help visitors recognise relevance
 *  03 What the consultation covers — the topics discussed
 *  04 Preconception care — preparing for pregnancy beforehand
 *  05 Doctor — who provides the consultation
 *  06 Your first consultation — the sequence of the appointment
 *  07 Before you visit — a practical checklist
 *  08 FAQs — remaining questions
 *  09 Related care — onward navigation
 *  10 Final enquiry — the action
 *
 * Copy is the approved shortened version of the original editorial document.
 * Editorial comments from that document ("I would remove…", "Small note…")
 * are not website text and are not rendered.
 *
 * Contact, address and clinician details are NOT stored here — they are read
 * at render time from `contact-content.ts` and `doctors-content.ts`, and
 * related-care names come from `services-content.ts`.
 */

export const fertilityHero = {
  eyebrow: "FERTILITY & PRECONCEPTION",
  heading: "Planning a pregnancy?",
  supportingLine: "Start with your health. Prepare with clarity, not guesswork.",
  body: "Whether you're planning a pregnancy or have questions about fertility, a preconception consultation can help you understand your health and appropriate next steps.",
  primaryCta: { label: "Book a Preconception Consultation", href: "#fertility-enquiry" },
  secondaryCta: { label: "See what the consultation covers", href: "#fertility-covers" },
  /** Neighbourhood + city of the confirmed clinic address in contact-content.ts. */
  location: "Nungambakkam, Chennai",
  /** From contact-content.ts's own note on the address: "Consultations are by appointment…". */
  locationNote: "Consultations by appointment",
} as const;

export const fertilityWho = {
  eyebrow: "IS THIS THE RIGHT PLACE TO START?",
  heading: "Planning pregnancy, or wanting to understand your fertility?",
  points: [
    "You're planning a pregnancy and want to understand how to prepare beforehand.",
    "You have questions about periods, ovulation or fertility before you begin trying to conceive.",
    "You have an existing health condition, take regular medication or have a previous pregnancy history you would like to discuss before pregnancy.",
    "You've been trying to conceive and want medical guidance on whether further evaluation may be appropriate.",
    "You're unsure where to begin and would like to speak with a gynaecologist before taking the next step.",
  ],
  reassurance: "You don't need to wait until there is a fertility problem to ask about your reproductive health.",
} as const;

export const fertilityCovers = {
  eyebrow: "WHAT WE TALK THROUGH",
  heading: "A consultation built around where you are starting from.",
  cards: [
    {
      title: "Your health & reproductive history",
      body: "Discuss your menstrual cycles, medical history, previous pregnancies, current medications, lifestyle and any reproductive-health concerns that may be relevant.",
    },
    {
      title: "Your pregnancy plans",
      body: "Talk about when you're considering pregnancy, how long you may have been trying and any questions you or your partner have before conception.",
    },
    {
      title: "Your fertility concerns",
      body: "If you have concerns about irregular periods, ovulation, previous fertility difficulties or other factors, your doctor can discuss what may be relevant to investigate.",
    },
    {
      title: "Your next steps",
      body: "Depending on your history, your doctor may recommend preconception guidance, appropriate tests, lifestyle changes, supplements, further evaluation or specialist fertility care.",
    },
  ],
} as const;

export const fertilityPreparing = {
  eyebrow: "BEFORE PREGNANCY",
  heading: "Preparation can begin before the positive test.",
  intro: "Preconception care gives you time to review your health and address questions before pregnancy begins.",
  points: [
    {
      title: "Review your health",
      body: "Discuss medical conditions, medications, menstrual and reproductive history, previous pregnancies and other factors relevant to pregnancy planning.",
    },
    {
      title: "Prepare for pregnancy",
      body: "Talk through nutrition, lifestyle, folic acid and other pre-pregnancy recommendations appropriate to your individual health.",
    },
    {
      title: "Know when to investigate",
      body: "If your history or fertility journey suggests that further assessment may be useful, your doctor can explain what may be considered and why.",
    },
  ],
  note: "Recommendations are individual. Tests or fertility treatment are not automatically required simply because you book a preconception consultation.",
} as const;

export const fertilityClinicians = {
  eyebrow: "THE PEOPLE BEHIND YOUR CARE",
  heading: "Meet your clinicians.",
  clinicians: [
    {
      doctorSlug: "dr-santoshi-nandigam",
      intro:
        "Preconception care begins with understanding your health history, cycle, lifestyle and personal questions before deciding what comes next — supporting you with holistic guidance from the very beginning.",
      profileHref: "/doctors/dr-santoshi-nandigam",
      viewProfileLabel: "View Full Profile",
      bookLabel: "Book Consultation",
      bookHref: "#fertility-enquiry",
    },
    {
      doctorSlug: "dr-bharathy-kandasamy",
      intro:
        "Your consultation begins with understanding your history, concerns and plans before deciding what comes next.",
      profileHref: "/doctors/dr-bharathy-kandasamy",
      viewProfileLabel: "View Full Profile",
      bookLabel: "Book Consultation",
      bookHref: "#fertility-enquiry",
    },
  ],
} as const;

export const fertilityClinician = {
  ...fertilityClinicians.clinicians[1],
  eyebrow: fertilityClinicians.eyebrow,
  heading: "Meet your clinician.",
} as const;

export const fertilityFirstConsultation = {
  eyebrow: "YOUR FIRST CONSULTATION",
  heading: "Bring your history. Bring your questions.",
  intro: "You don't need to know exactly what you need before you arrive.",
  steps: [
    {
      number: "01",
      title: "Share your starting point",
      body: "Tell us about your periods, reproductive and medical history, previous pregnancies if relevant, medications and where you are in your pregnancy-planning journey.",
    },
    {
      number: "02",
      title: "Discuss what matters to you",
      body: "Ask about preparing for pregnancy, fertility, conception, previous experiences or anything you're uncertain about.",
    },
    {
      number: "03",
      title: "Understand what comes next",
      body: "Your doctor will explain whether you need simple preconception guidance, follow-up, investigations or further fertility evaluation based on your individual circumstances.",
    },
  ],
  cta: { label: "Book a Preconception Consultation", href: "#fertility-enquiry" },
} as const;

export const fertilityVisit = {
  eyebrow: "BEFORE YOU VISIT",
  heading: "A little preparation can make your first conversation more useful.",
  checklistLabel: "Helpful to bring, if you have them",
  items: [
    {
      label: "Previous medical records",
      text: "Bring relevant prescriptions, reports, scans, blood-test results or previous fertility records, if available.",
    },
    {
      label: "Menstrual information",
      text: "If you track your periods or cycles, having recent dates or information available may help the discussion.",
    },
    {
      label: "Current medications and supplements",
      text: "Bring a list of medicines, vitamins or supplements you currently take.",
    },
    {
      label: "Previous pregnancy or fertility history",
      text: "Reports from previous pregnancies, fertility evaluations or treatments, if relevant.",
    },
    {
      label: "Your questions",
      text: "Write down anything you want to discuss. No question is too small to bring to the consultation.",
    },
    {
      label: "Your partner",
      text: "Your partner may join when relevant and when you are comfortable with their involvement.",
    },
  ],
  closing: "Don't have all of these? You can still book a consultation. The team can guide you on what may be needed.",
  locationLabel: "Where consultations take place",
  directionsLabel: "Open in Maps",
} as const;

/** All nine questions from the original document; answers are its text. */
export const fertilityFaq = {
  eyebrow: "GOOD TO KNOW",
  heading: "Questions before you visit.",
  items: [
    {
      question: "When should I consider a preconception consultation?",
      answer:
        "You can consider one whenever you're beginning to plan a pregnancy, even before you start trying to conceive. It can also be useful if you have questions about your menstrual cycles, medications, existing health conditions, previous pregnancies or fertility.",
    },
    {
      question: "Is this only for people having difficulty conceiving?",
      answer:
        "No. Preconception care is also for people who have not started trying yet and simply want to prepare for pregnancy or understand their reproductive health better.",
    },
    {
      question: "When should I seek help if we're having difficulty conceiving?",
      answer:
        "The appropriate timing depends on factors such as age, menstrual history, how long you've been trying and whether there are known reproductive-health concerns. You don't have to decide this yourself — a consultation can help determine whether evaluation is appropriate.",
    },
    {
      question: "Does a fertility consultation mean I will need treatment?",
      answer:
        "No. A consultation begins with understanding your history and concerns. Whether any tests, treatment or further evaluation are appropriate depends on your individual situation.",
    },
    {
      question: "Will I need fertility tests?",
      answer:
        "Not necessarily. Your doctor will first review your history and circumstances. If investigations may be useful, they should be explained along with why they are being recommended.",
    },
    {
      question: "Should my partner attend?",
      answer:
        "They can, particularly when fertility or conception concerns involve both partners. However, you can also attend your initial consultation on your own.",
    },
    {
      question: "What should I bring to my appointment?",
      answer:
        "Bring any relevant medical records, previous fertility or pregnancy reports, recent test results and a list of medications or supplements if you have them. If you don't have these available, you can still attend.",
    },
    {
      question: "Can you guarantee pregnancy?",
      answer:
        "No healthcare provider can guarantee conception or exactly predict how long it will take. The purpose of evaluation and care is to understand your individual circumstances and discuss appropriate options.",
    },
    {
      question: "What if I become pregnant after booking my appointment?",
      answer:
        "Contact The Birthwave team. They can guide you on whether your appointment should continue as planned or whether pregnancy and antenatal care would be more appropriate.",
    },
  ],
} as const;

/** Original destinations; link labels come from each service's live record. */
export const fertilityRelatedCare = {
  eyebrow: "RELATED CARE",
  heading: "Care that may become relevant along your journey.",
  slugs: ["gynaecology", "pregnancy-antenatal-care", "nutrition-emotional-wellbeing"],
} as const;

/**
 * TODO(infra): no enquiry backend or verified inbox exists, so the form shows
 * a persistent "preview" notice and never reports a submission as sent.
 */
export const fertilityEnquiry = {
  eyebrow: "PLAN YOUR NEXT STEP",
  heading: "Thinking about pregnancy or fertility? Start with a conversation.",
  body: "You don't need to have everything figured out. Tell us where you are now, and we'll help you understand the next step.",
  callLabel: "Call",
  whatsappLabel: "Chat on WhatsApp",
  fields: {
    name: "Full name",
    contact: "Phone number or email",
    message: "What would you like to discuss about fertility or preconception care? (optional)",
  },
  submitLabel: "Send enquiry",
  urgentNote:
    "This form is for appointment information and non-urgent enquiries. For urgent medical concerns, contact your healthcare provider or local emergency service.",
  previewNotice: "Preview — this form is not yet connected to a live enquiry inbox.",
  previewResult:
    "This is a design preview. No enquiry has been sent — connect this form to a real enquiry endpoint before publishing.",
  validationMessage: "Enter your name and a phone number or email so we can reach you.",
} as const;

export const fertilityMobileCta = {
  label: "Book a Consultation",
  href: "#fertility-enquiry",
} as const;
