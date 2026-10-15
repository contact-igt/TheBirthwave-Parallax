import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/seo";

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
    sitemap: `${siteOrigin}/sitemap.xml`,
  };
}
