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
  shortName: "The Birthwave",
  // Approved written brand name: The Birthwave.
  logo: {
    wordmarkMauve: "/brand/wordmark-mauve.png",
    wordmarkCream: "/brand/wordmark-cream.png",
    iconMauve: "/brand/icon-mauve.png",
    iconCream: "/brand/icon-cream.png",
    alt: "The Birthwave",
  },
} as const;

export const hero = {
  eyebrow: "Care Through Every Stage",
  headlineLead: "Care that moves",
  headlineEmphasis: "with you.",
  subhead:
    "From women's health and fertility to pregnancy, birth preparation, childbirth, postpartum recovery and newborn care, The Birthwave brings together medical care and holistic support for the different stages of your journey.",
  // Mobile/tablet only: small cue at the bottom of the full-screen Hero,
  // faded out as soon as scrolling starts (hero-philosophy-scroll-scene.tsx).
  scrollCue: "Scroll to discover",
  primaryCta: {
    label: "Book a Consultation",
    // /contact (confirmed phone, email, address + enquiry form) rather than
    // the self-referencing `#connect` closing section.
    href: "/contact",
    todo: "No booking system exists yet and the /contact enquiry form does not send anywhere — needs a booking/form integration.",
  },
  secondaryCta: {
    label: "Explore Our Care",
    href: "/services",
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
  eyebrow: "Our Approach",
  // `position` drives the editorial-canvas placement in philosophy-section.tsx
  // — a specific curated progression (interaction-correction pass, docs/
  // implementation-brief.md §25), not a per-statement free choice: upper-left
  // → right/mid-height → left-to-centre/lower → the resolution, centred and
  // dominant, below.
  messages: [
    { text: "Pregnancy is more than a series of appointments.", position: "upper-left" },
    { text: "Birth is more than a single moment.", position: "right-mid" },
    { text: "And your care shouldn't stop after delivery.", position: "lower-center" },
  ] as const,
  // The line the first three resolve into — set apart typographically
  // (all-caps, centered, largest weight) rather than a fourth line in the
  // same voice as the first three.
  resolution: "One connected journey of care.",
  // Closing paragraph shown after the resolution line.
  closing:
    "From preparing for pregnancy to caring for you and your baby after birth, The Birthwave is here through the stages that matter.",
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
  heading: "Care that grows with you.",
  stages: [
    {
      number: "01",
      title: "Before Pregnancy",
      headline: ["Planning for pregnancy?"],
      supporting:
        "Understand your reproductive health, fertility and preconception needs through individual consultations, medical assessment and guidance to help you make informed decisions about family planning.",
      cta: { label: "Explore Preconception Care", href: "/services/fertility-preconception" },
      image: "/images/web-ready/planning2.jpg",
      objectPosition: "50% 38%",
      alt: "A couple discussing preconception care with their doctor during a consultation.",
    },
    {
      number: "02",
      title: "Pregnancy",
      headline: ["Care through", "every trimester."],
      supporting:
        "Pregnancy involves physical, emotional and lifestyle changes. From regular antenatal check-ups and monitoring your newborn's development before birth to nutrition, emotional well-being and pregnancy-related guidance, your care is planned around your individual needs.\nExplore conscious pregnancy and Garbh Sanskar as complementary approaches to mindfulness, relaxation and well-being during pregnancy.",
      cta: { label: "Explore Pregnancy Care", href: "/services/pregnancy-antenatal-care" },
      image: "/images/web-ready/care.jpg",
      objectPosition: "45% 28%",
      alt: "A pregnant woman resting a hand on her belly by a sunlit window.",
    },
    {
      number: "03",
      title: "Birth Preparation",
      headline: ["Prepare with understanding", "and confidence."],
      supporting:
        "Understand labour, birth options, breathing techniques, comfort measures and what to expect during childbirth.\nChildbirth education also includes conversations about your birth plan, partner involvement, support during labour and making informed decisions as your pregnancy progresses",
      cta: { label: "Explore Birth Preparation", href: "/services/birth-preparation" },
      image: "/images/journey/birthpreparation.JPG",
      objectPosition: "50% 50%",
      alt: "A pregnant woman preparing for birth with support during movement practice.",
    },
    {
      number: "04",
      title: "Birth",
      headline: ["Your birth.", "Your care.", "Your individual needs."],
      supporting:
        "Every birth experience is different. Discuss your preferences for natural birth, vaginal delivery, water birth and Vaginal Birth After Caesarean (VBAC), along with the medical considerations involved.\nYour obstetrician can explain which approaches may be appropriate for your pregnancy and what delivery arrangements are available.",
      cta: { label: "Explore Birth Care", href: "/services/natural-birth" },
      image: "/images/web-ready/birth.jpg",
      objectPosition: "50% 55%",
      alt: "Two hands held together, a quiet moment of human connection during labour.",
    },
    {
      number: "05",
      title: "After Birth",
      headline: ["Your care continues", "after delivery."],
      supporting:
        "The postpartum period involves physical recovery, hormonal changes and adjustments to everyday life.\nExplore support for postpartum recovery, breastfeeding, pelvic health and mental health concerns, including emotional changes, anxiety and postpartum depression.",
      cta: { label: "Explore Postpartum Care", href: "/services#postpartum-care" },
      image: "/images/web-ready/afterbirth.jpg",
      objectPosition: "40% 22%",
      alt: "A mother resting in bed, her newborn asleep against her chest.",
    },
    {
      number: "06",
      title: "Your Baby",
      headline: ["And care continues", "with your baby."],
      supporting:
        "From newborn health assessments and vaccinations to feeding, growth, development and childhood health concerns, paediatric consultations support your child's changing needs.\nExplore guidance on early parenting, conscious parenting and understanding your child's physical and emotional development.",
      cta: { label: "Explore Newborn Care", href: "/services#newborn-care" },
      image: "/images/journey/care.jpg",
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
    "It's about understanding where you are now,recognising your changing needs and helping you explore the care that may be appropriate next.",
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
 * Care — the "Our approach" section: a short editorial statement of how
 * consultations work, beside one still photograph. Replaces the earlier
 * "What guides how we care for you" copy and its companion video.
 *
 * The testimonial that used to sit under this section has been
 * deliberately omitted: no approved, attributable quote exists, and a
 * placeholder styled like a real review is worse than none.
 *
 * `image` is an illustrative photograph (not The Birthwave's own clinic or
 * team — the alt text describes the scene, never claims it's here). It is
 * also the Doctors page hero image (doctors-content.ts); swap in approved
 * clinic photography of a consultation when one exists.
 */
export const care = {
  eyebrow: "How We Care",
  heading: "What guides the way we care for you.",
  principles: [
    {
      index: "01",
      title: "Listen First",
      text: "Your experiences, concerns and questions deserve time and attention.\n\nAt The Birthwave, we aim to create space for meaningful conversations, understanding your individual needs rather than rushing through appointments.",
    },
    {
      index: "02",
      title: "Explain Clearly",
      text: "You deserve to understand your health, available options and the reasons behind medical recommendations.\n\nOur approach encourages open discussions so that you can ask questions and make informed decisions.",
    },
    {
      index: "03",
      title: "Decide Together",
      text: "Your preferences are an important part of care.\n\nWhether you are discussing fertility, pregnancy, birth planning or recovery, decisions should consider your personal choices alongside your clinical needs.",
    },
    {
      index: "04",
      title: "Care for the Whole Person",
      text: "Women's healthcare involves more than addressing physical symptoms.\n\nThe Birthwave takes a holistic approach by considering medical needs alongside nutrition, emotional well-being, lifestyle, mental health and supportive care where appropriate.",
    },
  ],
  image: {
    src: "/images/clinic/doctor-hero.png",
    width: 1086,
    height: 1448,
    alt: "A clinician in a white coat listening attentively to a woman during a calm consultation in a softly lit room.",
    // Keeps both faces (upper third) in frame at every crop.
    objectPosition: "50% 30%",
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
  eyebrow: "Start Where You Are",
  statementLines: [
    "Wherever you are in your journey,",
    "we can begin there.",
  ] as const,
  supporting:
    "Planning a pregnancy, expecting a baby, preparing for birth or adjusting to life after delivery? Start with a conversation with The Birthwave team.",
  note: "Not sure which service you need? Tell us what you're looking for and our team can help you find the right place to start.",
  primaryCta: {
    label: "Book a Consultation",
    href: "/contact",
    todo: "No booking system exists yet and the /contact enquiry form does not send anywhere — needs a booking/form integration.",
  },
  // Not "WhatsApp Us": the project has two conflicting WhatsApp numbers
  // (contact-content.ts names +91 98407 98472; several service pages give
  // +91 93630 31925), so no wa.me link is published until the client
  // confirms which one. This goes to the confirmed contact details instead.
  secondaryCta: {
    label: "Contact Our Team",
    href: "/contact#contact-details",
    todo: "Replace with a wa.me link once the client confirms the WhatsApp number.",
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

/**
 * Care Discovery — Section 6 on the homepage. A six-card services grid
 * allowing visitors to jump directly to the care area that matches where
 * they are in their journey. Each card has a short description and a link
 * to the corresponding service landing page.
 */
export const careDiscovery = {
  eyebrow: "FIND THE CARE YOU NEED",
  heading: "Wherever you are, start from where you are.",
  viewAllCta: {
    label: "View All Services",
    href: "/services",
  },
  services: [
    {
      category: "WOMEN'S HEALTH",
      title: "Women's Health",
      description:
        "Care for gynaecological concerns, menstrual health, intimate wellness, fertility and preconception.",
      cta: { label: "Explore Women's Health", href: "/services" },
    },
    {
      category: "PREGNANCY",
      title: "Pregnancy",
      description:
        "Antenatal care, conscious pregnancy, Garbh Sanskar, nutrition and guidance through every stage of pregnancy.",
      cta: { label: "Explore Pregnancy Care", href: "/services/pregnancy-antenatal-care" },
    },
    {
      category: "PREPARING FOR BIRTH",
      title: "Preparing for Birth",
      description:
        "Childbirth education, birth planning, partner involvement and practical preparation for labour and childbirth.",
      cta: { label: "Explore Birth Preparation", href: "/services/birth-preparation" },
    },
    {
      category: "BIRTH",
      title: "Birth",
      description:
        "Understand natural birth, vaginal delivery, water birth and VBAC, with guidance on clinical suitability, individual preferences and available birth options.",
      cta: { label: "Explore Birth Care", href: "/services/natural-birth" },
    },
    {
      category: "AFTER BIRTH",
      title: "After Birth",
      description:
        "Postpartum recovery, breastfeeding, pelvic health and support for mental health concerns, including emotional changes and postpartum depression.",
      cta: { label: "Explore Postpartum Care", href: "/services#postpartum-care" },
    },
    {
      category: "NEWBORN & PAEDIATRIC CARE",
      title: "Newborn & Paediatric Care",
      description:
        "Newborn health, vaccinations, feeding, growth, child development and guidance on conscious parenting as your child grows.",
      cta: { label: "Explore Newborn & Paediatric Care", href: "/services#newborn-care" },
    },
  ],
} as const;

export const footer = {
  // TODO(content): a short tagline — approved copy pending.
  tagline: "Care that meets you where you are.",
  /**
   * Verified social media channels.
   * Only approved, active destinations are configured here.
   * Future platforms (Facebook, YouTube) can be added once URLs are provided.
   */
  socialLinks: [
    {
      id: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/thebirthwave",
    },
    {
      id: "whatsapp",
      label: "Chat on WhatsApp",
      href: "https://wa.me/917904251378",
    },
  ] as const,
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
  // set.
  //
  // Footer refresh: "Explore" lists existing routes only — `/contact` is
  // now a real page. Column labels are the footer's own wayfinding names
  // for the same destinations the header links to.
  exploreLinks: [
    { label: "About Us", href: "/about" },
    { label: "Our Care Team", href: "/doctors" },
    { label: "Services Hub", href: "/services" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact Us", href: "/contact" },
  ],
  // Only routes that exist. `/privacy` is live (a reviewed policy is still
  // pending — see that route). TODO(legal): Terms & Conditions and a
  // Medical Disclaimer have no pages or approved copy yet — add them here
  // once they exist rather than linking somewhere fake.
  legalLinks: [{ label: "Privacy Policy", href: "/privacy" }],
} as const;
