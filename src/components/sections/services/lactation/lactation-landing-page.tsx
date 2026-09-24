import type { CSSProperties } from "react";
import { LactationHero } from "./lactation-hero";
import { LactationIntro } from "./lactation-intro";
import { LactationCovers } from "./lactation-covers";
import { LactationQuestions } from "./lactation-questions";
import { LactationFirstConsultation } from "./lactation-first-consultation";
import { LactationClinician } from "./lactation-clinician";
import { LactationPractical, LactationFaq } from "./lactation-info-sections";
import { LactationRelatedCare } from "./lactation-related-care";
import { LactationEnquiry, LactationMobileEnquiryBar } from "./lactation-enquiry";

/**
 * Lactation & Breastfeeding Support — dedicated landing page, following the
 * exact same additive pattern the other seven dedicated landing pages
 * establish: rendered for exactly one slug (`lactation`) by
 * `app/services/[slug]/page.tsx`, which still generates all 11 service
 * routes and still reads the same shared `services-content.ts` record for
 * this slug's metadata — only this one route's own body swaps; every other
 * route (all seven other dedicated landing pages included) still renders
 * exactly as it did before this page existed.
 *
 * `--lactation-sky-wash`/`--lactation-rose-wash`: this page's own
 * page-scoped wash tokens, built from BirthWave's existing confirmed brand
 * hues (`--color-sky`, `--color-terracotta`) — the identical "local custom
 * properties on this page's own wrapper, not a new global token" approach
 * every other dedicated landing page already establishes. Section order
 * (01 Hero → 10 Final Enquiry, Related Care as section 09 before the
 * closing enquiry) follows this page's own approved brief exactly.
 *
 * The `<noscript>` block is this page's own no-JS safety net for
 * `LactationReveal` (see that component's own comment) — every reveal
 * instance ships `opacity-0` in the server-rendered HTML and only ever
 * becomes visible via a client-side `IntersectionObserver` effect, so
 * without JS every section below the hero would stay permanently
 * invisible. This forces them back to their settled, visible state.
 */
export function LactationLandingPage() {
  return (
    <div
      style={
        {
          "--lactation-sky-wash": "color-mix(in srgb, var(--color-sky) 12%, var(--color-paper))",
          "--lactation-rose-wash": "color-mix(in srgb, var(--color-terracotta) 14%, var(--color-paper))",
        } as CSSProperties
      }
    >
      <noscript>
        <style>{`.lactation-reveal{opacity:1 !important;transform:none !important}`}</style>
      </noscript>

      <LactationHero />
      <LactationIntro />
      <LactationCovers />
      <LactationQuestions />
      <LactationFirstConsultation />
      <LactationClinician />
      <LactationPractical />
      <LactationFaq />
      <LactationRelatedCare />
      <LactationEnquiry />
      <LactationMobileEnquiryBar />
    </div>
  );
}
