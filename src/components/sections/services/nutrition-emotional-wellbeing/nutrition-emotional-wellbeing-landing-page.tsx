import type { CSSProperties } from "react";
import { NutritionHero } from "./nutrition-emotional-wellbeing-hero";
import { NutritionIntro } from "./nutrition-emotional-wellbeing-intro";
import { NutritionCovers } from "./nutrition-emotional-wellbeing-covers";
import { NutritionTogether } from "./nutrition-emotional-wellbeing-together";
import { NutritionFirstConsultation } from "./nutrition-emotional-wellbeing-first-consultation";
import { NutritionClinician } from "./nutrition-emotional-wellbeing-clinician";
import { NutritionPractical, NutritionFaq } from "./nutrition-emotional-wellbeing-info-sections";
import { NutritionRelatedCare } from "./nutrition-emotional-wellbeing-related-care";
import { NutritionEnquiry, NutritionMobileEnquiryBar } from "./nutrition-emotional-wellbeing-enquiry";

/**
 * Nutrition & Emotional Well-being — dedicated landing page, following the
 * exact same additive pattern the other nine dedicated landing pages
 * establish: rendered for exactly one slug (`nutrition-emotional-wellbeing`)
 * by `app/services/[slug]/page.tsx`, which still generates all 11 service
 * routes and still reads the same shared `services-content.ts` record for
 * this slug's metadata — only this one route's own body swaps; every other
 * route (all nine other dedicated landing pages included) still renders
 * exactly as it did before this page existed.
 *
 * `--nutrition-sage-wash`/`--nutrition-rose-wash`: this page's own
 * page-scoped wash tokens, built from BirthWave's existing confirmed brand
 * hues — the identical "local custom properties on this page's own
 * wrapper, not a new global token" approach every other dedicated landing
 * page already establishes (the sage mix mirrors
 * `pregnancy-antenatal-landing-page.tsx`'s own `--pregnancy-sage-wash`).
 * Section order (01 Hero → 10 Final Enquiry, Related Care as section 09
 * before the closing enquiry) follows this page's own approved brief
 * exactly.
 *
 * The `<noscript>` block is this page's own no-JS safety net for
 * `NutritionReveal` (see that component's own comment) — every reveal
 * instance ships `opacity-0` in the server-rendered HTML and only ever
 * becomes visible via a client-side `IntersectionObserver` effect, so
 * without JS every section below the hero would stay permanently
 * invisible. This forces them back to their settled, visible state.
 */
export function NutritionLandingPage() {
  return (
    <div
      style={
        {
          "--nutrition-sage-wash": "color-mix(in srgb, #8a9a7e 16%, var(--color-paper))",
          "--nutrition-rose-wash": "color-mix(in srgb, var(--color-terracotta) 14%, var(--color-paper))",
        } as CSSProperties
      }
    >
      <noscript>
        <style>{`.nutrition-reveal{opacity:1 !important;transform:none !important}`}</style>
      </noscript>

      <NutritionHero />
      <NutritionIntro />
      <NutritionCovers />
      <NutritionTogether />
      <NutritionFirstConsultation />
      <NutritionClinician />
      <NutritionPractical />
      <NutritionFaq />
      <NutritionRelatedCare />
      <NutritionEnquiry />
      <NutritionMobileEnquiryBar />
    </div>
  );
}
