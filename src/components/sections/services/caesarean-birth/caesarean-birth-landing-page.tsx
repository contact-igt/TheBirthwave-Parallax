import type { CSSProperties } from "react";
import { CaesareanBirthHero } from "./caesarean-birth-hero";
import { CaesareanBirthEnquiry, CaesareanBirthMobileEnquiryBar } from "./caesarean-birth-enquiry";
import {
  CaesareanBirthClinician,
  CaesareanBirthConsiderations,
  CaesareanBirthConsultation,
  CaesareanBirthDuring,
  CaesareanBirthFaq,
  CaesareanBirthPreferences,
  CaesareanBirthPreparation,
  CaesareanBirthRecovery,
  CaesareanBirthRelatedCare,
  CaesareanBirthUnderstanding,
} from "./caesarean-birth-sections";

export function CaesareanBirthLandingPage() {
  return (
    <div style={{ "--caesarean-birth-coral-wash": "color-mix(in srgb, var(--color-coral) 14%, var(--color-paper))" } as CSSProperties}>
      <noscript><style>{`.caesarean-birth-reveal{opacity:1 !important;transform:none !important}`}</style></noscript>
      <CaesareanBirthHero />
      <CaesareanBirthUnderstanding />
      <CaesareanBirthConsiderations />
      <CaesareanBirthPreparation />
      <CaesareanBirthDuring />
      <CaesareanBirthPreferences />
      <CaesareanBirthRecovery />
      <CaesareanBirthConsultation />
      <CaesareanBirthClinician />
      <CaesareanBirthFaq />
      <CaesareanBirthEnquiry />
      <CaesareanBirthRelatedCare />
      <CaesareanBirthMobileEnquiryBar />
    </div>
  );
}
