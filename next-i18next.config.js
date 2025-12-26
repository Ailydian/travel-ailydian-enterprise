/**
 * next-i18next Configuration
 * World-class multi-language system for travel.ailydian.com
 * Supports 8 languages with RTL support for Arabic and Persian
 */

module.exports = {
  i18n: {
    defaultLocale: 'tr',
    locales: ['tr', 'en', 'de', 'ru', 'ar', 'fa', 'fr', 'el'],
    localeDetection: false,
  },

  // Namespace configuration
  ns: ['common'],
  defaultNS: 'common',

  // Fallback language
  fallbackLng: {
    'el': ['en', 'tr'],
    'default': ['tr']
  },

  // React configuration
  react: {
    useSuspense: false, // Important for SSR
    bindI18n: 'languageChanged loaded',
    bindI18nStore: 'added removed',
  },

  // Load translation files from public folder
  localePath: typeof window === 'undefined'
    ? require('path').resolve('./public/locales')
    : '/locales',

  // Reload on change in development
  reloadOnPrerender: process.env.NODE_ENV === 'development',

  // Performance optimizations
  load: 'languageOnly', // Load only language code (en instead of en-US)
  cleanCode: true,

  // SEO optimizations
  serializeConfig: false,

  // Debug mode in development
  debug: process.env.NODE_ENV === 'development',

  // Interpolation settings
  interpolation: {
    escapeValue: false, // React already escapes
  },

  // Return objects for nested translations
  returnObjects: true,
  returnEmptyString: false,

  // Detection order for automatic language detection
  detection: {
    order: ['path', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
    caches: ['cookie', 'localStorage'],
    cookieOptions: {
      path: '/',
      sameSite: 'strict',
      maxAge: 365 * 24 * 60 * 60, // 1 year
    },
  },

  // RTL languages
  rtlLanguages: ['ar', 'fa'],

  // Reuse common translations
  keySeparator: '.',
  nsSeparator: ':',
};
