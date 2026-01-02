# AILYDIAN Content Generation - Complete Guide

## Overview

Enterprise-grade AI content generation system for **1378+ pages** across **8 languages**.

### What This Does

- ✅ Generates SEO-optimized content for all products (tours, hotels, car rentals, transfers, rentals)
- ✅ Creates unique content in 8 languages: TR, EN, DE, RU, AR, FA, FR, EL
- ✅ Produces structured data (Schema.org JSON-LD)
- ✅ Generates sitemaps, robots.txt, hreflang tags
- ✅ Creates i18n translation files for next-i18next
- ✅ Generates realistic customer reviews
- ✅ Parallel processing with rate limiting
- ✅ Progress tracking and resume capability

## Quick Start

### 1. Prerequisites

```bash
# Ensure OpenAI API key is in .env.local
OPENAI_API_KEY=sk-proj-...
```

### 2. Test First (Recommended)

```bash
# Test with 1 product to verify setup
npm run content:test
```

### 3. Interactive CLI (Recommended for First-Time)

```bash
# Launch interactive CLI
npm run content:cli
```

The CLI provides:
- 📊 Product inventory overview
- 🎯 Multiple batch size options
- 📈 Real-time progress monitoring
- 📂 Content browsing

### 4. Quick Batch Generation

```bash
# Test batch: 10 products x 8 languages = 80 pages (~5 min)
npm run content:generate:test

# Full batch: 100 products x 8 languages = 800 pages (~45 min)
npm run content:generate

# All products: ~200 products x 8 languages = 1600 pages (~90 min)
npm run content:generate:full
```

## File Structure

```
scripts/content-generation/
├── types.ts              # TypeScript interfaces
├── content-generator.ts  # AI content generation engine
├── batch-processor.ts    # Parallel processing orchestrator
├── seo-optimizer.ts      # SEO metadata generator
├── i18n-generator.ts     # Translation file generator
├── run-batch.ts          # Batch processing script
├── cli.ts                # Interactive CLI
├── test-generation.ts    # Single-product test
├── package.json          # Dependencies
└── README.md             # Detailed documentation

generated-content/        # Output directory
├── tour/                 # Tour content by product
│   ├── antalya-boat-tour-001-tr.json
│   ├── antalya-boat-tour-001-en.json
│   └── ...
├── car/                  # Car rental content
├── transfer/             # Transfer content
├── rental/               # Rental content
├── seo/                  # SEO files
│   ├── sitemap.xml
│   ├── sitemap-tours.xml
│   ├── sitemap-hotels.xml
│   ├── sitemap-car-rentals.xml
│   ├── sitemap-transfers.xml
│   └── robots.txt
└── progress.json         # Processing progress tracker
```

## Generated Content Format

Each product gets a JSON file per language:

```json
{
  "productId": "tour-antalya-boat-001",
  "locale": "tr",
  "title": "Antalya Tekne Turu - 3 Adalar | En İyi Fiyat",
  "description": "Akdeniz'in turkuaz sularında eşsiz tekne turu. Snorkeling, öğle yemeği dahil.",
  "longDescription": "500+ word detailed description...",
  "highlights": [
    "Phaselis antik kenti kıyıları",
    "3 farklı adada yüzme molası",
    "Snorkeling ekipmanı dahil",
    "Açık büfe öğle yemeği"
  ],
  "included": [
    "Otel transferi",
    "Öğle yemeği",
    "Snorkeling ekipmanı",
    "Profesyonel rehber"
  ],
  "excluded": [
    "Alkollü içecekler",
    "Fotoğraf hizmetleri"
  ],
  "itinerary": [
    {
      "time": "09:00",
      "title": "Başlangıç",
      "description": "Otel transferi ile başlama"
    }
  ],
  "reviews": [
    {
      "id": "review-1",
      "author": "Mehmet Yılmaz",
      "rating": 5,
      "title": "Mükemmel deneyim!",
      "text": "Detailed review...",
      "verified": true
    }
  ],
  "seo": {
    "metaTitle": "Antalya Tekne Turu 3 Adalar | AILYDIAN Holiday",
    "metaDescription": "160-char meta description",
    "keywords": ["antalya tekne turu", "3 adalar", ...],
    "canonicalUrl": "https://holiday.ailydian.com/tr/tours/antalya-boat-tour-001",
    "structuredData": { /* Schema.org JSON-LD */ }
  }
}
```

## Integration with Next.js

### 1. Use Generated Content in Pages

**Example: `/pages/tours/[slug].tsx`**

```typescript
import { GetStaticProps, GetStaticPaths } from 'next';
import fs from 'fs/promises';
import path from 'path';

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  // Get all generated tour content files
  const contentDir = path.join(process.cwd(), 'generated-content', 'tour');
  const files = await fs.readdir(contentDir);

  // Extract unique slugs
  const slugs = [...new Set(
    files
      .filter(f => f.endsWith('-tr.json'))
      .map(f => f.replace('-tr.json', ''))
  )];

  // Generate paths for all locales
  const paths = slugs.flatMap(slug =>
    locales!.map(locale => ({
      params: { slug },
      locale
    }))
  );

  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const { slug } = params!;

  // Load generated content
  const contentPath = path.join(
    process.cwd(),
    'generated-content',
    'tour',
    `${slug}-${locale}.json`
  );

  try {
    const content = JSON.parse(await fs.readFile(contentPath, 'utf-8'));

    return {
      props: {
        content,
        ...(await serverSideTranslations(locale!, ['common']))
      },
      revalidate: 3600 // ISR: 1 hour
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default function TourPage({ content }) {
  return (
    <>
      <Head>
        <title>{content.seo.metaTitle}</title>
        <meta name="description" content={content.seo.metaDescription} />
        <meta name="keywords" content={content.seo.keywords.join(', ')} />
        <link rel="canonical" href={content.seo.canonicalUrl} />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(content.seo.structuredData)
          }}
        />
      </Head>

      <main>
        <h1>{content.title}</h1>
        <p>{content.description}</p>

        {/* Highlights */}
        <ul>
          {content.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>

        {/* Reviews */}
        {content.reviews.map(review => (
          <div key={review.id}>
            <h3>{review.author} - {review.rating}/5</h3>
            <p>{review.text}</p>
          </div>
        ))}
      </main>
    </>
  );
}
```

### 2. Deploy SEO Files

```bash
# Copy sitemaps to public/
cp generated-content/seo/*.xml public/
cp generated-content/seo/robots.txt public/
```

### 3. Update next-sitemap.config.js

```javascript
module.exports = {
  siteUrl: 'https://holiday.ailydian.com',
  generateRobotsTxt: false, // Use generated robots.txt
  exclude: ['/admin/*', '/api/*'],
  additionalPaths: async (config) => {
    // Load category sitemaps
    return [
      { loc: '/sitemap-tours.xml' },
      { loc: '/sitemap-hotels.xml' },
      { loc: '/sitemap-car-rentals.xml' },
      { loc: '/sitemap-transfers.xml' },
      { loc: '/sitemap-rentals.xml' }
    ];
  }
};
```

## Performance & Cost

### Processing Time

| Products | Languages | Total Pages | Workers | Time      |
|----------|-----------|-------------|---------|-----------|
| 10       | 8         | 80          | 5       | ~5 min    |
| 50       | 8         | 400         | 10      | ~20 min   |
| 100      | 8         | 800         | 15      | ~45 min   |
| 200      | 8         | 1600        | 20      | ~90 min   |

### OpenAI API Cost (GPT-4)

- **Per Page**: ~$0.02 USD
- **80 pages** (test): ~$1.60
- **800 pages**: ~$16
- **1600 pages**: ~$32

*Estimated costs may vary based on content complexity*

## Advanced Features

### Custom Language Selection

```bash
# Edit run-batch.ts to customize languages
const LANGUAGES: Language[] = ['tr', 'en', 'de']; // Only 3 languages
```

### Category Filtering

```typescript
// Generate only tours
const productsToProcess = allProducts.filter(p => p.category === 'tour');
```

### Priority-Based Processing

Products are automatically prioritized:
- **High**: Rating >= 4.7, Tours, Hotels
- **Medium**: Rating >= 4.3
- **Low**: Others

### Resume After Failure

```bash
# Progress is auto-saved every 10 products
# Just re-run the script to resume
npm run content:generate
```

## Quality Assurance

### Automated Checks

- ✅ Content length validation (150-160 chars for meta)
- ✅ SEO metadata completeness
- ✅ Schema.org validation
- ✅ Image URL validation
- ✅ Translation consistency

### Manual Review Checklist

1. **Sample 10% of generated content**
2. **Verify translation quality** (especially for non-Latin scripts)
3. **Check cultural appropriateness**
4. **Test SEO metadata** in Google Search Console
5. **Validate structured data** with Google Rich Results Test

## Troubleshooting

### "OPENAI_API_KEY not found"

```bash
# Add to .env.local
echo "OPENAI_API_KEY=sk-proj-YOUR_KEY_HERE" >> .env.local
```

### Rate Limit Errors

```bash
# Reduce concurrency
CONCURRENCY=5 npm run content:generate
```

### Out of Memory

```bash
# Reduce batch size
BATCH_SIZE=50 npm run content:generate
```

### "Module not found"

```bash
# Install dependencies
cd scripts/content-generation
npm install
```

## Deployment Checklist

- [ ] Generate content for all products
- [ ] Copy sitemaps to `public/`
- [ ] Update `next.config.js` with i18n locales
- [ ] Test on staging environment
- [ ] Validate SEO with Google Search Console
- [ ] Monitor performance with Lighthouse
- [ ] Set up monitoring for 404s

## Next Steps

1. **Run Test Generation**
   ```bash
   npm run content:test
   ```

2. **Review Test Output**
   - Check generated content quality
   - Verify SEO metadata
   - Review translations

3. **Generate First Batch**
   ```bash
   npm run content:cli
   # Select option 1: Quick Test
   ```

4. **Integrate with Pages**
   - Update `pages/tours/[slug].tsx`
   - Update other dynamic pages

5. **Deploy SEO Files**
   ```bash
   cp generated-content/seo/*.xml public/
   ```

6. **Full Generation**
   ```bash
   npm run content:generate:full
   ```

## Support

- 📧 Email: dev@ailydian.com
- 📚 Documentation: `/scripts/content-generation/README.md`
- 🐛 Issues: GitHub Issues

---

**Made with ❤️ by AILYDIAN Engineering Team**
