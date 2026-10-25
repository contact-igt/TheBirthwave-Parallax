# Public blog integration

The website owns `/blog` and `/blog/[slug]`. The separate blog platform owns admin, API, database and uploads. No admin credentials are needed by this website.

## Configuration
Verified Railway public API: `https://birthwaveblogpanel-production.up.railway.app/api/v1`.
The local `.env.local` now uses this URL with design-preview mode disabled. For the hosted website, set `BLOG_API_BASE_URL` to this same value in its hosting environment and redeploy. Local environment files are ignored by Git and do not configure Vercel automatically.

Connection verified on 25 October 2026: Railway list endpoint and the website's `/api/blog` both returned 200 with zero published articles. `/blog` rendered successfully without fixture content. Publish an approved article in the admin to complete real article/image verification; article updates are refreshed after the 60-second cache window.

Set `BLOG_API_BASE_URL` in the website's server environment, including `/api/v1` and no trailing slash. For the local CMS default, use `http://localhost:5000/api/v1`. Confirm the actual API port before using it. Production must use the deployed HTTPS API origin, never localhost. Restart Next after changing environment variables. Do not prefix this variable with `NEXT_PUBLIC_`.

Without the variable the journal renders an unavailable state and is noindex; no mock articles are returned. Sitemap excludes the journal until published content is available. Production deployment requires the approved disclaimer, configured image storage and actual reviewed articles.

## Behaviour
- `public-blogs@1.1.0`; all reads are server-side. Search, category and load-more are connected to the public API. Categories are derived from published articles. The most recently published article is featured because the contract has no featured flag.
- Initial content is server-rendered. A bounded process-local cache keeps validated upstream 200 responses fresh for 60 seconds (maximum 500 entries), then checks upstream synchronously using ETags. A refreshed 404 or 301 immediately evicts the old content. Network/5xx failures may reuse a successful response only until it is 120 seconds old; beyond that the unavailable/error state appears. Errors and redirects are never cached. Upstream fetch uses no-store so Next's unbounded stale-while-revalidate behaviour cannot retain unpublished content indefinitely. Serverless cold starts simply read upstream again.
- Upstream 404 becomes website 404. Historical slugs become same-domain 308 permanent redirects (Next's permanentRedirect); the API origin is never exposed as the redirect destination.
- Published HTML is rendered according to the API's sanitisation contract. Optional enabled blocks are rendered; feedback/newsletter are deliberately ignored. Both built-in layouts are supported. Custom templates are outside this contract.
- SEO overrides, medical review, published/modified dates, social metadata and JSON-LD come from the published snapshot. Search/category/page variants are noindex. The sitemap reads every list page and excludes alternate-canonical articles and historical URLs.
- Images use CMS-sized variants directly, avoiding a broad remote-image optimizer allowlist. Broken/missing images have a neutral fallback. The source alt text is retained.
- The sitemap is generated at request time, so an unavailable CMS cannot block the website build. It uses the adapter's 60-second cache. If the configured API remains unavailable beyond the bounded stale window, the sitemap request fails rather than returning a misleading partial list; restore API connectivity to recover. The API must be reachable from the deployed website runtime.

## Local visual verification
The fixture server in `tests/support/blog-fixture-server.mjs` is only for development testing. Run it separately, then start Next with `BLOG_API_BASE_URL=http://127.0.0.1:5107/api/v1`, `BLOG_DESIGN_PREVIEW=true`, and a separate `NEXT_DIST_DIR` if another dev server is running. Preview mode is recognised only in development, adds a sample-content notice, prevents indexing and excludes blog sitemap entries. Never point production at the fixture server. Real CMS verification must use its own endpoint without preview mode.

## Launch checks
1. Confirm production API HTTPS URL and R2 images; set server environment.
2. Publish reviewed content in the separate admin. Never promote local gate-test articles.
3. Verify listing, search, media, both layouts and review/disclaimer wording.
4. Rename a test published article and verify same-domain redirect; unpublish and verify current and historical URLs return 404 after cache refresh.
5. Check sitemap.xml, canonical, JSON-LD and mobile navigation.

No deployment, Git push or CMS data changes were performed by this implementation.
