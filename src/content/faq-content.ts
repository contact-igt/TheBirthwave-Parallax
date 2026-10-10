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
        "You can book once your pregnancy is confirmed, or speak with the team earlier if you're planning a pregnancy and would like preconception guidance.",
    },
    {
      question: "I want to prepare for a vaginal birth. When should I start?",
      answer:
        "You don't need to wait until the final weeks. Birth preparation can begin during pregnancy, giving you time to understand labour, ask questions and discuss your preferences with your care team.",
    },
    {
      question: "Does BirthWave support natural birth?",
      answer:
        "BirthWave can discuss your preferences for labour and birth and help you understand what may be appropriate for your pregnancy. Because every pregnancy and labour is different, your care plan remains individual to you and your baby's needs.",
    },
    {
      question: "What is conscious pregnancy and conscious parenting?",
      answer:
        "Conscious pregnancy is about being more aware of your physical, emotional and mental well-being throughout pregnancy. Conscious parenting continues that approach after birth, helping parents respond to their baby with awareness, connection and confidence.",
    },
    {
      question: "What is Garbh Sanskar, and how can it support pregnancy?",
      answer:
        "Garbh Sanskar is a prenatal wellness approach that may include relaxation, meditation, music, positive routines, nutrition and bonding practices during pregnancy. At The Birthwave, it can be incorporated as part of supportive pregnancy care based on your preferences.",
    },
    {
      question: "What does a doula do during pregnancy and birth?",
      answer:
        "A doula provides non-medical emotional, physical and practical support during pregnancy, labour and birth. They can help with comfort measures, preparation, communication and continuous support alongside your medical care team.",
    },
    {
      question: "I had a C-section before. Can I discuss VBAC?",
      answer:
        "Yes. If you've previously had a Caesarean birth, you can discuss your options for this pregnancy with your obstetrician. Whether VBAC may be appropriate requires an individual assessment of your previous birth history and current pregnancy.",
    },
    {
      question: "Can my partner be involved in birth preparation?",
      answer:
        "Yes. Your partner can be part of birth-preparation conversations and sessions so they can better understand how to support you through pregnancy and labour.",
    },
    {
      question: "Does care continue after my baby is born?",
      answer:
        "Yes. BirthWave's care extends into postpartum recovery, breastfeeding support and newborn and paediatric care.",
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
