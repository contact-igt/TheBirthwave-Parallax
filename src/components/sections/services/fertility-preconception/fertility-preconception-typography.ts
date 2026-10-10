import { EB_Garamond } from "next/font/google";

/**
 * Display serif for this landing page only (the reference design's heading
 * face). Loaded with next/font like the root layout's families, but applied
 * solely through `fertilitySerif.variable` on this page's wrapper — global
 * heading styles are untouched.
 */
export const fertilitySerif = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-fertility-serif",
  display: "swap",
});
