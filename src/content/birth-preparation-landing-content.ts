/**
 * Birth Preparation & Childbirth Education — dedicated landing page content.
 *
 * A SEPARATE content file from `services-content.ts` on purpose, exactly
 * like `pregnancy-antenatal-landing-content.ts`: that file's own
 * `birth-preparation` entry (name, slug, shortDescription, overview,
 * highlights, media.alt) is the shared service record every other
 * consumer reads (Quick Overview, the Sticky Showcase, Find the Right
 * Care, `generateStaticParams`) — untouched by this page. Everything
 * below is this landing page's own, additional copy.
 *
 * `services-content.ts`'s confirmed record for this slug names three
 * things: childbirth education sessions, birth-planning conversations,
 * and preparing what to expect. Every expanded curriculum topic below is
 * framed as something a visitor can ASK ABOUT, not a confirmed programme
 * inclusion — no instructor assignment, credential, schedule, price,
 * language, class size, policy, testimonial, outcome or clinic facility
 * is invented anywhere in this file. Every fact this project cannot
 * currently verify is left as an explicit bracketed placeholder, the same
 * pattern `pregnancy-antenatal-landing-content.ts` already establishes —
 * never silently filled with a plausible-sounding guess.
 *
 * No confirmed educator is mapped to this programme: `doctors-content.ts`
 * carries a related-care mapping toward "birth-preparation" for two
 * profiles, but that whole file is itself an explicit, still-unconfirmed
 * structural placeholder (see `src/app/doctors/[slug]/page.tsx`'s own
 * comment — "no real names, credentials or bios exist yet; do not treat
 * any of this as real"). A related-care mapping alone does not establish
 * who delivers the programme, so the educator section below stays an
 * explicit draft slot rather than naming anyone from that file.
 */

export const birthPrepHero = {
  eyebrow: "Birth Preparation",
  headingLines: ["Birth Preparation &", "Childbirth Education"],
  supportingHeadline: "Prepare for birth with clearer information and space for your questions.",
  body: "Explore childbirth education sessions and birth-planning conversations at The Birthwave. Understand what to expect and ask about the preparation options available to you.",
  primaryCta: { label: "Enquire About Sessions", href: "#birth-prep-enquiry" },
  secondaryCta: { label: "Explore What You'll Learn", href: "#birth-prep-topics" },
  supportingLine: "Understand birth. Explore your choices. Prepare your questions.",
} as const;

export const birthPrepIntro = {
  eyebrow: "Space to Understand",
  heading: ["There's a lot to take in.", "Start with a conversation."],
  paragraphs: [
    "Between advice from family, stories online and your own expectations, preparing for birth can feel overwhelming.",
    "You may be wondering what labour feels like, how decisions are made or how to communicate what matters to you. Childbirth education gives these questions a place.",
    "At The Birthwave, preparation begins with understanding what to expect and talking through your preferences.",
  ],
  points: [
    { title: "Understand what's ahead.", body: "Build familiarity with birth-related information and the questions you want to discuss." },
    { title: "Express what matters.", body: "Put your preferences, concerns and support needs into words." },
    { title: "Prepare for conversations.", body: "Take your questions into discussions with your maternity care team." },
  ],
} as const;

/**
 * Education Topics — two substantial image-and-text compositions, three
 * topics each, matching the brief's own explicit "avoid six identical
 * generic cards" instruction. `curriculumNote` is the brief's required
 * framing line: these are topics to ask about, not confirmed inclusions.
 */
export const birthPrepTopics = {
  eyebrow: "What You Can Explore",
  heading: "From understanding labour to thinking through your preferences.",
  curriculumNote: "Ask the team which of these topics are included in the available programme.",
  compositions: [
    {
      tag: "Understanding what's ahead",
      imageKey: "birth-prep-landing-learning-labour",
      topics: [
        {
          title: "Understanding labour and birth",
          body: "Explore how labour can progress, the language you may hear and why different forms of care may be discussed.",
        },
        {
          title: "Comfort and support",
          body: "Prepare questions about relaxation, comfort and pain-relief options for your maternity care team.",
        },
        {
          title: "Birth preferences and decisions",
          body: "Consider what matters to you and how to discuss the options available in your circumstances.",
        },
      ],
    },
    {
      tag: "Looking ahead, together",
      imageKey: "birth-prep-landing-learning-support",
      topics: [
        {
          title: "Preparing for a change of plan",
          body: "Make room for the possibility that recommendations or preferences may change.",
        },
        {
          title: "The role of a support person",
          body: "Ask how someone you trust could be involved in preparation and support.",
        },
        {
          title: "Looking beyond the birth",
          body: "Identify questions about recovery, feeding and newborn care, including where further support may be useful.",
        },
      ],
    },
  ],
} as const;

export const birthPrepPreferences = {
  eyebrow: "Your Birth Preferences",
  heading: ["A plan that expresses your wishes", "—and leaves room for change."],
  body: [
    "A birth plan helps you communicate your preferences to the people caring for you. It can include who you would like beside you, your comfort and pain-relief preferences, and what you would like discussed with you.",
    "Your preferences may change. Clinical circumstances may also mean that different care is recommended. Preparing includes understanding that flexibility.",
  ],
  questions: [
    "What matters most to me during birth?",
    "What would I like my care team to explain?",
    "What support would I find helpful?",
    "How would I like to discuss changes in the plan?",
  ],
  imageKey: "birth-prep-landing-preferences",
  cta: { label: "Ask About Birth-Planning Conversations", href: "#birth-prep-enquiry" },
} as const;

export const birthPrepWhoFor = {
  eyebrow: "Your Starting Point",
  heading: "Different experiences. Different questions.",
  intro: "You might be exploring birth preparation because:",
  items: [
    "You are expecting your first baby and want to understand what lies ahead.",
    "You have given birth before and have new questions this time.",
    "You want to discuss your preferences before delivery.",
    "You would like to understand how a support person could be involved.",
    "You are unsure where to begin and want to ask about the programme.",
  ],
  note: "Ask the team which sessions fit your stage of pregnancy and circumstances. Education complements your maternity care; it does not replace individual clinical advice.",
} as const;

export const birthPrepHowToBegin = {
  eyebrow: "How To Begin",
  heading: "Start with the questions you already have.",
  steps: [
    {
      number: "01",
      title: "Tell us what you're looking for.",
      body: "Enquire about childbirth education, birth-planning conversations or both.",
    },
    {
      number: "02",
      title: "Ask about the programme.",
      body: "Confirm topics, session format, timing, fees and attendance arrangements.",
    },
    {
      number: "03",
      title: "Choose your next step.",
      body: "Decide whether the available programme suits your needs before booking.",
    },
  ],
  cta: { label: "Enquire About Sessions", href: "#birth-prep-enquiry" },
} as const;

/**
 * Meet Your Educator — no confirmed assignment exists (see this file's own
 * top comment). Kept as the same explicit draft-slot pattern
 * `pregnancy-antenatal-landing-content.ts` uses for its own unconfirmed
 * clinician section.
 */
export const birthPrepEducator = {
  eyebrow: "Meet Your Educator",
  heading: "Know who will guide the conversation.",
  portraitNote: "Actual educator portrait\nApproved photography pending",
  namePlaceholder: "[Verified educator full name]",
  credentialsPlaceholder: "[Verified qualification] · [Verified role]",
  bioPlaceholder: "[Approved introduction describing this educator's role in the programme and approach to sessions.]",
  footnote: "Only verified educator information and real portraits appear here.",
} as const;

/**
 * Programme Details — every field is an explicit confirmed-pending
 * placeholder. No verified session format, location, schedule, duration,
 * educator, language, support-person policy or fee exists anywhere in
 * this project yet.
 */
export const birthPrepProgramme = {
  eyebrow: "Plan Your Session",
  heading: "The details that help you decide.",
  imageNote: "Actual teaching space photograph\nApproved photography pending",
  info: [
    { label: "Session format", lines: ["[Confirmed format — individual, group or online]"] },
    { label: "Location", lines: ["[Verified clinic or venue address]"] },
    { label: "Schedule", lines: ["[Confirmed available dates and times]"] },
    { label: "Duration & number of sessions", lines: ["[Confirmed session length and count]"] },
    { label: "Educator", lines: ["[Verified educator name and role]"] },
    { label: "Languages", lines: ["[Confirmed languages offered]"] },
    { label: "Support-person attendance", lines: ["[Confirmed attendance policy]"] },
    { label: "Fees & inclusions", lines: ["[Approved fee and what it includes]"] },
  ],
} as const;

export const birthPrepFaq = {
  eyebrow: "Good to know",
  heading: "Questions before you enquire.",
  items: [
    {
      question: "When should I enquire about birth preparation?",
      answer: "Ask the team about recommended timing, available dates and which sessions suit your stage of pregnancy.",
    },
    {
      question: "Is this only for first-time parents?",
      answer: "Childbirth education can also be useful as a refresher. Ask whether the programme addresses the questions you have for this pregnancy.",
    },
    {
      question: "Can my partner or support person attend?",
      answer: "Please confirm attendance arrangements with the team before booking.",
    },
    {
      question: "Does birth preparation guarantee a vaginal or pain-free birth?",
      answer: "No. Education supports preparation and understanding; it cannot guarantee a particular birth outcome or remove the possibility of medical intervention.",
    },
    {
      question: "Can I attend if I am considering a caesarean birth or VBAC?",
      answer: "Ask whether the programme covers your circumstances. Discuss appropriate birth options with your treating obstetrician.",
    },
    {
      question: "Are sessions individual, group-based or online?",
      answer: "[Confirmed session format will appear here.]",
    },
    {
      question: "What does the programme cost?",
      answer: "[Approved fee and inclusions will appear here.]",
    },
    {
      question: "Does this replace antenatal appointments?",
      answer: "No. Continue your scheduled maternity care and discuss individual medical questions with your treating team.",
    },
  ],
} as const;

/**
 * Final Enquiry — TODO(infra): exactly like
 * `pregnancyLandingAppointment` (pregnancy-antenatal-landing-content.ts),
 * no backend endpoint or verified inbox exists yet to actually receive a
 * submission. This form shows the same honest "design preview, not
 * connected" pattern rather than a fake submission-success message —
 * see `birth-preparation-enquiry.tsx`'s own comment.
 */
export const birthPrepEnquiry = {
  eyebrow: "Take the Next Step",
  heading: "Bring your questions. Begin your preparation.",
  body: "Ask about The Birthwave's childbirth education sessions and birth-planning conversations.",
  fields: {
    name: "Full name",
    contact: "Phone number or email",
    interest: "What are you enquiring about?",
    message: "Message (optional)",
  },
  interestOptions: ["Childbirth education", "Birth-planning conversation", "Both", "Not sure"] as const,
  submitLabel: "Send Enquiry",
  formNote: "Please avoid sharing medical records or detailed health information in this enquiry.",
  previewNotice: "Preview — this form is not yet connected to a live enquiry inbox.",
  previewResult: "This is a design preview. No enquiry has been sent — connect this form to a real enquiry endpoint before publishing.",
} as const;

export const birthPrepMobileCta = {
  label: "Enquire About Sessions",
  href: "#birth-prep-enquiry",
} as const;

/**
 * Related Care — restrained links to four separate, existing services
 * (their real names/slugs read from `services-content.ts`, never
 * re-typed), explicitly NOT programme inclusions of this page's own
 * childbirth education sessions.
 */
export const birthPrepRelatedCare = {
  eyebrow: "Related Care",
  heading: "Explore related, separate services.",
  note: "These are separate services at The Birthwave, not part of the birth preparation programme itself.",
  slugs: ["pregnancy-antenatal-care", "natural-birth", "normal-birth-delivery", "postpartum-care", "lactation"],
} as const;
