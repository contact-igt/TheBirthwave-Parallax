import { nutritionTogether } from "@/content/nutrition-emotional-wellbeing-landing-content";
import { NutritionImage } from "./nutrition-emotional-wellbeing-image";
import { NutritionReveal } from "./nutrition-emotional-wellbeing-reveal";
import { Button } from "@/components/ui/button";

/**
 * Section 4 — Nutrition and Emotional Well-being Together. Four themes
 * beside a quiet reflective image, matching
 * `postpartum-care-recovery.tsx`/`gynaecology-when-to-consider.tsx`'s own
 * points-plus-image composition. No pinned or scrubbed motion. Closes with
 * an explicit "not a substitute for urgent medical or mental-health care"
 * note.
 */
export function NutritionTogether() {
  return (
    <section id="nutrition-together" aria-labelledby="nutrition-together-heading" className="relative isolate bg-[var(--nutrition-sage-wash)] section-pad">
      <NutritionReveal className="container-birthwave grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <div className="max-w-xl">
          <p className="eyebrow">{nutritionTogether.eyebrow}</p>
          <h2 id="nutrition-together-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {nutritionTogether.heading}
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg leading-[var(--leading-relaxed)] text-ink-soft">{nutritionTogether.body}</p>
          <p className="mt-3 max-w-[52ch] text-base leading-[var(--leading-relaxed)] text-ink-soft">{nutritionTogether.bodySecondary}</p>

          <div className="mt-8 flex flex-col">
            {nutritionTogether.themes.map((theme) => (
              <div key={theme.title} className="border-t border-[var(--color-border)] py-5">
                <h3 className="font-body text-sm font-semibold tracking-[var(--tracking-wider)] text-ink uppercase">{theme.title}</h3>
                <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{theme.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-2xl border-l-2 border-terracotta pl-4 text-sm text-ink-soft">{nutritionTogether.note}</p>

          <div className="mt-8">
            <Button href={nutritionTogether.cta.href} variant="primary">
              {nutritionTogether.cta.label}
            </Button>
          </div>
        </div>

        <NutritionImage imageKey="emotional-wellbeing" corner="br" aspect="aspect-[4/3]" />
      </NutritionReveal>
    </section>
  );
}
