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
import { PregnancyAntenatalFinalCta } from "./pregnancy-antenatal-final-cta";

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
      <PregnancyAntenatalFinalCta />
      <PregnancyMobileAppointmentBar />
    </div>
  );
}
