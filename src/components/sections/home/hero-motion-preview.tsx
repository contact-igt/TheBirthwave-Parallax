"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { hero, philosophy } from "@/content/site-content";
import { ensureScrollTriggerRegistered, gsap } from "@/motion/gsap-scroll";
import styles from "./hero-motion-preview.module.css";

/** An isolated visual study. The production homepage keeps its existing scene. */
export function HeroMotionPreview() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const scene = root.current;
    if (!scene || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    ensureScrollTriggerRegistered();
    const context = gsap.context(() => {
      const opening = scene.querySelector<HTMLElement>("[data-opening]");
      const openingArt = scene.querySelector<HTMLElement>("[data-opening-art]");
      const ending = scene.querySelector<HTMLElement>("[data-ending]");
      const endingArt = scene.querySelector<HTMLElement>("[data-ending-art]");
      const mist = scene.querySelector<HTMLElement>("[data-mist]");
      const veil = scene.querySelector<HTMLElement>("[data-veil]");
      const cue = scene.querySelector<HTMLElement>("[data-cue]");
      if (!opening || !openingArt || !ending || !endingArt || !mist || !veil || !cue) return;

      gsap.set(ending, { autoAlpha: 0, y: 28 });
      gsap.set(endingArt, { autoAlpha: 0, xPercent: -7, scale: 0.96 });
      gsap.set(veil, { autoAlpha: 0, xPercent: -34 });

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: scene,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.55,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(cue, { autoAlpha: 0, duration: 0.08 }, 0.02)
        .to(openingArt, { scale: 1.035, xPercent: -2, duration: 0.34 }, 0.02)
        .to(mist, { xPercent: 14, yPercent: -8, duration: 0.72 }, 0.06)
        .to(opening, { autoAlpha: 0, y: -24, duration: 0.16 }, 0.27)
        .to(veil, { autoAlpha: 0.88, xPercent: 20, duration: 0.28 }, 0.32)
        .to(openingArt, { autoAlpha: 0, xPercent: -10, duration: 0.19 }, 0.42)
        .to(endingArt, { autoAlpha: 1, xPercent: 0, scale: 1, duration: 0.24 }, 0.52)
        .to(veil, { autoAlpha: 0, xPercent: 42, duration: 0.27 }, 0.58)
        .to(ending, { autoAlpha: 1, y: 0, duration: 0.22 }, 0.67);
    }, scene);

    return () => context.revert();
  }, []);

  return (
    <main id="main-content" className={styles.preview}>
      <section ref={root} className={styles.track} aria-label="Homepage hero motion preview">
        <div className={styles.stage}>
          <div className={styles.atmosphere} aria-hidden="true" />
          <div data-mist className={styles.mist} aria-hidden="true" />
          <div data-veil className={styles.veil} aria-hidden="true" />

          <div className={styles.topbar}>
            <Link href="/" className={styles.brand}>The Birthwave</Link>
            <span className={styles.previewLabel}>Hero motion study</span>
          </div>

          <div data-opening-art className={`${styles.art} ${styles.openingArt}`} aria-hidden="true">
            <Image
              src="/images/hero-artwork/birthwave-mother-baby-line-art-v1.png"
              alt=""
              fill
              priority
              sizes="(max-width: 767px) 85vw, 43vw"
              className={styles.artImage}
            />
          </div>

          <div data-ending-art className={`${styles.art} ${styles.endingArt}`} aria-hidden="true">
            <Image
              src="/images/hero-artwork/birthwave-mother-cradling-baby-line-art-v1.png"
              alt=""
              sizes="(max-width: 767px) 85vw, 43vw"
              fill
              className={styles.artImage}
            />
          </div>

          <div data-opening className={`${styles.copy} ${styles.openingCopy}`}>
            <p className={styles.eyebrow}>{hero.eyebrow}</p>
            <h1 className={styles.heading}>
              <span>{hero.headlineLead}</span>
              <em>{hero.headlineEmphasis}</em>
            </h1>
            <p className={styles.body}>{hero.subhead}</p>
            <div className={styles.actions}>
              <Link href={hero.primaryCta.href} className={styles.button}>{hero.primaryCta.label} <ArrowUpRight size={16} /></Link>
              <Link href={hero.secondaryCta.href} className={styles.link}>{hero.secondaryCta.label}</Link>
            </div>
          </div>

          <div data-ending className={`${styles.copy} ${styles.endingCopy}`}>
            <p className={styles.eyebrow}>{philosophy.eyebrow}</p>
            <h2 className={styles.philosophyHeading}>
              Pregnancy is more than <em>a series of appointments.</em>
            </h2>
            <p className={styles.philosophyLine}>{philosophy.messages[1].text}</p>
            <p className={styles.philosophyLine}>{philosophy.messages[2].text}</p>
            <p className={styles.resolution}>{philosophy.resolution}</p>
          </div>

          <div data-cue className={styles.scrollCue}><ArrowDown size={15} /> Scroll to see the transition</div>
          <div className={styles.progress} aria-hidden="true"><span>01</span><span className={styles.progressLine} /><span>02</span></div>
        </div>
      </section>
      <div className={styles.after}><span>End of motion preview</span><Link href="/">Back to homepage <ArrowUpRight size={16} /></Link></div>
    </main>
  );
}
