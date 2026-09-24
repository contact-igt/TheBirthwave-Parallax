"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { journey } from "@/content/site-content";
import { useReducedMotion } from "@/motion/reduced-motion";
import { cx } from "@/lib/cx";
import { ensureScrollTriggerRegistered, gsap, ScrollTrigger, SIGNATURE_EASE } from "@/motion/gsap-scroll";

/**
 * The BirthWave Journey — six stages in normal document flow (no pin),
 * joined by ONE continuous SVG route.
 *
 * Desktop (≥1024px) is a three-column grid per stage:
 *
 *   LEFT CONTENT | PATH | RIGHT CONTENT
 *
 * Every stage is the same vertically-centred image/text pair, mirrored on
 * alternate stages. Both halves are pinned to the same grid row, so text
 * can never drop above/below an unrelated image. The route runs down the
 * centre column and bends gently toward each stage's text side.
 *
 * Below 1024px the stages collapse to one column (image, number, heading,
 * copy) and the route becomes a slim line on the left, with the content
 * inset past it.
 *
 * Motion: one scrubbed ScrollTrigger (top 70% → bottom 70%) draws the
 * progress stroke and moves the marker along the same path via
 * getPointAtLength. Stages get a simple one-time reveal.
 */

const STAGE_COUNT = journey.stages.length;

// Stage number colours — unchanged from the previous version: the warm
// default, a cooler sky lean, and coral for Birth.
const STAGE_HUES = [
  "--color-terracotta",
  "--color-sky",
  "--color-terracotta",
  "--color-coral",
  "--color-terracotta",
  "--color-sky",
] as const;

// Background atmosphere — one continuous gradient behind all six stages
// (unchanged).
const ATMOSPHERE_HUES = [
  "var(--color-paper)",
  "color-mix(in srgb, var(--color-sky) 6%, var(--color-paper))",
  "color-mix(in srgb, var(--color-terracotta) 9%, var(--color-paper-dim))",
  "color-mix(in srgb, var(--color-terracotta) 16%, var(--color-paper))",
  "var(--color-paper)",
  "color-mix(in srgb, var(--color-sky) 7%, var(--color-paper))",
] as const;
const ATMOSPHERE_GRADIENT = `linear-gradient(to bottom, ${ATMOSPHERE_HUES[0]} 0%, ${ATMOSPHERE_HUES.map(
  (hue, i) => `${hue} ${(((i + 0.5) / STAGE_COUNT) * 100).toFixed(1)}%`,
).join(", ")}, ${ATMOSPHERE_HUES[ATMOSPHERE_HUES.length - 1]} 100%)`;

const DESKTOP_QUERY = "(min-width: 1024px)";
/** Mobile route x (px from the wrapper's left edge) and its slight waver. */
const MOBILE_PATH_X = 24;
const MOBILE_WAVER = 3;
/** Desktop bend toward each stage's text side, capped to stay inside the path column. */
const DESKTOP_BEND_MAX = 44;
const DESKTOP_BEND_RATIO = 0.03;

const REVEAL_Y = 24;

type Point = { x: number; y: number };

/** Smooth S-curve through each point, with vertical tangents at every point. */
function buildRoute(points: Point[]): string {
  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const midY = (a.y + b.y) / 2;
    d += ` C ${a.x.toFixed(1)} ${midY.toFixed(1)}, ${b.x.toFixed(1)} ${midY.toFixed(1)}, ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
  }
  return d;
}

export function JourneySection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const basePathRef = useRef<SVGPathElement>(null);
  const progressPathRef = useRef<SVGPathElement>(null);
  const markerRef = useRef<SVGGElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const svg = svgRef.current;
    const base = basePathRef.current;
    const progressPath = progressPathRef.current;
    const marker = markerRef.current;
    if (!wrapper || !svg || !base || !progressPath) return;

    const steps = Array.from(wrapper.querySelectorAll<HTMLElement>("[data-journey-step]"));
    const labels = steps.map((step) => step.querySelector<HTMLElement>("[data-journey-label]"));
    const desktopMq = window.matchMedia(DESKTOP_QUERY);

    let pathLength = 0;
    let progress = 0;
    let activeIndex = -1;
    let lastSize = "";

    // ── Geometry: path d in real pixels, measured from the stages ────────
    function layout() {
      if (!wrapper || !svg || !base || !progressPath) return;
      const w = wrapper.clientWidth;
      const h = wrapper.clientHeight;
      const size = `${w}x${h}x${desktopMq.matches}`;
      if (size === lastSize) return;
      lastSize = size;

      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      const desktop = desktopMq.matches;
      const centerX = desktop ? w / 2 : MOBILE_PATH_X;
      const bend = desktop ? Math.min(DESKTOP_BEND_MAX, w * DESKTOP_BEND_RATIO) : MOBILE_WAVER;

      const anchors = steps.map((step, i) => ({
        // Even stages (01, 03, 05) have text on the left: bend toward it.
        x: centerX + (i % 2 === 0 ? -bend : bend),
        y: step.offsetTop + step.offsetHeight / 2,
      }));
      const d = buildRoute([{ x: centerX, y: 0 }, ...anchors, { x: centerX, y: h }]);
      base.setAttribute("d", d);
      progressPath.setAttribute("d", d);

      pathLength = base.getTotalLength();
      progressPath.style.strokeDasharray = `${pathLength}`;
      apply(reducedMotion ? 1 : progress);
    }

    // ── Progress: draw stroke + move marker along the same path ─────────
    function apply(p: number) {
      progress = p;
      if (!base || !progressPath || pathLength === 0) return;
      progressPath.style.strokeDashoffset = `${pathLength * (1 - p)}`;
      if (!marker) return;
      const point = base.getPointAtLength(p * pathLength);
      marker.setAttribute("transform", `translate(${point.x.toFixed(2)} ${point.y.toFixed(2)})`);

      // Active stage: the last stage whose top the marker has passed.
      let next = 0;
      for (let i = 0; i < steps.length; i++) {
        if (point.y >= steps[i].offsetTop) next = i;
      }
      if (next !== activeIndex) {
        activeIndex = next;
        labels.forEach((label, i) => label?.toggleAttribute("data-active", i === next));
      }
    }

    layout();

    let raf = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const before = lastSize;
        layout();
        if (!reducedMotion && lastSize !== before) ScrollTrigger.refresh();
      });
    });
    ro.observe(wrapper);
    const onMq = () => layout();
    desktopMq.addEventListener("change", onMq);

    const cleanupGeometry = () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      desktopMq.removeEventListener("change", onMq);
      labels.forEach((label) => label?.removeAttribute("data-active"));
    };

    if (reducedMotion) return cleanupGeometry;

    ensureScrollTriggerRegistered();
    const ctx = gsap.context(() => {
      // One ScrollTrigger for the whole route.
      const state = { p: 0 };
      gsap.to(state, {
        p: 1,
        ease: "none",
        onUpdate: () => apply(state.p),
        scrollTrigger: {
          trigger: wrapper,
          start: "top 70%",
          end: "bottom 70%",
          scrub: 0.6,
        },
      });

      // Subtle one-time reveal per stage.
      steps.forEach((step) => {
        const parts = step.querySelectorAll("[data-journey-reveal]");
        gsap.fromTo(
          parts,
          { autoAlpha: 0, y: REVEAL_Y },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: SIGNATURE_EASE,
            stagger: 0.12,
            scrollTrigger: { trigger: step, start: "top 80%", once: true },
          },
        );
      });
    }, wrapper);

    return () => {
      ctx.revert();
      cleanupGeometry();
    };
  }, [reducedMotion]);

  return (
    <section id="journey" aria-labelledby="journey-heading" className="relative isolate overflow-x-clip">
      <div aria-hidden="true" className="absolute inset-0 -z-10" style={{ backgroundImage: ATMOSPHERE_GRADIENT }} />

      {/* Intro — the eyebrow only; journey.heading stays the accessible
          name (Philosophy directly above already lands the same line). */}
      <div className="container-birthwave relative pt-(--space-section-sm) pb-6 sm:pb-8">
        <h2 id="journey-heading" className="sr-only">
          {journey.heading}
        </h2>
        <p className="eyebrow">{journey.eyebrow}</p>
      </div>

      <div ref={wrapperRef} className="container-birthwave relative pb-[clamp(4rem,3rem+5vw,7rem)]">
        {/* The journey route: base path, progress path, marker — one SVG,
            one `d`, drawn in real pixel units (viewBox = wrapper size). */}
        <svg
          ref={svgRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
        >
          <path
            ref={basePathRef}
            fill="none"
            stroke="color-mix(in srgb, var(--color-terracotta) 28%, transparent)"
            strokeWidth="2"
          />
          <path
            ref={progressPathRef}
            fill="none"
            stroke="var(--color-terracotta)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {!reducedMotion && (
            <g ref={markerRef}>
              <circle r="21" fill="none" stroke="var(--color-coral)" strokeOpacity="0.14" strokeWidth="1">
                <animate attributeName="r" values="17;22;17" dur="3.6s" repeatCount="indefinite" />
                <animate attributeName="stroke-opacity" values="0.2;0.06;0.2" dur="3.6s" repeatCount="indefinite" />
              </circle>
              <circle
                r="13"
                fill="var(--color-paper)"
                stroke="color-mix(in srgb, var(--color-coral) 35%, transparent)"
                strokeWidth="1.5"
              />
              <circle r="5.5" fill="var(--color-coral)" />
            </g>
          )}
        </svg>

        {journey.stages.map((stage, index) => (
          <JourneyStage key={stage.number} index={index} stage={stage} />
        ))}
      </div>
    </section>
  );
}

function JourneyStage({ index, stage }: { index: number; stage: (typeof journey.stages)[number] }) {
  const textLeft = index % 2 === 0; // 01, 03, 05: text left / image right
  const isBirth = stage.title === "Birth";

  return (
    <div
      data-journey-step
      className={cx(
        // Mobile/tablet: one column, content inset past the left route.
        "relative z-10 grid gap-y-7 py-12 pl-[calc(56px-var(--space-gutter))] md:py-14",
        // Desktop: LEFT | PATH | RIGHT, both halves on the same row.
        "lg:min-h-[80svh] lg:grid-cols-[minmax(0,1fr)_clamp(88px,8vw,140px)_minmax(0,1fr)] lg:items-center lg:gap-x-8 lg:py-12 lg:pl-0",
      )}
    >
      {/* Image — first in source order so mobile reads image → text. */}
      <div
        data-journey-reveal
        className={cx(
          "lg:row-start-1",
          textLeft ? "lg:col-start-3 lg:justify-self-start" : "lg:col-start-1 lg:justify-self-end",
          "w-full max-w-[28rem] md:max-w-[34rem] lg:max-w-[min(100%,57svh)]",
        )}
      >
        <div
          className={cx(
            "relative aspect-[1122/1402] w-full overflow-hidden",
            textLeft
              ? "rounded-tr-panel rounded-tl-xs rounded-br-xs rounded-bl-xs"
              : "rounded-tl-panel rounded-tr-xs rounded-br-xs rounded-bl-xs",
          )}
        >
          <Image
            src={stage.image}
            alt={stage.alt}
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover"
            style={{ objectPosition: stage.objectPosition }}
          />
        </div>
      </div>

      {/* Text — same row as its image on desktop, facing it across the route. */}
      <div
        data-journey-reveal
        className={cx(
          "max-w-[30rem] lg:row-start-1",
          textLeft ? "lg:col-start-1 lg:justify-self-end" : "lg:col-start-3 lg:justify-self-start",
        )}
      >
        <p
          data-journey-label
          className="flex items-baseline gap-3 motion-safe:opacity-[0.72] transition-[opacity,transform] duration-700 ease-(--ease-signature) motion-safe:translate-y-2 data-[active]:translate-y-0 data-[active]:opacity-100"
        >
          <span
            className="font-display text-2xl font-semibold tabular-nums"
            style={{ color: `var(${STAGE_HUES[index]})` }}
          >
            {stage.number}
          </span>
          <span className="font-body text-sm font-semibold tracking-[var(--tracking-wider)] text-ink-soft/70 uppercase">
            {stage.title}
          </span>
        </p>

        <h3
          className={cx(
            "mt-4 leading-[1.1] font-semibold text-ink lg:mt-5",
            isBirth
              ? "text-[clamp(2.1rem,1.4rem+2.8vw,3.6rem)]"
              : "text-[clamp(1.9rem,1.3rem+2.3vw,3.1rem)]",
          )}
        >
          {stage.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h3>

        <p className="mt-5 max-w-md text-lg leading-[var(--leading-relaxed)] text-ink-soft lg:mt-6">
          {stage.supporting}
        </p>
      </div>
    </div>
  );
}
