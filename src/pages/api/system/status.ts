import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import logger from '../../../../../lib/logger';

interface SystemStatus {
  status: 'healthy' | 'degraded' | 'down';
  timestamp: string;
  version: string;
  environment: string;
  services: {
    database: { status: string; responseTime?: number; error?: string };
    api: { status: string; endpoints: { [key: string]: boolean } };
    auth: { status: string; providers: string[] };
  };
  metrics: {
    uptime: number;
    memory: NodeJS.MemoryUsage;
    cpu: NodeJS.CpuUsage;
  };
  database: {
    users: number;
    hotels: number;
    flights: number;
    airports: number;
    transfers: number;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SystemStatus | { error: string }>
) {
  try {
    const startTime = Date.now();

    // Test database connection
    let dbStatus = 'connected';
    let dbError: string | undefined;
    let dbResponseTime: number | undefined;

    try {
      const dbStart = Date.now();
      await prisma.$queryRaw`SELECT 1`;
      dbResponseTime = Date.now() - dbStart;
    } catch (error) {
      dbStatus = 'disconnected';
      dbError = error instanceof Error ? error.message : 'Unknown error';
    }

    // Get database counts
    let dbCounts = {
      users: 0,
      hotels: 0,
      flights: 0,
      airports: 0,
      transfers: 0,
    };

    if (dbStatus === 'connected') {
      try {
        const [users, hotels, flights, airports, transfers] = await Promise.all([
          prisma.user.count(),
          prisma.hotel.count(),
          prisma.flight.count(),
          prisma.airport.count(),
          prisma.airportTransfer.count(),
        ]);

        dbCounts = { users, hotels, flights, airports, transfers };
      } catch (error) {
        logger.error('Error fetching database counts:', error as Error, { component: 'Status' });
      }
    }

    // Check critical API endpoints
    const apiEndpoints = {
      '/api/health': true,
      '/api/search/hotels': true,
      '/api/search/flights': true,
      '/api/transfers/search': true,
      '/api/auth/[...nextauth]': true,
    };

    // Determine overall status
    const overallStatus: 'healthy' | 'degraded' | 'down' =
      dbStatus === 'connected' ? 'healthy' : 'degraded';

    const status: SystemStatus = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      version: '2.0.0',
      environment: process.env.NODE_ENV || 'development',
      services: {
        database: {
          status: dbStatus,
          responseTime: dbResponseTime,
          error: dbError,
        },
        api: {
          status: 'operational',
          endpoints: apiEndpoints,
        },
        auth: {
          status: 'operational',
          providers: ['credentials', 'email'],
        },
      },
      metrics: {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        cpu: process.cpuUsage(),
      },
      database: dbCounts,
    };

    res.status(200).json(status);
  } catch (error) {
    logger.error('System status error:', error as Error, { component: 'Status' });
    res.status(500).json({
      error: 'Failed to fetch system status',
    });
  }
}
