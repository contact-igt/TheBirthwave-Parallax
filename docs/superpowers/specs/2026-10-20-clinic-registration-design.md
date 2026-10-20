# Clinic Registration Flow (`/registration`)

Source brief: `TheBirthwave_Clinic_Registration_Claude_Code_Brief.md`; paper
form `Preview.pdf`. Path: architectural (new route, new API, shared rules,
analytics exclusion). The brief is the approved design input; this spec records
the decisions made while turning it into code.

## Goal

A branded, step-by-step walk-in registration for patients at the clinic
(kiosk/tablet/phone) that captures every field on the paper form and submits it
**only** to a protected, approved backend. The existing marketing site is
untouched apart from keeping Google Analytics off this route.

## Stages (7 counted + receipt)

Welcome (uncounted) → 1 Name → 2 Birth details (DOB, gender) → 3 Contact
(mobile, optional alternate mobile, optional email) → 4 Address → 5 Care
concerns → 6 How you heard about us → 7 Review & sign (summary with edit links,
privacy acknowledgement, signature) → Receipt.

Progress bar width = `step / (counted stages + 1)`: it is derived from the real
stage list and only reaches 100% on the receipt.

## Data and rules (`src/lib/registration/rules.ts`)

One dependency-free module shared by browser and server so both validate
identically.

| Field | Rule |
|---|---|
| fullName | 2–100 chars, letters/marks/space/`.'’-`, ≥2 letters |
| dob | day/month/year, real calendar date, not future, year ≥ 1900 |
| gender | `male` \| `female` (paper). `prefer_not_to_say` exists behind `ALLOW_PREFER_NOT_TO_SAY=false` until the clinic opts in |
| phone | Indian mobile, 10 digits starting 6–9; `+91`/`91`/`0` prefix tolerated; stored `+91XXXXXXXXXX`. Alternate optional, same rule |
| email | optional, ≤254, basic shape |
| address | line 1 required ≤120; line 2 optional ≤120; city required ≤60; state from fixed India list; PIN 6 digits, first 1–9 |
| concerns | ≥1 of `pregnancy, fertility, gynaecology, paediatrics, vbac, vaginismus, not_sure` (the first four are the paper form; VBAC and Vaginismus were added at the clinic’s request, wording taken from the site’s service pages); `not_sure` is exclusive |
| sources | ≥1 of `doctor, google_maps, google_search, friends_family, chatgpt, instagram, facebook, youtube, other`; `other` needs ≤80-char text |
| consent | must be `true` |
| signature | `drawn` (PNG data URL ≤ 200k chars) or `typed` (name ≥2 chars, flagged `typedPendingClinicApproval`) |

Registration date is never typed: shown read-only (Asia/Kolkata) and re-derived
server-side. Under-18 DOB or a Paediatrics concern sets
`guardianReviewRequired` for reception; no guardian questions are invented.

## Confidentiality design

- **Own endpoint** `POST /api/registrations`; never `/api/enquiries`.
- **Three activation gates**: `REGISTRATION_ENABLED=true`, an HTTPS
  `REGISTRATION_STORE_URL` whose host is in `REGISTRATION_STORE_ALLOWED_HOSTS`,
  and `REGISTRATION_STORE_TOKEN`. Google Apps Script/Sheets/Docs hosts are
  refused. Anything missing → `503 registration_unavailable`, never success.
- Success (`201`) is returned only after the store acknowledges with an id.
- Same-origin only, JSON only, ≤300 KB (enforced on bytes actually read),
  honeypot rejected, per-IP in-memory rate limit, idempotency key (client UUID
  per attempt) de-duplicated server-side and forwarded to the store.
- `Cache-Control: no-store`, `X-Robots-Tag`, `Referrer-Policy: no-referrer`,
  `X-Frame-Options: DENY` on the page and API; `noindex,nofollow` metadata;
  disallowed in `robots.txt`; absent from sitemap.
- No patient value is logged, stored in `localStorage`/`sessionStorage`/cookies
  or sent to analytics. Answers live only in React state; an idle timer and a
  post-receipt countdown clear them (kiosk reset).
- GA moves from the root layout into `SiteAnalytics`, a client component that
  renders nothing on `/registration` and sets `ga-disable-<ID>` there.

Known limits to resolve before go-live (reported, not hidden): in-memory rate
limit/dedupe is per server instance; typed signature legality; privacy wording;
retention; guardian policy; the actual storage destination.

## UI

Desktop/tablet landscape (≥1024px): 42% brand panel (cream wordmark,
`consultation2.webp` under an ink wash, Cormorant line, faint wave strokes,
single deep corner) + 58% paper question panel. Below 1024px: compact mauve
wordmark header + one full-width card; photo hidden. Poppins headings, Plus
Jakarta body, terracotta primary, sky/coral only as small accents. Option cards
≥56px, inputs ≥52px, buttons ≥48px. 180–260 ms fade/translate transitions,
disabled under `prefers-reduced-motion`. Focus moves to the step heading on each
step; polite live region announces "Step X of 7: …"; errors are inline, linked
with `aria-describedby`, and the first invalid field is focused. Enter advances
(except buttons/links); Back preserves answers.

Brand icons: five CC0 `simple-icons` glyph paths copied into `brand-glyphs.ts` (no runtime dependency) for Instagram, Facebook, YouTube, OpenAI/ChatGPT
and Google Maps pin; hand-authored four-colour Google "G" for Google Search;
Lucide for Doctor, Friends/Family, Other. Visible text labels always remain.

## Testing

- `node:test`: rules, API handler (injected store), policy checks
  (analytics, robots, sitemap, headers, no browser storage).
- Playwright (system Chrome via `playwright-core`) + axe-core: full flow at 360,
  390, 768, 1024, 1440; keyboard path; Back/edit; multi-select; validation;
  reduced motion; no GA requests on `/registration`, GA still on `/`; failed and
  duplicate submits; screenshots saved under `docs/registration-qa/`.
- `npm run lint`, `npx tsc --noEmit`, `npm run build`.
