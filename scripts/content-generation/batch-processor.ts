/**
 * Batch Content Processor
 * Processes 100s of products in parallel with rate limiting
 * Manages queue, retries, progress tracking
 */

import pLimit from 'p-limit';
import { ContentGenerator } from './content-generator';
import {
  BaseProduct,
  ContentGenerationTask,
  GeneratedContent,
  Language,
  ProductCategory,
  ProductStats
} from './types';
import fs from 'fs/promises';
import path from 'path';

export class BatchProcessor {
  private generator: ContentGenerator;
  private concurrency: number;
  private retryAttempts: number;
  private retryDelay: number;
  private outputDir: string;
  private progressFile: string;
  private tasks: Map<string, ContentGenerationTask> = new Map();

  constructor(config: {
    apiKey: string;
    concurrency?: number;
    retryAttempts?: number;
    retryDelay?: number;
    outputDir?: string;
  }) {
    this.generator = new ContentGenerator({ apiKey: config.apiKey });
    this.concurrency = config.concurrency || 10;
    this.retryAttempts = config.retryAttempts || 3;
    this.retryDelay = config.retryDelay || 5000;
    this.outputDir = config.outputDir || path.join(process.cwd(), 'generated-content');
    this.progressFile = path.join(this.outputDir, 'progress.json');
  }

  /**
   * Initialize batch processing
   */
  async initialize(): Promise<void> {
    // Create output directory
    await fs.mkdir(this.outputDir, { recursive: true });

    // Load previous progress if exists
    try {
      const progressData = await fs.readFile(this.progressFile, 'utf-8');
      const savedTasks = JSON.parse(progressData);
      this.tasks = new Map(Object.entries(savedTasks));
      console.log(`✅ Loaded ${this.tasks.size} tasks from previous session`);
    } catch (error) {
      console.log('📝 Starting fresh batch processing');
    }
  }

  /**
   * Process all products across all languages
   */
  async processAllProducts(
    products: BaseProduct[],
    languages: Language[]
  ): Promise<ProductStats> {
    await this.initialize();

    const totalTasks = products.length * languages.length;
    console.log(`\n🚀 BATCH PROCESSING STARTED`);
    console.log(`📊 Products: ${products.length}`);
    console.log(`🌍 Languages: ${languages.length}`);
    console.log(`📦 Total Tasks: ${totalTasks}\n`);

    // Create tasks for all product x language combinations
    const allTasks: ContentGenerationTask[] = [];

    for (const product of products) {
      for (const locale of languages) {
        const taskId = `${product.id}-${locale}`;

        // Skip if already completed
        const existingTask = this.tasks.get(taskId);
        if (existingTask?.status === 'completed') {
          console.log(`⏭️  Skipping ${taskId} (already completed)`);
          continue;
        }

        const task: ContentGenerationTask = {
          productId: product.id,
          productCategory: product.category,
          locale,
          priority: this.determinePriority(product),
          status: 'pending',
          retries: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        allTasks.push(task);
        this.tasks.set(taskId, task);
      }
    }

    console.log(`📋 New tasks to process: ${allTasks.length}\n`);

    // Sort by priority
    allTasks.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    // Process in batches with concurrency limit
    const limit = pLimit(this.concurrency);
    const productMap = new Map(products.map(p => [p.id, p]));

    const promises = allTasks.map((task, index) =>
      limit(async () => {
        const taskId = `${task.productId}-${task.locale}`;
        const product = productMap.get(task.productId);

        if (!product) {
          console.error(`❌ Product not found: ${task.productId}`);
          return;
        }

        try {
          console.log(`[${index + 1}/${allTasks.length}] Processing: ${taskId}`);

          // Update task status
          task.status = 'processing';
          task.updatedAt = new Date();
          this.tasks.set(taskId, task);

          // Generate content
          const content = await this.generateWithRetry(product, task.locale, task);

          // Save content
          await this.saveContent(content);

          // Update task status
          task.status = 'completed';
          task.updatedAt = new Date();
          this.tasks.set(taskId, task);

          console.log(`✅ [${index + 1}/${allTasks.length}] Completed: ${taskId}`);

          // Save progress every 10 tasks
          if ((index + 1) % 10 === 0) {
            await this.saveProgress();
          }
        } catch (error) {
          console.error(`❌ [${index + 1}/${allTasks.length}] Failed: ${taskId}`, error);

          task.status = 'failed';
          task.error = error instanceof Error ? error.message : 'Unknown error';
          task.updatedAt = new Date();
          this.tasks.set(taskId, task);
        }
      })
    );

    await Promise.all(promises);

    // Final progress save
    await this.saveProgress();

    // Generate stats
    const stats = this.generateStats(products, languages);

    console.log('\n📊 BATCH PROCESSING COMPLETED\n');
    console.log(`✅ Completed: ${stats.byStatus.completed}`);
    console.log(`❌ Failed: ${stats.byStatus.failed}`);
    console.log(`⏳ Pending: ${stats.byStatus.pending}\n`);

    return stats;
  }

  /**
   * Generate content with retry logic
   */
  private async generateWithRetry(
    product: BaseProduct,
    locale: Language,
    task: ContentGenerationTask
  ): Promise<GeneratedContent> {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= this.retryAttempts; attempt++) {
      try {
        if (attempt > 0) {
          console.log(`🔄 Retry ${attempt}/${this.retryAttempts} for ${product.id}-${locale}`);
          await this.sleep(this.retryDelay * attempt);
        }

        const content = await this.generator.generateProductContent(product, locale);
        return content;
      } catch (error) {
        lastError = error as Error;
        task.retries = attempt + 1;
        this.tasks.set(`${product.id}-${locale}`, task);
      }
    }

    throw lastError || new Error('Max retries exceeded');
  }

  /**
   * Save generated content to file
   */
  private async saveContent(content: GeneratedContent): Promise<void> {
    const categoryDir = path.join(this.outputDir, content.productId.split('-')[0]);
    await fs.mkdir(categoryDir, { recursive: true });

    const filename = `${content.productId}-${content.locale}.json`;
    const filepath = path.join(categoryDir, filename);

    await fs.writeFile(filepath, JSON.stringify(content, null, 2), 'utf-8');
  }

  /**
   * Save progress to file
   */
  private async saveProgress(): Promise<void> {
    const tasksObject = Object.fromEntries(this.tasks);
    await fs.writeFile(this.progressFile, JSON.stringify(tasksObject, null, 2), 'utf-8');
  }

  /**
   * Generate statistics
   */
  private generateStats(products: BaseProduct[], languages: Language[]): ProductStats {
    const stats: ProductStats = {
      totalProducts: products.length,
      totalPages: products.length * languages.length,
      byCategory: {} as Record<ProductCategory, number>,
      byStatus: {
        pending: 0,
        processing: 0,
        completed: 0,
        failed: 0
      },
      byLanguage: {} as Record<Language, number>
    };

    // Count by category
    for (const product of products) {
      stats.byCategory[product.category] = (stats.byCategory[product.category] || 0) + languages.length;
    }

    // Count by status and language
    for (const task of this.tasks.values()) {
      stats.byStatus[task.status]++;
      stats.byLanguage[task.locale] = (stats.byLanguage[task.locale] || 0) + 1;
    }

    return stats;
  }

  /**
   * Determine task priority based on product
   */
  private determinePriority(product: BaseProduct): ContentGenerationTask['priority'] {
    // High priority: high rating, popular categories
    if (product.rating && product.rating >= 4.7) return 'high';
    if (['tour', 'hotel'].includes(product.category)) return 'high';

    // Medium priority: good rating
    if (product.rating && product.rating >= 4.3) return 'medium';

    return 'low';
  }

  /**
   * Sleep utility
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
