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

// ---------------------------------------------------------------------------
// Frame sequence — public/images/about/hero-transition (185 × 1280×720 JPEG)
// ---------------------------------------------------------------------------

const FRAME_COUNT = 185;

/** index 0 → frame_000001.jpg … index 184 → frame_000185.jpg */
const getFrameSrc = (index: number) =>
  `/images/about/hero-transition/frame_${String(index + 1).padStart(6, "0")}.jpg`;

/** Frames fetched in parallel straight after frame 0. */
const EAGER_FRAMES = 28;
/** Size of each background batch after the eager set. */
const BATCH_SIZE = 12;

/** rAF smoothing: exponential approach toward ScrollTrigger's raw progress. */
const LERP_TAU = 8;
const SNAP = 0.002;

const MAX_DPR = 2;

type Bucket = "desktop" | "tablet" | "mobile";

/** Text travel per breakpoint — the frames carry the motion, text barely moves. */
const TEXT_MOTION: Record<Bucket, { heroY: number; philosophyY: number }> = {
  desktop: { heroY: -20, philosophyY: 24 },
  tablet: { heroY: -16, philosophyY: 20 },
  mobile: { heroY: -12, philosophyY: 16 },
};

function getBucket(): Bucket {
  const w = window.innerWidth;
  if (w >= 1024) return "desktop";
  if (w >= 768) return "tablet";
  return "mobile";
}

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
  if (reducedMotion) return <StaticScene />;
  return <AnimatedScene />;
}

// ---------------------------------------------------------------------------
// Animated scene
// ---------------------------------------------------------------------------

function AnimatedScene() {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  preload(getFrameSrc(0), { as: "image", fetchPriority: "high" });

  useEffect(() => {
    const track = trackRef.current;
    const canvas = canvasRef.current;
    const ctx2d = canvas?.getContext("2d");
    if (!track || !canvas || !ctx2d) return;

    ensureScrollTriggerRegistered();

    const q = (selector: string) =>
      track.querySelector<HTMLElement>(selector);
    const heroEyebrowGroup = track.querySelectorAll<HTMLElement>(
      "[data-hero-logo], [data-hero-eyebrow]",
    );
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
    if (
      !heroHeading || !heroBody || !heroCta || !heroScrim || !philScrim ||
      !philEyebrow || !phil1 || !phil2 || !phil3 || !philClosing
    ) {
      return;
    }
    const philTargets = [philEyebrow, phil1, phil2, phil3, philClosing];
    const allTargets = [
      ...heroEyebrowGroup, heroHeading, heroBody, heroCta, heroScrim,
      philScrim, ...philTargets,
    ];

    // ── Frame cache (one image per frame, never duplicated) ──────────────
    const cache: Array<HTMLImageElement | null> = new Array(FRAME_COUNT).fill(null);
    const loaded = new Uint8Array(FRAME_COUNT);
    let disposed = false;
    let drawnIndex = -1;
    let wantedIndex = 0;
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
      ctx2d.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      drawnIndex = i;
    }

    function loadFrame(index: number): Promise<void> {
      if (cache[index]) return Promise.resolve();
      const img = new window.Image();
      img.decoding = "async";
      cache[index] = img;
      return new Promise((resolve) => {
        img.onload = () => {
          loaded[index] = 1;
          // A closer frame just arrived — replace the stand-in.
          if (!disposed && drawnIndex !== wantedIndex) draw(wantedIndex);
          resolve();
        };
        img.onerror = () => resolve();
        img.src = getFrameSrc(index);
      });
    }

    function range(from: number, to: number) {
      const out: number[] = [];
      for (let i = from; i < Math.min(to, FRAME_COUNT); i++) out.push(i);
      return out;
    }

    async function preloadFrames() {
      await loadFrame(0);
      if (disposed) return;
      // Eager set in parallel — doesn't block first paint.
      await Promise.all(range(1, EAGER_FRAMES).map(loadFrame));
      for (let start = EAGER_FRAMES; start < FRAME_COUNT; start += BATCH_SIZE) {
        if (disposed) return;
        await new Promise<void>((r) => timers.push(window.setTimeout(r, 16)));
        if (disposed) return;
        await Promise.all(range(start, start + BATCH_SIZE).map(loadFrame));
      }
    }

    // ── Canvas sizing (high-DPI, fills viewport) ─────────────────────────
    function sizeCanvas() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      draw(wantedIndex, true);
    }

    // ── Text timeline (paused; progress set from the rAF loop) ───────────
    let bucket = getBucket();
    let tl: gsap.core.Timeline | null = null;

    function buildTimeline() {
      tl?.kill();
      gsap.set(allTargets, { clearProps: "opacity,visibility,transform" });
      const { heroY, philosophyY } = TEXT_MOTION[bucket];
      gsap.set(philTargets, { opacity: 0, y: philosophyY });
      gsap.set(philScrim, { opacity: 0 });

      const t = gsap.timeline({ paused: true, defaults: { ease: "power1.inOut" } });
      t.to(heroBody, { opacity: 0, y: heroY, duration: 0.12 }, 0.16);
      t.to(heroCta, { autoAlpha: 0, y: heroY, duration: 0.12 }, 0.22);
      t.to(heroEyebrowGroup, { opacity: 0, y: heroY, duration: 0.12 }, 0.28);
      t.to(heroHeading, { opacity: 0, y: heroY, duration: 0.14 }, 0.34);
      t.to(heroScrim, { opacity: 0, duration: 0.14 }, 0.36);

      t.to(philScrim, { opacity: 1, duration: 0.1 }, 0.58);
      const reveal = { opacity: 1, y: 0, ease: SIGNATURE_EASE };
      t.to(philEyebrow, { ...reveal, duration: 0.08 }, 0.62);
      t.to(phil1, { ...reveal, duration: 0.09 }, 0.68);
      t.to(phil2, { ...reveal, duration: 0.09 }, 0.74);
      t.to(phil3, { ...reveal, duration: 0.09 }, 0.8);
      t.to(philClosing, { ...reveal, duration: 0.1 }, 0.86);
      t.set({}, {}, 1);
      t.progress(currentProgress);
      tl = t;
    }

    // ── Smoothed progress loop (single rAF) ──────────────────────────────
    let targetProgress = 0;
    let currentProgress = 0;
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
      const frameIndex = Math.round(currentProgress * (FRAME_COUNT - 1));
      if (frameIndex !== wantedIndex || drawnIndex !== frameIndex) {
        wantedIndex = frameIndex;
        draw(frameIndex);
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
        targetProgress = self.progress;
        kick();
      },
    });
    // Landing mid-scene (reload/back-nav) starts at the right place, not frame 0.
    targetProgress = currentProgress = st.progress;
    wantedIndex = Math.round(currentProgress * (FRAME_COUNT - 1));

    buildTimeline();
    sizeCanvas();
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
        sizeCanvas();
        const next = getBucket();
        if (next !== bucket) {
          bucket = next;
          buildTimeline();
        }
      }, 150);
    }
    let orientationTimer = 0;
    function onOrientation() {
      window.clearTimeout(orientationTimer);
      orientationTimer = window.setTimeout(() => {
        sizeCanvas();
        ScrollTrigger.refresh();
      }, 250);
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
    };
  }, []);

  return (
    <div
      ref={trackRef}
      data-home-scene="hero-philosophy"
      className="relative isolate h-[230vh] bg-paper md:h-[300vh] lg:h-[360vh]"
    >
      <div className="sticky top-0 h-dvh w-full overflow-hidden bg-paper">
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
          <div data-hero-logo>
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
        "pointer-events-none absolute inset-0 z-20 flex items-center",
        className,
      )}
    >
      {/* Readability scrim. The final frame puts the mother and baby on
          the left and leaves the right side open, so on desktop the copy
          sits on the right with a light wash. On narrower screens the
          centred crop needs a fuller wash behind the text. */}
      <div
        data-philosophy-scrim
        aria-hidden="true"
        style={hidden}
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,246,242,0.80)_0%,rgba(250,246,242,0.70)_55%,rgba(250,246,242,0.45)_100%)] lg:bg-[linear-gradient(90deg,rgba(250,246,242,0)_0%,rgba(250,246,242,0)_34%,rgba(250,246,242,0.64)_50%,rgba(250,246,242,0.72)_100%)]"
      />

      <div className="container-birthwave relative w-full [padding-block:var(--header-height)] [@media(max-height:800px)]:pb-6">
        <div className="max-w-xl text-left lg:ml-auto lg:w-[58%] lg:max-w-none xl:w-[52%]">
          <p data-philosophy-eyebrow style={hidden} className="eyebrow">
            {philosophy.eyebrow}
          </p>

          <h2
            data-philosophy-statement-1
            id="philosophy-heading"
            style={hidden}
            className={cx("mt-5 [@media(max-height:800px)]:mt-3", NARRATIVE_STATEMENT_CLASS, "text-ink")}
          >
            {philosophy.messages[0].text}
          </h2>

          <div className="mt-8 space-y-6 [@media(max-height:800px)]:mt-5 [@media(max-height:800px)]:space-y-4">
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
            className="mt-10 [@media(max-height:800px)]:mt-6 text-balance text-[clamp(1.6rem,1.3rem+1.4vw,2.25rem)] leading-[1.2] font-semibold tracking-[var(--tracking-wide)] text-terracotta-deep uppercase"
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

function StaticScene() {
  return (
    <div data-home-scene="hero-philosophy-static" className="relative isolate bg-paper">
      <div className="relative min-h-dvh overflow-hidden">
        <Image
          src={getFrameSrc(0)}
          alt=""
          fill
          loading="eager"
          sizes="100vw"
          className="object-cover"
        />
        <HeroContent />
      </div>
      <div className="relative min-h-dvh overflow-hidden">
        <Image
          src={getFrameSrc(FRAME_COUNT - 1)}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <PhilosophyContent />
      </div>
    </div>
  );
}
