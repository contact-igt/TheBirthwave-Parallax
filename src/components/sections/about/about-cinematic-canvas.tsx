"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  aboutHero,
  aboutProblem,
  aboutBelief,
  aboutFounderIntro,
} from "@/content/about-content";
import { useReducedMotion } from "@/motion/reduced-motion";
import {
  ensureScrollTriggerRegistered,
  ScrollTrigger,
} from "@/motion/gsap-scroll";
import { ScrollSequence } from "@/components/ui/scroll-sequence";
import styles from "./about-approach-sequence.module.css";

// ---------------------------------------------------------------------------
// Beat metadata
// ---------------------------------------------------------------------------

const BEATS = [
  { key: "hero",          cinematicId: "about-hero"          },
  { key: "problem",       cinematicId: "about-problem"       },
  { key: "belief",        cinematicId: "about-belief"        },
  { key: "founder-intro", cinematicId: "about-founder-intro" },
] as const;

// ---------------------------------------------------------------------------
// Public shell — active frame animation across all devices; static for reduced motion
// ---------------------------------------------------------------------------

export function AboutCinematicCanvas() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-label="About The Birthwave — origin story"
      data-about-scene="cinematic"
      className="relative isolate bg-paper"
    >
      {reducedMotion ? <AboutCinematicStatic /> : <AboutCinematicFlow />}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Master Flow — Sections 1+2 (Exterior), Section 3 (Interior), Section 4 (Founder)
// ---------------------------------------------------------------------------

function AboutCinematicFlow() {
  return (
    <div className="relative">
      {/* ── Scene 1 & 2: Continuous Exterior Clinic Frame Sequence (82 frames, ~200svh mobile / ~220svh desktop) ── */}
      <ExteriorScrollScene />

      {/* ── Scene 3: Clinic Interior Frame Sequence (42 frames, ~130svh mobile / ~140svh desktop) ── */}
      <InteriorScrollScene />

      {/* ── Section 4: Founder Visual Scene (Begins after Section 3 has fully settled) ── */}
      <FounderVisualScene />
    </div>
  );
}

// ---------------------------------------------------------------------------
// 1. Exterior Scroll Scene (Sections 1 + 2) — ScrollSequence (400vh desktop / 300vh mobile)
// ---------------------------------------------------------------------------

function ExteriorScrollScene() {
  const heroBeatRef = useRef<HTMLDivElement>(null);
  const problemBeatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ensureScrollTriggerRegistered();
    // Refresh downstream GSAP ScrollTriggers (Section 3) after layout settles
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);
    return () => clearTimeout(timer);
  }, []);

  // Section 1 is visible over first ~0–45% of scroll, then fades out smoothly.
  // Section 2 fades in for ~50–100%.
  // On mobile: "Video first" — first ~20% of each section shows only video, then text panel fades and slides up.
  // Section 1 fades out completely before Section 2 appears, ensuring zero overlap.
  const handleProgress = useCallback((progress: number) => {
    const hero = heroBeatRef.current;
    const problem = problemBeatRef.current;
    if (!hero || !problem) return;

    const isMobile = window.innerWidth <= 767;

    if (isMobile) {
      // ── Mobile Timeline ────────────────────────────────────────────────
      // Section 1 (0 to ~0.44):
      // 0.00 to 0.08: Video first (hero opacity = 0)
      // 0.08 to 0.18: Fade and slide up (hero opacity 0 -> 1)
      // 0.18 to 0.36: Fully visible
      // 0.36 to 0.44: Fade out before Section 2 (hero opacity 1 -> 0)
      // 0.44 to 0.56: Inter-section gap (both sections at 0 opacity, only video plays)
      //
      // Section 2 (~0.56 to 1.00):
      // 0.56 to 0.66: Fade and slide up (problem opacity 0 -> 1)
      // 0.66 to 1.00: Fully visible

      if (progress < 0.08) {
        hero.style.opacity = "0";
        hero.style.transform = "translate3d(0, 24px, 0)";
        hero.style.pointerEvents = "none";
      } else if (progress < 0.18) {
        const t = (progress - 0.08) / 0.10;
        hero.style.opacity = String(t);
        hero.style.transform = `translate3d(0, ${24 * (1 - t)}px, 0)`;
        hero.style.pointerEvents = t > 0.5 ? "auto" : "none";
      } else if (progress <= 0.36) {
        hero.style.opacity = "1";
        hero.style.transform = "translate3d(0, 0px, 0)";
        hero.style.pointerEvents = "auto";
      } else if (progress < 0.44) {
        const t = (progress - 0.36) / 0.08;
        hero.style.opacity = String(Math.max(0, 1 - t));
        hero.style.transform = `translate3d(0, ${-20 * t}px, 0)`;
        hero.style.pointerEvents = t > 0.5 ? "none" : "auto";
      } else {
        hero.style.opacity = "0";
        hero.style.transform = "translate3d(0, -20px, 0)";
        hero.style.pointerEvents = "none";
      }

      if (progress < 0.56) {
        problem.style.opacity = "0";
        problem.style.transform = "translate3d(0, 24px, 0)";
        problem.style.pointerEvents = "none";
      } else if (progress < 0.66) {
        const t = (progress - 0.56) / 0.10;
        problem.style.opacity = String(Math.min(1, t));
        problem.style.transform = `translate3d(0, ${24 * (1 - t)}px, 0)`;
        problem.style.pointerEvents = t > 0.5 ? "auto" : "none";
      } else {
        problem.style.opacity = "1";
        problem.style.transform = "translate3d(0, 0px, 0)";
        problem.style.pointerEvents = "auto";
      }
    } else {
      // ── Desktop Timeline (Unchanged) ───────────────────────────────────
      // Section 1 (Hero): visible over ~0–45%
      if (progress <= 0.35) {
        hero.style.opacity = "1";
        hero.style.transform = "translate3d(0, 0px, 0)";
        hero.style.pointerEvents = "auto";
      } else if (progress < 0.45) {
        const t = (progress - 0.35) / 0.10; // 0 -> 1
        hero.style.opacity = String(Math.max(0, 1 - t));
        hero.style.transform = `translate3d(0, ${-24 * t}px, 0)`;
        hero.style.pointerEvents = t > 0.5 ? "none" : "auto";
      } else {
        hero.style.opacity = "0";
        hero.style.transform = "translate3d(0, -24px, 0)";
        hero.style.pointerEvents = "none";
      }

      // Section 2 (Why The Birthwave): fades in for ~50–100%
      if (progress < 0.48) {
        problem.style.opacity = "0";
        problem.style.transform = "translate3d(0, 24px, 0)";
        problem.style.pointerEvents = "none";
      } else if (progress < 0.58) {
        const t = (progress - 0.48) / 0.10; // 0 -> 1
        problem.style.opacity = String(Math.min(1, t));
        problem.style.transform = `translate3d(0, ${24 * (1 - t)}px, 0)`;
        problem.style.pointerEvents = t > 0.5 ? "auto" : "none";
      } else {
        problem.style.opacity = "1";
        problem.style.transform = "translate3d(0, 0px, 0)";
        problem.style.pointerEvents = "auto";
      }
    }
  }, []);

  return (
    <ScrollSequence
      frameCount={{ desktop: 158, mobile: 79 }}
      folder={{ desktop: "/frames/desktop", mobile: "/frames/mobile" }}
      ease={0.2}
      crossfade
      height="h-[300vh] md:h-[400vh]"
      onProgress={handleProgress}
      ariaLabel="The Birthwave clinic walk-up exterior sequence"
    >
      {/* ── Section 1 (Hero) — Bottom panel on mobile, left-aligned on desktop ── */}
      <div
        ref={heroBeatRef}
        id={BEATS[0].cinematicId}
        data-cinematic-beat={BEATS[0].cinematicId}
        data-about-copy={BEATS[0].key}
        className="pointer-events-none absolute inset-0 z-10 flex items-end justify-start pb-[calc(6.5rem+env(safe-area-inset-bottom,0px))] md:pb-20 lg:pb-20 xl:pb-24 transition-none"
        style={{ opacity: 1, transform: "translate3d(0, 0px, 0)" }}
      >
        <EditorialDarkGradientWash alignment="left" />

        <div className="w-full px-5 sm:px-8 md:px-12 lg:pl-[8vw] xl:pl-[10vw]">
          <div className="pointer-events-auto relative max-w-[560px] xl:max-w-[600px]">
            <p
              className="eyebrow !text-coral tracking-[var(--tracking-wider)] font-body text-xs sm:text-sm font-semibold uppercase"
              style={{
                color: "var(--color-coral)",
                textShadow: "0 1px 8px rgba(0, 0, 0, 0.6)",
              }}
            >
              {aboutHero.eyebrow}
            </p>
            <h1
              className="mt-3 sm:mt-5 text-[clamp(1.65rem,1.25rem+1.6vw,2.85rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] !text-[#FBF5F0]"
              style={{
                color: "#FBF5F0",
                textShadow: "0 2px 24px rgba(0,0,0,.45)",
              }}
            >
              {aboutHero.headlineLines.map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </h1>
            <p
              className="mt-3.5 sm:mt-6 max-w-[520px] text-sm sm:text-base xl:text-[1.0625rem] leading-[1.65] sm:leading-[1.7]"
              style={{
                color: "rgba(251, 245, 240, 0.92)",
                textShadow: "0 1px 8px rgba(0, 0, 0, 0.5)",
              }}
            >
              <span>
                Fertility. Pregnancy. Birth. Recovery.{" "}
                <span className="whitespace-nowrap" style={{ whiteSpace: "nowrap" }}>
                  Newborn care.
                </span>
              </span>
              <span className="block mt-2 sm:mt-3">
                At The Birthwave, we believe women&apos;s healthcare should go beyond individual appointments. Our approach brings medical care, guidance and supportive services together, with attention to your changing needs at every stage.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* ── Section 2 (Why The Birthwave) — Bottom panel on mobile, right-aligned on desktop ── */}
      <div
        ref={problemBeatRef}
        id={BEATS[1].cinematicId}
        data-cinematic-beat={BEATS[1].cinematicId}
        data-about-copy={BEATS[1].key}
        className="pointer-events-none absolute inset-0 z-10 flex items-end justify-start pb-[calc(6.5rem+env(safe-area-inset-bottom,0px))] md:items-center md:justify-end md:pb-0 transition-none"
        style={{ opacity: 0, transform: "translate3d(0, 24px, 0)", pointerEvents: "none" }}
      >
        <EditorialDarkGradientWash alignment="right" />

        <div className="w-full px-5 sm:px-8 md:px-12 lg:pr-[8vw] xl:pr-[10vw]">
          <div className="pointer-events-auto relative max-w-[560px] md:max-w-[540px] xl:max-w-[580px] md:ml-auto text-left md:text-right">
            <p
              className="eyebrow !text-coral tracking-[var(--tracking-wider)] font-body text-xs sm:text-sm font-semibold uppercase"
              style={{
                color: "var(--color-coral)",
                textShadow: "0 1px 8px rgba(0, 0, 0, 0.6)",
              }}
            >
              {aboutProblem.eyebrow}
            </p>
            <h2
              className="mt-3 sm:mt-5 text-[clamp(1.5rem,1.2rem+1.4vw,2.65rem)] md:text-[clamp(1.75rem,1.25rem+1.6vw,2.65rem)] leading-[1.15] md:leading-[1.14] font-semibold tracking-[var(--tracking-tight)] !text-[#FBF5F0]"
              style={{
                color: "#FBF5F0",
                textShadow: "0 2px 24px rgba(0,0,0,.45)",
              }}
            >
              {aboutProblem.heading}
            </h2>
            <div
              className="mt-3.5 sm:mt-6 space-y-3.5 text-sm sm:text-base xl:text-[1.0625rem] leading-[1.65] sm:leading-[1.7]"
              style={{
                color: "rgba(251, 245, 240, 0.92)",
                textShadow: "0 1px 8px rgba(0, 0, 0, 0.5)",
              }}
            >
              {aboutProblem.paragraphs.map((paragraph, index) => (
                <p key={index} className={index > 0 ? "hidden md:block" : undefined}>
                  {paragraph}
                </p>
              ))}
            </div>
            <ul className="mt-4 sm:mt-7 flex flex-wrap items-center justify-start md:justify-end gap-x-2.5 sm:gap-x-3 gap-y-1.5 sm:gap-y-2">
              {aboutProblem.stages.map((stage, index) => (
                <li key={stage} className="flex items-center gap-2 sm:gap-3">
                  {index > 0 ? (
                    <span
                      aria-hidden="true"
                      className="text-white/40"
                      style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
                    >
                      /
                    </span>
                  ) : null}
                  <span
                    className="font-body text-xs sm:text-sm font-semibold tracking-[var(--tracking-wider)] uppercase"
                    style={{
                      color: "var(--color-coral)",
                      textShadow: "0 1px 8px rgba(0, 0, 0, 0.6)",
                    }}
                  >
                    {stage}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </ScrollSequence>
  );
}

// ---------------------------------------------------------------------------
// 2. Interior Scroll Scene (Section 3 — Our Approach)
// ---------------------------------------------------------------------------

function InteriorScrollScene() {
  return (
    <ScrollSequence
      id={BEATS[2].cinematicId}
      frameCount={{ desktop: 233, mobile: 118 }}
      folder={{ desktop: "/frames/approach/desktop", mobile: "/frames/approach/mobile" }}
      height="h-[450vh] md:h-[600vh]"
      ease={0.08}
      crossfade={true}
      reducedMotionFrame="last"
      ariaLabel="Our Approach — inside The Birthwave slow-motion scroll video"
      className={styles.wrap}
      canvasClassName={styles.canvas}
    >
      <div
        data-cinematic-beat={BEATS[2].cinematicId}
        data-about-copy={BEATS[2].key}
        className={styles.scene}
      >
        {/* Soft dark gradient behind text */}
        <div aria-hidden="true" className={styles.shade} />

        {/* Content container */}
        <div className="w-full px-5 sm:px-8 md:px-12 lg:pl-[8vw] xl:pl-[10vw]">
          <div className={styles.content}>
            <p className={styles.eyebrow}>
              {aboutBelief.eyebrow}
            </p>
            <h2 className={styles.title}>
              {aboutBelief.heading}
            </h2>
            <ul className={styles.points} aria-label="Our Approach principles">
              {aboutBelief.paragraphs.map((paragraph, index) => (
                <li
                  key={index}
                  style={{ "--i": index } as React.CSSProperties}
                  className={styles.pointItem}
                >
                  {paragraph}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </ScrollSequence>
  );
}

// ---------------------------------------------------------------------------
// 3. Founder Visual Scene (Section 4 — Editorial Split Layout)
// ---------------------------------------------------------------------------

function FounderVisualScene() {
  const storyParagraphs = aboutFounderIntro.story.split("\n\n");

  return (
    <section
      id={BEATS[3].cinematicId}
      data-cinematic-beat={BEATS[3].cinematicId}
      data-about-copy={BEATS[3].key}
      aria-labelledby="about-founder-heading"
      className="relative isolate overflow-hidden bg-paper py-16 sm:py-20 lg:py-24 xl:py-28"
      style={{
        background:
          "linear-gradient(135deg, var(--color-paper) 0%, rgba(252, 246, 243, 0.96) 50%, var(--color-paper) 100%)",
      }}
    >
      {/* Subtle top edge transition line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[var(--color-border)]"
      />

      {/* Very subtle corner blush ambient aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-paper-dim/40 blur-3xl -z-10"
      />

      {/* Subtle low-contrast organic background contour between image and content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-20 h-[32rem] w-[32rem] rounded-full bg-paper-dim/30 blur-3xl -z-10"
      />

      <div className="container-birthwave relative z-10">
        {/* Mobile-only header stack (eyebrow, heading, name/designation) */}
        <div className="lg:hidden mb-6 sm:mb-8">
          <p className="eyebrow text-ink tracking-[var(--tracking-wider)]">
            {aboutFounderIntro.eyebrow}
          </p>
          <h2
            id="about-founder-heading-mobile"
            className="mt-3 text-[clamp(2rem,1.5rem+2.2vw,2.75rem)] leading-[1.12] font-semibold tracking-[var(--tracking-tight)] text-ink"
          >
            {aboutFounderIntro.introLabel}
          </h2>
          <p className="mt-2 text-sm sm:text-base font-medium text-terracotta-deep">
            {aboutFounderIntro.founderName} &mdash;{" "}
            <span className="text-ink-soft font-normal">
              {aboutFounderIntro.founderCredentials}
            </span>
          </p>
        </div>

        {/* Editorial Split Layout (48-52% Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12 xl:gap-16 lg:items-center">
          {/* ── LEFT SIDE (approx 48–50%): Founder Image with soft organic curved edge on the right ── */}
          <div className="lg:col-span-5 xl:col-span-6">
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              {/* Soft organic curved backdrop shape behind the image */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-2.5 sm:-inset-3.5 lg:-inset-4.5 rounded-2xl sm:rounded-3xl lg:rounded-tl-[2rem] lg:rounded-bl-[2.5rem] lg:rounded-tr-[4.5rem] lg:rounded-br-[7rem] bg-paper-dim/60 -z-10"
              />

              {/* Main founder image with organic curved silhouette on the right side */}
              <div
                data-about-visual="founder-portrait"
                className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] xl:aspect-[4/5] w-full overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-tl-[1.75rem] lg:rounded-bl-[2rem] lg:rounded-tr-[4rem] lg:rounded-br-[6.5rem] bg-paper-dim shadow-xs"
              >
                <Image
                  src="/images/web-ready/founder.jpg"
                  alt={aboutFounderIntro.media.alt}
                  fill
                  sizes="(min-width: 1280px) 560px, (min-width: 1024px) 46vw, (min-width: 640px) 440px, 100vw"
                  className="object-cover object-[50%_18%]"
                  priority
                />
              </div>
            </div>
          </div>

          {/* ── RIGHT SIDE (approx 50–52%): Left-aligned Editorial Content ── */}
          <div className="lg:col-span-7 xl:col-span-6 mt-8 sm:mt-10 lg:mt-0 text-left">
            {/* Desktop-only header */}
            <div className="hidden lg:block">
              <p className="eyebrow text-ink tracking-[var(--tracking-wider)]">
                {aboutFounderIntro.eyebrow}
              </p>
              <h2
                id="about-founder-heading"
                className="mt-3.5 text-[clamp(2.1rem,1.6rem+1.8vw,3.25rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink"
              >
                {aboutFounderIntro.introLabel}
              </h2>
              <p className="mt-2 text-base sm:text-lg font-medium text-terracotta-deep">
                {aboutFounderIntro.founderName} &mdash;{" "}
                <span className="text-ink-soft font-normal">
                  {aboutFounderIntro.founderCredentials}
                </span>
              </p>
            </div>

            {/* Founder Story Paragraphs */}
            <div className="space-y-4 lg:mt-6 text-base sm:text-[1.0625rem] leading-[1.7] text-ink-soft max-w-[540px]">
              {storyParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Quote Block — emotional focal point of the section */}
            <div className="relative mt-8 sm:mt-10 rounded-2xl bg-paper-dim/60 p-6 sm:p-8 border-l-4 border-terracotta max-w-[560px]">
              {/* Oversized decorative quotation mark */}
              <span
                aria-hidden="true"
                className="font-serif text-5xl sm:text-6xl text-terracotta/35 leading-none select-none block -mb-4 sm:-mb-5"
              >
                &ldquo;
              </span>
              <blockquote className="relative z-10 text-base sm:text-lg xl:text-[1.125rem] leading-[1.65] font-medium text-ink italic">
                &ldquo;{aboutFounderIntro.quote}&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// ---------------------------------------------------------------------------
// Editorial Dark Gradient Wash — subtle dark gradient for readability on bright footage
// ---------------------------------------------------------------------------

function EditorialDarkGradientWash({
  alignment = "left",
}: {
  alignment?: "left" | "right";
}) {
  const isLeft = alignment === "left";
  return (
    <>
      {/* Desktop & tablet directional gradient: Section 1 from left, Section 2 mirrored from right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden md:block -z-10"
        style={{
          background: isLeft
            ? "linear-gradient(90deg, rgba(20,12,10,.75) 0%, rgba(20,12,10,.45) 45%, transparent 70%)"
            : "linear-gradient(270deg, rgba(20,12,10,.75) 0%, rgba(20,12,10,.45) 45%, transparent 70%)",
        }}
      />
      {/* Mobile viewport: one smooth bottom-up gradient so the top ~40% shows the clinic sign/door with no hard line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 md:hidden -z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(20,12,10,.92) 0%, rgba(20,12,10,.75) 45%, rgba(20,12,10,0) 75%)",
        }}
      />
    </>
  );
}

// ---------------------------------------------------------------------------
// Static Fallback — prefers-reduced-motion only
// ---------------------------------------------------------------------------

function AboutCinematicStatic() {
  return (
    <div className="flex flex-col bg-paper">
      {/* ── Beat 01: Exterior Hero ── */}
      <StaticBeat
        posterSrc="/frames/desktop/f_0001.webp"
        alt="The Birthwave clinic exterior — entrance and warm greeting"
      >
        <div
          id={`${BEATS[0].cinematicId}-static`}
          data-cinematic-beat={BEATS[0].cinematicId}
          data-about-copy={BEATS[0].key}
          className="relative"
        >
          <p className="eyebrow">{aboutHero.eyebrow}</p>
          <h1 className="mt-4 text-[clamp(2.1rem,1.6rem+2.6vw,3.25rem)] leading-[1.05] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {aboutHero.headlineLines.map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </h1>
          <p className="mt-5 text-base sm:text-lg leading-[var(--leading-relaxed)] text-ink-soft whitespace-pre-line">
            {aboutHero.supporting}
          </p>
        </div>
      </StaticBeat>

      {/* ── Beat 02: Exterior Entrance / Why The Birthwave ── */}
      <StaticBeat
        posterSrc="/frames/desktop/f_0080.webp"
        alt="The Birthwave clinic exterior entrance walkway"
      >
        <div
          id={`${BEATS[1].cinematicId}-static`}
          data-cinematic-beat={BEATS[1].cinematicId}
          data-about-copy={BEATS[1].key}
          className="relative"
        >
          <p className="eyebrow">{aboutProblem.eyebrow}</p>
          <h2 className="mt-4 text-[clamp(1.85rem,1.4rem+2vw,2.5rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {aboutProblem.heading}
          </h2>
          <div className="mt-5 space-y-3 text-base sm:text-lg leading-[var(--leading-relaxed)] text-ink-soft">
            {aboutProblem.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <ul className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
            {aboutProblem.stages.map((stage, index) => (
              <li key={stage} className="flex items-center gap-3">
                {index > 0 ? (
                  <span aria-hidden="true" className="text-ink-soft/40">/</span>
                ) : null}
                <span className="font-body text-sm font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
                  {stage}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </StaticBeat>

      {/* ── Beat 03: Interior Clinic / Our Approach ── */}
      <StaticBeat
        posterSrc="/frames/approach/desktop/f_0233.webp"
        alt="The Birthwave clinic interior — Our Approach"
      >
        <div
          id={`${BEATS[2].cinematicId}-static`}
          data-cinematic-beat={BEATS[2].cinematicId}
          data-about-copy={BEATS[2].key}
          className="relative"
        >
          <p className="eyebrow">{aboutBelief.eyebrow}</p>
          <h2 className="mt-4 text-[clamp(2rem,1.5rem+2.4vw,2.75rem)] leading-[1.08] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {aboutBelief.heading}
          </h2>
          <div className="mt-5 space-y-3 text-base sm:text-lg leading-[var(--leading-relaxed)] text-ink-soft">
            {aboutBelief.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </StaticBeat>

      {/* ── Beat 04: Founder Intro ── */}
      <StaticBeat
        posterSrc="/images/web-ready/founder.jpg"
        alt={aboutFounderIntro.media.alt}
        last
      >
        <div
          id={`${BEATS[3].cinematicId}-static`}
          data-cinematic-beat={BEATS[3].cinematicId}
          data-about-copy={BEATS[3].key}
          className="relative"
        >
          <p className="eyebrow">{aboutFounderIntro.eyebrow}</p>
          <h2 className="mt-4 text-2xl font-semibold text-ink sm:text-3xl">
            {aboutFounderIntro.introLabel}
          </h2>
          <p className="mt-1 text-sm font-medium text-ink-soft">
            {aboutFounderIntro.founderName} &mdash; {aboutFounderIntro.founderCredentials}
          </p>
          <p className="mt-5 text-base sm:text-lg leading-[var(--leading-relaxed)] text-ink-soft whitespace-pre-line">
            {aboutFounderIntro.story}
          </p>
          <p className="mt-5 border-l-2 border-terracotta pl-5 text-lg sm:text-xl leading-[1.4] font-medium text-ink italic">
            &ldquo;{aboutFounderIntro.quote}&rdquo;
          </p>
        </div>
      </StaticBeat>
    </div>
  );
}

function StaticBeat({
  posterSrc,
  alt,
  children,
  last = false,
}: {
  posterSrc: string;
  alt: string;
  children: ReactNode;
  last?: boolean;
}) {
  return (
    <div className={last ? "" : "border-b border-[var(--color-border)]"}>
      <div
        aria-hidden="true"
        data-about-visual="poster"
        className="relative h-72 w-full overflow-hidden sm:h-96"
      >
        <Image
          src={posterSrc}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover object-[50%_40%]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-paper to-transparent"
        />
      </div>
      <div className="container-birthwave py-10 sm:py-12">{children}</div>
    </div>
  );
}
