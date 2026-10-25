# Birthwave Public Blog Implementation Plan

**Goal:** Build `/blog` and `/blog/[slug]` in Parallax using the approved botanical desktop/mobile reference, with the separate CMS as the only published-content source.

**Architecture:** Server-only adapter for `public-blogs@1.1.0`; server-rendered routes with small client islands for pagination and image fallback. Reuse PageShell and existing tokens. No CMS writes, credentials, deployment or commits.

**Spec:** User-approved screenshot: centred botanical desktop hero, split featured article, search, category pills, three-column desktop cards and horizontal mobile cards, load more, contact banner. Existing fonts and shared chrome stay intact.

## Tasks
- [x] Test and implement API parsing, query limits, redirect validation, metadata URL safety and image selection.
- [x] Build responsive listing, accessible search/filter/pagination and honest empty/error states.
- [x] Build both article layouts, enabled content blocks, reviewer/disclaimer, metadata and same-domain redirects.
- [x] Add navigation and published-only sitemap integration; document server environment configuration.
- [x] Run unit tests, lint, types, build and browser checks at mobile/tablet/desktop widths.

## Review focus
- Pending drafts/historical slugs must never appear as current sitemap URLs.
- API failures must not look like a missing article or cached successful content.
- Missing/broken photos must retain layout and show a neutral fallback, never another article's photo.
- Unknown/disabled blocks and feedback/newsletters must not render.
- Unconfigured environments must build safely without fabricated published articles.

## Decisions
- API base is a server-only `BLOG_API_BASE_URL` ending in `/api/v1`; unset means an honest unavailable state, no sample content in production.
- Review correction: use a process-local, size-bounded success cache with 60-second freshness and a hard 120-second stale-on-outage limit. Next's default SWR fetch cache can retain old 200s after background 404/301, so use no-store upstream requests and synchronous conditional refresh instead.
- Use the latest published article as the featured article because the API has no featured-ranking field.
- Categories come from published articles, not a second hard-coded taxonomy.
- Browser design QA uses a separate local fixture API with explicitly labelled sample content; it never writes to the CMS.
