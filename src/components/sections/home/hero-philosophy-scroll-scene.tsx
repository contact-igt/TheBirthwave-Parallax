"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { preload } from "react-dom";
import { ArrowDown } from "lucide-react";
import { hero, philosophy } from "@/content/site-content";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import { useReducedMotion } from "@/motion/reduced-motion";
import {
  ensureScrollTriggerRegistered,
  gsap,
  ScrollTrigger,
  SIGNATURE_EASE,
} from "@/motion/gsap-scroll";
import { cx } from "@/lib/cx";
import { createSceneDebug } from "@/motion/scene-debug";
import { SceneDebugOverlay } from "@/motion/scene-debug-overlay";
import { CareWaveBackground } from "@/components/ui/backgrounds/care-wave-background";

// ---------------------------------------------------------------------------
// Frame sequence — public/images/hero-frames (50 WebP frames per set)
// ---------------------------------------------------------------------------

const FRAME_COUNT = 50;

/**
 * Set selection by viewport width:
 * <768px uses mobile portrait set (720x1280), >=768px uses desktop (1920x1080).
 */
const getFrameSrc = (index: number, isMobile = false) =>
  `/images/hero-frames/${isMobile ? "mobile" : "desktop"}/frame_${String(index + 1).padStart(6, "0")}.webp`;

/** rAF smoothing: exponential approach toward ScrollTrigger's raw progress. */
const LERP_TAU = 8;
const SNAP = 0.002;

const DEBUG_LABEL = "HeroPhilosophyScene";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

type Bucket = "desktop" | "tablet" | "mobile";

/** Text travel per breakpoint — the frames carry the motion, text barely moves. */
const TEXT_MOTION: Record<Bucket, { heroY: number; philosophyY: number }> = {
  desktop: { heroY: -20, philosophyY: 24 },
  tablet: { heroY: -16, philosophyY: 20 },
  mobile: { heroY: -12, philosophyY: 16 },
};

/** "Scroll to discover" cue (below 1024px only) fades out early. */
const SCROLL_CUE_FADE: readonly [number, number] = [0.05, 0.13];

function getBucket(): Bucket {
  const w = window.innerWidth;
  if (w >= 1024) return "desktop";
  if (w >= 768) return "tablet";
  return "mobile";
}

/**
 * Focal panning parameters when drawing landscape desktop frames on tablet.
 */
const FOCAL_HERO = { fx: 0.8, ax: 0.66 };
const FOCAL_PHILOSOPHY = { fx: 0.22, ax: 0.5 };
const FOCAL_PAN_FROM = 0.56;
const FOCAL_PAN_TO = 0.72;

function focalFor(frame: number) {
  const at = frame / (FRAME_COUNT - 1);
  const t = Math.min(1, Math.max(0, (at - FOCAL_PAN_FROM) / (FOCAL_PAN_TO - FOCAL_PAN_FROM)));
  const e = t * t * (3 - 2 * t);
  return {
    fx: FOCAL_HERO.fx + (FOCAL_PHILOSOPHY.fx - FOCAL_HERO.fx) * e,
    ax: FOCAL_HERO.ax + (FOCAL_PHILOSOPHY.ax - FOCAL_HERO.ax) * e,
  };
}

/** [start, duration] on the master progress for each text beat. */
type TextTiming = Record<
  | "heroBody" | "heroCta" | "heroEyebrow" | "heroHeading" | "heroScrim"
  | "philScrim" | "philEyebrow" | "phil1" | "phil2" | "phil3" | "philClosing",
  readonly [number, number]
>;

const TIMING_DEFAULT: TextTiming = {
  heroBody: [0.12, 0.1],
  heroCta: [0.15, 0.1],
  heroEyebrow: [0.20, 0.1],
  heroHeading: [0.25, 0.12],
  heroScrim: [0.28, 0.12],
  philScrim: [0.56, 0.09],
  philEyebrow: [0.60, 0.08],
  phil1: [0.64, 0.08],
  phil2: [0.72, 0.08],
  phil3: [0.80, 0.08],
  philClosing: [0.87, 0.09],
};

const TIMING_MOBILE: TextTiming = {
  heroBody: [0.13, 0.1],
  heroCta: [0.16, 0.1],
  heroEyebrow: [0.21, 0.1],
  heroHeading: [0.25, 0.12],
  heroScrim: [0.28, 0.12],
  philScrim: [0.55, 0.09],
  philEyebrow: [0.59, 0.08],
  phil1: [0.63, 0.08],
  phil2: [0.71, 0.08],
  phil3: [0.79, 0.08],
  philClosing: [0.86, 0.09],
};

const NARRATIVE_STATEMENT_CLASS =
  "text-balance text-h2 !leading-[1.12] font-semibold tracking-[var(--tracking-tight)]";

/**
 * HeroPhilosophyScrollScene — pinned scene for Home Hero → Philosophy.
 */
export function HeroPhilosophyScrollScene() {
  const reducedMotion = useReducedMotion();
  return (
    <>
      {reducedMotion ? <ReducedMotionScene /> : <AnimatedScene />}
      <SceneDebugOverlay label={DEBUG_LABEL} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Animated scene
// ---------------------------------------------------------------------------

function AnimatedScene() {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const sceneGroupRef = useRef<HTMLDivElement>(null);

  // Preload frame 1 immediately as high-priority images
  preload(getFrameSrc(0, false), { as: "image", fetchPriority: "high" });
  preload(getFrameSrc(0, true), { as: "image", fetchPriority: "high" });

  useEffect(() => {
    const track = trackRef.current;
    const canvas = canvasRef.current;
    if (!track || !canvas) return;
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return;

    const debug = createSceneDebug(DEBUG_LABEL);
    debug.update({
      mode: "frame scrub",
      reducedMotion: window.matchMedia(REDUCED_MOTION_QUERY).matches,
    });

    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) {
      debug.warn("canvas.getContext('2d') returned null — showing CSS poster frame only.");
    }

    ensureScrollTriggerRegistered();

    const q = (selector: string) => track.querySelector<HTMLElement>(selector);
    const heroEyebrow = q("[data-hero-eyebrow]");
    const heroHeading = q("[data-hero-heading]");
    const heroBody = q("[data-hero-body]");
    const heroCta = q("[data-hero-cta]");
    const heroScrim = q("[data-hero-scrim]");
    const scrollCue = q("[data-hero-scroll-cue]");
    const philScrim = q("[data-philosophy-scrim]");
    const philEyebrow = q("[data-philosophy-eyebrow]");
    const phil1 = q("[data-philosophy-statement-1]");
    const phil2 = q("[data-philosophy-statement-2]");
    const phil3 = q("[data-philosophy-statement-3]");
    const philClosing = q("[data-philosophy-closing]");
    const stage = stageRef.current;
    const sceneGroup = sceneGroupRef.current;

    if (
      !heroEyebrow || !heroHeading || !heroBody || !heroCta || !heroScrim || !philScrim ||
      !philEyebrow || !phil1 || !phil2 || !phil3 || !philClosing || !stage || !sceneGroup
    ) {
      debug.warn("Animation targets missing — scrub not initialised.");
      debug.destroy();
      return;
    }

    const philTargets = [philEyebrow, phil1, phil2, phil3, philClosing];
    const allTargets = [
      heroEyebrow, heroHeading, heroBody, heroCta, heroScrim,
      philScrim, ...philTargets,
      ...(scrollCue ? [scrollCue] : []),
    ];

    let bucket = getBucket();
    let isMobile = window.innerWidth < 768;
    canvas.style.backgroundImage = `url(${getFrameSrc(0, isMobile)})`;

    // ── Frame cache ─────────────────────────────────────────────────────────
    const cache: Array<HTMLImageElement | null> = new Array(FRAME_COUNT).fill(null);
    const loaded = new Uint8Array(FRAME_COUNT);
    let disposed = false;
    let drawnIndex = -1;
    let wantedIndex = 0;
    let loadedCount = 0;
    let firstPaintLogged = false;
    const failed: string[] = [];
    const timers: number[] = [];

    function nearestLoaded(index: number): number {
      if (loaded[index]) return index;
      for (let d = 1; d < FRAME_COUNT; d++) {
        const lo = index - d;
        const hi = index + d;
        if (lo >= 0 && loaded[lo]) return lo;
        if (hi < FRAME_COUNT && loaded[hi]) return hi;
      }
      return -1;
    }

    function draw(index: number, force = false) {
      const i = nearestLoaded(index);
      if (i < 0 || (i === drawnIndex && !force)) return;
      const img = cache[i];
      if (!img || !canvas || !ctx2d) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      if (cw === 0 || ch === 0 || iw === 0 || ih === 0) return;

      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      let dx = (cw - dw) / 2;

      // On tablet/desktop landscape viewports, follow focal point
      if (!isMobile && bucket !== "desktop") {
        const { fx, ax } = focalFor(i);
        dx = Math.min(0, Math.max(cw - dw, ax * cw - fx * dw));
      }

      ctx2d.drawImage(img, dx, (ch - dh) / 2, dw, dh);
      drawnIndex = i;
      if (!firstPaintLogged) {
        firstPaintLogged = true;
        debug.info(`first frame painted: ${getFrameSrc(i, isMobile)}`, { canvas: `${cw}x${ch}` });
      }
    }

    function loadFrame(index: number): Promise<void> {
      if (cache[index]) return Promise.resolve();
      const img = new window.Image();
      img.decoding = "async";
      cache[index] = img;
      const src = getFrameSrc(index, isMobile);

      const markLoaded = () => {
        if (disposed) return;
        loaded[index] = 1;
        loadedCount++;
        debug.update({ loaded: `${loadedCount}/${FRAME_COUNT}` });
        if (drawnIndex !== wantedIndex) draw(wantedIndex);
      };

      const markFailed = () => {
        if (disposed) return;
        failed.push(src);
        debug.warn(`frame failed to load: ${src}`);
        debug.update({ failed: failed.length, lastFailed: src });
      };

      img.src = src;
      return img.decode().then(markLoaded, () => {
        if (img.complete && img.naturalWidth > 0) markLoaded();
        else markFailed();
      });
    }

    /**
     * Draw frame 1 immediately as a priority image, then load the rest in order
     * in the background without blocking first paint on the sequence.
     */
    async function preloadFrames() {
      // 1. Frame 1 loads immediately and paints priority
      await loadFrame(0);
      if (disposed) return;
      draw(wantedIndex, true);

      // 2. Stream the rest sequentially in order in the background
      for (let i = 1; i < FRAME_COUNT; i++) {
        if (disposed) return;
        await loadFrame(i);
        if (i % 2 === 0) {
          await new Promise<void>((r) => timers.push(window.setTimeout(r, 8)));
        }
      }
      debug.info(
        `frame preload finished: ${loadedCount}/${FRAME_COUNT} loaded, ${failed.length} failed`,
        failed.length ? failed : undefined,
      );
    }

    // ── Canvas sizing: backing store sized to devicePixelRatio, capped at 2 ──
    function sizeCanvas() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      let cssW = canvas.clientWidth;
      let cssH = canvas.clientHeight;
      if (cssW === 0 || cssH === 0) {
        cssW = window.innerWidth;
        cssH = window.innerHeight;
      }
      const w = Math.round(cssW * dpr);
      const h = Math.round(cssH * dpr);
      debug.update({ canvas: `${w}x${h} (css ${cssW}x${cssH}, dpr ${dpr})` });
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      draw(wantedIndex, true);
    }

    // ── Text timeline ───────────────────────────────────────────────────────
    let tl: gsap.core.Timeline | null = null;

    function buildTimeline() {
      tl?.kill();
      gsap.set(allTargets, { clearProps: "opacity,visibility,transform" });
      const { heroY, philosophyY } = TEXT_MOTION[bucket];
      const timing = bucket === "mobile" ? TIMING_MOBILE : TIMING_DEFAULT;
      gsap.set(philTargets, { opacity: 0, y: philosophyY });
      gsap.set(philScrim, { opacity: 0 });

      const t = gsap.timeline({ paused: true, defaults: { ease: "power1.inOut" } });

      const at = (key: keyof TextTiming) => timing[key][0];
      const dur = (key: keyof TextTiming) => timing[key][1];
      if (scrollCue) t.to(scrollCue, { opacity: 0, duration: SCROLL_CUE_FADE[1] }, SCROLL_CUE_FADE[0]);
      t.to(heroBody, { opacity: 0, y: heroY, duration: dur("heroBody") }, at("heroBody"));
      t.to(heroCta, { autoAlpha: 0, y: heroY, duration: dur("heroCta") }, at("heroCta"));
      t.to(heroEyebrow, { opacity: 0, y: heroY, duration: dur("heroEyebrow") }, at("heroEyebrow"));
      t.to(heroHeading, { opacity: 0, y: heroY, duration: dur("heroHeading") }, at("heroHeading"));
      t.to(heroScrim, { opacity: 0, duration: dur("heroScrim") }, at("heroScrim"));

      t.to(philScrim, { opacity: 1, duration: dur("philScrim") }, at("philScrim"));
      const reveal = { opacity: 1, y: 0, ease: SIGNATURE_EASE };
      t.to(philEyebrow, { ...reveal, duration: dur("philEyebrow") }, at("philEyebrow"));
      t.to(phil1, { ...reveal, duration: dur("phil1") }, at("phil1"));
      t.to(phil2, { ...reveal, duration: dur("phil2") }, at("phil2"));
      t.to(phil3, { ...reveal, duration: dur("phil3") }, at("phil3"));
      t.to(philClosing, { ...reveal, duration: dur("philClosing") }, at("philClosing"));
      t.set({}, {}, 1);
      t.progress(currentProgress);
      tl = t;
    }

    // ── Smoothed progress loop (single rAF) ──────────────────────────────────
    let targetProgress = 0;
    let currentProgress = 0;
    let heldProgress: number | null = null;
    let rafId = 0;
    let lastTime = 0;

    function tick(now: number) {
      rafId = 0;
      const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.1) : 1 / 60;
      lastTime = now;
      currentProgress +=
        (targetProgress - currentProgress) * (1 - Math.exp(-dt * LERP_TAU));
      if (Math.abs(targetProgress - currentProgress) < SNAP) {
        currentProgress = targetProgress;
      }
      render();
      if (currentProgress !== targetProgress) {
        rafId = requestAnimationFrame(tick);
      } else {
        lastTime = 0;
      }
    }

    function render() {
      tl?.progress(currentProgress);
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.round(currentProgress * (FRAME_COUNT - 1))),
      );
      if (frameIndex !== wantedIndex || drawnIndex !== frameIndex) {
        wantedIndex = frameIndex;
        draw(frameIndex);
      }
      if (debug.verbose) {
        debug.update(
          {
            progress: currentProgress.toFixed(3),
            target: targetProgress.toFixed(3),
            frame: `${wantedIndex + 1}/${FRAME_COUNT} (drawn ${drawnIndex + 1})`,
            rafRunning: currentProgress !== targetProgress,
          },
          true,
        );
      }
    }

    function kick() {
      if (!rafId) rafId = requestAnimationFrame(tick);
    }

    // ── ScrollTrigger ───────────────────────────────────────────────────────
    const st = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        if (heldProgress !== null) return;
        targetProgress = self.progress;
        kick();
      },
      onToggle: (self) => debug.update({ stActive: self.isActive }),
      onRefresh: (self) =>
        debug.update({ stStart: Math.round(self.start), stEnd: Math.round(self.end) }),
    });

    targetProgress = currentProgress = st.progress;
    wantedIndex = Math.min(
      FRAME_COUNT - 1,
      Math.max(0, Math.round(currentProgress * (FRAME_COUNT - 1))),
    );

    buildTimeline();
    sizeCanvas();

    debug.update({
      stActive: st.isActive,
      stStart: Math.round(st.start),
      stEnd: Math.round(st.end),
      progress: currentProgress.toFixed(3),
    });

    void preloadFrames().then(() => {
      if (!disposed) draw(wantedIndex);
    });
    void loadFrame(wantedIndex);

    // ── Resize / orientation ─────────────────────────────────────────────────
    let resizeTimer = 0;
    function onResize() {
      if (!canvas) return;
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        bucket = getBucket();
        const newIsMobile = window.innerWidth < 768;
        if (newIsMobile !== isMobile) {
          isMobile = newIsMobile;
          cache.fill(null);
          loaded.fill(0);
          loadedCount = 0;
          drawnIndex = -1;
          canvas.style.backgroundImage = `url(${getFrameSrc(0, isMobile)})`;
          void preloadFrames();
        }
        sizeCanvas();
        buildTimeline();
      }, 150);
    }

    let orientationTimer = 0;
    function onOrientation() {
      if (!canvas) return;
      if (heldProgress === null) heldProgress = currentProgress;
      window.clearTimeout(orientationTimer);
      orientationTimer = window.setTimeout(() => {
        const held = heldProgress ?? currentProgress;
        bucket = getBucket();
        const newIsMobile = window.innerWidth < 768;
        if (newIsMobile !== isMobile) {
          isMobile = newIsMobile;
          cache.fill(null);
          loaded.fill(0);
          loadedCount = 0;
          drawnIndex = -1;
          canvas.style.backgroundImage = `url(${getFrameSrc(0, isMobile)})`;
          void preloadFrames();
        }
        sizeCanvas();
        ScrollTrigger.refresh();
        buildTimeline();
        if (held > 0 && held < 1) {
          window.scrollTo({ top: st.start + held * (st.end - st.start), behavior: "instant" });
        }
        targetProgress = currentProgress = held;
        heldProgress = null;
        render();
      }, 300);
    }

    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onOrientation);

    return () => {
      disposed = true;
      if (rafId) cancelAnimationFrame(rafId);
      window.clearTimeout(resizeTimer);
      window.clearTimeout(orientationTimer);
      timers.forEach((t) => window.clearTimeout(t));
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onOrientation);
      st.kill();
      tl?.kill();
      gsap.set(allTargets, { clearProps: "opacity,visibility,transform" });
      cache.forEach((img) => {
        if (img) {
          img.onload = null;
          img.onerror = null;
        }
      });
      cache.length = 0;
      debug.destroy();
    };
  }, []);

  return (
    <div ref={sceneGroupRef} className="group/scene contents">
      <div
        ref={trackRef}
        data-home-scene="hero-philosophy"
        className="relative isolate h-[170vh] bg-paper md:h-[210vh] lg:h-[270vh]"
      >
        <div
          ref={stageRef}
          className="sticky top-0 h-screen w-full overflow-hidden bg-paper supports-[height:100dvh]:h-dvh"
        >
          {/* Frame layer: CSS background is frame 1 so the stage never blanks before canvas paints */}
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="absolute inset-0 z-0 h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${getFrameSrc(0, false)})` }}
          />

          <HeroContent />
          <PhilosophyContent animated />

          {/* Faint wave near the lower edge */}
          <CareWaveBackground preset="hero-lower" />

          {/* Below 1024px only; fades out early */}
          <p
            data-hero-scroll-cue
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[calc(env(safe-area-inset-bottom)+1.5rem)] left-(--space-gutter) z-20 flex items-center gap-2 font-body text-[0.6875rem] font-semibold tracking-[var(--tracking-wider)] text-ink-soft uppercase lg:hidden"
          >
            <ArrowDown aria-hidden="true" className="size-3.5" />
            {hero.scrollCue}
          </p>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Real Hero / Philosophy content
// ---------------------------------------------------------------------------

function HeroContent({ className }: { className?: string }) {
  return (
    <section
      id="hero-section"
      aria-label="Introduction"
      className={cx("absolute inset-0 z-10", className)}
    >
      {/* On screens <640px, paper gradient is anchored at bottom behind copy, leaving faces clear */}
      <div
        data-hero-scrim
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-full max-w-2xl max-sm:inset-x-0 max-sm:top-auto max-sm:bottom-0 max-sm:h-[70%] max-sm:max-w-none max-sm:bg-[linear-gradient(0deg,var(--color-paper)_0%,rgba(250,246,242,0.92)_45%,rgba(250,246,242,0.6)_70%,transparent_100%)] sm:bg-[linear-gradient(90deg,var(--color-paper)_0%,color-mix(in_srgb,var(--color-paper)_86%,transparent)_55%,color-mix(in_srgb,var(--color-paper)_40%,transparent)_80%,transparent_100%)]"
      />

      {/* On screens <640px, place hero copy in lower part of the screen */}
      <div className="container-birthwave relative z-20 flex h-full items-center max-sm:items-end max-sm:pb-[max(2rem,calc(env(safe-area-inset-bottom)+2rem))] [padding-block:var(--header-height)]">
        <div className="motion-rise-in max-w-lg">
          <p data-hero-eyebrow className="eyebrow mt-6 max-sm:mt-0">
            {hero.eyebrow}
          </p>

          <h1
            data-hero-heading
            className="mt-3 text-balance text-display font-semibold"
          >
            <span className="block font-medium text-ink-soft">
              {hero.headlineLead}
            </span>
            <span className="block serif-emphasis text-ink">
              {hero.headlineEmphasis}
            </span>
          </h1>

          <p
            data-hero-body
            className="mt-5 max-w-md text-lg leading-[var(--leading-relaxed)] text-ink-soft"
          >
            {hero.subhead}
          </p>

          <div data-hero-cta className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
            <Button href={hero.primaryCta.href} variant="primary">
              {hero.primaryCta.label}
            </Button>
            <CtaLink href={hero.secondaryCta.href} className="text-base text-ink-soft hover:text-ink">
              {hero.secondaryCta.label}
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhilosophyContent({
  animated,
  className,
}: {
  animated?: boolean;
  className?: string;
}) {
  const hidden = animated ? { opacity: 0 } : undefined;
  return (
    <section
      id="philosophy"
      aria-labelledby="philosophy-heading"
      className={cx(
        "pointer-events-none absolute inset-0 z-20 flex items-center max-sm:items-end max-lg:portrait:items-end",
        className,
      )}
    >
      {/* On screens <640px, paper gradient anchors at bottom so faces remain unobstructed */}
      <div
        data-philosophy-scrim
        aria-hidden="true"
        style={hidden}
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,246,242,0.80)_0%,rgba(250,246,242,0.70)_55%,rgba(250,246,242,0.45)_100%)] max-sm:bg-[linear-gradient(0deg,var(--color-paper)_0%,rgba(250,246,242,0.92)_45%,rgba(250,246,242,0.6)_70%,transparent_100%)] max-lg:portrait:bg-[linear-gradient(180deg,rgba(250,246,242,0)_0%,rgba(250,246,242,0)_30%,rgba(250,246,242,0.74)_50%,rgba(250,246,242,0.88)_100%)] lg:bg-[linear-gradient(90deg,rgba(250,246,242,0)_0%,rgba(250,246,242,0)_34%,rgba(250,246,242,0.64)_50%,rgba(250,246,242,0.72)_100%)]"
      />

      <div className="container-birthwave relative w-full [padding-block:var(--header-height)] max-sm:pb-[max(2rem,calc(env(safe-area-inset-bottom)+2rem))] [@media(max-height:800px)]:pb-6 max-lg:portrait:pb-[max(1.75rem,env(safe-area-inset-bottom))]">
        <div className="max-w-xl text-left lg:ml-auto lg:w-[58%] lg:max-w-none xl:w-[52%]">
          <p data-philosophy-eyebrow style={hidden} className="eyebrow">
            {philosophy.eyebrow}
          </p>

          <h2
            data-philosophy-statement-1
            id="philosophy-heading"
            style={hidden}
            className={cx(
              "mt-5 [@media(max-height:800px)]:mt-3 max-md:portrait:mt-3",
              NARRATIVE_STATEMENT_CLASS,
              "text-ink",
            )}
          >
            Pregnancy is more than{" "}
            <span className="serif-emphasis">a series of appointments.</span>
          </h2>

          <div className="mt-8 space-y-6 [@media(max-height:800px)]:mt-5 [@media(max-height:800px)]:space-y-4 max-md:portrait:mt-4 max-md:portrait:space-y-3">
            <p
              data-philosophy-statement-2
              style={hidden}
              className={cx(NARRATIVE_STATEMENT_CLASS, "text-ink-soft")}
            >
              {philosophy.messages[1].text}
            </p>
            <p
              data-philosophy-statement-3
              style={hidden}
              className={cx(NARRATIVE_STATEMENT_CLASS, "text-ink-soft")}
            >
              {philosophy.messages[2].text}
            </p>
          </div>

          <p
            data-philosophy-closing
            style={hidden}
            className="mt-10 [@media(max-height:800px)]:mt-6 max-md:portrait:mt-5 text-balance text-[clamp(1.6rem,1.3rem+1.4vw,2.25rem)] leading-[1.2] font-semibold tracking-[var(--tracking-wide)] text-terracotta-deep uppercase"
          >
            {philosophy.resolution}
          </p>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Reduced motion: short opacity-only crossfade
// ---------------------------------------------------------------------------

function ReducedMotionScene() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const debug = createSceneDebug(DEBUG_LABEL);
    debug.info(
      "prefers-reduced-motion: reduce is ON → frame scrub disabled; short opacity-only crossfade instead.",
      { matchMedia: window.matchMedia(REDUCED_MOTION_QUERY).matches },
    );
    debug.update({
      mode: "reduced-motion transition",
      reason: "prefers-reduced-motion: reduce",
      reducedMotion: true,
    });

    const q = (selector: string) => root.querySelector<HTMLElement>(selector);
    const heroImage = q("[data-reduced-hero-image]");
    const philBlock = q("[data-reduced-phil-block]");
    const philImage = q("[data-reduced-phil-image]");
    const philScrim = q("[data-philosophy-scrim]");
    const heroText = root.querySelectorAll<HTMLElement>(
      "[data-hero-eyebrow], [data-hero-heading], [data-hero-body], [data-hero-cta], [data-hero-scrim]",
    );
    const philText = root.querySelectorAll<HTMLElement>(
      "[data-philosophy-eyebrow], [data-philosophy-statement-1], [data-philosophy-statement-2], [data-philosophy-statement-3], [data-philosophy-closing]",
    );

    if (!heroImage || !philBlock || !philImage || !philScrim) {
      debug.destroy();
      return;
    }

    ensureScrollTriggerRegistered();
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const philIn = [philImage, philScrim];

      mm.add("(min-width: 768px)", () => {
        gsap.set(philIn, { autoAlpha: 0 });
        gsap.set(philText, { autoAlpha: 0 });
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) =>
              debug.verbose && debug.update({ progress: self.progress.toFixed(3) }, true),
          },
        });
        tl.to(heroText, { autoAlpha: 0, duration: 0.2 }, 0.35)
          .to(heroImage, { autoAlpha: 0, duration: 0.25 }, 0.4)
          .to(philIn, { autoAlpha: 1, duration: 0.25 }, 0.45)
          .to(philText, { autoAlpha: 1, duration: 0.2 }, 0.65)
          .set({}, {}, 1);
        debug.update({ layout: "short sticky crossfade" });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.set(philIn, { autoAlpha: 0 });
        gsap.set(philText, { autoAlpha: 0 });
        gsap
          .timeline({
            scrollTrigger: {
              trigger: philBlock,
              start: "top 65%",
              toggleActions: "play none none reverse",
            },
          })
          .to(philIn, { autoAlpha: 1, duration: 0.6, ease: "power1.out" })
          .to(philText, { autoAlpha: 1, duration: 0.5, ease: "power1.out" }, "-=0.15");
        debug.update({ layout: "normal flow fade-in" });
      });
    }, root);

    return () => {
      ctx.revert();
      debug.destroy();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      data-home-scene="hero-philosophy-reduced"
      data-scene-reason="prefers-reduced-motion"
      className="relative isolate bg-paper md:h-[170svh] lg:h-[190svh]"
    >
      <div className="relative md:sticky md:top-0 md:h-screen md:overflow-hidden md:supports-[height:100dvh]:h-dvh">
        <div className="relative min-h-svh overflow-hidden md:absolute md:inset-0 md:min-h-0">
          <div data-reduced-hero-image className="absolute inset-0">
            <Image
              src={getFrameSrc(0, false)}
              alt=""
              fill
              loading="eager"
              sizes="100vw"
              className="object-cover object-[80%_50%] lg:object-center"
            />
          </div>
          <HeroContent />
          <CareWaveBackground preset="hero-lower" />
        </div>
        <div
          data-reduced-phil-block
          className="relative min-h-svh overflow-hidden md:pointer-events-none md:absolute md:inset-0 md:min-h-0"
        >
          <div data-reduced-phil-image className="absolute inset-0" style={{ opacity: 0 }}>
            <Image
              src={getFrameSrc(FRAME_COUNT - 1, false)}
              alt=""
              fill
              loading="eager"
              sizes="100vw"
              className="object-cover object-[25%_50%] lg:object-center"
            />
          </div>
          <PhilosophyContent animated />
        </div>
      </div>
    </div>
  );
}
