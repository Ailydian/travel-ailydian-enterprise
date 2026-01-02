#!/usr/bin/env ts-node
/**
 * Content Generation CLI
 * Interactive command-line interface for content generation
 */

import { BatchProcessor } from './batch-processor';
import { BaseProduct, Language } from './types';
import readline from 'readline';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs/promises';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

// Import product data
import { antalyaTours } from '../../src/data/antalya-tours';
import { allComprehensiveTours } from '../../src/data/marmaris-bodrum-cesme-tours';
import antalyaCarRentals from '../../src/data/antalya-car-rentals';
import antalyaTransfers from '../../src/data/antalya-transfers';
import { rentalProperties } from '../../src/data/rental-properties';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query: string): Promise<string> =>
  new Promise(resolve => rl.question(query, resolve));

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

async function displayMenu() {
  console.clear();
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║      AILYDIAN CONTENT GENERATION - Interactive CLI       ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  const allProducts: BaseProduct[] = [
    ...convertToBaseProduct(antalyaTours, 'tour'),
    ...convertToBaseProduct(allComprehensiveTours, 'tour'),
    ...convertToBaseProduct(antalyaCarRentals, 'car-rental'),
    ...convertToBaseProduct(antalyaTransfers, 'transfer'),
    ...convertToBaseProduct(rentalProperties, 'rental')
  ];

  const totalTours = antalyaTours.length + allComprehensiveTours.length;
  const totalCars = antalyaCarRentals.length;
  const totalTransfers = antalyaTransfers.length;
  const totalRentals = rentalProperties.length;

  console.log('📊 PRODUCT INVENTORY:');
  console.log(`   Tours:        ${totalTours}`);
  console.log(`   Car Rentals:  ${totalCars}`);
  console.log(`   Transfers:    ${totalTransfers}`);
  console.log(`   Rentals:      ${totalRentals}`);
  console.log(`   ─────────────────────`);
  console.log(`   TOTAL:        ${allProducts.length} products\n`);

  console.log('🌍 LANGUAGES: TR, EN, DE, RU, AR, FA, FR, EL (8 languages)\n');
  console.log(`📄 TOTAL PAGES: ${allProducts.length * 8} pages\n`);

  console.log('═'.repeat(60));
  console.log('\nSELECT MODE:\n');
  console.log('1. Quick Test (10 products x 8 languages = 80 pages)');
  console.log('2. Small Batch (50 products x 8 languages = 400 pages)');
  console.log('3. Medium Batch (100 products x 8 languages = 800 pages)');
  console.log('4. Full Generation (All products x 8 languages)');
  console.log('5. Custom Range');
  console.log('6. View Progress');
  console.log('7. View Generated Content');
  console.log('8. Exit\n');

  return question('Enter your choice (1-8): ');
}

async function runGeneration(
  products: BaseProduct[],
  languages: Language[],
  concurrency: number
) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('\n❌ ERROR: OPENAI_API_KEY not found in .env.local');
    return;
  }

  console.log('\n' + '='.repeat(60));
  console.log('🚀 STARTING CONTENT GENERATION');
  console.log('='.repeat(60) + '\n');

  console.log(`📦 Products: ${products.length}`);
  console.log(`🌍 Languages: ${languages.join(', ')}`);
  console.log(`📄 Total Pages: ${products.length * languages.length}`);
  console.log(`⚙️  Concurrency: ${concurrency} workers\n`);

  const confirm = await question('Continue? (y/n): ');
  if (confirm.toLowerCase() !== 'y') {
    console.log('\n❌ Generation cancelled');
    return;
  }

  const processor = new BatchProcessor({
    apiKey,
    concurrency,
    retryAttempts: 3,
    retryDelay: 5000,
    outputDir: path.join(process.cwd(), 'generated-content')
  });

  const startTime = Date.now();

  try {
    const stats = await processor.processAllProducts(products, languages);

    const duration = Math.round((Date.now() - startTime) / 1000);
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;

    console.log('\n' + '='.repeat(60));
    console.log('🎉 GENERATION COMPLETE!');
    console.log('='.repeat(60) + '\n');

    console.log(`⏱️  Duration: ${minutes}m ${seconds}s`);
    console.log(`📊 Total Pages: ${stats.totalPages}`);
    console.log(`✅ Completed: ${stats.byStatus.completed}`);
    console.log(`❌ Failed: ${stats.byStatus.failed}`);
    console.log(`⏳ Pending: ${stats.byStatus.pending}\n`);

    console.log('📈 BY CATEGORY:');
    Object.entries(stats.byCategory).forEach(([category, count]) => {
      console.log(`   ${category.padEnd(15)}: ${count} pages`);
    });

    console.log('\n🌍 BY LANGUAGE:');
    Object.entries(stats.byLanguage).forEach(([lang, count]) => {
      console.log(`   ${lang.toUpperCase().padEnd(15)}: ${count} pages`);
    });

    console.log('\n💾 Output: generated-content/\n');

  } catch (error) {
    console.error('\n❌ Generation failed:', error);
  }
}

async function viewProgress() {
  try {
    const progressFile = path.join(process.cwd(), 'generated-content', 'progress.json');
    const data = await fs.readFile(progressFile, 'utf-8');
    const tasks = JSON.parse(data);

    const stats = {
      total: Object.keys(tasks).length,
      completed: 0,
      failed: 0,
      pending: 0,
      processing: 0
    };

    for (const task of Object.values(tasks) as any[]) {
      stats[task.status]++;
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 PROGRESS REPORT');
    console.log('='.repeat(60) + '\n');

    console.log(`Total Tasks:    ${stats.total}`);
    console.log(`✅ Completed:    ${stats.completed} (${Math.round(stats.completed / stats.total * 100)}%)`);
    console.log(`❌ Failed:       ${stats.failed}`);
    console.log(`⏳ Pending:      ${stats.pending}`);
    console.log(`🔄 Processing:   ${stats.processing}\n`);

    const progressBar = '█'.repeat(Math.floor(stats.completed / stats.total * 50));
    const emptyBar = '░'.repeat(50 - progressBar.length);
    console.log(`[${progressBar}${emptyBar}] ${Math.round(stats.completed / stats.total * 100)}%\n`);

  } catch (error) {
    console.log('\n❌ No progress file found. Run generation first.\n');
  }
}

async function viewGeneratedContent() {
  try {
    const contentDir = path.join(process.cwd(), 'generated-content');
    const categories = await fs.readdir(contentDir);

    console.log('\n' + '='.repeat(60));
    console.log('📂 GENERATED CONTENT');
    console.log('='.repeat(60) + '\n');

    for (const category of categories) {
      if (category === 'seo' || category === 'progress.json') continue;

      const categoryPath = path.join(contentDir, category);
      const stat = await fs.stat(categoryPath);

      if (stat.isDirectory()) {
        const files = await fs.readdir(categoryPath);
        console.log(`${category.toUpperCase()}: ${files.length} files`);

        // Show sample
        if (files.length > 0) {
          const sampleFile = files[0];
          const samplePath = path.join(categoryPath, sampleFile);
          const sample = JSON.parse(await fs.readFile(samplePath, 'utf-8'));

          console.log(`   Sample: ${sample.title}`);
          console.log(`   Locale: ${sample.locale}`);
          console.log(`   Keywords: ${sample.seo.keywords.slice(0, 3).join(', ')}...`);
          console.log('');
        }
      }
    }

  } catch (error) {
    console.log('\n❌ No generated content found. Run generation first.\n');
  }
}

async function main() {
  const allProducts: BaseProduct[] = [
    ...convertToBaseProduct(antalyaTours, 'tour'),
    ...convertToBaseProduct(allComprehensiveTours, 'tour'),
    ...convertToBaseProduct(antalyaCarRentals, 'car-rental'),
    ...convertToBaseProduct(antalyaTransfers, 'transfer'),
    ...convertToBaseProduct(rentalProperties, 'rental')
  ];

  const languages: Language[] = ['tr', 'en', 'de', 'ru', 'ar', 'fa', 'fr', 'el'];

  while (true) {
    const choice = await displayMenu();

    switch (choice) {
      case '1':
        await runGeneration(allProducts.slice(0, 10), languages, 5);
        break;

      case '2':
        await runGeneration(allProducts.slice(0, 50), languages, 10);
        break;

      case '3':
        await runGeneration(allProducts.slice(0, 100), languages, 15);
        break;

      case '4':
        await runGeneration(allProducts, languages, 20);
        break;

      case '5':
        const start = parseInt(await question('\nStart index (0-based): '));
        const end = parseInt(await question('End index: '));
        const concurrency = parseInt(await question('Concurrency (1-20): '));

        if (isNaN(start) || isNaN(end) || isNaN(concurrency)) {
          console.log('\n❌ Invalid input');
          break;
        }

        await runGeneration(allProducts.slice(start, end), languages, concurrency);
        break;

      case '6':
        await viewProgress();
        await question('\nPress Enter to continue...');
        break;

      case '7':
        await viewGeneratedContent();
        await question('\nPress Enter to continue...');
        break;

      case '8':
        console.log('\n👋 Goodbye!\n');
        rl.close();
        process.exit(0);

      default:
        console.log('\n❌ Invalid choice. Please select 1-8.\n');
        await question('Press Enter to continue...');
    }
  }
}

if (require.main === module) {
  main().catch(error => {
    console.error('\nUnhandled error:', error);
    rl.close();
    process.exit(1);
  });
}
