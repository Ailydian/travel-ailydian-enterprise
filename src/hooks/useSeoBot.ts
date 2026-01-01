import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import AutoSeoBot, { PageSeoData, SeoAnalysis } from '../lib/seo/autoSeoBot';
import { NextSeoProps } from 'next-seo';
import logger from '../lib/logger';

interface SeoState {
  isAnalyzing: boolean;
  analysis: SeoAnalysis | null;
  optimizedMeta: NextSeoProps | null;
  error: string | null;
}

export const useSeoBot = () => {
  const router = useRouter();
  const [seoBot] = useState(() => new AutoSeoBot('https://holiday.ailydian.com'));
  const [seoState, setSeoState] = useState<SeoState>({
    isAnalyzing: false,
    analysis: null,
    optimizedMeta: null,
    error: null
  });

  // Sayfayı SEO bot ile optimize et
  const optimizePage = useCallback(async (pageData: Partial<PageSeoData>) => {
    setSeoState(prev => ({ ...prev, isAnalyzing: true, error: null }));

    try {
      const fullPageData: PageSeoData = {
        url: `https://holiday.ailydian.com${router.asPath}`,
        title: pageData.title || 'Travel LyDian',
        description: pageData.description || '',
        content: pageData.content || '',
        language: router.locale || 'tr',
        lastModified: new Date(),
        ...pageData
      };

      const optimizedMeta = await seoBot.optimizePage(fullPageData);
      
      setSeoState(prev => ({
        ...prev,
        optimizedMeta,
        isAnalyzing: false
      }));

      return optimizedMeta;
    } catch (error) {
      setSeoState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'SEO optimizasyonu başarısız',
        isAnalyzing: false
      }));
      return null;
    }
  }, [router.asPath, router.locale, seoBot]);

  // Alexa ve diğer platformlara kayıt
  const registerToExternalPlatforms = useCallback(async () => {
    try {
      await seoBot.registerToAlexaAndOthers();
      logger.debug('External platforms registration completed', { component: 'Useseobot' });
    } catch (error) {
      logger.error('External platforms registration failed:', error as Error, { component: 'Useseobot' });
    }
  }, [seoBot]);

  // SEO izlemeyi başlat
  const startSeoMonitoring = useCallback(async () => {
    try {
      await seoBot.startContinuousMonitoring();
      logger.debug('SEO monitoring started', { component: 'Useseobot' });
    } catch (error) {
      logger.error('SEO monitoring failed to start:', error as Error, { component: 'Useseobot' });
    }
  }, [seoBot]);

  // Sayfa değiştiğinde otomatik SEO analizi
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Sayfa içeriğini al
      const content = document.body.innerText || '';
      const title = document.title || '';
      const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';

      optimizePage({
        title,
        description,
        content
      });
    }
  }, [router.asPath, optimizePage]);

  return {
    ...seoState,
    optimizePage,
    registerToExternalPlatforms,
    startSeoMonitoring,
    seoBot
  };
};

export default useSeoBot;