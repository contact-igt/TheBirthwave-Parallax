/**
 * The three confirmed brand hues, cycled by index — never a fourth
 * invented colour. Pulled out of `portrait-placeholder.tsx` (which stays
 * `"use client"` for its own `useParallax` hook) into its own plain
 * server-safe module, purely so a Server Component can compute a
 * gradient string for a `MediaPlaceholder`/inline style without
 * "importing a client function from the server" — the array and function
 * themselves touch no browser API and never did.
 */
const PORTRAIT_GRADIENTS = [
  "linear-gradient(155deg, var(--color-paper-dim) 0%, var(--color-terracotta) 100%)",
  "linear-gradient(155deg, var(--color-paper-dim) 0%, var(--color-sky) 100%)",
  "linear-gradient(155deg, var(--color-paper-dim) 0%, var(--color-coral) 100%)",
] as const;

export function portraitGradient(index: number): string {
  return PORTRAIT_GRADIENTS[index % PORTRAIT_GRADIENTS.length];
}
