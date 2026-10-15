export const servicesOverviewImagery = {
  hero: {
    src: "/images/services/heroservice.jpg",
    alt: "A mother cradles her sleeping newborn beside a softly lit window.",
  },
  careFinderYourHealth: {
    src: "/images/services/health.jpg",
    alt: "A woman discusses her health with a clinician in a calm consultation room.",
  },
  careFinderPregnancyBirth: {
    src: "/images/services/service3.jpg",
    alt: "A couple in a consultation discussing pregnancy and birth options.",
  },
  careFinderAfterBirthBaby: {
    src: "/images/services/service4.jpg",
    alt: "A mother holds her newborn during a consultation.",
  },
  careJourneyWomensHealth: {
    src: "/images/services/health.jpg",
    alt: "A woman discusses her health and wellbeing with a clinician in a calm consultation room.",
  },
  careJourneyPlanningPregnancy: {
    src: "/images/services/service7.jpg",
    alt: "A couple talks with a clinician about planning a pregnancy.",
  },
  careJourneyPregnancyCare: {
    src: "/images/services/service4.jpg",
    alt: "A pregnant woman talks with a clinician during an antenatal consultation.",
  },
  careJourneyPreparingBirth: {
    src: "/images/services/needscare.JPG",
    alt: "An expectant couple practises calm breathing with a childbirth educator.",
  },
  careJourneyBirthOptions: {
    src: "/images/services/service1.JPG",
    alt: "An expectant couple discusses birth plans and options with a clinician.",
  },
  careJourneyAfterBirth: {
    src: "/images/services/afterbirth.JPG",
    alt: "A mother holds her newborn during a feeding-support consultation.",
  },
  careJourneyBabyCare: {
    src: "/images/services/planning2.JPG",
    alt: "Parents hold their newborn during a conversation with a paediatric clinician.",
  },
  birthApproach: {
    src: "/images/services/service2.jpg",
    alt: "An expectant couple discusses birth preferences and options with a clinician.",
  },
} as const;

export type ServicesOverviewImageKey = keyof typeof servicesOverviewImagery;
