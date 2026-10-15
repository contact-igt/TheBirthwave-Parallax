"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { fertilityCovers } from "@/content/pages/fertility-preconception";
import { fertilityImagery, fertilityImageDisclosure } from "@/content/pages/fertility-preconception";
import { AnimatedContent } from "@/components/ui/animations/animated-content";
import { ensureScrollTriggerRegistered, gsap } from "@/motion/gsap-scroll";
import { cx } from "@/lib/cx";
import styles from "./fertility-preconception.module.css";

/** Total image drift is 20px (±10) — inside the 12px-per-side overscan below. */
const DRIFT_PX = 10;
/** The photo only sticks when the card column is at least this much taller than it. */
const MIN_STICKY_TRAVEL_PX = 120;

/**
 * Section 3 — What We Talk Through.
 * Topics explored in a consultation: reproductive history, pregnancy plans,
 * fertility concerns, and available options.
 */
export function FertilityCovers() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const driftRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const image = fertilityImagery.covers;

  useEffect(() => {
    const section = sectionRef.current;
    const media = mediaRef.current;
    const frame = frameRef.current;
    const drift = driftRef.current;
    const list = listRef.current;
    if (!section || !media || !frame || !drift || !list) return;

    ensureScrollTriggerRegistered();
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        drift,
        { y: -DRIFT_PX },
        {
          y: DRIFT_PX,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });

    const syncSticky = () => {
      const travel = list.offsetHeight - frame.offsetHeight;
      media.dataset.sticky = travel > MIN_STICKY_TRAVEL_PX ? "on" : "off";
    };
    syncSticky();
    const resizeObserver = new ResizeObserver(syncSticky);
    resizeObserver.observe(list);
    resizeObserver.observe(frame);

    return () => {
      resizeObserver.disconnect();
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="fertility-covers"
      aria-labelledby="fertility-covers-heading"
      className="relative isolate scroll-mt-[var(--header-height)] bg-paper section-pad"
    >
      <div className="container-birthwave grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-x-16 lg:gap-y-10">
        <div className="max-w-xl lg:col-start-2 lg:row-start-1">
          <p className="eyebrow">{fertilityCovers.eyebrow}</p>
          <h2 id="fertility-covers-heading" className={cx(styles.display, styles.h2, "mt-4")}>
            {fertilityCovers.heading}
          </h2>
        </div>

        <div ref={mediaRef} className={cx(styles.stickyMedia, "lg:col-start-1 lg:row-span-2 lg:row-start-1")}>
          <figure>
            <div ref={frameRef} className={cx(styles.stickyFrame, "relative overflow-hidden rounded-[var(--radius-md)] bg-paper-dim")}>
              <div ref={driftRef} className="absolute inset-x-0 -inset-y-3 will-change-transform">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 1023px) 92vw, 480px"
                  className="object-cover"
                  style={{ objectPosition: image.objectPosition }}
                />
              </div>
            </div>
            <figcaption className="mt-2 font-body text-xs text-ink-soft">{fertilityImageDisclosure}</figcaption>
          </figure>
        </div>

        <div className="lg:col-start-2 lg:row-start-2">
          <ul ref={listRef} className="flex flex-col gap-4">
            {fertilityCovers.cards.map((card) => (
              <li key={card.title}>
                <AnimatedContent distance={16} duration={0.5} ease="power2.out" threshold={0.08}>
                  <article className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--fertility-tint)] p-6 sm:p-7">
                    <h3 className={cx(styles.display, styles.h3)}>{card.title}</h3>
                    <p className="mt-3 text-base leading-[var(--leading-relaxed)] text-ink-soft">{card.body}</p>
                  </article>
                </AnimatedContent>
              </li>
            ))}
          </ul>

          <p className="mt-8 border-l-2 border-terracotta pl-4 text-sm leading-relaxed text-ink-soft">
            {fertilityCovers.closing}
          </p>
        </div>
      </div>
    </section>
  );
}
