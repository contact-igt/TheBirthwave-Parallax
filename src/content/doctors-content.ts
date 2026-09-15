/**
 * Doctors / team content — The Birth Wave
 *
 * Doctor data + image placeholder grid pass: the confirmed team roster
 * (10 people — one founder, four Medical & Clinical Team, five Allied
 * Care Team). Real photography does not exist yet for any of them — every
 * `photo.src` below is `null`; `PortraitPlaceholder`
 * (components/ui/portrait-placeholder.tsx) renders the same built visual
 * placeholder everywhere a person's portrait belongs. Replacing a single
 * entry's `src: null` with a real path is the only change needed once
 * approved photography exists — nothing else in this file or its
 * consumers changes shape.
 *
 * Names, qualifications, roles and related-care mappings below are given,
 * confirmed team content — not invented. Fields the brief did not confirm
 * for a given person (a biography, a qualification, a related-care
 * mapping) are simply left unset rather than filled with a plausible-
 * looking guess; every consumer of this file treats each of those fields
 * as optional and omits the corresponding UI when absent, per "if content
 * is missing, omit the section" rather than showing filler copy.
 */

export type TeamCategory = "founder" | "medical" | "allied";

export interface DoctorContent {
  slug: string;
  name: string;
  /** "Qualification" in the brief's own language — kept as the existing
   * field name rather than adding a parallel one. Optional: not every
   * confirmed team member has a qualification on record (Dr Adithi Nair,
   * Rakshitha, Coach Tilak) — omitted, never invented. */
  credentials?: string;
  role: string;
  /** A secondary descriptor beyond the main role — the Founder's own
   * "Special focus" and Sheethal Sathya's own "Additional" line are the
   * same kind of field (one more specific specialty/credential sitting
   * just under the primary role), so this single optional field covers
   * both rather than introducing two near-identical ones. */
  specialFocus?: string;
  /** Confirmed profile copy for `/doctors/[slug]`'s own longer read —
   * only the Founder has approved copy today. Optional; omitted (not
   * "information coming soon") everywhere else. */
  bio?: string;
  /** A short (1 sentence) care-philosophy line for the horizontal
   * journey's own editorial scene — distinct from `bio`. Unset for every
   * entry below (none confirmed); left in the type since
   * doctors-journey-scenes.tsx already renders it when present. */
  philosophy?: string;
  /** 2–4 short care-area labels for the journey scene / grid card —
   * populated only from this file's own confirmed `relatedCareSlugs`
   * (the matching service names), never invented independently of that
   * mapping. */
  careAreas?: string[];
  /** Confirmed Related Care mappings — real slugs from
   * services-content.ts's own `services` array, resolved to that
   * service's real name/href at render time (never duplicated here as a
   * separate label). Left unset for team members with no confirmed
   * mapping (the Founder, Rakshitha, Coach Tilak) — never guessed. */
  relatedCareSlugs?: string[];
  photo: {
    /** `null` until real photography is approved — swapping this one
     * value for a real path is the only change needed; every consumer
     * already renders a placeholder whenever this is `null`. */
    src: string | null;
    /** Full accessible description, used as the placeholder's own
     * `aria-label` today and ready to become a real `<img alt>` the
     * moment `src` is set. */
    alt: string;
    /** The short, generic label actually visible on the placeholder
     * itself (see `PortraitPlaceholder`'s own comment on why this is
     * deliberately not the person's name a second time). */
    placeholderLabel: string;
  };
  /** Which of the three page groupings this person belongs to — the
   * Featured Founder section, the Medical & Clinical Team grid, or the
   * Allied Care Team grid. Also what `doctorsJourneyRoster` below filters
   * on to build the horizontal journey's own shorter roster. */
  team: TeamCategory;
}

function photoFor(name: string): DoctorContent["photo"] {
  return {
    src: null,
    alt: `${name} — approved photography pending`,
    placeholderLabel: "Doctor portrait",
  };
}

/** The confirmed 10-person roster, in page order (Founder, then Medical &
 * Clinical Team, then Allied Care Team) — the single source of truth for
 * routing (`generateStaticParams`), the Founder section, both team grids,
 * and (via `doctorsJourneyRoster` below) the horizontal journey. */
export const doctors: DoctorContent[] = [
  {
    slug: "dr-santoshi-nandigam",
    name: "Dr. Santoshi Nandigam",
    credentials: "MBBS, DNB – Obstetrics & Gynaecology",
    role: "Founder · Obstetrician & Gynaecologist",
    specialFocus: "Natural Birth & VBAC Specialist · Holistic Fertility Coach",
    bio: "The BirthWave is designed as one continuous care journey, with space for questions, preferences, preparation and follow-up — across pregnancy, birth and recovery.",
    photo: photoFor("Dr. Santoshi Nandigam"),
    team: "founder",
  },
  {
    slug: "dr-bharathy-kandasamy",
    name: "Dr. Bharathy Kandasamy",
    credentials: "MBBS, Fellowship in Reproductive Medicine and Laparoscopy",
    role: "Gynaecologist · Laparoscopic Surgeon · Advanced Fertility Specialist",
    relatedCareSlugs: ["fertility-preconception", "gynaecology"],
    careAreas: ["Fertility & Preconception", "Gynaecology & Women's Wellness"],
    photo: photoFor("Dr. Bharathy Kandasamy"),
    team: "medical",
  },
  {
    slug: "dr-deepika-sivathanu",
    name: "Dr. Deepika Sivathanu",
    credentials: "MBBS, MD – Pediatrics",
    role: "Paediatrician",
    relatedCareSlugs: ["newborn-pediatric-care"],
    careAreas: ["Newborn & Pediatric Care"],
    photo: photoFor("Dr. Deepika Sivathanu"),
    team: "medical",
  },
  {
    slug: "dr-amudha-varshini",
    name: "Dr. Amudha Varshini",
    credentials: "BNYS",
    role: "Naturopathy & Yoga · Prenatal & Postpartum Yoga Specialist",
    relatedCareSlugs: ["pregnancy-antenatal-care", "birth-preparation", "postpartum-care"],
    careAreas: ["Pregnancy & Antenatal Care", "Birth Preparation", "Postpartum Recovery"],
    photo: photoFor("Dr. Amudha Varshini"),
    team: "medical",
  },
  {
    slug: "dr-adithi-nair",
    name: "Dr. Adithi Nair",
    // No qualification provided — not invented, per the brief.
    role: "Pelvic Floor Therapy · Vaginismus Coach",
    relatedCareSlugs: ["vaginismus", "postpartum-care"],
    careAreas: ["Vaginismus & Intimate Wellness", "Postpartum Recovery"],
    photo: photoFor("Dr. Adithi Nair"),
    team: "medical",
  },
  {
    slug: "sheethal-sathya",
    name: "Sheethal Sathya",
    role: "DONA-certified Birth Doula, Lactation Counsellor",
    specialFocus: "Childbirth Educator · Lactation Consultant",
    relatedCareSlugs: ["birth-preparation", "lactation", "pregnancy-antenatal-care"],
    careAreas: ["Birth Preparation", "Lactation", "Pregnancy & Antenatal Care"],
    photo: photoFor("Sheethal Sathya"),
    team: "allied",
  },
  {
    slug: "deepa",
    name: "Deepa",
    credentials: "M.Sc Psychology",
    role: "Emotional Well-being Support",
    relatedCareSlugs: ["nutrition-emotional-wellbeing"],
    careAreas: ["Nutrition & Emotional Well-being"],
    photo: photoFor("Deepa"),
    team: "allied",
  },
  {
    slug: "rakshitha",
    name: "Rakshitha",
    role: "School Psychology",
    photo: photoFor("Rakshitha"),
    team: "allied",
  },
  {
    slug: "coach-tilak",
    name: "Coach Tilak",
    role: "Strength & Conditioning",
    photo: photoFor("Coach Tilak"),
    team: "allied",
  },
  {
    slug: "sherene",
    name: "Sherene",
    role: "Nutritionist",
    relatedCareSlugs: ["nutrition-emotional-wellbeing"],
    careAreas: ["Nutrition & Emotional Well-being"],
    photo: photoFor("Sherene"),
    team: "allied",
  },
];

export function getDoctorBySlug(slug: string): DoctorContent | undefined {
  return doctors.find((doctor) => doctor.slug === slug);
}

/** The horizontal journey's own shorter roster — Founder + the four
 * Medical & Clinical Team members, per the brief's own "the horizontal
 * journey does NOT need to include all 10... Preferred: Founder +
 * Medical & Clinical Team highlights." A filter over `doctors`, not a
 * second data source: the Allied Care Team never appears as a
 * horizontal-journey panel, only in its own grid below (and its own
 * individual profile pages, which exist regardless of journey
 * inclusion). Both `doctors-master-journey.tsx`'s desktop track and its
 * own vertical/reduced-motion fallback read this same array, so the two
 * paths always agree on which 5 people the journey itself covers. */
export const doctorsJourneyRoster: DoctorContent[] = doctors.filter(
  (doctor) => doctor.team === "founder" || doctor.team === "medical",
);

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
    href: "#team-directory",
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
 * page.
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
    href: "#team-directory",
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

export const founderSectionContent = {
  eyebrow: "Founder",
  cta: { label: "Book an Appointment", href: "/#connect" },
} as const;

export const medicalTeamGridContent = {
  eyebrow: "The Team",
  heading: "Medical & Clinical Team",
} as const;

export const alliedTeamGridContent = {
  eyebrow: "The Team",
  heading: "Allied Care Team",
} as const;
