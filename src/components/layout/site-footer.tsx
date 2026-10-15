import Image from "next/image";
import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
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
 * - Social links (Instagram, WhatsApp) come from `footer.socialLinks` in
 *   `site-content.ts` with recognisable brand SVGs and 44x44px touch targets.
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

function InstagramIcon({ className }: { className?: string }) {
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

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662a11.835 11.835 0 005.712 1.463h.005c6.554 0 11.89-5.335 11.893-11.894a11.82 11.82 0 00-3.483-8.414z" />
    </svg>
  );
}

// Configured ready for future channels (Facebook, YouTube) once URLs are supplied
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
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

const SOCIAL_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  instagram: InstagramIcon,
  whatsapp: WhatsAppIcon,
  facebook: FacebookIcon,
  youtube: YouTubeIcon,
};

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
        <div className="mx-auto w-full max-w-[1240px] px-6 pt-16 pb-8 sm:px-10 sm:pt-20 lg:px-14 lg:pt-24 lg:pb-9">
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

              {/* Social Channels (Instagram & WhatsApp) */}
              {footer.socialLinks && footer.socialLinks.length > 0 && (
                <div data-footer-reveal="rise" className="mt-6 flex items-center gap-3">
                  {footer.socialLinks.map((social) => {
                    const Icon = SOCIAL_ICONS[social.id];
                    if (!Icon) return null;
                    return (
                      <a
                        key={social.id}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="flex size-11 items-center justify-center rounded-full border border-paper/15 text-paper/75 transition-colors duration-200 hover:border-terracotta/50 hover:text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-ink motion-reduce:transition-none"
                      >
                        <Icon className="size-5" />
                      </a>
                    );
                  })}
                </div>
              )}
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
