// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const PREVIEW_HOSTS = (process.env.VITHEAN_PREVIEW_HOSTS ?? '')
  .split(',').map((h) => h.trim()).filter(Boolean);

/**
 * Static build for GitHub Pages.
 *
 * `site` must be the final public URL — it is what generates absolute URLs in the
 * sitemap and in the JSON-LD. `base` stays '/' for a custom domain (vithean.com via
 * public/CNAME). If you ever publish to `<user>.github.io/vithean-website` instead,
 * set base to '/vithean-website' and nothing else needs to change.
 */
export default defineConfig({
  site: 'https://vithean.com',
  base: '/',
  output: 'static',

  /**
   * Legacy WordPress URLs. Every address the old site published resolves.
   *
   * ⚠ GitHub Pages cannot issue a real 301 — it serves static files and has no
   * redirect engine. In `output: 'static'` Astro emits a page carrying
   * `<meta http-equiv="refresh">` plus a canonical link to the target. Google
   * treats that as a redirect and passes signals, but it is weaker and slower
   * than a true 301.
   *
   * To get real 301s, put a CDN or reverse proxy in front of the domain and
   * move this map into its redirect rules. The map below stays the source of
   * truth either way.
   */
  redirects: {
    // Legacy WordPress names only. Addresses that still exist under /en/
    // are generated from the collections by src/pages/en/[...path].astro,
    // so a new page cannot be left without its /en/ forward.
    '/en/about-us/': '/company/',
    '/en/news-and-press/': '/news/',
    '/en/help-and-support/': '/support/',
    '/en/contact-us/': '/company/#contact',
    '/km/about-us/': '/km/company/',
    '/km/news-and-press/': '/km/news/',
    '/km/help-and-support/': '/km/support/',
    '/km/contact-us/': '/km/company/#contact',
    '/en/grab-the-limit-time-offer-until-end-of-march/': '/news/2022-02-15-grab-the-limit-time-offer-until-end-of-march/',
    '/km/grab-the-limit-time-offer-until-end-of-march/': '/km/news/2022-02-15-grab-the-limit-time-offer-until-end-of-march/',
    '/en/modern-accounting-today/': '/news/2022-02-15-modern-accounting-today/',
    '/km/modern-accounting-today/': '/km/news/2022-02-15-modern-accounting-today/',
    '/en/digital-accounting/': '/news/2022-08-10-digital-accounting/',
    '/km/digital-accounting/': '/km/news/2022-08-10-digital-accounting/',
    '/en/evolution-of-digital-accounting/': '/news/2022-08-24-evolution-of-digital-accounting/',
    '/km/evolution-of-digital-accounting/': '/km/news/2022-08-24-evolution-of-digital-accounting/',
    '/en/introduction-to-cloud-accounting/': '/news/2022-09-14-introduction-to-cloud-accounting/',
    '/km/introduction-to-cloud-accounting/': '/km/news/2022-09-14-introduction-to-cloud-accounting/',
    '/en/accounting-internal-control-systems-to-protect-your-business/': '/news/2022-09-28-accounting-internal-control-systems-to-protect-your-business/',
    '/km/accounting-internal-control-systems-to-protect-your-business/': '/km/news/2022-09-28-accounting-internal-control-systems-to-protect-your-business/',
    '/en/how-can-accounting-on-the-cloud-help/': '/news/2022-10-12-how-can-accounting-on-the-cloud-help/',
    '/km/how-can-accounting-on-the-cloud-help/': '/km/news/2022-10-12-how-can-accounting-on-the-cloud-help/',
    '/en/budgeting-for-success/': '/news/2022-10-26-budgeting-for-success/',
    '/km/budgeting-for-success/': '/km/news/2022-10-26-budgeting-for-success/',
    '/en/how-to-best-deal-with-employee-complaints/': '/news/2022-11-16-how-to-best-deal-with-employee-complaints/',
    '/km/how-to-best-deal-with-employee-complaints/': '/km/news/2022-11-16-how-to-best-deal-with-employee-complaints/',
    '/en/why-you-should-be-outsourcing-your-cfo/': '/news/2022-11-30-why-you-should-be-outsourcing-your-cfo/',
    '/km/why-you-should-be-outsourcing-your-cfo/': '/km/news/2022-11-30-why-you-should-be-outsourcing-your-cfo/',
    '/en/management-and-motivations/': '/news/2022-12-14-management-and-motivations/',
    '/km/management-and-motivations/': '/km/news/2022-12-14-management-and-motivations/',
    '/en/ក្រុមហ៊ុន-ផុស្ការ-និងធនា/': '/news/2023-05-18-poscar-canadia-bank-digital-partnership/',
    '/km/ក្រុមហ៊ុន-ផុស្ការ-និងធនា/': '/km/news/2023-05-18-poscar-canadia-bank-digital-partnership/',
    '/en/vithean-showcased-at-giz-icone-digital-training-boot-camp-in-siem-reap/': '/news/2024-09-17-vithean-showcased-at-giz-icone-digital-training-boot-camp-in/',
    '/km/vithean-showcased-at-giz-icone-digital-training-boot-camp-in-siem-reap/': '/km/news/2024-09-17-vithean-showcased-at-giz-icone-digital-training-boot-camp-in/',
    '/en/revolutionize-your-bookkeeping-highlights-from-the-vithean-accounting-system-workshop-in-siem-reap/': '/news/2024-11-17-revolutionize-your-bookkeeping-highlights-from-the-vithean-a/',
    '/km/revolutionize-your-bookkeeping-highlights-from-the-vithean-accounting-system-workshop-in-siem-reap/': '/km/news/2024-11-17-revolutionize-your-bookkeeping-highlights-from-the-vithean-a/',
    '/en/future-proofing-finance-key-mandates-from-the-acar-event-2025-and-vitheans-role-in-cambodias-digital-space/': '/news/2025-09-04-future-proofing-finance-key-mandates-from-the-acar-event-202/',
    '/km/future-proofing-finance-key-mandates-from-the-acar-event-2025-and-vitheans-role-in-cambodias-digital-space/': '/km/news/2025-09-04-future-proofing-finance-key-mandates-from-the-acar-event-202/',
    '/en/vithean-successfully-integrates-cambodia-e-invoicing-system-into-its-accounting-platform/': '/news/2025-10-03-vithean-successfully-integrates-cambodia-e-invoicing-system/',
    '/km/vithean-successfully-integrates-cambodia-e-invoicing-system-into-its-accounting-platform/': '/km/news/2025-10-03-vithean-successfully-integrates-cambodia-e-invoicing-system/',
    '/en/ccc-may-2026-seminar-online-accounting/': '/news/2026-05-19-ccc-may-2026-seminar-online-accounting/',
    '/km/ccc-may-2026-seminar-online-accounting/': '/km/news/2026-05-19-ccc-may-2026-seminar-online-accounting/',
  },


  // Dev and preview both on 4331.
  server: { port: 4331, host: true },
  trailingSlash: 'always',
  build: { format: 'directory' },

  i18n: {
    locales: ['en', 'km'],
    defaultLocale: 'en',
    routing: {
      // English lives at the root with no redirect. Only Khmer is prefixed.
      //   /       /pricing/       /product/inventory/
      //   /km/    /km/pricing/    /km/product/inventory/
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },

  integrations: [
    vue({
      // PrimeVue ships untranspiled ESM; let Vite process it.
      appEntrypoint: '/src/vue-app.ts',
    }),
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en-US', km: 'km-KH' } },
      filter: (page) => !page.includes('/404'),
    }),
  ],

  vite: {
    // Vite 403s any Host header it was not told about ("Blocked request. This
    // host is not allowed."), so a host used to reach the dev or preview server
    // from outside has to be named. Set VITHEAN_PREVIEW_HOSTS (comma separated)
    // in the environment that serves it; localhost never needs listing. Kept
    // out of the file so an internal hostname is not published here.
    //
    // Dev/preview only — the published static build has no server and ignores
    // all of this.
    preview: {
      port: 4331,
      allowedHosts: PREVIEW_HOSTS,
    },
    server: {
      allowedHosts: PREVIEW_HOSTS,
    },
    plugins: [tailwindcss()],
    ssr: { noExternal: ['primevue', '@primeuix/themes'] },
  },
});
