/**
 * Common Database Query Helpers
 *
 * This module provides:
 * - Pagination utilities
 * - Transaction helpers with retry logic
 * - Batch query operations
 * - Common query patterns
 * - Search and filtering utilities
 */

import { PrismaClient, Prisma } from '@prisma/client';
import { prisma } from './client';

// ==========================================
// PAGINATION HELPERS
// ==========================================

export interface PaginationParams {
  page?: number;
  limit?: number;
  cursor?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

/**
 * Paginate query results with cursor-based pagination
 */
export async function paginatedQuery<T>(
  model: keyof Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>,
  options: {
    where?: any;
    orderBy?: any;
    include?: any;
    select?: any;
  } = {},
  pagination: PaginationParams = {}
): Promise<PaginatedResult<T>> {
  const page = pagination.page || 1;
  const limit = pagination.limit || 10;
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    (prisma[model] as any).findMany({
      ...options,
      skip,
      take: limit,
    }),
    (prisma[model] as any).count({ where: options.where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasMore: page < totalPages,
    },
  };
}

/**
 * Cursor-based pagination (more efficient for large datasets)
 */
export async function cursorPagination<T>(
  model: keyof Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>,
  options: {
    where?: any;
    orderBy?: any;
    include?: any;
    select?: any;
    cursor?: any;
    take: number;
  }
): Promise<{
  data: T[];
  nextCursor: any;
  hasMore: boolean;
}> {
  const items = await (prisma[model] as any).findMany({
    ...options,
    take: options.take + 1, // Fetch one extra to check if there's more
  });

  const hasMore = items.length > options.take;
  const data = hasMore ? items.slice(0, -1) : items;
  const nextCursor = hasMore ? items[items.length - 2] : null;

  return { data, nextCursor, hasMore };
}

// ==========================================
// TRANSACTION HELPERS
// ==========================================

/**
 * Execute transaction with automatic retry logic
 */
export async function transactionWithRetry<T>(
  fn: (tx: Prisma.TransactionClient) => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await prisma.$transaction(fn);
    } catch (error: any) {
      lastError = error;

      // Don't retry on certain errors
      if (
        error.code === 'P2002' || // Unique constraint
        error.code === 'P2025' || // Record not found
        error.code === 'P2003'    // Foreign key constraint
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

  throw lastError;
}

// ==========================================
// BATCH OPERATIONS
// ==========================================

/**
 * Batch create records
 */
export async function batchCreate<T>(
  model: keyof Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>,
  data: any[]
): Promise<Prisma.BatchPayload> {
  return (prisma[model] as any).createMany({
    data,
    skipDuplicates: true,
  });
}

/**
 * Batch update records
 */
export async function batchUpdate<T>(
  model: keyof Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>,
  updates: Array<{ where: any; data: any }>
): Promise<void> {
  await prisma.$transaction(
    updates.map((update) =>
      (prisma[model] as any).update(update)
    )
  );
}

/**
 * Batch delete records
 */
export async function batchDelete(
  model: keyof Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>,
  where: any
): Promise<Prisma.BatchPayload> {
  return (prisma[model] as any).deleteMany({ where });
}

// ==========================================
// SEARCH & FILTERING
// ==========================================

/**
 * Build search filter for text fields
 */
export function buildSearchFilter(
  query: string,
  fields: string[]
): any {
  if (!query || !fields.length) return {};

  return {
    OR: fields.map((field) => ({
      [field]: {
        contains: query,
        mode: 'insensitive' as const,
      },
    })),
  };
}

/**
 * Build date range filter
 */
export function buildDateRangeFilter(
  field: string,
  from?: Date | string,
  to?: Date | string
): any {
  const filter: any = {};

  if (from || to) {
    filter[field] = {};
    if (from) filter[field].gte = new Date(from);
    if (to) filter[field].lte = new Date(to);
  }

  return filter;
}

/**
 * Build price range filter
 */
export function buildPriceRangeFilter(
  field: string,
  min?: number,
  max?: number
): any {
  const filter: any = {};

  if (min !== undefined || max !== undefined) {
    filter[field] = {};
    if (min !== undefined) filter[field].gte = min;
    if (max !== undefined) filter[field].lte = max;
  }

  return filter;
}

// ==========================================
// COMMON QUERIES
// ==========================================

/**
 * Find by ID or throw error
 */
export async function findByIdOrThrow<T>(
  model: keyof Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>,
  id: string,
  include?: any
): Promise<T> {
  const record = await (prisma[model] as any).findUnique({
    where: { id },
    include,
  });

  if (!record) {
    throw new Error(`${String(model)} with id ${id} not found`);
  }

  return record;
}

/**
 * Soft delete (set isActive to false)
 */
export async function softDelete(
  model: keyof Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>,
  id: string
): Promise<any> {
  return (prisma[model] as any).update({
    where: { id },
    data: { isActive: false },
  });
}

/**
 * Count with cache (1 minute TTL)
 */
const countCache = new Map<string, { count: number; timestamp: number }>();
const COUNT_CACHE_TTL = 60000; // 1 minute

export async function cachedCount(
  model: keyof Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>,
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

  if (!tsQuery) return [];

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
// AGGREGATION HELPERS
// ==========================================

/**
 * Get aggregated statistics
 */
export async function getAggregateStats(
  model: keyof Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>,
  field: string,
  where?: any
): Promise<{
  count: number;
  min: number | null;
  max: number | null;
  avg: number | null;
  sum: number | null;
}> {
  const result = await (prisma[model] as any).aggregate({
    where,
    _count: { [field]: true },
    _min: { [field]: true },
    _max: { [field]: true },
    _avg: { [field]: true },
    _sum: { [field]: true },
  });

  return {
    count: result._count[field] || 0,
    min: result._min[field],
    max: result._max[field],
    avg: result._avg[field],
    sum: result._sum[field],
  };
}

/**
 * Group by and count
 */
export async function groupByCount(
  model: keyof Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>,
  by: string[],
  where?: any
): Promise<any[]> {
  return (prisma[model] as any).groupBy({
    by,
    where,
    _count: true,
  });
}

// ==========================================
// EXPORTS
// ==========================================

export default {
  paginatedQuery,
  cursorPagination,
  transactionWithRetry,
  batchCreate,
  batchUpdate,
  batchDelete,
  buildSearchFilter,
  buildDateRangeFilter,
  buildPriceRangeFilter,
  findByIdOrThrow,
  softDelete,
  cachedCount,
  fullTextSearch,
  getAggregateStats,
  groupByCount,
};
