import { vaginismusWholePerson } from "@/content/pages/vaginismus";
import styles from "./vaginismus-page.module.css";
import { VaginismusReveal } from "./vaginismus-reveal";

/**
 * Section 5A — Why Different Types of Support Matter / Understanding Whole-Person Care.
 * Highlights the interplay between gynaecology, pelvic floor therapy,
 * psychological support, psychosexual care, and mind-body practices.
 *
 * Layout redesign: domain cards on a warm tinted background with an
 * editorial pull-quote strip separating the intro from the grid, giving
 * the section its own visual signature rather than being a plain card grid.
 */
export function VaginismusWholePerson() {
  return (
    <section
      id="vaginismus-whole-person"
      aria-labelledby="vaginismus-whole-person-heading"
      className="relative isolate bg-paper section-pad border-t border-[var(--color-border)]"
    >
      <VaginismusReveal className="container-birthwave max-w-5xl">
        {/* Top: eyebrow + heading + intro, split asymmetrically */}
        <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:items-start lg:gap-16">
          <div>
            <p className="eyebrow">{vaginismusWholePerson.eyebrow}</p>
            <h2
              id="vaginismus-whole-person-heading"
              className="mt-4 text-[clamp(1.9rem,1.4rem+2.4vw,3.1rem)] leading-[1.12] font-semibold tracking-[var(--tracking-tight)] text-ink"
            >
              {vaginismusWholePerson.heading}
            </h2>
          </div>

          <div className="space-y-3 text-base leading-[var(--leading-relaxed)] text-ink-soft lg:pt-1">
            {vaginismusWholePerson.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        {/* Domains grid — 5 cards, 3-col on lg, 2-col on sm */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {vaginismusWholePerson.domains.map((domain) => (
            <div
              key={domain.title}
              className={styles.domain}
            >
              {/* Coloured accent bar */}
              <div
                aria-hidden="true"
                className="mb-4 h-0.5 w-8 rounded-full bg-terracotta-deep transition-all duration-[var(--duration-fast)] group-hover:w-14"
              />
              <h3 className="font-body text-base font-semibold text-ink">
                {domain.title}
              </h3>
              <p className="mt-3 text-sm leading-[var(--leading-relaxed)] text-ink-soft">
                {domain.description}
              </p>
            </div>
          ))}
        </div>

        {/* Closing Note — editorial pull-quote style */}
        <div className="mt-10 border-l-[3px] border-terracotta bg-[var(--vaginismus-rose-wash)]/40 px-6 py-5 space-y-2 rounded-r-xs">
          {vaginismusWholePerson.closing.map((p, idx) => (
            <p
              key={idx}
              className={`text-base leading-[var(--leading-relaxed)] ${
                idx === 1 ? "font-semibold text-ink" : "text-ink-soft"
              }`}
            >
              {p}
            </p>
          ))}
        </div>
      </VaginismusReveal>
    </section>
  );
}
