/**
 * Postpartum Recovery & Care — dedicated landing page content.
 *
 * A SEPARATE content file from `services-content.ts`, exactly like the other
 * eight dedicated landing pages: that file's own `postpartum-care` entry
 * (name, slug, shortDescription, heroStatement, overview, highlights,
 * media.alt) is the shared service record every other consumer reads (Quick
 * Overview, the Sticky Showcase, Find the Right Care, `generateStaticParams`)
 * — untouched by this page. Everything below is this landing page's own,
 * additional copy, transcribed from the confirmed brief for this page.
 *
 * TONE: warm, reassuring, respectful, non-judgmental, practical, clinically
 * responsible. No "bounce back" language, no body-shaming, no fear-based
 * recovery messaging, no promise of quick healing, no fixed recovery
 * timeline, no assumption every birth/recovery experience is the same, no
 * "perfect motherhood" sentimentality, no implication that needing support
 * means something is wrong.
 *
 * SCOPE: nothing below expands this service into physiotherapy,
 * pelvic-floor rehabilitation, wound care, mental-health treatment,
 * medication management, lactation treatment, home nursing, emergency
 * postpartum care, postnatal packages or home visits — none of those are
 * confirmed anywhere in this project. Every operational fact this project
 * cannot currently verify is left as an explicit bracketed
 * "[BirthWave confirmation needed: ...]" placeholder, the same pattern the
 * other dedicated landing pages already establish — never silently filled
 * with a plausible-sounding guess.
 *
 * CLAIM BOUNDARIES: no promised recovery timeline, no "complete recovery",
 * no pain-free healing, no guaranteed return to activity, no specific
 * treatment protocol, exercise, pelvic-floor intervention, wound
 * assessment, medication change or mental-health diagnosis is described as
 * automatic — every individual-assessment question routes back to "your
 * treating clinician"/"your care team."
 *
 * CARE TEAM: `doctors-content.ts` maps exactly two confirmed clinicians to
 * this slug via their own `relatedCareSlugs` — Dr. Amudha Varshini (BNYS,
 * "Naturopathy & Yoga · Prenatal & Postpartum Yoga Specialist") and Dr.
 * Adithi Nair ("Pelvic Floor Therapy · Vaginismus Coach", no credentials
 * confirmed for her). Both are shown, read live from `doctors-content.ts`
 * rather than re-typed, so this section can never drift from the confirmed
 * roster. Dr. Adithi Nair's own real title mentions pelvic-floor therapy —
 * shown exactly as recorded — but this page's own copy does not claim
 * postpartum pelvic-floor treatment is offered as part of this service (see
 * the FAQ's own explicit pending placeholder for that question).
 *
 * IMAGES: no image-generation tool is available in this session. The
 * existing `services-imagery.ts` `postpartum-care` asset was inspected and
 * found to depict a visibly pregnant woman in conversation with a clinician
 * — a prenatal consultation scene, not a postpartum one — so it is
 * deliberately NOT reused here (reusing it would misrepresent it as
 * postpartum photography). All five conceptual spots render the site's
 * established gradient `MediaPlaceholder` instead — see
 * `docs/postpartum-care-ai-imagery.md` for the pending generation briefs.
 */

export const postpartumHero = {
  eyebrow: "AFTER BIRTH",
  heading: "Postpartum Recovery & Care",
  supportingHeadline: "Care for the weeks and changes that come after birth.",
  body: "Recovery after birth can look different for every person.",
  bodySecondary:
    "You may have questions about healing, physical changes, feeding, rest, emotional adjustment or what is normal for your recovery. A postpartum consultation gives you space to talk through what you are experiencing and understand what may need attention next.",
  primaryCta: { label: "Book a Postpartum Consultation", href: "#enquiry" },
  secondaryCta: { label: "Explore postpartum support ↓", href: "#what-we-cover" },
} as const;

export const postpartumIntro = {
  eyebrow: "RECOVERY IS PERSONAL",
  heading: "There is no single way that recovery after birth should feel.",
  paragraphs: [
    "The days and weeks after birth can bring physical changes, new routines, questions and uncertainty.",
    "Some concerns may be expected parts of recovery. Others may need a closer conversation with your healthcare team.",
    "You do not need to decide that on your own before asking.",
    "A postpartum consultation is a place to describe what you are experiencing, ask questions and understand what may be appropriate next.",
  ],
  themes: [
    { title: "Physical recovery", body: "Talk about changes, discomfort or concerns you want reviewed." },
    { title: "Day-to-day adjustment", body: "Discuss how recovery, rest, feeding and caring for your baby are affecting you." },
    { title: "Questions after birth", body: "Bring anything that feels unclear, different or difficult to interpret." },
  ],
  cta: { label: "Book a Postpartum Consultation", href: "#enquiry" },
} as const;

/**
 * What Postpartum Care May Include — anchors `#what-we-cover`, the hero's
 * own secondary link target. Four numbered steps beside one image, matching
 * `lactation-covers.tsx`'s own numbered-steps composition. Step 04
 * explicitly leaves the next step to the care team's own explanation, never
 * an automatic assessment.
 */
export const postpartumCovers = {
  eyebrow: "WHAT WE CAN TALK THROUGH",
  heading: "Start with how you are feeling and what has changed since birth.",
  steps: [
    { number: "01", title: "Your birth and recovery so far", body: "Share relevant information about your delivery and how recovery has been progressing." },
    { number: "02", title: "Physical changes and questions", body: "Discuss symptoms, discomfort or changes you want your clinician to understand." },
    { number: "03", title: "Feeding, rest and daily adjustment", body: "Bring questions about how postpartum recovery fits alongside feeding, sleep and newborn care." },
    { number: "04", title: "What happens next", body: "Understand whether follow-up, further assessment or another service from The Birthwave may be appropriate." },
  ],
  note: "The exact assessment and recommendations depend on your individual recovery and clinical circumstances.",
} as const;

/**
 * Recovery Can Look Different. Four themes beside a portrait image,
 * matching `gynaecology-when-to-consider.tsx`'s own points-plus-image
 * composition. Closes with an explicit urgent-care routing note.
 */
export const postpartumRecovery = {
  eyebrow: "YOUR RECOVERY, YOUR QUESTIONS",
  heading: "Postpartum recovery is not a race back to “normal.”",
  body: "Birth can affect the body and daily life in different ways.",
  bodySecondary: "Your consultation can begin with what you have noticed rather than whether you think it is “serious enough” to mention.",
  themes: [
    { title: "Healing after birth", body: "Bring questions about how recovery is progressing and what changes you have noticed." },
    { title: "When something feels uncomfortable", body: "Describe what you are experiencing and ask whether further assessment may be appropriate." },
    { title: "Energy, rest & adjustment", body: "Talk about how recovery and caring for your baby are fitting into daily life." },
    { title: "When new questions come up", body: "Postpartum care may continue beyond the first days after birth. You can return with questions as your recovery changes." },
  ],
  note: "For severe, sudden or urgent symptoms, contact your treating healthcare team or local emergency service rather than relying on this webpage or enquiry form.",
  cta: { label: "Discuss Your Recovery", href: "#enquiry" },
} as const;

export const postpartumFirstConsultation = {
  eyebrow: "YOUR FIRST CONVERSATION",
  heading: "Bring your questions. Start with how recovery feels for you.",
  steps: [
    { number: "01", title: "Share your birth and recovery story", body: "Explain what has happened since delivery and what you would like help understanding." },
    { number: "02", title: "Talk through your concerns", body: "Discuss the changes, symptoms or questions that matter most to you." },
    { number: "03", title: "Understand your next step", body: "Ask what follow-up, additional assessment or related care may be appropriate." },
  ],
  note: "Observation, physical assessment and any particular intervention depend on what is appropriate for your consultation — none is automatic.",
  cta: { label: "Book a Postpartum Consultation", href: "#enquiry" },
} as const;

/**
 * Care Team — `doctors-content.ts` maps exactly TWO confirmed clinicians to
 * this slug (see this file's own top comment): Dr. Amudha Varshini and Dr.
 * Adithi Nair. Both shown; names, credentials, roles and portrait status
 * are read directly from that single source of truth in
 * `postpartum-care-clinician.tsx` rather than re-typed here, so this
 * section can never drift from the confirmed roster.
 */
export const postpartumClinician = {
  eyebrow: "THE PEOPLE BEHIND YOUR CARE",
  heading: "Support that considers the wider journey after birth.",
  doctorSlugs: ["dr-amudha-varshini", "dr-adithi-nair"],
  profileLabel: "View Full Profile",
  bookLabel: "Book Consultation",
  bookHref: "#enquiry",
} as const;

/**
 * Practical Information — every field is an explicit confirmed-pending
 * placeholder, the same pattern the other dedicated landing pages already
 * establish for unconfirmed operational detail.
 */
export const postpartumPractical = {
  eyebrow: "BEFORE YOUR VISIT",
  heading: "A few practical details before you book.",
  intro: "Some details are still being confirmed. Where that's the case, we say so plainly below rather than guessing.",
  facilityPhotoPendingLabel: "Actual consultation-space photograph\nApproved photography pending",
  info: [
    { label: "Consultation location", lines: ["[The Birthwave confirmation needed: postpartum consultation location]"] },
    { label: "Consultation format", lines: ["[The Birthwave confirmation needed: in-person / online availability]"] },
    { label: "Home visits", lines: ["[The Birthwave confirmation needed: whether postpartum home visits are offered]"] },
    { label: "What to bring", lines: ["[The Birthwave confirmation needed: what to bring]"] },
    { label: "When to attend", lines: ["[The Birthwave confirmation needed: recommended timing / booking guidance]"] },
    { label: "Consultation duration", lines: ["[The Birthwave confirmation needed: duration]"] },
    { label: "Fee", lines: ["[The Birthwave confirmation needed: consultation fee]"] },
    { label: "Follow-up", lines: ["[The Birthwave confirmation needed: follow-up process]"] },
    { label: "Booking", lines: ["[The Birthwave confirmation needed: booking method / phone / WhatsApp]"] },
  ],
} as const;

export const postpartumFaq = {
  eyebrow: "Good to Know",
  heading: "Questions before you enquire.",
  items: [
    {
      question: "When should I book a postpartum consultation?",
      answer: "Postpartum questions can arise at different times after birth. Contact The Birthwave care team to understand which appointment is appropriate for your stage of recovery.",
    },
    {
      question: "Do I need to wait until a routine follow-up appointment if I have a concern?",
      answer: "If something is worrying you, contact your treating healthcare team rather than waiting solely because a routine appointment is scheduled. For urgent or severe symptoms, seek urgent medical care.",
    },
    {
      question: "What can I discuss during postpartum care?",
      answer: "You can begin with the changes, symptoms or recovery questions you are experiencing. The appropriate assessment and next steps depend on your individual circumstances.",
    },
    {
      question: "Will I need an examination?",
      answer: "Whether an examination is appropriate depends on your concerns, history and clinician's assessment. Ask what is being recommended and why before proceeding.",
    },
    {
      question: "Can I discuss pelvic-floor concerns?",
      answer: "[The Birthwave confirmation needed: postpartum pelvic-floor support scope]",
    },
    {
      question: "Can I ask about feeding at the same visit?",
      answer: "The Birthwave also offers Lactation & Breastfeeding Support. Ask the care team which consultation is appropriate for the questions you have.",
    },
    {
      question: "Can I bring my baby?",
      answer: "[The Birthwave confirmation needed: baby/accompaniment policy]",
    },
    {
      question: "Can my partner or support person attend?",
      answer: "[The Birthwave confirmation needed: support-person policy]",
    },
    {
      question: "Do you provide home visits?",
      answer: "[The Birthwave confirmation needed: home-visit availability]",
    },
    {
      question: "What if I have an urgent postpartum concern?",
      answer: "This webpage and enquiry form are for non-urgent appointment information. If you have a severe, sudden or urgent concern, contact your treating healthcare team or local emergency service.",
    },
  ],
} as const;

/**
 * Related Care — restrained links to four EXISTING, separate services
 * (their real names/slugs read from `services-content.ts`, never re-typed),
 * explicitly not framed as automatic inclusions of Postpartum Recovery &
 * Care.
 */
export const postpartumRelatedCare = {
  eyebrow: "CONNECTED CARE",
  heading: "Support can continue beyond a single postpartum visit.",
  note: "These are separate services at The Birthwave, not automatically included in Postpartum Recovery & Care.",
  slugs: ["lactation", "newborn-pediatric-care", "nutrition-emotional-wellbeing", "pregnancy-antenatal-care"],
} as const;

/**
 * Final Enquiry — TODO(infra): exactly like the other eight landing pages'
 * own forms, no backend endpoint or verified enquiry inbox exists yet.
 * Shows the same honest "design preview, not connected" pattern rather than
 * a fake submission-success message. Deliberately short: full name, a
 * single phone-or-email contact field, and an optional message. Nothing
 * here is written to browser storage.
 */
export const postpartumEnquiry = {
  eyebrow: "PLAN YOUR NEXT STEP",
  heading: "Recovery questions are worth bringing into the conversation.",
  body: "Enquire about The Birthwave's Postpartum Recovery & Care and understand how to begin a consultation.",
  bodySecondary: "You do not need to know exactly what kind of support you need before contacting the team.",
  fields: {
    name: "Full name",
    contact: "Phone number or email",
    message: "What would you like to discuss about your postpartum recovery? (optional)",
  },
  submitLabel: "Send Enquiry",
  formNote: "This form is for appointment information and non-urgent enquiries. It is not an emergency medical service.",
  urgentNote: "This webpage and enquiry form are for non-urgent appointment information. If you have a severe, sudden or urgent concern, contact your treating healthcare team or local emergency service.",
  previewNotice: "Preview — enquiry integration pending.",
  previewResult: "This is a design preview. No enquiry has been sent — connect this form to a real enquiry endpoint before publishing.",
} as const;

export const postpartumMobileCta = {
  label: "Book a Postpartum Consultation",
  href: "#enquiry",
} as const;
