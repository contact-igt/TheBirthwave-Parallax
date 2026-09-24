import type { CSSProperties } from "react";
import { NewbornHero } from "./newborn-pediatric-care-hero";
import { NewbornIntro } from "./newborn-pediatric-care-intro";
import { NewbornCovers } from "./newborn-pediatric-care-covers";
import { NewbornQuestions } from "./newborn-pediatric-care-questions";
import { NewbornFirstConsultation } from "./newborn-pediatric-care-first-consultation";
import { NewbornClinician } from "./newborn-pediatric-care-clinician";
import { NewbornPractical, NewbornFaq } from "./newborn-pediatric-care-info-sections";
import { NewbornRelatedCare } from "./newborn-pediatric-care-related-care";
import { NewbornEnquiry, NewbornMobileEnquiryBar } from "./newborn-pediatric-care-enquiry";

/**
 * Newborn & Pediatric Care — dedicated landing page, following the exact
 * same additive pattern the other ten dedicated landing pages establish:
 * rendered for exactly one slug (`newborn-pediatric-care`) by
 * `app/services/[slug]/page.tsx`, which still generates all 11 service
 * routes and still reads the same shared `services-content.ts` record for
 * this slug's metadata — only this one route's own body swaps; every other
 * route (all ten other dedicated landing pages included) still renders
 * exactly as it did before this page existed. This is the last of the 11
 * confirmed services to receive its own dedicated landing page.
 *
 * `--newborn-sky-wash`/`--newborn-rose-wash`: this page's own page-scoped
 * wash tokens, built from BirthWave's existing confirmed brand hues
 * (`--color-sky`, `--color-terracotta`) — the identical "local custom
 * properties on this page's own wrapper, not a new global token" approach
 * every other dedicated landing page already establishes. Section order
 * (01 Hero → 10 Final Enquiry, Related Care as section 09 before the
 * closing enquiry) follows this page's own approved brief exactly.
 *
 * The `<noscript>` block is this page's own no-JS safety net for
 * `NewbornReveal` (see that component's own comment) — every reveal
 * instance ships `opacity-0` in the server-rendered HTML and only ever
 * becomes visible via a client-side `IntersectionObserver` effect, so
 * without JS every section below the hero would stay permanently
 * invisible. This forces them back to their settled, visible state.
 */
export function NewbornLandingPage() {
  return (
    <div
      style={
        {
          "--newborn-sky-wash": "color-mix(in srgb, var(--color-sky) 12%, var(--color-paper))",
          "--newborn-rose-wash": "color-mix(in srgb, var(--color-terracotta) 14%, var(--color-paper))",
        } as CSSProperties
      }
    >
      <noscript>
        <style>{`.newborn-reveal{opacity:1 !important;transform:none !important}`}</style>
      </noscript>

      <NewbornHero />
      <NewbornIntro />
      <NewbornCovers />
      <NewbornQuestions />
      <NewbornFirstConsultation />
      <NewbornClinician />
      <NewbornPractical />
      <NewbornFaq />
      <NewbornRelatedCare />
      <NewbornEnquiry />
      <NewbornMobileEnquiryBar />
    </div>
  );
}
