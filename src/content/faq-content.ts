/**
 * FAQ content — The Birth Wave
 *
 * Shared by the homepage FAQ section and the standalone /faq route, so a
 * question is only ever written once.
 */

export const faq = {
  eyebrow: "Good to Know",
  heading: "Questions you may already have.",
  items: [
    {
      question: "When should I book my first pregnancy consultation?",
      answer:
        "You can arrange an antenatal consultation once your pregnancy is confirmed.\n\nIf you are planning a pregnancy, you can also seek preconception guidance to discuss your health, medical history, nutrition and any concerns before conception.",
    },
    {
      question: "I want to prepare for a vaginal birth. When should I start?",
      answer:
        "Birth preparation can begin during pregnancy. You do not need to wait until the final few weeks.\n\nChildbirth education can help you understand labour, breathing and comfort techniques, available birth options and how to communicate your birth preferences with your maternity care team.",
    },
    {
      question: "Does The BirthWave support natural birth?",
      answer:
        "The BirthWave provides consultations and guidance for women who wish to explore a natural or physiological approach to childbirth.\n\nNatural birth generally refers to an approach that supports physiological labour and aims to avoid unnecessary interventions while allowing appropriate medical care when needed.\n\nYour obstetrician can help you understand which options may be suitable for your pregnancy. No particular birth outcome can be guaranteed.",
    },
    {
      question: "I had a Caesarean birth before. Can I discuss VBAC?",
      answer:
        "Yes. VBAC stands for Vaginal Birth After Caesarean.\n\nSome women who have previously undergone a Caesarean birth may be suitable for a planned vaginal birth in a subsequent pregnancy.\n\nYour obstetrician will assess your previous birth history, current pregnancy and other medical factors before discussing whether VBAC may be appropriate.",
    },
    {
      question: "What is conscious pregnancy and conscious parenting?",
      answer:
        "Conscious pregnancy is an approach that encourages greater awareness of your physical health, emotions, lifestyle and changing needs during pregnancy.\n\nIt focuses on informed choices, mindful practices, emotional well-being and preparing thoughtfully for parenthood.\n\nConscious parenting extends this awareness into raising a child. It encourages parents to understand their child's emotional and developmental needs, communicate thoughtfully and respond with empathy.\n\nAt The BirthWave, these ideas can be explored through pregnancy education and parenting-related discussions.",
    },
    {
      question: "What is Garbh Sanskar, and how can it be part of pregnancy?",
      answer:
        "Garbh Sanskar is a traditional Indian approach to prenatal well-being that emphasises the mother's physical, mental and emotional experience during pregnancy.\n\nIt may include practices such as meditation, relaxation, music, reading, positive routines and mindful activities intended to support maternal well-being.\n\nAt The BirthWave, Garbh Sanskar may be explored as a complementary approach to pregnancy well-being.\n\nThese practices do not replace antenatal check-ups, medical treatment or recommended investigations, and claims about their effects on a child's future abilities or development should not be assumed.",
    },
    {
      question: "What is a doula, and how can a doula support childbirth?",
      answer:
        "A doula is a trained non-medical birth-support professional who provides emotional, physical and practical support during pregnancy, labour and sometimes after childbirth.\n\nA doula may help with relaxation, comfort measures, reassurance and communicating birth preferences.\n\nA doula does not replace an obstetrician, midwife or other medical professional.\n\nYou can discuss doula support with your maternity care team, including whether such support can be accommodated at your planned delivery facility.",
    },
    {
      question: "Can my partner be involved in birth preparation and birth planning?",
      answer:
        "Yes. Partner involvement is an important part of birth preparation for many families.\n\nYour partner can participate in discussions about labour, birth preferences, comfort techniques, emotional support and ways to be involved during childbirth.\n\nParticipation in childbirth education sessions and attendance during labour depend on the arrangements and policies of the relevant care facility.",
    },
    {
      question: "Can I discuss water birth at The BirthWave?",
      answer:
        "Yes. You can discuss water birth and water immersion during labour with your obstetrician.\n\nWater immersion during labour and delivering in water are different practices. Their suitability depends on your pregnancy, medical history and the circumstances of labour.\n\nYour care team can explain the relevant considerations and help you clarify whether appropriate facilities and clinical arrangements are available.",
    },
    {
      question: "Does care continue after childbirth?",
      answer:
        "Yes. The BirthWave provides postpartum-related consultations and support for physical recovery, breastfeeding, pelvic health and emotional and mental well-being.\n\nNewborn & Paediatric Care is also available for newborn health concerns, vaccination guidance, feeding, growth and development.\n\nFollow-up and additional care depend on the individual needs of the mother and child.",
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
    src: "/images/web-ready/faq.jpg",
    alt: "A mother holding her newborn in a warm, sunlit room.",
  },
} as const;
