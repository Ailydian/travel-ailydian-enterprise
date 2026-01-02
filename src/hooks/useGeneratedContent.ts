/**
 * useGeneratedContent Hook
 * React hook for accessing AI-generated content with caching and optimization
 *
 * Features:
 * - Automatic locale detection
 * - Content caching
 * - Fallback handling
 * - Type-safe content access
 * - Performance optimization
 */

import { useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Language, GeneratedContent, ContentType } from '@/lib/ai/content-generator-advanced';

// ============================================================================
// TYPES
// ============================================================================

interface UseGeneratedContentOptions {
  fallbackLocale?: Language;
  enableCache?: boolean;
  onError?: (error: Error) => void;
}

interface ContentHookReturn {
  content: GeneratedContent | null;
  isLoading: boolean;
  error: Error | null;
  refresh: () => void;
}

// ============================================================================
// CACHE
// ============================================================================

const contentCache = new Map<string, GeneratedContent>();

// ============================================================================
// HOOK
// ============================================================================

/**
 * Hook to access AI-generated content for a specific item
 *
 * @example
 * ```tsx
 * const { content, isLoading, error } = useGeneratedContent('tour-123', 'tour');
 *
 * if (isLoading) return <Spinner />;
 * if (error) return <Error message={error.message} />;
 *
 * return (
 *   <div>
 *     <h1>{content.title}</h1>
 *     <p>{content.description}</p>
 *   </div>
 * );
 * ```
 */
export function useGeneratedContent(
  itemId: string,
  type: ContentType,
  options: UseGeneratedContentOptions = {}
): ContentHookReturn {
  const router = useRouter();
  const locale = (router.locale as Language) || 'en';

  const {
    fallbackLocale = 'en',
    enableCache = true,
    onError,
  } = options;

  const cacheKey = useMemo(
    () => `${type}-${itemId}-${locale}`,
    [type, itemId, locale]
  );

  const content = useMemo(() => {
    try {
      // Check cache first
      if (enableCache && contentCache.has(cacheKey)) {
        return contentCache.get(cacheKey)!;
      }

      // Try to load from generated files
      let loadedContent: GeneratedContent | null = null;

      try {
        // Try current locale
        const currentLocaleContent = require(`../../generated-content/${type}/${locale}/${itemId}.json`);
        loadedContent = currentLocaleContent;
      } catch (error) {
        // Try fallback locale
        try {
          const fallbackContent = require(`../../generated-content/${type}/${fallbackLocale}/${itemId}.json`);
          loadedContent = fallbackContent;
        } catch (fallbackError) {
          // No content found
          return null;
        }
      }

      // Cache the loaded content
      if (loadedContent && enableCache) {
        contentCache.set(cacheKey, loadedContent);
      }

      return loadedContent;
    } catch (error) {
      if (onError) {
        onError(error as Error);
      }
      return null;
    }
  }, [cacheKey, type, itemId, locale, fallbackLocale, enableCache, onError]);

  const refresh = useCallback(() => {
    // Clear cache for this item
    if (enableCache) {
      contentCache.delete(cacheKey);
    }
    // Force re-render
    router.replace(router.asPath);
  }, [cacheKey, enableCache, router]);

  return {
    content,
    isLoading: false,
    error: null,
    refresh,
  };
}

/**
 * Hook to access multiple generated contents
 *
 * @example
 * ```tsx
 * const { contents, isLoading } = useGeneratedContents([
 *   { id: 'tour-1', type: 'tour' },
 *   { id: 'tour-2', type: 'tour' },
 * ]);
 * ```
 */
export function useGeneratedContents(
  items: Array<{ id: string; type: ContentType }>,
  options: UseGeneratedContentOptions = {}
): {
  contents: Map<string, GeneratedContent>;
  isLoading: boolean;
  error: Error | null;
} {
  const router = useRouter();
  const locale = (router.locale as Language) || 'en';

  const contents = useMemo(() => {
    const map = new Map<string, GeneratedContent>();

    for (const item of items) {
      const cacheKey = `${item.type}-${item.id}-${locale}`;

      try {
        // Check cache
        if (options.enableCache !== false && contentCache.has(cacheKey)) {
          map.set(item.id, contentCache.get(cacheKey)!);
          continue;
        }

        // Load content
        try {
          const content = require(`../../generated-content/${item.type}/${locale}/${item.id}.json`);
          map.set(item.id, content);

          // Cache
          if (options.enableCache !== false) {
            contentCache.set(cacheKey, content);
          }
        } catch (error) {
          // Try fallback locale
          const fallbackLocale = options.fallbackLocale || 'en';
          try {
            const fallbackContent = require(`../../generated-content/${item.type}/${fallbackLocale}/${item.id}.json`);
            map.set(item.id, fallbackContent);

            if (options.enableCache !== false) {
              contentCache.set(cacheKey, fallbackContent);
            }
          } catch (fallbackError) {
            // Skip this item
            continue;
          }
        }
      } catch (error) {
        if (options.onError) {
          options.onError(error as Error);
        }
      }
    }

    return map;
  }, [items, locale, options]);

  return {
    contents,
    isLoading: false,
    error: null,
  };
}

/**
 * Hook to get content metadata (for performance optimization)
 *
 * @example
 * ```tsx
 * const metadata = useContentMetadata('tour-123', 'tour');
 *
 * <div>
 *   <h1>{metadata.title}</h1>
 *   <p>Quality Score: {metadata.quality.score}</p>
 * </div>
 * ```
 */
export function useContentMetadata(itemId: string, type: ContentType) {
  const { content } = useGeneratedContent(itemId, type);

  return useMemo(() => {
    if (!content) return null;

    return {
      title: content.title,
      description: content.shortDescription,
      locale: content.locale,
      quality: content.quality,
      generatedAt: content.generatedAt,
      version: content.version,
    };
  }, [content]);
}

/**
 * Hook to get SEO metadata for a content item
 *
 * @example
 * ```tsx
 * const seo = useContentSEO('tour-123', 'tour');
 *
 * <Head>
 *   <title>{seo.metaTitle}</title>
 *   <meta name="description" content={seo.metaDescription} />
 *   <meta name="keywords" content={seo.keywords.join(', ')} />
 * </Head>
 * ```
 */
export function useContentSEO(itemId: string, type: ContentType) {
  const { content } = useGeneratedContent(itemId, type);

  return useMemo(() => {
    if (!content) return null;

    return {
      metaTitle: content.metaTitle,
      metaDescription: content.metaDescription,
      keywords: content.keywords,
      canonicalUrl: content.canonicalUrl,
      structuredData: content.structuredData,
    };
  }, [content]);
}

/**
 * Hook to get content reviews
 */
export function useContentReviews(itemId: string, type: ContentType) {
  const { content } = useGeneratedContent(itemId, type);

  return useMemo(() => {
    return content?.reviews || [];
  }, [content]);
}

/**
 * Hook to get content FAQs
 */
export function useContentFAQs(itemId: string, type: ContentType) {
  const { content } = useGeneratedContent(itemId, type);

  return useMemo(() => {
    return content?.faqs || [];
  }, [content]);
}

/**
 * Hook to get content itinerary (for tours)
 */
export function useContentItinerary(itemId: string) {
  const { content } = useGeneratedContent(itemId, 'tour');

  return useMemo(() => {
    return content?.itinerary || [];
  }, [content]);
}

/**
 * Prefetch content for better performance
 */
export function prefetchContent(itemId: string, type: ContentType, locale: Language): void {
  const cacheKey = `${type}-${itemId}-${locale}`;

  // Skip if already cached
  if (contentCache.has(cacheKey)) return;

  try {
    const content = require(`../../generated-content/${type}/${locale}/${itemId}.json`);
    contentCache.set(cacheKey, content);
  } catch (error) {
    // Silently fail
  }
}

/**
 * Clear content cache
 */
export function clearContentCache(): void {
  contentCache.clear();
}

/**
 * Get cache statistics
 */
export function getContentCacheStats() {
  return {
    size: contentCache.size,
    keys: Array.from(contentCache.keys()),
  };
}

// ============================================================================
// EXPORTS
// ============================================================================

export default useGeneratedContent;
