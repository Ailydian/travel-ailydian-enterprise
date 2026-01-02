# Quick Start - AI Content Generation

## 5-Minute Setup

### Step 1: Add API Key

```bash
# Edit .env.local
echo "OPENAI_API_KEY=sk-your-key-here" >> .env.local
```

### Step 2: Test Generation

```bash
# Test with 10 items (80 pages)
npm run content:generate:test
```

### Step 3: Review Output

```bash
# Check generated content
ls -la generated-content/
```

## Common Commands

```bash
# Interactive CLI
npm run content:cli

# Small batch (400 pages)
BATCH_SIZE=50 npm run content:generate

# Full generation (11,024 pages)
npm run content:generate:full

# Custom configuration
BATCH_SIZE=100 CONCURRENCY=15 AI_PROVIDER=openai npm run content:generate
```

## Using Generated Content

### In React Component

```tsx
import { useGeneratedContent } from '@/hooks/useGeneratedContent';

function TourPage({ tourId }: { tourId: string }) {
  const { content } = useGeneratedContent(tourId, 'tour');

  return (
    <div>
      <h1>{content?.title}</h1>
      <p>{content?.description}</p>
      <ul>
        {content?.highlights.map((h, i) => (
          <li key={i}>{h}</li>
        ))}
      </ul>
    </div>
  );
}
```

### SEO Integration

```tsx
import { useContentSEO } from '@/hooks/useGeneratedContent';
import Head from 'next/head';

function Page({ tourId }: { tourId: string }) {
  const seo = useContentSEO(tourId, 'tour');

  return (
    <Head>
      <title>{seo?.metaTitle}</title>
      <meta name="description" content={seo?.metaDescription} />
    </Head>
  );
}
```

## Providers

| Provider | Speed | Quality | Cost | Rate Limit |
|----------|-------|---------|------|------------|
| OpenAI GPT-4 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | $$$ | 60/min |
| OpenAI GPT-3.5 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | $ | 60/min |
| Anthropic Claude | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | $$$ | 50/min |
| Google Gemini | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | $$ | 60/min |
| Groq | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | $$ | 30/min |

## Estimated Costs

| Task | OpenAI GPT-4 | OpenAI GPT-3.5 | Anthropic |
|------|--------------|----------------|-----------|
| Test (80 pages) | ~$5 | ~$0.50 | ~$6 |
| Small (400 pages) | ~$25 | ~$2.50 | ~$30 |
| Full (11,024 pages) | ~$700 | ~$70 | ~$800 |

## Performance

- **Single Page**: 5-15 seconds
- **Batch (100 pages)**: ~10-20 minutes
- **Full Generation**: ~20-40 hours
- **Cache Hit Rate**: 70-90% (second run)

## Troubleshooting

### Rate Limit Error

```bash
# Reduce concurrency
CONCURRENCY=5 npm run content:generate
```

### Out of Memory

```bash
# Increase Node.js memory
NODE_OPTIONS="--max-old-space-size=4096" npm run content:generate
```

### Poor Quality

```typescript
// Increase temperature or use GPT-4
temperature: 0.8
model: 'gpt-4-turbo-preview'
```

## Next Steps

1. ✅ Test with 10 items
2. ✅ Review quality
3. ✅ Adjust configuration
4. ✅ Generate small batch (50-100 items)
5. ✅ Validate output
6. ✅ Run full generation
7. ✅ Deploy to production

## Support

- 📖 [Full Documentation](./AI_CONTENT_GENERATION_GUIDE.md)
- 🐛 Report issues on GitHub
- 💬 Contact development team

---

**Happy Generating! 🚀**
