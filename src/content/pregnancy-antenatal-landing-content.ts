/**
 * Pregnancy & Antenatal Care — dedicated landing page content.
 *
 * A SEPARATE content file from `services-content.ts` on purpose: that
 * file's own `pregnancy-antenatal-care` entry (name, slug, shortDescription,
 * overview, highlights, media.alt) is the shared service record every
 * other consumer reads (Quick Overview, the Sticky Showcase, Find the
 * Right Care, `generateStaticParams`) — untouched by this page. Everything
 * below is this landing page's own, additional copy, drafted from the
 * approved editorial preview (antenatal-editorial-preview-v2.html) —
 * approved DIRECTION and wording, not yet a clinician-signed-off medical
 * document. No outcome, statistic, fee, credential or testimonial is
 * invented anywhere below; every fact this project cannot currently
 * verify (clinic address, hours, phone number, the treating clinician's
 * identity, consultation fees, the support-person policy) is left as an
 * explicit bracketed placeholder, exactly as the approved preview itself
 * does — never silently filled with a plausible-sounding guess.
 */

export const pregnancyLandingHero = {
  eyebrow: "Pregnancy & Antenatal Care",
  headingLines: ["Care for your pregnancy.", "Clarity for what comes next."],
  supporting:
    "From your first positive pregnancy test to the weeks leading up to birth, antenatal care helps you understand how your pregnancy is progressing and prepare for the journey ahead. \nAt The BirthWave, your care brings together regular obstetric consultations, pregnancy monitoring, guidance on recommended tests and scans, nutrition, wellbeing and preparation for childbirth.",
  primaryCta: { label: "Request a consultation", href: "#appointment" },
  secondaryCta: { label: "Explore your first visit", href: "#pregnancy-first" },
  // No verified clinic location exists anywhere in this project yet (see
  // src/app/contact/page.tsx's own TODO) — kept as the same explicit
  // bracketed placeholder the approved preview itself uses, not a
  // fabricated address.
  location: "The Birthwave · [Verified clinic location]",
} as const;

export const pregnancyLandingIntro = {
  eyebrow: "More than a check-in",
  note: ["Your questions.", "Your preferences.", "Your next step."],
  heading: ["Care for the pregnancy.", "Space for the person."],
  paragraphs: [
    "Antenatal care brings together conversations about your health, appropriate checks, and guidance on tests and screening.",
    "It is also time to ask the small questions, discuss the unfamiliar, and understand what comes next.",
  ],
  points: [
    { number: "01", label: "Understand your care" },
    { number: "02", label: "Discuss your preferences" },
    { number: "03", label: "Plan the next step together" },
  ],
} as const;

export const pregnancyLandingCareIncludes = {
  eyebrow: "What care may include",
  heading: ["Different needs.", "Connected care."],
  note: "Your care evolves as your pregnancy progresses and is planned according to your individual health and pregnancy needs.",
  stories: [
    {
      tag: "Keeping track of your pregnancy",
      imageKey: "pregnancy-antenatal-checkins-scans",
      items: [
        {
          number: "01",
          title: "Regular antenatal consultations",
          body: "Review how you are feeling, discuss symptoms and concerns, monitor your pregnancy and plan the next stage of care.",
        },
        {
          number: "02",
          title: "Tests, scans & screening guidance",
          body: "Understand which investigations may be recommended during pregnancy, why they are being advised and what the results mean for your care.",
        },
      ],
    },
    {
      tag: "Looking ahead, together",
      imageKey: "pregnancy-antenatal-wellbeing-birth-prep",
      items: [
        {
          number: "03",
          title: "Nutrition & everyday wellbeing",
          body: "Discuss food, supplements, movement, sleep, common pregnancy concerns and other everyday questions that can come up during pregnancy.",
        },
        {
          number: "04",
          title: "Preparing for labour & birth",
          body: "As your pregnancy progresses, conversations can move towards labour, childbirth preparation, your birth preferences and the different birth pathways that may be relevant to you.",
        },
      ],
    },
  ],
  disclaimer: "Your appointment schedule, investigations and pregnancy care plan are individualised according to your medical history and how your pregnancy progresses.",
} as const;

export const pregnancyLandingFirstConsultation = {
  eyebrow: "Your first consultation",
  heading: "It starts with understanding you.",
  body: "Whether you've just discovered you're pregnant or are transferring your pregnancy care to The BirthWave, your first consultation gives your doctor a clearer picture of your health, pregnancy and any questions or concerns you may have.",
  imageKey: "pregnancy-antenatal-first-consultation",
  steps: [
    {
      number: "01 — Listen",
      title: "Discuss your health & pregnancy",
      body: "Talk through your medical history, previous pregnancies, current symptoms, medications, lifestyle and anything you're concerned about.",
    },
    {
      number: "02 — Review",
      title: "Bring what you have",
      body: "If you've already had blood tests, pregnancy scans or consultations elsewhere, bring the available reports so your doctor can review them in context.",
    },
    {
      number: "03 — Plan",
      title: "Understand the next steps",
      body: "Your doctor can discuss appropriate investigations, supplements, follow-up appointments and the next stage of your pregnancy care.",
    },
  ],
  note: "Bring any available medical records, scan reports, test results and a list of medicines or supplements you currently take.",
} as const;

/**
 * The person behind your care — no confirmed clinician is mapped to THIS
 * specific service yet. `doctors-content.ts` has real, approved team
 * entries, but the one whose own `relatedCareSlugs` includes
 * "pregnancy-antenatal-care" (Dr Amudha Varshini) is a naturopathy/yoga
 * specialist, not the obstetric antenatal clinician a visitor would
 * expect this section to introduce — presenting her here would be
 * exactly the "assume a listed doctor provides this service unless
 * confirmed" mistake the brief rules out. Kept as the same explicit
 * placeholder the approved preview itself uses until a real mapping is
 * confirmed.
 */
export const pregnancyLandingClinician = {
  eyebrow: "The person behind your care",
  heading: ["Know who you'll", "be speaking with."],
  portraitNote: "Actual clinician portrait\nApproved photography pending",
  namePlaceholder: "Dr [Verified full name]",
  credentialsPlaceholder: "[Verified qualification] · [Verified role]",
  bioPlaceholder: "[Approved introduction describing this clinician's role in antenatal care and approach to consultations.]",
  footnote: "Only verified clinician information and real portraits appear here.",
} as const;

export const pregnancyLandingApproach = {
  eyebrow: "The Birthwave approach",
  heading: "Care that keeps you informed.",
  imageKey: "pregnancy-antenatal-care-team",
  values: [
    { title: "Understand the recommendation", body: "When a test, scan, treatment or next step is recommended, we want you to understand why it is being considered and what it means for your pregnancy." },
    { title: "Discuss your questions & preferences", body: "Pregnancy comes with decisions as well as questions. Your concerns, preferences and expectations are part of the conversation." },
    { title: "Prepare beyond the next appointment", body: "As pregnancy progresses, care can gradually connect with childbirth education, birth preparation, nutrition, movement, breastfeeding preparation and postpartum support according to your needs." },
  ],
} as const;

export const pregnancyLandingFaq = {
  eyebrow: "Good to know",
  heading: "Questions about pregnancy & antenatal care.",
  items: [
    {
      question: "When should I have my first antenatal appointment?",
      answer:
        "You can contact your obstetrician after confirming your pregnancy. The timing of your first appointment and any early investigations will depend on your pregnancy, symptoms, medical history and previous pregnancy history.",
    },
    {
      question: "What happens during an antenatal appointment?",
      answer:
        "Appointments can include a review of how you're feeling, your symptoms and concerns, pregnancy monitoring, discussion of test or scan results and planning for the next stage of care. What is needed at each visit changes as pregnancy progresses.",
    },
    {
      question: "How often will I need antenatal check-ups?",
      answer:
        "There isn't one appointment schedule that is appropriate for every pregnancy. Your doctor will recommend follow-ups according to your stage of pregnancy, medical history and individual clinical needs.",
    },
    {
      question: "What tests and scans are needed during pregnancy?",
      answer:
        "Different blood tests, screenings and ultrasound scans may be recommended at different stages of pregnancy. Your doctor can explain what is appropriate for you, why it is recommended and when it should be done.",
    },
    {
      question: "Can I discuss food, supplements and exercise during my appointments?",
      answer:
        "Yes. Pregnancy consultations are also an opportunity to ask about nutrition, supplements, physical activity and everyday wellbeing. The BirthWave also provides dedicated nutrition, pregnancy movement and supportive care where appropriate.",
    },
    {
      question: "When should I start preparing for childbirth?",
      answer:
        "Birth preparation can develop gradually during pregnancy. As you move closer to your due date, you can discuss labour, childbirth education, birth preferences, pain-relief options and the different birth pathways that may be relevant to you.",
    },
    {
      question: "Can I discuss Vaginal delivery, natural birth or VBAC during antenatal care?",
      answer:
        "Yes. Your birth preferences can be discussed during pregnancy. Whether a particular birth pathway is appropriate depends on your individual pregnancy, medical and obstetric history, and how the pregnancy progresses.",
    },
    {
      question: "Can my partner be involved in pregnancy and birth preparation?",
      answer:
        "Yes. Partners can be involved in relevant discussions and childbirth preparation so they better understand the pregnancy, labour and how they can support you.",
    },
    {
      question: "I'm already receiving pregnancy care elsewhere. Can I move my care to The BirthWave?",
      answer:
        "You can request a consultation and bring your existing prescriptions, test results, scan reports and pregnancy records. The doctor can review your history and discuss the appropriate next steps.",
    },
  ],
} as const;

/** No verified clinic address, hours, phone number, or access details
 * exist anywhere in this project (src/app/contact/page.tsx is itself an
 * explicit "confirmed contact details pending" placeholder route) — every
 * field below is left as the same explicit bracketed placeholder the
 * approved preview uses, never a fabricated address. */
export const pregnancyLandingVisit = {
  eyebrow: "Visit The Birthwave",
  heading: "Plan your visit.",
  note: "The practical details, before you set out.",
  info: [
    { label: "Find us", lines: ["[Verified clinic address]", "[City & postcode]"] },
    { label: "Consultation hours", lines: ["[Confirmed days]", "[Confirmed times]"] },
    { label: "Contact the clinic", lines: ["[Verified phone number]"] },
    { label: "Getting here", lines: ["[Confirmed parking and accessibility information]"] },
  ],
} as const;

/**
 * Appointment request — TODO(infra): exactly like `doctorsEnquiryForm`
 * (doctors-content.ts), no backend endpoint or verified inbox exists yet
 * to actually receive a submission. That existing form's own pattern
 * shows a "received" confirmation after a local-only submit; THIS page's
 * own brief is explicit that a preview must not do that ("do not fake
 * submission success or appointment confirmation"), so
 * `pregnancy-antenatal-appointment.tsx` shows an honest "this is a design
 * preview, not yet connected" message instead — see that component's own
 * comment. Wire this to a real endpoint once one exists; do not fabricate
 * a submission destination meanwhile. */
export const pregnancyLandingAppointment = {
  eyebrow: "Take the next step",
  heading: "Start with a conversation about your care.",
  body: "Request an antenatal consultation. Our team will contact you to discuss availability and the next steps.",
  fields: {
    name: "Name",
    contact: "Contact number",
    contactMethod: "Preferred contact method",
    consent: "You can contact me about this enquiry using the details above.",
  },
  contactMethods: ["Phone call", "WhatsApp", "Email"] as const,
  submitLabel: "Request a consultation",
  previewNotice: "Preview — this form is not yet connected to a live enquiry inbox.",
  previewResult: "This is a design preview. No request has been sent — connect this form to a real enquiry endpoint before publishing.",
} as const;

export const pregnancyLandingMobileCta = {
  label: "Request a consultation",
  href: "#appointment",
} as const;

/**
 * Related Care — site-architecture audit: every other dedicated service
 * landing page (birth-preparation, normal-birth-delivery, vbac,
 * fertility-preconception, vaginismus, gynaecology, lactation,
 * postpartum-care, nutrition-emotional-wellbeing, newborn-pediatric-care)
 * already carries this exact section; this was the one page missing it —
 * a real internal-linking gap on the site's single most-linked-to service.
 * Same restrained pattern as the other ten: four separate, existing
 * services, names/slugs/hrefs all read from `services-content.ts` rather
 * than re-typed. Chosen to mirror the reciprocal links already pointing
 * AT this page from `birth-preparation`, `normal-birth-delivery` and
 * `vbac`'s own Related Care sections, plus `nutrition-emotional-wellbeing`
 * (a confirmed pregnancy-adjacent service, already linking back here).
 */
export const pregnancyLandingRelatedCare = {
  eyebrow: "Related Care",
  heading: "Explore related, separate services.",
  note: "These are separate services at The Birthwave, not automatically included in antenatal care.",
  slugs: ["birth-preparation", "natural-birth", "normal-birth-delivery", "vbac", "nutrition-emotional-wellbeing"],
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
    href: "https://wa.me/919840798472",
  },
  benefits: [
    "One-on-one clinician time",
    "Evidence-informed discussions",
    "Continuous pregnancy support",
    "Respect for your birth preferences",
  ] as const,
} as const;
