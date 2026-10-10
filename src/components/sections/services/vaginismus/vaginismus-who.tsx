import { vaginismusWho } from "@/content/vaginismus-landing-content";
import { VaginismusImage } from "./vaginismus-image";
import { VaginismusReveal } from "./vaginismus-reveal";

/**
 * Section 3 — Is This Relevant to Me? (Who This Is For).
 */
export function VaginismusWho() {
  return (
    <section id="vaginismus-who" aria-labelledby="vaginismus-who-heading" className="relative isolate bg-[var(--vaginismus-rose-wash)] section-pad">
      <VaginismusReveal className="container-birthwave">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <VaginismusImage imageKey="who-this-is-for" corner="tl" aspect="aspect-[4/5] sm:aspect-[4/4.9]" className="order-2 lg:order-1" />

          <div className="order-1 max-w-xl lg:order-2">
            <p className="eyebrow">{vaginismusWho.eyebrow}</p>
            <h2 id="vaginismus-who-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
              {vaginismusWho.heading}
            </h2>

            <p className="mt-6 max-w-[52ch] text-base leading-[var(--leading-relaxed)] text-ink-soft">{vaginismusWho.intro}</p>

            <div className="mt-6 flex flex-col">
              {vaginismusWho.points.map((point) => (
                <div key={point.title} className="border-t border-[var(--color-border)] py-4 first:border-t-0">
                  <h3 className="font-body text-sm font-semibold text-ink">{point.title}</h3>
                  <p className="mt-1 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{point.body}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 border-l-2 border-terracotta pl-4 text-sm text-ink-soft">{vaginismusWho.closing}</p>
          </div>
        </div>
      </VaginismusReveal>
    </section>
  );
}
