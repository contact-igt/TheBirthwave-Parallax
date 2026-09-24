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
   * "information coming soon") everywhere else. Read by
   * `doctor-profile-template.tsx` (the full `/doctors/[slug]` page,
   * unchanged by this pass) — `description` below is the separate field
   * the LISTING contexts (team rows, journey scenes) read instead, since
   * those two contexts have different "if missing" contracts (see
   * `description`'s own comment). */
  bio?: string;
  /** Doctor-profile visual-redesign pass: the listing-context read for
   * the same kind of short biography copy `bio` carries for the full
   * profile page — but with a DIFFERENT "if missing" contract, by design.
   * `bio` above is simply omitted when absent (per this file's own
   * header comment); `description` is explicitly typed nullable
   * (`string | null`, not just optional) so `DoctorProfileContent` can
   * tell "no confirmed copy yet" apart from "field not filled in" and
   * render an honest, professionally-styled placeholder in a team-row/
   * journey-scene card instead of an empty gap. Only the Founder has
   * confirmed copy today — her value below is the exact same approved
   * sentence `bio` already carries, not new copy. Never invent one for
   * anybody else: leave `null` until the real thing is approved. */
  description: string | null;
  /** A short editorial quote/philosophy line, distinct from `description`
   * — optional AND nullable, but unlike `description` this one is simply
   * NOT RENDERED at all when absent (no placeholder), since a fabricated
   * "quote coming soon" would read strangely quoted. No one has a
   * confirmed quote today — left unset (not `null`) everywhere below;
   * never invent one. */
  quote?: string | null;
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
  /** Optional per-photo focal point (a CSS `object-position` value, e.g.
   * `"50% 25%"`) — threaded through to `PortraitPlaceholder`'s own
   * `<Image>`. Unset for every entry below (`object-cover`'s own default
   * center crop hasn't shown a real problem for any of these photos);
   * exists so a future crop issue can be fixed by adding one value here,
   * the same "confirmed via screenshot, not guessed" spirit the
   * services-imagery `focalPoint` overrides elsewhere on this site
   * already follow. */
  photoPosition?: string;
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
    bio: "The Birthwave is designed as one continuous care journey, with space for questions, preferences, preparation and follow-up — across pregnancy, birth and recovery.",
    // Same approved sentence `bio` above carries — not new copy. See
    // `description`'s own comment on the interface for why the listing
    // context reads this separate field.
    description:
      "The Birthwave is designed as one continuous care journey, with space for questions, preferences, preparation and follow-up — across pregnancy, birth and recovery.",
    photo: {
      src: "/images/clinic/dr-santoshi.JPG",
      alt: "Dr. Santoshi Nandigam",
      placeholderLabel: "Dr. Santoshi Nandigam",
    },

    team: "founder",
  },
  {
    slug: "dr-bharathy-kandasamy",
    name: "Dr. Bharathy Kandasamy",
    credentials: "MBBS, Fellowship in Reproductive Medicine and Laparoscopy",
    role: "Gynaecologist · Laparoscopic Surgeon · Advanced Fertility Specialist",
    relatedCareSlugs: ["fertility-preconception", "gynaecology"],
    careAreas: ["Fertility & Preconception", "Gynaecology & Women's Wellness"],
    description: null,
    photo: {
      src: "/images/clinic/dr-bharathy.jpeg",
      alt: "Dr. Bharathy Kandasamy",
      placeholderLabel: "Dr. Bharathy Kandasamy",
    },
    team: "medical",
  },
  {
    slug: "dr-deepika-sivathanu",
    name: "Dr. Deepika Sivathanu",
    credentials: "MBBS, MD – Pediatrics",
    role: "Paediatrician",
    relatedCareSlugs: ["newborn-pediatric-care"],
    careAreas: ["Newborn & Pediatric Care"],
    description: null,
    photo: {
      src: "/images/clinic/dr-deepika.PNG",
      alt: "Dr. Deepika Sivathanu",
      placeholderLabel: "Dr. Deepika Sivathanu",
    },
    team: "medical",
  },
  {
    slug: "dr-amudha-varshini",
    name: "Dr. Amudha Varshini",
    credentials: "BNYS",
    role: "Naturopathy & Yoga · Prenatal & Postpartum Yoga Specialist",
    relatedCareSlugs: ["pregnancy-antenatal-care", "birth-preparation", "postpartum-care"],
    careAreas: ["Pregnancy & Antenatal Care", "Birth Preparation", "Postpartum Recovery"],
    description: null,
    photo: {
      src: "/images/clinic/Dr._Amudha_Varshini.JPG",
      alt: "Dr. Amudha Varshini",
      placeholderLabel: "Dr. Amudha Varshini",
    },
    team: "medical",
  },
  {
    slug: "dr-adithi-nair",
    name: "Dr. Adithi Nair",
    // No qualification provided — not invented, per the brief.
    role: "Pelvic Floor Therapy · Vaginismus Coach",
    relatedCareSlugs: ["vaginismus", "postpartum-care"],
    careAreas: ["Vaginismus & Intimate Wellness", "Postpartum Recovery"],
    description: null,
    photo: {
      src: "/images/clinic/Dr_Adithi_Nair.jpg",
      alt: "Dr. Adithi Nair",
      placeholderLabel: "Dr. Adithi Nair",
    },
    team: "medical",
  },
  {
    slug: "sheethal-sathya",
    name: "Sheethal Sathya",
    role: "DONA-certified Birth Doula, Lactation Counsellor",
    specialFocus: "Childbirth Educator · Lactation Consultant",
    relatedCareSlugs: ["birth-preparation", "lactation", "pregnancy-antenatal-care"],
    careAreas: ["Birth Preparation", "Lactation", "Pregnancy & Antenatal Care"],
    description: null,
    photo: {
      src: "/images/clinic/sheethal-sathya.png",
      alt: "Dr. Sheethal Sathya",
      placeholderLabel: "Dr. Sheethal Sathya",
    },
    team: "allied",
  },
  {
    slug: "deepa",
    name: "Deepa",
    credentials: "M.Sc Psychology",
    role: "Emotional Well-being Support",
    relatedCareSlugs: ["nutrition-emotional-wellbeing"],
    careAreas: ["Nutrition & Emotional Well-being"],
    description: null,
    photo: {
      src: "/images/clinic/deepa.jpeg",
      alt: "Dr. Deepa",
      placeholderLabel: "Dr. Deepa",
    },
    team: "allied",
  },
  {
    slug: "rakshitha",
    name: "Rakshitha",
    role: "School Psychology",
    description: null,
    photo: {
      src: "/images/clinic/dr-rakshitha.jpeg",
      alt: "Dr. Rakshitha",
      placeholderLabel: "Dr. Rakshitha",
    },
    team: "allied",
  },
  {
    slug: "coach-tilak",
    name: "Coach Tilak",
    role: "Strength & Conditioning",
    description: null,
    photo: {
      src: "/images/clinic/coach_tilak.JPG",
      alt: "Dr. Coach-tilak",
      placeholderLabel: "Dr. Coach-tilak",
    },
    team: "allied",
  },
  {
    slug: "sherene",
    name: "Sherene",
    role: "Nutritionist",
    relatedCareSlugs: ["nutrition-emotional-wellbeing"],
    careAreas: ["Nutrition & Emotional Well-being"],
    description: null,
    photo: {
      src: "/images/clinic/dr-sherene.jpeg",
      alt: "Dr. Sherene",
      placeholderLabel: "Dr. Sherene",
    },
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
    "The Birthwave brings together specialists across women's health, pregnancy, birth, recovery and newborn care so that support continues across the full journey.",
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
 * "Who should you consult?" — a SHORT decision helper (lower-page
 * refinement), not a second doctor grid and not a diagnosis: five
 * high-value life-stage questions, each resolving to a real confirmed
 * `/services/[slug]` route via `answers` — not a duplicate of the
 * Services page's own "Find the right care" (that section covers all 11
 * services; this one stays intentionally short). Concern-specific
 * wayfinding (a gynaecological concern, pelvic pain) now lives in
 * `whoCanSupportYourCare` below instead, routed to the actual clinician
 * rather than a service link, so the two sections no longer overlap.
 *
 * `guidance` and `cta` are kept (not just decorative — read by the
 * pre-existing, out-of-scope horizontal-journey fallback in
 * doctors-journey-scenes.tsx, untouched by this pass); the live page's
 * own `WhoShouldYouConsult` component renders `answers` instead and omits
 * the bottom `cta` (redundant on a page the visitor already scrolled the
 * team on).
 */
export const whoShouldYouConsult = {
  eyebrow: "Where To Start",
  heading: "Not sure who to see first?",
  intro:
    "Every concern below points toward the kind of conversation to start with — not a diagnosis, just a place to begin.",
  concerns: [
    {
      question: "Planning a pregnancy?",
      guidance: "Start with a preconception and fertility conversation.",
      answers: [{ label: "Fertility & Preconception", slug: "fertility-preconception" }],
    },
    {
      question: "Already pregnant?",
      guidance: "Ongoing antenatal care with a pregnancy-focused obstetrician.",
      answers: [{ label: "Pregnancy & Antenatal Care", slug: "pregnancy-antenatal-care" }],
    },
    {
      question: "Preparing for birth?",
      guidance: "Birth planning support, including natural birth and VBAC.",
      answers: [{ label: "Birth Preparation & Childbirth Education", slug: "birth-preparation" }],
    },
    {
      question: "Recovering after birth?",
      guidance: "Postpartum recovery care.",
      answers: [{ label: "Postpartum Recovery & Care", slug: "postpartum-care" }],
    },
    {
      question: "Need feeding or newborn support?",
      guidance: "Lactation guidance and newborn or paediatric care.",
      answers: [
        { label: "Lactation & Breastfeeding Support", slug: "lactation" },
        { label: "Newborn & Pediatric Care", slug: "newborn-pediatric-care" },
      ],
    },
  ],
  cta: {
    label: "Meet our doctors & care team",
    href: "#team-directory",
  },
} as const;

/**
 * "Who can support this part of your care?" — lower-page refinement,
 * Section 01. Specialty-to-clinician wayfinding, not a second "View
 * Profile" grid: the visitor is already on this page, so each group
 * routes to the relevant SERVICE (a confirmed `/services/[slug]` route,
 * resolved at render time from `services-content.ts`) rather than back to
 * a doctor's own profile page. `slugs` reference `doctors`' own real
 * `slug` field above — resolved at render time (name/role/photo never
 * duplicated here) — and every group below matches that roster's own
 * confirmed `relatedCareSlugs`/role, nothing invented. The Founder has no
 * confirmed `relatedCareSlugs` (see `doctors` above), so her group
 * carries no `careSlugs` here either — the component falls back to a
 * generic "Book a Consultation" link rather than guessing one. The last
 * group (three people) is intentionally left without a per-person care
 * link — with three professionals under one heading, a link per person
 * added clutter without adding clarity.
 */
export const whoCanSupportYourCare = {
  eyebrow: "Care By Specialty",
  heading: "Who can support this part of your care?",
  intro:
    "Different needs. Different people to support you. The Birthwave brings medical and allied-care professionals together across women's health, pregnancy, birth, recovery and newborn care.",
  groups: [
    { label: "Pregnancy, Birth & VBAC", slugs: ["dr-santoshi-nandigam"] },
    { label: "Gynaecology & Fertility", slugs: ["dr-bharathy-kandasamy"] },
    { label: "Newborn & Pediatric Care", slugs: ["dr-deepika-sivathanu"] },
    { label: "Prenatal & Postpartum Yoga / Naturopathy", slugs: ["dr-amudha-varshini"] },
    { label: "Pelvic Floor & Vaginismus Support", slugs: ["dr-adithi-nair"] },
    { label: "Lactation / Emotional Well-being / Nutrition", slugs: ["sheethal-sathya", "deepa", "sherene"] },
  ],
} as const;

/** `whoCanSupportYourCare.groups` resolved against the real `doctors`
 * roster above — the group data only ever stores a `slug`, never a
 * duplicated name/role/photo, so this can't drift out of sync with the
 * roster the way a hand-copied name could. Throws at module load if a
 * slug doesn't match, the same fail-fast pattern services-content.ts's
 * own `buildChapter` uses for its comparable slug lookup. */
export interface WhoCanSupportGroup {
  label: string;
  members: DoctorContent[];
}

export const whoCanSupportGroups: WhoCanSupportGroup[] = whoCanSupportYourCare.groups.map((group) => {
  const members = group.slugs.map((slug) => {
    const doctor = doctors.find((d) => d.slug === slug);
    if (!doctor) throw new Error(`doctors-content.ts: whoCanSupportYourCare references unknown slug "${slug}"`);
    return doctor;
  });
  return { label: group.label, members };
});

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
  eyebrow: "Start With A Conversation",
  headingLines: ["You don't need to know exactly", "who you need before reaching out."],
  supporting:
    "Tell The Birthwave team what you would like help with, and they can guide you toward the appropriate care pathway.",
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
