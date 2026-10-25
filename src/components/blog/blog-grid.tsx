'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import type { BlogList } from '@/lib/blog/contract';
import { parseBlogList } from '@/lib/blog/contract';
import { BlogCard } from './blog-card';
import styles from './blog.module.css';
export function BlogGrid({ initial, search, category, featuredId }: { initial: BlogList; search: string; category: string; featuredId?: string }) {
  const [data, setData] = useState(initial); const [busy, setBusy] = useState(false); const [error, setError] = useState(''); const [announcement, setAnnouncement] = useState('');
  const inFlight = useRef(false);
  const items = data.items.filter(item => item.id !== featuredId);
  async function loadMore() {
    if (inFlight.current) return; inFlight.current = true; setBusy(true); setError('');
    try {
      const query = new URLSearchParams({ page: String(data.pagination.page + 1), search, category });
      const response = await fetch(`/api/blog?${query}`);
      if (!response.ok) throw new Error('Unavailable');
      const next = parseBlogList(await response.json());
      setData(previous => ({ ...next, items: [...previous.items, ...next.items.filter(item => !previous.items.some(existing => existing.id === item.id))] }));
      setAnnouncement(`${next.items.length} more articles loaded.`);
    } catch { setError('We could not load more articles. Please try again.'); }
    finally { inFlight.current = false; setBusy(false); }
  }
  return <><div className={styles.grid} aria-busy={busy}>{items.map(article => <BlogCard key={article.id} article={article} />)}</div>
    <p className="sr-only" role="status">{announcement}</p>{error && <p role="alert" className={styles.notice}>{error}</p>}
    {data.pagination.has_next_page && <><div className={styles.load}><button type="button" disabled={busy} onClick={loadMore}>{busy ? 'Loading articles…' : error ? 'Try again' : 'Load more articles'}</button></div><noscript><Link className={styles.read} href={`/blog?${new URLSearchParams({page:String(data.pagination.page+1),search,category})}`}>Next page of articles</Link></noscript></>}</>;
}
