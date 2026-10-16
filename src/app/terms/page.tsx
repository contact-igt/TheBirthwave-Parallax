import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  CircleAlert,
  FileText,
  Heart,
  Link2,
  LockKeyhole,
  MessageCircle,
  Monitor,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { contactPlaceholders } from "@/content/contact-content";
import styles from "./terms-page.module.css";

export const metadata: Metadata = {
  title: "Website Terms & Conditions (Draft): The Birthwave",
  description:
    "Draft terms explaining use of The Birthwave website, its health information, and its current contact options.",
  robots: { index: false, follow: true },
};

const sections = [
  { id: "scope", label: "Scope" },
  { id: "health-information", label: "Health information" },
  { id: "urgent-care", label: "Urgent care" },
  { id: "enquiries", label: "Enquiries and appointments" },
  { id: "services", label: "Services and practitioners" },
  { id: "external-links", label: "External links" },
  { id: "privacy", label: "Privacy and confidentiality" },
  { id: "site-use", label: "Website use" },
  { id: "contact", label: "Contact" },
] as const;

function TermRow({
  id,
  title,
  icon: Icon,
  children,
}: {
  id: string;
  title: string;
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <section id={id} className={styles.termRow}>
      <span className={styles.iconCircle} aria-hidden="true">
        <Icon size={27} strokeWidth={1.7} />
      </span>
      <div className={styles.termCopy}>
        <h2>{title}</h2>
        {children}
      </div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <PageShell>
      <div className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.heroImage}>
            <Image
              src="/images/about/section1/frame_0071_7.00s.jpg"
              alt="The Birthwave clinic exterior and entrance"
              fill
              sizes="(max-width: 899px) 100vw, 54vw"
              className={styles.photo}
              preload
            />
          </div>
          <div className={styles.heroContent}>
            <p className="eyebrow text-terracotta-deep">Website terms</p>
            <h1 className="font-display text-display font-semibold tracking-[var(--tracking-tight)] text-ink">
              Terms &amp; Conditions
            </h1>
            <p className={styles.intro}>
              These terms explain how to use The Birthwave website and what its current contact options do.
            </p>
            <div className={styles.draftNotice}>
              <FileText aria-hidden="true" size={28} strokeWidth={1.7} className={styles.noticeIcon} />
              <p>
                <strong>Draft for clinic review.</strong> These website terms do not set out clinical consent, treatment conditions, consultation fees, cancellation or refund rules. The clinic should review and approve the wording before treating it as its final terms.
              </p>
            </div>
          </div>
        </header>

        <div className={styles.content}>
          <details className={styles.sectionMenu}>
            <summary>Jump to a section</summary>
            <nav aria-label="On this page">
              <ul>
                {sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>{section.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </details>

          <div className={styles.termsList}>
            <TermRow id="scope" title="What these terms cover" icon={FileText}>
              <p>These terms concern the public website only. Reading a page or using a contact link does not, by itself, create a clinician–patient relationship or confirm an appointment. Care, consent and payment arrangements are handled separately by the clinic and the relevant healthcare professional.</p>
            </TermRow>

            <TermRow id="health-information" title="Health information is general" icon={Heart}>
              <p>Descriptions of symptoms, services and care pathways on this website are for general information. They cannot assess your individual circumstances, diagnose a condition or replace a consultation with a qualified professional. A clinician may recommend a different assessment or course of care after speaking with you.</p>
              <p>These terms do not limit any professional duty owed by a healthcare practitioner or any right you have under applicable law.</p>
            </TermRow>

            <TermRow id="urgent-care" title="Do not use this website for urgent care" icon={CircleAlert}>
              <p>The website and its enquiry forms are not monitored as an emergency service. If you think you need urgent medical attention, contact local emergency services or go to an appropriate emergency facility. Do not wait for a response to a website enquiry.</p>
            </TermRow>

            <TermRow id="enquiries" title="Enquiries and appointments" icon={CalendarDays}>
              <p>“Book” buttons on this website lead to the contact page; they do not complete a booking. Submitting a website form sends an enquiry to the clinic for follow-up. An appointment is arranged only when the clinic confirms it through a direct contact channel.</p>
              <p>You can also use the phone, email or WhatsApp options on the <Link href="/contact">contact page</Link>. Please do not enter urgent concerns, detailed medical histories or medical records into a website enquiry.</p>
            </TermRow>

            <TermRow id="services" title="Service and practitioner information" icon={UsersRound}>
              <p>Service descriptions and practitioner profiles help you explore possible care. Availability, suitability, appointment times and any fees should be confirmed directly with the clinic. No result or outcome is promised by the information on this website.</p>
              <p>The National Medical Commission also publishes <a href="https://nmc.org.in/whats-new/download/1874" target="_blank" rel="noopener noreferrer">guidance on ethical advertising and public communication</a> for medical institutions and practitioners. The clinic should review its public claims against that guidance before approving these terms.</p>
            </TermRow>

            <TermRow id="external-links" title="Links to other services" icon={Link2}>
              <p>Links to WhatsApp, maps, social media and other websites take you to services outside this website. Their own terms and privacy practices apply when you use them.</p>
            </TermRow>

            <TermRow id="privacy" title="Privacy and clinical confidentiality" icon={LockKeyhole}>
              <p>See the <Link href="/privacy">website privacy notice</Link> for how the current site and its contact links work. The National Medical Commission’s <a href="https://nmc.org.in/page/rules-regulations-rules-regulations-of-erstwhile-mci-code-of-medical-ethics-regulations-2002" target="_blank" rel="noopener noreferrer">Code of Medical Ethics</a> addresses the confidentiality of information entrusted to a physician. These website terms do not replace clinical consent or the clinic’s procedures for patient records.</p>
            </TermRow>

            <TermRow id="site-use" title="Using this website" icon={Monitor}>
              <p>Please use the website lawfully and do not attempt to disrupt its operation or misuse its forms or content. Website text, images and branding are provided to help visitors learn about The Birthwave; please seek permission before reusing them for another purpose. The site may be updated as its services and information change.</p>
            </TermRow>
          </div>

          <section id="contact" className={styles.contactCard}>
            <span className={styles.contactIcon} aria-hidden="true">
              <MessageCircle size={29} strokeWidth={1.7} />
            </span>
            <div>
              <h2>Questions about these terms</h2>
              <p>Email <a href={`mailto:${contactPlaceholders.email}`}>{contactPlaceholders.email}</a> or call <a href="tel:+919363031925">{contactPlaceholders.phone}</a>. You can also use the <Link href="/contact">contact page</Link>.</p>
            </div>
          </section>
        </div>
      </div>
    </PageShell>
  );
}
