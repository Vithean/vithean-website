import { copy, c } from '@/i18n/copy';
import type { Lang } from '@/i18n/utils';

/**
 * The authored short copy for a plan card, resolved for a locale.
 *
 * Shared by the pricing page and the homepage so both show the same three
 * lines. Keyed by plan slug, and returns undefined for a slug that has no
 * authored copy — a plan the core adds then falls back to its generated
 * tagline and feature list rather than rendering an empty card.
 */
const cards = copy.pricing.cards as Record<string, { who: any; items: readonly any[] }>;

export function planSummary(slug: string, lang: Lang) {
  const card = cards[slug];
  return card ? { who: c(card.who, lang), items: card.items.map((i) => c(i, lang)) } : undefined;
}
