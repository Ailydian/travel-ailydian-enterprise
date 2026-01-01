import { PrismaClient } from '@prisma/client';
import { logger } from './logger/winston';

/**
 * PRODUCTION-GRADE PRISMA CLIENT WITH CONNECTION POOLING
 *
 * Features:
 * - Connection pooling with optimal settings for serverless
 * - Query performance logging
 * - Automatic reconnection
 * - Connection lifecycle management
 * - Middleware for query monitoring
 */

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Connection pool configuration
const CONNECTION_POOL_SIZE = process.env.NODE_ENV === 'production' ? 10 : 5;
const STATEMENT_CACHE_SIZE = 1000;
const CONNECTION_TIMEOUT = 10000; // 10 seconds
const POOL_TIMEOUT = 10000; // 10 seconds

// Query performance thresholds (ms)
const SLOW_QUERY_THRESHOLD = 1000;
const WARNING_QUERY_THRESHOLD = 500;

/**
 * Create Prisma Client with optimized configuration
 */
function createPrismaClient(): PrismaClient {
  const client = new PrismaClient({
    log: [
      { emit: 'event', level: 'query' },
      { emit: 'event', level: 'error' },
      { emit: 'event', level: 'warn' },
    ],
    datasources: {
      db: {
        url: buildDatabaseUrl(),
      },
    },
  });

  // Query performance monitoring middleware
  client.$use(async (params, next) => {
    const startTime = Date.now();

    try {
      const result = await next(params);
      const duration = Date.now() - startTime;

      // Log slow queries
      if (duration > SLOW_QUERY_THRESHOLD) {
        logger.warn('Slow query detected', {
          model: params.model,
          action: params.action,
          duration: `${duration}ms`,
          args: JSON.stringify(params.args).substring(0, 200),
        });
      } else if (duration > WARNING_QUERY_THRESHOLD) {
        logger.debug('Query performance warning', {
          model: params.model,
          action: params.action,
          duration: `${duration}ms`,
        });
      }

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;

      logger.error('Query execution failed', error as Error, {
        model: params.model,
        action: params.action,
        duration: `${duration}ms`,
        args: JSON.stringify(params.args).substring(0, 200),
      });

      throw error;
    }
  });

  // Event listeners for monitoring
  client.$on('query', (e: any) => {
    if (process.env.NODE_ENV === 'development') {
      logger.debug('Query executed', {
        query: e.query.substring(0, 200),
        duration: `${e.duration}ms`,
        target: e.target,
      });
    }
  });

  client.$on('error', (e: any) => {
    logger.error('Prisma error event', new Error(e.message), {
      target: e.target,
      timestamp: e.timestamp,
    });
  });

  client.$on('warn', (e: any) => {
    logger.warn('Prisma warning event', {
      message: e.message,
      target: e.target,
      timestamp: e.timestamp,
    });
  });

  return client;
}

/**
 * Build optimized database URL with connection pooling parameters
 */
function buildDatabaseUrl(): string {
  const baseUrl = process.env.DATABASE_URL;

  if (!baseUrl) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  // Parse URL to add/modify parameters
  const url = new URL(baseUrl);

  // Connection pooling parameters
  url.searchParams.set('connection_limit', CONNECTION_POOL_SIZE.toString());
  url.searchParams.set('pool_timeout', (POOL_TIMEOUT / 1000).toString());
  url.searchParams.set('connect_timeout', (CONNECTION_TIMEOUT / 1000).toString());
  url.searchParams.set('statement_cache_size', STATEMENT_CACHE_SIZE.toString());

  // Performance optimizations
  url.searchParams.set('pgbouncer', 'true'); // For Supabase/PgBouncer
  url.searchParams.set('schema', 'public');

  // SSL configuration for production
  if (process.env.NODE_ENV === 'production') {
    url.searchParams.set('sslmode', 'require');
  }

  return url.toString();
}

/**
 * Get or create Prisma Client singleton
 */
export const prisma = global.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

/**
 * Graceful shutdown handler
 */
export async function disconnectPrisma(): Promise<void> {
  try {
    await prisma.$disconnect();
    logger.info('Prisma client disconnected successfully');
  } catch (error) {
    logger.error('Error disconnecting Prisma client', error as Error);
  }
}

/**
 * Connection health check
 */
export async function checkPrismaConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    logger.error('Prisma connection health check failed', error as Error);
    return false;
  }
}

/**
 * Get connection pool statistics
 */
export async function getPrismaStats(): Promise<{
  connected: boolean;
  activeConnections: number;
  idleConnections: number;
}> {
  try {
    const result = await prisma.$queryRaw<Array<{ count: bigint }>>`
      SELECT COUNT(*) as count
      FROM pg_stat_activity
      WHERE datname = current_database()
    `;

    return {
      connected: true,
      activeConnections: Number(result[0]?.count || 0),
      idleConnections: CONNECTION_POOL_SIZE - Number(result[0]?.count || 0),
    };
  } catch (error) {
    logger.error('Failed to get Prisma stats', error as Error);
    return {
      connected: false,
      activeConnections: 0,
      idleConnections: 0,
    };
  }
}

/**
 * Query optimization helpers
 */
export const PrismaHelpers = {
  /**
   * Execute query with retry logic
   */
  async withRetry<T>(
    operation: () => Promise<T>,
    maxRetries = 3,
    delayMs = 1000
  ): Promise<T> {
    let lastError: Error | undefined;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;

        logger.warn('Query retry attempt', {
          attempt,
          maxRetries,
          error: lastError.message,
        });

        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, delayMs * attempt));
        }
      }
    }

    throw lastError;
  },

  /**
   * Batch queries for N+1 prevention
   */
  async batchLoad<T, K>(
    ids: K[],
    loader: (ids: K[]) => Promise<T[]>
  ): Promise<Map<K, T>> {
    const uniqueIds = [...new Set(ids)];
    const results = await loader(uniqueIds);

    const map = new Map<K, T>();
    results.forEach((result: any) => {
      map.set(result.id, result);
    });

    return map;
  },

  /**
   * Cursor-based pagination
   */
  async paginate<T>(
    model: any,
    where: any,
    orderBy: any,
    take: number,
    cursor?: any
  ): Promise<{
    data: T[];
    nextCursor: any | null;
    hasMore: boolean;
  }> {
    const items = await model.findMany({
      where,
      orderBy,
      take: take + 1, // Fetch one extra to check if there are more
      ...(cursor && { cursor, skip: 1 }),
    });

    const hasMore = items.length > take;
    const data = hasMore ? items.slice(0, -1) : items;
    const nextCursor = hasMore ? items[items.length - 2] : null;

    return {
      data,
      nextCursor,
      hasMore,
    };
  },
};

export default prisma;
