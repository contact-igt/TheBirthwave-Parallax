import Link from 'next/link';
import { record, text, safeBlogUrl, type BlogMedia } from '@/lib/blog/contract';
import { BlogImage } from './blog-image';
import styles from './blog.module.css';

export function articleBlocks(value: unknown) { return record(record(value).blocks); }
function rows(value: unknown) { return Array.isArray(value) ? value.map(record) : []; }
function BlockLink({ value }: { value: unknown }) {
  const action = record(value); const href = safeBlogUrl(action.url);
  return href && text(action.label) ? <a href={href} rel="noopener noreferrer">{text(action.label)}</a> : null;
}
export function BlogBlocks({ value, position }: { value: unknown; position: 'before' | 'after' }) {
  const blocks = articleBlocks(value);
  const takeaways = record(blocks.key_takeaways);
  if (position === 'before') return takeaways.enabled === true ? <section id="article-takeaways" className={styles.callout}><h2>{text(takeaways.heading) || 'Key takeaways'}</h2><ul>{(Array.isArray(takeaways.items) ? takeaways.items : []).map((item,index) => <li key={index}>{text(item)}</li>)}</ul></section> : null;
  const comparison = record(blocks.image_comparison); const list = record(blocks.numbered_list); const quote = record(blocks.expert_quote); const cta = record(blocks.medical_cta); const faq = record(blocks.faq);
  return <>
    {comparison.enabled === true && <section id="article-images" className={styles.block}><h2>{text(comparison.heading)}</h2><div className={styles.comparison}>{rows(comparison.items).map((item,index) => <figure key={index}><BlogImage media={item.media ? item.media as BlogMedia : { original_url: text(item.original_url || item.url), alt_text: text(item.alt_text), variants: {} }} slot="content" /><figcaption><h3>{text(item.title)}</h3><p>{text(item.description)}</p></figcaption></figure>)}</div></section>}
    {list.enabled === true && <section id="article-guide" className={styles.block}><h2>{text(list.heading)}</h2><ol>{rows(list.items).map((item,index) => <li key={index}><h3>{text(item.title)}</h3><p>{text(item.description)}</p></li>)}</ol></section>}
    {quote.enabled === true && <blockquote><p>{text(quote.quote)}</p><footer>{text(quote.name)}{text(quote.role) && ` · ${text(quote.role)}`}{safeBlogUrl(quote.profile_url) && <> · <a href={safeBlogUrl(quote.profile_url)!}>View profile</a></>}</footer></blockquote>}
    {cta.enabled === true && <aside className={styles.callout}><h2>{text(cta.heading)}</h2><p>{text(cta.description)}</p><div className={styles.actions}><BlockLink value={cta.primary} /><BlockLink value={cta.secondary} /></div></aside>}
    {faq.enabled === true && <section id="article-faq" className={styles.block}><h2>{text(faq.heading) || 'Frequently asked questions'}</h2>{rows(faq.items).map((item,index) => <details key={index}><summary>{text(item.question)}</summary><p>{text(item.answer)}</p></details>)}</section>}
  </>;
}
export function BlogSidebar({ value }: { value: unknown }) {
  const blocks = articleBlocks(value); const appointment = record(record(record(value).sidebar).appointment_cta);
  return <aside className={styles.sidebar}><nav aria-label="In this article"><h2>In this article</h2><a href="#article-body">Article</a>{record(blocks.key_takeaways).enabled === true && <a href="#article-takeaways">Key takeaways</a>}{record(blocks.numbered_list).enabled === true && <a href="#article-guide">Practical guide</a>}{record(blocks.faq).enabled === true && <a href="#article-faq">Questions and answers</a>}<a href="#article-disclaimer">Medical disclaimer</a></nav>
    {appointment.enabled === true && <div className={styles.block}><h2>{text(appointment.heading)}</h2><p>{text(appointment.description)}</p><Link href={safeBlogUrl(record(appointment.book_appointment).url) || '/contact'} className={styles.read}>{text(record(appointment.book_appointment).label) || 'Book a consultation'} ↗</Link>{(() => { const call=record(appointment.call_now); const url=text(call.url); return call.enabled === true && /^tel:\+?[\d ()-]+$/.test(url) ? <a href={url}>{text(call.label) || 'Call us'}</a> : null; })()}</div>}
  </aside>;
}
