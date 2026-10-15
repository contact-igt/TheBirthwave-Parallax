# Shared Care Service Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every `/services/[slug]` route use the approved reference hero layout while preserving its existing copy, image, and links.

**Architecture:** Add one presentational `CareServiceHero` server component. Existing dedicated hero components become small data adapters, and the generic service template uses the same component directly.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, `next/image`.

**Spec:** `docs/superpowers/specs/2026-10-15-shared-care-service-hero-design.md`

## Global Constraints

- No new dependency or content source.
- Preserve existing service copy, CTA destinations, image paths, focal points, alt text, and all sections below each hero.
- The shared hero is server-rendered and responsive, with copy before imagery in DOM order.
- Reuse `Button`, `CtaLink`, `next/image`, and existing design tokens.

## Review Focus

- Missing optional secondary CTA must not leave an empty layout gap.
- Long service headings must wrap without overlapping the image or actions.
- Images with custom focal points must preserve those crops.
- Mobile layout must keep heading and primary action before the image.
- Generic routes without dedicated imagery must retain an accessible fallback visual.

---

### Task 1: Build the shared hero

**Files:**
- Create: `src/components/sections/services/care-service-hero.tsx`

**Interfaces:**
- Produces: `CareServiceHero(props: CareServiceHeroProps)` with eyebrow, heading, supporting copy, optional body, image/fallback media, primary CTA, optional secondary CTA, optional location/disclosure, and optional focal point.

- [ ] Implement the typed server component using the approved two-column paper layout, rounded image frame, existing CTA components, and accessible heading/image semantics.
- [ ] Ensure optional content collapses cleanly and the fallback media is labelled.
- [ ] Run `npx eslint src/components/sections/services/care-service-hero.tsx` and expect zero errors.

### Task 2: Migrate all service heroes

**Files:**
- Modify: `src/features/services/service-page-template.tsx`
- Modify: every `*-hero.tsx` under `src/components/sections/services/{pregnancy-antenatal,birth-preparation,normal-birth-delivery,vbac,fertility-preconception,vaginismus,gynaecology,lactation,postpartum-care,nutrition-emotional-wellbeing,newborn-pediatric-care,natural-birth}/`

**Interfaces:**
- Consumes: `CareServiceHero` and each page's existing content/imagery exports.
- Produces: unchanged named hero exports for their existing landing-page callers.

- [ ] Replace bespoke hero markup with the shared component while retaining each component export and current data source.
- [ ] Map every existing CTA, image alt, disclosure, focal point, and supporting text without rewriting approved content.
- [ ] Run ESLint on all touched hero files and expect zero errors.

### Task 3: Verify every route and responsive layout

**Files:**
- Modify only if verification finds a shared-component defect.

**Interfaces:**
- Consumes: all migrated service hero exports and the generic service template.

- [ ] Run `npx tsc --noEmit`; expect no new diagnostics beyond any confirmed pre-existing repository issue.
- [ ] Run `npm run build`; expect all static service routes to compile.
- [ ] Inspect representative generic, long-heading, focal-point, and optional-secondary-CTA routes at desktop and mobile widths.
- [ ] Confirm the hero matches the supplied reference structure and that lower-page sections remain unchanged.
