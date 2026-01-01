import { Queue, Worker, QueueEvents, Job } from 'bullmq';
import { Redis } from 'ioredis';
import { logger } from '../logger/winston';

/**
 * PRODUCTION-GRADE JOB QUEUE WITH BULLMQ + REDIS
 *
 * Features:
 * - Background job processing
 * - Job scheduling and delays
 * - Job retry with exponential backoff
 * - Job priorities
 * - Job progress tracking
 * - Rate limiting
 * - Job event monitoring
 * - Dead letter queue
 */

// Redis connection configuration
const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null, // Required for BullMQ
  enableReadyCheck: false,
  retryStrategy: (times: number) => {
    const delay = Math.min(times * 1000, 10000);
    return delay;
  },
};

// Create Redis connection for BullMQ
const connection = new Redis(redisConfig);

/**
 * Job types and their data interfaces
 */
export enum JobType {
  SEND_EMAIL = 'send-email',
  SEND_BOOKING_CONFIRMATION = 'send-booking-confirmation',
  SEND_PAYMENT_RECEIPT = 'send-payment-receipt',
  SEND_PRICE_ALERT = 'send-price-alert',
  SEND_WELCOME_EMAIL = 'send-welcome-email',
  UPDATE_PRICE_HISTORY = 'update-price-history',
  CHECK_PRICE_ALERTS = 'check-price-alerts',
  GENERATE_AI_RECOMMENDATIONS = 'generate-ai-recommendations',
  PROCESS_BOOKING = 'process-booking',
  SYNC_EXTERNAL_DATA = 'sync-external-data',
  GENERATE_REPORT = 'generate-report',
  CLEANUP_OLD_DATA = 'cleanup-old-data',
}

export interface EmailJobData {
  to: string;
  subject: string;
  html: string;
  text?: string;
  attachments?: Array<{
    filename: string;
    content: string | Buffer;
  }>;
}

export interface BookingConfirmationJobData {
  bookingId: string;
  userId: string;
  userEmail: string;
  bookingType: string;
}

export interface PriceAlertJobData {
  alertId: string;
  userId: string;
  entityType: string;
  entityId: string;
  oldPrice: number;
  newPrice: number;
}

export interface AIRecommendationJobData {
  userId: string;
  context?: any;
}

/**
 * Queue configurations
 */
const queueConfigs = {
  // High priority - emails
  email: {
    name: 'email',
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: 'exponential' as const,
        delay: 5000,
      },
      removeOnComplete: {
        age: 3600, // 1 hour
        count: 100,
      },
      removeOnFail: {
        age: 86400, // 24 hours
      },
    },
  },
  // Medium priority - data processing
  processing: {
    name: 'processing',
    defaultJobOptions: {
      attempts: 5,
      backoff: {
        type: 'exponential' as const,
        delay: 10000,
      },
      removeOnComplete: {
        age: 3600,
        count: 50,
      },
      removeOnFail: {
        age: 172800, // 48 hours
      },
    },
  },
  // Low priority - scheduled tasks
  scheduled: {
    name: 'scheduled',
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: 'fixed' as const,
        delay: 60000, // 1 minute
      },
      removeOnComplete: {
        age: 7200,
        count: 10,
      },
    },
  },
};

/**
 * Queue Manager
 */
export class JobQueueManager {
  private queues: Map<string, Queue> = new Map();
  private workers: Map<string, Worker> = new Map();
  private events: Map<string, QueueEvents> = new Map();

  /**
   * Initialize queue
   */
  getQueue(queueName: string): Queue {
    if (!this.queues.has(queueName)) {
      const config = queueConfigs[queueName as keyof typeof queueConfigs] || {
        name: queueName,
        defaultJobOptions: {},
      };

      const queue = new Queue(config.name, {
        connection,
        defaultJobOptions: config.defaultJobOptions,
      });

      this.queues.set(queueName, queue);

      // Set up queue events
      const queueEvents = new QueueEvents(config.name, { connection });
      this.events.set(queueName, queueEvents);

      this.setupQueueEvents(queueName, queueEvents);

      logger.info('Queue initialized', { queue: queueName });
    }

    return this.queues.get(queueName)!;
  }

  /**
   * Setup queue event listeners
   */
  private setupQueueEvents(queueName: string, queueEvents: QueueEvents): void {
    queueEvents.on('completed', ({ jobId, returnvalue }) => {
      logger.info('Job completed', {
        queue: queueName,
        jobId,
        returnvalue: JSON.stringify(returnvalue).substring(0, 100),
      });
    });

    queueEvents.on('failed', ({ jobId, failedReason }) => {
      logger.error('Job failed', new Error(failedReason), {
        queue: queueName,
        jobId,
      });
    });

    queueEvents.on('progress', ({ jobId, data }) => {
      logger.debug('Job progress', {
        queue: queueName,
        jobId,
        progress: data,
      });
    });

    queueEvents.on('stalled', ({ jobId }) => {
      logger.warn('Job stalled', {
        queue: queueName,
        jobId,
      });
    });

    queueEvents.on('active', ({ jobId }) => {
      logger.debug('Job active', {
        queue: queueName,
        jobId,
      });
    });
  }

  /**
   * Register worker for a queue
   */
  registerWorker<T = any>(
    queueName: string,
    processor: (job: Job<T>) => Promise<any>,
    options: {
      concurrency?: number;
      limiter?: {
        max: number;
        duration: number;
      };
    } = {}
  ): Worker {
    const worker = new Worker<T>(queueName, processor, {
      connection,
      concurrency: options.concurrency || 5,
      limiter: options.limiter,
    });

    worker.on('completed', (job) => {
      logger.info('Worker completed job', {
        queue: queueName,
        jobId: job.id,
        jobName: job.name,
      });
    });

    worker.on('failed', (job, err) => {
      logger.error('Worker failed job', err, {
        queue: queueName,
        jobId: job?.id,
        jobName: job?.name,
      });
    });

    worker.on('error', (err) => {
      logger.error('Worker error', err, {
        queue: queueName,
      });
    });

    this.workers.set(queueName, worker);

    logger.info('Worker registered', {
      queue: queueName,
      concurrency: options.concurrency || 5,
    });

    return worker;
  }

  /**
   * Add job to queue
   */
  async addJob<T = any>(
    queueName: string,
    jobType: JobType,
    data: T,
    options: {
      priority?: number;
      delay?: number;
      jobId?: string;
      repeat?: {
        pattern?: string; // Cron pattern
        every?: number; // Milliseconds
        limit?: number;
      };
    } = {}
  ): Promise<Job<T>> {
    const queue = this.getQueue(queueName);

    const job = await queue.add(jobType, data, {
      priority: options.priority,
      delay: options.delay,
      jobId: options.jobId,
      repeat: options.repeat,
    });

    logger.info('Job added to queue', {
      queue: queueName,
      jobId: job.id,
      jobType,
      priority: options.priority,
      delay: options.delay,
    });

    return job;
  }

  /**
   * Get job by ID
   */
  async getJob(queueName: string, jobId: string): Promise<Job | undefined> {
    const queue = this.getQueue(queueName);
    return queue.getJob(jobId);
  }

  /**
   * Remove job
   */
  async removeJob(queueName: string, jobId: string): Promise<void> {
    const job = await this.getJob(queueName, jobId);
    if (job) {
      await job.remove();
      logger.info('Job removed', { queue: queueName, jobId });
    }
  }

  /**
   * Pause queue
   */
  async pauseQueue(queueName: string): Promise<void> {
    const queue = this.getQueue(queueName);
    await queue.pause();
    logger.info('Queue paused', { queue: queueName });
  }

  /**
   * Resume queue
   */
  async resumeQueue(queueName: string): Promise<void> {
    const queue = this.getQueue(queueName);
    await queue.resume();
    logger.info('Queue resumed', { queue: queueName });
  }

  /**
   * Get queue metrics
   */
  async getQueueMetrics(queueName: string): Promise<{
    waiting: number;
    active: number;
    completed: number;
    failed: number;
    delayed: number;
    paused: boolean;
  }> {
    const queue = this.getQueue(queueName);

    const [waiting, active, completed, failed, delayed, isPaused] =
      await Promise.all([
        queue.getWaitingCount(),
        queue.getActiveCount(),
        queue.getCompletedCount(),
        queue.getFailedCount(),
        queue.getDelayedCount(),
        queue.isPaused(),
      ]);

    return {
      waiting,
      active,
      completed,
      failed,
      delayed,
      paused: isPaused,
    };
  }

  /**
   * Clean old jobs
   */
  async cleanQueue(
    queueName: string,
    grace: number = 86400000, // 24 hours
    limit: number = 1000
  ): Promise<string[]> {
    const queue = this.getQueue(queueName);

    const jobs = await queue.clean(grace, limit, 'completed');

    logger.info('Queue cleaned', {
      queue: queueName,
      removed: jobs.length,
      grace,
    });

    return jobs;
  }

  /**
   * Drain queue (remove all jobs)
   */
  async drainQueue(queueName: string): Promise<void> {
    const queue = this.getQueue(queueName);
    await queue.drain();
    logger.warn('Queue drained', { queue: queueName });
  }

  /**
   * Obliterate queue (remove completely)
   */
  async obliterateQueue(queueName: string): Promise<void> {
    const queue = this.getQueue(queueName);
    await queue.obliterate({ force: true });
    this.queues.delete(queueName);
    this.workers.delete(queueName);
    this.events.delete(queueName);
    logger.warn('Queue obliterated', { queue: queueName });
  }

  /**
   * Get all queue names
   */
  getQueueNames(): string[] {
    return Array.from(this.queues.keys());
  }

  /**
   * Close all connections
   */
  async close(): Promise<void> {
    // Close all workers
    await Promise.all(
      Array.from(this.workers.values()).map((worker) => worker.close())
    );

    // Close all queues
    await Promise.all(
      Array.from(this.queues.values()).map((queue) => queue.close())
    );

    // Close all events
    await Promise.all(
      Array.from(this.events.values()).map((events) => events.close())
    );

    // Close Redis connection
    await connection.quit();

    logger.info('Job queue manager closed');
  }
}

// Global queue manager instance
export const jobQueue = new JobQueueManager();

/**
 * Helper functions for common job types
 */
export const JobHelpers = {
  /**
   * Send email job
   */
  async sendEmail(data: EmailJobData, priority: number = 1): Promise<Job> {
    return jobQueue.addJob('email', JobType.SEND_EMAIL, data, { priority });
  },

  /**
   * Send booking confirmation email
   */
  async sendBookingConfirmation(
    data: BookingConfirmationJobData
  ): Promise<Job> {
    return jobQueue.addJob(
      'email',
      JobType.SEND_BOOKING_CONFIRMATION,
      data,
      { priority: 1 }
    );
  },

  /**
   * Send price alert
   */
  async sendPriceAlert(data: PriceAlertJobData): Promise<Job> {
    return jobQueue.addJob('email', JobType.SEND_PRICE_ALERT, data, {
      priority: 2,
    });
  },

  /**
   * Generate AI recommendations (delayed)
   */
  async generateAIRecommendations(
    data: AIRecommendationJobData,
    delayMs: number = 5000
  ): Promise<Job> {
    return jobQueue.addJob(
      'processing',
      JobType.GENERATE_AI_RECOMMENDATIONS,
      data,
      { delay: delayMs }
    );
  },

  /**
   * Schedule price check (recurring)
   */
  async schedulePriceCheck(): Promise<Job> {
    return jobQueue.addJob(
      'scheduled',
      JobType.CHECK_PRICE_ALERTS,
      {},
      {
        repeat: {
          pattern: '0 */6 * * *', // Every 6 hours
        },
        jobId: 'price-check-recurring',
      }
    );
  },

  /**
   * Schedule daily cleanup
   */
  async scheduleDailyCleanup(): Promise<Job> {
    return jobQueue.addJob(
      'scheduled',
      JobType.CLEANUP_OLD_DATA,
      {},
      {
        repeat: {
          pattern: '0 2 * * *', // Every day at 2 AM
        },
        jobId: 'daily-cleanup',
      }
    );
  },
};

export default jobQueue;
