import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { brand, footer } from "@/content/site-content";
import { navCareGroups } from "@/content/nav-care-content";
import { contactDirectDetails, contactEnquiryForm } from "@/content/contact-content";
import { SiteFooterReveal } from "@/components/layout/site-footer-reveal";

/**
 * The calm close after the motion-heavy pages: brand, care links,
 * wayfinding, contact, then a legal row. Global layout chrome — used on
 * every route, hence living in components/layout.
 *
 * Nothing invented:
 * - Services come from the same `navCareGroups` the header's Our Care menu
 *   uses, in the same order.
 * - Contact details come from `contact-content.ts`. Address links directly
 *   to verified Google Maps destination with accessible labeling.
 * - Legal links are only routes that exist (`footer.legalLinks`).
 *
 * No border against the Final CTA above it — both sit on the same ink
 * tone, so the two read as one continuous dark close.
 */

const CONTACT_ICONS: Record<string, LucideIcon> = {
  call: Phone,
  whatsapp: Phone,
  email: Mail,
  visit: MapPin,
};

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const careServices = navCareGroups.flatMap((group) => group.services);

const HEADING_CLASS = "font-display text-[0.9375rem] font-semibold tracking-[0.01em] text-paper";

/**
 * Calm hover: 0.72 → 1 opacity with a 3px nudge. Opacity rather than a
 * text colour because globals.css has an unlayered `a { color: inherit }`,
 * which outranks Tailwind's layered colour utilities on links. Focus ring
 * is ivory (see <footer>) and a focused link is always full opacity.
 */
const LINK_CLASS =
  "inline-block text-[0.875rem] leading-6 opacity-[0.72] transition-[opacity,translate] duration-200 ease-(--ease-signature) hover:translate-x-[3px] hover:opacity-100 focus-visible:opacity-100 motion-reduce:hover:translate-x-0";

function FooterColumn({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div data-footer-reveal="rise" className={className}>
      <p className={HEADING_CLASS}>{title}</p>
      <div className="mt-5">{children}</div>
    </div>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  const confirmedContacts = contactDirectDetails.items.filter(
    (item) => (item.confirmed as boolean) && CONTACT_ICONS[item.id],
  );

  return (
    // Re-scoped tokens for everything inside the footer: the site-wide focus
    // ring is ink (would vanish here), and globals.css colours h1–h4 with
    // an unlayered `var(--color-text)` that utilities can't override.
    <footer className="relative bg-ink text-paper [--color-focus-ring:var(--color-paper)] [--color-text:var(--color-paper)]">
      <SiteFooterReveal>
        <div className="mx-auto w-full max-w-[1240px] px-6 pt-16 pb-[calc(6rem+env(safe-area-inset-bottom))] sm:px-10 sm:pt-20 md:pb-8 lg:px-14 lg:pt-24 lg:pb-9">
          <div className="grid gap-y-10 md:grid-cols-2 md:grid-rows-[auto_auto_1fr] md:gap-x-14 md:gap-y-12 lg:grid-rows-none lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.35fr)_minmax(0,0.85fr)_minmax(0,1.1fr)] lg:gap-x-12 xl:gap-x-16">
            {/* Brand */}
            <div className="md:col-span-2 lg:col-span-1">
              <div data-footer-reveal="logo">
                <Link href="/" aria-label={`${brand.name} — home`} className="inline-block">
                  <Image
                    src={brand.logo.wordmarkCream}
                    alt={brand.logo.alt}
                    width={320}
                    height={157}
                    sizes="152px"
                    className="h-auto w-[136px] lg:w-[152px]"
                  />
                </Link>
              </div>
              <p
                data-footer-reveal="rise"
                className="mt-6 max-w-[18rem] text-balance text-[0.9375rem] leading-[var(--leading-relaxed)] text-paper/65"
              >
                {footer.tagline}
              </p>

            </div>

            {/* Care & Services — the header's Our Care list, same order. */}
            <FooterColumn title="Care & Services" className="md:row-span-2 lg:row-span-1">
              <ul className="flex flex-col gap-2.5">
                {careServices.map((service) => (
                  <li key={service.slug}>
                    <Link href={`/services/${service.slug}`} className={LINK_CLASS}>
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterColumn>

            <FooterColumn title="Explore">
              <nav aria-label="Footer">
                <ul className="flex flex-col gap-2.5">
                  {footer.exploreLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={LINK_CLASS}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </FooterColumn>

            <FooterColumn title="Contact Info">
              {confirmedContacts.length > 0 ? (
                <ul className="flex flex-col gap-4">
                  {confirmedContacts.map((item) => {
                    const Icon = CONTACT_ICONS[item.id];
                    const isMap = item.id === "visit";
                    return (
                      <li key={item.id} className="flex items-start gap-3">
                        <Icon aria-hidden="true" className="mt-1 size-4 shrink-0 text-terracotta" />
                        <span className="sr-only">{item.label}: </span>
                        {item.actionHref ? (
                          <a
                            href={item.actionHref}
                            className={LINK_CLASS}
                            {...(isMap
                              ? {
                                  target: "_blank",
                                  rel: "noopener noreferrer",
                                  "aria-label": `View clinic location on Google Maps: ${item.value}`,
                                }
                              : {})}
                          >
                            {item.value}
                          </a>
                        ) : (
                          <span className="text-[0.875rem] leading-6 opacity-[0.72]">{item.value}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                // Phone, email and address are still pending confirmation
                // (contact-content.ts) — route to the real enquiry form.
                <Link href="/contact#contact-form" className={LINK_CLASS}>
                  <span className="flex items-center gap-3">
                    <Mail aria-hidden="true" className="size-4 shrink-0 text-terracotta" />
                    <span>{contactEnquiryForm.heading}</span>
                    <ArrowUpRight aria-hidden="true" className="-ml-1.5 size-3.5 shrink-0 opacity-70" />
                  </span>
                </Link>
              )}
            </FooterColumn>
          </div>

          <div
            data-footer-reveal="fade"
            className="mt-14 flex flex-col gap-3 border-t border-paper/[0.12] pt-7 text-[0.8125rem] leading-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-8 lg:mt-20"
          >
            <p className="opacity-60">
              © {year} {brand.name}. All rights reserved.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {footer.legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="opacity-60 transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SiteFooterReveal>
    </footer>
  );
}
