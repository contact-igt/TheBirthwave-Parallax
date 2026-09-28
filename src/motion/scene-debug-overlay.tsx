"use client";

import { Suspense, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useSearchParams } from "next/navigation";
import {
  SCENE_DEBUG_PARAM,
  getSceneDebugSnapshot,
  isSceneDebugParam,
  subscribeSceneDebug,
} from "./scene-debug";

const noopSubscribe = () => () => {};
const getNull = () => null;

/**
 * The only visible debug UI for the scroll scenes. Renders solely while the
 * current URL has exactly `?debugScene=1` — read live via useSearchParams, so
 * client-side navigation to or from the debug URL shows/hides it. Suspense:
 * useSearchParams bails the subtree out of static prerendering; the fallback
 * is nothing, so the server HTML never contains the panel.
 */
export function SceneDebugOverlay({ label }: { label: string }) {
  return (
    <Suspense fallback={null}>
      <SceneDebugPanel label={label} />
    </Suspense>
  );
}

function SceneDebugPanel({ label }: { label: string }) {
  const debugScene = isSceneDebugParam(useSearchParams().get(SCENE_DEBUG_PARAM));
  // Not subscribed at all unless debugging — normal browsing never
  // re-renders on scene state updates.
  const state = useSyncExternalStore(
    debugScene ? subscribeSceneDebug : noopSubscribe,
    debugScene ? () => getSceneDebugSnapshot(label) : getNull,
    getNull,
  );

  if (debugScene !== true || !state) return null;

  return createPortal(
    <pre
      data-scene-debug={label}
      style={{
        position: "fixed",
        left: 8,
        bottom: 8,
        zIndex: 2147483647,
        margin: 0,
        padding: "8px 10px",
        maxWidth: "min(92vw, 360px)",
        font: "11px/1.45 ui-monospace, Menlo, Consolas, monospace",
        color: "#fff",
        background: "rgba(20, 16, 14, 0.82)",
        borderRadius: 6,
        pointerEvents: "none",
        whiteSpace: "pre-wrap",
      }}
    >
      {`[${label}]\n` +
        Object.entries(state)
          .map(([key, value]) => `${key}: ${value}`)
          .join("\n")}
    </pre>,
    document.body,
  );
}
