import type { NextConfig } from "next";
import { isCheckinApp } from "./src/lib/app-mode";

// Confidential routes: never cached, indexed, framed or leaked via Referer.
const privateHeaders = [
  { key: "Cache-Control", value: "no-store, max-age=0" },
  { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
  { key: "Referrer-Policy", value: "no-referrer" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
];

const nextConfig: NextConfig = {
  // Lets the marketing build and the check-in build live side by side locally.
  distDir: process.env.NEXT_DIST_DIR || ".next",

  async redirects() {
    if (isCheckinApp()) return [];

    // Preserve links to the former top-level service pages.
    return [
      { source: "/birth-preparation", destination: "/services/birth-preparation", permanent: true },
      { source: "/fertility-preconception", destination: "/services/fertility-preconception", permanent: true },
      { source: "/vaginismus", destination: "/services/vaginismus", permanent: true },
      { source: "/vbac", destination: "/services/vbac", permanent: true },
      { source: "/pregnancy-antenatal-care", destination: "/services/pregnancy-antenatal-care", permanent: true },
      { source: "/normal-birth-delivery", destination: "/services/natural-birth", permanent: true },
    ];
  },

  async headers() {
    const rules = [
      { source: "/registration", headers: privateHeaders },
      { source: "/registration/:path*", headers: privateHeaders },
      { source: "/thank-you", headers: privateHeaders },
      { source: "/staff", headers: privateHeaders },
      { source: "/staff/:path*", headers: privateHeaders },
      { source: "/api/registrations", headers: privateHeaders },
      { source: "/api/queue/:path*", headers: privateHeaders },
      { source: "/api/staff/:path*", headers: privateHeaders },
    ];

    // The whole check-in deployment is private, apart from static assets.
    if (isCheckinApp()) {
      rules.push({
        source: "/((?!_next/static|_next/image|brand/|images/|icon.png|favicon.ico).*)",
        headers: privateHeaders,
      });
    }
    return rules;
  },
};

export default nextConfig;
