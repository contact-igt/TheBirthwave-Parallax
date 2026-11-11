export type ArticleSection = { id: string; title: string };

const namedEntities: Record<string, string> = {
  amp: '&', apos: "'", gt: '>', hellip: '…', ldquo: '“', lsquo: '‘',
  lt: '<', mdash: '—', nbsp: ' ', ndash: '–', quot: '"', rdquo: '”', rsquo: '’',
};

function plainText(html: string) {
  return html.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]*>/g, '')
    .replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (entity, code: string) => {
      if (code[0] !== '#') return namedEntities[code.toLowerCase()] ?? entity;
      const value = code[1]?.toLowerCase() === 'x'
        ? Number.parseInt(code.slice(2), 16) : Number.parseInt(code.slice(1), 10);
      return Number.isInteger(value) && value > 0 && value <= 0x10ffff
        ? String.fromCodePoint(value) : entity;
    }).replace(/\s+/g, ' ').trim();
}

function slug(text: string) {
  return text.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/** Add stable fragment targets to the public API's already sanitised article HTML. */
export function withArticleHeadings(html: string): { html: string; sections: ArticleSection[] } {
  const sections: ArticleSection[] = [];
  const used = new Set(['article-body', 'article-takeaways', 'article-images', 'article-guide', 'article-faq', 'article-disclaimer']);

  const anchored = html.replace(/<h2\b([^>]*)>([\s\S]*?)<\/h2>/gi, (match, attributes: string, inner: string) => {
    const title = plainText(inner);
    if (!title) return match;

    const existing = attributes.match(/(?:^|\s)id\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
    const originalId = existing?.[1] ?? existing?.[2] ?? existing?.[3];
    const preferred = originalId && /^[a-z][\w:.-]*$/i.test(originalId) && !used.has(originalId)
      ? originalId : `article-section-${slug(title) || sections.length + 1}`;
    let id = preferred;
    for (let suffix = 2; used.has(id); suffix += 1) id = `${preferred}-${suffix}`;
    used.add(id);
    sections.push({ id, title });

    const cleanAttributes = attributes.replace(/\s+id\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/i, '');
    return `<h2${cleanAttributes} id="${id}">${inner}</h2>`;
  });

  return { html: anchored, sections };
}
