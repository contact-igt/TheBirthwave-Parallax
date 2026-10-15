import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { ServicesHero } from "@/components/sections/services/services-hero";
import { ServicesNavigationSection } from "@/components/sections/services/services-navigation-section";
import {
  ServicesCareJourneyPart1,
  ServicesCareJourneyPart2,
} from "@/components/sections/services/services-care-journey";
import { ServicesBirthApproach } from "@/components/sections/services/services-birth-approach";
import { ServicesFindYourCare } from "@/components/sections/services/services-find-your-care";
import { ServicesApproachSection } from "@/components/sections/services/services-approach-section";
import { ServicesFinalCta } from "@/components/sections/services/services-final-cta";
import { ServicesChapterNavigation } from "@/components/sections/services/services-chapter-navigation";
import styles from "@/components/sections/services/services-overview.module.css";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Our Services: The Birthwave",
  "Women's healthcare for every stage of life. From gynaecology and fertility to maternity care, birth, recovery and paediatric support at The Birthwave, Chennai.",
  "/services",
);

/**
 * /services — THE BIRTHWAVE — OUR SERVICES
 *
 * Page Flow (13 Confirmed Sections in Exact Sequence):
 *  01 ServicesHero                — Section 1: Hero ("Women's healthcare for every stage of life.")
 *  02 ServicesNavigationSection   — Section 2: Service Navigation ("What can we help you with?")
 *  03-07 ServicesCareJourneyPart1 — Sections 3 to 7:
 *                                    • 03 Women's Health & Gynaecology
 *                                    • 04 Fertility & Preconception
 *                                    • 05 Pregnancy & Antenatal Care
 *                                    • 06 Birth Preparation & Childbirth Education
 *                                    • 07 Birth & Delivery Options
 *  08 ServicesBirthApproach       — Section 8: The BirthWave Approach to Birth ("Your preferences deserve a place in the conversation.")
 *  09-10 ServicesCareJourneyPart2 — Sections 9 & 10:
 *                                    • 09 Postpartum Recovery & Care
 *                                    • 10 Newborn & Paediatric Care
 *  11 ServicesFindYourCare        — Section 11: Find Your Care ("You don't have to know which service you need.")
 *  12 ServicesApproachSection     — Section 12: Our Approach ("Different needs. Connected care.")
 *  13 ServicesFinalCta            — Section 13: Final CTA ("Whatever your concern, start with a conversation.")
 */
export default function ServicesPage() {
  return (
    <PageShell>
      <div className={styles.root} data-services-overview>
        <ServicesHero />
        <ServicesChapterNavigation />
        <ServicesNavigationSection />
        <ServicesCareJourneyPart1 />
        <ServicesBirthApproach />
        <ServicesCareJourneyPart2 />
        <ServicesFindYourCare />
        <ServicesApproachSection />
        <ServicesFinalCta />
      </div>
    </PageShell>
  );
}
