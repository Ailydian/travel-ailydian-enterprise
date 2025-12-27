/**
 * Optimized Prisma Client with Connection Pooling
 * Enterprise-grade database client with monitoring
 * Database Architect Agent Implementation
 */

import { PrismaClient } from '@prisma/client';
import { captureException, measurePerformance } from '../monitoring/sentry';

// ==========================================
// GLOBAL PRISMA CLIENT (SINGLETON)
// ==========================================

declare global {
  var prisma: PrismaClient | undefined;
}

/**
 * Extended Prisma Client with query logging and performance tracking
 */
export class ExtendedPrismaClient extends PrismaClient {
  constructor() {
    super({
      log: [
        { level: 'query', emit: 'event' },
        { level: 'error', emit: 'event' },
        { level: 'warn', emit: 'event' },
      ],
      errorFormat: 'pretty',
    });

    // Query logging in development
    if (process.env.NODE_ENV !== 'production') {
      this.$on('query' as any, (e: any) => {
        console.log(`Query: ${e.query}`);
        console.log(`Duration: ${e.duration}ms`);
      });
    }

    // Error tracking
    this.$on('error' as any, (e: any) => {
      captureException(new Error('Prisma Error'), {
        prismaError: e,
      });
    });

    // Slow query detection (> 1000ms)
    this.$on('query' as any, (e: any) => {
      if (e.duration > 1000) {
        captureException(new Error('Slow Query Detected'), {
          query: e.query,
          duration: e.duration,
        });
      }
    });
  }
}

// Singleton instance
export const prisma = global.prisma || new ExtendedPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

// ==========================================
// CONNECTION POOL MONITORING
// ==========================================

export async function getPrismaStats(): Promise<{
  connected: boolean;
  activeConnections: number;
}> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return {
      connected: true,
      activeConnections: 1, // Prisma doesn't expose this directly
    };
  } catch {
    return {
      connected: false,
      activeConnections: 0,
    };
  }
}

// ==========================================
// GRACEFUL SHUTDOWN
// ==========================================

export async function disconnectPrisma(): Promise<void> {
  await prisma.$disconnect();
}

// Handle process termination
process.on('beforeExit', async () => {
  await disconnectPrisma();
});

// ==========================================
// QUERY HELPERS
// ==========================================

/**
 * Execute query with performance tracking
 */
export async function trackedQuery<T>(
  queryName: string,
  queryFn: () => Promise<T>
): Promise<T> {
  return measurePerformance(`db:${queryName}`, queryFn, {
    tags: { operation: 'database' },
  });
}

/**
 * Batch queries in parallel
 */
export async function batchQueries<T extends readonly unknown[]>(
  ...queries: { [K in keyof T]: () => Promise<T[K]> }
): Promise<{ [K in keyof T]: T[K] }> {
  return Promise.all(queries.map((q) => q())) as any;
}

/**
 * Transaction with retry logic
 */
export async function transactionWithRetry<T>(
  fn: (tx: PrismaClient) => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await prisma.$transaction(async (tx: any) => {
        return fn(tx);
      });
    } catch (error) {
      lastError = error as Error;

      // Don't retry on certain errors
      if (
        error.code === 'P2002' || // Unique constraint
        error.code === 'P2025' // Record not found
      ) {
        throw error;
      }

      // Exponential backoff
      if (attempt < maxRetries - 1) {
        const delay = Math.min(100 * Math.pow(2, attempt), 3000);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  captureException(lastError!, { maxRetries });
  throw lastError;
}

// ==========================================
// COMMON QUERY PATTERNS
// ==========================================

/**
 * Paginated query with cursor
 */
export async function paginatedQuery<T>(config: {
  model: keyof PrismaClient;
  where?: any;
  orderBy?: any;
  cursor?: any;
  take: number;
  include?: any;
}): Promise<{
  data: T[];
  nextCursor: any;
  hasMore: boolean;
}> {
  const { model, where, orderBy, cursor, take, include } = config;

  const items = (await (prisma[model] as any).findMany({
    where,
    orderBy,
    cursor,
    take: take + 1, // Fetch one extra to check if there's more
    include,
  })) as T[];

  const hasMore = items.length > take;
  const data = hasMore ? items.slice(0, take) : items;
  const nextCursor = hasMore ? items[take - 1] : null;

  return { data, nextCursor, hasMore };
}

/**
 * Count with cache
 */
const countCache = new Map<string, { count: number; timestamp: number }>();
const COUNT_CACHE_TTL = 60000; // 1 minute

export async function cachedCount(
  model: keyof PrismaClient,
  where?: any
): Promise<number> {
  const cacheKey = `${String(model)}:${JSON.stringify(where)}`;
  const cached = countCache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < COUNT_CACHE_TTL) {
    return cached.count;
  }

  const count = await (prisma[model] as any).count({ where });

  countCache.set(cacheKey, { count, timestamp: Date.now() });
  return count;
}

// ==========================================
// N+1 QUERY PREVENTION
// ==========================================

/**
 * Batch load entities by IDs (DataLoader pattern)
 */
export async function batchLoadByIds<T>(
  model: keyof PrismaClient,
  ids: string[],
  include?: any
): Promise<Map<string, T>> {
  const items = (await (prisma[model] as any).findMany({
    where: { id: { in: ids } },
    include,
  })) as (T & { id: string })[];

  const map = new Map<string, T>();
  items.forEach((item) => map.set(item.id, item));
  return map;
}

/**
 * Eager load relations (prevent N+1)
 */
export function eagerLoad<T>(include: any): { include: any } {
  return { include };
}

// ==========================================
// FULL-TEXT SEARCH (PostgreSQL)
// ==========================================

/**
 * Full-text search using PostgreSQL
 */
export async function fullTextSearch(
  query: string,
  table: string,
  columns: string[]
): Promise<any[]> {
  // Create tsquery from user input
  const tsQuery = query
    .split(' ')
    .filter((word) => word.length > 0)
    .join(' & ');

  // Execute full-text search
  return prisma.$queryRawUnsafe(
    `
    SELECT *
    FROM ${table}
    WHERE to_tsvector('english', ${columns.join(' || \' \' || ')})
      @@ to_tsquery('english', $1)
    ORDER BY ts_rank(to_tsvector('english', ${columns.join(' || \' \' || ')}), to_tsquery('english', $1)) DESC
    LIMIT 50
  `,
    tsQuery
  );
}

// ==========================================
// DATABASE HEALTH CHECK
// ==========================================

export async function healthCheck(): Promise<{
  status: 'healthy' | 'unhealthy';
  latency: number;
  error?: string;
}> {
  const start = Date.now();

  try {
    await prisma.$queryRaw`SELECT 1`;
    const latency = Date.now() - start;

    return {
      status: latency < 100 ? 'healthy' : 'unhealthy',
      latency,
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      latency: Date.now() - start,
      error: (error as Error).message,
    };
  }
}
