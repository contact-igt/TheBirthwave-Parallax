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
  // invented for this). "Contact Us" and the booking CTA both go to /contact,
  // the real page with the confirmed phone, email, address and enquiry form.
  links: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Our Care", href: "/services" },
    { label: "Doctors", href: "/doctors" },
    { label: "Contact Us", href: "/contact" },
  ],
  cta: {
    label: "Book a Consult",
    // The real contact page (confirmed phone, email, address and the enquiry
    // form), not `/#connect` — that only scrolled to the homepage's closing
    // CTA, which itself sends visitors to /contact.
    href: "/contact",
    todo: "No booking system exists yet, and the /contact enquiry form does not send anywhere (it only shows a preview state) — needs a booking/form integration from the client.",
  },
} as const;
