import { Baby, HeartHandshake, RotateCcw, Signpost, Sparkles, UsersRound } from "lucide-react";
import { birthPrepWhoFor } from "@/content/birth-preparation-landing-content";
import { BirthPrepReveal } from "./birth-preparation-reveal";
import { Button } from "@/components/ui/button";

const audienceIcons = [
  { icon: Baby, surface: "bg-[#f8e8e1] text-[#ad7059]" },
  { icon: RotateCcw, surface: "bg-[#e9f0e5] text-[#668557]" },
  { icon: Signpost, surface: "bg-[#fbefde] text-[#af7b3e]" },
  { icon: UsersRound, surface: "bg-[#e5f0f4] text-[#527a8b]" },
  { icon: HeartHandshake, surface: "bg-[#f5e7f0] text-[#94647e]" },
  { icon: Sparkles, surface: "bg-[#f8ece0] text-[#ae704f]" },
] as const;

/**
 * Section 03 — Who Is This Workshop For? (Your Starting Point).
 * 6 relatable scenarios for first-time or experienced parents, partner involvement,
 * and breastfeeding/newborn preparation.
 */
export function BirthPrepWho() {
  return (
    <section id="birth-prep-who-for" aria-labelledby="birth-prep-who-for-heading" className="relative isolate bg-paper py-14 lg:py-16">
      <BirthPrepReveal className="container-birthwave max-w-4xl">
        <p className="eyebrow">{birthPrepWhoFor.eyebrow}</p>
        <h2 id="birth-prep-who-for-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {birthPrepWhoFor.heading}
        </h2>
        <p className="mt-5 text-base font-medium text-ink">{birthPrepWhoFor.intro}</p>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          {birthPrepWhoFor.items.map((item, index) => {
            const { icon: Icon, surface } = audienceIcons[index];

            return (
            <div
              key={item.title}
              className="group flex min-h-[9.75rem] gap-4 rounded-[1.35rem] border border-[color-mix(in_srgb,var(--color-terracotta)_18%,var(--color-border))] bg-[color-mix(in_srgb,var(--color-paper)_92%,var(--birth-prep-rose-wash))] p-5 shadow-[0_10px_25px_-22px_rgba(75,47,38,0.45)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-terracotta/30 hover:shadow-[0_17px_30px_-22px_rgba(75,47,38,0.34)]"
            >
              <span aria-hidden="true" className={`flex size-11 shrink-0 items-center justify-center rounded-full ${surface}`}>
                <Icon className="size-5" strokeWidth={1.7} />
              </span>
              <div className="pt-0.5">
                <h3 className="font-body text-[1.05rem] font-semibold leading-tight text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-[1.55] text-ink-soft">{item.body}</p>
              </div>
            </div>
            );
          })}
        </div>

        <div className="mt-8">
          <Button href={birthPrepWhoFor.cta.href} variant="primary">
            {birthPrepWhoFor.cta.label}
          </Button>
        </div>
      </BirthPrepReveal>
    </section>
  );
}
