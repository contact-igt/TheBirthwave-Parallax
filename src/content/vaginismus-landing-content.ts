/**
 * Vaginismus & Intimate Wellness — dedicated landing page content.
 * Updated strictly according to the approved revised copy brief.
 */

export const vaginismusHero = {
  eyebrow: "VAGINISMUS & INTIMATE WELLNESS",
  heading: "When penetration feels painful, difficult or impossible, you can talk about it.",
  supportingHeadline: "Vaginismus can involve involuntary tightening of the pelvic-floor muscles around the vaginal opening, making penetration, intimacy or vaginal examinations difficult or painful.",
  body: "At BirthWave, you can begin with a private conversation about what you are experiencing and understand what kind of support may be appropriate for you.",
  primaryCta: { label: "BOOK A PRIVATE CONSULTATION", href: "#vaginismus-enquiry" },
  secondaryCta: { label: "Understand Vaginismus ↓", href: "#vaginismus-what-is" },
} as const;

export const vaginismusWhatIs = {
  eyebrow: "UNDERSTANDING VAGINISMUS",
  heading: "It isn't simply about “trying to relax.”",
  intro: "With vaginismus, the muscles around the vaginal opening may tighten involuntarily when penetration is attempted or anticipated. The experience can be different for every woman. Some may find intercourse painful or impossible, while others may experience difficulty with tampons, vaginal examinations or other forms of penetration.",
  subhead: "You may experience:",
  points: [
    "Pain, burning or discomfort during attempted penetration",
    "Involuntary tightening or a feeling that penetration is “blocked”",
    "Difficulty or inability to have penetrative intercourse",
    "Difficulty with vaginal examinations or inserting a tampon",
    "Fear or anxiety around anticipated penetration because of previous painful experiences",
  ],
  closing: "You do not need to diagnose yourself before seeking help. A consultation can start with understanding what you are experiencing.",
} as const;

export const vaginismusWho = {
  eyebrow: "IS THIS RELEVANT TO ME?",
  heading: "You can start with a conversation, even if you are not sure it is vaginismus.",
  intro: "This consultation may be relevant if:",
  points: [
    { title: "Penetration feels difficult or painful.", body: "You experience pain, tightness or difficulty during attempted penetration." },
    { title: "Your body seems to tighten involuntarily.", body: "You feel pelvic-floor tightening even when you are trying to relax." },
    { title: "Intimate examinations feel difficult or distressing.", body: "Pelvic or vaginal examinations may feel painful, frightening or difficult to tolerate." },
    { title: "You have not been able to have penetrative intercourse.", body: "Or intercourse has repeatedly been painful or difficult." },
    { title: "You have started avoiding intimacy because you expect pain.", body: "Previous discomfort may make future attempts feel stressful or overwhelming." },
    { title: "You are simply unsure what is happening.", body: "You don't need to arrive with a diagnosis. Understanding the problem is part of the consultation." },
  ],
  closing: "Your experience is individual, and the next step should be discussed around your comfort and circumstances.",
  imageKey: "who-this-is-for" as const,
} as const;

export const vaginismusCovers = {
  eyebrow: "WHAT WE TALK THROUGH",
  heading: "Your first appointment starts with understanding your experience.",
  imageKey: "consultation" as const,
  steps: [
    {
      number: "01",
      title: "What you are experiencing",
      body: "Talk about pain, tightness, difficulty with penetration, examinations or other concerns in your own words.",
    },
    {
      number: "02",
      title: "Your relevant history",
      body: "Your clinician may ask about your gynaecological, pelvic, sexual or medical history where relevant.",
    },
    {
      number: "03",
      title: "Your concerns and goals",
      body: "Discuss what has been difficult for you and what you would like help with.",
    },
    {
      number: "04",
      title: "What may help next",
      body: "Based on your individual situation, your clinician can discuss whether further assessment, pelvic-floor support or another form of care may be appropriate.",
    },
  ],
  note: "You can ask questions throughout the consultation and discuss your comfort before proceeding with any assessment.",
} as const;

export const vaginismusSupportWork = {
  eyebrow: "INDIVIDUALISED SUPPORT",
  heading: "Vaginismus care is not one-size-fits-all.",
  body: "Support depends on what is contributing to your symptoms, your comfort and your individual circumstances. Depending on your assessment, care may involve a combination of:",
  points: [
    {
      title: "Understanding your pelvic floor",
      body: "Learning how pelvic-floor muscles respond to pain, fear and anticipated penetration.",
    },
    {
      title: "Pelvic-floor therapy",
      body: "Guided techniques may help you develop awareness, coordination and relaxation of the pelvic-floor muscles.",
    },
    {
      title: "Gradual, comfort-led progression",
      body: "Where appropriate, therapy may progress gradually according to what feels manageable for you.",
    },
    {
      title: "Education around pain and intimacy",
      body: "Understanding what may be contributing to discomfort can make the experience less confusing and help guide the next steps.",
    },
    {
      title: "Collaborative care when needed",
      body: "If another medical, gynaecological or emotional-health concern needs attention, appropriate multidisciplinary support can be discussed.",
    },
  ],
  closing: "The exact approach should be decided only after understanding your individual situation.",
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
      body: "Tell your clinician about concerns, previous difficult experiences or boundaries that are relevant to your care.",
    },
    {
      title: "MOVE STEP BY STEP",
      body: "Any further assessment or therapy should be based on your individual needs and discussed with you beforehand.",
    },
  ],
  note: "Specific assessments or treatment approaches depend on your individual circumstances and should be explained before proceeding.",
} as const;

export const vaginismusClinician = {
  eyebrow: "THE PEOPLE BEHIND YOUR CARE",
  heading: "Pelvic-floor support built around your individual experience.",
  doctorSlug: "dr-adithi-nair",
  philosophy: "Vaginismus can involve both physical and emotional responses around penetration. Care begins by understanding what you are experiencing before deciding what support may be appropriate.",
  profileHref: "/doctors/dr-adithi-nair",
  viewProfileLabel: "View Full Profile",
  bookLabel: "BOOK CONSULTATION",
  bookHref: "#vaginismus-enquiry",
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
  facilityPhotoPendingLabel: "Actual consultation-space photograph — approved photography pending",
  info: [
    {
      label: "Consultation location",
      lines: ["BirthWave Women Wellness Hospital", "Mahalingapuram Main Road, Nungambakkam, Chennai – 600034"],
    },
    {
      label: "Provider",
      lines: ["Dr. Adithi Nair", "Pelvic Floor Therapy · Vaginismus Coach"],
    },
    {
      label: "Booking process",
      lines: ["Book your consultation by phone, WhatsApp or through the enquiry form."],
    },
    {
      label: "What to bring",
      lines: ["If you have relevant previous reports or prescriptions, the team can let you know whether they would be useful for your appointment."],
    },
    {
      label: "Contact",
      lines: ["+91 93630 31925"],
    },
  ],
  phone: "+91 93630 31925",
} as const;

export const vaginismusFaq = {
  eyebrow: "GOOD TO KNOW",
  heading: "Questions about vaginismus and your consultation.",
  items: [
    {
      question: "What is vaginismus?",
      answer: "Vaginismus involves involuntary tightening of the muscles around the vaginal opening when penetration is attempted or anticipated. This can make penetrative intercourse, vaginal examinations, tampon insertion or other forms of penetration painful or difficult.",
    },
    {
      question: "How do I know if I have vaginismus?",
      answer: "Pain or difficulty with penetration can have different causes, so you don't need to diagnose yourself. If penetration repeatedly feels painful, difficult or impossible, a consultation can help you discuss your symptoms and understand what assessment or support may be appropriate.",
    },
    {
      question: "Do I need to have attempted intercourse before seeking help?",
      answer: "No. You can seek help if you are experiencing difficulty with penetration, pelvic-floor tightening, examinations or concerns around intimacy even if you have not had penetrative intercourse.",
    },
    {
      question: "Will I need an internal examination at my first appointment?",
      answer: "Not necessarily. What is appropriate depends on your symptoms and individual circumstances. Your clinician should explain any recommended assessment and discuss it with you before proceeding.",
    },
    {
      question: "Is vaginismus treatment painful?",
      answer: "Support should be adapted to your individual comfort and circumstances. If pelvic-floor therapy or another intervention is recommended, your clinician can explain what it involves before you proceed.",
    },
    {
      question: "How many sessions will I need?",
      answer: "There is no single number that applies to everyone. The type and duration of support depend on your symptoms, history, progress and individual needs.",
    },
    {
      question: "Can vaginismus be treated?",
      answer: "Management approaches are available for vaginismus, but the appropriate approach depends on the individual. Your clinician can assess your situation and discuss suitable options.",
    },
    {
      question: "Can I bring my partner or a support person?",
      answer: "Ask the BirthWave team when booking if you would like someone to accompany you. Whether they are present for all or part of the consultation can also be discussed according to your comfort.",
    },
    {
      question: "Is the consultation confidential?",
      answer: "Your intimate-health concerns should be handled privately and professionally. BirthWave can explain its specific confidentiality and record-handling practices if you have questions before your appointment.",
    },
    {
      question: "Can I ask questions before agreeing to an examination or treatment?",
      answer: "Yes. You should be able to understand why an assessment or treatment is being recommended, what it involves and what alternatives may be available before deciding how you would like to proceed.",
    },
  ],
} as const;

export const vaginismusRelatedCare = {
  eyebrow: "CONNECTED WOMEN'S HEALTH SUPPORT",
  heading: "Other BirthWave services that may be relevant to your care.",
  note: "These services may also connect with your care journey:",
  items: [
    {
      slug: "gynaecology",
      label: "Gynaecology & Women's Health",
      description: "For menstrual, pelvic and other gynaecological concerns.",
    },
    {
      slug: "fertility-preconception",
      label: "Fertility & Preconception",
      description: "Preconception and fertility-related assessment and guidance.",
    },
    {
      slug: "pregnancy-antenatal-care",
      label: "Pregnancy & Antenatal Care",
      description: "Doctor-led pregnancy care from early pregnancy through birth preparation.",
    },
    {
      slug: "nutrition-emotional-wellbeing",
      label: "Emotional Wellbeing",
      description: "Support where emotional or psychological concerns are relevant to your wellbeing.",
    },
  ],
} as const;

export const vaginismusEnquiry = {
  eyebrow: "START WHEN YOU FEEL READY",
  heading: "You can begin with a private conversation.",
  body: "If penetration, intimacy or vaginal examinations have been painful or difficult, you don't need to work out the reason on your own before seeking help. Start by telling us what you have been experiencing. The BirthWave team can help you understand the appropriate next step.",
  primaryCta: "BOOK A PRIVATE CONSULTATION",
  whatsapp: "CHAT ON WHATSAPP",
  phone: "CALL +91 93630 31925",
  dropdownOptions: [
    "Vaginismus",
    "Painful Penetration",
    "Pelvic Floor Concerns",
    "Pain During Intimacy",
    "Difficulty With Vaginal Examination",
    "Other",
  ],
  fields: {
    name: "Full name",
    contact: "Phone number",
    helpOption: "What would you like help with?",
    email: "Email (optional)",
    message: "What would you like to discuss? (optional)",
  },
  submitLabel: "CONTINUE ON WHATSAPP",
  urgentNote: "This form is for appointment information and non-urgent enquiries. For urgent medical concerns, contact your healthcare provider or local emergency service.",
  previewNotice: "Preview — this form is not yet connected to a live enquiry inbox.",
  previewResult: "This is a design preview. No enquiry has been sent — connect this form to a real enquiry endpoint before publishing.",
} as const;

export const vaginismusMobileCta = {
  label: "Book a Private Consultation",
  href: "#vaginismus-enquiry",
} as const;
