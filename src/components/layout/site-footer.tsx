import Image from "next/image";
import Link from "next/link";
import { brand, footer } from "@/content/site-content";
import { navigation } from "@/content/navigation-content";

/**
 * Minimal by design: wordmark, the same wayfinding links as the header,
 * a tagline, and a copyright line — nothing invented (no address, no
 * social links, no legal pages until they're real). Global layout chrome
 * — used on every route, hence living in components/layout.
 *
 * No border against the Final CTA above it — both sit on the same ink
 * tone, so the two are left to read as one continuous dark close rather
 * than drawing a seam between them.
 *
 * `relative` matters here, not just style: without it this is the one
 * non-positioned section on the page, which paints *behind* the fixed
 * ambient background layer regardless of DOM order (plain in-flow content
 * paints before z-index:auto positioned content in CSS's stacking order) —
 * the footer would be invisible under the ambient layer without this.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-ink text-paper">
      <div className="container-birthwave flex flex-col gap-10 py-16 sm:gap-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Image
              src={brand.logo.wordmarkCream}
              alt={brand.logo.alt}
              width={200}
              height={98}
              className="h-8 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm text-paper/70">{footer.tagline}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
            {/* Site-architecture audit: the footer intentionally offers a
                wider crawlable path than the header's own confirmed
                4-link set — `navigation.links` (shared with the header)
                plus `footer.secondaryLinks` (footer-only; see that
                field's own comment on why `/faq` is here and `/contact`/
                `/privacy` are not, yet). */}
            {[...navigation.links, ...footer.secondaryLinks].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-sm font-medium text-paper/70 transition-colors duration-[var(--duration-fast)] hover:text-paper"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="font-body text-xs text-paper/50">
          © {year} {brand.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
