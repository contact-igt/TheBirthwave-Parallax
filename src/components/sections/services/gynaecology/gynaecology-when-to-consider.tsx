import { gynaecologyWhenToConsider } from "@/content/pages/gynaecology";
import { GynaecologyImage } from "./gynaecology-image";
import { GynaecologyReveal } from "./gynaecology-reveal";

/**
 * Section 4 — What Can You Consult Us About? / Women's Health Concerns.
 * Renders 6 distinct concern categories with intro text and note.
 */
export function GynaecologyWhenToConsider() {
  return (
    <section id="gynaecology-when-to-consider" aria-labelledby="gynaecology-when-to-consider-heading" className="relative isolate bg-[var(--gynaecology-sky-wash)] section-pad">
      <GynaecologyReveal className="container-birthwave grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        <div className="max-w-xl">
          <p className="eyebrow">{gynaecologyWhenToConsider.eyebrow}</p>
          <h2 id="gynaecology-when-to-consider-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {gynaecologyWhenToConsider.heading}
          </h2>
          <p className="mt-4 text-base leading-[var(--leading-relaxed)] text-ink-soft">{gynaecologyWhenToConsider.intro}</p>

          <div className="mt-8 grid gap-x-6 gap-y-6 sm:grid-cols-2">
            {gynaecologyWhenToConsider.points.map((point) => (
              <div key={point.title} className="border-t border-[var(--color-border)] pt-4">
                <h3 className="font-body text-xs font-semibold tracking-[var(--tracking-wider)] text-ink uppercase">{point.title}</h3>
                <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{point.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-2xl border-l-2 border-terracotta pl-4 text-sm text-ink-soft">{gynaecologyWhenToConsider.note}</p>
        </div>

        <GynaecologyImage imageKey="health-questions" corner="br" aspect="aspect-[4/4.5] sm:aspect-[5/4] lg:aspect-[4/4.5]" />
      </GynaecologyReveal>
    </section>
  );
}
