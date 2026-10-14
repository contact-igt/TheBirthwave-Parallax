/**
 * Fertility & Preconception — dedicated landing page content.
 *
 * 11 sections matching the approved content hierarchy:
 *  01 Hero — identify the service and invite a consultation
 *  02 Who is this for (Is This the Right Place to Start?) — help visitors recognise relevance
 *  03 What we talk through — the topics discussed
 *  04 Before pregnancy (Preconception care) — preparing before pregnancy
 *  05 Basic & advanced fertility care — understanding fertility options
 *  06 The people behind your care — meet your clinicians
 *  07 Your first consultation — the sequence of the appointment
 *  08 Before you visit — practical checklist and clinic location
 *  09 Good to know (FAQs) — common questions before you visit
 *  10 Related care — connected care pathways
 *  11 Plan your next step (Enquiry) — booking and communication
 */

export const fertilityHero = {
  eyebrow: "FERTILITY & PRECONCEPTION",
  heading: "Planning a pregnancy?",
  supportingLine: "Start with your health. Prepare with clarity, not guesswork.",
  body: [
    "Whether you're preparing for pregnancy, have questions about your fertility or have been trying to conceive, understanding your reproductive health is an important first step.",
    "At The BirthWave, fertility and preconception care begins with understanding your health, menstrual cycle, lifestyle, concerns and pregnancy plans. From preparing for natural conception to exploring fertility treatments when medically appropriate, the focus is on helping you understand your options and make informed decisions.",
  ],
  primaryCta: { label: "BOOK A FERTILITY CONSULTATION →", href: "#fertility-enquiry" },
  secondaryCta: { label: "Explore Your Fertility Options ↓", href: "#fertility-options" },
  location: "Nungambakkam, Chennai",
  locationNote: "Consultations by appointment",
} as const;

export const fertilityWho = {
  eyebrow: "IS THIS THE RIGHT PLACE TO START?",
  heading: "Planning pregnancy, or looking for answers about your fertility?",
  intro: "You may find a fertility or preconception consultation helpful if:",
  points: [
    "You're planning a pregnancy and want to understand how to prepare beforehand.",
    "You have questions about your periods, ovulation or reproductive health.",
    "You've been trying to conceive and would like to understand possible reasons for the delay.",
    "You have irregular menstrual cycles, PCOS or other health concerns that may affect fertility.",
    "You have a previous pregnancy loss or medical history you would like to discuss.",
    "You want to understand fertility treatments such as ovulation induction, IUI or IVF.",
    "You're considering egg freezing or fertility preservation for the future.",
    "You would like guidance on nutrition, fitness, emotional well-being and preparation before pregnancy.",
  ],
  reassurance:
    "You don't have to wait until you experience difficulty conceiving to begin understanding your reproductive health.",
} as const;

export const fertilityCovers = {
  eyebrow: "WHAT WE TALK THROUGH",
  heading: "A consultation built around where you are starting from.",
  cards: [
    {
      title: "Your health & reproductive history",
      body: "Discuss your menstrual cycles, medical conditions, medications, previous pregnancies, lifestyle and other factors relevant to your reproductive health.",
    },
    {
      title: "Your pregnancy plans",
      body: "Whether you're hoping to conceive soon or planning for the future, talk about your goals, concerns and the questions you or your partner may have.",
    },
    {
      title: "Your fertility concerns",
      body: "If you have irregular ovulation, difficulty conceiving, a previous fertility concern or questions about reproductive health, your doctor can explain what may be relevant to investigate.",
    },
    {
      title: "Your available options",
      body: "Depending on your health and fertility assessment, your doctor may discuss preconception guidance, lifestyle support, appropriate investigations, ovulation-related treatment, IUI, IVF or other options.",
    },
  ],
  closing:
    "The next step is based on your individual circumstances. Not everyone needs fertility investigations or assisted reproductive treatment.",
} as const;

export const fertilityPreparing = {
  eyebrow: "BEFORE PREGNANCY",
  heading: "Preparation can begin before the positive test.",
  intro: [
    "Preconception care gives you time to understand your health, discuss potential concerns and prepare for pregnancy.",
    "At The BirthWave, this includes medical guidance alongside discussions about physical health, emotional well-being and supportive lifestyle practices.",
  ],
  points: [
    {
      title: "Review your health",
      paragraphs: [
        "Discuss existing health conditions, medications, menstrual health, previous pregnancies and any relevant medical investigations.",
        "Your doctor may also recommend appropriate screening, vaccinations or supplements based on your individual needs.",
      ],
    },
    {
      title: "Prepare your body for pregnancy",
      paragraphs: [
        "Nutrition, physical activity, healthy weight management, sleep and other lifestyle factors can form part of preconception care.",
        "Where appropriate, nutrition guidance and strength and conditioning support may be considered according to your health, fitness level and medical needs.",
      ],
    },
    {
      title: "Conscious fertility & holistic preparation",
      paragraphs: [
        "Preparing for pregnancy can also involve paying attention to emotional well-being, relationships, stress and everyday routines.",
        "The BirthWave's holistic approach may include discussions about mindfulness, yoga, relaxation, conscious conception and Garbh Sanskar practices according to your interests and preferences.",
        "These supportive practices complement medical fertility care. They do not replace appropriate investigations or fertility treatment when required.",
      ],
    },
  ],
  note: "Your preparation should be guided by your health, needs and circumstances rather than a fixed approach.",
} as const;

export const fertilityOptions = {
  eyebrow: "UNDERSTANDING YOUR FERTILITY OPTIONS",
  heading: "Fertility care is not the same for everyone.",
  intro: [
    "Some people may need guidance on timing intercourse and understanding ovulation. Others may benefit from medical investigations, medication or assisted reproductive treatments.",
    "At The BirthWave, fertility consultations can help you understand the available approaches and what may be appropriate for your circumstances.",
  ],
  basicCare: {
    title: "Basic fertility care",
    items: [
      {
        title: "Ovulation Assessment & Cycle Tracking",
        paragraphs: [
          "Understanding your menstrual cycle can help identify whether ovulation is occurring regularly.",
          "Depending on your history, your doctor may discuss cycle tracking or recommend further evaluation when necessary.",
        ],
      },
      {
        title: "Follicular Monitoring",
        paragraphs: [
          "Follicular monitoring involves ultrasound scans to observe the development of ovarian follicles during a menstrual cycle.",
          "It may be recommended when assessing ovulation or planning certain fertility treatments.",
        ],
      },
      {
        title: "Ovulation Induction",
        paragraphs: [
          "When ovulation is irregular or absent, medication may be considered to help stimulate ovulation.",
          "Treatment requires medical assessment, and monitoring may be recommended depending on the medication and individual circumstances.",
        ],
      },
    ],
  },
  advancedCare: {
    title: "Advanced fertility care",
    items: [
      {
        title: "IUI — Intrauterine Insemination",
        paragraphs: [
          "IUI is a fertility procedure in which prepared sperm is placed directly into the uterus around the time of ovulation.",
          "It may be considered in selected fertility situations after an appropriate evaluation.",
        ],
      },
      {
        title: "IVF — In Vitro Fertilisation",
        paragraphs: [
          "IVF is a fertility treatment in which eggs are collected and fertilised with sperm in a laboratory. An embryo may then be transferred into the uterus.",
          "Whether IVF is appropriate depends on factors such as age, reproductive health, fertility history and individual medical circumstances.",
        ],
      },
      {
        title: "Egg Freezing & Fertility Preservation",
        paragraphs: [
          "Some women consider freezing their eggs because they wish to preserve reproductive options for the future.",
          "Fertility preservation may also be discussed before certain medical treatments, including cancer treatment, that could affect reproductive potential.",
          "A consultation can help explain the process, medical considerations, timing, limitations and available options.",
        ],
      },
    ],
  },
  note: "Fertility treatment is individual. No procedure, including IUI, IVF or egg freezing, can guarantee a future pregnancy or live birth.",
  cta: {
    label: "DISCUSS YOUR FERTILITY OPTIONS →",
    href: "#fertility-enquiry",
  },
} as const;

export const fertilityClinicians = {
  eyebrow: "THE PEOPLE BEHIND YOUR CARE",
  heading: "Meet your clinicians.",
  clinicians: [
    {
      doctorSlug: "dr-santoshi-nandigam",
      name: "Dr. Santoshi Nandigam",
      credentials: "MBBS, DNB — Obstetrics & Gynaecology",
      role: "Founder · Obstetrician & Gynaecologist",
      specialFocus: "Natural Birth & VBAC Specialist · Holistic Fertility Coach",
      description: [
        "Dr. Santoshi Nandigam's approach to preconception and fertility care begins with understanding your medical history, lifestyle, pregnancy plans and individual concerns.",
        "Her consultations consider medical guidance alongside nutrition, emotional well-being and supportive lifestyle practices, helping you understand the options relevant to your reproductive health.",
      ],
      bookLabel: "BOOK CONSULTATION →",
      bookHref: "#fertility-enquiry",
      viewProfileLabel: "View Full Profile →",
      profileHref: "/doctors/dr-santoshi-nandigam",
    },
    {
      doctorSlug: "dr-bharathy-kandasamy",
      name: "Dr. Bharathy Kandasamy",
      credentials: "MBBS, Fellowship in Reproductive Medicine and Laparoscopy",
      role: "Gynaecologist · Laparoscopic Surgeon · Fertility Care",
      specialFocus: "",
      description: [
        "Dr. Bharathy Kandasamy provides gynaecological and fertility-related consultations, including discussions about fertility evaluation and treatment options.",
        "Depending on your medical history and individual needs, consultations may include guidance on ovulation-related concerns, fertility investigations and assisted reproductive treatments such as IUI or IVF.",
      ],
      bookLabel: "BOOK CONSULTATION →",
      bookHref: "#fertility-enquiry",
      viewProfileLabel: "View Full Profile →",
      profileHref: "/doctors/dr-bharathy-kandasamy",
    },
  ],
} as const;

export const fertilityFirstConsultation = {
  eyebrow: "YOUR FIRST CONSULTATION",
  heading: "Bring your history. Bring your questions.",
  intro: [
    "You don't need to know exactly which fertility tests or treatments you may need before your first visit.",
    "Your consultation is an opportunity to understand your reproductive health and discuss the next steps.",
  ],
  steps: [
    {
      number: "01",
      title: "Share your starting point",
      body: "Tell us about your periods, medical and reproductive history, medications, previous pregnancies and how long you may have been trying to conceive.",
    },
    {
      number: "02",
      title: "Discuss what matters to you",
      body: "Ask questions about preparing for pregnancy, ovulation, fertility concerns, previous experiences or any uncertainty you may have.",
    },
    {
      number: "03",
      title: "Understand your options",
      body: "Your doctor can explain whether preconception guidance, follow-up, investigations or fertility treatment may be appropriate based on your individual circumstances.",
    },
  ],
  cta: { label: "BOOK A FERTILITY CONSULTATION →", href: "#fertility-enquiry" },
} as const;

export const fertilityVisit = {
  eyebrow: "BEFORE YOU VISIT",
  heading: "A little preparation can make your first conversation more useful.",
  locationLabel: "Where consultations take place",
  clinicName: "The BirthWave",
  clinicAddress: "No. 8/15, Mahalingapuram Main Road, Nungambakkam, Chennai – 600034",
  clinicNote: "Consultations by appointment.",
  checklistLabel: "Helpful to bring, if you have them",
  items: [
    {
      label: "Previous medical records",
      text: "Relevant prescriptions, blood-test results, ultrasound scans or previous fertility investigation reports.",
    },
    {
      label: "Menstrual information",
      text: "Recent period dates or cycle-tracking details, if available.",
    },
    {
      label: "Current medications and supplements",
      text: "A list of medicines, vitamins or supplements you currently take.",
    },
    {
      label: "Previous pregnancy or fertility history",
      text: "Information about previous pregnancies, fertility evaluations or treatments, where relevant.",
    },
    {
      label: "Your questions",
      text: "Anything you would like to understand about fertility, pregnancy preparation or treatment options.",
    },
    {
      label: "Your partner",
      text: "Your partner may attend when relevant and when you are comfortable with their involvement. Fertility evaluation may involve both partners.",
    },
  ],
  closing:
    "Don't have all these details? You can still book a consultation and discuss what information may be needed.",
  cta: { label: "BOOK AN APPOINTMENT →", href: "#fertility-enquiry" },
  directionsLabel: "Open in Maps",
} as const;

export const fertilityFaq = {
  eyebrow: "GOOD TO KNOW",
  heading: "Questions before you visit.",
  items: [
    {
      question: "When should I consider a preconception consultation?",
      answer:
        "You can consider a preconception consultation whenever you begin thinking about pregnancy. It provides an opportunity to review your reproductive health, medications, lifestyle and any concerns before conception.",
    },
    {
      question: "Is fertility care only for people having difficulty conceiving?",
      answer:
        "No. Fertility and preconception care can also help people planning a pregnancy understand their reproductive health and prepare beforehand.",
    },
    {
      question: "When should we seek help if we're having difficulty conceiving?",
      answer:
        "As a general guide, fertility evaluation is recommended after 12 months of regular unprotected intercourse if the woman is under 35, or after six months if she is 35 or older. Earlier assessment may be appropriate if there are irregular periods, known reproductive conditions or other concerns.",
    },
    {
      question: "Will I need fertility tests at my first appointment?",
      answer:
        "Not necessarily. Your doctor will first review your history and concerns. Investigations may be recommended if clinically appropriate.",
    },
    {
      question: "Does a fertility consultation mean I will need IVF?",
      answer:
        "No. Many people do not need IVF. Depending on your situation, your doctor may recommend preconception guidance, further assessment or another approach before discussing assisted reproductive treatment.",
    },
    {
      question: "What is the difference between IUI and IVF?",
      answer:
        "IUI involves placing prepared sperm directly into the uterus around ovulation. IVF involves fertilising eggs with sperm in a laboratory before an embryo is transferred into the uterus. Your doctor can explain whether either treatment may be appropriate for you.",
    },
    {
      question: "Can nutrition, exercise and yoga improve fertility?",
      answer:
        "A balanced diet, appropriate physical activity and healthy lifestyle habits support overall health and may address certain factors relevant to reproductive health. However, these practices cannot treat every cause of infertility or guarantee conception.",
    },
    {
      question: "What is conscious fertility?",
      answer:
        "Conscious fertility involves taking an informed and intentional approach to pregnancy planning, considering reproductive health, emotional well-being, lifestyle and personal circumstances alongside medical guidance.",
    },
    {
      question: "Can I consider egg freezing if I'm not planning pregnancy right now?",
      answer:
        "Egg freezing may be an option for some women who wish to preserve reproductive options for the future. It involves medical procedures and has limitations. Freezing eggs does not guarantee a future pregnancy.",
    },
    {
      question: "Should my partner attend a fertility consultation?",
      answer:
        "Your partner can attend if you would like them to. Where relevant, your doctor may recommend assessment of both partners because fertility concerns can involve factors affecting either person.",
    },
    {
      question: "Can fertility treatment guarantee pregnancy?",
      answer:
        "No. The outcome of fertility treatment depends on several factors, including age, reproductive health, the cause of infertility and the treatment used. No fertility treatment guarantees pregnancy or a live birth.",
    },
  ],
} as const;

export const fertilityRelatedCare = {
  eyebrow: "RELATED CARE",
  heading: "Care that may become relevant along your journey.",
  items: [
    {
      slug: "gynaecology",
      title: "Gynaecology & Women's Health",
      description: "Care for menstrual concerns, reproductive health, PCOS and other gynaecological needs.",
    },
    {
      slug: "pregnancy-antenatal-care",
      title: "Pregnancy & Antenatal Care",
      description: "Medical consultations, pregnancy monitoring and support during pregnancy.",
    },
    {
      slug: "nutrition-emotional-wellbeing",
      title: "Nutrition & Lifestyle Support",
      description: "Individualised nutrition guidance and lifestyle support relevant to reproductive health and pregnancy preparation.",
    },
    {
      slug: "nutrition-emotional-wellbeing",
      title: "Mental & Emotional Well-being",
      description: "Support for emotional concerns that may arise during fertility planning or treatment.",
    },
  ],
} as const;

export const fertilityEnquiry = {
  eyebrow: "PLAN YOUR NEXT STEP",
  heading: "Thinking about pregnancy or fertility? Start with a conversation.",
  body: [
    "Whether you're preparing for your first pregnancy, exploring your fertility or considering treatment, you can begin by discussing your questions with The BirthWave team.",
    "A consultation can help you understand your health and the options that may be relevant to your individual circumstances.",
  ],
  callLabel: "Call",
  phone: "+91 93630 31925",
  whatsappLabel: "CHAT ON WHATSAPP →",
  dropdownOptions: [
    "Preconception care",
    "Fertility consultation",
    "Difficulty conceiving",
    "IUI or IVF",
    "Egg freezing or fertility preservation",
    "Not sure yet",
  ],
  fields: {
    name: "Full name",
    contact: "Phone number or email",
    topic: "What would you like to discuss?",
    message: "Message (optional)",
  },
  submitLabel: "SEND ENQUIRY →",
  disclaimer:
    "This form is for appointments and non-urgent enquiries. For urgent medical concerns, contact an appropriate healthcare provider or emergency service.",
  previewNotice: "Preview — this form is not yet connected to a live enquiry inbox.",
  previewResult:
    "This is a design preview. No enquiry has been sent — connect this form to a real enquiry endpoint before publishing.",
  validationMessage: "Enter your name and a phone number or email so we can reach you.",
} as const;

export const fertilityMobileCta = {
  label: "Book a Fertility Consultation",
  href: "#fertility-enquiry",
} as const;
