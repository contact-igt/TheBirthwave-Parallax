import { naturalBirthPreferences } from "@/content/natural-birth-landing-content";
import { NaturalBirthImage } from "./natural-birth-image";
import { NaturalBirthReveal } from "./natural-birth-reveal";
import { Button } from "@/components/ui/button";

/**
 * Section 03 — What You Can Plan and Discuss. Five themes as a compact
 * hairline-divided list beside a generous preferences-conversation image
 * — matching the same text-plus-image composition `vbac-planning.tsx`
 * already establishes. Every theme is phrased as something to discuss,
 * never something automatically offered or facility-confirmed (no
 * facility-specific option is claimed here).
 */
export function NaturalBirthPreferences() {
  return (
    <section id="natural-birth-preferences" aria-labelledby="natural-birth-preferences-heading" className="relative isolate bg-paper section-pad">
      <NaturalBirthReveal className="container-birthwave grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <div className="max-w-xl">
          <p className="eyebrow">{naturalBirthPreferences.eyebrow}</p>
          <h2
            id="natural-birth-preferences-heading"
            className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink"
          >
            {naturalBirthPreferences.heading}
          </h2>

          <div className="mt-8 flex flex-col">
            {naturalBirthPreferences.themes.map((theme) => (
              <div key={theme.title} className="border-t border-[var(--color-border)] py-5">
                <h3 className="font-body text-sm font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">{theme.title}</h3>
                <p className="mt-2 text-base leading-[var(--leading-relaxed)] text-ink-soft">{theme.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Button href={naturalBirthPreferences.cta.href} variant="primary">
              {naturalBirthPreferences.cta.label}
            </Button>
          </div>
        </div>

        <NaturalBirthImage imageKey="preferences" corner="br" aspect="aspect-[4/3]" />
      </NaturalBirthReveal>
    </section>
  );
}
