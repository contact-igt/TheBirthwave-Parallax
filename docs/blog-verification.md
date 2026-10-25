# Public blog verification — 24 October 2026

Implemented in Parallax only; the separate blog platform was not modified. Nothing was committed, pushed or deployed.

## Passed
- Blog contract and cache tests: 10/10.
- TypeScript: `npx tsc --noEmit`, exit 0.
- Lint: exit 0, with nine existing warnings in unrelated files.
- Production build: `npm run build -- --webpack`, exit 0.
- Browser checks against the local fixture API: widths 360, 390, 768, 1024 and 1440; listing and article layouts have no horizontal overflow.
- Search, category filtering, load more, FAQ, sidebar booking link, broken-image fallback, missing article 404 and historical-slug 308 redirect.
- Canonical metadata and MedicalWebPage JSON-LD; API outage returns 503 with no-store.
- Axe WCAG A/AA checks on the listing main content at 390 and 1440: no violations. This is scoped automated coverage, not a full accessibility certification.
- No page errors in the browser test run.
- Runtime sitemap includes the current fixture article URL and excludes its historical URL after revalidation.
- Focused code review: cache invalidation and sidebar booking findings corrected; recheck found no remaining important issues.

## Existing or environment limitations
- Full repository tests: 94/100 pass. Six failures remain in unchanged check-in isolation, analytics-policy, registration receipt-memory and Windows deployment-script tests.
- Default Turbopack build failed with a worker connection crash involving the existing fertility-preconception stylesheet. The Webpack production build passes.
- Development server showed an intermittent JSON parsing error during repeated browser checks. Final browser verification used the successful production build.
- Real CMS was not reachable on localhost:5000. Publishing/unpublishing against the actual CMS, production R2 delivery and the deployed API remain unverified. Fixture tests do not establish those production behaviours.

## Preview and handoff
Local preview: http://localhost:3111/blog, backed by the isolated fixture API on 127.0.0.1:5107. Articles are labelled layout samples. These are not published CMS content. The preview processes are left running for review.

Screenshots are local, ignored artifacts in `docs/blog-qa/`. Integration and launch configuration are in `docs/blog-integration.md`. Set the real server-only `BLOG_API_BASE_URL` before deployment; never use the fixture URL in production.
