/**
 * Routes that handle confidential data. Analytics, tag managers and pixels
 * must never run on these, and search engines must never index them.
 */
export const PRIVATE_ROUTE_PREFIXES: readonly string[] = ["/registration", "/thank-you", "/staff"];

export function isPrivateRoute(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return PRIVATE_ROUTE_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}
