"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { journey } from "@/content/site-content";
import { CtaLink } from "@/components/ui/cta-link";
import { useReducedMotion } from "@/motion/reduced-motion";
import { cx } from "@/lib/cx";
import { ensureScrollTriggerRegistered, gsap, ScrollTrigger } from "@/motion/gsap-scroll";

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
 * getPointAtLength. Each stage has scrubbed, reversible reveals (see REVEAL).
 */

// Stage number colours — accessible deep variants for high-contrast text on light backgrounds:
const STAGE_HUES = [
  "--color-terracotta-deep",
  "--color-sky-deep",
  "--color-terracotta-deep",
  "--color-terracotta-deep",
  "--color-terracotta-deep",
  "--color-sky-deep",
] as const;

/**
 * Atmospheric fabric backdrop: supplied silk drape asset framed along outer margins.
 * Scaled within a viewport-sized CSS-sticky layer with soft directional masks,
 * preserving an unencumbered central reading zone on the ivory base.
 */
const FABRIC_BACKDROP_SRC = "/images/journey/journey-background-v1.webp";

/**
 * Step reveals: the story elements carry the motion, the backdrop stays
 * still. Each photo slides in from its own side of the route and settles;
 * its label, heading and copy follow. Scrubbed (reversible) against the
 * step's own grid cells, so scrolling back gently un-settles them.
 */
const REVEAL = {
  desktop: { imageX: 20, imageY: 12, imageScale: 0.98, textY: 0 },
  tablet: { imageX: 14, imageY: 10, imageScale: 0.98, textY: 0 },
  mobile: { imageX: 0, imageY: 12, imageScale: 0.99, textY: 0 },
} as const;
const REVEAL_SCRUB = 0.5;
/** Photo micro-parallax inside its card: gentle vertical drift within the masked frame. */
const PHOTO_PARALLAX = { scale: 1.08, yPercent: 4.5 };

const DESKTOP_QUERY = "(min-width: 1024px)";
/** Mobile route x (px from the wrapper's left edge) and its slight waver. */
const MOBILE_PATH_X = 24;
const MOBILE_WAVER = 3;
/** Desktop bend toward each stage's text side, capped to stay inside the path column. */
const DESKTOP_BEND_MAX = 44;
const DESKTOP_BEND_RATIO = 0.03;


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
  const bgDriftRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const basePathRef = useRef<SVGPathElement>(null);
  const progressPathRef = useRef<SVGPathElement>(null);
  const markerRef = useRef<SVGGElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
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

      // Step reveals + photo micro-parallax, per breakpoint.
      const intro = introRef.current;
      const mm = gsap.matchMedia();
      const addReveals = (cfg: (typeof REVEAL)[keyof typeof REVEAL], parallax: boolean) => {
        if (intro) {
          gsap.fromTo(
            intro,
            { autoAlpha: 0, y: 20 },
            {
              autoAlpha: 1,
              y: 0,
              ease: "power2.out",
              scrollTrigger: { trigger: intro, start: "top 88%", end: "top 66%", scrub: REVEAL_SCRUB },
            },
          );
        }
        steps.forEach((step) => {
          const imageCell = step.querySelector<HTMLElement>("[data-journey-image]");
          const card = step.querySelector<HTMLElement>("[data-journey-card]");
          const photo = step.querySelector<HTMLElement>("[data-journey-photo]");
          const textCell = step.querySelector<HTMLElement>("[data-journey-text-block]");
          const textParts = step.querySelectorAll<HTMLElement>("[data-journey-text]");
          if (!imageCell || !card || !textCell) return;
          const fromSide = imageCell.dataset.side === "left" ? -1 : 1;

          // Photo: in from its own side, settling as its cell rises from 78% to 52% of the viewport.
          gsap.fromTo(
            card,
            { autoAlpha: 0, x: cfg.imageX * fromSide, y: cfg.imageY, scale: cfg.imageScale },
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              scale: 1,
              ease: "power2.out",
              scrollTrigger: { trigger: imageCell, start: "top 78%", end: "top 52%", scrub: REVEAL_SCRUB },
            },
          );
          // Copy follows: label, then heading, then body. Stable one-time reveal keeps text rock-solid to read.
          gsap.fromTo(
            textParts,
            { autoAlpha: 0, y: 12 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.55,
              ease: "power2.out",
              stagger: 0.08,
              scrollTrigger: { trigger: textCell, start: "top 80%", toggleActions: "play none none reverse" },
            },
          );
          if (parallax && photo) {
            gsap.fromTo(
              photo,
              { scale: PHOTO_PARALLAX.scale, yPercent: -PHOTO_PARALLAX.yPercent },
              {
                yPercent: PHOTO_PARALLAX.yPercent,
                ease: "none",
                scrollTrigger: { trigger: imageCell, start: "top bottom", end: "bottom top", scrub: true },
              },
            );
          }
        });
      };
      mm.add(DESKTOP_QUERY, () => {
        addReveals(REVEAL.desktop, true);
        const bgDrift = bgDriftRef.current;
        if (bgDrift) {
          gsap.fromTo(
            bgDrift,
            { y: -10 },
            {
              y: 10,
              ease: "none",
              scrollTrigger: {
                trigger: wrapper,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }
      });
      mm.add("(min-width: 768px) and (max-width: 1023px)", () => addReveals(REVEAL.tablet, true));
      mm.add("(max-width: 767px)", () => addReveals(REVEAL.mobile, false));
    }, wrapper);

    return () => {
      ctx.revert();
      cleanupGeometry();
    };
  }, [reducedMotion]);

  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="relative isolate overflow-x-clip bg-[var(--color-paper)]"
    >
      {/* Decorative background: supplied fabric drape asset framed along outer margins with ivory base */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-clip select-none"
      >
        <div className="sticky top-0 h-screen w-full overflow-clip supports-[height:100dvh]:h-dvh">
          <div ref={bgDriftRef} className="relative h-full w-full">
            {/* Left fabric drape — terracotta/coral/peach folds along outer left margin */}
            <div
              className="absolute top-0 bottom-0 left-0 hidden w-[36vw] min-w-[200px] max-w-[460px] sm:block md:w-[26vw] md:max-w-[340px] lg:w-[30vw] lg:max-w-[440px] xl:w-[28vw] xl:max-w-[480px] opacity-40 md:opacity-60 lg:opacity-90 xl:opacity-95 transition-opacity"
              style={{
                WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0) 100%)",
                maskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0) 100%)",
              }}
            >
              <Image
                src={FABRIC_BACKDROP_SRC}
                alt=""
                fill
                sizes="(min-width: 1024px) 30vw, 36vw"
                className="object-cover object-left"
                priority
              />
              {/* Soft ivory veil to soften coral area */}
              <div
                className="absolute inset-0 bg-[var(--color-paper)] opacity-20"
              />
            </div>

            {/* Right fabric drape — pale sky-blue and pearl ivory folds along outer right margin */}
            <div
              className="absolute top-0 bottom-0 right-0 hidden w-[36vw] min-w-[200px] max-w-[460px] sm:block md:w-[26vw] md:max-w-[340px] lg:w-[30vw] lg:max-w-[440px] xl:w-[28vw] xl:max-w-[480px] opacity-40 md:opacity-60 lg:opacity-90 xl:opacity-95 transition-opacity"
              style={{
                WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0) 100%)",
                maskImage: "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0) 100%)",
              }}
            >
              <Image
                src={FABRIC_BACKDROP_SRC}
                alt=""
                fill
                sizes="(min-width: 1024px) 30vw, 36vw"
                className="object-cover object-right"
                priority
              />
              {/* Soft ivory veil to soften sky-blue/pearl area */}
              <div
                className="absolute inset-0 bg-[var(--color-paper)] opacity-20"
              />
            </div>

            {/* Central route & text clearance: soft radial ivory wash guaranteeing clear reading zone */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 65% 85% at 50% 50%, var(--color-paper) 45%, transparent 100%)",
                opacity: 0.7,
              }}
            />
          </div>
        </div>

        {/* Soft edge blending into adjacent sections above and below */}
        <div
          className="absolute inset-x-0 top-0 h-[clamp(6rem,14vh,10rem)] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(to bottom, var(--color-paper), transparent)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[clamp(6rem,14vh,10rem)] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(to top, var(--color-paper), transparent)",
          }}
        />
      </div>

      {/* Intro — eyebrow + heading. The heading is now distinct from the
          Philosophy resolution ("Care that grows with you." vs the old
          "One continuous journey of care."), so it's rendered visibly. */}
      <div className="container-birthwave relative pt-(--space-section-sm) pb-6 sm:pb-8">
        <p ref={introRef} className="eyebrow">
          {journey.eyebrow}
        </p>
        <h2
          id="journey-heading"
          className="mt-3.5 text-balance text-h2 leading-[1.02] font-semibold tracking-[var(--tracking-tight)] text-ink"
        >
          Care that grows{" "}
          <span className="serif-emphasis">with you.</span>
        </h2>
      </div>

      <div ref={wrapperRef} className="container-birthwave relative pb-[clamp(3rem,2.5rem+3vw,5.5rem)]">
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

  return (
    <div
      data-journey-step
      className={cx(
        // Mobile/tablet: one column, content inset past the left route, tightened spacing.
        "relative z-10 grid gap-y-5 py-7 sm:py-9 pl-[calc(52px-var(--space-gutter))] md:py-10",
        // Desktop: LEFT | PATH | RIGHT, both halves on the same row.
        "lg:min-h-[72svh] lg:grid-cols-[minmax(0,1fr)_clamp(88px,8vw,140px)_minmax(0,1fr)] lg:items-center lg:gap-x-8 lg:py-10 lg:pl-0",
      )}
    >
      {/* Image — first in source order so mobile reads image → text. */}
      <div
        data-journey-image
        data-side={textLeft ? "right" : "left"}
        className={cx(
          "lg:row-start-1",
          textLeft ? "lg:col-start-3 lg:justify-self-start" : "lg:col-start-1 lg:justify-self-end",
          "w-full max-w-[28rem] md:max-w-[34rem] lg:max-w-[min(100%,57svh)]",
        )}
      >
        <div
          data-journey-card
          className={cx(
            "relative aspect-[1122/1402] w-full overflow-hidden",
            textLeft
              ? "rounded-tr-panel rounded-tl-xs rounded-br-xs rounded-bl-xs"
              : "rounded-tl-panel rounded-tr-xs rounded-br-xs rounded-bl-xs",
          )}
        >
          <div data-journey-photo className="absolute inset-0">
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
      </div>

      {/* Text — same row as its image on desktop, facing it across the route. */}
      <div
        data-journey-text-block
        className={cx(
          "max-w-[30rem] lg:row-start-1",
          textLeft ? "lg:col-start-1 lg:justify-self-end" : "lg:col-start-3 lg:justify-self-start",
        )}
      >
        <div data-journey-text>
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
        </div>

        <h3
          data-journey-text
          className="mt-4 text-stage leading-[1.1] font-semibold text-ink lg:mt-5"
        >
          {stage.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h3>

        <p data-journey-text className="mt-5 max-w-md text-lg leading-[var(--leading-relaxed)] text-ink-soft whitespace-pre-line lg:mt-6">
          {stage.supporting}
        </p>
        {stage.cta && (
          <div data-journey-text className="mt-6 lg:mt-7">
            <CtaLink href={stage.cta.href} className="text-base">
              {stage.cta.label}
            </CtaLink>
          </div>
        )}
      </div>
    </div>
  );
}
