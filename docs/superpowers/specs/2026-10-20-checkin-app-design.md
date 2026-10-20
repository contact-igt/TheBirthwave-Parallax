# Standalone clinic check-in app and waiting experience

Builds on `2026-10-20-clinic-registration-design.md` (the questionnaire is kept as is).
Branch: `registration-form` only. Never merged to `main`.

## 1. Isolation (`CLINIC_APP=checkin`)

One codebase, two build modes selected by the `CLINIC_APP` env var at build **and** run time.

- **site** (default, unchanged behaviour): the marketing site and `/registration` as shipped before.
- **checkin** (`checkin.thebirthwave.in`): `src/proxy.ts` rewrites `/` to the registration experience (URL stays `/`, no redirect)
  and answers `404` for every path outside an allow-list: `/`, `/registration`, `/thank-you`, `/staff`,
  `/api/registrations`, `/api/queue/*`, `/api/staff/*`, `/_next/*`, `/brand/*`, `/images/clinic/*`, `/icon.png`, `/favicon.ico`, `/robots.txt`.
- In checkin mode the root layout renders no JSON-LD and no analytics, metadata is `noindex` with no canonical,
  `robots.txt` disallows everything, `sitemap.xml` is empty, and all responses carry `no-store`/`no-referrer`/`X-Frame-Options: DENY`.
- Separate builds need separate `distDir`s locally (`NEXT_DIST_DIR`); on a host each project builds on its own.
- Hosting: no Vercel/Netlify config exists in the repo and no CLI/credentials are available here, so deployment is
  documented (`docs/checkin-deployment.md`): a second Vercel project on branch `registration-form`, `CLINIC_APP=checkin`,
  domain `checkin.thebirthwave.in`; `scripts/vercel-ignore-build.sh` stops the main project building this branch.
  Preview vs live is reported separately; nothing is claimed live without verification.

## 2. Backend contract (extends `docs/registration-deployment.md`)

The approved backend, not this app, owns numbering, queue and tokens.

| Call | Request | Response |
|---|---|---|
| Save (existing `STORE_URL`) | `{record, idempotencyKey, clinicId}` | `{ok:true, id, token?, sequence?, dayTotal?, checkedInAt?, clinicDate?, clinicId?}` |
| Status (`REGISTRATION_STATUS_URL`, optional) | `{token}` | `{ok:true, status:{reference, sequence?, dayTotal?, checkedInAt, clinicDate, state, queue?}}` |
| Staff (`QUEUE_ADMIN_URL`, optional) | `{action:"list", clinicId, clinicDate}` / `{action:"update", id, state}` | `{ok:true, entries:[…]}` / `{ok:true, entry}` |

- Daily number: assigned atomically **inside the same transaction** as the record insert and keyed by
  `(clinicId, clinicDate Asia/Kolkata)`; the idempotency key is unique so retries/refreshes return the same number.
  A Postgres reference is in `docs/checkin-backend-contract.md`. The app derives nothing and never increments.
- The app only *validates and shows* what comes back: `sequence` is displayed only when `checkedInAt` is a valid time,
  `clinicDate` equals its Asia/Kolkata date **and** today's clinic date, `clinicId` matches, and `sequence` is an integer 1–99999.
  Otherwise it silently falls back to the confirmed reference. `dayTotal` shows only if ≥ `sequence`.
- `token` must be ≥128 bits of backend-generated randomness (`^[A-Za-z0-9_-]{22,128}$`); shorter/odd tokens are discarded.
- Queue block `{live:true, confirmedByStaff:true, ahead:int≥0, estimateMinutes?:{min,max}, updatedAt}` is shown only when all
  checks pass: `ahead` comes from the real queue, never from `sequence`. No estimate, no countdown, no start time otherwise.
- States: `registered, checked_in, waiting, called, in_consultation, completed`.

## 3. Patient experience

- Header: official logo, "Clinic Check-in", "Your care begins here.", IST date (DD/MM/YYYY), "Need assistance?" disclosure
  (reception phone `+91 93630 31925`, from confirmed site content), step + percentage while in the questionnaire.
  No language switch: no tested Tamil translation exists.
- `/thank-you` (opaque token in the URL **fragment** so it never reaches servers, logs or Referer): registration card
  (confirmed, "Your registration today No. 018" or reference, date, check-in time, optional day total), waiting-status
  component, "While you're here", what-happens-next, help action. Wording for consultation: "A consultation usually takes
  around 10–20 minutes. We always take the time needed to listen, understand and care for you." Fallback: "Waiting time:
  Our reception team will update you."
- Shared tablet = start URL `/?kiosk=1`: after success show the card (and a QR to the private phone link when a token exists)
  for 45 s, then `location.replace` back to a blank `/?kiosk=1`; abandoned forms are wiped after 3+1 min (existing).
  Personal phone (no flag): no auto-erase, no idle wipe, "Done" closes the receipt.
- Live status refresh (30 s while visible + manual) only when the status endpoint is configured; shows "Last updated".

## 4. Staff console `/staff` (checkin mode only)

Off unless `STAFF_CONSOLE_ENABLED=true`, `STAFF_SESSION_SECRET` (≥32 chars), `STAFF_ACCOUNTS`, `QUEUE_ADMIN_URL`, `QUEUE_ADMIN_TOKEN`
are all set. Accounts are env-defined `{username, passwordHash (scrypt), role}`; login rate-limited; session is an
HMAC-signed `HttpOnly; Secure; SameSite=Strict` cookie (8 h); write calls need same-origin JSON. Console lists today's entries
and moves them between the six states. No public queue view exists.

## 5. Privacy

No analytics/pixels; no values in URLs (token only in fragment), logs (fixed event codes only), or browser storage; receipt kept
in module memory only; status/staff APIs `no-store`; status endpoint rate-limited against token guessing.
