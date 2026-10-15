import type { MetadataRoute } from "next";
import { services } from "@/content/services-content";
import { doctors } from "@/content/doctors-content";
import { HIDDEN_SERVICE_SLUGS } from "@/content/nav-care-content";
import { siteOrigin } from "@/lib/seo";

/**
 * Next.js's native sitemap convention (`src/app/sitemap.ts`) — served at
 * `/sitemap.xml`. Every entry is derived from the same confirmed data
 * this project already treats as the single source of truth
 * (`services-content.ts`'s `services`, `doctors-content.ts`'s `doctors`),
 * never a hand-typed parallel URL list that could drift out of sync with
 * the real routes `generateStaticParams` produces.
 *
 * Hidden service routes return 404 and must not be submitted. Privacy and
 * Experience remain placeholders, so they are omitted until approved.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const corePages: MetadataRoute.Sitemap = [
    { url: `${siteOrigin}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${siteOrigin}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteOrigin}/doctors`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteOrigin}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteOrigin}/faq`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteOrigin}/contact`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.filter((service) => !HIDDEN_SERVICE_SLUGS.has(service.slug)).map((service) => ({
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
