/**
 * Gynaecology & Women's Wellness — dedicated landing page content.
 *
 * A SEPARATE content file from `services-content.ts`, exactly like the other
 * six dedicated landing pages: that file's own `gynaecology` entry (name,
 * slug, shortDescription, overview, highlights, media.alt) is the shared
 * service record every other consumer reads (Quick Overview, the Sticky
 * Showcase, Find the Right Care, `generateStaticParams`) — untouched by this
 * page. Everything below is this landing page's own, additional copy.
 *
 * TONE: clear, reassuring, respectful, broadly relevant, clinically
 * responsible. No fear-based symptom language, no diagnostic certainty, no
 * overly intimate/invasive imagery, no generic "women's wellness" fluff, no
 * promise that one consultation resolves everything, no "complete women's
 * healthcare" claim (not confirmed anywhere in this project).
 *
 * SCOPE: nothing below expands this service into surgery, laparoscopy
 * procedures, infertility treatment, menopause programmes, sexual medicine,
 * pelvic-floor procedures, cancer-screening packages, hormonal treatment
 * plans or specific scans/tests — none of those are confirmed anywhere in
 * this project (Dr. Bharathy Kandasamy's own laparoscopy/fertility
 * credentials describe HER qualifications, not a confirmed package this
 * service offers). No examination or test is described as automatic.
 *
 * CLINICIAN SECTION: `doctors-content.ts` maps exactly one confirmed
 * clinician to this slug — Dr. Bharathy Kandasamy, via
 * `relatedCareSlugs: ["fertility-preconception", "gynaecology"]`, the same
 * confirmed mapping `fertility-preconception-landing-content.ts` already
 * documents and uses for her Fertility & Preconception section. Her real
 * credentials and role are shown (both confirmed in `doctors-content.ts`);
 * no years of experience, procedure count, award, surgical success rate or
 * fertility outcome is invented.
 *
 * IMAGES: `gynaecology-landing-imagery.ts` reuses the one real, approved
 * illustration already generated for this service
 * (`/images/services/gynaecology-ai-preview-v1.webp`, already live on the
 * plain `/services` listing via `services-imagery.ts`'s own `gynaecology`
 * key, and already reused across the Pregnancy and Birth Preparation
 * landing pages with their own page-accurate alt text) for the hero. No
 * image-generation tool is available in this session for the other four
 * conceptual spots (Who This Is For, Consultation Covers, Health
 * Questions, First Consultation), so those render the site's established
 * gradient `MediaPlaceholder` — see `docs/gynaecology-ai-imagery.md` for
 * the pending generation briefs. The clinician portrait slot is separate
 * and reserved for approved real photography, never an AI illustration.
 */

export const gynaecologyHero = {
  eyebrow: "WOMEN'S HEALTH",
  heading: "Gynaecology & Women's Wellness",
  supportingHeadline: "A place to ask questions, understand changes and take the next step with clarity.",
  body: "Whether you have a specific concern or simply want to discuss changes in your reproductive or gynaecological health, a consultation gives you space to understand what may be happening and what should come next.",
  primaryCta: { label: "Book a Gynaecology Consultation", href: "#gynaecology-enquiry" },
  secondaryCta: { label: "See what the consultation covers ↓", href: "#gynaecology-covers" },
} as const;

export const gynaecologyWho = {
  eyebrow: "IS THIS THE RIGHT PLACE TO START?",
  heading: "If something feels different, uncomfortable or unclear, you can begin with a conversation.",
  intro: "This consultation may be relevant if:",
  points: [
    "You have questions about menstrual or reproductive health.",
    "You are experiencing changes, discomfort or symptoms you want to discuss.",
    "You want a routine gynaecology conversation or follow-up.",
    "You are planning pregnancy and want to understand your reproductive health.",
    "You are not sure which service you need and want clinical guidance on the next step.",
  ],
  closing: "Your symptoms and history are individual, and the right next step depends on a clinical conversation.",
  imageKey: "who-this-is-for" as const,
} as const;

export const gynaecologyCovers = {
  eyebrow: "WHAT WE TALK THROUGH",
  heading: "Start with your symptoms, history and questions.",
  imageKey: "consultation" as const,
  steps: [
    {
      number: "01",
      title: "What brings you in",
      body: "Talk about the symptom, change or concern that prompted the appointment.",
    },
    {
      number: "02",
      title: "Your health history",
      body: "Discuss relevant menstrual, reproductive, pregnancy, medication or previous-care history where appropriate.",
    },
    {
      number: "03",
      title: "Your questions",
      body: "Bring anything you want clarified about your health, symptoms or next steps.",
    },
    {
      number: "04",
      title: "Planning what comes next",
      body: "Your clinician can explain whether follow-up, further assessment or another type of care may be appropriate.",
    },
  ],
} as const;

export const gynaecologyWhenToConsider = {
  eyebrow: "YOUR HEALTH QUESTIONS",
  heading: "You do not need to wait until a concern feels urgent to ask about it.",
  imageKey: "health-questions" as const,
  points: [
    {
      title: "CHANGES YOU'VE NOTICED",
      body: "If something in your menstrual or reproductive health feels different, a consultation can help you discuss it.",
    },
    {
      title: "ONGOING DISCOMFORT",
      body: "If discomfort or symptoms are affecting you, bring them into the conversation rather than trying to interpret them alone.",
    },
    {
      title: "PLANNING AHEAD",
      body: "If you are thinking about pregnancy or reproductive health, a gynaecology consultation may help clarify the appropriate next step.",
    },
    {
      title: "FOLLOW-UP",
      body: "If you have been advised to return, review results or discuss next steps, use the consultation to understand what happens next.",
    },
  ],
  note: "This page does not determine the cause of symptoms. A clinician may need to assess your individual situation.",
} as const;

/**
 * The People Behind Your Care — the one confirmed clinician mapped to this
 * slug (see this file's own top comment). Unlike Vaginismus's own
 * clinician section, both `credentials` and `role` are confirmed for Dr.
 * Bharathy Kandasamy, so both are shown.
 */
export const gynaecologyClinician = {
  eyebrow: "THE PEOPLE BEHIND YOUR CARE",
  heading: "Women's health care built around understanding first.",
  doctorSlug: "dr-bharathy-kandasamy",
  philosophy: "Care begins with understanding your history, questions and what matters to you.",
  profileHref: "/doctors/dr-bharathy-kandasamy",
  viewProfileLabel: "View Full Profile",
  bookLabel: "Book Consultation",
  bookHref: "#gynaecology-enquiry",
} as const;

export const gynaecologyFirstConsultation = {
  eyebrow: "YOUR FIRST CONVERSATION",
  heading: "Bring what you know. Ask what you need.",
  imageKey: "first-consultation" as const,
  steps: [
    {
      number: "01",
      title: "Share what brings you in",
      body: "Describe the symptom, change, concern or health question you want to discuss.",
    },
    {
      number: "02",
      title: "Review the relevant context",
      body: "Your clinician may ask about health, menstrual, reproductive or previous-care history depending on the concern.",
    },
    {
      number: "03",
      title: "Understand what happens next",
      body: "Ask whether follow-up, further assessment or another type of care may be appropriate.",
    },
  ],
  cta: { label: "Book a Gynaecology Consultation", href: "#gynaecology-enquiry" },
} as const;

/**
 * Practical Information — every field below is an explicit
 * confirmed-pending placeholder except Provider, which is the one
 * confirmed fact this project has (see this file's own top comment). No
 * verified consultation location, booking process, fee or contact detail
 * exists anywhere in this project yet.
 */
export const gynaecologyPractical = {
  eyebrow: "BEFORE YOU VISIT",
  heading: "Know what to bring—and what still needs to be confirmed.",
  facilityPhotoPendingLabel: "Actual consultation-space photograph — approved photography pending",
  info: [
    { label: "Consultation location", lines: ["[To be confirmed by The Birthwave]"] },
    { label: "Provider", lines: ["Dr. Bharathy Kandasamy", "Gynaecologist · Laparoscopic Surgeon · Advanced Fertility Specialist"] },
    { label: "Booking process", lines: ["[To be confirmed by The Birthwave]"] },
    { label: "Consultation fee", lines: ["[To be confirmed by The Birthwave]"] },
    { label: "What to bring", lines: ["[To be confirmed by The Birthwave — ask the team]"] },
    { label: "Follow-up process", lines: ["[To be confirmed by The Birthwave]"] },
    { label: "Contact details", lines: ["[Verified phone number or email pending]"] },
  ],
} as const;

export const gynaecologyFaq = {
  eyebrow: "GOOD TO KNOW",
  heading: "Questions before you visit.",
  items: [
    {
      question: "When should I book a gynaecology consultation?",
      answer:
        "You may choose to book when you have a symptom, change or reproductive-health question you would like assessed or discussed. The appropriate urgency depends on your individual situation.",
    },
    {
      question: "Do I need a specific diagnosis before booking?",
      answer: "No. A consultation can be a starting point if you have a concern and are not sure what is causing it.",
    },
    {
      question: "Will I need an examination?",
      answer:
        "Whether any examination is appropriate depends on your symptoms, history and the clinician's assessment. Ask what is being recommended and why before proceeding.",
    },
    {
      question: "Will I need scans or tests?",
      answer: "Investigations depend on your individual circumstances and will be discussed with you directly rather than listed here in advance.",
    },
    {
      question: "Can I discuss menstrual concerns?",
      answer: "[The Birthwave's confirmed scope for menstrual-health consultations within this service will appear here.]",
    },
    {
      question: "Can I discuss fertility at the same appointment?",
      answer:
        "If fertility is a major concern, The Birthwave also has a dedicated Fertility & Preconception service. Your clinician can help clarify which pathway is most appropriate.",
    },
    {
      question: "Can I bring a support person?",
      answer: "[The clinic's confirmed support-person policy will appear here.]",
    },
    {
      question: "What if my symptoms become urgent?",
      answer: "This website and enquiry form are for non-urgent appointment information. For urgent or severe symptoms, contact your healthcare provider or local emergency service.",
    },
  ],
} as const;

/**
 * Related Care — restrained links to four separate, existing services,
 * matching the same "journey-adjacent, not automatically included" pattern
 * `vbac-landing-content.ts` and `vaginismus-landing-content.ts` already
 * establish. Fertility & Preconception is directly supported by Dr.
 * Bharathy Kandasamy's own second `relatedCareSlugs` entry; Vaginismus &
 * Intimate Wellness and Pregnancy & Antenatal Care share this service's own
 * "Before / Women's Health" and adjacent-journey grouping in
 * `services-content.ts`; Nutrition & Emotional Well-being is the same kind
 * of broadly-relevant women's-health link.
 */
export const gynaecologyRelatedCare = {
  eyebrow: "Related Care",
  heading: "Explore related, separate services.",
  note: "These are separate services at The Birthwave, not automatically part of the same care programme.",
  slugs: ["fertility-preconception", "vaginismus", "pregnancy-antenatal-care", "nutrition-emotional-wellbeing"],
} as const;

/**
 * Final Enquiry — TODO(infra): exactly like the other six landing pages'
 * own forms, no backend endpoint or verified inbox exists yet to actually
 * receive a submission. Shows the same honest "design preview, not
 * connected" pattern rather than a fake submission-success message.
 * Deliberately short: full name, a single phone-or-email contact field,
 * and an optional message. Nothing here is written to browser storage.
 */
export const gynaecologyEnquiry = {
  eyebrow: "PLAN YOUR NEXT STEP",
  heading: "Start with a conversation about your health.",
  body: "Enquire about The Birthwave's Gynaecology & Women's Wellness consultation and understand how to begin.",
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
  href: "#gynaecology-enquiry",
} as const;
