/**
 * Language Switcher Component
 * World-class multi-language selector with flag dropdown
 * Supports 7 languages with RTL for Arabic and Persian
 */
import React, { Fragment, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Menu, Transition } from '@headlessui/react';
import { Globe, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  currency: string;
  rtl?: boolean;
}

const languages: Language[] = [
  {
    code: 'tr',
    name: 'Turkish',
    nativeName: 'Türkçe',
    flag: '🇹🇷',
    currency: 'TRY',
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    currency: 'USD',
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    currency: 'EUR',
  },
  {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    flag: '🇷🇺',
    currency: 'RUB',
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    currency: 'USD',
    rtl: true,
  },
  {
    code: 'fa',
    name: 'Persian',
    nativeName: 'فارسی',
    flag: '🇮🇷',
    currency: 'USD',
    rtl: true,
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    currency: 'EUR',
  },
  {
    code: 'el',
    name: 'Greek',
    nativeName: 'Ελληνικά',
    flag: '🇬🇷',
    currency: 'EUR',
  },
];

export const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const { i18n } = useTranslation();
  const currentLocale = router.locale || 'tr';
  const currentLanguage = languages.find((lang) => lang.code === currentLocale) || languages[0];

  // Set RTL direction for Arabic and Persian
  useEffect(() => {
    const isRTL = currentLanguage.rtl;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLocale;
  }, [currentLocale, currentLanguage.rtl]);

  const handleLanguageChange = async (langCode: string) => {
    const pathName = router.pathname;
    const asPathValue = router.asPath;
    const queryValue = router.query;
    
    // Change route to new locale
    await router.push({ pathname: pathName, query: queryValue }, asPathValue, { locale: langCode });
    
    // Update i18n
    if (i18n.changeLanguage) {
      await i18n.changeLanguage(langCode);
    }
    
    // Store preference in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', langCode);
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button
        as={motion.button}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-4 py-2 bg-white/15 hover:bg-white/25 backdrop-blur-md rounded-lg transition-all font-bold text-sm border border-white/30 shadow-lg hover:shadow-white/20 text-white"
      >
        <Globe className="w-4 h-4 text-white" />
        <span className="text-white font-bold text-2xl">{currentLanguage.flag}</span>
        <span className="text-white font-bold hidden sm:inline">{currentLanguage.nativeName}</span>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-64 origin-top-right divide-y divide-gray-100 rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden">
          <div className="bg-gradient-to-r from-lydian-primary to-lydian-secondary px-4 py-3">
            <p className="text-sm font-bold text-white">Select Language</p>
          </div>
          
          <div className="p-1 max-h-96 overflow-y-auto">
            {languages.map((language) => {
              const isActive = currentLocale === language.code;
              
              return (
                <Menu.Item key={language.code}>
                  {({ active }) => (
                    <button
                      onClick={() => handleLanguageChange(language.code)}
                      className={
                        'group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-all ' +
                        (active ? 'bg-red-50' : '') + ' ' +
                        (isActive ? 'bg-red-50 text-lydian-primary font-bold' : 'text-gray-900')
                      }
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{language.flag}</span>
                        <div className="text-left">
                          <p className={'font-medium ' + (isActive ? 'text-lydian-primary' : 'text-gray-900')}>
                            {language.nativeName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {language.name} · {language.currency}
                          </p>
                        </div>
                      </div>
                      
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center justify-center w-6 h-6 bg-lydian-primary rounded-full"
                        >
                          <Check className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                      
                      {language.rtl && !isActive && (
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">
                          RTL
                        </span>
                      )}
                    </button>
                  )}
                </Menu.Item>
              );
            })}
          </div>
          
          <div className="p-3 bg-gray-50">
            <p className="text-xs text-gray-500 text-center">
              Language preferences are saved automatically
            </p>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default LanguageSwitcher;
