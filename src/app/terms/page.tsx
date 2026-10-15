import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { contactPlaceholders } from "@/content/contact-content";

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

export default function TermsPage() {
  return (
    <PageShell>
      <div className="relative bg-paper text-ink [padding-block-start:calc(var(--header-height)+var(--space-section-sm))] [padding-block-end:var(--space-section-sm)]">
        <div className="container-birthwave max-w-6xl">
          <div className="max-w-3xl">
            <p className="eyebrow text-terracotta-deep">Website terms</p>
            <h1 className="mt-4 font-display text-display font-semibold tracking-[var(--tracking-tight)] text-ink">
              Terms &amp; Conditions
            </h1>
            <p className="mt-6 text-lg leading-[var(--leading-relaxed)] text-ink-soft">
              These terms explain how to use The Birthwave website and what its current contact options do.
            </p>
            <p className="mt-6 rounded-sm border border-terracotta/30 bg-paper-dim p-5 text-sm leading-[var(--leading-relaxed)] text-ink sm:p-6">
              <strong className="font-semibold">Draft for clinic review.</strong> These website terms do not set out clinical consent, treatment conditions, consultation fees, cancellation or refund rules. The clinic should review and approve the wording before treating it as its final terms.
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
                <h2>What these terms cover</h2>
                <p>These terms concern the public website only. Reading a page or using a contact link does not, by itself, create a clinician–patient relationship or confirm an appointment. Care, consent and payment arrangements are handled separately by the clinic and the relevant healthcare professional.</p>
              </section>

              <section id="health-information" className="scroll-mt-[calc(var(--header-height)+2rem)]">
                <h2>Health information is general</h2>
                <p>Descriptions of symptoms, services and care pathways on this website are for general information. They cannot assess your individual circumstances, diagnose a condition or replace a consultation with a qualified professional. A clinician may recommend a different assessment or course of care after speaking with you.</p>
                <p>These terms do not limit any professional duty owed by a healthcare practitioner or any right you have under applicable law.</p>
              </section>

              <section id="urgent-care" className="scroll-mt-[calc(var(--header-height)+2rem)]">
                <h2>Do not use this website for urgent care</h2>
                <p>The website and its enquiry forms are not monitored as an emergency service. If you think you need urgent medical attention, contact local emergency services or go to an appropriate emergency facility. Do not wait for a response to a website enquiry.</p>
              </section>

              <section id="enquiries" className="scroll-mt-[calc(var(--header-height)+2rem)]">
                <h2>Enquiries and appointments</h2>
                <p>“Book” buttons on this website lead to the contact page; they do not complete a booking. The current website enquiry forms are design previews and do not send requests to the clinic. An appointment is arranged only when the clinic confirms it through a working direct contact channel.</p>
                <p>For an actual enquiry, use the phone, email or WhatsApp options on the <Link href="/contact">contact page</Link>. Please avoid entering detailed medical records into a preview form.</p>
              </section>

              <section id="services" className="scroll-mt-[calc(var(--header-height)+2rem)]">
                <h2>Service and practitioner information</h2>
                <p>Service descriptions and practitioner profiles help you explore possible care. Availability, suitability, appointment times and any fees should be confirmed directly with the clinic. No result or outcome is promised by the information on this website.</p>
                <p>The National Medical Commission also publishes <a href="https://nmc.org.in/whats-new/download/1874" target="_blank" rel="noopener noreferrer">guidance on ethical advertising and public communication</a> for medical institutions and practitioners. The clinic should review its public claims against that guidance before approving these terms.</p>
              </section>

              <section id="external-links" className="scroll-mt-[calc(var(--header-height)+2rem)]">
                <h2>Links to other services</h2>
                <p>Links to WhatsApp, maps, social media and other websites take you to services outside this website. Their own terms and privacy practices apply when you use them.</p>
              </section>

              <section id="privacy" className="scroll-mt-[calc(var(--header-height)+2rem)]">
                <h2>Privacy and clinical confidentiality</h2>
                <p>See the <Link href="/privacy">website privacy notice</Link> for how the current site and its contact links work. The National Medical Commission’s <a href="https://nmc.org.in/page/rules-regulations-rules-regulations-of-erstwhile-mci-code-of-medical-ethics-regulations-2002" target="_blank" rel="noopener noreferrer">Code of Medical Ethics</a> addresses the confidentiality of information entrusted to a physician. These website terms do not replace clinical consent or the clinic’s procedures for patient records.</p>
              </section>

              <section id="site-use" className="scroll-mt-[calc(var(--header-height)+2rem)]">
                <h2>Using this website</h2>
                <p>Please use the website lawfully and do not attempt to disrupt its operation or misuse its forms or content. Website text, images and branding are provided to help visitors learn about The Birthwave; please seek permission before reusing them for another purpose. The site may be updated as its services and information change.</p>
              </section>

              <section id="contact" className="scroll-mt-[calc(var(--header-height)+2rem)]">
                <h2>Questions about these terms</h2>
                <p>Email <a href={`mailto:${contactPlaceholders.email}`}>{contactPlaceholders.email}</a> or call <a href="tel:+919363031925">{contactPlaceholders.phone}</a>. You can also use the <Link href="/contact">contact page</Link>.</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
