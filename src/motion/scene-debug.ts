"use client";

/**
 * Opt-in diagnostics for the scroll scenes (currently the Home
 * Hero → Philosophy frame scrub). TEMPORARY — remove once the production
 * compatibility investigation is closed.
 *
 * - Development (`next dev`): important events only — why the scrub is off,
 *   init summary, failed frame URLs. No per-frame logging.
 * - Anywhere, including production: add `?debugScene=1` to the URL to turn
 *   on verbose mode (throttled progress/frame logs + an on-screen panel).
 *   It persists in localStorage until `?debugScene=0`.
 * - Production without the flag: silent.
 */

const FLAG = "debugScene";
const LOG_THROTTLE_MS = 250;

export const isDevBuild = process.env.NODE_ENV === "development";

export function isSceneDebugEnabled(): boolean {
  if (typeof window === "undefined") return false;
  const param = new URLSearchParams(window.location.search).get(FLAG);
  try {
    if (param === "1") window.localStorage.setItem(FLAG, "1");
    else if (param === "0") window.localStorage.removeItem(FLAG);
    return window.localStorage.getItem(FLAG) === "1";
  } catch {
    return param === "1";
  }
}

type DebugValue = string | number | boolean | null;

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
  let panel: HTMLPreElement | null = null;

  if (verbose) {
    panel = document.createElement("pre");
    panel.setAttribute("data-scene-debug", label);
    Object.assign(panel.style, {
      position: "fixed",
      left: "8px",
      bottom: "8px",
      zIndex: "2147483647",
      margin: "0",
      padding: "8px 10px",
      maxWidth: "min(92vw, 360px)",
      font: "11px/1.45 ui-monospace, Menlo, Consolas, monospace",
      color: "#fff",
      background: "rgba(20, 16, 14, 0.82)",
      borderRadius: "6px",
      pointerEvents: "none",
      whiteSpace: "pre-wrap",
    } satisfies Partial<CSSStyleDeclaration>);
    document.body.appendChild(panel);
    (window as unknown as Record<string, unknown>).__sceneDebug = () => ({ ...state });
  }

  const render = () => {
    if (!panel) return;
    panel.textContent =
      `[${label}]\n` +
      Object.entries(state)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");
  };

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
      render();
      if (verbose && log) {
        const now = performance.now();
        if (now - lastLog > LOG_THROTTLE_MS) {
          lastLog = now;
          console.debug(`[${label}]`, { ...state });
        }
      }
    },
    destroy() {
      panel?.remove();
      panel = null;
    },
  };
}
