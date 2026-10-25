import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Search } from 'lucide-react';
import { PageShell } from '@/components/layout/page-shell';
import { BlogImage } from '@/components/blog/blog-image';
import { BlogGrid } from '@/components/blog/blog-grid';
import { BlogContact, BlogPreviewNotice, BlogUnavailableNotice } from '@/components/blog/blog-shared';
import { blogDesignPreview, getBlogIndex, getBlogList } from '@/lib/blog/api';
import { pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbStructuredData } from '@/lib/structured-data';
import styles from '@/components/blog/blog.module.css';

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };
const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value) ?? '';
function filters(query: Record<string, string | string[] | undefined>) { return { search: first(query.search).trim().slice(0,120), category: first(query.category).trim().slice(0,100), page: Math.max(1,Math.min(10000,Number.parseInt(first(query.page),10)||1)) }; }
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const query = filters(await searchParams);
  const metadata = pageMetadata('The Birthwave Journal | Women’s Health, Pregnancy & Birth', 'Explore articles on women’s health, pregnancy, birth and beyond from The Birthwave.', '/blog');
  let available = false;
  try { available = (await getBlogList(query)).pagination.total_items > 0; } catch { /* Outages must not create an indexable empty journal. */ }
  return { ...metadata, robots: { index: available && !blogDesignPreview() && !query.search && !query.category && query.page === 1, follow: true } };
}
export default async function BlogPage({ searchParams }: Props) {
  const query = filters(await searchParams);
  let data; let categories: string[] = [];
  try { data = await getBlogList(query); categories = [...new Set((await getBlogIndex()).flatMap(item => item.category ? [item.category] : []))].sort(); } catch { /* Render the explicit unavailable state. */ }
  const featured = !query.search && !query.category && query.page === 1 ? data?.items[0] : undefined;
  const filterHref = (category: string) => { const params = new URLSearchParams(); if(query.search) params.set('search',query.search); if(category) params.set('category',category); return `/blog${params.size ? `?${params}` : ''}`; };
  return <PageShell><div className={styles.page}>
    <JsonLd data={breadcrumbStructuredData([{ name:'Home', path:'/' },{ name:'Blog', path:'/blog' }])} />
    <section className={styles.hero}><p className={styles.eyebrow}>The Birthwave journal</p><h1>Understanding your health,<br />one story at a time.</h1><p>Explore articles on women’s health, pregnancy, birth and beyond.</p></section>
    <div className={styles.container}><BlogPreviewNotice />
      {featured && <article className={styles.featured}><BlogImage media={featured.featured_media} slot="hero" eager /><div className={styles.featureCopy}><p className={styles.eyebrow}>Featured article</p><h2><Link href={`/blog/${featured.slug}`}>{featured.title}</Link></h2>{featured.excerpt && <p>{featured.excerpt}</p>}<Link className={styles.read} href={`/blog/${featured.slug}`}>Read article <ArrowUpRight aria-hidden="true" /></Link></div></article>}
      <div className={styles.tools}><form action="/blog" className={styles.search} role="search"><Search aria-hidden="true" /><label htmlFor="blog-search" className="sr-only">Search articles</label><input id="blog-search" name="search" type="search" placeholder="Search articles" defaultValue={query.search} maxLength={120} />{query.category && <input type="hidden" name="category" value={query.category} />}<button type="submit">Search</button></form>
        <nav className={styles.filters} aria-label="Article categories"><Link className={styles.filter} href={filterHref('')} aria-current={!query.category ? 'true' : undefined}>All articles</Link>{categories.map(category => <Link key={category} className={styles.filter} href={filterHref(category)} aria-current={query.category.toLowerCase() === category.toLowerCase() ? 'true' : undefined}>{category}</Link>)}</nav>
      </div>
      {!data ? <BlogUnavailableNotice /> : <section aria-label="Articles"><h2 className={styles.sectionTitle}>{query.search ? `Results for “${query.search}”` : query.category || 'Latest articles'}</h2>
        {!data.items.length ? <div className={styles.notice}><p>{query.search || query.category ? 'No articles match your search. Try another topic.' : 'Our journal is taking shape. Please check back for new articles.'}</p>{(query.search || query.category) && <Link href="/blog" className={styles.read}>Clear filters</Link>}</div> : <BlogGrid key={`${query.search}|${query.category}|${query.page}`} initial={data} search={query.search} category={query.category} featuredId={featured?.id} />}
        {query.page > 1 && <Link className={styles.read} href={filterHref(query.category)}>Back to first page</Link>}
      </section>}
      <BlogContact />
    </div>
  </div></PageShell>;
}
