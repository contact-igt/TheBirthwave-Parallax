import type { CSSProperties } from "react";
import { BirthPrepHero } from "./birth-preparation-hero";
import { BirthPrepIntro } from "./birth-preparation-intro";
import { BirthPrepTopics } from "./birth-preparation-topics";
import { BirthPrepPreferences } from "./birth-preparation-preferences";
import { BirthPrepWhoFor, BirthPrepHowToBegin, BirthPrepEducator, BirthPrepProgramme, BirthPrepFaq } from "./birth-preparation-info-sections";
import { BirthPrepEnquiry, BirthPrepMobileEnquiryBar } from "./birth-preparation-enquiry";
import { BirthPrepRelatedCare } from "./birth-preparation-related-care";

/**
 * Birth Preparation & Childbirth Education — dedicated landing page,
 * following the exact same additive pattern
 * `pregnancy-antenatal-landing-page.tsx` establishes: rendered for exactly
 * one slug (`birth-preparation`) by `app/services/[slug]/page.tsx`, which
 * still generates all 11 service routes and still reads the same shared
 * `services-content.ts` record for this slug's metadata — only this one
 * route's own body swaps; the other ten (the pregnancy landing page
 * included) still render exactly as they did before this page existed.
 *
 * `--birth-prep-rose-wash`/`--birth-prep-sky-wash`: this page's own
 * page-scoped wash tokens, deliberately built from BirthWave's EXISTING
 * confirmed brand hues (`--color-terracotta` — already documented in
 * tokens.css as the project's "dusty rose" — and the existing
 * `--color-sky`) rather than inventing a new colour the way the pregnancy
 * page's sage wash does. The brief asks for "a quiet rose or sage
 * background" on the birth-preferences section; rose was chosen here
 * specifically because it needs no new, unapproved hue at all — reusing
 * the identical "local custom properties on this page's own wrapper, not
 * a new global token" approach the pregnancy page and
 * `services-sticky-showcase.tsx`'s own `--care-*` variables already
 * establish.
 *
 * The `<noscript>` block is this page's own NO-JS safety net for
 * `BirthPrepReveal` (see that component's own comment) — every reveal
 * instance ships `opacity-0` in the server-rendered HTML and only ever
 * becomes visible via a client-side `IntersectionObserver` effect, so
 * without JS every section below the hero would stay permanently
 * invisible. This forces them back to their settled, visible state,
 * mirroring `team-journey.tsx`'s own established `<noscript>` pattern.
 */
export function BirthPreparationLandingPage() {
  return (
    <div
      style={
        {
          "--birth-prep-rose-wash": "color-mix(in srgb, var(--color-terracotta) 16%, var(--color-paper))",
          "--birth-prep-sky-wash": "color-mix(in srgb, var(--color-sky) 12%, var(--color-paper))",
        } as CSSProperties
      }
    >
      <noscript>
        <style>{`.birth-prep-reveal{opacity:1 !important;transform:none !important}`}</style>
      </noscript>

      <BirthPrepHero />
      <BirthPrepIntro />
      <BirthPrepTopics />
      <BirthPrepPreferences />
      <BirthPrepWhoFor />
      <BirthPrepHowToBegin />
      <BirthPrepEducator />
      <BirthPrepProgramme />
      <BirthPrepFaq />
      <BirthPrepEnquiry />
      <BirthPrepRelatedCare />
      <BirthPrepMobileEnquiryBar />
    </div>
  );
}
