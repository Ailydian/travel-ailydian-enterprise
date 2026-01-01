import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product' | 'profile';
  locale?: string;
  noindex?: boolean;
  nofollow?: boolean;
  canonicalUrl?: string;
  alternateUrls?: { [locale: string]: string };
  structuredData?: any;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

const GlobalSEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image = '/images/og-default.jpg',
  url,
  type = 'website',
  locale,
  noindex = false,
  nofollow = false,
  canonicalUrl,
  alternateUrls,
  structuredData,
  author = 'AILYDIAN Holiday',
  publishedTime,
  modifiedTime,
  section,
  tags = []
}) => {
  const router = useRouter();
  const { t } = useTranslation(['common', 'seo']);
  
  const currentLocale = locale || router.locale || 'tr';
  const currentUrl = url || `https://holiday.ailydian.com${router.asPath}`;
  const fullImageUrl = image.startsWith('http') ? image : `https://holiday.ailydian.com${image}`;
  
  // Dynamic SEO content based on locale
  const getSEOContent = () => {
    const baseTitle = title || t('seo:defaultTitle', 'AILYDIAN Holiday - AI-Powered Travel Platform');
    const baseDescription = description || t('seo:defaultDescription',
      'Discover unique travel experiences with AI-powered recommendations, VR previews, and blockchain-verified bookings worldwide.');
    const baseKeywords = keywords || t('seo:defaultKeywords',
      'travel, ai travel, blockchain travel, vr tours, turkey tourism, global travel platform');

    return {
      title: `${baseTitle} | AILYDIAN Holiday`,
      description: baseDescription,
      keywords: baseKeywords
    };
  };

  const { title: seoTitle, description: seoDescription, keywords: seoKeywords } = getSEOContent();

  // Generate hreflang URLs
  const generateHreflangUrls = () => {
    const baseUrl = 'https://holiday.ailydian.com';
    const locales = [
      'en', 'tr', 'ar', 'de', 'fr', 'es', 'it', 'pt', 'ru', 'zh', 
      'ja', 'ko', 'nl', 'sv', 'da', 'no', 'fi', 'pl', 'cs', 'hu'
    ];
    
    return locales.map(loc => ({
      hreflang: loc,
      href: loc === 'tr' ? `${baseUrl}${router.asPath}` : `${baseUrl}/${loc}${router.asPath}`
    }));
  };

  const hreflangUrls = alternateUrls 
    ? Object.entries(alternateUrls).map(([hreflang, href]) => ({ hreflang, href }))
    : generateHreflangUrls();

  // Structured Data for Travel Website
  const getStructuredData = () => {
    const baseStructuredData = {
      "@context": "https://schema.org",
      "@type": type === 'website' ? 'TravelAgency' : 'WebPage',
      "name": "AILYDIAN Holiday",
      "description": seoDescription,
      "url": currentUrl,
      "logo": {
        "@type": "ImageObject",
        "url": "https://holiday.ailydian.com/images/logo.png",
        "width": 400,
        "height": 400
      },
      "sameAs": [
        "https://twitter.com/travellydian",
        "https://facebook.com/travellydian",
        "https://instagram.com/travellydian",
        "https://linkedin.com/company/travel-lydian"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+90-212-555-0123",
        "contactType": "customer service",
        "availableLanguage": ["Turkish", "English", "Arabic", "German", "French"]
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "TR",
        "addressLocality": "Istanbul",
        "addressRegion": "Istanbul",
        "streetAddress": "Maslak, Sarıyer"
      },
      "priceRange": "$$",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "15420"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "TRY",
        "lowPrice": "50",
        "highPrice": "5000",
        "offerCount": "10000+"
      }
    };

    if (type === 'article' && publishedTime) {
      return {
        ...baseStructuredData,
        "@type": "Article",
        "headline": seoTitle,
        "author": {
          "@type": "Organization",
          "name": author
        },
        "publisher": {
          "@type": "Organization",
          "name": "AILYDIAN Holiday",
          "logo": {
            "@type": "ImageObject",
            "url": "https://holiday.ailydian.com/images/logo.png"
          }
        },
        "datePublished": publishedTime,
        "dateModified": modifiedTime || publishedTime,
        "mainEntityOfPage": currentUrl,
        "image": fullImageUrl,
        "articleSection": section,
        "keywords": seoKeywords
      };
    }

    return structuredData || baseStructuredData;
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={`${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`} />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#FF214D" />
      <meta name="msapplication-TileColor" content="#FF214D" />
      
      {/* Language and Locale */}
      <meta httpEquiv="content-language" content={currentLocale} />
      <meta name="language" content={currentLocale} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl || currentUrl} />
      
      {/* Hreflang Tags */}
      {hreflangUrls.map(({ hreflang, href }) => (
        <link key={hreflang} rel="alternate" hrefLang={hreflang} href={href} />
      ))}
      
      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:locale" content={currentLocale.replace('-', '_')} />
      <meta property="og:site_name" content="AILYDIAN Holiday" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@travellydian" />
      <meta name="twitter:creator" content="@travellydian" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={fullImageUrl} />
      
      {/* Article Specific */}
      {type === 'article' && publishedTime && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
          <meta property="article:author" content={author} />
        </>
      )}
      
      {/* Favicon and Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/icons/android-chrome-192x192.png" />
      <link rel="icon" type="image/png" sizes="512x512" href="/icons/android-chrome-512x512.png" />
      <link rel="manifest" href="/manifest.json" />
      
      {/* DNS Prefetch for Performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//images.unsplash.com" />
      <link rel="dns-prefetch" href="//api.holiday.ailydian.com" />
      <link rel="dns-prefetch" href="//cdn.ailydian.com" />
      
      {/* Preload Critical Resources */}
      <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getStructuredData())
        }}
      />
      
      {/* Additional SEO Meta for Travel Industry */}
      <meta name="geo.region" content="TR" />
      <meta name="geo.placename" content="Turkey" />
      <meta name="geo.position" content="39.925533;32.866287" />
      <meta name="ICBM" content="39.925533, 32.866287" />
      
      {/* Travel Industry Specific */}
      <meta name="booking.com-site-verification" content="travel-lydian-verification" />
      <meta name="google-site-verification" content="travel-lydian-google-verification" />
      <meta name="bing-site-verification" content="travel-lydian-bing-verification" />
      <meta name="yandex-verification" content="travel-lydian-yandex-verification" />
      <meta name="baidu-site-verification" content="travel-lydian-baidu-verification" />
      
      {/* Security Headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      
      {/* Performance Hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Head>
  );
};

export default GlobalSEO;