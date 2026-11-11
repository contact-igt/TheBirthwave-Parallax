import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalContactList,
  LegalDocument,
  LegalNotice,
  type LegalSection,
} from "@/components/legal/legal-document";
import { contactPlaceholders } from "@/content/contact-content";
import styles from "./terms-page.module.css";

export const metadata: Metadata = {
  title: "Terms & Conditions | The Birthwave",
  description:
    "The terms that apply when you use The Birthwave website, send an enquiry, register with the clinic or contact our team.",
};

/** Update this whenever the wording below changes. */
const LAST_UPDATED = "11 November 2026";

/** Cancellation and refund terms (section 6). Keep the copy consistent with these. */
const REFUND = {
  fullDays: 7, // cancel this many days or more before the start: full refund
  partialDays: 3, // cancel between this and fullDays: partial refund
  partialPercent: 50,
  consultationHours: 24,
  initiate: "5–7 working days",
  bankCredit: "5–10 working days",
} as const;

const sections: LegalSection[] = [
  {
    id: "about",
    title: "About these terms",
    content: (
      <>
        <p>
          These Terms &amp; Conditions (the &ldquo;Terms&rdquo;) govern your use
          of the website of The Birthwave (&ldquo;The Birthwave&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;), a
          women&rsquo;s health and maternity care practice at{" "}
          {contactPlaceholders.clinicAddress}, and the enquiry, contact and
          registration features available through it.
        </p>
        <p>
          By using this website, submitting an enquiry or registering with us,
          you agree to these Terms. If you do not agree, please do not use the
          website. Your clinical care is governed separately by the advice,
          consent and treatment arrangements agreed directly with your treating
          doctor or practitioner.
        </p>
      </>
    ),
  },
  {
    id: "medical-information",
    title: "Medical information disclaimer",
    content: (
      <>
        <p>
          The content on this website, including articles, blog posts, service
          descriptions, videos and frequently asked questions, is provided for
          general information and education only. It is not medical advice and
          is not a substitute for a consultation, examination or diagnosis by a
          qualified healthcare professional.
        </p>
        <p>
          Every pregnancy, body and medical history is different. Do not start,
          stop or change any treatment, medication or birth plan based on
          information on this website without speaking to your doctor. Using the
          website or contacting us does not by itself create a
          doctor&ndash;patient relationship.
        </p>
      </>
    ),
  },
  {
    id: "emergencies",
    title: "Emergencies",
    content: (
      <>
        <p>
          Our website, enquiry forms, email inbox and WhatsApp number are not
          monitored around the clock and are not emergency services. If you
          experience heavy bleeding, severe abdominal pain, reduced or absent
          fetal movements, fits, difficulty breathing, chest pain or any other
          symptom that worries you, call <a href="tel:112">112</a> or{" "}
          <a href="tel:108">108</a>, or go to the nearest emergency department
          immediately. Do not wait for a reply from us.
        </p>
      </>
    ),
  },
  {
    id: "appointments",
    title: "Enquiries, appointments and registration",
    content: (
      <>
        <p>
          Submitting an enquiry through this website sends your request to our
          team so that we can get back to you. It does not confirm an
          appointment. An appointment is confirmed only when our team confirms
          the date and time with you directly by phone, WhatsApp or email.
        </p>
        <p>
          When you send an enquiry or register with the clinic, you agree to
          give information that is accurate, complete and your own, or that you
          are authorised to give on behalf of another person. Registration for a
          person under 18 must be completed by a parent or legal guardian.
        </p>
        <p>
          Please keep website enquiries brief. Do not send detailed medical
          histories, reports or images through the website; your doctor will ask
          for these during your consultation.
        </p>
      </>
    ),
  },
  {
    id: "fees",
    title: "Consultations, fees and attendance",
    content: (
      <>
        <p>
          Consultation fees, charges for procedures, investigations, packages
          and workshops, and accepted payment methods are confirmed by our team
          before or at the time of your visit. Any prices mentioned on the
          website are indicative and may change. Cancellations and refunds are
          covered in <a href="#refunds">section 6</a> below.
        </p>
        <p>
          If you cannot attend an appointment, please let us know as early as
          possible so that we can offer the time to someone else. Appointment
          times are approximate: clinical priorities, including emergencies and
          births, can sometimes cause delays, and we will do our best to keep
          you informed.
        </p>
      </>
    ),
  },
  {
    id: "refunds",
    title: "Cancellations and refunds",
    content: (
      <>
        <p>
          <strong>Workshops and classes.</strong> If you need to cancel your
          place in a childbirth preparation workshop, antenatal or postnatal
          class, please tell us as early as possible. Refunds depend on when we
          receive your cancellation, counted from the workshop&rsquo;s start
          date:
        </p>
        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th scope="col">When you cancel</th>
                <th scope="col">What you receive</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{REFUND.fullDays} days or more before the start</td>
                <td>Full refund of the workshop fee</td>
              </tr>
              <tr>
                <td>
                  {REFUND.partialDays} to {REFUND.fullDays - 1} days before the
                  start
                </td>
                <td>
                  {REFUND.partialPercent}% refund, or a free transfer to a later
                  batch
                </td>
              </tr>
              <tr>
                <td>
                  Less than {REFUND.partialDays} days before the start, or not
                  attending
                </td>
                <td>
                  No refund. A one-time transfer to a later batch may be
                  offered, subject to availability
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          <strong>If your pregnancy or health changes.</strong> If you cannot
          start or complete a workshop because of an early birth, hospital
          admission or rest advised by your doctor, we will offer a transfer to
          a later batch or a refund for the sessions you have not attended,
          whatever the timing. We may ask for a short note from your doctor.
        </p>
        <p>
          <strong>Workshops in progress.</strong> Once a multi-session workshop
          has started, fees are not refundable for sessions missed for personal
          reasons; where possible, you may join a missed session in a later
          batch. You may change the birth partner attending with you at any
          time.
        </p>
        <p>
          <strong>If we cancel or reschedule.</strong> You can choose between a
          full refund and a free transfer to another batch.
        </p>
        <p>
          <strong>Consultations.</strong> A consultation paid in advance can be
          rescheduled or fully refunded if you cancel at least{" "}
          {REFUND.consultationHours} hours before the appointment. With less
          notice, or if you do not attend, we will offer one reschedule. Fees
          for consultations, tests or services already provided are not
          refundable.
        </p>
        <p>
          <strong>Duplicate payments.</strong> Any amount charged twice or paid
          in excess is refunded in full once verified.
        </p>
      </>
    ),
  },
  {
    id: "refund-process",
    title: "How to request a refund",
    content: (
      <>
        <p>
          Email{" "}
          <a href={`mailto:${contactPlaceholders.email}`}>
            {contactPlaceholders.email}
          </a>{" "}
          or message us on WhatsApp at {contactPlaceholders.whatsapp} with your
          name, registered phone number, the workshop or appointment date and
          your payment reference. The date we receive your message is the date
          of cancellation, and we will confirm the outcome in writing.
        </p>
        <p>
          Approved refunds are initiated within {REFUND.initiate} to the
          original method of payment; your bank may take a further{" "}
          {REFUND.bankCredit} to credit the amount. Cash payments are refunded
          by bank transfer to an account in the payer&rsquo;s name.
        </p>
      </>
    ),
  },
  {
    id: "delivery",
    title: "Service delivery and booking confirmation",
    content: (
      <>
        <p>
          The Birthwave provides healthcare services, workshops and classes. We
          do not sell or ship physical products, so no shipping or delivery
          charges apply. Services are delivered in person at our clinic, or
          online for sessions we offer virtually, on the date and time confirmed
          with you.
        </p>
        <p>
          After your booking and payment are received, we confirm the details,
          including the venue or online joining link, by WhatsApp, SMS or email,
          normally within one working day. If you have paid but have not
          received a confirmation by then, please contact us with your payment
          reference. Workshop handouts are given during the session or shared
          digitally.
        </p>
      </>
    ),
  },
  {
    id: "communication",
    title: "How we communicate with you",
    content: (
      <>
        <p>
          When you contact us or share your phone number or email address, you
          agree that we may contact you by phone, SMS, WhatsApp or email about
          your enquiry, appointments, registration and care. We will not use
          these details to send promotional messages unless you have asked to
          receive them, and you can tell us at any time to stop.
        </p>
        <p>
          Email and messaging services are not completely secure. Please use
          them only for routine, non-urgent matters.
        </p>
      </>
    ),
  },
  {
    id: "services",
    title: "Services, practitioners and outcomes",
    content: (
      <>
        <p>
          Descriptions of our services, care pathways and practitioners are
          intended to help you understand the care we offer. Whether a
          particular service, test or treatment is suitable for you can only be
          decided by your doctor after an assessment.
        </p>
        <p>
          Medicine is not an exact science, and no particular outcome, including
          any specific type of birth, can be promised. Services, practitioners
          and availability may change from time to time.
        </p>
      </>
    ),
  },
  {
    id: "workshops",
    title: "Workshops, classes and events",
    content: (
      <>
        <p>
          Antenatal classes, birth preparation workshops and similar sessions
          are educational. They do not replace individual medical advice, and
          you should follow your own doctor&rsquo;s guidance on any physical
          activity during pregnancy and after birth. Places are subject to
          availability, and we may reschedule or cancel a session if necessary,
          in which case we will let you know.
        </p>
      </>
    ),
  },
  {
    id: "reviews",
    title: "Reviews and patient stories",
    content: (
      <>
        <p>
          Reviews and stories shared on this website reflect individual
          experiences. They are not a guarantee or prediction of your own care
          or outcome, which will depend on your personal circumstances.
        </p>
      </>
    ),
  },
  {
    id: "privacy",
    title: "Privacy and confidentiality",
    content: (
      <>
        <p>
          We handle personal information in line with our{" "}
          <Link href="/privacy">Privacy Notice</Link> and applicable Indian law.
          The website uses analytics to understand how pages are used, which
          does not run on our clinic registration pages.
        </p>
        <p>
          Information you share during your care is kept confidential in line
          with the professional obligations of our doctors, including the
          National Medical Commission&rsquo;s{" "}
          <a
            href="https://nmc.org.in/page/rules-regulations-rules-regulations-of-erstwhile-mci-code-of-medical-ethics-regulations-2002"
            target="_blank"
            rel="noopener noreferrer"
          >
            Code of Medical Ethics
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "third-parties",
    title: "Third-party services and links",
    content: (
      <>
        <p>
          This website links to services that we do not control, such as
          WhatsApp, Google Maps, Instagram, YouTube and other websites. Your use
          of those services is governed by their own terms and privacy policies,
          and we are not responsible for their content or availability.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    content: (
      <>
        <p>
          The Birthwave name, logo, website design, text, photographs,
          illustrations and videos are owned by or licensed to The Birthwave and
          are protected by intellectual property law. You may view, download and
          print pages for your personal, non-commercial use. Any other copying,
          reproduction or reuse requires our prior written permission.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    content: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>
            use the website for any unlawful, misleading or fraudulent purpose;
          </li>
          <li>
            submit false information, or information about another person
            without their consent;
          </li>
          <li>
            attempt to gain unauthorised access to the website, its servers or
            our staff and registration systems;
          </li>
          <li>
            disrupt the website, or introduce malicious code, automated scraping
            or excessive requests into it; or
          </li>
          <li>
            use the enquiry forms to send spam, advertising or abusive content.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    content: (
      <>
        <p>
          We work to keep the information on this website accurate and up to
          date, but it is provided on an &ldquo;as is&rdquo; basis and may not
          always be complete or current. The website may occasionally be
          unavailable because of maintenance or circumstances outside our
          control.
        </p>
        <p>
          To the extent permitted by law, The Birthwave is not liable for any
          loss arising from reliance on general website content, from the
          website being unavailable, or from third-party services linked from
          it. Nothing in these Terms limits any professional duty owed to you by
          your treating clinicians, or any right you have that cannot be limited
          under applicable law.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    content: (
      <>
        <p>
          We may update these Terms from time to time, for example when our
          services or the law change. The updated version will be posted on this
          page with a new &ldquo;Last updated&rdquo; date, and it applies from
          the time it is posted.
        </p>
      </>
    ),
  },
  {
    id: "law",
    title: "Governing law and jurisdiction",
    content: (
      <>
        <p>
          These Terms are governed by the laws of India. Subject to applicable
          law, the courts at Chennai, Tamil Nadu have jurisdiction over any
          dispute arising from them or from your use of this website.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    content: (
      <>
        <p>
          If you have any questions, concerns or complaints about these Terms or
          this website, please contact us. We aim to respond within a reasonable
          time.
        </p>
        <LegalContactList />
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalDocument
      title={<>Terms &amp; Conditions</>}
      intro="Please read these terms carefully. They explain how you may use our website and what to expect when you contact or register with The Birthwave."
      lastUpdated={LAST_UPDATED}
      appliesTo="This website, bookings, workshops and payments"
      notice={
        <LegalNotice title="In a medical emergency,">
          do not use this website, our enquiry forms, email or WhatsApp. Call{" "}
          <a href="tel:112">112</a> or <a href="tel:108">108</a>, or go to the
          nearest hospital emergency department straight away.
        </LegalNotice>
      }
      sections={sections}
    />
  );
}
