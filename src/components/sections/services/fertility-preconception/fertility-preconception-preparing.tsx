import { fertilityPreparing } from "@/content/pages/fertility-preconception";
import { AnimatedContent } from "@/components/ui/animations/animated-content";
import { cx } from "@/lib/cx";
import styles from "./fertility-preconception.module.css";

/**
 * Section 4 — Before Pregnancy.
 * Explains preparation BEFORE pregnancy: reviewing health, physical conditioning,
 * conscious fertility, and Garbh Sanskar practices.
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
          <div className="mt-5 space-y-3 max-w-[58ch] text-lg leading-[var(--leading-relaxed)] text-ink-soft">
            {fertilityPreparing.intro.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>

        <ul className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-3">
          {fertilityPreparing.points.map((point) => (
            <li key={point.title}>
              <AnimatedContent distance={16} duration={0.5} ease="power2.out" threshold={0.08} rowStagger={0.08} className="h-full border-t-2 border-terracotta pt-5">
                <h3 className={cx(styles.display, styles.h3)}>{point.title}</h3>
                <div className="mt-4 space-y-3 text-base leading-[var(--leading-relaxed)] text-ink-soft">
                  {point.paragraphs.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>
              </AnimatedContent>
            </li>
          ))}
        </ul>

        <p className="mt-12 max-w-[64ch] border-l-2 border-terracotta pl-4 text-sm leading-relaxed text-ink-soft">
          {fertilityPreparing.note}
        </p>
      </div>
    </section>
  );
}
