"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useCallback } from "react";
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
 * - Mobile (<= 767px) loads mobile frames (default 79 frames, 900px wide)
 * - Desktop loads desktop frames (default 158 frames, 1600px wide)
 * - Canvas draws with "cover" fit and respects devicePixelRatio (capped at 2)
 * - Updates on scroll via requestAnimationFrame
 * - Fallback to nearest loaded earlier frame prevents flickering/blank canvas
 * - Immediate poster preview before images finish loading
 * - Respects prefers-reduced-motion (shows one still frame, no pinned scroll)
 * - Cleans up all listeners, observers and rAF loops on unmount
 */
export function ScrollSequence({
  frameCount = DEFAULT_FRAME_COUNT,
  folder = DEFAULT_FOLDERS,
  height = "h-[300vh] md:h-[400vh]",
  className,
  stickyClassName,
  canvasClassName,
  onProgress,
  children,
  ariaLabel = "Scroll-driven video sequence",
  id,
}: ScrollSequenceProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const reducedMotion = useReducedMotion();

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
  const currentFrameRef = useRef(-1);
  const startedRef = useRef(false);

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

  const paint = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    if (!iw || !ih || cw === 0 || ch === 0) return;

    // "object-fit: cover" fit
    const s = Math.max(cw / iw, ch / ih);
    const w = iw * s;
    const h = ih * s;
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
  }, []);

  const draw = useCallback(() => {
    const p = getProgress();
    onProgressRef.current?.(p);

    const count = activeCountRef.current;
    if (count <= 0) return;

    let i = Math.round(p * (count - 1));
    const frames = framesRef.current;

    // If target frame hasn't loaded yet, show nearest earlier loaded frame
    while (i > 0 && !(frames[i] && frames[i].complete && frames[i].naturalWidth)) {
      i--;
    }

    const img = frames[i];
    if (i === currentFrameRef.current || !img || !img.complete || !img.naturalWidth) return;
    currentFrameRef.current = i;
    paint(img);
  }, [getProgress, paint]);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (w === 0 || h === 0) return;

    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    currentFrameRef.current = -1; // Force redraw on resize
    draw();
  }, [draw]);

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

    let rafId: number | null = null;
    let ticking = false;

    // Reduced motion: show one still frame, no scroll pinning
    if (reducedMotion) {
      const stillImg = new Image();
      stillImg.onload = () => {
        framesRef.current = [stillImg];
        resize();
        paint(stillImg);
      };
      stillImg.src = getSrc(Math.floor(count / 2), folderPath);
      onProgressRef.current?.(0);
      return;
    }

    // Set initial canvas sizing
    resize();

    // Loader function
    const load = () => {
      if (startedRef.current) return;
      startedRef.current = true;

      const frames = new Array<HTMLImageElement>(count);
      framesRef.current = frames;

      // Load first frame first so something displays immediately, then the rest
      for (let i = 0; i < count; i++) {
        const img = new Image();
        img.decoding = "async";
        img.src = getSrc(i, folderPath);
        if (i === 0) {
          img.onload = () => {
            resize();
            draw();
          };
          if (img.complete && img.naturalWidth > 0) {
            resize();
            draw();
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

    // Initial draw & progress trigger
    draw();

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(() => {
        draw();
        ticking = false;
      });
    };

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
        currentFrameRef.current = -1;
        load();
      }
      resize();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [
    getSrc,
    draw,
    paint,
    resize,
    resolvedFrameCount.desktop,
    resolvedFrameCount.mobile,
    resolvedFolders.desktop,
    resolvedFolders.mobile,
    reducedMotion,
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
        reducedMotion ? "seq-static h-auto" : height,
        className
      )}
    >
      <div
        className={cx(
          "pointer-events-none w-full overflow-hidden bg-black",
          reducedMotion
            ? "relative min-h-[100svh] h-screen"
            : "sticky top-0 h-screen h-[100svh]",
          stickyClassName
        )}
      >
        {/* Responsive CSS poster background before canvas paints */}
        <canvas
          ref={canvasRef}
          data-scroll-seq-canvas=""
          aria-hidden="true"
          className={cx("pointer-events-none absolute inset-0 h-full w-full block bg-black", canvasClassName)}
          style={{
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />

        <style>{`
          .scroll-seq-wrap {
            height: 400vh;
          }
          @media (max-width: 767px) {
            .scroll-seq-wrap {
              height: 300vh;
            }
          }
          .scroll-seq-wrap.seq-static {
            height: auto !important;
            min-height: 100svh;
          }
          [data-scroll-seq-canvas] {
            background-image: url('${desktopPoster}');
          }
          @media (max-width: 767px) {
            [data-scroll-seq-canvas] {
              background-image: url('${mobilePoster}');
            }
          }
        `}</style>

        {/* Overlay Content */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {children}
        </div>
      </div>
    </div>
  );
}
