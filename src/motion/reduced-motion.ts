"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void): () => void {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

/** Used for both the server render and the client's own first (pre-
 * hydration) render — see the hook's own doc comment for why that
 * distinction is exactly the fix. */
function getServerSnapshot(): boolean {
  return false;
}

/**
 * Tracks the user's `prefers-reduced-motion` preference live (not just at
 * mount), so parallax and other non-essential motion can turn off the
 * instant a user changes their OS setting, without a reload.
 *
 * Every other file in src/motion depends on this — it's the one place
 * that answers "should anything move right now?".
 *
 * `useSyncExternalStore` rather than a `useState(() => matchMedia(...)
 * .matches)` lazy initializer (what this used to be): that initializer
 * function is correct for SSR itself (no `window`, so it always returned
 * `false` there) but not for the *client's own first render* — that same
 * function runs there too, and by then `window` already exists, so a
 * visitor whose OS already had reduced motion on got `true` immediately,
 * on the very same render React hydrates against the server's (always-
 * `false`) markup. Any consumer whose output depended on this value
 * directly hydrated with a different attribute than the server sent —
 * confirmed via the exact mismatch this fixed, `care-section.tsx`'s
 * `PrincipleBlock`, whose `focused` (from `useScrollFocus`, itself derived
 * from this hook) differed between the two renders.
 *
 * `useSyncExternalStore`'s third argument (`getServerSnapshot`) is
 * exactly the fix React ships for this: it's used for the server render
 * *and* the client's first hydration render, so both are always `false`
 * regardless of the visitor's real preference — the real value (via
 * `getSnapshot`) is only read, and only diffed against that first
 * snapshot, once React starts committing effects after hydration, which
 * is strictly after the render it hydrated against. No manual
 * `useState`/`useEffect` pair to keep in sync by hand, and no `setState`
 * call inside an effect body either (`react-hooks/set-state-in-effect`
 * flagged exactly that shape when this was first written as a manual
 * effect instead).
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
