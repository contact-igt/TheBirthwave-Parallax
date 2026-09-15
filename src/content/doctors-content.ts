/**
 * Doctors / team content — The Birth Wave
 *
 * TODO(content): no approved team roster exists yet. Every name,
 * credential, role and biography below is a structural placeholder for
 * the /doctors and /doctors/[slug] route shells — none of it is real and
 * none of it may be presented as a real person's credentials. The brand
 * guide's business-card mockup names a "Dr Santoshi Nandigam" — that was
 * flagged in docs/implementation-brief.md as found-but-unconfirmed and is
 * still not used here; a later brief for this page's own premium rework
 * separately listed nine more names (Dr Bharathy Kandasamy, Dr Deepika
 * Sivathanu, Dr Amudha Varshini, Dr Adithi Nair, Sheethal Sathya, Deepa,
 * Rakshitha, Coach Tilak, Sherene) as "known team context" while
 * explicitly deferring to this file as the source of truth — none of
 * those are used here either, for the same reason. Replace every entry
 * once the real roster is approved; the shape (DoctorContent) is what
 * doctor-profile-template.tsx and the /doctors page's own components
 * expect.
 */

export interface DoctorContent {
  slug: string;
  /** TODO(content): real name pending confirmation — do not invent. */
  name: string;
  /** TODO(content): real credentials pending confirmation — do not invent. */
  credentials: string;
  role: string;
  /** TODO(content): approved biography pending. No invented history or claims. */
  bio: string;
  /** A short (1 sentence) care-philosophy line for the /doctors listing's
   * own editorial scene — distinct from `bio` (the fuller /doctors/[slug]
   * biography). Optional: omitted rather than invented for an entry that
   * doesn't have one yet. */
  philosophy?: string;
  /** 2–4 short care-area labels for the /doctors listing's own scene.
   * Optional and deliberately NOT populated for the one placeholder entry
   * below — real specialties aren't known yet, and the brief is explicit:
   * "if a field is unavailable, omit it," not invent a plausible-looking
   * one. The listing's own component hides this block entirely when absent. */
  careAreas?: string[];
  photo: {
    alt: string;
  };
}

export const doctors: DoctorContent[] = [
  {
    slug: "doctor-name-placeholder",
    name: "Doctor Name Placeholder",
    credentials: "Credentials placeholder, approved details pending",
    role: "Role placeholder",
    bio: "A placeholder biography paragraph belongs here: approved copy pending. Do not present as a real person's real credentials or history.",
    photo: { alt: "Placeholder, approved photography pending" },
  },
];

export function getDoctorBySlug(slug: string): DoctorContent | undefined {
  return doctors.find((doctor) => doctor.slug === slug);
}

/**
 * /doctors page content (premium visual architecture rework). Editorial
 * copy below is drafted in-house from that rework's own suggested
 * direction — same status as the About page's own drafted copy before its
 * approval pass: not fabricated fact, not yet signed off. Nothing here
 * asserts a specific person's identity, credential, specialty match, or
 * clinical claim.
 */

export const doctorsHero = {
  eyebrow: "Our Care Team",
  headlineLines: ["Care shaped by the right people,", "at the right stage."],
  supporting:
    "BirthWave brings together specialists across women's health, pregnancy, birth, recovery and newborn care so that support continues across the full journey.",
  primaryCta: {
    label: "Book a Consultation",
    href: "/#connect",
    todo: "Placeholder destination — no booking flow exists yet (see site-content.ts's own finalCta/hero TODOs).",
  },
  secondaryCta: {
    label: "Explore the Team",
    href: "#doctors-journey",
  },
  media: {
    // TODO(content): approved team/editorial portrait pending — see this
    // file's own header comment. Built visual placeholder only.
    alt: "Care team portrait — approved photography pending",
  },
} as const;

/** The short, deliberate hold between the Hero and the pinned horizontal
 * track (Section 02's own "SECTION START" requirement) — plain document
 * flow, no motion, so the horizontal journey never starts abruptly. */
export const doctorsJourneyIntro = {
  eyebrow: "The Team",
  heading: "Meet the people behind the care.",
} as const;

/**
 * "Who should you consult?" — wayfinding by care concern, not a second
 * doctor grid and not a diagnosis: each line names a *kind* of
 * conversation or specialist, never a specific claim about what's wrong
 * or what to do about it. Concerns are the same care-area language
 * `about-content.ts`'s own `aboutProblem.stages` and the homepage's
 * `journey.stages` already use — not new categories invented for this
 * page — since no named, specialty-tagged doctors exist yet to route to
 * more specifically (`doctors-content.ts`'s own single entry has no real
 * `role`/`careAreas` to match against).
 */
export const whoShouldYouConsult = {
  eyebrow: "Where To Start",
  heading: "Not sure who to see first?",
  intro:
    "Every concern below points toward the kind of conversation to start with — not a diagnosis, just a place to begin.",
  concerns: [
    { question: "Planning a pregnancy?", guidance: "Start with a preconception and fertility conversation." },
    { question: "Already pregnant?", guidance: "Ongoing antenatal care with a pregnancy-focused obstetrician." },
    { question: "Preparing for birth?", guidance: "Birth planning support, including natural birth and VBAC." },
    { question: "A gynaecological concern?", guidance: "General gynaecology and women's health." },
    { question: "Pelvic pain or discomfort?", guidance: "Pelvic health support." },
    { question: "Finding breastfeeding hard?", guidance: "Lactation guidance." },
    { question: "Recovering after birth?", guidance: "Postpartum recovery care." },
    { question: "Caring for a newborn?", guidance: "Newborn and paediatric care." },
  ],
  cta: {
    label: "Meet our doctors & care team",
    href: "#doctors-journey",
  },
} as const;

/**
 * "Multidisciplinary care" — the same "one continuous journey of care"
 * principle the homepage's Philosophy/Journey sections and the About
 * page's own Belief beat already carry, expressed here as a connected
 * chain of care areas rather than either of those sections' own
 * treatments (no video, no pin, no cinematic canvas) — a plain, static,
 * restrained visual flow specific to this page.
 */
export const multidisciplinaryCare = {
  eyebrow: "How The Team Works Together",
  heading: "One patient journey. Multiple specialists. Connected care.",
  intro:
    "No specialist works in isolation. The same thread of care carries a woman from one stage to the next, across the whole team.",
  stages: [
    "Gynaecology",
    "Pregnancy",
    "Birth Preparation",
    "Pelvic Health",
    "Lactation",
    "Paediatrics",
    "Emotional Wellbeing",
  ],
} as const;

/** Simpler than the homepage's own Final CTA and About's own Appointment
 * CTA by design — this page's own warm close, not a third copy of either.
 * Resolves to the same underlying appointment destination as the rest of
 * the site (`/#connect`) since no separate booking flow or verified
 * WhatsApp number exists yet — see site-content.ts's own `finalCta` TODOs,
 * which this mirrors rather than inventing a new placeholder destination. */
export const doctorsAppointmentCta = {
  headingLines: ["Not sure who to book with?", "Start with a conversation."],
  supporting:
    "Tell us where you are in your journey and we'll help you find the right place to begin.",
  primaryCta: {
    label: "Book an Appointment",
    href: "/#connect",
    todo: "Placeholder destination — no booking flow exists yet (see site-content.ts's own finalCta TODO).",
  },
  secondaryCta: {
    label: "WhatsApp Us",
    href: "/#connect",
    todo: "No verified WhatsApp number exists for this project — mirrors site-content.ts's own finalCta.secondaryCta, which resolves to the same closing anchor rather than a fabricated wa.me link.",
  },
} as const;

/**
 * The horizontal journey's own closing enquiry form (premium horizontal
 * parallax rework). `concernOptions` deliberately reuses
 * `whoShouldYouConsult.concerns`' own question text rather than inventing a
 * second, different set of categories — one real list of care concerns,
 * used in two places.
 *
 * TODO(infra): this form is fully interactive — controlled fields, focus
 * order, keyboard submission, inline validation — but no backend endpoint
 * or verified inbox exists yet to actually receive a submission (see this
 * file's own header comment and site-content.ts's finalCta TODOs on why no
 * booking/contact infrastructure exists). Submitting shows a local
 * confirmation state only; it does not send data anywhere. Wire this to a
 * real endpoint once one exists — do not fabricate a submission
 * destination (an email address, an API route) meanwhile.
 */
export const doctorsEnquiryForm = {
  eyebrow: "Get In Touch",
  headingLines: ["Still deciding who to see?", "Send us a few details."],
  supporting:
    "Share a little about where you are, and the right person on our team will follow up with next steps.",
  fields: {
    name: "Full name",
    contact: "Email or phone number",
    concern: "What would you like help with?",
    message: "Anything else we should know?",
  },
  concernPlaceholder: "Select a starting point",
  submitLabel: "Send Enquiry",
  submittingLabel: "Sending…",
  confirmation: {
    heading: "Thank you.",
    body: "We've received your details and will be in touch shortly.",
  },
} as const;
