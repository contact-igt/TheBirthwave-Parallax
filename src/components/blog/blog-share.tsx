'use client';
import { useState } from 'react';
import styles from './blog.module.css';
export function BlogShare({ url, title }: { url: string; title: string }) {
  const [status,setStatus] = useState('');
  async function copy() { try { await navigator.clipboard.writeText(url); setStatus('Article link copied.'); } catch { setStatus('Could not copy. You can copy the address from your browser.'); } }
  return <div className={styles.share}><button type="button" onClick={copy}>Copy article link</button><a href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`}>Share by email</a><span role="status" className={styles.status}>{status}</span></div>;
}
