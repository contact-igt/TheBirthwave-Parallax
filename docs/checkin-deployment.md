# Deploying the clinic check-in app (`checkin.thebirthwave.in`)

**Status (20 Oct 2026): not deployed. The subdomain is NOT live and has not been verified.**

Why: creating the project needs access this environment does not have: no Vercel login/token, no Vercel CLI,
no connected browser session, and no registrar (GoDaddy) access. What *has* been verified:

- GitHub shows the repository is already connected to a Vercel project, `the-birthwave-parallax`
  (team `invictus-global-tech1`, the public website). The guard in `vercel.json` works there: the
  `a5a0ffa` push was **"Canceled by Ignored Build Step"**, so that project no longer builds this branch.
- The public website is unaffected: production is still `b82ccd5` (`main`), `www.thebirthwave.in/registration`,
  `/thank-you` and `/staff` return 404, Google Analytics is still present.
- DNS today: `thebirthwave.in` uses GoDaddy name servers (`ns57/ns58.domaincontrol.com`); `www` is a CNAME to a Vercel
  target; there is **no** `checkin` record yet.
- The check-in build (`CLINIC_APP=checkin`) compiles and passes the automated suites locally (see the end of this file).

> **Heads-up, existing preview:** the first push of this branch (`0da0f19`, before the guard existed) produced a
> *Preview* deployment on the **website** project: `https://the-birthwave-parallax-1rvuh3g90-invictus-global-tech1.vercel.app`.
> It is publicly reachable (HTTP 200, no Vercel login) and serves the old `/registration` page. Submissions are
> disabled there (no backend configured), so no data can be stored, but it should be deleted or protected:
> Vercel → `the-birthwave-parallax` → Deployments → that preview → ⋯ → Delete (or enable Vercel Authentication under
> Settings → Deployment Protection). It does not affect production.

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

1. Vercel (team `invictus-global-tech1`) → **Add New → Project** → import `contact-igt/TheBirthwave-Parallax`
   **again** and name it `birthwave-checkin`. Framework: Next.js (auto). **Before pressing Deploy**, open
   *Environment Variables* and paste the non-secret block from `docs/checkin.env.example`
   (`CLINIC_APP=checkin`, `CHECKIN_ORIGIN`, `CLINIC_LOCATION_ID`). Leave the website project alone.
2. Import deploys the default branch (`main`) once. That first build is the plain website code on a
   `*.vercel.app` URL of the new project, so **cancel it** (Deployments → ⋯ → Cancel) or ignore it, and **do not
   attach the domain yet**.
3. **Settings → Git → Production Branch:** change `main` to `registration-form`. Then **Deployments → Redeploy**
   the latest `registration-form` build (or push an empty commit to that branch). `vercel.json` makes this project
   build only that branch.
   Keep **Settings → Environment Variables → Automatically expose System Environment Variables** ON
   (the build guard reads `VERCEL_PROJECT_PRODUCTION_URL`).
   Secrets (backend token, staff secrets) are added later, only after clinic sign-off; see `docs/checkin.env.example`.
4. **Settings → Domains:** add `checkin.thebirthwave.in` (after step 3 succeeded).
5. **DNS at GoDaddy** (the active name servers): add one record
   `Type CNAME · Name checkin · Value <the target Vercel shows on the Domains page> · TTL 1 hour`.
   Vercel normally shows a project-specific value like `xxxxxxxx.vercel-dns-016.com` (the website uses that style);
   `cname.vercel-dns.com` also works. Do not touch the existing `www` or apex records. HTTPS is issued automatically
   once the record resolves (usually minutes).
6. **Protected review link:** keep **Settings → Deployment Protection → Vercel Authentication** on for previews.
   For a clinic reviewer without a Vercel account open the deployment and use **Share** to create a Shareable Link
   (a bypass token URL that works from any phone), or enable Password Protection if the plan includes it. Remove the
   protection exception once the real domain is approved.
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
