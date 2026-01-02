/**
 * Enhanced SEO Head Component
 * Comprehensive meta tags for all search engines and social platforms
 * Supports 8 languages with hreflang tags
 * @module components/seo/SEOHead
 */

import Head from 'next/head';
import { useRouter } from 'next/router';
import { SEO_CONFIG } from '../../config/seo';

export type SupportedLocale = 'tr' | 'en' | 'de' | 'ru' | 'ar' | 'fa' | 'fr' | 'el';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article' | 'product' | 'business.business';
  noindex?: boolean;
  canonical?: string;
  structuredData?: object | object[];
  ogLocale?: SupportedLocale;
  twitterCard?: 'summary' | 'summary_large_image';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  productPrice?: number;
  productCurrency?: string;
  productAvailability?: 'in stock' | 'out of stock';
}

const LOCALE_MAP: Record<SupportedLocale, string> = {
  tr: 'tr_TR',
  en: 'en_US',
  de: 'de_DE',
  ru: 'ru_RU',
  ar: 'ar_AR',
  fa: 'fa_IR',
  fr: 'fr_FR',
  el: 'el_GR',
};

const ALL_LOCALES: SupportedLocale[] = ['tr', 'en', 'de', 'ru', 'ar', 'fa', 'fr', 'el'];

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords = [],
  image,
  type = 'website',
  noindex = false,
  canonical,
  structuredData,
  ogLocale,
  twitterCard = 'summary_large_image',
  author,
  publishedTime,
  modifiedTime,
  productPrice,
  productCurrency,
  productAvailability,
}) => {
  const router = useRouter();
  const { locale = 'tr', asPath } = router;

  const currentLocale = (ogLocale || locale) as SupportedLocale;

  const fullTitle = title
    ? `${title} | ${SEO_CONFIG.siteName}`
    : SEO_CONFIG.defaultTitle;

  const fullDescription = description || SEO_CONFIG.defaultDescription;

  const currentUrl = canonical || `${SEO_CONFIG.url}${asPath}`;

  const fullImage = image || SEO_CONFIG.openGraph.images[0].url;

  const allKeywords = [
    ...SEO_CONFIG.primaryKeywords,
    ...keywords,
  ].join(', ');

  const robotsContent = noindex
    ? 'noindex, nofollow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={allKeywords} />

      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />

      {/* Robots */}
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      <meta name="bingbot" content={robotsContent} />

      {/* Language & Geographic */}
      <meta httpEquiv="content-language" content="tr" />
      <meta name="language" content="Turkish" />
      <meta name="geo.region" content="TR" />
      <meta name="geo.placename" content="Istanbul, Turkey" />
      <meta name="geo.position" content="41.0082;28.9784" />
      <meta name="ICBM" content="41.0082, 28.9784" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SEO_CONFIG.siteName} />
      <meta property="og:locale" content="tr_TR" />
      <meta property="og:locale:alternate" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content={SEO_CONFIG.social.twitter} />
      <meta name="twitter:creator" content={SEO_CONFIG.social.twitter} />

      {/* Additional Meta Tags */}
      <meta name="author" content="AILYDIAN Holiday" />
      <meta name="publisher" content="AILYDIAN Holiday" />
      <meta name="copyright" content="© 2025 AILYDIAN Holiday" />
      <meta name="application-name" content="AILYDIAN Holiday" />
      <meta name="apple-mobile-web-app-title" content="LyDian" />

      {/* Mobile Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* Theme Color */}
      <meta name="theme-color" content="#FF214D" />
      <meta name="msapplication-TileColor" content="#FF214D" />

      {/* Contact & Business Info */}
      <meta name="contact" content={SEO_CONFIG.contact.email} />
      <meta name="reply-to" content={SEO_CONFIG.contact.supportEmail} />

      {/* Structured Data - JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData || SEO_CONFIG.structuredData),
        }}
      />

      {/* Hreflang Tags for All 8 Languages */}
      {ALL_LOCALES.map((lang) => {
        const langPath = lang === 'tr' ? '' : `/${lang}`;
        const cleanPath = asPath.replace(/^\/(tr|en|de|ru|ar|fa|fr|el)/, '');
        const hrefLangUrl = `${SEO_CONFIG.url}${langPath}${cleanPath}`;

        return (
          <link
            key={`hreflang-${lang}`}
            rel="alternate"
            hrefLang={lang}
            href={hrefLangUrl}
          />
        );
      })}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${SEO_CONFIG.url}/en${asPath.replace(/^\/(tr|en|de|ru|ar|fa|fr|el)/, '')}`}
      />

      {/* Product-specific meta tags */}
      {type === 'product' && productPrice && productCurrency && (
        <>
          <meta property="product:price:amount" content={productPrice.toString()} />
          <meta property="product:price:currency" content={productCurrency} />
          {productAvailability && (
            <meta property="product:availability" content={productAvailability} />
          )}
        </>
      )}

      {/* Article-specific meta tags */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
        </>
      )}

      {/* Additional Open Graph Locale Alternates */}
      {ALL_LOCALES
        .filter((lang) => lang !== currentLocale)
        .map((lang) => (
          <meta
            key={`og:locale:alternate:${lang}`}
            property="og:locale:alternate"
            content={LOCALE_MAP[lang]}
          />
        ))}

      {/* Enhanced Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              Array.isArray(structuredData)
                ? { '@context': 'https://schema.org', '@graph': structuredData }
                : structuredData
            ),
          }}
        />
      )}

      {/* Favicons */}
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />

      {/* Security Headers */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
    </Head>
  );
};

export default SEOHead;
