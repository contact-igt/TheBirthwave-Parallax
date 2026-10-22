"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { isPrivateRoute } from "@/lib/private-routes";

const GA_ID = "G-429WQGFYYX";

declare global {
  interface Window {
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

/**
 * Site-wide Google Analytics, unchanged for public pages. On private routes
 * (see `private-routes.ts`) nothing is rendered, and Google's documented
 * `ga-disable-<ID>` switch is set so an already-loaded gtag cannot send hits
 * if someone navigates there client-side.
 */
export function SiteAnalytics() {
  const pathname = usePathname();
  const isPrivate = isPrivateRoute(pathname);

  useEffect(() => {
    window[`ga-disable-${GA_ID}`] = isPrivate;
  }, [isPrivate]);

  if (isPrivate) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
      </Script>
    </>
  );
}
