import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { ServicesHero } from "@/components/sections/services/services-hero";
import { ServicesCareJourney } from "@/components/sections/services/services-care-journey";
import { FindTheRightCare } from "@/components/sections/services/find-the-right-care";
import { ConnectedCare } from "@/components/sections/services/connected-care";
import { ServicesFinalCta } from "@/components/sections/services/services-final-cta";

export const metadata: Metadata = {
  title: "Our Care: The Birthwave",
  description:
    "Care for every stage, connected by one philosophy — from women's health and pregnancy to birth, recovery and newborn care.",
};

/**
 * /services — Our Care / Treatments master page.
 *
 * Chapter-level editorial rhythm: vertical scroll, one calm hero, then one
 * editorial spread per care chapter (`ServicesCareJourney` — one chapter
 * image + asymmetric service-link typography, no pinning, no per-service
 * photography) — not a service-card grid, not a directory accordion, not
 * Doctors' own horizontal track, not About's own cinematic canvas, and no
 * thread line anywhere on this page. Images introduce chapters; they do
 * not illustrate every service link — see `services-care-journey.tsx`'s
 * own top comment for the full rationale.
 *
 * Individual `/services/[slug]` pages (`service-page-template.tsx`) are
 * unchanged — real content flows through that existing template (see
 * services-content.ts's own header comment), but its own layout/design is
 * untouched, as scoped.
 */
export default function ServicesPage() {
  return (
    <PageShell>
      <ServicesHero />
      <ServicesCareJourney />
      <FindTheRightCare />
      <ConnectedCare />
      <ServicesFinalCta />
    </PageShell>
  );
}
