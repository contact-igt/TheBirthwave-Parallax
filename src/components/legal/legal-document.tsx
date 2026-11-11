import type { ReactNode } from "react";
import Image from "next/image";
import { CircleAlert, Mail, MapPin, Phone } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { contactPlaceholders } from "@/content/contact-content";
import styles from "@/app/terms/terms-page.module.css";

/**
 * Shared layout for the legal pages (Terms, Refund, Shipping): hero with
 * "last updated" meta, a sticky numbered contents list on desktop, a
 * "Jump to a section" menu on phones, and numbered clauses.
 */

export interface LegalSection {
  id: string;
  title: string;
  content: ReactNode;
}

const phoneHref = `tel:${contactPlaceholders.phone.replace(/\s+/g, "")}`;
const pad = (n: number) => String(n).padStart(2, "0");

function TocList({ sections }: { sections: readonly LegalSection[] }) {
  return (
    <ol className={styles.tocList}>
      {sections.map((section, index) => (
        <li key={section.id}>
          <a href={`#${section.id}`}>
            <span aria-hidden="true">{pad(index + 1)}</span>
            {section.title}
          </a>
        </li>
      ))}
    </ol>
  );
}

/** Contact block used as the last clause of each legal page. */
export function LegalContactList() {
  return (
    <ul className={styles.contactList}>
      <li>
        <Mail aria-hidden="true" size={18} strokeWidth={1.8} />
        <a href={`mailto:${contactPlaceholders.email}`}>
          {contactPlaceholders.email}
        </a>
      </li>
      <li>
        <Phone aria-hidden="true" size={18} strokeWidth={1.8} />
        <a href={phoneHref}>{contactPlaceholders.phone}</a>
      </li>
      <li>
        <MapPin aria-hidden="true" size={18} strokeWidth={1.8} />
        <span>The Birthwave, {contactPlaceholders.clinicAddress}</span>
      </li>
    </ul>
  );
}

/** Highlighted note shown above the first clause. */
export function LegalNotice({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.emergency} role="note">
      <CircleAlert aria-hidden="true" size={24} strokeWidth={1.8} />
      <p>
        <strong>{title}</strong> {children}
      </p>
    </div>
  );
}

export function LegalDocument({
  title,
  intro,
  lastUpdated,
  appliesTo,
  notice,
  sections,
}: {
  title: ReactNode;
  intro: ReactNode;
  lastUpdated: string;
  appliesTo: string;
  notice?: ReactNode;
  sections: readonly LegalSection[];
}) {
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
            <p className="eyebrow text-terracotta-deep">Legal</p>
            <h1 className="font-display text-display font-semibold tracking-[var(--tracking-tight)] text-ink">
              {title}
            </h1>
            <p className={styles.intro}>{intro}</p>
            <dl className={styles.meta}>
              <div>
                <dt>Last updated</dt>
                <dd>{lastUpdated}</dd>
              </div>
              <div>
                <dt>Applies to</dt>
                <dd>{appliesTo}</dd>
              </div>
            </dl>
          </div>
        </header>

        <div className={styles.layout}>
          <aside className={styles.toc}>
            <p className={styles.tocTitle}>Contents</p>
            <nav className={styles.tocDesktop} aria-label="Contents">
              <TocList sections={sections} />
            </nav>
            <details className={styles.tocDetails}>
              <summary>Jump to a section</summary>
              <nav aria-label="Contents">
                <TocList sections={sections} />
              </nav>
            </details>
          </aside>

          <article className={styles.article}>
            {notice}
            {sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className={styles.clause}
                aria-labelledby={`${section.id}-title`}
              >
                <p className={styles.clauseNumber} aria-hidden="true">
                  {pad(index + 1)}
                </p>
                <div className={styles.clauseBody}>
                  <h2 id={`${section.id}-title`}>
                    <span className="sr-only">{index + 1}. </span>
                    {section.title}
                  </h2>
                  {section.content}
                </div>
              </section>
            ))}
          </article>
        </div>
      </div>
    </PageShell>
  );
}
