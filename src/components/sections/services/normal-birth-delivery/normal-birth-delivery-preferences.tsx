import { normalBirthPreferences } from "@/content/normal-birth-delivery-landing-content";
import { NormalBirthImage } from "./normal-birth-delivery-image";
import { NormalBirthReveal } from "./normal-birth-delivery-reveal";
import { Button } from "@/components/ui/button";

/**
 * Section 4 — Preferences and Changing Circumstances. A quiet rose wash
 * background (per the brief), built from BirthWave's existing confirmed
 * dusty-rose brand hue (`--color-terracotta`, see this page's own
 * `--nbd-rose-wash` token on the landing-page wrapper) rather than an
 * invented off-brand colour — the same approach the birth-preparation
 * landing page's own preferences section already uses. Full paragraphs
 * and a plain question list in normal document flow — no per-sentence
 * scroll reveals.
 */
export function NormalBirthPreferences() {
  return (
    <section id="nbd-preferences" aria-labelledby="nbd-preferences-heading" className="relative isolate bg-[var(--nbd-rose-wash)] section-pad">
      <NormalBirthReveal className="container-birthwave grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <div className="max-w-xl">
          <p className="eyebrow">{normalBirthPreferences.eyebrow}</p>
          <h2 id="nbd-preferences-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {normalBirthPreferences.heading.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>

          {normalBirthPreferences.body.map((paragraph) => (
            <p key={paragraph} className="mt-4 max-w-[52ch] text-base leading-[var(--leading-relaxed)] text-ink-soft">
              {paragraph}
            </p>
          ))}

          <div className="mt-8 flex flex-col">
            {normalBirthPreferences.questions.map((question) => (
              <p key={question} className="border-t border-[var(--color-border)] py-3 font-body text-sm font-medium text-ink first:pt-0">
                {question}
              </p>
            ))}
          </div>

          <div className="mt-8">
            <Button href={normalBirthPreferences.cta.href} variant="primary">
              {normalBirthPreferences.cta.label}
            </Button>
          </div>
        </div>

        <NormalBirthImage
          imageKey="birth-preferences"
          drift
          corner="br"
          aspect="aspect-[4/4.5] sm:aspect-[5/4] lg:aspect-[4/4.5]"
        />
      </NormalBirthReveal>
    </section>
  );
}
