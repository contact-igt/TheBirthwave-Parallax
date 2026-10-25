import Link from 'next/link';
import { blogDesignPreview } from '@/lib/blog/api';
import styles from './blog.module.css';
export function BlogContact() { return <aside className={styles.contact}><p>Have a question about your care?</p><Link href="/contact">Contact us</Link></aside>; }
export function BlogPreviewNotice() { return blogDesignPreview() ? <p className={styles.preview}>Design preview — sample articles and images for layout review only. Not published medical guidance.</p> : null; }
export function BlogUnavailableNotice() { return <section className={styles.notice}><h2>The journal will be back shortly.</h2><p>We can’t load articles right now. Please try again later, or <Link href="/contact" className={styles.read}>contact our team</Link>.</p><Link href="/blog" className={styles.read}>Try again</Link></section>; }
