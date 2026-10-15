import { fertilityWho } from "@/content/pages/fertility-preconception";
import { AnimatedContent } from "@/components/ui/animations/animated-content";
import { cx } from "@/lib/cx";
import styles from "./fertility-preconception.module.css";

/**
 * Section 2 — Is This the Right Place to Start?
 * Who this consultation helps — orientation list of 8 relatable indicators.
 */
export function FertilityWho() {
  return (
    <section id="fertility-who" aria-labelledby="fertility-who-heading" className="relative isolate scroll-mt-[var(--header-height)] bg-[var(--fertility-tint)] section-pad">
      <div className="container-birthwave grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="max-w-md">
          <p className="eyebrow">{fertilityWho.eyebrow}</p>
          <h2 id="fertility-who-heading" className={cx(styles.display, styles.h2, "mt-4")}>
            {fertilityWho.heading}
          </h2>
          <p className="mt-5 font-medium text-base text-ink">{fertilityWho.intro}</p>
        </div>

        <div>
          <ul className="border-b border-[var(--color-border)]">
            {fertilityWho.points.map((point) => (
              <li key={point} className="border-t border-[var(--color-border)]">
                <AnimatedContent distance={14} duration={0.5} ease="power2.out" threshold={0.08} className="flex gap-4 py-4">
                  <span aria-hidden="true" className="mt-[0.6rem] size-1.5 shrink-0 rounded-full bg-terracotta-deep" />
                  <span className="text-base leading-[var(--leading-relaxed)] text-ink">{point}</span>
                </AnimatedContent>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-[52ch] text-base leading-[var(--leading-relaxed)] text-ink-soft">{fertilityWho.reassurance}</p>
        </div>
      </div>
    </section>
  );
}
