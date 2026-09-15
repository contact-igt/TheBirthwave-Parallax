/** Joins class names, skipping falsy values. Small enough not to justify clsx/cva as a dependency. */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
