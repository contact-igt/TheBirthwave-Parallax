import { portraitGradient } from "@/components/ui/portrait-gradient";
import { servicesImagery } from "@/content/services-imagery";

/**
 * Lactation & Breastfeeding Support — page-local imagery map.
 *
 * `hero` reuses the one real, approved illustration this service already
 * has — `services-imagery.ts`'s own `lactation` key
 * (`/images/services/lactation-ai-preview-v1.webp`, already live on the
 * plain `/services` listing) — with its own alt text accurate to where it
 * appears on THIS page, the same "different `imageKey` per usage context, no
 * duplicated binary asset" pattern `gynaecology-landing-imagery.ts` and
 * `vaginismus-landing-imagery.ts` already establish. That illustration
 * already matches this page's own approved visual direction: a mother
 * holding her newborn during a warm, unhurried lactation conversation, warm
 * ivory and sage tones, no clinical clichés.
 *
 * The other four conceptual spots (Trust-Building Introduction, What We Can
 * Talk Through, Questions & Planning Support, First Consultation) have no
 * dedicated approved image yet — no image-generation tool is available in
 * this session, exactly the situation `gynaecology-landing-imagery.ts` and
 * `vaginismus-landing-imagery.ts` document for their own slots — so each
 * renders the site's established "built visual placeholder"
 * (`MediaPlaceholder`'s gradient-panel-plus-caption mechanism) rather than a
 * real photograph, a reused/relabelled image from another service's page, or
 * a fabricated file. `gradient` reuses `portraitGradient`'s existing three
 * confirmed brand hues (terracotta, sky, coral) cycled by index; no new
 * colour is invented for this page. Full generation briefs for all five
 * subjects (including the already-fulfilled hero) live in
 * `docs/lactation-ai-imagery.md` — swapping a real `src` in once approved
 * photography/illustration exists is the only change either
 * `LactationImage` or `LactationHero` will need.
 */
export const lactationImagery = {
  hero: {
    src: servicesImagery.lactation.src,
    alt: "AI-generated illustration: A mother holds her newborn while talking with a lactation care professional in a calm, warmly lit room.",
    // Source photo is portrait-oriented (~1122x1402), mother and newborn
    // occupy the left ~55% of the frame with her face sitting roughly
    // 26-30% across and 20-24% down; the care professional sits in the
    // right third. Inside this wide/short hero container desktop crops
    // are width-bound (the full image width always shows, so `desktop.x`
    // has little visible effect), matching the same situation
    // `gynaecology-landing-imagery.ts`'s own hero entry documents —
    // `mobile.x` genuinely matters since the tall mobile panel crops
    // horizontally too. Confirmed by visual inspection of the source file.
    focalPoint: { mobile: "28% 20%", desktop: "30% 24%" },
  },
  consultation: {
    alt: "AI-generated illustration pending: a lactation counsellor speaking with a mother who is holding her baby.",
    gradient: portraitGradient(0),
  },
  "feeding-support": {
    alt: "AI-generated illustration pending: a warm, everyday parent-and-newborn feeding moment.",
    gradient: portraitGradient(1),
  },
  "preparing-before-birth": {
    alt: "AI-generated illustration pending: a pregnant woman thinking through feeding preparation.",
    gradient: portraitGradient(2),
  },
  "first-consultation": {
    alt: "AI-generated illustration pending: a parent asking questions in a supportive lactation-care setting.",
    gradient: portraitGradient(0),
  },
} as const;

export type LactationImageKey = keyof typeof lactationImagery;
