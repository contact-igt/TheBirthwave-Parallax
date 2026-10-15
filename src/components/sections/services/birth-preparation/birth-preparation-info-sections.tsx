import {
  BookOpen,
  CalendarDays,
  CreditCard,
  HeartPulse,
  MapPin,
  UsersRound,
} from "lucide-react";
import { birthPrepFaq, birthPrepProgramme } from "@/content/birth-preparation-landing-content";
import { Button } from "@/components/ui/button";
import { BirthPrepReveal } from "./birth-preparation-reveal";
import { DotFieldRegion } from "@/components/layout/dot-field-region";
import { ServiceFaqSection } from "../shared/service-faq-section";
import { servicesImagery } from "@/content/services-imagery";

const programmeItemMeta = [
  {
    icon: BookOpen,
    surface: "bg-[#f8e8e1] text-[#ad7059]",
    badge: "Curriculum",
  },
  {
    icon: UsersRound,
    surface: "bg-[#e9f0e5] text-[#668557]",
    badge: "Participants",
  },
  {
    icon: CalendarDays,
    surface: "bg-[#fbefde] text-[#af7b3e]",
    badge: "Schedule",
  },
  {
    icon: MapPin,
    surface: "bg-[#e5f0f4] text-[#527a8b]",
    badge: "Venue",
  },
  {
    icon: CreditCard,
    surface: "bg-[#f5e7f0] text-[#94647e]",
    badge: "Registration",
  },
  {
    icon: HeartPulse,
    surface: "bg-[#f8ece0] text-[#ae704f]",
    badge: "Medical",
  },
] as const;

export function BirthPrepProgramme() {
  const cleanCtaLabel = birthPrepProgramme.cta.label.replace(/\s*→\s*$/, "");

  return (
    <section
      id="birth-prep-programme"
      aria-labelledby="birth-prep-programme-heading"
      className="relative isolate overflow-hidden bg-[var(--birth-prep-rose-wash)] py-16 sm:py-20 lg:py-24"
    >
      {/* Decorative ambient glow orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-1/4 -z-10 h-96 w-96 rounded-full bg-white/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-1/6 -z-10 h-80 w-80 rounded-full bg-[color-mix(in_srgb,var(--color-terracotta)_20%,transparent)] blur-3xl opacity-60"
      />

      <BirthPrepReveal className="container-birthwave max-w-5xl">
        <div className="max-w-2xl">
          <p className="eyebrow">{birthPrepProgramme.eyebrow}</p>
          <h2
            id="birth-prep-programme-heading"
            className="mt-4 text-[clamp(2.1rem,1.5rem+2.4vw,3.25rem)] leading-[1.12] font-semibold tracking-[var(--tracking-tight)] text-ink"
          >
            {birthPrepProgramme.heading}
          </h2>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {birthPrepProgramme.items.map((item, index) => {
            const meta = programmeItemMeta[index % programmeItemMeta.length];
            const Icon = meta.icon;

            return (
              <div
                key={item.label}
                className="group relative flex flex-col justify-between rounded-2xl border border-[color-mix(in_srgb,var(--color-terracotta)_18%,var(--color-border))] bg-white/85 p-6 backdrop-blur-sm shadow-[0_10px_25px_-20px_rgba(75,47,38,0.3)] transition-all duration-300 hover:-translate-y-1 hover:border-terracotta/40 hover:bg-white hover:shadow-[0_18px_36px_-16px_rgba(75,47,38,0.25)]"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span
                      aria-hidden="true"
                      className={`flex size-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${meta.surface}`}
                    >
                      <Icon className="size-5" strokeWidth={1.8} />
                    </span>
                    <span className="inline-flex items-center rounded-full bg-[color-mix(in_srgb,var(--color-terracotta)_10%,var(--color-paper))] px-2.5 py-0.5 text-[0.72rem] font-medium tracking-wide text-ink-soft">
                      {meta.badge}
                    </span>
                  </div>

                  <h3 className="mt-4 font-body text-[1.05rem] font-semibold text-ink">
                    {item.label}
                  </h3>
                  <p className="mt-2 text-sm leading-[1.65] text-ink-soft">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 rounded-2xl border border-[color-mix(in_srgb,var(--color-terracotta)_18%,var(--color-border))] bg-white/70 p-6 backdrop-blur-sm sm:p-7">
          <div>
            <h3 className="font-body text-base font-semibold text-ink sm:text-lg">
              Have questions about upcoming dates or batch sizes?
            </h3>
            <p className="mt-1 text-sm text-ink-soft">
              Our care team is happy to share workshop details and help you find a suitable cohort.
            </p>
          </div>
          <Button
            href={birthPrepProgramme.cta.href}
            variant="primary"
            className="shrink-0"
          >
            {cleanCtaLabel}
          </Button>
        </div>
      </BirthPrepReveal>
    </section>
  );
}

export function BirthPrepFaq() {
  return (
    <DotFieldRegion>
      <ServiceFaqSection
        id="birth-prep-faq"
        eyebrow={birthPrepFaq.eyebrow}
        heading={birthPrepFaq.heading}
        description={"You don't need to have every question or preference figured out before joining."}
        items={birthPrepFaq.items}
        media={servicesImagery["birth-prep-landing-consultation"]}
      />
    </DotFieldRegion>
  );
}
