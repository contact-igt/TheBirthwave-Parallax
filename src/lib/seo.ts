import type { Metadata } from "next";

/**
 * The public, indexable origin. Preview deployments should point their
 * canonicals back to this domain so search engines consolidate every URL on
 * the live site instead of treating a Vercel preview as a second website.
 */
export const siteOrigin = "https://www.thebirthwave.in";

export const homeDescription =
  "Explore women's health, fertility, pregnancy, birth preparation, recovery and newborn care at The Birthwave in Chennai.";

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return new URL(path, `${siteOrigin}/`).toString();
}

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      siteName: "The Birthwave",
      locale: "en_IN",
      title,
      description,
      url: path,
      images: [
        {
          url: "/brand/wordmark-mauve.png",
          width: 2327,
          height: 1139,
          alt: "The Birthwave",
        },
      ],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: ["/brand/wordmark-mauve.png"],
    },
  };
}
