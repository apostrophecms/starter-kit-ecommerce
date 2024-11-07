import defaultTheme from 'tailwindcss/defaultTheme';
import tailwindForms from '@tailwindcss/forms';
import tailwindTypography from '@tailwindcss/typography';
import tailwindAspectRatio from '@tailwindcss/aspect-ratio';

// Brand colors, default Jelly bean
const brand = process.env.APP_BRAND || 'default';
const brandColors = await import(`./colors/${brand}.json`) with { type: 'json' };

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './views/**/*.html',
    // Do not process .njk files in production, as they are part
    // of the Design system.
    process.env.NODE_ENV === 'production'
      ? './modules/**/*.{html,js,vue}'
      : './modules/**/*.{html,njk,js,vue}'
  ],
  theme: {
    fontFamily: {
      sans: [ '"Inter var"', ...defaultTheme.fontFamily.sans ]
    },
    extend: {
      colors: {
        brand: brandColors,
        gray: {
          // gray-300
          DEFAULT: '#D1D5DB'
        }
      },
      screens: {
        xs: '475px'
      }
    }
  },
  safelist: [
    // Pagination
    'app-pager__item',
    'is_active',
    // Rich text color styles
    'text-brand',
    'text-brand-300',
    // Apos select fix caused by form reset
    'apos-input--select'
  ],
  corePlugins: {
    aspectRatio: false
  },
  // https://tailwindcss.com/docs/plugins#official-plugins
  plugins: [
    tailwindForms,
    tailwindTypography,
    tailwindAspectRatio
  ]
};
