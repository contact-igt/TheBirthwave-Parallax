/**
 * Pregnancy & Antenatal Care — dedicated landing page content.
 *
 * Full approved copy covering all 10 sections:
 * SECTION 1 — HERO
 * SECTION 2 — MORE THAN A CHECK-IN
 * SECTION 3 — WHAT ANTENATAL CARE MAY INCLUDE
 * SECTION 4 — YOUR FIRST PREGNANCY CONSULTATION
 * SECTION 5 — DOCTOR SECTION (Dr. Santoshi Nandigam)
 * SECTION 6 — THE BIRTHWAVE APPROACH
 * SECTION 7 — FAQs (12 comprehensive questions & answers)
 * SECTION 8 — PLAN YOUR VISIT
 * SECTION 9 — FINAL CONVERSION SECTION (Enquiry Form)
 * SECTION 10 — RELATED CARE (8 services)
 */

export const pregnancyLandingHero = {
  eyebrow: "PREGNANCY & ANTENATAL CARE",
  headingLines: ["Care for your pregnancy.", "Clarity for what comes next."],
  supportingLine: "Medical care, guidance and support throughout your pregnancy.",
  body: [
    "From your first positive pregnancy test to the weeks leading up to birth, antenatal care helps you understand how your pregnancy is progressing, monitor your health and prepare for the journey ahead.",
    "At The Birthwave, pregnancy care brings together obstetric consultations, pregnancy monitoring, guidance on recommended tests and scans, nutrition, physical and emotional wellbeing, and preparation for childbirth.",
    "Every pregnancy is different. Your care is planned around your medical needs, personal concerns and the changes that happen along the way.",
  ],
  primaryCta: { label: "REQUEST A CONSULTATION ↗", href: "#appointment" },
  secondaryCta: { label: "Explore Your First Visit ↗", href: "#pregnancy-first" },
  location: "The Birthwave · Nungambakkam, Chennai",
} as const;

export const pregnancyLandingIntro = {
  eyebrow: "MORE THAN A CHECK-IN",
  heading: ["Care for the pregnancy.", "Space for the person."],
  paragraphs: [
    "Antenatal care is more than attending appointments and completing scans. It is an ongoing conversation about your health, your baby's development, how you're feeling and what you may need as pregnancy progresses.",
    "At The Birthwave, your consultations are also a space to discuss everyday concerns, including symptoms, food, sleep, physical activity, emotional changes and preparation for childbirth.",
  ],
  points: [
    {
      number: "01",
      title: "Understand your pregnancy",
      body: "Learn about the changes happening during pregnancy, recommended check-ups and what your care plan involves.",
    },
    {
      number: "02",
      title: "Ask what matters to you",
      body: "Discuss symptoms, concerns, preferences and the questions you have between appointments, with time to understand the information being shared.",
    },
    {
      number: "03",
      title: "Prepare for what comes next",
      body: "Plan for the next stage of pregnancy and gradually explore labour, childbirth, newborn care and postpartum recovery.",
    },
  ],
} as const;

export const pregnancyLandingCareIncludes = {
  eyebrow: "WHAT YOUR CARE MAY INCLUDE",
  heading: ["Different stages.", "Connected care."],
  supportingLine:
    "From medical check-ups to everyday wellbeing, pregnancy care considers both your clinical needs and the support you may find helpful.",
  groups: [
    {
      tag: "Keeping track of your pregnancy",
      items: [
        {
          number: "01",
          title: "Regular Antenatal Consultations",
          body: "Review your health, symptoms and pregnancy progress through scheduled consultations. Your doctor may assess blood pressure, discuss your baby's growth and recommend further monitoring based on your stage of pregnancy.",
        },
        {
          number: "02",
          title: "Laboratory Tests, Scans & Screening",
          body: "Understand which blood tests, urine tests, ultrasound scans and pregnancy screenings may be recommended, when they are needed and what the results mean for your care.",
        },
      ],
    },
    {
      tag: "Supporting your wellbeing",
      items: [
        {
          number: "03",
          title: "Pregnancy Nutrition & Supplements",
          body: "Discuss balanced nutrition, folic acid, iron and other supplements as advised by your doctor. Nutrition guidance can also consider nausea, appetite changes, dietary preferences and individual health conditions.",
        },
        {
          number: "04",
          title: "Pregnancy Movement, Physiotherapy & Fitness",
          body: "Explore pregnancy-appropriate activity, guided movement, physiotherapy, yoga and strength and conditioning support where medically suitable. The focus is on maintaining physical wellbeing and adapting activity to your changing needs.",
        },
        {
          number: "05",
          title: "Mental & Emotional Wellbeing",
          body: "Pregnancy can bring emotional changes alongside physical ones. Discuss stress, anxiety, sleep concerns or other emotional difficulties, with access to appropriate psychological support when needed.",
        },
        {
          number: "06",
          title: "Conscious Pregnancy & Garbh Sanskar",
          body: "Explore mindfulness, relaxation, breathing practices, music and activities that may support emotional wellbeing and your personal connection with pregnancy. These practices complement, rather than replace, medical antenatal care.",
        },
      ],
    },
    {
      tag: "Preparing for childbirth",
      items: [
        {
          number: "07",
          title: "Birth Preparation & Childbirth Education",
          body: "Learn about labour, birth options, comfort measures, pain-relief choices and newborn care through childbirth education and preparation sessions.",
        },
        {
          number: "08",
          title: "Birth Preferences & Partner Involvement",
          body: "Discuss what matters to you during birth, how your partner or chosen support person may participate, and how preferences can be considered alongside your individual medical needs.",
        },
      ],
    },
  ],
  importantNote:
    "Your consultation schedule, investigations and recommendations are individualised. Not every test, therapy or supportive service is required for every pregnancy, and additional services may involve separate appointments.",
} as const;

export const pregnancyLandingFirstConsultation = {
  eyebrow: "YOUR FIRST CONSULTATION",
  heading: "It starts with understanding you.",
  body: "Whether you've just discovered you're pregnant or are considering transferring your pregnancy care to The Birthwave, your first consultation is an opportunity to talk about your health, pregnancy and questions.",
  steps: [
    {
      tag: "01 — LISTEN",
      title: "Discuss your health & pregnancy",
      body: "Talk about your medical history, previous pregnancies, current symptoms, medications, lifestyle and any concerns you may have.",
    },
    {
      tag: "02 — REVIEW",
      title: "Understand your existing records",
      body: "Your doctor can review previous prescriptions, blood tests, ultrasound scans and pregnancy records to understand the care you have already received.",
    },
    {
      tag: "03 — PLAN",
      title: "Know your next steps",
      body: "Discuss the investigations, supplements, follow-up appointments and monitoring that may be appropriate for your pregnancy.",
    },
  ],
  beforeAppointmentNote:
    "If available, bring your previous medical records, scan reports, test results and a list of medicines or supplements you currently take.",
} as const;

export const pregnancyLandingClinician = {
  eyebrow: "DOCTOR-LED PREGNANCY CARE",
  heading: "Know who you'll be speaking with.",
  doctor: {
    slug: "dr-santoshi-nandigam",
    name: "Dr. Santoshi Nandigam",
    credentials: "MBBS, DNB — Obstetrics & Gynaecology",
    role: "Founder · Obstetrician & Gynaecologist",
    bio: [
      "Dr. Santoshi Nandigam's approach to pregnancy care centres on understanding each woman's health, explaining available options and making space for questions throughout the pregnancy.",
      "From antenatal consultations to discussions about labour and birth preferences, the focus is on individualised medical guidance, informed decisions and continuity of care.",
    ],
    photo: "/images/doctors/dr-santoshi.JPG",
    cta: {
      label: "VIEW DOCTOR PROFILE ↗",
      href: "/doctors/dr-santoshi-nandigam",
    },
  },
} as const;

export const pregnancyLandingApproach = {
  eyebrow: "THE BIRTHWAVE APPROACH",
  heading: ["Know what's happening.", "Know what comes next."],
  supportingLine:
    "Pregnancy care should help you understand the recommendations being made and feel involved in decisions about your health.",
  imageKey: "pregnancy-antenatal-care-team",
  values: [
    {
      title: "Understand the recommendation",
      body: "When a test, scan, treatment or next step is advised, your doctor can explain why it is being considered and how it relates to your pregnancy.",
    },
    {
      title: "Discuss your questions & preferences",
      body: "Your questions, concerns and birth preferences matter. Discuss the available options with your care team and understand when a recommendation may need to change for medical reasons.",
    },
    {
      title: "Prepare beyond the next appointment",
      body: "As your pregnancy progresses, explore childbirth education, birth preparation, nutrition, movement, breastfeeding preparation and postpartum support according to your needs.",
    },
  ],
} as const;

export const pregnancyLandingFaq = {
  eyebrow: "GOOD TO KNOW",
  heading: "Questions about pregnancy & antenatal care.",
  items: [
    {
      question: "When should I have my first antenatal appointment?",
      answer:
        "Contact an obstetrician as soon as you know you are pregnant. Early antenatal care helps establish your pregnancy history and plan appropriate tests, screening and follow-up. Your doctor will advise you on the timing of your first visit.",
    },
    {
      question: "What happens during an antenatal appointment?",
      answer:
        "Appointments may include a review of your symptoms and concerns, blood pressure and other pregnancy assessments, discussion of test or scan results, and planning for the next stage of care. The assessments needed vary throughout pregnancy.",
    },
    {
      question: "How often will I need antenatal check-ups?",
      answer:
        "Antenatal care involves regular follow-up throughout pregnancy. Your doctor will recommend an appointment schedule based on your stage of pregnancy, medical history and individual clinical needs. Some pregnancies require more frequent monitoring.",
    },
    {
      question: "What tests and scans are needed during pregnancy?",
      answer:
        "Blood tests, urine tests, ultrasound scans and other screenings may be recommended at different stages. Your doctor can explain what each investigation is for and which tests are appropriate for your pregnancy.",
    },
    {
      question: "Can I discuss food, supplements and exercise during my appointments?",
      answer:
        "Yes. You can ask about nutrition, supplements, physical activity and everyday wellbeing during your consultations. The Birthwave also offers related nutrition, movement and supportive care services where appropriate.",
    },
    {
      question: "When should I start preparing for childbirth?",
      answer:
        "You can begin learning about childbirth during pregnancy rather than waiting until the final weeks. Birth preparation may include understanding labour, comfort measures, pain relief, birth preferences, newborn care and the role of your support person.",
    },
    {
      question: "Can I discuss vaginal delivery, natural birth, VBAC or water birth during antenatal care?",
      answer:
        "Yes. You can discuss your birth preferences during pregnancy, including vaginal delivery, a physiological or natural birth approach, vaginal birth after caesarean (VBAC), and water birth. Whether a particular option is suitable depends on your medical and obstetric history, the progress of your pregnancy, clinical considerations and the facilities available for delivery.",
    },
    {
      question: "Can my partner be involved in pregnancy and birth preparation?",
      answer:
        "Yes. Your partner or chosen support person can participate in relevant consultations and childbirth preparation discussions according to your preferences and the clinic's arrangements.",
    },
    {
      question: "Can I receive support for stress or anxiety during pregnancy?",
      answer:
        "Yes. Emotional wellbeing is an important part of pregnancy care. You can discuss persistent worry, low mood, anxiety or other concerns with your care team, who can recommend appropriate psychological support or further assessment when needed.",
    },
    {
      question: "Can I practise yoga or exercise during pregnancy?",
      answer:
        "Physical activity may be appropriate during pregnancy, but the type and intensity depend on your health and pregnancy-related considerations. Discuss suitable exercise, yoga, physiotherapy or strength and conditioning activities with your doctor before beginning a new programme.",
    },
    {
      question: "I'm already receiving pregnancy care elsewhere. Can I move my care to The Birthwave?",
      answer:
        "You can request a consultation and bring your existing prescriptions, blood-test results, scan reports and pregnancy records. Your doctor can review your history and explain the appropriate next steps and care arrangements.",
    },
    {
      question: "Where will I give birth if I receive antenatal care at The Birthwave?",
      answer:
        "Antenatal consultation arrangements and delivery-facility arrangements may differ. You can discuss your intended place of birth, clinician attendance and available delivery options with the team before making a decision.",
    },
  ],
} as const;

export const pregnancyLandingVisit = {
  eyebrow: "VISIT THE BIRTHWAVE",
  heading: "Plan your visit.",
  supportingLine: "Find the clinic and contact the team for appointment information.",
  clinic: {
    name: "The Birthwave",
    addressLines: [
      "No. 8/15, Mahalingapuram Main Road",
      "Nungambakkam, Chennai – 600034",
    ],
  },
  contact: {
    phone: "+91 93630 31925",
  },
  appointments: {
    text: "Contact the clinic to enquire about consultation availability and appointment arrangements.",
  },
  cta: {
    label: "GET DIRECTIONS ↗",
    href: "https://maps.google.com/?q=The+BirthWave+Mahalingapuram+Main+Road+Nungambakkam+Chennai",
  },
} as const;

export const pregnancyLandingAppointment = {
  eyebrow: "TAKE THE NEXT STEP",
  heading: "Start your pregnancy care with a conversation.",
  body: [
    "Whether you've recently discovered you're pregnant, have questions about your current pregnancy or are considering continuing your antenatal care at The Birthwave, you can contact the team for consultation information.",
    "Share what you need help with, and the team can guide you on appointment availability and the next steps.",
  ],
  formTitle: "Enquiry Form",
  fields: {
    name: "Full name",
    phone: "Phone number",
    email: "Email (optional)",
    helpReason: "How can we help?",
    contactMethod: "Preferred contact method",
    message: "Message (optional)",
  },
  helpOptions: [
    "I recently found out I'm pregnant",
    "I need an antenatal consultation",
    "I want to transfer my pregnancy care",
    "I have questions about pregnancy tests or scans",
    "I want information about nutrition or pregnancy movement",
    "I want information about birth preparation",
    "Other",
  ] as const,
  contactMethods: ["Phone Call", "WhatsApp", "Email"] as const,
  submitLabel: "REQUEST A PREGNANCY CONSULTATION",
  formNote:
    "This form is for appointment information and non-urgent enquiries. If you are experiencing urgent pregnancy-related symptoms, seek prompt medical attention from an appropriate healthcare facility or emergency service.",
} as const;

export const pregnancyLandingRelatedCare = {
  eyebrow: "RELATED CARE",
  heading: "Care that can support the journey ahead.",
  supportingLine:
    "Explore related services that may be relevant during pregnancy, childbirth preparation and recovery.",
  services: [
    {
      title: "Pregnancy Yoga & Movement ↗",
      description:
        "Guided movement, pregnancy-appropriate yoga and physical wellbeing support based on individual suitability.",
      href: "/services/nutrition-emotional-wellbeing",
    },
    {
      title: "Nutrition During Pregnancy ↗",
      description:
        "Nutrition guidance that considers your dietary needs, lifestyle and stage of pregnancy.",
      href: "/services/nutrition-emotional-wellbeing",
    },
    {
      title: "Birth Preparation & Childbirth Education ↗",
      description:
        "Explore labour, birth options, comfort measures, partner preparation, breastfeeding education and the early days with your newborn.",
      href: "/services/birth-preparation",
    },
    {
      title: "Natural Birth ↗",
      description:
        "Understand a physiological approach to labour and birth, including preferences for minimal intervention when clinically appropriate.",
      href: "/services/natural-birth",
    },
    {
      title: "Vaginal Delivery ↗",
      description:
        "Learn about vaginal birth, labour progression, birth preparation and medical decisions that may arise during delivery.",
      href: "/services/normal-birth-delivery",
    },
    {
      title: "VBAC — Vaginal Birth After Caesarean ↗",
      description:
        "Understand the considerations involved in planning for vaginal birth following a previous caesarean.",
      href: "/services/vbac",
    },
    {
      title: "Lactation & Breastfeeding Support ↗",
      description:
        "Explore breastfeeding preparation, feeding concerns and support available after childbirth.",
      href: "/services/lactation",
    },
    {
      title: "Postpartum Recovery & Care ↗",
      description:
        "Understand physical recovery, pelvic health, emotional wellbeing and follow-up care after delivery.",
      href: "/services/postpartum-care",
    },
  ],
  cta: {
    label: "VIEW ALL SERVICES ↗",
    href: "/services",
  },
} as const;

export const pregnancyLandingMobileCta = {
  label: "Request a Consultation",
  href: "#appointment",
} as const;

export const pregnancyLandingFinalCta = {
  eyebrow: "Care that stays with you",
  heading: "Every pregnancy is personal.",
  supporting:
    "Whether you're early in pregnancy, planning your care pathway, or seeking a supportive second opinion, our team is here to listen and guide you forward.",
  primaryCta: {
    label: "Request a consultation",
    href: "#appointment",
  },
  secondaryCta: {
    label: "Ask a question",
    href: "https://wa.me/919363031925",
  },
  benefits: [
    "One-on-one clinician time",
    "Evidence-informed discussions",
    "Continuous pregnancy support",
    "Respect for your birth preferences",
  ] as const,
} as const;
