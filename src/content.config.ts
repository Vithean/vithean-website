import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

/* ── Editorial: markdown, edited by humans in pull requests ───────────── */

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(['press', 'event', 'article']),
    lang: z.enum(['en', 'km']).default('en'),
    featured: z.boolean().default(false),
    excerpt: z.string().default(''),
    sourceUrl: z.string().optional(),
    legacyId: z.string().optional(),
    image: z.string().optional(),
  }),
});

/**
 * Evergreen editorial: buyer's guides and explainers. Not news (it does not
 * age out) and not a product page (it binds to no feature and carries no
 * journal), so it gets its own collection rather than being forced into
 * either template.
 *
 * English only for now, and `lang` says so explicitly: a guide is argued
 * prose, and this repo writes Khmer rather than translating it.
 */
const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(200),
    updated: z.coerce.date(),
    lang: z.enum(['en', 'km']).default('en'),
    /** Where it used to live, so the canonical story stays legible. */
    movedFrom: z.string().optional(),
  }),
});

/** Legal text is kept verbatim per language — ids are `en/term-condition`,
 *  `km/term-condition`, etc. The URI and the wording do not change. */
const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
    lang: z.enum(['en', 'km']),
    updated: z.coerce.date(),
  }),
});

/** A journal that must balance. Every product page carries one. */
const journal = z.object({
  caption: z.string(),
  ref: z.string(),
  meta: z.string(),
  beforeCaption: z.string(),
  before: z.array(z.object({ label: z.string(), amount: z.string() })),
  lines: z.array(z.object({
    no: z.string(), acct: z.string(), dr: z.string(), cr: z.string(),
  })),
  total: z.object({ dr: z.string(), cr: z.string() }),
  chips: z.array(z.object({ kind: z.enum(['ok', 'caminv', 'plain']), text: z.string() })),
});

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    title: z.string(),
    nav: z.string(),
    eyebrow: z.string(),
    order: z.number(),
    /** Its own meta description — never the lead paragraph reused. */
    description: z.string().max(165),
    lead: z.string(),
    /** Binds to plans.json — tier availability is generated, never typed. */
    featureIds: z.array(z.string()),
    /**
     * Overrides the generated availability block with authored wording.
     * Use it only where marketing copy has to differ from the feature
     * labels the core returns; everywhere else, leave it out and the
     * block stays generated from `featureIds` so it cannot drift from
     * what a plan actually includes.
     */
    included: z.object({
      lead: z.string(),
      items: z.array(z.string()).min(1),
    }).optional(),
    visual: z.enum(['journal', 'report', 'trail', 'flow']),
    posts: journal.optional(),
    report: z.object({
      caption: z.string(), ref: z.string(), meta: z.string(),
      cols: z.array(z.string()),
      rows: z.array(z.array(z.string())),
      total: z.array(z.string()),
      note: z.string(),
    }).optional(),
    trail: z.object({
      caption: z.string(), ref: z.string(), meta: z.string(),
      steps: z.array(z.object({
        state: z.string(), who: z.string(), when: z.string(),
        note: z.string(), flag: z.boolean().optional(),
      })),
    }).optional(),
    footnote: z.string().optional(),
    points: z.array(z.object({ h: z.string(), p: z.string() })),
    /**
     * Required, not optional — a new product page cannot ship English-only.
     * The journal / report / trail cards are deliberately NOT here: demo
     * figures and account names stay English on both locales, per
     * src/i18n/glossary.json `englishByDefault`.
     */
    km: z.object({
      title: z.string(),
      nav: z.string(),
      eyebrow: z.string(),
      description: z.string().max(200),
      lead: z.string(),
      footnote: z.string().optional(),
      points: z.array(z.object({ h: z.string(), p: z.string() })),
      /** Required whenever the English `included` is present. */
      included: z.object({
        lead: z.string(),
        items: z.array(z.string()).min(1),
      }).optional(),
    }),
  }),
});

/* ── Commercial: JSON, published by vithean-central (manual for now) ──── */

const i18nText = z.object({ en: z.string(), km: z.string().nullable() });

const plans = defineCollection({
  loader: file('./src/data/plans.json', { parser: (t) => JSON.parse(t).plans }),
  schema: z.object({
    packageId: z.string().uuid(),
    slug: z.string(),
    planLevel: z.enum(['FREE', 'TRIAL', 'PROFESSIONAL', 'BUSINESS', 'ENTERPRISE', 'CUSTOM']),
    /** The core's own integer level — it gates which add-ons a plan may buy. */
    coreLevel: z.number().optional(),
    order: z.number(),
    recommended: z.boolean(),
    availability: z.enum(['PUBLIC', 'QUOTE_ONLY', 'HIDDEN']),
    createdAt: z.string(),
    updatedAt: z.string(),
    name: i18nText,
    tagline: i18nText,
    price: z.object({
      basis: z.enum(['FROM', 'FIXED']),
      currency: z.string(),
      monthlyBase: z.number(),
      annualBase: z.number().nullable(),
      effectiveMonthly: z.number(),
      /** Only set when the core reports a genuinely higher former price. */
      previousMonthly: z.number().nullable().optional(),
      appliedPromotionId: z.string().nullable(),
      vatTreatment: z.string(),
    }),
    limits: z.object({ users: z.number() }).passthrough(),
    features: z.array(z.object({
      id: z.string(),
      /** The core package this row came from — `PKG_<sort_order>`. */
      coreCode: z.string().optional(),
      /** Which band of the comparison table it belongs to. Null = add-on only. */
      group: z.string().nullable().optional(),
      label: i18nText, included: z.boolean(), highlight: z.boolean(),
    })),
  }),
});

const promotions = defineCollection({
  loader: file('./src/data/promotions.json', { parser: (t) => JSON.parse(t).promotions }),
  schema: z.object({
    id: z.string(),
    type: z.string(),
    code: z.string(),
    appliesTo: z.object({ packageIds: z.array(z.string()), paymentModes: z.array(z.string()) }),
    display: z.object({ badge: i18nText, headline: i18nText, detail: i18nText }),
    /** announceAt gates publication; startsAt/endsAt are evaluated in the browser. */
    window: z.object({ announceAt: z.string(), startsAt: z.string(), endsAt: z.string() }),
    placement: z.array(z.string()),
    priority: z.number(),
  }),
});

const testimonials = defineCollection({
  loader: file('./src/data/testimonials.json', { parser: (t) => JSON.parse(t).testimonials }),
  schema: z.object({
    id: z.string(),
    status: z.string(),
    name: z.string(),
    role: z.string(),
    company: z.string().nullable(),
    quote: i18nText,
    photo: z.string(),
    consentObtained: z.boolean(),
  }),
});

export const collections = { news, legal, guides, products, plans, promotions, testimonials };
