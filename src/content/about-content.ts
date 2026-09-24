/**
 * About page content — The Birth Wave
 *
 * Phase 1 (structure + architecture only — see docs/implementation-brief.md
 * for the homepage's own approval history and the same discipline applied
 * here). Editorial copy below (the problem, the belief, how we care, the
 * doctors/appointment CTAs) is drafted in-house, in BirthWave's established
 * voice, from the brief's own narrative direction — same status as the
 * homepage copy before its own approval pass, not yet signed off.
 *
 * What is NOT drafted, on principle, is anything that asserts a real
 * person's identity: the founder's name, credentials, personal history and
 * quote are structural placeholders only, exactly like every doctor entry
 * in doctors-content.ts — the brand guide's business-card mockup names a
 * "Dr Santoshi Nandigam," but that was flagged in docs/implementation-
 * brief.md §2 as found-but-unconfirmed and is not used here or anywhere on
 * this page. Section 07's team preview renders directly from
 * doctors-content.ts's own (currently one-entry) roster rather than
 * inventing the 3–5 people the brief describes as a possibility — get the
 * real roster approved there first; this file adds no second copy of it.
 */

/**
 * Sections 01–04 — the future cinematic scroll-video sequence (Phase 2).
 * `id` doubles as the DOM anchor and the future ScrollTrigger/beat key;
 * kept as one ordered list so later motion work can iterate it instead of
 * hard-coding four bespoke triggers, without this file needing to change.
 * Each section still keeps its own richly-shaped content below — this
 * array is only the sequencing metadata.
 */
export const aboutCinematicSequence = [
  { id: "about-hero", label: "Hero" },
  { id: "about-problem", label: "The Problem" },
  { id: "about-belief", label: "The Belief" },
  { id: "about-founder-intro", label: "Founder Introduction" },
] as const;

/**
 * The one cinematic video backing all four beats above (Phase 4) — a
 * single ~30s clip (see about-cinematic-canvas.tsx for the real, reported
 * `loadedmetadata` duration this is never assumed to exactly match) whose
 * four rough visual chapters — woman by window, doorway/moving between
 * spaces, a document handoff, and a consultation that resolves into a
 * hand-held moment of connection — line up with the four beats below.
 * One shared source, not four separate clips: `about-cinematic-canvas.tsx`
 * maps scroll progress to a `currentTime` within it rather than swapping
 * `<video>` elements. Poster frames are real extracted stills from this
 * exact clip (same convention as the homepage's own video posters —
 * hero.media.posterSrc, care.media.posterSrc in site-content.ts), not
 * separately-sourced photography.
 */
export const aboutCinematicVideo = {
  // Scroll-video smoothness audit: swapped from the original export
  // (`about-cinematic-30s.mp4`, kept on disk, untouched) to a re-encoded
  // copy tuned for scroll-scrubbing specifically. Confirmed via ffprobe
  // that the original had only 3 keyframes across the whole 30s clip
  // (0s, 10.375s, 20.083s) — gaps of up to ~10s / ~240 frames between
  // keyframes, meaning a `currentTime` seek anywhere in most of the video
  // required the browser to decode hundreds of intermediate frames from a
  // distant keyframe, a real, measurable stutter risk for continuous
  // scroll-scrubbing (H.264 seeks are cheap only near a keyframe). The
  // re-encode (`-g 24 -keyint_min 24 -sc_threshold 0`, same 24fps/720p/
  // yuv420p, `-an` since this element is always `muted` and the audio
  // track was never used, `+faststart`) places a keyframe every second —
  // at most ~24 frames from any seek target — and is visually
  // indistinguishable at this resolution while also being ~1MB smaller.
  // Compared against the original in the actual browser (not just
  // theorized): see the component's own doc comment for the measured
  // improvement.
  src: "/brand/video/about-cinematic-30s-seekopt.mp4",
} as const;

export const aboutHero = {
  eyebrow: "About The Birthwave",
  headlineLines: ["Every stage of care", "used to live in its own room."],
  supporting:
    "Fertility. Pregnancy. Birth. Recovery. Newborn care. The Birthwave exists to carry a woman through all of it as one story — not five separate ones.",
  media: {
    // Approved (Phase 4): the cinematic video's own opening moment — a
    // real extracted frame (~3s in), not separately-sourced photography.
    // Also this `<video>` element's own `poster`, shown before playback
    // data is available or under reduced motion/mobile, where this exact
    // frame is what's shown instead of the video at all.
    posterSrc: "/brand/about/about-hero-poster.jpg",
    alt: "A woman sitting by a window in soft daylight, the opening moment of The Birthwave's cinematic story.",
  },
} as const;

export const aboutProblem = {
  eyebrow: "The Problem",
  heading: "Care, one appointment at a time.",
  body: "Fertility. Pregnancy. Birth. Recovery. Newborn care. Each stage often arrives with its own doctor, its own file and its own waiting room — as if the story restarts every time. The Birthwave was created around a simpler belief: a woman moving through these stages shouldn't have to reintroduce herself at every door.",
  stages: ["Fertility", "Pregnancy", "Birth", "Recovery", "Newborn Care"],
  media: {
    // Approved (Phase 4): real extracted frame (~14s in) from the same
    // cinematic video — the doorway/moving-between-spaces moment.
    posterSrc: "/brand/about/about-problem-poster.jpg",
    alt: "A woman standing at a doorway between two rooms, a visual metaphor for moving between disconnected stages of care.",
  },
} as const;

export const aboutBelief = {
  eyebrow: "The Belief",
  // Reused verbatim from site-content.ts's `philosophy.resolution` /
  // `journey.heading` — the site's one deliberately-repeated line, not a
  // new one coined here (see journey-section.tsx's own comment on the
  // same reuse). The paragraph beneath it is new wording, not a restatement
  // of Philosophy's three-line poetic build.
  heading: "One continuous journey of care.",
  body: "In practice, it means one team who already knows your history when you walk in. One thread of care that carries from a fertility conversation, through pregnancy, into birth and past it — instead of handing you off at every milestone. Continuity isn't an add-on to how The Birthwave works. It's the model itself.",
  media: {
    // Approved (Phase 4): real extracted frame (~23s in) from the same
    // cinematic video — the consultation moment resolving into connection.
    posterSrc: "/brand/about/about-belief-poster.jpg",
    alt: "Two women in a warm consultation room, a moment of connection.",
  },
} as const;

export const aboutFounderIntro = {
  eyebrow: "The Founder",
  // TODO(content): founder name, personal story, vision statement and
  // quote are not yet approved — see this file's own header comment and
  // docs/implementation-brief.md §2. Every string below is a structural
  // placeholder, not drafted-but-unapproved prose: do not present any of
  // it as a real person's real story.
  introLabel: "Our Founder",
  story: "A short introduction to why The Birthwave was founded belongs here: approved founder story pending.",
  quote: "A short, attributed founder quote belongs here: approved copy pending.",
  media: {
    // The cinematic video's own final consultation frame (~29s in) is
    // used here as visual atmosphere only, while this copy renders over
    // it — it is explicitly NOT presented as footage of the founder (no
    // real founder footage exists yet). See this section's own doc
    // comment in about-cinematic-canvas.tsx.
    posterSrc: "/brand/about/about-founder-poster.jpg",
    alt: "Founder portrait — approved photography pending",
  },
} as const;

/**
 * Architectural boundary: everything above this line is Sections 01–04,
 * prepared for — but not implementing — Phase 2's cinematic scroll-video
 * sequence. Everything below is normal, always-static editorial content.
 */

export const aboutFounderStory = {
  eyebrow: "The Founder",
  // Distinct from `aboutFounderIntro.introLabel` above on purpose — this
  // is the fuller story below the cinematic/editorial boundary, not a
  // second copy of that shorter teaser's own heading.
  heading: "The story behind The Birthwave",
  // TODO(content): same status as `aboutFounderIntro` above — structural
  // placeholders, approved copy pending, no invented history. A longer,
  // separately-approved quote belongs here too, distinct from the shorter
  // teaser quote in `aboutFounderIntro` above.
  body: [
    "A longer founder story paragraph belongs here: approved copy pending, describing the specific gap in care that led to The Birthwave.",
    "A second paragraph continuing the founder's own vision for what care should feel like belongs here: approved copy pending.",
  ],
  quote: "A second, longer founder quote belongs here: approved copy pending, distinct from the shorter one above.",
  media: {
    src: "/images/clinic/dr-santoshi.JPG",
    alt: "Dr. Santoshi",
  },
  cta: {
    label: "Meet our doctors",
    href: "/doctors",
  },
} as const;

export const aboutHowWeCare = {
  eyebrow: "How We Care",
  heading: "What continuity actually looks like.",
  intro:
    "Continuity isn't a slogan — it's a handful of specific habits, held consistently across every stage of your care.",
  // Deliberately distinct wording from `care.principles` in site-content.ts
  // (the homepage's Care & Trust section) — this isn't the same three
  // principles restated, and this section uses its own plain divided-grid
  // treatment rather than Care & Trust's sticky-headline/scroll-focus
  // layout (see about-how-we-care.tsx).
  principles: [
    {
      index: "01",
      label: "Continuity, not restarts",
      statement: "Your history travels with you from one stage to the next — you're never asked to start over.",
    },
    {
      index: "02",
      label: "Multidisciplinary by design",
      statement: "The right specialists are already coordinated around you, not siloed into separate visits.",
    },
    {
      index: "03",
      label: "Explained, not assumed",
      statement: "Every option, and the clinical reasoning behind it, is laid out before any decision is made.",
    },
    {
      index: "04",
      label: "Informed, never pressured",
      statement: "Preparation should build confidence — never push you toward one version of what care must look like.",
    },
  ],
} as const;

export const aboutTeamPreview = {
  eyebrow: "The People",
  heading: "A few of the people you'll meet.",
  // TODO(content): only one placeholder entry exists in doctors-content.ts
  // — this section renders that roster directly rather than inventing the
  // 3–5 representative people the Phase 1 brief describes as a
  // possibility. Add real entries there once approved; nothing here needs
  // to change to pick them up.
  note: "The Birthwave's full team, with complete profiles, lives on our doctors & care team page.",
} as const;

export const aboutDoctorsCta = {
  heading: "Meet the people behind your care.",
  supporting: "Full profiles, specialties and clinical backgrounds live on our doctors & care team page.",
  cta: {
    label: "Meet our doctors & care team",
    href: "/doctors",
  },
} as const;

/**
 * Simpler than the homepage's Final CTA by design (no background
 * photograph, no parallax, one action) — an internal page's closing
 * invitation, not a second copy of the homepage's own close. Resolves to
 * the same underlying appointment destination as the rest of the site
 * (`/#connect`, the homepage's Final CTA section — there is no separate
 * booking flow yet, see site-content.ts's own `finalCta`/`hero` TODOs).
 */
export const aboutAppointmentCta = {
  heading: "Ready when you are.",
  supporting: "Start with a conversation — from planning ahead to navigating what's already underway.",
  primaryCta: {
    label: "Book a Consult",
    href: "/#connect",
    todo: "Placeholder destination — no booking flow exists yet (see site-content.ts's own finalCta/hero TODOs).",
  },
} as const;
