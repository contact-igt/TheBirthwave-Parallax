import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  FileText,
  Laptop,
  Mail,
  MessageCircle,
  ShieldCheck,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { contactPlaceholders } from "@/content/contact-content";
import styles from "../terms/terms-page.module.css";
import privacyStyles from "./privacy-page.module.css";

export const metadata: Metadata = {
  title: "Website Privacy Notice (Draft): The Birthwave",
  description:
    "Draft website privacy notice explaining how The Birthwave's website enquiries and external contact links work.",
  robots: { index: false, follow: true },
};

const sections = [
  { id: "scope", label: "Scope" },
  { id: "information", label: "Information you provide" },
  { id: "technical-data", label: "Technical data" },
  { id: "external-services", label: "External services" },
  { id: "confidentiality", label: "Healthcare confidentiality" },
  { id: "choices", label: "Your choices" },
  { id: "contact", label: "Contact" },
] as const;

function PrivacyRow({
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

export default function PrivacyPage() {
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
            <p className="eyebrow text-terracotta-deep">Website privacy</p>
            <h1 className={`${privacyStyles.title} font-display text-display font-semibold tracking-[var(--tracking-tight)] text-ink`}>
              Your privacy on this website
            </h1>
            <p className={styles.intro}>
              This notice explains the information involved when you browse The Birthwave website or use its current contact options.
            </p>
            <div className={styles.draftNotice}>
              <FileText aria-hidden="true" size={28} strokeWidth={1.7} className={styles.noticeIcon} />
              <p>
                <strong>Draft for clinic review.</strong> This page describes the website as it is currently implemented. It is not a notice about patient records or a confirmation of the clinic’s internal privacy practices. The clinic should review and approve it before it is treated as its final policy.
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

          <div>
            <PrivacyRow id="scope" title="Scope of this notice" icon={FileText}>
              <p>This notice covers this website and its contact links. It does not describe consultations, clinical records, or information handled within the clinic. If you need details about those practices, please ask The Birthwave directly before sharing medical records.</p>
            </PrivacyRow>

            <PrivacyRow id="information" title="Information you choose to provide" icon={UserRound}>
              <p>The website enquiry forms ask for your name and a way to contact you, with optional email, care area, contact preference and message fields depending on the page. When you submit a form, the website sends those details through a protected server endpoint and Google Apps Script to a clinic-controlled Google Sheet so the team can respond to your enquiry.</p>
              <p>Please do not put urgent concerns, detailed medical histories or medical records into a website enquiry. You can also reach the team using the phone, email or WhatsApp options on the <Link href="/contact">contact page</Link>.</p>
            </PrivacyRow>

            <PrivacyRow id="technical-data" title="Technical information when you visit" icon={Laptop}>
              <p>Like other hosted websites, the service delivering these pages may process technical request information, such as an IP address, browser details and the pages requested, to serve and protect the site. The current website code does not add an advertising or analytics tracker. We cannot describe the hosting provider’s log retention or security practices here without confirming them with the clinic and provider.</p>
            </PrivacyRow>

            <PrivacyRow id="external-services" title="Contact links and external services" icon={ExternalLink}>
              <p>Website enquiry submissions use Google Apps Script and Google Sheets as service providers. If you choose to call, email, use WhatsApp, open a map or visit a social-media link, you leave this website or use another provider’s service. Information shared through those channels is handled separately and may be subject to that provider’s privacy terms.</p>
            </PrivacyRow>

            <PrivacyRow id="confidentiality" title="Healthcare confidentiality" icon={ShieldCheck}>
              <p>The National Medical Commission’s <a href="https://nmc.org.in/page/rules-regulations-rules-regulations-of-erstwhile-mci-code-of-medical-ethics-regulations-2002" target="_blank" rel="noopener noreferrer">Code of Medical Ethics</a> addresses the confidentiality of information entrusted to a physician. This website notice does not replace the information and consent you should receive when obtaining care. Please ask the clinic how it receives, uses, stores and shares patient information before sending detailed health records online.</p>
            </PrivacyRow>

            <PrivacyRow id="choices" title="Your choices and questions" icon={MessageCircle}>
              <p>You can browse without submitting an enquiry form. You can choose which direct contact channel to use and what information to share. To ask about information you have submitted, or to request access, correction or deletion where applicable, contact the clinic using the details below. Any request involving clinical records should be handled under the clinic’s own procedures and applicable law.</p>
            </PrivacyRow>
          </div>

          <section id="contact" className={`${styles.contactCard} ${privacyStyles.contactCard}`}>
            <span className={styles.contactIcon} aria-hidden="true">
              <Mail size={29} strokeWidth={1.7} />
            </span>
            <div>
              <h2>Contact The Birthwave</h2>
              <p>For a question about this website notice, email <a href={`mailto:${contactPlaceholders.email}`}>{contactPlaceholders.email}</a> or call <a href="tel:+919363031925">{contactPlaceholders.phone}</a>. You can also visit the <Link href="/contact">contact page</Link>.</p>
            </div>
          </section>
        </div>
      </div>
    </PageShell>
  );
}
