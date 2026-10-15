import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { contactPlaceholders } from "@/content/contact-content";

export const metadata: Metadata = {
  title: "Website Privacy Notice (Draft): The Birthwave",
  description:
    "Draft website privacy notice explaining how The Birthwave's current website enquiry preview and external contact links work.",
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

export default function PrivacyPage() {
  return (
    <PageShell>
      <div className="relative bg-paper text-ink [padding-block-start:calc(var(--header-height)+var(--space-section-sm))] [padding-block-end:var(--space-section-sm)]">
        <div className="container-birthwave max-w-6xl">
          <div className="max-w-3xl">
            <p className="eyebrow text-terracotta-deep">Website privacy</p>
            <h1 className="mt-4 font-display text-display font-semibold tracking-[var(--tracking-tight)] text-ink">
              Your privacy on this website
            </h1>
            <p className="mt-6 text-lg leading-[var(--leading-relaxed)] text-ink-soft">
              This notice explains the information involved when you browse The Birthwave website or use its current contact options.
            </p>
            <p className="mt-6 rounded-sm border border-terracotta/30 bg-paper-dim p-5 text-sm leading-[var(--leading-relaxed)] text-ink sm:p-6">
              <strong className="font-semibold">Draft for clinic review.</strong> This page describes the website as it is currently implemented. It is not a notice about patient records or a confirmation of the clinic’s internal privacy practices. The clinic should review and approve it before it is treated as its final policy.
            </p>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
            <nav aria-label="On this page" className="self-start lg:sticky lg:top-[calc(var(--header-height)+2rem)]">
              <p className="font-body text-sm font-semibold text-ink">On this page</p>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 lg:flex-col">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a className="font-body text-sm text-ink-soft underline-offset-4 hover:text-terracotta-deep hover:underline focus-visible:rounded-xs focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta-deep" href={`#${section.id}`}>
                      {section.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="max-w-3xl space-y-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-[var(--tracking-tight)] [&_h2]:text-ink [&_p]:mt-3 [&_p]:leading-[var(--leading-relaxed)] [&_p]:text-ink-soft [&_a]:underline [&_a]:underline-offset-4 [&_a]:focus-visible:rounded-xs [&_a]:focus-visible:outline-2 [&_a]:focus-visible:outline-offset-4 [&_a]:focus-visible:outline-terracotta-deep sm:[&_h2]:text-3xl">
              <section id="scope" className="scroll-mt-[calc(var(--header-height)+2rem)]">
                <h2>Scope of this notice</h2>
                <p>This notice covers this website and its contact links. It does not describe consultations, clinical records, or information handled within the clinic. If you need details about those practices, please ask The Birthwave directly before sharing medical records.</p>
              </section>

              <section id="information" className="scroll-mt-[calc(var(--header-height)+2rem)]">
                <h2>Information you choose to provide</h2>
                <p>The website enquiry form asks for your name and phone number, with optional email, care area and message fields. <strong className="font-semibold text-ink">The form is currently a design preview:</strong> submitting it does not send an enquiry to The Birthwave. The details you type are held in the page while it is open and are not sent to a clinic enquiry endpoint by this form.</p>
                <p>Please do not put sensitive medical information into the preview form. To reach the team, use the phone, email or WhatsApp options on the <Link href="/contact">contact page</Link>.</p>
              </section>

              <section id="technical-data" className="scroll-mt-[calc(var(--header-height)+2rem)]">
                <h2>Technical information when you visit</h2>
                <p>Like other hosted websites, the service delivering these pages may process technical request information, such as an IP address, browser details and the pages requested, to serve and protect the site. The current website code does not add an advertising or analytics tracker. We cannot describe the hosting provider’s log retention or security practices here without confirming them with the clinic and provider.</p>
              </section>

              <section id="external-services" className="scroll-mt-[calc(var(--header-height)+2rem)]">
                <h2>Contact links and external services</h2>
                <p>If you choose to call, email, use WhatsApp, open a map or visit a social-media link, you leave this website or use another provider’s service. The information you share through those channels is handled separately from the preview form and may be subject to that provider’s privacy terms. The Birthwave’s handling of messages received through those channels requires a separate clinic-approved notice.</p>
              </section>

              <section id="confidentiality" className="scroll-mt-[calc(var(--header-height)+2rem)]">
                <h2>Healthcare confidentiality</h2>
                <p>The National Medical Commission’s <a href="https://nmc.org.in/page/rules-regulations-rules-regulations-of-erstwhile-mci-code-of-medical-ethics-regulations-2002" target="_blank" rel="noopener noreferrer">Code of Medical Ethics</a> addresses the confidentiality of information entrusted to a physician. This website notice does not replace the information and consent you should receive when obtaining care. Please ask the clinic how it receives, uses, stores and shares patient information before sending detailed health records online.</p>
              </section>

              <section id="choices" className="scroll-mt-[calc(var(--header-height)+2rem)]">
                <h2>Your choices and questions</h2>
                <p>You can browse without using the preview form. You can choose which direct contact channel to use and what information to share. To ask about information you have sent through phone, email or WhatsApp, or to request access, correction or deletion where applicable, contact the clinic using the details below. Any request involving clinical records should be handled under the clinic’s own procedures and applicable law.</p>
              </section>

              <section id="contact" className="scroll-mt-[calc(var(--header-height)+2rem)]">
                <h2>Contact The Birthwave</h2>
                <p>For a question about this website notice, email <a href={`mailto:${contactPlaceholders.email}`}>{contactPlaceholders.email}</a> or call <a href="tel:+919363031925">{contactPlaceholders.phone}</a>. You can also visit the <Link href="/contact">contact page</Link>.</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
