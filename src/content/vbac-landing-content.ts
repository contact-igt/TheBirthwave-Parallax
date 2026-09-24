/**
 * VBAC (Vaginal Birth After Caesarean) — dedicated landing page content.
 *
 * A SEPARATE content file from `services-content.ts`, exactly like
 * `pregnancy-antenatal-landing-content.ts`, `birth-preparation-landing-content.ts`
 * and `normal-birth-delivery-landing-content.ts`: that file's own `vbac` entry
 * (name, slug, shortDescription, heroStatement, overview, highlights,
 * media.alt) is the shared service record every other consumer reads (Quick
 * Overview, the Sticky Showcase, Find the Right Care, `generateStaticParams`)
 * — untouched by this page. Everything below is this landing page's own,
 * additional copy, built only from that record's three confirmed facts
 * (conversations about eligibility, birth-planning support, care through
 * labour and delivery) — nothing here adds a medical eligibility rule, a
 * success rate, a guarantee, a clinician claim, a hospital affiliation, an
 * emergency capability, a price or a policy.
 *
 * VBAC is deliberately NOT positioned as guaranteed, universally suitable,
 * safer or better than any alternative, or available to every person —
 * every section that touches the decision itself routes the reader back to
 * "discuss this with your treating obstetrician," never to a page-provided
 * determination. Every fact this project cannot currently verify is left as
 * an explicit bracketed placeholder, the same pattern the other three
 * landing pages already establish — never silently filled with a
 * plausible-sounding guess.
 *
 * CLINICIAN SECTION: `doctors-content.ts` records the founder's
 * `specialFocus` as including "Natural Birth & VBAC Specialist," but she
 * carries no `relatedCareSlugs`/`careAreas` mapping to this or any specific
 * programme (unlike the other nine profiles, which do), and the brief for
 * this page explicitly rules out auto-assigning the founder — or anyone else
 * — as this page's named VBAC provider. This page's own Section 7 therefore
 * stays the same neutral, no-name placeholder pattern
 * `normal-birth-delivery-landing-content.ts` already establishes for an
 * unconfirmed clinician mapping.
 *
 * IMAGES: five original placeholder subjects are mapped in
 * `vbac-landing-imagery.ts` (no image-generation tool was available while
 * building this page — see that file's own top comment and
 * `docs/vbac-ai-imagery.md` for the pending generation briefs). Clinician
 * and facility slots remain reserved for approved real photography, never
 * an AI illustration.
 */

export const vbacHero = {
  eyebrow: "BIRTH AFTER CAESAREAN",
  headingLines: ["VBAC", "(Vaginal Birth After Caesarean)"],
  supportingHeadline: "A conversation about the birth options that fit your circumstances.",
  body: "A previous caesarean is one part of your history — not the whole picture of this pregnancy or this birth.",
  bodySecondary: "The Birthwave can help you begin a careful, informed conversation about what may be worth discussing with your obstetrician.",
  primaryCta: { label: "Discuss VBAC Care", href: "#vbac-enquiry" },
  secondaryCta: { label: "Explore what to discuss", href: "#vbac-conversation" },
} as const;

export const vbacIntro = {
  eyebrow: "Begin With Your Full Story",
  heading: ["A previous caesarean is part of your history.", "It does not answer every question about this birth."],
  paragraphs: [
    "Every VBAC conversation is individual. What may be worth discussing depends on your birth history, your current pregnancy, your priorities and your practical circumstances.",
    "This page is a starting point for informed questions, not a clinical assessment. It cannot tell you whether a vaginal birth after caesarean is appropriate for you — only your treating obstetrician and care team can do that, with your full history in front of them.",
  ],
  points: [
    { title: "Review your birth history.", body: "Gather what you know about your previous birth so it can be discussed properly." },
    { title: "Understand the questions worth asking.", body: "Know what to raise with your care team before you're in the room." },
    { title: "Plan the next conversation.", body: "Use this as preparation for a real discussion with your treating obstetrician." },
  ],
} as const;

/**
 * What a VBAC conversation may cover — four topics as two alternating
 * image-and-text compositions, matching the "avoid one photograph per short
 * sentence" instruction and the same alternating-story layout the other
 * landing pages already establish for a comparable need. Every topic is
 * phrased as something to discuss, never something Birthwave automatically
 * offers or approves.
 */
export const vbacConversation = {
  eyebrow: "Starting The Conversation",
  heading: "What a VBAC conversation may cover.",
  compositions: [
    {
      tag: "Your history, and what's changed",
      imageKey: "birth-history" as const,
      blocks: [
        {
          title: "Your previous birth",
          body: "Discuss what happened during your previous caesarean, why it was recommended, and what your care team noted about it afterwards.",
        },
        {
          title: "This pregnancy",
          body: "Talk through what is different this time — your current pregnancy, your health, and anything that has changed since your last birth.",
        },
      ],
    },
    {
      tag: "Your preferences, and if things change",
      imageKey: "next-steps" as const,
      blocks: [
        {
          title: "Preferences, support and practical arrangements",
          body: "Ask about the support people, comfort preferences and practical arrangements worth raising ahead of labour.",
        },
        {
          title: "If the plan needs to change",
          body: "Understand how your care team would talk you through a change of plan, and what that conversation might look like.",
        },
      ],
    },
  ],
} as const;

export const vbacInformed = {
  eyebrow: "Informed Choices",
  heading: "A decision made with your full picture in view.",
  statement: "Whether a vaginal birth after caesarean may be appropriate is a discussion between you and your treating obstetrician.",
  body: "Bringing your history, this pregnancy and your questions into one conversation is the most useful preparation you can do before that discussion.",
  questions: [
    "What information from my previous birth would be useful to review?",
    "What options are relevant to my current pregnancy?",
    "What should I understand before making a birth plan?",
    "What practical arrangements should I ask about?",
    "Who will guide me if my plan changes?",
  ],
  cta: { label: "Ask about a VBAC consultation", href: "#vbac-enquiry" },
} as const;

export const vbacPlanning = {
  eyebrow: "Planning With Flexibility",
  heading: "Make space for preferences, and for change.",
  body: [
    "A birth plan can express what matters most to you — while still leaving room for clinical conversations and for circumstances that change along the way.",
    "None of this can guarantee a particular outcome. It can make sure your preferences are heard and understood before labour begins.",
  ],
  items: [
    "Questions you want answered",
    "The people you would like involved",
    "Comfort and support preferences",
    "Practical arrangements to confirm",
    "A plan for continuing the conversation",
  ],
} as const;

export const vbacFirstVisit = {
  eyebrow: "Your First Consultation",
  heading: "Bring your questions. Start the conversation.",
  steps: [
    {
      number: "01",
      title: "Share your questions and history",
      body: "Bring what you'd like to discuss about your previous birth and this pregnancy.",
    },
    {
      number: "02",
      title: "Talk through your current circumstances",
      body: "Discuss your current pregnancy and priorities with the care team.",
    },
    {
      number: "03",
      title: "Confirm the practical next steps",
      body: "Clarify what to bring and what happens after this conversation.",
    },
  ],
} as const;

/**
 * Meet the Care Team — no confirmed VBAC-specific clinician assignment
 * exists for this page (see this file's own top comment). A neutral,
 * no-name placeholder, per the brief — deliberately without a
 * name/credentials placeholder pair (unlike a genuinely pending single
 * profile), since no specific individual is being lined up to fill this
 * spot.
 */
export const vbacClinician = {
  eyebrow: "The People Involved",
  heading: "Guided by the right clinician for you.",
  statement: "Your consultation should be guided by the appropriate treating clinician and care team.",
  body: "This page is a starting point for a conversation, not an assignment of a specific clinician. Which obstetrician and care team are involved in your VBAC discussion will be confirmed as part of booking your consultation.",
  portraitPendingLabel: "Care-team photography pending",
} as const;

/**
 * Practical Information — every field is an explicit confirmed-pending
 * placeholder. No verified consultation location, appointment process,
 * delivery facility, care-team arrangement, support-person policy, fee or
 * contact detail exists anywhere in this project yet.
 */
export const vbacPractical = {
  eyebrow: "Practical Information",
  heading: "What to know before you enquire.",
  intro: "Some details are still being confirmed. Where that's the case, we say so plainly below rather than guessing.",
  facilityPhotoPendingLabel: "Actual consultation-space photograph\nApproved photography pending",
  info: [
    { label: "Consultation location", lines: ["[To be confirmed by The Birthwave]"] },
    { label: "How to request an appointment", lines: ["[To be confirmed by The Birthwave — ask the team]"] },
    { label: "Delivery facility or hospital arrangements", lines: ["[To be confirmed by The Birthwave]"] },
    { label: "Care-team involvement", lines: ["[To be confirmed by The Birthwave]"] },
    { label: "Support-person guidance", lines: ["[To be confirmed by The Birthwave — ask the team]"] },
    { label: "Fees & inclusions", lines: ["[To be confirmed by The Birthwave]"] },
    { label: "Contact details", lines: ["[To be confirmed by The Birthwave]"] },
  ],
} as const;

export const vbacFaq = {
  eyebrow: "Good to Know",
  heading: "Questions before you enquire.",
  items: [
    {
      question: "What does VBAC mean?",
      answer: "VBAC stands for vaginal birth after caesarean — attempting a vaginal delivery in a pregnancy that follows one or more previous caesarean births.",
    },
    {
      question: "Does a previous caesarean mean I cannot have a vaginal birth?",
      answer: "Not necessarily. Many people who have had a caesarean go on to discuss a vaginal birth for a later pregnancy. Whether it may be appropriate for you depends on your individual history and current pregnancy.",
    },
    {
      question: "Am I eligible for VBAC?",
      answer: "This page cannot answer that. Eligibility depends on your individual medical history and current pregnancy, and can only be assessed by your treating obstetrician.",
    },
    {
      question: "Can VBAC be guaranteed?",
      answer: "No. No approach to birth can be guaranteed in advance, and your care team may recommend a different approach depending on your pregnancy or how labour progresses.",
    },
    {
      question: "What should I bring to a VBAC consultation?",
      answer: "Bring what you know about your previous birth, your questions, and anything about your current pregnancy you'd like to discuss.",
    },
    {
      question: "Where would my delivery be planned?",
      answer: "[Verified delivery-facility details and its relationship with The Birthwave will appear here.]",
    },
    {
      question: "Who would be involved in my care?",
      answer: "[Confirmed care-team and attendance arrangements will appear here.] Ask your care team who will be involved as part of booking your consultation.",
    },
    {
      question: "What does a consultation cost?",
      answer: "[Approved fee and inclusions will appear here.] Ask the team for current consultation pricing.",
    },
    {
      question: "What if a different birth approach is recommended?",
      answer: "Your care team may recommend a different approach at any point, based on your circumstances or how labour progresses. This would be discussed with you directly.",
    },
  ],
} as const;

/**
 * Final Enquiry — TODO(infra): exactly like `normalBirthEnquiry` and the
 * other two landing pages' own forms, no backend endpoint or verified inbox
 * exists yet to actually receive a submission. Shows the same honest
 * "design preview, not connected" pattern rather than a fake
 * submission-success message. Deliberately short: full name, a single
 * phone-or-email contact field, and an optional message — no medical
 * history or health information, reinforced by the visible note and the
 * urgent-care line. Nothing here is written to browser storage.
 */
export const vbacEnquiry = {
  eyebrow: "Start The Conversation",
  heading: "Let's talk about birth after caesarean.",
  body: "Enquire about a VBAC consultation at The Birthwave and begin an informed conversation about your circumstances.",
  fields: {
    name: "Full name",
    contact: "Phone number or email",
    message: "What would you like to discuss about birth after caesarean? (optional)",
  },
  submitLabel: "Send Enquiry",
  formNote: "Please don't include detailed medical records or test results in this form — a member of the team will discuss those with you directly.",
  urgentNote: "This enquiry form is for appointment information, not urgent maternity advice. For urgent concerns, contact your maternity team or local emergency services.",
  previewNotice: "Preview — enquiry integration pending.",
  previewResult: "This is a design preview. No enquiry has been sent — connect this form to a real enquiry endpoint before publishing.",
} as const;

export const vbacMobileCta = {
  label: "Discuss VBAC Care",
  href: "#vbac-enquiry",
} as const;

/**
 * Related Care — restrained links to four separate, existing services
 * (their real names/slugs read from `services-content.ts`, never re-typed),
 * explicitly not automatic inclusions of VBAC care.
 */
export const vbacRelatedCare = {
  eyebrow: "Related Care",
  heading: "Explore related, separate services.",
  note: "These are separate services at The Birthwave, not automatically included in VBAC care.",
  slugs: ["pregnancy-antenatal-care", "birth-preparation", "natural-birth", "normal-birth-delivery", "postpartum-care"],
} as const;
