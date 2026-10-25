'use client';
import Link from 'next/link';
import { PageShell } from '@/components/layout/page-shell';
import styles from '@/components/blog/blog.module.css';
export default function BlogError({ reset }: { reset: () => void }) {
  return <PageShell><div className={styles.page}><section className={styles.hero}><p className={styles.eyebrow}>The Birthwave journal</p><h1>We can’t load this article right now.</h1><p>Please try again shortly.</p><div className={styles.load}><button type="button" onClick={reset}>Try again</button></div><Link href="/blog" className={styles.read}>Back to the journal</Link></section></div></PageShell>;
}
