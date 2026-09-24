import type { CSSProperties } from "react";
import { GynaecologyHero } from "./gynaecology-hero";
import { GynaecologyWho } from "./gynaecology-who";
import { GynaecologyCovers } from "./gynaecology-covers";
import { GynaecologyWhenToConsider } from "./gynaecology-when-to-consider";
import { GynaecologyClinician } from "./gynaecology-clinician";
import { GynaecologyFirstConsultation } from "./gynaecology-first-consultation";
import { GynaecologyPractical, GynaecologyFaq } from "./gynaecology-info-sections";
import { GynaecologyRelatedCare } from "./gynaecology-related-care";
import { GynaecologyEnquiry, GynaecologyMobileEnquiryBar } from "./gynaecology-enquiry";

/**
 * Gynaecology & Women's Wellness — dedicated landing page, following the
 * exact same additive pattern the other six dedicated landing pages
 * establish: rendered for exactly one slug (`gynaecology`) by
 * `app/services/[slug]/page.tsx`, which still generates all 11 service
 * routes and still reads the same shared `services-content.ts` record for
 * this slug's metadata — only this one route's own body swaps; every other
 * route (all six other dedicated landing pages included) still renders
 * exactly as it did before this page existed.
 *
 * `--gynaecology-rose-wash`/`--gynaecology-sky-wash`: this page's own
 * page-scoped wash tokens, built from BirthWave's existing confirmed brand
 * hues (`--color-terracotta`, `--color-sky`) — the identical "local custom
 * properties on this page's own wrapper, not a new global token" approach
 * every other dedicated landing page already establishes. Section order
 * (01 Hero → 10 Final Enquiry, Related Care as section 09 before the
 * closing enquiry) follows this page's own approved brief exactly.
 *
 * The `<noscript>` block is this page's own NO-JS safety net for
 * `GynaecologyReveal` (see that component's own comment) — every reveal
 * instance ships `opacity-0` in the server-rendered HTML and only ever
 * becomes visible via a client-side `IntersectionObserver` effect, so
 * without JS every section below the hero would stay permanently
 * invisible. This forces them back to their settled, visible state.
 */
export function GynaecologyLandingPage() {
  return (
    <div
      style={
        {
          "--gynaecology-rose-wash": "color-mix(in srgb, var(--color-terracotta) 14%, var(--color-paper))",
          "--gynaecology-sky-wash": "color-mix(in srgb, var(--color-sky) 12%, var(--color-paper))",
        } as CSSProperties
      }
    >
      <noscript>
        <style>{`.gynaecology-reveal{opacity:1 !important;transform:none !important}`}</style>
      </noscript>

      <GynaecologyHero />
      <GynaecologyWho />
      <GynaecologyCovers />
      <GynaecologyWhenToConsider />
      <GynaecologyClinician />
      <GynaecologyFirstConsultation />
      <GynaecologyPractical />
      <GynaecologyFaq />
      <GynaecologyRelatedCare />
      <GynaecologyEnquiry />
      <GynaecologyMobileEnquiryBar />
    </div>
  );
}
