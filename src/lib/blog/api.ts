import 'server-only';
import { cache } from 'react';
import { blogQuery, parseBlogDetail, parseBlogList, redirectSlug, type BlogQuery, type BlogItem } from './contract';
import { createBlogTransport } from './transport';

export class BlogUnavailable extends Error {}
export function blogConfigured() { return Boolean(process.env.BLOG_API_BASE_URL?.trim()); }
export function blogDesignPreview() { return process.env.NODE_ENV === 'development' && process.env.BLOG_DESIGN_PREVIEW === 'true'; }
const read = createBlogTransport();

async function request(path: string) {
  const base = process.env.BLOG_API_BASE_URL?.trim().replace(/\/$/, '');
  if (!base) throw new BlogUnavailable('Blog API is not configured');
  try {
    const url = new URL(`${base}/public/blogs${path}`);
    if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) throw new Error('Invalid API URL');
    return await read(url.href, path.startsWith('?') ? parseBlogList : parseBlogDetail);
  } catch (error) {
    if (error instanceof BlogUnavailable) throw error;
    throw new BlogUnavailable('Could not read public articles');
  }
}
export const getBlogList = cache(async (query: BlogQuery = {}) => {
  const result = await request(`?${blogQuery(query)}`);
  try { return parseBlogList(result.data); } catch { throw new BlogUnavailable('Invalid blog listing'); }
});
export const getBlogDetail = cache(async (slug: string) => {
  try { redirectSlug({ slug }); } catch { return { kind: 'missing' as const }; }
  const result = await request(`/${encodeURIComponent(slug)}`);
  if (result.status === 404) return { kind: 'missing' as const };
  try {
    if (result.status === 301) return { kind: 'redirect' as const, slug: redirectSlug(result.data) };
    const article = parseBlogDetail(result.data);
    return article.slug === slug ? { kind: 'article' as const, article } : { kind: 'redirect' as const, slug: article.slug };
  } catch { throw new BlogUnavailable('Invalid public article'); }
});
/** Complete published index: also supplies CMS-defined categories and sitemap URLs. */
export const getBlogIndex = cache(async () => {
  const items: BlogItem[] = []; const seen = new Set<string>();
  for (let page = 1; page <= 1000; page++) {
    const result = await getBlogList({ page, limit: 100 });
    if (result.pagination.page !== page) throw new BlogUnavailable('Invalid index page');
    for (const item of result.items) if (!seen.has(item.slug)) { seen.add(item.slug); items.push(item); }
    if (!result.pagination.has_next_page) return items;
    if (!result.items.length) throw new BlogUnavailable('Incomplete index');
  }
  throw new BlogUnavailable('Blog index pagination limit reached');
});
