import { birthPrepTopics } from "@/content/birth-preparation-landing-content";
import {
  Baby,
  Clipboard,
  ClipboardCheck,
  HandHeart,
  HeartHandshake,
  MessageCircleQuestionMark,
  PersonStanding,
  RefreshCw,
  Stethoscope,
  Syringe,
  Timer,
  Wind,
} from "lucide-react";
import { BirthPrepImage } from "./birth-preparation-image";
import { BirthPrepReveal } from "./birth-preparation-reveal";
import { cx } from "@/lib/cx";

const TOPIC_ICONS = [Timer, Wind, ClipboardCheck, HeartHandshake, PersonStanding, MessageCircleQuestionMark, Baby, RefreshCw] as const;
const TOPIC_IMAGE_KEYS = [
  "birth-prep-landing-learning-labour",
  "birth-prep-landing-learning-movement",
  "birth-prep-landing-learning-support",
  "birth-prep-landing-preferences",
] as const;

const topicGroups = birthPrepTopics.modules.map((module, index) => ({
  title: String(index + 1).padStart(2, "0"),
  imageKey: TOPIC_IMAGE_KEYS[index % TOPIC_IMAGE_KEYS.length],
  items: [{ title: module.title, body: [module.subhead, ...module.paragraphs].join(" ") }],
}));

/**
 * Section 3 — What You'll Learn. Four groups covering understanding labour,
 * comfort/pain-relief, birth preferences, and preparing together.
 */
export function BirthPrepTopics() {
  return (
    <section id="birth-prep-topics" aria-labelledby="birth-prep-topics-heading" className="relative isolate overflow-hidden scroll-mt-[var(--header-height)] bg-paper section-pad">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_8%_12%,#f9eee9_0%,transparent_34%),radial-gradient(circle_at_92%_82%,#edf1ef_0%,transparent_32%)]" />

      <BirthPrepReveal className="relative container-birthwave">
        <p className="eyebrow">{birthPrepTopics.eyebrow}</p>
        <h2 id="birth-prep-topics-heading" className="mt-4 max-w-2xl text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {birthPrepTopics.heading}
        </h2>
        <p className="mt-4 max-w-[62ch] text-base leading-[var(--leading-relaxed)] text-ink-soft">{birthPrepTopics.intro}</p>

        <div className="mt-12 flex flex-col gap-8 lg:gap-10">
          {topicGroups.map((group, index) => {
            const imageOnRight = index % 2 === 1;
            return (
              <div
                key={group.title}
                className={cx(
                  "grid overflow-hidden rounded-xs shadow-[0_18px_45px_-38px_rgba(53,43,41,0.3)] lg:grid-cols-2 lg:items-stretch",
                  index % 2 === 0 ? "bg-[var(--color-paper-dim)]" : "bg-[var(--birth-prep-sky-wash)]",
                )}
              >
                <div className={cx("relative", imageOnRight && "lg:order-2")}>
                  <BirthPrepImage
                    imageKey={group.imageKey}
                    aspect="aspect-[4/3] lg:aspect-auto lg:h-full"
                    corner={index % 2 === 0 ? "tl" : "tr"}
                    className="h-full min-h-[300px] !rounded-xs"
                  />
                </div>

                <div className={cx("flex flex-col justify-center p-8 sm:p-10 lg:p-12", imageOnRight && "lg:order-1")}>
                  <p className="font-body text-[0.6875rem] font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">{group.title}</p>

                  <div className="mt-5 flex flex-col">
                    {group.items.map((item) => {
                      const ItemIcon = TOPIC_ICONS[index % TOPIC_ICONS.length];
                      return (
                      <div key={item.title} className="border-t border-[color-mix(in_srgb,var(--color-terracotta)_18%,transparent)] py-5 first:border-t-0 first:pt-1">
                        <div className="flex items-center gap-3">
                          <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--color-terracotta)_10%,var(--color-paper))] text-terracotta-deep">
                            <ItemIcon className="size-5" strokeWidth={1.7} />
                          </span>
                          <h3 className="text-xl font-semibold tracking-[var(--tracking-tight)] text-ink">{item.title}</h3>
                        </div>
                        <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft sm:text-base">{item.body}</p>
                      </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </BirthPrepReveal>
    </section>
  );
}
