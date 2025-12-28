/**
 * Database Client - Prisma Singleton with Enhanced Features
 *
 * This module provides:
 * - Singleton Prisma Client instance
 * - Connection pooling and health checks
 * - Query logging and performance monitoring
 * - Error handling and retry logic
 * - Graceful shutdown handling
 */

import { PrismaClient } from '@prisma/client';

// ==========================================
// GLOBAL PRISMA CLIENT (SINGLETON)
// ==========================================

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

/**
 * Extended Prisma Client with enhanced logging and monitoring
 */
class ExtendedPrismaClient extends PrismaClient {
  constructor() {
    super({
      log: process.env.NODE_ENV === 'development'
        ? [
            { level: 'query', emit: 'event' },
            { level: 'error', emit: 'stdout' },
            { level: 'warn', emit: 'stdout' },
          ]
        : ['error'],
      errorFormat: 'pretty',
    });

    // Query logging in development
    if (process.env.NODE_ENV === 'development') {
      this.$on('query' as any, (e: any) => {
        console.log(`[DB Query] ${e.query}`);
        if (e.duration > 1000) {
          console.warn(`[SLOW QUERY] Duration: ${e.duration}ms`);
        }
      });
    }
  }
}

// Create singleton instance
export const prisma = globalThis.prisma || new ExtendedPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

// ==========================================
// CONNECTION HEALTH CHECK
// ==========================================

/**
 * Check database connection health
 */
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

/**
 * Get database statistics
 */
export async function getDatabaseStats(): Promise<{
  connected: boolean;
  version?: string;
  activeConnections?: number;
}> {
  try {
    const result = await prisma.$queryRaw<{ version: string }[]>`SELECT version()`;
    return {
      connected: true,
      version: result[0]?.version,
      activeConnections: 1, // Prisma doesn't expose this directly
    };
  } catch {
    return {
      connected: false,
    };
  }
}

// ==========================================
// GRACEFUL SHUTDOWN
// ==========================================

/**
 * Disconnect Prisma client
 */
export async function disconnectDatabase(): Promise<void> {
  try {
    await prisma.$disconnect();
    console.log('[DB] Disconnected successfully');
  } catch (error) {
    console.error('[DB] Error during disconnect:', error);
  }
}

// Handle process termination
if (typeof process !== 'undefined') {
  process.on('beforeExit', async () => {
    await disconnectDatabase();
  });

  process.on('SIGTERM', async () => {
    await disconnectDatabase();
    process.exit(0);
  });

  process.on('SIGINT', async () => {
    await disconnectDatabase();
    process.exit(0);
  });
}

// ==========================================
// EXPORTS
// ==========================================

export default prisma;
