import { newbornQuestions } from "@/content/newborn-pediatric-care-landing-content";
import { NewbornImage } from "./newborn-pediatric-care-image";
import { NewbornReveal } from "./newborn-pediatric-care-reveal";
import { Button } from "@/components/ui/button";

/**
 * Section 4 — Questions Parents Often Bring. Four themes beside a portrait
 * image, matching `postpartum-care-recovery.tsx`/
 * `nutrition-emotional-wellbeing-together.tsx`'s own points-plus-image
 * composition. No pinned or scrubbed motion. Closes with an explicit
 * urgent-care routing note rather than implying this page can assess
 * severity itself.
 */
export function NewbornQuestions() {
  return (
    <section id="newborn-questions" aria-labelledby="newborn-questions-heading" className="relative isolate bg-[var(--newborn-sky-wash)] section-pad">
      <NewbornReveal className="container-birthwave grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <div className="max-w-xl">
          <p className="eyebrow">{newbornQuestions.eyebrow}</p>
          <h2 id="newborn-questions-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {newbornQuestions.heading}
          </h2>

          <div className="mt-8 flex flex-col">
            {newbornQuestions.themes.map((theme) => (
              <div key={theme.title} className="border-t border-[var(--color-border)] py-5">
                <h3 className="font-body text-sm font-semibold tracking-[var(--tracking-wider)] text-ink uppercase">{theme.title}</h3>
                <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{theme.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-2xl border-l-2 border-terracotta pl-4 text-sm text-ink-soft">{newbornQuestions.note}</p>

          <div className="mt-8">
            <Button href={newbornQuestions.cta.href} variant="primary">
              {newbornQuestions.cta.label}
            </Button>
          </div>
        </div>

        <NewbornImage imageKey="daily-care" corner="br" aspect="aspect-[4/5]" />
      </NewbornReveal>
    </section>
  );
}
