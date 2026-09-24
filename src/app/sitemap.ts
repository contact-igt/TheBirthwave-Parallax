import type { MetadataRoute } from "next";
import { services } from "@/content/services-content";
import { doctors } from "@/content/doctors-content";

/**
 * Site-architecture audit — no production domain is confirmed anywhere in
 * this project (no `metadataBase`, no `NEXT_PUBLIC_SITE_URL`; `layout.tsx`
 * explicitly marks canonical/metadata infrastructure "out of scope for
 * this phase"). `https://example.com` is a deliberately obvious, non-real
 * placeholder — never a guessed real-looking domain — so this file is
 * ready to go the moment `NEXT_PUBLIC_SITE_URL` is set in the deploy
 * environment, and so nobody mistakes the placeholder for the real
 * domain if it ships before that variable exists. Set that env var (or
 * edit the fallback here) before relying on this for real search-engine
 * submission.
 */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

/**
 * Next.js's native sitemap convention (`src/app/sitemap.ts`) — served at
 * `/sitemap.xml`. Every entry is derived from the same confirmed data
 * this project already treats as the single source of truth
 * (`services-content.ts`'s `services`, `doctors-content.ts`'s `doctors`),
 * never a hand-typed parallel URL list that could drift out of sync with
 * the real routes `generateStaticParams` produces.
 *
 * Deliberately excludes `/contact`, `/privacy` and `/the-experience` —
 * all three are still genuine "page in development" placeholders with no
 * confirmed content (see each route's own file comment); indexing a thin
 * placeholder page is a worse SEO outcome than leaving it out of the
 * sitemap until real content lands. The routes themselves are untouched
 * and still publicly reachable — this only affects what's actively
 * submitted to search engines. `/faq` IS included: it renders the same
 * real, confirmed FAQ content the homepage uses, not a placeholder.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const corePages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/services`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/doctors`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/faq`, lastModified, changeFrequency: "monthly", priority: 0.5 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const doctorPages: MetadataRoute.Sitemap = doctors.map((doctor) => ({
    url: `${SITE_URL}/doctors/${doctor.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...corePages, ...servicePages, ...doctorPages];
}
