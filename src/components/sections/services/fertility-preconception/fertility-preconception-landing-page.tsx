import { FertilityHero } from "./fertility-preconception-hero";
import { FertilityWho } from "./fertility-preconception-who";
import { FertilityCovers } from "./fertility-preconception-covers";
import { FertilityPreparing } from "./fertility-preconception-preparing";
import { FertilityClinician } from "./fertility-preconception-clinician";
import { FertilityFirstConsultation } from "./fertility-preconception-first-consultation";
import { FertilityVisit } from "./fertility-preconception-visit";
import { FertilityFaq } from "./fertility-preconception-faq";
import { FertilityRelatedCare } from "./fertility-preconception-related-care";
import { FertilityEnquiry, FertilityMobileEnquiryBar } from "./fertility-preconception-enquiry";
import { fertilitySerif } from "./fertility-preconception-typography";
import { cx } from "@/lib/cx";
import styles from "./fertility-preconception.module.css";

/**
 * Fertility & Preconception landing page — ten sections, each with a distinct
 * purpose: 01 Hero · 02 Who is this for · 03 What the consultation covers ·
 * 04 Preconception care · 05 Doctor · 06 Your first consultation ·
 * 07 Before you visit · 08 FAQs · 09 Related care · 10 Final enquiry.
 * Section backgrounds alternate paper / tint, ending on the blush enquiry.
 *
 * Rendered for exactly one slug (`fertility-preconception`) by
 * `app/services/[slug]/page.tsx`; route generation and metadata are
 * unchanged. The serif face and custom properties are scoped to this wrapper.
 * Every animated element is visible without JavaScript and under reduced
 * motion.
 */
export function FertilityPreconceptionLandingPage() {
  return (
    <div className={cx(styles.root, fertilitySerif.variable)}>
      <FertilityHero />
      <FertilityWho />
      <FertilityCovers />
      <FertilityPreparing />
      <FertilityClinician />
      <FertilityFirstConsultation />
      <FertilityVisit />
      <FertilityFaq />
      <FertilityRelatedCare />
      <FertilityEnquiry />
      <FertilityMobileEnquiryBar />
    </div>
  );
}
