import type { MetadataRoute } from "next";
import { services } from "@/content/services-content";
import { doctors } from "@/content/doctors-content";
import { siteOrigin } from "@/lib/seo";
import { isCheckinApp } from "@/lib/app-mode";
import { INDEXABLE_SERVICE_SLUGS } from "@/lib/service-indexing-policy";
import { blogConfigured, blogDesignPreview, getBlogIndex } from "@/lib/blog/api";
import { safeBlogUrl } from "@/lib/blog/contract";

// The external CMS must not be required to deploy the website.
// Generate XML on request; the blog adapter caches validated reads for 60 seconds.
export const dynamic = "force-dynamic";

/**
 * Next.js's native sitemap convention (`src/app/sitemap.ts`) — served at
 * `/sitemap.xml`. Service entries are limited to the approved landing-page
 * allowlist above, while their URLs and doctor URLs remain derived from the
 * project's content registries.
 *
 * Privacy, Terms and Experience remain noindex, so they are omitted until
 * approved for search indexing.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (isCheckinApp()) return [];

  const corePages: MetadataRoute.Sitemap = [
    { url: `${siteOrigin}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${siteOrigin}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteOrigin}/doctors`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteOrigin}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteOrigin}/faq`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteOrigin}/contact`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const servicePages: MetadataRoute.Sitemap = services
    .filter((service) => INDEXABLE_SERVICE_SLUGS.has(service.slug))
    .map((service) => ({
      url: `${siteOrigin}/services/${service.slug}`,
      changeFrequency: "monthly",
      priority: 0.85,
    }));

  const doctorPages: MetadataRoute.Sitemap = doctors.map((doctor) => ({
    url: `${siteOrigin}/doctors/${doctor.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogPages: MetadataRoute.Sitemap = [];
  if (blogConfigured() && !blogDesignPreview()) {
    // Fail the request on outage, rather than publish a truncated sitemap.
    const articles = await getBlogIndex();
    if (articles.length) blogPages.push({ url: `${siteOrigin}/blog`, changeFrequency: "weekly", priority: 0.7 });
    for (const article of articles) {
      const url = `${siteOrigin}/blog/${article.slug}`;
      const override = safeBlogUrl(article.seo.canonical_url);
      if (override && new URL(override, siteOrigin).href !== url) continue;
      blogPages.push({ url, lastModified: article.updated_at, changeFrequency: "monthly", priority: 0.6 });
    }
  }
  return [...corePages, ...servicePages, ...doctorPages, ...blogPages];
}
