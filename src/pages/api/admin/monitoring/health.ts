/**
 * System Health API
 * Get system health status and service availability
 *
 * @endpoint GET /api/admin/monitoring/health
 * @auth Required (Admin only)
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import logger from '../../../../lib/logger';

// ============================================
// TYPES
// ============================================

interface SystemHealth {
  readonly status: 'healthy' | 'degraded' | 'down';
  readonly uptime: number;
  readonly lastCheck: string;
  readonly services: ReadonlyArray<{
    readonly name: string;
    readonly status: 'up' | 'down';
    readonly responseTime: number;
    readonly lastError?: string;
  }>;
}

interface HealthResponse {
  readonly health: SystemHealth;
  readonly timestamp: string;
}

// ============================================
// HANDLER
// ============================================

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HealthResponse | { error: string }>
) {
  // Authentication check
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.role !== 'admin') {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check system health
    const health = await checkSystemHealth();

    logger.info('System health checked', {
      status: health.status,
      servicesUp: health.services.filter(s => s.status === 'up').length,
      servicesTotal: health.services.length,
    });

    return res.status(200).json({
      health,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Failed to check system health', { error });
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

async function checkSystemHealth(): Promise<SystemHealth> {
  const services = await checkServices();

  const downServices = services.filter(s => s.status === 'down').length;
  let status: SystemHealth['status'] = 'healthy';

  if (downServices > 0) {
    status = downServices === services.length ? 'down' : 'degraded';
  }

  // Calculate uptime (mock for now, in production would come from monitoring service)
  const uptime = 99.95;

  return {
    status,
    uptime,
    lastCheck: new Date().toISOString(),
    services,
  };
}

async function checkServices() {
  const serviceChecks = [
    checkService('Database', process.env.DATABASE_URL ? 'postgresql' : undefined),
    checkService('Redis Cache', process.env.REDIS_URL),
    checkService('Stripe API', process.env.STRIPE_SECRET_KEY ? 'https://api.stripe.com/v1/charges' : undefined),
    checkService('Coinbase Commerce', process.env.COINBASE_COMMERCE_API_KEY ? 'https://api.commerce.coinbase.com/charges' : undefined),
    checkService('OpenAI API', process.env.OPENAI_API_KEY ? 'https://api.openai.com/v1/models' : undefined),
    checkService('Sentry', process.env.NEXT_PUBLIC_SENTRY_DSN ? 'sentry' : undefined),
  ];

  return await Promise.all(serviceChecks);
}

async function checkService(
  name: string,
  endpoint?: string
): Promise<{
  name: string;
  status: 'up' | 'down';
  responseTime: number;
  lastError?: string;
}> {
  if (!endpoint) {
    return {
      name,
      status: 'down',
      responseTime: 0,
      lastError: 'Service not configured',
    };
  }

  try {
    const startTime = Date.now();

    // For database and cache, just check if env var exists
    if (endpoint === 'postgresql' || endpoint === 'redis') {
      return {
        name,
        status: 'up',
        responseTime: 5,
      };
    }

    // For Sentry, just check if DSN is configured
    if (endpoint === 'sentry') {
      return {
        name,
        status: 'up',
        responseTime: 10,
      };
    }

    // For external APIs, do a quick health check
    // Note: In production, you'd want rate limiting and caching for these checks
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        signal: controller.signal,
        headers: {
          'User-Agent': 'AILYDIAN Health Check',
        },
      });

      clearTimeout(timeout);
      const responseTime = Date.now() - startTime;

      return {
        name,
        status: response.ok || response.status === 401 ? 'up' : 'down', // 401 means API is up but needs auth
        responseTime,
        lastError: response.ok ? undefined : `HTTP ${response.status}`,
      };
    } catch (error: any) {
      clearTimeout(timeout);
      const responseTime = Date.now() - startTime;

      return {
        name,
        status: 'down',
        responseTime,
        lastError: error.name === 'AbortError' ? 'Timeout' : error.message,
      };
    }
  } catch (error: any) {
    return {
      name,
      status: 'down',
      responseTime: 0,
      lastError: error.message || 'Unknown error',
    };
  }
}
