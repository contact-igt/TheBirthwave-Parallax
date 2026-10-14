import { FertilityHero } from "./fertility-preconception-hero";
import { FertilityWho } from "./fertility-preconception-who";
import { FertilityCovers } from "./fertility-preconception-covers";
import { FertilityPreparing } from "./fertility-preconception-preparing";
import { FertilityOptions } from "./fertility-preconception-options";
import { FertilityClinician } from "./fertility-preconception-clinician";
import { FertilityFirstConsultation } from "./fertility-preconception-first-consultation";
import { FertilityVisit } from "./fertility-preconception-visit";
import { FertilityFaq } from "./fertility-preconception-faq";
import { FertilityRelatedCare } from "./fertility-preconception-related-care";
import { FertilityEnquiry, FertilityMobileEnquiryBar } from "./fertility-preconception-enquiry";
import styles from "./fertility-preconception.module.css";

/**
 * Fertility & Preconception landing page — 11 sections:
 *  01 Hero ·
 *  02 Is this the right place to start? ·
 *  03 What we talk through ·
 *  04 Before pregnancy ·
 *  05 Basic & advanced fertility care ·
 *  06 The people behind your care ·
 *  07 Your first consultation ·
 *  08 Before you visit ·
 *  09 Good to know ·
 *  10 Related care ·
 *  11 Plan your next step.
 */
export function FertilityPreconceptionLandingPage() {
  return (
    <div className={styles.root}>
      <FertilityHero />
      <FertilityWho />
      <FertilityCovers />
      <FertilityPreparing />
      <FertilityOptions />
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
