# Deploying the clinic check-in app (`checkin.thebirthwave.in`)

**Status: not deployed.** No hosting credentials, DNS access or Vercel CLI were available
when this was built, so nothing is live and the subdomain has **not** been verified.
Everything below is what has been verified locally and what still has to be done.

## How isolation works

One repository, two deployments, chosen by the `CLINIC_APP` environment variable
(set at **build and runtime**):

| | Public website | Check-in app |
|---|---|---|
| Git branch | `main` (untouched) | `registration-form` |
| `CLINIC_APP` | unset | `checkin` |
| Domain | `www.thebirthwave.in` | `checkin.thebirthwave.in` |
| `/` | marketing home | the welcome/registration screen (rewrite, never a redirect) |
| Other site pages | normal | `404` (`src/proxy.ts` allow-list) |
| Analytics / JSON-LD / canonical / sitemap | normal | none; `noindex`; `robots.txt` disallows everything; empty sitemap |
| Response headers | normal | `no-store`, `no-referrer`, `X-Frame-Options: DENY`, `X-Robots-Tag: noindex` |

Never merge `registration-form` into `main` and do not open a PR into `main`.

## 1. Create a separate Vercel project (recommended host)

The repo has no hosting configuration; Vercel is assumed because it is the default for Next.js.
If another host is used, apply the same rules (own project, production branch
`registration-form`, `CLINIC_APP=checkin`, independent env vars).

1. Vercel → **Add New → Project** → import `contact-igt/TheBirthwave-Parallax` **a second time**
   (name it e.g. `birthwave-checkin`). Leave the existing website project alone.
2. **Settings → Git → Production Branch:** `registration-form`.
3. **Settings → Environment Variables** (Production; add Preview only if previews are needed,
   and protect previews, see below):

   | Variable | Value |
   |---|---|
   | `CLINIC_APP` | `checkin` |
   | `CHECKIN_ORIGIN` | `https://checkin.thebirthwave.in` |
   | `CLINIC_LOCATION_ID` | clinic location id used by the backend (default `main`) |
   | `REGISTRATION_ENABLED` | `true` **only after clinic go-live approval** |
   | `REGISTRATION_STORE_URL` | approved HTTPS intake endpoint |
   | `REGISTRATION_STATUS_URL` | approved HTTPS status endpoint (optional) |
   | `REGISTRATION_STORE_ALLOWED_HOSTS` | comma list containing the hosts above |
   | `REGISTRATION_STORE_TOKEN` | bearer credential for intake/status |
   | `STAFF_CONSOLE_ENABLED` | `true` to switch on `/staff` |
   | `STAFF_SESSION_SECRET` | ≥32 random characters |
   | `STAFF_ACCOUNTS` | JSON, see below |
   | `QUEUE_ADMIN_URL` / `QUEUE_ADMIN_TOKEN` | approved queue-admin endpoint and credential |

   Do not reuse any variable from the website project, and never commit these values.
4. **Settings → Domains:** add `checkin.thebirthwave.in`.
5. **DNS (at the registrar for `thebirthwave.in`):** `CNAME checkin → cname.vercel-dns.com`
   (use the exact target Vercel shows on the Domains page).
6. **Settings → Deployment Protection:** keep preview deployments protected (Vercel
   Authentication/password) so patient screens are not public before go-live.
7. In the **website** project make sure the `registration-form` branch does not build.
   `vercel.json` + `scripts/vercel-ignore-build.sh` already skip it automatically
   (the website project is recognised by having neither `CLINIC_APP=checkin` nor the
   check-in production domain). Confirm in **Settings → Git → Ignored Build Step** that the
   command is `bash scripts/vercel-ignore-build.sh` (read from `vercel.json`) and, if you prefer,
   also disable Preview deployments for that branch there.

### Staff accounts

```bash
printf '%s' 'a-strong-password-here' | node scripts/hash-staff-password.mjs
```

Put the output into `STAFF_ACCOUNTS`:
`[{"username":"reception1","passwordHash":"scrypt$…","role":"reception"},{"username":"doctor1","passwordHash":"scrypt$…","role":"clinician"}]`
(reception can set every status; clinicians can set called / in consultation / completed only).
The console is at `https://checkin.thebirthwave.in/staff`. Sessions last 8 hours.

### Devices

- **Shared clinic tablet:** open `https://checkin.thebirthwave.in/?kiosk=1` in kiosk/guided-access mode.
  After submission it shows the receipt (and a QR to the patient's private status link) for 45 s, then reloads
  to a blank welcome screen. Abandoned forms are wiped after 3 + 1 minutes.
- **Patient phone:** the plain URL (or the QR link). Nothing is wiped on a timer; "Done" closes the receipt.

## 2. What must exist before this works for patients

1. The approved backend implementing `docs/checkin-backend-contract.md` (atomic daily numbering in
   Asia/Kolkata, idempotency, token, optional status and queue-admin endpoints).
2. Clinic sign-off on the open questions in `docs/registration-deployment.md`.
3. Staff accounts and reception training for the queue console.

Until `REGISTRATION_ENABLED=true` and a backend are configured the app answers `503`
and never shows a success page; the queue/status features simply stay off and the page
shows "Waiting time: Our reception team will update you."

## 3. Verify after deploying (do not claim "live" until all pass)

```bash
curl -sI https://checkin.thebirthwave.in/        # 200, cache-control: no-store, x-robots-tag: noindex, no Location header
curl -s  https://checkin.thebirthwave.in/robots.txt          # Disallow: /
curl -s -o /dev/null -w '%{http_code}\n' https://checkin.thebirthwave.in/services   # 404
curl -s  https://checkin.thebirthwave.in/ | grep -ci -E 'googletagmanager|ld\+json|canonical'   # 0
curl -sI https://www.thebirthwave.in/            # website unchanged
```

Then run one real test registration with a clinic-approved test record and confirm the number
in the backend matches the number on the receipt.

## Verified locally (not on the subdomain)

`npm run build` (website mode) and `npm run build:checkin` (check-in mode) both succeed;
`npm test` and the Playwright suites (`npm run test:e2e`, `npm run test:e2e:checkin`) pass
against local servers and a local HTTPS test double of the backend.
