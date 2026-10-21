TASK
Convert the Doctors page editorial split-screen section into a premium HORIZONTAL-SCROLL profile gallery on desktop. Vertical page scroll should move the doctor profiles sideways, one full profile at a time. On mobile, the same profiles become a native swipe carousel.

PROJECT CONTEXT
- Next.js 16 + React 19 + Tailwind v4. GSAP 3 is already installed (use gsap + ScrollTrigger; do not add new packages).
- Main file: src/components/sections/doctors/doctors-editorial-split-screen.tsx (plus child components it imports). Keep the same export name so src/app/doctors/page.tsx does not need changes.
- Doctor data: src/content/doctors-content.ts (reuse it; do not duplicate data).
- Brand tokens (read only): src/styles/tokens.css and the @theme block in src/app/globals.css. Fonts are set in src/app/layout.tsx.

BRAND RULES (existing tokens only, no new hex values or fonts)
- Colours: ink #241A17, ink-soft #5B4A43, paper #FBF4F1, paper-dim #F3E3DD, terracotta #CA9585, terracotta-deep #8C5A4A, coral #F88379
- Borders: var(--color-border), var(--color-border-strong)
- Fonts: font-display (Poppins) headings, font-body (Plus Jakarta Sans) UI/body, font-serif (Cormorant Garamond) philosophy quote
- Easing: ease-signature (cubic-bezier(0.22, 1, 0.36, 1)). Radii: rounded-sm, rounded-md, rounded-full

DESKTOP LAYOUT (min-width: 1024px)

1. Pinned horizontal track
- The section pins for 100vh (account for the fixed navbar: content starts below it, nothing hidden under it).
- Inside, a horizontal track holds one PANEL per doctor in this order: Dr. Santoshi Nandigam, Dr. Bharathy Kandasamy, Dr. Deepika Sivathanu, Sheethal Sathya, Dr. Amudha Varshini, Dr. Adithi Nair.
- Use gsap ScrollTrigger: pin: true, scrub: 1, end = "+=" + (track scrollWidth - viewport width). Snap to each panel (snap: 1 / (panels - 1), duration 0.6, ease "power2.out").
- Each panel is 86vw wide with a 4vw gap, so ~10% of the next panel peeks in from the right, signalling more to scroll.

2. Panel design (each doctor)
- Panel: bg-paper, rounded-md, subtle shadow (0 30px 60px -40px rgb(36 26 23 / 0.35)), overflow hidden, height = viewport height minus navbar minus 64px.
- Left 45%: portrait, full height, object-fit cover. Inner horizontal parallax: as the panel moves, translate the image from x: 6% to x: -6% (containerAnimation-based ScrollTrigger tied to the main horizontal tween), scale 1.08.
- Small pill on the portrait, bottom-left: 6px coral dot + eyebrow text only (e.g. "01 · FOUNDER · OBSTETRICS"), font-body 11px semibold uppercase tracking 0.18em text-paper, background color-mix(in srgb, var(--color-ink) 55%, transparent), backdrop-blur-md, rounded-full, padding 10px 18px. NO name on the portrait.
- Right 55%: content, vertically centred, padding 64px:
  - eyebrow: text-terracotta-deep, 12px, uppercase, tracking 0.22em
  - name: font-display, text-h2 size, text-ink (the ONLY place the name appears)
  - role line: font-body 17px text-ink-soft
  - philosophy quote: font-serif italic text-ink ~24px, 2px terracotta left border, max-width 34rem
  - CREDENTIALS label + chips: border border-[var(--color-border-strong)] rounded-sm text-ink
  - ROLE IN YOUR CARE JOURNEY label + 5 pills (Planning, Pregnancy, Birth, Recovery, Newborn): grid grid-cols-5 gap-2; each rounded-full py-2.5 px-2 text-center text-xs font-semibold uppercase tracking-[0.08em]; active bg-coral text-ink; inactive border border-[var(--color-border)] text-ink-soft. Then the one-line role description.
  - Buttons: "Book with {name}" bg-coral text-ink rounded-full (pre-fills the enquiry form's practitioner if that field exists) + "Full profile →" text-ink underlined link to /doctors/{slug}.
- Content entrance: when a panel becomes active, its right-side elements fade/slide up in a stagger (y: 24 → 0, opacity 0 → 1, 0.06s stagger, 0.7s, ease-signature). Inactive panels: opacity 0.55 and scale 0.96, active panel opacity 1 and scale 1 (animate smoothly with scrub).

3. Navigation bar under the track (fixed inside the pinned area, bottom)
- Left: counter "01 / 06" (current number font-display 32px text-ink, "/ 06" 14px text-ink-soft).
- Centre: thin progress line (2px, bg-[var(--color-border)], fill bg-ink) showing overall progress.
- Right: two round buttons (prev: outline ink, next: bg-ink text-paper, 48px, lucide ChevronLeft / ChevronRight icons, aria-labels "Previous doctor" / "Next doctor"). Clicking scrolls the page to the matching panel position (use the ScrollTrigger start/end to compute the scroll position; smooth scroll).
- Keyboard: Left/Right arrow keys move to previous/next panel only while the section is pinned and focused (do not add a global listener that hijacks arrows elsewhere).

4. Remove from this section
- The old "CHAPTERS" name list and the old large name plate on the portrait.

MOBILE / TABLET (below 1024px): SWIPE GALLERY
- No pinning and no scroll-jacking. Use a native horizontal swipe carousel: overflow-x: auto, scroll-snap-type: x mandatory, each card scroll-snap-align: start, hidden scrollbar, -webkit-overflow-scrolling: touch.
- Header above the carousel: eyebrow "OUR CARE TEAM" (text-terracotta-deep) + title "Meet your specialists" (font-display 22px) on the left, counter "01 / 06" on the right.
- Card width: calc(100vw - 64px) (max 420px), gap 12px, side padding 20px, so ~20px of the next card peeks in. Card height fits the remaining viewport (100svh minus navbar, header and dots; min 600px). Cards: bg-paper rounded-md shadow, overflow hidden.
- Card content:
  - photo 236px tall, object-fit cover, with the same small eyebrow pill bottom-left (10px text)
  - name font-display 24px, role 13px text-ink-soft
  - philosophy quote font-serif italic 17px, terracotta 2px left border, clamped to 3 lines
  - credential chips (11px)
  - "CARE JOURNEY" label + the 5 stage pills wrapping in a flex row (10px uppercase; active bg-coral text-ink, inactive bordered text-ink-soft)
  - bottom row: "Book with {first name}" full-width bg-coral button + 46px round outline button with an arrow icon linking to the full profile (aria-label "Full profile of {name}")
- Active card (the one snapped in view, tracked with an IntersectionObserver or scrollLeft / card width): scale 1 and opacity 1; other cards scale 0.96 and opacity 0.6 (0.5s ease-signature).
- Below the carousel: dot indicators (active dot widens to 22px, bg-ink; others 6px, ink at 25%) and the hint text "Swipe to meet the team →". Counter and dots update on swipe.
- Hide the desktop prev/next bar on mobile.

ACCESSIBILITY AND PERFORMANCE
- prefers-reduced-motion: desktop shows no pin, no parallax and no snap (use the mobile swipe carousel layout instead); no scale/opacity transitions on cards.
- Use next/image with proper sizes for portraits; priority only on the first portrait.
- Create all GSAP animations inside gsap.context / useGSAP-style cleanup in useEffect and revert on unmount and on breakpoint change (gsap.matchMedia).
- Refresh ScrollTrigger after images load so the pin length is correct.

DO NOT CHANGE
- The doctors hero, the enquiry form, other sections on the page, other pages, tokens.css, globals.css, layout.tsx, the doctor data values.

ACCEPTANCE CHECKS
- npm run lint and npx tsc --noEmit pass with no new errors.
- At 1440px and 1280px: scrolling down moves the panels sideways and snaps one doctor at a time; the next panel peeks from the right; nothing hides under the navbar; each name appears once; the five care-journey pills fit their text; counter, progress and arrows stay in sync; after the last doctor the page continues to the next section normally.
- At 1023px, 390px and 360px: swipe carousel works with touch, snaps one card at a time, next card peeks, counter and dots update, all card content fits without inner scrolling, and the PAGE itself has no horizontal scroll bar.
- No console errors or hydration warnings.

OUTPUT
List the files you changed and summarise each change in one line.
