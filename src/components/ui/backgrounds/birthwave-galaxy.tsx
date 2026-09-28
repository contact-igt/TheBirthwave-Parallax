"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import { useReducedMotion } from "@/motion/reduced-motion";
import { cx } from "@/lib/cx";
import type { GalaxyProps } from "./galaxy";

/**
 * Birthwave ambient layer built on the React Bits Galaxy shader
 * (./galaxy.tsx) — tuned to read as soft floating light / warm dust on a
 * light surface, not a star field. A decorative, transparent, full-bleed
 * layer: place it inside a `relative` container, behind the content.
 *
 * - Client-only and code-split: `ogl` + the shader load only where this is
 *   mounted, never during SSR (no hydration surface).
 * - Tint mode: glow is painted in dusty rose (#CA9585), with an occasional
 *   pale-blue (#CFE3EF) nuance, instead of the shader's white/violet light.
 * - Intensity steps down at tablet and phone widths.
 * - No pointer interaction; prefers-reduced-motion draws one frozen frame.
 * - Pauses itself while off-screen (see galaxy.tsx).
 */
const Galaxy = dynamic(() => import("./galaxy"), { ssr: false });

const hexToRgb = (hex: string): [number, number, number] => {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

/**
 * Desktop values — fewer, larger, softer glows (low density, generous
 * glow, a floor that drops the faintest micro-points): noticed as soft
 * moving light, never as stars or dust. Tablet/phone scale down.
 */
export const BIRTHWAVE_GALAXY = {
  starSpeed: 0.14,
  density: 0.32,
  speed: 0.16,
  glowIntensity: 0.3,
  saturation: 0.45,
  hueShift: 140,
  repulsionStrength: 0,
  twinkleIntensity: 0.12,
  rotationSpeed: 0.025,
  tint: {
    warm: hexToRgb("#CA9585"),
    // A softened coral (#F88379 blended toward the dusty rose) for variety.
    warmAlt: hexToRgb("#E78C7F"),
    warmAltAmount: 0.6,
    cool: hexToRgb("#CFE3EF"),
    coolAmount: 0.4,
    opacity: 0.85,
    // Drops the faintest far-layer points so it reads as soft glows, not dust.
    floor: 0.08,
  },
} satisfies GalaxyProps;

const SCALE = {
  desktop: { density: 1, glow: 1, speed: 1 },
  tablet: { density: 0.85, glow: 0.85, speed: 0.95 },
  mobile: { density: 0.65, glow: 0.7, speed: 0.8 },
} as const;

type Bucket = keyof typeof SCALE;
const TABLET_QUERY = "(min-width: 768px)";
const DESKTOP_QUERY = "(min-width: 1024px)";

function subscribe(onChange: () => void) {
  const mqs = [window.matchMedia(TABLET_QUERY), window.matchMedia(DESKTOP_QUERY)];
  mqs.forEach((mq) => mq.addEventListener("change", onChange));
  return () => mqs.forEach((mq) => mq.removeEventListener("change", onChange));
}
function getBucket(): Bucket {
  if (window.matchMedia(DESKTOP_QUERY).matches) return "desktop";
  if (window.matchMedia(TABLET_QUERY).matches) return "tablet";
  return "mobile";
}

export function BirthwaveGalaxy({
  className,
  ...overrides
}: Omit<GalaxyProps, "transparent" | "mouseInteraction" | "mouseRepulsion" | "disableAnimation" | "lightMode"> & {
  className?: string;
}) {
  const reducedMotion = useReducedMotion();
  // The Galaxy itself only mounts client-side, so the server snapshot is
  // never rendered into the canvas — it just keeps hydration consistent.
  const bucket = useSyncExternalStore(subscribe, getBucket, () => "desktop" as Bucket);
  const s = SCALE[bucket];
  const base = { ...BIRTHWAVE_GALAXY, ...overrides };

  return (
    <div aria-hidden="true" className={cx("pointer-events-none absolute inset-0", className)}>
      <Galaxy
        {...base}
        density={base.density * s.density}
        glowIntensity={base.glowIntensity * s.glow}
        speed={base.speed * s.speed}
        transparent
        mouseInteraction={false}
        mouseRepulsion={false}
        disableAnimation={reducedMotion}
      />
    </div>
  );
}
