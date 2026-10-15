import { fertilityWho } from "@/content/pages/fertility-preconception";
import { AnimatedContent } from "@/components/ui/animations/animated-content";
import { cx } from "@/lib/cx";
import styles from "./fertility-preconception.module.css";
import { Activity, CalendarDays, CircleHelp, FileText, Flower2, Heart, Snowflake, Syringe, Users } from "lucide-react";
import layout from "./fertility-who.module.css";

const pointIcons = [CalendarDays, CircleHelp, Heart, Activity, FileText, Syringe, Snowflake, Flower2];

/**
 * Section 2 — Is This the Right Place to Start?
 * Who this consultation helps — orientation list of 8 relatable indicators.
 */
export function FertilityWho() {
  return (
    <section id="fertility-who" aria-labelledby="fertility-who-heading" className={cx(layout.section, "relative isolate scroll-mt-[var(--header-height)] section-pad")}>
      <div className={cx(layout.grid, "container-birthwave")}>
        <div className="max-w-md">
          <p className="eyebrow">{fertilityWho.eyebrow}</p>
          <h2 id="fertility-who-heading" className={cx(styles.display, styles.h2, "mt-4")}>
            {fertilityWho.heading}
          </h2>
          <p className="mt-5 font-medium text-base text-ink">{fertilityWho.intro}</p>
        </div>

        <div className={layout.panel}>
          <ul>
            {fertilityWho.points.map((point, index) => {
              const Icon = pointIcons[index];
              return (
              <li key={point} className={layout.item}>
                <AnimatedContent distance={14} duration={0.5} ease="power2.out" threshold={0.08} className={layout.row}>
                  <span aria-hidden="true" className={layout.icon}><Icon size={25} strokeWidth={1.6} /></span>
                  <span className="text-base leading-[var(--leading-relaxed)] text-ink">{point}</span>
                </AnimatedContent>
              </li>
              );
            })}
          </ul>
          <div className={layout.note}>
            <Users size={27} strokeWidth={1.6} aria-hidden="true" />
            <p className="text-base leading-[var(--leading-relaxed)] text-ink-soft">{fertilityWho.reassurance}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
