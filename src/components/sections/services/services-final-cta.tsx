"use client";

import { ourServicesFinalCta } from "@/content/our-services-content";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import { Phone, MessageCircle, MapPin } from "lucide-react";

/**
 * Section 13 — Final CTA ("Start With a Conversation").
 * Definitive closure inviting consultation across all women's & children's care disciplines.
 */
export function ServicesFinalCta() {
  return (
    <section
      id={ourServicesFinalCta.id}
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
        <p className="eyebrow text-coral/80 font-semibold">{ourServicesFinalCta.eyebrow}</p>
        <h2
          id="services-final-cta-heading"
          className="mt-4 text-[clamp(2.1rem,1.6rem+2vw,3rem)] leading-[1.08] font-semibold text-paper"
        >
          {ourServicesFinalCta.heading}
        </h2>
        <p className="mt-5 max-w-[52ch] text-base leading-[var(--leading-relaxed)] text-paper/70 sm:text-lg">
          {ourServicesFinalCta.body}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Button href={ourServicesFinalCta.primaryCta.href} variant="primary">
            {ourServicesFinalCta.primaryCta.label.replace(/\s*→$/, "")}
          </Button>

          <CtaLink
            href={ourServicesFinalCta.secondaryCta.href}
            className="!text-paper/85 hover:!text-paper"
          >
            <span className="flex items-center gap-2">
              <MessageCircle aria-hidden="true" className="size-4 text-coral/80" />
              {ourServicesFinalCta.secondaryCta.label.replace(/\s*→$/, "")}
            </span>
          </CtaLink>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-paper/10 pt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <a
            href={ourServicesFinalCta.phoneHref}
            className="group inline-flex items-center gap-2 text-sm font-medium text-paper/80 transition-colors duration-[var(--duration-fast)] hover:text-paper"
          >
            <Phone aria-hidden="true" className="size-4 shrink-0 text-coral/80 transition-transform group-hover:scale-110" />
            <span>
              <span className="text-paper/50">Call: </span>
              {ourServicesFinalCta.phone}
            </span>
          </a>

          <div className="inline-flex items-center gap-2 text-xs text-paper/60">
            <MapPin aria-hidden="true" className="size-3.5 shrink-0 text-coral/70" />
            <span>{ourServicesFinalCta.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
