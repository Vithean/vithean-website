import display from '@/data/plan-display.json';
import { pick, type Lang } from '@/i18n/utils';

/**
 * Display text for pricing, layered over the core's data.
 *
 * `plans.json` is generated from the pricing API and is the authority on
 * prices, seat counts and which plan includes what. This layer changes only
 * how a value reads, and only where the site has decided the core's wording is
 * wrong for a customer — never what it means.
 *
 * Keyed on the stable editorial identifiers (`slug`, `id`), never on
 * `coreCode`: that is `PKG_` + sort_order in the core, so re-sorting packages
 * would silently point every override at a different feature.
 */
const plans = display.plans as Record<string, { name: { en: string; km: string } }>;
const features = display.features as Record<string, { label: { en: string; km: string } }>;

export function planName(plan: { slug: string; name: { en: string; km: string | null } }, lang: Lang): string {
  return pick(plans[plan.slug]?.name ?? plan.name, lang);
}

export function featureLabel(
  feature: { id: string; label: { en: string; km: string | null } } | undefined,
  lang: Lang,
): string {
  if (!feature) return '';
  return pick(features[feature.id]?.label ?? feature.label, lang);
}

/** Every key the site overrides, for the build guard to check against plans.json. */
export const overriddenPlanSlugs = Object.keys(plans);
export const overriddenFeatureIds = Object.keys(features);
