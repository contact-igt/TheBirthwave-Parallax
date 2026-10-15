import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { FaqSection } from "@/components/sections/home/faq-section";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "FAQ: The Birthwave",
  "Frequently asked questions for The Birthwave.",
  "/faq",
);

// Reuses the homepage's FaqSection directly (same component, same
// faq-content.ts data) — a question only ever gets written once. The
// wrapper below adds top clearance for the fixed header; FaqSection
// itself is untouched, since on the homepage the sections above it
// already provide that space.
export default function FaqPage() {
  return (
    <PageShell>
      <div className="[padding-block-start:var(--header-height)]">
        <FaqSection />
      </div>
    </PageShell>
  );
}
