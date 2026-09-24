/**
 * Site content — The Birth Wave
 *
 * Editable source for homepage copy that isn't navigation or FAQ (see
 * navigation-content.ts and faq-content.ts for those). Nothing here is
 * final copy unless explicitly marked approved: services, statistics,
 * testimonials, founder/team details, client names and contact details
 * have not been approved, so none are invented. Every placeholder is
 * labelled as one and flagged with a TODO describing exactly what's
 * needed to replace it.
 *
 * When real copy arrives, edit the strings below — components read from
 * this file and don't need to change.
 */

export const brand = {
  name: "The Birthwave",
  shortName: "Birthwave",
  // TODO(brand): confirm whether "The Birth Wave" or "Birthwave" is the
  // preferred written form outside the logo lockup — the guide's business
  // card footer prints "thebirthwave.com" as one word.
  logo: {
    wordmarkMauve: "/brand/wordmark-mauve.png",
    wordmarkCream: "/brand/wordmark-cream.png",
    iconMauve: "/brand/icon-mauve.png",
    iconCream: "/brand/icon-cream.png",
    alt: "The Birthwave",
  },
} as const;

export const hero = {
  eyebrow: "A Gentler Start",
  // Approved (docs/implementation-brief.md §29) — final-polish pass,
  // replacing the earlier structural placeholder. Two deliberate lines,
  // not one sentence left to wrap wherever the viewport happens to break
  // it — see hero-section.tsx, where each renders as its own block.
  headlineLead: "Care that moves",
  headlineEmphasis: "with you.",
  // Approved (docs/implementation-brief.md §29).
  subhead:
    "From women's health and pregnancy to birth, recovery and newborn care — The Birthwave brings every stage into one connected journey.",
  primaryCta: {
    label: "Book a Consult",
    href: "#contact",
    todo: "Placeholder destination — no booking flow exists yet.",
  },
  // Approved: client-supplied hero video — a silent, muted background
  // loop, not a video with a soundtrack (the `muted` attribute on the
  // <video> element in hero-section.tsx is what actually guarantees
  // this; this asset does carry its own audio track, unlike the prior
  // hero-video.mp4 which had it stripped at the file level — noted here
  // since a future re-export of this clip may or may not keep one).
  // Poster is the video's own first frame, shown while it loads and in
  // place of it entirely under prefers-reduced-motion — regenerate it
  // from this file's frame 0 if the video is ever swapped again.
  media: {
    videoSrc: "/brand/clean_herovideo.mp4",
    posterSrc: "/brand/hero-video-poster.jpg",
  },
} as const;

/**
 * Philosophy — the cinematic four-line sequence that replaces the old
 * Purpose section's placeholder statement. Approved copy: given verbatim
 * as the content to use for this rework, not a placeholder. See
 * philosophy-section.tsx for how the pinned scroll scene sequences these.
 */
export const philosophy = {
  // Shown briefly with the BirthWave wordmark as the scene's own opening
  // beat (philosophy-section.tsx), before the wordmark/eyebrow pair fades
  // and statement 1 takes over — same "small label above the scene"
  // pattern as `hero.eyebrow`/`journey.eyebrow`/`immersive.eyebrow`.
  eyebrow: "Our Philosophy",
  // `position` drives the editorial-canvas placement in philosophy-section.tsx
  // — a specific curated progression (interaction-correction pass, docs/
  // implementation-brief.md §25), not a per-statement free choice: upper-left
  // → right/mid-height → left-to-centre/lower → the resolution, centred and
  // dominant, below.
  messages: [
    { text: "Pregnancy isn't a series of appointments.", position: "upper-left" },
    { text: "Birth isn't a single moment.", position: "right-mid" },
    { text: "And care shouldn't begin and end at either.", position: "lower-center" },
  ] as const,
  // The line the first three resolve into — set apart typographically
  // (all-caps, centered, largest weight) rather than a fourth line in the
  // same voice as the first three.
  resolution: "One continuous journey of care.",
  // Approved (docs/implementation-brief.md §28): the generated editorial
  // daylight photograph used as this scene's atmospheric background
  // layer — see philosophy-section.tsx. Replaces the earlier reuse of
  // the hero's own poster frame. Decorative (an oversized, heavily
  // cropped atmosphere layer behind the typography, never the section's
  // means of conveying meaning), so alt stays empty.
  media: {
    src: "/images/philosophy/birthwave-philosophy-background.png",
    alt: "",
  },
} as const;

/**
 * The BirthWave Journey — the signature scroll interaction replacing the
 * old Pathways ("Find the care that meets you where you are") and
 * Experience ("A journey, not a checklist") sections, which described the
 * same concept twice. One journey, six stages.
 *
 * Rebuilt from a fixed-frame pinned slideshow (seven stages) into a
 * zig-zag scrolling journey (docs/implementation-brief.md §27) — "Mother"
 * (the old stage six) was dropped per that brief, its idea of continuing
 * care folded into what stage six ("Baby") already says.
 *
 * `heading` reuses philosophy.resolution's exact approved phrase verbatim
 * (not a new line) per the rebuild brief's instruction to "preserve" that
 * copy as the Journey's own intro line, immediately before stage one;
 * `eyebrow` reuses the old section heading as the small label above it.
 *
 * `image` paths point at the six approved photographs already in
 * public/images/journey/ (1122×1402, one consistent editorial system —
 * confirmed via a dimension check before this rebuild started, §27) —
 * real assets, not placeholders; every stage has one.
 *
 * `objectPosition` (docs/implementation-brief.md §28): a light per-photo
 * safety margin, not a heavy crop — biased toward wherever each photo's
 * own primary subject (a face, joined hands) sits, confirmed by viewing
 * every image directly rather than assumed. Matters far less than it
 * would have before §28's parallax-container fix (the layer used to be
 * oversized on the vertical axis only, which distorted its aspect ratio
 * and made `object-cover` crop the *sides* to compensate — clipping
 * whichever person stood near an edge); now the frame always keeps the
 * photo's true aspect ratio, so this only nudges which sliver of the
 * frame the parallax's own small vertical travel trades away first.
 */
export const journey = {
  eyebrow: "The Birthwave Journey",
  heading: "One continuous journey of care.",
  stages: [
    {
      number: "01",
      title: "Preconception",
      headline: ["Where the conversation begins,", "before anything is certain."],
      supporting: "Understanding your health, fertility and readiness before pregnancy begins.",
      image: "/images/journey/journey-preconception.jpg",
      objectPosition: "50% 38%",
      alt: "A couple discussing preconception care with their doctor during a consultation.",
    },
    {
      number: "02",
      title: "Pregnancy",
      headline: ["Care that grows", "alongside every trimester."],
      supporting: "Doctor-led antenatal care that evolves through every stage of pregnancy.",
      image: "/images/journey/journey-pregnancy.jpg",
      objectPosition: "45% 28%",
      alt: "A pregnant woman resting a hand on her belly by a sunlit window.",
    },
    {
      number: "03",
      title: "Preparation",
      headline: ["Knowledge becomes confidence."],
      supporting: "Birth education, movement and practical preparation for the journey ahead.",
      image: "/images/journey/journey-preparation.jpg",
      objectPosition: "45% 38%",
      alt: "A pregnant woman preparing for birth, supported by her partner during movement practice.",
    },
    {
      number: "04",
      title: "Birth",
      headline: ["Your care.", "Your choices.", "Your clinical needs."],
      supporting:
        "Understanding your options and making decisions around your individual pregnancy and clinical needs.",
      image: "/images/journey/journey-birth.jpg",
      objectPosition: "50% 55%",
      alt: "Two hands held together, a quiet moment of human connection during labour.",
    },
    {
      number: "05",
      title: "Recovery",
      headline: ["Care continues after delivery."],
      supporting: "Support for healing, feeding, movement and emotional wellbeing after birth.",
      image: "/images/journey/journey-recovery.jpg",
      objectPosition: "40% 22%",
      alt: "A mother resting in bed, her newborn asleep against her chest.",
    },
    {
      number: "06",
      title: "Baby",
      headline: ["Care continues", "into what comes next."],
      supporting: "Continuity into newborn care, vaccinations and pediatric support.",
      image: "/images/journey/journey-baby.jpg",
      objectPosition: "50% 35%",
      alt: "A mother holding her swaddled newborn while a doctor checks in with a stethoscope.",
    },
  ],
} as const;

/**
 * Immersive — the dark emotional scene. Approved copy, given verbatim for
 * the interaction-correction pass (docs/implementation-brief.md §25): a
 * short scroll-progressive sequence, not a single static statement or a
 * testimonial. The closing line intentionally reuses `philosophy.resolution`
 * word-for-word rather than a second hand-typed copy of it — the brief
 * names the exact same line as this scene's own close, and keeping it as
 * one shared source means the two can never drift out of sync with each
 * other by accident.
 */
export const immersive = {
  // Kept, unlike most other sections' eyebrows: this marks the page's one
  // engineered peak, on its own dark surface — a real tonal signal, not a
  // label restating the section name. See docs/implementation-brief.md §14.
  eyebrow: "A Moment",
  messages: [
    "Care isn't only about what happens today.",
    "It's about being there for what comes next.",
  ] as const,
  // Approved (docs/implementation-brief.md §28): the generated fabric
  // photograph now used as this scene's background plane — see
  // immersive-section.tsx. Purely atmospheric texture (no figure, no
  // legible subject), so its alt stays empty rather than describing
  // fabric folds no visitor needs read aloud; the scene's meaning is
  // already carried by the copy.
  media: {
    src: "/images/generated/maternal-fabric-espresso-16x9.png",
    alt: "",
  },
  // Approved (docs/implementation-brief.md §37): a manually-added video
  // asset, found at `/public/brand/dark.mp4` — not the .jpg the earlier
  // brief (§32) assumed; that static photo is unused again now (still on
  // disk, just no longer referenced). 1280×720, 10s, 24fps, silent —
  // treated exactly like the Hero's own video (immersive-section.tsx):
  // an unconditional `<video>` element, `posterSrc` shown at rest/before
  // playback/under reduced motion, autoplay only ever started
  // imperatively in an effect. `posterSrc` is a real JPEG frame
  // extracted from this exact clip (not a separately-sourced image), so
  // the poster and the first playing frame match. Decorative — a silent,
  // muted, looping atmosphere layer, same as Hero's own video and the
  // fabric plane above; the scene's meaning is carried by the copy, not
  // by a video `alt` attribute (which doesn't exist).
  secondaryMedia: {
    videoSrc: "/brand/dark.mp4",
    posterSrc: "/brand/dark-video-poster.jpg",
  },
} as const;

/**
 * Care — "What guides how we care for you," redesigned around a sticky
 * headline and three principles that take focus one at a time as they
 * scroll into view, rather than a static list. The testimonial that used
 * to sit under this section's commitments has been deliberately omitted:
 * no approved, attributable quote exists, and a placeholder styled like a
 * real review is worse than no testimonial at all. Re-add it here once
 * one is approved — nothing else about this section needs to change.
 *
 * Principles approved (docs/implementation-brief.md §29), replacing the
 * earlier structural placeholders — each `label` is the short all-caps
 * line the brief gave verbatim, `statement` the sentence beneath it.
 *
 * The three per-principle photographs §32 added (`image`/`imageAlt`/
 * `objectPosition`, one per principle, switching as the visitor scrolled)
 * were removed in §37: a single approved companion video now sits under
 * the heading instead and never changes as principles come into focus —
 * see `media` below, and `CareVisual` in care-section.tsx for how it
 * replaced the old three-photo crossfade.
 */
export const care = {
  headingLines: ["What guides", "how we care", "for you."],
  principles: [
    {
      index: "01",
      label: "Listen before recommending",
      statement:
        "Care begins with understanding your history, questions and what matters to you.",
    },
    {
      index: "02",
      label: "Explain before deciding",
      statement:
        "Your options and clinical considerations should be understandable before decisions are made.",
    },
    {
      index: "03",
      label: "Support without pressure",
      statement:
        "Preparation should build confidence without forcing one idea of what birth or recovery must look like.",
    },
  ],
  // Approved (docs/implementation-brief.md §37): a manually-added video
  // asset, found at `/public/brand/care.mp4` — not a .jpg. 720×1280
  // (9:16, portrait — well suited to the narrow companion frame beneath
  // the heading), 10s, 24fps, silent. Same unconditional-`<video>`/
  // imperative-play pattern as Hero's own video and the dark scene's
  // (immersive-section.tsx) — `posterSrc` is a real frame extracted from
  // this exact clip. One stable companion for the whole section, not
  // three cycling photos — it does not change as the principles on the
  // right come into focus.
  media: {
    videoSrc: "/brand/care.mp4",
    posterSrc: "/brand/care-video-poster.jpg",
  },
} as const;

/**
 * Final CTA — approved copy, given verbatim for this rework. Both CTAs
 * resolve to the same closing anchor as the rest of the site's
 * placeholder destinations: no booking flow and no verified WhatsApp
 * number exist yet (see each `todo`) — inventing either would violate
 * "use only verified project data," so neither is invented here.
 */
export const finalCta = {
  statementLines: [
    "Wherever you are in your journey,",
    "we can begin there.",
  ] as const,
  supporting:
    "From planning a pregnancy to navigating postpartum and newborn care, start with a conversation with The Birthwave team.",
  primaryCta: {
    label: "Book an appointment",
    href: "#connect",
    todo: "Placeholder destination — no booking flow exists yet.",
  },
  secondaryCta: {
    label: "WhatsApp us",
    href: "#connect",
    todo: "No verified WhatsApp number exists for this project — this placeholder resolves to the same closing anchor as the primary CTA rather than a fabricated wa.me link. Replace with the real number once approved.",
  },
  // Approved (docs/implementation-brief.md §32): a purely atmospheric
  // background layer behind the existing typographic close — the brief is
  // explicit that this section "must remain primarily typographic," so the
  // photo stays a low-opacity wash with a dark overlay over it, never a
  // normal visible photograph. Decorative, so alt stays empty.
  media: {
    src: "/images/lower-sections/final-cta-atmosphere.jpg",
    alt: "",
  },
} as const;

export const footer = {
  // TODO(content): a short tagline — approved copy pending.
  tagline: "Care that meets you where you are.",
  // TODO(legal): privacy policy / terms are not yet available — no links
  // are rendered for them rather than pointing somewhere fake.
  //
  // Site-architecture audit: `/faq` exists, renders real content (the
  // same confirmed `faq-content.ts` the homepage's own FAQ section
  // uses), and was reachable from nowhere on the site — no header link,
  // no footer link, no inline reference. `secondaryLinks` is deliberately
  // separate from `navigation.links` (shared by the header) rather than
  // added there: the footer is the right place for a real-but-secondary
  // page like this without changing the header's own confirmed 4-link
  // set. `/contact` and `/privacy` are NOT added here — both are still
  // genuine "page in development" placeholders with no confirmed content
  // (see each route's own comment), and linking a thin/placeholder page
  // is a worse outcome than not linking it yet.
  secondaryLinks: [{ label: "FAQ", href: "/faq" }],
} as const;
