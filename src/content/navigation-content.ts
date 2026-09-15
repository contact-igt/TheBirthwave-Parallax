/**
 * Navigation content — The Birth Wave
 *
 * Header links, the persistent booking CTA, and (via re-export) whatever
 * the footer's own wayfinding links point at — kept in one place so a
 * label or destination is never edited in two spots.
 */

export const navigation = {
  // Header nav rework: real routes now exist for About and Doctors, so the
  // primary nav points visitors at the site's actual pages instead of only
  // homepage sections. "Our Care" resolves to /services — the site's real
  // services listing route (content is still placeholder copy, but the
  // route itself is the confirmed master care page; no new route was
  // invented for this). "Contact" still has no dedicated page or form (see
  // /contact's own placeholder) and no booking flow exists yet, so it
  // — like the CTA — resolves to the homepage's closing invitation section,
  // same as before.
  //
  // `/#connect`, not bare `#connect`: this header renders on every route
  // (global chrome via PageShell), and a bare hash only scrolls within
  // whatever page is currently open — on /about, /doctors or /services
  // there is no `#connect` element, so it would silently do nothing. The
  // path prefix makes it resolve correctly (navigate home, then scroll)
  // from anywhere, matching the `/#connect` convention already used by
  // doctors-content.ts's own CTAs.
  links: [
    { label: "About", href: "/about" },
    { label: "Our Care", href: "/services" },
    { label: "Doctors", href: "/doctors" },
    { label: "Contact", href: "/#connect" },
  ],
  cta: {
    label: "Book a Consult",
    href: "/#connect",
    todo: "Placeholder destination — no booking flow exists yet (forms/scheduling are explicitly out of scope this phase).",
  },
} as const;
