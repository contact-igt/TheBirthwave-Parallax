import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { ServicesHero } from "@/components/sections/services/services-hero";
import { ServicesQuickOverview } from "@/components/sections/services/services-quick-overview";
import { ServicesStickyShowcase } from "@/components/sections/services/services-sticky-showcase";
import { FindTheRightCare } from "@/components/sections/services/find-the-right-care";
import { ConnectedCare } from "@/components/sections/services/connected-care";
import { ServicesFinalCta } from "@/components/sections/services/services-final-cta";

export const metadata: Metadata = {
  title: "Our Care: The Birth Wave",
  description:
    "Care for every stage, connected by one philosophy — from women's health and pregnancy to birth, recovery and newborn care.",
};

/**
 * /services — Our Care / Treatments master page (Phase 1: premium sticky
 * split-screen parallax architecture).
 *
 * Its own distinct motion identity, deliberately separate from every
 * other locked page: vertical scroll + one sticky split-screen treatment
 * showcase + image crossfades + subtle parallax depth + editorial chapter
 * transitions — not a service-card grid, not a directory accordion, not
 * Doctors' own horizontal track, not About's own cinematic canvas, and no
 * thread line anywhere on this page. See each section's own doc comment
 * for how it avoids those; `services-sticky-showcase.tsx`'s own top
 * comment covers the signature section's full architecture.
 *
 * Individual `/services/[slug]` pages (`service-page-template.tsx`) are
 * unchanged in this phase — real content now flows through that existing
 * template (see services-content.ts's own header comment), but its own
 * layout/design is untouched, as scoped.
 */
export default function ServicesPage() {
  return (
    <PageShell>
      <ServicesHero />
      <ServicesQuickOverview />
      <ServicesStickyShowcase />
      <FindTheRightCare />
      <ConnectedCare />
      <ServicesFinalCta />
    </PageShell>
  );
}
