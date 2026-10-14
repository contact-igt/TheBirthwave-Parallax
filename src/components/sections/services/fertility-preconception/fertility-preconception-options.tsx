import { fertilityOptions } from "@/content/fertility-preconception-landing-content";
import { AnimatedContent } from "@/components/ui/animations/animated-content";
import { Button } from "@/components/ui/button";
import { cx } from "@/lib/cx";
import styles from "./fertility-preconception.module.css";

/**
 * Section 5 — Basic & Advanced Fertility Care.
 * Explains ovulation tracking, follicular monitoring, ovulation induction,
 * IUI, IVF, and egg freezing/fertility preservation options clearly without guarantees.
 */
export function FertilityOptions() {
  return (
    <section
      id="fertility-options"
      aria-labelledby="fertility-options-heading"
      className="relative isolate scroll-mt-[var(--header-height)] bg-paper section-pad"
    >
      <div className="container-birthwave">
        <div className="max-w-3xl">
          <p className="eyebrow">{fertilityOptions.eyebrow}</p>
          <h2 id="fertility-options-heading" className={cx(styles.display, styles.h2, "mt-4")}>
            {fertilityOptions.heading}
          </h2>
          <div className="mt-5 space-y-3 text-lg leading-[var(--leading-relaxed)] text-ink-soft">
            {fertilityOptions.intro.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>

        {/* Categories: Basic vs Advanced */}
        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Basic Fertility Care */}
          <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--fertility-tint)] p-7 sm:p-9">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-terracotta-deep" aria-hidden="true" />
              <h3 className="font-body text-xs font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
                {fertilityOptions.basicCare.title}
              </h3>
            </div>

            <div className="mt-6 flex flex-col divide-y divide-[var(--color-border)]">
              {fertilityOptions.basicCare.items.map((item) => (
                <div key={item.title} className="py-6 first:pt-2 last:pb-2">
                  <h4 className={cx(styles.display, styles.h3, "text-ink")}>{item.title}</h4>
                  <div className="mt-3 space-y-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">
                    {item.paragraphs.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Advanced Fertility Care */}
          <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-paper-warm/50 p-7 sm:p-9">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-ink" aria-hidden="true" />
              <h3 className="font-body text-xs font-semibold tracking-[var(--tracking-wider)] text-ink uppercase">
                {fertilityOptions.advancedCare.title}
              </h3>
            </div>

            <div className="mt-6 flex flex-col divide-y divide-[var(--color-border)]">
              {fertilityOptions.advancedCare.items.map((item) => (
                <div key={item.title} className="py-6 first:pt-2 last:pb-2">
                  <h4 className={cx(styles.display, styles.h3, "text-ink")}>{item.title}</h4>
                  <div className="mt-3 space-y-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">
                    {item.paragraphs.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Note & CTA */}
        <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--fertility-tint)] p-8 sm:flex-row sm:items-center">
          <p className="max-w-2xl text-sm leading-[var(--leading-relaxed)] text-ink-soft">
            {fertilityOptions.note}
          </p>
          <Button href={fertilityOptions.cta.href} variant="primary" className="shrink-0">
            {fertilityOptions.cta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
