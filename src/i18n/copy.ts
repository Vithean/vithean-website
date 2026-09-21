/**
 * Page copy, both languages, in one place.
 *
 * Page templates must not contain prose. If a sentence is hardcoded in an
 * .astro file it cannot be translated, and that is exactly how the Khmer routes
 * ended up rendering 82 English strings.
 *
 * `// V` marks Khmer taken verbatim from the live vithean.com/km pages
 * (archived in vithean-public/docs/existing/km/). Everything else is drafted
 * and still needs a Khmer-native reviewer — rule 1 is "write Khmer, do not
 * translate English".
 *
 * Accounting terms come from src/i18n/glossary.json, which is extracted from
 * the product's own locale files. Do not substitute synonyms.
 *
 * Demo figures, document references and account names stay in ENGLISH on both
 * locales — most Cambodian accountants work in English for the ledger itself.
 */
import type { Lang } from './ui';

type T = { en: string; km: string };
const t = (en: string, km: string): T => ({ en, km });

export const copy = {
  home: {
    eyebrow: t('Cambodian business system of record', 'ប្រព័ន្ធកត់ត្រាអាជីវកម្មកម្ពុជា'),
    h1a: t('Grow your business without ', 'ពង្រីកអាជីវកម្មរបស់អ្នក ដោយមិន'),
    h1em: t('losing control', 'បាត់បង់ការគ្រប់គ្រង'),
    h1b: t('', ''),
    sub: t(
      'Accounting, inventory, sales, purchasing and banking on one platform — in Khmer and English.',
      'គណនេយ្យ សន្និធិ ការលក់ ការទិញ និងធនាគារ ក្នុងប្រព័ន្ធតែមួយ — ជាភាសាខ្មែរ និងអង់គ្លេស'),

    /* Describes the panels on the shot, not figures: the screenshot is
       replaced from time to time and numbers in alt text go stale silently. */
    shotAlt: t(
      'The Vithean dashboard: bank and cash balances, invoices owed to you, what you owe, collections and total sales on one screen.',
      'ផ្ទាំងគ្រប់គ្រងរបស់ វិធាន៖ សមតុល្យធនាគារ និងសាច់ប្រាក់ វិក្កយបត្រដែលគេជំពាក់លោកអ្នក អ្វីដែលលោកអ្នកជំពាក់ ការប្រមូលប្រាក់ និងការលក់សរុប នៅលើអេក្រង់តែមួយ។'),

    /* Above-the-fold provenance. Deliberately not "Trusted by" — these are
       institutions Vithean works with, not customers, and the stronger claim
       would be the wrong one. */
    trustEyebrow: t('Working with', 'ធ្វើការជាមួយ'),
    caminvEyebrow: t('Cambodia E-Invoicing', 'វិក្កយបត្រអេឡិចត្រូនិកកម្ពុជា'),
    caminvH2: t('Sell to the customers who require e-invoices.',
      'លក់ទៅកាន់អតិថិជនដែលទាមទារវិក្កយបត្រអេឡិចត្រូនិក'),
    caminvP: t(
      'Bigger buyers increasingly will not accept anything else. Vithean issues e-invoices, credit notes and debit notes through CamInv — the national platform run by the Ministry of Economy and Finance — from inside the same screen that raises the invoice.',
      'អតិថិជនធំៗកាន់តែច្រើនឡើងមិនទទួលយកអ្វីផ្សេងទៀតទេ។ វិធានចេញវិក្កយបត្រអេឡិចត្រូនិក លិខិតឥណទាន និងលិខិតឥណពន្ធ តាមរយៈ CamInv — វេទិកាជាតិដែលគ្រប់គ្រងដោយក្រសួងសេដ្ឋកិច្ច និងហិរញ្ញវត្ថុ — ពីអេក្រង់ដដែលដែលចេញវិក្កយបត្រ។'),
    caminvIncluded: t('Included in every plan, at no extra cost.',
      'រួមបញ្ចូលក្នុងគ្រប់គម្រោង ដោយមិនគិតថ្លៃបន្ថែម'),
    caminvCta: t('How e-invoicing works →', 'របៀបដែលវិក្កយបត្រអេឡិចត្រូនិកដំណើរការ →'),

    problemsEyebrow: t('What owners tell us', 'អ្វីដែលម្ចាស់អាជីវកម្មប្រាប់យើង'),
    problemsH2: t('None of these is an accounting problem.',
      'គ្មានបញ្ហាណាមួយក្នុងចំណោមនេះជាបញ្ហាគណនេយ្យទេ'),
    problemsP: t(
      'They are operating problems, and they are the reason a business stops growing. One system solves all of them — and keeps the books right while it does.',
      'ទាំងនេះជាបញ្ហាប្រតិបត្តិការ ហើយជាមូលហេតុដែលអាជីវកម្មឈប់រីកចម្រើន។ ប្រព័ន្ធតែមួយដោះស្រាយវាទាំងអស់ — ហើយរក្សាបញ្ជីគណនេយ្យឱ្យត្រឹមត្រូវក្នុងពេលតែមួយ។'),
    converge: t(
      'Every one of these has the same fix — the warehouse, the sales desk and the office writing to one ledger',
      'បញ្ហាទាំងអស់នេះមានដំណោះស្រាយតែមួយ — ឃ្លាំង ផ្នែកលក់ និងការិយាល័យ កត់ត្រាទៅបញ្ជីគណនេយ្យតែមួយ'),

    implEyebrow: t('Getting started', 'ការចាប់ផ្តើម'),
    implH2: t('You do not have to do this alone.', 'លោកអ្នកមិនចាំបាច់ធ្វើវាតែម្នាក់ឯងទេ'),
    implP: t(
      'Most businesses this size do not have a full accounting or IT team. That is the normal case, not a problem. We set Vithean up with you — opening balances, chart of accounts, your master data — and we train the people who will actually do the work.',
      'អាជីវកម្មខ្នាតនេះភាគច្រើនគ្មានក្រុមគណនេយ្យ ឬព័ត៌មានវិទ្យាពេញលេញទេ។ នេះជារឿងធម្មតា មិនមែនជាបញ្ហាទេ។ យើងដំឡើងវិធានជាមួយលោកអ្នក — សមតុល្យដើមគ្រា តារាងគណនី និងទិន្នន័យមេ — ហើយបណ្តុះបណ្តាលបុគ្គលិកដែលធ្វើការពិតប្រាកដ។'),
    implNotLabel: t('What we do not do:', 'អ្វីដែលយើងមិនធ្វើ៖'),
    implNot: t(
      'keep your books, or prepare your returns. That stays with your team, or with your accounting firm.',
      'កាន់បញ្ជីគណនេយ្យ ឬរៀបចំរបាយការណ៍ពន្ធជំនួសលោកអ្នក។ នោះនៅតែជាការងាររបស់ក្រុមលោកអ្នក ឬក្រុមហ៊ុនគណនេយ្យរបស់លោកអ្នក។'),

    /**
     * The split of responsibility during setup. Real markup rather than a
     * drawing: it is two labelled lists, so it reflows on a phone and the words
     * stay translatable, selectable and indexable.
     */
    handover: {
      weSetUp: t('We set up', 'យើងដំឡើងជូន'),
      weItems: [
        t('Opening balances', 'សមតុល្យដើមគ្រា'),
        t('Chart of accounts', 'តារាងគណនី'),
        t('Roles and approvals', 'តួនាទី និងការអនុម័ត'),
        t('Training your team', 'បណ្តុះបណ្តាលក្រុមអ្នក'),
      ],
      seam: t('The first month-end, walked together',
              'ការបិទបញ្ជីលើកដំបូង ធ្វើជាមួយគ្នា'),
      youRunIt: t('You run it', 'អ្នកដំណើរការវា'),
      youItems: [
        t('Daily entry', 'ការបញ្ចូលប្រចាំថ្ងៃ'),
        t('Your month-end close', 'ការបិទបញ្ជីចុងខែរបស់អ្នក'),
        t('Your tax returns', 'ការប្រកាសពន្ធរបស់អ្នក'),
      ],
      note: t('The books stay with your team, or with your accounting firm',
              'បញ្ជីគណនេយ្យនៅតែជារបស់ក្រុមអ្នក ឬក្រុមហ៊ុនគណនេយ្យរបស់អ្នក'),
    },

    reviewsEyebrow: t('Testimonials', 'មតិយោបល់អតិថិជន'),
    reviewsH2: t('Why people love Vithean.', 'ហេតុអ្វីមនុស្សចូលចិត្តវិធាន'),

    plansEyebrow: t('Plans', 'គម្រោង'),
    plansH2: t('Every plan issues compliant e‑invoices.',
      'គ្រប់គម្រោងចេញវិក្កយបត្រអេឡិចត្រូនិកស្របតាមបទប្បញ្ញត្តិ'),

    closeH2: t('Start with whichever one is costing you most.',
      'ចាប់ផ្តើមពីបញ្ហាដែលកំពុងចំណាយច្រើនបំផុតរបស់លោកអ្នក'),
    closeP: t('30 days free. Name, email and phone — that is the whole signup.',
      'ឥតគិតថ្លៃ ៣០ ថ្ងៃ — ឈ្មោះ អ៊ីមែល និងលេខទូរស័ព្ទ គ្រាន់តែប៉ុណ្ណឹង'),
    closeTalk: t('Talk to us', 'ទាក់ទងមកយើង'),
  },

  problems: [
    { q: t('I don’t know what we actually made last month until someone builds a spreadsheet.',
           'ខ្ញុំមិនដឹងថាយើងចំណេញប៉ុន្មានកាលពីខែមុនទេ លុះត្រាតែមាននរណាម្នាក់ធ្វើតារាង Excel។'),
      fix: t('Reports and margin →', 'របាយការណ៍ និងរឹមចំណេញ →'), to: 'reports' },
    { q: t('The container landed and I still can’t tell you what a unit really cost.',
           'ទំនិញមកដល់ហើយ តែខ្ញុំនៅតែមិនអាចប្រាប់បានថាតម្លៃដើមក្នុងមួយឯកតាប៉ុន្មាន។'),
      fix: t('Landed cost →', 'តម្លៃដើមរួមបញ្ចូល →'), to: 'inventory' },
    { q: t('We opened a second shop and now there are two sets of numbers.',
           'យើងបើកហាងទីពីរ ហើយឥឡូវនេះមានតួលេខពីរឈុតផ្សេងគ្នា។'),
      fix: t('Multi-location →', 'ទីតាំងច្រើន →'), to: 'inventory' },
    { q: t('I can’t take a week off — everything goes through me.',
           'ខ្ញុំមិនអាចឈប់សម្រាកមួយសប្តាហ៍បានទេ — អ្វីៗទាំងអស់ត្រូវឆ្លងកាត់ខ្ញុំ។'),
      fix: t('Roles and approvals →', 'តួនាទី និងការអនុម័ត →'), to: 'control' },
    { q: t('A big customer asked for e-invoices and we couldn’t issue them.',
           'អតិថិជនធំម្នាក់ស្នើសុំវិក្កយបត្រអេឡិចត្រូនិក តែយើងចេញមិនបាន។'),
      fix: t('E-invoicing →', 'វិក្កយបត្រអេឡិចត្រូនិក →'), to: 'e-invoicing' },
  ],

  steps: [
    { h: t('Scope', 'កំណត់វិសាលភាព'),
      p: t('We look at how you work now, and what your numbers look like today.',
           'យើងពិនិត្យមើលរបៀបធ្វើការបច្ចុប្បន្នរបស់លោកអ្នក និងស្ថានភាពតួលេខសព្វថ្ងៃ') },
    { h: t('Set up', 'ដំឡើង'),
      p: t('Opening balances and master data imported, validated before anything is written.',
           'សមតុល្យដើមគ្រា និងទិន្នន័យមេត្រូវនាំចូល ដោយត្រួតពិនិត្យមុននឹងកត់ត្រា') },
    { h: t('Configure', 'កំណត់រចនាសម្ព័ន្ធ'),
      p: t('Chart of accounts, roles and approvals arranged around your workflow.',
           'តារាងគណនី តួនាទី និងការអនុម័ត រៀបចំតាមលំហូរការងាររបស់លោកអ្នក') },
    { h: t('Train', 'បណ្តុះបណ្តាល'),
      p: t('The people who do the work, in Khmer — not just the accountant.',
           'បុគ្គលិកដែលធ្វើការពិតប្រាកដ ជាភាសាខ្មែរ — មិនត្រឹមតែគណនេយ្យករទេ') },
    { h: t('First close', 'ការបិទគ្រាលើកដំបូង'),
      p: t('We walk your first month-end through with you. Never in a filing week.',
           'យើងដើរតាមការបិទបញ្ជីចុងខែលើកដំបូងជាមួយលោកអ្នក — មិនធ្វើក្នុងសប្តាហ៍ប្រកាសពន្ធឡើយ') },
  ],

  pricing: {
    // TODO(review-2026-08-19): Khmer pending a Khmer-native writer. English is
    // from the HSD review; the Khmer below is the previous wording, kept so the
    // /km route never renders an empty heading.
    h1: t('Scale your business with zero hidden fees.',
      'គ្រប់គម្រោងចេញវិក្កយបត្រអេឡិចត្រូនិកស្របតាមបទប្បញ្ញត្តិ'),
    lead: t(
      'Official Cambodia E-Invoicing is included across all tiers at no extra cost. Higher plans simply unlock broader operational coverage and control.',
      'វិក្កយបត្រអេឡិចត្រូនិកកម្ពុជា រួមបញ្ចូលចាប់ពីគម្រោងដំបូងឡើងទៅ ដោយមិនគិតថ្លៃបន្ថែម។ អ្វីដែលខុសគ្នារវាងគម្រោង គឺទំហំអាជីវកម្មដែលប្រព័ន្ធគ្របដណ្តប់។'),
    priceline: t(
      'These are starting prices, per company, per month. What you pay depends on how many people use it, which modules you need, and how much help you want setting it up.',
      'ទាំងនេះជាតម្លៃចាប់ផ្តើម ក្នុងមួយក្រុមហ៊ុន ក្នុងមួយខែ។ អ្វីដែលលោកអ្នកបង់ អាស្រ័យលើចំនួនអ្នកប្រើប្រាស់ ម៉ូឌុលដែលត្រូវការ និងកម្រិតជំនួយក្នុងការដំឡើង។'),

    /**
     * The plan cards. Two blocks on this page were saying the same thing: the
     * cards listed all fifteen features and the matrix below listed them again.
     * The cards now carry a one-line "who it is for" and a short inclusion
     * summary, and the matrix stays the place to compare line by line.
     *
     * `{users}` is substituted from plans.json at render, so the seat count
     * stays whatever the pricing API says rather than being typed here twice.
     * Keyed by plan slug.
     */
    cards: {
      basic: {
        who: t('Sole proprietorships, startups, and businesses with straightforward transaction needs.',
          'អាជីវកម្មម្ចាស់តែម្នាក់ អាជីវកម្មទើបចាប់ផ្តើម និងអាជីវកម្មដែលមានប្រតិបត្តិការមិនស្មុគស្មាញ'),
        items: [
          t('Core accounting', 'គណនេយ្យមូលដ្ឋាន'),
          t('{users} users', 'អ្នកប្រើ {users} នាក់'),
          t('Single location', 'ទីតាំងតែមួយ'),
        ],
      },
      standard: {
        who: t('Growing businesses managing inventory, stock, and tiered pricing.',
          'អាជីវកម្មកំពុងរីកចម្រើន ដែលគ្រប់គ្រងសន្និធិ ស្តុក និងតម្លៃតាមកម្រិត'),
        items: [
          t('Everything in Basic', 'គ្រប់យ៉ាងក្នុង Basic'),
          t('Inventory tracking', 'ការតាមដានសន្និធិ'),
          t('Custom price lists', 'តារាងតម្លៃតាមតម្រូវការ'),
          t('{users} users', 'អ្នកប្រើ {users} នាក់'),
        ],
      },
      advance: {
        who: t('Multi-location businesses requiring advanced permissions and approval workflows.',
          'អាជីវកម្មដែលមានទីតាំងច្រើន និងត្រូវការសិទ្ធិលម្អិត និងលំហូរការអនុម័ត'),
        items: [
          t('Everything in Standard', 'គ្រប់យ៉ាងក្នុង Standard'),
          t('Multi-location', 'ទីតាំងច្រើន'),
          t('Approval workflows & audit trails', 'លំហូរការអនុម័ត និងកំណត់ហេតុតាមដាន'),
          t('Fine-grained role permissions', 'សិទ្ធិតួនាទីលម្អិត'),
          t('{users} users', 'អ្នកប្រើ {users} នាក់'),
        ],
      },
    },
    /* Linked from the page where someone is already comparing. The guide is
       English-only, so the Khmer route sends readers to the English URL
       rather than pretending a translation exists. */
    guideLink: t('Comparing us with QuickBooks or Xero? Read the guide to choosing accounting software in Cambodia →',
      'កំពុងប្រៀបធៀបជាមួយ QuickBooks ឬ Xero? អានការណែនាំអំពីការជ្រើសរើសកម្មវិធីគណនេយ្យនៅកម្ពុជា (ភាសាអង់គ្លេស) →'),
    addonsH: t('Add-ons', 'កម្មវិធីបន្ថែម'),
    addonsP: t('Anything beyond your plan, at a price you can see before you ask.',
      'អ្វីៗលើសពីគម្រោងរបស់លោកអ្នក ជាមួយតម្លៃដែលមើលឃើញមុននឹងសួរ'),
    note: t('30-day trial, no card required. Onboarding and data migration are scoped and priced.',
      'សាកល្បង ៣០ ថ្ងៃ ដោយមិនទាមទារកាត · ការដំឡើង និងការនាំចូលទិន្នន័យ ត្រូវកំណត់វិសាលភាព និងគិតថ្លៃ'),
    /**
     * CamInv is excluded from trial tenants in the core. The reason is not a
     * product limit — connecting requires the business to be registered with
     * CamInv at the Ministry of Economy and Finance — so it is stated as the
     * step it is, next to the claim that every plan includes it.
     */
    caminvTrial: t(
      'Cambodia E-Invoicing is switched on when you subscribe, not during the trial: connecting needs your business registered with CamInv at the Ministry of Economy and Finance, and we take you through it.',
      'វិក្កយបត្រអេឡិចត្រូនិកកម្ពុជា បើកនៅពេលលោកអ្នកជាវ មិនមែនក្នុងអំឡុងពេលសាកល្បងទេ៖ ការតភ្ជាប់តម្រូវឲ្យអាជីវកម្មរបស់លោកអ្នកចុះបញ្ជីជាមួយ CamInv នៅក្រសួងសេដ្ឋកិច្ច និងហិរញ្ញវត្ថុ ហើយយើងជួយណែនាំលោកអ្នក។'),
    matrixCaption: t('Everything, compared', 'ប្រៀបធៀបទាំងអស់'),
    colFeature: t('Feature', 'មុខងារ'),
    rowPlan: t('Plan', 'គម្រោង'),
    rowUsers: t('Users included', 'អ្នកប្រើប្រាស់រួមបញ្ចូល'),
    /** Add-ons themselves come from plans.json — the core prices them. */
    perMonth: t('per month', 'ក្នុងមួយខែ'),
    perUserMonth: t('per user, per month', 'ក្នុងម្នាក់ ក្នុងមួយខែ'),
    vatNote: t(
      'Prices are per company, per month, before VAT.',
      'តម្លៃគិតក្នុងមួយក្រុមហ៊ុន ក្នុងមួយខែ មិនទាន់រួមបញ្ចូលអាករលើតម្លៃបន្ថែម'),
  },

  guides: {
    metaTitle: t('Guides | Vithean', 'ការណែនាំ | វិធាន'),
    metaDesc: t(
      'Practical guides to choosing and running accounting software in Cambodia, from the team that builds Vithean.',
      'ការណែនាំជាក់ស្តែងអំពីការជ្រើសរើស និងប្រើប្រាស់កម្មវិធីគណនេយ្យនៅកម្ពុជា ពីក្រុមការងារដែលបង្កើត វិធាន'),
    h1: t('Guides', 'ការណែនាំ'),
    /* Says up front that the writing is in English. A Khmer reader should learn
       that from the page, not from clicking through to it. */
    lead: t(
      'Practical writing on choosing and running accounting software in Cambodia — the local requirements, the trade-offs, and where other systems do the job better.',
      'ការសរសេរជាក់ស្តែងអំពីការជ្រើសរើស និងប្រើប្រាស់កម្មវិធីគណនេយ្យនៅកម្ពុជា។ បច្ចុប្បន្ន ការណែនាំទាំងនេះមានជាភាសាអង់គ្លេសប៉ុណ្ណោះ។'),
  },

  company: {
    /* Stated as a fact with a date, next to the story. A launch date is one
       of the first things a buyer checks to decide whether a vendor is
       established, and it was nowhere on the site. */
    launched: t(
      'Vithean was officially launched on 1 September 2022 — the founding date of Vithean, Online Business and Accounting System.',
      'វិធាន ត្រូវបានដាក់ឱ្យប្រើប្រាស់ជាផ្លូវការនៅថ្ងៃទី១ ខែកញ្ញា ឆ្នាំ២០២២ ដែលជាកាលបរិច្ឆេទបង្កើត វិធាន ប្រព័ន្ធគ្រប់គ្រងអាជីវកម្ម និងគណនេយ្យតាមអនឡាញ។'),
    mvv: [
      t('Mission', 'បេសកកម្ម'),
      t('Vision', 'ចក្ខុវិស័យ'),
      t('Values', 'តម្លៃ'),
    ],
    peopleEyebrow: t('The people', 'ក្រុមការងារ'),
    peopleH2: t('Engineers and practising accountants, on one product.',
      'វិស្វករ និងគណនេយ្យករជំនាញ លើផលិតផលតែមួយ'),
    mvvEyebrow: t('What we are for', 'អ្វីដែលយើងឈរជើង'),
    recordEyebrow: t('On the record', 'កំណត់ត្រាជាក់ស្តែង'),
    recordH2: t('What has actually happened, and when.',
      'អ្វីដែលបានកើតឡើងពិតប្រាកដ និងនៅពេលណា'),
    partnersEyebrow: t('Who we work with', 'អ្នកដែលយើងសហការជាមួយ'),
    partnersH2: t('Partners, institutions and the people we build with',
      'ដៃគូ ស្ថាប័ន និងអ្នកដែលយើងកសាងរួមគ្នា'),
    partnersP: t(
      'Every organisation here is on the record — a signed agreement, a shipped integration, or an event we took part in.',
      'គ្រប់ស្ថាប័នដែលមានក្នុងទំព័រនេះ សុទ្ធតែមានភស្តុតាងច្បាស់លាស់ — កិច្ចព្រមព្រៀងដែលបានចុះហត្ថលេខា ការតភ្ជាប់ដែលដំណើរការ ឬព្រឹត្តិការណ៍ដែលយើងបានចូលរួម។'),
    partnerGroups: {
      partner: t('Partners', 'ដៃគូ'),
      integration: t('Integration', 'ការតភ្ជាប់ប្រព័ន្ធ'),
      community: t('Events and programmes', 'ព្រឹត្តិការណ៍ និងកម្មវិធី'),
    },
    /** Says what an integration is, so the tile cannot be read as an endorsement. */
    integrationNote: t('A technical connection, not an endorsement',
      'ការតភ្ជាប់បច្ចេកទេស មិនមែនជាការទទួលស្គាល់ជាផ្លូវការទេ'),
    findEyebrow: t('Find us', 'ទីតាំងរបស់យើង'),
    findH2: t('Phnom Penh.', 'រាជធានីភ្នំពេញ'),
    mapCta: t('Open in Google Maps →', 'បើកក្នុង Google Maps →'),
    telegramCta: t('Message us on Telegram →', 'ផ្ញើសារមកយើងតាមតេឡេក្រាម →'),
  },

  support: {
    h1: t('Ask us. Someone here answers.', 'សួរយើង — មានបុគ្គលិកឆ្លើយតប'),
    // TODO(review-2026-08-19): Khmer pending.
    lead: t('Support is available in Khmer and English, {hours}. For step-by-step feature guides and quick tutorials, check our online help — documentation is available 24/7.',
      'សេវាជំនួយមានជាភាសាខ្មែរ និងអង់គ្លេស {hours}។ សម្រាប់របៀបធ្វើកិច្ចការជាក់លាក់ក្នុងប្រព័ន្ធ ឯកសារណែនាំលឿនជាងយើង។'),
    visitH: t('Visit us', 'អញ្ជើញមកលេងយើង'),
    visitP: t('3E:Fii Building, 6th floor, Chroy Changvar, Phnom Penh. Stop by our office — visit us, you are welcome.',
      'អគារ 3E:Fii ជាន់ទី៦ ជ្រោយចង្វារ រាជធានីភ្នំពេញ។ អញ្ជើញមកការិយាល័យរបស់យើង — យើងស្វាគមន៍លោកអ្នក។'),  // V (address)
    visitCta: t('Open in Google Maps →', 'បើកក្នុង Google Maps →'),
    qEyebrow: t('Questions', 'សំណួរ'),
    qH2: t('The things people ask before they buy.', 'សំណួរដែលត្រូវបានសួរញឹកញាប់'),  // V (khan dropped — heading)
    qP: t('How the system works day to day is covered in the documentation — this is everything else.',
      'របៀបដែលប្រព័ន្ធដំណើរការប្រចាំថ្ងៃ មាននៅក្នុងឯកសារណែនាំ — នៅទីនេះគឺអ្វីៗផ្សេងទៀត។'),
    closeH2: t('Still not sure it fits?', 'នៅតែមិនប្រាកដថាសមនឹងលោកអ្នក?'),
    closeP: t('Tell us how the business runs and we will tell you honestly whether Vithean is the right system for it.',
      'ប្រាប់យើងពីរបៀបដែលអាជីវកម្មរបស់លោកអ្នកដំណើរការ ហើយយើងនឹងប្រាប់ដោយស្មោះថាតើវិធានសមឬអត់។'),
    closeCta: t('Message us on Telegram', 'ផ្ញើសារមកយើងតាមតេឡេក្រាម'),
    closeAlt: t('Other ways to reach us', 'មធ្យោបាយផ្សេងទៀតដើម្បីទាក់ទងយើង'),
  },

  product: {
    includedIn: t('Included features by plan —', 'មុខងាររួមបញ្ចូល តាមគម្រោង —'),
    everyPlan: t('every plan', 'គ្រប់គម្រោង'),
    guide: t('Read the guide on help.vithean.com ↗', 'អានឯកសារណែនាំនៅ help.vithean.com ↗'),
    figCaminv: t(
      'Four steps, one system — the invoice, the VAT, the ledger entry and the e-invoice status all sit on the same record.',
      'បួនជំហាន ប្រព័ន្ធតែមួយ — វិក្កយបត្រ អាករលើតម្លៃបន្ថែម ធាតុចូលបញ្ជីគណនេយ្យ និងស្ថានភាពវិក្កយបត្រអេឡិចត្រូនិក សុទ្ធតែនៅលើកំណត់ត្រាដដែល។'),
    figCompliance: t(
      'Where compliance sits. On an international platform the accounting software hands off to a separate e-invoicing tool before reaching CamInv, and the two are reconciled by hand.',
      'កន្លែងដែលការអនុលោមភាពស្ថិតនៅ។ លើវេទិកាអន្តរជាតិ កម្មវិធីគណនេយ្យត្រូវបញ្ជូនទៅឧបករណ៍វិក្កយបត្រអេឡិចត្រូនិកដាច់ដោយឡែក មុននឹងទៅដល់ CamInv ហើយទាំងពីរត្រូវផ្ទៀងផ្ទាត់ដោយដៃ។'),
  },

  news: {
    h1: t('Announcements, events and writing.', 'សេចក្តីប្រកាស ព្រឹត្តិការណ៍ និងអត្ថបទ'),
    lead: t('Everything Vithean has published, newest first.',
      'អ្វីៗទាំងអស់ដែលវិធានបានផ្សាយ ថ្មីបំផុតជាមុន'),
    all: t('All news', 'ព័ត៌មានទាំងអស់'),
  },

  notFound: {
    h1: t('That page does not exist.', 'ទំព័រនេះមិនមានទេ'),
    p: t('It may have moved. Start from the homepage, or look through the product pages.',
      'វាប្រហែលជាបានផ្លាស់ទី។ សូមចាប់ផ្តើមពីទំព័រដើម ឬមើលទំព័រផលិតផល។'),
    home: t('Go to the homepage', 'ទៅទំព័រដើម'),
    product: t('See the product', 'មើលផលិតផល'),
  },
  /**
   * <title> and <meta name="description"> per page. These are what search
   * engines and AI crawlers index for the Khmer routes, so they are written
   * for Khmer readers rather than machine-translated from the English.
   */
  meta: {
    homeTitle: t('Vithean — Online Accounting & ERP System in Cambodia',
                 'វិធាន — ប្រព័ន្ធគណនេយ្យ និង ERP លើអ៊ីនធឺណិតនៅកម្ពុជា'),
    homeDesc: t(
      'Vithean is a cloud accounting and ERP system built in Cambodia: invoicing, inventory, sales, purchasing and CamInv e-invoicing on one ledger.',
      'វិធាន ជាប្រព័ន្ធគណនេយ្យ និង ERP លើពពក ដែលបង្កើតនៅកម្ពុជា៖ វិក្កយបត្រ សន្និធិ ការលក់ ការទិញ និងវិក្កយបត្រអេឡិចត្រូនិក CamInv នៅលើបញ្ជីតែមួយ។'),
    pricingTitle: t('Vithean Pricing — Plans from $15/month | Cambodia ERP',
                    'តម្លៃ វិធាន — គម្រោងចាប់ពី $15 មួយខែ | ERP កម្ពុជា'),
    pricingDesc: t(
      'Three plans from $15/month, all including Cambodia E-Invoicing (CamInv). 30-day free trial, no card required.',
      'គម្រោងបីចាប់ពី $15 មួយខែ ទាំងអស់រួមបញ្ចូលវិក្កយបត្រអេឡិចត្រូនិកកម្ពុជា (CamInv)។ សាកល្បងឥតគិតថ្លៃ ៣០ថ្ងៃ ដោយមិនតម្រូវឲ្យមានកាត។'),
    companyTitle: t('About Vithean — Built in Cambodia by POSCAR Digital',
                    'អំពី វិធាន — បង្កើតនៅកម្ពុជាដោយ POSCAR Digital'),
    companyDesc: t(
      'Vithean is built in Cambodia by POSCAR Digital Co., Ltd., with practising accountants from Fii & Associates shaping what the system does.',
      'វិធាន បង្កើតនៅកម្ពុជាដោយក្រុមហ៊ុន POSCAR Digital Co., Ltd. ដោយមានគណនេយ្យករជំនាញពី Fii & Associates រួមរៀបចំមុខងាររបស់ប្រព័ន្ធ។'),
    supportTitle: t('Support', 'ជំនួយ'),
    supportDesc: t(
      'Talk to the Vithean team in Phnom Penh — Telegram, phone or email, Monday to Friday. Guides and answers to the questions people ask before they start.',
      'និយាយជាមួយក្រុមការងារ វិធាន នៅភ្នំពេញ — តាមតេឡេក្រាម ទូរស័ព្ទ ឬអ៊ីមែល ពីថ្ងៃចន្ទដល់ថ្ងៃសុក្រ។ ឯកសារណែនាំ និងចម្លើយចំពោះសំណួរដែលគេសួរមុនចាប់ផ្ដើម។'),
    newsTitle: t('News & press', 'ព័ត៌មាន និងសេចក្ដីប្រកាស'),
    newsDesc: t(
      'Announcements and events from Vithean, the Cambodian accounting and ERP system — including the CamInv e-invoicing integration and the ACAR forum.',
      'សេចក្ដីប្រកាស និងព្រឹត្តិការណ៍ពី វិធាន ដែលជាប្រព័ន្ធគណនេយ្យ និង ERP កម្ពុជា — រួមទាំងការភ្ជាប់វិក្កយបត្រអេឡិចត្រូនិក CamInv និងវេទិកា ACAR។'),
  },
} as const;

/** Pick the localised side of a copy entry. */
export const c = (v: { en: string; km: string }, lang: Lang): string =>
  lang === 'km' ? v.km : v.en;
