import { naturalBirthWhenLabourBegins } from "@/content/pages/natural-birth";
import { NaturalBirthReveal } from "./natural-birth-reveal";
import { HeartPulse, PersonStanding, UsersRound, Wind } from "lucide-react";

const pointIcons = [PersonStanding, Wind, UsersRound, HeartPulse];

/**
 * Section 05 — When Labour Begins.
 */
export function NaturalBirthWhenLabourBegins() {
  return (
    <section id="natural-birth-labour" aria-labelledby="natural-birth-labour-heading" className="relative isolate overflow-hidden bg-paper bg-[url('/images/natural-birth/natural-birth-labour-background-v1.png')] bg-cover bg-center section-pad">
      <NaturalBirthReveal className="container-birthwave relative z-10">
        <p className="eyebrow">{naturalBirthWhenLabourBegins.eyebrow}</p>
        <h2
          id="natural-birth-labour-heading"
          className="mt-4 max-w-4xl text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink"
        >
          {naturalBirthWhenLabourBegins.heading}
        </h2>

        {naturalBirthWhenLabourBegins.intro.map((para) => (
          <p key={para} className="mt-4 max-w-[56ch] text-base leading-[var(--leading-relaxed)] text-ink-soft">
            {para}
          </p>
        ))}

        <ol className="relative mt-12 grid gap-x-4 gap-y-10 md:grid-cols-2 xl:grid-cols-4 xl:before:absolute xl:before:top-6 xl:before:right-[12.5%] xl:before:left-[12.5%] xl:before:border-t xl:before:border-dashed xl:before:border-[#ca9b89]">
          {naturalBirthWhenLabourBegins.points.map((point, index) => {
            const Icon = pointIcons[index];
            return (
              <li key={point.number} className="relative flex flex-col items-center">
                <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#ce9d8a] bg-[#f5e2d8] font-body text-base font-semibold text-terracotta-deep shadow-[0_5px_15px_rgba(75,45,35,0.08)]">
                  {point.number}
                </span>
                <div className="mt-5 flex h-full w-full flex-col rounded-[1.5rem] border border-[#ead9d1] bg-white/90 p-5 shadow-[0_15px_40px_rgba(75,45,35,0.06)] backdrop-blur-sm">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f8eae3] text-terracotta-deep">
                    <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-4 font-body text-base! font-semibold leading-snug text-ink">{point.title}</h3>
                  <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{point.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </NaturalBirthReveal>
    </section>
  );
}
