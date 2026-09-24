import { gynaecologyWhenToConsider } from "@/content/gynaecology-landing-content";
import { GynaecologyImage } from "./gynaecology-image";
import { GynaecologyReveal } from "./gynaecology-reveal";

/**
 * Section 4 — When To Consider A Consultation. Four short editorial themes
 * beside a substantial image, matching `fertility-preconception-preparing.tsx`'s
 * own points-plus-image composition (extended to four items rather than
 * three, per this page's own brief). No pinned or scrubbed motion. Closes
 * with an explicit "this page does not determine the cause of symptoms"
 * note rather than implying the themes above are diagnostic.
 */
export function GynaecologyWhenToConsider() {
  return (
    <section id="gynaecology-when-to-consider" aria-labelledby="gynaecology-when-to-consider-heading" className="relative isolate bg-[var(--gynaecology-sky-wash)] section-pad">
      <GynaecologyReveal className="container-birthwave grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <div className="max-w-xl">
          <p className="eyebrow">{gynaecologyWhenToConsider.eyebrow}</p>
          <h2 id="gynaecology-when-to-consider-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {gynaecologyWhenToConsider.heading}
          </h2>

          <div className="mt-8 flex flex-col">
            {gynaecologyWhenToConsider.points.map((point) => (
              <div key={point.title} className="border-t border-[var(--color-border)] py-5">
                <h3 className="font-body text-sm font-semibold tracking-[var(--tracking-wider)] text-ink">{point.title}</h3>
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
