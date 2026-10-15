import type { CSSProperties } from "react";
import { BirthPrepHero } from "./birth-preparation-hero";
import { BirthPrepIntro } from "./birth-preparation-intro";
import { BirthPrepWho } from "./birth-preparation-who";
import { BirthPrepTopics } from "./birth-preparation-topics";
import { BirthPrepExperience } from "./birth-preparation-experience";
import { BirthPrepPreferences } from "./birth-preparation-preferences";
import { BirthPrepTeam } from "./birth-preparation-team";
import { BirthPrepGallery } from "./birth-preparation-gallery";
import { BirthPrepProgramme, BirthPrepFaq } from "./birth-preparation-info-sections";
import { BirthPrepRelatedCare } from "./birth-preparation-related-care";
import { BirthPrepEnquiry, BirthPrepMobileEnquiryBar } from "./birth-preparation-enquiry";

/**
 * Birth Preparation & Childbirth Education — dedicated workshop landing page.
 * Renders all 12 structured sections in exact sequence:
 * 01. Hero
 * 02. Why Prepare for Birth?
 * 03. Who Is This Workshop For?
 * 04. What Will You Learn? (8 modules)
 * 05. The Workshop Experience (5 steps)
 * 06. Your Birth Preferences
 * 07. Meet the People Behind the Workshop (Care Team)
 * 08. Inside Our Workshops (Learning moments)
 * 09. Before You Join (Workshop information)
 * 10. Frequently Asked Questions (12 FAQs)
 * 11. Connected Care (6 interrelated services)
 * 12. Enquiry & Registration (Direct contact + form)
 */
export function BirthPreparationLandingPage() {
  return (
    <div
      className="overflow-x-clip"
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

      {/* SECTION 01 — HERO */}
      <BirthPrepHero />

      {/* SECTION 02 — WHY PREPARE FOR BIRTH? */}
      <BirthPrepIntro />

      {/* SECTION 03 — WHO IS THIS WORKSHOP FOR? */}
      <BirthPrepWho />

      {/* SECTION 04 — WHAT WILL YOU LEARN? */}
      {/* <BirthPrepTopics /> */}

      {/* SECTION 05 — THE WORKSHOP EXPERIENCE */}
      <BirthPrepExperience />

      {/* SECTION 06 — YOUR BIRTH PREFERENCES */}
      <BirthPrepPreferences />

      {/* SECTION 07 — MEET THE PEOPLE BEHIND THE WORKSHOP */}
      <BirthPrepTeam />

      {/* SECTION 08 — INSIDE OUR WORKSHOPS */}
      <BirthPrepGallery />

      {/* SECTION 09 — BEFORE YOU JOIN */}
      <BirthPrepProgramme />

      {/* SECTION 10 — FREQUENTLY ASKED QUESTIONS */}
      <BirthPrepFaq />

      {/* SECTION 11 — CONNECTED CARE */}
      <BirthPrepRelatedCare />

      {/* SECTION 12 — ENQUIRY & REGISTRATION */}
      <BirthPrepEnquiry />
      <BirthPrepMobileEnquiryBar />
    </div>
  );
}
