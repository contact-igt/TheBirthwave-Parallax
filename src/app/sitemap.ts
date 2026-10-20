import type { MetadataRoute } from "next";
import { services } from "@/content/services-content";
import { doctors } from "@/content/doctors-content";
import { siteOrigin } from "@/lib/seo";
import { isCheckinApp } from "@/lib/app-mode";
import { INDEXABLE_SERVICE_SLUGS } from "@/lib/service-indexing-policy";

/**
 * Next.js's native sitemap convention (`src/app/sitemap.ts`) — served at
 * `/sitemap.xml`. Service entries are limited to the approved landing-page
 * allowlist above, while their URLs and doctor URLs remain derived from the
 * project's content registries.
 *
 * Privacy, Terms and Experience remain noindex, so they are omitted until
 * approved for search indexing.
 */
export default function sitemap(): MetadataRoute.Sitemap {
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

  return [...corePages, ...servicePages, ...doctorPages];
}
