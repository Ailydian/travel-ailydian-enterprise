'use client';

import { useRouter } from 'next/router';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

// Only supported languages from next-i18next.config.js
const LANGUAGES: Language[] = [
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
];

interface LanguageSwitcherProps {
  variant?: 'compact' | 'full';
  position?: 'header' | 'footer' | 'floating';
}

export default function LanguageSwitcher({
  variant = 'compact',
  position = 'header'
}: LanguageSwitcherProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = LANGUAGES.find(lang => lang.code === router.locale) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (langCode: string) => {
    const { pathname, asPath, query } = router;

    // Cookie'ye kaydet
    document.cookie = `NEXT_LOCALE=${langCode}; path=/; max-age=31536000`;

    // Router ile dil değiştir
    router.push({ pathname, query }, asPath, { locale: langCode });
    setIsOpen(false);
  };

  if (variant === 'compact') {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Change language"
        >
          <Globe className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          <span className="text-2xl">{currentLanguage.flag}</span>
          <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-200">
            {currentLanguage.code.toUpperCase()}
          </span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
            >
              <div className="p-2 max-h-96 overflow-y-auto">
                {LANGUAGES.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => changeLanguage(language.code)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                      ${language.code === currentLanguage.code
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200'
                      }
                    `}
                  >
                    <span className="text-2xl">{language.flag}</span>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-sm">{language.nativeName}</div>
                      <div className={`text-xs ${language.code === currentLanguage.code ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                        {language.name}
                      </div>
                    </div>
                    {language.code === currentLanguage.code && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Full variant for footer
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {LANGUAGES.slice(0, 3).map((language) => (
        <button
          key={language.code}
          onClick={() => changeLanguage(language.code)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-full transition-all
            ${language.code === currentLanguage.code
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'
            }
          `}
        >
          <span className="text-xl">{language.flag}</span>
          <span className="font-medium text-sm">{language.nativeName}</span>
        </button>
      ))}
    </div>
  );
}
