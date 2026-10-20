import type { Metadata } from "next";
import { Poppins, Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { homeDescription, siteOrigin } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { siteStructuredData } from "@/lib/structured-data";
import { SiteAnalytics } from "@/components/analytics/site-analytics";

// Both families are confirmed brand typography (Reference/Birthwave Brand
// Guideline PDF, "Typography" pages). See docs/implementation-brief.md §1
// for the heading/body role assignment and why it needed to be inferred.
//
// Poppins has no variable axis on Google Fonts, so static weights are
// loaded explicitly; Plus Jakarta Sans is variable and loads as one file.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

// Cormorant Garamond italic weight 500 is used for editorial emphasis in H1 and section H2s.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500"],
  style: ["italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: "The Birthwave | Women's Health & Maternity Care Chennai",
  description: homeDescription,
  applicationName: "The Birthwave",
  creator: "The Birthwave",
  publisher: "The Birthwave",
  category: "healthcare",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${poppins.variable} ${plusJakartaSans.variable} ${cormorant.variable}`}
    >
      <body>
        <SiteAnalytics />
        <JsonLd data={siteStructuredData} />
        <a
          href="#main-content"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[100] focus-visible:rounded-xs focus-visible:bg-ink focus-visible:px-4 focus-visible:py-2.5 focus-visible:font-body focus-visible:text-sm focus-visible:font-semibold focus-visible:text-paper"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
