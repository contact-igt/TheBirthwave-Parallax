import { Plus } from "lucide-react";
import { nutritionPractical, nutritionFaq } from "@/content/nutrition-emotional-wellbeing-landing-content";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { NutritionReveal } from "./nutrition-emotional-wellbeing-reveal";

/**
 * Section 7 — Practical Information. Every field is a confirmed-pending
 * placeholder (see the content file's own comment) — visible
 * "[BirthWave confirmation needed: ...]" wording rather than hiding missing
 * information behind a generic claim. No photograph implies a real
 * consultation space; the shared `MediaPlaceholder` stands in until real,
 * approved photography exists.
 */
export function NutritionPractical() {
  return (
    <section id="nutrition-practical" aria-labelledby="nutrition-practical-heading" className="relative isolate bg-[var(--nutrition-rose-wash)] section-pad">
      <NutritionReveal className="container-birthwave grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
        <MediaPlaceholder
          alt={nutritionPractical.facilityPhotoPendingLabel}
          gradient="linear-gradient(135deg, var(--color-paper-dim) 0%, var(--color-sky) 100%)"
          corner="tr"
          aspect="aspect-[4/5]"
          className="w-full"
        />

        <div>
          <p className="eyebrow">{nutritionPractical.eyebrow}</p>
          <h2 id="nutrition-practical-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {nutritionPractical.heading}
          </h2>
          <p className="mt-4 max-w-[52ch] text-base leading-[var(--leading-relaxed)] text-ink-soft">{nutritionPractical.intro}</p>

          <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {nutritionPractical.info.map((item) => (
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
      </NutritionReveal>
    </section>
  );
}

/** Section 8 — FAQ. Native `<details>/<summary>` — the same accessible
 * accordion every other landing page on this site uses. Answers stay
 * cautious throughout: no guaranteed outcome, no diagnosis, no
 * psychotherapy claim — every unconfirmed operational or clinical-scope
 * question is left as an explicit placeholder. */
export function NutritionFaq() {
  return (
    <section id="nutrition-faq" aria-labelledby="nutrition-faq-heading" className="relative isolate bg-paper section-pad">
      <NutritionReveal className="container-birthwave max-w-3xl">
        <p className="eyebrow">{nutritionFaq.eyebrow}</p>
        <h2 id="nutrition-faq-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {nutritionFaq.heading}
        </h2>

        <div className="mt-10 border-t border-[var(--color-border)]">
          {nutritionFaq.items.map((item) => (
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
      </NutritionReveal>
    </section>
  );
}
