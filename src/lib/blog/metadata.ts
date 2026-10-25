import type { Metadata } from 'next';
import { siteOrigin } from '@/lib/seo';
import { mediaUrl, safeBlogUrl, type BlogDetail } from './contract';
export function articleCanonical(article: BlogDetail) {
  const override = safeBlogUrl(article.seo.canonical_url);
  return override ? new URL(override, siteOrigin).href : `${siteOrigin}/blog/${article.slug}`;
}
export function articleMetadata(article: BlogDetail): Metadata {
  const title = article.seo.title || article.title; const description = (article.seo.description || article.excerpt || '').slice(0,160); const canonical = articleCanonical(article); const image = mediaUrl(article.featured_media, 'hero');
  const images = image ? [{ url: image, alt: article.featured_media?.alt_text ?? '' }] : undefined;
  return { title, description, alternates: { canonical }, robots: { index: true, follow: true }, openGraph: { type:'article', title, description, url:canonical, siteName:'The Birthwave', publishedTime:article.published_at, modifiedTime:article.updated_at, section:article.category || undefined, images }, twitter: { card:image ? 'summary_large_image' : 'summary', title, description, images: image ? [image] : undefined } };
}
export function articleStructuredData(article: BlogDetail) {
  return { '@context':'https://schema.org', '@type':'MedicalWebPage', headline:article.title, description:article.seo.description || article.excerpt || undefined, url:articleCanonical(article), image:mediaUrl(article.featured_media,'hero') || undefined, datePublished:article.published_at, dateModified:article.updated_at, lastReviewed:article.reviewer.reviewed_at, reviewedBy:{ '@type':'Person', name:article.reviewer.name, description:article.reviewer.credentials }, ...(article.author?.name ? { author:{ '@type':'Person',name:article.author.name } } : {}), publisher:{ '@type':'Organization',name:'The Birthwave',url:siteOrigin,logo:{ '@type':'ImageObject',url:`${siteOrigin}/brand/wordmark-mauve.png` } } };
}
