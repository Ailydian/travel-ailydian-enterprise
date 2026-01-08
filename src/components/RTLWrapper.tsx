/**
 * RTL Wrapper Component
 * Handles Right-to-Left layout for Arabic and Persian languages
 */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

interface RTLWrapperProps {
  children: React.ReactNode;
}

const RTL_LANGUAGES = ['ar', 'fa'];

export const RTLWrapper: React.FC<RTLWrapperProps> = ({ children }) => {
  const router = useRouter();
  const currentLocale = router.locale || 'tr';
  const isRTL = RTL_LANGUAGES.includes(currentLocale);

  useEffect(() => {
    // Check if running in browser (not SSR)
    if (typeof document === 'undefined') return;

    // Set direction attribute on document
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLocale;

    // Add/remove RTL class for styling
    if (isRTL) {
      document.documentElement.classList.add('rtl');
    } else {
      document.documentElement.classList.remove('rtl');
    }

    // Update meta tags for RTL
    const existingMeta = document.querySelector('meta[name="direction"]');
    if (existingMeta) {
      existingMeta.setAttribute('content', isRTL ? 'rtl' : 'ltr');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'direction';
      meta.content = isRTL ? 'rtl' : 'ltr';
      document.head.appendChild(meta);
    }
  }, [currentLocale, isRTL]);

  return <>{children}</>;
};

export default RTLWrapper;
