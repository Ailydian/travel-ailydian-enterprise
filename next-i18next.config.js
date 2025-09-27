module.exports = {
  i18n: {
    defaultLocale: 'tr',
    locales: [
      'en',    // English
      'tr',    // Turkish (Default)
      'ar',    // Arabic
      'de',    // German
      'fr',    // French
      'es',    // Spanish
      'it',    // Italian
      'ru',    // Russian
      'zh',    // Chinese (Simplified)
      'ja',    // Japanese
      'ko',    // Korean
      'pt',    // Portuguese
      'nl',    // Dutch
      'sv',    // Swedish
      'no',    // Norwegian
      'da',    // Danish
      'fi',    // Finnish
      'pl',    // Polish
      'cs',    // Czech
      'hu',    // Hungarian
      'ro',    // Romanian
      'bg',    // Bulgarian
      'hr',    // Croatian
      'sr',    // Serbian
      'sk',    // Slovak
      'sl',    // Slovenian
      'et',    // Estonian
      'lv',    // Latvian
      'lt',    // Lithuanian
      'mt',    // Maltese
      'el',    // Greek
      'he',    // Hebrew
      'hi',    // Hindi
      'th',    // Thai
      'vi',    // Vietnamese
      'id',    // Indonesian
      'ms',    // Malay
      'tl',    // Filipino
      'bn',    // Bengali
      'ur',    // Urdu
      'fa',    // Persian
      'sw',    // Swahili
      'am',    // Amharic
      'ha',    // Hausa
      'yo',    // Yoruba
      'zu',    // Zulu
      'af',    // Afrikaans
      'is',    // Icelandic
      'ga',    // Irish
      'cy',    // Welsh
      'eu',    // Basque
      'ca',    // Catalan
      'gl',    // Galician
      'mk',    // Macedonian
      'sq',    // Albanian
      'bs',    // Bosnian
      'me',    // Montenegrin
    ],
    localeDetection: false // Vercel uyumluluğu için geçici olarak kapalı
  },
  // Gelişmiş dil algılama özellikleri
  detection: {
    order: [
      'cookie',
      'header',
      'querystring', 
      'path',
      'subdomain'
    ],
    caches: ['localStorage', 'cookie'],
    excludeDefaultLocale: false,
    checkForSimilarLocales: true
  },
  // Geri dönüş dilleri
  fallbackLng: {
    'zh': ['zh', 'en'],
    'ar': ['ar', 'en'], 
    'default': ['tr', 'en']
  },
  // Dil değiştirme özelliği
  load: 'languageOnly',
  cleanCode: true,
  nonExplicitSupportedLngs: true
}
