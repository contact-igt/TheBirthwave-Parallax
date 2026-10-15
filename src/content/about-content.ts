/**
 * About page content — The Birth Wave
 *
 * Updated verbatim with approved copy across all 11 sections.
 */

/**
 * Sections 01–04 — the cinematic scroll-video/canvas sequence.
 * `id` doubles as the DOM anchor and the ScrollTrigger/beat key.
 */
export const aboutCinematicSequence = [
  { id: "about-hero", label: "Hero" },
  { id: "about-problem", label: "Why The Birthwave" },
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

// ── Beat 01 — Hero / Animated Introduction (Section 01) ──────────────────────

export const aboutHero = {
  eyebrow: "About The Birthwave",
  headlineLines: ["Every stage of care", "is connected."],
  supporting:
    "Fertility. Pregnancy. Birth. Recovery. Newborn care.\n\nAt The Birthwave, we believe women's healthcare should go beyond individual appointments. Our approach brings medical care, guidance and supportive services together, with attention to your changing needs at every stage.",
  media: {
    posterSrc: "/brand/about/about-hero-poster.jpg",
    alt: "A woman sitting by a window in soft daylight, the opening moment of The Birthwave's cinematic story.",
  },
} as const;

// ── Beat 02 — Why The Birthwave (Section 02) ────────────────────────────────

export const aboutProblem = {
  eyebrow: "Why The Birthwave",
  heading: "Your care should be about more than your next appointment.",
  body:
    "Every woman's health journey is different. From understanding a health concern to planning a pregnancy, preparing for childbirth or recovering after delivery, every stage deserves attention, understanding and individualised care.\n\nThe Birthwave was created with the belief that women deserve time to explain their concerns, ask questions and understand their options without feeling rushed.\n\nOur aim is to create an environment where medical guidance and personal attention go hand in hand.",
  paragraphs: [
    "Every woman's health journey is different. From understanding a health concern to planning a pregnancy, preparing for childbirth or recovering after delivery, every stage deserves attention, understanding and individualised care.",
    "The Birthwave was created with the belief that women deserve time to explain their concerns, ask questions and understand their options without feeling rushed.",
    "Our aim is to create an environment where medical guidance and personal attention go hand in hand.",
  ],
  stages: ["Fertility", "Pregnancy", "Birth", "Recovery", "Newborn Care"],
  media: {
    posterSrc: "/brand/about/about-problem-poster.jpg",
    alt: "A woman standing at a doorway between two rooms, a visual metaphor for moving between disconnected stages of care.",
  },
} as const;

// ── Beat 03 — Our Approach (Section 03) ─────────────────────────────────────

export const aboutBelief = {
  eyebrow: "Our Approach",
  heading: "Caring for the whole woman, through every stage.",
  body:
    "We believe women's healthcare involves more than treating a symptom or addressing a single medical concern.\n\nPhysical health, emotional well-being, nutrition, movement, reproductive health and personal circumstances can all influence a woman's healthcare needs.\n\nAt The Birthwave, our holistic approach brings medical care together with relevant supportive services, which may include nutrition guidance, yoga and movement, pelvic health, childbirth education, lactation support and emotional well-being care.\n\nThis approach complements medical assessment and treatment, helping women understand the different aspects of their health and the care options available to them.",
  paragraphs: [
    "We believe women's healthcare involves more than treating a symptom or addressing a single medical concern.",
    "Physical health, emotional well-being, nutrition, movement, reproductive health and personal circumstances can all influence a woman's healthcare needs.",
    "At The Birthwave, our holistic approach brings medical care together with relevant supportive services, which may include nutrition guidance, yoga and movement, pelvic health, childbirth education, lactation support and emotional well-being care.",
    "This approach complements medical assessment and treatment, helping women understand the different aspects of their health and the care options available to them.",
  ],
  media: {
    posterSrc: "/brand/about/about-belief-poster.jpg",
    alt: "Two women in a warm consultation room, a moment of connection.",
  },
} as const;

// ── Beat 04 — Founder Introduction (Section 04) ────────────────────────────

export const aboutFounderIntro = {
  eyebrow: "The Founder",
  introLabel: "Our Founder",
  founderName: "Dr. Santoshi Nandigam",
  founderCredentials: "Founder | Obstetrician & Gynaecologist",
  story:
    "The Birthwave was founded by Dr. Santoshi Nandigam with a vision to make women's healthcare more personal, attentive and connected.\n\nHer approach places importance on spending meaningful time with patients, understanding their concerns and involving them in decisions about their care.",
  quote:
    "I wanted to spend time understanding women rather than rushing through appointments. I wanted to create a safe space where they could share their concerns, understand their choices and feel involved in shaping their birth experience.",
  media: {
    posterSrc: "/brand/about/about-founder-poster.jpg",
    alt: "Founder portrait — Dr. Santoshi Nandigam",
  },
} as const;

/**
 * Architectural boundary: everything above is Sections 01–04 (cinematic
 * canvas). Everything below is normal, always-static editorial content.
 */

// ── Section 05 — The Story Behind The Birthwave ─────────────────────────────

export const aboutFounderStory = {
  eyebrow: "Our Founder's Vision",
  heading: "A space where women have time to be heard.",
  body: [
    "During her work in obstetrics and gynaecology, Dr. Santoshi Nandigam recognised the importance of giving women the time and attention they need during healthcare conversations.",
    "A consultation is not only about symptoms, examinations or treatment recommendations. It is also an opportunity to understand a woman's concerns, expectations, personal circumstances and questions.",
    "This belief became an important part of the vision behind The Birthwave.",
    "Dr. Santoshi wanted to create a space where women could speak openly, understand the reasons behind medical recommendations and participate in decisions about their health.",
    "For women preparing for labour and childbirth, this also means having the opportunity to discuss the birth experience they hope for, their preferences, their support needs and the options that may be appropriate for their pregnancy.",
    "Birth may not always follow a planned path. The Birthwave encourages conversations that respect individual preferences while recognising that clinical circumstances and recommendations can change.",
    "The same philosophy extends beyond pregnancy and childbirth to gynaecological health, fertility, recovery and other stages of women's wellness.",
    "The Birthwave brings these aspects of care together through an approach that considers both clinical needs and the person receiving care.",
  ],
  media: {
    src: "/images/web-ready/pregnancy.JPG",
    alt: "Dr. Santoshi Nandigam, founder of The Birthwave",
  },
  cta: {
    label: "Meet Dr. Santoshi",
    href: "/doctors/dr-santoshi-nandigam",
  },
} as const;

// ── Section 07 — How We Care ───────────────────────────────────────────────

export const aboutHowWeCare = {
  eyebrow: "How We Care",
  heading: "Care that begins with listening.",
  intro: [
    "Good healthcare involves clinical knowledge, clear communication and an understanding of the person receiving care.",
    "At The Birthwave, these principles guide our approach.",
  ],
  principles: [
    {
      index: "01",
      label: "Time to Listen",
      statement: [
        "Every woman's concerns and experiences deserve attention. We value meaningful conversations that help us understand your medical history, questions and personal needs.",
      ],
    },
    {
      index: "02",
      label: "A Holistic Approach to Women's Health",
      statement: [
        "Our approach considers medical needs alongside relevant aspects of nutrition, movement, pelvic health, emotional well-being and lifestyle.",
        "Supportive care is considered according to your individual needs, alongside appropriate medical assessment and treatment.",
      ],
    },
    {
      index: "03",
      label: "Informed Choices and Shared Decisions",
      statement: [
        "We believe women should understand the care being recommended to them.",
        "Our approach encourages clear explanations, questions and informed discussions about available options, benefits, risks and clinical considerations.",
      ],
    },
    {
      index: "04",
      label: "Care That Remains Connected",
      statement: [
        "Women's healthcare needs can change over time. Our aim is to support continuity between different stages and connect you with appropriate medical or allied-care professionals when needed.",
      ],
    },
  ],
} as const;

// ── Section 08 — Our Care Team ─────────────────────────────────────────────

export const aboutTeamPreview = {
  eyebrow: "Connected Expertise",
  heading: "Different areas of care. One shared approach.",
  paragraphs: [
    "The Birthwave brings together medical and allied-care professionals across women's health, fertility, obstetrics, paediatrics, pelvic health, lactation, nutrition and emotional well-being.",
    "Depending on your needs, different professionals may contribute to your care and provide guidance within their respective areas of expertise.",
    "Explore the people behind The Birthwave and learn more about their qualifications and areas of practice.",
  ],
  note:
    "The Birthwave brings together medical and allied-care professionals across women's health, fertility, obstetrics, paediatrics, pelvic health, lactation, nutrition and emotional well-being.\n\nDepending on your needs, different professionals may contribute to your care and provide guidance within their respective areas of expertise.\n\nExplore the people behind The Birthwave and learn more about their qualifications and areas of practice.",
  cta: {
    label: "Meet Our Doctors & Care Team",
    href: "/doctors",
  },
} as const;


// ── Section 11 — Final CTA ─────────────────────────────────────────────────

export const aboutAppointmentCta = {
  eyebrow: "Ready When You Are",
  heading: "Your healthcare journey deserves time, attention and understanding.",
  supporting:
    "Whether you are seeking women's healthcare, planning a pregnancy, preparing for childbirth or navigating recovery, The Birthwave offers a place to begin with a conversation.",
  primaryCta: {
    label: "Book a Consultation",
    href: "/contact",
  },
} as const;
