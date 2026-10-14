import type { CSSProperties } from "react";
import { PregnancyAntenatalHero } from "./pregnancy-antenatal-hero";
import { PregnancyAntenatalIntro } from "./pregnancy-antenatal-intro";
import { PregnancyAntenatalCareIncludes, PregnancyAntenatalFirstConsultation } from "./pregnancy-antenatal-care-includes";
import {
  PregnancyAntenatalClinician,
  PregnancyAntenatalApproach,
  PregnancyAntenatalFaq,
  PregnancyAntenatalVisit,
} from "./pregnancy-antenatal-info-sections";
import { PregnancyAntenatalAppointment, PregnancyMobileAppointmentBar } from "./pregnancy-antenatal-appointment";
import { PregnancyAntenatalRelatedCare } from "./pregnancy-antenatal-related-care";

/**
 * Pregnancy & Antenatal Care — dedicated service landing page.
 * Renders all 10 approved sections in exact order:
 * 01. SECTION 1 — HERO
 * 02. SECTION 2 — MORE THAN A CHECK-IN
 * 03. SECTION 3 — WHAT ANTENATAL CARE MAY INCLUDE
 * 04. SECTION 4 — YOUR FIRST PREGNANCY CONSULTATION
 * 05. SECTION 5 — DOCTOR SECTION (Dr. Santoshi Nandigam)
 * 06. SECTION 6 — THE BIRTHWAVE APPROACH
 * 07. SECTION 7 — FAQs (12 questions)
 * 08. SECTION 8 — PLAN YOUR VISIT
 * 09. SECTION 9 — FINAL CONVERSION SECTION (Enquiry Form)
 * 10. SECTION 10 — RELATED CARE (8 services)
 */
export function PregnancyAntenatalLandingPage() {
  return (
    <div
      style={
        {
          "--pregnancy-sage-wash": "color-mix(in srgb, #CA9585 12%, var(--color-paper))",
          "--pregnancy-sky-wash": "color-mix(in srgb, var(--color-sky) 12%, var(--color-paper))",
        } as CSSProperties
      }
    >
      <PregnancyAntenatalHero />
      <PregnancyAntenatalIntro />
      <PregnancyAntenatalCareIncludes />
      <PregnancyAntenatalFirstConsultation />
      <PregnancyAntenatalClinician />
      <PregnancyAntenatalApproach />
      <PregnancyAntenatalFaq />
      <PregnancyAntenatalVisit />
      <PregnancyAntenatalAppointment />
      <PregnancyAntenatalRelatedCare />
      <PregnancyMobileAppointmentBar />
    </div>
  );
}
