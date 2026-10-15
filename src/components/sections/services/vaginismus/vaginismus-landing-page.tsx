import type { CSSProperties } from "react";
import styles from "./vaginismus-page.module.css";
import { VaginismusHero } from "./vaginismus-hero";
import { VaginismusWhatIs } from "./vaginismus-what-is";
import { VaginismusWho } from "./vaginismus-who";
import { VaginismusFeelHeard } from "./vaginismus-feel-heard";
import { VaginismusCovers } from "./vaginismus-covers";
import { VaginismusSupportWork } from "./vaginismus-support-work";
import { VaginismusWholePerson } from "./vaginismus-whole-person";
import { VaginismusPace } from "./vaginismus-pace";
import { VaginismusClinician } from "./vaginismus-clinician";
import { VaginismusFirstConsultation } from "./vaginismus-first-consultation";
import { VaginismusPractical, VaginismusFaq } from "./vaginismus-info-sections";
import { VaginismusRelatedCare } from "./vaginismus-related-care";
import { VaginismusEnquiry, VaginismusMobileEnquiryBar } from "./vaginismus-enquiry";

/**
 * Vaginismus & Intimate Wellness — dedicated landing page (14 coordinated sections).
 */
export function VaginismusLandingPage() {
  return (
    <div
      className={styles.root}
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

      {/* Section 1 — Hero */}
      <VaginismusHero />

      {/* Section 2 — Understanding Vaginismus */}
      <VaginismusWhatIs />

      {/* Section 3 — Is This Relevant to Me? (Comparison Table) */}
      <VaginismusWho />

      {/* Section 3A — When Seeking Help Has Felt Difficult / A Space to Feel Heard */}
      <VaginismusFeelHeard />

      {/* Section 4 — Your First Visit, At Your Pace (5 Steps) */}
      <VaginismusCovers />

      {/* Section 5 — Individualised, Multidisciplinary Care (7 Pillars) */}
      <VaginismusSupportWork />

      {/* Section 5A — Understanding Whole-Person Care */}
      <VaginismusWholePerson />

      {/* Section 6 — Your Comfort Matters (Comfort & Consent) */}
      <VaginismusPace />

      {/* Section 7 — The People Behind Your Care (4-Person Team) */}
      <VaginismusClinician />

      {/* Section 8 — Your First Conversation (3 Steps) */}
      <VaginismusFirstConsultation />

      {/* Section 9 — Before You Visit */}
      <VaginismusPractical />

      {/* Section 10 — Good to Know (20 FAQs) */}
      <VaginismusFaq />

      {/* Section 11 — Connected Women's Health Support */}
      <VaginismusRelatedCare />

      {/* Section 12 — Final Enquiry & Mobile Bar */}
      <VaginismusEnquiry />
      <VaginismusMobileEnquiryBar />
    </div>
  );
}
