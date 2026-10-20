# Clinic registration: deployment gates and open decisions

`/registration` is fully built, but **live submission is OFF** until the clinic
approves a storage destination. With nothing configured, `POST /api/registrations`
answers `503 registration_unavailable`, the page tells the patient to see
reception, and no success screen is ever shown. There is no mock-success path in
the application.

## Turning submissions on (all four are required)

| Variable | Meaning |
|---|---|
| `REGISTRATION_ENABLED=true` | Go-live switch. Set only after clinic sign-off on the questions below |
| `REGISTRATION_STORE_URL` | HTTPS endpoint of the approved, access-restricted store |
| `REGISTRATION_STORE_ALLOWED_HOSTS` | Comma list; the URL's host must appear here |
| `REGISTRATION_STORE_TOKEN` | Bearer credential for that endpoint (never committed) |

`*.google.com`, `*.googleusercontent.com` and `*.googleapis.com` are refused, so the
marketing Apps Script/Sheets path can never receive patient records.

### Store contract

`POST {REGISTRATION_STORE_URL}` with `Authorization: Bearer …` and
`Idempotency-Key: <uuid>`, JSON body `{ "record": RegistrationRecord, "idempotencyKey": "<uuid>" }`
(`RegistrationRecord` is defined in `src/lib/registration/rules.ts`; it includes
the signature PNG or typed name and the `guardianReviewRequired` /
`typedSignaturePendingClinicApproval` flags). Reply `200/201` with
`{ "ok": true, "id": "<record id>" }`. Anything else is a failure; the patient
keeps their answers and can retry (same idempotency key, so the store should
de-duplicate on it). Redirects are not followed.

## Decisions needed from the clinic before activation

1. **Where are records stored and who can read them?** (practice-management/EHR
   or other protected backend; encryption at rest; access list.)
2. **Is a drawn signature mandatory?** Typed names are accepted by the UI but
   flagged `typedSignaturePendingClinicApproval`; no legal equivalence is claimed.
3. **Guardian workflow for under-18 and Paediatrics registrations.** Today it only
   flags `guardianReviewRequired` and tells the patient reception will confirm.
4. **Retention/deletion policy and approved patient-facing privacy wording.**
   The summary in `registration-content.tsx` (`PRIVACY_SUMMARY`) is a plain-language
   placeholder; `/privacy` is still labelled a draft website notice.
5. Whether to offer a third gender option (`ALLOW_PREFER_NOT_TO_SAY` in `rules.ts`).
6. Whether *Referred by* should stay required (it currently is, with "Other").

## Known limits to close before go-live

- Rate limiting and idempotency de-duplication are in-memory per server instance.
  On multi-instance/serverless hosting, add an edge/WAF rate limit and rely on the
  store's idempotency handling.
- Client IP for rate limiting comes from `x-forwarded-for`; confirm the host sets it.
- Answers live only in React state (no browser storage), so a page refresh loses
  them. An idle timer (3 min + 1 min warning) and a 30 s post-receipt reset clear
  the screen for the next patient.
- Public pages keep Google Analytics. It never loads on `/registration`, but
  confirm GA/GTM property settings do not capture the `/registration` URL from
  referrers elsewhere.
