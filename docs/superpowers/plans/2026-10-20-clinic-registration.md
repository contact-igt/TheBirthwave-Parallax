# Clinic Registration Implementation Plan

Spec: `docs/superpowers/specs/2026-10-20-clinic-registration-design.md`.
TDD for rules and API handler (tests first); UI verified in the browser.

- [ ] 1. `tsconfig`: `allowImportingTsExtensions`; `package.json` `test` / `test:e2e` scripts.
- [ ] 2. `tests/registration-rules.test.mjs` → `src/lib/registration/rules.ts` (red → green).
- [ ] 3. `tests/registration-api.test.mjs` → `handler.ts` (+ `store.ts`, `rate-limit.ts`) and `src/app/api/registrations/route.ts`.
- [ ] 4. `SiteAnalytics` + layout change; `next.config.ts` headers; `robots.ts`; `tests/registration-policy.test.mjs`.
- [ ] 5. Components: icons, progress, brand panel, fields, option cards, signature pad, steps, flow controller, CSS module.
- [ ] 6. `/registration` page + metadata.
- [ ] 7. Lint, tsc, build, unit tests.
- [ ] 8. Playwright e2e + axe at 5 viewports; screenshots; fix defects.
- [ ] 9. Verification pass against the paper-form matrix; report.
