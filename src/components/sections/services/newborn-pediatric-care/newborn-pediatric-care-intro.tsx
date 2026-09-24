import { newbornIntro } from "@/content/newborn-pediatric-care-landing-content";
import { NewbornImage } from "./newborn-pediatric-care-image";
import { NewbornReveal } from "./newborn-pediatric-care-reveal";
import { Button } from "@/components/ui/button";

/**
 * Section 2 — Trust-Building Introduction. A full section with a generous
 * image opposite the text, matching `lactation-intro.tsx`/
 * `postpartum-care-intro.tsx`'s own balanced editorial composition.
 * Explicitly reassures that a visitor doesn't need to decide in advance
 * whether something is "normal" before asking.
 */
export function NewbornIntro() {
  return (
    <section id="newborn-intro" aria-labelledby="newborn-intro-heading" className="relative isolate bg-paper section-pad">
      <NewbornReveal className="container-birthwave">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <NewbornImage imageKey="introduction" corner="tl" aspect="aspect-[4/3]" className="order-2 lg:order-1" />

          <div className="order-1 max-w-xl lg:order-2">
            <p className="eyebrow">{newbornIntro.eyebrow}</p>
            <h2 id="newborn-intro-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
              {newbornIntro.heading}
            </h2>

            {newbornIntro.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4 max-w-[52ch] text-base leading-[var(--leading-relaxed)] text-ink-soft">
                {paragraph}
              </p>
            ))}

            <div className="mt-8 flex flex-col">
              {newbornIntro.themes.map((theme) => (
                <div key={theme.title} className="border-t border-[var(--color-border)] py-5">
                  <h3 className="text-lg font-semibold text-ink">{theme.title}</h3>
                  <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{theme.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button href={newbornIntro.cta.href} variant="primary">
                {newbornIntro.cta.label}
              </Button>
            </div>
          </div>
        </div>
      </NewbornReveal>
    </section>
  );
}
