"use client";

import { memo, useEffect, useId, useRef } from "react";
import { useReducedMotion } from "@/motion/reduced-motion";
import type { DotFieldColorToken } from "@/motion/ambient-dot-field";

const TWO_PI = Math.PI * 2;

interface DotState {
  ax: number;
  ay: number;
  sx: number;
  sy: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
}

interface MouseState {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  speed: number;
}

interface SizeState {
  w: number;
  h: number;
  offsetX: number;
  offsetY: number;
}

export interface DotFieldProps {
  dotRadius?: number;
  dotSpacing?: number;
  cursorRadius?: number;
  cursorForce?: number;
  bulgeOnly?: boolean;
  bulgeStrength?: number;
  /** 0 disables the glow overlay entirely — no SVG node, no per-frame work. */
  glowRadius?: number;
  sparkle?: boolean;
  /** All five below drive the idle flow field — a continuous, large-
   * wavelength travelling wave that moves the whole grid's position on
   * its own, independent of the cursor. Position-only: no radius or
   * opacity variation (see tick()'s comment for why that's deliberate
   * this time). 0 amplitude (both X and Y) disables it entirely — dead
   * work skipped, not just made invisible, same convention as
   * `glowRadius`. Every value is named and owned by
   * src/motion/ambient-dot-field.ts; none is a bare constant here. */
  flowAmplitudeX?: number;
  flowAmplitudeY?: number;
  flowCycleSeconds?: number;
  flowWavelengthPx?: number;
  /** Degrees, canvas convention (0 = +x/right, 90 = +y/down). The flow
   * pattern travels in this direction as time advances. */
  flowDirectionDeg?: number;
  /** Required, not defaulted: every caller must name a real Birthwave
   * token (see src/motion/ambient-dot-field.ts) — there is no built-in
   * color here to fall back to, so nothing purple can leak in by omission. */
  gradientFrom: DotFieldColorToken;
  gradientTo: DotFieldColorToken;
  glowColor: DotFieldColorToken;
  className?: string;
}

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.trim().replace("#", "");
  const full = clean.length === 3
    ? clean.split("").map((c) => c + c).join("")
    : clean;
  const r = Number.parseInt(full.slice(0, 2), 16);
  const g = Number.parseInt(full.slice(2, 4), 16);
  const b = Number.parseInt(full.slice(4, 6), 16);
  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return "transparent";
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Resolves a design-token reference to a canvas-usable rgba string. Canvas
 * doesn't participate in the CSS cascade, so `ctx.fillStyle = "var(--x)"`
 * silently does nothing — this reads the token's actual computed value
 * instead. Tokens don't change at runtime in this project, so this only
 * needs to run once per mount, not per frame. */
function resolveTokenColor(descriptor: DotFieldColorToken): string {
  if (typeof window === "undefined") return "transparent";
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(descriptor.token)
    .trim();
  return hexToRgba(raw, descriptor.alpha);
}

/**
 * A quiet field of dots used as ambient background texture — adapted from
 * a supplied React Bits DotField. Converted to TypeScript and changed
 * from the source in several ways required for how it's used here:
 *
 * - Colors are resolved from Birthwave design tokens at runtime, never
 *   hardcoded (see `gradientFrom`/`gradientTo`/`glowColor` above).
 * - `prefers-reduced-motion`: no rAF loop, no cursor listener at all — the
 *   dots are drawn once at rest and never move again.
 * - No cursor interaction on touch/coarse-pointer devices (checked once;
 *   pointer capability doesn't change mid-session).
 * - The animation loop pauses while the tab is hidden and resumes when it
 *   isn't, and separately pauses while the canvas has scrolled entirely
 *   out of view (this canvas can span several sections' worth of height).
 * - `ResizeObserver` on the container instead of a global resize listener.
 * - Device pixel ratio capped at 1.5, not 2.
 * - The glow overlay (SVG + radial gradient) isn't rendered at all when
 *   `glowRadius` is 0 — dead work removed, not just made invisible.
 * - `pointer-events: none` and `aria-hidden="true"` are fixed on the
 *   container, not left to the caller to remember.
 * - The unique gradient id uses React's `useId`, not `Math.random()` —
 *   the source's version could mismatch between server and client render.
 * - An idle flow field (`flowAmplitudeX`/`Y` and friends, below) runs
 *   every frame regardless of cursor state or `bulgeOnly` — verified,
 *   not assumed: it's added to each dot's draw position *after* the
 *   bulge/cursor easing above it, never gated on `isBulge` or on cursor
 *   engagement, so it's visible with the mouse never having moved. A
 *   large-wavelength travelling wave (phase from each dot's own rest
 *   position) offsets every dot's x/y together — no radius or opacity
 *   change, position only — so neighboring dots move as one continuous
 *   bending surface rather than pulsing individually. See `tick()`.
 */
export const DotField = memo(function DotField({
  dotRadius = 1.5,
  dotSpacing = 14,
  cursorRadius = 500,
  cursorForce = 0.1,
  bulgeOnly = true,
  bulgeStrength = 67,
  glowRadius = 160,
  sparkle = false,
  flowAmplitudeX = 0,
  flowAmplitudeY = 0,
  flowCycleSeconds = 6,
  flowWavelengthPx = 450,
  flowDirectionDeg = -45,
  gradientFrom,
  gradientTo,
  glowColor,
  className,
}: DotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);
  const glowStopRef = useRef<SVGStopElement>(null);
  const dotsRef = useRef<DotState[]>([]);
  const mouseRef = useRef<MouseState>({ x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 });
  const rafRef = useRef<number | null>(null);
  const sizeRef = useRef<SizeState>({ w: 0, h: 0, offsetX: 0, offsetY: 0 });
  const glowOpacity = useRef(0);
  const engagement = useRef(0);
  const resolvedColorsRef = useRef({ from: "transparent", to: "transparent", glow: "transparent" });
  const glowId = useId();
  const reducedMotion = useReducedMotion();

  const propsRef = useRef({
    dotRadius,
    dotSpacing,
    cursorRadius,
    cursorForce,
    bulgeOnly,
    bulgeStrength,
    sparkle,
    flowAmplitudeX,
    flowAmplitudeY,
    flowCycleSeconds,
    flowWavelengthPx,
    flowDirectionDeg,
  });
  propsRef.current = {
    dotRadius,
    dotSpacing,
    cursorRadius,
    cursorForce,
    bulgeOnly,
    bulgeStrength,
    sparkle,
    flowAmplitudeX,
    flowAmplitudeY,
    flowCycleSeconds,
    flowWavelengthPx,
    flowDirectionDeg,
  };

  const rebuildRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const glowEl = glowRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const isCoarsePointer =
      typeof window.matchMedia === "function" && window.matchMedia("(pointer: coarse)").matches;

    resolvedColorsRef.current = {
      from: resolveTokenColor(gradientFrom),
      to: resolveTokenColor(gradientTo),
      glow: resolveTokenColor(glowColor),
    };
    // Set imperatively, same as the canvas fill colors below — a ref read
    // during JSX render would freeze at the pre-resolution "transparent"
    // default, since updating a ref never triggers a re-render.
    glowStopRef.current?.setAttribute("stop-color", resolvedColorsRef.current.glow);

    let resizeTimer: ReturnType<typeof setTimeout>;

    function buildDots(w: number, h: number) {
      const p = propsRef.current;
      const step = p.dotRadius + p.dotSpacing;
      const cols = Math.floor(w / step);
      const rows = Math.floor(h / step);
      const padX = (w % step) / 2;
      const padY = (h % step) / 2;
      const dots: DotState[] = new Array(Math.max(rows * cols, 0));
      let idx = 0;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const ax = padX + col * step + step / 2;
          const ay = padY + row * step + step / 2;
          dots[idx++] = { ax, ay, sx: ax, sy: ay, vx: 0, vy: 0, x: ax, y: ay };
        }
      }
      dotsRef.current = dots;
    }

    function drawStatic() {
      const { w, h } = sizeRef.current;
      const dots = dotsRef.current;
      const rad = propsRef.current.dotRadius / 2;

      ctx!.clearRect(0, 0, w, h);
      const grad = ctx!.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, resolvedColorsRef.current.from);
      grad.addColorStop(1, resolvedColorsRef.current.to);
      ctx!.fillStyle = grad;

      ctx!.beginPath();
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        ctx!.moveTo(d.ax + rad, d.ay);
        ctx!.arc(d.ax, d.ay, rad, 0, TWO_PI);
      }
      ctx!.fill();
    }

    function doResize() {
      // Re-narrowed locally: a function *declaration* is hoisted, so TS
      // can't carry the effect-body-level `if (!canvas) return` narrowing
      // into it even though canvas is a const closed over from that scope.
      const canvasEl = canvas!;
      const parent = canvasEl.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      canvasEl.width = w * dpr;
      canvasEl.height = h * dpr;
      canvasEl.style.width = `${w}px`;
      canvasEl.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      sizeRef.current = {
        w,
        h,
        offsetX: rect.left + window.scrollX,
        offsetY: rect.top + window.scrollY,
      };

      buildDots(w, h);
      if (reducedMotion) drawStatic();
    }

    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(doResize, 100);
    }

    rebuildRef.current = () => {
      const { w, h } = sizeRef.current;
      if (w > 0 && h > 0) {
        buildDots(w, h);
        if (reducedMotion) drawStatic();
      }
    };

    doResize();

    const resizeObserver = new ResizeObserver(onResize);
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);

    // Reduced motion: draw once, attach nothing else. No rAF loop ever
    // starts, so there's no cursor listener, no interval, nothing to pause.
    if (reducedMotion) {
      return () => {
        clearTimeout(resizeTimer);
        resizeObserver.disconnect();
      };
    }

    function onMouseMove(e: MouseEvent) {
      const s = sizeRef.current;
      mouseRef.current.x = e.pageX - s.offsetX;
      mouseRef.current.y = e.pageY - s.offsetY;
    }

    function updateMouseSpeed() {
      const m = mouseRef.current;
      const dx = m.prevX - m.x;
      const dy = m.prevY - m.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      m.speed += (dist - m.speed) * 0.5;
      if (m.speed < 0.001) m.speed = 0;
      m.prevX = m.x;
      m.prevY = m.y;
    }

    const speedInterval = setInterval(updateMouseSpeed, 20);

    let frameCount = 0;
    let inView = true;

    function tick() {
      frameCount++;
      const dots = dotsRef.current;
      const m = mouseRef.current;
      const { w, h } = sizeRef.current;
      const p = propsRef.current;
      const len = dots.length;

      const targetEngagement = Math.min(m.speed / 5, 1);
      engagement.current += (targetEngagement - engagement.current) * 0.06;
      if (engagement.current < 0.001) engagement.current = 0;
      const eng = engagement.current;

      if (glowRadius > 0 && glowEl) {
        glowOpacity.current += (eng - glowOpacity.current) * 0.08;
        glowEl.setAttribute("cx", String(m.x));
        glowEl.setAttribute("cy", String(m.y));
        glowEl.style.opacity = String(glowOpacity.current);
      }

      ctx!.clearRect(0, 0, w, h);

      const grad = ctx!.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, resolvedColorsRef.current.from);
      grad.addColorStop(1, resolvedColorsRef.current.to);
      ctx!.fillStyle = grad;

      const cr = p.cursorRadius;
      const crSq = cr * cr;
      const rad = p.dotRadius / 2;
      const isBulge = p.bulgeOnly;
      const flowing = p.flowAmplitudeX !== 0 || p.flowAmplitudeY !== 0;

      // Flow field: independent of cursor state entirely, unconditional
      // on isBulge/engagement — added to each dot's draw position *after*
      // the bulge/cursor easing below, never gated on it, so it's visible
      // with the mouse never having moved (verified by reading the code
      // path, not assumed — see the class doc comment above).
      //
      // Position only, deliberately — no radius or opacity variation.
      // Earlier passes pulsed radius/opacity per dot, which read as dots
      // individually breathing, not a continuous field; a large spatial
      // wavelength (`flowWavelengthPx`, picked so ~3 cycles span a normal
      // viewport) means neighboring dots share almost the same phase, so
      // the whole local neighborhood drifts together as one bending
      // surface — the visible signature is a straight row of dots reading
      // as a gentle sine curve, not any one dot standing out.
      //
      // `flowDirectionDeg` sets which way that bend travels over time (a
      // genuine travelling plane wave, not a standing one): phase is
      // `time - k·(position · direction)`, so as time advances the crest
      // moves in the `+direction` direction — negated here because with a
      // plain `time + k·position` phase the crest moves in `-direction`
      // instead (verified against a screenshot sequence, not assumed from
      // the formula — see docs/implementation-brief.md §22).
      const flowK = TWO_PI / p.flowWavelengthPx;
      const flowDirRad = (p.flowDirectionDeg * Math.PI) / 180;
      const flowDirX = Math.cos(flowDirRad);
      const flowDirY = Math.sin(flowDirRad);
      const flowStep = flowing ? TWO_PI / (p.flowCycleSeconds * 60) : 0;
      const flowPhase = frameCount * flowStep;

      ctx!.beginPath();

      for (let i = 0; i < len; i++) {
        const d = dots[i];
        const dx = m.x - d.ax;
        const dy = m.y - d.ay;
        const distSq = dx * dx + dy * dy;

        if (distSq < crSq && eng > 0.01) {
          const dist = Math.sqrt(distSq);
          if (isBulge) {
            const bt = 1 - dist / cr;
            const push = bt * bt * p.bulgeStrength * eng;
            const angle = Math.atan2(dy, dx);
            d.sx += (d.ax - Math.cos(angle) * push - d.sx) * 0.15;
            d.sy += (d.ay - Math.sin(angle) * push - d.sy) * 0.15;
          } else {
            const angle = Math.atan2(dy, dx);
            const move = (500 / dist) * (m.speed * p.cursorForce);
            d.vx += Math.cos(angle) * -move;
            d.vy += Math.sin(angle) * -move;
          }
        } else if (isBulge) {
          d.sx += (d.ax - d.sx) * 0.1;
          d.sy += (d.ay - d.sy) * 0.1;
        }

        if (!isBulge) {
          d.vx *= 0.9;
          d.vy *= 0.9;
          d.x = d.ax + d.vx;
          d.y = d.ay + d.vy;
          d.sx += (d.x - d.sx) * 0.1;
          d.sy += (d.y - d.sy) * 0.1;
        }

        let drawX = d.sx;
        let drawY = d.sy;
        if (flowing) {
          const dotPhase = -(d.ax * flowDirX + d.ay * flowDirY) * flowK;
          const wave = Math.sin(flowPhase + dotPhase);
          drawX += wave * p.flowAmplitudeX;
          drawY += wave * p.flowAmplitudeY;
        }

        if (p.sparkle) {
          const hash = ((i * 2654435761) ^ (frameCount >> 3)) >>> 0;
          if (hash % 100 < 3) {
            ctx!.moveTo(drawX + rad * 1.8, drawY);
            ctx!.arc(drawX, drawY, rad * 1.8, 0, TWO_PI);
          } else {
            ctx!.moveTo(drawX + rad, drawY);
            ctx!.arc(drawX, drawY, rad, 0, TWO_PI);
          }
        } else {
          ctx!.moveTo(drawX + rad, drawY);
          ctx!.arc(drawX, drawY, rad, 0, TWO_PI);
        }
      }

      ctx!.fill();

      if (inView && !document.hidden) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    }

    function startLoop() {
      if (rafRef.current === null && inView && !document.hidden) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    function onVisibilityChange() {
      if (document.hidden) {
        if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      } else {
        startLoop();
      }
    }

    // This canvas can span several sections' worth of scroll height —
    // pause the whole loop while none of it is anywhere near the
    // viewport (e.g. the visitor is still in the hero, or already past
    // the closing CTA), not just when the tab itself is hidden.
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) startLoop();
        else if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      },
      { rootMargin: "50% 0px 50% 0px" },
    );
    intersectionObserver.observe(canvas);

    if (!isCoarsePointer) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
    }
    document.addEventListener("visibilitychange", onVisibilityChange);
    startLoop();

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      clearInterval(speedInterval);
      clearTimeout(resizeTimer);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (!isCoarsePointer) window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
    // gradientFrom/gradientTo/glowColor are token descriptors resolved
    // once per effect run; a caller changing which token to use is rare
    // enough that re-running the whole setup is the right trade-off.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, glowRadius]);

  useEffect(() => {
    rebuildRef.current?.();
  }, [dotRadius, dotSpacing]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative h-full w-full ${className ?? ""}`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {glowRadius > 0 ? (
        <svg className="pointer-events-none absolute inset-0 h-full w-full">
          <defs>
            <radialGradient id={glowId}>
              <stop ref={glowStopRef} offset="0%" stopColor="transparent" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <circle
            ref={glowRef}
            cx={-9999}
            cy={-9999}
            r={glowRadius}
            fill={`url(#${glowId})`}
            style={{ opacity: 0, willChange: "opacity" }}
          />
        </svg>
      ) : null}
    </div>
  );
});
