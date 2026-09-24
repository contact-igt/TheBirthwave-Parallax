/**
 * Pregnancy & Antenatal Care — dedicated landing page content.
 *
 * A SEPARATE content file from `services-content.ts` on purpose: that
 * file's own `pregnancy-antenatal-care` entry (name, slug, shortDescription,
 * overview, highlights, media.alt) is the shared service record every
 * other consumer reads (Quick Overview, the Sticky Showcase, Find the
 * Right Care, `generateStaticParams`) — untouched by this page. Everything
 * below is this landing page's own, additional copy, drafted from the
 * approved editorial preview (antenatal-editorial-preview-v2.html) —
 * approved DIRECTION and wording, not yet a clinician-signed-off medical
 * document. No outcome, statistic, fee, credential or testimonial is
 * invented anywhere below; every fact this project cannot currently
 * verify (clinic address, hours, phone number, the treating clinician's
 * identity, consultation fees, the support-person policy) is left as an
 * explicit bracketed placeholder, exactly as the approved preview itself
 * does — never silently filled with a plausible-sounding guess.
 */

export const pregnancyLandingHero = {
  eyebrow: "Pregnancy & Antenatal Care",
  headingLines: ["A little clarity.", "A lot of care."],
  supporting:
    "Pregnancy care that brings together regular check-ins, thoughtful guidance, and space for every question.",
  primaryCta: { label: "Request a consultation", href: "#appointment" },
  secondaryCta: { label: "Explore your first visit", href: "#pregnancy-first" },
  // No verified clinic location exists anywhere in this project yet (see
  // src/app/contact/page.tsx's own TODO) — kept as the same explicit
  // bracketed placeholder the approved preview itself uses, not a
  // fabricated address.
  location: "The Birthwave · [Verified clinic location]",
} as const;

export const pregnancyLandingIntro = {
  eyebrow: "More than a check-in",
  note: ["Your questions.", "Your preferences.", "Your next step."],
  heading: ["Care for the pregnancy.", "Space for the person."],
  paragraphs: [
    "Antenatal care brings together conversations about your health, appropriate checks, and guidance on tests and screening.",
    "It is also time to ask the small questions, discuss the unfamiliar, and understand what comes next.",
  ],
  points: [
    { number: "01", label: "Understand your care" },
    { number: "02", label: "Discuss your preferences" },
    { number: "03", label: "Plan the next step together" },
  ],
} as const;

export const pregnancyLandingCareIncludes = {
  eyebrow: "What care may include",
  heading: ["Different needs.", "Connected care."],
  note: "Support for the questions and decisions ahead, shaped around individual assessment.",
  stories: [
    {
      tag: "Keeping you informed",
      imageKey: "pregnancy-antenatal-checkins-scans",
      items: [
        {
          number: "01",
          title: "Regular pregnancy check-ins",
          body: "Discuss how you are feeling, review your progress, and plan the next stage of care.",
        },
        {
          number: "02",
          title: "Scans & screening guidance",
          body: "Understand recommended tests, their purpose, and how results may inform your care.",
        },
      ],
    },
    {
      tag: "Looking ahead, together",
      imageKey: "pregnancy-antenatal-wellbeing-birth-prep",
      items: [
        {
          number: "03",
          title: "Conversations about wellbeing",
          body: "Space for everyday questions about pregnancy, nutrition, and emotional wellbeing.",
        },
        {
          number: "04",
          title: "Preparing for birth",
          body: "Discuss preferences, preparation, and the care arrangements that may be needed.",
        },
      ],
    },
  ],
  disclaimer: "Your care plan, appointment schedule, and any tests depend on individual assessment.",
} as const;

export const pregnancyLandingFirstConsultation = {
  eyebrow: "Your first consultation",
  heading: "It starts with a conversation.",
  body: "You do not need to have every question ready. Your first visit is a starting point for understanding your needs.",
  imageKey: "pregnancy-antenatal-first-consultation",
  steps: [
    {
      number: "01 — Listen",
      title: "Discuss your history",
      body: "Talk through your health, previous pregnancies, medicines, and questions.",
    },
    {
      number: "02 — Review",
      title: "Bring what you have",
      body: "Existing pregnancy records, scan reports, and test results can help inform the conversation.",
    },
    {
      number: "03 — Plan",
      title: "Understand the next steps",
      body: "Discuss recommended checks and a follow-up plan with your clinician.",
    },
  ],
  note: "Bring relevant records and a list of medicines and supplements you currently take.",
} as const;

/**
 * The person behind your care — no confirmed clinician is mapped to THIS
 * specific service yet. `doctors-content.ts` has real, approved team
 * entries, but the one whose own `relatedCareSlugs` includes
 * "pregnancy-antenatal-care" (Dr Amudha Varshini) is a naturopathy/yoga
 * specialist, not the obstetric antenatal clinician a visitor would
 * expect this section to introduce — presenting her here would be
 * exactly the "assume a listed doctor provides this service unless
 * confirmed" mistake the brief rules out. Kept as the same explicit
 * placeholder the approved preview itself uses until a real mapping is
 * confirmed.
 */
export const pregnancyLandingClinician = {
  eyebrow: "The person behind your care",
  heading: ["Know who you'll", "be speaking with."],
  portraitNote: "Actual clinician portrait\nApproved photography pending",
  namePlaceholder: "Dr [Verified full name]",
  credentialsPlaceholder: "[Verified qualification] · [Verified role]",
  bioPlaceholder: "[Approved introduction describing this clinician's role in antenatal care and approach to consultations.]",
  footnote: "Only verified clinician information and real portraits appear here.",
} as const;

export const pregnancyLandingApproach = {
  eyebrow: "The Birthwave approach",
  heading: "Care that keeps you informed.",
  imageKey: "pregnancy-antenatal-care-team",
  values: [
    { title: "Understand the recommendation", body: "Clear explanations, with space to ask questions." },
    { title: "Discuss your preferences", body: "Your concerns and preferences are part of the conversation." },
    { title: "Know what comes next", body: "Clarity about follow-up and the next steps in care." },
  ],
} as const;

export const pregnancyLandingFaq = {
  eyebrow: "Good to know",
  heading: "Questions before you visit.",
  items: [
    {
      question: "When should I arrange my first appointment?",
      answer:
        "Contact a qualified healthcare professional when you think you may be pregnant so appropriate care can begin. Subsequent visits depend on individual needs.",
    },
    {
      question: "What should I bring?",
      answer: "Bring available pregnancy records, scan reports, test results, and a list of medicines and supplements.",
    },
    {
      question: "Will every appointment include a scan?",
      answer: "Not every appointment necessarily includes a scan. Your clinician will explain which checks are recommended and when.",
    },
    {
      question: "Can I bring a partner or support person?",
      answer: "[The clinic's confirmed support-person policy will appear here.]",
    },
    {
      question: "What does a consultation cost?",
      answer: "[Approved consultation fee and what it includes will appear here.]",
    },
  ],
} as const;

/** No verified clinic address, hours, phone number, or access details
 * exist anywhere in this project (src/app/contact/page.tsx is itself an
 * explicit "confirmed contact details pending" placeholder route) — every
 * field below is left as the same explicit bracketed placeholder the
 * approved preview uses, never a fabricated address. */
export const pregnancyLandingVisit = {
  eyebrow: "Visit The Birthwave",
  heading: "Plan your visit.",
  note: "The practical details, before you set out.",
  info: [
    { label: "Find us", lines: ["[Verified clinic address]", "[City & postcode]"] },
    { label: "Consultation hours", lines: ["[Confirmed days]", "[Confirmed times]"] },
    { label: "Contact the clinic", lines: ["[Verified phone number]"] },
    { label: "Getting here", lines: ["[Confirmed parking and accessibility information]"] },
  ],
} as const;

/**
 * Appointment request — TODO(infra): exactly like `doctorsEnquiryForm`
 * (doctors-content.ts), no backend endpoint or verified inbox exists yet
 * to actually receive a submission. That existing form's own pattern
 * shows a "received" confirmation after a local-only submit; THIS page's
 * own brief is explicit that a preview must not do that ("do not fake
 * submission success or appointment confirmation"), so
 * `pregnancy-antenatal-appointment.tsx` shows an honest "this is a design
 * preview, not yet connected" message instead — see that component's own
 * comment. Wire this to a real endpoint once one exists; do not fabricate
 * a submission destination meanwhile. */
export const pregnancyLandingAppointment = {
  eyebrow: "Take the next step",
  heading: "Start with a conversation about your care.",
  body: "Request an antenatal consultation. Our team will contact you to discuss availability and the next steps.",
  fields: {
    name: "Name",
    contact: "Contact number",
    contactMethod: "Preferred contact method",
    consent: "You can contact me about this enquiry using the details above.",
  },
  contactMethods: ["Phone call", "WhatsApp", "Email"] as const,
  submitLabel: "Request a consultation",
  previewNotice: "Preview — this form is not yet connected to a live enquiry inbox.",
  previewResult: "This is a design preview. No request has been sent — connect this form to a real enquiry endpoint before publishing.",
} as const;

export const pregnancyLandingMobileCta = {
  label: "Request a consultation",
  href: "#appointment",
} as const;

/**
 * Related Care — site-architecture audit: every other dedicated service
 * landing page (birth-preparation, normal-birth-delivery, vbac,
 * fertility-preconception, vaginismus, gynaecology, lactation,
 * postpartum-care, nutrition-emotional-wellbeing, newborn-pediatric-care)
 * already carries this exact section; this was the one page missing it —
 * a real internal-linking gap on the site's single most-linked-to service.
 * Same restrained pattern as the other ten: four separate, existing
 * services, names/slugs/hrefs all read from `services-content.ts` rather
 * than re-typed. Chosen to mirror the reciprocal links already pointing
 * AT this page from `birth-preparation`, `normal-birth-delivery` and
 * `vbac`'s own Related Care sections, plus `nutrition-emotional-wellbeing`
 * (a confirmed pregnancy-adjacent service, already linking back here).
 */
export const pregnancyLandingRelatedCare = {
  eyebrow: "Related Care",
  heading: "Explore related, separate services.",
  note: "These are separate services at The Birthwave, not automatically included in antenatal care.",
  slugs: ["birth-preparation", "natural-birth", "normal-birth-delivery", "vbac", "nutrition-emotional-wellbeing"],
} as const;
