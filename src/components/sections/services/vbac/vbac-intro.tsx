import { vbacIntro } from "@/content/pages/vbac";
import { VbacImage } from "./vbac-image";
import { VbacReveal } from "./vbac-reveal";

/**
 * Section 02 — BEGIN WITH YOUR FULL STORY:
 * Asymmetric editorial split: Left visual frame, Right heading, narrative, and stacked editorial pathway rows.
 */
export function VbacIntro() {
  return (
    <section id="vbac-story" aria-labelledby="vbac-story-heading" className="relative isolate overflow-hidden scroll-mt-[var(--header-height)] bg-paper section-pad">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[url('/images/services/birth-prep-starting-point-background-v1.png')] bg-cover bg-center" />
      <VbacReveal className="container-birthwave">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          {/* Left Column: Visual */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="overflow-hidden rounded-tl-panel rounded-tr-sm rounded-br-panel rounded-bl-sm border border-[var(--color-border)] bg-paper shadow-sm p-2 sm:p-2.5">
              <VbacImage
                imageKey="consultation"
                corner="tl"
                aspect="aspect-[4/5] sm:aspect-[4/4.8]"
                className="w-full"
              />
            </div>
          </div>

          {/* Right Column: Narrative & Stacked Pathway Rows */}
          <div className="max-w-xl">
            <p className="eyebrow">{vbacIntro.eyebrow}</p>
            <h2 id="vbac-story-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
              {vbacIntro.heading}
            </h2>

            <div className="mt-4 space-y-3 text-base leading-[var(--leading-relaxed)] text-ink-soft sm:text-lg">
              {vbacIntro.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {/* Stacked editorial rows with subtle dividers */}
            <div className="mt-8 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
              {vbacIntro.cards.map((card, idx) => (
                <div key={card.title} className="py-4.5 first:pt-4 last:pb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-body text-xs font-semibold tracking-wider text-terracotta-deep uppercase">
                      0{idx + 1}
                    </span>
                    <h3 className="text-base font-semibold text-ink sm:text-lg">{card.title}</h3>
                  </div>
                  <p className="mt-1.5 pl-6 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </VbacReveal>
    </section>
  );
}
