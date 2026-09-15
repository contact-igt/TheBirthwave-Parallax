import type { Metadata } from "next";
import { Poppins, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

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

// TODO(content): title/description are placeholders — no approved SEO copy
// exists yet. Full metadata (OG image, canonical, structured data) is
// explicitly out of scope for this phase per the implementation brief.
export const metadata: Metadata = {
  title: "The Birth Wave",
  description:
    "The Birth Wave: site in development. Placeholder description pending approved copy.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${plusJakartaSans.variable}`}
    >
      <body>
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
