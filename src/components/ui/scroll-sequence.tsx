"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useCallback, useId } from "react";
import { cx } from "@/lib/cx";
import { useReducedMotion } from "@/motion/reduced-motion";

export interface FrameConfig {
  desktop: number;
  mobile: number;
}

export interface FolderConfig {
  desktop: string;
  mobile: string;
}

export interface ScrollSequenceProps {
  /** Total frame count for desktop and mobile */
  frameCount?: number | FrameConfig;
  /** Directory path containing frames */
  folder?: string | FolderConfig;
  /** Height class for the scroll track (controls scroll duration) */
  height?: string;
  /** Additional class names for the outer wrapper */
  className?: string;
  /** Additional class names for the sticky container */
  stickyClassName?: string;
  /** Additional class names for the canvas element */
  canvasClassName?: string;
  /** Easing factor for slow-motion gliding (e.g. 0.08). If omitted or <= 0, frame updates immediately on scroll */
  ease?: number;
  /** Whether to cross-fade between adjacent frames */
  crossfade?: boolean;
  /** Which frame to display for prefers-reduced-motion ("first" | "middle" | "last" | number) */
  reducedMotionFrame?: "first" | "middle" | "last" | number;
  /** Callback fired on scroll with normalized progress 0 to 1 */
  onProgress?: (progress: number) => void;
  /** Content to overlay on top of the sticky canvas */
  children?: ReactNode;
  /** Accessible label for the section */
  ariaLabel?: string;
  /** HTML id for outer track */
  id?: string;
}

const DEFAULT_FRAME_COUNT: FrameConfig = {
  desktop: 158,
  mobile: 79,
};

const DEFAULT_FOLDERS: FolderConfig = {
  desktop: "/frames/desktop",
  mobile: "/frames/mobile",
};

/**
 * Reusable scroll-driven image sequence component.
 *
 * - Mobile (<= 767px) loads mobile frames
 * - Desktop loads desktop frames
 * - Canvas draws with "cover" fit and respects devicePixelRatio (capped at 2)
 * - Optional slow-motion easing (`ease`) and frame interpolation (`crossfade`)
 * - Responsive CSS poster preview before images finish loading
 * - Fallback to nearest loaded earlier frame prevents flickering/blank canvas
 * - Respects prefers-reduced-motion (shows still frame, exposes --p, no pinned scroll)
 * - Cleans up all listeners, observers and rAF loops on unmount
 */
export function ScrollSequence({
  frameCount = DEFAULT_FRAME_COUNT,
  folder = DEFAULT_FOLDERS,
  height = "h-[300vh] md:h-[400vh]",
  className,
  stickyClassName,
  canvasClassName,
  ease,
  crossfade = false,
  reducedMotionFrame = "middle",
  onProgress,
  children,
  ariaLabel = "Scroll-driven video sequence",
  id,
}: ScrollSequenceProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const reducedMotion = useReducedMotion();
  const reactId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const seqId = id || `seq-${reactId}`;

  // Normalize frame counts
  const resolvedFrameCount: FrameConfig =
    typeof frameCount === "number"
      ? { desktop: frameCount, mobile: Math.min(frameCount, 79) }
      : frameCount;

  // Normalize folders
  const resolvedFolders: FolderConfig =
    typeof folder === "string"
      ? {
          desktop: folder.includes("desktop") ? folder : `${folder}/desktop`,
          mobile: folder.includes("mobile") ? folder : `${folder}/mobile`,
        }
      : folder;

  const onProgressRef = useRef(onProgress);
  useEffect(() => {
    onProgressRef.current = onProgress;
  }, [onProgress]);

  const isMobileRef = useRef(false);
  const activeCountRef = useRef(resolvedFrameCount.desktop);
  const activeFolderRef = useRef(resolvedFolders.desktop);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const startedRef = useRef(false);

  const shownRef = useRef(0);
  const targetRef = useRef(0);
  const runningRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const tickingRef = useRef(false);

  const getSrc = useCallback((i: number, folderPath: string) => {
    return `${folderPath}/f_${String(i + 1).padStart(4, "0")}.webp`;
  }, []);

  const getProgress = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return 0;
    const r = wrap.getBoundingClientRect();
    const total = r.height - window.innerHeight;
    return total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
  }, []);

  const paint = useCallback((img: HTMLImageElement, alpha = 1) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    if (!iw || !ih || cw === 0 || ch === 0) return;

    // "object-fit: cover"
    const s = Math.max(cw / iw, ch / ih);
    const w = iw * s;
    const h = ih * s;
    const dx = (cw - w) / 2;
    const dy = (ch - h) / 2;

    ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
    ctx.drawImage(img, dx, dy, w, h);
    ctx.globalAlpha = 1;
  }, []);

  const ok = useCallback((img: HTMLImageElement | undefined): img is HTMLImageElement => {
    return Boolean(img && img.complete && img.naturalWidth > 0);
  }, []);

  const drawFrame = useCallback(
    (val: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const count = activeCountRef.current;
      const frames = framesRef.current;
      if (count <= 0 || !frames || frames.length === 0) return;

      let a = Math.floor(val);
      const t = val - a;

      while (a > 0 && !ok(frames[a])) {
        a--;
      }
      const imgA = frames[a];
      if (!ok(imgA)) return;

      paint(imgA, 1);

      if (crossfade) {
        const b = a + 1;
        const imgB = frames[b];
        if (t > 0.01 && b < count && ok(imgB)) {
          paint(imgB, t);
        }
      }
    },
    [crossfade, ok, paint]
  );

  const tickRef = useRef<() => void>(() => {});

  const tick = useCallback(() => {
    const wrap = wrapRef.current;
    const count = activeCountRef.current;
    if (count <= 0) {
      runningRef.current = false;
      return;
    }

    const currentP = getProgress();
    const target = currentP * (count - 1);
    targetRef.current = target;

    const currentShown = shownRef.current;
    const easeFactor = ease && ease > 0 ? ease : 0.08;
    const nextShown = currentShown + (target - currentShown) * easeFactor;

    if (Math.abs(target - nextShown) < 0.005) {
      shownRef.current = target;
    } else {
      shownRef.current = nextShown;
    }

    drawFrame(shownRef.current);

    const easedP = count > 1 ? shownRef.current / (count - 1) : 0;
    if (wrap) {
      wrap.style.setProperty("--p", easedP.toFixed(4));
    }
    onProgressRef.current?.(easedP);

    if (shownRef.current !== target) {
      rafIdRef.current = requestAnimationFrame(() => {
        tickRef.current();
      });
    } else {
      runningRef.current = false;
    }
  }, [ease, getProgress, drawFrame]);

  useEffect(() => {
    tickRef.current = tick;
  }, [tick]);

  const drawDirect = useCallback(() => {
    const wrap = wrapRef.current;
    const count = activeCountRef.current;
    if (count <= 0) return;

    const p = getProgress();
    const target = p * (count - 1);
    shownRef.current = target;
    targetRef.current = target;

    drawFrame(target);

    if (wrap) {
      wrap.style.setProperty("--p", p.toFixed(4));
    }
    onProgressRef.current?.(p);
  }, [getProgress, drawFrame]);

  const kick = useCallback(() => {
    if (ease && ease > 0) {
      if (!runningRef.current) {
        runningRef.current = true;
        rafIdRef.current = requestAnimationFrame(() => {
          tickRef.current();
        });
      }
    } else {
      if (tickingRef.current) return;
      tickingRef.current = true;
      rafIdRef.current = requestAnimationFrame(() => {
        drawDirect();
        tickingRef.current = false;
      });
    }
  }, [ease, drawDirect]);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (w === 0 || h === 0) return;

    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);

    if (ease && ease > 0) {
      drawFrame(shownRef.current);
    } else {
      drawDirect();
    }
  }, [ease, drawDirect, drawFrame]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const mediaQueryMobile = window.matchMedia("(max-width: 767px)");
    const isMob = mediaQueryMobile.matches;

    isMobileRef.current = isMob;
    activeCountRef.current = isMob ? resolvedFrameCount.mobile : resolvedFrameCount.desktop;
    activeFolderRef.current = isMob ? resolvedFolders.mobile : resolvedFolders.desktop;

    const folderPath = activeFolderRef.current;
    const count = activeCountRef.current;

    // Reduced motion: show still frame, no scroll pinning
    if (reducedMotion) {
      let stillIndex = Math.floor(count / 2);
      if (reducedMotionFrame === "first") {
        stillIndex = 0;
      } else if (reducedMotionFrame === "last") {
        stillIndex = count - 1;
      } else if (typeof reducedMotionFrame === "number") {
        stillIndex = Math.max(0, Math.min(count - 1, Math.round(reducedMotionFrame)));
      }

      const stillImg = new Image();
      stillImg.onload = () => {
        framesRef.current = [stillImg];
        resize();
        paint(stillImg, 1);
      };
      stillImg.src = getSrc(stillIndex, folderPath);

      const pVal = reducedMotionFrame === "last" ? 1 : 0;
      wrap.style.setProperty("--p", String(pVal));
      onProgressRef.current?.(pVal);
      return;
    }

    // Initialize progress & canvas sizing
    const initP = getProgress();
    shownRef.current = initP * (count - 1);
    targetRef.current = shownRef.current;
    wrap.style.setProperty("--p", initP.toFixed(4));
    resize();

    // Loader function
    const load = () => {
      if (startedRef.current) return;
      startedRef.current = true;

      const frames = new Array<HTMLImageElement>(count);
      framesRef.current = frames;

      for (let i = 0; i < count; i++) {
        const img = new Image();
        img.decoding = "async";
        img.src = getSrc(i, folderPath);
        if (i === 0) {
          img.onload = () => {
            resize();
            kick();
          };
          if (img.complete && img.naturalWidth > 0) {
            resize();
            kick();
          }
        }
        frames[i] = img;
      }
    };

    // Preload when within ~1.5 screens of viewport
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          load();
          io.disconnect();
        }
      },
      { rootMargin: "150% 0px" }
    );
    io.observe(wrap);

    const handleResize = () => {
      const currentMob = mediaQueryMobile.matches;
      if (currentMob !== isMobileRef.current) {
        isMobileRef.current = currentMob;
        activeCountRef.current = currentMob
          ? resolvedFrameCount.mobile
          : resolvedFrameCount.desktop;
        activeFolderRef.current = currentMob
          ? resolvedFolders.mobile
          : resolvedFolders.desktop;
        startedRef.current = false;
        load();
      }
      resize();
    };

    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", handleResize);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [
    getSrc,
    getProgress,
    kick,
    paint,
    resize,
    resolvedFrameCount.desktop,
    resolvedFrameCount.mobile,
    resolvedFolders.desktop,
    resolvedFolders.mobile,
    reducedMotion,
    reducedMotionFrame,
  ]);

  const desktopPoster = `${resolvedFolders.desktop}/f_0001.webp`;
  const mobilePoster = `${resolvedFolders.mobile}/f_0001.webp`;

  return (
    <div
      ref={wrapRef}
      id={id}
      aria-label={ariaLabel}
      className={cx(
        "scroll-seq-wrap relative w-full",
        reducedMotion ? "seq-static !h-auto min-h-screen" : height,
        className
      )}
    >
      <div
        className={cx(
          "pointer-events-none w-full overflow-hidden bg-black",
          reducedMotion
            ? "relative min-h-[100svh] !h-auto"
            : "sticky top-0 h-screen h-[100svh]",
          stickyClassName
        )}
      >
        {/* Responsive CSS poster background before canvas paints */}
        <canvas
          ref={canvasRef}
          data-scroll-seq-canvas={seqId}
          aria-hidden="true"
          className={cx(
            "pointer-events-none absolute inset-0 block h-full w-full bg-black",
            canvasClassName
          )}
          style={{
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />

        <style>{`
          .scroll-seq-wrap.seq-static {
            height: auto !important;
            min-height: 100svh;
          }
          [data-scroll-seq-canvas="${seqId}"] {
            background-image: url('${desktopPoster}');
          }
          @media (max-width: 767px) {
            [data-scroll-seq-canvas="${seqId}"] {
              background-image: url('${mobilePoster}');
            }
          }
        `}</style>

        {/* Overlay Content */}
        <div className="pointer-events-none absolute inset-0 z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
