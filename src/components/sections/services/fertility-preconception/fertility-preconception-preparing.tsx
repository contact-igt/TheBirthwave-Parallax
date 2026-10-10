import { fertilityPreparing } from "@/content/fertility-preconception-landing-content";
import { AnimatedContent } from "@/components/ui/animations/animated-content";
import { cx } from "@/lib/cx";
import styles from "./fertility-preconception.module.css";

/**
 * 04 — Preconception care. Explains preparation BEFORE pregnancy (distinct
 * from 03, which lists what is discussed at the consultation). Text-only,
 * three compact columns from `md`, stacked on mobile; content-driven height,
 * no photograph. The three points enter together with a short row stagger.
 */
export function FertilityPreparing() {
  return (
    <section id="fertility-preparing" aria-labelledby="fertility-preparing-heading" className="relative isolate scroll-mt-[var(--header-height)] bg-[var(--fertility-tint)] py-16 sm:py-20">
      <div className="container-birthwave">
        <div className="max-w-2xl">
          <p className="eyebrow">{fertilityPreparing.eyebrow}</p>
          <h2 id="fertility-preparing-heading" className={cx(styles.display, styles.h2, "mt-4")}>
            {fertilityPreparing.heading}
          </h2>
          <p className="mt-5 max-w-[56ch] text-lg leading-[var(--leading-relaxed)] text-ink-soft">{fertilityPreparing.intro}</p>
        </div>

        <ul className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-3">
          {fertilityPreparing.points.map((point) => (
            <li key={point.title}>
              <AnimatedContent distance={16} duration={0.5} ease="power2.out" threshold={0.08} rowStagger={0.08} className="h-full border-t-2 border-terracotta pt-5">
                <h3 className={cx(styles.display, styles.h3)}>{point.title}</h3>
                <p className="mt-3 text-base leading-[var(--leading-relaxed)] text-ink-soft">{point.body}</p>
              </AnimatedContent>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-[64ch] border-l-2 border-terracotta pl-4 text-sm leading-relaxed text-ink-soft">{fertilityPreparing.note}</p>
      </div>
    </section>
  );
}
