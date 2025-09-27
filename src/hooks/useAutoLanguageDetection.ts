import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

interface LocationLanguageMap {
  [countryCode: string]: string;
}

interface BrowserLanguageMap {
  [browserLang: string]: string;
}

export const useAutoLanguageDetection = () => {
  const router = useRouter();
  const { i18n } = useTranslation();
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null);
  const [isLanguageDetected, setIsLanguageDetected] = useState(false);

  // Ülke kodlarına göre dil eşlemesi
  const countryToLanguage: LocationLanguageMap = {
    'TR': 'tr', 'US': 'en', 'GB': 'en', 'CA': 'en', 'AU': 'en',
    'DE': 'de', 'AT': 'de', 'CH': 'de',
    'FR': 'fr', 'BE': 'fr', 'MC': 'fr',
    'ES': 'es', 'MX': 'es', 'AR': 'es', 'CO': 'es', 'PE': 'es',
    'IT': 'it', 'SM': 'it', 'VA': 'it',
    'RU': 'ru', 'BY': 'ru', 'KZ': 'ru',
    'CN': 'zh', 'TW': 'zh', 'HK': 'zh', 'SG': 'zh',
    'JP': 'ja', 'KR': 'ko', 'PT': 'pt', 'BR': 'pt',
    'NL': 'nl', 'BE': 'nl', 'SE': 'sv', 'NO': 'no',
    'DK': 'da', 'FI': 'fi', 'PL': 'pl', 'CZ': 'cs',
    'HU': 'hu', 'RO': 'ro', 'BG': 'bg', 'HR': 'hr',
    'RS': 'sr', 'SK': 'sk', 'SI': 'sl', 'EE': 'et',
    'LV': 'lv', 'LT': 'lt', 'MT': 'mt', 'GR': 'el',
    'IL': 'he', 'IN': 'hi', 'TH': 'th', 'VN': 'vi',
    'ID': 'id', 'MY': 'ms', 'PH': 'tl', 'BD': 'bn',
    'PK': 'ur', 'IR': 'fa', 'KE': 'sw', 'ET': 'am',
    'NG': 'ha', 'ZA': 'af', 'IS': 'is', 'IE': 'ga',
    'SA': 'ar', 'AE': 'ar', 'EG': 'ar', 'MA': 'ar', 'DZ': 'ar'
  };

  // Tarayıcı dillerinin eşlemesi
  const browserLanguageMap: BrowserLanguageMap = {
    'tr-TR': 'tr', 'tr': 'tr',
    'en-US': 'en', 'en-GB': 'en', 'en': 'en',
    'de-DE': 'de', 'de': 'de',
    'fr-FR': 'fr', 'fr': 'fr',
    'es-ES': 'es', 'es': 'es',
    'it-IT': 'it', 'it': 'it',
    'ru-RU': 'ru', 'ru': 'ru',
    'zh-CN': 'zh', 'zh': 'zh',
    'ja-JP': 'ja', 'ja': 'ja',
    'ko-KR': 'ko', 'ko': 'ko',
    'pt-PT': 'pt', 'pt-BR': 'pt', 'pt': 'pt',
    'ar-SA': 'ar', 'ar': 'ar'
  };

  // Coğrafi konum bazlı dil algılama
  const detectLanguageByLocation = useCallback(async (): Promise<string | null> => {
    try {
      // IP bazlı konum tespiti için ücretsiz API kullan
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      if (data.country_code) {
        const detectedLang = countryToLanguage[data.country_code];
        if (detectedLang) {
          console.log(`Location-based language detected: ${detectedLang} (${data.country_code})`);
          return detectedLang;
        }
      }
    } catch (error) {
      console.warn('Coğrafi dil algılama başarısız:', error);
    }
    return null;
  }, []);

  // Tarayıcı dili algılama
  const detectBrowserLanguage = useCallback((): string | null => {
    if (typeof navigator === 'undefined') return null;

    const browserLangs = navigator.languages || [navigator.language];
    
    for (const lang of browserLangs) {
      const mappedLang = browserLanguageMap[lang] || browserLanguageMap[lang.split('-')[0]];
      if (mappedLang) {
        console.log(`Browser language detected: ${mappedLang} (${lang})`);
        return mappedLang;
      }
    }
    
    return null;
  }, []);

  // Yerel depolama dil tercihi
  const getStoredLanguagePreference = useCallback((): string | null => {
    if (typeof localStorage === 'undefined') return null;
    
    try {
      return localStorage.getItem('ailydian-preferred-language');
    } catch {
      return null;
    }
  }, []);

  // Dil tercihini kaydet
  const saveLanguagePreference = useCallback((language: string) => {
    if (typeof localStorage === 'undefined') return;
    
    try {
      localStorage.setItem('ailydian-preferred-language', language);
    } catch (error) {
      console.warn('Dil tercihi kaydedilemedi:', error);
    }
  }, []);

  // Cookie'den dil al
  const getLanguageFromCookie = useCallback((): string | null => {
    if (typeof document === 'undefined') return null;
    
    const cookies = document.cookie.split(';');
    const langCookie = cookies.find(cookie => cookie.trim().startsWith('NEXT_LOCALE='));
    
    if (langCookie) {
      return langCookie.split('=')[1];
    }
    
    return null;
  }, []);

  // Ana dil algılama fonksiyonu
  const detectOptimalLanguage = useCallback(async (): Promise<string> => {
    // 1. Önce kaydedilmiş kullanıcı tercihini kontrol et
    const storedPreference = getStoredLanguagePreference();
    if (storedPreference) {
      console.log(`Kullanıcı tercihi bulundu: ${storedPreference}`);
      return storedPreference;
    }

    // 2. Cookie'den dil kontrolü
    const cookieLanguage = getLanguageFromCookie();
    if (cookieLanguage) {
      console.log(`Cookie dilі bulundu: ${cookieLanguage}`);
      return cookieLanguage;
    }

    // 3. Tarayıcı dili kontrolü
    const browserLanguage = detectBrowserLanguage();
    if (browserLanguage) {
      console.log(`Tarayıcı dili algılandı: ${browserLanguage}`);
      return browserLanguage;
    }

    // 4. Coğrafi konum bazlı algılama
    const locationLanguage = await detectLanguageByLocation();
    if (locationLanguage) {
      console.log(`Konum bazlı dil algılandı: ${locationLanguage}`);
      return locationLanguage;
    }

    // 5. Varsayılan dil
    console.log('Varsayılan dil kullanılıyor: tr');
    return 'tr';
  }, [detectLanguageByLocation, detectBrowserLanguage, getStoredLanguagePreference, getLanguageFromCookie]);

  // Dil değiştirme fonksiyonu
  const changeLanguage = useCallback(async (newLanguage: string, savePreference: boolean = true) => {
    try {
      await i18n.changeLanguage(newLanguage);
      
      if (savePreference) {
        saveLanguagePreference(newLanguage);
      }

      // Router ile yönlendirme
      const { pathname, asPath, query } = router;
      router.push({ pathname, query }, asPath, { locale: newLanguage });

      console.log(`Dil değiştirildi: ${newLanguage}`);
    } catch (error) {
      console.error('Dil değiştirme hatası:', error);
    }
  }, [i18n, router, saveLanguagePreference]);

  // Otomatik dil algılama ve uygulama
  const performAutoLanguageDetection = useCallback(async () => {
    if (isLanguageDetected) return;

    const optimalLanguage = await detectOptimalLanguage();
    setDetectedLanguage(optimalLanguage);

    // Mevcut dil farklıysa değiştir
    if (i18n.language !== optimalLanguage) {
      await changeLanguage(optimalLanguage, false);
    }

    setIsLanguageDetected(true);
  }, [isLanguageDetected, detectOptimalLanguage, i18n.language, changeLanguage]);

  // Component mount edildiğinde dil algılama yap
  useEffect(() => {
    performAutoLanguageDetection();
  }, [performAutoLanguageDetection]);

  return {
    detectedLanguage,
    isLanguageDetected,
    changeLanguage,
    currentLanguage: i18n.language,
    performAutoLanguageDetection,
    saveLanguagePreference
  };
};

export default useAutoLanguageDetection;