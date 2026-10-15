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
  gsap,
  ScrollTrigger,
  SIGNATURE_EASE,
} from "@/motion/gsap-scroll";
import {
  SECTION1_FRAMES,
  SECTION3_FRAMES,
} from "@/motion/about-cinematic";

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
// 1. Exterior Scroll Scene (Sections 1 + 2)
// ---------------------------------------------------------------------------

function ExteriorScrollScene() {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroBeatRef = useRef<HTMLDivElement>(null);
  const problemBeatRef = useRef<HTMLDivElement>(null);

  const frameCount = SECTION1_FRAMES.length; // 82 frames
  const frameCache = useRef<Array<HTMLImageElement | null>>(Array(frameCount).fill(null));
  const currentFrameRef = useRef(0);
  const imgW = useRef(1920);
  const imgH = useRef(1080);

  // Cover-crop paint with nearest loaded frame fallback and mobile-responsive focal alignment
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const paint = (src: HTMLImageElement) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = src.naturalWidth || imgW.current;
      const ih = src.naturalHeight || imgH.current;
      const scale = Math.max(cw / iw, ch / ih);
      const sw = iw * scale;
      const sh = ih * scale;
      // In portrait orientation (mobile), focus slightly to the right to keep the entrance & sign centered
      const focalX = cw < ch ? 0.54 : 0.5;
      const dx = (cw - sw) * focalX;
      const dy = (ch - sh) / 2;
      ctx.drawImage(src, dx, dy, sw, sh);
    };

    const target = frameCache.current[index];
    if (target?.complete && target.naturalWidth > 0) {
      paint(target);
      return;
    }

    // Nearest loaded fallback: never draw a blank canvas
    for (let delta = 1; delta < frameCount; delta++) {
      for (const dir of [-1, 1]) {
        const alt = index + dir * delta;
        if (alt >= 0 && alt < frameCount) {
          const altImg = frameCache.current[alt];
          if (altImg?.complete && altImg.naturalWidth > 0) {
            paint(altImg);
            return;
          }
        }
      }
    }
  }, [frameCount]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    if (w === 0 || h === 0) return;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // Progressive preloader: eager first batch, idle chunking for remainder, prioritize near scroll
  const loadFrames = useCallback((onFirstReady: () => void) => {
    const cache = frameCache.current;
    let firstNotified = false;

    const loadOne = (i: number) => {
      if (cache[i]) return;
      const img = new window.Image();
      img.decoding = "async";
      img.onload = () => {
        if (i === 0) {
          imgW.current = img.naturalWidth || 1920;
          imgH.current = img.naturalHeight || 1080;
        }
        if (img.decode) {
          img.decode().catch(() => {}).finally(() => {
            if (!firstNotified && cache[0]?.complete && cache[0].naturalWidth > 0) {
              firstNotified = true;
              onFirstReady();
            }
          });
        } else if (!firstNotified && cache[0]?.complete && cache[0].naturalWidth > 0) {
          firstNotified = true;
          onFirstReady();
        }
      };
      img.src = SECTION1_FRAMES[i];
      cache[i] = img;
    };

    // Load frame 0 immediately
    loadOne(0);

    // Eager nearby batch (frames 1–10)
    const eagerCount = Math.min(10, frameCount);
    for (let i = 1; i < eagerCount; i++) {
      loadOne(i);
    }

    if (cache[0]?.complete && cache[0].naturalWidth > 0) {
      firstNotified = true;
      onFirstReady();
    }

    // Lazy load remaining frames in small chunks
    let nextIdx = eagerCount;
    const CHUNK_SIZE = 8;
    const loadRemaining = () => {
      const end = Math.min(nextIdx + CHUNK_SIZE, frameCount);
      for (let i = nextIdx; i < end; i++) {
        loadOne(i);
      }
      nextIdx = end;
      if (nextIdx < frameCount) {
        if ("requestIdleCallback" in window) {
          (window as Window & typeof globalThis).requestIdleCallback(loadRemaining, { timeout: 1500 });
        } else {
          setTimeout(loadRemaining, 80);
        }
      }
    };

    if ("requestIdleCallback" in window) {
      (window as Window & typeof globalThis).requestIdleCallback(loadRemaining, { timeout: 1500 });
    } else {
      setTimeout(loadRemaining, 100);
    }
  }, [frameCount]);

  // Prioritize nearby frames during scroll
  const prioritizeNear = useCallback((targetIndex: number) => {
    const cache = frameCache.current;
    const start = Math.max(0, targetIndex - 5);
    const end = Math.min(frameCount - 1, targetIndex + 5);
    for (let i = start; i <= end; i++) {
      if (!cache[i]) {
        const img = new window.Image();
        img.decoding = "async";
        img.src = SECTION1_FRAMES[i];
        cache[i] = img;
      }
    }
  }, [frameCount]);

  useEffect(() => {
    const track = trackRef.current;
    const canvas = canvasRef.current;
    if (!track || !canvas) return;

    resizeCanvas();

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const ro = new ResizeObserver(() => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resizeCanvas();
        ScrollTrigger.refresh();
      }, 100);
    });
    ro.observe(canvas);

    loadFrames(() => {
      drawFrame(0);
    });

    ensureScrollTriggerRegistered();

    const ctx = gsap.context(() => {
      const heroBeat = heroBeatRef.current;
      const problemBeat = problemBeatRef.current;
      if (!heroBeat || !problemBeat) return;

      // Section 1 begins visible; Section 2 starts hidden
      gsap.set(heroBeat, { autoAlpha: 1, y: 0 });
      gsap.set(problemBeat, { autoAlpha: 0, y: 24 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Continuous normalized progress 0 -> 1 across the full 82-frame exterior sequence
            const target = Math.min(
              frameCount - 1,
              Math.max(0, Math.round(self.progress * (frameCount - 1))),
            );
            if (target !== currentFrameRef.current) {
              currentFrameRef.current = target;
              prioritizeNear(target);
              drawFrame(target);
            }
          },
        },
      });

      // Hero exit: fades out smoothly between progress 0.38 and 0.48
      tl.to(
        heroBeat,
        {
          autoAlpha: 0,
          y: -24,
          ease: SIGNATURE_EASE,
          duration: 0.10,
        },
        0.38,
      );

      // Problem enter: fades in smoothly between progress 0.48 and 0.58, stays through 1.0
      tl.to(
        problemBeat,
        {
          autoAlpha: 1,
          y: 0,
          ease: SIGNATURE_EASE,
          duration: 0.10,
        },
        0.48,
      );

      // Timeline duration anchor to pin 0 -> 1 progress
      tl.set(problemBeat, { autoAlpha: 1, y: 0 }, 1.0);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    }, track);

    return () => {
      ctx.revert();
      ro.disconnect();
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  }, [drawFrame, loadFrames, prioritizeNear, resizeCanvas, frameCount]);

  return (
    <div
      ref={trackRef}
      className="relative h-[200svh] lg:h-[220svh]"
    >
      <div className="sticky top-0 z-0 h-svh w-full overflow-hidden bg-paper-dim">
        {/* Canvas background for exterior clinical frames */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
          style={{ display: "block" }}
        />

        {/* Wayfinding chapter numerals */}
        <div className="pointer-events-none absolute top-1/2 right-3 z-20 flex -translate-y-1/2 flex-col items-end gap-6 sm:right-6">
          <span className="font-display text-[11px] sm:text-xs font-semibold tracking-wider text-ink/80 tabular-nums">
            01 / 02
          </span>
        </div>

        {/* ── Section 1 (Hero) — Left-aligned over soft left-to-right editorial gradient wash ── */}
        <div
          ref={heroBeatRef}
          id={BEATS[0].cinematicId}
          data-cinematic-beat={BEATS[0].cinematicId}
          data-about-copy={BEATS[0].key}
          className="pointer-events-none absolute inset-0 z-10 flex items-end justify-start pb-14 sm:pb-16 lg:pb-20 xl:pb-24"
        >
          {/* Directional soft warm ivory gradient wash */}
          <EditorialGradientWash alignment="left" />

          <div className="w-full px-5 sm:px-8 md:px-12 lg:pl-[8vw] xl:pl-[10vw]">
            <div className="pointer-events-auto relative max-w-[560px] xl:max-w-[600px]">
              <p className="eyebrow text-ink tracking-[var(--tracking-wider)]">{aboutHero.eyebrow}</p>
              <h1 className="mt-4 sm:mt-5 text-[clamp(1.75rem,1.25rem+1.6vw,2.85rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
                {aboutHero.headlineLines.map((line) => (
                  <span key={line} className="block">{line}</span>
                ))}
              </h1>
              <p className="mt-5 sm:mt-6 max-w-[520px] text-sm sm:text-base xl:text-[1.0625rem] leading-[1.7] text-ink-soft whitespace-pre-line">
                {aboutHero.supporting}
              </p>
            </div>
          </div>
        </div>

        {/* ── Section 2 (Why The Birthwave) — Right-aligned over mirrored right-to-left editorial gradient wash ── */}
        <div
          ref={problemBeatRef}
          id={BEATS[1].cinematicId}
          data-cinematic-beat={BEATS[1].cinematicId}
          data-about-copy={BEATS[1].key}
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-end"
        >
          {/* Mirrored directional soft warm ivory gradient wash */}
          <EditorialGradientWash alignment="right" />

          <div className="w-full px-5 sm:px-8 md:px-12 lg:pr-[8vw] xl:pr-[10vw]">
            <div className="pointer-events-auto relative ml-auto max-w-[540px] xl:max-w-[580px] text-right">
              <p className="eyebrow text-ink tracking-[var(--tracking-wider)]">{aboutProblem.eyebrow}</p>
              <h2 className="mt-4 sm:mt-5 text-[clamp(1.75rem,1.25rem+1.6vw,2.65rem)] leading-[1.14] font-semibold tracking-[var(--tracking-tight)] text-ink">
                {aboutProblem.heading}
              </h2>
              <div className="mt-5 sm:mt-6 space-y-3.5 text-sm sm:text-base xl:text-[1.0625rem] leading-[1.7] text-ink-soft">
                {aboutProblem.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              <ul className="mt-6 sm:mt-7 flex flex-wrap items-center justify-end gap-x-3 gap-y-2">
                {aboutProblem.stages.map((stage, index) => (
                  <li key={stage} className="flex items-center gap-2 sm:gap-3">
                    {index > 0 ? (
                      <span aria-hidden="true" className="text-ink-soft/40">/</span>
                    ) : null}
                    <span className="font-body text-xs sm:text-sm font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
                      {stage}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 2. Interior Scroll Scene (Section 3 — Our Approach)
// ---------------------------------------------------------------------------

function InteriorScrollScene() {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beliefBeatRef = useRef<HTMLDivElement>(null);
  const transitionOverlayRef = useRef<HTMLDivElement>(null);

  const frameCount = SECTION3_FRAMES.length; // 42 frames
  const frameCache = useRef<Array<HTMLImageElement | null>>(Array(frameCount).fill(null));
  const currentFrameRef = useRef(0);
  const imgW = useRef(1920);
  const imgH = useRef(1080);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const paint = (src: HTMLImageElement) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = src.naturalWidth || imgW.current;
      const ih = src.naturalHeight || imgH.current;
      const scale = Math.max(cw / iw, ch / ih);
      const sw = iw * scale;
      const sh = ih * scale;
      // In portrait mobile, keep the central clinic space and illuminated circular emblem in view
      const focalX = cw < ch ? 0.68 : 0.5;
      const dx = (cw - sw) * focalX;
      const dy = (ch - sh) / 2;
      ctx.drawImage(src, dx, dy, sw, sh);
    };

    const target = frameCache.current[index];
    if (target?.complete && target.naturalWidth > 0) {
      paint(target);
      return;
    }

    for (let delta = 1; delta < frameCount; delta++) {
      for (const dir of [-1, 1]) {
        const alt = index + dir * delta;
        if (alt >= 0 && alt < frameCount) {
          const altImg = frameCache.current[alt];
          if (altImg?.complete && altImg.naturalWidth > 0) {
            paint(altImg);
            return;
          }
        }
      }
    }
  }, [frameCount]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    if (w === 0 || h === 0) return;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  const loadFrames = useCallback((onFirstReady: () => void) => {
    const cache = frameCache.current;
    let firstNotified = false;

    const loadOne = (i: number) => {
      if (cache[i]) return;
      const img = new window.Image();
      img.decoding = "async";
      img.onload = () => {
        if (i === 0) {
          imgW.current = img.naturalWidth || 1920;
          imgH.current = img.naturalHeight || 1080;
        }
        if (img.decode) {
          img.decode().catch(() => {}).finally(() => {
            if (!firstNotified && cache[0]?.complete && cache[0].naturalWidth > 0) {
              firstNotified = true;
              onFirstReady();
            }
          });
        } else if (!firstNotified && cache[0]?.complete && cache[0].naturalWidth > 0) {
          firstNotified = true;
          onFirstReady();
        }
      };
      img.src = SECTION3_FRAMES[i];
      cache[i] = img;
    };

    loadOne(0);

    const eagerCount = Math.min(8, frameCount);
    for (let i = 1; i < eagerCount; i++) {
      loadOne(i);
    }

    if (cache[0]?.complete && cache[0].naturalWidth > 0) {
      firstNotified = true;
      onFirstReady();
    }

    let nextIdx = eagerCount;
    const CHUNK_SIZE = 8;
    const loadRemaining = () => {
      const end = Math.min(nextIdx + CHUNK_SIZE, frameCount);
      for (let i = nextIdx; i < end; i++) {
        loadOne(i);
      }
      nextIdx = end;
      if (nextIdx < frameCount) {
        if ("requestIdleCallback" in window) {
          (window as Window & typeof globalThis).requestIdleCallback(loadRemaining, { timeout: 1500 });
        } else {
          setTimeout(loadRemaining, 80);
        }
      }
    };

    if ("requestIdleCallback" in window) {
      (window as Window & typeof globalThis).requestIdleCallback(loadRemaining, { timeout: 1500 });
    } else {
      setTimeout(loadRemaining, 100);
    }
  }, [frameCount]);

  const prioritizeNear = useCallback((targetIndex: number) => {
    const cache = frameCache.current;
    const start = Math.max(0, targetIndex - 4);
    const end = Math.min(frameCount - 1, targetIndex + 4);
    for (let i = start; i <= end; i++) {
      if (!cache[i]) {
        const img = new window.Image();
        img.decoding = "async";
        img.src = SECTION3_FRAMES[i];
        cache[i] = img;
      }
    }
  }, [frameCount]);

  useEffect(() => {
    const track = trackRef.current;
    const canvas = canvasRef.current;
    if (!track || !canvas) return;

    resizeCanvas();

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const ro = new ResizeObserver(() => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resizeCanvas();
        ScrollTrigger.refresh();
      }, 100);
    });
    ro.observe(canvas);

    loadFrames(() => {
      drawFrame(0);
    });

    ensureScrollTriggerRegistered();

    const ctx = gsap.context(() => {
      const beliefBeat = beliefBeatRef.current;
      const transitionOverlay = transitionOverlayRef.current;
      if (!beliefBeat) return;

      // Belief text starts visible on entry into Section 3
      gsap.set(beliefBeat, { autoAlpha: 1, y: 0 });

      // Restrained warm ivory transition overlay softly clears as Section 3 engages
      if (transitionOverlay) {
        gsap.set(transitionOverlay, { autoAlpha: 1 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Normalized progress 0 -> 1 maps across all 42 interior frames
            const target = Math.min(
              frameCount - 1,
              Math.max(0, Math.round(self.progress * (frameCount - 1))),
            );
            if (target !== currentFrameRef.current) {
              currentFrameRef.current = target;
              prioritizeNear(target);
              drawFrame(target);
            }
          },
        },
      });

      // Restrained transition: subtle warm ivory veil fades out in the first 8% of scroll
      if (transitionOverlay) {
        tl.to(
          transitionOverlay,
          {
            autoAlpha: 0,
            ease: "power1.out",
            duration: 0.08,
          },
          0,
        );
      }

      // Section 3 text stays prominent and readable through the end of the scene
      tl.to(beliefBeat, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.1);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    }, track);

    return () => {
      ctx.revert();
      ro.disconnect();
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  }, [drawFrame, loadFrames, prioritizeNear, resizeCanvas, frameCount]);

  return (
    <div
      ref={trackRef}
      className="relative h-[130svh] lg:h-[140svh]"
    >
      <div className="sticky top-0 z-0 h-svh w-full overflow-hidden bg-paper-dim">
        {/* Canvas background for clinic interior frames */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
          style={{ display: "block" }}
        />

        {/* Restrained warm ivory transition veil between Section 2 and Section 3 */}
        <div
          ref={transitionOverlayRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-5 bg-paper"
        />

        {/* Wayfinding chapter numerals */}
        <div className="pointer-events-none absolute top-1/2 right-3 z-20 flex -translate-y-1/2 flex-col items-end gap-6 sm:right-6">
          <span className="font-display text-[11px] sm:text-xs font-semibold tracking-wider text-ink/80 tabular-nums">
            03
          </span>
        </div>

        {/* ── Section 3 (Belief / Our Approach) — Left-side text over soft left-to-right editorial gradient wash ── */}
        <div
          ref={beliefBeatRef}
          id={BEATS[2].cinematicId}
          data-cinematic-beat={BEATS[2].cinematicId}
          data-about-copy={BEATS[2].key}
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-start"
        >
          {/* Directional soft warm ivory gradient wash */}
          <EditorialGradientWash alignment="left" blush />

          <div className="w-full px-5 sm:px-8 md:px-12 lg:pl-[10vw] lg:pr-8 xl:pl-[11vw]">
            <div className="pointer-events-auto relative max-w-[520px] xl:max-w-[560px]">
              <p className="eyebrow text-ink tracking-[var(--tracking-wider)]">{aboutBelief.eyebrow}</p>
              <h2 className="mt-4 sm:mt-5 text-[clamp(1.85rem,1.35rem+2vw,3rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
                {aboutBelief.heading}
              </h2>
              <div className="mt-5 sm:mt-6 space-y-3.5 text-sm sm:text-base xl:text-[1.0625rem] leading-[1.7] text-ink-soft">
                {aboutBelief.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
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
          <div className="flex items-center justify-between gap-4">
            <p className="eyebrow text-ink tracking-[var(--tracking-wider)]">
              {aboutFounderIntro.eyebrow}
            </p>
            <span className="font-display text-[11px] sm:text-xs font-semibold tracking-wider text-ink/70 tabular-nums">
              04
            </span>
          </div>
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
                  src="/images/web-ready/founder.JPG"
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
              <div className="flex items-center justify-between gap-4">
                <p className="eyebrow text-ink tracking-[var(--tracking-wider)]">
                  {aboutFounderIntro.eyebrow}
                </p>
                <span className="font-display text-[11px] sm:text-xs font-semibold tracking-wider text-ink/70 tabular-nums">
                  04
                </span>
              </div>
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
// Editorial Gradient Wash — directional soft warm ivory gradient (no card boundaries/blur)
// ---------------------------------------------------------------------------

function EditorialGradientWash({
  alignment = "left",
  blush = false,
}: {
  alignment?: "left" | "right";
  blush?: boolean;
}) {
  const baseRgb = blush ? "252, 246, 243" : "250, 246, 242";

  // Directional editorial warm ivory gradient fading smoothly into image transparency
  const gradient =
    alignment === "left"
      ? `linear-gradient(90deg,
          rgba(${baseRgb}, 0.98) 0%,
          rgba(${baseRgb}, 0.94) 38%,
          rgba(${baseRgb}, 0.76) 58%,
          rgba(${baseRgb}, 0.35) 76%,
          rgba(${baseRgb}, 0.10) 88%,
          rgba(${baseRgb}, 0) 100%)`
      : `linear-gradient(270deg,
          rgba(${baseRgb}, 0.98) 0%,
          rgba(${baseRgb}, 0.94) 38%,
          rgba(${baseRgb}, 0.76) 58%,
          rgba(${baseRgb}, 0.35) 76%,
          rgba(${baseRgb}, 0.10) 88%,
          rgba(${baseRgb}, 0) 100%)`;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 ${
        alignment === "left" ? "left-0" : "right-0"
      } -z-10 w-[90%] sm:w-[84%] md:w-[74vw] lg:w-[62vw] xl:w-[56vw]`}
      style={{
        background: gradient,
      }}
    />
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
        posterSrc={SECTION1_FRAMES[0]}
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
        posterSrc={SECTION1_FRAMES[70]}
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
        posterSrc={SECTION3_FRAMES[35]}
        alt="The Birthwave clinic interior — welcoming warm space and illuminated circular emblem"
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
        posterSrc="/images/web-ready/founder.JPG"
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
