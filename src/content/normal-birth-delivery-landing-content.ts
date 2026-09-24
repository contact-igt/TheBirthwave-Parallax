/**
 * Normal Birth & Delivery Care — dedicated landing page content.
 *
 * A SEPARATE content file from `services-content.ts`, exactly like
 * `pregnancy-antenatal-landing-content.ts` and
 * `birth-preparation-landing-content.ts`: that file's own
 * `normal-birth-delivery` entry (name, slug, shortDescription, overview,
 * highlights, media.alt) is the shared service record every other
 * consumer reads (Quick Overview, the Sticky Showcase, Find the Right
 * Care, `generateStaticParams`) — untouched by this page. Everything
 * below is this landing page's own, additional copy.
 *
 * `services-content.ts`'s confirmed record for this slug names three
 * things: labour support, delivery care, and continuity from antenatal
 * visits through to birth. Nothing below invents a delivery facility or
 * hospital affiliation, guaranteed attendance by a particular doctor,
 * staffing/monitoring/emergency capability, a specific pain-relief method,
 * a birth-companion policy, a package/fee, or an outcome/success rate.
 * Every fact this project cannot currently verify is left as an explicit
 * bracketed placeholder — the same pattern the other two landing pages
 * already establish — never silently filled with a plausible-sounding
 * guess.
 *
 * No confirmed clinician is mapped to this programme: `doctors-content.ts`
 * carries no "normal-birth-delivery" related-care entry for any profile
 * (confirmed by reading that file directly), and that whole file is
 * itself an explicit, still-unconfirmed structural placeholder (see
 * `src/app/doctors/[slug]/page.tsx`'s own comment). The care-team section
 * below stays an explicit draft slot rather than naming anyone.
 *
 * IMAGES: five original AI illustrations are mapped in
 * normal-birth-delivery-imagery.ts. Clinician and delivery-facility
 * slots remain reserved for approved photography. Existing pending-label
 * fields describe the original briefs; they no longer caption illustrations.
 */

export const normalBirthHero = {
  eyebrow: "Labour & Birth",
  headingLines: ["Normal Birth &", "Delivery Care"],
  supportingHeadline: "Support through labour. Care around your individual needs.",
  body: "Explore The Birthwave's care for women planning a vaginal birth, from conversations during pregnancy through labour and delivery.",
  bodySecondary: "Bring your questions, discuss your preferences and understand how your care may adapt along the way.",
  primaryCta: { label: "Enquire About Delivery Care", href: "#nbd-enquiry" },
  secondaryCta: { label: "Explore the Care Journey", href: "#nbd-journey" },
  imagePendingLabel: "Wide hero — expectant mother receiving reassurance",
} as const;

export const normalBirthIntro = {
  eyebrow: "Preparing for the Moment",
  heading: ["Before labour begins,", "there's space to talk."],
  paragraphs: [
    "Planning for birth can bring excitement, uncertainty and plenty of questions.",
    "Who will be involved in your care? What support will be available? How will your preferences be discussed if circumstances change?",
    "The Birthwave's Normal Birth & Delivery Care brings together labour support, delivery care and continuity from antenatal visits. Your consultation is the place to understand these arrangements and discuss what matters to you.",
  ],
  points: [
    { title: "Your questions.", body: "Make time to discuss what you want to understand." },
    { title: "Your preferences.", body: "Share your wishes and the support you would find helpful." },
    { title: "Your care plan.", body: "Discuss the approach appropriate to your pregnancy." },
  ],
  imagePendingLabel: "Attentive delivery-planning consultation",
} as const;

/**
 * The Care Journey — two substantial image-and-text compositions covering
 * the three stages the brief describes (before/during in the first, after
 * in the second), matching the "avoid one photograph per short sentence"
 * instruction and the alternating-story layout the other two landing
 * pages already establish for a comparable need.
 */
export const normalBirthJourney = {
  eyebrow: "The Care Journey",
  heading: "Understand the next step, before you reach it.",
  compositions: [
    {
      tag: "Before & during labour",
      imagePendingLabel: "Respectful, non-graphic labour support",
      blocks: [
        {
          title: "Before labour — discuss your plan",
          body: "Use your antenatal conversations to ask about delivery arrangements, your preferences and the questions you want answered before birth.",
        },
        {
          title: "Before labour — confirm where to go",
          body: "Confirm where you should go, whom to contact and what information to bring when your maternity team advises assessment.",
        },
        {
          title: "During labour — understand the care being discussed",
          body: "Labour support and delivery care are the core of this service. Ask the team how they explain progress, discuss options and involve you in decisions.",
        },
      ],
    },
    {
      tag: "After birth",
      imagePendingLabel: "Calm after-birth conversation",
      blocks: [
        {
          title: "After birth — clarify what follows",
          body: "Ask what immediate after-birth care is included, how follow-up is arranged and whether recovery or feeding consultations require separate appointments.",
        },
      ],
    },
  ],
} as const;

export const normalBirthPreferences = {
  eyebrow: "Informed Conversations",
  heading: ["Your preferences matter.", "Your care may need to change."],
  body: [
    "A birth plan communicates your wishes to the team caring for you. It can help you discuss support people, comfort, pain relief and how you would like information explained.",
    "Birth does not always follow the original plan. Your preferences or clinical circumstances may change, and different care may be recommended. A vaginal birth cannot be guaranteed.",
  ],
  questions: [
    "What options are appropriate for my circumstances?",
    "What are the benefits and risks of the options being discussed?",
    "What alternatives may be available?",
    "How could recommendations change during labour?",
  ],
  imagePendingLabel: "Birth-planning discussion",
  cta: { label: "Discuss Your Birth Preferences", href: "#nbd-enquiry" },
} as const;

export const normalBirthComfort = {
  eyebrow: "Questions About Labour",
  heading: "Talk about what could help you feel supported.",
  intro: "Before delivery, ask your maternity team about:",
  items: [
    "Available comfort and pain-relief options.",
    "Whether a chosen support person can attend.",
    "Movement and positions during labour, where appropriate.",
    "How you can communicate changing needs or preferences.",
  ],
  note: "Pain-relief choices depend on your circumstances and the facilities available where you give birth. Confirm the options with your maternity team.",
} as const;

export const normalBirthConsultation = {
  eyebrow: "Start With a Conversation",
  heading: "Bring your questions. Understand your options.",
  steps: [
    {
      number: "01",
      title: "Share your starting point",
      body: "Discuss your pregnancy care so far and what you would like to understand about delivery.",
    },
    {
      number: "02",
      title: "Talk through your preferences",
      body: "Ask about the care team, birth setting, support arrangements and how decisions are discussed.",
    },
    {
      number: "03",
      title: "Confirm the practical next steps",
      body: "Clarify the recommended follow-up, booking process, costs and contact arrangements.",
    },
  ],
  cta: { label: "Enquire About Delivery Care", href: "#nbd-enquiry" },
} as const;

/**
 * Meet the Care Team — no confirmed assignment exists (see this file's own
 * top comment). Kept as the same explicit draft-slot pattern the other two
 * landing pages use for their own unconfirmed clinician/educator section —
 * no "View Full Profile" link, since there is nothing confirmed yet to
 * link to.
 */
export const normalBirthCareTeam = {
  eyebrow: "The People Involved",
  heading: "Know who will be part of your care.",
  portraitPendingLabel: "Actual clinician portrait\nApproved photography pending",
  namePlaceholder: "[Verified clinician full name]",
  credentialsPlaceholder: "[Verified qualification] · [Verified role]",
  introPlaceholder:
    "[Approved introduction describing this clinician's involvement in delivery care. A related-care mapping or antenatal consultation alone does not confirm attendance at any individual birth.]",
  footnote: "Only verified clinician information and real portraits appear here. Attendance at any individual delivery cannot be guaranteed by this page.",
} as const;

/**
 * Delivery Arrangements — every field is an explicit confirmed-pending
 * placeholder. No verified delivery facility, hospital affiliation,
 * booking process, attendance arrangement, support-person policy, fee or
 * emergency capability exists anywhere in this project yet.
 */
export const normalBirthArrangements = {
  eyebrow: "Practical Information",
  heading: "Know where to go—and what to expect.",
  intro: "The consultation location and the delivery location are not always the same place — both are listed separately below.",
  facilityPhotoPendingLabel: "Actual delivery-facility photograph\nApproved photography pending",
  info: [
    { label: "Consultation location", lines: ["[Verified consultation clinic or venue address]"] },
    { label: "Delivery hospital or birth facility", lines: ["[Verified delivery facility name and address]"] },
    { label: "Relationship to The Birthwave", lines: ["[Confirmed relationship between The Birthwave and the delivery facility]"] },
    { label: "Booking process", lines: ["[Confirmed booking and referral process]"] },
    { label: "Team & attendance arrangements", lines: ["[Confirmed attending-team arrangements]"] },
    { label: "Support-person policy", lines: ["[Confirmed delivery-facility support-person policy]"] },
    { label: "Fees & inclusions", lines: ["[Approved fee and what it includes]"] },
    { label: "Potential additional charges", lines: ["[Approved list of possible additional charges]"] },
    { label: "Maternity contact", lines: ["[Verified maternity contact and instructions]"] },
  ],
} as const;

export const normalBirthFaq = {
  eyebrow: "Good to Know",
  heading: "Questions before you enquire.",
  items: [
    {
      question: "What does \"normal delivery\" mean here?",
      answer: "This service uses the term to refer to vaginal birth. The appropriate approach to birth depends on individual clinical circumstances.",
    },
    {
      question: "Can a vaginal birth be guaranteed?",
      answer: "No. Your maternity team may recommend a different approach depending on your pregnancy or how labour progresses.",
    },
    {
      question: "Can I discuss my birth preferences before labour?",
      answer: "Bring your preferences and questions to your maternity-care conversations. Confirm how The Birthwave records and communicates them.",
    },
    {
      question: "What pain relief is available?",
      answer: "Ask the team about the options at your planned delivery facility and which may be appropriate for you.",
    },
    {
      question: "Can my partner or another support person attend?",
      answer: "[Confirmed delivery-facility support-person policy will appear here.]",
    },
    {
      question: "Where will my delivery take place?",
      answer: "[Verified delivery-facility details and its relationship with The Birthwave will appear here.]",
    },
    {
      question: "I have had a previous caesarean. Which service should I explore?",
      answer: "Visit our VBAC page to learn about the consultation pathway, and discuss your individual circumstances with your obstetrician.",
    },
    {
      question: "What is included in the delivery fee?",
      answer: "[Approved inclusions, exclusions and the estimate process will appear here.]",
    },
  ],
} as const;

/**
 * Final Enquiry — TODO(infra): exactly like
 * `pregnancyLandingAppointment`/`birthPrepEnquiry`, no backend endpoint or
 * verified inbox exists yet to actually receive a submission. This form
 * shows the same honest "design preview, not connected" pattern rather
 * than a fake submission-success message.
 */
export const normalBirthEnquiry = {
  eyebrow: "Plan Your Next Step",
  heading: "Let's talk about your delivery care.",
  body: "Enquire about The Birthwave's Normal Birth & Delivery Care, the available arrangements and how to begin a consultation.",
  fields: {
    name: "Full name",
    contact: "Phone number or email",
    message: "What would you like to know about delivery care? (optional)",
  },
  submitLabel: "Send Enquiry",
  formNote: "This enquiry form is for appointment information, not urgent maternity advice. For urgent concerns, contact your maternity team or local emergency service.",
  previewNotice: "Preview — this form is not yet connected to a live enquiry inbox.",
  previewResult: "This is a design preview. No enquiry has been sent — connect this form to a real enquiry endpoint before publishing.",
} as const;

export const normalBirthMobileCta = {
  label: "Enquire About Delivery Care",
  href: "#nbd-enquiry",
} as const;

/**
 * Related Care — restrained links to four separate, existing services
 * (their real names/slugs read from `services-content.ts`, never
 * re-typed), explicitly NOT automatic inclusions of a delivery package.
 */
export const normalBirthRelatedCare = {
  eyebrow: "Related Care",
  heading: "Explore related, separate services.",
  note: "These are separate services at The Birthwave, not automatically included in delivery care.",
  slugs: ["pregnancy-antenatal-care", "birth-preparation", "natural-birth", "vbac", "postpartum-care"],
} as const;
