/**
 * Everything a search engine or an AI assistant reads is composed here.
 *
 * Two rules this file exists to enforce:
 *
 * 1. **Every page declares its own description.** Not a reused lead paragraph,
 *    not a truncated first sentence. A description is a claim about what the
 *    page is for, and a page that cannot state one has not been thought about.
 * 2. **Descriptions are clamped on a word boundary**, never mid-word. A
 *    description ending "…the supplier invo" reads as a broken site.
 *
 * The category words are deliberate and repeat across titles, descriptions and
 * the JSON-LD: online accounting · ERP · Cambodia · CamInv. That consistency is
 * what lets a model classify Vithean confidently instead of hedging.
 */

export const SITE = {
  name: 'Vithean',
  legalName: 'POSCAR Digital Co., Ltd.',
  /** The classification claim. Repeated verbatim wherever a fallback is needed. */
  category: 'Online accounting and ERP system for Cambodia',
  defaultDescription:
    'Vithean is a cloud accounting and ERP system built in Cambodia: invoicing, inventory, ' +
    'sales, purchasing and banking on one ledger, with CamInv e-invoicing included.',
  ogImage: '/assets/og-default.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
} as const;

/** Words a snippet must never end on — they read as a truncation bug. */
const DANGLING = new Set([
  'a','an','and','as','at','but','by','for','from','in','into','of','on','or',
  'that','the','to','with','which','while','when','is','are','was','were','it','its','their',
]);

/** Google truncates around 155–160. Clamp on a word boundary, never mid-word. */
export function clampDescription(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const words = clean.slice(0, max + 1).split(' ');
  words.pop();                                   // drop the partial word
  while (words.length > 8 && DANGLING.has(words[words.length - 1].toLowerCase().replace(/\W/g, ''))) {
    words.pop();                                 // never end on a dangling word
  }
  return words.join(' ').replace(/[,;:—–-]+$/, '') + '…';
}

/**
 * Article headlines run long — `<title>` gets a clamped version while the `<h1>`
 * keeps the full headline. A 119-character title is simply not shown.
 */
export function clampTitle(text: string, max = 58): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const words = clean.slice(0, max + 1).split(' ');
  words.pop();
  while (words.length > 4 && DANGLING.has(words[words.length - 1].toLowerCase().replace(/\W/g, ''))) {
    words.pop();
  }
  return words.join(' ').replace(/[,;:—–-]+$/, '') + '…';
}

/** `Page name | Vithean` — except the homepage, which owns the category claim. */
export function pageTitle(title: string, opts: { home?: boolean } = {}): string {
  if (opts.home) return title;
  return title.endsWith(SITE.name) ? title : `${title} | ${SITE.name}`;
}

export interface Crumb { name: string; url: string }

export function breadcrumbSchema(crumbs: Crumb[], site: URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: new URL(c.url, site).href,
    })),
  };
}
