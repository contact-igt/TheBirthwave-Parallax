import type { CSSProperties } from "react";
import { VbacHero } from "./vbac-hero";
import { VbacIntro } from "./vbac-intro";
import { VbacConversation, VbacBenefitsRisks } from "./vbac-conversation";
import { VbacAssessmentFactors, VbacPlanningLabour } from "./vbac-planning";
import { VbacFirstVisit } from "./vbac-first-visit";
import { VbacClinician } from "./vbac-clinician";
import { VbacPlanChanges } from "./vbac-plan-changes";
import { VbacPracticalInformation } from "./vbac-practical-information";
import { VbacFaq } from "./vbac-faq";
import { VbacEnquiry, VbacMobileEnquiryBar } from "./vbac-enquiry";
import { VbacRelatedCare } from "./vbac-related-care";

/**
 * VBAC (Vaginal Birth After Caesarean) — dedicated service landing page.
 * Renders all 13 approved sections in exact order:
 * 01. HERO
 * 02. BEGIN WITH YOUR FULL STORY
 * 03. WHAT A VBAC CONSULTATION MAY COVER
 * 04. VBAC: BENEFITS, RISKS & ALTERNATIVES
 * 05. WHAT MAY INFLUENCE THE DISCUSSION?
 * 06. PLANNING LABOUR AFTER A CAESAREAN
 * 07. YOUR FIRST CONSULTATION
 * 08. YOUR OBSTETRICIAN (Dr. Santoshini Nandigam)
 * 09. IF THE BIRTH PLAN CHANGES
 * 10. PRACTICAL INFORMATION
 * 11. FAQs (8 questions)
 * 12. FINAL CTA (Enquiry Form & Direct Contact)
 * 13. RELATED CARE (5 services)
 */
export function VbacLandingPage() {
  return (
    <div
      style={
        {
          "--vbac-sky-wash": "color-mix(in srgb, var(--color-sky) 14%, var(--color-paper))",
          "--vbac-coral-wash": "color-mix(in srgb, var(--color-coral) 14%, var(--color-paper))",
        } as CSSProperties
      }
    >
      <noscript>
        <style>{`.vbac-reveal{opacity:1 !important;transform:none !important}`}</style>
      </noscript>

      {/* 01 — HERO */}
      <VbacHero />

      {/* 02 — BEGIN WITH YOUR FULL STORY */}
      <VbacIntro />

      {/* 03 — WHAT A VBAC CONSULTATION MAY COVER */}
      <VbacConversation />

      {/* 04 — VBAC: BENEFITS, RISKS & ALTERNATIVES */}
      <VbacBenefitsRisks />

      {/* 05 — WHAT MAY INFLUENCE THE DISCUSSION? */}
      <VbacAssessmentFactors />

      {/* 06 — PLANNING LABOUR AFTER A CAESAREAN */}
      <VbacPlanningLabour />

      {/* 07 — YOUR FIRST CONSULTATION */}
      <VbacFirstVisit />

      {/* 08 — YOUR OBSTETRICIAN */}
      <VbacClinician />

      {/* 09 — IF THE BIRTH PLAN CHANGES */}
      <VbacPlanChanges />

      {/* 10 — PRACTICAL INFORMATION */}
      <VbacPracticalInformation />

      {/* 11 — FAQs */}
      <VbacFaq />

      {/* 12 — FINAL CTA */}
      <VbacEnquiry />

      {/* 13 — RELATED CARE */}
      <VbacRelatedCare />

      <VbacMobileEnquiryBar />
    </div>
  );
}
