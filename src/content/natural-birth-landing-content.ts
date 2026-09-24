/**
 * Natural Birth — dedicated landing page content.
 *
 * A SEPARATE content file from `services-content.ts`, exactly like
 * `vbac-landing-content.ts`, `pregnancy-antenatal-landing-content.ts` and
 * the other dedicated landing pages: that file's own `natural-birth`
 * entry (name, slug, shortDescription, heroStatement, overview,
 * highlights, media.alt) is the shared service record every other
 * consumer reads (Care Journey, Find the Right Care, `generateStaticParams`,
 * `sitemap.ts`) — untouched by this page's own richer copy below.
 *
 * POSITIONING (do not blur these — see each sibling page's own file for
 * its own side of the same distinction):
 * - Natural Birth (this page): birth preferences, preparation,
 *   physiological-birth planning, informed choices, comfort/movement
 *   questions, and flexibility if circumstances change.
 * - Normal Birth & Delivery Care: labour support, the delivery-care
 *   pathway, practical arrangements and care around birth.
 * - Birth Preparation: education, readiness and preparation before
 *   labour begins.
 * - VBAC: birth planning specifically after a previous caesarean.
 *
 * CLINICAL CLAIM BOUNDARIES: nothing below claims or implies a
 * guaranteed natural/vaginal/intervention-free/pain-free birth, a
 * guaranteed avoidance of induction/caesarean/assisted delivery, a named
 * clinician's guaranteed attendance, a specific pain-relief or monitoring
 * policy, water-birth or home-birth availability, a hospital affiliation,
 * or any success percentage. Caesarean birth, assisted birth, induction
 * and pain relief are never framed as a failure of the plan — every
 * "if circumstances change" moment routes back to "your maternity team,"
 * never a page-provided determination. Every operational fact this
 * project cannot currently verify is an explicit bracketed placeholder,
 * the same pattern every other dedicated landing page already
 * establishes — never silently filled with a plausible-sounding guess.
 *
 * CLINICIAN SECTION: `doctors-content.ts` records the founder's
 * `specialFocus` as including "Natural Birth & VBAC Specialist," and she
 * carries no `relatedCareSlugs`/`careAreas` mapping to this or any other
 * specific programme (same as her VBAC listing) — her confirmed identity
 * fields (name, role, credentials, specialFocus) are used directly below,
 * exactly as recorded, nothing invented (no experience years, birth
 * counts, success rates or hospital affiliations).
 *
 * IMAGES: five original placeholder subjects are mapped in
 * `natural-birth-landing-imagery.ts`. No image-generation tool is
 * available in this session, so every slot renders the established
 * gradient `MediaPlaceholder` — the exact same "built visual placeholder"
 * pattern `vbac-landing-imagery.ts` already uses for the identical
 * reason. Generation briefs for all five subjects live in
 * `docs/natural-birth-ai-imagery.md`.
 */

export const naturalBirthHero = {
  eyebrow: "YOUR BIRTH, YOUR CONVERSATION",
  heading: "Natural Birth",
  supportingHeadline: "Prepare for the birth you hope for — with space for informed choices and flexibility along the way.",
  body: "If you are hoping for a vaginal birth with a more natural or physiological approach, planning can begin with understanding your preferences, asking questions and knowing how your care may adapt if circumstances change.",
  bodySecondary: "Birth cannot always follow a fixed plan.",
  bodyTertiary: "A consultation gives you space to talk about what matters to you and understand the options relevant to your pregnancy.",
  primaryCta: { label: "Discuss Your Birth Preferences", href: "#enquiry" },
  secondaryCta: { label: "Explore the Natural Birth approach ↓", href: "#natural-birth-approach" },
} as const;

/**
 * Section 02 — What Natural Birth Means Here. `id: natural-birth-approach`
 * — targeted directly by the hero's own secondary CTA.
 */
export const naturalBirthApproach = {
  eyebrow: "UNDERSTANDING THE APPROACH",
  heading: "Natural birth is a preference, not a promise.",
  paragraphs: [
    "People use the term “natural birth” in different ways.",
    "For some, it means hoping for a vaginal birth with as little intervention as is appropriate.",
    "For others, it means being able to move, participate in decisions, understand what is happening and feel supported through labour.",
    "At The Birthwave, the starting point is a conversation about what natural birth means to you.",
    "Your clinical circumstances and the way labour progresses may change what is appropriate.",
  ],
  note: "A natural or vaginal birth cannot be guaranteed.",
} as const;

/**
 * Section 03 — What You Can Plan and Discuss. Five themes, each phrased as
 * something to discuss with your care team — never something The
 * Birthwave automatically offers, guarantees or approves.
 */
export const naturalBirthPreferences = {
  eyebrow: "YOUR PREFERENCES",
  heading: "A birth plan can help start the right conversations.",
  themes: [
    {
      title: "Movement & Comfort",
      body: "Ask what movement, positioning and comfort options may be appropriate during labour.",
    },
    {
      title: "Support During Labour",
      body: "Discuss what kind of support matters to you and who may be involved.",
    },
    {
      title: "Information & Decisions",
      body: "Talk about how you want options and recommendations explained to you.",
    },
    {
      title: "Pain-Relief Questions",
      body: "Ask what pain-relief choices may be available and appropriate.",
    },
    {
      title: "When Circumstances Change",
      body: "Discuss how preferences can remain part of the conversation if your maternity team recommends a different approach.",
    },
  ],
  cta: { label: "Talk About Your Birth Preferences", href: "#enquiry" },
} as const;

/**
 * Section 04 — Supporting the Birth You Hope For. Deliberately distinct
 * from `birth-preparation-landing-content.ts`'s own education/readiness
 * framing — this is specifically about defining preferences and
 * preparing for more than one possibility, not childbirth education
 * itself.
 */
export const naturalBirthSupport = {
  eyebrow: "PREPARING FOR LABOUR",
  heading: "Preparation is about understanding your options, not controlling every outcome.",
  body: "Preparing for birth can help you feel more informed about what may happen, what questions to ask and which preferences matter most to you.",
  steps: [
    {
      number: "01",
      title: "Understand your starting point",
      body: "Discuss your pregnancy and any factors relevant to birth planning.",
    },
    {
      number: "02",
      title: "Define what matters to you",
      body: "Bring your preferences around support, communication, movement, comfort and decision-making.",
    },
    {
      number: "03",
      title: "Prepare for more than one possibility",
      body: "Talk about how the plan may adapt if your circumstances or labour changes.",
    },
  ],
} as const;

/** Section 05 — When Plans Need to Change. Calm, reassuring tone — a
 * different route is never framed as the plan having failed. */
export const naturalBirthFlexibility = {
  eyebrow: "FLEXIBILITY IS PART OF BIRTH PLANNING",
  heading: "A different route does not mean the plan has failed.",
  paragraphs: [
    "Labour and birth can change.",
    "Your maternity team may recommend additional monitoring, pain relief, assisted birth, caesarean birth or another approach depending on your individual circumstances.",
    "Having preferences does not require ignoring changing clinical needs.",
    "An informed birth plan should leave room for questions, explanation and conversation when the situation changes.",
  ],
} as const;

/** Section 06 — Your Consultation Journey. Four steps, text-led (no
 * image slot reserved — matching the "no image, text-led" precedent
 * `vbac-first-visit.tsx`/`vbac-conversation.tsx`'s own `VbacInformed`
 * already establish for a comparable need). */
export const naturalBirthJourney = {
  eyebrow: "START WITH A CONVERSATION",
  heading: "Bring the birth you are hoping for into the room.",
  steps: [
    {
      number: "01",
      title: "Share your pregnancy journey",
      body: "Talk about your pregnancy care so far and any factors that may matter when discussing birth.",
    },
    {
      number: "02",
      title: "Explain your preferences",
      body: "Describe what “natural birth” means to you and the kind of experience you hope for.",
    },
    {
      number: "03",
      title: "Ask about your options",
      body: "Discuss which preferences may be appropriate and what practical arrangements still need confirmation.",
    },
    {
      number: "04",
      title: "Understand the next step",
      body: "Clarify follow-up conversations, preparation and the wider delivery-care pathway.",
    },
  ],
  cta: { label: "Discuss Natural Birth", href: "#enquiry" },
} as const;

/**
 * Section 07 — Care Team. Dr. Santoshi Nandigam's confirmed identity
 * fields are read directly from `doctors-content.ts` by the component
 * (never re-typed here) — this object only carries this section's own
 * eyebrow/heading copy.
 */
export const naturalBirthClinician = {
  eyebrow: "THE PEOPLE BEHIND YOUR CARE",
  heading: "Birth planning begins with understanding what matters to you.",
  cta: { label: "Book a Consultation", href: "/#connect" },
} as const;

/**
 * Section 08 — Practical Information. Every field is an explicit
 * confirmed-pending placeholder — no verified consultation location,
 * delivery facility, attendance arrangement, support-person policy,
 * pain-relief/movement policy, booking process, fee or contact detail
 * exists anywhere in this project yet. Consultation location and
 * delivery location are kept as two clearly separate fields — they are
 * not necessarily the same place, and conflating them would be a real
 * factual error, not just an omission.
 */
export const naturalBirthPractical = {
  eyebrow: "BEFORE YOU PLAN",
  heading: "A few practical questions are worth confirming early.",
  facilityPhotoPendingLabel: "Actual consultation-space photograph\nApproved photography pending",
  info: [
    { label: "Consultation location", lines: ["[Birthwave confirmation needed: Natural Birth consultation location]"] },
    { label: "Delivery location", lines: ["[Birthwave confirmation needed: actual delivery facility]"] },
    { label: "Relationship with delivery facility", lines: ["[Birthwave confirmation needed: Birthwave/facility relationship]"] },
    { label: "Clinician attendance", lines: ["[Birthwave confirmation needed: attendance arrangements]"] },
    { label: "Support person", lines: ["[Birthwave confirmation needed: birth-companion policy]"] },
    { label: "Pain-relief options", lines: ["[Birthwave confirmation needed: facility-specific options]"] },
    { label: "Movement / positioning", lines: ["[Birthwave confirmation needed: facility policy]"] },
    { label: "Booking process", lines: ["[Birthwave confirmation needed: booking process]"] },
    { label: "Fees", lines: ["[Birthwave confirmation needed: consultation/delivery fees]"] },
    { label: "Contact", lines: ["[Birthwave confirmation needed: phone / WhatsApp]"] },
  ],
} as const;

export const naturalBirthFaq = {
  eyebrow: "Good to Know",
  heading: "Questions before you enquire.",
  items: [
    {
      question: "What does Natural Birth mean?",
      answer:
        "The term can mean different things to different people. It often refers to hoping for a vaginal birth with a physiological or lower-intervention approach where appropriate. Your consultation is a place to explain what it means to you.",
    },
    {
      question: "Can Natural Birth be guaranteed?",
      answer:
        "No. Birth may unfold differently from the original plan, and your maternity team may recommend another approach depending on your circumstances and how labour progresses.",
    },
    {
      question: "Is Natural Birth the same as Normal Birth & Delivery Care?",
      answer:
        "They are related but have different focuses. Natural Birth focuses on preferences, preparation and conversations around the kind of birth experience you hope for. Normal Birth & Delivery Care focuses more broadly on labour support, delivery care and practical arrangements around birth.",
    },
    {
      question: "Can I make a birth plan?",
      answer:
        "You can bring your preferences and questions into your maternity-care conversations. A birth plan can help communicate what matters to you while remaining flexible if circumstances change.",
    },
    {
      question: "Does Natural Birth mean no pain relief?",
      answer:
        "Not necessarily. Your preferences around comfort and pain relief can be discussed with your maternity team. Available options depend on your circumstances and the facility where you give birth.",
    },
    {
      question: "Can I move or use different positions during labour?",
      answer: "Ask The Birthwave team about what may be appropriate for you and what is permitted at the confirmed delivery facility.",
    },
    {
      question: "Can my partner or another support person be present?",
      answer: "[Birthwave confirmation needed: support-person / birth-companion policy]",
    },
    {
      question: "Where will I give birth?",
      answer: "[Birthwave confirmation needed: delivery facility and relationship with Birthwave]",
    },
    {
      question: "What happens if a caesarean is recommended?",
      answer:
        "Birth plans may need to change if your clinical circumstances change. Ask your maternity team to explain the recommendation, the reasons for it and the options relevant to your situation.",
    },
    {
      question: "I have had a previous caesarean. Is this the right page for me?",
      answer:
        "The Birthwave also has a dedicated VBAC service for people considering vaginal birth after a previous caesarean. Your obstetrician can help you understand which pathway is appropriate.",
    },
  ],
} as const;

/**
 * Section 11 — Final Enquiry. `id: enquiry` (this page's own explicit
 * anchor, targeted by every CTA above). TODO(infra): exactly like every
 * other dedicated landing page's own form, no backend endpoint or
 * verified inbox exists yet — shows the same honest "design preview, not
 * connected" pattern rather than a fake submission-success message.
 * Deliberately short: full name, a single phone-or-email contact field,
 * and an optional message.
 */
export const naturalBirthEnquiry = {
  eyebrow: "START WITH YOUR QUESTIONS",
  heading: "Tell us what you are hoping for from your birth.",
  body: "Enquire about The Birthwave’s Natural Birth consultation and begin a conversation about your preferences, preparation and care options.",
  fields: {
    name: "Full name",
    contact: "Phone number or email",
    message: "What would you like to discuss about natural birth? (optional)",
  },
  submitLabel: "Send Enquiry",
  urgentNote: "This form is for appointment information and non-urgent enquiries. It is not an emergency maternity service.",
  previewNotice: "Preview — enquiry integration pending.",
  previewResult: "This is a design preview. No enquiry has been sent — connect this form to a real enquiry endpoint before publishing.",
} as const;

export const naturalBirthMobileCta = {
  label: "Discuss Natural Birth",
  href: "#enquiry",
} as const;

/**
 * Related Care — restrained links to five separate, existing services
 * (their real names/slugs read from `services-content.ts`, never
 * re-typed), explicitly not framed as bundled/automatic inclusions.
 */
export const naturalBirthRelatedCare = {
  eyebrow: "CONNECTED BIRTH CARE",
  heading: "Explore the care around your birth journey.",
  note: "These are separate services at The Birthwave, not automatically included in Natural Birth support.",
  slugs: ["pregnancy-antenatal-care", "birth-preparation", "normal-birth-delivery", "vbac", "postpartum-care"],
} as const;
