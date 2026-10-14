/**
 * Birth Preparation & Childbirth Education workshop — dedicated landing page content.
 * 12 sections matching the approved content hierarchy.
 */

export const birthPrepHero = {
  eyebrow: "THE BIRTHWAVE ALL-IN-ONE PRENATAL WORKSHOP",
  heading: "Prepare for birth. Understand what comes next.",
  supportingHeadline:
    "Childbirth education, prenatal yoga, breastfeeding preparation, birth-partner involvement and newborn care — brought together in one prenatal workshop.",
  body: [
    "Pregnancy brings excitement, anticipation and plenty of questions. What happens when labour begins? How can you prepare your body and mind? How can your partner support you? What should you know about breastfeeding and caring for your newborn?",
    "At The BirthWave, our prenatal workshop brings these important conversations together through guided education, practical preparation and opportunities to ask questions.",
    "Whether this is your first pregnancy or you have given birth before, the workshop is designed to help you and your birth partner understand the journey ahead and participate more confidently in conversations about your care.",
  ],
  primaryCta: { label: "ENQUIRE ABOUT THE NEXT WORKSHOP →", href: "#birth-prep-enquiry" },
  secondaryCta: { label: "EXPLORE WHAT YOU'LL LEARN ↓", href: "#birth-prep-topics" },
} as const;

export const birthPrepIntro = {
  eyebrow: "BEFORE YOUR LITTLE ONE ARRIVES",
  heading: "You may know your due date. But do you know what to expect along the way?",
  paragraphs: [
    "There is so much information about pregnancy available today. Yet, when it comes to labour, breastfeeding and the first few days with a newborn, it can still be difficult to know what to expect.",
    "You may have heard different birth stories from friends and family, watched videos online or received advice that leaves you with even more questions.",
    "Our prenatal workshop gives you an opportunity to understand the process, learn practical skills and discuss your concerns with people experienced in pregnancy, childbirth and early newborn care.",
  ],
  points: [
    {
      title: "Understand your body",
      body: "Learn what happens during labour, how birth progresses and why different care options may be discussed.",
    },
    {
      title: "Prepare in practical ways",
      body: "Explore breathing, movement, comfortable positions and supportive techniques that may be useful during labour.",
    },
    {
      title: "Include your birth partner",
      body: "Help your partner understand what you may experience and how they can participate in supporting you.",
    },
    {
      title: "Look beyond delivery",
      body: "Begin preparing for breastfeeding, newborn care and the changes that follow childbirth.",
    },
  ],
} as const;

export const birthPrepWhoFor = {
  eyebrow: "YOUR STARTING POINT",
  heading: "Every pregnancy is different. Every parent has questions.",
  intro: "This workshop may be relevant to you if:",
  items: [
    {
      title: "You're expecting your first child.",
      body: "You want to understand labour, delivery, breastfeeding and newborn care before experiencing them for the first time.",
    },
    {
      title: "You've given birth before.",
      body: "You have new questions, a different pregnancy experience or preferences you would like to explore this time.",
    },
    {
      title: "You're considering your birth options.",
      body: "You would like to understand vaginal birth, Caesarean birth, pain-relief choices and how birth preferences are discussed.",
    },
    {
      title: "You want your partner to be involved.",
      body: "You would like the person supporting you to understand what happens during labour and what practical support may be helpful.",
    },
    {
      title: "You're preparing for breastfeeding and newborn care.",
      body: "You want guidance about early feeding, newborn needs and the transition into parenthood.",
    },
    {
      title: "You simply want to feel better informed.",
      body: "You don't need to have every question or preference figured out before joining.",
    },
  ],
  cta: { label: "ASK ABOUT THE WORKSHOP →", href: "#birth-prep-enquiry" },
} as const;

export const birthPrepTopics = {
  eyebrow: "INSIDE THE PRENATAL WORKSHOP",
  heading: "From understanding labour to caring for your newborn.",
  intro:
    "The BirthWave prenatal workshop brings together different areas of pregnancy and birth preparation so that you can look at the complete journey rather than learning about each stage in isolation.",
  modules: [
    {
      number: "01",
      title: "Understanding Labour & Childbirth",
      subhead: "Know what happens as labour progresses.",
      paragraphs: [
        "Learn about the basic anatomy and physiology of childbirth, the stages of labour, contractions, signs that labour may be beginning and when to contact your maternity care team.",
        "Understand why labour can progress differently for different women and what kinds of medical decisions may arise along the way.",
      ],
    },
    {
      number: "02",
      title: "Breathing, Movement & Labour Comfort",
      subhead: "Explore practical ways to cope with labour.",
      paragraphs: [
        "Learn about breathing, relaxation, movement, positioning and comfort techniques that may be helpful during labour.",
        "The workshop introduces practical approaches and helps you understand how to discuss suitable options with your maternity care team.",
        "Pain-relief choices, including medical options, are also part of understanding childbirth.",
      ],
    },
    {
      number: "03",
      title: "Birth Choices & Birth Preferences",
      subhead: "Know your options and communicate what matters to you.",
      paragraphs: [
        "Understand vaginal birth, Caesarean birth and the reasons different approaches may be recommended.",
        "Explore what a birth plan can include, how to communicate preferences and why flexibility remains important when medical circumstances change.",
        "The aim is to prepare for informed discussions, not to guarantee a particular type of delivery.",
      ],
    },
    {
      number: "04",
      title: "Birth-Partner Preparation",
      subhead: "Your partner can prepare for labour too.",
      paragraphs: [
        "Birth preparation isn't only for the person giving birth.",
        "Explore ways your partner can offer reassurance, encourage comfortable movement, help with practical needs and support communication during labour.",
        "Learn how to talk about expectations and discuss the kind of involvement you would find helpful.",
      ],
    },
    {
      number: "05",
      title: "Prenatal Yoga & Movement",
      subhead: "Prepare your body and mind through appropriate movement.",
      paragraphs: [
        "The workshop includes prenatal yoga and movement, with a focus on pregnancy-appropriate practices.",
        "Explore gentle movement, breathing, body awareness and relaxation as part of preparing for childbirth.",
        "Participation in specific exercises depends on your stage of pregnancy, medical history and suitability for physical activity.",
      ],
    },
    {
      number: "06",
      title: "Breastfeeding & Lactation Preparation",
      subhead: "Begin understanding breastfeeding before delivery.",
      paragraphs: [
        "Breastfeeding can bring questions even before your newborn arrives.",
        "Learn about early breastfeeding, positioning and attachment, feeding cues and common concerns during the first days.",
        "The aim is to introduce practical information and help you understand when individual lactation support may be useful.",
      ],
    },
    {
      number: "07",
      title: "Newborn Care & Early Parenting",
      subhead: "Understand the first days with your newborn.",
      paragraphs: [
        "Prepare for common questions about newborn feeding, sleep, hygiene and routine care.",
        "Learn why early newborn assessments, recommended vaccinations and medical follow-up matter.",
        "This part of the workshop introduces newborn care and helps you recognise which questions should be discussed with a paediatrician.",
      ],
    },
    {
      number: "08",
      title: "Preparing for the Postpartum Period",
      subhead: "Make space for your own recovery too.",
      paragraphs: [
        "The transition after birth involves physical recovery, changes in routine and emotional adjustment.",
        "Explore the importance of rest, practical support, breastfeeding assistance and postpartum follow-up.",
        "You can begin discussing how you and your family would like to organise support during the early weeks.",
      ],
    },
  ],
  cta: { label: "ENQUIRE ABOUT THE PRENATAL WORKSHOP →", href: "#birth-prep-enquiry" },
} as const;

export const birthPrepExperience = {
  eyebrow: "MORE THAN LISTENING TO A CLASS",
  heading: "Learn. Practise. Ask questions. Prepare together.",
  intro: [
    "The BirthWave workshop is designed to make childbirth education understandable and practical.",
    "Rather than learning only through reading or watching videos, you have opportunities to engage with educators, explore techniques and discuss situations that may be relevant to your pregnancy.",
  ],
  steps: [
    {
      number: "01",
      title: "Understand",
      body: "Begin with explanations about labour, childbirth, feeding and newborn care.",
    },
    {
      number: "02",
      title: "Explore",
      body: "Learn about birth choices, comfort measures and the different decisions that may arise during labour.",
    },
    {
      number: "03",
      title: "Practise",
      body: "Take part in appropriate guided activities, including breathing, positioning and prenatal movement.",
    },
    {
      number: "04",
      title: "Ask",
      body: "Bring up questions about childbirth, breastfeeding, newborn care or anything you would like to understand before delivery.",
    },
    {
      number: "05",
      title: "Prepare Together",
      body: "Discuss your birth preferences, understand how your partner can help and identify what you would like to clarify with your maternity care team.",
    },
  ],
  closing:
    "The goal is not to prepare you for one perfect birth scenario. It is to give you useful knowledge and preparation for a journey that may unfold in different ways.",
} as const;

export const birthPrepPreferences = {
  eyebrow: "YOUR BIRTH, YOUR VOICE",
  heading: "Your birth plan is a conversation, not a fixed script.",
  intro: [
    "You may have preferences about the way you would like to give birth, who you want beside you and what kind of support you would find helpful.",
    "A birth plan gives you an opportunity to communicate those preferences with your maternity care team.",
  ],
  points: [
    {
      title: "Movement & comfort",
      body: "Consider which positions, movement and comfort measures you may want to discuss.",
    },
    {
      title: "Your birth partner",
      body: "Think about the role you would like your partner or chosen support person to have.",
    },
    {
      title: "Pain-relief choices",
      body: "Understand what pain-relief options you would like to ask about.",
    },
    {
      title: "Communication & decisions",
      body: "Discuss how you would prefer information and recommendations to be explained during labour.",
    },
    {
      title: "When plans change",
      body: "Understand that additional monitoring, medical intervention, assisted birth or Caesarean birth may be recommended depending on clinical circumstances.",
    },
  ],
  closing: "Your preferences matter, and so do the health and safety of you and your newborn.",
  cta: { label: "LEARN ABOUT BIRTH PREPARATION →", href: "#birth-prep-enquiry" },
  imageKey: "birth-prep-landing-preferences" as const,
} as const;

export const birthPrepTeam = {
  eyebrow: "GUIDED BY THE BIRTHWAVE CARE TEAM",
  heading: "Meet the professionals involved in your preparation.",
  intro:
    "The workshop brings together knowledge from obstetrics, childbirth education, lactation and newborn care.",
  members: [
    {
      slug: "dr-santoshi-nandigam",
      name: "Dr. Santoshi Nandigam",
      credentials: "MBBS, DNB — Obstetrics & Gynaecology",
      role: "Founder, The BirthWave · Obstetrician & Gynaecologist",
      bio: "Dr. Santoshi's approach to pregnancy and birth care places importance on understanding each woman's health, preferences and concerns. Her involvement brings an obstetric perspective to childbirth preparation, including labour, birth choices, medical considerations and informed decision-making.",
      cta: { label: "VIEW PROFILE →", href: "/doctors/dr-santoshi-nandigam" },
    },
    {
      slug: "sheethal-sathya",
      name: "Sheethal Sathya",
      credentials: "DONA-certified Birth Doula, Lactation Counsellor",
      role: "Childbirth Educator · Lactation Consultant",
      bio: "Sheethal brings childbirth education and lactation knowledge into the preparation experience. Her areas of work include understanding labour, exploring comfort techniques, preparing birth partners and helping expectant parents learn about breastfeeding and early feeding.",
      cta: { label: "VIEW PROFILE →", href: "/doctors/sheethal-sathya" },
    },
    {
      slug: "dr-deepika-sivathanu",
      name: "Dr. Deepika Sivathanu",
      credentials: "MBBS, MD — Paediatrics",
      role: "Paediatrician",
      bio: "Dr. Deepika brings a paediatric perspective to preparing for the newborn stage. Her involvement helps connect childbirth preparation with questions about newborn health, early care and the transition into parenthood.",
      cta: { label: "VIEW PROFILE →", href: "/doctors/dr-deepika-sivathanu" },
    },
    {
      slug: "prenatal-yoga",
      name: "Prenatal Yoga & Movement",
      credentials: "Movement & Body Awareness",
      role: "Specialist Facilitator",
      bio: "Prenatal yoga is also part of The BirthWave's workshop experience. The team can confirm the session facilitator and specific movement activities for each workshop.",
      cta: { label: "MEET OUR CARE TEAM →", href: "/doctors" },
    },
  ],
  closingCta: { label: "MEET OUR CARE TEAM →", href: "/doctors" },
} as const;

export const birthPrepGallery = {
  eyebrow: "A LOOK AT THE LEARNING EXPERIENCE",
  heading: "Important conversations. Practical preparation. Learning together.",
  intro: [
    "At The BirthWave, childbirth education creates space for expectant parents to learn about pregnancy, labour, birth and the beginning of parenthood.",
    "Our workshops bring educators and participants together to explore practical preparation, ask questions and better understand different aspects of the birth journey.",
  ],
  captions: [
    "Understanding labour and childbirth",
    "Exploring movement and comfort techniques",
    "Preparing birth partners for an active support role",
    "Learning about breastfeeding and newborn care",
    "Conversations with the care team",
  ],
} as const;

export const birthPrepProgramme = {
  eyebrow: "WORKSHOP INFORMATION",
  heading: "A few things to know before you register.",
  items: [
    {
      label: "Workshop topics",
      text: "Childbirth education, practical birth preparation, prenatal yoga, breastfeeding preparation and newborn care.",
    },
    {
      label: "Who can enquire",
      text: "Expectant mothers, including those who would like to prepare together with their birth partners.",
    },
    {
      label: "Workshop schedule",
      text: "Contact The BirthWave for upcoming workshop dates and availability.",
    },
    {
      label: "Session format & venue",
      text: "The team can confirm the format and location of the upcoming workshop before you register.",
    },
    {
      label: "Fees & registration",
      text: "Workshop fees and registration details will be shared by the team.",
    },
    {
      label: "Medical considerations",
      text: "If you have a high-risk pregnancy, activity restrictions or other medical concerns, ask your obstetrician which workshop activities are appropriate for you.",
    },
  ],
  cta: { label: "ENQUIRE ABOUT THE NEXT WORKSHOP →", href: "#birth-prep-enquiry" },
} as const;

export const birthPrepFaq = {
  eyebrow: "GOOD TO KNOW",
  heading: "Questions before you join.",
  items: [
    {
      question: "What is The BirthWave All-in-One Prenatal Workshop?",
      answer:
        "It is a birth-preparation workshop that brings together childbirth education, prenatal yoga, labour preparation, breastfeeding guidance and newborn care. It is intended to help expecting parents understand the stages of birth and early parenthood through guided learning and practical preparation.",
    },
    {
      question: "When should I attend a prenatal workshop?",
      answer:
        "You can enquire during pregnancy, rather than waiting until the final weeks. Attending with enough time before your due date may give you an opportunity to practise what you learn and discuss any questions with your maternity care team. The BirthWave team can help you understand which upcoming session may be suitable.",
    },
    {
      question: "Is this workshop only for first-time parents?",
      answer:
        "No. It can also be relevant if you have given birth before and would like to revisit childbirth preparation, discuss your birth preferences or learn more about breastfeeding and newborn care.",
    },
    {
      question: "Can my husband or birth partner attend?",
      answer:
        "Birth-partner preparation is an important part of the workshop. Partners can learn about labour, practical comfort measures, communication and supportive roles. Confirm attendance arrangements when registering.",
    },
    {
      question: "Does the workshop cover vaginal birth and Caesarean birth?",
      answer:
        "Yes. Understanding birth includes learning about vaginal birth, Caesarean birth and why different approaches may be appropriate in different circumstances. The workshop does not guarantee or determine your mode of delivery.",
    },
    {
      question: "Can I join if I previously had a Caesarean birth?",
      answer:
        "You can enquire about the workshop if you have had a previous Caesarean birth. If you are considering a vaginal birth after Caesarean (VBAC), your obstetrician will need to assess your individual medical and pregnancy history and discuss the relevant options.",
    },
    {
      question: "Is prenatal yoga suitable for everyone?",
      answer:
        "Not every movement or yoga practice is suitable for every pregnancy. Your medical history, pregnancy-related conditions and your obstetrician's advice should guide participation. Exercises can be adapted or avoided when necessary.",
    },
    {
      question: "Will I learn about breastfeeding before delivery?",
      answer:
        "Yes. Breastfeeding preparation is part of the workshop. The educational component introduces early feeding, positioning, attachment and common breastfeeding questions. If you need individual breastfeeding support, you can enquire about a separate lactation consultation.",
    },
    {
      question: "Does the workshop include newborn care?",
      answer:
        "Yes. The workshop includes introductory newborn care information to help expecting parents prepare for the early days, including feeding, routine care and questions about newborn health.",
    },
    {
      question: "Does attending this workshop guarantee a natural or vaginal birth?",
      answer:
        "No. Childbirth education helps you understand labour, explore your preferences and prepare for different possibilities. The type of delivery depends on your individual clinical circumstances and the health of you and your newborn.",
    },
    {
      question: "Does the workshop replace my regular antenatal appointments?",
      answer:
        "No. The workshop is an educational experience and does not replace antenatal check-ups, scans, medical advice or personalised obstetric care.",
    },
    {
      question: "How can I register for the workshop?",
      answer:
        "Contact The BirthWave through phone or WhatsApp. The team can share information about the upcoming workshop, attendance arrangements, location and registration.",
    },
  ],
} as const;

export const birthPrepRelatedCare = {
  eyebrow: "SUPPORT THROUGH YOUR JOURNEY",
  heading: "Your preparation can continue beyond the workshop.",
  intro:
    "The BirthWave also provides related pregnancy, birth and newborn services. These are separate clinical and supportive services that may be relevant to your individual needs.",
  services: [
    {
      title: "Pregnancy & Antenatal Care",
      description: "Medical consultations, monitoring and guidance throughout pregnancy.",
      href: "/services/pregnancy-antenatal-care",
    },
    {
      title: "Natural Birth",
      description: "Explore birth preferences, preparation and a lower-intervention approach where clinically appropriate.",
      href: "/services/natural-birth",
    },
    {
      title: "Vaginal Delivery Care",
      description: "Understand vaginal birth, labour and the medical considerations involved in planning delivery.",
      href: "/services/normal-birth-delivery",
    },
    {
      title: "VBAC — Vaginal Birth After Caesarean",
      description: "Individual assessment and guidance for women considering vaginal birth after a previous Caesarean.",
      href: "/services/vbac",
    },
    {
      title: "Lactation & Breastfeeding Support",
      description: "Individual guidance for breastfeeding preparation, feeding concerns and lactation support.",
      href: "/services/lactation",
    },
    {
      title: "Newborn & Paediatric Care",
      description: "Medical assessment, routine newborn care and paediatric guidance.",
      href: "/services/newborn-pediatric-care",
    },
  ],
  cta: { label: "EXPLORE OUR SERVICES →", href: "/services" },
} as const;

export const birthPrepEnquiry = {
  eyebrow: "START YOUR PREPARATION",
  heading: "Your questions are a good place to begin.",
  body: [
    "Whether you are in the early stages of pregnancy or getting closer to your due date, you can enquire about The BirthWave's upcoming prenatal workshop.",
    "Tell us where you are in your pregnancy and what you would like to learn. Our team can help you understand the workshop details and registration process.",
  ],
  primaryCta: "ENQUIRE ABOUT THE NEXT WORKSHOP →",
  whatsapp: "CHAT ON WHATSAPP →",
  whatsappUrl: "https://wa.me/919363031925",
  phone: "+91 93630 31925",
  fields: {
    name: "Full Name",
    phone: "Phone Number",
    email: "Email Address (Optional)",
    stage: "How many weeks pregnant are you? (Optional)",
    message: "What would you like to know more about the workshop? (Optional)",
  },
  submitLabel: "ENQUIRE ABOUT THE WORKSHOP →",
} as const;

export const birthPrepMobileCta = {
  label: "Enquire About the Workshop",
  href: "#birth-prep-enquiry",
} as const;
