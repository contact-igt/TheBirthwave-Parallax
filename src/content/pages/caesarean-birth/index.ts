/**
 * Caesarean Birth & Delivery Care — dedicated landing page content.
 *
 * This file is the single content source for the page. The UI components in
 * the matching service-section folder only decide how each editorial block
 * is presented; they do not own medical copy, contact details or links.
 */

export const caesareanBirthImagery = {
  hero: {
    src: "/images/services/heroservice.jpg",
    alt: "A woman sits in a warm, calm care setting while considering her birth journey.",
    objectPosition: "70% 36%",
    gradient: "linear-gradient(145deg, color-mix(in srgb, var(--color-paper-dim) 82%, var(--color-sky) 18%), color-mix(in srgb, var(--color-terracotta) 68%, var(--color-paper) 32%))",
  },
  consultation: {
    src: "/images/services/service5.jpg",
    alt: "A calm maternity-care consultation about birth planning and recovery.",
    objectPosition: "50% 38%",
  },
  faq: {
    src: "/images/services/faq.jpg",
    alt: "A calm, reflective space for considering questions about Caesarean Birth and recovery.",
    objectPosition: "50% 45%",
  },
  backgrounds: {
    understanding: "/images/natural-birth/natural-birth-approach-background-v1.png",
    considerations: "/images/natural-birth/natural-birth-flexibility-background-v1.png",
    preparation: "/images/services/birth-prep-starting-point-background-v1.png",
    during: "/images/natural-birth/natural-birth-journey-background-v1.png",
    preferences: "/images/natural-birth/natural-birth-preferences-background-v1.png",
    recovery: "/images/natural-birth/natural-birth-clinician-background-v1.png",
    consultation: "/images/services/birth-prep-learning-experience-background-v1.png",
    clinician: "/images/natural-birth/natural-birth-clinician-background-v1.png",
  },
} as const;

export const caesareanBirthHero = {
  eyebrow: "CAESAREAN BIRTH & DELIVERY CARE",
  heading: "Caesarean Birth",
  supportingHeadline:
    "A different way to give birth. The same need for care, understanding and support.",
  body: [
    "Whether your Caesarean Birth is planned during pregnancy or recommended because of changing medical circumstances, understanding what to expect can help you prepare.",
    "At The Birthwave, we help you discuss your birth options, understand the procedure and prepare for recovery, with your health, preferences and newborn's wellbeing in mind.",
  ],
  primaryCta: { label: "DISCUSS CAESAREAN BIRTH ↗", href: "#caesarean-enquiry" },
  secondaryCta: { label: "UNDERSTAND THE PROCEDURE ↓", href: "#caesarean-understanding" },
} as const;

export const caesareanBirthUnderstanding = {
  eyebrow: "UNDERSTANDING THE PROCEDURE",
  heading: "Caesarean Birth is a surgical way of delivering your baby.",
  body: [
    "A Caesarean Birth, also called a C-section, is a procedure in which your baby is delivered through incisions made in the abdomen and uterus.",
    "It may be planned before labour begins or recommended during pregnancy or labour when clinical circumstances make it an appropriate option.",
  ],
  items: [
    {
      title: "Planned Caesarean Birth",
      body: "A Caesarean scheduled in advance after discussing your pregnancy, medical history, preferences and birth options.",
    },
    {
      title: "Unplanned or Emergency Caesarean Birth",
      body: "A Caesarean recommended when changing circumstances require delivery sooner than originally planned. The urgency depends on the clinical situation.",
    },
    {
      title: "Understanding Your Choices",
      body: "Your obstetrician can explain why a Caesarean is being considered, its benefits and risks, and any suitable alternatives.",
    },
  ],
  note: "A Caesarean is a major surgical procedure. The decision should be based on your individual circumstances and informed discussion.",
} as const;

export const caesareanBirthConsiderations = {
  eyebrow: "YOUR BIRTH OPTIONS",
  heading: "Sometimes, a Caesarean is the appropriate path for birth.",
  intro: "Every pregnancy is different. A Caesarean may be considered for several reasons.",
  items: [
    { title: "Baby's Position", body: "Certain positions, such as breech presentation, may affect the recommended mode of delivery." },
    { title: "Placental or Pregnancy Complications", body: "Conditions such as placenta praevia or certain maternal health concerns may make Caesarean Birth necessary." },
    { title: "Changes During Labour", body: "Concerns about the baby's wellbeing or labour not progressing as expected may lead to a recommendation for Caesarean Birth." },
    { title: "Previous Caesarean or Uterine Surgery", body: "Your previous surgical and obstetric history may influence birth planning." },
    { title: "Personal Birth Preferences", body: "Some women may wish to discuss a planned Caesarean because of previous experiences, anxiety about childbirth or personal preferences." },
  ],
  note: "Your obstetrician will explain which considerations apply to your pregnancy and help you understand the available options.",
} as const;

export const caesareanBirthPreparation = {
  eyebrow: "BEFORE YOUR BIRTH",
  heading: "Preparation begins with knowing what to expect.",
  intro: "If a Caesarean is being planned, your maternity team can guide you through the preparation and arrangements.",
  items: [
    { title: "Review Your Pregnancy", body: "Discuss your medical history, pregnancy progress, scan findings and reasons for considering Caesarean Birth." },
    { title: "Understand the Procedure", body: "Learn about anaesthesia, the surgical process, potential risks and recovery." },
    { title: "Discuss Your Birth Preferences", body: "Talk about communication during the procedure, birth companionship and early contact with your newborn, where possible." },
    { title: "Prepare for Recovery", body: "Understand wound care, pain management, breastfeeding support and the help you may need at home." },
  ],
  note: "Planned Caesarean Birth is generally scheduled at or after 39 weeks unless an earlier delivery is medically indicated.",
} as const;

export const caesareanBirthDuring = {
  eyebrow: "WHAT TO EXPECT",
  heading: "Understanding the steps can help you prepare for the experience.",
  items: [
    { title: "Anaesthesia & Preparation", body: "Most planned Caesareans use spinal or epidural anaesthesia, allowing you to remain awake while the lower part of your body is numbed. General anaesthesia may be needed in some circumstances." },
    { title: "Your Baby's Birth", body: "Your obstetrician delivers your baby through surgical incisions in the abdomen and uterus. You may feel pressure or pulling sensations, but the anaesthesia is intended to prevent surgical pain." },
    { title: "Newborn Assessment", body: "After birth, the maternity team assesses your newborn and provides any care that may be required." },
    { title: "Recovery & Observation", body: "After surgery, your health, comfort and recovery are monitored. Pain relief, movement and feeding support are discussed according to your needs." },
  ],
  note: "Your clinical team will explain what to expect based on your individual situation.",
} as const;

export const caesareanBirthPreferences = {
  eyebrow: "YOUR PREFERENCES STILL MATTER",
  heading: "A Caesarean Birth can still include meaningful choices.",
  intro: "Having a surgical birth does not mean your preferences become unimportant.",
  items: [
    { title: "Communication During Birth", body: "Discuss how you would like the procedure and important decisions explained." },
    { title: "Birth Partner & Support", body: "Ask whether your chosen support person can be present, depending on anaesthesia and facility arrangements." },
    { title: "Meeting Your Newborn", body: "Discuss opportunities for early contact and skin-to-skin care when medically appropriate." },
    { title: "Feeding Preferences", body: "Talk about breastfeeding, lactation support and feeding after Caesarean Birth." },
    { title: "Photography & Personal Preferences", body: "If you wish to document your birth experience, ask about the delivery facility's photography and videography policies." },
  ],
  note: "Not every preference can be accommodated in every clinical situation. Your maternity team can help you understand what may be possible.",
} as const;

export const caesareanBirthRecovery = {
  eyebrow: "RECOVERY & POSTPARTUM CARE",
  heading: "Your recovery deserves attention too.",
  intro: "Caesarean Birth involves abdominal surgery, so recovery may take several weeks and varies from person to person.",
  items: [
    { title: "Pain Management & Wound Care", body: "Understand prescribed pain relief, incision care and signs that your wound needs medical attention." },
    { title: "Movement & Physical Recovery", body: "Gentle movement is usually encouraged when medically appropriate. More strenuous activities may need to wait until recovery progresses." },
    { title: "Breastfeeding & Newborn Care", body: "You can discuss comfortable feeding positions, lactation concerns and support during the early days." },
    { title: "Emotional Wellbeing", body: "Your feelings about birth and recovery matter. You can discuss emotional concerns and seek additional support when needed." },
    { title: "Follow-Up Care", body: "Postnatal reviews help assess healing, discuss symptoms and guide your return to everyday activities." },
  ],
  riskNote: "Caesarean Birth carries risks, including infection, bleeding, blood clots and possible implications for future pregnancies. These should be discussed during informed consent. Seek urgent medical assessment for heavy bleeding, breathing difficulty, significant leg swelling or signs of serious infection.",
  cta: { label: "EXPLORE POSTPARTUM RECOVERY & CARE ↗", href: "/services/postpartum-care" },
} as const;

export const caesareanBirthConsultation = {
  eyebrow: "START WITH A CONVERSATION",
  heading: "Understanding your options begins with your questions.",
  intro: "Whether you have been advised to consider Caesarean Birth or simply want to understand it better, you can begin with a consultation.",
  items: [
    { title: "Share Your Pregnancy History", body: "Discuss your current pregnancy, previous deliveries, relevant medical conditions and concerns." },
    { title: "Understand Your Birth Options", body: "Ask why Caesarean Birth may be considered and how it compares with other options relevant to your pregnancy." },
    { title: "Discuss Your Preferences", body: "Share your expectations, previous birth experiences, questions about surgery and recovery needs." },
    { title: "Plan Your Next Steps", body: "Understand whether further assessment is needed and discuss your delivery planning and follow-up care." },
  ],
  cta: { label: "BOOK A CONSULTATION ↗", href: "#caesarean-enquiry" },
} as const;

export const caesareanBirthClinician = {
  eyebrow: "THE PEOPLE BEHIND YOUR CARE",
  heading: "Your pregnancy and birth decisions deserve individual attention.",
  doctor: {
    name: "Dr. Santoshi Nandigam",
    credentials: "MBBS, DNB – Obstetrics & Gynaecology",
    role: "Founder · Obstetrician & Gynaecologist",
    specialty: "Pregnancy Care · Natural Birth · VBAC · Birth Planning",
    photo: "/images/doctors/dr-santoshi-web.jpg",
    paragraphs: [
      "Dr. Santoshi discusses your pregnancy, medical history and birth preferences to help you understand the options relevant to your care.",
      "For women considering Caesarean Birth, consultation includes understanding the reasons for surgery, preparation, recovery and future pregnancy considerations.",
    ],
    primaryCta: { label: "BOOK CONSULTATION ↗", href: "#caesarean-enquiry" },
    secondaryCta: { label: "VIEW FULL PROFILE ↗", href: "/doctors/dr-santoshi-nandigam" },
  },
} as const;

export const caesareanBirthFaq = {
  eyebrow: "GOOD TO KNOW",
  heading: "Questions about Caesarean Birth.",
  items: [
    { question: "What is a Caesarean Birth?", answer: "A Caesarean Birth is a surgical procedure in which a baby is delivered through incisions in the abdomen and uterus." },
    { question: "Is Caesarean Birth safe?", answer: "Caesarean Birth is a commonly performed procedure, but it is major surgery and carries risks. Your obstetrician can discuss the potential benefits and complications based on your individual pregnancy." },
    { question: "What is the difference between a planned and an emergency Caesarean?", answer: "A planned Caesarean is scheduled before labour. An emergency Caesarean is performed when medical circumstances require delivery more urgently. Not all unplanned Caesareans involve an immediate threat to life." },
    { question: "Will I be awake during a Caesarean Birth?", answer: "Most planned Caesareans are performed using regional anaesthesia, allowing you to remain awake. General anaesthesia may be necessary in certain situations." },
    { question: "Will I feel pain during a Caesarean?", answer: "Anaesthesia is given to prevent surgical pain. You may feel pressure or pulling sensations. Tell your anaesthetist immediately if you experience pain or significant discomfort." },
    { question: "Can my partner be present during a Caesarean?", answer: "This depends on the delivery facility, type of anaesthesia and clinical circumstances. You can discuss the arrangements before delivery." },
    { question: "Can I breastfeed after a Caesarean Birth?", answer: "Yes. Breastfeeding can begin after Caesarean Birth when you and your newborn are medically ready. Support with positioning and feeding may be helpful during recovery." },
    { question: "How long does recovery take?", answer: "Recovery varies. Many women need several weeks before returning to more strenuous activities. Your maternity team will guide you based on your healing and medical needs." },
    { question: "Can I have a vaginal delivery after a previous Caesarean?", answer: "Some women may be suitable for VBAC (Vaginal Birth After Caesarean). This depends on factors including the previous uterine incision, medical history, current pregnancy and delivery arrangements." },
    { question: "Can I choose a Caesarean Birth?", answer: "You can discuss a preference for planned Caesarean Birth with your obstetrician. The discussion should include your reasons, benefits, risks, other birth options and clinical considerations." },
    { question: "Can a Caesarean affect future pregnancies?", answer: "A previous Caesarean may influence future birth planning and can increase certain pregnancy risks. Your doctor can explain what this may mean for you." },
    { question: "What if I am afraid of Caesarean Birth?", answer: "You can share your concerns during pregnancy. Understanding the procedure, anaesthesia, recovery and available support may help you make an informed decision." },
  ],
} as const;

export const caesareanBirthEnquiry = {
  eyebrow: "START YOUR BIRTH CONVERSATION",
  heading: "Have questions about Caesarean Birth?",
  body: "Whether a Caesarean has been recommended or you are exploring your birth options, a consultation can help you understand the procedure and discuss your individual care.",
  contactNote: "Contact The Birthwave to arrange an appointment.",
  phone: "+91 79042 51378",
  phoneHref: "tel:+917904251378",
  fields: {
    name: "Full Name",
    phone: "Phone Number",
    email: "Email (optional)",
    message: "What would you like to discuss? (optional)",
    messagePlaceholder: "Share your questions about Caesarean Birth, birth planning or recovery.",
  },
  submitLabel: "SEND ENQUIRY",
  formNote: "This form is intended for appointments and non-urgent enquiries. For urgent pregnancy-related concerns, contact your maternity unit or an emergency medical service.",
} as const;

export const caesareanBirthMobileCta = {
  label: "Discuss Caesarean Birth",
  href: "#caesarean-enquiry",
} as const;

export const caesareanBirthRelatedCare = {
  eyebrow: "CONNECTED BIRTH CARE",
  heading: "Explore care around your pregnancy and birth.",
  services: [
    { title: "Pregnancy & Antenatal Care ↗", description: "Pregnancy monitoring, consultations and preparation.", href: "/services/pregnancy-antenatal-care" },
    { title: "Birth Preparation & Childbirth Education ↗", description: "Understand labour, birth options, birth preferences and newborn care.", href: "/services/birth-preparation" },
    { title: "Natural Birth ↗", description: "Learn about supporting physiological labour when clinically appropriate.", href: "/services/natural-birth" },
    { title: "Vaginal Delivery ↗", description: "Explore vaginal birth and individual birth planning.", href: "/services/normal-birth-delivery" },
    { title: "VBAC (Vaginal Birth After Caesarean) ↗", description: "Understand birth options following a previous Caesarean.", href: "/services/vbac" },
    { title: "Postpartum Recovery & Care ↗", description: "Support for physical recovery, lactation and emotional wellbeing after childbirth.", href: "/services/postpartum-care" },
    { title: "Newborn & Paediatric Care ↗", description: "Medical care and guidance for your newborn's health and development.", href: "/services/newborn-pediatric-care" },
  ],
} as const;
