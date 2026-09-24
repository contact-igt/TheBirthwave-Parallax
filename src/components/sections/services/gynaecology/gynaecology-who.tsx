import { gynaecologyWho } from "@/content/gynaecology-landing-content";
import { GynaecologyImage } from "./gynaecology-image";
import { GynaecologyReveal } from "./gynaecology-reveal";

/**
 * Section 2 — Who This Is For. Image beside a short list of concrete,
 * intent-matching statements (never a diagnosis), matching
 * `pregnancy-antenatal-intro.tsx`'s own image-plus-list composition and
 * `vaginismus-who.tsx`'s own section shape. Closes with an explicit "your
 * symptoms and history are individual" line rather than implying any of
 * the points above confirms a diagnosis.
 */
export function GynaecologyWho() {
  return (
    <section id="gynaecology-who" aria-labelledby="gynaecology-who-heading" className="relative isolate bg-[var(--gynaecology-rose-wash)] section-pad">
      <GynaecologyReveal className="container-birthwave">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <GynaecologyImage imageKey="who-this-is-for" corner="tl" aspect="aspect-[4/5] sm:aspect-[4/4.9]" className="order-2 lg:order-1" />

          <div className="order-1 max-w-xl lg:order-2">
            <p className="eyebrow">{gynaecologyWho.eyebrow}</p>
            <h2 id="gynaecology-who-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
              {gynaecologyWho.heading}
            </h2>

            <p className="mt-6 max-w-[52ch] text-base leading-[var(--leading-relaxed)] text-ink-soft">{gynaecologyWho.intro}</p>

            <div className="mt-4 flex flex-col">
              {gynaecologyWho.points.map((point) => (
                <p key={point} className="border-t border-[var(--color-border)] py-3 font-body text-sm font-medium text-ink first:pt-0">
                  {point}
                </p>
              ))}
            </div>

            <p className="mt-8 border-l-2 border-terracotta pl-4 text-sm text-ink-soft">{gynaecologyWho.closing}</p>
          </div>
        </div>
      </GynaecologyReveal>
    </section>
  );
}
