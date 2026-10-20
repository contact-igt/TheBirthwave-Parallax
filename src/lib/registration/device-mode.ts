import { isValidToken } from "./receipt.ts";

/**
 * Shared clinic tablet vs patient's own phone. The clinic tablet is bookmarked
 * with `?kiosk=1`; everything else is treated as a personal device. This is a
 * URL flag, not stored anywhere in the browser.
 */
export function isKioskSearch(search: string): boolean {
  return new URLSearchParams(search).get("kiosk") === "1";
}

/** The opaque receipt token lives in the fragment only: it is never sent to a server or logged. */
export function tokenFromHash(hash: string): string | null {
  const token = new URLSearchParams(hash.replace(/^#/, "")).get("t");
  return isValidToken(token) ? token : null;
}

export function thankYouHref(token: string | undefined, kiosk: boolean): string {
  const query = kiosk ? "?kiosk=1" : "";
  return token && isValidToken(token) ? `/thank-you${query}#t=${token}` : `/thank-you${query}`;
}

/** Where "start a new registration" goes: `/` on the check-in app, `/registration` on the website build. */
export function startHref(checkin: boolean, kiosk: boolean): string {
  const base = checkin ? "/" : "/registration";
  return kiosk ? `${base}?kiosk=1` : base;
}
