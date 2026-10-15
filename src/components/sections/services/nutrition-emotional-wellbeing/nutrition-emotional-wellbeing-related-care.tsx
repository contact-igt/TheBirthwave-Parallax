import { nutritionRelatedCare } from "@/content/pages/nutrition-emotional-wellbeing";
import { NutritionReveal } from "./nutrition-emotional-wellbeing-reveal";
import { CtaLink } from "@/components/ui/cta-link";

export function NutritionRelatedCare() {
  return (
    <section id="nutrition-related-care" aria-labelledby="nutrition-related-care-heading" className="relative isolate border-t border-[var(--color-border)] bg-paper section-pad">
      <NutritionReveal className="container-birthwave">
        <p className="eyebrow">{nutritionRelatedCare.eyebrow}</p>
        <h2 id="nutrition-related-care-heading" className="mt-4 max-w-xl text-[clamp(1.6rem,1.3rem+1.4vw,2.4rem)] leading-[1.15] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {nutritionRelatedCare.heading}
        </h2>
        <p className="mt-3 max-w-[52ch] text-sm text-ink-soft">{nutritionRelatedCare.note}</p>

        <ul className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {nutritionRelatedCare.services.map((service) => (
            <li key={service.href} className="border-t border-[var(--color-border)] pt-5">
              <CtaLink href={service.href}>{service.title}</CtaLink>
              <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{service.description}</p>
            </li>
          ))}
        </ul>
      </NutritionReveal>
    </section>
  );
}
