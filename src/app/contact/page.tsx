import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import { ContactEnquiryForm } from "@/components/sections/contact/contact-enquiry-form";
import {
  contactHero,
  contactDirectDetails,
} from "@/content/contact-content";

export const metadata: Metadata = {
  title: "Contact The Birthwave | Appointments & Enquiries",
  description:
    "Contact The Birthwave for appointments, WhatsApp enquiries, phone enquiries and general patient support.",
};

export default function ContactPage() {
  return (
    <PageShell>
      {/* 02 — Contact Hero */}
      <section
        id="contact-hero"
        aria-label="Contact hero"
        className="relative isolate overflow-hidden bg-paper [padding-block-start:calc(var(--header-height)+var(--space-section-sm))] [padding-block-end:var(--space-section-sm)]"
      >
        <div className="container-birthwave relative z-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          {/* Left Column: Heading & CTAs */}
          <div className="max-w-xl">
            <p className="eyebrow">{contactHero.eyebrow}</p>
            <h1 className="mt-4 font-display text-[clamp(2.4rem,1.8rem+3vw,4.25rem)] leading-[1.08] font-semibold tracking-[var(--tracking-tight)] text-ink">
              {contactHero.h1}
            </h1>
            <p className="mt-5 text-base leading-[var(--leading-relaxed)] text-ink-soft sm:text-lg">
              {contactHero.body}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button href={contactHero.primaryCta.href} variant="primary">
                {contactHero.primaryCta.label}
              </Button>
              <CtaLink href={contactHero.secondaryCta.href}>
                {contactHero.secondaryCta.label}
              </CtaLink>
            </div>
          </div>

          {/* Right Column: Premium Visual */}
          <div className="relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full overflow-hidden rounded-sm border border-[var(--color-border)] bg-paper-dim shadow-[0_4px_20px_rgba(36,26,23,0.04)]">
              <Image
                src={contactHero.media.src}
                alt={contactHero.media.alt}
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 45vw"
                className="object-cover object-[50%_40%]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Direct Contact Details + Enquiry Form */}
      <section
        id="contact-details"
        aria-label="Direct contact details and enquiry form"
        className="relative isolate bg-paper-dim/40 py-(--space-section)"
      >
        <div className="container-birthwave relative z-10 grid gap-12 lg:grid-cols-[0.4fr_0.6fr] lg:items-start lg:gap-16">
          {/* Left Column: Direct Contact Details List (~40%) */}
          <div className="flex flex-col">
            <h2 className="font-display text-2xl font-semibold tracking-[var(--tracking-tight)] text-ink sm:text-3xl">
              {contactDirectDetails.heading}
            </h2>
            <p className="mt-3 text-sm leading-[var(--leading-relaxed)] text-ink-soft">
              Reach out directly or visit our consultation space.
            </p>

            <div className="mt-8 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
              {contactDirectDetails.items.map((item) => (
                <div key={item.id} className="py-6 first:pt-4 last:pb-4">
                  <div className="flex items-center justify-between">
                    <span className="font-body text-xs font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
                      {item.label}
                    </span>
                    {!item.confirmed && (
                      <span className="rounded-full bg-paper px-2.5 py-0.5 font-body text-[11px] font-medium text-ink-soft border border-[var(--color-border)]">
                        Pending confirmation
                      </span>
                    )}
                  </div>

                  <div className="mt-2 text-base font-medium text-ink">
                    {item.confirmed && item.actionHref ? (
                      <a
                        href={item.actionHref}
                        className="transition-colors hover:text-terracotta-deep underline underline-offset-4"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="font-mono text-xs text-ink-soft/75">
                        {item.value}
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-xs leading-[var(--leading-relaxed)] text-ink-soft">
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Enquiry Form (~60%) */}
          <div className="w-full">
            <ContactEnquiryForm />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
