import { Plus } from "lucide-react";
import { fertilityFaq } from "@/content/fertility-preconception-landing-content";
import { cx } from "@/lib/cx";
import styles from "./fertility-preconception.module.css";

/** FAQ — text only, native `<details>/<summary>` (the accordion pattern used
 * across the site: keyboard and screen-reader support built in). */
export function FertilityFaq() {
  return (
    <section id="fertility-faq" aria-labelledby="fertility-faq-heading" className="relative isolate scroll-mt-[var(--header-height)] bg-[var(--fertility-tint)] section-pad">
      <div className="container-birthwave grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="max-w-md">
          <p className="eyebrow">{fertilityFaq.eyebrow}</p>
          <h2 id="fertility-faq-heading" className={cx(styles.display, styles.h2, "mt-4")}>
            {fertilityFaq.heading}
          </h2>
        </div>

        <div className="border-t border-[var(--color-border)]">
          {fertilityFaq.items.map((item) => (
            <details key={item.question} className="group border-b border-[var(--color-border)] py-5">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 rounded-xs font-body text-lg font-medium text-balance text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta-deep [&::-webkit-details-marker]:hidden">
                {item.question}
                <Plus
                  aria-hidden="true"
                  className="size-5 shrink-0 text-terracotta-deep transition-transform duration-[var(--duration-fast)] ease-[var(--ease-signature)] group-open:rotate-45"
                />
              </summary>
              <p className="mt-3 max-w-[62ch] text-base leading-[var(--leading-relaxed)] text-ink-soft">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
