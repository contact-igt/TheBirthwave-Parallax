import type { CSSProperties } from "react";
import { PostpartumHero } from "./postpartum-care-hero";
import { PostpartumIntro } from "./postpartum-care-intro";
import { PostpartumCovers } from "./postpartum-care-covers";
import { PostpartumRecovery } from "./postpartum-care-recovery";
import { PostpartumFirstConsultation } from "./postpartum-care-first-consultation";
import { PostpartumClinician } from "./postpartum-care-clinician";
import { PostpartumPractical, PostpartumFaq } from "./postpartum-care-info-sections";
import { PostpartumRelatedCare } from "./postpartum-care-related-care";
import { PostpartumEnquiry, PostpartumMobileEnquiryBar } from "./postpartum-care-enquiry";

/**
 * Postpartum Recovery & Care — dedicated landing page, following the exact
 * same additive pattern the other eight dedicated landing pages establish:
 * rendered for exactly one slug (`postpartum-care`) by
 * `app/services/[slug]/page.tsx`, which still generates all 11 service
 * routes and still reads the same shared `services-content.ts` record for
 * this slug's metadata — only this one route's own body swaps; every other
 * route (all eight other dedicated landing pages included) still renders
 * exactly as it did before this page existed.
 *
 * `--postpartum-sky-wash`/`--postpartum-rose-wash`: this page's own
 * page-scoped wash tokens, built from BirthWave's existing confirmed brand
 * hues (`--color-sky`, `--color-terracotta`) — the identical "local custom
 * properties on this page's own wrapper, not a new global token" approach
 * every other dedicated landing page already establishes. Section order
 * (01 Hero → 10 Final Enquiry, Related Care as section 09 before the
 * closing enquiry) follows this page's own approved brief exactly.
 *
 * The `<noscript>` block is this page's own no-JS safety net for
 * `PostpartumReveal` (see that component's own comment) — every reveal
 * instance ships `opacity-0` in the server-rendered HTML and only ever
 * becomes visible via a client-side `IntersectionObserver` effect, so
 * without JS every section below the hero would stay permanently
 * invisible. This forces them back to their settled, visible state.
 */
export function PostpartumLandingPage() {
  return (
    <div
      style={
        {
          "--postpartum-sky-wash": "color-mix(in srgb, var(--color-sky) 12%, var(--color-paper))",
          "--postpartum-rose-wash": "color-mix(in srgb, var(--color-terracotta) 14%, var(--color-paper))",
        } as CSSProperties
      }
    >
      <noscript>
        <style>{`.postpartum-reveal{opacity:1 !important;transform:none !important}`}</style>
      </noscript>

      <PostpartumHero />
      <PostpartumIntro />
      <PostpartumCovers />
      <PostpartumRecovery />
      <PostpartumFirstConsultation />
      <PostpartumClinician />
      <PostpartumPractical />
      <PostpartumFaq />
      <PostpartumRelatedCare />
      <PostpartumEnquiry />
      <PostpartumMobileEnquiryBar />
    </div>
  );
}
