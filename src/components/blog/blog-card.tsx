import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { BlogItem } from '@/lib/blog/contract';
import { BlogImage } from './blog-image';
import styles from './blog.module.css';
export function BlogCard({ article }: { article: BlogItem }) {
  return <article className={styles.card}><BlogImage media={article.featured_media} /><div className={styles.cardCopy}>
    {article.category && <p className={styles.eyebrow}>{article.category}</p>}
    <h3><Link href={`/blog/${article.slug}`}>{article.title}</Link></h3>
    <Link className={styles.read} href={`/blog/${article.slug}`} aria-label={`Read article: ${article.title}`}>Read article <ArrowUpRight aria-hidden="true" /></Link>
  </div></article>;
}
