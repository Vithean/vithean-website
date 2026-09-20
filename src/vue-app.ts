import type { App } from 'vue';
import PrimeVue from 'primevue/config';
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import 'primeicons/primeicons.css';

/**
 * PrimeVue 4, themed FROM the design tokens in src/styles/tokens.css.
 *
 * The plum ramp below is the same one in vithean-myweb/tailwind.config.js and
 * vithean-central-web/config/theme.js — 600 is the product's --v-primary.
 * Do not introduce a second palette here: if these values and tokens.css ever
 * disagree, the site and the product disagree about what the brand colour is.
 */
const Vithean = definePreset(Aura, {
  semantic: {
    primary: {
      50:  '#F9F3FA',
      100: '#F1E6F3',
      200: '#E1C8E5',
      300: '#C79BCD',
      400: '#A868AF',
      500: '#8A4291',
      600: '#6F3075',
      700: '#5B2761',
      800: '#4A2050',
      900: '#3D1B42',
      950: '#28112D',
    },
    colorScheme: {
      light: {
        primary: {
          color: '{primary.600}',
          contrastColor: '#FFFFFF',
          hoverColor: '{primary.700}',
          activeColor: '{primary.800}',
        },
        surface: {
          0: '#FFFFFF',
          50: '#FAF8FC',
          100: '#F5F2F9',
          200: '#EDE9F3',
          300: '#DEDBE7',
          400: '#C9C4D4',
          500: '#7E798A',
          600: '#5C5768',
          700: '#37333F',
          800: '#2A2632',
          900: '#1A1720',
          950: '#120F17',
        },
      },
      /**
       * Aura's dark scheme reads backgrounds from the HIGH end of the surface
       * ramp and text from the LOW end (0 is lightest, 950 darkest, same as
       * light). So this is the site's dark palette laid on that ramp, not an
       * inverted copy of the light block — get the direction wrong and the
       * accordion renders its text in the background colour.
       */
      dark: {
        primary: {
          color: '{primary.300}',
          contrastColor: '{surface.900}',
          hoverColor: '{primary.200}',
          activeColor: '{primary.100}',
        },
        surface: {
          0:   '#FFFFFF',
          50:  '#F6F3F9',
          100: '#E8E4EE',
          200: '#D9D4E1',
          300: '#C4BDD0',
          400: '#ABA4B8',
          500: '#8C8499',
          600: '#5C5468',
          700: '#3C3547',
          800: '#2C2536',
          900: '#241E2D',
          950: '#141119',
        },
      },
    },
  },
  components: {
    button: { root: { borderRadius: '8px' } },
    accordion: { panel: { borderWidth: '0 0 1px 0' } },
  },
});

export default (app: App) => {
  app.use(PrimeVue, {
    theme: {
      preset: Vithean,
      options: {
        /* The site sets data-theme on <html> to a resolved 'light' or 'dark'
           — never left unset — so this one selector covers both the OS
           preference and an explicit choice from the footer. */
        darkModeSelector: '[data-theme="dark"]',
        // Tailwind 4 layer order — utilities must be able to override PrimeVue.
        cssLayer: { name: 'primevue', order: 'theme, base, primevue, components, utilities' },
      },
    },
    ripple: false,
  });
};
