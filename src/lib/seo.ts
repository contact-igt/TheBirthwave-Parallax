import type { Metadata } from "next";

const fallbackOrigin = "https://the-birthwave-parallax-rho.vercel.app";
const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL?.trim();

// The deployed Vercel URL is the current canonical host. Set this variable
// to the approved custom domain when that domain becomes the public site.
export const siteOrigin =
  configuredOrigin && new URL(configuredOrigin).hostname !== "example.com"
    ? configuredOrigin.replace(/\/$/, "")
    : fallbackOrigin;

export const homeDescription =
  "Explore women's health, fertility, pregnancy, birth preparation, recovery and newborn care at The Birthwave in Chennai.";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "The Birthwave",
      title,
      description,
      url: path,
      images: [{ url: "/brand/wordmark-mauve.png", alt: "The Birthwave" }],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: ["/brand/wordmark-mauve.png"],
    },
  };
}
