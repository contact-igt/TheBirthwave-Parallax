import type { CSSProperties } from "react";
import { VaginismusHero } from "./vaginismus-hero";
import { VaginismusWho } from "./vaginismus-who";
import { VaginismusCovers } from "./vaginismus-covers";
import { VaginismusPace } from "./vaginismus-pace";
import { VaginismusClinician } from "./vaginismus-clinician";
import { VaginismusFirstConsultation } from "./vaginismus-first-consultation";
import { VaginismusPractical, VaginismusFaq } from "./vaginismus-info-sections";
import { VaginismusRelatedCare } from "./vaginismus-related-care";
import { VaginismusEnquiry, VaginismusMobileEnquiryBar } from "./vaginismus-enquiry";

/**
 * Vaginismus & Intimate Wellness — dedicated landing page, following the
 * exact same additive pattern the other five dedicated landing pages
 * establish: rendered for exactly one slug (`vaginismus`) by
 * `app/services/[slug]/page.tsx`, which still generates all 11 service
 * routes and still reads the same shared `services-content.ts` record for
 * this slug's metadata — only this one route's own body swaps; every other
 * route (all five other dedicated landing pages included) still renders
 * exactly as it did before this page existed.
 *
 * `--vaginismus-rose-wash`/`--vaginismus-sky-wash`: this page's own
 * page-scoped wash tokens, built from BirthWave's existing confirmed brand
 * hues (`--color-terracotta`, `--color-sky`) — the identical "local custom
 * properties on this page's own wrapper, not a new global token" approach
 * every other dedicated landing page already establishes. Section order
 * (01 Hero → 10 Final Enquiry, Related Care as section 09 before the
 * closing enquiry) follows this page's own approved brief exactly.
 *
 * The `<noscript>` block is this page's own NO-JS safety net for
 * `VaginismusReveal` (see that component's own comment) — every reveal
 * instance ships `opacity-0` in the server-rendered HTML and only ever
 * becomes visible via a client-side `IntersectionObserver` effect, so
 * without JS every section below the hero would stay permanently
 * invisible. This forces them back to their settled, visible state.
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
      <VaginismusWho />
      <VaginismusCovers />
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
