#!/usr/bin/env ts-node
/**
 * Advanced Batch Content Generation Script
 * Production-grade batch processor for 1378 pages across 8 languages
 *
 * Features:
 * - Progress tracking and resume capability
 * - Error handling and retry logic
 * - Performance metrics and reporting
 * - Concurrent processing with worker pool
 * - Real-time progress display
 * - Automatic categorization and organization
 */

import fs from 'fs/promises';
import path from 'path';
import { createContentGenerator, ContentConfig, GeneratedContent, Language } from '../src/lib/ai/content-generator-advanced';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env.local') });

// ============================================================================
// CONFIGURATION
// ============================================================================

const LOCALES: Language[] = ['tr', 'en', 'de', 'ru', 'ar', 'fa', 'fr', 'el'];
const OUTPUT_DIR = path.join(__dirname, '../generated-content');
const PROGRESS_FILE = path.join(OUTPUT_DIR, 'progress.json');

interface BatchConfig {
  concurrency: number;
  batchSize: number;
  provider: 'openai' | 'anthropic' | 'google' | 'groq';
  retryAttempts: number;
  saveInterval: number; // Save progress every N items
}

interface ProgressTracker {
  total: number;
  completed: number;
  failed: number;
  pending: number;
  startTime: number;
  items: Map<string, {
    status: 'pending' | 'processing' | 'completed' | 'failed';
    attempts: number;
    error?: string;
    completedAt?: number;
  }>;
}

interface BatchStats {
  totalPages: number;
  completedPages: number;
  failedPages: number;
  duration: number;
  averageTimePerPage: number;
  byCategory: Record<string, number>;
  byLanguage: Record<string, number>;
  byStatus: Record<string, number>;
  errors: Array<{ item: string; error: string }>;
}

// ============================================================================
// BATCH PROCESSOR CLASS
// ============================================================================

class AdvancedBatchProcessor {
  private config: BatchConfig;
  private progress: ProgressTracker;
  private generator: any;
  private stats: Partial<BatchStats>;

  constructor(config: BatchConfig) {
    this.config = config;
    this.progress = {
      total: 0,
      completed: 0,
      failed: 0,
      pending: 0,
      startTime: Date.now(),
      items: new Map(),
    };
    this.stats = {
      byCategory: {},
      byLanguage: {},
      byStatus: {},
      errors: [],
    };

    // Initialize generator
    this.generator = createContentGenerator({
      provider: config.provider,
      apiKey: this.getAPIKey(config.provider),
      retryAttempts: config.retryAttempts,
      cacheEnabled: true,
      rateLimitPerMinute: this.getRateLimit(config.provider),
    });
  }

  /**
   * Get API key for provider
   */
  private getAPIKey(provider: string): string {
    const keys: Record<string, string> = {
      openai: process.env.OPENAI_API_KEY || '',
      anthropic: process.env.ANTHROPIC_API_KEY || '',
      google: process.env.GOOGLE_AI_API_KEY || '',
      groq: process.env.GROQ_API_KEY || '',
    };

    const key = keys[provider];
    if (!key) {
      throw new Error(`API key not found for provider: ${provider}. Please set it in .env.local`);
    }

    return key;
  }

  /**
   * Get rate limit for provider
   */
  private getRateLimit(provider: string): number {
    const limits: Record<string, number> = {
      openai: 60,
      anthropic: 50,
      google: 60,
      groq: 30,
    };
    return limits[provider] || 60;
  }

  /**
   * Load existing progress
   */
  async loadProgress(): Promise<void> {
    try {
      const data = await fs.readFile(PROGRESS_FILE, 'utf-8');
      const saved = JSON.parse(data);
      this.progress = {
        ...saved,
        items: new Map(Object.entries(saved.items)),
      };
      console.log(`Loaded progress: ${this.progress.completed}/${this.progress.total} completed`);
    } catch (error) {
      console.log('No existing progress found. Starting fresh.');
    }
  }

  /**
   * Save progress
   */
  async saveProgress(): Promise<void> {
    const data = {
      ...this.progress,
      items: Object.fromEntries(this.progress.items),
    };

    await fs.writeFile(PROGRESS_FILE, JSON.stringify(data, null, 2));
  }

  /**
   * Process all items
   */
  async processAll(items: ContentConfig[]): Promise<BatchStats> {
    // Initialize progress
    this.progress.total = items.length * LOCALES.length;
    this.progress.pending = this.progress.total;

    // Create output directory
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    // Load existing progress
    await this.loadProgress();

    // Create tasks
    const tasks: Array<{ config: ContentConfig; locale: Language }> = [];
    for (const item of items) {
      for (const locale of LOCALES) {
        const key = this.getItemKey(item, locale);

        // Skip completed items
        const status = this.progress.items.get(key)?.status;
        if (status === 'completed') continue;

        tasks.push({ config: item, locale });
        this.progress.items.set(key, {
          status: 'pending',
          attempts: 0,
        });
      }
    }

    console.log(`\n${'='.repeat(70)}`);
    console.log(`AILYDIAN CONTENT GENERATION - BATCH PROCESSOR`);
    console.log(${'='.repeat(70)}\n`);
    console.log(`Provider: ${this.config.provider.toUpperCase()}`);
    console.log(`Total Tasks: ${tasks.length}`);
    console.log(`Concurrency: ${this.config.concurrency}`);
    console.log(`Languages: ${LOCALES.join(', ')}`);
    console.log(`\nStarting generation...\n`);

    // Process in batches
    const batches = this.createBatches(tasks, this.config.batchSize);

    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      console.log(`\nProcessing batch ${i + 1}/${batches.length} (${batch.length} items)...`);

      await this.processBatch(batch);

      // Save progress after each batch
      await this.saveProgress();

      // Display progress
      this.displayProgress();
    }

    // Calculate final stats
    return this.calculateStats();
  }

  /**
   * Process a single batch with concurrency control
   */
  private async processBatch(
    tasks: Array<{ config: ContentConfig; locale: Language }>
  ): Promise<void> {
    const pool: Promise<void>[] = [];

    for (const task of tasks) {
      // Wait if pool is full
      if (pool.length >= this.config.concurrency) {
        await Promise.race(pool);
        pool.splice(
          pool.findIndex(p => p === undefined),
          1
        );
      }

      // Add new task to pool
      const promise = this.processItem(task.config, task.locale);
      pool.push(promise);
    }

    // Wait for all remaining tasks
    await Promise.all(pool);
  }

  /**
   * Process a single item
   */
  private async processItem(config: ContentConfig, locale: Language): Promise<void> {
    const key = this.getItemKey(config, locale);

    try {
      // Update status
      const item = this.progress.items.get(key)!;
      item.status = 'processing';
      item.attempts++;

      // Generate content
      const content = await this.generator.generateTourContent({
        ...config,
        locale,
      });

      // Save content
      await this.saveContent(config, locale, content);

      // Update progress
      item.status = 'completed';
      item.completedAt = Date.now();
      this.progress.completed++;
      this.progress.pending--;

      // Update stats
      this.updateStats(config, locale, 'completed');
    } catch (error: any) {
      // Handle error
      const item = this.progress.items.get(key)!;
      item.status = 'failed';
      item.error = error.message;

      this.progress.failed++;
      this.progress.pending--;

      // Record error
      this.stats.errors?.push({
        item: key,
        error: error.message,
      });

      console.error(`Error processing ${key}:`, error.message);
    }
  }

  /**
   * Save generated content
   */
  private async saveContent(
    config: ContentConfig,
    locale: Language,
    content: GeneratedContent
  ): Promise<void> {
    // Create category directory
    const categoryDir = path.join(OUTPUT_DIR, config.type);
    await fs.mkdir(categoryDir, { recursive: true });

    // Create locale subdirectory
    const localeDir = path.join(categoryDir, locale);
    await fs.mkdir(localeDir, { recursive: true });

    // Generate filename
    const slug = config.name.toLowerCase().replace(/\s+/g, '-');
    const filename = `${slug}.json`;
    const filepath = path.join(localeDir, filename);

    // Save content
    await fs.writeFile(filepath, JSON.stringify(content, null, 2));
  }

  /**
   * Create batches
   */
  private createBatches<T>(items: T[], batchSize: number): T[][] {
    const batches: T[][] = [];
    for (let i = 0; i < items.length; i += batchSize) {
      batches.push(items.slice(i, i + batchSize));
    }
    return batches;
  }

  /**
   * Get item key
   */
  private getItemKey(config: ContentConfig, locale: Language): string {
    return `${config.type}-${config.name}-${locale}`;
  }

  /**
   * Update statistics
   */
  private updateStats(config: ContentConfig, locale: Language, status: string): void {
    // By category
    this.stats.byCategory![config.type] = (this.stats.byCategory![config.type] || 0) + 1;

    // By language
    this.stats.byLanguage![locale] = (this.stats.byLanguage![locale] || 0) + 1;

    // By status
    this.stats.byStatus![status] = (this.stats.byStatus![status] || 0) + 1;
  }

  /**
   * Display progress
   */
  private displayProgress(): void {
    const elapsed = Date.now() - this.progress.startTime;
    const elapsedMin = Math.floor(elapsed / 60000);
    const elapsedSec = Math.floor((elapsed % 60000) / 1000);

    const percent = Math.round((this.progress.completed / this.progress.total) * 100);
    const progressBar = this.createProgressBar(percent);

    console.log(`\n${'─'.repeat(70)}`);
    console.log(`Progress: ${progressBar} ${percent}%`);
    console.log(`Completed: ${this.progress.completed}/${this.progress.total}`);
    console.log(`Failed: ${this.progress.failed}`);
    console.log(`Pending: ${this.progress.pending}`);
    console.log(`Elapsed: ${elapsedMin}m ${elapsedSec}s`);

    if (this.progress.completed > 0) {
      const avgTime = elapsed / this.progress.completed;
      const remaining = (this.progress.total - this.progress.completed) * avgTime;
      const remainingMin = Math.floor(remaining / 60000);
      const remainingSec = Math.floor((remaining % 60000) / 1000);
      console.log(`Estimated remaining: ${remainingMin}m ${remainingSec}s`);
    }
  }

  /**
   * Create progress bar
   */
  private createProgressBar(percent: number, width: number = 40): string {
    const filled = Math.floor((percent / 100) * width);
    const empty = width - filled;
    return `[${'█'.repeat(filled)}${'░'.repeat(empty)}]`;
  }

  /**
   * Calculate final statistics
   */
  private calculateStats(): BatchStats {
    const duration = Date.now() - this.progress.startTime;

    return {
      totalPages: this.progress.total,
      completedPages: this.progress.completed,
      failedPages: this.progress.failed,
      duration,
      averageTimePerPage: this.progress.completed > 0 ? duration / this.progress.completed : 0,
      byCategory: this.stats.byCategory || {},
      byLanguage: this.stats.byLanguage || {},
      byStatus: this.stats.byStatus || {},
      errors: this.stats.errors || [],
    };
  }
}

// ============================================================================
// MAIN FUNCTION
// ============================================================================

async function main() {
  try {
    // Configuration
    const config: BatchConfig = {
      concurrency: parseInt(process.env.CONCURRENCY || '10'),
      batchSize: parseInt(process.env.BATCH_SIZE || '50'),
      provider: (process.env.AI_PROVIDER as any) || 'openai',
      retryAttempts: 3,
      saveInterval: 10,
    };

    // Load data (placeholder - replace with actual data loading)
    const items: ContentConfig[] = [
      {
        type: 'tour',
        name: 'Pamukkale Day Trip',
        location: 'Antalya',
        category: 'cultural',
        locale: 'en',
      },
      // Add more items from your data sources
    ];

    // Create processor
    const processor = new AdvancedBatchProcessor(config);

    // Process all items
    const stats = await processor.processAll(items);

    // Display final report
    console.log(`\n\n${'='.repeat(70)}`);
    console.log(`GENERATION COMPLETE!`);
    console.log(${'='.repeat(70)}\n`);

    const durationMin = Math.floor(stats.duration / 60000);
    const durationSec = Math.floor((stats.duration % 60000) / 1000);

    console.log(`Total Pages: ${stats.totalPages}`);
    console.log(`Completed: ${stats.completedPages} (${Math.round((stats.completedPages / stats.totalPages) * 100)}%)`);
    console.log(`Failed: ${stats.failedPages}`);
    console.log(`Duration: ${durationMin}m ${durationSec}s`);
    console.log(`Average Time/Page: ${Math.round(stats.averageTimePerPage / 1000)}s`);

    console.log(`\n📊 BY CATEGORY:`);
    Object.entries(stats.byCategory).forEach(([category, count]) => {
      console.log(`   ${category.padEnd(15)}: ${count} pages`);
    });

    console.log(`\n🌍 BY LANGUAGE:`);
    Object.entries(stats.byLanguage).forEach(([lang, count]) => {
      console.log(`   ${lang.toUpperCase().padEnd(15)}: ${count} pages`);
    });

    if (stats.errors.length > 0) {
      console.log(`\n❌ ERRORS (${stats.errors.length}):`);
      stats.errors.slice(0, 10).forEach(err => {
        console.log(`   ${err.item}: ${err.error}`);
      });
      if (stats.errors.length > 10) {
        console.log(`   ... and ${stats.errors.length - 10} more`);
      }
    }

    console.log(`\n💾 Output directory: ${OUTPUT_DIR}`);
    console.log(`\n✨ Generation complete!\n`);
  } catch (error) {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

export { AdvancedBatchProcessor };
