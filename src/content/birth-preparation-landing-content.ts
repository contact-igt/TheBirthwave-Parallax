/**
 * Birth Preparation & Childbirth Education — dedicated landing page content.
 */

export const birthPrepHero = {
  eyebrow: "BIRTH PREPARATION & CHILDBIRTH EDUCATION",
  heading: "Prepare for birth with knowledge, confidence and support.",
  supportingHeadline: "Understand labour. Explore your birth options. Prepare together.",
  body: "Birth can bring excitement, questions and uncertainty. BirthWave's childbirth education and birth-preparation sessions help you understand what to expect during labour and birth, explore your preferences, and prepare for the early days with your baby.\n\nWhether this is your first pregnancy or you've given birth before, preparation gives you and your birth partner the space to learn, ask questions and feel more informed about the journey ahead.",
  primaryCta: { label: "ENQUIRE ABOUT SESSIONS →", href: "#birth-prep-enquiry" },
  secondaryCta: { label: "EXPLORE WHAT YOU'LL LEARN →", href: "#birth-prep-topics" },
} as const;

export const birthPrepIntro = {
  eyebrow: "PREPARATION STARTS WITH UNDERSTANDING",
  heading: ["There's a lot to take in.", "You don't have to figure it all out at once."],
  paragraphs: [
    "Pregnancy comes with advice from family, stories from friends, information online and plenty of new terminology. It can be difficult to know what applies to you.",
    "Childbirth education gives you dedicated time to understand labour and birth, ask questions and think through the kind of support you may want.",
    "At BirthWave, preparation is not about planning every detail of birth. It is about helping you understand your options and feel more prepared for the decisions that may arise.",
  ],
  points: [
    {
      title: "Understand what's ahead.",
      body: "Learn about signs of labour, the stages of labour, birth and the early period after your baby arrives.",
    },
    {
      title: "Explore your choices.",
      body: "Understand comfort measures, pain-relief options, birth preferences and the different situations that may arise during labour.",
    },
    {
      title: "Prepare together.",
      body: "Help your birth partner understand how they can support you during labour, birth and the transition into parenthood.",
    },
  ],
} as const;

export const birthPrepTopics = {
  eyebrow: "WHAT YOU CAN EXPLORE",
  heading: "From understanding labour to preparing for life after birth.",
  intro:
    "Birth preparation connects the practical, physical and emotional parts of childbirth. Sessions can help you understand what may happen, what choices may be available and how you and your partner can prepare together.",
  groups: [
    {
      title: "UNDERSTANDING LABOUR & BIRTH",
      items: [
        {
          title: "Recognising labour",
          body: "Understand common signs that labour may be beginning, what contractions can feel like and when to contact your maternity care team.",
        },
        {
          title: "Stages of labour",
          body: "Learn how labour generally progresses—from early labour and cervical changes to pushing, birth and the immediate period afterwards.",
        },
        {
          title: "When plans may change",
          body: "Understand why monitoring, induction, assisted vaginal birth or Caesarean birth may sometimes be discussed depending on individual circumstances.",
        },
      ],
      imageKey: "birth-prep-landing-learning-labour",
    },
    {
      title: "COMFORT & PAIN-RELIEF OPTIONS",
      items: [
        {
          title: "Breathing & relaxation",
          body: "Explore breathing, relaxation and other comfort techniques that may help you cope with labour.",
        },
        {
          title: "Movement & positions",
          body: "Learn about movement and different positions that may be useful during labour when clinically appropriate.",
        },
        {
          title: "Pain-relief choices",
          body: "Understand the pain-relief options that may be available so you can discuss your preferences with your maternity team.",
        },
      ],
      imageKey: "birth-prep-landing-learning-support",
    },
    {
      title: "BIRTH PREFERENCES & DECISIONS",
      items: [
        {
          title: "Creating your birth preferences",
          body: "Think through what matters to you—your environment, support person, comfort preferences, pain relief and communication during labour.",
        },
        {
          title: "Informed decision-making",
          body: "Understand how to ask questions, discuss recommendations and participate in decisions about your care.",
        },
        {
          title: "Preparing for flexibility",
          body: "Birth can unfold differently from what was expected. Preparation helps you understand your preferences while leaving room for changes when circumstances require them.",
        },
      ],
      imageKey: "birth-prep-landing-consultation",
    },
    {
      title: "PREPARING TOGETHER",
      items: [
        {
          title: "Your birth partner's role",
          body: "Help your partner understand how they can offer practical and emotional support during labour.",
        },
        {
          title: "Supporting you during labour",
          body: "Explore ways a partner may help with reassurance, communication, comfort techniques and the preparation you have practised together.",
        },
        {
          title: "Looking beyond birth",
          body: "Prepare questions about early recovery, breastfeeding, newborn care and adjusting to the first days with your baby.",
        },
      ],
      imageKey: "birth-prep-landing-preferences",
    },
  ],
} as const;

export const birthPrepPreferences = {
  eyebrow: "YOUR BIRTH PREFERENCES",
  heading: "Your preferences matter — and they can evolve as birth unfolds.",
  body: [
    "A birth plan is a way to communicate what matters to you during labour and birth. It may include who you would like with you, your preferences around movement and comfort, pain-relief choices and how you would like information and decisions to be discussed.",
    "It isn't a script for exactly how birth must happen.",
    "Labour can change, and your own preferences may change too. Understanding this before birth can make it easier to participate in decisions if a different approach becomes appropriate.",
  ],
  questionsTitle: "Questions to think about",
  questions: [
    "What matters most to me during labour and birth?",
    "Who would I like to support me?",
    "What comfort or pain-relief options would I like to understand?",
    "How would I like my care team to communicate with me?",
    "What would help me feel supported if the birth plan needs to change?",
  ],
  imageKey: "birth-prep-landing-preferences",
  cta: { label: "DISCUSS BIRTH PREPARATION →", href: "#birth-prep-enquiry" },
} as const;

export const birthPrepWhoFor = {
  eyebrow: "YOUR STARTING POINT",
  heading: "Every pregnancy brings different questions.",
  intro: "Birth preparation can be useful whether you're preparing for your first baby or approaching birth with previous experience.",
  subheading: "You may find these sessions helpful if:",
  items: [
    "You're expecting your first baby and want to understand labour and birth.",
    "You've given birth before but want to prepare differently this time.",
    "You want to understand your birth options before your due date.",
    "You have questions about contractions, labour, pain relief or when to reach the hospital.",
    "You want your partner to feel prepared and involved.",
    "You're considering a vaginal birth, Caesarean birth or VBAC and want to better understand the birth journey.",
    "You want to prepare for breastfeeding, recovery and your baby's early days.",
    "You simply have questions and want a reliable place to discuss them.",
  ],
} as const;

export const birthPrepHowToBegin = {
  eyebrow: "HOW TO BEGIN",
  heading: "Start with the questions you already have.",
  steps: [
    {
      number: "01",
      title: "TELL US WHERE YOU ARE IN YOUR JOURNEY.",
      body: "Let us know your stage of pregnancy, whether this is your first birth and what you would most like help preparing for.",
    },
    {
      number: "02",
      title: "FIND THE RIGHT SESSION.",
      body: "We'll guide you through the available childbirth-education or birth-preparation options and explain the session format.",
    },
    {
      number: "03",
      title: "BEGIN PREPARING.",
      body: "Come with your questions, involve your birth partner where appropriate and use the sessions to prepare for labour, birth and the early days afterwards.",
    },
  ],
  cta: { label: "ENQUIRE ABOUT SESSIONS →", href: "#birth-prep-enquiry" },
} as const;

export const birthPrepEducator = {
  eyebrow: "MEET YOUR CHILDBIRTH EDUCATOR",
  heading: "Guidance that turns information into preparation.",
  name: "[Verified educator name]",
  credentials: "[Verified childbirth educator qualification/designation]",
  body: "Your childbirth educator helps you make sense of labour, birth preparation, comfort strategies, partner support and the early transition after birth—while giving you space to ask the questions that matter to you.\n\nSessions complement your obstetric care and help you prepare for conversations and decisions with your maternity team.",
  cta: { label: "ENQUIRE ABOUT A SESSION →", href: "#birth-prep-enquiry" },
} as const;

export const birthPrepProgramme = {
  eyebrow: "PLAN YOUR SESSION",
  heading: "Everything you need to know before you book.",
  info: [
    { label: "Session format", lines: ["[Confirm with BirthWave]"] },
    {
      label: "Location",
      lines: ["BirthWave Women Wellness Hospital", "Mahalingapuram Main Road, Nungambakkam, Chennai – 600034"],
    },
    { label: "Schedule", lines: ["[Confirm current session dates/timings]"] },
    { label: "Duration & number of sessions", lines: ["[Confirm with BirthWave]"] },
    { label: "Educator", lines: ["[Verified educator name + designation]"] },
    { label: "Languages", lines: ["[Confirm languages offered]"] },
    { label: "Birth-partner attendance", lines: ["[Confirm whether partner attendance is included/optional]"] },
    { label: "Fees & inclusions", lines: ["[Confirm current fee and inclusions]"] },
  ],
} as const;

export const birthPrepFaq = {
  eyebrow: "GOOD TO KNOW",
  heading: "Questions about Birth Preparation & Childbirth Education",
  items: [
    {
      question: "What is childbirth education?",
      answer:
        "Childbirth education helps expectant parents understand labour, birth, comfort and pain-relief options, birth preferences, partner support and the early period after birth. The purpose is to help you approach childbirth with clearer information and more informed questions.",
    },
    {
      question: "When should I start childbirth education?",
      answer:
        "You don't need to wait until the final weeks of pregnancy to begin preparing. The right time can depend on your stage of pregnancy, the programme format and what you would like support with. Contact the BirthWave team to understand which available session is suitable for you.",
    },
    {
      question: "Is childbirth education only for first-time parents?",
      answer:
        "No. It can also be useful if you've given birth before but want a refresher, had a different previous experience, have new questions or want to prepare differently for this birth.",
    },
    {
      question: "Can my partner attend?",
      answer:
        "Birth partners can benefit from understanding labour, comfort techniques and how they can support you. Confirm partner participation with BirthWave when choosing your session.",
    },
    {
      question: "Does childbirth education guarantee a vaginal or pain-free birth?",
      answer:
        "No. Childbirth education helps you prepare and understand your options, but it cannot predict exactly how labour will progress or guarantee a particular mode of birth. Your care will depend on your individual pregnancy and what happens during labour.",
    },
    {
      question: "Will I learn about pain-relief options?",
      answer:
        "Birth preparation can include discussion of comfort measures and pain-relief choices so that you understand the options you may want to discuss with your maternity care team. Pain-management preferences can also change during labour.",
    },
    {
      question: "Can I attend if I am planning a Caesarean birth?",
      answer:
        "Yes, childbirth preparation can still be relevant because preparation extends beyond the mode of birth. Depending on the programme, discussions may include what to expect around birth, partner support, early recovery, feeding and newborn care.",
    },
    {
      question: "What if I'm considering VBAC?",
      answer:
        "If you've previously had a Caesarean and are considering vaginal birth this pregnancy, childbirth education can complement your preparation, but your individual suitability and clinical questions about VBAC should be discussed with your obstetrician.",
    },
    {
      question: "Does childbirth education replace antenatal appointments?",
      answer:
        "No. Childbirth education complements your maternity care. It does not replace antenatal consultations, examinations, investigations or individual medical advice from your obstetrician or maternity team.",
    },
    {
      question: "Are the sessions individual, couple-based or group sessions?",
      answer:
        "Session formats may vary. BirthWave can confirm the currently available individual, couple or group options when you enquire.",
    },
  ],
} as const;

export const birthPrepEnquiry = {
  eyebrow: "PREPARE FOR WHAT'S AHEAD",
  heading: "Birth brings questions. Preparation gives them somewhere to begin.",
  body: "Whether you're wondering about labour, pain relief, birth preferences, your partner's role or what happens after your baby arrives, you don't have to piece everything together on your own.\n\nTalk to the BirthWave team about childbirth education and birth-preparation sessions.",
  phone: "+91 93630 31925",
  whatsapp: "https://wa.me/919363031925",
  fields: {
    name: "Full name",
    phone: "Phone number",
    stage: "Stage of pregnancy / Expected due date (optional)",
    interest: "I'm interested in:",
    message: "Message (optional)",
  },
  interestOptions: [
    "Childbirth Education",
    "Birth Preparation",
    "Birth Partner Preparation",
    "Not Sure",
  ] as const,
  submitLabel: "SEND ENQUIRY",
} as const;

export const birthPrepMobileCta = {
  label: "ENQUIRE ABOUT SESSIONS",
  href: "#birth-prep-enquiry",
} as const;

export const birthPrepRelatedCare = {
  eyebrow: "CONNECTED BIRTHWAVE CARE",
  heading: "Support before birth, through delivery and beyond.",
  services: [
    {
      title: "Pregnancy & Antenatal Care ↗",
      description: "Doctor-led pregnancy care, monitoring and guidance throughout each stage.",
      href: "/services/pregnancy-antenatal-care",
    },
    {
      title: "Natural Birth ↗",
      description: "Explore BirthWave's physiological-birth approach and preparation for minimal-intervention childbirth when clinically appropriate.",
      href: "/services/natural-birth",
    },
    {
      title: "Normal Vaginal Delivery ↗",
      description: "Understand vaginal delivery, labour preparation and the care available throughout childbirth.",
      href: "/services/normal-birth-delivery",
    },
    {
      title: "VBAC ↗",
      description: "Explore birth planning and individual assessment for vaginal birth after a previous Caesarean.",
      href: "/services/vbac",
    },
    {
      title: "Lactation & Breastfeeding Support ↗",
      description: "Preparation and guidance for breastfeeding before and after your baby arrives.",
      href: "/services/lactation",
    },
    {
      title: "Postpartum Recovery & Care ↗",
      description: "Support for physical recovery and wellbeing after childbirth.",
      href: "/services/postpartum-care",
    },
  ],
} as const;
