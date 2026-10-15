import { naturalBirthPreferences } from "@/content/pages/natural-birth";
import { NaturalBirthImage } from "./natural-birth-image";
import { NaturalBirthReveal } from "./natural-birth-reveal";
import { Button } from "@/components/ui/button";

export function NaturalBirthPreferences() {
  return (
    <section id="natural-birth-preferences" aria-labelledby="natural-birth-preferences-heading" className="relative isolate overflow-hidden bg-paper bg-[url('/images/natural-birth/natural-birth-preferences-background-v1.png')] bg-cover bg-center section-pad">
      <NaturalBirthReveal className="container-birthwave relative z-10 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <div className="max-w-xl">
          <p className="eyebrow">{naturalBirthPreferences.eyebrow}</p>
          <h2
            id="natural-birth-preferences-heading"
            className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink"
          >
            {naturalBirthPreferences.heading}
          </h2>
          <p className="mt-4 max-w-[52ch] text-base leading-[var(--leading-relaxed)] text-ink-soft">{naturalBirthPreferences.intro}</p>

          <div className="mt-8 flex flex-col">
            {naturalBirthPreferences.themes.map((theme) => (
              <div key={theme.title} className="border-t border-[var(--color-border)] py-5">
                <h3 className="font-body text-sm font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">{theme.title}</h3>
                <p className="mt-2 text-base leading-[var(--leading-relaxed)] text-ink-soft">{theme.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 border-l-2 border-terracotta pl-4 text-base leading-[var(--leading-relaxed)] font-medium text-ink">
            {naturalBirthPreferences.closing}
          </p>

          <div className="mt-8">
            <Button href={naturalBirthPreferences.cta.href} variant="primary">
              {naturalBirthPreferences.cta.label.replace(/\s*↗$/, "")}
            </Button>
          </div>
        </div>

        <NaturalBirthImage imageKey="preferences" corner="br" aspect="aspect-[4/3]" />
      </NaturalBirthReveal>
    </section>
  );
}
