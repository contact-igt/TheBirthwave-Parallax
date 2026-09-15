const ACCENT_VARS = ["--color-terracotta", "--color-sky", "--color-coral"] as const;

/** Cycles through the three confirmed brand hues for per-index accent tinting. */
export function accentVar(index: number): string {
  return `var(${ACCENT_VARS[index % ACCENT_VARS.length]})`;
}
