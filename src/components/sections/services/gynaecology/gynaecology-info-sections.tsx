import { ServiceFaqSection } from "../shared/service-faq-section";
import { Phone } from "lucide-react";
import { gynaecologyPractical, gynaecologyFaq } from "@/content/pages/gynaecology";
import { GynaecologyImage } from "./gynaecology-image";
import { GynaecologyReveal } from "./gynaecology-reveal";
import { Button } from "@/components/ui/button";

/**
 * Section 7 — Practical Information.
 */
export function GynaecologyPractical() {
  return (
    <section id="gynaecology-practical" aria-labelledby="gynaecology-practical-heading" className="relative isolate bg-[var(--gynaecology-rose-wash)] section-pad">
      <GynaecologyReveal className="container-birthwave grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
        <GynaecologyImage
          imageKey="practical"
          corner="tr"
          aspect="aspect-[4/5]"
          className="w-full"
        />

        <div>
          <p className="eyebrow">{gynaecologyPractical.eyebrow}</p>
          <h2 id="gynaecology-practical-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {gynaecologyPractical.heading}
          </h2>

          <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {gynaecologyPractical.info.map((item) => (
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

          {gynaecologyPractical.phone ? (
            <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-[var(--color-border)] pt-6">
              <a
                href={`tel:${gynaecologyPractical.phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 font-body text-base font-semibold text-ink hover:text-terracotta-deep"
              >
                <Phone className="size-4 text-terracotta-deep" aria-hidden="true" />
                <span>{gynaecologyPractical.phone}</span>
              </a>
              <Button href="/contact" variant="primary">
                BOOK YOUR CONSULTATION
              </Button>
            </div>
          ) : null}
        </div>
      </GynaecologyReveal>
    </section>
  );
}

/** Section 8 — FAQ / Reassurance. Native `<details>/<summary>` — the same
 * accessible accordion every other landing page on this site uses. */
export function GynaecologyFaq() {
  return <ServiceFaqSection id="gynaecology-faq" eyebrow={gynaecologyFaq.eyebrow} heading={gynaecologyFaq.heading} items={gynaecologyFaq.items} />;
}
