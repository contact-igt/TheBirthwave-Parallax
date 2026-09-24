import { lactationIntro } from "@/content/lactation-landing-content";
import { LactationImage } from "./lactation-image";
import { LactationReveal } from "./lactation-reveal";
import { Button } from "@/components/ui/button";

/**
 * Section 2 — Trust-Building Introduction. A full section with a generous
 * consultation image opposite the text, matching
 * `vbac-intro.tsx`'s own balanced editorial composition. Explicitly reassures
 * that a visitor doesn't need to self-diagnose a "feeding problem" before
 * asking for support.
 */
export function LactationIntro() {
  return (
    <section id="lactation-intro" aria-labelledby="lactation-intro-heading" className="relative isolate bg-paper section-pad">
      <LactationReveal className="container-birthwave">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <LactationImage imageKey="consultation" corner="tl" aspect="aspect-[4/5] sm:aspect-[4/4.9]" className="order-2 lg:order-1" />

          <div className="order-1 max-w-xl lg:order-2">
            <p className="eyebrow">{lactationIntro.eyebrow}</p>
            <h2 id="lactation-intro-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
              {lactationIntro.heading}
            </h2>

            {lactationIntro.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4 max-w-[52ch] text-base leading-[var(--leading-relaxed)] text-ink-soft">
                {paragraph}
              </p>
            ))}

            <div className="mt-8 flex flex-col">
              {lactationIntro.themes.map((theme) => (
                <div key={theme.title} className="border-t border-[var(--color-border)] py-5">
                  <h3 className="text-lg font-semibold text-ink">{theme.title}</h3>
                  <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{theme.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button href={lactationIntro.cta.href} variant="primary">
                {lactationIntro.cta.label}
              </Button>
            </div>
          </div>
        </div>
      </LactationReveal>
    </section>
  );
}
