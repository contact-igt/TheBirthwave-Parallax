import { portraitGradient } from "@/components/ui/portrait-gradient";
import { servicesImagery } from "@/content/services-imagery";

/**
 * Newborn & Pediatric Care — page-local imagery map.
 *
 * `hero` reuses the one real, approved illustration this service already
 * has — `services-imagery.ts`'s own `newborn-pediatric-care` key
 * (`/images/services/newborn-pediatric-care-ai-preview-v1.webp`, already
 * live on the plain `/services` listing) — with its own alt text accurate
 * to where it appears on THIS page, the same "different `imageKey` per
 * usage context, no duplicated binary asset" pattern
 * `nutrition-emotional-wellbeing-landing-imagery.ts`/
 * `gynaecology-landing-imagery.ts` already establish. That illustration was
 * inspected and confirmed accurate for this page's own approved visual
 * direction: both parents and their newborn in a calm, home-adjacent
 * conversation with a paediatrician — no medical-drama staging, no
 * emergency imagery.
 *
 * The other four conceptual spots (Trust-Building Introduction, What the
 * Consultation May Cover, Questions Parents Often Bring, First
 * Consultation) have no dedicated approved image yet — no image-generation
 * tool is available in this session, the same situation
 * `postpartum-care-landing-imagery.ts` and `vbac-landing-imagery.ts`
 * document for their own slots — so each renders the site's established
 * "built visual placeholder" (`MediaPlaceholder`'s
 * gradient-panel-plus-caption mechanism) rather than a real photograph, a
 * reused/relabelled image from another service's page, or a fabricated
 * file. `gradient` reuses `portraitGradient`'s existing three confirmed
 * brand hues (terracotta, sky, coral) cycled by index; no new colour is
 * invented for this page. Full generation briefs for all five subjects
 * (including the already-fulfilled hero) live in
 * `docs/newborn-pediatric-care-ai-imagery.md` — swapping a real `src` in
 * once approved photography/illustration exists is the only change either
 * `NewbornImage` or `NewbornHero` will need.
 */
export const newbornImagery = {
  hero: {
    src: servicesImagery["newborn-pediatric-care"].src,
    alt: "AI-generated illustration: Both parents hold their newborn while talking with a paediatrician in a calm, home-adjacent room.",
    // Source photo is portrait-oriented (~1122x1401): father holds the
    // newborn in the left third (his face ~22% across, ~24% down; the
    // baby's face ~38% across, ~55% down), the mother sits centre-left
    // (~48% across), and the paediatrician sits in the right third. Inside
    // this wide/short hero container desktop crops are width-bound (the
    // full image width always shows, so desktop.x has little visible
    // effect — the same situation `gynaecology-landing-imagery.ts`'s own
    // hero entry documents), while `mobile.x` genuinely matters since the
    // tall mobile panel crops horizontally too — chosen to keep the
    // father-and-newborn cluster in frame. Confirmed by visual inspection
    // of the source file.
    focalPoint: { mobile: "32% 30%", desktop: "38% 24%" },
  },
  introduction: {
    alt: "AI-generated illustration pending: a parent noticing and interacting with their baby in a warm everyday environment.",
    gradient: portraitGradient(1),
  },
  consultation: {
    alt: "AI-generated illustration pending: a paediatrician speaking with a parent while their baby is present.",
    gradient: portraitGradient(2),
  },
  "daily-care": {
    alt: "AI-generated illustration pending: a natural parent-and-baby daily routine moment.",
    gradient: portraitGradient(0),
  },
  "first-visit": {
    alt: "AI-generated illustration pending: a warm, respectful pediatric consultation scene.",
    gradient: portraitGradient(1),
  },
} as const;

export type NewbornImageKey = keyof typeof newbornImagery;
