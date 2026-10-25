/** Public CMS contract v1.1. No admin models or credentials cross this boundary. */
export type BlogMedia = { original_url: string | null; alt_text: string | null; variants: Record<string, { url?: string; width?: number; height?: number }> };
export type BlogItem = {
  id: string; slug: string; title: string; excerpt: string | null;
  published_at: string; updated_at: string; category: string | null;
  author: { id: string; name?: string } | null;
  featured_media: BlogMedia | null;
  seo: { title: string | null; description: string | null; canonical_url: string | null };
};
export type BlogDetail = BlogItem & {
  content_html: string; blocks_json: unknown; template_key: string; template_version: number;
  reviewer: { name: string; credentials: string; reviewed_at: string }; medical_disclaimer: string;
};
export type BlogList = { items: BlogItem[]; pagination: { page: number; limit: number; total_items: number; total_pages: number; has_next_page: boolean; has_previous_page: boolean } };
export type BlogQuery = { page?: number; limit?: number; search?: string; category?: string };
export function record(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};
}
export function text(value: unknown): string { return typeof value === 'string' ? value : ''; }
export function safeBlogUrl(value: unknown): string | null {
  if (typeof value !== 'string' || !value || /[\\\s\u0000-\u001f]/.test(value)) return null;
  if (value.startsWith('/') && !value.startsWith('//')) return value;
  try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password ? url.href : null; } catch { return null; }
}
export function mediaUrl(media: BlogMedia | null, slot: string): string | null {
  return safeBlogUrl(media?.variants?.[slot]?.url) ?? safeBlogUrl(media?.original_url);
}
export function blogQuery(input: BlogQuery = {}): URLSearchParams {
  const integer = (n: number | undefined, fallback: number, max: number) => Number.isFinite(n) ? Math.min(max, Math.max(1, Math.floor(n!))) : fallback;
  const query = new URLSearchParams({ page: String(integer(input.page, 1, 10000)), limit: String(integer(input.limit, 12, 100)), sort_by: 'published_at', sort_order: 'desc' });
  if (input.search?.trim()) query.set('search', input.search.trim().slice(0, 120));
  if (input.category?.trim()) query.set('category', input.category.trim().replace(/\s+/g, ' ').slice(0, 100));
  return query;
}
export function redirectSlug(value: unknown): string {
  const slug = record(value).slug;
  if (typeof slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('Invalid public blog slug');
  return slug;
}
function parseItem(value: unknown): BlogItem {
  const item = record(value);
  redirectSlug(item);
  if (!text(item.id) || !text(item.title) || !Number.isFinite(Date.parse(text(item.published_at))) || !Number.isFinite(Date.parse(text(item.updated_at))) || !item.seo) throw new Error('Invalid public blog item');
  const nullableText = (value: unknown) => value === null || typeof value === 'string';
  if (!nullableText(item.excerpt) || !nullableText(item.category) || !['title','description','canonical_url'].every(key=>nullableText(record(item.seo)[key]))) throw new Error('Invalid article metadata');
  if (item.author !== null && (!text(record(item.author).id) || (record(item.author).name !== undefined && typeof record(item.author).name !== 'string'))) throw new Error('Invalid author');
  if (item.featured_media !== null) {
    const media=record(item.featured_media);
    if (!nullableText(media.original_url) || !nullableText(media.alt_text) || !media.variants || typeof media.variants !== 'object' || Array.isArray(media.variants)) throw new Error('Invalid media');
  }
  return item as BlogItem;
}
export function parseBlogList(value: unknown): BlogList {
  const data = record(value); const pagination = record(data.pagination);
  if (!Array.isArray(data.items) || !['page', 'limit', 'total_items', 'total_pages'].every(key => typeof pagination[key] === 'number' && Number.isInteger(pagination[key]) && Number(pagination[key]) >= 0) || typeof pagination.has_next_page !== 'boolean' || typeof pagination.has_previous_page !== 'boolean') throw new Error('Invalid blog pagination');
  return { items: data.items.map(parseItem), pagination: pagination as BlogList['pagination'] };
}
export function parseBlogDetail(value: unknown): BlogDetail {
  const item = parseItem(value); const data = record(value); const reviewer = record(data.reviewer);
  if (typeof data.content_html !== 'string' || !text(data.template_key) || !text(data.medical_disclaimer).trim() || !text(reviewer.name) || !text(reviewer.credentials) || !Number.isFinite(Date.parse(text(reviewer.reviewed_at)))) throw new Error('Invalid blog detail');
  return { ...item, ...data } as BlogDetail;
}
