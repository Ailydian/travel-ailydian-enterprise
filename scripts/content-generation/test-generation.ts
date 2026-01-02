#!/usr/bin/env ts-node
/**
 * Test Content Generation
 * Quick test with 1 product to verify everything works
 */

import { ContentGenerator } from './content-generator';
import { SEOOptimizer } from './seo-optimizer';
import { I18nGenerator } from './i18n-generator';
import { BaseProduct, Language } from './types';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const testProduct: BaseProduct = {
  id: 'test-tour-001',
  slug: 'antalya-boat-tour-test',
  category: 'tour',
  region: 'Antalya',
  name: 'Antalya Tekne Turu - Test',
  description: 'Akdeniz\'in turkuaz sularında eşsiz bir gün',
  price: 980,
  images: [
    'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1200&q=80'
  ],
  rating: 4.9,
  reviewCount: 487
};

async function main() {
  console.log('\n🧪 TESTING CONTENT GENERATION\n');
  console.log('='.repeat(60) + '\n');

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('❌ ERROR: OPENAI_API_KEY not found');
    process.exit(1);
  }

  const generator = new ContentGenerator({ apiKey });

  // Test one language first
  const locale: Language = 'tr';

  try {
    console.log(`📝 Generating content for: ${testProduct.name}`);
    console.log(`🌍 Language: ${locale}`);
    console.log(`⏳ Processing...\n`);

    const startTime = Date.now();

    // Generate content
    const content = await generator.generateProductContent(testProduct, locale);

    const duration = Date.now() - startTime;

    console.log('✅ Content Generated Successfully!\n');
    console.log('='.repeat(60));
    console.log('\n📄 GENERATED CONTENT:\n');

    console.log(`Title: ${content.title}`);
    console.log(`\nDescription (${content.description.length} chars):`);
    console.log(content.description);
    console.log(`\nLong Description (${content.longDescription.length} chars):`);
    console.log(content.longDescription.substring(0, 200) + '...');

    console.log(`\n🎯 Highlights (${content.highlights.length}):`);
    content.highlights.forEach((h, i) => console.log(`   ${i + 1}. ${h}`));

    if (content.included && content.included.length > 0) {
      console.log(`\n✅ Included (${content.included.length}):`);
      content.included.forEach((item, i) => console.log(`   ${i + 1}. ${item}`));
    }

    if (content.excluded && content.excluded.length > 0) {
      console.log(`\n❌ Excluded (${content.excluded.length}):`);
      content.excluded.forEach((item, i) => console.log(`   ${i + 1}. ${item}`));
    }

    if (content.itinerary && content.itinerary.length > 0) {
      console.log(`\n📅 Itinerary (${content.itinerary.length} items):`);
      content.itinerary.forEach((item, i) => {
        console.log(`   ${item.time || ''} - ${item.title}`);
      });
    }

    if (content.reviews && content.reviews.length > 0) {
      console.log(`\n⭐ Reviews (${content.reviews.length}):`);
      content.reviews.forEach((review, i) => {
        console.log(`   ${i + 1}. ${review.author} - ${review.rating}/5 stars`);
        console.log(`      "${review.title}"`);
      });
    }

    console.log(`\n🔍 SEO Metadata:`);
    console.log(`   Meta Title: ${content.seo.metaTitle}`);
    console.log(`   Meta Description: ${content.seo.metaDescription}`);
    console.log(`   Keywords (${content.seo.keywords.length}): ${content.seo.keywords.join(', ')}`);
    console.log(`   Canonical URL: ${content.seo.canonicalUrl}`);

    console.log(`\n⏱️  Generation Time: ${duration}ms`);
    console.log('\n' + '='.repeat(60));

    // Test SEO generation
    console.log('\n🔍 Testing SEO Generation...\n');

    const seoOptimizer = new SEOOptimizer();
    const jsonld = seoOptimizer.generateJSONLD(content);

    console.log('✅ JSON-LD Schema Generated:');
    console.log(JSON.stringify(JSON.parse(jsonld)[0], null, 2).substring(0, 500) + '...\n');

    // Test i18n generation
    console.log('🌐 Testing i18n Generation...\n');

    const i18nGenerator = new I18nGenerator(process.cwd());
    const translations = await i18nGenerator['buildTranslationObject']([content]);

    console.log('✅ i18n Translations Generated:');
    console.log(JSON.stringify(translations, null, 2).substring(0, 300) + '...\n');

    console.log('\n🎉 ALL TESTS PASSED!\n');
    console.log('✅ Content generation working correctly');
    console.log('✅ SEO optimization working correctly');
    console.log('✅ i18n integration working correctly');
    console.log('\n💡 Ready to run full batch generation!\n');

  } catch (error) {
    console.error('\n❌ TEST FAILED:', error);
    if (error instanceof Error) {
      console.error('\nError Message:', error.message);
      console.error('\nStack Trace:', error.stack);
    }
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
