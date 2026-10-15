import { naturalBirthSupport } from "@/content/pages/natural-birth";
import { NaturalBirthImage } from "./natural-birth-image";
import { NaturalBirthReveal } from "./natural-birth-reveal";
import { Button } from "@/components/ui/button";
import { HeartHandshake, PersonStanding, Route, Timer } from "lucide-react";

const stepIcons = [Timer, PersonStanding, HeartHandshake, Route];

/**
 * Section 04 — Preparing During Pregnancy.
 */
export function NaturalBirthSupport() {
  return (
    <section id="natural-birth-support" aria-labelledby="natural-birth-support-heading" className="relative isolate overflow-hidden bg-paper bg-[url('/images/natural-birth/natural-birth-support-background-v1.png')] bg-cover bg-center section-pad">
      <NaturalBirthReveal className="container-birthwave grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
        <NaturalBirthImage imageKey="preparation" corner="tl" aspect="aspect-[4/5] sm:aspect-[4/4.9]" />

        <div className="max-w-xl">
          <p className="eyebrow">{naturalBirthSupport.eyebrow}</p>
          <h2
            id="natural-birth-support-heading"
            className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink"
          >
            {naturalBirthSupport.heading}
          </h2>
          {naturalBirthSupport.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 max-w-[52ch] text-base leading-[var(--leading-relaxed)] text-ink-soft">
              {paragraph}
            </p>
          ))}

          <ol className="relative mt-8 grid gap-3 before:absolute before:top-6 before:bottom-6 before:left-6 before:w-px before:bg-[#dcb8a8]">
            {naturalBirthSupport.steps.map((step, index) => {
              const Icon = stepIcons[index];
              return (
                <li key={step.number} className="relative grid grid-cols-[3rem_minmax(0,1fr)] items-start gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#dcb8a8] bg-[#f7e9e2] font-body text-sm font-semibold text-terracotta-deep">
                    {step.number}
                  </span>
                  <div className="rounded-2xl border border-[#ead9d1] bg-white/75 px-5 py-4 shadow-[0_10px_30px_rgba(75,45,35,0.04)]">
                    <div className="flex items-center gap-2.5">
                      <Icon aria-hidden="true" className="h-5 w-5 shrink-0 text-terracotta-deep" strokeWidth={1.6} />
                      <h3 className="font-body text-base! font-semibold leading-snug text-ink">{step.title}</h3>
                    </div>
                    <p className="mt-1.5 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{step.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="mt-8">
            <Button href={naturalBirthSupport.cta.href} variant="primary">
              {naturalBirthSupport.cta.label.replace(/\s*↗$/, "")}
            </Button>
          </div>
        </div>
      </NaturalBirthReveal>
    </section>
  );
}
