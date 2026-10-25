import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { PageShell } from '@/components/layout/page-shell';
import { JsonLd } from '@/components/seo/json-ld';
import { BlogImage } from '@/components/blog/blog-image';
import { BlogBlocks, BlogSidebar, articleBlocks } from '@/components/blog/blog-blocks';
import { BlogShare } from '@/components/blog/blog-share';
import { BlogContact, BlogPreviewNotice } from '@/components/blog/blog-shared';
import { getBlogDetail, blogDesignPreview } from '@/lib/blog/api';
import { articleMetadata, articleStructuredData } from '@/lib/blog/metadata';
import { breadcrumbStructuredData } from '@/lib/structured-data';
import { record } from '@/lib/blog/contract';
import { siteOrigin } from '@/lib/seo';
import styles from '@/components/blog/blog.module.css';

type Props = { params: Promise<{ slug: string }> };
async function resolve(slug: string) {
  const result = await getBlogDetail(slug);
  if (result.kind === 'missing') notFound();
  if (result.kind === 'redirect') permanentRedirect(`/blog/${result.slug}`);
  return result.article;
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await resolve((await params).slug);
  return { ...articleMetadata(article), ...(blogDesignPreview() ? { robots:{index:false,follow:false} } : {}) };
}
const formatDate = (value: string) => new Intl.DateTimeFormat('en-IN',{day:'numeric',month:'long',year:'numeric',timeZone:'Asia/Kolkata'}).format(new Date(value));
export default async function ArticlePage({ params }: Props) {
  const article = await resolve((await params).slug); const sidebar = article.template_key === 'template_2';
  return <PageShell><article className={styles.page}><div className={styles.container}>
    {!blogDesignPreview() && <JsonLd data={articleStructuredData(article)} />}
    <JsonLd data={breadcrumbStructuredData([{name:'Home',path:'/'},{name:'Blog',path:'/blog'},{name:article.title,path:`/blog/${article.slug}`}])} />
    <header className={styles.articleHeader}><nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/blog">Blog</Link></nav><BlogPreviewNotice />{article.category && <p className={styles.eyebrow}>{article.category}</p>}<h1>{article.title}</h1>{article.excerpt && <p className={styles.excerpt}>{article.excerpt}</p>}
      <div className={styles.meta}>{article.author?.name && <span>By {article.author.name}</span>}<span>Published {formatDate(article.published_at)}</span>{article.updated_at !== article.published_at && <span>Updated {formatDate(article.updated_at)}</span>}<p className={styles.reviewer}>Reviewed by {article.reviewer.name}, {article.reviewer.credentials} · {formatDate(article.reviewer.reviewed_at)}</p></div>
    </header>
    <div className={styles.cover}><BlogImage media={article.featured_media} slot="hero" eager /></div>
    <div className={`${styles.articleLayout} ${sidebar ? styles.withSidebar : ''}`}><div className={styles.body}>
      {sidebar && <BlogBlocks value={article.blocks_json} position="before" />}
      {/* The versioned public API sanitises this HTML on write AND read; see contract §5. */}
      <div id="article-body" dangerouslySetInnerHTML={{__html:article.content_html}} />
      {!sidebar && <BlogBlocks value={article.blocks_json} position="before" />}
      <BlogBlocks value={article.blocks_json} position="after" />
      <aside id="article-disclaimer" className={styles.disclaimer}><h2>Medical disclaimer</h2><p>{article.medical_disclaimer}</p></aside>
      {record(articleBlocks(article.blocks_json).share).enabled === true && <BlogShare url={`${siteOrigin}/blog/${article.slug}`} title={article.title} />}
      <Link href="/blog" className={styles.read}>← Back to all articles</Link>
    </div>{sidebar && <BlogSidebar value={article.blocks_json} />}</div>
    <BlogContact />
  </div></article></PageShell>;
}
