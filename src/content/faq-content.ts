/**
 * FAQ content — The Birth Wave
 *
 * Shared by the homepage FAQ section and the standalone /faq route, so a
 * question is only ever written once.
 */

export const faq = {
  // No eyebrow here by design — see docs/implementation-brief.md §14.
  heading: "Good to know.",
  // Questions approved verbatim (docs/implementation-brief.md §29),
  // replacing the earlier structural placeholders. Answers are original
  // copy written to match — kept general and non-clinical, and each one
  // echoes phrasing already approved elsewhere on the page (Journey's
  // stage copy, Care's principles) rather than inventing new claims,
  // credentials or numbers not established anywhere else in the project.
  items: [
    {
      question: "When should I book my first pregnancy consultation?",
      answer:
        "As early as you'd like — many people start the conversation during preconception planning, others once pregnancy is confirmed. There's no wrong time to begin.",
    },
    {
      question: "Does BirthWave support natural birth and VBAC?",
      answer:
        "Yes. Every birth plan is built around your individual circumstances and clinical needs, including natural birth and VBAC, worked through together with your care team.",
    },
    {
      question: "Can my partner attend birth-preparation sessions?",
      answer:
        "Yes — partners are welcome and encouraged to take part in preparation sessions alongside you.",
    },
    {
      question: "Does care continue after delivery?",
      answer:
        "Yes. Support continues through recovery — healing, feeding, movement and emotional wellbeing — not just through the pregnancy itself.",
    },
    {
      question: "Do you provide newborn and pediatric care?",
      answer:
        "Yes, care continues into newborn checkups, vaccinations and pediatric support.",
    },
  ],
  // Approved (docs/implementation-brief.md §32, now the right-column
  // visual panel's poster image — §36): one supporting editorial visual
  // for the homepage FAQ, not attached to any single question — see
  // faq-section.tsx. 1536×1024 (3:2), used at that exact ratio so nothing
  // crops. Meaningful (a real mother-and-newborn moment, not abstract
  // texture), so given a concise alt rather than left empty. Doubles as
  // the `poster` frame for a future looping video in that same panel —
  // see `FaqVisual` in faq-section.tsx for exactly how that swap would
  // slot in; no video asset exists yet, so none is added.
  media: {
    src: "/images/lower-sections/faq-support-visual.jpg",
    alt: "A mother holding her newborn in a warm, sunlit room.",
  },
} as const;
