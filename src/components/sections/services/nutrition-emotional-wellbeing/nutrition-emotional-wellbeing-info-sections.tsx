import { ServiceFaqSection } from "../shared/service-faq-section";
import { nutritionPractical, nutritionFaq } from "@/content/pages/nutrition-emotional-wellbeing";
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
          {"intro" in nutritionPractical && nutritionPractical.intro ? (
            <p className="mt-4 max-w-[52ch] text-base leading-[var(--leading-relaxed)] text-ink-soft">{nutritionPractical.intro as string}</p>
          ) : null}

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
  return <ServiceFaqSection id="nutrition-faq" eyebrow={nutritionFaq.eyebrow} heading={nutritionFaq.heading} items={nutritionFaq.items} />;
}
