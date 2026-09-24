import type { CSSProperties } from "react";
import { FertilityHero } from "./fertility-preconception-hero";
import { FertilityWho } from "./fertility-preconception-who";
import { FertilityCovers } from "./fertility-preconception-covers";
import { FertilityPreparing } from "./fertility-preconception-preparing";
import { FertilityClinician } from "./fertility-preconception-clinician";
import { FertilityFirstConsultation } from "./fertility-preconception-first-consultation";
import { FertilityPractical, FertilityFaq } from "./fertility-preconception-info-sections";
import { FertilityRelatedCare } from "./fertility-preconception-related-care";
import { FertilityEnquiry, FertilityMobileEnquiryBar } from "./fertility-preconception-enquiry";

/**
 * Fertility & Preconception — dedicated landing page, following the exact
 * same additive pattern the other four dedicated landing pages establish:
 * rendered for exactly one slug (`fertility-preconception`) by
 * `app/services/[slug]/page.tsx`, which still generates all 11 service
 * routes and still reads the same shared `services-content.ts` record for
 * this slug's metadata — only this one route's own body swaps; the other
 * ten routes (all four other dedicated landing pages included) still
 * render exactly as they did before this page existed.
 *
 * `--fertility-rose-wash`/`--fertility-sky-wash`: this page's own
 * page-scoped wash tokens, built from BirthWave's existing confirmed brand
 * hues (`--color-terracotta`, `--color-sky`) — the identical "local custom
 * properties on this page's own wrapper, not a new global token" approach
 * every other dedicated landing page already establishes. Section order
 * (Related Care, section 9, before the Final Enquiry, section 10) follows
 * this page's own brief exactly, closing on the conversion CTA rather than
 * the VBAC/Normal Birth precedent of Related Care after the enquiry.
 *
 * The `<noscript>` block is this page's own NO-JS safety net for
 * `FertilityReveal` (see that component's own comment) — every reveal
 * instance ships `opacity-0` in the server-rendered HTML and only ever
 * becomes visible via a client-side `IntersectionObserver` effect, so
 * without JS every section below the hero would stay permanently
 * invisible. This forces them back to their settled, visible state.
 */
export function FertilityPreconceptionLandingPage() {
  return (
    <div
      style={
        {
          "--fertility-rose-wash": "color-mix(in srgb, var(--color-terracotta) 14%, var(--color-paper))",
          "--fertility-sky-wash": "color-mix(in srgb, var(--color-sky) 12%, var(--color-paper))",
        } as CSSProperties
      }
    >
      <noscript>
        <style>{`.fertility-reveal{opacity:1 !important;transform:none !important}`}</style>
      </noscript>

      <FertilityHero />
      <FertilityWho />
      <FertilityCovers />
      <FertilityPreparing />
      <FertilityClinician />
      <FertilityFirstConsultation />
      <FertilityPractical />
      <FertilityFaq />
      <FertilityRelatedCare />
      <FertilityEnquiry />
      <FertilityMobileEnquiryBar />
    </div>
  );
}
