import { vbacIntro } from "@/content/vbac-landing-content";
import { VbacImage } from "./vbac-image";
import { VbacReveal } from "./vbac-reveal";

/**
 * Section 02 — BEGIN WITH YOUR FULL STORY:
 * Understanding options, previous birth records, and current pregnancy progress.
 */
export function VbacIntro() {
  return (
    <section id="vbac-story" aria-labelledby="vbac-story-heading" className="relative isolate scroll-mt-[var(--header-height)] bg-paper section-pad">
      <VbacReveal className="container-birthwave">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <VbacImage imageKey="consultation" corner="tl" aspect="aspect-[4/5] sm:aspect-[4/4.9]" className="order-2 lg:order-1" />

          <div className="order-1 max-w-xl lg:order-2">
            <p className="eyebrow">{vbacIntro.eyebrow}</p>
            <h2 id="vbac-story-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
              {vbacIntro.heading}
            </h2>

            <div className="mt-4 space-y-3 text-base leading-[var(--leading-relaxed)] text-ink-soft">
              {vbacIntro.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 flex flex-col">
              {vbacIntro.cards.map((card) => (
                <div key={card.title} className="border-t border-[var(--color-border)] py-5">
                  <h3 className="text-lg font-semibold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </VbacReveal>
    </section>
  );
}
