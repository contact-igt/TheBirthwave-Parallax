/**
 * About page — new section content for "Inside The BirthWave", "Your First
 * Visit" and the compact clinic location strip.
 *
 * Verified facts (clinic name, address, phone, email, Google Maps link) are
 * read directly from `contact-content.ts` at render time — never re-typed
 * here. Only section-specific copy lives in this file.
 *
 * PENDING CLIENT CONFIRMATION:
 *   • No approved interior photographs of the clinic exist in the project.
 *     Placeholders are used and clearly labelled.
 *   • "Your first visit" step descriptions are proposed — needs clinic review.
 *   • Consultation timings are still unconfirmed (contact-content.ts marks
 *     them as "[Birthwave confirmation needed]").
 *   • No founding year or milestone dates found in the existing content.
 */

// ── Inside The BirthWave ──────────────────────────────────────────────────

export const aboutInsideClinic = {
  eyebrow: "Our Clinic",
  heading: "Get to know the space before you visit.",
  description:
    "Take a look inside our clinic in Nungambakkam, Chennai, and explore the spaces where consultations and care take place.",
  video: {
    src: "/brand/about/birthwave-hospital-experience.mp4",
    poster: "/brand/about/birthwave-hospital-experience-poster.jpg",
    title: "Inside The BirthWave Clinic",
    caption: "A walkthrough of our calm, private consultation spaces in Nungambakkam, Chennai.",
    width: 1138,
    height: 640,
    aspectRatio: "1138 / 640",
  },
} as const;

// ── Your First Visit ──────────────────────────────────────────────────────

/**
 * Proposed descriptions of the clinic's intake/consultation process.
 * TODO(approval): confirm with BirthWave that these accurately describe
 * the real patient experience before publishing.
 */
export const aboutFirstVisit = {
  eyebrow: "Before You Arrive",
  heading: "A little clarity before your first appointment.",
  steps: [
    {
      index: "01",
      title: "Before you arrive",
      description:
        "Confirm your appointment and any records to bring.",
    },
    {
      index: "02",
      title: "During your consultation",
      description:
        "Discuss your concerns, relevant history and questions with the appropriate professional.",
    },
    {
      index: "03",
      title: "Your next steps",
      description:
        "Understand the recommendations and any follow-up discussed during your consultation.",
    },
  ],
} as const;

// ── Visit Our Clinic (compact strip) ──────────────────────────────────────

export const aboutClinicStrip = {
  heading: "Visit The BirthWave.",
  /** Consultation timings are still unconfirmed. The component renders
   *  this field only when it contains a real string, not the bracket-
   *  wrapped placeholder from contact-content.ts. */
  directionsLabel: "Get Directions",
  appointmentLabel: "Book an Appointment",
  appointmentHref: "/#connect",
} as const;
