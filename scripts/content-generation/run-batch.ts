#!/usr/bin/env ts-node
/**
 * Run Batch Content Generation
 *
 * Usage:
 *   npx ts-node scripts/content-generation/run-batch.ts
 *
 * Environment variables:
 *   OPENAI_API_KEY - OpenAI API key
 *   BATCH_SIZE - Number of products to process (default: 100)
 *   CONCURRENCY - Parallel workers (default: 10)
 */

import { BatchProcessor } from './batch-processor';
import { BaseProduct, Language } from './types';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

// Import all product data
import { antalyaTours } from '../../src/data/antalya-tours';
import { allComprehensiveTours } from '../../src/data/marmaris-bodrum-cesme-tours';
import antalyaCarRentals from '../../src/data/antalya-car-rentals';
import antalyaTransfers from '../../src/data/antalya-transfers';
import { rentalProperties } from '../../src/data/rental-properties';

// Supported languages
const LANGUAGES: Language[] = ['tr', 'en', 'de', 'ru', 'ar', 'fa', 'fr', 'el'];

/**
 * Convert data to BaseProduct format
 */
function convertToBaseProduct(data: any[], category: any): BaseProduct[] {
  return data.map(item => ({
    id: item.id || item.slug,
    slug: item.slug || item.id,
    category,
    region: item.region || 'Antalya',
    name: item.name || item.title || item.model?.tr || 'Unknown',
    description: item.description || '',
    price: item.pricing?.travelLyDian || item.pricing?.daily || item.price || 0,
    images: item.images || [],
    rating: item.rating,
    reviewCount: item.reviewCount || item.totalRentals || item.totalTransfers
  }));
}

/**
 * Main execution
 */
async function main() {
  console.log('\n🚀 AILYDIAN CONTENT GENERATION - MEGA PROJECT\n');
  console.log('='.repeat(60));

  // Validate API key
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('❌ ERROR: OPENAI_API_KEY not found in environment');
    console.error('💡 Add it to .env.local file');
    process.exit(1);
  }

  // Configuration
  const batchSize = parseInt(process.env.BATCH_SIZE || '100');
  const concurrency = parseInt(process.env.CONCURRENCY || '10');

  console.log(`\n⚙️  CONFIGURATION:`);
  console.log(`   API Key: ${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 4)}`);
  console.log(`   Batch Size: ${batchSize}`);
  console.log(`   Concurrency: ${concurrency}`);
  console.log(`   Languages: ${LANGUAGES.join(', ')}\n`);

  // Collect all products
  const allProducts: BaseProduct[] = [
    ...convertToBaseProduct(antalyaTours, 'tour'),
    ...convertToBaseProduct(allComprehensiveTours, 'tour'),
    ...convertToBaseProduct(antalyaCarRentals, 'car-rental'),
    ...convertToBaseProduct(antalyaTransfers, 'transfer'),
    ...convertToBaseProduct(rentalProperties, 'rental')
  ];

  console.log(`📦 PRODUCT INVENTORY:`);
  console.log(`   Tours: ${antalyaTours.length + allComprehensiveTours.length}`);
  console.log(`   Car Rentals: ${antalyaCarRentals.length}`);
  console.log(`   Transfers: ${antalyaTransfers.length}`);
  console.log(`   Rentals: ${rentalProperties.length}`);
  console.log(`   TOTAL PRODUCTS: ${allProducts.length}`);
  console.log(`   TOTAL PAGES (x${LANGUAGES.length} languages): ${allProducts.length * LANGUAGES.length}\n`);

  // Limit to batch size for testing
  const productsToProcess = allProducts.slice(0, batchSize);

  console.log(`\n🎯 PROCESSING ${productsToProcess.length} PRODUCTS\n`);
  console.log('='.repeat(60) + '\n');

  // Initialize batch processor
  const processor = new BatchProcessor({
    apiKey,
    concurrency,
    retryAttempts: 3,
    retryDelay: 5000,
    outputDir: path.join(process.cwd(), 'generated-content')
  });

  // Start time
  const startTime = Date.now();

  try {
    // Process all products
    const stats = await processor.processAllProducts(productsToProcess, LANGUAGES);

    // Calculate duration
    const duration = Math.round((Date.now() - startTime) / 1000);
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;

    // Final report
    console.log('\n' + '='.repeat(60));
    console.log('🎉 BATCH PROCESSING COMPLETE!\n');
    console.log(`⏱️  Duration: ${minutes}m ${seconds}s`);
    console.log(`📊 Total Pages Generated: ${stats.totalPages}`);
    console.log(`\n✅ Completed: ${stats.byStatus.completed}`);
    console.log(`❌ Failed: ${stats.byStatus.failed}`);
    console.log(`⏳ Pending: ${stats.byStatus.pending}`);

    console.log(`\n📈 BY CATEGORY:`);
    Object.entries(stats.byCategory).forEach(([category, count]) => {
      console.log(`   ${category}: ${count} pages`);
    });

    console.log(`\n🌍 BY LANGUAGE:`);
    Object.entries(stats.byLanguage).forEach(([lang, count]) => {
      console.log(`   ${lang}: ${count} pages`);
    });

    console.log('\n💾 Output directory: ' + path.join(process.cwd(), 'generated-content'));
    console.log('\n' + '='.repeat(60) + '\n');

    // Exit with appropriate code
    process.exit(stats.byStatus.failed > 0 ? 1 : 0);
  } catch (error) {
    console.error('\n❌ FATAL ERROR:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
}
