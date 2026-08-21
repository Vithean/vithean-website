import { ui, defaultLang, type Lang } from './ui';
import plansData from '@/data/plans.json';

export { defaultLang };
export type { Lang };

/** English is unprefixed, so anything that is not /km/... is English. */
export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  return first === 'km' ? 'km' : defaultLang;
}

/** Falls back to English when a Khmer string has not been authored yet. */
export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return ui[lang][key] ?? ui[defaultLang][key] ?? String(key);
  };
}

/** Picks the localised value from an { en, km } pair, falling back to en. */
export function pick(v: { en: string; km: string | null } | undefined, lang: Lang): string {
  if (!v) return '';
  return (lang === 'km' ? v.km : v.en) ?? v.en;
}

/**
 * Build a path for a locale. English has no prefix:
 *   path('en', 'pricing/') -> '/pricing/'
 *   path('km', 'pricing/') -> '/km/pricing/'
 */
export const path = (lang: Lang, rest = '') =>
  (lang === defaultLang ? `/${rest}` : `/${lang}/${rest}`).replace(/\/+/g, '/');

/** Strips the locale prefix so a page can link to its own translation. */
export const stripLang = (pathname: string) =>
  pathname.replace(/^\/km\/?/, '/').replace(/^\//, '');

/** Signup deep link. The URL shape is defined once, here — never inline. */
const SIGNUP = 'https://app.vithean.com/signup/register';

/**
 * The plan a bare "start free trial" lands on — the header, the hero, the
 * closing CTA. Signing up with no plan attached drops the visitor on a chooser
 * before they have chosen anything, so the recommended plan is attached instead.
 *
 * Read from plans.json rather than hardcoded: `recommended` is set in the
 * pricing overlay, so if the recommended plan changes there, every bare trial
 * link follows it on the next build.
 */
const DEFAULT_PLAN = (plansData.plans.find((p) => p.recommended) ?? plansData.plans[0])?.packageId;

export const signupUrl = (opts: {
  packageId?: string; mode?: 'MONTHLY' | 'ANNUAL'; buyNow?: boolean; promoCode?: string; lang?: Lang;
} = {}) => {
  const p = new URLSearchParams();
  const packageId = opts.packageId ?? DEFAULT_PLAN;
  if (packageId) p.set('packageId', packageId);
  p.set('paymentMode', opts.mode ?? 'MONTHLY');
  p.set('promoCode', opts.promoCode ?? '');
  p.set('buyNow', String(opts.buyNow ?? false));
  if (opts.lang) p.set('lang', opts.lang);
  return `${SIGNUP}?${p}`;
};

/** Moves to my.vithean.com when the portal goes live. One constant, one edit. */
export const LOGIN_URL = 'https://app.vithean.com/auth/login';
export const DOCS_URL = 'https://help.vithean.com';

/**
 * One date format for the whole site. `km-KH` gives Khmer month names via
 * ICU, so news dates stop reading as English on Khmer routes.
 */
export const fmtDate = (d: Date | string, lang: Lang, month: 'short' | 'long' = 'long') =>
  (typeof d === 'string' ? new Date(`${d}T00:00:00`) : d)
    .toLocaleDateString(lang === 'km' ? 'km-KH' : 'en-GB',
      { day: 'numeric', month, year: 'numeric' });
