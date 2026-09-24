import type { CSSProperties } from "react";
import { NormalBirthHero } from "./normal-birth-delivery-hero";
import { NormalBirthIntro } from "./normal-birth-delivery-intro";
import { NormalBirthJourney } from "./normal-birth-delivery-journey";
import { NormalBirthPreferences } from "./normal-birth-delivery-preferences";
import { NormalBirthComfort } from "./normal-birth-delivery-comfort";
import { NormalBirthConsultation } from "./normal-birth-delivery-consultation";
import { NormalBirthCareTeam, NormalBirthArrangements, NormalBirthFaq } from "./normal-birth-delivery-info-sections";
import { NormalBirthEnquiry, NormalBirthMobileEnquiryBar } from "./normal-birth-delivery-enquiry";
import { NormalBirthRelatedCare } from "./normal-birth-delivery-related-care";

/**
 * Normal Birth & Delivery Care — dedicated landing page, following the
 * exact same additive pattern `pregnancy-antenatal-landing-page.tsx` and
 * `birth-preparation-landing-page.tsx` establish: rendered for exactly one
 * slug (`normal-birth-delivery`) by `app/services/[slug]/page.tsx`, which
 * still generates all 11 service routes and still reads the same shared
 * `services-content.ts` record for this slug's metadata — only this one
 * route's own body swaps; the other ten (both other dedicated landing
 * pages included) still render exactly as they did before this page
 * existed.
 *
 * `--nbd-rose-wash`/`--nbd-sky-wash`: this page's own page-scoped wash
 * tokens, built from BirthWave's existing confirmed brand hues
 * (`--color-terracotta`, `--color-sky`) rather than inventing a new
 * colour — the identical "local custom properties on this page's own
 * wrapper, not a new global token" approach both other landing pages
 * already establish.
 *
 * The `<noscript>` block is this page's own NO-JS safety net for
 * `NormalBirthReveal` (see that component's own comment) — every reveal
 * instance ships `opacity-0` in the server-rendered HTML and only ever
 * becomes visible via a client-side `IntersectionObserver` effect, so
 * without JS every section below the hero would stay permanently
 * invisible. This forces them back to their settled, visible state.
 */
export function NormalBirthDeliveryLandingPage() {
  return (
    <div
      style={
        {
          "--nbd-rose-wash": "color-mix(in srgb, var(--color-terracotta) 16%, var(--color-paper))",
          "--nbd-sky-wash": "color-mix(in srgb, var(--color-sky) 12%, var(--color-paper))",
        } as CSSProperties
      }
    >
      <noscript>
        <style>{`.normal-birth-reveal{opacity:1 !important;transform:none !important}`}</style>
      </noscript>

      <NormalBirthHero />
      <NormalBirthIntro />
      <NormalBirthJourney />
      <NormalBirthPreferences />
      <NormalBirthComfort />
      <NormalBirthConsultation />
      <NormalBirthCareTeam />
      <NormalBirthArrangements />
      <NormalBirthFaq />
      <NormalBirthEnquiry />
      <NormalBirthRelatedCare />
      <NormalBirthMobileEnquiryBar />
    </div>
  );
}
