import type { CSSProperties } from "react";
import { NaturalBirthHero } from "./natural-birth-hero";
import { NaturalBirthApproach } from "./natural-birth-approach";
import { NaturalBirthPreferences } from "./natural-birth-preferences";
import { NaturalBirthSupport } from "./natural-birth-support";
import { NaturalBirthWhenLabourBegins } from "./natural-birth-when-labour-begins";
import { NaturalBirthFlexibility } from "./natural-birth-flexibility";
import { NaturalBirthJourney } from "./natural-birth-journey";
import { NaturalBirthClinician } from "./natural-birth-clinician";
import { NaturalBirthPracticalInformation } from "./natural-birth-practical-information";
import { NaturalBirthFaq } from "./natural-birth-faq";
import { NaturalBirthEnquiry, NaturalBirthMobileEnquiryBar } from "./natural-birth-enquiry";
import { NaturalBirthRelatedCare } from "./natural-birth-related-care";

/**
 * Natural Birth — dedicated landing page.
 */
export function NaturalBirthLandingPage() {
  return (
    <div
      style={
        {
          "--natural-birth-coral-wash": "color-mix(in srgb, var(--color-coral) 14%, var(--color-paper))",
        } as CSSProperties
      }
    >
      <noscript>
        <style>{`.natural-birth-reveal{opacity:1 !important;transform:none !important}`}</style>
      </noscript>

      <NaturalBirthHero />
      <NaturalBirthApproach />
      <NaturalBirthPreferences />
      <NaturalBirthSupport />
      <NaturalBirthWhenLabourBegins />
      <NaturalBirthFlexibility />
      <NaturalBirthJourney />
      <NaturalBirthClinician />
      <NaturalBirthPracticalInformation />
      <NaturalBirthFaq />
      <NaturalBirthEnquiry />
      <NaturalBirthRelatedCare />
      <NaturalBirthMobileEnquiryBar />
    </div>
  );
}
