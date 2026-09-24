import { Plus } from "lucide-react";
import { lactationPractical, lactationFaq } from "@/content/lactation-landing-content";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { LactationReveal } from "./lactation-reveal";

/**
 * Section 7 — Practical Information. Every field is a confirmed-pending
 * placeholder (see the content file's own comment) — visible
 * "[BirthWave confirmation needed: ...]" wording rather than hiding missing
 * information behind a generic claim. No photograph implies a real
 * consultation space; the shared `MediaPlaceholder` stands in until real,
 * approved photography exists.
 */
export function LactationPractical() {
  return (
    <section id="lactation-practical" aria-labelledby="lactation-practical-heading" className="relative isolate bg-[var(--lactation-rose-wash)] section-pad">
      <LactationReveal className="container-birthwave grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
        <MediaPlaceholder
          alt={lactationPractical.facilityPhotoPendingLabel}
          gradient="linear-gradient(135deg, var(--color-paper-dim) 0%, var(--color-sky) 100%)"
          corner="tr"
          aspect="aspect-[4/5]"
          className="w-full"
        />

        <div>
          <p className="eyebrow">{lactationPractical.eyebrow}</p>
          <h2 id="lactation-practical-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {lactationPractical.heading}
          </h2>
          <p className="mt-4 max-w-[52ch] text-base leading-[var(--leading-relaxed)] text-ink-soft">{lactationPractical.intro}</p>

          <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {lactationPractical.info.map((item) => (
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
      </LactationReveal>
    </section>
  );
}

/** Section 8 — FAQ. Native `<details>/<summary>` — the same accessible
 * accordion every other landing page on this site uses. Answers stay
 * cautious throughout: no guaranteed outcome, no fabricated policy — every
 * unconfirmed operational question is left as an explicit placeholder. */
export function LactationFaq() {
  return (
    <section id="lactation-faq" aria-labelledby="lactation-faq-heading" className="relative isolate bg-paper section-pad">
      <LactationReveal className="container-birthwave max-w-3xl">
        <p className="eyebrow">{lactationFaq.eyebrow}</p>
        <h2 id="lactation-faq-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {lactationFaq.heading}
        </h2>

        <div className="mt-10 border-t border-[var(--color-border)]">
          {lactationFaq.items.map((item) => (
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
      </LactationReveal>
    </section>
  );
}
