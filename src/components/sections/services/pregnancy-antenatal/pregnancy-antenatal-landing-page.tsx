import type { CSSProperties } from "react";
import { PregnancyAntenatalHero } from "./pregnancy-antenatal-hero";
import { PregnancyAntenatalIntro } from "./pregnancy-antenatal-intro";
import { PregnancyAntenatalCareIncludes, PregnancyAntenatalFirstConsultation } from "./pregnancy-antenatal-care-includes";
import {
  PregnancyAntenatalClinician,
  PregnancyAntenatalApproach,
  PregnancyAntenatalFaq,
  PregnancyAntenatalVisit,
} from "./pregnancy-antenatal-info-sections";
import { PregnancyAntenatalAppointment, PregnancyMobileAppointmentBar } from "./pregnancy-antenatal-appointment";
import { PregnancyAntenatalRelatedCare } from "./pregnancy-antenatal-related-care";

/**
 * Pregnancy & Antenatal Care — dedicated landing page, implementing the
 * approved editorial reference (antenatal-editorial-preview-v2.html) with
 * this project's own components, tokens and conventions rather than
 * reproducing the reference's own inner scrolling container, fixed
 * 810px preview height, section-number annotations or demo chrome — this
 * renders as a normal route, scrolling through the real browser window.
 *
 * Rendered for exactly one slug (`pregnancy-antenatal-care`) by
 * `app/services/[slug]/page.tsx`, which still generates all 11 service
 * routes and still reads the SAME shared `services-content.ts` record for
 * this slug's metadata — only the page body swaps for this one route; the
 * other ten still render through the unmodified `ServicePageTemplate`.
 *
 * `--pregnancy-sage-wash`/`--pregnancy-sky-wash`: the one deliberate,
 * PAGE-SCOPED addition beyond this project's existing tokens. BirthWave's
 * three confirmed brand hues are dusty rose (`--color-terracotta`), blue
 * (`--color-sky`) and coral (`--color-coral`) — none of them sage, yet
 * the approved reference's own second and sixth sections are explicitly
 * sage-toned washes (`--bw-sage:#e2e8df`), a real, approved part of this
 * page's own design direction, not an incidental preview colour. Scoped
 * to this page's own wrapper (not added to `tokens.css`/`globals.css`),
 * the same "local custom properties, never a new global token" approach
 * `services-sticky-showcase.tsx`'s own `--care-*` variables already
 * establish for a comparable one-page-only need. The soft-blue wash
 * reuses the EXISTING `--color-sky` token at a low mix instead of a
 * second new colour.
 */
export function PregnancyAntenatalLandingPage() {
  return (
    <div
      style={
        {
          "--pregnancy-sage-wash": "color-mix(in srgb, #8a9a7e 16%, var(--color-paper))",
          "--pregnancy-sky-wash": "color-mix(in srgb, var(--color-sky) 12%, var(--color-paper))",
        } as CSSProperties
      }
    >
      <PregnancyAntenatalHero />
      <PregnancyAntenatalIntro />
      <PregnancyAntenatalCareIncludes />
      <PregnancyAntenatalFirstConsultation />
      <PregnancyAntenatalClinician />
      <PregnancyAntenatalApproach />
      <PregnancyAntenatalFaq />
      <PregnancyAntenatalVisit />
      <PregnancyAntenatalAppointment />
      <PregnancyAntenatalRelatedCare />
      <PregnancyMobileAppointmentBar />
    </div>
  );
}
