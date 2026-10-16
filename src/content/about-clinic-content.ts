/**
 * About page — clinic section content for "Our Clinic / Our Space", "Your First
 * Visit" and "Visit The BirthWave".
 */

// ── Section 06 — Our Clinic ──────────────────────────────────────────────────

export const aboutInsideClinic = {
  eyebrow: "Our Space",
  heading: "A welcoming space for conversations that matter.",
  paragraphs: [
    "Located in Nungambakkam, Chennai, The Birthwave is designed around respectful, attentive healthcare conversations.",
    "Whether you are visiting for gynaecological concerns, fertility guidance, pregnancy care or birth preparation, our aim is to make room for your questions and help you understand the next steps.",
  ],
  description:
    "Located in Nungambakkam, Chennai, The Birthwave is designed around respectful, attentive healthcare conversations.\n\nWhether you are visiting for gynaecological concerns, fertility guidance, pregnancy care or birth preparation, our aim is to make room for your questions and help you understand the next steps.",
  cta: {
    label: "Explore Our Clinic",
    href: "#clinic-location",
  },
  video: {
    src: "/brand/about/birthwave-hospital-experience.mp4",
    poster: "/brand/about/birthwave-hospital-experience-poster.jpg",
    title: "Inside The Birthwave Clinic",
    caption: "A walkthrough of our calm, private consultation spaces in Nungambakkam, Chennai.",
    width: 1138,
    height: 640,
    aspectRatio: "1138 / 640",
  },
} as const;

// ── Section 09 — Before You Arrive ──────────────────────────────────────────

export const aboutFirstVisit = {
  eyebrow: "Your First Visit",
  heading: "Your questions are a good place to begin.",
  steps: [
    {
      index: "01",
      title: "Book Your Consultation",
      description:
        "Contact The Birthwave to arrange an appointment for the service you need.",
    },
    {
      index: "02",
      title: "Share Your Concerns",
      description:
        "Discuss your health history, symptoms, questions and preferences with the appropriate healthcare professional.",
    },
    {
      index: "03",
      title: "Understand Your Options",
      description:
        "Your clinician can explain relevant findings, recommendations and any follow-up or further assessment that may be appropriate.",
    },
  ],
} as const;

// ── Section 10 — Visit The BirthWave ─────────────────────────────────────────

export const aboutClinicStrip = {
  eyebrow: "Visit Us",
  heading: "Find us in Nungambakkam, Chennai.",
  clinicName: "The Birthwave Sanctuary",
  address: "No. 8/15, Mahalingapuram Main Road, Nungambakkam, Chennai \u2013 600034",
  phone: "+91 93630 31925",
  email: "thebirthwave@gmail.com",
  directionsLabel: "GET DIRECTIONS",
  directionsHref:
    "https://maps.google.com/?q=No.+8%2F15%2C+Mahalingapuram+Main+Road%2C+Nungambakkam%2C+Chennai+%E2%80%93+600034",
  appointmentLabel: "Book an Appointment",
  appointmentHref: "/contact",
} as const;
