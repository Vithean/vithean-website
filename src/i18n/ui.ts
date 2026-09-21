/**
 * UI strings. Every key now carries Khmer; `null` would fall back to English.
 * Khmer marked `V` is verbatim from vithean.com/km/ — reuse the words the
 * business already published rather than coining a second set. `G` cites
 * src/i18n/glossary.json, extracted from the product's own locale files.
 */
export const languages = { en: 'EN', km: 'ខ្មែរ' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

type Dict = Record<string, string | null>;

export const ui: Record<Lang, Dict> = {
  en: {
    'nav.home': 'Home',
    'nav.product': 'Product',
    'nav.pricing': 'Pricing',
    'nav.company': 'Company',
    'nav.news': 'News',
    'nav.guides': 'Guides',
    'nav.support': 'Support',
    'nav.docs': 'Docs',
    'cta.trial': 'Start free trial',
    /* Header only. Sends people to compare plans first rather than into
       signup on a preselected tier — see A6 in the 19 Aug review. */
    'cta.trialNav': 'Free Trial',
    'cta.login': 'Log in',
    'cta.buy': 'Buy now',
    'cta.sales': 'Talk to sales',
    'cta.comparePlans': 'Compare everything →',
    'cta.plansPricing': 'See plans and pricing →',
    'theme.label': 'Theme',
    'theme.system': 'System',
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'foot.product': 'Product',
    'foot.platform': 'Platform',
    'foot.company': 'Company',
    'foot.accept': 'We accept',
    'foot.follow': 'Follow us',
    'foot.docs': 'Documentation ↗',
    'foot.login': 'Log in ↗',
    'foot.account': 'My account ↗',
    'foot.security': 'Security',
    'foot.academy': 'Vithean Academy',
    'foot.contact': 'Contact',
    'foot.city': 'Phnom Penh, Cambodia',
    'foot.terms': 'Terms',
    'foot.privacy': 'Privacy',
    'foot.tagline':
      'A Cambodian business system of record. Accounting, inventory, sales, purchasing and banking on one ledger.',
    'price.feature': 'Feature',
    'price.included': 'Included',
    'price.notIncluded': 'Not included',
    'price.plan': 'Plan',
    'price.usersIncluded': 'Users included',
    'price.compareCaption': 'Everything, compared',
    'price.from': 'from',
    'price.month': '/month',
    'price.users': 'users',
    'price.mostChosen': 'Most chosen',
    'price.includedIn': 'Included in —',
    'price.everyPlan': 'every plan',
    'news.all': 'All',
    'news.press': 'Press',
    'news.event': 'Events',
    'news.article': 'Articles',
    'news.filterAria': 'Filter articles',
    'news.readMore': 'Read →',
    'news.count': 'articles',
    'product.posts': 'What it posts to the ledger',
    'product.guide': 'Read the guide on help.vithean.com ↗',
    'a11y.skip': 'Skip to content',
    'a11y.mainNav': 'Main navigation',
    'a11y.menu': 'Menu',
    'a11y.enlarge': 'Enlarge diagram',
    'a11y.close': 'Close',
    'a11y.language': 'Language',
  },
  km: {
    'nav.home': 'ទំព័រដើម',
    'nav.product': 'ផលិតផល',
    'nav.pricing': 'តម្លៃ',
    'nav.company': 'អំពីយើង',
    'nav.news': 'ព័ត៌មាន',
    'nav.guides': 'ការណែនាំ',
    'nav.support': 'ជំនួយ',
    'nav.docs': 'ឯកសារ',
    'cta.trial': 'សាកល្បងឥតគិតថ្លៃ',
    'cta.trialNav': 'សាកល្បងឥតគិតថ្លៃ',
    'cta.login': 'ចូល',
    'cta.buy': 'ទិញឥឡូវនេះ',
    'cta.sales': 'ពិភាក្សាជាមួយផ្នែកលក់',   // G ការលក់
    'cta.comparePlans': 'ប្រៀបធៀបទាំងអស់ →',   // G គម្រោង
    'cta.plansPricing': 'មើលគម្រោង និងតម្លៃ →',   // G គម្រោង, តម្លៃ
    'theme.label': 'ទម្រង់ពណ៌',
    'theme.system': 'តាមម៉ាស៊ីន',
    'theme.light': 'ភ្លឺ',
    'theme.dark': 'ងងឹត',
    'foot.product': 'ផលិតផល',
    'foot.platform': 'ប្រព័ន្ធ',
    'foot.company': 'ក្រុមហ៊ុន',
    'foot.accept': 'យើងទទួលការទូទាត់តាម',   // G ការទូទាត់
    'foot.follow': 'បណ្ដាញសង្គមរបស់យើង',   // V
    'foot.docs': 'ឯកសារណែនាំ ↗',
    'foot.login': 'ចូលប្រើប្រាស់ ↗',
    'foot.account': 'គណនីរបស់ខ្ញុំ ↗',   // G គណនី
    'foot.security': 'សុវត្ថិភាព',   // G — myweb spelling; see conflictsInProduct
    'foot.academy': 'វិទ្យាស្ថាន វិធាន',
    'foot.contact': 'ទំនាក់ទំនង',
    'foot.city': 'ភ្នំពេញ ព្រះរាជាណាចក្រកម្ពុជា',
    'foot.terms': 'លក្ខខណ្ឌ',   // V
    'foot.privacy': 'គោលការណ៍នៃសិទ្ធិឯកជន',   // V
    'foot.tagline': 'ប្រព័ន្ធកត់ត្រាអាជីវកម្មកម្ពុជា — គណនេយ្យ សន្និធិ ការលក់ ការទិញ និងធនាគារ នៅលើបញ្ជីតែមួយ',   // G សន្និធិ, ការលក់, ធនាគារ
    'price.feature': 'មុខងារ',
    'price.included': 'មាន',
    'price.notIncluded': 'មិនមាន',
    'price.plan': 'គម្រោង',   // G
    'price.usersIncluded': 'អ្នកប្រើប្រាស់រួមបញ្ចូល',   // G អ្នកប្រើប្រាស់
    'price.compareCaption': 'ប្រៀបធៀបទាំងអស់',
    'price.from': 'ចាប់ពី',
    'price.month': 'មួយខែ',
    'price.users': 'អ្នកប្រើប្រាស់',   // G
    'price.mostChosen': 'ពេញនិយម',
    'price.includedIn': 'មានក្នុង —',
    'price.everyPlan': 'គ្រប់គម្រោង',   // G គម្រោង
    'news.all': 'ទាំងអស់',
    'news.press': 'សេចក្ដីប្រកាស',   // V
    'news.event': 'ព្រឹត្តិការណ៍',
    'news.article': 'អត្ថបទ',
    'news.filterAria': 'ត្រងអត្ថបទ',
    'news.readMore': 'អានបន្ត →',
    'news.count': 'អត្ថបទ',
    'product.posts': 'អ្វីដែលវាកត់ត្រាចូលបញ្ជី',   // G ទិនានុប្បវត្តិ
    'product.guide': 'អានឯកសារណែនាំនៅ help.vithean.com ↗',
    'a11y.skip': 'រំលងទៅមាតិកា',
    'a11y.mainNav': 'ការរុករកចម្បង',
    'a11y.menu': 'ម៉ឺនុយ',
    'a11y.enlarge': 'ពង្រីករូបភាព',
    'a11y.close': 'បិទ',
    'a11y.language': 'ភាសា',   // G
  },
};
