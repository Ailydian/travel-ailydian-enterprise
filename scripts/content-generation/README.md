# AILYDIAN Content Generation System

## Overview

Enterprise-grade AI-powered content generation for 1378+ pages across 8 languages.

## Architecture

```
scripts/content-generation/
├── types.ts              # TypeScript types & interfaces
├── content-generator.ts  # AI content generation (OpenAI GPT-4)
├── batch-processor.ts    # Parallel processing with rate limiting
├── seo-optimizer.ts      # SEO metadata, sitemaps, structured data
├── i18n-generator.ts     # i18n translation files
├── run-batch.ts          # Main execution script
├── package.json          # Dependencies
└── README.md             # This file
```

## Features

### 1. AI Content Generation
- **GPT-4 Powered**: Natural, engaging content in 8 languages
- **SEO Optimized**: Meta titles, descriptions, keywords
- **Category Specific**: Tailored prompts for tours, hotels, cars, etc.
- **Structured Data**: Schema.org JSON-LD for rich snippets

### 2. Multilingual Support
- **8 Languages**: TR, EN, DE, RU, AR, FA, FR, EL
- **Hreflang Tags**: Proper multilingual SEO
- **i18n Integration**: next-i18next translation files
- **RTL Support**: Arabic, Persian, Hebrew

### 3. SEO Optimization
- **Sitemap Generation**: Main + category-specific sitemaps
- **Structured Data**: Product, Review, FAQ, Breadcrumb schemas
- **Open Graph**: Social media optimization
- **Robots.txt**: Proper crawling directives

### 4. Batch Processing
- **Parallel Execution**: 10+ concurrent workers
- **Rate Limiting**: Respect API limits
- **Retry Logic**: Automatic retry on failures
- **Progress Tracking**: Resume from where it stopped
- **Error Handling**: Comprehensive logging

## Usage

### Prerequisites

1. **OpenAI API Key**
   ```bash
   # Add to .env.local
   OPENAI_API_KEY=sk-...
   ```

2. **Install Dependencies**
   ```bash
   cd scripts/content-generation
   npm install
   ```

### Commands

#### Test Run (10 products)
```bash
npm run generate:test
```

#### Production Run (100 products)
```bash
npm run generate
```

#### Full Run (All products)
```bash
npm run generate:full
```

### Custom Configuration
```bash
# Environment variables
BATCH_SIZE=100          # Number of products to process
CONCURRENCY=10          # Parallel workers
OPENAI_API_KEY=sk-...   # OpenAI API key
```

## Output

### Generated Content Structure
```
generated-content/
├── tour/
│   ├── antalya-boat-tour-001-tr.json
│   ├── antalya-boat-tour-001-en.json
│   ├── antalya-boat-tour-001-de.json
│   └── ...
├── car/
│   ├── antalya-car-rental-001-tr.json
│   └── ...
├── seo/
│   ├── sitemap.xml
│   ├── sitemap-tours.xml
│   ├── sitemap-hotels.xml
│   └── robots.txt
└── progress.json
```

### Content JSON Schema
```json
{
  "productId": "tour-001",
  "locale": "tr",
  "title": "Antalya Tekne Turu - 3 Adalar",
  "description": "Meta description (150-160 chars)",
  "longDescription": "Full product description (300-500 words)",
  "highlights": ["Highlight 1", "Highlight 2", ...],
  "included": ["Item 1", "Item 2", ...],
  "excluded": ["Item 1", "Item 2", ...],
  "itinerary": [
    {
      "time": "09:00",
      "title": "Başlangıç",
      "description": "Activity description"
    }
  ],
  "reviews": [
    {
      "id": "review-1",
      "author": "Mehmet Y.",
      "rating": 5,
      "date": "2024-12-15",
      "title": "Mükemmel deneyim!",
      "text": "Review text...",
      "helpful": 127,
      "verified": true
    }
  ],
  "seo": {
    "metaTitle": "Page title | AILYDIAN Holiday",
    "metaDescription": "Meta description",
    "keywords": ["keyword1", "keyword2", ...],
    "canonicalUrl": "https://holiday.ailydian.com/tr/tours/...",
    "structuredData": { ... }
  }
}
```

## Integration with Next.js

### 1. Use Generated Content in Pages

```typescript
// pages/tours/[slug].tsx
import { GetStaticProps } from 'next';
import fs from 'fs/promises';
import path from 'path';

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = params?.slug as string;

  // Load generated content
  const contentPath = path.join(
    process.cwd(),
    'generated-content',
    'tour',
    `${slug}-${locale}.json`
  );

  const content = JSON.parse(await fs.readFile(contentPath, 'utf-8'));

  return {
    props: {
      content,
      ...(await serverSideTranslations(locale ?? 'tr', ['common']))
    },
    revalidate: 3600 // ISR: 1 hour
  };
};
```

### 2. Copy Sitemaps to Public

```bash
# Copy generated sitemaps
cp generated-content/seo/*.xml public/
cp generated-content/seo/robots.txt public/
```

### 3. Use i18n Translations

Generated translations are automatically compatible with next-i18next.

## Performance

### Estimated Processing Time

| Products | Languages | Total Pages | Time (10 workers) |
|----------|-----------|-------------|-------------------|
| 10       | 8         | 80          | ~5 min            |
| 100      | 8         | 800         | ~45 min           |
| 200      | 8         | 1600        | ~90 min           |

### Cost Estimation (OpenAI GPT-4)

- **Per Page**: ~$0.02 (2 cents)
- **100 Products x 8 Languages**: ~$16
- **200 Products x 8 Languages**: ~$32

## Quality Assurance

### Automated Checks
- ✅ Content length validation
- ✅ SEO metadata completeness
- ✅ Translation consistency
- ✅ Schema.org validation
- ✅ Image URL validation

### Manual Review
- Sample 10% of generated content
- Verify translation quality
- Check for cultural appropriateness
- Test SEO metadata

## Troubleshooting

### Rate Limit Errors
```bash
# Reduce concurrency
CONCURRENCY=5 npm run generate
```

### Out of Memory
```bash
# Reduce batch size
BATCH_SIZE=50 npm run generate
```

### Resume After Failure
```bash
# Progress is auto-saved, just re-run
npm run generate
```

## Roadmap

- [ ] Add image optimization
- [ ] Add A/B testing for content variants
- [ ] Add automated translation quality checks
- [ ] Add content versioning
- [ ] Add real-time content updates

## Support

For issues or questions:
- Email: dev@ailydian.com
- GitHub: https://github.com/ailydian/holiday.ailydian.com
