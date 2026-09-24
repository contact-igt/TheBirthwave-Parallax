"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  aboutHero,
  aboutProblem,
  aboutBelief,
  aboutFounderIntro,
  aboutCinematicSequence,
} from "@/content/about-content";
import { useReducedMotion } from "@/motion/reduced-motion";
import {
  ensureScrollTriggerRegistered,
  gsap,
  ScrollTrigger,
  SIGNATURE_EASE,
} from "@/motion/gsap-scroll";
import {
  ABOUT_TRACK_VH,
  ABOUT_DESKTOP_QUERY,
  ABOUT_BEAT_PHASES,
} from "@/motion/about-cinematic";

// ---------------------------------------------------------------------------
// Frame sequence constants
// ---------------------------------------------------------------------------

const FRAME_COUNT = 180;

/**
 * Generates the URL for a frame by 0-based index.
 * index 0  → /images/about/scroll/frame_000001.jpg
 * index 179 → /images/about/scroll/frame_000180.jpg
 */
const getFrameSrc = (index: number): string =>
  `/images/about/scroll/frame_${String(index + 1).padStart(6, "0")}.jpg`;

/** Number of frames to preload eagerly before showing the canvas. */
const EAGER_FRAMES = 25;

// ---------------------------------------------------------------------------
// Beat metadata — used by both the desktop canvas and static fallback
// ---------------------------------------------------------------------------

const BEATS = [
  { key: "hero",         cinematicId: "about-hero"         },
  { key: "problem",      cinematicId: "about-problem"       },
  { key: "belief",       cinematicId: "about-belief"        },
  { key: "founder-intro",cinematicId: "about-founder-intro" },
] as const;

// ---------------------------------------------------------------------------
// Public shell — splits desktop canvas vs. static fallback via CSS only
// (same `motion-safe:lg:` pattern as before so no hydration mismatch)
// ---------------------------------------------------------------------------

/**
 * AboutCinematicCanvas — Sections 01–04 cinematic opening.
 *
 * Desktop (lg+ and motion allowed): one <canvas> backed by 180 extracted
 * JPEG frames, driven by a single GSAP ScrollTrigger that maps scroll
 * progress linearly to a frame index. Text beats cross-fade over the same
 * GSAP timeline used by the old video system — phase fractions unchanged.
 *
 * Mobile / tablet / reduced-motion: unchanged static fallback path, each
 * beat backed by a real poster image, in plain document flow.
 *
 * The video element is fully removed from the desktop path.
 */
export function AboutCinematicCanvas() {
  return (
    <section
      aria-label="About The Birthwave — origin story"
      data-about-scene="cinematic"
      className="relative isolate bg-paper"
    >
      <div className="hidden motion-safe:lg:block">
        <AboutCinematicCanvasDesktop />
      </div>
      <div className="motion-safe:lg:hidden">
        <AboutCinematicCanvasStatic />
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Desktop canvas component
// ---------------------------------------------------------------------------

function AboutCinematicCanvasDesktop() {
  const trackRef       = useRef<HTMLDivElement>(null);
  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const heroBeatRef    = useRef<HTMLDivElement>(null);
  const problemBeatRef = useRef<HTMLDivElement>(null);
  const beliefBeatRef  = useRef<HTMLDivElement>(null);
  const founderBeatRef = useRef<HTMLDivElement>(null);
  const reducedMotion  = useReducedMotion();

  // Image cache — one HTMLImageElement per frame, never duplicated.
  const frameCache = useRef<Array<HTMLImageElement | null>>(
    Array(FRAME_COUNT).fill(null),
  );

  // Currently displayed frame index (integer, 0-based).
  const currentFrameRef = useRef(0);

  // Canvas natural image dimensions (set after first frame loads).
  const imgW = useRef(1600);
  const imgH = useRef(900);

  // ---------------------------------------------------------------------------
  // Canvas draw — cover crop
  // ---------------------------------------------------------------------------

  /**
   * Draws a single frame onto the canvas using object-fit: cover math.
   * Falls back to the nearest already-loaded frame in either direction if
   * the requested frame hasn't finished loading.
   */
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /** Inner helper — cover-crop a loaded HTMLImageElement onto the canvas. */
    const paintImage = (src: HTMLImageElement) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = src.naturalWidth  || imgW.current;
      const ih = src.naturalHeight || imgH.current;
      const scale = Math.max(cw / iw, ch / ih);
      const sw = iw * scale;
      const sh = ih * scale;
      const dx = (cw - sw) / 2;
      const dy = (ch - sh) / 2;
      ctx.drawImage(src, dx, dy, sw, sh);
    };

    const img = frameCache.current[index];
    if (img?.complete && img.naturalWidth > 0) {
      paintImage(img);
      return;
    }

    // Frame not ready — find nearest already-loaded frame in either direction
    for (let delta = 1; delta < FRAME_COUNT; delta++) {
      let found = false;
      for (const dir of [-1, 1]) {
        const alt = index + dir * delta;
        if (alt < 0 || alt >= FRAME_COUNT) continue;
        const altImg = frameCache.current[alt];
        if (altImg?.complete && altImg.naturalWidth > 0) {
          paintImage(altImg);
          found = true;
          break;
        }
      }
      if (found) break;
    }
  }, []);

  // ---------------------------------------------------------------------------
  // Canvas resize — correct high-DPI sizing, redraw current frame
  // ---------------------------------------------------------------------------

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w   = canvas.offsetWidth;
    const h   = canvas.offsetHeight;
    canvas.width  = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // ---------------------------------------------------------------------------
  // Frame preloader
  // ---------------------------------------------------------------------------

  const loadFrames = useCallback(
    (onFirstFrameReady: () => void) => {
      const cache = frameCache.current;
      let firstFrameReady = false;

      const loadOne = (index: number) => {
        if (cache[index]) return; // already loading or loaded
        const img = new window.Image();
        img.decoding = "async";
        img.onload = () => {
          if (index === 0) {
            imgW.current = img.naturalWidth;
            imgH.current = img.naturalHeight;
          }
          if (!firstFrameReady && index < EAGER_FRAMES) {
            // Check if frame 0 is ready to draw
            if (cache[0]?.complete && cache[0].naturalWidth > 0) {
              if (!firstFrameReady) {
                firstFrameReady = true;
                onFirstFrameReady();
              }
            }
          }
        };
        img.onerror = () => {
          if (process.env.NODE_ENV !== "production") {
            console.warn(`[about-canvas] Frame ${index + 1} failed to load`);
          }
        };
        img.src = getFrameSrc(index);
        cache[index] = img;
      };

      // Frame 0 first — needed immediately
      loadOne(0);

      // Eager batch: frames 1 → EAGER_FRAMES-1
      for (let i = 1; i < EAGER_FRAMES; i++) {
        loadOne(i);
      }

      // First frame is loaded synchronously if cached (e.g. browser cache)
      if (cache[0]?.complete && cache[0].naturalWidth > 0) {
        firstFrameReady = true;
        onFirstFrameReady();
      }

      // Lazy remainder — schedule in chunks via requestIdleCallback / setTimeout
      let nextLazy = EAGER_FRAMES;
      const CHUNK = 10;

      const loadChunk = () => {
        const end = Math.min(nextLazy + CHUNK, FRAME_COUNT);
        for (let i = nextLazy; i < end; i++) {
          loadOne(i);
        }
        nextLazy = end;
        if (nextLazy < FRAME_COUNT) {
          if ("requestIdleCallback" in window) {
            (window as Window & typeof globalThis).requestIdleCallback(loadChunk, { timeout: 2000 });
          } else {
            setTimeout(loadChunk, 100);
          }
        }
      };

      if ("requestIdleCallback" in window) {
        (window as Window & typeof globalThis).requestIdleCallback(loadChunk, { timeout: 2000 });
      } else {
        setTimeout(loadChunk, 200);
      }
    },
    [],
  );

  // ---------------------------------------------------------------------------
  // Main effect — preload, resize, ScrollTrigger
  // ---------------------------------------------------------------------------

  useEffect(() => {
    const track  = trackRef.current;
    const canvas = canvasRef.current;
    if (!track || !canvas) return;

    // Size canvas before first draw
    resizeCanvas();

    // Resize observer — debounced, uses ScrollTrigger.refresh()
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const ro = new ResizeObserver(() => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resizeCanvas();
        ScrollTrigger.refresh();
      }, 120);
    });
    ro.observe(canvas);

    // Start loading frames; show first frame as soon as available
    loadFrames(() => {
      drawFrame(0);
    });

    // No GSAP timeline in reduced-motion mode
    if (reducedMotion) {
      return () => {
        ro.disconnect();
        if (resizeTimer) clearTimeout(resizeTimer);
      };
    }

    ensureScrollTriggerRegistered();

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(ABOUT_DESKTOP_QUERY, () => {
        const heroBeat    = heroBeatRef.current;
        const problemBeat = problemBeatRef.current;
        const beliefBeat  = beliefBeatRef.current;
        const founderBeat = founderBeatRef.current;
        if (!heroBeat || !problemBeat || !beliefBeat || !founderBeat) return;

        // Beat 01 (Hero) starts visible; the others start hidden.
        gsap.set(heroBeat,    { autoAlpha: 1, y: 0  });
        gsap.set([problemBeat, beliefBeat, founderBeat], { autoAlpha: 0, y: 20 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: track,
            start:   "top top",
            end:     "bottom bottom",
            scrub:   1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Map scroll progress linearly to frame index
              const targetFrame = Math.round(self.progress * (FRAME_COUNT - 1));
              if (targetFrame !== currentFrameRef.current) {
                currentFrameRef.current = targetFrame;
                drawFrame(targetFrame);
              }
            },
          },
        });

        // Text-beat enter / exit — identical phase fractions to the old
        // video system; only the background medium behind them changes.
        const addBeat = (
          el: HTMLElement,
          phase: {
            enter: readonly [number, number];
            exit:  readonly [number, number] | null;
          },
        ) => {
          tl.to(
            el,
            {
              autoAlpha: 1,
              y: 0,
              ease: SIGNATURE_EASE,
              duration: phase.enter[1] - phase.enter[0],
            },
            phase.enter[0],
          );
          if (phase.exit) {
            tl.to(
              el,
              {
                autoAlpha: 0,
                y: -20,
                ease: SIGNATURE_EASE,
                duration: phase.exit[1] - phase.exit[0],
              },
              phase.exit[0],
            );
          }
        };

        addBeat(heroBeat,    ABOUT_BEAT_PHASES.hero);
        addBeat(problemBeat, ABOUT_BEAT_PHASES.problem);
        addBeat(beliefBeat,  ABOUT_BEAT_PHASES.belief);
        addBeat(founderBeat, ABOUT_BEAT_PHASES.founderIntro);

        // Duration anchor — pins the timeline to exactly 1 so that
        // the scrub mapping is accurate across the full track.
        tl.set(founderBeat, { autoAlpha: 1, y: 0 }, 1);

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });
    }, track);

    return () => {
      ctx.revert();
      ro.disconnect();
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  }, [reducedMotion, drawFrame, loadFrames, resizeCanvas]);

  // ---------------------------------------------------------------------------
  // Reduced-motion static frame
  // ---------------------------------------------------------------------------

  if (reducedMotion) {
    return (
      <div className="relative min-h-dvh w-full overflow-hidden bg-paper-dim">
        {/* Show poster of frame 1 as a static background */}
        <Image
          src={getFrameSrc(0)}
          alt="The Birthwave — cinematic opening"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_38%]"
        />
        {/* Hero beat content — all text visible, no animation */}
        <div className="absolute inset-0 flex items-end">
          <div className="container-birthwave pb-20">
            <div className="relative max-w-xl">
              <Scrim />
              <p className="eyebrow text-ink">{aboutHero.eyebrow}</p>
              <h1 className="mt-5 text-[clamp(2.5rem,1.9rem+3.2vw,4.5rem)] leading-[1.02] font-semibold tracking-[var(--tracking-tight)] text-ink">
                {aboutHero.headlineLines.map((line) => (
                  <span key={line} className="block">{line}</span>
                ))}
              </h1>
              <p className="mt-6 max-w-md text-lg leading-[var(--leading-relaxed)] text-ink-soft">
                {aboutHero.supporting}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Desktop canvas JSX
  // ---------------------------------------------------------------------------

  return (
    <div
      ref={trackRef}
      className="relative"
      style={{ height: `${ABOUT_TRACK_VH}svh` }}
    >
      {/* Sticky visual stage — plain CSS sticky, no GSAP pin */}
      <div className="sticky top-0 z-0 h-svh w-full overflow-hidden bg-paper-dim">

        {/* Canvas — aria-hidden, visual only. Text lives in real DOM below. */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
          style={{ display: "block" }}
        />

        {/* Chapter numeral rail — documentary wayfinding */}
        <ol className="absolute top-1/2 right-3 z-10 flex -translate-y-1/2 flex-col items-end gap-6 sm:right-5">
          {aboutCinematicSequence.map((_, index) => (
            <li
              key={index}
              className="font-display text-xs font-semibold text-paper/70 tabular-nums"
            >
              {String(index + 1).padStart(2, "0")}
            </li>
          ))}
        </ol>

        {/* ── Beat 01 — Hero: lower-left ─────────────────────────── */}
        <div
          ref={heroBeatRef}
          id={BEATS[0].cinematicId}
          data-cinematic-beat={BEATS[0].cinematicId}
          data-about-copy={BEATS[0].key}
          className="absolute inset-0 z-10 flex items-end"
        >
          <div className="container-birthwave pb-20 xl:pb-28">
            <div className="relative max-w-xl">
              <Scrim />
              <p className="eyebrow text-ink">{aboutHero.eyebrow}</p>
              <h1 className="mt-5 text-[clamp(2.5rem,1.9rem+3.2vw,4.5rem)] leading-[1.02] font-semibold tracking-[var(--tracking-tight)] text-ink">
                {aboutHero.headlineLines.map((line) => (
                  <span key={line} className="block">{line}</span>
                ))}
              </h1>
              <p className="mt-6 max-w-md text-lg leading-[var(--leading-relaxed)] text-ink-soft">
                {aboutHero.supporting}
              </p>
            </div>
          </div>
        </div>

        {/* ── Beat 02 — Problem: upper-right ─────────────────────── */}
        <div
          ref={problemBeatRef}
          id={BEATS[1].cinematicId}
          data-cinematic-beat={BEATS[1].cinematicId}
          data-about-copy={BEATS[1].key}
          className="absolute inset-0 z-10 flex items-start"
        >
          <div className="container-birthwave pt-24 xl:pt-32">
            <div className="relative mr-10 ml-auto max-w-md text-right xl:mr-14">
              <Scrim />
              <p className="eyebrow text-ink">{aboutProblem.eyebrow}</p>
              <h2 className="mt-5 text-[clamp(2.1rem,1.6rem+2.4vw,3.25rem)] leading-[1.08] font-semibold tracking-[var(--tracking-tight)] text-ink">
                {aboutProblem.heading}
              </h2>
              <p className="mt-6 text-lg leading-[var(--leading-relaxed)] text-ink-soft">
                {aboutProblem.body}
              </p>
              <ul className="mt-7 flex flex-wrap items-center justify-end gap-x-3 gap-y-2">
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
          </div>
        </div>

        {/* ── Beat 03 — Belief: upper-left, offset ───────────────── */}
        <div
          ref={beliefBeatRef}
          id={BEATS[2].cinematicId}
          data-cinematic-beat={BEATS[2].cinematicId}
          data-about-copy={BEATS[2].key}
          className="absolute inset-0 z-10 flex items-start"
        >
          <div className="container-birthwave pt-24 xl:pt-28">
            <div className="relative max-w-[52.5rem] -translate-x-10 -translate-y-10">
              <Scrim strong />
              <p className="eyebrow text-ink">{aboutBelief.eyebrow}</p>
              <h2 className="mt-5 text-[clamp(2.75rem,2rem+3.6vw,5rem)] leading-[1.02] font-semibold tracking-[var(--tracking-tight)] text-ink uppercase">
                {aboutBelief.heading}
              </h2>
              <p className="mt-8 max-w-md text-lg leading-[var(--leading-relaxed)] text-ink-soft">
                {aboutBelief.body}
              </p>
            </div>
          </div>
        </div>

        {/* ── Beat 04 — Founder: lower-right ─────────────────────── */}
        <div
          ref={founderBeatRef}
          id={BEATS[3].cinematicId}
          data-cinematic-beat={BEATS[3].cinematicId}
          data-about-copy={BEATS[3].key}
          className="absolute inset-0 z-10 flex items-end"
        >
          <div className="container-birthwave pb-20 xl:pb-28">
            <div className="relative mr-10 ml-auto max-w-md text-right xl:mr-14">
              <Scrim />
              <p className="eyebrow text-ink">{aboutFounderIntro.eyebrow}</p>
              <h2 className="mt-4 text-2xl font-semibold text-ink sm:text-3xl">
                {aboutFounderIntro.introLabel}
              </h2>
              <p className="mt-5 text-lg leading-[var(--leading-relaxed)] text-ink-soft">
                {aboutFounderIntro.story}
              </p>
              <p className="mt-6 border-r-2 border-terracotta pr-5 text-xl leading-[1.4] font-medium text-ink italic">
                &ldquo;{aboutFounderIntro.quote}&rdquo;
              </p>
            </div>
          </div>
        </div>

      </div>{/* /sticky stage */}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Scrim — soft text-backing blur (unchanged from the video version)
// ---------------------------------------------------------------------------

function Scrim({ strong = false }: { strong?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={
        strong
          ? "absolute -inset-x-8 -inset-y-10 -z-10 rounded-[2.5rem] blur-2xl"
          : "absolute -inset-x-6 -inset-y-8 -z-10 rounded-[2rem] blur-2xl"
      }
      style={{
        backgroundColor: `color-mix(in srgb, var(--color-paper) ${strong ? 62 : 55}%, transparent)`,
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// Static fallback — mobile + reduced-motion + below lg
// (identical to the previous version; poster images unchanged)
// ---------------------------------------------------------------------------

function AboutCinematicCanvasStatic() {
  return (
    <div className="flex flex-col">
      <StaticBeat posterSrc={aboutHero.media.posterSrc} alt={aboutHero.media.alt}>
        <div
          id={`${BEATS[0].cinematicId}-static`}
          data-cinematic-beat={BEATS[0].cinematicId}
          data-about-copy={BEATS[0].key}
        >
          <p className="eyebrow">{aboutHero.eyebrow}</p>
          <h1 className="mt-4 text-[clamp(2.25rem,1.8rem+2.2vw,3rem)] leading-[1.05] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {aboutHero.headlineLines.map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </h1>
          <p className="mt-5 text-lg leading-[var(--leading-relaxed)] text-ink-soft">
            {aboutHero.supporting}
          </p>
        </div>
      </StaticBeat>

      <StaticBeat posterSrc={aboutProblem.media.posterSrc} alt={aboutProblem.media.alt}>
        <div
          id={`${BEATS[1].cinematicId}-static`}
          data-cinematic-beat={BEATS[1].cinematicId}
          data-about-copy={BEATS[1].key}
        >
          <p className="eyebrow">{aboutProblem.eyebrow}</p>
          <h2 className="mt-4 text-[clamp(1.9rem,1.6rem+1.4vw,2.5rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {aboutProblem.heading}
          </h2>
          <p className="mt-5 text-lg leading-[var(--leading-relaxed)] text-ink-soft">
            {aboutProblem.body}
          </p>
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

      <StaticBeat posterSrc={aboutBelief.media.posterSrc} alt={aboutBelief.media.alt}>
        <div
          id={`${BEATS[2].cinematicId}-static`}
          data-cinematic-beat={BEATS[2].cinematicId}
          data-about-copy={BEATS[2].key}
        >
          <p className="eyebrow">{aboutBelief.eyebrow}</p>
          <h2 className="mt-4 text-[clamp(2.1rem,1.7rem+1.8vw,2.75rem)] leading-[1.08] font-semibold tracking-[var(--tracking-tight)] text-ink uppercase">
            {aboutBelief.heading}
          </h2>
          <p className="mt-5 text-lg leading-[var(--leading-relaxed)] text-ink-soft">
            {aboutBelief.body}
          </p>
        </div>
      </StaticBeat>

      <StaticBeat
        posterSrc={aboutFounderIntro.media.posterSrc}
        alt={aboutFounderIntro.media.alt}
        last
      >
        <div
          id={`${BEATS[3].cinematicId}-static`}
          data-cinematic-beat={BEATS[3].cinematicId}
          data-about-copy={BEATS[3].key}
        >
          <p className="eyebrow">{aboutFounderIntro.eyebrow}</p>
          <h2 className="mt-4 text-2xl font-semibold text-ink sm:text-3xl">
            {aboutFounderIntro.introLabel}
          </h2>
          <p className="mt-5 text-lg leading-[var(--leading-relaxed)] text-ink-soft">
            {aboutFounderIntro.story}
          </p>
          <p className="mt-5 border-l-2 border-terracotta pl-5 text-xl leading-[1.4] font-medium text-ink italic">
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
        className="relative h-64 w-full overflow-hidden sm:h-80"
      >
        <Image
          src={posterSrc}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover object-[50%_38%]"
        />
      </div>
      <div className="container-birthwave py-12">{children}</div>
    </div>
  );
}
