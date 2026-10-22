TASK
Refine the Doctors page editorial split-screen section in this Next.js + Tailwind v4 project.

FILES
- Main file: src/components/sections/doctors/doctors-editorial-split-screen.tsx (plus any child components it imports)
- Brand tokens (read only, do not edit): src/styles/tokens.css and the @theme block in src/app/globals.css
- Fonts are defined in src/app/layout.tsx (Poppins, Plus Jakarta Sans, Cormorant Garamond)

BRAND RULES (use existing tokens only, add no new hex values or fonts)
- Colours: ink #241A17, ink-soft #5B4A43, paper #FBF4F1, paper-dim #F3E3DD, terracotta #CA9585, terracotta-deep #8C5A4A, coral #F88379, sky #5DAEDB
- Borders: var(--color-border), var(--color-border-strong)
- Fonts: font-display (Poppins) for headings, font-body (Plus Jakarta Sans) for UI/body, font-serif (Cormorant Garamond) for the philosophy quote
- Motion easing: ease-signature. Radii: rounded-sm, rounded-md, rounded-full

CHANGES

1. Remove the chapter list
- Delete the "CHAPTERS" label and the numbered name list (01 Santoshi Nandigam ... 06 Adithi Nair) in the top-left of the sticky portrait panel, including its styles.
- Keep any active-index state that the portrait cross-fade or the counter still uses. Remove only state/logic used solely by the list.

2. Show each doctor's name only once
- The name and role must appear only in the right-hand content (large font-display heading + role line).
- Replace the large dark name plate at the bottom of the portrait with a small pill, positioned bottom-left (left: 40px, bottom: 40px), containing:
  - a 6px coral dot
  - the eyebrow text only, e.g. "01 · FOUNDER · OBSTETRICS" (font-body, 11px, font-semibold, tracking 0.18em, uppercase, text-paper)
  - background: color-mix(in srgb, var(--color-ink) 55%, transparent), backdrop-blur-md, rounded-full, padding 10px 18px, width fits content
- Bottom-right of the portrait: counter "01 / 06". Current number in font-display 40px text-paper; "/ 06" in 15px at 60% opacity; text-shadow 0 2px 12px rgb(36 26 23 / 0.35).
- No name or role text on the portrait. Keep the portrait image alt text with the doctor's name.
- Pill text and counter cross-fade together with the portrait (0.5s, ease-signature).

3. Fix the cramped care-journey pills (Planning, Pregnancy, Birth, Recovery, Newborn)
- Container: grid grid-cols-5 gap-2
- Each pill: rounded-full py-2.5 px-2 text-center font-body text-xs font-semibold uppercase tracking-[0.08em]
- Active: bg-coral text-ink
- Inactive: bg-transparent border border-[var(--color-border)] text-ink-soft
- Text must never touch the pill edges at 1024px width.

4. Keep right-column styling on-brand
- Eyebrow ("01 · FOUNDER · OBSTETRICS"): text-terracotta-deep
- Philosophy quote: font-serif italic text-ink, 2px terracotta left border
- Credential chips: border border-[var(--color-border-strong)] text-ink rounded-sm
- "Book with ..." button: bg-coral text-ink
- "Full profile →" link: text-ink, underlined

DO NOT CHANGE
- Portrait images, parallax, cross-fade timing, right-column content and order
- Mobile layout (< 1024px), the hero, the enquiry form, any other page or component
- tokens.css, globals.css, layout.tsx

ACCEPTANCE CHECKS
- Run the lint and type check (npm run lint, and npx tsc --noEmit) and fix any errors you introduce.
- At 1440px and 1024px widths:
  - no "CHAPTERS" list, nothing hidden under the navbar
  - each doctor's name appears only once on screen
  - the pill and counter are readable on both light and dark photos
  - all five care-journey pills fit their text
  - scrolling still switches the portrait correctly for all six doctors
  - no console errors

OUTPUT
When done, list the files you changed and summarise each change in one line.
