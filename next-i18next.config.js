/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'tr',
    locales: ['tr', 'en', 'ar'],
    localeDetection: false,
    domains: [
      {
        domain: 'travel.ailydian.com',
        defaultLocale: 'tr',
        locales: ['tr', 'en', 'ar']
      },
      {
        domain: 'en.travel.ailydian.com',
        defaultLocale: 'en'
      },
      {
        domain: 'ar.travel.ailydian.com',
        defaultLocale: 'ar'
      }
    ]
  },
  fallbackLng: 'tr',
  debug: process.env.NODE_ENV === 'development',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  
  // Translation loading
  localePath: './public/locales',
  defaultNS: 'common',
  
  // RTL support for Arabic
  supportedLngs: ['tr', 'en', 'ar'],
  
  // Interpolation settings
  interpolation: {
    escapeValue: false, // React already escapes values
    formatSeparator: ','
  },

  // Namespace configuration
  ns: [
    'common',
    'navigation',
    'destinations', 
    'hotels',
    'flights',
    'activities',
    'tours',
    'about',
    'contact',
    'auth',
    'booking',
    'profile',
    'reviews',
    'support',
    'admin',
    'errors'
  ],

  // React specific
  react: {
    useSuspense: false,
    bindI18n: 'languageChanged loaded',
    bindI18nStore: 'added removed',
    transEmptyNodeValue: '',
    transSupportBasicHtmlNodes: true,
    transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p', 'span', 'em']
  },

  // Backend options
  backend: {
    loadPath: './public/locales/{{lng}}/{{ns}}.json',
  },

  // Detection options
  detection: {
    order: ['path', 'cookie', 'htmlTag', 'localStorage', 'subdomain'],
    caches: ['cookie'],
    cookieName: 'ailydian_locale',
    cookieOptions: {
      maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
      httpOnly: false,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    }
  }
};
