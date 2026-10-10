"use client";

import { servicesFinalCta } from "@/content/services-content";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import { Phone, MessageCircle } from "lucide-react";

/**
 * Section 05 — Final Appointment CTA.
 *
 * Combines the guidance and appointment invitation into a single definitive closure.
 * Employs the project's signature dark-brown (ink) treatment with subtle atmospheric glow
 * for a clear visual conclusion without looping back to the same section.
 */
export function ServicesFinalCta() {
  return (
    <section
      id="connect"
      aria-labelledby="services-final-cta-heading"
      className="relative isolate overflow-hidden bg-ink py-16 sm:py-20 lg:py-24 text-paper"
      style={{
        backgroundImage: [
          "radial-gradient(55% 65% at 85% 15%, color-mix(in srgb, var(--color-coral) 14%, transparent) 0%, transparent 70%)",
          "radial-gradient(50% 55% at 10% 90%, color-mix(in srgb, var(--color-terracotta) 18%, transparent) 0%, transparent 72%)",
        ].join(", "),
      }}
    >
      <div className="container-birthwave max-w-2xl">
        <p className="eyebrow text-coral/80 font-semibold">{servicesFinalCta.eyebrow}</p>
        <h2
          id="services-final-cta-heading"
          className="mt-4 text-[clamp(2.1rem,1.6rem+2vw,3rem)] leading-[1.08] font-semibold text-paper"
        >
          {servicesFinalCta.heading}
        </h2>
        <p className="mt-5 max-w-[52ch] text-base leading-[var(--leading-relaxed)] text-paper/70 sm:text-lg">
          {servicesFinalCta.supporting}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Button href={servicesFinalCta.primaryCta.href} variant="primary">
            {servicesFinalCta.primaryCta.label}
          </Button>

          <CtaLink
            href={servicesFinalCta.secondaryCta.href}
            className="!text-paper/85 hover:!text-paper"
          >
            <span className="flex items-center gap-2">
              <MessageCircle aria-hidden="true" className="size-4 text-coral/80" />
              {servicesFinalCta.secondaryCta.label}
            </span>
          </CtaLink>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-paper/10 pt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <a
            href={servicesFinalCta.phoneHref}
            className="group inline-flex items-center gap-2 text-sm font-medium text-paper/75 transition-colors duration-[var(--duration-fast)] hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]"
          >
            <Phone aria-hidden="true" className="size-4 shrink-0 text-coral/80 transition-transform group-hover:scale-110" />
            <span>
              <span className="text-paper/50">{servicesFinalCta.phoneLabel}: </span>
              {servicesFinalCta.phoneNumber}
            </span>
          </a>

          {servicesFinalCta.note && (
            <p className="text-xs text-paper/50">
              {servicesFinalCta.note}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
