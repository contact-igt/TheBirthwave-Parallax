import { Plus } from "lucide-react";
import { vaginismusPractical, vaginismusFaq } from "@/content/vaginismus-landing-content";
import { VaginismusImage } from "./vaginismus-image";
import { VaginismusReveal } from "./vaginismus-reveal";

/**
 * Section 7 — Practical Information.
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
        </div>
      </VaginismusReveal>
    </section>
  );
}

/** Section 8 — FAQ / Reassurance. Native `<details>/<summary>` — the same
 * accessible accordion every other landing page on this site uses. */
export function VaginismusFaq() {
  return (
    <section id="vaginismus-faq" aria-labelledby="vaginismus-faq-heading" className="relative isolate bg-paper section-pad">
      <VaginismusReveal className="container-birthwave max-w-3xl">
        <p className="eyebrow">{vaginismusFaq.eyebrow}</p>
        <h2 id="vaginismus-faq-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {vaginismusFaq.heading}
        </h2>

        <div className="mt-10 border-t border-[var(--color-border)]">
          {vaginismusFaq.items.map((item) => (
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
      </VaginismusReveal>
    </section>
  );
}
