# vithean-website

The public marketing site at **vithean.com**. Astro 7 (static) · Vue 3 · PrimeVue 4 · Tailwind 4.
Published to GitHub Pages.

Design and content decisions live in `vithean-public/docs/redesign/` — this repo implements them.

```bash
npm install
npm run dev            # http://localhost:4331
npm run build          # runs the content guard, then builds → dist/
npm run preview        # serve dist/ on 4331
npm run check:content  # the guard on its own
```

### The content guard

`scripts/check-content.mjs` runs automatically before every build (npm `prebuild`), so a bad commit
fails locally and in CI instead of shipping:

| Check | Why |
|---|---|
| **Slugs are ASCII kebab-case** | A Khmer slug becomes a ~500-character URL and 404s in practice |
| **Journals balance** | Debits equal credits, and the stated total matches. Accountants check this. |
| **Reports tie** | Rows sum to the total, and each margin % matches its own row |
| **Khmer is filled** | Every `{ en, km }` pair has a non-empty `km` |
| **SVG figures are intact** | No `<style>` start-tag inside an inlined SVG stylesheet |

A second guard, `scripts/check-khmer-punctuation.mjs`, runs **after** the build (npm `postbuild`) and
reads the generated `dist/km/**` HTML — see *Khmer punctuation* below.

It found a trailing-hyphen slug on its first run. Both failure modes are verified: adding a
Khmer-named file and unbalancing a journal each fail the build.

The SVG check exists because the failure is silent. An inlined SVG stylesheet is **not** parsed as
raw text, so a literal `<style>` written inside it — even inside a CSS comment — opens a second
element and swallows every shape after it. Both figures on `/product/e-invoicing/` rendered as empty
boxes in both languages until this was caught.

---

## How to change things

**This is the part that matters.** Almost nothing requires touching a component.

| I want to… | Edit | Notes |
|---|---|---|
| Fix a typo, add a paragraph to a news article | `src/content/news/*.md` | Plain markdown + front matter |
| Publish a new article | Add `src/content/news/YYYY-MM-DD-slug.md` | Copy an existing file's front matter |
| Change a price, a plan name, a feature | `src/data/plans.json` | Cards, the matrix **and** the JSON-LD all follow |
| Run a promotion | `src/data/promotions.json` | Empty today. The shape is proven; see `$example` |
| Change a product page's copy | `src/content/products/*.md` | Including its journal figures |
| Change the team, story, address, social links | `src/data/company.json` | Header, footer and the About page all read it |
| Change a testimonial | `src/data/testimonials.json` | |
| Add or change a partner | `src/data/partners.json` | Logo goes in `public/assets/partners/` — see the README there |
| Change terms or privacy | `src/content/legal/*.md` | |
| Change page prose | `src/i18n/copy.ts` | Every entry is `{ en, km }`. **Do not put prose in an `.astro` file** |
| Translate a UI string into Khmer | `src/i18n/ui.ts` | Every key now carries Khmer. `null` would fall back to English |
| Change a product page | `src/content/products/*.md` | The `km:` block is **required** — a new product page cannot ship English-only |
| Translate content | The `km` field beside every `en` in `src/data/*.json` | Both fields always exist |
| Check a Khmer accounting term | `src/i18n/glossary.json` | Extracted from the product. Use it verbatim. |
| Add a legacy URL redirect | `redirects` in `astro.config.mjs` | One line per old → new |
| Change a colour, spacing, type size | `src/styles/tokens.css` | One `@theme` block. PrimeVue follows it. |
| Change a page's meta description | The page's `<Base description="…">`, or `description:` in the product front matter | Required. See below. |

### The rule that keeps it consistent

> **The summary is a filtered view of the detail, never a second list.**

The homepage plan cards render the same `features[]` array as the pricing matrix, filtered on
`highlight`. Product pages generate their "Included in — …" line from `plans.json` via `featureIds`.
So the homepage cannot promise something the pricing page contradicts, and tier availability cannot
drift.

---

## Structure

```
src/
├── content/                 markdown — humans, in pull requests
│   ├── news/                17 articles migrated from the WordPress archive
│   ├── products/            6 product pages (front matter carries the journal)
│   └── legal/               terms, privacy
├── data/                    JSON — commercial data
│   ├── plans.json           hand-authored today; vithean-central later
│   ├── promotions.json      empty, with the shape proven
│   ├── company.json         story, people, contact, social, payments
│   └── testimonials.json
├── i18n/                    ui.ts (strings) · utils.ts (t, pick, signupUrl, LOGIN_URL)
├── styles/
│   ├── fonts.css            Mukta (Latin) + Kantumruy Pro (Khmer), self-hosted
│   └── tokens.css           Tailwind @theme + the component styles
├── layouts/Base.astro       head, hreflang, Organization JSON-LD, skip link
├── components/              Astro (static) + vue/ (PrimeVue islands)
├── lib/seo.ts               titles, descriptions, breadcrumbs — the SEO contract
└── pages/[...lang]/         one route tree, English unprefixed
```

### Routes

**English lives at the root with no redirect. Only Khmer is prefixed.**

```
/                     /pricing/        /company/        /news/    /product/inventory/
/km/                  /km/pricing/     /km/company/     /km/news/ /km/product/inventory/
```

There is no `/en/`. A redirect on the homepage costs a round trip, splits link equity and gives
crawlers a hop before any content — for the default language that is a cost with no benefit.

`src/pages/[...lang]/` is a rest parameter: `getStaticPaths` returns `{ lang: undefined }` for
English and `{ lang: 'km' }` for Khmer, so one set of page files serves both.

**59 pages build in under 2 seconds.**

---

## Astro, Vue and PrimeVue — who does what

Astro renders everything to static HTML. Vue is used only where a page genuinely needs client-side
state, and those components hydrate as islands:

| Island | Component | Why it needs JS |
|---|---|---|
| News filters | `NewsFilter.vue` — PrimeVue `SelectButton`, `Tag` | Filtering without a round trip |
| FAQ | `FaqAccordion.vue` — PrimeVue `Accordion` | Disclosure |
| Mobile menu | `MobileNav.vue` — PrimeVue `Drawer` | Off-canvas nav |

Everything else — the journal cards, the pricing matrix, the product pages — is static HTML with no
JavaScript, because it is content and it should be crawlable and instant.

**PrimeVue is themed from the design tokens, not from a preset.** `src/vue-app.ts` builds a preset
whose primary ramp is the same plum used in `tokens.css`, in `vithean-myweb/tailwind.config.js` and
in `vithean-central-web/config/theme.js`. Do not add a second palette there — if those disagree,
the site and the product disagree about what the brand colour is.

**Tailwind 4** is wired through `@tailwindcss/vite`. The layer order is
`theme, base, primevue, components, utilities`, declared in both `tokens.css` and the PrimeVue
config, so utilities can override PrimeVue and the ported component styles sit in between.

---

## Deployment

Push to `main` → `.github/workflows/deploy.yml` builds and publishes to GitHub Pages.

One-time setup: **Settings → Pages → Source: GitHub Actions**, and point the `vithean.com` DNS at
GitHub Pages. `public/CNAME` holds the domain, `public/.nojekyll` stops Jekyll processing.

The workflow also listens for `repository_dispatch` with type `content-published`, which is how
`vithean-central` will trigger a rebuild after publishing `plans.json` or `promotions.json`.

**If you publish to `<user>.github.io/vithean-website` instead of a custom domain**, set
`base: '/vithean-website'` in `astro.config.mjs` and delete `public/CNAME`. Nothing else changes.

---

## Translation

**Two languages: English (default, unprefixed) and Khmer.** Nothing else — there is deliberately
no `/cn/` route.

Every translatable string lives in one of two places, and both always carry **both** languages:

| | |
|---|---|
| UI chrome — nav, buttons, labels, `<title>`, meta descriptions | `src/i18n/ui.ts` and `src/i18n/copy.ts` |
| Page prose — headings, leads, section copy | `src/i18n/copy.ts` |
| Content — plans, FAQ, company story, testimonials | `{ "en": …, "km": … }` beside each other in `src/data/*.json` |
| Product pages | The `km:` block in `src/content/products/*.md` |
| Figures | A `.km.svg` beside each `.svg` in `src/assets/diagrams/` |

`pick(value, lang)` and `c(value, lang)` read the right side, so a missing Khmer string degrades to
English rather than rendering blank.

> **Page templates must not contain prose.** A sentence hardcoded in an `.astro` file cannot be
> translated at all, which is how the Khmer routes once rendered 82 English strings. `copy.ts` is
> where that prose lives; `// V` marks Khmer taken verbatim from the live vithean.com/km pages,
> archived in `../vithean-public/docs/existing/km/`.

Khmer was reused from the published site wherever it existed — the nav and footer wording, the full
mission, vision and values, the team's Khmer names and biographies, and the office address. Reusing
it matters more than translating it well: two wordings for the same thing across the site, the
product and support reads as unreliability in a finance product.

Dates use `fmtDate(date, lang)`, which formats through `km-KH` so news dates render with Khmer
month names rather than English ones.

### ។ does not belong in a title or on a button

**។ (khan) closes a thought.** A Khmer reader takes it as *stop here*. That is correct in a
paragraph and wrong in a heading, on a button, or on a short line the reader scans rather than
reads — there it tells them to stop at the exact moment you want them to move on.

| | ។ |
|---|---|
| Headings, buttons, links, eyebrows, table captions and headers | **never** |
| Nav and footer labels, plan and feature names, timeline entries | **never** |
| One-line card text — a hero subtitle, a channel description, the line above a CTA | **never** |
| Paragraphs the reader actually reads — leads, product points, FAQ answers, bios, mission and values | yes, as normal |
| Meta descriptions, `<desc>` accessibility text, quoted speech | yes, as normal |

English copy often reads *"X. Y."* — two fragments with a full stop between them. Do **not** delete
the khan and run them together; join them with **—** or **·** instead:

```
Ask us. Someone here answers.   →  សួរយើង — មានបុគ្គលិកឆ្លើយតប
Quote to cash. Receipt to bill. →  ពីសម្រង់តម្លៃដល់ការទទួលប្រាក់ · ពីទទួលទំនិញដល់វិក្កយបត្រទិញ
```

`scripts/check-khmer-punctuation.mjs` enforces the first two rows on every build. It reads the
built HTML rather than the source, so it holds whichever file the string came from — `copy.ts`,
`ui.ts`, a JSON data file, or product front matter.

One deliberate exception: the owner quotes on the home page keep their khan. They sit inside `<q>`
and are complete quoted utterances; a quotation that does not end reads worse than one that does.

### The glossary is not optional

[`src/i18n/glossary.json`](src/i18n/glossary.json) holds 23 Khmer accounting terms **extracted from
the product's own locale files** — `vithean-ui/src/locale/km.js`, `vithean-myweb/i18n/km.json`,
`vithean-central-web/i18n/km/*.js`.

> **If a term is in the glossary, use it verbatim.** If it is not, translate it properly and add it,
> so the next person does not invent a second word.

Two terminologies for the same thing across the product, the site and support is the most common
self-inflicted trust problem in bilingual finance software — in a finance product it reads as
unreliability. Examples the site now matches: **inventory = សន្និធិ** (not ស្តុក),
**journal = ទិនានុប្បវត្តិ**, **collection = ការប្រមូលប្រាក់**, **warehouse = ឃ្លាំង**.

⚠ The extractor also found **two terms the product itself is inconsistent about** —
`security` (សុវត្តិភាព vs សុវត្ថិភាព) and `period` (រយៈពេល vs រយៈពេលវិក្កយបត្រ). They are recorded
under `conflictsInProduct` and should be settled in the app, not worked around here.

### Examples stay in English

Demo figures, document references and account names — `INV-2026-0412`, *Accounts receivable*,
`3,960.00` — are **English on both locales**. Most Cambodian accountants work in English for the
ledger itself, and translating them would make the example harder to verify, not easier.

### Articles can be in any language

An article is **not** translated per locale. It declares its own `lang:` in front matter, both
locales list every article, and the page renders the same content either way — with `lang` on the
headline and body so the font, leading and line breaking follow the article, not the interface.
The article page shows a language badge so a reader knows before they click.

**Slugs are always ASCII — English words or a number. Titles may be in any language.** A Khmer
slug percent-encodes to a ~500-character URL and breaks in practice, so the 2023 Canadia Bank
piece keeps its Khmer title and uses `poscar-canadia-bank-digital-partnership`.

This is enforced, not remembered — see the content guard below.

### Chinese

The **system interface** ships Khmer, English and Chinese — verified: `zh` locale files in
`vithean-ui`, `vithean-myweb` and `vithean-central-web`. It is worth stating as a product fact, and
it appears in the plan feature list and one FAQ answer.

**The website is English and Khmer only.** No `/cn/` route, no Chinese switcher. Always say *"the
system interface"* when Chinese is mentioned — dropping those two words is exactly what turned the
old site's "KH, EN, CN" into a credibility bug when `/cn/` returned 404.

---

## Legacy URLs

Every address the WordPress site published resolves — 48 redirects, generated from the archive and
listed in `redirects` in `astro.config.mjs`.

> ⚠ **GitHub Pages cannot issue a real 301.** It serves static files and has no redirect engine.
> Astro emits a page carrying `<meta http-equiv="refresh">`, a canonical link to the target and
> `noindex`. Google treats that as a redirect and passes signals, but it is weaker and slower than
> a true 301.
>
> **To get real 301s**, put a CDN or reverse proxy in front of the domain and move the map into a Bulk
> Redirect list. The map in `astro.config.mjs` stays the source of truth either way.

---

## Partners

`src/data/partners.json` drives the partner section on the company page. Three kinds, and the
distinction is not cosmetic:

| `kind` | Means |
|---|---|
| `partner` | A signed or standing working relationship |
| `integration` | A platform Vithean connects to — **not** an endorsement of Vithean |
| `community` | An event, forum or programme Vithean took part in — participation, not partnership |

The section renders **one group per kind, each under its own heading**. A group with no
entries is not rendered at all, so the `integration` machinery stays available without showing
an empty heading. When something is listed as an integration, its heading also carries the line
*"A technical connection, not an endorsement"*.

`caminv` is currently listed as a **partner**, with the official CamInv wordmark
(`caminv.png`, taken from `e-invoice.gov.kh/images/logo.png`) and a link to
[e-invoice.gov.kh](https://e-invoice.gov.kh/). Two things to keep straight:

- That file is the **CamInv brand mark**, not the Ministry of Economy and Finance state emblem
  (`mef-logo.png` on the same site). Never substitute the emblem — a state mark on a commercial
  page reads as official endorsement whatever the caption says.
- Displaying a government platform's mark as a partner is a business decision, not a technical
  one. Keep the written permission on file.

`logo: null` means the artwork has not been obtained yet. The tile renders a wordmark — the
organisation's own acronym where it has one — so the section is publishable before a single
file has been downloaded, and each logo can land on its own. When a path **is** set, the
content guard fails the build if the file is not in `public/`: a tile may be missing artwork,
but it can never be a broken image.

The organisation's name sits under every tile, always. A tooltip alone is unreachable on a
phone and from the keyboard, so the `title` carries the *relationship* instead — what the
organisation is to Vithean.

See [`public/assets/partners/README.md`](public/assets/partners/README.md) for what to request
from each organisation and the permission rules.

---

## Diagrams

Two customer-facing figures on `/product/e-invoicing/`, ported from
`vithean-special-docs/08-marketing/assets/`:

- **`caminv-flow.svg`** — four steps, one system. Every step is backed by the shipped integration
  (branch `caminv`, production 2025-07-17).
- **`compliance-placement.svg`** — where compliance sits: one system versus an accounting tool
  handing off to a separate e-invoicing vendor.

Each has a Khmer twin — `caminv-flow.km.svg` and `compliance-placement.km.svg` — picked by locale in
`src/pages/[...lang]/product/[slug].astro`. Two files rather than a string swap: the labels sit at
fixed `x`/`y` inside fixed-width boxes, so Khmer needs its own line breaks. The third figure, the
CamInv flow on the home page, is an Astro component (`src/components/CamInvFlow.astro`) and switches
its labels inline.

Both are **inlined**, not `<img>`, so they inherit the page's fonts and CSS variables. Porting them
required two changes: stripping their `prefers-color-scheme: dark` blocks (the site is committed
light), and **scoping their `<style>` with an `svg.figure` prefix** — an inlined SVG stylesheet is
not sandboxed, and these files define `.band` and `.flow`, which collide with the site's own classes.

Never write a `<style>` start-tag inside one of these stylesheets, comments included; the content
guard fails the build if you do, because the figure would otherwise render as an empty box with no
error anywhere.

Regenerate from `vithean-special-docs/competitors/build-*.mjs`, then re-apply those changes — and
update the `.km.svg` twin to match.

---

## Typography

**Self-hosted, not from the Google CDN** — no third-party request, no consent question, and the
Khmer face is guaranteed present rather than depending on the device.

- **Mukta** carries Latin · **Kantumruy Pro** carries Khmer
- Each Khmer face declares `unicode-range: U+1780-17FF, U+19E0-19FF, U+200C-200D, U+25CC`, so
  Khmer glyphs resolve to Kantumruy Pro **automatically** — no per-locale font swap. A mixed string
  like `INV-2026-0412` beside a Khmer customer name shares one baseline.
- 8 woff2 faces, 305 KB total. **Mukta 400 and Kantumruy Pro 400 are both preloaded on every page,
  English included.** The language switcher itself renders ខ្មែរ, Khmer article titles appear in the
  English news list, and Khmer business names turn up inside English copy — in Cambodia that is the
  normal case, not the exception, so a conditional preload would only cause a flash.
- Untagged Khmer inside English copy still renders in Kantumruy automatically. What tagging
  `lang="km"` adds is the looser leading and correct line breaking Khmer needs.
- Same arrangement as `vithean-myweb/assets/css/main.css`.

Declared in `src/styles/fonts.css`, imported at the top of `tokens.css`.

---

## SEO and AI discoverability

`src/lib/seo.ts` composes everything a search engine or an assistant reads, and enforces two rules:

1. **Every page declares its own description.** Not a reused lead paragraph, not a truncated first
   sentence. `description` is a required prop on `Base`, and product pages carry a
   `description:` field in front matter that is separate from `lead`.
2. **Titles and descriptions clamp on a word boundary**, and never end on a dangling word
   (`the`, `of`, `with`…). A snippet ending "…the supplier invo" reads as a broken site.

Article headlines run long, so `<title>` gets `clampTitle()` while the `<h1>` keeps the full
headline.

**The category words are deliberate and repeat** across titles, descriptions and JSON-LD:
*online accounting · ERP · Cambodia · CamInv*. That consistency is what lets a model classify
Vithean confidently instead of hedging.

Shipped: `robots.txt` (explicitly allowing GPTBot, ClaudeBot, PerplexityBot, Google-Extended and
others), `llms.txt`, generated `sitemap-index.xml`, `hreflang` for `en`/`km`/`x-default`, canonical
URLs, `og:image` (1200×630, generated from the real logo), Twitter cards, and JSON-LD:

| Schema | Where |
|---|---|
| `Organization` + `WebSite` | Every page |
| `SoftwareApplication` + `AggregateOffer` with real prices | `/pricing/` |
| `BreadcrumbList` | Product pages |
| `NewsArticle` / `Article` | Each news post |

That is Phase 0 of `vithean-public/docs/redesign/03-phase-0-work-order.md`, built in rather than
retrofitted.

**Audited on the built output**, not the dev server: 58 pages, zero missing or over-length
descriptions, zero duplicate titles or descriptions, `og:image` and 3 `hreflang` links on every
page.

---

## Still to do

| | Blocked on |
|---|---|
| Khmer copy | A Khmer-native writer. `null` values in `src/i18n/ui.ts` and `km` fields in the JSON mark every gap. **Write Khmer, do not translate English.** |
| Product screenshots | The Angkor Fresh capture pipeline. Each product page should open with a real capture, EN and KM. |
| A proof number | Someone deciding which figure is true and defensible. The competitor publishes three above the fold. |
| Customer stories | Written consent. |
| VAT treatment, seat counts, add-on prices | `plans.json → openDecisions[]` |
| `/implementation/` as its own page | Content is written; the page is not built |

**Every journal on the site balances, and the margin report ties.** If you edit those figures in
`src/content/products/*.md`, check the arithmetic — accountants will.
