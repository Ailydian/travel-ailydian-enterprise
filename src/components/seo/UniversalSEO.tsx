/**
 * Universal SEO Component
 * Comprehensive SEO implementation for all pages
 *
 * @component UniversalSEO
 * @version 2.0.0
 * @seo Automatic hreflang, schema.org, Open Graph, Twitter Cards
 */

import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  generateHreflangTags,
  generateMetaTags,
  generateBreadcrumbSchema,
  generateOrganizationSchema,
  generateWebsiteSchema,
  type SupportedLocale,
  type BreadcrumbItem,
} from '@/lib/seo/universal-seo';

// ===================================================
// TYPE DEFINITIONS
// ===================================================

export interface UniversalSEOProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  type?: 'website' | 'article' | 'product' | 'service' | 'business.business';
  noindex?: boolean;
  nofollow?: boolean;
  schema?: any | any[];
  breadcrumbs?: BreadcrumbItem[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  includeOrganization?: boolean;
  includeWebsite?: boolean;
}

// ===================================================
// COMPONENT
// ===================================================

export const UniversalSEO: React.FC<UniversalSEOProps> = ({
  title,
  description,
  keywords,
  ogImage,
  type = 'website',
  noindex = false,
  nofollow = false,
  schema,
  breadcrumbs,
  author,
  publishedTime,
  modifiedTime,
  includeOrganization = true,
  includeWebsite = false,
}) => {
  const router = useRouter();
  const locale = (router.locale || 'tr') as SupportedLocale;
  const path = router.asPath;

  // Generate meta tags
  const metaTags = generateMetaTags({
    title,
    description,
    keywords,
    ogImage,
    type,
    locale,
    noindex,
    nofollow,
    author,
    publishedTime,
    modifiedTime,
  });

  // Generate hreflang tags
  const hreflangs = generateHreflangTags(path);

  // Generate schemas
  const schemas: any[] = [];

  // Add custom schema(s)
  if (schema) {
    if (Array.isArray(schema)) {
      schemas.push(...schema);
    } else {
      schemas.push(schema);
    }
  }

  // Add breadcrumb schema
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push(generateBreadcrumbSchema(breadcrumbs));
  }

  // Add organization schema
  if (includeOrganization) {
    schemas.push(generateOrganizationSchema(locale));
  }

  // Add website schema
  if (includeWebsite) {
    schemas.push(generateWebsiteSchema(locale));
  }

  return (
    <Head>
      {/* ===================================================
          BASIC META TAGS
          =================================================== */}
      <title>{metaTags.title}</title>
      <meta name="description" content={metaTags.description} />
      {metaTags.keywords && <meta name="keywords" content={metaTags.keywords} />}
      <link rel="canonical" href={metaTags.canonical} />
      {metaTags.robots && <meta name="robots" content={metaTags.robots} />}

      {/* Viewport and mobile optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

      {/* Language and locale */}
      <meta httpEquiv="content-language" content={locale} />

      {/* Author */}
      {metaTags.article?.author && (
        <meta name="author" content={metaTags.article.author} />
      )}

      {/* ===================================================
          OPEN GRAPH (Facebook, LinkedIn, WhatsApp)
          =================================================== */}
      <meta property="og:type" content={metaTags.openGraph.type} />
      <meta property="og:locale" content={metaTags.openGraph.locale} />
      <meta property="og:title" content={metaTags.openGraph.title} />
      <meta property="og:description" content={metaTags.openGraph.description} />
      <meta property="og:url" content={metaTags.openGraph.url} />
      <meta property="og:site_name" content={metaTags.openGraph.siteName} />

      {metaTags.openGraph.images.map((img, i) => (
        <meta key={`og-image-${i}`} property="og:image" content={img.url} />
      ))}
      {metaTags.openGraph.images.map((img, i) => (
        <meta key={`og-image-width-${i}`} property="og:image:width" content={img.width.toString()} />
      ))}
      {metaTags.openGraph.images.map((img, i) => (
        <meta key={`og-image-height-${i}`} property="og:image:height" content={img.height.toString()} />
      ))}
      {metaTags.openGraph.images.map((img, i) => (
        <meta key={`og-image-alt-${i}`} property="og:image:alt" content={img.alt} />
      ))}

      {/* Article metadata */}
      {metaTags.article?.publishedTime && (
        <meta property="article:published_time" content={metaTags.article.publishedTime} />
      )}
      {metaTags.article?.modifiedTime && (
        <meta property="article:modified_time" content={metaTags.article.modifiedTime} />
      )}
      {metaTags.article?.author && (
        <meta property="article:author" content={metaTags.article.author} />
      )}

      {/* ===================================================
          TWITTER CARDS
          =================================================== */}
      <meta name="twitter:card" content={metaTags.twitter.card} />
      <meta name="twitter:title" content={metaTags.twitter.title} />
      <meta name="twitter:description" content={metaTags.twitter.description} />
      {metaTags.twitter.site && (
        <meta name="twitter:site" content={metaTags.twitter.site} />
      )}
      {metaTags.twitter.creator && (
        <meta name="twitter:creator" content={metaTags.twitter.creator} />
      )}
      {metaTags.twitter.images.map((img, i) => (
        <meta key={`twitter-image-${i}`} name="twitter:image" content={img} />
      ))}

      {/* ===================================================
          HREFLANG TAGS (International SEO)
          =================================================== */}
      {hreflangs.map((tag, i) => (
        <link
          key={`hreflang-${i}`}
          rel={tag.rel}
          hrefLang={tag.hreflang}
          href={tag.href}
        />
      ))}

      {/* ===================================================
          SCHEMA.ORG STRUCTURED DATA
          =================================================== */}
      {schemas.map((schemaItem, i) => (
        <script
          key={`schema-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaItem, null, process.env.NODE_ENV === 'development' ? 2 : 0),
          }}
        />
      ))}

      {/* ===================================================
          ADDITIONAL SEO ENHANCEMENTS
          =================================================== */}

      {/* Geo targeting */}
      <meta name="geo.region" content="TR" />
      <meta name="geo.placename" content="Turkey" />

      {/* Mobile app links (if applicable) */}
      {/* <meta property="al:ios:app_name" content="AILYDIAN Holiday" /> */}
      {/* <meta property="al:android:app_name" content="AILYDIAN Holiday" /> */}

      {/* Verification tags (add when ready) */}
      {/* <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" /> */}
      {/* <meta name="yandex-verification" content="YOUR_VERIFICATION_CODE" /> */}
      {/* <meta name="msvalidate.01" content="YOUR_VERIFICATION_CODE" /> */}

      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
    </Head>
  );
};

export default UniversalSEO;
