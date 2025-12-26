import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enTranslation from '../locales/en.json';
import trTranslation from '../locales/tr.json';

const resources = {
  en: {
    common: enTranslation,
    navigation: enTranslation,
    destinations: enTranslation,
    booking: enTranslation
  },
  tr: {
    common: trTranslation,
    navigation: trTranslation,
    destinations: trTranslation,
    booking: trTranslation
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'tr', // Varsayılan dil
    fallbackLng: 'tr',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, // React zaten XSS koruması sağlıyor
    },

    // Namespace ayarları
    defaultNS: 'common',
    ns: ['common', 'navigation', 'destinations', 'booking'],

    // Performans optimizasyonları
    load: 'languageOnly', // en-US yerine sadece en yükle
    preload: ['tr', 'en'], // Varsayılan dilleri önceden yükle
    
    // LyDian özelleştirmeleri
    returnObjects: true,
    returnEmptyString: false,
    
    react: {
      useSuspense: false, // SSR uyumluluğu için
      bindI18n: 'languageChanged loaded',
      bindI18nStore: 'added removed',
    }
  });

export default i18n;