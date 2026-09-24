import type { CSSProperties } from "react";
import { NaturalBirthHero } from "./natural-birth-hero";
import { NaturalBirthApproach } from "./natural-birth-approach";
import { NaturalBirthPreferences } from "./natural-birth-preferences";
import { NaturalBirthSupport } from "./natural-birth-support";
import { NaturalBirthFlexibility } from "./natural-birth-flexibility";
import { NaturalBirthJourney } from "./natural-birth-journey";
import { NaturalBirthClinician } from "./natural-birth-clinician";
import { NaturalBirthPracticalInformation } from "./natural-birth-practical-information";
import { NaturalBirthFaq } from "./natural-birth-faq";
import { NaturalBirthRelatedCare } from "./natural-birth-related-care";
import { NaturalBirthEnquiry, NaturalBirthMobileEnquiryBar } from "./natural-birth-enquiry";

/**
 * Natural Birth — dedicated landing page, following the exact same
 * additive pattern every other dedicated landing page establishes:
 * rendered for exactly one slug (`natural-birth`) by
 * `app/services/[slug]/page.tsx`, which still generates every other
 * service route and still reads the same shared `services-content.ts`
 * record for this slug's metadata — only this one route's own body
 * swaps in; no other route changes shape.
 *
 * POSITIONING: this page is about birth PREFERENCES, preparation and
 * flexibility — deliberately distinct from `normal-birth-delivery` (the
 * broader labour-support/delivery-care pathway), `birth-preparation`
 * (education and readiness before labour) and `vbac` (birth planning
 * specifically after a previous caesarean). See
 * `natural-birth-landing-content.ts`'s own top comment for the full
 * positioning statement, repeated nowhere else so it can't drift.
 *
 * `--natural-birth-sky-wash`/`--natural-birth-coral-wash`: this page's
 * own page-scoped wash tokens, built from BirthWave's existing confirmed
 * brand hues (`--color-sky`, `--color-coral`) — the same "page-scoped
 * local custom properties, never a new global token" approach
 * `vbac-landing-page.tsx`'s own tokens already establish.
 *
 * The `<noscript>` block is this page's own no-JS safety net for
 * `NaturalBirthReveal` (see that component's own comment) — every reveal
 * instance ships `opacity-0` in the server-rendered HTML and only ever
 * becomes visible via a client-side `IntersectionObserver` effect, so
 * without JS every section below the hero would stay permanently
 * invisible. This forces them back to their settled, visible state.
 */
export function NaturalBirthLandingPage() {
  return (
    <div
      style={
        {
          "--natural-birth-sky-wash": "color-mix(in srgb, var(--color-sky) 14%, var(--color-paper))",
          "--natural-birth-coral-wash": "color-mix(in srgb, var(--color-coral) 14%, var(--color-paper))",
        } as CSSProperties
      }
    >
      <noscript>
        <style>{`.natural-birth-reveal{opacity:1 !important;transform:none !important}`}</style>
      </noscript>

      <NaturalBirthHero />
      <NaturalBirthApproach />
      <NaturalBirthPreferences />
      <NaturalBirthSupport />
      <NaturalBirthFlexibility />
      <NaturalBirthJourney />
      <NaturalBirthClinician />
      <NaturalBirthPracticalInformation />
      <NaturalBirthFaq />
      <NaturalBirthEnquiry />
      <NaturalBirthRelatedCare />
      <NaturalBirthMobileEnquiryBar />
    </div>
  );
}
