# Check-in app and waiting experience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans (native, this session).

**Goal:** Turn the registration flow into an isolated check-in app with real daily numbering, truthful waiting status and a staff queue console.
**Architecture:** `CLINIC_APP` mode switch + `src/proxy.ts`; backend-owned numbering/queue validated by dependency-free modules; token in URL fragment.
**Tech Stack:** Next 16.3.4, React 19, TypeScript, CSS modules, node:test, playwright-core, `qrcode-generator` (only new dependency).
**Spec:** `docs/superpowers/specs/2026-10-20-checkin-app-design.md`

## Global Constraints
- Work only on `registration-form`; no PR, no merge, no push to `main`.
- Never show success unless the store confirmed; never fabricate sequence, queue position, estimate or countdown.
- No analytics/pixels/storage/logging of patient values; token never in a path or query string.
- Consultation "10–20 minutes" wording is typical consultation length, never a wait time.

## Review Focus
1. Midnight rollover (IST) returns a number for yesterday → must not be shown as today's.
2. Store returns sequence without checkedInAt/with wrong clinicId → show reference only.
3. Same idempotency key replayed (refresh/retry) → same receipt, one store call.
4. Token guessing / malformed token on `/api/queue/status` → 400/404, rate-limited, no data.
5. Staff cookie forged/expired/other-origin write → 401/403.

## Tasks
1. **Mode isolation** — `src/lib/app-mode.ts` (`isCheckinApp(): boolean`, `CHECKIN_ALLOWED`), `src/proxy.ts`, `src/app/layout.tsx` (`generateMetadata`), `robots.ts`, `sitemap.ts`, `next.config.ts` (headers, `distDir`), `private-routes.ts`; tests `checkin-isolation.test.mjs`.
2. **Receipt + queue validation** — `src/lib/registration/receipt.ts` (`parseSaveResponse`, `parseStatus`, `STATES`, `isValidToken`); tests in `checkin-receipt.test.mjs` (Review Focus 1–2).
3. **Handler/store** — store returns `SaveResult`; handler caches receipts per idempotency key; `status-handler.ts` + `/api/queue/status`; tests (Review Focus 3–4) against `tests/support/fake-backend.mjs` (atomic counter reference semantics).
4. **Staff auth + console** — `src/lib/staff/{config,auth,admin}.ts`, `/api/staff/{login,logout,queue}`, `/staff`; tests (Review Focus 5).
5. **Header + device modes** — `clinic-header.tsx`, flow changes (`?kiosk=1`, navigate to `/thank-you#t=…`, personal vs kiosk timers).
6. **Thank-you UI** — `thank-you.tsx`, `thank-you.module.css`, `qr-code.tsx`, `/thank-you` page.
7. **E2E** — `tests/e2e/checkin.e2e.mjs` boots a local HTTPS test-double backend + a checkin build and drives register → real number → status → staff update; axe at 5 viewports.
8. **Docs + ship** — `docs/checkin-deployment.md`, `docs/checkin-backend-contract.md` (SQL reference), `scripts/vercel-ignore-build.sh`; run lint/tsc/tests/build; commit; push `origin/registration-form`.
