import type { MetadataRoute } from "next";

/** See `sitemap.ts`'s own comment on why this is a deliberately obvious
 * placeholder, not a guessed real domain. */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

/**
 * Next.js's native robots convention (`src/app/robots.ts`) — served at
 * `/robots.txt`. Nothing on this site needs blocking: there are no admin,
 * preview, API or dev-only routes under `src/app` to disallow, so this
 * simply confirms public crawling is allowed and points crawlers at the
 * sitemap above.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
