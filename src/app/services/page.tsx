import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { ServicesHero } from "@/components/sections/services/services-hero";
import { CompactCareFinder } from "@/components/sections/services/compact-care-finder";
import { ServicesCareJourney } from "@/components/sections/services/services-care-journey";
import { ConnectedCare } from "@/components/sections/services/connected-care";
import { ServicesFinalCta } from "@/components/sections/services/services-final-cta";

export const metadata: Metadata = {
  title: "Our Services: The Birthwave",
  description:
    "Care for where you are now—and what comes next. Explore care for women’s health, pregnancy preparation, pregnancy, recovery and your baby’s early years at The Birthwave.",
};

/**
 * /services — Refined Editorial Parallax Services Page.
 *
 * Page Flow:
 *  01 ServicesHero         — Editorial split hero with exact approved copy & visual presence
 *  02 CompactCareFinder    — Two-column compact visitor-intent directory immediately following hero
 *  03 ServicesCareJourney  — Seven care chapters (headline above, 45% sticky image on left, 55% aligned rows)
 *  04 ConnectedCare        — Compact editorial care philosophy ("One connected approach")
 *  05 ServicesFinalCta     — Definitive dark-brown closure with direct appointment & contact actions
 */
export default function ServicesPage() {
  return (
    <PageShell>
      <ServicesHero />
      <CompactCareFinder />
      <ServicesCareJourney />
      <ConnectedCare />
      <ServicesFinalCta />
    </PageShell>
  );
}
