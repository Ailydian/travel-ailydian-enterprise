# AI Content Generation System - Complete Guide

## Overview

This comprehensive AI content generation system creates high-quality, SEO-optimized, unique content for all 1378 pages across 8 languages on the AILYDIAN Holiday platform.

## 📋 Table of Contents

1. [Features](#features)
2. [Architecture](#architecture)
3. [Quick Start](#quick-start)
4. [Configuration](#configuration)
5. [Usage Examples](#usage-examples)
6. [API Reference](#api-reference)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)

## ✨ Features

### Core Features

- **Multi-Provider Support**: OpenAI, Anthropic Claude, Google AI, Groq
- **Multi-Language**: 8 languages (TR, EN, DE, RU, AR, FA, FR, EL)
- **Content Types**: Tours, Hotels, Transfers, Car Rentals, Destinations
- **Smart Caching**: LRU cache with TTL for performance
- **Rate Limiting**: Automatic rate limiting per provider
- **Retry Logic**: Exponential backoff for failed requests
- **Quality Validation**: Automated quality metrics
- **SEO Optimization**: Meta tags, keywords, structured data
- **Batch Processing**: Concurrent processing with worker pools
- **Progress Tracking**: Real-time progress with resume capability

### Content Components

Each generated content includes:

- Title (SEO-optimized, 40-70 chars)
- Short Description (150-160 chars for meta)
- Long Description (400-1200 words)
- Highlights (6-10 unique selling points)
- What to Expect section
- Included/Not Included items
- Important Information
- Cancellation Policy
- FAQs (5-7 questions with detailed answers)
- Itinerary (for tours)
- Reviews (3 realistic reviews)
- SEO metadata (keywords, structured data)
- Quality metrics (readability, SEO score, engagement)

## 🏗 Architecture

```
src/lib/ai/
├── content-generator-advanced.ts  # Core content generator
├── translator.ts                   # Translation system
└── prompts/                        # AI prompts library

src/hooks/
└── useGeneratedContent.ts         # React hooks for content access

scripts/
└── generate-content-batch-advanced.ts  # Batch processor

generated-content/                  # Output directory
├── tour/
│   ├── tr/
│   ├── en/
│   └── ...
├── hotel/
├── transfer/
├── car-rental/
└── progress.json                   # Progress tracker
```

## 🚀 Quick Start

### 1. Installation

The system is already integrated. No additional packages needed.

### 2. Environment Setup

Add to `.env.local`:

```bash
# AI Providers (at least one required)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_AI_API_KEY=...
GROQ_API_KEY=gsk_...

# Configuration (optional)
AI_PROVIDER=openai              # openai | anthropic | google | groq
CONCURRENCY=10                  # Number of concurrent workers
BATCH_SIZE=50                   # Items per batch
```

### 3. Generate Content

#### Option A: Interactive CLI

```bash
npm run content:cli
```

This launches an interactive menu with options:
- Quick Test (10 products × 8 languages = 80 pages)
- Small Batch (50 products × 8 languages = 400 pages)
- Medium Batch (100 products × 8 languages = 800 pages)
- Full Generation (All products × 8 languages)
- Custom Range
- View Progress
- View Generated Content

#### Option B: Programmatic

```bash
# Test with 10 items
npm run content:generate:test

# Full generation
npm run content:generate:full

# Custom configuration
BATCH_SIZE=100 CONCURRENCY=15 AI_PROVIDER=openai npm run content:generate
```

#### Option C: Direct Script

```bash
ts-node scripts/generate-content-batch-advanced.ts
```

## ⚙️ Configuration

### Generator Configuration

```typescript
import { createContentGenerator } from '@/lib/ai/content-generator-advanced';

const generator = createContentGenerator({
  provider: 'openai',          // AI provider
  apiKey: process.env.OPENAI_API_KEY!,
  model: 'gpt-4-turbo-preview', // Model to use
  temperature: 0.7,             // Creativity (0-1)
  maxTokens: 3000,              // Max response length
  retryAttempts: 3,             // Retry failed requests
  retryDelay: 2000,             // Delay between retries (ms)
  cacheEnabled: true,           // Enable caching
  cacheTTL: 86400000,           // Cache TTL (24 hours)
  rateLimitPerMinute: 60,       // Rate limit
});
```

### Translator Configuration

```typescript
import { createTranslator } from '@/lib/ai/translator';

const translator = createTranslator({
  provider: 'openai',
  apiKey: process.env.OPENAI_API_KEY!,
  quality: 'high',              // fast | balanced | high
  cacheEnabled: true,
  preserveFormatting: true,
  terminology: new Map([
    ['AILYDIAN', new Map([
      ['tr', 'AILYDIAN'],
      ['en', 'AILYDIAN'],
      // ... other languages
    ])]
  ])
});
```

## 📚 Usage Examples

### Example 1: Generate Tour Content

```typescript
import { createContentGenerator } from '@/lib/ai/content-generator-advanced';

const generator = createContentGenerator({
  provider: 'openai',
  apiKey: process.env.OPENAI_API_KEY!,
});

const content = await generator.generateTourContent({
  type: 'tour',
  name: 'Pamukkale Day Trip',
  location: 'Antalya',
  category: 'cultural',
  locale: 'en',
  tone: 'professional',
  targetLength: 'medium',
});

console.log(content.title);
console.log(content.description);
console.log(content.highlights);
```

### Example 2: Batch Generate Content

```typescript
const items = [
  { type: 'tour', name: 'Pamukkale Tour', location: 'Antalya' },
  { type: 'tour', name: 'Cappadocia Tour', location: 'Antalya' },
  { type: 'hotel', name: 'Luxury Resort', location: 'Antalya' },
];

const results = await generator.batchGenerate(
  items.map(item => ({ ...item, locale: 'en' })),
  10 // concurrency
);

results.forEach((content, key) => {
  console.log(`Generated: ${key}`);
});
```

### Example 3: Use Generated Content in Component

```tsx
import { useGeneratedContent } from '@/hooks/useGeneratedContent';

function TourPage({ tourId }: { tourId: string }) {
  const { content, isLoading, error } = useGeneratedContent(tourId, 'tour');

  if (isLoading) return <Spinner />;
  if (error) return <Error message={error.message} />;
  if (!content) return <NotFound />;

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>

      <section>
        <h2>Highlights</h2>
        <ul>
          {content.highlights.map((highlight, i) => (
            <li key={i}>{highlight}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>What to Expect</h2>
        <p>{content.whatToExpect}</p>
      </section>

      <section>
        <h2>Itinerary</h2>
        {content.itinerary?.map((item, i) => (
          <div key={i}>
            <strong>{item.time}</strong>: {item.title}
            <p>{item.description}</p>
          </div>
        ))}
      </section>

      <section>
        <h2>FAQs</h2>
        {content.faqs.map((faq, i) => (
          <details key={i}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </section>

      <section>
        <h2>Reviews</h2>
        {content.reviews?.map((review, i) => (
          <div key={i}>
            <strong>{review.author}</strong> - {review.rating}/5
            <p>{review.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
```

### Example 4: SEO Integration

```tsx
import { useContentSEO } from '@/hooks/useGeneratedContent';
import Head from 'next/head';

function TourPage({ tourId }: { tourId: string }) {
  const seo = useContentSEO(tourId, 'tour');

  if (!seo) return null;

  return (
    <>
      <Head>
        <title>{seo.metaTitle}</title>
        <meta name="description" content={seo.metaDescription} />
        <meta name="keywords" content={seo.keywords.join(', ')} />
        <link rel="canonical" href={seo.canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={seo.metaTitle} />
        <meta property="og:description" content={seo.metaDescription} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seo.structuredData),
          }}
        />
      </Head>

      {/* Page content */}
    </>
  );
}
```

### Example 5: Translation

```typescript
import { createTranslator } from '@/lib/ai/translator';

const translator = createTranslator({
  provider: 'openai',
  apiKey: process.env.OPENAI_API_KEY!,
  quality: 'high',
});

// Single translation
const result = await translator.translate(
  'Welcome to Turkey',
  'en',
  'tr',
  { tone: 'professional' }
);
console.log(result.text); // "Türkiye'ye Hoş Geldiniz"

// Batch translation
const texts = [
  'Beautiful beaches',
  'Ancient ruins',
  'Delicious cuisine',
];

const batchResult = await translator.batchTranslate(texts, 'en', 'tr');
batchResult.results.forEach(r => console.log(r.text));
```

## 📖 API Reference

### AdvancedContentGenerator

#### Methods

##### `generateTourContent(config: ContentConfig): Promise<GeneratedContent>`

Generate comprehensive content for a single item.

**Parameters:**
- `config.type`: Content type ('tour' | 'hotel' | 'transfer' | etc.)
- `config.name`: Product name
- `config.location`: Location (e.g., 'Antalya')
- `config.locale`: Language code
- `config.category`: Optional category
- `config.tone`: Optional tone ('casual' | 'professional' | 'luxury')
- `config.targetLength`: Optional length ('short' | 'medium' | 'long')

**Returns:** `GeneratedContent` object

##### `batchGenerate(items: ContentConfig[], concurrency: number): Promise<Map<string, GeneratedContent>>`

Generate content for multiple items with concurrent processing.

**Parameters:**
- `items`: Array of content configurations
- `concurrency`: Number of concurrent workers (default: 5)

**Returns:** Map of item keys to generated content

### AdvancedTranslator

#### Methods

##### `translate(text: string, from: Language, to: Language, options?: TranslationOptions): Promise<TranslationResult>`

Translate a single text.

##### `batchTranslate(texts: string[], from: Language, to: Language): Promise<BatchTranslationResult>`

Translate multiple texts.

##### `translateObject<T>(obj: T, from: Language, to: Language, fields: string[]): Promise<T>`

Translate specific fields in an object.

### React Hooks

#### `useGeneratedContent(itemId: string, type: ContentType, options?): ContentHookReturn`

Access generated content with caching.

#### `useContentSEO(itemId: string, type: ContentType): SEOMetadata | null`

Get SEO metadata for a content item.

#### `useContentReviews(itemId: string, type: ContentType): Review[]`

Get reviews for a content item.

#### `useContentFAQs(itemId: string, type: ContentType): FAQ[]`

Get FAQs for a content item.

## 🎯 Best Practices

### 1. Content Generation

- **Start Small**: Test with 10-50 items before full generation
- **Monitor Progress**: Use the CLI to track progress regularly
- **Check Quality**: Review quality metrics in generated content
- **Validate Output**: Spot-check generated content for accuracy
- **Use Caching**: Enable caching to avoid redundant API calls

### 2. Performance Optimization

- **Concurrency**: Start with 5-10 concurrent workers, adjust based on rate limits
- **Batch Size**: Use 50-100 items per batch for optimal performance
- **Provider Selection**:
  - OpenAI: Best quality, moderate speed
  - Anthropic: High quality, good speed
  - Google: Fast, good for high volume
  - Groq: Very fast, good for testing

### 3. Cost Optimization

- **Cache Everything**: Enable caching to reduce API calls
- **Resume Failed Jobs**: Use progress tracking to resume interrupted jobs
- **Choose Right Model**: Use GPT-3.5 for testing, GPT-4 for production
- **Batch API Calls**: Always use batch operations when possible

### 4. Quality Assurance

- **Review Metrics**: Check quality scores (aim for >80)
- **Readability**: Ensure readability score is appropriate for target audience
- **SEO Score**: Verify SEO score is >80 for all pages
- **Manual Review**: Randomly sample 5-10% of generated content

## 🔧 Troubleshooting

### Common Issues

#### 1. API Rate Limit Errors

**Problem**: Too many requests per minute

**Solution**:
```bash
# Reduce concurrency
CONCURRENCY=5 npm run content:generate

# Or increase rate limit in code
rateLimitPerMinute: 30
```

#### 2. Out of Memory

**Problem**: Node.js runs out of memory during large batches

**Solution**:
```bash
# Increase Node.js memory
NODE_OPTIONS="--max-old-space-size=4096" npm run content:generate

# Or reduce batch size
BATCH_SIZE=25 npm run content:generate
```

#### 3. Content Quality Issues

**Problem**: Generated content is too generic

**Solution**:
```typescript
// Increase temperature for more creativity
temperature: 0.8

// Or provide more context
const content = await generator.generateTourContent({
  ...config,
  existingData: { description: 'Detailed description...' }
});
```

#### 4. Translation Errors

**Problem**: Translations are not accurate

**Solution**:
```typescript
// Use higher quality setting
quality: 'high'

// Add terminology
translator.addTerminology('AILYDIAN', {
  tr: 'AILYDIAN',
  en: 'AILYDIAN',
  // ...
});

// Provide context
await translator.translate(text, from, to, {
  context: 'Tourism booking platform',
  tone: 'professional'
});
```

#### 5. Cache Issues

**Problem**: Stale cached content

**Solution**:
```typescript
// Clear cache
generator.cache.clear();

// Or disable cache temporarily
cacheEnabled: false
```

## 📊 Performance Metrics

### Expected Performance

| Metric | Value |
|--------|-------|
| Generation Time (per page) | 5-15 seconds |
| Total Time (1378 pages × 8 languages) | ~20-40 hours |
| API Cost (OpenAI GPT-4) | ~$500-800 |
| API Cost (OpenAI GPT-3.5) | ~$50-100 |
| Cache Hit Rate | 70-90% (after initial run) |
| Quality Score | 85-95% |

### Optimization Tips

1. **Use GPT-3.5 for initial generation**, then GPT-4 for refinement
2. **Generate during off-peak hours** to avoid rate limits
3. **Enable caching** to reduce costs by 70-90%
4. **Process in batches of 100** for optimal performance
5. **Use multiple API keys** for parallel processing

## 🔐 Security

### API Key Management

- Never commit API keys to version control
- Use `.env.local` for local development
- Use environment variables in production
- Rotate keys regularly
- Monitor API usage for anomalies

### Content Validation

- Sanitize generated content before display
- Validate HTML to prevent XSS
- Check for inappropriate content
- Implement content moderation if needed

## 📈 Monitoring

### Track These Metrics

1. **Generation Success Rate**: Should be >95%
2. **Average Quality Score**: Should be >85
3. **Cache Hit Rate**: Should be >70%
4. **API Cost per Page**: Track and optimize
5. **Generation Time**: Monitor for performance issues

### Logging

```typescript
// Enable detailed logging
console.log(`Generated: ${content.title}`);
console.log(`Quality Score: ${content.quality.score}`);
console.log(`SEO Score: ${content.quality.metrics.seoScore}`);
console.log(`Readability: ${content.quality.metrics.readability}`);
```

## 🚢 Deployment

### Pre-Deployment Checklist

- [ ] Generate all content locally
- [ ] Validate quality scores
- [ ] Check SEO metadata
- [ ] Test content display
- [ ] Verify translations
- [ ] Test caching
- [ ] Commit generated content to repository
- [ ] Deploy to production

### Production Considerations

- Store generated content in repository
- Use CDN for content delivery
- Implement incremental regeneration
- Schedule weekly content updates
- Monitor content freshness

## 📞 Support

For issues or questions:

1. Check this documentation
2. Review error logs
3. Check GitHub issues
4. Contact development team

## 🎉 Success Metrics

After successful generation:

- ✅ 1378 pages × 8 languages = 11,024 pages generated
- ✅ Average quality score >85
- ✅ SEO scores >80
- ✅ All content unique and engaging
- ✅ Translations accurate and natural
- ✅ Cache hit rate >70%
- ✅ Zero manual content needed

---

**Version**: 2.0.0
**Last Updated**: 2026-01-02
**Author**: AILYDIAN Development Team
