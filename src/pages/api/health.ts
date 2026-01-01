import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { cache } from '@/lib/cache/redis-cache'
import { withRateLimit, publicRateLimiter } from '@/lib/middleware/rate-limiter'

interface HealthCheck {
  status: 'healthy' | 'degraded' | 'unhealthy'
  timestamp: string
  version: string
  checks: {
    database: 'connected' | 'disconnected' | 'error'
    redis: 'connected' | 'disconnected' | 'unavailable'
    env: string
  }
  metrics: {
    uptime: number
    memory: NodeJS.MemoryUsage
    cpu: NodeJS.CpuUsage
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse<HealthCheck>) {
  const health: HealthCheck = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    checks: {
      database: 'disconnected',
      redis: 'unavailable',
      env: process.env.NODE_ENV || 'unknown',
    },
    metrics: {
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      cpu: process.cpuUsage()
    }
  }

  // Check database connection
  try {
    await prisma.$queryRaw`SELECT 1`
    health.checks.database = 'connected'
  } catch (error) {
    health.checks.database = 'error'
    health.status = 'degraded'
  }

  // Check Redis connection (if available)
  try {
    if (cache.isAvailable()) {
      await cache.set('health_check', { timestamp: Date.now() }, { ttl: 60 })
      const test = await cache.get('health_check')
      health.checks.redis = test ? 'connected' : 'disconnected'
    } else {
      health.checks.redis = 'unavailable'
    }
  } catch (error) {
    health.checks.redis = 'disconnected'
    // Redis failure is not critical, keep status as is
  }

  // Determine final status
  if (health.checks.database === 'error') {
    health.status = 'unhealthy'
  } else if (health.checks.database === 'disconnected') {
    health.status = 'degraded'
  }

  const statusCode = health.status === 'healthy' ? 200 : 503
  res.status(statusCode).json(health)
}

export default withRateLimit(handler, publicRateLimiter)
