import type { CSSProperties } from "react";
import { VbacHero } from "./vbac-hero";
import { VbacIntro } from "./vbac-intro";
import { VbacConversation, VbacInformed } from "./vbac-conversation";
import { VbacPlanning } from "./vbac-planning";
import { VbacFirstVisit } from "./vbac-first-visit";
import { VbacClinician } from "./vbac-clinician";
import { VbacPracticalInformation } from "./vbac-practical-information";
import { VbacFaq } from "./vbac-faq";
import { VbacEnquiry, VbacMobileEnquiryBar } from "./vbac-enquiry";
import { VbacRelatedCare } from "./vbac-related-care";

/**
 * VBAC (Vaginal Birth After Caesarean) — dedicated landing page, following
 * the exact same additive pattern the other three dedicated landing pages
 * establish: rendered for exactly one slug (`vbac`) by
 * `app/services/[slug]/page.tsx`, which still generates all 11 service
 * routes and still reads the same shared `services-content.ts` record for
 * this slug's metadata — only this one route's own body swaps; the other
 * ten routes still render exactly as they did before this page existed.
 *
 * `--vbac-sky-wash`/`--vbac-coral-wash`: this page's own page-scoped wash
 * tokens, built from BirthWave's existing confirmed brand hues
 * (`--color-sky`, `--color-coral`) — a deliberately different pairing from
 * Normal Birth & Delivery Care's own rose+sky wash, so the two "Birth"
 * chapter pages don't read as recolours of each other, without inventing a
 * fourth brand colour.
 *
 * The `<noscript>` block is this page's own no-JS safety net for
 * `VbacReveal` (see that component's own comment) — every reveal instance
 * ships `opacity-0` in the server-rendered HTML and only ever becomes
 * visible via a client-side `IntersectionObserver` effect, so without JS
 * every section below the hero would stay permanently invisible. This
 * forces them back to their settled, visible state.
 */
export function VbacLandingPage() {
  return (
    <div
      style={
        {
          "--vbac-sky-wash": "color-mix(in srgb, var(--color-sky) 14%, var(--color-paper))",
          "--vbac-coral-wash": "color-mix(in srgb, var(--color-coral) 14%, var(--color-paper))",
        } as CSSProperties
      }
    >
      <noscript>
        <style>{`.vbac-reveal{opacity:1 !important;transform:none !important}`}</style>
      </noscript>

      <VbacHero />
      <VbacIntro />
      <VbacConversation />
      <VbacInformed />
      <VbacPlanning />
      <VbacFirstVisit />
      <VbacClinician />
      <VbacPracticalInformation />
      <VbacFaq />
      <VbacEnquiry />
      <VbacRelatedCare />
      <VbacMobileEnquiryBar />
    </div>
  );
}
