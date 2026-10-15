/**
 * Master content for /services ("THE BIRTHWAVE — OUR SERVICES")
 * Exactly structured into 13 confirmed sections.
 */

export const ourServicesHero = {
  eyebrow: "OUR SERVICES",
  heading: "Women's healthcare for every stage of life.",
  paragraphs: [
    "At The Birthwave, we bring together gynaecology, fertility, maternity care, preventive health and supportive wellness services to help women understand their health and access appropriate care.",
    "Our approach considers physical, hormonal, emotional and lifestyle factors, with care tailored to individual needs.",
  ],
  primaryCta: { label: "FIND YOUR CARE →", href: "#service-navigation" },
  secondaryCta: { label: "BOOK A CONSULTATION →", href: "/contact" },
} as const;

export const serviceNavigation = {
  eyebrow: "START WHERE YOU ARE",
  heading: "What can we help you with?",
  items: [
    {
      title: "Women's Health & Gynaecology",
      description:
        "Menstrual health, PMOS, adolescent health, intimate wellness, menopause and preventive care.",
      href: "#womens-health",
    },
    {
      title: "Fertility & Preconception",
      description:
        "Fertility consultations, conscious fertility, preconception preparation, planned egg freezing and oncofertility preservation.",
      href: "#fertility-preconception",
    },
    {
      title: "Pregnancy & Antenatal Care",
      description:
        "Obstetric consultations, pregnancy monitoring, nutrition, movement, conscious pregnancy and emotional well-being.",
      href: "#pregnancy-care",
    },
    {
      title: "Birth Preparation & Childbirth Education",
      description:
        "Childbirth education workshops, birth plans, labour preparation, partner involvement and relaxation techniques.",
      href: "#birth-preparation",
    },
    {
      title: "Birth & Delivery",
      description: "Natural birth, vaginal birth, VBAC, caesarean birth and water birth options.",
      href: "#birth-options",
    },
    {
      title: "Postpartum Recovery & Care",
      description:
        "Postnatal recovery, pelvic health, breastfeeding, emotional well-being and parenting support.",
      href: "#postpartum-care",
    },
    {
      title: "Newborn & Paediatric Care",
      description:
        "Newborn consultations, childhood healthcare, growth, development, vaccination guidance and early parenting.",
      href: "#newborn-care",
    },
  ],
  cta: { label: "Explore care areas", href: "#womens-health" },
} as const;

export const womensHealthSection = {
  id: "womens-health",
  eyebrow: "WOMEN'S HEALTH & GYNAECOLOGY",
  heading: "Your health matters at every stage.",
  intro: [
    "Women's healthcare extends beyond fertility and pregnancy.",
    "From adolescence and menstrual health to hormonal changes, menopause and preventive screening, The Birthwave offers consultations for different gynaecological and women's health concerns.",
  ],
  services: [
    {
      title: "Gynaecology & Menstrual Health",
      body: "Medical consultations for irregular or painful periods, abnormal bleeding, pelvic discomfort and other reproductive health concerns.",
      cta: { label: "ENQUIRE ABOUT GYNAECOLOGY →", href: "/contact?service=gynaecology" },
    },
    {
      title: "Adolescent Health",
      body: "Support for menstrual concerns, hormonal changes, reproductive health questions and gynaecological issues during adolescence.",
      cta: { label: "EXPLORE ADOLESCENT HEALTH →", href: "/services/adolescent-health" },
    },
    {
      title: "PMOS (Previously PCOS) & Hormonal Health",
      body: "Polyendocrine Metabolic Ovarian Syndrome (PMOS), previously called Polycystic Ovary Syndrome (PCOS), can affect menstrual cycles, hormone levels, metabolism, skin, weight and reproductive health. Assessment and management are based on individual symptoms, medical history and clinical needs.",
      cta: { label: "EXPLORE PMOS CARE →", href: "/services/pcos-menstrual-health" },
    },
    {
      title: "Vaginismus & Intimate Wellness",
      body: "A private and respectful setting to discuss painful intercourse, difficulties with vaginal penetration, pelvic-floor concerns and other intimate health issues.",
      cta: { label: "EXPLORE INTIMATE WELLNESS →", href: "/services/vaginismus" },
    },
    {
      title: "Weight & Metabolic Wellness",
      body: "Assessment and guidance for obesity, weight-related concerns, metabolic health, nutrition and lifestyle factors affecting women's health.",
      cta: { label: "EXPLORE METABOLIC WELLNESS →", href: "/services/weight-metabolic-wellness" },
    },
    {
      title: "Mental & Emotional Well-being",
      body: "Psychological and emotional well-being support for concerns arising during adolescence, reproductive years, pregnancy, postpartum, perimenopause and menopause.",
      cta: { label: "ENQUIRE ABOUT EMOTIONAL WELL-BEING →", href: "/contact?service=emotional-wellbeing" },
    },
    {
      title: "Perimenopause, Menopause & Post-Menopause",
      body: "Consultations for hormonal changes, menstrual transitions, sleep difficulties, mood changes, vaginal symptoms, bone health and other concerns associated with menopause.",
      cta: { label: "EXPLORE MENOPAUSE CARE →", href: "/services/menopause-care" },
    },
    {
      title: "Preventive Women's Health",
      body: "Guidance on routine gynaecological health assessments, breast health, breast cancer screening and cervical cancer screening, according to age, individual risk and clinical recommendations.",
      cta: { label: "EXPLORE PREVENTIVE HEALTH →", href: "/services/preventive-health" },
    },
  ],
} as const;

export const fertilityPreconceptionSection = {
  id: "fertility-preconception",
  eyebrow: "PLANNING FOR THE FUTURE",
  heading: "Fertility care begins with understanding your reproductive health.",
  intro: [
    "Whether you are preparing for pregnancy, experiencing difficulty conceiving or considering fertility preservation, understanding your individual circumstances is an important starting point.",
    "The Birthwave combines medical consultations with appropriate guidance on nutrition, lifestyle, emotional well-being and reproductive choices.",
  ],
  services: [
    {
      title: "Fertility Assessment & Care",
      body: "Fertility consultations begin with understanding menstrual and reproductive history, existing medical conditions and any concerns about conception. Further investigations and treatment options may be discussed when clinically indicated.",
      cta: { label: "EXPLORE FERTILITY CARE →", href: "/services/fertility-preconception" },
    },
    {
      title: "Conscious Fertility & Preconception",
      body: "Conscious fertility preparation considers physical health, reproductive health, emotional well-being and daily lifestyle while planning for pregnancy. This may include discussions about nutrition, sleep, stress, movement, relationships and individual medical needs. Holistic preconception support complements evidence-based fertility care and does not replace medically indicated assessment or treatment.",
      cta: { label: "EXPLORE CONSCIOUS FERTILITY →", href: "/services/fertility-preconception" },
    },
    {
      title: "Planned Egg Freezing (Social Egg Freezing)",
      body: "Planned egg freezing, medically known as oocyte cryopreservation, involves collecting and freezing eggs for possible future use. Women considering this option can discuss fertility preservation, age-related considerations, medical assessment, potential limitations and specialist treatment pathways. Egg freezing does not guarantee a future pregnancy.",
      cta: { label: "ENQUIRE ABOUT EGG FREEZING →", href: "/contact?service=egg-freezing" },
    },
    {
      title: "Oncofertility & Fertility Preservation",
      body: "Some cancer treatments may affect future fertility. Oncofertility care involves timely discussions about reproductive health and fertility preservation before treatments that may affect ovarian function. Depending on the medical circumstances, options such as egg, embryo or ovarian tissue freezing may be considered through an appropriate fertility preservation specialist. Decisions require coordination with the treating oncology team and should not unnecessarily delay cancer treatment.",
      cta: { label: "ENQUIRE ABOUT ONCOFERTILITY →", href: "/contact?service=oncofertility" },
    },
    {
      title: "Preconception Nutrition",
      body: "Nutritional assessment and individual guidance to address dietary needs, nutritional deficiencies and relevant metabolic concerns while preparing for pregnancy.",
      cta: { label: "ENQUIRE ABOUT NUTRITION SUPPORT →", href: "/contact?service=nutrition" },
    },
    {
      title: "Strength & Conditioning",
      body: "Appropriate exercise and strength-conditioning guidance to support physical fitness, mobility and general well-being before pregnancy.",
      cta: { label: "EXPLORE FITNESS & WELLNESS →", href: "/services/fitness-movement" },
    },
  ],
} as const;

export const pregnancyAntenatalSection = {
  id: "pregnancy-care",
  eyebrow: "DURING PREGNANCY",
  heading: "Medical care for your pregnancy. Support for you as a person.",
  intro: [
    "Pregnancy involves important medical assessments alongside changes in physical health, emotions and everyday life.",
    "The Birthwave's antenatal approach brings together obstetric care and appropriate supportive services, with recommendations based on each woman's health and pregnancy.",
  ],
  services: [
    {
      title: "Obstetric Consultations & Monitoring",
      body: "Routine pregnancy consultations to monitor maternal health, review pregnancy progress and discuss concerns requiring medical assessment.",
    },
    {
      title: "Laboratory Investigations & Scans",
      body: "Guidance on recommended blood tests, urine investigations, ultrasound scans and other pregnancy-related assessments based on clinical recommendations.",
    },
    {
      title: "Nutrition During Pregnancy",
      body: "Individual nutritional guidance to address changing dietary needs, nutritional deficiencies, appropriate weight gain and pregnancy-related health considerations.",
    },
    {
      title: "Pregnancy Physiotherapy",
      body: "Physiotherapy assessment and appropriate guidance for musculoskeletal discomfort, posture, mobility and pelvic health during pregnancy.",
    },
    {
      title: "Pregnancy Yoga, Fitness & Strength Conditioning",
      body: "Pregnancy-appropriate movement, yoga, mobility exercises and strength-conditioning guidance for women who are medically suitable to participate. Exercise plans are adapted to individual fitness levels, health considerations and pregnancy progression.",
    },
    {
      title: "Conscious Pregnancy & Garbh Sanskar",
      body: "Conscious pregnancy encourages women to pay attention to physical health, emotional well-being and the experience of pregnancy. Garbh Sanskar includes traditional prenatal well-being practices such as meditation, mindful routines, music, relaxation and bonding activities. These practices may be explored according to personal beliefs and preferences alongside regular medical care.",
    },
    {
      title: "Sound-Based Relaxation During Pregnancy",
      body: "Music listening and gentle sound-based relaxation may be incorporated into pregnancy well-being routines for women who find them calming. These activities are intended for relaxation and personal well-being rather than as treatments for medical conditions or methods of influencing fetal development.",
    },
    {
      title: "Mental & Emotional Well-being During Pregnancy",
      body: "Support for emotional changes, pregnancy-related stress, anxiety, adjustment difficulties and other mental health concerns. Psychological assessment or additional professional care may be recommended when appropriate.",
    },
  ],
  cta: {
    label: "EXPLORE PREGNANCY & ANTENATAL CARE →",
    href: "/services/pregnancy-antenatal-care",
  },
} as const;

export const birthPreparationSection = {
  id: "birth-preparation",
  eyebrow: "PREPARING FOR BIRTH",
  heading: "Understand birth before labour begins.",
  intro: [
    "Childbirth education has been an important part of The Birthwave's work over the past two years.",
    "Through childbirth education workshops and preparation sessions, we aim to help expectant parents understand labour, explore birth options, prepare questions and participate in conversations about their care.",
    "Our approach combines practical birth-related information with physical preparation, emotional awareness and partner involvement.",
  ],
  services: [
    {
      title: "Birth Preparation & Childbirth Education",
      body: "Explore the stages of labour, common procedures, comfort measures, pain-relief options and the changes that may occur during childbirth.",
    },
    {
      title: "Birth Plan",
      body: "A birth plan helps communicate preferences about labour, support people, comfort, communication and decision-making. Plans remain flexible because medical needs may change during labour.",
    },
    {
      title: "Partner Preparation & Involvement",
      body: "Partners and support persons can learn about the labour process, emotional support, comfort measures and practical ways to participate in birth preparation.",
    },
    {
      title: "Breathing, Relaxation & Labour Comfort",
      body: "Explore breathing practices, relaxation, movement and comfort techniques that may be useful during labour.",
    },
    {
      title: "Emotional Preparation for Birth",
      body: "Discuss expectations, uncertainty, previous experiences and emotional concerns related to childbirth.",
    },
    {
      title: "Doula Support",
      body: "Understand the role of a doula in providing non-medical physical, emotional and informational support. The availability and involvement of doulas depend on individual arrangements and delivery-facility policies.",
    },
  ],
  cta: {
    label: "EXPLORE CHILDBIRTH EDUCATION →",
    href: "/services/birth-preparation",
  },
} as const;

export const birthOptionsSection = {
  id: "birth-options",
  eyebrow: "BIRTH CARE",
  heading: "Understanding your birth options.",
  intro: [
    "Birth preferences are important, and so are individual medical circumstances.",
    "The appropriate delivery approach depends on maternal health, pregnancy history, fetal well-being and the progress of labour.",
  ],
  services: [
    {
      title: "Natural Birth",
      body: "Natural birth commonly refers to a preference for physiological labour with minimal intervention where clinically appropriate. Women can discuss their preferences, available comfort measures and circumstances in which medical intervention may be necessary.",
      cta: { label: "EXPLORE NATURAL BIRTH →", href: "/services/natural-birth" },
    },
    {
      title: "Vaginal Birth",
      body: "Vaginal birth involves delivery through the birth canal. Consultations can help women understand the stages of labour, potential interventions, pain-relief options and what may happen during delivery.",
      cta: { label: "ENQUIRE ABOUT VAGINAL BIRTH →", href: "/contact?service=vaginal-birth" },
    },
    {
      title: "VBAC — Vaginal Birth After Caesarean",
      body: "For women who have previously delivered by caesarean section, vaginal birth in a subsequent pregnancy may be an option. Suitability is assessed individually, considering previous surgical details, current pregnancy and the availability of appropriate medical facilities.",
      cta: { label: "EXPLORE VBAC →", href: "/services/vbac" },
    },
    {
      title: "Caesarean Birth",
      body: "Caesarean birth is a surgical delivery that may be planned or recommended based on maternal or fetal health considerations. Women can discuss indications, preparation, anaesthesia, recovery and postoperative care.",
      cta: { label: "ENQUIRE ABOUT CAESAREAN BIRTH →", href: "/contact?service=caesarean-birth" },
    },
    {
      title: "Water Birth",
      body: "Water birth involves delivering a baby while immersed in water. Water immersion during labour is a separate option. Women interested in water birth can discuss their preferences, medical suitability, potential risks and the arrangements required for safe monitoring and delivery. Availability depends on the necessary facilities, trained professionals, clinical protocols and individual assessment.",
      cta: { label: "DISCUSS WATER BIRTH →", href: "/contact?service=water-birth" },
    },
  ],
} as const;

export const birthApproachSection = {
  id: "birth-approach",
  eyebrow: "YOUR BIRTH EXPERIENCE",
  heading: "Your preferences deserve a place in the conversation.",
  intro: [
    "At The Birthwave, preparing for birth includes understanding how you would like to experience labour and delivery.",
    "A positive birth experience may involve clear communication, informed choices, emotional support and respect for personal preferences, regardless of the eventual mode of delivery.",
  ],
  points: [
    {
      title: "Your Birth Plan",
      body: "Discuss what matters most to you, including comfort, support people, communication, pain relief and decisions during labour.",
    },
    {
      title: "Partner & Doula Involvement",
      body: "Discuss the role of your partner or chosen support person and whether doula support can be incorporated into the arrangements for your delivery.",
    },
    {
      title: "Birth Photography & Videography",
      body: "For families interested in documenting childbirth, photography or videography arrangements can be discussed in advance. Recording is subject to privacy, informed consent, clinical circumstances and delivery-facility policies.",
    },
    {
      title: "Respectful Communication",
      body: "Understand available care options, ask questions and participate in decisions according to the clinical circumstances.",
    },
    {
      title: "Flexibility Throughout Labour",
      body: "Birth may not always follow the original plan. When medical circumstances change, the care team can explain the reasons for recommended interventions and discuss available options.",
    },
  ],
  cta: {
    label: "DISCUSS YOUR BIRTH PREFERENCES →",
    href: "/services/natural-birth#enquiry",
  },
} as const;

export const postpartumSection = {
  id: "postpartum-care",
  eyebrow: "AFTER BIRTH",
  heading: "Your care continues after childbirth.",
  intro: [
    "The weeks and months following delivery can bring physical, hormonal, emotional and practical changes.",
    "The Birthwave's postpartum approach considers maternal recovery, feeding needs, pelvic health, emotional well-being and the transition into parenthood.",
  ],
  services: [
    {
      title: "Postpartum Recovery",
      body: "Postnatal consultations to assess recovery, healing, physical symptoms and maternal well-being following childbirth.",
      cta: { label: "ENQUIRE ABOUT POSTPARTUM CARE →", href: "/contact?service=postpartum-care" },
    },
    {
      title: "Lactation & Breastfeeding Support",
      body: "Professional guidance for breastfeeding, latching difficulties, feeding concerns, milk-supply questions and early infant feeding.",
      cta: { label: "ENQUIRE ABOUT LACTATION SUPPORT →", href: "/contact?service=lactation" },
    },
    {
      title: "Pelvic Health & Physiotherapy",
      body: "Assessment and appropriate physiotherapy guidance for postpartum pelvic-floor concerns, musculoskeletal symptoms and physical recovery.",
      cta: { label: "ENQUIRE ABOUT PELVIC HEALTH →", href: "/contact?service=pelvic-health" },
    },
    {
      title: "Postpartum Mental Health",
      body: "Support for emotional changes, anxiety, low mood, stress, adjustment difficulties and other psychological concerns after childbirth. Concerns suggestive of postpartum depression or other mental health conditions may require further professional assessment and treatment.",
      cta: { label: "ENQUIRE ABOUT MATERNAL MENTAL HEALTH →", href: "/contact?service=maternal-mental-health" },
    },
    {
      title: "Physical Fitness & Postpartum Wellness",
      body: "Individual guidance on returning to physical activity, rebuilding functional strength and addressing recovery-related fitness concerns.",
      cta: { label: "ENQUIRE ABOUT POSTPARTUM WELLNESS →", href: "/contact?service=postpartum-fitness" },
    },
    {
      title: "Parenting & Family Adjustment",
      body: "Supportive guidance for parents navigating newborn care, changing routines, feeding, sleep-related questions and the emotional adjustments of parenthood.",
      cta: { label: "ENQUIRE ABOUT PARENTING SUPPORT →", href: "/contact?service=parenting-support" },
    },
  ],
} as const;

export const newbornPediatricSection = {
  id: "newborn-care",
  eyebrow: "NEWBORN & PAEDIATRIC HEALTH",
  heading: "Care for your newborn. Guidance as your child grows.",
  intro: [
    "From the first days after birth through infancy and childhood, children require age-appropriate healthcare, growth monitoring and preventive care.",
    "The Birthwave offers newborn and paediatric consultations along with relevant guidance for parents.",
  ],
  services: [
    {
      title: "Newborn Care",
      body: "Medical assessment and guidance for newborn health, early feeding, weight monitoring and common newborn concerns.",
    },
    {
      title: "Paediatric Consultations",
      body: "Assessment and management of common childhood illnesses and health concerns.",
    },
    {
      title: "Growth & Development",
      body: "Monitoring of physical growth and developmental milestones, with further assessment when required.",
    },
    {
      title: "Vaccination Guidance",
      body: "Information on recommended childhood immunisations, vaccination schedules and related parental questions.",
    },
    {
      title: "Infant Feeding & Nutrition",
      body: "Guidance on feeding during infancy, complementary foods and age-appropriate nutritional needs.",
    },
    {
      title: "Conscious Parenting",
      body: "Guidance on responsive parenting, understanding children's emotional needs, communication and age-appropriate care.",
    },
  ],
  cta: {
    label: "ENQUIRE ABOUT PAEDIATRIC CARE →",
    href: "/contact?service=paediatric-care",
  },
} as const;

export const findYourCareSection = {
  id: "find-your-care",
  eyebrow: "NOT SURE WHERE TO START?",
  heading: "You don't have to know which service you need.",
  paragraphs: [
    "Women's healthcare concerns can overlap.",
    "A menstrual concern may involve hormonal or metabolic health. Fertility questions may require reproductive assessment. Pregnancy and postpartum care may involve several healthcare professionals.",
    "Tell us what you would like help with, and the team can guide you towards an appropriate consultation.",
  ],
  primaryCta: { label: "FIND YOUR CARE →", href: "#service-navigation" },
  secondaryCta: { label: "CONTACT OUR TEAM →", href: "/contact" },
} as const;

export const ourApproachSection = {
  id: "our-approach",
  eyebrow: "The Birthwave APPROACH",
  heading: "Different needs. Connected care.",
  paragraphs: [
    "At The Birthwave, women's healthcare is approached through medical assessment alongside relevant physical, nutritional, emotional and lifestyle considerations.",
    "Depending on individual needs, care may involve obstetricians, gynaecologists, paediatricians, physiotherapists, nutrition professionals, psychologists and other qualified care providers.",
    "The aim is to support informed decisions and coordinate relevant services without assuming that every woman requires the same care pathway.",
  ],
  cta: { label: "ABOUT The Birthwave →", href: "/about" },
} as const;

export const ourServicesFinalCta = {
  id: "contact",
  eyebrow: "START WITH A CONVERSATION",
  heading: "Whatever your concern, start with a conversation.",
  body: "Whether you have a gynaecological concern, are exploring fertility options, preparing for childbirth, recovering after delivery or seeking newborn and paediatric care, The Birthwave provides consultations across different areas of women's and children's health.",
  primaryCta: { label: "BOOK A CONSULTATION →", href: "/contact" },
  secondaryCta: {
    label: "CHAT ON WHATSAPP →",
    href: "https://wa.me/917904251378",
  },
  phone: "+91 93630 31925",
  phoneHref: "tel:+919363031925",
  location: "Mahalingapuram Main Road, Nungambakkam, Chennai – 600034",
} as const;
