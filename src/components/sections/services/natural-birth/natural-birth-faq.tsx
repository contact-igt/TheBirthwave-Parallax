import { Plus } from "lucide-react";
import { naturalBirthFaq } from "@/content/natural-birth-landing-content";
import { NaturalBirthReveal } from "./natural-birth-reveal";

/** Section 09 — FAQ. Native `<details>/<summary>` — the same accessible
 * accordion `faq-section.tsx` and every other landing page already
 * establish site-wide. Answers stay cautious throughout: no guarantees,
 * no medical advice presented as universal — every individual-assessment
 * question routes back to the reader's maternity team. */
export function NaturalBirthFaq() {
  return (
    <section id="natural-birth-faq" aria-labelledby="natural-birth-faq-heading" className="relative isolate bg-paper section-pad">
      <NaturalBirthReveal className="container-birthwave max-w-3xl">
        <p className="eyebrow">{naturalBirthFaq.eyebrow}</p>
        <h2
          id="natural-birth-faq-heading"
          className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink"
        >
          {naturalBirthFaq.heading}
        </h2>

        <div className="mt-10 border-t border-[var(--color-border)]">
          {naturalBirthFaq.items.map((item) => (
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
      </NaturalBirthReveal>
    </section>
  );
}
