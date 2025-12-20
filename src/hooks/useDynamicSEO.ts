/**
 * Dynamic SEO Hook with Rich Results Engine
 * Her sayfa için otomatik SEO metadata ve Rich Snippets oluşturur
 *
 * Arama sonuçlarında URL'lerin yanında kaliteli görseller,
 * yıldız puanları, fiyatlar ve tüm detaylarla görünmesini sağlar
 */

import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { getRichResultsEngine } from '@/lib/seo/richResultsEngine';

interface DynamicSEOConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  images?: string[]; // Multiple images for rich results
  type?: 'website' | 'article' | 'product' | 'hotel' | 'place';
  rating?: number;
  reviewCount?: number;
  price?: { amount: number; currency: string };
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  author?: { name: string; url?: string };
  datePublished?: string;
  dateModified?: string;
}

interface SEOMetadata {
  title: string;
  description: string;
  keywords: string;
  image: string;
  url: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  ogType: string;
  ogLocale: string;
  ogSiteName: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  twitterSite: string;
  schemas: any[]; // Rich Snippet schemas
  hreflang: Record<string, string>; // Multi-language support
}

const pageTemplates: Record<string, DynamicSEOConfig> = {
  '/': {
    title: 'Travel Ailydian - AI Destekli Premium Seyahat Platformu',
    description: 'AI destekli kişiselleştirilmiş seyahat önerileri, VR önizlemeler ve blockchain güvenliği ile dünya çapında benzersiz seyahat deneyimleri keşfedin. Otel, uçak bileti, transfer ve turlar için en iyi fiyatlar.',
    keywords: ['seyahat', 'tatil', 'otel rezervasyonu', 'ucuz uçak bileti', 'ai seyahat', 'türkiye turizm', 'istanbul otelleri', 'antalya tatil', 'kapadokya turları', 'blockchain seyahat'],
    type: 'website',
    images: [
      '/images/homepage-hero-1200x675.jpg',
      '/images/travel-destinations-1200x675.jpg',
      '/images/ai-travel-assistant-1200x675.jpg'
    ],
    rating: 4.8,
    reviewCount: 5247
  },
  '/hotels': {
    title: 'Otel Rezervasyonu - En İyi Otel Fiyatları | Travel Ailydian',
    description: 'Dünya çapında 1 milyon+ otel seçeneği. AI destekli otel önerileri, VR tur, en uygun fiyat garantisi. İstanbul, Antalya, Bodrum ve tüm dünyada otel rezervasyonu. Hemen rezervasyon yapın!',
    keywords: ['otel rezervasyonu', 'ucuz otel', 'istanbul otelleri', 'antalya otel', 'bodrum otel', 'hotel booking', 'online otel', 'otel fiyatları', 'lüks otel', 'butik otel'],
    type: 'hotel',
    images: [
      '/images/hotels-luxury-1200x675.jpg',
      '/images/hotels-budget-1200x675.jpg',
      '/images/hotels-vr-tour-1200x675.jpg'
    ],
    rating: 4.7,
    reviewCount: 3421,
    price: { amount: 150, currency: 'EUR' },
    availability: 'InStock'
  },
  '/flights': {
    title: 'Ucuz Uçak Bileti - En Uygun Fiyatlarla Uçuş Ara | Travel Ailydian',
    description: 'Dünya çapında 500+ havayolu firmasından ucuz uçak bileti. AI ile en uygun uçuş seçenekleri. İstanbul, Ankara, İzmir ve tüm dünya destinasyonlarına uçak bileti. Hemen ara ve rezervasyon yap!',
    keywords: ['ucuz uçak bileti', 'uçak bileti', 'flight ticket', 'istanbul uçak bileti', 'ankara uçak bileti', 'yurt dışı uçak bileti', 'online uçak bileti', 'uçuş ara', 'havayolu bileti'],
    type: 'website'
  },
  '/transfers': {
    title: 'Havalimanı Transfer - VIP Transfer Hizmetleri | Travel Ailydian',
    description: 'Güvenli ve konforlu havalimanı transfer hizmetleri. VIP araç kiralama, şoförlü araç, grup transferleri için en iyi fiyatlar. İstanbul, Antalya, Bodrum havalimanı transfer.',
    keywords: ['havalimanı transfer', 'vip transfer', 'araç kiralama', 'şoförlü araç', 'airport transfer', 'istanbul transfer', 'antalya transfer', 'transfer hizmeti', 'grup transferi'],
    type: 'website'
  },
  '/tours': {
    title: 'Turlar ve Aktiviteler - En İyi Tur Fırsatları | Travel Ailydian',
    description: 'Dünya çapında 10,000+ tur ve aktivite. Rehberli turlar, günübirlik geziler, macera aktiviteleri. VR önizleme ile keşfet! İstanbul, Kapadokya, Antalya turları.',
    keywords: ['turlar', 'aktiviteler', 'günübirlik tur', 'rehberli tur', 'istanbul turları', 'kapadokya turu', 'antalya aktiviteleri', 'macera turları', 'kültür turları', 'gastronomi turları'],
    type: 'website'
  },
  '/destinations': {
    title: 'Destinasyonlar - Dünya Çapında Seyahat Rehberi | Travel Ailydian',
    description: 'Dünya çapında binlerce destinasyon keşfedin. AI destekli destinasyon önerileri, yerel rehber bilgileri, gezilecek yerler ve yapılacak aktiviteler.',
    keywords: ['destinasyonlar', 'seyahat rehberi', 'gezilecek yerler', 'tatil yerleri', 'turkey tourism', 'travel destinations', 'holiday destinations', 'vacation spots'],
    type: 'website'
  },
  '/experiences': {
    title: 'Deneyimler - Unutulmaz Seyahat Anıları | Travel Ailydian',
    description: 'Benzersiz seyahat deneyimleri keşfedin. VR önizleme, blockchain doğrulamalı özel deneyimler, yerel kültür turları ve macera aktiviteleri.',
    keywords: ['seyahat deneyimleri', 'unutulmaz anılar', 'özel turlar', 'kültür deneyimleri', 'macera turları', 'yerel deneyimler', 'travel experiences', 'unique experiences'],
    type: 'website'
  }
};

export function useDynamicSEO(customConfig?: DynamicSEOConfig): SEOMetadata {
  const router = useRouter();
  const { pathname, asPath, locale } = router;

  const seoMetadata = useMemo(() => {
    // Sayfa template'ini bul
    const pageTemplate = pageTemplates[pathname] || pageTemplates['/'];

    // Custom config varsa birleştir
    const config = customConfig ? { ...pageTemplate, ...customConfig } : pageTemplate;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://travel.ailydian.com';
    const currentUrl = `${baseUrl}${asPath}`;
    const defaultImage = `${baseUrl}/images/og-travel-default.jpg`;

    // Dynamic keyword generation based on path
    const pathSegments = pathname.split('/').filter(Boolean);
    const dynamicKeywords = pathSegments.length > 0
      ? pathSegments.map(segment => segment.replace(/-/g, ' '))
      : [];

    const allKeywords = [
      ...(config.keywords || []),
      ...dynamicKeywords,
      'travel ailydian',
      'ai seyahat',
      'premium turizm'
    ];

    // Title optimization
    const sitePostfix = ' | Travel Ailydian';
    let finalTitle = config.title || 'Travel Ailydian';
    if (!finalTitle.includes('Travel Ailydian')) {
      finalTitle += sitePostfix;
    }

    // Description optimization
    let finalDescription = config.description || 'AI-powered premium travel platform with VR previews and blockchain security.';

    // Ensure optimal length
    if (finalDescription.length < 150) {
      finalDescription += ' Hemen keşfet ve en iyi fiyatları yakala!';
    }
    if (finalDescription.length > 160) {
      finalDescription = finalDescription.substring(0, 157) + '...';
    }

    // Generate Rich Results using Rich Results Engine
    const richEngine = getRichResultsEngine();
    const images = config.images || [config.image || defaultImage];

    // Open Graph tags
    const ogTags = richEngine.generateOpenGraphTags({
      type: config.type || 'website',
      title: finalTitle,
      description: finalDescription,
      image: images[0],
      imageWidth: 1200,
      imageHeight: 675,
      url: currentUrl,
      locale: locale === 'tr' ? 'tr_TR' : locale === 'en' ? 'en_US' : 'tr_TR',
      alternateLocales: ['en_US', 'tr_TR', 'ru_RU', 'de_DE', 'uk_UA', 'ar_SA', 'fa_IR'],
      price: config.price
    });

    // Twitter Card tags
    const twitterTags = richEngine.generateTwitterCardTags({
      type: 'summary_large_image',
      title: finalTitle,
      description: finalDescription,
      image: images[0]
    });

    // Generate appropriate schema based on page type
    const schemas: any[] = [];

    if (config.type === 'hotel' && config.price) {
      schemas.push(richEngine.generateProductSnippet({
        name: finalTitle,
        description: finalDescription,
        images: images,
        price: config.price,
        availability: config.availability || 'InStock',
        rating: config.rating,
        reviewCount: config.reviewCount,
        url: currentUrl,
        category: 'Hotels & Accommodations'
      }));
    } else if (config.type === 'product' && config.price) {
      schemas.push(richEngine.generateProductSnippet({
        name: finalTitle,
        description: finalDescription,
        images: images,
        price: config.price,
        availability: config.availability || 'InStock',
        rating: config.rating,
        reviewCount: config.reviewCount,
        url: currentUrl
      }));
    } else if (config.type === 'article' && config.author) {
      schemas.push(richEngine.generateArticleSnippet({
        headline: finalTitle,
        description: finalDescription,
        image: images[0],
        datePublished: config.datePublished || new Date().toISOString(),
        dateModified: config.dateModified || new Date().toISOString(),
        author: config.author,
        publisher: {
          name: 'Travel Ailydian',
          logo: `${baseUrl}/images/logo-600x60.png`
        },
        url: currentUrl,
        keywords: config.keywords
      }));
    }

    // Add breadcrumb schema for all pages except homepage
    if (pathname !== '/') {
      const breadcrumbs = [{ name: 'Ana Sayfa', url: baseUrl }];
      const segments = pathname.split('/').filter(Boolean);

      segments.forEach((segment, index) => {
        const segmentPath = '/' + segments.slice(0, index + 1).join('/');
        breadcrumbs.push({
          name: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
          url: `${baseUrl}${segmentPath}`
        });
      });

      schemas.push(richEngine.generateBreadcrumbSnippet(breadcrumbs));
    }

    // Hreflang tags for multi-language support
    const hreflang: Record<string, string> = {
      'tr': `${baseUrl}/tr${asPath}`,
      'en': `${baseUrl}/en${asPath}`,
      'ru': `${baseUrl}/ru${asPath}`,
      'de': `${baseUrl}/de${asPath}`,
      'uk': `${baseUrl}/uk${asPath}`,
      'ar': `${baseUrl}/ar${asPath}`,
      'fa': `${baseUrl}/fa${asPath}`,
      'x-default': `${baseUrl}${asPath}`
    };

    return {
      title: finalTitle,
      description: finalDescription,
      keywords: allKeywords.join(', '),
      image: images[0],
      url: currentUrl,
      canonical: currentUrl,
      ogTitle: ogTags['og:title'],
      ogDescription: ogTags['og:description'],
      ogImage: ogTags['og:image'],
      ogUrl: ogTags['og:url'],
      ogType: ogTags['og:type'],
      ogLocale: ogTags['og:locale'],
      ogSiteName: ogTags['og:site_name'],
      twitterCard: twitterTags['twitter:card'],
      twitterTitle: twitterTags['twitter:title'],
      twitterDescription: twitterTags['twitter:description'],
      twitterImage: twitterTags['twitter:image'],
      twitterSite: twitterTags['twitter:site'],
      schemas,
      hreflang
    };
  }, [pathname, asPath, locale, customConfig]);

  return seoMetadata;
}

export default useDynamicSEO;
