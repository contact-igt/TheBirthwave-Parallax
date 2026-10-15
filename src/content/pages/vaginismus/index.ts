/**
 * Vaginismus & Intimate Wellness — landing page content & imagery.
 *
 * All content (text) and imagery (image paths/positions) for the Vaginismus
 * service page live here.
 */

// ─── IMAGERY ──────────────────────────────────────────────────────────────────

import type { HeroFocalPoint } from "@/lib/hero-focal-point";

export const vaginismusImagery = {
  hero: {
    src: "/images/generated/v-banner.png",
    alt: "Woman speaking privately with a clinician",
    focalPoint: {
      mobile: "68% 42%",
      desktop: "72% 42%",
    } satisfies HeroFocalPoint,
  },
  "who-this-is-for": {
    src: "/images/generated/v-consultation.png",
    alt: "Woman discussing an intimate wellness concern with a clinician",
    objectPosition: "50% 38%",
  },
  consultation: {
    src: "/images/generated/v-understanding.png",
    alt: "Patient and clinician discussing health questions together",
    objectPosition: "50% 40%",
  },
  "care-at-your-pace": {
    src: "/images/generated/v-discussion.png",
    alt: "Woman having a calm supportive consultation",
    objectPosition: "50% 38%",
  },
  "first-consultation": {
    src: "/images/generated/v-questions.png",
    alt: "Woman preparing questions before an intimate wellness appointment",
    objectPosition: "50% 40%",
  },
  practical: {
    src: "/images/generated/v-beforevisit.png",
    alt: "Woman preparing for an upcoming clinic visit",
    objectPosition: "50% 35%",
  },
} as const;

export type VaginismusImageKey = keyof typeof vaginismusImagery;

// ─── CONTENT ──────────────────────────────────────────────────────────────────

export const vaginismusHero = {
  eyebrow: "VAGINISMUS & INTIMATE WELLNESS",
  heading: "When penetration feels painful, difficult or impossible, you can talk about it.",
  supportingHeadline:
    "Vaginismus can involve involuntary tightening of the pelvic-floor muscles around the vaginal opening, making penetration, intimacy or vaginal examinations difficult or painful.",
  body:
    "At The BirthWave, you can begin with a private, respectful conversation about what you are experiencing. Our approach brings together gynaecological care, pelvic-floor physiotherapy and emotional well-being support according to your individual needs.",
  primaryCta: { label: "BOOK A PRIVATE CONSULTATION", href: "#vaginismus-enquiry" },
  secondaryCta: { label: "Understand Vaginismus ↓", href: "#vaginismus-what-is" },
} as const;

export const vaginismusWhatIs = {
  eyebrow: "UNDERSTANDING VAGINISMUS",
  heading: "It isn't simply about 'trying to relax.'",
  intro:
    "Vaginismus is a condition in which the muscles around the vaginal opening tighten involuntarily when penetration is attempted or anticipated. This can make sexual intercourse, vaginal examinations or tampon insertion painful, difficult or sometimes impossible.",
  internationalSources: {
    heading: "What do international medical sources say?",
    items: [
      {
        source: "The UK's National Health Service (NHS)",
        text: "Explains vaginismus as an automatic muscular reaction during attempted vaginal insertion.",
      },
      {
        source: "The American College of Obstetricians and Gynecologists (ACOG)",
        text: "Describes it as a reflex contraction of muscles around the vaginal opening.",
      },
    ],
  },
  evidence: {
    heading: "What does medical evidence say about treatment?",
    points: [
      "Pelvic-floor physiotherapy is an important component of vaginismus management, particularly when pelvic-floor muscle tightness or difficulty relaxing these muscles is present.",
      "Clinical expert consensus also supports pelvic-floor physiotherapy as a first-line treatment for high-tone pelvic-floor dysfunction.",
      "Depending on individual needs, treatment may combine pelvic-floor rehabilitation, psychological support, psychosexual therapy and gradual, guided exercises.",
    ],
  },
  subhead: "You may experience:",
  points: [
    "Pain, burning or discomfort during attempted penetration.",
    "Involuntary tightening or a feeling that penetration is blocked.",
    "Difficulty with penetrative intercourse or vaginal examinations.",
    "Fear or anxiety about penetration following painful experiences.",
    "Avoidance of intimacy because of anticipated discomfort.",
  ],
  closing:
    "You do not need to diagnose yourself before seeking help. A consultation can begin with understanding your symptoms and experiences.",
  references: {
    heading: "Medical references",
    items: [
      "NHS — Vaginismus",
      "ACOG — When Sex Is Painful",
      "Australian Journal of General Practice — Clinical Assessment and Management of Vaginismus (2024)",
    ],
  },
} as const;

export const vaginismusWho = {
  eyebrow: "IS THIS RELEVANT TO ME?",
  heading: "You can start with a conversation, even if you are not sure it is vaginismus.",
  intro: "This consultation may be relevant if:",
  points: [
    {
      title: "Penetration feels difficult or painful.",
      body: "You experience pain, tightness or difficulty during attempted penetration.",
    },
    {
      title: "Your body seems to tighten involuntarily.",
      body: "You experience pelvic-floor tightening even when you consciously try to relax.",
    },
    {
      title: "Intimate examinations feel difficult or distressing.",
      body: "Pelvic or vaginal examinations may feel painful, frightening or difficult to tolerate.",
    },
    {
      title: "You have not been able to have penetrative intercourse.",
      body: "Or intercourse has repeatedly been painful or difficult.",
    },
    {
      title: "You have started avoiding intimacy because you expect pain.",
      body: "Previous discomfort may make future attempts feel stressful or overwhelming.",
    },
    {
      title: "You are unsure what is happening.",
      body: "You do not need to arrive with a diagnosis. Understanding the concern is part of the consultation.",
    },
  ],
  onlineCounselling: {
    heading: "Is online counselling alone enough for vaginismus?",
    paragraphs: [
      "Online counselling can be valuable, particularly for education, emotional support and discussing concerns around intimacy.",
      "However, vaginismus can involve physical pelvic-floor muscle responses as well as emotional and psychological factors. Some women may benefit from an in-person pelvic-floor assessment and coordinated multidisciplinary care.",
    ],
  },
  comparisonTable: {
    heading: "Understanding different care approaches",
    headers: ["Area of care", "Online counselling-focused approach", "The BirthWave's coordinated care approach"],
    rows: [
      {
        area: "Initial discussion",
        online: "Consultation and symptom discussion remotely",
        birthwave: "In-person clinical consultation and individual assessment",
      },
      {
        area: "Pelvic-floor assessment",
        online: "Requires separate in-person arrangements when indicated",
        birthwave: "Pelvic-floor physiotherapy assessment can be coordinated",
      },
      {
        area: "Physical rehabilitation",
        online: "May require referral to a separate provider",
        birthwave: "Pelvic-floor rehabilitation can be included where appropriate",
      },
      {
        area: "Psychological support",
        online: "Counselling may be the main service",
        birthwave: "Psychological support can be coordinated alongside physical care",
      },
      {
        area: "Yoga and relaxation",
        online: "May include remote exercises or recommendations",
        birthwave: "Individualised yoga, breathing and relaxation guidance may be included",
      },
      {
        area: "Partner involvement",
        online: "Depends on the service",
        birthwave: "Individual and joint conversations may be arranged when appropriate",
      },
      {
        area: "Follow-up",
        online: "Depends on the provider and programme",
        birthwave: "Follow-up can be coordinated across the relevant care professionals",
      },
    ],
    summary: [
      "Both online and in-person approaches can have a role. The most appropriate care depends on your symptoms, needs, access to qualified professionals and clinical assessment.",
      "The important question is not simply whether care is online or offline. It is whether the support addresses the factors contributing to your individual experience.",
    ],
    cta: {
      label: "DISCUSS YOUR CARE OPTIONS",
      href: "#vaginismus-enquiry",
    },
  },
  imageKey: "who-this-is-for" as const,
} as const;

export const vaginismusFeelHeard = {
  eyebrow: "WHEN SEEKING HELP HAS FELT DIFFICULT",
  heading: "If a previous consultation left you feeling unheard, your next conversation can begin differently.",
  paragraphs: [
    "Talking about painful intimacy is not always easy.",
    "Some women seeking help for vaginismus have experienced uncomfortable examinations, dismissive responses or advice that did not adequately address their concerns.",
    "Being told to relax, tolerate discomfort or simply keep trying can leave a woman feeling misunderstood, anxious or hesitant about seeking further help.",
    "For some, this hesitation may continue for months or years. The thought of meeting another gynaecologist can itself become overwhelming.",
    "At The BirthWave, we want your concerns to be taken seriously.",
    "You can begin by explaining what you have experienced, what has been difficult and what you are comfortable discussing.",
    "You can ask why an examination or treatment is being suggested. You can discuss previous experiences, express your concerns and make informed decisions about your care.",
    "A history of painful penetration or an uncomfortable medical experience deserves thoughtful assessment, not assumptions.",
    "You deserve clear explanations, respect and an opportunity to participate in decisions about your body.",
  ],
  cta: {
    label: "BEGIN WITH A PRIVATE CONVERSATION",
    href: "#vaginismus-enquiry",
  },
} as const;

export const vaginismusCovers = {
  eyebrow: "YOUR FIRST VISIT, AT YOUR PACE",
  heading: "Your first appointment begins with listening, not assumptions.",
  intro: [
    "You do not need to arrive prepared for an examination or know exactly how to explain your symptoms.",
    "Your first visit is an opportunity to discuss what has been happening, understand possible reasons for your discomfort and explore what support may be appropriate.",
  ],
  imageKey: "consultation" as const,
  steps: [
    {
      number: "01",
      title: "Tell us what you are experiencing",
      body: "Talk about pain, tightness, penetration difficulties, concerns around intimacy or previous medical experiences in your own words.",
    },
    {
      number: "02",
      title: "Share your relevant history",
      body: "Your clinician may ask about your gynaecological, pelvic, sexual and medical history where relevant. You can discuss any questions or concerns about sharing sensitive information.",
    },
    {
      number: "03",
      title: "Discuss your comfort and preferences",
      body: "If previous examinations have been distressing, you can explain this. You can ask what any proposed assessment involves before deciding whether to proceed.",
    },
    {
      number: "04",
      title: "Understand the possible next steps",
      body: "Depending on your individual circumstances, your clinician may discuss pelvic-floor physiotherapy, psychological support, additional assessment or other appropriate care.",
    },
    {
      number: "05",
      title: "Plan your care together",
      body: "If further support is indicated, the team can discuss which professionals may be involved and how appointments or follow-up may be coordinated.",
    },
  ],
  note: "You can ask questions throughout your consultation. Any intimate examination requires your informed consent, and your concerns should be addressed before proceeding.",
  cta: {
    label: "BOOK YOUR FIRST CONSULTATION",
    href: "#vaginismus-enquiry",
  },
} as const;

export const vaginismusSupportWork = {
  eyebrow: "INDIVIDUALISED, MULTIDISCIPLINARY CARE",
  heading: "Vaginismus care is not one-size-fits-all.",
  intro: [
    "Vaginismus can involve physical, psychological and relationship-related factors. Understanding these different aspects helps guide an individual treatment plan.",
    "At The BirthWave, our approach may involve different care professionals working together according to your assessment, preferences and clinical needs.",
  ],
  pillars: [
    {
      number: "01",
      title: "Gynaecological Assessment",
      subhead: "Understanding the medical picture.",
      paragraphs: [
        "The first step is understanding your symptoms and considering whether vaginismus, pelvic-floor dysfunction or another condition may be contributing to your discomfort.",
        "Your clinician may discuss your medical history, menstrual and reproductive health, pain symptoms and concerns around penetration.",
        "Where necessary, further investigation or specialist assessment may be recommended.",
      ],
    },
    {
      number: "02",
      title: "Pelvic-Floor Physiotherapy",
      subhead: "Helping you understand and work with your pelvic-floor muscles.",
      paragraphs: [
        "Pelvic-floor muscles may tighten involuntarily or have difficulty relaxing in women experiencing vaginismus.",
        "A specialist pelvic-floor physiotherapist can assess muscle function and discuss appropriate rehabilitation techniques.",
        "Depending on your needs, care may include pelvic-floor awareness, breathing, relaxation, muscle coordination and gradual exercises.",
        "When appropriate and with your agreement, vaginal trainers or other graded rehabilitation methods may be discussed.",
        "The aim is to improve pelvic-floor function and address physical factors contributing to discomfort. Exercises and progression are individualised rather than following a fixed schedule.",
      ],
    },
    {
      number: "03",
      title: "Psychological & Emotional Support",
      subhead: "Addressing emotional concerns alongside physical symptoms.",
      paragraphs: [
        "Painful experiences, fear of penetration, relationship concerns or distress about intimacy can affect emotional well-being.",
        "Psychological support can help you explore these concerns and develop ways to manage anxiety, avoidance and distress.",
        "The goal is not to suggest that pain is imaginary or solely psychological. Physical and emotional experiences can influence each other, and both deserve appropriate attention.",
      ],
    },
    {
      number: "04",
      title: "Psychosexual Support & Sex Therapy",
      subhead: "Understanding intimacy beyond penetration.",
      paragraphs: [
        "Some women may benefit from support focused on sexual well-being, body awareness, expectations, communication and concerns surrounding sexual activity.",
        "Appropriate psychosexual counselling or therapy may help address fear, avoidance and difficulties with intimacy.",
        "This support can also explore comfort, pleasure, personal boundaries and different forms of physical intimacy.",
        "Any such care should be provided by an appropriately qualified professional and tailored to your individual needs.",
      ],
    },
    {
      number: "05",
      title: "Yoga, Breathing & Meditation",
      subhead: "Supportive practices for relaxation and body awareness.",
      paragraphs: [
        "Yoga, guided breathing, mindfulness and meditation may be considered as supportive elements of care.",
        "These practices may help with stress management, relaxation and awareness of physical tension.",
        "Their role is complementary. They do not replace appropriate gynaecological assessment, pelvic-floor rehabilitation or psychological care when these are indicated.",
        "Activities should be adapted to your comfort and medical suitability.",
      ],
    },
    {
      number: "06",
      title: "Partner Involvement & Couple Counselling",
      subhead: "When intimacy affects a relationship, communication matters.",
      paragraphs: [
        "Vaginismus can also affect communication, expectations and intimacy within a relationship.",
        "With your agreement, the team may discuss involving your partner in appropriate educational or counselling sessions.",
        "Individual discussions may be arranged separately when sensitive or personal concerns need to be explored.",
        "Joint sessions may focus on communication, understanding physical discomfort, respecting boundaries and discussing ways to support each other.",
        "Partner participation is optional and should reflect your comfort and preferences.",
      ],
    },
    {
      number: "07",
      title: "Follow-up & Individual Progression",
      subhead: "Care adapted to your response.",
      paragraphs: [
        "The duration and combination of support depend on your symptoms, assessment and response to care.",
        "Some women may require more attention to pelvic-floor rehabilitation, while others may benefit from additional emotional, psychological or relationship-related support.",
        "Progress is reviewed according to individual circumstances. A fixed number of sessions or a specific outcome cannot be guaranteed.",
      ],
    },
  ],
  cta: {
    label: "TALK TO OUR CARE TEAM",
    href: "#vaginismus-enquiry",
  },
} as const;

export const vaginismusWholePerson = {
  eyebrow: "UNDERSTANDING WHOLE-PERSON CARE",
  heading: "Physical comfort and emotional well-being are both part of the conversation.",
  intro: [
    "Vaginismus is not always explained by one factor alone.",
    "For some women, pelvic-floor muscle overactivity may be prominent. For others, fear, previous painful experiences, relationship concerns or other medical conditions may also require attention.",
    "Different professionals contribute different areas of expertise.",
  ],
  domains: [
    {
      title: "Gynaecological care",
      description: "Helps evaluate symptoms, consider other possible medical causes and guide clinical decisions.",
    },
    {
      title: "Pelvic-floor physiotherapy",
      description: "Focuses on muscle function, relaxation, coordination and appropriate physical rehabilitation.",
    },
    {
      title: "Psychological support",
      description: "Provides space to address distress, anxiety, avoidance and emotional experiences associated with intimacy.",
    },
    {
      title: "Psychosexual and relationship support",
      description: "Can help address concerns around sexual well-being, communication, expectations and partner involvement.",
    },
    {
      title: "Yoga and mind-body practices",
      description: "May provide additional relaxation and stress-management support alongside appropriate clinical care.",
    },
  ],
  closing: [
    "Not every woman requires every type of support.",
    "The purpose of multidisciplinary care is to identify what is relevant to each individual rather than prescribing the same programme to everyone.",
  ],
} as const;

export const vaginismusPace = {
  eyebrow: "YOUR COMFORT MATTERS",
  heading: "Nothing should move faster than you are comfortable with.",
  body: "A consultation should give you room to understand what is being discussed, ask questions and make informed decisions about your care.",
  imageKey: "care-at-your-pace" as const,
  points: [
    {
      title: "START WITH CONVERSATION",
      body: "Your first step can simply be talking about what you have been experiencing.",
    },
    {
      title: "ASK BEFORE PROCEEDING",
      body: "You can ask what an assessment involves, why it is being suggested and what alternatives may be available.",
    },
    {
      title: "DISCUSS YOUR COMFORT",
      body: "Tell your clinician about concerns, previous difficult experiences or boundaries relevant to your care.",
    },
    {
      title: "MOVE STEP BY STEP",
      body: "Any further assessment or therapy should be based on your individual needs and discussed with you beforehand.",
    },
  ],
  note: "Specific assessments and treatment approaches depend on your clinical circumstances, and informed consent is required before intimate examination or treatment.",
} as const;

export const vaginismusClinicians = {
  eyebrow: "THE PEOPLE BEHIND YOUR CARE",
  heading: "Different areas of expertise, working around your individual needs.",
  intro:
    "The BirthWave's vaginismus and intimate wellness approach brings together medical and allied-care professionals to address different aspects of pelvic and sexual well-being.",
  team: [
    {
      slug: "dr-santoshi-nandigam",
      name: "Dr. Santoshi Nandigam",
      role: "Founder | Obstetrician & Gynaecologist",
      credentials: "MBBS, DNB — Obstetrics & Gynaecology",
      description:
        "Provides gynaecological assessment and clinical guidance for women experiencing concerns related to vaginismus, painful intimacy and reproductive health.\n\nHer role includes understanding the medical context, discussing relevant care options and coordinating further support where appropriate.",
      cta: { label: "VIEW PROFILE", href: "/doctors/dr-santoshi-nandigam" },
    },
    {
      slug: "dr-adithi-nair",
      name: "Dr. Adithi Nair",
      role: "Pelvic Floor Physiotherapy | Vaginismus Rehabilitation",
      credentials: "",
      description:
        "Focuses on understanding pelvic-floor muscle function and guiding suitable physical rehabilitation for women experiencing pelvic-floor tightness, pain or difficulty with penetration.\n\nCare may include muscle awareness, relaxation, coordination and gradual rehabilitation techniques according to assessment and comfort.",
      cta: { label: "VIEW PROFILE", href: "/doctors/dr-adithi-nair" },
    },
    {
      slug: "dr-amudha-varshini",
      name: "Dr. Amudha Varshini",
      role: "BNYS | Naturopathy & Yoga Specialist",
      credentials: "BNYS",
      description:
        "Provides relevant supportive guidance involving yoga, breathing, relaxation and mind-body practices.\n\nThese approaches may complement other forms of vaginismus care where appropriate and medically suitable.",
      cta: { label: "VIEW PROFILE", href: "/doctors/dr-amudha-varshini" },
    },
    {
      slug: "deepa",
      name: "Deepa",
      role: "M.Sc. Psychology | Emotional Well-being Support",
      credentials: "M.Sc. Psychology",
      description:
        "Supports conversations around emotional well-being, anxiety, distress and experiences that may affect intimacy.\n\nPsychological support may be coordinated with other care professionals based on individual needs.",
      cta: { label: "VIEW PROFILE", href: "/doctors/deepa" },
    },
  ],
  closing:
    "Your care plan may involve one or more professionals. The appropriate combination of support depends on your individual assessment and preferences.",
  cta: { label: "BOOK A CONSULTATION", href: "#vaginismus-enquiry" },
} as const;

export const vaginismusFirstConsultation = {
  eyebrow: "YOUR FIRST CONVERSATION",
  heading: "You don't need to know exactly what is wrong before booking.",
  imageKey: "first-consultation" as const,
  steps: [
    {
      number: "01",
      title: "TELL US WHAT BRINGS YOU IN",
      body: "Share as much or as little as you are comfortable with about what has been difficult.",
    },
    {
      number: "02",
      title: "TALK THROUGH YOUR CONCERNS",
      body: "Ask questions about pain, penetration, pelvic-floor tightness, intimacy or examinations.",
    },
    {
      number: "03",
      title: "UNDERSTAND YOUR OPTIONS",
      body: "Your clinician can explain whether further assessment, pelvic-floor therapy or another form of support may be appropriate.",
    },
  ],
  cta: { label: "BOOK A PRIVATE CONSULTATION", href: "#vaginismus-enquiry" },
} as const;

export const vaginismusPractical = {
  eyebrow: "BEFORE YOU VISIT",
  heading: "Know what to expect before your appointment.",
  info: [
    {
      label: "Consultation location",
      lines: [
        "The BirthWave",
        "No. 8/15, Mahalingapuram Main Road, Nungambakkam, Chennai – 600034",
      ],
    },
    {
      label: "Care professionals",
      lines: [
        "Consultations and follow-up may involve the relevant gynaecological and allied-care professionals according to your needs.",
      ],
    },
    {
      label: "Booking process",
      lines: [
        "Book your consultation by phone, WhatsApp or through the website enquiry form.",
      ],
    },
    {
      label: "Consultation fee",
      lines: [
        "The team can confirm the applicable consultation fee before booking.",
      ],
    },
    {
      label: "What to bring",
      lines: [
        "If you have relevant previous reports, prescriptions or medical records, the team can let you know whether they would be useful for your appointment.",
      ],
    },
    {
      label: "Contact",
      lines: ["+91 93630 31925"],
    },
  ],
  phone: "+91 93630 31925",
  cta: { label: "BOOK A PRIVATE CONSULTATION", href: "#vaginismus-enquiry" },
} as const;

export const vaginismusFaq = {
  eyebrow: "GOOD TO KNOW",
  heading: "Questions about vaginismus, intimacy and your consultation.",
  items: [
    {
      question: "1. What is vaginismus?",
      answer:
        "Vaginismus involves involuntary tightening of the muscles around the vaginal opening when penetration is attempted or anticipated. This can make intercourse, tampon insertion or vaginal examinations painful or difficult.",
    },
    {
      question: "2. How do I know if I have vaginismus?",
      answer:
        "Pain, tightness or difficulty with penetration can have different causes. A healthcare professional can assess your symptoms and discuss whether vaginismus or another condition may be contributing to them.",
    },
    {
      question: "3. Is vaginismus curable?",
      answer:
        "Vaginismus is a treatable condition, and many women experience improvement with appropriate support. Management may involve pelvic-floor physiotherapy, psychological support and other individualised approaches. The response and time required vary from person to person.",
    },
    {
      question: "4. Am I the only woman experiencing this?",
      answer:
        "No. Other women experience vaginismus and difficulties with penetration. It can be a sensitive subject, so it may not be discussed openly. You are not alone in having these concerns.",
    },
    {
      question: "5. Why does intercourse seem easy for my friends but difficult for me?",
      answer:
        "Every woman's body, pelvic-floor response and experience of intimacy are different. Difficulty with penetration does not mean you are doing something wrong. Understanding the reasons for your discomfort is more useful than comparing your experience with someone else's.",
    },
    {
      question: "6. Will I ever be able to enjoy sex?",
      answer:
        "Women with vaginismus can experience sexual pleasure, and appropriate care may help address difficulties affecting intimacy. Sexual well-being involves more than penetration, and individual experiences and responses to treatment vary.",
    },
    {
      question: "7. Do women experience pleasure during sex?",
      answer:
        "Yes, sexual pleasure is a normal experience for many women. However, pleasure differs from person to person and does not depend solely on vaginal penetration. Pain or difficulty with penetration does not necessarily prevent enjoyment of other forms of intimacy.",
    },
    {
      question: "8. Will I ever be able to get pregnant if I have vaginismus?",
      answer:
        "Vaginismus does not necessarily affect fertility directly, but difficulty with penetration may make attempts to conceive more challenging. Your clinician can discuss reproductive health, fertility concerns and appropriate options based on your circumstances. Pregnancy cannot be guaranteed by vaginismus treatment.",
    },
    {
      question: "9. Can I have a vaginal delivery if I have vaginismus?",
      answer:
        "Vaginismus does not automatically mean that vaginal delivery is impossible. Birth options depend on your pregnancy, obstetric history, clinical circumstances and the well-being of you and your baby. Discussing vaginismus during antenatal care can help your maternity team consider your concerns when planning for birth.",
    },
    {
      question: "10. Do I need to have attempted intercourse before seeking help?",
      answer:
        "No. You can seek help if you experience fear, pain or difficulty with anticipated penetration, tampon insertion or vaginal examinations, even if you have not attempted intercourse.",
    },
    {
      question: "11. Will I need an internal examination during my first appointment?",
      answer:
        "Not necessarily. Your clinician can begin by discussing your history and symptoms. Any proposed intimate examination should be explained, its relevance discussed and your informed consent obtained before proceeding.",
    },
    {
      question: "12. Is vaginismus treatment painful?",
      answer:
        "Management should be adapted to your symptoms and tolerance. Some assessment or rehabilitation techniques may cause temporary discomfort, but treatment should not involve forcing painful penetration. You should be able to discuss discomfort and ask for adjustments throughout care.",
    },
    {
      question: "13. How many sessions will I need?",
      answer:
        "The number of sessions depends on your symptoms, the type of support required and your progress. The care team can discuss a suitable follow-up plan after assessment.",
    },
    {
      question: "14. Is online counselling enough to treat vaginismus?",
      answer:
        "Online counselling may be helpful, particularly for psychological support and education. However, women experiencing pelvic-floor muscle tightness or related physical symptoms may also benefit from specialist pelvic-floor assessment and rehabilitation. The most suitable approach depends on individual needs.",
    },
    {
      question: "15. Will I need pelvic-floor physiotherapy?",
      answer:
        "Pelvic-floor physiotherapy is commonly considered when muscle tightness, overactivity or difficulty relaxing the pelvic floor contributes to symptoms. Your clinician can discuss whether this is relevant to you following assessment.",
    },
    {
      question: "16. Will I need psychological counselling or sex therapy?",
      answer:
        "Not everyone requires the same support. Psychological or psychosexual care may be helpful when anxiety, distress, painful experiences or relationship concerns are contributing to difficulties. These options can be discussed as part of an individual care plan.",
    },
    {
      question: "17. Can I bring my partner or a support person?",
      answer:
        "You can ask about involving a partner or someone you trust. Individual and joint discussions may be considered according to your needs, consent and the service arrangements.",
    },
    {
      question: "18. What if I had an upsetting experience with a previous gynaecologist?",
      answer:
        "You can share this concern with the team. Previous difficult experiences may affect your comfort with examinations and consultations. Discussing your concerns can help the clinician explain options and plan an approach that considers your needs.",
    },
    {
      question: "19. Is my consultation confidential?",
      answer:
        "Medical consultations are subject to professional confidentiality and applicable privacy requirements. You can ask how sensitive information is documented, used and shared within your care team.",
    },
    {
      question: "20. Can I ask questions before agreeing to an examination or treatment?",
      answer:
        "Yes. You have the right to understand why an examination or treatment is recommended, ask about alternatives and make informed decisions about your care.",
    },
  ],
} as const;

export const vaginismusRelatedCare = {
  eyebrow: "CONNECTED WOMEN'S HEALTH SUPPORT",
  heading: "Other BirthWave services that may be relevant to your care.",
  note: "These services may also connect with your care journey. They are separate services and are not automatically included in vaginismus support.",
  items: [
    {
      slug: "gynaecology",
      label: "Gynaecology & Women's Health",
      description: "For menstrual, pelvic and other gynaecological concerns.",
    },
    {
      slug: "fertility-preconception",
      label: "Fertility & Preconception",
      description: "For reproductive-health assessment, pregnancy planning and fertility-related guidance.",
    },
    {
      slug: "pregnancy-antenatal-care",
      label: "Pregnancy & Antenatal Care",
      description: "Doctor-led pregnancy care and preparation, including discussions about pelvic health and birth-related concerns.",
    },
    {
      slug: "nutrition-emotional-wellbeing",
      label: "Mental & Emotional Well-being",
      description: "Support for emotional and psychological concerns relevant to your overall well-being.",
    },
  ],
} as const;

export const vaginismusEnquiry = {
  eyebrow: "START WHEN YOU FEEL READY",
  heading: "You can begin with a private conversation.",
  body:
    "If penetration, intimacy or vaginal examinations have been painful or difficult, you do not need to work out the reason on your own before seeking help.\n\nStart by telling us what you are comfortable sharing. The BirthWave team can help you understand the appropriate next step.",
  primaryCta: "BOOK A PRIVATE CONSULTATION",
  whatsapp: "CHAT ON WHATSAPP",
  phone: "CALL +91 93630 31925",
  dropdownOptions: [
    "Vaginismus consultation",
    "Pelvic-floor concerns",
    "Intimate wellness",
    "Not sure yet",
  ],
  fields: {
    name: "Full name",
    contact: "Phone number",
    helpOption: "What would you like help with?",
    email: "Email (optional)",
    message: "What would you like to discuss? (optional)",
  },
  submitLabel: "CONTINUE ON WHATSAPP",
  disclaimer:
    "Please avoid sharing detailed medical records or sensitive health information through this initial enquiry form.",
  urgentNote:
    "This form is intended for appointment information and non-urgent enquiries. For urgent medical concerns, contact an appropriate healthcare provider or emergency service.",
  previewNotice: "Preview — this form is not yet connected to a live enquiry inbox.",
  previewResult:
    "This is a design preview. No enquiry has been sent — connect this form to a real enquiry endpoint before publishing.",
} as const;

export const vaginismusMobileCta = {
  label: "Book a Private Consultation",
  href: "#vaginismus-enquiry",
} as const;
