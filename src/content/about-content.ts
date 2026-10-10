/**
 * About page content — The Birth Wave
 *
 * Copy approved and provided verbatim for each section below. Founder name,
 * credentials and attributed quotes are included per the brief but marked
 * with approval notes — see individual TODOs.
 */

/**
 * Sections 01–04 — the cinematic scroll-video sequence.
 * `id` doubles as the DOM anchor and the ScrollTrigger/beat key.
 */
export const aboutCinematicSequence = [
  { id: "about-hero", label: "Hero" },
  { id: "about-problem", label: "Why BirthWave" },
  { id: "about-belief", label: "Our Approach" },
  { id: "about-founder-intro", label: "The Founder" },
] as const;

/**
 * The one cinematic video backing all four beats above — a single ~30s
 * clip whose four visual chapters line up with the four beats below.
 */
export const aboutCinematicVideo = {
  // Re-encoded for scroll-scrubbing (keyframe every second / ~24 frames).
  src: "/brand/video/about-cinematic-30s-seekopt.mp4",
} as const;

// ── Beat 01 — Hero ──────────────────────────────────────────────────────────

export const aboutHero = {
  eyebrow: "About The Birthwave",
  headlineLines: ["Every stage of care", "is connected."],
  supporting:
    "Fertility. Pregnancy. Birth. Recovery. Newborn care.\nThe Birthwave brings these stages together, so your care can continue as your needs change.",
  media: {
    posterSrc: "/brand/about/about-hero-poster.jpg",
    alt: "A woman sitting by a window in soft daylight, the opening moment of The Birthwave's cinematic story.",
  },
} as const;

// ── Beat 02 — Why BirthWave ─────────────────────────────────────────────────

export const aboutProblem = {
  eyebrow: "Why The Birthwave",
  heading: "Your care shouldn't have to start over at every stage.",
  body: "A woman's needs can change from planning a pregnancy to pregnancy, birth and recovery. The Birthwave was created to make those transitions feel more connected — with care that understands where you've been and what you may need next.",
  stages: ["Fertility", "Pregnancy", "Birth", "Recovery", "Newborn Care"],
  media: {
    posterSrc: "/brand/about/about-problem-poster.jpg",
    alt: "A woman standing at a doorway between two rooms, a visual metaphor for moving between disconnected stages of care.",
  },
} as const;

// ── Beat 03 — Our Approach ──────────────────────────────────────────────────

export const aboutBelief = {
  eyebrow: "Our Approach",
  // Large uppercase typography — kept exactly as designed per the brief.
  heading: "One continuous journey of care.",
  body: "Your health story doesn't begin again every time your needs change. The Birthwave brings women's health, fertility, pregnancy, birth preparation, childbirth, recovery and newborn care into a more connected experience — with care that continues from one stage to the next.",
  media: {
    posterSrc: "/brand/about/about-belief-poster.jpg",
    alt: "Two women in a warm consultation room, a moment of connection.",
  },
} as const;

// ── Beat 04 — Founder Introduction ─────────────────────────────────────────

export const aboutFounderIntro = {
  eyebrow: "The Founder",
  introLabel: "Our Founder",
  // The name and credentials below are used per the brand guide.
  // Full founder narrative is in aboutFounderStory below.
  founderName: "Dr. Santoshi Nandigam",
  founderCredentials: "Obstetrician & Gynaecologist",
  story:
    "The Birthwave was founded by Dr. Santoshi Nandigam, Obstetrician & Gynaecologist, with a vision to make women's care feel more connected, informed and personal.",
  // TODO(approval): attributed first-person quote — requires Dr. Santoshi's
  // approval before publishing verbatim. If she prefers no attributed quote,
  // remove the quotation marks rather than invent alternative words.
  quote:
    "I wanted women to feel heard, informed and supported — not just during one appointment, but through the journey.",
  media: {
    posterSrc: "/brand/about/about-founder-poster.jpg",
    alt: "Founder portrait — approved photography pending",
  },
} as const;

/**
 * Architectural boundary: everything above is Sections 01–04 (cinematic
 * canvas). Everything below is normal, always-static editorial content.
 */

// ── Section 05 — Founder Story ─────────────────────────────────────────────

export const aboutFounderStory = {
  eyebrow: "The Founder",
  heading: "The story behind The BirthWave.",
  body: [
    "Dr. Santoshi Nandigam founded The Birthwave around a simple belief: women's healthcare should feel connected to the person and the journey, not limited to a single appointment or stage.",
    "From planning a pregnancy and antenatal care to preparing for birth, recovery and the early days with a baby, each stage brings different questions and needs. The Birthwave was created to bring these conversations closer together, with care that listens, explains and adapts as a woman's needs change.",
  ],
  // TODO(approval): attributed quote — requires Dr. Santoshi's approval
  // before publishing verbatim. The surrounding narrative can be used as
  // institutional website copy after BirthWave verifies it accurately
  // reflects her founding rationale.
  quote:
    "For me, good care begins with listening — understanding the woman, explaining her options clearly and helping her feel part of every decision.",
  media: {
    src: "/images/clinic/dr-santoshi.JPG",
    alt: "Dr. Santoshi Nandigam, founder of BirthWave",
  },
  cta: {
    label: "Meet Our Doctors",
    href: "/doctors",
  },
} as const;

// ── Section 06 — How We Care ───────────────────────────────────────────────

export const aboutHowWeCare = {
  eyebrow: "How We Care",
  heading: "What connected care looks like.",
  intro:
    "Good care is not only about what happens during one consultation. It's also about how clearly you're understood, how decisions are explained and how one stage of care connects with the next.",
  // Distinct from `care.principles` in site-content.ts (homepage Care section)
  // — four rows with a plain divided-grid treatment (see about-how-we-care.tsx).
  principles: [
    {
      index: "01",
      label: "Continuity, not restarts",
      statement:
        "Your health history and previous care remain part of the conversation as your needs change.",
    },
    {
      index: "02",
      label: "The right care, brought together",
      statement:
        "When different areas of care are needed, the aim is to keep them connected around you rather than making each feel like a separate journey.",
    },
    {
      index: "03",
      label: "Explained, not assumed",
      statement:
        "We explain what we're considering, why it may be recommended and what it means for you — so you can ask questions and understand your options.",
    },
    {
      index: "04",
      label: "Informed, never pressured",
      statement:
        "Your preferences matter. We help you understand your options while keeping recommendations grounded in your individual health and clinical needs.",
    },
  ],
} as const;

// ── Section 07 — The People ────────────────────────────────────────────────

export const aboutTeamPreview = {
  eyebrow: "The People",
  heading: "A few of the people you'll meet.",
  // Renders directly from doctors-content.ts — no second copy of the roster.
  note: "The Birthwave's care is supported by doctors across women's health, pregnancy, fertility and paediatrics. Meet the team, understand their areas of care and find the doctor relevant to your needs.",
} as const;

// ── Section 08 — Doctors CTA (folded into team preview) ───────────────────

export const aboutDoctorsCta = {
  heading: "Meet the people behind your care.",
  supporting:
    "Explore our doctors, their areas of practice and the care they provide at BirthWave.",
  cta: {
    label: "Meet Our Doctors & Care Team",
    href: "/doctors",
  },
} as const;

// ── Section 09 — Final CTA ─────────────────────────────────────────────────

/**
 * Simpler than the homepage's Final CTA by design — an internal page's
 * closing invitation, not a second copy of the homepage's own close.
 */
export const aboutAppointmentCta = {
  heading: "Ready when you are.",
  supporting:
    "Whether you're planning ahead, looking for women's healthcare, already pregnant or finding your way through life after birth, start with a conversation.",
  primaryCta: {
    label: "Book a Consultation",
    href: "/#connect",
    todo: "Placeholder destination — no booking flow exists yet (see site-content.ts's own finalCta/hero TODOs).",
  },
} as const;
