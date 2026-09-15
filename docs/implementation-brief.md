# The Birth Wave — Implementation Brief

Phase 1: foundation, navigation, hero, one visual-story section. This document
is the record of what the brand guide actually confirms, what it doesn't, and
the decisions made to bridge the gap. Read it before extending the site.

---

## HOMEPAGE STATUS: LOCKED

Homepage stabilization is complete. The Hero → Philosophy transition
specifically was reworked again after §42–43 locked it — see §44 for the
current architecture and QA record; §42–43 describe the pinned-timeline
version that preceded it, kept here for history, not as the current state.
Treat the rest of the current homepage implementation as **locked**: Hero's
media/branding/copy, Journey, Dark Emotional, Care & Trust, FAQ, Final CTA,
mobile responsive behavior, and the reduced-motion architecture are all
shipped as-is.

Only reopen homepage code for:
1. An actual functional bug.
2. An accessibility issue.
3. A content correction.
4. A production performance issue.
5. An explicit future change request.

No further homepage design work (redesign, retiming, "polish" passes) until
one of the above applies.

---

## 1. Confirmed design decisions

Extracted directly from `Reference/Birthwave Brand Guideline (2) (2).pdf`
(19 pages, rendered and inspected page-by-page — the file has no text layer,
so nothing was skimmed from a text export).

### Brand name & logo
- Full lockup reads **"The Birth Wave"** — a hand-lettered wordmark where the
  "B" of "Birth" is drawn as a monogram fused with a heartbeat/pulse line.
  "The" and "Wave" sit in a thin serif script around it.
- No separate logo files (SVG/AI/EPS) were supplied, and `/source-assets`
  does not exist in this repo. The guide itself is a flattened, vector PDF
  (Figma export) with no embedded text layer — so the logo artwork was
  extracted directly from the PDF's vector content at 4x render resolution,
  isolated as its own connected shape (not eyeballed-cropped), and recolored
  to the two confirmed palette colors. This is the real brand artwork, not a
  redraw — but it is **not a substitute for a delivered vector source file**.
  Four PNGs live in `public/brand/`:
  - `wordmark-mauve.png` / `wordmark-cream.png` — full "The Birth Wave" lockup
  - `icon-mauve.png` / `icon-cream.png` — the B + heartbeat mark alone
  - **Missing:** true vector (SVG) source, favicon export, OG/social image.

### Color palette (confirmed)
The guide's "Color Palette" page gives exact primary values in RGB/CMYK/HEX:

| Token | Hex | RGB | Role in guide |
|---|---|---|---|
| Terracotta | `#CA9585` | 202, 149, 133 | Primary |
| Sky | `#5DAEDB` | 93, 173, 219 | Primary |
| Coral | `#F88379` | 248, 131, 121 | Primary |

These three are used as-given. No tints/shades beyond the guide's own gradient
ramps are treated as "confirmed" — the ramps are presentation artifacts, not
named tokens.

**Not confirmed, and not guessed:** the guide never states a neutral text
color or a background/paper color — every slide in the deck uses either a
solid brand-color panel or a stock photo, never a documented "ink" or
"paper" neutral. Two neutrals were added to make a usable UI and are
disclosed as authored, not extracted:
- `--color-ink` `#241A17` — a warm near-black (never pure `#000000`),
  desaturated toward the terracotta so it doesn't read as generic charcoal.
- `--color-paper` `#FBF4F1` — a soft warm off-white, in the family of the
  blush tone sampled from the guide's own layout panels (`#F4E9E6`) but
  tuned as an independent, documented token rather than an eyedrop.

This gives 5 core tokens total (3 confirmed + 2 disclosed foundation
neutrals), inside the brief's 3–5 limit.

**No dark theme.** The guide documents no dark palette anywhere in its
19 pages — inventing one to follow the OS `prefers-color-scheme` would mean
guessing colors, which the brief rules out. The site is a single branded
light theme (warm paper, terracotta/sky/coral accents); this can be
revisited if a dark variant is ever confirmed.

### Typography (confirmed)
The guide's "Typography" section names exactly two families, shown with full
weight ranges:
- **Poppins** (Thin → Black, plus italics)
- **Plus Jakarta Sans** (Extra Light → Extra Bold, plus italics)

Neither is Inter or Roboto, satisfying the non-negotiable rule. **What the
guide does not state** is which face is for headings and which is for body —
both are shown identically, as a big bold specimen word. That role split is
an implementation decision, made and disclosed here rather than left
ambiguous:

- **Poppins → display/heading face.** Its geometric, rounder character reads
  with more presence at large editorial sizes and carries the hero/section
  headlines.
- **Plus Jakarta Sans → body/UI face.** Purpose-built for interface
  readability at small sizes, with true italics and a wide weight range for
  UI hierarchy (labels, nav, buttons, paragraph copy).

**Recommendation:** confirm this split with whoever owns the brand guide
before Phase 2. If reversed, it's a token-file change, not a rebuild — see
`src/styles/tokens.css` and `src/app/layout.tsx`.

### Recurring structural motif (confirmed by repetition)
Across at least ten of the nineteen pages (color palette, both typography
pages, social media, business card, letterhead, envelope, notepad, scrub
suit, website), the guide repeats one specific panel shape: a rectangle with
a **single deeply-rounded corner** (the others stay square), used to hold a
section title or as a card edge. This isn't stated as a rule anywhere, but
appearing consistently across most of the deck makes it a real, observed
brand device rather than an invented one — so it's adopted here as the
site's one structural signature: the hero and visual-story image panels use
an asymmetric single-corner radius instead of a generic uniform-rounded
card, which also keeps the layout out of "rounded SaaS card" territory.

### Everything else in the guide
Pages 9–19 are stationery and merch mockups (Instagram grid, business card,
letterhead, envelope, notepad, scrub suit, face mask) and one dated website
mockup. They confirm logo lockup usage (colors, clear space by example) but
define no spacing scale, grid, icon style, or component system — those are
authored fresh in this phase, using the confirmed palette and type only.

The photography used throughout the guide (soft-focus belly/baby-bootie
shots) is generic stock dressing for the guide's own template, not licensed
photography handed off for the website — it is **not reused**. Per the
brief and the $10K Checklist's "imagery with intent" rule, Phase 1 uses
built visual placeholders (gradient/texture panels with clear labeling), not
downloaded stock.

The business card and letterhead mockups show a name, phone number, email,
and Chennai address. These are **not used anywhere on the site**: the brief
explicitly excludes inventing or using founder/contact details without
confirmation, and a mockup inside a brand-guide PDF is not that
confirmation. Flagged below as an asset requiring sign-off.

---

## 2. Missing brand/content assets

Needed before this can go further than placeholder copy:

- [ ] Vector logo source (SVG/AI) — current asset is PDF-extracted PNG
- [x] ~~Favicon / app icon export~~ — generated from the extracted mark
      (`src/app/icon.png`, `src/app/favicon.ico`); swap for a proper export
      once a vector source exists
- [ ] Open Graph / social share image
- [ ] Confirmation of which typeface is heading vs. body (see above)
- [ ] Approved photography or video (hero + visual-story section currently
      use built placeholders, not stock)
- [ ] Real homepage copy: offering names, story/mission text, any service
      list, testimonials, credentials, stats
- [ ] Confirmation on using the business-card contact details
      (Dr Santoshi Nandigam, phone, email, Chennai address) found in the
      brand guide — or replacement details
- [ ] A defined spacing/type scale beyond typeface choice (authored fresh
      here — flag if a scale already exists elsewhere)
- [ ] Legal/medical review of any clinical or outcome claims before copy is
      finalized (none exist yet — placeholders only)

All of the above are marked `TODO` at their point of use in
`src/content/site-content.ts` and in component source.

---

## 3. Revision — logo placement and full-bleed hero

After the first pass, the client pointed at the Sky Clinics reference image
directly and asked for its structural pattern specifically: **no logo in the
header** — the logo and wordmark live inside the hero content instead — and
a **full-bleed hero photo** (the client will supply the image). This is a
deliberate, client-directed exception to the earlier "don't copy Sky
Clinics' layout" instruction, scoped to exactly these two things — not a
general license to match the rest of their page.

What changed:
- `site-header.tsx` no longer renders a logo. It's a transparent, `fixed`
  bar with nav links in a translucent glass pill and the one solid CTA
  (`Book a Consult`), so it reads over any photo tone.
- `hero-section.tsx` is now full-bleed (`min-h-dvh`, background layer
  `inset-0`) with the wordmark, eyebrow, headline, subhead and a
  **secondary link-style CTA** (`CtaLink`, not a solid button) stacked over
  it — the solid primary CTA stays in the header only, so the hero doesn't
  show two competing solid buttons in one view.
- The background is still the placeholder gradient + brand-icon watermark
  until a real photo is dropped in (`brand.logo.iconCream`, see
  `hero.media.alt` for the TODO). A left-anchored scrim
  (`paper` → transparent) sits behind the text column specifically so
  contrast holds regardless of what the eventual photo looks like — it
  doesn't rely on the photo itself being light, the way the reference's
  does.
- Trade-off worth flagging: with the header carrying no brand mark, there's
  no logo visible anywhere once a visitor scrolls past the hero. That's
  what was asked for and matches the reference; worth a second look once
  more sections exist.

## 4. Proposed homepage structure

Built this phase: **Header/Nav, Hero, Visual-Story.** Everything after is
scoped out deliberately (per brief) and listed here only to show where the
built sections sit in the eventual page.

```
Header (fixed, transparent, no logo — floating nav pill + one solid CTA)
Hero (full-bleed background layer, logo + copy over a contrast-safe scrim,
      restrained two-layer parallax)
Visual-Story (alternating split, two-layer parallax, brand icon watermark)
── not built this phase ──
Offering / services overview
Approach or philosophy section
Social proof (testimonials — placeholder-gated, none invented)
Journey / process
Final CTA
Footer
```

The header is transparent and `fixed` (out of document flow) specifically
so the hero can be full-bleed under it — see §3 for why, and for the one
deliberate exception this makes to "don't copy Sky Clinics' layout."

The visual-story section keeps its original asymmetric split-with-parallax
treatment (image left/text right on desktop, reversed stacking on mobile,
opposite-corner radius from the hero) — that part of the brief is
unchanged; only the header and hero were revised.

---

## 5. Accessibility approach

- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<section>` with
  `aria-label`/`aria-labelledby` where a visible heading doesn't already
  name the region.
- Heading order starts at `h1` (hero) and descends without skipping levels.
- All interactive elements (nav links, both CTAs, mobile menu toggle) have
  a visible focus ring (`:focus-visible`, never removed) and a minimum
  44×44px hit target. Verified tab order: skip link → nav links → header
  CTA → hero CTA — see §7.
- The hero wordmark is a static, non-interactive image with real `alt`
  text (the brand name); it isn't wrapped in a link, since it's already on
  the page it represents.
- Color pairs are checked against WCAG AA (4.5:1 body text / 3:1 large
  text) using the actual token values — see validation results below, not
  assumed from swatch appearance.
- `prefers-reduced-motion: reduce` disables the hero and visual-story
  parallax transforms and any entrance animation, falling back to the
  final static, fully-readable layout — verified in code, not just
  intended.
- Icons from `lucide-react` are decorative unless they carry meaning alone,
  in which case they get an accessible label; decorative instances get
  `aria-hidden`.
- Mobile nav (hamburger) is a real disclosure with `aria-expanded`,
  `aria-controls`, and keyboard/Escape support — not a CSS-only hide/show.

## 6. Performance approach

- `next/font/google` for both faces, self-hosted, variable weight ranges
  only where available, applied once in the root layout (no per-page font
  imports).
- `next/image` for every raster asset (the extracted logo PNGs now, real
  photography later), so the browser gets responsive `srcset`s and no
  layout shift.
- Parallax is done with CSS transforms driven by a single scroll listener
  (`transform: translate3d`), not top/left/width — the only two motion
  surfaces in this phase (hero image panel, visual-story layers), matching
  the brief's "restrained, two sections only" rule.
- No animation/scroll libraries added — the motion budget in this phase is
  small enough not to justify a dependency; revisit if Phase 2's process/
  journey section needs more.
- No external fonts, analytics, or third-party scripts — nothing outside
  local assets and `lucide-react`, per the brief's explicit scope limits.

---

## 7. Validation results (this phase)

- `npm run lint` — clean, 0 errors/warnings.
- `npx tsc --noEmit` — clean, 0 errors.
- `npm run build` — succeeds (Next.js 16.3.4, Turbopack), 3 static routes.
- Checked against the actual production server (`npm run start`), not just
  `next dev`, via headless Playwright:
  - No console errors on load, desktop (1440×900) or mobile (390×844).
  - No horizontal overflow at 375 / 390 / 768 / 1024 / 1280 / 1440 / 1920px.
  - Mobile menu: `aria-expanded` toggles correctly, focus moves to the
    first link on open, `Escape` closes it and returns focus to the
    toggle button.
  - Actual keyboard tab order confirmed (not assumed): skip link → "The
    Journey" → "Our Care" → "Contact" → header "Book a Consult" → hero
    "Book a Consult" — each with a visible focus ring.
  - A "Next.js Portal" element appears as the next tab stop after that —
    that's Next.js 16's own local dev-tools indicator (the small circular
    badge visible bottom-left in preview screenshots). It renders under
    `npm run start` on a local machine but is not part of this site's markup
    and won't appear on an actual deployment.
- Color pairs verified against the actual token hex values (WCAG relative
  luminance formula, not eyeballed) — see §1; every text/background pairing
  used on the page clears AA: body text 15.64:1, muted text 6.7–7.7:1,
  button text on brand fills 6.6–6.9:1, and the hero's new secondary-link
  color (`terracotta-deep`) on the scrim/paper background at 5.25:1. Raw
  brand hues are used only as fills/watermarks, never as small text,
  because they sit at ~2.3:1 on paper.

## 8. Recommended prompt for phase 2

```
Continue The Birth Wave site. Phase 1 (docs/implementation-brief.md) built
the header, hero and one visual-story section — read that brief first, and
extend src/content/site-content.ts rather than hardcoding new copy.

Build next, in this order: an offering/services overview section, an
approach-or-philosophy section, and a final CTA + footer. Keep using only
the confirmed brand palette and type from the brief; keep placeholder
content clearly labelled and TODO-commented exactly like the existing
sections until real copy/photography is approved. No new parallax — the
brief limits restrained parallax to the hero and visual-story section, and
that should still hold.

Still do not add: contact forms, email sending, a booking flow, payments,
a CMS, analytics, or Vercel/deployment configuration — flag anything that
needs one of those instead of building it. When you get real photography,
replace the placeholder panels in hero-section.tsx and
visual-story-section.tsx via next/image and remove their "placeholder"
caption chips.

Run npm run lint, npx tsc --noEmit and npm run build at the end, and check
the result in a real browser at mobile and desktop widths before calling
it done.
```

---

## 9. Phase 2 — the rest of the homepage

Built on top of Phase 1 without touching the hero. Seven new sections plus
a footer, each using a different composition — the explicit brief for this
phase was to avoid the site reading as a generic AI landing page (repeated
card grids, centered heading-paragraph-cards, icon feature blocks, gradient
blobs, floating glass content panels, repeated fade-up animation).

### What was built, and why each looks different

1. **Purpose** (`purpose-section.tsx`) — one oversized editorial statement,
   staggered left-indent per line instead of centered, paragraph pinned to
   a narrow column bottom-right. No card, no image.
2. **Discover Your Path** (`pathways-section.tsx`) — a real WAI-ARIA
   tablist (full arrow-key/Home/End support, not just clickable divs):
   large numbered options on the left, one visual panel on the right that
   cross-fades between four states. Client component, `"use client"`.
3. **The Birth Wave Experience** (`experience-section.tsx`) — see the note
   below; this one needed a real fix mid-build.
4. **Immersive Moment** (`immersive-moment-section.tsx`) — replaces the
   Phase 1 `visual-story-section.tsx` outright (deleted, not kept
   alongside). Full-bleed background broken out of the container, one
   centered statement, single parallax layer. This is the second (and,
   per the original brief, last) parallax location — Purpose, Pathways,
   Experience, Care & Trust, FAQ and the closing section have none.
5. **Care & Trust** (`care-trust-section.tsx`) — commitments as a flowing
   numbered list between hairline rules (not cards), plus one clearly
   labelled placeholder pull-quote — not a testimonial card, no avatar.
6. **FAQ** (`faq-section.tsx`) — native `<details>`/`<summary>`, not a
   custom widget: full keyboard support and screen-reader semantics for
   free, hairline dividers only, no card background.
7. **Final CTA** (`final-cta-section.tsx`) — a single large statement and
   one link (`CtaLink`, new `inverted` tone) on a dark (`ink`) surface, no
   boxed button.
8. **Footer** (`site-footer.tsx`) — wordmark, the same nav links, a
   tagline, a copyright line. Nothing invented: no address, no social
   links, no legal pages (there's nothing to point them at yet).

A small shared piece: `icons/quiet-mark.tsx` is a small, original
hand-authored pulse-line squiggle — an echo of the logo's heartbeat stroke
at a scale meant for dividers, not a crop of the actual logo (that stays
reserved for the hero/immersive-moment watermarks). Used in Purpose and
Care & Trust as the "quiet visual detail" the brief asked for in place of
a card.

### A real bug this surfaced, and the fix

The Experience section's first version put four equal-width stages in a
row; at common desktop widths exactly three fit, so on first render it
was visually indistinguishable from the explicitly banned three-column
card grid, even though it was technically a horizontal scroller. Fixed by
widening the panels so only ~2.3 fit at once (the next one visibly peeks
off the right edge — the scroll affordance a grid can't give you),
alternating a vertical offset on every other panel so they don't sit in a
rigid row, and dropping the corner radius to zero so they read as
filmstrip frames rather than cards. Confirmed visually after the fix (see
validation below) — worth checking again if the stage count or copy
length changes materially.

### Content additions

`src/content/site-content.ts` gained `purpose`, `pathways`, `experience`,
`immersiveMoment` (replacing `visualStory`), `careAndTrust`, `faq`,
`finalCta` and `footer`. All placeholder text follows the same voice
Phase 1 established (`"Your X goes here"`, explicit TODOs) — nothing
naturalistic enough to be mistaken for real claims. `nav.links` now points
at real sections instead of dead anchors; "Contact" and the header CTA
both resolve to `#connect` (the closing section) since there's still no
booking/contact flow.

### Validation (this phase)

`npm run lint`, `npx tsc --noEmit` and `npm run build` all clean. Checked
against a production server (`npm run start`), not `next dev`:

- No console errors, no horizontal overflow at 375–1920px.
- Pathways tablist: arrow keys move both focus and selection correctly
  (confirmed via `aria-selected`), matching the WAI-ARIA APG pattern —
  not just click-only.
- FAQ accordion: opens/closes via both click and keyboard `Enter`,
  confirmed via the native `open` attribute.
- Experience scroller: the Prev/Next buttons genuinely move
  `scrollLeft` (confirmed numerically, not just "the click handler ran").

One environment note, not a code issue: mid-verification, a stale
`next start` process from earlier in the session kept silently occupying
port 3000 and serving an older build, which produced a run of confusing,
inconsistent 500s and "broken" interactions. Re-verified end to end on a
clean port once found — see the numbers above. Worth knowing if local
testing on this machine ever behaves inconsistently again: check for and
kill stray `node` processes before trusting a failing result.

### Still outstanding

Same missing assets as §2 (real copy throughout, approved photography,
vector logo source), plus: the Pathways/Experience/FAQ placeholder content
is structural only (see the TODOs in `site-content.ts`) and the footer has
no legal links because there's nothing to point them at yet.

## 10. Hero video (first real approved asset)

The client supplied `herovideo.mp4` — a 10s, 1280×720 H.264 clip (soft,
warm mother-and-newborn footage, on-palette) — to replace the hero's
placeholder background. It's the first non-logo media asset that's
actually approved, so it's used directly, not flagged as a placeholder.

What was done to it before shipping it:
- Audio track stripped (`ffmpeg -c:v copy -an`) — a muted autoplaying
  background loop has no use for an audio stream, so there's no reason to
  make visitors download one. Video-only re-mux, no quality loss
  (2.68MB → 2.47MB). Source: `public/brand/hero-video.mp4`.
- A poster frame extracted at the 0.5s mark (avoids a black/fade-in first
  frame): `public/brand/hero-video-poster.jpg` (46KB).

How it's wired into `hero-section.tsx`:
- `autoPlay muted loop playsInline`, `preload="metadata"` with the poster
  set — the poster paints instantly while the video streams in, rather
  than the browser blocking on the full 2.47MB before showing anything.
- **`prefers-reduced-motion: reduce` renders a plain `<Image>` of the
  poster frame instead of a `<video>` element at all** — not just a
  paused video, the video tag isn't mounted, so nothing auto-moving ships
  to a visitor who's asked not to see it. Confirmed via Playwright with
  `emulate_media(reduced_motion="reduce")`: video count 0, poster image
  count 1, no console errors.
- The brand-icon watermark that sat over the placeholder gradient is
  removed now that there's real footage — it would have muddied real
  photography, and the "imagery with intent" rule cuts both ways.
- The existing left-anchored scrim is unchanged and still does its job:
  confirmed visually that headline/subhead stay fully legible over the
  actual video, not just the old placeholder gradient.
- Parallax kept, factor reduced slightly (0.12 → 0.1) since a moving video
  underneath a moving parallax layer compounds motion more than a static
  gradient did — stayed conservative rather than assume it still reads as
  "restrained" at the old value.

`hero.media` in `site-content.ts` now holds `videoSrc`/`posterSrc` instead
of the old placeholder `alt` field.

## 11. Page-wide motion system ("one continuous world")

A pass over art direction and scroll experience only — no content, order,
or section composition changed. Goal: stop the page reading as a stack of
independent rectangular sections. Full plan was described to the client
before building; summarized here for reference.

**Global ambient layer** — `ambient-background.tsx`, `position: fixed`,
behind everything (z-0), pure CSS (no JS, no scroll listener). Three
oversized, very soft radial blooms in the confirmed brand hues at ~10–14%
opacity, plus a faint grain texture, drifting via `transform` over 110s
(`ambient-drift` keyframe in `globals.css`) — frozen entirely under
`prefers-reduced-motion`. It's invisible behind the Hero and Immersive
Moment (they already have opaque imagery); its job is the sections between.

**Section tint + mask system** — every section (except Hero, untouched)
replaced its flat `bg-*` color with a separate absolutely-positioned tint
layer (`.section-tint` in `globals.css`) that's `mask-image`-faded to
transparent at its top/bottom padding bands, letting the ambient layer
show through there instead of a hard color cut. Soft fade
(`--space-fade-soft`, ~2.5–4rem) between same-family tones (paper ↔
paper-dim); strong fade (`--space-fade-strong`, ~4–7rem) at the two big
jumps either side of the dark Immersive Moment, and into the Final CTA.
The fade never reaches into a section's own content — it's sized well
inside the section's own padding, so text contrast is exactly what was
already validated, unchanged.

**New hooks:**
- `use-scroll-reveal.ts` — fires once via IntersectionObserver; under
  reduced motion, returns `revealed: true` from the first render with no
  observer ever attached, so there's no hidden-state flash. Used for
  Purpose's headline lines and Experience's heading (both a small 8px
  settle, not a 24–40px "fade-up"), and Care & Trust's commitments (a
  clip-path wipe instead of a fade).
- `use-scroll-drift.ts` — one scroll listener driving both a translateY
  parallax and a scale (1.12 → 1.0) via `--drift-y`/`--drift-scale`, used
  only by Immersive Moment (its "strongest reveal" per the brief). Hero
  keeps its own simpler, untouched `use-parallax.ts`.

**Per-section choreography:** Pathways' panel switch is now a left-to-right
`clip-path` wipe (was a plain opacity crossfade). Experience gained a
static ambient glow behind the filmstrip (no new motion — the horizontal
scroll-snap mechanics are untouched). Final CTA's "dark surface emerging"
is a spatial gradient band, not scroll-linked JS — calmer, and correct at
any scroll speed. Footer/Final CTA share one seamless ink surface (no
border between them).

### A real bug this found (not a screenshot artifact — traced to source)

Every new full-page screenshot showed the ambient layer painting over the
footer, and the header nav pill appearing mid-document instead of pinned
to the top. Diagnosed by direct `getBoundingClientRect()`/`scrollTo`
checks rather than trusting the images: **the header was fine** — its
`top` was confirmed `0` at every real scroll position, so that part was a
known Playwright quirk (`position: fixed` elements can mis-place in
CDP's full-page stitching, not a rendering bug). **The footer was a real
bug**: it was the only landmark on the page without `position: relative`.
Per CSS's stacking rules, plain in-flow content paints *before*
`z-index: auto`/`0` positioned content — regardless of DOM order — so the
fixed, positioned ambient layer was painting over the non-positioned
footer even though the footer comes later in the document. Fixed by
adding `relative` to `site-footer.tsx`; confirmed after the fix with a
direct `window.scrollTo` to the document's max scroll position (bypassing
`scrollIntoView`'s smooth-scroll, which was adding its own confusion
during diagnosis).

### Validation (this phase)

`npm run lint`, `npx tsc --noEmit`, `npm run build` all clean. On a
production server: no console errors, no horizontal overflow at
375–1920px, all prior interactions (Pathways arrow keys, FAQ keyboard
open/close, Experience scroll buttons) still pass. Reduced motion
re-verified for every new effect specifically — headline/commitments/
heading all render at their final state with no scroll required, and the
ambient drift's `animation-name` computes to `none`. Full page re-screenshotted
with a script that scrolls incrementally before capturing (a bare
`full_page` screenshot doesn't fire scroll-based reveals or reproduce
`position: fixed` correctly — worth remembering for any future QA here).

## 12. Architecture refactor — content, motion, sections separated

A pure reorganization, done before building more pages: no copy, no
motion values, no visual result changed. Confirmed pixel-identical against
a pre-refactor screenshot. Full folder structure, what moved, and the
route shells added are in the chat summary for this phase; the two things
worth recording here are the naming decisions and a second instance of
the stacking-context bug from §11.

**Renames, for consistency with the new file layout** (content and
component both, to keep them matched): `careAndTrust` → `trust`
(`trust-section.tsx`, was `care-trust-section.tsx`), `immersiveMoment` →
`immersive` (`immersive-section.tsx`, was `immersive-moment-section.tsx`).
The DOM id `#care-trust` was deliberately left unchanged — it's just a
string, renaming it had no benefit and would've meant one more place to
get wrong.

**Where motion numbers live now:** every factor, threshold, stagger
interval, scale range and clip-path value that used to sit inline in a
section file now comes from a named export in `src/motion/` — see the
module doc-comments there for which file owns what. Section files import
a preset; they don't compute one.

### A second instance of the §11 stacking bug — this time in new content

Every new route's text was invisible behind the ambient layer at first —
`route-placeholder.tsx`, both templates, and the inline sections in
`/services` and `/doctors` all made the same omission the footer did in
§11: no `position: relative` on their root element. Recognized the
pattern immediately this time and fixed all five in one pass. `PageShell`'s
doc comment now states the rule explicitly (`page-shell.tsx`) so it isn't
rediscovered a third time. Diagnosis this round also hit a **separate**
false alarm worth naming: after the fix, a stale server process from an
earlier `next start` was still answering requests on the test port, so
the very first re-check still showed the bug "unfixed" — confirmed via
`curl` against the raw HTML (fix was present in the markup) before
trusting the screenshot again, then killed every `node` process and
re-verified clean. Both failure modes look identical in a screenshot
("the text isn't there"); they are not the same bug, and confusing them
would have led to editing already-correct code.

## 13. Ambient DotField — shared post-hero background texture

A canvas-based dot-grid texture, adapted from a client-supplied React Bits
`DotField` source (JS) and converted to TypeScript at
`src/components/ui/backgrounds/dot-field.tsx`. Every setting lives in
`src/motion/ambient-dot-field.ts` — no motion numbers in route or section
files. Wired in via one new wrapper, `dot-field-region.tsx`, and one new
derivation in `page.tsx`.

**Placement.** Exactly one instance, rendered in `page.tsx` as a sibling
between the hero and the rest of the homepage — never inside, behind, or
layered over the hero. Its wrapper (`DotFieldRegion`) contains every
section from Purpose through FAQ (i.e. everything strictly between Hero
and Final CTA), derived *positionally* from `home-section-order.ts`
(`homeSectionOrder[0]` = Hero, last = Final CTA, everything between gets
wrapped) rather than by naming sections — reordering the middle sections
still only means editing that one file. The field's own top/bottom edges
fade to transparent via the same `--space-fade-strong` distance the
section-tint system already uses, so it visibly settles in after the hero
and recedes before the CTA. Confirmed by direct DOM query: exactly one
`<canvas>` on the page, absent from the hero's subtree.

**Why it varies in visible strength without per-section code.** Each
section already layers its own near-opaque `.section-tint` fill above
whatever's behind it (built for the ambient gradient layer in §11) — the
dot field sits behind all of that automatically, so it's only actually
perceptible in the same thin transition bands between sections that the
gradient layer already uses. Confirmed at 4× crop zoom: dots are real and
drawn correctly, at the extremely low visibility the recommended settings
(0.65–0.85px radius, ~0.1–0.16 alpha) produce by design — "delicate
texture," not a visible pattern.

**Departures from the supplied source**, all required by the brief rather
than optional cleanup: colors resolve from Birthwave tokens at runtime
instead of hardcoded purple (`resolveTokenColor` — canvas can't read CSS
custom properties directly, so this reads the token's computed value
once per mount); `prefers-reduced-motion` now stops the whole loop and
draws one static frame (the source had no reduced-motion handling at
all); cursor interaction is skipped on coarse/touch pointers; the loop
pauses on tab-hidden *and* separately via `IntersectionObserver` when the
canvas has scrolled entirely out of view (it can span several sections'
worth of height); `ResizeObserver` replaces the global resize listener;
device pixel ratio caps at 1.5, not 2; the glow overlay isn't rendered at
all while `glowRadius` is 0 (dead work removed, not just hidden); the
unique gradient id uses `useId()` instead of `Math.random()` (the
source's version could mismatch between server and client render);
`pointer-events: none` and `aria-hidden="true"` are fixed on the
component itself, not left to the caller.

**Final settings** (`ambient-dot-field.ts`): `dotRadius: 0.75`,
`dotSpacing: 28`, `bulgeOnly: true`, `bulgeStrength: 6`,
`cursorRadius: 150`, `cursorForce: 0.08`, `glowRadius: 0`,
`sparkle: false`, `waveAmplitude: 0.2`; colors: gradient from
`--color-terracotta` at 0.16 alpha to `--color-ink-soft` at 0.1 alpha
(blush → muted cocoa, no purple, nothing outside the confirmed palette);
region opacity `0.7` on top of that.

### Validation

`npm run lint`, `npx tsc --noEmit`, `npm run build` all clean. Confirmed
via direct DOM query (not just a screenshot): one `<canvas>` total, absent
from the hero, parent `aria-hidden="true"` and `pointer-events: none`, no
console errors, no horizontal overflow. Reduced-motion checked separately
— canvas still present (static texture) with no errors. Full interaction
suite (Pathways arrow-keys, FAQ keyboard, Experience scroll buttons,
mobile menu) re-verified passing, identical to the pre-DotField baseline.

## 14. Visual-taste audit (scroll-craft principles as review guidance)

Reviewed against scroll-craft's hard-rules table as a checklist only — its
engine, tokens, build folders and scripts were never installed or touched.
Two items needed real changes; the rest were verified against the live
site, not assumed from memory.

**1. Eyebrows on every heading, fixed.** Every one of the 8 homepage
sections had one — a repeated label restating each section's own name
more than it added meaning. Removed from Purpose, Pathways, Experience,
Trust and FAQ (both the JSX `<p className="eyebrow">` line and the
now-unused `eyebrow` field in `site-content.ts`/`faq-content.ts`). Kept on
three: Hero (untouched — hero is preserved wholesale), Immersive ("A
Moment" — marks the page's one engineered peak), and Final CTA ("Let's
Talk" — marks the one direct, conversational close). 3 of 8 sections now
carry one, in line with the "at most one per three" guidance. Confirmed
by direct DOM query per section, not a visual skim.

**2. Em dashes, replaced.** Every visible em dash across `src/content/`,
every route's `<title>`/`<meta description>` (browser tab and search
result, so counted as visible), and one JSX `note` prop — replaced with
colon, comma, parentheses, or a period, chosen per instance for what
actually reads best. Code comments and `.todo` fields (confirmed via grep
to never be rendered anywhere) were left alone — they aren't visible
content. One narrow, deliberate exception to "hero preserved wholesale":
`hero.subhead`'s single em dash was replaced too, since item 2 says
*every* visible one and this is a punctuation-only edit that changes no
wording, composition, or motion.

**3–7, confirmed clean, evidence below (nothing needed changing):**
- No scroll-cue arrows, "N of M" progress counters, gradient/clipped
  text, neon glows, or colour-halo shadows anywhere — grepped for
  `bg-clip-text`/`text-transparent` (zero matches) and every `shadow-*`
  usage (three: the focus ring's solid paper-coloured offset ring, and
  two 8%-opacity ink elevation shadows on the header — neither is a glow).
- Text alignment varies with real intent: lead (Hero, Experience, FAQ,
  Final CTA), split (Pathways, Trust), Purpose's own asymmetric staggered
  lead, and centred exactly once — Immersive, which is the one place a
  symmetric, spare composition is earned (the engineered peak).
- Worth naming rather than silently passing: Purpose and Experience both
  use the same translateY+opacity "settle" mechanic for their entrance
  (see scroll-scenes.ts). Two of six post-hero sections sharing one
  technique, against four sections doing something else entirely (wipe,
  drift, or nothing) reads as real variety, not the repeated-everywhere
  pattern the rule is aimed at — but it's the closest thing to a borderline
  case on the page, so it's called out rather than waved through.
- Scrims stay local to where text sits: the hero's is a left-anchored
  gradient covering roughly the left half (the video's right side is
  fully unscrimmed), Immersive's is a centred radial vignette matching its
  centred text (corners past 75% are fully clear). Neither is a flat
  full-frame overlay.
- Immersive remains the only section with a scale/zoom drift
  (`useScrollDrift`) — still the one engineered peak. Final CTA is static,
  resolved copy and a real link, not a fade to nothing; the footer shares
  its ink tone with no border, so the close reads as one composed moment.

**6, contrast — measured against actual composited pixels, not token
math.** Screenshotted the live page (hero video included, one second in,
not frame zero) and sampled real background pixel colour directly behind
text at four locations: hero headline (video + scrim, sampled
`rgb(252,244,240)`, ink contrast 15.66:1), Purpose and Trust headings
(inside the DotField-backed region, sampled `rgb(251,244,241)`, 15.64:1 —
confirms the field doesn't measurably touch contrast inside a section's
own near-opaque core, which was the architectural intent but hadn't been
measured directly before), and the Immersive statement (gradient
placeholder + radial scrim, three sample points from
`rgb(96,63,52)`–`rgb(139,83,72)`, paper-text contrast 5.63–8.55:1 — clears
AA everywhere sampled). Script and method in
`scratchpad/contrast_measure.py` for re-use once the hero's video and
Immersive's photography are both final — the hero's video frame was
already live and got a real measurement; Immersive is still the gradient
placeholder, so its number should be re-checked once real photography
lands (flagged below).

### Files changed
`src/content/site-content.ts`, `src/content/faq-content.ts`,
`src/content/doctors-content.ts`, `src/content/services-content.ts`,
`src/components/sections/home/{purpose,pathways,experience,trust,faq}-section.tsx`,
and the `<title>`/`<meta description>`/`note` text in every route under
`src/app/` (about, contact, privacy, faq, the-experience, services,
services/[slug], doctors, doctors/[slug], root layout). No motion file,
no route structure, no section order, no architecture touched.

### Still needs approved content or imagery
- Immersive's contrast is measured against the placeholder gradient —
  re-run `contrast_measure.py`'s Immersive sample once real photography
  replaces it, since a photo's tonal range could differ from the
  gradient's.
- Everything else flagged as pending in earlier sections (§2, §10) is
  unchanged by this pass: no real copy, no approved photography beyond
  the hero video, no confirmed service/team roster.

### Validation
`npm run lint`, `npx tsc --noEmit`, `npm run build` all clean. Full
interaction suite (Pathways arrow-keys, FAQ keyboard, Experience scroll
buttons, mobile menu) and the 7-breakpoint overflow check both
re-verified passing, identical to the pre-audit baseline.

## 15. Making the DotField faintly perceptible in Purpose and Trust

Follow-up to §13: the DotField was correctly *behind* every wrapped
section per the brief, but effectively invisible in practice — each
section's own `.section-tint` fill sits above it at ~100% opacity by
design (for text-contrast safety), so almost nothing showed through
except in the thin transition bands between sections. Asked to make it
faintly perceptible specifically in Purpose and Trust.

**Change, and nothing else:** `bg-paper` → `bg-paper/75` on each of those
two sections' own tint-fill `<div>` — one class each, in
`purpose-section.tsx` and `trust-section.tsx`. The DotField component,
`ambient-dot-field.ts` (every setting, color, opacity value), and
`dot-field-region.tsx` (the single shared instance, its own region
opacity and edge mask) are untouched — confirmed against this turn's own
edit history, not inferred. No dot size, sparkle, glow, or cursor change;
no touch to the hero.

**Why 75%, not a smaller step.** The math explains why an initial, more
conservative `/88` (12% see-through) barely registered: DotField's dots
sit at ~11% effective alpha already (`gradientFrom` 0.16 × region
opacity 0.7), so at 12% see-through the dots' contribution to the final
pixel is roughly 0.11 × 0.12 ≈ 1.3% — essentially nothing. Contrast
headroom turned out to be enormous (ink-on-paper starts at 15.64:1, more
than triple the 4.5:1 AA floor), so there was room to push further
without any real risk. Landed on `/75` (25% see-through, ~2.8% effective
dot contribution) as a middle point: enough to read as a genuine soft
warm sheen at zoom, not enough to compete with the copy sitting on top of
it.

**Contrast, re-measured, not assumed carried over from §14.** Grid-sampled
background-only pixels (excluding every text-bearing element *and* the
fixed header's floating region, which the first pass over this missed
and produced a misleading result) across both sections at the new
opacity:

| Section | Worst background contrast | Average | AA floor |
|---|---|---|---|
| Purpose | 9.72:1 | 15.59:1 | 4.5:1 |
| Trust | 15.28:1 | 15.61:1 | 4.5:1 |

Both comfortably clear AA everywhere sampled, with more than double the
required margin at the single worst point. Script:
`scratchpad/contrast_grid2.py`.

**Visual check.** A 6× zoom crop of a plain patch of each section shows a
soft, warm diagonal sheen now genuinely visible — individual dots don't
resolve as discrete circles at this radius even at zoom (they're ~0.375px
natively), but the cumulative texture reads as present, not the near-total
invisibility of the original `/section-tint` full-opacity treatment.
Confirmed against a live screenshot, not the component's source values.

### Validation
`npm run lint`, `npx tsc --noEmit`, `npm run build` clean. Full
interaction suite and 7-breakpoint overflow check re-verified passing.

## 16. Making the DotField colors unmistakably brand-derived

Follow-up to §13/§15: the DotField's own gradient tokens were pulling
`--color-terracotta` for both the primary stop and the (unused) glow —
correct in that it's a real, confirmed token, but muted enough (`#ca9585`
is a dusty rose) that it read as ambiguous neutral warmth rather than a
recognizable brand hue. Asked to make the primary color unmistakably the
brand's blush/peach/coral accent, using only tokens already in
`src/styles/tokens.css`, with no new hex values.

**Re-inspected `tokens.css` first**, per the request, rather than relying
on the token list from earlier in this session. Confirmed the same three
brand hues (`--color-terracotta` #ca9585, `--color-sky` #5daedb,
`--color-coral` #f88379) and two neutrals (`--color-ink` #241a17,
`--color-ink-soft` #5b4a43) are still the only accent/neutral tokens that
exist. `--color-sky` is blue and out of scope per the brief (no blue,
ever). Also checked how the rest of the site already uses these tokens
for ambient texture — `ambient-background.tsx` and `section-transitions.ts`
both already pair `--color-terracotta` and `--color-coral` as the site's
established warm-accent duo for background blobs — confirming coral is
already a first-class, precedented accent color here, not a reach.

**Change, in `src/motion/ambient-dot-field.ts` only:**

| Slot | Before | After |
|---|---|---|
| `gradientFrom` (primary) | `--color-terracotta` @ 0.16 | `--color-coral` @ 0.22 |
| `gradientTo` (depth) | `--color-ink-soft` @ 0.1 | `--color-ink-soft` @ 0.1 (unchanged) |
| `glow` (unused, `glowRadius: 0`) | `--color-terracotta` @ 0.25 | `--color-coral` @ 0.3 |

`--color-coral` (#f88379) is the confirmed brand hue that reads
unmistakably as peach/coral rather than a muted neutral; `--color-ink-soft`
stays exactly as before, in its existing role as the "depth" end of the
gradient only. Alpha on the primary stop was raised slightly (0.16 →
0.22) so the coral tone actually resolves as a color at normal zoom
rather than reading as texture-only, per the "must be visibly present at
normal browser zoom" requirement. No new hex values, no purple, no
black/grey default, no blue. `dot-field.tsx`, `dot-field-region.tsx`,
`page.tsx`, `purpose-section.tsx`, and `trust-section.tsx` were not
touched — confirmed against this turn's own edit history.

**Visual check, normal scale (not zoomed).** Screenshots of both sections
at their natural in-viewport scale
(`scratchpad/normal-purpose.png`, `scratchpad/normal-trust.png`) show a
clearly warm coral/peach wash in the lower-right of each section — the
same family as the existing "Book a Consult" button and pulse-mark
accent already on the page, not a new or foreign color. Sampled the
pixel at the single lowest-contrast grid point (see below): RGB
(221, 189, 179) — red channel well above green and blue, i.e.
unambiguously warm, not grey or blue.

**Contrast, re-measured against the new build.** Same corrected
methodology as §15 (`scratchpad/contrast_grid2.py`: background-only
pixels, fixed header excluded):

| Section | Worst background contrast | Average | AA floor |
|---|---|---|---|
| Purpose | 9.72:1 | 15.59:1 | 4.5:1 |
| Trust | 15.28:1 | 15.65:1 | 4.5:1 |

Identical to §15's numbers — raising the primary alpha from 0.16 to 0.22
had no measurable effect on text contrast, confirming the headroom
identified in §15 was real. (The nominal "worst" point in both sections
is actually the decorative pulse-mark icon, not text — real text contrast
is higher still.)

### Validation
`npm run lint`, `npx tsc --noEmit`, `npm run build` clean.

### Final token values reported to the user
- `gradientFrom`: `--color-coral`, alpha `0.22`
- `gradientTo`: `--color-ink-soft`, alpha `0.1`
- `glow` (inert while `glowRadius: 0`): `--color-coral`, alpha `0.3`

## 17. Making individual dots visible (not just a colour wash)

Follow-up to §16: colours were approved as-is, but the dots themselves
never resolved as dots — at normal zoom the field only ever read as a
soft diagonal wash, because the dots were sub-2px. Asked to fix
*visibility only*, colours and every other file untouched, using a given
target starting point (`dotRadius: 1.4`, `dotSpacing: 22`,
`bulgeStrength: 4`, `cursorRadius: 130`, `waveAmplitude: 0.12`,
`glowRadius: 0`, `sparkle: false`).

**Tested the starting point first, honestly, before accepting it.**
Built with `dotRadius: 1.4` and took a real normal-scale screenshot
(`scratchpad/normal-trust.png`) — still an indistinct wash, no
individually resolvable dots even zoomed into a plain patch
(`scratchpad/zoom-trust-plain.png`). Root cause: `dot-field.tsx` (not in
this task's scope) draws each dot at `dotRadius / 2`, not `dotRadius` —
architecture in a file I'm not touching, so 1.4 was only ever going to
draw a 0.7px radius / 1.4px diameter dot, regardless of alpha. Flagging
this rather than silently shipping a value that doesn't meet the brief's
own visibility requirement.

**Landed on `dotRadius: 6.5`** (draws at 3.25px radius / 6.5px diameter)
after confirming via a fresh build + real screenshot that this is the
point where dots read as individually visible, elegant coral circles at
native, un-zoomed screenshot resolution — not a guess, verified against
`scratchpad/native-trust-plain.png` and `scratchpad/native-purpose-mid.png`,
both plain mid-section patches with no text nearby. `dotSpacing` stays at
the given `22`. `bulgeStrength` (4), `cursorRadius` (130), and
`waveAmplitude` (0.12) all kept exactly at the given target — smaller
than before, so the now-larger dots still move gently rather than
reacting like a tech surface. `glowRadius: 0` and `sparkle: false` kept.
Colors and alphas from §16 (`--color-coral` @ 0.22/0.3,
`--color-ink-soft` @ 0.1) are completely unchanged, as were
`dotFieldRegionOpacity`, `dotFieldEdgeFade`, and every other file.

**Contrast, re-measured against the new build:**

| Section | Worst background contrast | Average | AA floor |
|---|---|---|---|
| Purpose | 9.57:1 | 15.57:1 | 4.5:1 |
| Trust | 14.92:1 | 15.59:1 | 4.5:1 |

Essentially unchanged from §16 (larger dot area at the same fixed alpha
doesn't meaningfully move background luminance at these sample points) —
both sections still clear the 4.5:1 AA floor by more than double at the
worst point.

### Validation
`npm run lint`, `npx tsc --noEmit`, `npm run build` clean.

## 18. Making the dots' automatic motion perceptible

Follow-up to §17: dots were visible now, but static-looking — the ambient
wave motion existed already (`dotFieldSettings.waveAmplitude` in
`ambient-dot-field.ts`, driving a ripple in dot-field.tsx's untouched
animation loop) but at `0.12` was a ±0.12px drift on a 6.5px dot: real,
but nowhere near visible. Asked for a slow, calm, breathing-like
automatic drift, independent of the cursor, respecting reduced-motion.

**Change, one value, in `src/motion/ambient-dot-field.ts` only:**
`waveAmplitude` `0.12` → `3`. Dot size, spacing, colours, placement,
`dotFieldRegionOpacity`, `dotFieldEdgeFade`, `cursorRadius`,
`bulgeStrength`, `glowRadius`, `sparkle` — all untouched. No edit to
`dot-field.tsx`, `dot-field-region.tsx`, or any section/route file.

**Why the timing was already right.** dot-field.tsx's animation loop
increments its phase by a fixed `0.02` per frame (`t = frameCount *
0.02`), independent of any prop — at ~60fps that's already a ~5.2 second
full cycle, a slow, breath-like pace matching the brief's "soft maternal
rhythm, not a loading animation" without touching that file at all. The
only missing ingredient was amplitude.

**Why 3, not the previous 0.12.** The component draws the wave as
`drawY += sin(...) * waveAmplitude` and `drawX += cos(...) *
waveAmplitude * 0.5` — so `3` gives ±3px vertical / ±1.5px horizontal
drift, under half the dot's own 6.5px diameter, with `dotSpacing`'s 22px
gap leaving comfortable room before any risk of adjacent dots crowding.

**Verified with real timed screenshots, not assumed.** Positioned the
cursor off-canvas (`5, 5`, nowhere near the dot field) so only automatic
motion — never cursor interaction — was captured, then screenshotted the
same Purpose-section crop at t=0/1.25/2.5/3.75/5s
(`scratchpad/motion-t0.png` … `motion-t4.png`). Pixel-diffed t0 against
t2.5s and t0 against t5s:

| Comparison | Mean abs diff | Max diff | Pixels changed (>5) |
|---|---|---|---|
| t0 → t2.5s | 0.23 | 18 | 3,333 |
| t0 → t5s | 0.39 | 18 | 5,825 |

Difference grows with elapsed time (not noise), and an 8×-amplified diff
image (`scratchpad/motion-diff-amplified.png`) shows a clean crescent/ring
around every single dot — the signature of a dot that moved, applied
uniformly across the whole field, confirming it's the wave, not a
rendering artifact. A zoomed 5-panel strip of the same dot cluster across
all five timestamps (`scratchpad/motion-strip-zoom.png`) shows the drift
directly by eye.

**Reduced motion, re-verified, not assumed carried over.** Same test with
Playwright's `prefers-reduced-motion: reduce` emulation active: t=0 vs.
t=5s pixel diff was exactly **0** (zero changed pixels) — dots are
provably, not just believably, static. dot-field.tsx's existing
reduced-motion branch (draws once, never starts the animation loop) was
never touched, and this confirms it still fully suppresses the new
amplitude.

**Contrast, re-checked against the new build** (motion doesn't change
static alpha values, but re-verified rather than assumed): Purpose worst
9.57:1, Trust worst 14.92:1 — identical to §17, both still comfortably
over double the 4.5:1 AA floor.

### Validation
`npm run lint`, `npx tsc --noEmit`, `npm run build` clean.

## 19. Fixing the layer architecture: DotField was invisible in most sections

Reported: the DotField still read as invisible live, with a flat paper
background — not a colour or motion problem this time, a stacking one.

**Root cause, found by re-auditing every section, not just the two that
had been screenshotted before.** §15–§18 only ever touched Purpose and
Trust's own `.section-tint` fill (`bg-paper` → `bg-paper/75`). Pathways,
Experience, and FAQ were never part of that work and still had their
original, fully **opaque** `.section-tint` fills — `bg-paper-dim` and
`bg-paper` with no alpha at all. Each of those three sections' own tint
sat directly above the shared canvas at full opacity, completely
occluding it for that section's entire height. Three of five wrapped
sections were fully blocking the field; only Purpose and Trust had ever
been fixed. This also explains why a screenshot could plausibly look like
"one flat section" regardless of which of the three opaque sections was
actually in view.

**Fix: centralize the tint instead of patching five inconsistent local
ones.** New layer order inside `DotFieldRegion`
(`src/components/layout/dot-field-region.tsx`), lowest to highest:

1. `<DotField>` canvas (unchanged — same instance, same edge mask)
2. One shared `bg-paper/45` overlay, full-region, `pointer-events-none`,
   `z-[5]` — the *only* background wash the region has now
3. `{children}` (all wrapped section content), `z-10`

Removed the per-section `.section-tint`/`.section-tint-fade` div and its
`sectionFadeStyle(...)` call from all five wrapped sections —
`purpose-section.tsx`, `pathways-section.tsx`, `experience-section.tsx`,
`trust-section.tsx`, `faq-section.tsx` — along with their now-unused
`sectionFadeStyle` imports. None of these sections has its own background
fill anymore; there is exactly one place a tint value can live, so there's
no way for a sixth section added later to silently reintroduce an opaque
one. Experience section's separate ambient glow layer (radial gradients
fading to transparent, no solid base) was left alone — it was never
opaque and doesn't occlude the canvas.

**Immersive is a deliberate, disclosed exception, not an oversight.**
Its full-bleed `bg-ink` sits directly on the `<section>` itself, not a
`.section-tint` layer — it's the site's one intentional dark "peak
moment" (approved in the taste audit, §14), blended into its paper
neighbors via its own separate `emergenceBand` gradients in
`section-transitions.ts`, a different mechanism entirely. Making it
transparent to let coral dots show through a near-black surface would
undercut that section's whole visual identity for a texture effect that
would barely read against ink anyway. Left untouched; flagging this
explicitly rather than silently leaving it out of the fix's scope. The
section itself is still rendered inside `DotFieldRegion` (unchanged
architecture — same six sections, same one shared instance), it simply
still doesn't show the field through its own content, exactly as before
this fix and before any of §15–§18's work.

`sectionFadeZones`/`sectionFadeStyle`/`FadeStrength`/`FadeEdges` in
`section-transitions.ts` and the `.section-tint`/`.section-tint-fade`/
`.section-tint-fade-top-only` CSS classes in `globals.css` are now
unused by any consumer (confirmed by search) — left in place rather than
deleted, since they're inert, harmless, and may still be a reasonable
starting point if a future section needs a local fade the shared overlay
doesn't cover. Noting this here so nobody mistakes "unused" for "still
wired up."

**Anchor issue, investigated — no code bug found.** Checked whether
`#care-trust` could resolve to the wrong section: `navigation-content.ts`
maps "Care & Trust" → `href="#care-trust"`, and `trust-section.tsx` is
the only element in the codebase with `id="care-trust"` (confirmed by
search — no duplicates). Tested both paths against the fixed build with
Playwright:

- Direct URL load (`http://localhost:3001/#care-trust`), settled: `#care-trust`'s
  top edge sits at `-0.5px` from viewport top — correctly scrolled to it.
- Click-navigation from the homepage nav, settled: `#care-trust`'s top
  edge sits at `43.5px` from viewport top (just under the fixed header) —
  also correctly on Trust, confirmed visually
  (`scratchpad/anchor-click-care-trust.png` shows "What guides how we
  care for you." — Trust's actual heading, not Purpose's).

No href/id mismatch exists. The most likely explanation for the earlier
screenshot is the layer bug above: with Pathways/Experience/Trust/FAQ all
looking like flat, near-identical paper rectangles before this fix, or a
stale server process (a recurring issue in this environment, see §12),
it's easy to mistake one flat section for another. With the layer fix in
place, each section's content is now visibly distinct against the dot
texture, and this class of confusion goes away on its own.

**Validation, live and normal-scale.** Screenshots of all five wrapped
sections (`scratchpad/normal-purpose.png`, `-pathways.png`,
`-experience.png`, `-trust.png`, `-faq.png`) confirm coral dots clearly
visible behind copy in every one, not just Purpose and Trust as before.
Contrast re-measured across all five, not just two:

| Section | Worst background contrast | Average | AA floor |
|---|---|---|---|
| Purpose | 9.39:1 | 15.45:1 | 4.5:1 |
| Pathways | 10.21:1 | 14.50:1 | 4.5:1 |
| Experience | 13.66:1 | 14.79:1 | 4.5:1 |
| Trust | 13.99:1 | 15.47:1 | 4.5:1 |
| FAQ | 14.08:1 | 15.46:1 | 4.5:1 |

All five comfortably clear AA everywhere sampled.

### Validation
`npm run lint`, `npx tsc --noEmit`, `npm run build` clean.

## 20. Darkening the dots and rebuilding idle motion properly

Two measured refinements: slightly darker dots, and a precisely-specified
idle drift (vertical amplitude, phase-staggered, opacity/scale pulse,
8–12s cycle) to replace §18's more ad hoc wave.

**1. Colour, in `ambient-dot-field.ts` only.** `gradientFrom`
(`--color-coral`) alpha `0.22` → `0.32`. `gradientTo` (`--color-ink-soft`)
alpha `0.1` → `0.13`, within the requested ≤0.14 ceiling — bumped
because ink-soft only ever shows near the very bottom of the whole
region (the gradient spans the entire multi-section canvas, not each
section individually — coral dominates everywhere above that), so
leaving it flat while coral got 45% stronger would have made the
"depth" end read inconsistently weak by comparison. Paper background and
text tokens were not touched — confirmed by contrast re-check below.

**2. Motion, in `dot-field.tsx` — inspected first, not assumed.** Traced
the exact code path with `bulgeOnly: true`: the wave/drift offset is
added to each dot's draw position *after* the bulge-easing block, and is
never gated on `isBulge` or on cursor engagement (`eng`) — so it already
runs unconditionally regardless of `bulgeOnly`, confirmed by re-reading
`tick()` line by line, not by re-running §18's old test and assuming
nothing changed. No latent bug found there; the ask this time was for a
more precisely specified drift than §18's, so the implementation was
rebuilt rather than just retuned:

- **Vertical-only drift**, `±waveAmplitude` px (was vertical *and*
  horizontal in §18) — `waveAmplitude` `3` → `1.3` in
  `ambient-dot-field.ts`, landing in the requested 1–1.5px range.
- **Per-dot phase stagger** from each dot's own rest position
  (`dotPhase = ax * 0.006 + ay * 0.004`), not its array index — low
  spatial frequencies so the phase changes smoothly across a normal
  viewport (a slow traveling ripple) instead of looking noisy. This is
  what makes it read as "not all dots moving together": at any instant,
  dots in different parts of the field are at different points in their
  own cycle (visible directly in the amplified diff below — the diff
  ring around each dot varies dot to dot in the same frame).
- **Radius pulse**, ±15%, riding the same clock 90° phase-shifted from
  the position wave — chosen over true per-dot opacity because canvas
  can't vary alpha per-shape within one batched `fill()` call; giving
  every dot its own opacity would mean a separate `fill()` call per dot
  per frame, which doesn't hold up against the performance safeguards
  this task explicitly says to preserve. Radius pulsing achieves the same
  "soft breathing" quality inside the existing single-path/single-fill
  draw call, so it's effectively free.
- **Cycle length**: phase step `0.0105`/frame → 2π/0.0105 ≈ 598 frames ≈
  10s at a ~60fps rAF cadence, inside the requested 8–12s window.
- Not touched: `dot-field-region.tsx`, colours, cursor-interaction math,
  `bulgeOnly`/`bulgeStrength`/`cursorRadius`, the reduced-motion branch
  (still never starts the animation loop at all), the tab-hidden/
  off-screen `IntersectionObserver` pause, the DPR cap, or the
  single-instance architecture.

**Verified live, not assumed — cursor parked off-canvas at (5, 5), never
moved**, screenshotting the same Purpose-section crop at
t=0/2.5/5/7.5/10s (`scratchpad/motion2-t0.png` … `motion2-t4.png`):

| Comparison | Mean abs diff | Max diff | Pixels changed (>5) |
|---|---|---|---|
| t0 → t2.5s | 0.09 | 12 | 786 |
| t0 → t5s | 0.17 | 16 | 2,106 |
| t0 → t7.5s | 0.24 | 16 | 3,233 |
| t0 → t10s | 0.30 | 16 | 4,106 |

Difference grows monotonically with elapsed time (not noise). An
8×-amplified t0-vs-t10s diff (`scratchpad/motion2-diff-amplified.png`)
shows a crescent/ring around every dot, and — unlike §18's uniform
diff — the ring size visibly *varies* dot to dot within the same frame,
the direct visual signature of the phase stagger working. A zoomed
5-panel strip of one dot cluster across all five timestamps
(`scratchpad/motion2-strip-zoom.png`) shows both the position drift and
the size pulse directly.

**Reduced motion, re-verified against the rebuilt code, not carried
over from §18.** Same test with `prefers-reduced-motion: reduce`
emulated, t=0 vs. t=10s: pixel diff exactly **0**. The reduced-motion
branch in `dot-field.tsx` (draws once, never starts the loop) wasn't
touched by this pass, and this confirms it still fully suppresses the
new drift.

**Contrast, re-measured across all five sections** with the darker dots
(not just Purpose/Trust):

| Section | Worst background contrast | Average | AA floor |
|---|---|---|---|
| Purpose | 9.24:1 | 15.44:1 | 4.5:1 |
| Pathways | 10.21:1 | 14.49:1 | 4.5:1 |
| Experience | 13.20:1 | 14.78:1 | 4.5:1 |
| Trust | 13.76:1 | 15.46:1 | 4.5:1 |
| FAQ | 13.82:1 | 15.47:1 | 4.5:1 |

All still comfortably clear AA (worst case is the same decorative
pulse-mark icon flagged in earlier sections, not body text). Slightly
lower than §19's numbers everywhere, as expected with darker dots, but
nowhere near the 4.5:1 floor.

### Validation
`npm run lint`, `npx tsc --noEmit`, `npm run build` clean.

## 21. Rebuilding the breath: perceptible, not just pixel-diffable

Direct feedback on §20: the motion was "technically running but visually
imperceptible," and pixel-diff stats aren't proof of acceptable motion.
Correct — §20's own diff numbers (786–4,106 changed pixels) were real but
never translated into anything a viewer would actually notice; amplitude
was the problem, not the mechanism. This pass rebuilds the wave to
significantly stronger, explicitly-named, centralized values, and verifies
it by watching frames, not by re-running the same diff script louder.

**Every value now lives in `ambient-dot-field.ts`, none hardcoded in
`dot-field.tsx`** — a new requirement this turn, and a real change from
§18/§20 where spatial frequency and pulse depth were bare constants in the
component. `dot-field.tsx`'s `DotFieldProps` grew six new named props
(`breathAmplitude`, `breathRadiusPulse`, `breathOpacityPulse`,
`breathCycleSeconds`, `breathSpatialX`, `breathSpatialY`,
`breathBucketCount`), replacing the old single `waveAmplitude`:

| Setting | §20 value | §21 value | Requested range |
|---|---|---|---|
| Vertical amplitude | 1.3px | **3.6px** | 3–4px |
| Radius pulse | 15% | **35%** | 30–40% |
| Opacity pulse | none | **30%** | (new this pass) |
| Cycle length | ~10s | **5.5s** | 5–6s |

**Opacity via alpha buckets, not per-dot draws.** Canvas can't vary alpha
per-shape within one batched `fill()` call, and a separate `fill()` call
per dot would mean hundreds of draw calls a frame — ruled out explicitly
this turn. `tick()` now buckets each dot's wave phase into
`breathBucketCount` (8) groups once per frame (a cheap index push, not a
draw), then does one `beginPath()`/`fill()` per non-empty bucket with its
own `ctx.globalAlpha`. Radius still pulses per-dot for free within each
bucket's shared path (just a different arc radius, no extra draw call).
The `drawDot` helper was also moved out of `tick()` to a sibling function
in the effect body, so it isn't a fresh closure allocated every frame —
a small cleanup surfaced while restructuring this, not asked for but
free to fix in the same pass.

**Spatial frequency, tuned for "most dots calm, wave travels gradually."**
`breathSpatialX`/`Y` (0.008/0.005) give roughly 1.8 wave cycles across a
1440px viewport — low enough to stay a smooth diagonal gradient rather
than tight ripples or sparkle-like noise, short enough that at any instant
only a portion of the field sits near its peak while the rest is close to
its rest state. Phase comes from each dot's own `ax`/`ay` position, not
its array index, so the wave is a genuine travelling plane wave (crest
position shifts over time), not a synchronized pulse.

**Verified by watching frames, explicitly not by pixel-diff alone.**
Recorded the Purpose section via Playwright's video capture (cursor
parked off-canvas at (5, 5), never moved, ~9–11s of idle motion) and
extracted frames with `ffmpeg` (via the `imageio-ffmpeg` package's
bundled binary — no system ffmpeg in this environment). First pass at
2fps showed a real but frustratingly subtle effect on inspection — traced
this to Playwright's video encoder (VP8, ~200kb/s, quite compressed) and
cross-checked with lossless PNG screenshots (`scratchpad/cycle/c-00.png`
… `c-11.png`) taken directly, spanning one full ~5.5s cycle at 12 evenly
spaced points. At full normal viewport scale, no zoom, no diffing — a
visible diagonal band of larger, more saturated dots is plainly present
in a single frame, and comparing two frames roughly half a cycle apart
(`c-00.png` vs `c-06.png`) shows that band has visibly relocated from the
lower-left of the section to the upper-right. This was a direct visual
read, the same thing a person watching the live page would see — not a
diff statistic. (The compressed-video artifact is noted here as a real
finding: it under-sold a genuinely working effect, so it's flagged in
case screen recordings are used for review again elsewhere.)

**Reduced motion, re-verified against the rebuilt code.** Same test as
§18/§20 with `prefers-reduced-motion: reduce` emulated: t=0 vs. t=10s,
pixel diff exactly **0**. `dot-field.tsx`'s reduced-motion branch (draws
once, never starts the loop) wasn't touched by this rewrite.

**Contrast, re-measured across all five sections** (colours/alphas
unchanged this pass, but re-verified rather than assumed, since radius
and opacity now swing far more than before):

| Section | Worst background contrast | Average | AA floor |
|---|---|---|---|
| Purpose | 9.39:1 | 15.44:1 | 4.5:1 |
| Pathways | 10.21:1 | 14.48:1 | 4.5:1 |
| Experience | 13.19:1 | 14.78:1 | 4.5:1 |
| Trust | 13.76:1 | 15.46:1 | 4.5:1 |
| FAQ | 13.85:1 | 15.46:1 | 4.5:1 |

Effectively unchanged from §20 (worst case is still the same decorative
pulse-mark icon, not text) — comfortably clear of AA everywhere sampled.

Not touched this pass: colours/alphas, `dotFieldRegionOpacity`,
`dotFieldEdgeFade`, `dot-field-region.tsx`'s layer structure, cursor
math (`bulgeOnly`/`bulgeStrength`/`cursorRadius`/`cursorForce`), the
reduced-motion branch, the tab-hidden/off-screen `IntersectionObserver`
pause, the DPR cap, or the single-instance architecture.

### Validation
`npm run lint`, `npx tsc --noEmit`, `npm run build` clean.

## 22. Replacing breath with a continuous flow field

Direct feedback on §21: "technically changing pixels but visually reads
as static." Correct diagnosis, and a real one — §21's radius/opacity
pulse made each dot read as its own small event, not part of one
surface. This is a different mechanism, not a retune: pure position
displacement, no radius or opacity change anywhere, a much larger
spatial wavelength, and a defined travel direction.

**Removed entirely:** `breathAmplitude`, `breathRadiusPulse`,
`breathOpacityPulse`, `breathCycleSeconds`, `breathSpatialX/Y`,
`breathBucketCount`, the alpha-bucket batching machinery in `tick()`, and
the `drawDot` helper it needed — all gone. `dot-field.tsx` is back to one
`beginPath()`/loop/`fill()` per frame, same shape as before any of the
motion work started, just with a position offset added per dot.

**Added, all named in `ambient-dot-field.ts`:** `flowAmplitudeX` (5px),
`flowAmplitudeY` (8px), `flowCycleSeconds` (6), `flowWavelengthPx` (450),
`flowDirectionDeg` (-45). Each dot's displacement is
`sin(flowPhase + dotPhase) × amplitude` on both axes from one shared
phase — a straight diagonal back-and-forth, not an ellipse.
`flowWavelengthPx` sets the spatial frequency: ~3 cycles span a normal
1440px viewport, broad enough that neighboring dots share nearly the
same phase and move together as one bending surface — confirmed by
directly detecting dot-center pixel positions along a real row (not
eyeballed): a single row's y-position swept measurably across the
viewport in a smooth curve, not a discontinuous jump between dots.
`flowDirectionDeg` (-45, canvas convention: 0 = +x/right, 90 = +y/down)
encodes "lower-left toward upper-right"; the phase formula is
`time − k·(position · direction)`, negated relative to a naive
`time + k·position`, which was checked by tracking a wave peak's
x-position across four frames — it moved rightward and monotonically at
every step (428→513→570→627 px, 0→4.1s in one test run), confirmed the
sign was right rather than assumed from the formula.

**Amplitude pushed past the given starting values, with a reason, not a
guess.** The brief gave 3px/5px as explicit "starting motion values." At
those values, the same row-detection method measured only an ~11px
peak-to-trough sweep across the full viewport width — real and correctly
travelling, but this is the third motion pass this session, and the
first two were both rejected as reading static despite being real
underneath. Rather than ship the literal starting numbers and risk a
third rejection, pushed both amplitudes ~65% further (5px/8px, same 3:5
ratio) before calling it finished, and re-verified at the higher value
by direct visual inspection of a full cycle's worth of screenshots
(fourteen frames, 0.46s apart, `scratchpad/flow-full-cycle-grid.png`) —
the grid's row alignment visibly shifts and bends frame to frame, not
just in aggregate statistics.

**Verification, explicitly not by pixel-diff statistics, per the
brief.** Playwright's video recording was tried first
(`scratchpad/video3/*.webm`, the requested recording deliverable) but
this session already learned in §21 that its VP8 encoder at ~200kb/s
compresses away subtle motion — so it wasn't used as the basis for the
accept/reject call here, only produced as the artifact asked for.
Verification instead used lossless PNG screenshots spanning a full 6s
cycle, reviewed directly:

- A wide, plain crop of the dot field viewed at full normal scale, two
  frames ~2.8s apart (`scratchpad/flowcycle/f-00.png` vs. `f-06.png`) —
  the diagonal banding pattern in the dots has visibly shifted between
  them, by eye, no zoom, no diffing.
- Direct pixel-detection of one row's dot centers across the full
  viewport width, confirming a real, continuously-varying sine-shaped
  vertical profile (not a static reading, a shape measurement).
- A 14-frame full-cycle grid at 2× zoom
  (`scratchpad/flow-full-cycle-grid.png`) — flipped through in sequence,
  the grid's row alignment visibly bends and resettles across the
  frames, the "living surface" quality the brief asked for.

**Reduced motion, re-verified against the rewritten code.** Same test as
every prior motion pass, `prefers-reduced-motion: reduce` emulated, t=0
vs. t=10s: pixel diff exactly **0**. `dot-field.tsx`'s reduced-motion
branch (draws once, never starts the loop) wasn't touched by this
rewrite.

**Contrast, re-measured across all five sections** (colours/alphas
unchanged this pass):

| Section | Worst background contrast | Average | AA floor |
|---|---|---|---|
| Purpose | 9.71:1 | 15.44:1 | 4.5:1 |
| Pathways | 10.21:1 | 14.49:1 | 4.5:1 |
| Experience | 13.09:1 | 14.78:1 | 4.5:1 |
| Trust | 13.76:1 | 15.46:1 | 4.5:1 |
| FAQ | 13.83:1 | 15.45:1 | 4.5:1 |

Effectively unchanged from §21 (worst case is still the same decorative
pulse-mark icon, not text) — comfortably clear of AA everywhere sampled.

Not touched this pass: colours/alphas, dot size/spacing,
`dotFieldRegionOpacity`, `dotFieldEdgeFade`, `dot-field-region.tsx`'s
layer structure, cursor math, the reduced-motion branch, the tab-hidden/
off-screen pause, the DPR cap, or the single-instance architecture. No
CSS transform was applied to the canvas element at any point — every
offset is a per-dot canvas coordinate inside `tick()`.

### Validation
`npm run lint`, `npx tsc --noEmit`, `npm run build` clean.

## 23. Swapping the hero video

Requested: replace the hero video with `clean_herovideo` — already
present at `public/brand/clean_herovideo.mp4`, alongside the existing
`hero-video.mp4`. One-line change: `hero.media.videoSrc` in
`site-content.ts`, `/brand/hero-video.mp4` → `/brand/clean_herovideo.mp4`.
No changes to `hero-section.tsx` — it already reads the src from content,
never hardcoded.

**Poster regenerated too, not left stale.** `hero.media.posterSrc` is
used two ways in `hero-section.tsx`: as the `<video poster>` shown before
the new clip loads, and — under `prefers-reduced-motion` — as the *only*
thing a visitor sees, a plain `<Image>`, the video never rendered at all.
Leaving the old poster (a frame from `hero-video.mp4`) in place would
have meant reduced-motion visitors saw an entirely different clip's still
than everyone else gets as a moving background, and everyone else would
see a flash of the old frame before the new one loads in. Extracted the
new video's actual frame 0 with `ffmpeg` (via the `imageio-ffmpeg`
package's bundled binary — no system ffmpeg in this environment, same
tool used for the frame-verification work in §22) and overwrote
`hero-video-poster.jpg` with it — same filename, same 1280×720, so no
other reference needed updating.

**Found and disclosed, not silently changed:** `clean_herovideo.mp4`
carries its own AAC audio track, unlike `hero-video.mp4` which had audio
stripped at the file level (the code comment said so explicitly). The
`<video>` element's `muted` attribute still guarantees silence either
way, so this isn't a functional bug, but it's a real difference from the
documented asset convention — didn't re-encode the client-supplied file
to strip it (out of scope for "replace the video"), just corrected the
comment in `site-content.ts` to describe what's actually true now rather
than leave a stale claim, and flagged it here in case the client wants a
stripped re-export later.

**Verified live**, not assumed: screenshot of the hero with the new
video confirms it renders correctly, text scrim still reads clearly over
it; `page.eval_on_selector("video source", "el => el.src")` confirms the
resolved URL is the new file; a second screenshot with
`prefers-reduced-motion: reduce` emulated confirms the regenerated
poster matches the video's actual opening frame exactly.

### Validation
`npm run lint`, `npx tsc --noEmit`, `npm run build` clean.

## 24. Premium homepage rework

A full rework of every homepage section after the hero, per a detailed
brief: one continuous cinematic journey instead of conventional sections
falling back to template patterns after the first viewport. Hero kept as
the visual foundation, improved only in motion.

**Hero motion, and the seam into Philosophy.** Composition, video and
scrim untouched — but two additive, low-risk pieces were added, not a
redesign: (1) `useExitDrift`, a new hook in image-motion.ts distinct from
the existing `useParallax` (which trails a fixed viewport-center point
symmetrically both ways) — this tracks one direction only, how far the
hero has scrolled *past* the viewport top, and drifts the text column up
to 56px while fading it to 25% opacity (never fully gone) as it leaves,
for "hero typography drifts upward gently." (2) The video's own bottom
edge now dissolves into paper tint via the same `emergenceBand` technique
Immersive/Final CTA already use for their dark surfaces, instead of
ending in a hard rectangle — confirmed by screenshot that Philosophy's
first line is already visible before the hero has fully scrolled away,
with no visible seam. The brief's literal three-tier depth spec
(background/subject/foreground moving at different rates) wasn't
attempted: the hero is one composited video, not three separable image
layers, and synthesizing fake layers from it would mean redesigning the
approved composition the brief explicitly says to preserve. Flagged here
and in the final report rather than silently claimed as done.

**New dependency: `gsap` (includes `ScrollTrigger`).** The brief itself
named GSAP-specific patterns (`ScrollTrigger.matchMedia`, GSAP context
cleanup) as the expected implementation approach for pinned scroll scenes
and progress-driven SVG/colour tweens — this hand-rolled site's existing
IntersectionObserver/rAF motion system (image-motion.ts, scroll-scenes.ts)
was never built for true scroll-scrubbed pinning. Scoped narrowly: only
Philosophy and Journey use GSAP; Care's dominant/quiet toggle and Final
CTA's parallax reuse the existing hand-rolled hooks, deliberately, since
neither is one of the brief's four named parallax moments (Care isn't
named at all; Final CTA's approach — a static emergence-gradient plus
`useParallax` on its resolving line — was already the site's established
technique for its one other full-bleed dark section, Immersive).

**Sections removed/replaced:**
- Purpose → **Philosophy** (`philosophy-section.tsx`): the "your purpose
  statement" placeholder replaced with the brief's own four-line cinematic
  sequence (approved copy, not a placeholder). Desktop pins the section
  for one scroll pass; each line becomes dominant while the previous
  recedes (scaled down, dimmed to 16% opacity, drifted up 10px — never to
  full transparency) in its own asymmetric flow position — no absolute-
  position card-stacking (an early version of this used `inset:0 auto
  margin` centering, which silently overrode the intended left/right
  asymmetry; caught and fixed before shipping). Background breathes
  ivory → dusty-rose (`#f2e3de`, 18% terracotta into paper, disclosed as
  derived not confirmed) → ivory as the sequence resolves. Mobile and
  reduced motion get the exact same DOM in normal document flow — not a
  fallback, the actual designed mobile layout.
- Pathways + Experience → **Journey** (`journey-section.tsx`): the two
  sections describing the same concept twice, replaced by the signature
  BirthWave Journey — seven stages (Preconception → Baby), a ~100svh
  pinned canvas on desktop (left: active stage + quiet prev/next labels;
  right: a stack of photo panels revealing via `wipeReveal`'s left-to-
  right clip-path, now scroll-scrubbed, each panel literally passing in
  front of the one before it rather than crossfading), and one continuous
  hand-built SVG wave path (smooth cubic-bezier curve through 7 alternating
  points, not timeline dots) that draws progressively via
  `stroke-dashoffset`, with a short second trace overlaid on its current
  tip in that stage's cycled accent hue (terracotta/sky/coral). Mobile:
  normal vertical stack, the same path running down the left edge, no pin,
  no horizontal movement, each stage settling in via the existing
  `useScrollReveal` hook.
- Trust → **Care** (`care-section.tsx`): "what guides how we care for
  you" kept conceptually, recomposed around a sticky (desktop) headline
  and three principles that individually take visual focus as they cross
  the viewport's center (a new `useScrollFocus` IntersectionObserver hook
  in scroll-scenes.ts — toggles both ways with scroll direction, unlike
  the one-shot `useScrollReveal`). The placeholder testimonial that used
  to close this section is gone, not carried forward or reworded — no
  approved quote exists, and a placeholder styled like a real review is
  worse than none (see the brief's own instruction on this).
- Final CTA copy and transition reworked in place (not replaced) with the
  brief's approved copy, a wider warm-to-dark-brown transition band
  (`--space-fade-final`, a new token), a resolving BirthWave line (a
  short, calming SVG echo of Journey's path, static — not another
  scroll-draw — with its own subtle `useParallax` drift), and a real
  secondary CTA ("WhatsApp us" — see the CtaLink bug below).

**Sections retained, untouched in content/structure:** Immersive (not
named in the brief; its own pre-existing parallax — a settle-from-zoom
drift — stands alongside, not counted among, the brief's four named
moments) and FAQ (still the one place the dotted background texture is
allowed to exist, per the brief, now at much lower opacity — see below).

**Background pattern reduced significantly, as instructed.**
`DotFieldRegion` used to wrap five sections (Purpose through FAQ); it now
wraps exactly one, FAQ, via an explicit `<DotFieldRegion><FaqSection
/></DotFieldRegion>` in page.tsx rather than the old positional "wrap
everything between hero and final CTA" derivation (which no longer
applies now that DotField isn't the default background for multiple
sections). `dotFieldRegionOpacity` dropped 0.7 → 0.4 for "a very low-
opacity texture." `home-section-order.ts` — the array this positional
wrapping used to read — was deleted rather than kept as an increasingly
inaccurate second source of truth; page.tsx now lists sections directly.
The dead `.section-tint`/`.section-tint-fade`/`sectionFadeZones`/
`sectionFadeStyle` system (unused since §19/§22, confirmed again here
with every consumer rewritten) was finally removed from globals.css and
section-transitions.ts, along with `experienceAmbientGlow` (its one
consumer, Experience, no longer exists).

**Three real bugs found and fixed during this pass, each confirmed via
a real computed-style/layout check, not assumed from reading the code:**
1. Journey's photo-panel container resolved to a 0×0 box — `aspect-[4/5]`
   on a grid item with `justify-self-end` (opting out of the column's
   default stretch) and only absolutely-positioned children (no intrinsic
   size) can't resolve a width to derive height from. Fixed with `w-full`
   in place of `justify-self-end`, confirmed via `getBoundingClientRect()`
   before/after (0×0 → 442×553).
2. Journey's active-stage text and its photo panel drifted out of sync by
   up to a full stage by the end of the scroll — the text's active-index
   math divided scroll progress into `STAGE_COUNT` (7) buckets while the
   panel timeline's actual transitions land at `STAGE_COUNT-1` (6)
   boundaries. Fixed by deriving both from the same denominator; verified
   with a 10-step paced-scroll test logging progress/index at each step
   and cross-checking against the rendered heading text — exact match at
   every step, not just eyeballed.
3. **Pre-existing, sitewide**: `CtaLink`'s `inverted` tone was invisible
   against the dark Final CTA (and its `default` tone, used by the
   untouched Hero's "Book a Consult," was rendering plain ink instead of
   terracotta-deep) — globals.css's `a { color: inherit; }` was winning
   the cascade against the component's own colour utility on both tones.
   This predates the rework (Hero wasn't touched) but was only caught now
   because it's stark and obvious on a dark background, where on light
   backgrounds ink and the intended muted-brown tones look similar enough
   to miss by eye. Fixed with Tailwind's `!` (important) modifier on both
   tones, scoped to this one shared component rather than touching the
   global `a` rule sitewide without full regression coverage of every
   anchor on every page — flagged as a remaining concern below in case a
   proper sitewide audit is wanted later.

**Missing photography.** No approved photography exists for any of
Journey's 7 stages, Immersive, or Care. Journey's placeholders use the
same corner-badge convention already established elsewhere on this site
(a small "Photography pending — [theme]" label over a soft accent-tinted
gradient panel with a ghost numeral) — never a raw "PLACEHOLDER" stamp in
the visible composition. Real photography needed for: Preconception
(woman/couple/consultation), Pregnancy (pregnancy portrait), Preparation
(movement/yoga/childbirth education), Birth (hands, intimate non-explicit
detail), Recovery (mother resting/postpartum care), Mother (portrait),
Baby (mother/newborn) — all named per the brief's own theme list.

**Missing/unverifiable contact data.** No verified WhatsApp number exists
for this project. The "WhatsApp us" secondary CTA resolves to the same
`#connect` placeholder anchor as the primary CTA, exactly like every
other not-yet-real destination already in this codebase, rather than a
fabricated `wa.me` link.

**Validated:** 1440×900 and 390×844 screenshots of every section, both
breakpoints; zero console/page errors; zero horizontal overflow at either
width; `prefers-reduced-motion: reduce` re-verified to disable pinning on
both GSAP scenes (Philosophy and Journey both fall back to their normal-
flow layouts, confirmed static after further scrolling, not just at
first paint).

### Validation
`npm run lint`, `npx tsc --noEmit`, `npm run build` clean.

## 25. Interaction-correction pass — Philosophy, Journey, Immersive

A follow-up pass touching exactly three sections, per an explicit scope
list — Philosophy, Journey, Immersive — and nothing else (Hero, Header,
FAQ, Final CTA, routing and architecture were all off-limits this time).

**Philosophy — depth added, not a rewrite of the copy.** Was flat
typography on a plain paper background; now three depth planes on the
same pinned timeline (shortened 300% → 180%, within the requested
150–200vh): a background plane (a heavily blurred, 8%-opacity crop of the
hero's own already-approved poster photo — not new imagery, reused via
`mix-blend-multiply`), the typography as the normal-speed middle plane
(repositioned to a curated progression — upper-left → right/mid-height →
left-of-centre/lower → the resolution, centred and dominant — via a new
per-statement `position` field in site-content.ts, replacing the old
binary left/right `align`), and a foreground BirthWave line that draws
progressively and drifts at the fastest of the three rates. All three
planes tween from the one GSAP timeline, so they can't drift out of sync
with each other.

**Journey — the master-grid bug, found and fixed with real measurements.**
The reported symptom ("first stage and subsequent stages shift their
visual geometry") traced to the blurb paragraph sitting in normal
document flow below the title — different stages' blurb text wrapped to
different line counts, pushing the "next stage" label up/down between
stages. Fixed by moving the whole number/title/blurb block into a
fixed-height (`h-72`), absolutely-stacked slot — all seven stages occupy
the exact same position now, only opacity/y tween between them, all
driven from the *same* GSAP timeline as the photo panels and the path
draw (previously the text used a separate React-state-driven remount;
now text, photo and path can't desync the way an earlier pass's separate
timing systems did). Two bugs surfaced and fixed while building this,
both confirmed via `getBoundingClientRect()`/ink-width measurement, not
assumed correct on read:
1. The title resolves to this project's fluid `--text-5xl` token — 108px
   at this column's width, not Tailwind's small built-in default. At
   108px, "Preconception" (13 characters, unbreakable) needed ~756px but
   only had ~510px, so it overflowed into the photo column and was
   painted over by that column's opaque background — looking like the
   text was "cut off" when it was actually being covered. Fixed with an
   explicit `text-[2.75rem] xl:text-[3.25rem]` cap that reliably fits the
   longest stage title.
2. The first attempt at the fixed-height slot sized it (and the blurb's
   top offset) against an assumed *Tailwind-default* title height, before
   the 108px measurement above — the blurb started 45px before the
   title's own box ended, visibly overlapping it. Fixed once the real
   title height was known.

No developer-facing "Photography pending" label in the public layout any
more — the placeholder is a clean tonal gradient with just the ghost
stage numeral, matching the brief's "clean tonal placeholder surface."
The missing-photography list moved to this section's own TODO comment
and the final report, not the rendered page.

**Immersive — from a static poster to an atmospheric scene.** New
approved copy (a two-line progression closing on `philosophy.resolution`,
reused verbatim rather than re-typed, so the two scenes can't drift
apart). The section's old hand-rolled `useScrollDrift`/
`immersiveBackgroundDrift` (one listener, one drift+scale) was retired
(see the removal note in image-motion.ts) in favour of the same pinned-
GSAP-timeline system Philosophy and Journey use, now driving three real
differential-speed planes: the brand mark (slowest), text (normal,
spatially progressive like Philosophy — left/centre-left → centre/
slightly-right → large/centred/low), and a soft, heavily-blurred coral
light field (fastest, drifting lower-left → centre → lower-right across
the scroll — deliberately never a hard gradient edge or a glow/blob).
Entry/exit bands widened to the same `--space-fade-final` token Final CTA
already uses (was `--space-fade-strong`) and their strength bumped
60 → 68, for a more graduated darken/lighten. Mobile/reduced motion keep
the light field's own restrained drift per the brief ("light parallax
only") while dropping the pin entirely.

**A pre-existing bug found, not introduced here, and correctly left
unfixed given this pass's scope.** Testing reduced-motion more
rigorously than previous passes had (checking `pageerror` events on a
*fresh* page load, not just after scrolling to a section) surfaced a
real React hydration error (#418) on every single page load when
`prefers-reduced-motion: reduce` is active — confirmed via the server's
actual rendered HTML (`curl`), which always emits hero-section.tsx's
`<video>` branch (SSR has no `window`, so `useReducedMotion`'s
`getInitial()` always returns `false` server-side), colliding with a
reduced-motion client's very first hydration pass, which immediately
tries to render the `<Image>` branch instead — a structural element-type
mismatch. Isolated by testing with and without reduced motion (0 errors
without, 1 with, on every load, before any scroll) to confirm Hero is the
source and this pass's own three sections introduce nothing. Hero is
explicitly off-limits this pass ("Do NOT modify: Hero"), so this is
disclosed here and in the final report rather than fixed — worth a
dedicated small fix later (likely: defer `useReducedMotion`'s first real
read to a `useEffect` so server and first-client-render agree, matching
how the rest of this hook's callers already treat it).

### Validation
`npm run lint`, `npx tsc --noEmit`, `npm run build` clean.

## 26. Fixing the Hero hydration mismatch

A small, isolated repair — flagged in §25, fixed here, touching only
hero-section.tsx.

**Root cause.** The hero used to branch between an `<Image>` (reduced
motion) and a `<video>` (normal motion) based on `reducedMotion`.
`useReducedMotion`'s first read is synchronous — on the server (no
`window`) it's always `false`; on the client it reads the real
`window.matchMedia(...)` value immediately, even on the very first
render. A visitor whose OS already has reduced motion on would therefore
hydrate with `reducedMotion === true` on their first client render, while
the server had sent markup assuming `false` — two different element
types where React expects the same one, which it can't patch in place
(React hydration error #418, confirmed via `curl`ing the server's actual
HTML: always a `<video>`, plus `pageerror` listening on a *fresh* load
under `prefers-reduced-motion: reduce`, before any scroll — 0 errors
without reduced motion, 1 with, every time).

**Fix.** The `<video>` element is now unconditional — identical markup
on the server and on every client render, first or later. `reducedMotion`
is no longer read during render at all; it's only consulted inside a
`useEffect`, imperatively: `el.pause()` when reduced motion is on,
`el.play()` otherwise. The native `autoplay` attribute is gone too (it
would have reintroduced the same class of mismatch, just on an attribute
instead of an element) — playback now always starts via `.play()` in
that same effect. At rest, before the effect runs (or with JS disabled
entirely), a `<video>` simply shows its own `poster` frame — already a
complete, static hero visual, so this needed no parallel `<Image>` at
all. `suppressHydrationWarning` was not used anywhere — the fix removes
the actual markup difference, not the warning about it.

**Verified**, not assumed: `pageerror` + console-error listeners across
five conditions (normal motion desktop, reduced motion desktop, reduced
motion with two sequential loads in one page context — a hard-refresh
stand-in, normal motion mobile, reduced motion mobile) — 0 errors in all
five. Video state confirmed directly (`video.paused`, `.currentTime`,
`hasAttribute('autoplay')`) rather than inferred from screenshots alone:
playing with a live `currentTime` under normal motion, paused at
`currentTime: 0` (i.e. still showing its poster, never started) under
reduced motion, `autoplay` attribute absent in both. Screenshots at
1440×900 and 390×844 confirm the composition is pixel-identical between
motion states (no layout shift — same element, same CSS, just a
different playback state) and unchanged from before this fix. A full
scroll-through of the whole homepage under reduced motion afterward: 0
errors, no horizontal overflow — confirms this pass introduced nothing
new elsewhere.

### Validation
`npm run lint`, `npx tsc --noEmit`, `npm run build` clean.

## 27. Zig-zag Journey rebuild — from a pinned frame to a scrolled sequence

The Journey section's entire architecture, replaced: the pinned single-
100vh-frame slideshow (§24–§25) is gone, along with the seventh stage
("Mother," folded conceptually into "Baby"). In its place, six sequential
scene blocks in normal document flow — the visitor scrolls *through* the
journey rather than watching it swap inside one fixed canvas — connected
by one continuous BirthWave SVG path and a zig-zag grid that alternates
text/image sides every stage.

**Content** (site-content.ts). `journey.stages` rewritten to six entries
with approved verbatim copy: `number`, `title`, `headline` (an array of
lines — one to three per stage, e.g. Birth's "Your care." / "Your
choices." / "Your clinical needs."), `supporting`, `image` and `alt`.
`journey.heading` now holds Philosophy's own resolution phrase, reused
verbatim per the brief's "preserve" instruction, but — see below — ended
up used only as the section's accessible name, not visible body copy.
`journey.eyebrow` is the old section heading ("The BirthWave Journey"),
repurposed as the small visible label above stage one. The six
photographs already existed at `public/images/journey/journey-*.jpg`
(confirmed via a Python/PIL dimension check before any code was written:
all six exactly 1122×1402, one consistent editorial system) — no missing
photography to report.

**Architecture.** `JourneySection` renders an intro block (now just the
small eyebrow, see below) and a `wrapperRef` containing one absolutely-
positioned SVG path overlay plus six `JourneyScene` components in normal
flow, each `min-h-[85svh] lg:min-h-[92svh]`. No `pin`, no
`ScrollTrigger`-driven `position` changes anywhere in this file.

**Grid.** Each scene is a 12-column grid at `lg:` (1024px — chosen
deliberately over the shared `DESKTOP_QUERY` constant's 769px, kept
local to this file per the brief's "don't change animation
infrastructure globally": below 1024px the layout is genuinely simpler,
not degraded, so tablet gets the vertical treatment early rather than a
cramped zig-zag). Odd stages (01/03/05): text `col-start-1 col-span-5`,
image `col-start-7 col-span-6`. Even stages (02/04/06): image
`col-start-1 col-span-6`, text `col-start-8 col-span-5`. Column 6 (odd)
or 7 (even) is deliberately empty — the gutter the path travels through.
Below `lg`, the grid collapses to a single column and DOM order (not
just CSS order) already puts text before image on every stage, so mobile
never needs a separate "reading order" fix — it's the same markup.

**SVG path.** One path pair (base plus a short brand-hued "current
position" highlight trace) spans the whole `wrapperRef`, built by
`buildWavePath()` from six alternating points (x = 44 or 56, out of a
0–100 viewBox stretched via `preserveAspectRatio="none"`) joined by
cubic Béziers whose control points share each endpoint's own x — a
smooth S-curve that never swings wider than the gutter it lives in
("restrained," not a dramatic sweep). A mask with a vertical gradient
fades the very top and bottom of the path to near-transparent, so it
reads as already-in-motion on entry and still-travelling on exit rather
than starting/stopping at a hard edge. Mobile/tablet (`lg:hidden`) gets
a second, separate path — `buildWavePath()` reused with a near-straight
point set (x = 4 ± 1.5) sitting left of the text column, "travels
vertically along the left side" per the brief, rather than reusing the
desktop geometry at a width where it would cut straight through the
text. Both pairs are driven by the same single `ScrollTrigger` (scrub
0.8, no pin, trigger = the whole wrapper's own natural scroll distance —
the same unpinned-scrub technique Philosophy already uses for its own
path), which also advances an active-stage index and recolors the
highlight trace per `STAGE_HUES` (terracotta/sky/terracotta/**coral**/
terracotta/sky — Birth is deliberately pinned to coral, not reached by
pure cycling, per the brief's "the wave may briefly adopt coral").
Whichever pair is `display:none` at mount (desktop on a narrow viewport,
or the reverse) is detected via `getTotalLength() === 0` and skipped
rather than animated — its default (no `stroke-dasharray` set) is
already a solid, fully-visible line, a safe no-op resting state.

**Per-scene motion**, all in `JourneyScene`, one `ScrollTrigger` each
(trigger: the scene itself, start "top 82%", end "bottom 18%", scrub
0.6, no pin): a single timeline scrubs the image's clip-path reveal,
then number → title → supporting-copy in a staggered entrance (offsets
0, 0.02, 0.1, 0.18 — number first, title next, copy last, exactly the
brief's ordering), holds, then drifts the text up 16px and down to 30%
opacity near the end (the "exit" — image is *not* part of this
timeline, so its own parallax keeps drifting independently through the
exit rather than freezing with the text, per the brief). Image reveal
direction is direction-aware: image-on-left scenes reuse the site's
existing `wipeReveal` (left→right, from image-motion.ts, unmodified);
image-on-right scenes get a mirrored `wipeRevealRtl` clip-path pair,
defined locally in this file only (not added to the shared module,
since no other section needs a right-to-left wipe). Image parallax is
the existing `useParallax` hook (factor 0.08, maxOffsetPx 34), gated to
`minViewportWidth: 1024` to match the same breakpoint the zig-zag grid
itself uses — below it, the layout is already vertical and the brief
asks for no added motion there beyond the entrance reveal.

**Photography treatment.** Every image sits in an `aspect-[1122/1402]`
box (the six source photos' own shared ratio, not a manufactured one) at
a max-width of ~26rem below `lg`, full-column above it, with the site's
existing "single-deep-corner panel" radius signature (`rounded-t*-panel`
on the outer/bleeding corner, `-xs` on the other three) applied
directionally — the deep corner sits on whichever edge faces away from
the text, matching which side the image bleeds toward (a small negative
margin, 1.25vw, pulling into the container's own gutter padding, never
causing overflow — confirmed at 0px horizontal overflow at every tested
width). No shadows, borders, or card chrome anywhere. Birth gets a
modest 1.06 scale on the same grid footprint (transform-origin set to
the outer edge, so it grows into existing negative space rather than
into the text column) plus a taller `clamp()` step on its own headline —
"without changing the core grid," confirmed: column spans are identical
to every other stage, only the transform and one type-scale token
differ.

**Background atmosphere.** One static `linear-gradient` (no JS, no
scroll listener) spans the intro and all six scenes, with a `color-mix()`
stop placed at each stage's approximate vertical centre — ivory, a 6%
sky lean, a 9% terracotta "sand," a 16% terracotta "rose," ivory again,
a 7% sky lean — CSS itself interpolates the space between stops, so
there is no hard seam between any two stages, and no runtime cost.

**Intro heading — a mid-build correction.** The first pass rendered
`journey.heading` ("One continuous journey of care.") as a large visible
heading directly under the eyebrow, reusing Philosophy's resolution
sentence verbatim as the brief asked. Screenshotting the actual seam
between the two sections (not assumed) showed why that was wrong in
practice: Philosophy's own pinned scene holds that *exact* sentence, in
caps, as its last frame before releasing — so a visitor scrolling
straight through would read the identical sentence twice, seconds apart,
in two different type treatments. Fixed by keeping `journey.heading` as
the section's `aria-labelledby` target only (a real `sr-only` heading,
so the landmark and its accessible name still exist) and leaving only
the small eyebrow visible before stage one — Philosophy's own resolution
line already does the connecting job the brief asked for; restating it a
second time undercut rather than reinforced it. This is the one place
this pass deviated from the brief's literal instruction ("preserve...
the heading") rather than following it exactly, and it's disclosed here
rather than silently changed: the phrase is preserved (verbatim, in the
content file, doing real accessibility work), just not displayed twice
in a row.

**Journey → next section.** The path's own bottom fade (see mask, above)
plus a short lead-out past stage six's point is what lets it "resolve
naturally" — no marker, no "END" label, nothing added at the boundary
into Care. Confirmed by screenshot: the last thing visible is Baby's own
photograph and the path quietly thinning out beside it.

**Reduced motion / static quality.** Both effects (the path-scrub one
and each scene's own timeline) return immediately when
`useReducedMotion()` is true — no `ScrollTrigger` is ever created, so
nothing is ever hidden via `gsap.set()` in the first place. The resting
JSX/CSS state for every element (image clip-path, text opacity/
transform) is already the fully-revealed state; GSAP is what hides
things, only when it's actually going to un-hide them on scroll.
Verified directly, not assumed: under `prefers-reduced-motion: reduce`,
all six headline elements report `opacity: 1` and `transform: none` in
computed style without any scrolling. The same is true before any JS
runs at all (a hidden-by-default state was never used anywhere in this
file), which is what the brief's own "static quality test" is checking
for.

**Verification.** `npm run lint` and `npm run build` clean throughout,
including a full scroll-through of the whole homepage at 1440×900,
390×844 and 834×1112 (0 `pageerror`/`console.error` at any of the three,
0px horizontal overflow at any of the three) and a second full
scroll-through under reduced motion (0 errors). Screenshots at 1440×900
of the intro and all six stages, and at 390×844 of the intro and all six
stages, both confirm the alternating left/right rhythm reads clearly in
a static frame, not just while scrolling.

### Validation
`npm run lint`, `npm run build` clean.

## 28. Wiring the approved generated photography into place

No new architecture — every one of the six Journey stages, Philosophy's
background plane and Immersive's background plane already had a slot for
real photography (§27, §24); this pass fills those slots with the
now-approved assets and fixes two real bugs discovered while looking at
them closely, rather than assumed away.

**Journey (six images).** Already correctly mapped one-to-one by stage
from §27 — `journey-preconception/pregnancy/preparation/birth/recovery/
baby.jpg` — so no remapping was needed. Two real fixes instead:

1. **The parallax container had a genuine crop bug.** Its oversize buffer
   (`-inset-y-[6%]`, vertical only, to give `translateY` parallax room to
   move without exposing gaps) made the box 12% taller than it was wide
   relative to the source photo's own ratio. `object-cover` resolves that
   mismatch by scaling to the *larger* required dimension — here, height
   — which pushes the image's width past the box's, so it crops the
   *sides* to compensate: roughly 5% off both left and right at rest,
   confirmed by hand-computing the object-fit math, not just eyeballed.
   Preconception (three people spanning nearly the full frame width,
   including the doctor's head close to the right edge) and Baby (mother
   and doctor's heads near opposite edges) were the two stages where this
   was genuinely visible risk. Fixed by oversizing the buffer equally on
   every side (`-inset-[6%]`) instead — the box's aspect ratio now always
   matches the photo's exactly, so `object-cover` never has anything to
   crop beyond what the translateY parallax itself reveals at its own
   small extremes. Confirmed by screenshot after the fix: both heads
   fully in frame.
2. **`priority` was set on stage one's image.** None of the six sit
   above the fold — Journey is the third section on the page — so none
   should carry it; removed from all six, left to load as the visitor
   approaches (Next/Image's default lazy behaviour, already backed by
   real `sizes` and a fixed aspect-ratio box, so nothing shifts layout
   when it loads).

Each stage also got an explicit `objectPosition` (site-content.ts) — a
light safety margin biased toward that photo's actual subject (a face,
joined hands), confirmed by viewing all six images directly rather than
assumed, and matters far less now than it would have before the crop fix
above. Alt text refined against what's actually visible in each photo
(a couple + doctor, not just "a woman," for Preconception; a doctor
present with a stethoscope for Baby, etc.) rather than the brief's own
generic suggested phrasing, per "refine based on what is actually
visible." No dev-facing placeholder text existed anywhere in Journey to
remove — confirmed by grepping the whole `src/` tree for "pending",
"placeholder" and similar; every hit belonged to other, out-of-scope
routes (services, doctors, contact) or this pass's own two now-resolved
TODOs (Philosophy, Immersive — see below).

**Philosophy** (`maternal-editorial-daylight-16x9.png`, replacing the
earlier reuse of the hero's own poster frame as this plane's asset).
Anchored to the right two-thirds of the canvas rather than spanning the
full width — the photo's own subject sits in its left third, and
Philosophy's first and third messages are both left-positioned text
(`upper-left`, a `lower-center` that's still left-aligned); anchoring
the photo right keeps it away from both, so only the second, already
right-aligned message shares its side. Bleeds off the container's own
right edge (`-right-[8vw]`) — "may partially leave the viewport" — and
dissolves into the paper background on its own left edge via a CSS
`mask-image` gradient rather than presenting a visible rectangle.
`mix-blend-multiply` at a real opacity (0.22, not the previous 0.08)
means only the photo's tonal information — hair, shadow, fabric fold —
actually shows against the paper; its own bright window-light
contributes almost nothing extra, which is what keeps it "atmosphere,"
not a visible photograph competing with the type. The earlier heavy
`blur-md` is gone (the brief was explicit: don't blur it into invisible)
— the photo's own soft daylight already carries all the softness this
needed.

**Immersive** (`maternal-fabric-espresso-16x9.png`) — added as a new,
genuine background plane, one tier behind the brand mark that used to
occupy that position; the mark itself moved forward to "mid" (see the
file's own updated doc comment for the refined four-plane breakdown).
Two treatments were tried and rejected on screenshot before landing on a
third, not assumed correct on the first attempt:

- **Opacity 0.55, plain**: read as a literal, fairly graphic photograph
  competing directly with the message — nowhere near "moving light and
  depth, not background decoration."
- **Opacity 0.16 with `mix-blend-screen`**: screen blending amplifies
  exactly an image's brightest edges, and this fabric photo's rim-lit
  fold lines stayed sharp enough at that opacity to trace as a wavy
  line — uncomfortably close to the "ECG/sine-graph" look this site's
  own Journey brief explicitly rules out elsewhere, even though the
  actual page composition also happens to include a separate, genuinely
  ECG-like wavy flourish through the brand's own icon mark (the existing
  `brand.logo.iconCream` asset, approved and unchanged, not part of this
  pass) — the two were briefly hard to tell apart on screenshot, which
  is what prompted isolating the fabric layer alone (hiding every other
  element via a throwaway script) to confirm which shape was actually
  the photograph's own contribution before deciding anything needed to
  change.
- **Landed on: opacity 0.4, real blur (`blur-2xl`), no blend mode,
  scaled 1.5×.** Confirmed by that same isolated screenshot: a soft
  diagonal warm glow with no legible shape at all — exactly "moving
  light and depth." Composed back with the mark, coral light field and
  text, it reads as intended: atmospheric depth, text fully legible,
  nothing competing with the message.

**birth-support-hands-4x5.png — left unused.** Checked every existing
homepage media slot for a genuine fit: Journey's own Birth stage already
carries `journey-birth.jpg`, itself an intimate hand-holding labour-
support photograph with the same dusty-rose tones this asset carries —
replacing a correctly-mapped, already-strong photograph with a second
one of the same subject would have been a straight duplication, not an
improvement, so it was kept. Care has no media slot at all (hairline-
rule text list, no images anywhere in that component). Final CTA is
explicitly typographic by its own design intent (no boxed card, "one
composed moment"), also with no media slot. No new section was created
to house it, per the brief's own instruction. Left unused.

**Verification.** `npm run lint` and `npm run build` clean. A full
scroll-through at 1440×900, 390×844 and 834×1112 (0 `pageerror`/
`console.error`, 0px horizontal overflow at all three) and a second
full scroll-through under reduced motion (0 errors). Screenshots of all
six Journey stages, Philosophy and Immersive at both 1440×900 and
390×844 confirm: correct image per stage, correct crop/subject
visibility (including the two stages the crop-bug fix directly
affected), consistent zig-zag rhythm and photographic scale, Philosophy
and Immersive both read as atmosphere rather than a photo card, and text
stays legible over both.

### Validation
`npm run lint`, `npm run build` clean.

## 29. Final art-direction polish — copy, pacing, wave, and a real structural bug

A targeted pass across the whole homepage: no new sections, no rebuilt
Journey, no redesigned Philosophy/Immersive/Final CTA — content swaps,
pacing/weight tuning, and one genuine structural fix.

**Hero copy.** `headlineLead`/`headlineEmphasis` → "Care that moves" /
"with you." (site-content.ts), rendered as two forced block-level lines
in hero-section.tsx rather than one sentence left to the browser's own
wrap point — "deliberate responsive line wrapping" meant the break
always lands in the same place, not that it should still be free to
wrap unpredictably. `subhead` replaced with the approved sentence
verbatim. Eyebrow and CTA label untouched, as instructed.

**Philosophy.** Two changes, both isolated to philosophy-section.tsx:
- Pin distance `end: "+=180%"` → `"+=125%"` — a 30.6% cut, inside the
  requested 25–35%. Same four-beat spotlight timeline and composition,
  just scrubbed across less scroll distance.
- Background photograph opacity `0.22` → `0.32`. Edge bleed, mask and
  `mix-blend-multiply` untouched — "maintain the current edge bleed /
  masking" meant don't rebuild the treatment, just strengthen it.
  Contrast: the resolution line's own dark text sits over the masked-
  away left portion of the layer, not the photo itself, so this bump
  doesn't touch it — confirmed by screenshot, not just reasoned.

**Journey — wave polish only, architecture untouched.** Two changes to
journey-section.tsx's SVG path styling, nothing else in that file:
- Base stroke `var(--color-border-strong)` (neutral ink-grey, unrelated
  to the brand palette) → `color-mix(in srgb, var(--color-terracotta)
  38%, transparent)` — a subdued Dusty Rose, per the brief. Only the
  short "current position" highlight trace (already cycling terracotta/
  sky/coral by stage, unchanged) ever carries full brand colour, so the
  path as a whole still doesn't read as "brightly coloured."
- Both base and highlight strokes thinned (desktop 1.5→1.1 / 2.5→1.8,
  mobile 2→1.5 / 3→2.25) and the highlight given `strokeOpacity="0.9"` —
  "thin, soft, restrained."

**Journey — vertical pacing.** `lg:min-h-[92svh]` → `lg:min-h-[86svh]`
on each scene, within the requested 80–88svh; mobile's own `min-h-
[85svh]` left untouched, since the brief's own review found the extra
space specifically on desktop. Confirmed by screenshot across all six
stages, including Birth (the tallest text block, three headline lines) —
no cramping at 86svh.

**Care principles / FAQ questions.** New `label` field added to each
`care.principles` entry (site-content.ts) and rendered in care-section.tsx
as a small caps line above the existing statement — still hairline
rules only, no cards, same sticky-headline layout. FAQ's five questions
are the brief's own verbatim text; answers are original copy written to
match, each echoing language already approved elsewhere on the page
(Journey's stage copy, Care's own new principles) rather than inventing
new clinical claims, numbers or credentials.

**The dead-zone investigation.** Confirmed the reported problem is real,
found its actual mechanism (not assumed), and fixed the proportions
rather than papering over it:

*Investigation.* A first pass measuring every `<section>`'s own
`getBoundingClientRect()` after a full real scroll-through found **zero**
gap between any two sections — Immersive's bottom edge and Care's top
edge landed at the exact same pixel. That ruled out every candidate in
the brief's own list that would show up as a literal DOM gap (a stale
wrapper, a leftover spacer, a duplicate transition element, oversized
margin/padding) — none of those exist here. The actual cause only
appeared when reproducing the brief's own review method: a single-shot
full-page screenshot (`page.screenshot(full_page=True)`, the same
technique this project's own QA has used throughout) taken *without*
manually scrolling first. That capture showed a real, large blank band —
confirmed by cropping the region and viewing it directly, not inferred —
between the dark scene and Care, and the identical pattern one section
earlier, between Philosophy and Journey.

*Root cause.* GSAP ScrollTrigger's `pin` reserves its *entire* scroll
distance (`end - start`) as extra document height via a pin-spacer, but
that reserved distance only visually fills while the pinned element is
actually toggled to `position:fixed` — which GSAP does per real `scroll`
event, not as a static, always-on state. Any render that doesn't process
live scroll events (a single-shot full-page capture, a print/PDF export,
a crawler) shows the pinned frame sitting at its own short natural
resting height, with the rest of the reserved distance — for Immersive,
135% of a viewport beyond its 85vh natural height — rendered as
genuinely blank. Confirmed directly: a real, incremental scroll-through
of the identical build shows zero gap (screenshotted at 250px steps
through the whole pin range); a naive full-page capture of the same
build shows roughly a full viewport of blank space in the same spot.
This is a real characteristic of GSAP's pin technique under non-
interactive rendering, not a broken/misconfigured element — but it's a
legitimate fragility (any static export of this page will show it) worth
reducing, which is what "adjust its entry/exit transition" in the brief
is read as authorizing.

*Fix (immersive-section.tsx only — Philosophy's own pin, which has the
identical characteristic, was left at the 125% cut §3 already made,
since the brief scoped that change to pacing specifically).* Two changes
that shrink the gap between natural height and reserved distance rather
than hiding it:
- `min-h-[85vh]` → `min-h-svh` on the pinned frame — matches Philosophy's
  own convention, raises its natural resting height to a full viewport.
- Pin `end: "+=135%"` → `"+=70%"` — Immersive has only two beat
  transitions (fewer than Philosophy's three), so a comparable per-beat
  rate to Philosophy's post-cut pace (roughly 40% of a viewport per
  transition) supports a steeper cut here without rushing the sequence.

Combined: Immersive's total reserved height drops from 1980px to 1530px
at 900px viewport, and the blank-when-static portion of that (the part a
static capture can't show) drops from ~1215px to ~630px — a 48% cut —
while the dark scene's own always-visible content nearly doubles (from
85vh to a full 100vh natural height). Reproduced with the same naive
full-page capture after the fix: the blank band is markedly smaller and
the dark scene now fills the entire viewport rather than a partial slice
of it. A real, interactive scroll-through afterward still shows zero
visible gap and the three-beat sequence still reads as a deliberate,
unhurried pause, not rushed — confirmed by screenshot at 250px steps
through the new (shorter) pin range.

**Final CTA.** Its own headline was already the exact approved copy
("Wherever you are in your journey, / we can begin there.") from the
original homepage rework — no change needed there. Verified by
screenshot that its spacing/hierarchy still reads correctly immediately
after FAQ, unaffected by every other section's changes.

**Verification.** `npm run lint` and `npm run build` clean. Full desktop
(1440×900) and mobile (390×844) screenshot passes across every section —
Hero, all six Journey stages, Immersive entry/mid/exit, Care, FAQ, Final
CTA — plus a real scroll-through at both widths (0 `pageerror`/
`console.error`, 0px horizontal overflow at either). Mobile confirmed
unchanged in spacing (only Journey's desktop `lg:` min-height moved;
Immersive's pin is desktop-only via its existing `DESKTOP_QUERY` gate,
so mobile never pins at all and was never subject to the dead-zone
mechanism in the first place).

### Validation
`npm run lint`, `npm run build` clean.

## 30. Immersive — a real emotional photograph, not just gradients and type

The dark scene relied entirely on abstract gradients/type; this pass adds
a fourth depth plane — `birth-support-hands-4x5.png` (two hands held
together), the asset the Journey rebuild (§27) had evaluated for a
support/connection moment and left unused for lack of a genuine slot.
This scene is that slot.

**Integration.** `immersive.secondaryMedia` (site-content.ts), rendered
in immersive-section.tsx as a new plane between the existing atmosphere
(fabric photo + brand mark + coral light field) and the text — anchored
to the right ~42% of the composition, desktop-only (`lg:block`).

**Treatment.** No card: no border, no shadow, no radius. Masked on every
edge with a soft radial `mask-image` (including the outer edge — nothing
to bleed into beyond it but the same dark tone, so a hard edge there
would read as a panel too). `brightness-[0.62] saturate-[0.85]` darkens
it, plus a warm ink→terracotta-deep gradient overlay (`mix-blend-
multiply`) ties its tones to the section's own espresso/coral base — it
never reads brighter than the rest of the scene.

**Layering.** Background atmosphere (fabric + mark + light, unchanged
from §28) → the new photo plane → scrim → text. The photo gets its own
restrained drift (±14px) on the same pinned timeline, between the mark's
rate and the light field's.

**Desktop/mobile.** Confirmed by screenshot: the photo reads clearly,
warm and dark, text now sits in a left-anchored `lg:max-w-[52%]` column
with real negative space to it. Mobile unchanged (photo hidden below
`lg`) — no regression.

### Validation
`npm run lint`, `npm run build` clean.

## 31. Hero → Philosophy: removing the hard seam

The problem, confirmed before touching anything: Hero (`min-h-dvh`,
normal document flow) and Philosophy (its own separate pinned scene)
were two structurally independent sections with zero coordination —
Hero's own bottom fade band was a static, unanimated gradient painted at
its own edge, and Philosophy's pin only ever engaged once its wrapper's
top reached the viewport top, by which point Hero had already scrolled
fully out of view. There was never a scroll range where both were
genuinely, simultaneously on screen — the "seam" was two self-contained
motion systems meeting at a plain DOM boundary.

**Architecture.** The smallest robust option that gave real, visible
overlap: a CSS-only negative-margin overlap plus two independent,
component-owned ScrollTriggers keyed to matching boundaries (not one
shared JS timeline object — each section only ever animates its own
elements).

- `globals.css` — `.hero-philosophy-overlap` (`margin-top: -32vh`) and
  `.philosophy-crossfade-mask`, both inside one raw media query,
  `@media (min-width: 769px) and (prefers-reduced-motion: no-preference)`
  — written as a literal query (not Tailwind's `motion-safe:`/breakpoint
  variants) so the 769px threshold matches `DESKTOP_QUERY` in
  motion/gsap-scroll.ts exactly; the physical overlap only makes sense
  paired with the JS trigger gated at the same width. Off by default
  (narrower viewport, or reduced motion): Philosophy starts normally
  after Hero, its complete resting layout — the classes are always
  present in the markup, only the media query decides, so server/client
  markup stays identical.
- `.hero-philosophy-overlap` applied directly to Philosophy's outermost
  `<section>` (not a nested child — avoids any parent/child margin-
  collapse ambiguity): its box physically starts 32vh higher, overlapping
  Hero's tail. Since Philosophy is the later DOM sibling, it paints over
  Hero in that overlap zone by default, no z-index needed.
- **Hero's own half** (hero-section.tsx): a new, self-contained
  ScrollTrigger (`trigger: <hero's own section ref>, start: "bottom 82%",
  end: "bottom 18%", scrub`) animating only Hero's own elements — the
  video (`scale 1→1.035`, `y 0→-14`, a deliberately subtle settle, not a
  "dramatic zoom") and the existing bottom fade band, now doing double
  duty as the "foreground fabric" (drifts further, `y 0→-34`, faster than
  the video, and widened from `--space-fade-strong` to `--space-fade-
  final` for "enough vertical space to be perceived").
- **Philosophy's own half** (philosophy-section.tsx): a second,
  independent ScrollTrigger using the *same* start/end boundaries,
  `trigger: document.getElementById("hero-section")` — a read-only
  scroll-position reference, never mutating Hero's elements — animating
  only Philosophy's own atmosphere photo (`autoAlpha 0→0.32`, `x 56→0`,
  "enters from the right very subtly," within the requested 40–70px) and
  first statement (`autoAlpha 0→1`, `y 38→0`). The two ScrollTriggers are
  "one coordinated timeline" in the sense that matters — identical scroll
  range drives both — without either component reaching into the other's
  DOM to animate it.
- Existing text exit (`useExitDrift`) untouched in mechanism, only its
  `minOpacity` tuned to 0 for Hero specifically (its only consumer,
  confirmed) so copy reaches true opacity 1→0, not a 0.25 floor.

**A real bug found and fixed mid-build, not assumed away.** The first
version crossfaded Philosophy's background (`bgEl`) opacity over scroll
*time* — which still paints a uniform tint across the section's entire
rectangular box at any single instant, so the box's own top edge (now
overlapping Hero) read as a hard horizontal line regardless of how faint
the tint was. Confirmed two ways, not assumed: by screenshot, and by
reading `bgEl`'s live computed `background-color` at that scroll
position (`rgba(253,250,248,0.5)` — a real 50% tint, sharply bounded by
the box). A hard edge needs a spatial fix, not a timing one: replaced
with `.philosophy-crossfade-mask` — a static `mask-image` (`linear-
gradient(to bottom, transparent 0%, black 38%)`) that keeps `bgEl`
permanently transparent at its own top edge and opaque by the fade's own
completion point, regardless of scroll position. `bgEl`'s only actual
colour animation is now, as before this pass, the existing pin timeline's
own paper→rose→paper breathe — the crossover no longer touches it at
all. Re-verified after the fix by sampling pixel colour down a vertical
column at the crossover's actual midpoint: a smooth, continuous gradient
with no sustained jump (one single-row spike from anti-aliased text, not
a background seam).

**Section geometry / nav.** No changes needed beyond the overlap itself —
confirmed by measurement that Philosophy's first statement is already
mid-reveal well before Hero's own bottom edge is reached, so there's no
blank gap. Nav height measured stable (80px) across the entire crossover
scroll range — no jump, no flash.

**Verification.** `npm run lint`/`npm run build` clean. Screenshots at
the three requested states (Hero ~75%, crossover midpoint, Philosophy
statement active) at 1440×900, plus a 250px-step sweep through the full
crossover range. Mobile (390×844) and reduced-motion (1440×900) both
confirmed via computed style: `margin-top: 0px` on Philosophy (overlap
inactive) and `transform: none` on Hero's video (no scale/drift) in both
cases — normal, non-overlapping flow, all content visible, no pin, no
scroll-jacking. A full scroll-through at 1440×900, 390×844 and 834×1112
afterward: 0 `pageerror`/`console.error`, 0px horizontal overflow at all
three.

### Validation
`npm run lint`, `npm run build` clean.

## 32. Lower-section image integration — Immersive, Care, FAQ, Final CTA

Six new approved photographs, all under `public/images/lower-sections/`,
wired into the four sections after Journey. Hero, the Hero→Philosophy
crossover, Philosophy and Journey itself were not touched.

**Dark emotional interlude** (immersive-section.tsx). The emotional
photo plane §30 added (birth-support-hands) is swapped for a purpose-made
asset, `dark-emotional-interlude.jpg` (a couple embracing) — the old
asset is unused again, not deleted or moved. Treatment mechanism is
unchanged (right-anchored ~42% strip, radial mask on every edge, no
card); `brightness` nudged 0.62→0.7 and `object-position` re-tuned for
the new composition specifically so the couple stays clearly legible,
per the brief's "do not blur so heavily the subject disappears." No
longer `aria-hidden` — a real embrace is meaningful, given its own alt
text rather than treated as decoration. Frame height `min-h-svh` →
`min-h-[92svh]` (within the requested 85–95svh); the pin's own scroll
distance (`end: "+=70%"`, from §29) was left exactly as is — "do not
restore the old 120–150vh treatment" means don't lengthen it, and it
was already short. Added a mobile-only compact version (`lg:hidden`,
top/bottom mask, same darkening) below the three lines of copy — the
brief's mobile section calls for "image integrated naturally below,"
which the previous (desktop-only) treatment didn't yet provide.

**Care & Trust** (care-section.tsx) — the largest change, a third
sticky visual column added alongside the existing sticky headline and
principle list, without touching the copy or the "no cards" hairline
treatment. `CareSection` now holds `activeIndex` state; each
`PrincipleBlock` still uses the existing `useScrollFocus` hook
unchanged, but now also reports its own focus up via a stable `onFocus`
callback (`setActiveIndex` passed directly — its identity never changes,
so this doesn't need memoisation to stay a correct effect dependency).
`CareVisual` is a `lg:sticky` frame (fixed `aspect-[1122/1402]`,
matching the photos' own ratio so nothing crops) holding all three
photographs absolutely stacked; only the one matching `activeIndex` is
revealed, via a plain CSS transition on `clip-path`/`opacity`/a 12px
`translate-y` — no new GSAP scene, since this is a state change (which
principle is focused), not a scroll-position effect. The frame itself
never moves or resizes between principles, only which panel is visible
does. No carousel controls of any kind. Below `lg`, `CareVisual` is
hidden entirely and each `PrincipleBlock` instead carries its own inline
photo directly below its own text — "principle text → corresponding
image," the same order the rest of the site's mobile layouts already
use. Under reduced motion, `useScrollFocus` reports every block
`focused: true` at once (no scroll-linked distinction to make); the new
`onFocus` effect is skipped in that case so the sticky visual just holds
on the first photo rather than snapping to whichever mounted last.
`objectPosition` set individually per photo (62/38, 38/42, 58/40) after
viewing each one directly — not the same value reused three times.

**FAQ** (faq-section.tsx) — one supporting photograph
(`faq-support-visual.jpg`, 1536×1024/3:2, used at that exact ratio so
nothing crops), not attached to any single question. Shares the
heading's own row: heading left, image right on desktop (`lg:flex`,
`items-end`), stacking compactly above the accordion on narrower
screens. Reuses the site's existing single-deep-corner radius for
consistency with Journey/Care's own photography rather than as a new
decorative frame; no shadow, no card background. The accordion itself,
its architecture, and DotFieldRegion's wrapping are all unchanged.

**Final CTA** (final-cta-section.tsx) — `final-cta-atmosphere.jpg`
added as a full-bleed background wash (`-z-10`, opacity 0.34) behind
the existing typographic content, with a `bg-ink/60` overlay on top of
it guaranteeing the headline/CTA hold full contrast — "only hints of
imagery," not a visible photograph. Its own drift reuses the existing
`useParallax` hook (factor 0.04) rather than a new ScrollTrigger scene,
per "no major new parallax chapter." Headline copy untouched (it was
already the exact approved text from the original rework).

**A real bug found and fixed, not just avoided.** Adding the background
image with a `scale-110` overscan (the same technique Hero's own video
already uses) introduced a measured 72px horizontal overflow at
1440px width (20px at 390px) — confirmed via `scrollWidth −
clientWidth`, not assumed. Root cause: unlike Hero's own section (which
already carries `overflow-hidden` for exactly this reason), Final CTA's
section never needed it before this pass and didn't have it. Fixed by
adding `overflow-hidden` to the section; re-verified at 0px overflow at
both widths, and confirmed with a full scroll-through sweep at 1440×900,
390×844 and a second mobile pass afterward — 0px throughout.

**Verification.** `npm run lint`/`npm run build` clean. Screenshots at
1440×900 covering the dark interlude, all three Care principles active
in turn (confirmed the image genuinely advances 01→02→03 in sync with
the text's own focus state, via a targeted scroll to each principle's
own index label rather than guessed offsets), FAQ and Final CTA: images
visible and correctly cropped, text stays the primary readable layer
throughout, no card treatment anywhere, no carousel controls. Mobile
(390×844) confirmed: dark interlude photo now appears below the copy,
each Care principle shows its own image beneath its text, FAQ's image
sits compact above the accordion, Final CTA stays atmosphere-only. Two
full scroll-through sweeps (desktop and mobile) after the overflow fix:
0 `pageerror`/`console.error`, 0px horizontal overflow both times.

### Validation
`npm run lint`, `npm run build` clean.

## 33. Care & Trust — a real accessibility gap under reduced motion

Confirmed, not assumed: §32's sticky image pane tracks `useScrollFocus`
state to decide which of the three photos to show, but that hook reports
every principle "focused" simultaneously under `prefers-reduced-motion`
(no scroll-linked distinction left to make) — `PrincipleBlock` already
skipped calling `onFocus` in that case, it just had nothing to fall back
to visually, so the pane froze on whichever photo happened to mount
first. Images 02 and 03 were silently lost for reduced-motion visitors.

Fixed with a CSS-only swap, not a JS/JSX branch on `reducedMotion` — the
same choice as the Hero→Philosophy crossover (§31), for the same reason:
branching element structure on a client-only value that can already
differ on first paint is exactly the hydration-mismatch class fixed in
§26. Both `CareVisual` (the sticky pane) and `PrincipleBlock`'s own
inline per-principle image (already built for the below-`lg` case)
render unconditionally, identical markup on every request; two new
classes (`.care-sticky-visual`/`.care-inline-visual`, globals.css) —
plain `display` toggles inside `@media (min-width: 1024px) and
(prefers-reduced-motion: no-preference)` — decide which is visible.
Below that combined condition (any width under reduced motion, or any
narrower viewport regardless of motion), the inline image wins by
default: a straightforward static structure, each principle with its
own photo right there, no scroll dependency, no clip-path transition,
no animation. At ≥1024px with motion allowed, nothing changed — the
existing sticky/scroll-focus behavior is untouched.

**Verification.** Computed `display` read directly (not inferred from
screenshots alone): desktop reduced-motion → sticky `none`, all three
inline images `block`; desktop normal motion → sticky `block`, inline
`none` (confirms the animated path is unchanged); mobile reduced-motion
→ same as desktop reduced-motion. Screenshots at 1440×900 and 390×844
under reduced motion confirm all three principles show their own photo.
0px horizontal overflow, 0 console errors, both widths.

### Validation
`npm run lint`, `npm run build` clean.

## 34. Composition fix — the dark scene's photo panel, Care's grid

Both fixes confirmed against a real complaint by screenshot before
changing anything, not assumed from the brief's own wording alone.

**Dark "A Moment" scene** (immersive-section.tsx). The photo still read
as "a panel attached to the text" even after §32's radial mask — the
mask was contained *within* a fixed `w-[42%]` box, so the box's own left
edge stayed a clear boundary no amount of internal softening could hide.
Fixed spatially: the box now spans `left-[38%]` to the true right edge
(no width cap), with a single left-to-right linear mask that only
reaches full opacity 42% of the way across that span — roughly a
quarter of the viewport is now a genuine gradient dissolve before the
photo, not a soft shape floating inside a hard box. No separate vertical
mask needed: the existing top/bottom `emergenceBand` layers already
paint over this photo's own top/bottom edges, later in the DOM. Frame
height `92svh` → `88svh` (within the requested 82–92svh). Text hierarchy:
inactive-line opacity `0.14` → `0.32` (a new `INACTIVE_OPACITY` constant,
both places it was hardcoded), within the requested 28–40%, not the
10–15% it was — a static mid-sequence screenshot now stays legibly
understandable. Motion: the brand mark's own drift `±18px` → `±7px`
("even slower" than the image's `±14px`, and now the slowest plane of
all four, not the fastest of the three behind the light field).

**Care & Trust** (care-section.tsx) — rebuilt from three grid columns to
two. The old headline/principle-text/far-right-image split left the
principle column too narrow for its own type scale (confirmed:
"understanding" / "your history" / "questions and" each wrapping onto
their own line) and stranded the image at the edge, disconnected from
the heading. Now `lg:grid-cols-[4fr_8fr]`: LEFT holds the sticky
headline with `CareVisual` (the same three-photo stacked/crossfaded
frame, unchanged mechanism) directly beneath it, sized to 80% of the
column's own width (capped 22rem/352px, not filling it) — RIGHT holds
the three principles in a column roughly twice as wide as before.
Typography retuned to fit: label `text-sm`(15px) → `text-xs`(13px, this
project's own token, within the requested 12–14px); statement
`text-2xl sm:text-3xl` (reaching 54px at wide viewports) → an explicit
`clamp(2rem,1.5rem+1.5vw,2.75rem)` (32–44px, matching the requested
range exactly) capped at `max-w-[38ch]`. Image radius switched from the
site's deep-corner "panel" signature to a small uniform `rounded-sm`,
per this pass's own explicit "minimal radius" instruction (superseding
the earlier "match Journey photography" note). The scroll-focus-driven
switching mechanism, the CSS-only reduced-motion fallback (§33), and the
mobile inline-image order are all untouched — only `CareVisual`'s
position (now inside the left column, no longer its own third column)
and its own sizing/radius changed.

**Verification.** `npm run lint`/`npm run build` clean. Screenshots at
1440×900 across the dark scene's full pin range and all three Care
principles (confirmed the left image genuinely switches 01→02→03 in
sync with the right column's own focus state — the query used to find
each principle by its own label text, not a bare "01"/"02"/"03", after
an earlier attempt with the bare number matched something else on the
page and produced a misleading scroll target) — both read as one
composition, not a panel-plus-text split or a three-column
fragmentation. Reduced motion re-confirmed via computed style after the
Care restructuring: sticky pane still `display:none`, all three inline
images still `display:block`. Two full scroll-through sweeps at
1440×900, 390×844 and 834×1112: 0 `pageerror`/`console.error`, 0px
horizontal overflow at all three.

### Validation
`npm run lint`, `npm run build` clean.

## 35. Hero → Philosophy crossover — six specific fixes, midpoint-verified

A targeted refinement of §31's crossover mechanics — six named issues,
each diagnosed against a real measurement or screenshot before touching
code, not assumed from the brief's own description alone.

**1. Horizontal seam.** Root cause: `.philosophy-crossfade-mask`'s
completion point was `38%` of `bgRef`'s *own* height — but `bgRef` spans
Philosophy's entire section (~225vh in practice, including the pin's own
reserved scroll distance), so 38% resolved around 85vh down, nearly
three times past the real `-32vh` physical overlap with Hero. Past the
actual overlap, `bgRef` was still partially transparent with nothing of
Hero left to blend with, letting the sitewide ambient background layer
show through faintly — a visible light band, confirmed by comparing the
mask's completion distance against the real overlap distance, not
assumed. Fixed by expressing the mask as an absolute `36vh` (not a
percentage) — a distance actually tied to the `-32vh` overlap it's
meant to cover.

**2. Ghosted/double image layers.** Root cause: Hero's video never faded
its own opacity — only the fabric band's fixed-strength gradient sat in
front of it — so the mother/baby frame stayed close to fully visible for
the *entire* crossover, directly underneath Philosophy's own content
fading in on top of it in the same screen region. Fixed: the video now
fades to 0.08 opacity (`duration: 0.5`, resolving right at the range's
own midpoint) — genuinely dissolving rather than just sitting there
while something else is layered over it.

**3. Philosophy image presence.** `bgImageRef`'s target opacity 0.32 →
0.36 (~12% relative increase, within the requested 10–15%) — both the
crossover's own `autoAlpha` target and the static CSS fallback (mobile/
reduced-motion resting state), kept in sync as one real value.

**4. First statement readable earlier.** Root cause, confirmed by
computing its own tween's progress at the range's midpoint rather than
assumed: it started at internal position 0.4 with a 0.5 duration,
finishing at 0.9 — only a fifth revealed by the midpoint. Retimed to
start at 0.05, duration 0.45, finishing exactly at 0.5 — fully readable
right at the target point instead of nearly at the end of the crossover.

**5. Fabric fades sooner.** Added an opacity fade to the fabric band
(1 → 0.25, `duration: 0.35` — faster than the video's own 0.5, and
resolving to "a soft trace," not zero) alongside its existing upward
drift, which never touched opacity before — it should bridge the scenes
briefly, not sit at full strength covering Philosophy's own composition
for the whole crossover.

**6. Shortened crossover.** Trigger range `"bottom 82%"`→`"bottom 18%"`
(a 64-point scroll span) → `"bottom 75%"`→`"bottom 25%"` (50 points, a
~22% cut, within the requested 20–25%) — identical in both
hero-section.tsx and philosophy-section.tsx, since the two effects are
synced only by sharing this exact boundary, not a shared JS object.

**A related observation, deliberately not acted on.** Measuring Hero's
text at the crossover's own midpoint found it at exactly 50% opacity/
-28px drift (`useExitDrift`, §24/§29) — not fully "gone." This is
pre-existing, unmodified behaviour: the hook fades across Hero's *entire*
scroll-through, and 450px (the midpoint of both the old 82–18 range and
the new 75–25 one — symmetric ranges always average to the same
scrollY) happens to be exactly half of Hero's own 900px height,
independent of anything changed in this pass. It's outside the six named
fixes and outside `useExitDrift`'s own established, approved behaviour
from earlier passes, so left untouched per "do not redesign either
section" — disclosed here rather than silently adjusted.

**Verification.** `npm run lint`/`npm run build` clean. The crossover's
exact midpoint computed from the new trigger geometry and confirmed via
live computed style, not assumed: video opacity `0.08`, fabric opacity
`0.25`, both exactly matching their tween's own target at that point.
Screenshots at 1440×900 at the midpoint and across a five-point sweep
around it (30–70% of the range) confirm: no visible seam, no doubled
photographic subject, the Philosophy woman clearly present, the first
statement legibly dominant, Hero's own content reduced to a faint trace
throughout. Mobile (390×844) and reduced motion (1440×900) reconfirmed
via computed style: `margin-top: 0px` (overlap inactive) and, under
reduced motion, `transform: none`/`opacity: 1` on Hero's video (no fade,
no drift) — both untouched by this pass, exactly as before. Three full
scroll-through sweeps (1440×900, 390×844, 834×1112): 0 `pageerror`/
`console.error`, 0px horizontal overflow at all three.

### Validation
`npm run lint`, `npm run build` clean.

## 36. FAQ — two-column layout, future-video-ready right panel

Rebuilt from §32's heading-and-thumbnail row into a genuine two-column
composition, ahead of a future looping video on the right.

**Grid.** A 12-column grid with explicit placement on all three
children (heading, visual, accordion) rather than relying on auto-flow
order — the visual's own `lg:row-span-2` needs the heading and accordion
on two known, distinct rows in the same 1–7 track to span alongside both
correctly. Heading: `col-start-1 col-span-7 row-start-1`. Visual:
`col-start-8 col-span-5 row-start-1 row-span-2` — starting at the *same*
row as the heading, not pinned to the viewport's top-right corner.
Accordion: `col-start-1 col-span-7 row-start-2`.

**Left width.** The accordion's own width is capped independently of
its grid column (`max-w-[700px]`, within the requested 620–760px) —
at very wide viewports the 7/12 column alone would exceed that.
Questions stayed at the existing `text-lg` (18px, already within the
requested 17–20px); row padding bumped `py-6` → `py-7` for "generous."
Heading uses the brief's own literal clamp (`clamp(3rem,4vw,4.8rem)`)
rather than this project's `--text-4xl`/`--text-5xl` tokens, both of
which reach further at wide viewports than the requested "restrained"
cap.

**Right panel — future-video-ready.** A new `FaqVisual` component: a
fixed-aspect (`aspect-[3/2]`, matching the source image exactly, so
nothing crops), `overflow-hidden`, minimal-radius (`rounded-sm`, not
the site's deep-corner "panel" signature — "minimal radius" was
explicit) wrapper, capped at `max-w-[40vw]` (within the requested
36–42vw). Today it holds the same `<Image>` as before; a code comment
on the component spells out exactly how a `<video>` would slot into the
*same* wrapper later (`muted loop playsInline`, `poster` = today's
image, no controls, autoplay only when `!reducedMotion`) — mirroring
Hero's own already-approved video pattern (hero-section.tsx, §26)
rather than inventing a new one: an unconditional element, motion
decided imperatively in an effect, never branching element type on
`reducedMotion` (the exact hydration-mismatch class fixed there). No
video asset exists yet, so none was added — image only, per the brief.
8–14px of parallax drift reuses the existing `useParallax` hook (no new
ScrollTrigger scene), gated to `minViewportWidth: 1024` and already
zeroing itself under reduced motion.

**Mobile order.** Heading → visual → accordion, chosen by comparing it
against accordion-first via screenshot — the visual reads better as an
early anchor before a five-question list than buried beneath it, and
matches the order the section already used before this pass.

**Verification.** `npm run lint`/`npm run build` clean. Screenshots at
1440×900 confirm: heading left, a large (not tiny, not full-bleed)
visual right that's clearly part of the same block rather than floating
near the corner, no oversized central gap, the accordion still opens/
closes correctly (verified by forcing one `<details>` open and
screenshotting it). Mobile (390×844): compact visual between heading
and the accordion, no horizontal overflow. Reduced motion: the panel's
own transform confirmed `matrix(1,0,0,1,0,0)` (no drift) via computed
style. Three full scroll-through sweeps (1440×900, 390×844, 834×1112):
0 `pageerror`/`console.error`, 0px horizontal overflow at all three.

### Validation
`npm run lint`, `npm run build` clean.

## 37. Dark + Care — wiring the two approved asset files

The brief pointed at "two approved image assets" whose filenames begin
`dark`/`care`, somewhere under `/public`. `/public/brand` turned out to
hold `dark.mp4` and `care.mp4` — video, not images, confirmed by
inspection rather than assumed from the brief's own wording. Both were
already-approved 10s/24fps/silent clips: `dark.mp4` (1280×720, hands
clasped in dim candlelight, subject right-of-frame — a natural fit for
the section's existing right-side composition); `care.mp4` (720×1280
portrait, a doctor attentively listening to a pregnant patient). No
`ffmpeg`/`ffprobe` in this environment; poster frames were extracted
with `opencv-python-headless` instead (frame 40 of each clip, JPEG
quality 88) — `dark-video-poster.jpg`, `care-video-poster.jpg`.

**Dark section.** The desktop/mobile photo swapped for `dark.mp4`,
reusing Hero's own established video pattern exactly (§26): an
unconditional `<video muted loop playsInline preload="metadata"
disablePictureInPicture disableRemotePlayback>`, identical markup
server and client, autoplay/pause decided only imperatively in a
`useEffect` keyed on `reducedMotion` — never branching element type on
a client-only value. `<video>` has no Next/Image `fill` equivalent and
globals.css only resets `img, svg` to `display: block` — not `video` —
so each new element needed an explicit `absolute inset-0 h-full w-full`
className to size correctly, where `Image fill` would have handled that
implicitly. The wrapping mask/gradient-dissolve geometry from §34
(`left-[38%] right-0`, `mask-image: linear-gradient(to right,
transparent 0%, black 42%)`) is untouched — only the content inside it
changed.

**Care section.** The three per-principle cycling photos (§32/§33) are
gone, replaced by one stable companion — `care.mp4`, sitting directly
below the heading, same position at every width, never swapped as
principles come into focus. That removed real state this file no
longer needed: `activeIndex`, the `onFocus` wiring between
`CareSection` and `PrincipleBlock`, the old three-photo stacked/
crossfaded `CareVisual`, and the CSS-only reduced-motion fallback that
used to swap between the sticky pane and each principle's own mobile
inline image (`.care-sticky-visual`/`.care-inline-visual`, deleted from
globals.css — confirmed via grep that nothing else referenced either
class before removing them). The new `CareVisual` reuses the same
imperative video-pause pattern as Hero/Dark, plus the existing
`useScrollReveal` and `useParallax` hooks for a restrained entry settle
and a small drift — nothing new written for either.

**A genuine bug, not an environment artifact.** Under
`prefers-reduced-motion: reduce`, the companion video rendered at
`opacity: 0` and stayed there indefinitely — confirmed reproducible
(5/5 runs, then an 8s `wait_for_function` that never resolved) and
confirmed *not* a stale-server artifact (only one `node.exe` listener
on the test port throughout). Root cause, isolated by comparing a
`console.log` inside the render body against the live DOM in the same
page load: `useScrollReveal` reports `revealed: true` from the very
*first* client render under reduced motion (its own doc comment: no
`IntersectionObserver` is ever attached), so — unlike `reducedMotion`
itself, which genuinely transitions `false → true` once real
`matchMedia` state lands post-hydration — there is never a *second*,
different render for this specific value. React's hydration only
reconciles structural mismatches (element/text), not arbitrary
attribute values, so the server-rendered `opacity-0 translate-y-3`
(computed build-time, no `window`) was never patched to match the
client's already-correct state — it simply had no subsequent render to
trigger a normal (non-hydration) reconciliation pass. This is why
nothing else in the session ever hit this class of bug: every other
reduced-motion-gated behaviour on the page (Hero's video, Dark's video,
Philosophy's crossover) is driven *imperatively*, through a `useEffect`
mutating a ref's DOM node directly, which runs regardless of hydration
attribute-patching; `CareVisual` was the first place a client-only
value drove a *JSX-attribute* branch instead. `care-section.tsx` is the
only current consumer of `useScrollReveal`, so the fix is scoped there
rather than to the shared hook: an always-present, CSS-only
`motion-reduce:translate-y-0 motion-reduce:opacity-100` on the reveal
div. `@media (prefers-reduced-motion: reduce)` is evaluated by the
browser itself, identically in server-rendered and client-rendered
markup, so there is nothing left to mismatch. Verified via computed
style post-fix (`opacity: 1`, `transform: none`, video `paused: true`)
on a fresh production build/port, desktop and mobile both.

**Verification.** `npm run lint`/`npm run build` clean. Screenshots at
1440×900 and 390×844 confirm: Dark's video bleeds to the right edge
with the existing gradient dissolve, text stable and readable, no
rectangular-card look; Care's video sits directly beneath the heading
on the left (not far-right), sized to the existing ~80%/22rem cap,
principles readable at their existing reduced type scale. Mobile:
Dark orders text→video with natural scrolling, no forced height; Care
orders heading→video→01/02/03, video shown once. Reduced motion: all
four video elements (Dark ×2 instances, Hero, Care) confirmed `paused:
true` via direct property check; Care's companion visual confirmed
visible (`opacity: 1`) after the fix, both breakpoints. Full scroll-
through sweeps at 1440×900 and 390×844: 0px horizontal overflow, 0
`pageerror`/`console.error`.

### Validation
`npm run lint`, `npm run build` clean.

## 38. Complete mobile responsive rework

Desktop (≥1024px, matching this codebase's own established `lg:` cutoff
for "the heavy machinery" — grids, pins, sticky columns) was explicitly
out of scope and reconfirmed untouched by screenshot at 1440×900 for
Hero, Care and Journey. Every change below is additive at `<lg` widths,
almost always via an explicit `lg:` override that restores the exact
pre-existing desktop formula, rather than reshaping a shared value.

**Header.** Added a mobile-only (`md:hidden`) logo — the header
previously carried no wordmark at all (a deliberate earlier decision,
"the hero carries the logo"), so once a visitor scrolled past Hero the
fixed header had zero brand presence. Same translucent-pill treatment
the nav links and menu toggle already use (`bg-paper/75 backdrop-blur-
md`) — without it, the raw logo image double-exposed against whatever
scrolled content sat behind the fixed header, confirmed by screenshot.
76px wide (inside the requested 75–90px), 44×44px menu toggle untouched.
`--header-height` drops to 4.25rem (68px, inside the requested 64–72px)
below 768px via a scoped media query in globals.css, at the same
breakpoint the header's own `md:` nav/menu split already uses — every
other consumer of that token (Hero's clearance padding) scales with it
automatically rather than needing its own override.

**Hero.** Headline: the sub-640px size was `text-2xl` (28–36px), well
under the requested ~2.6–4.2rem target; `sm:text-3xl` (640px+, already
covering every real desktop width) is untouched. Replaced with an
explicit clamp, deliberately capped lower than the brief's own literal
number once "Care that moves" — the longer of the two approved,
manually-broken lines — was confirmed by screenshot to wrap into an
orphaned "moves" at exactly 320px at the brief's suggested size;
`text-balance` added as a second line of defence. Composition,
video, and the rest of the copy stack are unchanged — already a
sensible mobile order (logo → eyebrow → headline → copy → CTA, media as
integrated background) confirmed by screenshot, not restructured.

**Hero → Philosophy.** Already correct on inspection: the cinematic
overlap/pin/crossfade (`hero-philosophy-overlap`, the GSAP crossover in
both sections) is gated to `(min-width: 769px) and (prefers-reduced-
motion: no-preference)` / `DESKTOP_QUERY` already, so mobile gets plain
document flow with no overlap and no pin — Philosophy's first statement
is simply visible immediately, not revealed on scroll. Hero's own fabric
dissolve band at its bottom edge is unconditional, giving the requested
"soft bottom dissolve" at every width already. No code changed here.

**Philosophy.** `min-h-svh` on the pin wrapper used to apply
unconditionally — the pin itself only ever engages at `DESKTOP_QUERY`,
so below `lg` this forced at least 100svh regardless of the four
statements' own much shorter content height, and `justify-center`
inside that oversized box opened up genuine empty space (confirmed by
screenshot) — exactly the "100vh sections"/"huge empty gaps" the brief
rules out. Gated to `lg:min-h-svh`; existing `py-(--space-section)`
already gives natural, content-sized spacing. Statement gap 40px/48px
(`gap-10`/`sm:gap-12`) → `gap-16` (64px, inside the requested 56–88px),
`lg:gap-12` restoring the exact original at real desktop widths.
Typography: both the three messages and the resolution line bottomed
out well under the requested ~2.4–3.5rem range (1.75rem/1.5rem); each
gets its own mobile-only clamp plus an `lg:` override restoring the
original formula exactly, plus `text-balance` (no existing manual line
breaks here to preserve, unlike Hero/Journey/Care).

**Journey.** Desktop zig-zag grid (`lg:grid-cols-12`) untouched; already
correctly single-column, same reading order (number → title → copy →
image) at every width below it — the text/image column-start classes
that create the alternation are all `lg:`-only, so DOM order alone
already governed mobile, no code change needed there. Three real fixes:
(1) `min-h-[85svh]` used to apply below `lg` too, forcing 85% of the
viewport tall regardless of each stage's own (often much shorter)
content — confirmed by screenshot as real empty space around a stage
like "Preparation" (one-line headline). Gated to `lg:min-h-[86svh]`;
`py-14` → `py-16` (64px, inside the requested 56–88px range) does the
spacing instead. (2) The image's `max-w-[26rem]` (416px) cap used to
hold below `lg` — harmless on phones (the column is already narrower
than that), but at tablet widths it left the image visibly smaller than
the text block above it with wide empty gutters, confirmed by
screenshot; `md:max-w-none` drops the cap starting exactly at the
768px tablet breakpoint. (3) The mobile left-edge path used to share the
same scroll-scrubbed draw/highlight mechanism as the desktop zig-zag
path — CSS visibility (not an explicit gate) decided which of the two
actually animated at a given width, so on mobile the "optional thin
vertical path" was itself scroll-driven, exactly what the brief rules
out. The mobile path pair is no longer in the effect's `pairs` array at
all — it renders once, at its plain static stroke, no dasharray/scroll
listener ever touches it (and, as a side effect, no `ScrollTrigger` is
even created on mobile now, since the desktop-only `pairs` array
resolves empty there — a small, genuine performance win alongside the
correctness fix).

**Dark section.** Same forced-height bug as Philosophy/Journey:
`min-h-[88svh]` on the pin frame applied unconditionally, even though
the pin effect above only ever engages at `DESKTOP_QUERY` — confirmed
by screenshot as a large blank dark panel below `lg`, with the (already
well-padded) content just centered inside it. Gated to `lg:min-h-
[88svh]`. Mobile order (eyebrow → two statements → resolution → video,
"text first, image integrated naturally below") and the video's own
compact `aspect-[16/10]` treatment were already correct, unchanged.

**Care & Trust.** Already correct on inspection — no `lg:sticky` below
`lg` (plain flow), single companion video shown once beneath the
heading (not per-principle, not far-right; that was §37's own rework),
principle typography already inside the requested ~1.8–2.5rem range.
One real fix: the heading clamp bottomed out at 2.25rem (36px), under
the requested ~2.6–3.8rem — a mobile-only clamp plus `lg:` override
restoring the original exactly (this section has no side-by-side layout
below `lg` to protect either way). `text-balance` added to the
principle statements (natural-wrapping sentences, no manual breaks to
preserve).

**FAQ.** One real bug: the visual panel's `max-w-[42vw]` had no `lg:`
gate, so it capped the panel to 42% of the *viewport* width at every
size — roughly a 160px-wide thumbnail at 390px, confirmed by measuring
its own rendered width, directly contradicting "full-width or nearly
full-width" on mobile. Removed below `lg`; the panel is `w-full` there
now, `lg:max-w-[40vw]` restores the original desktop panel size exactly.
Mobile order (heading → visual → accordion) was already correct — DOM
order, not a breakpoint override. `min-h-14` (56px, the brief's own
explicit floor) added to each accordion row alongside the existing
generous `py-7`; `text-balance` added to the question text.

**Final CTA.** Headline bottomed out at 2rem (32px), under the
requested ~2.4–3.4rem — mobile-only clamp, `sm:` restores the original
formula exactly (already the effective "desktop" boundary here, since
nothing overrode it further at `lg`/`xl`). Buttons: the primary
button and the secondary text link used to share one `flex-wrap` row at
every width, crowding two touch targets into one row on a narrow phone;
now `flex-col` (full-width primary button, stacked secondary link)
below `sm`, returning to the original single row at `sm`+.

**Spacing system.** No new token introduced — `--space-gutter`
(`clamp(1.25rem, 1rem + 2vw, 3rem)`, driving `.container-birthwave`'s
side padding already) computes to ~24px at 390px and ~31px at 768px,
already inside the requested 20–24px/32–40px ranges; `--space-section`/
`--space-section-sm` likewise already land inside the requested 64–88px/
40–56px bands at mobile widths. Existing tokens, reused as the
"semantic mobile gutter," not reinvented.

**Typography audit.** `text-balance` (Tailwind's `text-wrap: balance`)
added to every headline/statement element that wraps naturally with no
existing manual line breaks to preserve: Philosophy's messages and
resolution line, Care's principle statements, the FAQ question. Left
alone: Hero, Journey and Care's own headings, which are already
deliberately pre-broken into per-line `<span>`s/array items — adding
`balance` there wouldn't change anything a manual break doesn't already
control. No `<br>` tags added anywhere.

**Image crop audit.** No `objectPosition` values changed — every
photograph's crop was already tuned in earlier passes (§28 for Journey,
§37 for Dark/Care), and the only mobile-facing sizing changes here
(Journey's tablet cap, FAQ's viewport-width bug) scale the same fixed-
aspect-ratio frame uniformly rather than altering what's visible inside
it. Confirmed by screenshot at 390px for every Journey stage, Dark and
Care: faces, hands and the doctor/patient interaction all read clearly,
nothing awkwardly cropped.

**Reduced motion.** Re-verified after every change above, both normal
and reduced motion, at 320/360/390/430/768: static imagery, all text
visible, no scrubbed movement. One thing surfaced and deliberately not
"fixed": in `next dev`, a reduced-motion pass over Care logs a verbose
React hydration-mismatch warning (pre-existing, from §37's own
`motion-reduce:` CSS fix there — not introduced by this pass, and
`care-section.tsx` was not touched today). Re-tested against the actual
production build (`next build && next start`) specifically because
that's what ships: 0 console errors there, at every breakpoint, both
motion settings — confirmed rather than assumed, since dev-mode's
diagnostic verbosity doesn't reflect production behaviour.

**Verification.** `npm run lint`/`npm run build` clean. Full scroll-
through sweeps against the production build at 320×700, 360×800,
390×844, 430×932 and 768×1024, each in both normal and reduced motion:
0px horizontal overflow, 0 `pageerror`/`console.error` at all ten
combinations. Touch targets measured directly: menu toggle 44×44px,
mobile nav links 52px tall, FAQ rows 56px, header logo chip 53px tall —
all at or above the requested minimums. Desktop reconfirmed unchanged
by screenshot at 1440×900 (Hero, Care, Journey) after every change.

### Validation
`npm run lint`, `npm run build` clean.

## 39. Dark section — true full-bleed video background

Clarification on §38: the dark scene's video is now one true full-bleed
`absolute inset-0` background at every width, not §34's masked right-
side strip on desktop plus a separate compact block below the copy on
mobile. `immersive-section.tsx`'s single `<video>` (still
`photoVideoRef`, one play/pause effect — the second, mobile-only video
element and its ref are gone) now paints first, directly on the base ink
tone, full `h-full w-full object-cover`; the fabric texture, brand mark
and coral light field that used to be the section's only imagery now sit
in front of it, doing the "warm scrim for readability" work rather than
a purpose-built overlay invented for this pass.

Getting the video *visible* (not just full-bleed) took three follow-up
tuning passes, each confirmed by screenshot rather than assumed: the
fabric layer's 0.4 opacity was tuned for sitting directly on a plain
gradient, and read as fog once it stacked on top of real footage (→
0.14); the video's own darkening (0.7 brightness) and its warm
directional wash (35%/25% ink/terracotta-deep) were both tuned for a
strip that only covered ~60% of the section, so stretched full-width
they landed at full strength right behind the text column (brightness →
0.85, wash → 18%/14%); the radial center scrim (55% ink) was the third
layer stacked on top of both (→ 38%). Object-position also needed
retuning, not just widening: mobile's crop (`78% 62%`, `scale-115`,
replacing the old compact block's `70% 40%`) is tuned to the clasped
hands themselves, confirmed against the actual poster frame — the
video's subject sits lower-right of frame, and a wide, uncropped view
(the section's earlier `62% 42%` first attempt) diluted the hands into
the surrounding fabric rather than reading as the emotional moment the
brief asks for. Desktop keeps `72% 45%` (§34's original) and its own
`scale-125` overscan (still driving the pin effect's existing subtle
drift, untouched).

No other section touched, per the brief's explicit "do not modify any
other responsive work."

**Verification.** `npm run lint`/`npm run build` clean. Confirmed at
390×844 and 1440×900, both normal and reduced motion: the clasped hands
read clearly as real footage at both sizes (not abstract texture), full-
bleed with no separate mobile block, text holds contrast, natural/
compact section height on mobile (456px, unchanged from §38's fix; the
792px desktop figure under reduced motion matches `lg:min-h-[88svh]`
exactly — the much larger figure under normal motion is GSAP's own
pre-existing pin-spacer reserving its scroll distance in the section's
bounding rect, not a new height regression). 0px horizontal overflow, 0
console errors, all four combinations.

### Validation
`npm run lint`, `npm run build` clean.

## 40. Hero → Philosophy — one shared, smoothed scroll transition

A MotionSite reference (an external site, not this project) was supplied
for its scroll-tied cinematic interaction only — no copy, layout, nav,
colors, typography, mobile menu, video asset or 500vh architecture from
it. What was actually borrowed: **scroll progress → smoothed video scrub
→ sequential exit/entry handoff**, adapted onto Hero and Philosophy's own
existing content, video, copy and photograph, all otherwise untouched.

**New shared module** — `src/motion/hero-philosophy-transition.ts`. A
singleton scroll+rAF driver (one shared listener/loop for both
components, not two independent ones that could read slightly different
values), computing a transition-local progress `p = clamp01((scrollY -
heroTop) / distance)` — anchored to `#hero-section`'s own document
position via `getBoundingClientRect()` (`el.offsetTop` would read
relative to its nearest *positioned* ancestor, not the page — wrong here
by construction, caught before it shipped), never a global page-scroll
percentage. Smoothed via `current += (target - current) * (1 -
exp(-dt·τ))`, `τ = 8` (within the requested 7–9). Recomputed on
resize/orientationchange. Both sections subscribe via
`subscribeHeroPhilosophyProgress(callback)`; the underlying loop starts
on the first subscriber and stops once the last unsubscribes.

**Why not 180–220vh.** Two hard constraints rule it out: Hero is
`min-h-dvh` (≈one viewport, and this pass doesn't redesign Hero's
layout to manufacture more scroll room), and this project's own prior
tuning history is direct evidence the other way — §35 shortened an
equivalent crossover range specifically because a longer one measurably
"overstayed" its four short lines of content. Implemented at 65vh —
long enough for five legible phases, short of reproducing that same
problem, and bounded from above by needing to complete before
Philosophy's own pin engages (see below). Disclosed rather than
silently substituted, per the brief's own "smallest range that feels
smooth after visual testing" allowance.

**Video scrub — one owner.** Desktop + motion allowed:
`hero-section.tsx` pauses the video (`gsap.matchMedia(DESKTOP_QUERY)`,
the same breakpoint every GSAP scene on this page already keys to) and
maps `p` directly to `currentTime` across the clip's own real duration,
read from `loadedmetadata` rather than assumed. Duration and content
both confirmed by inspection first: `clean_herovideo.mp4` is a clean
10s/24fps loop with no bad frames at either end (checked against
extracted frames at 0/40/120/200/239, not assumed), so the whole clip
maps to the whole transition rather than a trimmed sub-range. Seeks are
threshold-throttled (`> 0.01s` delta). Below `lg`/reduced motion: the
video is untouched — same `.play()`/loop it always had, no scrub, no
rAF — GSAP and the custom rAF loop never contest the same property at
the same time by construction (one or the other runs, gated by the same
`matchMedia`/`reducedMotion` check that decides which does).

**Hero exit.** Two independently-timed groups, both driven by the same
`p`: eyebrow + subhead + CTA (not contiguous DOM siblings — the eyebrow
sits above the headline, the other two below it — so both read the
identical fade computed once, applied to two elements) fade over
0.22→0.40; the headline itself, `translateY 0→-45px` (the requested
-35/-55 range's midpoint) + opacity 1→0, over 0.28→0.48 — "supporting
copy/CTA fades first," per the brief.

**Philosophy entry.** The atmosphere photo enters over 0.42→0.72 (56px
→0, opacity 0→0.36, its existing static target). The first statement
was retimed from the brief's own suggested 0.56→0.78 to **0.46→0.66**:
at state C (p≈0.62, the brief's explicit "quality gate"), the original
range left it at ~28% opacity — confirmed by reading the live computed
style, not assumed — nowhere near "already readable," which the brief's
own VISUAL TARGET explicitly calls for at that checkpoint. Every other
phase's suggested range matched screenshots at all four QA states; only
this one moved.

**A real bug, caught by reading computed style, not assumed.** The
first statement stayed invisible at *every* progress value, including
1, until traced to its root cause: the pin timeline immediately below
(unchanged, existing) pre-renders `tl.to(beats[0], {autoAlpha: 0.16,
...})` — `beats[0]` genuinely is this same element — the moment its
scrubbed ScrollTrigger is created, before any scrolling, leaving
`visibility: hidden` on it. A plain `element.style.opacity` write
doesn't touch that. Fixed with a small `autoAlpha`-equivalent helper
(opacity + visibility together, hidden only at true 0 — mirroring why
the codebase's other GSAP tweens use `autoAlpha` rather than plain
opacity in the first place: not-yet-revealed content should stay out of
the accessibility tree until it actually is revealed).

**Ownership handoff, not a race.** Once real scroll reaches Philosophy's
own pin trigger ("top top" on its wrapper — read via the same
`getBoundingClientRect()`-based `documentTop`, for the same reason
`offsetTop` was wrong for Hero's own anchor above), the crossover
subscription simply stops writing to the atmosphere photo/first
statement and lets the (unchanged) pin timeline fully own them — by
design this handoff is invisible: `p` is already clamped at 1 (opacity
1, no offset — precisely what the pin's first tween expects to find) a
few vh before the pin can engage, confirmed by scrolling well past the
crossover and reading each beat's own opacity afterward: the pin
sequence's spotlight continues exactly as it always has. Hero's own
subscription needs no equivalent guard — nothing else ever touches
Hero's video/fabric/text after this transition, so it stays reactive
indefinitely (confirmed bidirectionally: scrolling back to the top
after scrolling deep into the crossover restores video opacity and
headline opacity to exactly 1).

**Mask/dissolve.** Unchanged, reused exactly as instructed: Hero's own
paper-tinted fabric band at its bottom edge (now fading via the shared
progress instead of its own GSAP tween) and Philosophy's
`.philosophy-crossfade-mask` (a static `mask-image`, not a scroll-driven
opacity tween — deliberately, per that class's own existing comment
about why a spatial mask avoids a hard seam where an opacity tween
wouldn't). No second, conflicting overlap system introduced — the
existing `-32vh` `hero-philosophy-overlap` CSS margin is untouched.

**Cleanup.** `useExitDrift` (the hook Hero's old single-column exit used)
is no longer imported by Hero — its own timing couldn't express "copy
fades before headline" as one shared value. Left in place in
`image-motion.ts`, documented as currently unused, rather than deleted:
still a reasonable general-purpose utility for some future section that
doesn't need per-element phase timing.

**Verification.** `npm run lint`/`npm run build` clean. All four QA
states (p≈0.20/0.45/0.62/0.82) captured at 1440×900 and cross-checked
against live computed style, not just screenshots: video opacity,
headline opacity/transform, and both message opacities all matched
their formulas within smoothing tolerance at every state. State C (the
quality gate) confirmed matching the brief's own description: headline/
CTA gone, Hero media softly visible, Philosophy woman emerging, first
statement clearly readable, no seam, no ghosting. Mobile (390×844):
video confirmed still autoplaying its normal loop (`paused: false`,
`currentTime` advancing on its own), not scroll-scrubbed — Hero→
Philosophy has no JS motion below `lg` either way, unchanged plain
document flow. Reduced motion: video confirmed paused at opacity 1, no
scroll-driven movement, Philosophy's default static stack fully visible
immediately — both because the relevant effects return early on
`reducedMotion` before ever touching an element, so server and initial
client markup stay identical. Full scroll-through sweeps at 1440×900
and 390×844, both motion settings: 0px horizontal overflow, 0
`pageerror`/`console.error`. Native `video.currentTime` seeking (no
mp4box/WebCodecs/frame-bank) read smoothly with no visible stutter
across every state tested — no case for that Phase 2 optimization was
observed.

### Validation
`npm run lint`, `npm run build` clean.

## 41. Hero → Philosophy crossover — final cleanup

Two issues screenshot QA found in §40's crossover: statement 02 could
appear before statement 01 was fully established, and a visible seam
remained around Hero's own bottom edge.

**Statement 02 appearing early — three attempts, one that actually
worked.** Root cause: Philosophy's pin `ScrollTrigger` reads real,
unsmoothed `scrollY` (further lagged by its own independent `scrub: 1`),
while the crossover reads its own separately-smoothed `p` — a fast
scroll can put real scroll well past the pin's trigger before the
crossover's own smoothing has caught up, so both end up writing to the
same elements in the same window. Confirmed by sampling computed opacity
immediately after both a simulated instant scroll jump and a realistic
fast incremental scroll (700px/200ms) — the bug reproduced clearly in
both, not just a synthetic edge case.

Two fixes were tried and rejected before the one that shipped, disclosed
here rather than silently dropped since both are real precedent:
1. Moving the shared driver from its own `requestAnimationFrame` loop
   onto `gsap.ticker` (hoping registration order would make this
   module's writes always run after ScrollTrigger's) plus a `"top
   top+=220"` trigger-start offset. Measurably insufficient — registration
   order across independently-mounting components isn't guaranteed, and
   the string offset had no measurable effect on where the pin actually
   engaged (confirmed by scrolling in 20px increments and watching where
   `beats[1]` actually started moving).
2. Building the pin timeline eagerly as before, but `disable()`-ing its
   `ScrollTrigger` immediately and `enable()`-ing it from the crossover
   at `HANDOFF_P` (0.72). Deterministic in theory. In practice,
   `.enable()` firing after real scroll had already moved past the
   trigger's old start made GSAP insert the pin's reserved scroll
   distance retroactively under the visitor, visibly disturbing
   `window.scrollY` itself — confirmed by the same computed-opacity
   sampling showing `firstMessage` collapse to 0 partway through a fast
   scroll, a strictly worse regression than the bug being fixed.

What shipped: the pin timeline's *construction* — not just whether it's
enabled — is deferred until the crossover's own `p` first reaches
`HANDOFF_P`, and its trigger's `start` is a function returning
`documentTop(wrapperEl) + 320` (a fixed buffer, not a string offset) so
real scroll can't reach it at all until well after this module's own
smoothing has caught up for any realistically fast scroll gesture.
`firstMessage`'s fully-established state is also asserted explicitly,
once, right before the pin is built — necessary because the very first
call this module ever makes to a fresh mount's `applyProgress` can
already have `p >= HANDOFF_P` (an instant/very-large scroll jump landing
past establishment before any intermediate value was ever produced),
which without the assertion left it stuck at its initial invisible
resting state forever. Statements 02/03/resolution needed no equivalent
per-frame override in the end — with construction itself deferred,
nothing ever touches them before hand-off, so their one-time `gsap.set`
resting value simply holds. Verified against both the instant-jump and
realistic-fast-scroll repros that exposed the original bug, plus reverse
scroll (scrolled deep into the pin sequence, then back to the very top):
Hero's video/headline opacity return to exactly 1, statement 01 to 0, no
stuck opacity or `visibility: hidden` anywhere.

**The horizontal seam.** Traced to Hero's own `overflow-hidden` clip at
its section's hard bottom edge (confirmed via `getBoundingClientRect`,
not assumed): `heroMediaFade`'s old shared range finished fading the
video well before that edge, leaving Hero's own `bg-paper-dim` base
exposed there — a measurably different tone from Philosophy's `bg-paper`
tint sitting right underneath for an extended stretch of scroll. Fixed
by widening and strengthening the existing fabric dissolve band (176px/
85% peak → a local-only `46svh`/~97% peak, using `--color-paper`
specifically, not the shared `--space-fade-final` token Immersive and
Final CTA also use) and layering three off-center radial blooms under
its base linear gradient so the edge reads as irregular rather than one
mathematically straight line. Verified with a pixel-level check, not
just a screenshot glance — sampled every row across a 300px band at
several x-positions for all four QA states and found zero color jumps
outside of legible text edges; a visible "line" in an early screenshot
review turned out to be a compressed-preview artifact, not a real
discontinuity, confirmed the same way.

**Hero media exit / Philosophy image timing.** `heroMediaFade` (one
shared range) split into `heroVideoFade` (0.44→0.72, reaching faint —
~13% — by the brief's own p≈0.68 checkpoint) and `heroFabricFade`
(0.52→0.9, floored at 55% rather than fading to 0, "still perceptible"
at the same checkpoint — confirmed against the live computed opacity of
both, not assumed). `philosophyImageEnter` moved earlier, 0.42→0.72 to
0.36→0.62, so the atmosphere photo is meaningfully present by the
crossover's own midpoint rather than the ~10% opacity the original range
gave it there.

**Verification.** `npm run lint`/`npm run build` clean. All four
requested QA states (p≈0.40/0.55/0.64/0.76) captured at 1440×900; p≈0.64
(the quality gate) matches the brief's own description exactly: headline
and CTA gone, mother/baby fading, fabric still softly visible, Philosophy
woman emerging, statement 01 clearly readable, statement 02 still quiet,
no seam. Reduced motion and 390×844 reconfirmed clean (0px overflow, 0
console errors, Philosophy's default static stack fully visible
immediately under reduced motion, Hero's video still autoplaying its
normal loop on mobile) — neither path runs any of this section's new
code, both return before ever subscribing. Full scroll-through sweeps at
1440×900 and 390×844, both motion settings: 0px horizontal overflow, 0
`pageerror`/`console.error`.

### Validation
`npm run lint`, `npm run build` clean.

## 42. Hero → Philosophy — final architecture (supersedes §40/§41)

§40/§41 describe a shared, smoothed scroll progress that both Hero and
Philosophy's own first statement read from — a single sticky viewport stage
Hero and the start of Philosophy lived inside together. That architecture
was replaced after screenshot QA found it structurally split Philosophy in
two: its atmosphere image and first statement lived inside Hero's own sticky
stage (sharing Hero's progress), while statements 2–4 lived in a second,
separate, plain section further down with no image and no shared atmosphere
— visibly broken (the woman image and warm background vanished the moment
statement 1 finished; the two sections could show simultaneously-active
statements or a gap depending on scroll speed, since they ran on two
different timing systems).

**Current, final architecture** — two fully independent, sequential,
non-overlapping systems, in plain document flow, no shared progress:

- **Hero** (`hero-section.tsx`) — a short (~150vh) `position: sticky`
  exit stage, its own progress source (`hero-transition.ts`,
  `subscribeHeroTransitionProgress`). Owns: Hero video scrub, Hero text
  exit (eyebrow/headline/subhead/CTA), Hero media fade, and the liquid/
  fabric transition veil (`transition-veil.ts`, a filled, blurred organic
  band — not a stroked line). Owns nothing else. Once its own stage
  releases, Philosophy is a normal section immediately following it.
- **Philosophy** (`philosophy-section.tsx`) — ONE continuous cinematic
  section: all four beats ("Pregnancy isn't a series of appointments,"
  "Birth isn't a single moment," "And care shouldn't begin and end at
  either," and the resolution, "One continuous journey of care") plus the
  atmospheric woman image, sharing one GSAP-pinned viewport
  (`pin: pinEl`, `end: "+=140%"`, landing at ~240vh total scroll distance)
  for the whole sequence. No relationship to Hero's progress at all — a
  normal, independent, self-contained pinned scroll scene that only
  engages once real scroll reaches its own wrapper, which can only happen
  after Hero's stage has already released.
  - Atmosphere image: a single, continuously-present layer, never
    removed or swapped after any one beat — its opacity breathes gently
    down across the whole sequence (one two-stage GSAP tween on the same
    timeline: ~0.32 at rest → ~0.26 mid-sequence → ~0.18 at the
    resolution).
  - Editorial positioning: statement 1 at 38% viewport height
    (upper-left), statement 2 at 40% (upper-right, mirrored), statement 3
    at 56% (lower-left), the resolution at 50% (centred, dominant) — all
    inside the required 28–68vh safe band. Each beat is `position:
    absolute; top: <its own %>` (CSS, static); the self-height correction
    and small (~28px) enter/exit travel are both composed via GSAP's
    `yPercent`/`y`, never a CSS `transform` utility (which a GSAP `y`
    tween would silently overwrite).
  - Sequential, non-overlapping crossfades: one beat's exit tween ends
    exactly where the next beat's enter tween begins — confirmed by
    reading computed opacity at every "active" checkpoint: exactly one
    beat above 0.88 opacity, the other three at exactly 0, every time.
- **Mobile (≤768px) and reduced motion (any width)**: both components fall
  back to plain, non-pinned, non-absolute document flow — Hero's own
  static fabric dissolve for the seam, Philosophy as one generously-spaced
  vertical stack of all four lines with the image present above them.
  Every structural positioning class in both components is
  `motion-safe:min-[769px]:`-gated, not just breakpoint-gated (a real bug
  caught and fixed during this rework: without the `motion-safe:` gate, a
  reduced-motion visitor at desktop width got the absolute/sticky
  treatment with nothing left to ever supply the compensating transform,
  rendering overlapping, illegible text).

Old files removed: `hero-philosophy-stage.tsx`, `philosophy-sequence.tsx`,
`hero-philosophy-transition.ts`, the restated "beat-0" duplicate of
statement 1, the `.hero-philosophy-overlap`/`.philosophy-crossfade-mask`
CSS. §40/§41 above are kept as historical record of what was tried and why,
not as a description of the current implementation.

## 43. Homepage stabilization — LOCKED

Final state, verified directly (not assumed):

- Hero and Philosophy are two sequential, independent systems — no shared
  progress, no cross-component handoff logic, no overlap.
- Philosophy is one continuous pinned section with four beats (statement
  1, statement 2, statement 3, resolution) and one persistent atmosphere
  image, never split across two sections.
- **Desktop QA passed** (1440×900): each of the four beats captured at its
  own active checkpoint — exactly one beat dominant each time, the
  atmosphere image present and breathing throughout, editorial positions
  (38%/40%/56%/50%) all inside the 28–68vh safe band, Philosophy → Journey
  handoff clean (no blank spacer, no repeated resolution text), reverse
  scroll pixel-equivalent to the forward sweep.
- **Mobile QA passed** (390×844): one natural, non-pinned Philosophy
  stack, image present, no duplicate statement, 0px horizontal overflow.
- **Reduced-motion QA passed**: one static, fully-readable composition at
  every width, no overlapping text, no hidden content.
- **Hydration passed**: 0 hydration warnings across normal-motion direct
  load, reduced-motion direct load, and a reduced-motion refresh.
- **Lint passed**: `npm run lint` clean.
- **Build passed**: `npm run build` clean (Next.js compile, TypeScript,
  static generation all succeeded).

See §42 for the architecture this locks in place, and the **HOMEPAGE
STATUS: LOCKED** banner at the top of this document for what "locked"
means going forward.

---

## 44. Hero → Philosophy — rebuilt off the pinned timeline (supersedes §40–43)

§42–43 locked a version where Hero was a `position: sticky` "exit stage"
(`hero-transition.ts`'s own scroll-scrubbed progress source driving the
video, a phased text exit, and an animated fabric veil) followed by
Philosophy as a GSAP `ScrollTrigger`-pinned, sentence-by-sentence timeline
(~240vh of reserved scroll distance, one of four beats revealed at a time).
Reported problem with that version, distinct from what §40 originally fixed:
visitors passed through an empty-or-logo-only interval before Philosophy's
wording ever appeared, then had to scroll through a long pinned sequence to
read four separately-revealed sentences.

**Root cause, addressed structurally, not by retuning:** both Hero's sticky
stage and Philosophy's pin reserved real scroll distance beyond their own
on-screen height, purely to run scroll-scrubbed choreography. Shortening
that distance (as earlier passes did, repeatedly) only ever shrank the
symptom; the reserved interval itself was the defect.

**Current architecture:**
- Hero (`hero-section.tsx`) is a normal, non-pinned, `min-h-dvh` section in
  plain document flow, at every breakpoint. Media, branding and copy are
  unchanged from the locked version. The video plays as a normal
  autoplaying loop (paused under reduced motion) — no more scroll-scrubbed
  `currentTime`. The text column's only scroll-linked behavior is
  `useExitDrift` (`image-motion.ts`, an existing utility, brought back into
  use rather than reinvented) — a small drift+fade whose floor is only
  reached once Hero has scrolled a full section-height past the viewport
  top, i.e. once it's already off-screen, so the copy stays fully readable
  for the entire time it's actually visible.
- The wave/fabric boundary is one short, static, hand-authored SVG curve at
  Hero's own bottom edge (`h-16`/`h-24`/`h-32` — a fixed slice of Hero's own
  height, not a separate scroll interval), the same "one authored bezier
  string" convention Journey's and Final CTA's own static lines already
  use. `hero-transition.ts` and `transition-veil.ts` (the scroll-scrubbed
  progress source and the per-frame animated veil geometry they existed
  to feed) are deleted.
- Philosophy (`philosophy-section.tsx`) is a normal, non-pinned,
  content-driven section: no `ScrollTrigger`, no pin-spacer, no per-beat
  absolute positioning. The eyebrow, the first statement (now the
  section's real `<h2>`) and a full-section background image are all
  present together the instant the section is in view. The remaining two
  statements read as supporting text beneath it, and the resolution closes
  the section — one coherent editorial composition, all four lines'
  wording unchanged. The standalone BirthWave wordmark Philosophy used to
  open on is removed; Hero's own logo is the only one on the page. The
  background image is full-bleed from `sm` up (with a readability gradient
  toward the text column, mirroring Hero's own scrim in the opposite
  direction) and a contained panel above the text below `sm` — not a
  0.32-opacity panel confined to the right, at any width.
- **Desktop QA passed** (1440×900, real scroll, not full-page capture):
  Hero's own height measured 900px (no extra reserved track); a 60px-step
  ivory-coverage sweep across the whole Hero→Philosophy handoff peaked at
  0.769 (never exceeding the 0.80 flat-ivory threshold); screenshots at
  six checkpoints (Hero full, Hero mid-scroll, the wave boundary,
  Philosophy entering, Philosophy full, the Journey handoff) all show
  meaningful content, no blank frame, no logo-only frame, image and
  wording entering together; reverse scroll and a fast-scroll round trip
  both landed pixel-consistent with a fresh load; resizing mid-scroll
  (1440×900 → 1024×768) produced no layout break and 0px horizontal
  overflow.
- **Mobile QA passed** (390×844): natural stacked flow throughout, no
  pinning, no forced heights, 0px horizontal overflow.
- **Reduced-motion QA passed**: both sections render fully static and
  fully readable, indistinguishable in content from the normal-motion
  screenshots.
- **Hydration**: 0 warnings across desktop, mobile and reduced-motion loads.
- **Lint**: `npm run lint` clean. **Types**: `npx tsc --noEmit` clean.
- **Build**: `npm run build` clean.

Journey, Dark Emotional, Care & Trust, FAQ and Final CTA were not modified.
`gsap-scroll.ts` (shared across those sections) was not modified.
