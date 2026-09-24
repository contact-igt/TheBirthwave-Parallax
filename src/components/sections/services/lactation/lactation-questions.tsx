import { lactationQuestions } from "@/content/lactation-landing-content";
import { LactationImage } from "./lactation-image";
import { LactationReveal } from "./lactation-reveal";
import { Button } from "@/components/ui/button";

/**
 * Section 4 — Questions & Planning Support. Four themes beside a portrait
 * "preparing before birth" image, matching
 * `gynaecology-when-to-consider.tsx`'s own points-plus-image composition. No
 * pinned or scrubbed motion. Closes with an explicit routing note for
 * persistent pain or growth/health concerns.
 */
export function LactationQuestions() {
  return (
    <section id="lactation-questions" aria-labelledby="lactation-questions-heading" className="relative isolate bg-[var(--lactation-sky-wash)] section-pad">
      <LactationReveal className="container-birthwave grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <div className="max-w-xl">
          <p className="eyebrow">{lactationQuestions.eyebrow}</p>
          <h2 id="lactation-questions-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {lactationQuestions.heading}
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg leading-[var(--leading-relaxed)] text-ink-soft">{lactationQuestions.body}</p>
          <p className="mt-3 max-w-[52ch] text-base leading-[var(--leading-relaxed)] text-ink-soft">{lactationQuestions.bodySecondary}</p>

          <div className="mt-8 flex flex-col">
            {lactationQuestions.themes.map((theme) => (
              <div key={theme.title} className="border-t border-[var(--color-border)] py-5">
                <h3 className="font-body text-sm font-semibold tracking-[var(--tracking-wider)] text-ink uppercase">{theme.title}</h3>
                <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{theme.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-2xl border-l-2 border-terracotta pl-4 text-sm text-ink-soft">{lactationQuestions.note}</p>

          <div className="mt-8">
            <Button href={lactationQuestions.cta.href} variant="primary">
              {lactationQuestions.cta.label}
            </Button>
          </div>
        </div>

        <LactationImage imageKey="preparing-before-birth" corner="br" aspect="aspect-[4/5] sm:aspect-[4/5] lg:aspect-[4/5]" />
      </LactationReveal>
    </section>
  );
}
