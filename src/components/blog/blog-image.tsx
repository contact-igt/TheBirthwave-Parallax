'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { mediaUrl, type BlogMedia } from '@/lib/blog/contract';
import styles from './blog.module.css';

export function BlogImage({ media, slot = 'card', eager = false }: { media: BlogMedia | null; slot?: string; eager?: boolean }) {
  const src = mediaUrl(media, slot);
  const [failed, setFailed] = useState<string | null>(null);
  return <div className={styles.photo}>{src && failed !== src
    ? <Image src={src} alt={media?.alt_text ?? ''} fill unoptimized sizes={slot === 'hero' ? '(max-width: 640px) 100vw, 60vw' : '(max-width: 640px) 100px, 33vw'} loading={eager ? 'eager' : 'lazy'} onError={() => setFailed(src)} />
    : <div className={styles.fallback}><ImageIcon aria-hidden="true" size={28} /><span>Article image unavailable</span></div>}</div>;
}
