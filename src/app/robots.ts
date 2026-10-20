import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/seo";
import { PRIVATE_ROUTE_PREFIXES } from "@/lib/private-routes";

/**
 * Next.js's native robots convention (`src/app/robots.ts`) — served at
 * `/robots.txt`. Public crawling is allowed; confidential routes (patient
 * registration and its API) are disallowed. Those routes are also noindex.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [...PRIVATE_ROUTE_PREFIXES, "/api/registrations"],
    },
    sitemap: `${siteOrigin}/sitemap.xml`,
    host: siteOrigin,
  };
}
