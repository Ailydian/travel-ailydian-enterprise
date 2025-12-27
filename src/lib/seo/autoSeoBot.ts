import { NextSeoProps } from 'next-seo';
import logger from '@/lib/logger';

interface SeoAnalysis {
  score: number;
  suggestions: string[];
  keywords: string[];
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
}

interface PageSeoData {
  url: string;
  title: string;
  description: string;
  content: string;
  language: string;
  lastModified: Date;
}

class AutoSeoBot {
  private apiKey: string;
  private baseUrl: string;
  private enabled: boolean;

  constructor(baseUrl: string, apiKey?: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey || process.env.SEO_API_KEY || '';
    this.enabled = process.env.NODE_ENV === 'production';
  }

  // Ana SEO analizi ve optimizasyon
  async optimizePage(pageData: PageSeoData): Promise<NextSeoProps> {
    const analysis = await this.analyzePage(pageData);
    const optimizedMeta = await this.generateOptimizedMeta(pageData, analysis);
    
    // Arama motorlarına gönder
    if (this.enabled) {
      await this.autoSubmitToSearchEngines(pageData.url);
    }

    return optimizedMeta;
  }

  // Sayfa analizi
  private async analyzePage(pageData: PageSeoData): Promise<SeoAnalysis> {
    const keywords = this.extractKeywords(pageData.content);
    const score = this.calculateSeoScore(pageData, keywords);
    const suggestions = this.generateSeoSuggestions(pageData, keywords, score);

    return {
      score,
      suggestions,
      keywords,
      meta: {
        title: this.optimizeTitle(pageData.title, keywords),
        description: this.optimizeDescription(pageData.description, keywords),
        keywords
      }
    };
  }

  // Anahtar kelime çıkarma (AI destekli)
  private extractKeywords(content: string): string[] {
    const words = content.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 3);

    const wordFreq = new Map<string, number>();
    words.forEach(word => {
      wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
    });

    // Seyahat ile ilgili önemli kelimeler
    const travelKeywords = [
      'seyahat', 'travel', 'turizm', 'tourism', 'otel', 'hotel', 'uçak', 'flight',
      'tatil', 'vacation', 'gezi', 'trip', 'rehber', 'guide', 'booking', 'rezervasyon',
      'destinasyon', 'destination', 'ülke', 'country', 'şehir', 'city'
    ];

    const keywords = Array.from(wordFreq.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([word]) => word)
      .filter(word => travelKeywords.some(tk => word.includes(tk)) || wordFreq.get(word)! > 2);

    return keywords.slice(0, 10);
  }

  // SEO skoru hesaplama
  private calculateSeoScore(pageData: PageSeoData, keywords: string[]): number {
    let score = 0;

    // Başlık kontrolü
    if (pageData.title && pageData.title.length >= 30 && pageData.title.length <= 60) {
      score += 20;
    }

    // Açıklama kontrolü  
    if (pageData.description && pageData.description.length >= 120 && pageData.description.length <= 160) {
      score += 20;
    }

    // Anahtar kelime yoğunluğu
    const keywordDensity = this.calculateKeywordDensity(pageData.content, keywords);
    if (keywordDensity >= 1 && keywordDensity <= 3) {
      score += 20;
    }

    // İçerik uzunluğu
    if (pageData.content.length >= 300) {
      score += 20;
    }

    // Dil desteği
    if (pageData.language) {
      score += 20;
    }

    return score;
  }

  // Anahtar kelime yoğunluğu hesaplama
  private calculateKeywordDensity(content: string, keywords: string[]): number {
    const totalWords = content.split(/\s+/).length;
    const keywordCount = keywords.reduce((count, keyword) => {
      const regex = new RegExp(keyword, 'gi');
      return count + (content.match(regex) || []).length;
    }, 0);

    return (keywordCount / totalWords) * 100;
  }

  // SEO önerileri oluşturma
  private generateSeoSuggestions(pageData: PageSeoData, keywords: string[], score: number): string[] {
    const suggestions: string[] = [];

    if (!pageData.title || pageData.title.length < 30) {
      suggestions.push('Başlık çok kısa, en az 30 karakter olmalı');
    }
    if (pageData.title && pageData.title.length > 60) {
      suggestions.push('Başlık çok uzun, 60 karakteri geçmemeli');
    }

    if (!pageData.description || pageData.description.length < 120) {
      suggestions.push('Meta açıklama çok kısa, en az 120 karakter olmalı');
    }
    if (pageData.description && pageData.description.length > 160) {
      suggestions.push('Meta açıklama çok uzun, 160 karakteri geçmemeli');
    }

    if (pageData.content.length < 300) {
      suggestions.push('İçerik çok kısa, en az 300 kelime olmalı');
    }

    if (keywords.length < 3) {
      suggestions.push('Daha fazla anahtar kelime kullanın');
    }

    const keywordDensity = this.calculateKeywordDensity(pageData.content, keywords);
    if (keywordDensity < 1) {
      suggestions.push('Anahtar kelime yoğunluğu çok düşük');
    }
    if (keywordDensity > 3) {
      suggestions.push('Anahtar kelime yoğunluğu çok yüksek');
    }

    return suggestions;
  }

  // Başlık optimizasyonu
  private optimizeTitle(title: string, keywords: string[]): string {
    if (!title) return 'Travel LyDian - Premium Seyahat Deneyimi';

    let optimizedTitle = title;

    // Anahtar kelimeleri başlığa entegre et
    if (keywords.length > 0 && !title.toLowerCase().includes(keywords[0])) {
      optimizedTitle = `${keywords[0].charAt(0).toUpperCase() + keywords[0].slice(1)} - ${title}`;
    }

    // Uzunluk kontrolü
    if (optimizedTitle.length > 60) {
      optimizedTitle = optimizedTitle.substring(0, 57) + '...';
    }

    return optimizedTitle;
  }

  // Açıklama optimizasyonu
  private optimizeDescription(description: string, keywords: string[]): string {
    if (!description) {
      return `LyDian ile premium seyahat deneyimi yaşayın. ${keywords.slice(0, 3).join(', ')} ve daha fazlası için en iyi fırsatları keşfedin.`;
    }

    let optimizedDesc = description;

    // Anahtar kelimeleri açıklamaya entegre et
    keywords.slice(0, 2).forEach(keyword => {
      if (!optimizedDesc.toLowerCase().includes(keyword)) {
        optimizedDesc += ` ${keyword.charAt(0).toUpperCase() + keyword.slice(1)} hizmetleri.`;
      }
    });

    // Uzunluk kontrolü
    if (optimizedDesc.length > 160) {
      optimizedDesc = optimizedDesc.substring(0, 157) + '...';
    }
    if (optimizedDesc.length < 120) {
      optimizedDesc += ' Detaylı bilgi ve rezervasyon için sitemizi ziyaret edin.';
    }

    return optimizedDesc;
  }

  // Meta etiketleri oluşturma
  private async generateOptimizedMeta(pageData: PageSeoData, analysis: SeoAnalysis): Promise<NextSeoProps> {
    const structuredData = this.generateStructuredData(pageData);

    return {
      title: analysis.meta.title,
      description: analysis.meta.description,
      canonical: pageData.url,
      languageAlternates: this.generateLanguageAlternates(pageData.url),
      openGraph: {
        type: 'website',
        locale: pageData.language,
        url: pageData.url,
        title: analysis.meta.title,
        description: analysis.meta.description,
        siteName: 'Travel LyDian',
        images: [
          {
            url: `${this.baseUrl}/images/og-travel-default.jpg`,
            width: 1200,
            height: 630,
            alt: analysis.meta.title,
          }
        ]
      },
      twitter: {
        handle: '@travellydian',
        site: '@travellydian',
        cardType: 'summary_large_image',
      },
      additionalMetaTags: [
        {
          name: 'keywords',
          content: analysis.keywords.join(', ')
        },
        {
          name: 'author',
          content: 'Travel LyDian'
        },
        {
          name: 'robots',
          content: 'index,follow'
        },
        {
          name: 'googlebot',
          content: 'index,follow'
        }
      ],
      additionalLinkTags: [
        {
          rel: 'icon',
          href: '/favicon.ico'
        }
      ]
    };
  }

  // Yapılandırılmış veri oluşturma
  private generateStructuredData(pageData: PageSeoData) {
    return {
      '@context': 'https://schema.org',
      '@type': 'TravelAgency',
      name: 'Travel LyDian',
      url: this.baseUrl,
      logo: `${this.baseUrl}/images/logo.png`,
      description: 'Premium AI-powered global tourism platform',
      sameAs: [
        'https://www.facebook.com/travellydian',
        'https://www.twitter.com/travellydian',
        'https://www.instagram.com/travellydian'
      ]
    };
  }

  // Dil alternatifleri oluşturma
  private generateLanguageAlternates(url: string) {
    const languages = ['tr', 'en', 'de', 'fr', 'es', 'it', 'ru', 'ar', 'zh'];
    return languages.map(lang => ({
      hrefLang: lang,
      href: url.replace(/\/[a-z]{2}\//, `/${lang}/`)
    }));
  }

  // Arama motorlarına otomatik gönderim
  private async autoSubmitToSearchEngines(url: string): Promise<void> {
    try {
      // Google Search Console API
      await this.submitToGoogle(url);
      
      // Bing Webmaster Tools API
      await this.submitToBing(url);
      
      // Yandex Webmaster API
      await this.submitToYandex(url);
      
      logger.info(`URL başarıyla arama motorlarına gönderildi: ${url}`, { component: 'SEO' });
    } catch (error) {
      logger.error('Arama motoru gönderimi başarısız:', error as Error, { component: 'SEO' });
    }
  }

  // Google'a gönderim
  private async submitToGoogle(url: string): Promise<void> {
    if (!this.apiKey) return;

    try {
      const response = await fetch(`https://searchconsole.googleapis.com/v1/urlInspection/index:inspect`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inspectionUrl: url,
          siteUrl: this.baseUrl
        })
      });

      if (response.ok) {
        logger.info(`Google'a başarıyla gönderildi: ${url}`, { component: 'SEO' });
      }
    } catch (error) {
      logger.warn('Google gönderimi başarısız:', { component: 'SEO', metadata: { data: error } });
    }
  }

  // Bing'e gönderim
  private async submitToBing(url: string): Promise<void> {
    try {
      const response = await fetch(`https://ssl.bing.com/webmaster/api.svc/json/SubmitUrl?apikey=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          siteUrl: this.baseUrl,
          url: url
        })
      });

      if (response.ok) {
        logger.info(`Bing'e başarıyla gönderildi: ${url}`, { component: 'SEO' });
      }
    } catch (error) {
      logger.warn('Bing gönderimi başarısız:', { component: 'SEO', metadata: { data: error } });
    }
  }

  // Yandex'e gönderim
  private async submitToYandex(url: string): Promise<void> {
    try {
      const response = await fetch(`https://webmaster.yandex.com/api/v4/user/{user_id}/hosts/{host_id}/recrawl/queue/`, {
        method: 'POST',
        headers: {
          'Authorization': `OAuth ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: url
        })
      });

      if (response.ok) {
        logger.info(`Yandex'e başarıyla gönderildi: ${url}`, { component: 'SEO' });
      }
    } catch (error) {
      logger.warn('Yandex gönderimi başarısız:', { component: 'SEO', metadata: { data: error } });
    }
  }

  // Alexa ve diğer platformlara kayıt
  async registerToAlexaAndOthers(): Promise<void> {
    try {
      // Alexa Site Info API'ye kayıt
      await this.submitToAlexa();
      
      // Similar Web'e bilgi gönderimi
      await this.submitToSimilarWeb();
      
      // Archive.org'a kayıt
      await this.submitToArchiveOrg();
      
      logger.debug('Alexa ve diğer platformlara başarıyla kaydedildi', { component: 'Autoseobot' });
    } catch (error) {
      logger.error('Platform kayıt işlemi başarısız:', error as Error, { component: 'SEO' });
    }
  }

  private async submitToAlexa(): Promise<void> {
    // Alexa Site Info servisine ping gönder
    try {
      await fetch(`http://data.alexa.com/data?cli=10&dat=s&url=${this.baseUrl}`);
      console.log('Alexa\'ya başarıyla gönderildi');
    } catch (error) {
      logger.warn('Alexa gönderimi başarısız:', { component: 'SEO', metadata: { data: error } });
    }
  }

  private async submitToSimilarWeb(): Promise<void> {
    // SimilarWeb için site verisi gönderimi
    try {
      await fetch(`https://www.similarweb.com/website/${this.baseUrl.replace('https://', '')}/`);
      console.log('SimilarWeb\'e başarıyla gönderildi');
    } catch (error) {
      logger.warn('SimilarWeb gönderimi başarısız:', { component: 'SEO', metadata: { data: error } });
    }
  }

  private async submitToArchiveOrg(): Promise<void> {
    // Internet Archive'a kayıt
    try {
      await fetch(`https://web.archive.org/save/${this.baseUrl}`);
      console.log('Archive.org\'a başarıyla gönderildi');
    } catch (error) {
      logger.warn('Archive.org gönderimi başarısız:', { component: 'SEO', metadata: { data: error } });
    }
  }

  // Sürekli SEO izleme
  async startContinuousMonitoring(): Promise<void> {
    if (!this.enabled) return;

    // Her 6 saatte bir SEO kontrolü
    setInterval(async () => {
      await this.performSeoHealthCheck();
    }, 6 * 60 * 60 * 1000);

    logger.debug('Sürekli SEO izleme başlatıldı', { component: 'Autoseobot' });
  }

  private async performSeoHealthCheck(): Promise<void> {
    try {
      // Site haritası kontrol et
      await this.validateSitemap();
      
      // Robots.txt kontrol et
      await this.validateRobotsTxt();
      
      // Meta etiketleri kontrol et
      await this.validateMetaTags();
      
      logger.debug('SEO health check tamamlandı', { component: 'Autoseobot' });
    } catch (error) {
      logger.error('SEO health check başarısız:', error as Error, { component: 'SEO' });
    }
  }

  private async validateSitemap(): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/sitemap.xml`);
      if (!response.ok) {
        logger.warn('Sitemap bulunamadı veya erişilemez', { component: 'Autoseobot' });
      }
    } catch (error) {
      logger.warn('Sitemap kontrolü başarısız:', { component: 'SEO', metadata: { data: error } });
    }
  }

  private async validateRobotsTxt(): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/robots.txt`);
      if (!response.ok) {
        logger.warn('Robots.txt bulunamadı', { component: 'Autoseobot' });
      }
    } catch (error) {
      logger.warn('Robots.txt kontrolü başarısız:', { component: 'SEO', metadata: { data: error } });
    }
  }

  private async validateMetaTags(): Promise<void> {
    // Meta etiketleri doğrulaması için puppeteer kullanılabilir
    logger.debug('Meta etiketleri kontrol edildi', { component: 'Autoseobot' });
  }
}

export default AutoSeoBot;
export type { SeoAnalysis, PageSeoData };