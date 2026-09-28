"use client";

/**
 * Opt-in diagnostics for the scroll scenes (currently the Home
 * Hero → Philosophy frame scrub). TEMPORARY — remove once the production
 * compatibility investigation is closed.
 *
 * Two separate layers:
 * - Internal utilities (this file): console logging, `window.__sceneDebug`
 *   and an in-memory state store. They never create visible UI.
 *   - Development (`next dev`): important events only — why the scrub is
 *     off, init summary, failed frame URLs. No per-frame logging.
 *   - `?debugScene=1` in the URL at mount: verbose mode (throttled
 *     progress/frame logs, `window.__sceneDebug()`).
 * - The visible panel (scene-debug-overlay.tsx): renders the store only
 *   while the *current* URL has exactly `debugScene=1`. Nothing persists —
 *   no localStorage/sessionStorage, no env default.
 */

export const SCENE_DEBUG_PARAM = "debugScene";
const LOG_THROTTLE_MS = 250;

export const isDevBuild = process.env.NODE_ENV === "development";

/** The one debug predicate: the URL says exactly `debugScene=1`. */
export function isSceneDebugParam(value: string | null): boolean {
  return value === "1";
}

export function isSceneDebugEnabled(): boolean {
  if (typeof window === "undefined") return false;
  return isSceneDebugParam(new URLSearchParams(window.location.search).get(SCENE_DEBUG_PARAM));
}

// Earlier builds persisted the flag in localStorage, which kept the panel
// on for plain URLs. Clear any stale key those builds left behind.
if (typeof window !== "undefined") {
  try {
    window.localStorage.removeItem(SCENE_DEBUG_PARAM);
  } catch {
    // Storage unavailable — nothing to clean.
  }
}

type DebugValue = string | number | boolean | null;
export type SceneDebugSnapshot = Readonly<Record<string, DebugValue>>;

// ── State store (read by the overlay via useSyncExternalStore) ─────────────
const snapshots = new Map<string, SceneDebugSnapshot>();
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((listener) => listener());

export function subscribeSceneDebug(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSceneDebugSnapshot(label: string): SceneDebugSnapshot | null {
  return snapshots.get(label) ?? null;
}

export type SceneDebug = {
  verbose: boolean;
  info: (message: string, data?: unknown) => void;
  warn: (message: string, data?: unknown) => void;
  /** Merge values into the debug state; `log` emits a throttled verbose log. */
  update: (patch: Record<string, DebugValue>, log?: boolean) => void;
  destroy: () => void;
};

export function createSceneDebug(label: string): SceneDebug {
  const verbose = isSceneDebugEnabled();
  const essential = verbose || isDevBuild;
  const state: Record<string, DebugValue> = {};
  let lastLog = 0;

  if (verbose) {
    // Console access only — never renders anything by itself.
    (window as unknown as Record<string, unknown>).__sceneDebug = () => ({ ...state });
  }

  return {
    verbose,
    info(message, data) {
      if (essential) console.info(`[${label}] ${message}`, data ?? "");
    },
    warn(message, data) {
      if (essential) console.warn(`[${label}] ${message}`, data ?? "");
    },
    update(patch, log = false) {
      Object.assign(state, patch);
      snapshots.set(label, { ...state });
      notify();
      if (verbose && log) {
        const now = performance.now();
        if (now - lastLog > LOG_THROTTLE_MS) {
          lastLog = now;
          console.debug(`[${label}]`, { ...state });
        }
      }
    },
    destroy() {
      snapshots.delete(label);
      notify();
    },
  };
}
