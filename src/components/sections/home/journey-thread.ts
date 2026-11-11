/**
 * The hero's heart line hands over to the Journey route here (desktop only).
 * Both scenes call this so the two halves of the thread meet at the same x:
 * the route's centre, nudged right if the Journey heading would be crossed.
 */
export const THREAD_MIN_WIDTH = 1024;
const HEADING_GAP = 48;

/** Viewport x (px) where the thread crosses from the hero into the Journey section. */
export function getJourneyThreadEntryX(): number | null {
  const section = document.getElementById("journey");
  const route = section?.querySelector<HTMLElement>("[data-journey-route]");
  if (!section || !route) return null;
  const r = route.getBoundingClientRect();
  const center = r.left + r.width / 2;
  const heading = section.querySelector<HTMLElement>("h2");
  if (!heading) return center;
  const range = document.createRange();
  range.selectNodeContents(heading);
  return Math.max(center, range.getBoundingClientRect().right + HEADING_GAP);
}
