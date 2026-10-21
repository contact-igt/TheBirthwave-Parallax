import type { Metadata } from "next";
import Script from "next/script";
import { Poppins, Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { homeDescription, siteOrigin } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { siteStructuredData } from "@/lib/structured-data";

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
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PW4F5S6P"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PW4F5S6P');
          `}
        </Script>
        {/* End Google Tag Manager */}

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-429WQGFYYX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-429WQGFYYX');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "z16ydtrgyb");
          `}
        </Script>
        {/* End Microsoft Clarity */}
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
