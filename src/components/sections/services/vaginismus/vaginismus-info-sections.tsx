import { ServiceFaqSection } from "../shared/service-faq-section";
import { Phone } from "lucide-react";
import { vaginismusPractical, vaginismusFaq } from "@/content/pages/vaginismus";
import { VaginismusImage } from "./vaginismus-image";
import { VaginismusReveal } from "./vaginismus-reveal";
import { Button } from "@/components/ui/button";

/**
 * Section 9 — Practical Information.
 */
export function VaginismusPractical() {
  return (
    <section id="vaginismus-practical" aria-labelledby="vaginismus-practical-heading" className="relative isolate bg-[var(--vaginismus-rose-wash)] section-pad">
      <VaginismusReveal className="container-birthwave grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
        <VaginismusImage
          imageKey="practical"
          corner="tr"
          aspect="aspect-[4/5]"
          className="w-full"
        />

        <div>
          <p className="eyebrow">{vaginismusPractical.eyebrow}</p>
          <h2 id="vaginismus-practical-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {vaginismusPractical.heading}
          </h2>

          <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {vaginismusPractical.info.map((item) => (
              <div key={item.label}>
                <strong className="block font-body text-sm font-semibold text-ink">{item.label}</strong>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {item.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>

          {vaginismusPractical.phone ? (
            <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-[var(--color-border)] pt-6">
              <a
                href={`tel:${vaginismusPractical.phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 font-body text-base font-semibold text-ink hover:text-terracotta-deep"
              >
                <Phone className="size-4 text-terracotta-deep" aria-hidden="true" />
                <span>{vaginismusPractical.phone}</span>
              </a>
              <Button href="/contact" variant="primary">
                BOOK A PRIVATE CONSULTATION
              </Button>
            </div>
          ) : null}
        </div>
      </VaginismusReveal>
    </section>
  );
}

/** Section 10 — FAQ. Native `<details>/<summary>` — the same
 * accessible accordion every other landing page on this site uses. */
export function VaginismusFaq() {
  return <ServiceFaqSection id="vaginismus-faq" eyebrow={vaginismusFaq.eyebrow} heading={vaginismusFaq.heading} items={vaginismusFaq.items} />;
}
