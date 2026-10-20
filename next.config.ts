import type { NextConfig } from "next";

// Confidential routes: never cached, indexed, framed or leaked via Referer.
const privateHeaders = [
  { key: "Cache-Control", value: "no-store, max-age=0" },
  { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
  { key: "Referrer-Policy", value: "no-referrer" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      { source: "/registration", headers: privateHeaders },
      { source: "/registration/:path*", headers: privateHeaders },
      { source: "/api/registrations", headers: privateHeaders },
    ];
  },
};

export default nextConfig;
