import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { FaqSection } from "@/components/sections/home/faq-section";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { faq } from "@/content/faq-content";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbStructuredData, websiteId } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata(
  "Pregnancy, Birth & Newborn Care FAQ | The Birthwave",
  "Answers to common questions about pregnancy care, birth preparation, natural birth, VBAC, postpartum support and newborn care at The Birthwave.",
  "/faq",
);

// Reuses the homepage's FaqSection directly (same component, same
// faq-content.ts data) — a question only ever gets written once. The
// wrapper below adds top clearance for the fixed header; FaqSection
// itself is untouched, since on the homepage the sections above it
// already provide that space.
export default function FaqPage() {
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${absoluteUrl("/faq")}#webpage`,
    url: absoluteUrl("/faq"),
    name: "Frequently Asked Questions: The Birthwave",
    inLanguage: "en-IN",
    isPartOf: { "@id": websiteId },
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <PageShell>
      <JsonLd data={faqStructuredData} />
      <JsonLd
        data={breadcrumbStructuredData([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />
      <div className="[padding-block-start:var(--header-height)]">
        <FaqSection />
      </div>
    </PageShell>
  );
}
