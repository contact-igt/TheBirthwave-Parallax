import type { CSSProperties } from "react";
import { VaginismusHero } from "./vaginismus-hero";
import { VaginismusWhatIs } from "./vaginismus-what-is";
import { VaginismusWho } from "./vaginismus-who";
import { VaginismusCovers } from "./vaginismus-covers";
import { VaginismusSupportWork } from "./vaginismus-support-work";
import { VaginismusPace } from "./vaginismus-pace";
import { VaginismusClinician } from "./vaginismus-clinician";
import { VaginismusFirstConsultation } from "./vaginismus-first-consultation";
import { VaginismusPractical, VaginismusFaq } from "./vaginismus-info-sections";
import { VaginismusRelatedCare } from "./vaginismus-related-care";
import { VaginismusEnquiry, VaginismusMobileEnquiryBar } from "./vaginismus-enquiry";

/**
 * Vaginismus & Intimate Wellness — dedicated landing page (12 sections).
 */
export function VaginismusLandingPage() {
  return (
    <div
      style={
        {
          "--vaginismus-rose-wash": "color-mix(in srgb, var(--color-terracotta) 14%, var(--color-paper))",
          "--vaginismus-sky-wash": "color-mix(in srgb, var(--color-sky) 12%, var(--color-paper))",
        } as CSSProperties
      }
    >
      <noscript>
        <style>{`.vaginismus-reveal{opacity:1 !important;transform:none !important}`}</style>
      </noscript>

      <VaginismusHero />
      <VaginismusWhatIs />
      <VaginismusWho />
      <VaginismusCovers />
      <VaginismusSupportWork />
      <VaginismusPace />
      <VaginismusClinician />
      <VaginismusFirstConsultation />
      <VaginismusPractical />
      <VaginismusFaq />
      <VaginismusRelatedCare />
      <VaginismusEnquiry />
      <VaginismusMobileEnquiryBar />
    </div>
  );
}
