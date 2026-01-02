# QUICK START GUIDE - Performance & SEO

## Immediate Usage Examples

### 1. Add SEO to Any Page (5 minutes)

```tsx
// pages/tours/[slug].tsx
import { SEOHead } from '@/components/seo/SEOHead';
import { generateTourSchema, generateBreadcrumbSchema } from '@/lib/seo/schema-generators';
import { generateTourBreadcrumbs } from '@/lib/seo/breadcrumbs';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export default function TourPage({ tour }) {
  // Generate schemas
  const tourSchema = generateTourSchema(tour, 'en');
  const breadcrumbs = generateTourBreadcrumbs(
    tour.city,
    tour.title,
    tour.slug,
    'en'
  );
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead
        title={`${tour.title} | ${tour.city} Tours`}
        description={tour.description.substring(0, 155)}
        keywords={[tour.city, 'tours', tour.category, 'turkey']}
        type="article"
        ogLocale="en"
        structuredData={[tourSchema, breadcrumbSchema]}
        publishedTime={tour.createdAt}
        modifiedTime={tour.updatedAt}
      />

      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={breadcrumbs} className="py-4" />

      {/* Your page content */}
      <h1>{tour.title}</h1>
      {/* ... */}
    </>
  );
}
```

### 2. Optimize Images (2 minutes)

```tsx
// Before (not optimized)
<img src="/tour-image.jpg" alt="Tour" />

// After (fully optimized)
import Image from 'next/image';
import { getCardImageProps, shimmerBlurDataURL } from '@/lib/performance/image-optimizer';

<Image
  {...getCardImageProps({
    src: '/tour-image.jpg',
    alt: 'Tour',
    width: 400,
    height: 300,
    blurDataURL: shimmerBlurDataURL(400, 300),
  })}
/>
```

### 3. Lazy Load Heavy Components (3 minutes)

```tsx
// Before (loads immediately, slows page)
import HeavyChart from './HeavyChart';

// After (loads when needed)
import { createClientOnlyImport, CardSkeleton } from '@/lib/performance/bundle-optimizer';

const HeavyChart = createClientOnlyImport(
  () => import('./HeavyChart'),
  { skeleton: CardSkeleton }
);

// Usage (same as before)
<HeavyChart data={chartData} />
```

### 4. Optimize Scroll Performance (1 minute)

```tsx
// In your header component
import { useScrollVisibility } from '@/lib/performance/scroll-optimizer';

export const Header = () => {
  const isVisible = useScrollVisibility(100); // Hide after 100px scroll down

  return (
    <header
      className={`
        fixed top-0 w-full z-50 transition-transform duration-300
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
      `}
    >
      {/* Header content */}
    </header>
  );
};
```

## Testing Commands

```bash
# Performance Testing
npm run build                          # Build for production
ANALYZE=true npm run build            # Analyze bundle size
npm run start                          # Start production server
# Then open Chrome DevTools > Lighthouse

# Check Sitemap
open http://localhost:3100/sitemap.xml

# Check Robots.txt
open http://localhost:3100/robots.txt
```

## Files Reference

**Performance:**
- `/src/lib/performance/scroll-optimizer.ts` - Scroll hooks
- `/src/lib/performance/image-optimizer.ts` - Image helpers
- `/src/lib/performance/bundle-optimizer.ts` - Bundle optimization

**SEO:**
- `/src/lib/seo/page-seo.ts` - Page metadata
- `/src/lib/seo/schema-generators.ts` - Structured data
- `/src/lib/seo/geo-seo.ts` - Geographic SEO
- `/src/lib/seo/breadcrumbs.ts` - Breadcrumb generation

**Components:**
- `/src/components/seo/SEOHead.tsx` - SEO component
- `/src/components/ui/Breadcrumbs.tsx` - Breadcrumb component

**Configuration:**
- `/public/robots.txt` - Search engine rules
- `/src/pages/sitemap.xml.tsx` - Dynamic sitemap

## Common Patterns

### Tour Detail Page
```tsx
SEOHead + tourSchema + breadcrumbs + optimized images
```

### Hotel Detail Page
```tsx
SEOHead + hotelSchema + breadcrumbs + lazy-loaded map
```

### Listing Page
```tsx
SEOHead + itemListSchema + breadcrumbs + lazy-loaded cards
```

### City Page (Geo SEO)
```tsx
getCityGeoSEO + SEOHead + breadcrumbs + local content
```

## Performance Checklist

- [ ] All images use Next.js Image component
- [ ] Heavy components are lazy-loaded
- [ ] Scroll uses passive listeners
- [ ] Meta tags on all pages
- [ ] Structured data on all pages
- [ ] Breadcrumbs on all pages
- [ ] Sitemap includes all pages
- [ ] Robots.txt is optimized

## SEO Checklist

- [ ] Title < 60 characters
- [ ] Description < 155 characters
- [ ] Keywords are relevant
- [ ] Canonical URL is set
- [ ] Hreflang tags for all languages
- [ ] Open Graph tags
- [ ] Twitter Card tags
- [ ] Schema.org structured data
- [ ] Breadcrumb navigation

## Need Help?

**Full Documentation:** `/PERFORMANCE-SEO-IMPLEMENTATION.md`
**Summary:** `/IMPLEMENTATION-SUMMARY.md`
**This Guide:** `/QUICK-START-GUIDE.md`

**Contact:** info@ailydian.com
