/**
 * Vaginismus & Intimate Wellness — dedicated landing page content.
 *
 * A SEPARATE content file from `services-content.ts`, exactly like the other
 * five dedicated landing pages: that file's own `vaginismus` entry (name,
 * slug, shortDescription, overview, highlights, media.alt) is the shared
 * service record every other consumer reads (Quick Overview, the Sticky
 * Showcase, Find the Right Care, `generateStaticParams`) — untouched by this
 * page. Everything below is this landing page's own, additional copy.
 *
 * TONE: private, respectful, non-judgemental, calm, clinically responsible.
 * No embarrassment-based language, no fear, no sexualised imagery, no
 * graphic anatomy, no pressure to proceed, no claim that the condition is
 * "easy to fix." No guaranteed improvement, pain-free outcome, treatment
 * timeline, success rate, session count or specific therapeutic technique
 * is stated anywhere below — every such fact this project cannot currently
 * verify is left as an explicit bracketed placeholder, the same pattern the
 * other five landing pages already establish.
 *
 * SCOPE: nothing below expands this service into pelvic surgery, sexual or
 * psychosexual therapy, fertility treatment, medication protocols,
 * pelvic-floor procedures, dilator programmes, device-based treatment or
 * pain-clinic services — none of those are confirmed anywhere in this
 * project. No examination is described as automatic or required.
 *
 * CLINICIAN SECTION: `doctors-content.ts` maps exactly one confirmed
 * clinician to this slug — Dr. Adithi Nair carries
 * `relatedCareSlugs: ["vaginismus", "postpartum-care"]`, role "Pelvic Floor
 * Therapy · Vaginismus Coach". No qualification and no biography are
 * confirmed for her anywhere in this project — neither is invented here.
 *
 * IMAGES: `vaginismus-landing-imagery.ts` reuses the one real, approved
 * illustration already generated for this service
 * (`/images/services/vaginismus-ai-preview-v1.webp`, already live on the
 * plain `/services` listing via `services-imagery.ts`'s own `vaginismus`
 * key) for the hero — the same "reuse an existing approved file with page-
 * accurate alt text" pattern `pregnancy-antenatal-hero.tsx` and
 * `birth-prep-landing-*` keys already establish, not a duplicated binary
 * asset. No image-generation tool is available in this session for the
 * other four conceptual spots (Who This Is For, Consultation, Care At Your
 * Pace, First Consultation), so those render the site's established
 * gradient `MediaPlaceholder` until real photography/illustration exists —
 * see `docs/vaginismus-ai-imagery.md` for the pending generation briefs.
 * The clinician portrait slot is separate and reserved for approved real
 * photography, never an AI illustration.
 */

export const vaginismusHero = {
  eyebrow: "INTIMATE WELLNESS",
  heading: "Vaginismus & Intimate Wellness",
  supportingHeadline: "A private space to talk, understand and take the next step at your pace.",
  body: "If penetration, pelvic-floor tension or intimate examinations feel painful, difficult or overwhelming, a consultation can give you space to discuss what you are experiencing without pressure or judgement.",
  primaryCta: { label: "Book a Private Consultation", href: "#vaginismus-enquiry" },
  secondaryCta: { label: "Understand the consultation ↓", href: "#vaginismus-covers" },
} as const;

export const vaginismusWho = {
  eyebrow: "IS THIS THE RIGHT PLACE TO START?",
  heading: "If intimate experiences feel difficult, painful or overwhelming, you can start with a conversation.",
  intro: "This consultation may be relevant if:",
  points: [
    "Penetration feels difficult or painful.",
    "You feel pelvic-floor tightening, fear or discomfort around intimacy.",
    "Internal examinations feel difficult or distressing.",
    "You have questions about vaginismus or pelvic comfort and are not sure where to begin.",
    "You want to understand what support may be appropriate without feeling rushed.",
  ],
  closing: "Your experience is individual, and the next step should be discussed around your comfort and circumstances.",
  imageKey: "who-this-is-for" as const,
} as const;

export const vaginismusCovers = {
  eyebrow: "WHAT WE TALK THROUGH",
  heading: "Start by understanding what you are experiencing.",
  imageKey: "consultation" as const,
  steps: [
    {
      number: "01",
      title: "Your experience",
      body: "Share what feels difficult, uncomfortable or concerning in your own words.",
    },
    {
      number: "02",
      title: "Your history",
      body: "Discuss relevant health, pelvic, gynaecological or intimate-wellness history where appropriate.",
    },
    {
      number: "03",
      title: "Your questions and comfort",
      body: "Talk about what you want to understand and what you are comfortable discussing.",
    },
    {
      number: "04",
      title: "Your next step",
      body: "Your clinician can explain what follow-up or support may be appropriate based on your individual circumstances.",
    },
  ],
} as const;

export const vaginismusPace = {
  eyebrow: "YOUR COMFORT MATTERS",
  heading: "Care should move at a pace you are comfortable with.",
  body: "A consultation should give you room to ask questions, understand options and make decisions without feeling rushed.",
  imageKey: "care-at-your-pace" as const,
  points: [
    {
      title: "START WITH CONVERSATION",
      body: "You do not need to arrive knowing exactly what is happening or what support you need.",
    },
    {
      title: "ASK BEFORE PROCEEDING",
      body: "You can ask what is being recommended, why it may be helpful and what alternatives may exist.",
    },
    {
      title: "SET YOUR PACE",
      body: "Discuss your comfort, concerns and boundaries throughout the process.",
    },
  ],
  note: "Specific assessments or treatment approaches depend on your individual circumstances and should be explained before proceeding.",
} as const;

/**
 * The People Behind Your Care — the one confirmed clinician mapped to this
 * slug (see this file's own top comment). Deliberately no bio/credentials:
 * nothing beyond name, role and related care is confirmed for Dr. Adithi
 * Nair in `doctors-content.ts`, so none is shown here rather than invented.
 */
export const vaginismusClinician = {
  eyebrow: "THE PEOPLE BEHIND YOUR CARE",
  heading: "Support built around understanding, not pressure.",
  doctorSlug: "dr-adithi-nair",
  philosophy: "Care begins with understanding your questions, preferences and comfort.",
  profileHref: "/doctors/dr-adithi-nair",
  viewProfileLabel: "View Full Profile",
  bookLabel: "Book Consultation",
  bookHref: "#vaginismus-enquiry",
} as const;

export const vaginismusFirstConsultation = {
  eyebrow: "YOUR FIRST CONVERSATION",
  heading: "You can begin without having all the answers.",
  imageKey: "first-consultation" as const,
  steps: [
    {
      number: "01",
      title: "Tell us what brings you in",
      body: "Share as much or as little context as you are comfortable starting with.",
    },
    {
      number: "02",
      title: "Talk through your concerns",
      body: "Ask questions about symptoms, intimacy, examinations or previous experiences relevant to your concern.",
    },
    {
      number: "03",
      title: "Understand the next step",
      body: "Your clinician can explain whether follow-up, further assessment or another type of support may be appropriate.",
    },
  ],
  cta: { label: "Book a Private Consultation", href: "#vaginismus-enquiry" },
} as const;

/**
 * Practical Information — every field below is an explicit
 * confirmed-pending placeholder except Provider, which is the one
 * confirmed fact this project has (see this file's own top comment). No
 * verified consultation location, booking process, fee or contact detail
 * exists anywhere in this project yet, and no preparation requirement is
 * confirmed, so none is invented.
 */
export const vaginismusPractical = {
  eyebrow: "BEFORE YOU VISIT",
  heading: "Know what to expect before you arrive.",
  facilityPhotoPendingLabel: "Actual consultation-space photograph — approved photography pending",
  info: [
    { label: "Consultation location", lines: ["[To be confirmed by The Birthwave]"] },
    { label: "Provider", lines: ["Dr. Adithi Nair", "Pelvic Floor Therapy · Vaginismus Coach"] },
    { label: "Booking process", lines: ["[To be confirmed by The Birthwave]"] },
    { label: "Consultation fee", lines: ["[To be confirmed by The Birthwave]"] },
    { label: "What to bring", lines: ["[To be confirmed by The Birthwave — ask the team]"] },
    { label: "Follow-up process", lines: ["[To be confirmed by The Birthwave]"] },
    { label: "Contact information", lines: ["[Verified phone number or email pending]"] },
  ],
} as const;

export const vaginismusFaq = {
  eyebrow: "GOOD TO KNOW",
  heading: "Questions before you visit.",
  items: [
    {
      question: "What is vaginismus?",
      answer:
        "Vaginismus is a term used when involuntary pelvic-floor tightening can make vaginal penetration difficult or painful. Individual experiences vary and should be discussed with a qualified clinician.",
    },
    {
      question: "Do I need to know for certain that I have vaginismus before booking?",
      answer:
        "No. A consultation can be a starting point if you are experiencing difficulty, pain or concern and want to understand what may be contributing.",
    },
    {
      question: "Will I need an internal examination at the first appointment?",
      answer:
        "Whether any examination is appropriate depends on your circumstances, comfort and the clinician's assessment. Ask what is being recommended before proceeding.",
    },
    {
      question: "Will treatment be painful?",
      answer: "Any recommended approach should be explained to you, including what to expect and how your comfort will be considered.",
    },
    {
      question: "How many sessions will I need?",
      answer: "The number and type of follow-up appointments depend on your individual situation and the care recommended.",
    },
    {
      question: "Can I bring a partner or support person?",
      answer: "[The clinic's confirmed support-person policy will appear here.]",
    },
    {
      question: "Is this confidential?",
      answer:
        "[The Birthwave's approved confidentiality and privacy wording will appear here.] You are welcome to ask your clinician directly about privacy during your consultation.",
    },
    {
      question: "Can I ask questions before agreeing to an examination or next step?",
      answer: "Yes. You can ask what is being recommended, why, what to expect and what alternatives may be available.",
    },
  ],
} as const;

/**
 * Related Care — restrained links to four separate, existing services,
 * matching the same "journey-adjacent, not automatically included" pattern
 * `vbac-landing-content.ts`'s own four-service Related Care section
 * establishes. Postpartum Recovery & Care is directly supported by Dr.
 * Adithi Nair's own second `relatedCareSlugs` entry; Gynaecology &
 * Fertility & Preconception share this service's own "Before / Women's
 * Health" chapter in `services-content.ts`; Pregnancy & Antenatal Care is
 * the same universal next-stage link VBAC's own Related Care already
 * includes.
 */
export const vaginismusRelatedCare = {
  eyebrow: "Related Care",
  heading: "Explore related, separate services.",
  note: "These are separate services at The Birthwave, not automatically part of the same care programme.",
  slugs: ["gynaecology", "fertility-preconception", "postpartum-care", "pregnancy-antenatal-care"],
} as const;

/**
 * Final Enquiry — TODO(infra): exactly like the other five landing pages'
 * own forms, no backend endpoint or verified inbox exists yet to actually
 * receive a submission. Shows the same honest "design preview, not
 * connected" pattern rather than a fake submission-success message.
 * Deliberately short: full name, a single phone-or-email contact field,
 * and an optional message. Nothing here is written to browser storage.
 */
export const vaginismusEnquiry = {
  eyebrow: "START WHEN YOU FEEL READY",
  heading: "Begin with a private conversation.",
  body: "Enquire about The Birthwave's Vaginismus & Intimate Wellness consultation and understand how to begin.",
  fields: {
    name: "Full name",
    contact: "Phone number or email",
    message: "What would you like to discuss? (optional)",
  },
  submitLabel: "Send Enquiry",
  urgentNote: "This form is for appointment information and non-urgent enquiries. For urgent medical concerns, contact your healthcare provider or local emergency service.",
  previewNotice: "Preview — this form is not yet connected to a live enquiry inbox.",
  previewResult: "This is a design preview. No enquiry has been sent — connect this form to a real enquiry endpoint before publishing.",
} as const;

export const vaginismusMobileCta = {
  label: "Book a Private Consultation",
  href: "#vaginismus-enquiry",
} as const;
