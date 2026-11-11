"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { preload } from "react-dom";
import { ArrowDown } from "lucide-react";
import { brand, hero, philosophy } from "@/content/site-content";
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
import { getJourneyThreadEntryX, THREAD_MIN_WIDTH } from "./journey-thread";

// ---------------------------------------------------------------------------
// Frame sequence — public/images/hero-frames-v8 (173 WebP frames per set)
// From version_3.mp4 (603 frames @60fps), every 3rd frame, static hold trimmed:
//   frames   1–56    pregnant figure draws in (right)
//   frames  57–76    heart line draws (centre)
//   frames  77–146   mother & baby draw (left) while the pregnant figure un-draws
//   frames 147–173   a line drops from the heart to the bottom centre
// Desktop: 1920x1080. Mobile: 720x1280 crop that pans pregnant figure → heart → mother & baby.
// ---------------------------------------------------------------------------

const FRAME_COUNT = 173;
const FRAME_DRAWN = 55; // 0-based: pregnant figure complete
const FRAME_HEART = 75; // 0-based: heart complete
const FRAME_MOTHER = 145; // 0-based: mother & baby complete, pregnant figure gone

/**
 * Story progress → frame index, as piecewise-linear [progress, frame] stops.
 * Holds let the copy come and go while the drawing stays still.
 *   0.00–0.17  pregnant figure draws            (auto-plays on load)
 *   0.17–0.38  hold: hero copy comes in on the left
 *   0.38–0.50  hero copy fades out as the heart draws
 *   0.50–0.72  mother & baby draw, pregnant figure un-draws
 *   0.72–0.80  hold: philosophy copy starts on the right
 *   0.80–0.92  line drops from the heart toward the Journey section
 */
const FRAME_STOPS: ReadonlyArray<readonly [number, number]> = [
  [0, 0],
  [0.17, FRAME_DRAWN],
  [0.38, FRAME_DRAWN],
  [0.5, FRAME_HEART],
  [0.72, FRAME_MOTHER],
  [0.8, FRAME_MOTHER],
  [0.92, FRAME_COUNT - 1],
  [1, FRAME_COUNT - 1],
];

function frameAt(progress: number): number {
  for (let i = 1; i < FRAME_STOPS.length; i++) {
    const [p1, f1] = FRAME_STOPS[i];
    if (progress <= p1) {
      const [p0, f0] = FRAME_STOPS[i - 1];
      const t = p1 === p0 ? 1 : Math.max(0, (progress - p0) / (p1 - p0));
      return Math.round(f0 + (f1 - f0) * t);
    }
  }
  return FRAME_COUNT - 1;
}

/** Frame shown as the still image when reduced motion is on (pregnant figure fully drawn). */
const POSTER_FRAME = FRAME_DRAWN;

/**
 * All timings above and below are on one "story" progress (0–1).
 * The page opens on the finished pregnant figure (frame FRAME_DRAWN) with the
 * logo large in the centre. Scrolling covers STORY_START → 1: the logo rises
 * into the header, the hero copy comes in, then the drawing continues.
 * Frames before FRAME_DRAWN are never shown or downloaded.
 */
const STORY_START = 0.17; // frame is already FRAME_DRAWN here
const toStory = (scroll: number) => STORY_START + scroll * (1 - STORY_START);
const toScroll = (story: number) => Math.max(0, (story - STORY_START) / (1 - STORY_START));

/** Centred logo travels into the header's logo slot over this story range. */
const LOGO_TRAVEL: readonly [number, number] = [0.17, 0.235];
/** Where the centred logo sits at rest (fraction of the stage height, logo centre). */
// Phone: the photo opens as a smaller arched card in the lower part of the
// screen, and the logo sits centred in the cream space above it (see MOBILE_CARD).
const LOGO_REST_Y = { mobile: 0, tablet: 0.4, desktop: 0.42 } as const;
/** Phone opening: the frame layer starts as an arched card and grows to full screen. */
const MOBILE_CARD = {
  scale: 0.62, // card size at rest (fraction of the screen)
  originY: 0.86, // grows from this point (fraction of the stage height)
  bottomRadius: 24, // px, as seen on screen
  grow: [0.17, 0.225] as readonly [number, number], // story range for the grow
  headerBottom: 64, // px: the logo centres between this and the card's top
} as const;
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Story captions over the drawing: [in start, in dur, out start, out dur]. */
const CAPTION_TIMING = {
  heart: [0.455, 0.035, 0.53, 0.03],
  baby: [0.575, 0.04, 0.69, 0.035],
} as const;

/**
 * Desktop thread: grows out of the heart's bottom point in the final frame
 * (source-frame coords 1920x1080) and runs straight down into the Journey
 * route's entry point, which shifts right when the Journey heading is wide.
 * dx/dy = starting direction.
 */
const SRC_W = 1920;
const SRC_H = 1080;
const THREAD_TAIL = { fx: 0.501, fy: 0.825, dx: 0, dy: 1 };
const THREAD_DRAW: readonly [number, number] = [0.9, 0.98];

/**
 * Set selection by viewport width:
 * <768px uses mobile portrait set (720x1280), >=768px uses desktop (1920x1080).
 */
const getFrameSrc = (index: number, isMobile = false) =>
  `/images/hero-frames-v8/${isMobile ? "mobile" : "desktop"}/frame_${String(index + 1).padStart(6, "0")}.webp`;

/** Native frame size per set; the canvas never renders at a higher resolution than this. */
const FRAME_SIZE = { desktop: [2560, 1440], mobile: [1080, 1920] } as const;

/** Frames fetched/decoded at once. */
const MAX_PARALLEL_LOADS = 6;

type FrameImage = ImageBitmap | HTMLImageElement;
const frameWidth = (f: FrameImage) => ("naturalWidth" in f ? f.naturalWidth : f.width);
const frameHeight = (f: FrameImage) => ("naturalHeight" in f ? f.naturalHeight : f.height);

/**
 * Load order: the opening still, then the heart-drawing frames in sequence
 * (first thing a scroll plays), then the rest coarse-to-fine (every 16th,
 * 8th, 4th, 2nd, then all) so any scroll position has a close frame early.
 */
function buildLoadOrder(): number[] {
  const order: number[] = [];
  const seen = new Uint8Array(FRAME_COUNT);
  const push = (i: number) => {
    if (i >= 0 && i < FRAME_COUNT && !seen[i]) {
      seen[i] = 1;
      order.push(i);
    }
  };
  for (let i = FRAME_DRAWN; i <= FRAME_HEART; i++) push(i);
  push(FRAME_COUNT - 1);
  for (const stride of [16, 8, 4, 2, 1]) {
    for (let i = FRAME_DRAWN; i < FRAME_COUNT; i += stride) push(i);
  }
  return order;
}

/**
 * Decode off the main thread into a GPU-ready ImageBitmap where supported,
 * so drawing a frame during scroll never triggers a synchronous decode.
 */
async function decodeFrame(src: string, signal: AbortSignal): Promise<FrameImage> {
  if (typeof window.createImageBitmap === "function") {
    const res = await fetch(src, { signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return createImageBitmap(await res.blob());
  }
  const img = new window.Image();
  img.decoding = "async";
  img.src = src;
  await img.decode();
  return img;
}

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

/** "Scroll to discover" cue: shown on arrival, leaves on first scroll. */
const SCROLL_CUE_OUT: readonly [number, number] = [0.172, 0.025];

/** [start, duration] for the hero copy coming in as the logo settles into the header. */
const HERO_IN: Record<"heroScrim" | "heroEyebrow" | "heroHeading" | "heroBody" | "heroCta", readonly [number, number]> = {
  heroScrim: [0.21, 0.07],
  heroEyebrow: [0.215, 0.06],
  heroHeading: [0.23, 0.07],
  heroBody: [0.25, 0.06],
  heroCta: [0.265, 0.06],
};

function getBucket(): Bucket {
  const w = window.innerWidth;
  if (w >= 1024) return "desktop";
  if (w >= 768) return "tablet";
  return "mobile";
}

/**
 * Focal panning parameters when drawing landscape desktop frames on tablet.
 */
const FOCAL_HERO = { fx: 0.79, ax: 0.66 };
const FOCAL_PHILOSOPHY = { fx: 0.18, ax: 0.5 };
const FOCAL_PAN_FROM = 0.32; // frame 55 / 172
const FOCAL_PAN_TO = 0.58; // ~frame 100 / 172

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
  heroBody: [0.38, 0.05],
  heroCta: [0.38, 0.05],
  heroEyebrow: [0.39, 0.05],
  heroHeading: [0.40, 0.05],
  heroScrim: [0.41, 0.05],
  philScrim: [0.78, 0.06],
  philEyebrow: [0.80, 0.05],
  phil1: [0.83, 0.05],
  phil2: [0.87, 0.05],
  phil3: [0.91, 0.05],
  philClosing: [0.94, 0.05],
};

const TIMING_MOBILE: TextTiming = {
  heroBody: [0.38, 0.05],
  heroCta: [0.38, 0.05],
  heroEyebrow: [0.39, 0.05],
  heroHeading: [0.40, 0.05],
  heroScrim: [0.41, 0.05],
  philScrim: [0.77, 0.06],
  philEyebrow: [0.79, 0.05],
  phil1: [0.82, 0.05],
  phil2: [0.86, 0.05],
  phil3: [0.90, 0.05],
  philClosing: [0.94, 0.05],
};

/** Short lines that narrate the drawing between the hero and philosophy copy. */
const HERO_CAPTIONS = {
  heart: "Every heartbeat, from the very first.",
  baby: "And every moment after.",
} as const;

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
  const threadSvgRef = useRef<SVGSVGElement>(null);
  const threadPathRef = useRef<SVGPathElement>(null);
  const threadGradRef = useRef<SVGLinearGradientElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  // Preload the opening still (pregnant figure) for the visitor's screen size only.
  preload(getFrameSrc(FRAME_DRAWN, false), { as: "image", fetchPriority: "high", media: "(min-width: 768px)" });
  preload(getFrameSrc(FRAME_DRAWN, true), { as: "image", fetchPriority: "high", media: "(max-width: 767px)" });

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
    const captionHeart = q("[data-hero-caption-heart]");
    const captionBaby = q("[data-hero-caption-baby]");
    const captions = [captionHeart, captionBaby].filter((el): el is HTMLElement => el !== null);
    const threadSvg = threadSvgRef.current;
    const threadPath = threadPathRef.current;
    const threadGrad = threadGradRef.current;
    const philScrim = q("[data-philosophy-scrim]");
    const philEyebrow = q("[data-philosophy-eyebrow]");
    const phil1 = q("[data-philosophy-statement-1]");
    const phil2 = q("[data-philosophy-statement-2]");
    const phil3 = q("[data-philosophy-statement-3]");
    const philClosing = q("[data-philosophy-closing]");
    const stage = stageRef.current;
    const sceneGroup = sceneGroupRef.current;

    // Header pieces the centred logo hands over to (site-header.tsx).
    const header = document.getElementById("top");
    const headerBar = header?.querySelector<HTMLElement>("[data-header-bar]") ?? null;
    const headerLogo = header?.querySelector<HTMLElement>("[data-header-wordmark]") ?? null;
    const headerLogoImg = headerLogo?.querySelector<HTMLElement>("img") ?? null;
    const heroLogo = logoRef.current;
    const logoGlow = heroLogo?.querySelector<HTMLElement>("[data-hero-logo-glow]") ?? null;

    if (
      !heroEyebrow || !heroHeading || !heroBody || !heroCta || !heroScrim || !philScrim ||
      !philEyebrow || !phil1 || !phil2 || !phil3 || !philClosing || !stage || !sceneGroup
    ) {
      debug.warn("Animation targets missing — scrub not initialised.");
      if (headerLogo) headerLogo.style.visibility = "visible";
      if (heroLogo) heroLogo.style.display = "none";
      debug.destroy();
      return;
    }

    const philTargets = [philEyebrow, phil1, phil2, phil3, philClosing];
    const allTargets = [
      heroEyebrow, heroHeading, heroBody, heroCta, heroScrim,
      philScrim, ...philTargets,
      ...(scrollCue ? [scrollCue] : []),
      ...captions,
    ];

    let bucket = getBucket();
    let isMobile = window.innerWidth < 768;

    // ── Frame cache ─────────────────────────────────────────────────────────
    const cache: Array<FrameImage | null> = new Array(FRAME_COUNT).fill(null);
    const loaded = new Uint8Array(FRAME_COUNT);
    const requested = new Uint8Array(FRAME_COUNT);
    let disposed = false;
    let drawnIndex = -1;
    let wantedIndex = 0;
    let loadedCount = 0;
    let firstPaintLogged = false;
    const failed: string[] = [];
    const timers: number[] = [];
    let queue: number[] = [];
    let activeLoads = 0;
    let generation = 0;
    let abort = new AbortController();

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
      if (!loaded[index] && !requested[index]) prioritize(index);
      const i = nearestLoaded(index);
      if (i < 0 || (i === drawnIndex && !force)) return;
      const img = cache[i];
      if (!img || !canvas || !ctx2d) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = frameWidth(img);
      const ih = frameHeight(img);
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

      ctx2d.imageSmoothingQuality = "high"; // canvas resizes reset this
      ctx2d.drawImage(img, dx, (ch - dh) / 2, dw, dh);
      drawnIndex = i;
      if (!firstPaintLogged) {
        firstPaintLogged = true;
        debug.info(`first frame painted: ${getFrameSrc(i, isMobile)}`, { canvas: `${cw}x${ch}` });
      }
    }

    function loadFrame(index: number): Promise<void> {
      const gen = generation;
      const src = getFrameSrc(index, isMobile);
      return decodeFrame(src, abort.signal).then(
        (img) => {
          if (disposed || gen !== generation) {
            if ("close" in img) img.close();
            return;
          }
          cache[index] = img;
          loaded[index] = 1;
          loadedCount++;
          debug.update({ loaded: `${loadedCount}/${FRAME_COUNT}` });
          // Repaint if this frame is closer to what the scroll wants than what's on screen.
          if (drawnIndex !== wantedIndex) draw(wantedIndex);
        },
        () => {
          if (disposed || gen !== generation) return;
          requested[index] = 0; // allow a retry if it's needed again
          failed.push(src);
          debug.warn(`frame failed to load: ${src}`);
          debug.update({ failed: failed.length, lastFailed: src });
        },
      );
    }

    function pump() {
      while (!disposed && activeLoads < MAX_PARALLEL_LOADS && queue.length > 0) {
        const index = queue.shift()!;
        if (requested[index]) continue;
        requested[index] = 1;
        activeLoads++;
        const gen = generation;
        void loadFrame(index).finally(() => {
          if (gen !== generation) return;
          activeLoads--;
          pump();
        });
      }
    }

    /** The scroll wants a frame that isn't requested yet: fetch it (and the next few) first. */
    function prioritize(index: number) {
      const near = [index, index + 1, index - 1, index + 2, index + 3, index - 2];
      const urgent = near.filter((i) => i >= FRAME_DRAWN && i < FRAME_COUNT && !requested[i]);
      if (urgent.length === 0) return;
      queue = [...urgent, ...queue];
      pump();
    }

    function startLoading() {
      queue = buildLoadOrder();
      prioritize(wantedIndex);
      pump();
    }

    /** Switching frame sets (phone ↔ larger screens): drop everything and start over. */
    function resetFrames() {
      generation++;
      abort.abort();
      abort = new AbortController();
      cache.forEach((img) => {
        if (img && "close" in img) img.close();
      });
      cache.fill(null);
      loaded.fill(0);
      requested.fill(0);
      queue = [];
      activeLoads = 0;
      loadedCount = 0;
      drawnIndex = -1;
      startLoading();
    }

    // ── Canvas sizing: devicePixelRatio, but never above the frames' own
    //    resolution (upscaling past it costs fill-rate and adds no detail) ──
    function sizeCanvas() {
      if (!canvas) return;
      let cssW = canvas.clientWidth;
      let cssH = canvas.clientHeight;
      if (cssW === 0 || cssH === 0) {
        cssW = window.innerWidth;
        cssH = window.innerHeight;
      }
      const [fw, fh] = FRAME_SIZE[isMobile ? "mobile" : "desktop"];
      const nativeRatio = Math.max(1, Math.max(fw / cssW, fh / cssH));
      const dpr = Math.min(window.devicePixelRatio || 1, 2, nativeRatio);
      const w = Math.round(cssW * dpr);
      const h = Math.round(cssH * dpr);
      debug.update({ canvas: `${w}x${h} (css ${cssW}x${cssH}, dpr ${dpr})` });
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      draw(wantedIndex, true);
      layoutThread();
      layoutLogo();
    }

    // ── Desktop thread: heart line → Journey route ─────────────────────────
    let threadLen = 0;

    function layoutThread() {
      if (!threadSvg || !threadPath || !threadGrad || !stage) return;
      const entryX = window.innerWidth >= THREAD_MIN_WIDTH ? getJourneyThreadEntryX() : null;
      if (entryX === null) {
        threadLen = 0;
        threadPath.removeAttribute("d");
        threadSvg.style.opacity = "0";
        return;
      }
      const W = stage.clientWidth;
      const H = stage.clientHeight;
      // Same "cover" fit the canvas uses for desktop frames.
      const scale = Math.max(W / SRC_W, H / SRC_H);
      const ox = (W - SRC_W * scale) / 2;
      const oy = (H - SRC_H * scale) / 2;
      const sx = ox + THREAD_TAIL.fx * SRC_W * scale;
      const sy = oy + THREAD_TAIL.fy * SRC_H * scale;
      const ex = entryX - stage.getBoundingClientRect().left;
      const ey = H + 1;
      const reach = Math.max(60, (ey - sy) * 0.6);
      threadSvg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      // Match the video's own stroke weight (~4.2px in 1920-wide source frames).
      threadPath.setAttribute("stroke-width", Math.max(2, 4.2 * scale).toFixed(2));
      threadPath.setAttribute(
        "d",
        `M ${sx.toFixed(1)} ${sy.toFixed(1)} C ${(sx + THREAD_TAIL.dx * reach).toFixed(1)} ${(sy + THREAD_TAIL.dy * reach).toFixed(1)}, ${ex.toFixed(1)} ${(ey - reach).toFixed(1)}, ${ex.toFixed(1)} ${ey.toFixed(1)}`,
      );
      threadGrad.setAttribute("x1", sx.toFixed(1));
      threadGrad.setAttribute("y1", sy.toFixed(1));
      threadGrad.setAttribute("x2", ex.toFixed(1));
      threadGrad.setAttribute("y2", ey.toFixed(1));
      threadLen = threadPath.getTotalLength();
      threadPath.style.strokeDasharray = `${threadLen}`;
      renderThread();
    }

    function renderThread() {
      if (!threadSvg || !threadPath || threadLen === 0) return;
      const t = Math.min(1, Math.max(0, (currentProgress - THREAD_DRAW[0]) / (THREAD_DRAW[1] - THREAD_DRAW[0])));
      threadPath.style.strokeDashoffset = `${threadLen * (1 - t)}`;
      threadSvg.style.opacity = t > 0 ? "1" : "0";
    }

    // ── Centred logo → header logo slot ─────────────────────────────────────
    const logoPath = { x0: 0, y0: 0, x1: 0, y1: 0, s1: 1 };
    let logoReady = false;

    function layoutLogo() {
      if (!heroLogo || !headerLogoImg || !stage) return;
      // Measure untransformed, from the stage's top-left corner.
      heroLogo.style.translate = "none";
      heroLogo.style.left = "0px";
      heroLogo.style.top = "0px";
      heroLogo.style.transform = "none";
      const w = heroLogo.offsetWidth;
      const h = heroLogo.offsetHeight;
      const stageRect = stage.getBoundingClientRect();
      const target = headerLogoImg.getBoundingClientRect();
      if (w === 0 || target.width === 0) return;
      logoPath.x0 = (stage.clientWidth - w) / 2;
      logoPath.y0 =
        (bucket === "mobile"
          ? (MOBILE_CARD.headerBottom + stage.clientHeight * MOBILE_CARD.originY * (1 - MOBILE_CARD.scale)) / 2
          : stage.clientHeight * LOGO_REST_Y[bucket]) - h / 2;
      logoPath.x1 = target.left - stageRect.left;
      logoPath.y1 = target.top - stageRect.top;
      logoPath.s1 = target.width / w;
      if (headerBar && headerLogo) {
        const inset = headerLogo.getBoundingClientRect().right - headerBar.getBoundingClientRect().left;
        headerBar.style.setProperty("--header-surface-inset", `${Math.max(0, inset)}px`);
      }
      logoReady = true;
      renderLogo();
    }

    function renderLogo() {
      if (!heroLogo || !headerLogo || !logoReady) return;
      const raw = Math.min(1, Math.max(0, (currentProgress - LOGO_TRAVEL[0]) / (LOGO_TRAVEL[1] - LOGO_TRAVEL[0])));
      const e = easeInOutCubic(raw);
      // A menu overlay open in the header: show the real logo, park the traveller.
      const landed = raw >= 1 || header?.hasAttribute("data-overlay-open");
      const x = logoPath.x0 + (logoPath.x1 - logoPath.x0) * e;
      const y = logoPath.y0 + (logoPath.y1 - logoPath.y0) * e;
      const sc = 1 + (logoPath.s1 - 1) * e;
      heroLogo.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${sc.toFixed(4)})`;
      heroLogo.style.visibility = landed ? "hidden" : "visible";
      headerLogo.style.visibility = landed ? "visible" : "hidden";
      // The white bar (desktop) slides in under the logo once it has landed,
      // so it never covers the logo on its way up.
      headerBar?.style.setProperty("--header-surface-reveal", landed ? "1" : "0");
      if (logoGlow) logoGlow.style.opacity = (1 - e).toFixed(3);
    }

    // Phone opening: the frame layer starts as an arched card under the logo and
    // grows to full screen while the logo rises. Uses the CSS `scale` property so the
    // canvas keeps its full-size backing store (no re-layout, GPU only).
    function renderCard() {
      if (!canvas) return;
      if (bucket !== "mobile") {
        canvas.style.scale = "";
        canvas.style.borderRadius = "";
        return;
      }
      const [g0, g1] = MOBILE_CARD.grow;
      const t = easeInOutCubic(Math.min(1, Math.max(0, (currentProgress - g0) / (g1 - g0))));
      const sc = MOBILE_CARD.scale + (1 - MOBILE_CARD.scale) * t;
      const top = (canvas.clientWidth / 2) * (1 - t); // semicircular arch top
      const bottom = (MOBILE_CARD.bottomRadius / sc) * (1 - t);
      canvas.style.transformOrigin = `50% ${MOBILE_CARD.originY * 100}%`;
      canvas.style.scale = t >= 1 ? "1" : sc.toFixed(4);
      canvas.style.borderRadius = t >= 1 ? "0" : `${top}px ${top}px ${bottom}px ${bottom}px`;
    }

    const overlayObserver = header ? new MutationObserver(() => renderLogo()) : null;
    if (header) overlayObserver?.observe(header, { attributes: true, attributeFilter: ["data-overlay-open"] });

    // ── Text timeline ───────────────────────────────────────────────────────
    let tl: gsap.core.Timeline | null = null;

    function buildTimeline() {
      tl?.kill();
      gsap.set(allTargets, { clearProps: "opacity,visibility,transform" });
      const { heroY, philosophyY } = TEXT_MOTION[bucket];
      const timing = bucket === "mobile" ? TIMING_MOBILE : TIMING_DEFAULT;
      gsap.set(philTargets, { opacity: 0, y: philosophyY });
      gsap.set(philScrim, { opacity: 0 });
      gsap.set([heroEyebrow, heroHeading, heroBody], { opacity: 0, y: -heroY });
      gsap.set(heroCta, { autoAlpha: 0, y: -heroY });
      gsap.set(heroScrim, { opacity: 0 });

      const t = gsap.timeline({ paused: true, defaults: { ease: "power1.inOut" } });

      const at = (key: keyof TextTiming) => timing[key][0];
      const dur = (key: keyof TextTiming) => timing[key][1];
      if (scrollCue) {
        gsap.set(scrollCue, { opacity: 1 });
        t.fromTo(scrollCue, { opacity: 1 }, { opacity: 0, immediateRender: false, duration: SCROLL_CUE_OUT[1] }, SCROLL_CUE_OUT[0]);
      }

      // Hero copy comes in as the logo settles into the header…
      const heroReveal = { opacity: 1, y: 0, ease: SIGNATURE_EASE };
      t.to(heroScrim, { opacity: 1, duration: HERO_IN.heroScrim[1] }, HERO_IN.heroScrim[0]);
      t.to(heroEyebrow, { ...heroReveal, duration: HERO_IN.heroEyebrow[1] }, HERO_IN.heroEyebrow[0]);
      t.to(heroHeading, { ...heroReveal, duration: HERO_IN.heroHeading[1] }, HERO_IN.heroHeading[0]);
      t.to(heroBody, { ...heroReveal, duration: HERO_IN.heroBody[1] }, HERO_IN.heroBody[0]);
      t.to(heroCta, { ...heroReveal, autoAlpha: 1, duration: HERO_IN.heroCta[1] }, HERO_IN.heroCta[0]);

      // …then fades out as the heart draws (frames FRAME_DRAWN → FRAME_HEART).
      const out = (el: gsap.TweenTarget, key: keyof TextTiming, vars: gsap.TweenVars) =>
        t.fromTo(el, { opacity: 1, y: 0 }, { ...vars, immediateRender: false, duration: dur(key) }, at(key));
      out(heroBody, "heroBody", { opacity: 0, y: heroY });
      out(heroCta, "heroCta", { autoAlpha: 0, y: heroY });
      out(heroEyebrow, "heroEyebrow", { opacity: 0, y: heroY });
      out(heroHeading, "heroHeading", { opacity: 0, y: heroY });
      t.fromTo(heroScrim, { opacity: 1 }, { opacity: 0, immediateRender: false, duration: dur("heroScrim") }, at("heroScrim"));

      // Story captions beside the heart, then beside mother & baby.
      const captionFor = (el: HTMLElement | null, [inAt, inDur, outAt, outDur]: readonly number[]) => {
        if (!el) return;
        gsap.set(el, { opacity: 0, y: 14 });
        t.to(el, { opacity: 1, y: 0, ease: SIGNATURE_EASE, duration: inDur }, inAt);
        t.fromTo(el, { opacity: 1, y: 0 }, { opacity: 0, y: -10, immediateRender: false, duration: outDur }, outAt);
      };
      captionFor(captionHeart, CAPTION_TIMING.heart);
      captionFor(captionBaby, CAPTION_TIMING.baby);

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
      renderThread();
      renderLogo();
      renderCard();
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, frameAt(currentProgress)),
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
        targetProgress = toStory(self.progress);
        kick();
      },
      onToggle: (self) => debug.update({ stActive: self.isActive }),
      onRefresh: (self) =>
        debug.update({ stStart: Math.round(self.start), stEnd: Math.round(self.end) }),
    });

    targetProgress = currentProgress = toStory(st.progress);
    const onScrollTriggerRefresh = () => {
      layoutThread();
      layoutLogo();
    };
    ScrollTrigger.addEventListener("refresh", onScrollTriggerRefresh);

    wantedIndex = Math.min(
      FRAME_COUNT - 1,
      Math.max(0, frameAt(currentProgress)),
    );

    buildTimeline();
    sizeCanvas();

    debug.update({
      stActive: st.isActive,
      stStart: Math.round(st.start),
      stEnd: Math.round(st.end),
      progress: currentProgress.toFixed(3),
    });

    startLoading();

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
          resetFrames();
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
          resetFrames();
        }
        sizeCanvas();
        ScrollTrigger.refresh();
        buildTimeline();
        const heldScroll = toScroll(held);
        if (heldScroll > 0 && heldScroll < 1) {
          window.scrollTo({ top: st.start + heldScroll * (st.end - st.start), behavior: "instant" });
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
      overlayObserver?.disconnect();
      if (headerLogo) headerLogo.style.visibility = "";
      headerBar?.style.removeProperty("--header-surface-inset");
      headerBar?.style.removeProperty("--header-surface-reveal");
      ScrollTrigger.removeEventListener("refresh", onScrollTriggerRefresh);
      st.kill();
      tl?.kill();
      gsap.set(allTargets, { clearProps: "opacity,visibility,transform" });
      abort.abort();
      cache.forEach((img) => {
        if (img && "close" in img) img.close();
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
        className="relative isolate h-[300vh] bg-paper md:h-[340vh] lg:h-[400vh]"
      >
        <div
          ref={stageRef}
          className="sticky top-0 h-screen w-full overflow-hidden bg-paper supports-[height:100dvh]:h-dvh"
        >
          {/* Frame layer: CSS background is frame 1 so the stage never blanks before canvas paints */}
          {/* Opening still is painted by CSS before any JS runs (keep paths in sync with getFrameSrc(FRAME_DRAWN)). */}
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="absolute inset-0 z-0 h-full w-full bg-cover bg-center motion-safe:max-md:origin-[50%_86%] motion-safe:max-md:scale-[0.62] motion-safe:max-md:rounded-t-[50vw] motion-safe:max-md:rounded-b-[39px] bg-[url('/images/hero-frames-v8/mobile/frame_000056.webp')] md:bg-[url('/images/hero-frames-v8/desktop/frame_000056.webp')] md:bg-[position:80%_50%] lg:bg-center"
          />

          <HeroContent animated />

          {/* Opening logo: centred over the figure, rises into the header's logo
              slot on the first scroll, then hands over to the real header link. */}
          <div
            ref={logoRef}
            data-hero-logo=""
            aria-hidden="true"
            className="pointer-events-none absolute top-[calc(32px+16.34svh)] left-1/2 z-30 isolate w-[min(58vw,240px)] origin-top-left -translate-x-1/2 -translate-y-1/2 will-change-transform md:top-[40%] md:w-[min(42vw,400px)] lg:top-[42%] lg:w-[min(30vw,440px)]"
          >
            {/* Soft paper glow so the wordmark reads over the drawing; fades as it rises. */}
            <span
              data-hero-logo-glow=""
              className="absolute -inset-x-[32%] -inset-y-[60%] -z-10 rounded-full max-md:hidden bg-[radial-gradient(closest-side,rgb(255_252_249/0.92)_0%,rgb(255_248_244/0.6)_50%,transparent_100%)]"
            />
            <Image
              src={brand.logo.wordmarkShade}
              alt=""
              width={2327}
              height={1139}
              priority
              sizes="(min-width: 1024px) 440px, (min-width: 768px) 400px, 240px"
              className="h-auto w-full"
            />
          </div>

          {/* Story captions — switched off for the photo video (kept in the DOM so the timeline still finds them) */}
          <p
            data-hero-caption-heart
            style={{ opacity: 0 }}
            className="hidden pointer-events-none absolute inset-x-0 top-[24%] z-[15] mx-auto max-w-none px-(--space-gutter) text-center text-balance text-[clamp(1.6rem,1.15rem+1.9vw,2.6rem)] leading-[1.15] text-ink [text-shadow:0_0_28px_var(--color-paper)] lg:top-auto lg:bottom-[45%]"
          >
            <span className="serif-emphasis !text-[1em]">{HERO_CAPTIONS.heart}</span>
          </p>
          <p
            data-hero-caption-baby
            style={{ opacity: 0 }}
            className="hidden pointer-events-none absolute inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+6.5rem)] z-[15] mx-auto max-w-none px-(--space-gutter) text-center text-balance text-[clamp(1.6rem,1.15rem+1.9vw,2.6rem)] leading-[1.15] text-ink [text-shadow:0_0_28px_var(--color-paper)] lg:inset-x-auto lg:bottom-auto lg:left-[40%] lg:top-[36%] lg:mx-0 lg:max-w-[26rem] lg:px-0 lg:text-left"
          >
            <span className="serif-emphasis !text-[1em]">{HERO_CAPTIONS.baby}</span>
          </p>

          <PhilosophyContent animated />

          {/* Desktop thread — switched off for the photo video (no drawn line to continue) */}
          <svg
            ref={threadSvgRef}
            aria-hidden="true"
            style={{ opacity: 0, display: "none" }}
            className="pointer-events-none absolute inset-0 z-[25] hidden h-full w-full overflow-visible"
          >
            <defs>
              <linearGradient ref={threadGradRef} id="hero-thread-gradient" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="rgb(148 96 86)" stopOpacity="0.45" />{/* heart is softened under the philosophy scrim */}
                <stop offset="0.35" stopColor="rgb(160 100 85)" />
                <stop offset="1" stopColor="var(--color-terracotta)" />
              </linearGradient>
            </defs>
            <path ref={threadPathRef} fill="none" stroke="url(#hero-thread-gradient)" strokeWidth="2" strokeLinecap="round" />
          </svg>

          {/* Faint wave near the lower edge */}
          <CareWaveBackground preset="hero-lower" />

          {/* Shown on arrival; fades on first scroll */}
          <p
            data-hero-scroll-cue
            aria-hidden="true"
            style={{ opacity: 0 }}
            className="pointer-events-none absolute bottom-[calc(env(safe-area-inset-bottom)+1.5rem)] left-(--space-gutter) z-20 flex items-center gap-2 font-body text-[0.6875rem] font-semibold tracking-[var(--tracking-wider)] text-ink-soft uppercase"
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

function HeroContent({ animated, className }: { animated?: boolean; className?: string }) {
  // Animated scene: copy starts hidden and is revealed by the scroll timeline.
  const hidden = animated ? { opacity: 0 } : undefined;
  const hiddenCta = animated ? { opacity: 0, visibility: "hidden" as const } : undefined;
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
        style={hidden}
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-full max-w-2xl max-sm:inset-x-0 max-sm:top-auto max-sm:bottom-0 max-sm:h-[74%] max-sm:max-w-none max-sm:bg-[linear-gradient(0deg,var(--color-paper)_0%,rgba(250,246,242,0.95)_50%,rgba(250,246,242,0.85)_70%,transparent_100%)] sm:bg-[linear-gradient(90deg,var(--color-paper)_0%,color-mix(in_srgb,var(--color-paper)_86%,transparent)_55%,color-mix(in_srgb,var(--color-paper)_40%,transparent)_80%,transparent_100%)]"
      />

      {/* On screens <640px, place hero copy in lower part of the screen */}
      <div className="container-birthwave relative z-20 flex h-full items-center max-sm:items-end max-sm:pb-[max(2rem,calc(env(safe-area-inset-bottom)+2rem))] [padding-block:var(--header-height)]">
        <div className="motion-rise-in max-w-lg">
          <p data-hero-eyebrow style={hidden} className="eyebrow mt-6 max-sm:mt-0 max-sm:text-[#734F48]">
            {hero.eyebrow}
          </p>

          <h1
            data-hero-heading
            style={hidden}
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
            style={hidden}
            className="mt-5 max-w-md text-lg leading-[var(--leading-relaxed)] text-ink-soft"
          >
            {hero.subhead}
          </p>

          <div data-hero-cta style={hiddenCta} className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
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
        <div className="max-w-xl text-left lg:ml-auto lg:w-[58%] lg:max-w-none lg:pl-12 xl:w-[52%]">
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
            className="hidden mt-10 [@media(max-height:800px)]:mt-6 max-md:portrait:mt-5 text-balance text-[clamp(1.6rem,1.3rem+1.4vw,2.25rem)] leading-[1.2] font-semibold tracking-[var(--tracking-wide)] text-terracotta-deep uppercase"
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
              src={getFrameSrc(POSTER_FRAME, false)}
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
