import { Plus } from "lucide-react";
import { gynaecologyPractical, gynaecologyFaq } from "@/content/gynaecology-landing-content";
import { GynaecologyImage } from "./gynaecology-image";
import { GynaecologyReveal } from "./gynaecology-reveal";

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
        </div>
      </GynaecologyReveal>
    </section>
  );
}

/** Section 8 — FAQ / Reassurance. Native `<details>/<summary>` — the same
 * accessible accordion every other landing page on this site uses. */
export function GynaecologyFaq() {
  return (
    <section id="gynaecology-faq" aria-labelledby="gynaecology-faq-heading" className="relative isolate bg-paper section-pad">
      <GynaecologyReveal className="container-birthwave max-w-3xl">
        <p className="eyebrow">{gynaecologyFaq.eyebrow}</p>
        <h2 id="gynaecology-faq-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {gynaecologyFaq.heading}
        </h2>

        <div className="mt-10 border-t border-[var(--color-border)]">
          {gynaecologyFaq.items.map((item) => (
            <details key={item.question} className="group border-b border-[var(--color-border)] py-6">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 font-body text-lg font-medium text-balance text-ink [&::-webkit-details-marker]:hidden">
                {item.question}
                <Plus
                  aria-hidden="true"
                  className="size-5 shrink-0 text-terracotta transition-transform duration-[var(--duration-fast)] ease-[var(--ease-signature)] group-open:rotate-45"
                />
              </summary>
              <p className="mt-4 max-w-2xl text-base leading-[var(--leading-relaxed)] text-ink-soft">{item.answer}</p>
            </details>
          ))}
        </div>
      </GynaecologyReveal>
    </section>
  );
}
