import { ArrowRight, Heart, MessageCircle, Sprout, Star, UsersRound } from "lucide-react";
import { birthPrepPreferences } from "@/content/birth-preparation-landing-content";
import { BirthPrepReveal } from "./birth-preparation-reveal";
import { Button } from "@/components/ui/button";

const preferencePrompts = [
  { title: "Comfort", body: "How would you like to stay comfortable?", icon: Heart, tint: "bg-[#faebe5] text-[#ae694e]" },
  { title: "Pain Relief", body: "Which options would you like to understand?", icon: Sprout, tint: "bg-[#eff1df] text-[#7a8d48]" },
  { title: "Birth Partner", body: "Who would you like beside you?", icon: UsersRound, tint: "bg-[#faebe5] text-[#ae694e]" },
  { title: "Communication", body: "How should your care team support you?", icon: MessageCircle, tint: "bg-[#e8eef1] text-[#6f8594]" },
  { title: "Flexibility", body: "If plans change, what matters most?", icon: Star, tint: "bg-[#f8efdf] text-[#b17a42]" },
] as const;

/** Section 4 — Your Birth Preferences. */
export function BirthPrepPreferences() {
  return (
    <section id="birth-prep-preferences" aria-labelledby="birth-prep-preferences-heading" className="relative isolate overflow-hidden bg-[#fffaf7] section-pad">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[url('/images/services/birth-prep-preferences-illustration-bg-v1.png')] bg-cover bg-center" />
      <BirthPrepReveal className="container-birthwave grid gap-10 xl:grid-cols-[minmax(0,3fr)_minmax(22rem,2fr)] xl:items-start xl:gap-14">
        <div className="max-w-3xl">
          <p className="eyebrow">{birthPrepPreferences.eyebrow}</p>
          <h2 id="birth-prep-preferences-heading" className="mt-4 text-balance font-display text-[clamp(2.5rem,2rem+2.75vw,4rem)] leading-[1.04] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {birthPrepPreferences.heading}
          </h2>
          {birthPrepPreferences.intro.map((paragraph) => (
            <p key={paragraph} className="mt-5 max-w-[52ch] text-base leading-[var(--leading-relaxed)] text-ink-soft sm:text-lg">{paragraph}</p>
          ))}
          <div className="mt-8"><Button href={birthPrepPreferences.cta.href} variant="primary">{birthPrepPreferences.cta.label}</Button></div>
        </div>

        <div className="grid gap-3 xl:pt-12" aria-label="Birth preference prompts">
          {preferencePrompts.map(({ title, body, icon: Icon, tint }) => (
            <div key={title} className="grid min-h-28 grid-cols-[4.25rem_1fr_2.5rem] items-center gap-4 rounded-[1.6rem] border border-[#e8cfc4]/75 bg-[#fffaf5]/70 px-4 py-4 shadow-[0_14px_30px_-24px_rgba(111,72,54,0.28)] backdrop-blur-md sm:px-5">
              <span aria-hidden="true" className={`flex size-16 items-center justify-center rounded-full ${tint}`}><Icon className="size-8" strokeWidth={1.55} /></span>
              <div><h3 className="font-display text-xl font-semibold tracking-[var(--tracking-tight)] text-ink">{title}</h3><p className="mt-1 text-sm leading-snug text-ink-soft sm:text-base">{body}</p></div>
              <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-full border border-[#efd8cf] text-terracotta-deep"><ArrowRight className="size-4" strokeWidth={1.8} /></span>
            </div>
          ))}
        </div>
      </BirthPrepReveal>
    </section>
  );
}
