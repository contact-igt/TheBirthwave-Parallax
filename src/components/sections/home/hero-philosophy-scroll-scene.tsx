"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { preload } from "react-dom";
import { hero, brand, philosophy } from "@/content/site-content";
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

// ---------------------------------------------------------------------------
// Frame sequence — public/images/about/hero-transition (185 × 1280×720 JPEG)
// ---------------------------------------------------------------------------

const FRAME_COUNT = 185;

/** index 0 → frame_000001.jpg … index 184 → frame_000185.jpg */
const getFrameSrc = (index: number) =>
  `/images/about/hero-transition/frame_${String(index + 1).padStart(6, "0")}.jpg`;

/** Size of each background batch after the eager set. */
const BATCH_SIZE = 12;

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

/**
 * Logo → header identity (desktop only, ≥1024px). Geometry is measured
 * (FLIP-style): start = the Hero logo's real position, end = a slot left
 * of the nav pill, vertically centred on it. The header reserves that slot
 * on the homepage (see site-header.tsx). Timing sits on the same master
 * progress as everything else, slightly ahead of the Hero copy fade.
 */
const LOGO_MOVE_START = 0.08;
const LOGO_MOVE_END = 0.32;
const LOGO_SETTLE_AT = 0.26;
const LOGO_SETTLE_SCALE = 0.66;
const LOGO_FINAL_SCALE = 0.62;
/** Logo left edge = max(LOGO_MIN_LEFT, container edge − LOGO_OUTSET). */
const LOGO_MIN_LEFT = 36;
const LOGO_OUTSET = 24;
/** Horizontal padding of the paper chip behind the settled logo. */
const LOGO_CHIP_PAD_X = 12;
/** Tablet/mobile: no header slot — the logo lifts and shrinks, then fades with the eyebrow as before. */
const LOGO_COMPACT_LIFT: Record<Exclude<Bucket, "desktop">, number> = { tablet: -16, mobile: -12 };
const LOGO_COMPACT_SCALE = 0.9;

function getBucket(): Bucket {
  const w = window.innerWidth;
  if (w >= 1024) return "desktop";
  if (w >= 768) return "tablet";
  return "mobile";
}

/**
 * Per-breakpoint rendering budget. `eagerFrames` are fetched in parallel
 * right after frame 1; `frameStep` > 1 paints (and fetches) every Nth
 * frame while progress stays continuous — the last frame is always kept.
 */
const RENDER_CONFIG: Record<Bucket, { maxDpr: number; eagerFrames: number; frameStep: number }> = {
  desktop: { maxDpr: 2, eagerFrames: 28, frameStep: 1 },
  tablet: { maxDpr: 1.75, eagerFrames: 28, frameStep: 1 },
  mobile: { maxDpr: 1.5, eagerFrames: 20, frameStep: 2 },
};

function stepFrame(index: number, step: number): number {
  return step > 1 && index < FRAME_COUNT - 1 ? index - (index % step) : index;
}

/**
 * Tablet/mobile crop. On a portrait screen `cover` shows only a narrow
 * slice of the 16:9 frame, and the subject moves: the mother sits on the
 * right through the Hero frames and on the left in the Philosophy frames,
 * with only cloud/fabric in between. So the crop follows her — `fx` is
 * the source x (0–1) held at screen anchor `ax` (0–1) — and pans across
 * the cloud-only stretch, where no subject is on screen. Desktop keeps
 * the plain centred crop.
 */
const FOCAL_HERO = { fx: 0.8, ax: 0.66 };
const FOCAL_PHILOSOPHY = { fx: 0.22, ax: 0.5 };
/** 0-based frame indices bracketing the cloud-only stretch. */
const FOCAL_PAN_FROM = 80;
const FOCAL_PAN_TO = 140;

function focalFor(frame: number) {
  const t = Math.min(1, Math.max(0, (frame - FOCAL_PAN_FROM) / (FOCAL_PAN_TO - FOCAL_PAN_FROM)));
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
  heroBody: [0.16, 0.12],
  heroCta: [0.22, 0.12],
  heroEyebrow: [0.28, 0.12],
  heroHeading: [0.34, 0.14],
  heroScrim: [0.36, 0.14],
  philScrim: [0.58, 0.1],
  philEyebrow: [0.62, 0.08],
  phil1: [0.68, 0.09],
  phil2: [0.74, 0.09],
  phil3: [0.8, 0.09],
  philClosing: [0.86, 0.1],
};

/** Phones: a shorter track, so beats are a touch quicker and earlier. */
const TIMING_MOBILE: TextTiming = {
  heroBody: [0.2, 0.1],
  heroCta: [0.24, 0.1],
  heroEyebrow: [0.28, 0.1],
  heroHeading: [0.32, 0.12],
  heroScrim: [0.34, 0.12],
  philScrim: [0.56, 0.1],
  philEyebrow: [0.6, 0.09],
  phil1: [0.66, 0.09],
  phil2: [0.72, 0.09],
  phil3: [0.78, 0.09],
  philClosing: [0.84, 0.1],
};

const NARRATIVE_STATEMENT_CLASS =
  "text-balance text-[clamp(2.3rem,1.8rem+2.6vw,3.5rem)] !leading-[1.08] font-semibold tracking-[var(--tracking-tight)]";

const HERO_SCRIM_STYLE = {
  backgroundImage:
    "linear-gradient(90deg, var(--color-paper) 0%, color-mix(in srgb, var(--color-paper) 82%, transparent) 52%, transparent 100%)",
};

/**
 * HeroPhilosophyScrollScene — one pinned scene for Home Hero → Philosophy.
 *
 *   track (360vh desktop / 300vh tablet / 230vh mobile)
 *   └── sticky h-dvh stage
 *       ├── <canvas>  185-frame sequence (hero → cloud/silk → philosophy)
 *       ├── Hero layer
 *       └── Philosophy layer
 *
 * ScrollTrigger only reports raw progress. A single rAF loop eases toward
 * it (LERP_TAU / SNAP), picks the frame, redraws only when the frame
 * changes, and drives one paused GSAP timeline for the text so frames and
 * copy stay locked to the same smoothed value.
 *
 * Timeline (smoothed progress 0 → 1):
 *   0.00–0.16  Hero fully visible
 *   0.16–0.28  subhead fades       0.22–0.34  CTA fades
 *   0.28–0.40  logo + eyebrow fade 0.34–0.48  headline fades last
 *   0.62–0.70  Philosophy eyebrow  0.68–0.77  statement 1
 *   0.74–0.83  statement 2         0.80–0.89  statement 3
 *   0.86–0.96  closing line        0.88–1.00  final frames hold, then release
 */
export function HeroPhilosophyScrollScene() {
  const reducedMotion = useReducedMotion();
  if (reducedMotion) return <ReducedMotionScene />;
  return <AnimatedScene />;
}

// ---------------------------------------------------------------------------
// Animated scene
// ---------------------------------------------------------------------------

function AnimatedScene() {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const sceneGroupRef = useRef<HTMLDivElement>(null);
  const travelerRef = useRef<HTMLDivElement>(null);
  const travelerChipRef = useRef<HTMLDivElement>(null);

  preload(getFrameSrc(0), { as: "image", fetchPriority: "high" });

  useEffect(() => {
    const track = trackRef.current;
    const canvas = canvasRef.current;
    if (!track || !canvas) return;
    // useReducedMotion() reports false on the hydration render by design;
    // if the OS setting is actually on, the parent swaps to <StaticScene />
    // on the next render — don't start the scrub or fetch frames for it.
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return;

    const debug = createSceneDebug(DEBUG_LABEL);
    debug.update({
      mode: "frame scrub",
      reducedMotion: window.matchMedia(REDUCED_MOTION_QUERY).matches,
    });

    // Without a 2D context the CSS poster (frame 1) stays visible and the
    // text scrub still runs — degrade, don't abort.
    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) {
      debug.warn("canvas.getContext('2d') returned null — showing CSS poster frame only.");
    }

    ensureScrollTriggerRegistered();

    const q = (selector: string) =>
      track.querySelector<HTMLElement>(selector);
    const heroLogo = q("[data-hero-logo]");
    const heroLogoImg = q("[data-hero-logo] img");
    const heroEyebrow = q("[data-hero-eyebrow]");
    const heroHeading = q("[data-hero-heading]");
    const heroBody = q("[data-hero-body]");
    const heroCta = q("[data-hero-cta]");
    const heroScrim = q("[data-hero-scrim]");
    const philScrim = q("[data-philosophy-scrim]");
    const philEyebrow = q("[data-philosophy-eyebrow]");
    const phil1 = q("[data-philosophy-statement-1]");
    const phil2 = q("[data-philosophy-statement-2]");
    const phil3 = q("[data-philosophy-statement-3]");
    const philClosing = q("[data-philosophy-closing]");
    const stage = stageRef.current;
    const sceneGroup = sceneGroupRef.current;
    const traveler = travelerRef.current;
    const travelerChip = travelerChipRef.current;
    if (
      !heroLogo || !heroLogoImg || !heroEyebrow ||
      !heroHeading || !heroBody || !heroCta || !heroScrim || !philScrim ||
      !philEyebrow || !phil1 || !phil2 || !phil3 || !philClosing ||
      !stage || !sceneGroup || !traveler || !travelerChip
    ) {
      debug.warn("Animation targets missing — scrub not initialised.");
      debug.destroy();
      return;
    }
    const philTargets = [philEyebrow, phil1, phil2, phil3, philClosing];
    const allTargets = [
      heroLogo, heroEyebrow, heroHeading, heroBody, heroCta, heroScrim,
      philScrim, ...philTargets, traveler, travelerChip,
    ];

    let bucket = getBucket();

    // ── Frame cache (one image per frame, never duplicated) ──────────────
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
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      if (cw === 0 || ch === 0) return;
      let dx = (cw - dw) / 2;
      if (bucket !== "desktop") {
        const { fx, ax } = focalFor(i);
        dx = Math.min(0, Math.max(cw - dw, ax * cw - fx * dw));
      }
      ctx2d.drawImage(img, dx, (ch - dh) / 2, dw, dh);
      drawnIndex = i;
      if (!firstPaintLogged) {
        firstPaintLogged = true;
        debug.info(`first frame painted: ${getFrameSrc(i)}`, { canvas: `${cw}x${ch}` });
      }
    }

    function loadFrame(index: number): Promise<void> {
      if (cache[index]) return Promise.resolve();
      const img = new window.Image();
      img.decoding = "async";
      cache[index] = img;
      const src = getFrameSrc(index);
      const markLoaded = () => {
        if (disposed) return;
        loaded[index] = 1;
        loadedCount++;
        debug.update({ loaded: `${loadedCount}/${FRAME_COUNT}` });
        // A closer frame just arrived — replace the stand-in.
        if (drawnIndex !== wantedIndex) draw(wantedIndex);
      };
      // A failed frame is never marked loaded, so draw() keeps using the
      // nearest loaded neighbour and the canvas never blanks.
      const markFailed = () => {
        if (disposed) return;
        failed.push(src);
        debug.warn(`frame failed to load: ${src}`);
        debug.update({ failed: failed.length, lastFailed: src });
      };
      img.src = src;
      // decode() off the main thread before the frame is ever drawn, so a
      // fast scroll never pays a synchronous JPEG decode inside drawImage.
      return img.decode().then(markLoaded, () => {
        // Some browsers reject decode() for images that did load fine.
        if (img.complete && img.naturalWidth > 0) markLoaded();
        else markFailed();
      });
    }

    async function preloadFrames() {
      const { eagerFrames, frameStep } = RENDER_CONFIG[bucket];
      // Only the frames this breakpoint will actually paint.
      const order: number[] = [];
      for (let i = 1; i < FRAME_COUNT; i++) if (stepFrame(i, frameStep) === i) order.push(i);
      const eagerCount = Math.ceil(eagerFrames / frameStep);

      await loadFrame(0);
      if (disposed) return;
      // Eager set in parallel — doesn't block first paint.
      await Promise.all(order.slice(0, eagerCount).map(loadFrame));
      for (let start = eagerCount; start < order.length; start += BATCH_SIZE) {
        if (disposed) return;
        await new Promise<void>((r) => timers.push(window.setTimeout(r, 16)));
        if (disposed) return;
        await Promise.all(order.slice(start, start + BATCH_SIZE).map(loadFrame));
      }
      debug.info(
        `frame preload finished: ${loadedCount}/${FRAME_COUNT} loaded, ${failed.length} failed`,
        failed.length ? failed : undefined,
      );
    }

    // ── Canvas sizing (high-DPI, fills viewport) ─────────────────────────
    function sizeCanvas() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, RENDER_CONFIG[bucket].maxDpr);
      // Guard against a zero-size layout box (e.g. a sticky parent whose
      // height didn't resolve) — size to the viewport instead.
      let cssW = canvas.clientWidth;
      let cssH = canvas.clientHeight;
      if (cssW === 0 || cssH === 0) {
        debug.warn(`canvas layout box is ${cssW}x${cssH} — falling back to viewport size.`);
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

    // ── Text timeline (paused; progress set from the rAF loop) ───────────
    let tl: gsap.core.Timeline | null = null;

    // ── Logo geometry (desktop): measured start → header slot ───────────
    // Must be called with the logo's own transforms cleared.
    function measureLogo(): { dx: number; dy: number } | null {
      if (!stage || !heroLogo || !heroLogoImg || !traveler || !travelerChip) return null;
      const pill = document.querySelector<HTMLElement>('header#top nav[aria-label="Primary"]');
      const row = pill?.parentElement;
      if (!pill || !row || pill.offsetParent === null) return null;

      // Start: the Hero logo's resting position inside the sticky stage
      // (stage-relative, so it's valid wherever the page is scrolled),
      // minus any in-progress load-in translate on its column.
      const stageRect = stage.getBoundingClientRect();
      const imgRect = heroLogoImg.getBoundingClientRect();
      if (imgRect.width === 0) return null;
      const riseEl = heroLogo.closest<HTMLElement>(".motion-rise-in");
      const riseTransform = riseEl ? getComputedStyle(riseEl).transform : "none";
      const riseY = riseTransform && riseTransform !== "none" ? new DOMMatrixReadOnly(riseTransform).m42 : 0;
      const startLeft = imgRect.left - stageRect.left;
      const startTop = imgRect.top - stageRect.top - riseY;
      traveler.style.left = `${startLeft}px`;
      traveler.style.top = `${startTop}px`;

      // End: just outside the container edge, vertically centred on the nav pill.
      const rowRect = row.getBoundingClientRect();
      const containerLeft = rowRect.left + parseFloat(getComputedStyle(row).paddingLeft || "0");
      const pillRect = pill.getBoundingClientRect();
      const finalW = imgRect.width * LOGO_FINAL_SCALE;
      const finalH = imgRect.height * LOGO_FINAL_SCALE;
      const endLeft = Math.max(LOGO_MIN_LEFT, containerLeft - LOGO_OUTSET);
      const endTop = pillRect.top + pillRect.height / 2 - finalH / 2;

      // Paper chip behind the settled logo, matching the pill's height —
      // sized in pre-scale units because it lives inside the scaled layer.
      const s = LOGO_FINAL_SCALE;
      Object.assign(travelerChip.style, {
        left: `${-LOGO_CHIP_PAD_X / s}px`,
        top: `${(pillRect.top - endTop) / s}px`,
        width: `${(finalW + LOGO_CHIP_PAD_X * 2) / s}px`,
        height: `${pillRect.height / s}px`,
      });

      const chipRight = endLeft + finalW + LOGO_CHIP_PAD_X;
      const gap = pillRect.left - chipRight;
      if (gap < 4) {
        debug.warn(`logo target overlaps nav pill (gap ${gap.toFixed(1)}px) — check header slot.`);
      }
      debug.update({
        logoStart: `${startLeft.toFixed(1)},${startTop.toFixed(1)} ${imgRect.width.toFixed(0)}w`,
        logoEnd: `${endLeft.toFixed(1)},${endTop.toFixed(1)} ×${s}`,
        logoNavGap: `${gap.toFixed(1)}px`,
      });
      return { dx: endLeft - startLeft, dy: endTop - startTop };
    }

    function buildTimeline() {
      tl?.kill();
      gsap.set(allTargets, { clearProps: "opacity,visibility,transform" });
      const { heroY, philosophyY } = TEXT_MOTION[bucket];
      const timing = bucket === "mobile" ? TIMING_MOBILE : TIMING_DEFAULT;
      gsap.set(philTargets, { opacity: 0, y: philosophyY });
      gsap.set(philScrim, { opacity: 0 });

      const t = gsap.timeline({ paused: true, defaults: { ease: "power1.inOut" } });

      // Logo — geometry is scrubbed linearly so scroll stays predictable.
      const logoTravel = bucket === "desktop" ? measureLogo() : null;
      if (sceneGroup) sceneGroup.dataset.logoTraveler = logoTravel ? "on" : "off";
      const moveDuration = LOGO_MOVE_END - LOGO_MOVE_START;
      if (logoTravel) {
        gsap.set(traveler, { transformOrigin: "0 0" });
        t.fromTo(traveler, { x: 0, y: 0 }, { x: logoTravel.dx, y: logoTravel.dy, ease: "none", duration: moveDuration }, LOGO_MOVE_START);
        t.fromTo(traveler, { scale: 1 }, { scale: LOGO_SETTLE_SCALE, ease: "none", duration: LOGO_SETTLE_AT - LOGO_MOVE_START }, LOGO_MOVE_START);
        t.fromTo(
          traveler,
          { scale: LOGO_SETTLE_SCALE },
          { scale: LOGO_FINAL_SCALE, ease: "none", duration: LOGO_MOVE_END - LOGO_SETTLE_AT, immediateRender: false },
          LOGO_SETTLE_AT,
        );
        t.fromTo(travelerChip, { opacity: 0 }, { opacity: 1, ease: "none", duration: LOGO_MOVE_END - 0.22 }, 0.22);
      } else {
        const lift = LOGO_COMPACT_LIFT[bucket === "desktop" ? "tablet" : bucket];
        gsap.set(heroLogo, { transformOrigin: "0 0" });
        t.fromTo(heroLogo, { y: 0, scale: 1 }, { y: lift, scale: LOGO_COMPACT_SCALE, ease: "none", duration: moveDuration }, LOGO_MOVE_START);
        // No header slot here — keep the existing fade alongside the eyebrow.
        const [eyebrowAt, eyebrowFor] = timing.heroEyebrow;
        t.to(heroLogo, { opacity: 0, duration: eyebrowFor }, eyebrowAt);
      }

      const at = (key: keyof TextTiming) => timing[key][0];
      const dur = (key: keyof TextTiming) => timing[key][1];
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

    // ── Smoothed progress loop (single rAF) ──────────────────────────────
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
      const frameIndex = stepFrame(
        Math.round(currentProgress * (FRAME_COUNT - 1)),
        RENDER_CONFIG[bucket].frameStep,
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

    // ── Single ScrollTrigger: raw progress only ──────────────────────────
    const st = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        // While an orientation change is being restored, ignore the
        // interim progress the re-layout produces.
        if (heldProgress !== null) return;
        targetProgress = self.progress;
        kick();
      },
      onToggle: (self) => debug.update({ stActive: self.isActive }),
      onRefresh: (self) =>
        debug.update({ stStart: Math.round(self.start), stEnd: Math.round(self.end) }),
    });
    if (!(st.end > st.start)) {
      debug.warn(
        `ScrollTrigger has no scroll distance (start ${st.start}, end ${st.end}) — scrub cannot progress.`,
      );
    }
    // Landing mid-scene (reload/back-nav) starts at the right place, not frame 0.
    targetProgress = currentProgress = st.progress;
    wantedIndex = stepFrame(
      Math.round(currentProgress * (FRAME_COUNT - 1)),
      RENDER_CONFIG[bucket].frameStep,
    );

    buildTimeline();
    sizeCanvas();
    debug.update({
      stActive: st.isActive,
      stStart: Math.round(st.start),
      stEnd: Math.round(st.end),
      progress: currentProgress.toFixed(3),
    });
    debug.info("frame scrub initialised", {
      reducedMotion: false,
      trackHeight: track.offsetHeight,
      scrollDistance: Math.round(st.end - st.start),
      canvas: `${canvas.width}x${canvas.height}`,
      context2d: Boolean(ctx2d),
      startProgress: Number(currentProgress.toFixed(3)),
    });
    void preloadFrames().then(() => {
      if (!disposed) draw(wantedIndex);
    });
    // Make sure the landing frame is fetched early even if it's past the eager set.
    void loadFrame(wantedIndex);

    // ── Resize / orientation ─────────────────────────────────────────────
    let resizeTimer = 0;
    function onResize() {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const previousStep = RENDER_CONFIG[bucket].frameStep;
        bucket = getBucket();
        sizeCanvas();
        // Always rebuild: the logo's start/end geometry depends on layout.
        // Rebuilding re-applies the current progress in the same frame.
        buildTimeline();
        // Moving to a breakpoint that paints more frames: fetch the rest.
        if (RENDER_CONFIG[bucket].frameStep < previousStep) void preloadFrames();
      }, 150);
    }
    // Late layout shifts in the Hero column (web-font swap, image decode)
    // move the logo's start position — re-measure when its box changes.
    let layoutRaf = 0;
    const heroColumn = heroLogo.parentElement;
    const layoutObserver = new ResizeObserver(() => {
      cancelAnimationFrame(layoutRaf);
      layoutRaf = requestAnimationFrame(() => buildTimeline());
    });
    if (heroColumn) layoutObserver.observe(heroColumn);
    // Portrait ↔ landscape changes the track height (vh-based), so the same
    // scroll offset would land at a different progress. Hold the progress
    // from before the rotation, re-measure, then scroll back to it.
    let orientationTimer = 0;
    function onOrientation() {
      if (heldProgress === null) heldProgress = currentProgress;
      window.clearTimeout(orientationTimer);
      orientationTimer = window.setTimeout(() => {
        const held = heldProgress ?? currentProgress;
        const previousStep = RENDER_CONFIG[bucket].frameStep;
        bucket = getBucket();
        sizeCanvas();
        ScrollTrigger.refresh();
        buildTimeline();
        if (held > 0 && held < 1) {
          window.scrollTo({ top: st.start + held * (st.end - st.start), behavior: "instant" });
        }
        targetProgress = currentProgress = held;
        heldProgress = null;
        render();
        if (RENDER_CONFIG[bucket].frameStep < previousStep) void preloadFrames();
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
      cancelAnimationFrame(layoutRaf);
      layoutObserver.disconnect();
      st.kill();
      tl?.kill();
      gsap.set(allTargets, { clearProps: "opacity,visibility,transform" });
      delete sceneGroup.dataset.logoTraveler;
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
    // `contents`: no box — only scopes the logo hand-off state for CSS.
    <div ref={sceneGroupRef} className="group/scene contents">
    <div
      ref={trackRef}
      data-home-scene="hero-philosophy"
      className="relative isolate h-[200vh] bg-paper md:h-[240vh] lg:h-[360vh]"
    >
      <div
        ref={stageRef}
        className="sticky top-0 h-screen w-full overflow-hidden bg-paper supports-[height:100dvh]:h-dvh"
      >
        {/* Frame layer. The CSS background is frame 1, so the stage is
            never blank before the canvas paints. */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 z-0 h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${getFrameSrc(0)})` }}
        />

        <HeroContent />
        <PhilosophyContent animated />
      </div>
    </div>

    {/* Desktop logo traveller. It has to live outside the scene's
        isolated/transformed layers to be `fixed` and stay above later
        sections once it settles in the header. Hidden until JS has
        measured the Hero logo; then CSS swaps it in at the identical
        position (the Hero copy goes invisible in the same frame), so only
        one logo is ever visible. Not a link — matches the Hero logo. */}
    <div
      ref={travelerRef}
      data-hero-logo-traveler
      className="pointer-events-none invisible fixed top-0 left-0 z-40 hidden lg:block lg:group-data-[logo-traveler=on]/scene:visible"
    >
      <div
        ref={travelerChipRef}
        aria-hidden="true"
        className="absolute rounded-full bg-paper/75 opacity-0 shadow-[0_1px_2px_rgba(36,26,23,0.08)] backdrop-blur-md"
      />
      <div className="motion-rise-in relative">
        <Image
          src={brand.logo.wordmarkMauve}
          alt={brand.logo.alt}
          width={320}
          height={157}
          loading="eager"
          className="h-auto w-[88px] sm:w-[114px] lg:w-[152px]"
        />
      </div>
    </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Real Hero / Philosophy content (shared by animated + static)
// ---------------------------------------------------------------------------

function HeroContent({ className }: { className?: string }) {
  return (
    <section
      id="hero-section"
      aria-label="Introduction"
      className={cx("absolute inset-0 z-10", className)}
    >
      <div
        data-hero-scrim
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-full max-w-2xl"
        style={HERO_SCRIM_STYLE}
      />

      <div className="container-birthwave relative z-20 flex h-full items-center [padding-block:var(--header-height)]">
        <div className="motion-rise-in max-w-lg">
          <div data-hero-logo className="lg:group-data-[logo-traveler=on]/scene:invisible">
            <Image
              src={brand.logo.wordmarkMauve}
              alt={brand.logo.alt}
              width={320}
              height={157}
              loading="eager"
              className="h-auto w-[88px] sm:w-[114px] lg:w-[152px]"
            />
          </div>

          <p data-hero-eyebrow className="eyebrow mt-6">
            {hero.eyebrow}
          </p>

          <h1
            data-hero-heading
            className="mt-3 text-balance text-[clamp(2.05rem,1.75rem+2vw,2.75rem)] sm:text-3xl"
          >
            <span className="block font-medium text-ink-soft">
              {hero.headlineLead}
            </span>
            <span className="block font-bold text-ink">
              {hero.headlineEmphasis}
            </span>
          </h1>

          <p
            data-hero-body
            className="mt-5 max-w-md text-lg leading-[var(--leading-relaxed)] text-ink-soft"
          >
            {hero.subhead}
          </p>

          <div data-hero-cta className="mt-8">
            <CtaLink href={hero.primaryCta.href}>{hero.primaryCta.label}</CtaLink>
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
  // Hidden before hydration so Philosophy never flashes over the Hero.
  const hidden = animated ? { opacity: 0 } : undefined;
  return (
    <section
      id="philosophy"
      aria-labelledby="philosophy-heading"
      className={cx(
        // Portrait below desktop: copy anchors to the bottom so the mother
        // and baby (framed in the upper part by the focal crop) stay clear.
        "pointer-events-none absolute inset-0 z-20 flex items-center max-lg:portrait:items-end",
        className,
      )}
    >
      {/* Readability scrim. The final frame puts the mother and baby on
          the left and leaves the right side open, so on desktop the copy
          sits on the right with a light wash. In portrait below desktop
          the wash is localised to the lower part, behind the copy only.
          Landscape below desktop keeps the fuller wash. */}
      <div
        data-philosophy-scrim
        aria-hidden="true"
        style={hidden}
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,246,242,0.80)_0%,rgba(250,246,242,0.70)_55%,rgba(250,246,242,0.45)_100%)] max-lg:portrait:bg-[linear-gradient(180deg,rgba(250,246,242,0)_0%,rgba(250,246,242,0)_30%,rgba(250,246,242,0.74)_50%,rgba(250,246,242,0.88)_100%)] lg:bg-[linear-gradient(90deg,rgba(250,246,242,0)_0%,rgba(250,246,242,0)_34%,rgba(250,246,242,0.64)_50%,rgba(250,246,242,0.72)_100%)]"
      />

      <div className="container-birthwave relative w-full [padding-block:var(--header-height)] [@media(max-height:800px)]:pb-6 max-lg:portrait:pb-[max(1.75rem,env(safe-area-inset-bottom))]">
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
            {philosophy.messages[0].text}
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
// Reduced motion: no scrub, both scenes readable in normal flow
// ---------------------------------------------------------------------------

/**
 * prefers-reduced-motion: reduce — a short, opacity-only Hero → Philosophy
 * crossfade between two stills (frames 1 and 185). No canvas, no frame
 * sequence, no traveling logo, no transforms, no smoothing loop.
 *
 * ≥768px: a short sticky stage (desktop 190svh / tablet 170svh track, so
 * 90svh / 70svh of scroll), both scenes stacked, one ScrollTrigger mapped
 * directly to scroll (scrub: true):
 *   0.00–0.35  Hero fully visible
 *   0.35–0.55  Hero copy fades
 *   0.40–0.65  Hero image fades out
 *   0.45–0.70  Philosophy image (+ its scrim) fades in
 *   0.65–0.85  Philosophy copy fades in
 *   0.85–1.00  settled, then releases into Journey
 *
 * <768px: normal document flow — Hero, then Philosophy; the Philosophy
 * image and then its copy fade in as the section comes into view.
 *
 * The site's global reduced-motion CSS zeroes CSS transitions, so the
 * fades are GSAP-driven opacity.
 */
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
      "[data-hero-logo], [data-hero-eyebrow], [data-hero-heading], [data-hero-body], [data-hero-cta], [data-hero-scrim]",
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

      // Tablet / desktop: stacked stills in a short sticky stage.
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

      // Phones: normal flow — reveal Philosophy as it arrives.
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
              src={getFrameSrc(0)}
              alt=""
              fill
              loading="eager"
              sizes="100vw"
              className="object-cover object-[80%_50%] lg:object-center"
            />
          </div>
          <HeroContent />
        </div>
        <div
          data-reduced-phil-block
          className="relative min-h-svh overflow-hidden md:pointer-events-none md:absolute md:inset-0 md:min-h-0"
        >
          {/* Hidden until the effect takes over, so it never flashes over the Hero. */}
          <div data-reduced-phil-image className="absolute inset-0" style={{ opacity: 0 }}>
            <Image
              src={getFrameSrc(FRAME_COUNT - 1)}
              alt=""
              fill
              // ≥768px it sits in the first viewport under the Hero, ready to crossfade.
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
