/**
 * The same codebase serves two deployments:
 *  - "site"    the public marketing website (default, behaviour unchanged)
 *  - "checkin" the clinic-only app on checkin.thebirthwave.in
 *
 * Dependency-free so the proxy, layout, config and tests can share it.
 */
type Env = Record<string, string | undefined>;

export function isCheckinApp(env: Env = process.env): boolean {
  return env.CLINIC_APP?.trim().toLowerCase() === "checkin";
}

export const CHECKIN_ORIGIN_DEFAULT = "https://checkin.thebirthwave.in";

/** Exact paths and path prefixes that exist on the check-in subdomain. */
const EXACT = new Set(["/registration", "/thank-you", "/staff", "/icon.png", "/favicon.ico", "/robots.txt", "/api/registrations"]);
const PREFIXES = ["/staff/", "/api/queue/", "/api/staff/", "/_next/", "/brand/", "/images/clinic/"];

export type RouteDecision = { action: "next" } | { action: "rewrite"; to: string } | { action: "notfound" };

export function decideCheckinRoute(pathname: string): RouteDecision {
  if (pathname === "/") return { action: "rewrite", to: "/registration" };
  if (EXACT.has(pathname) || PREFIXES.some((prefix) => pathname.startsWith(prefix))) return { action: "next" };
  return { action: "notfound" };
}
