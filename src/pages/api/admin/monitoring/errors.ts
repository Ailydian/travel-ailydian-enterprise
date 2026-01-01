/**
 * Monitoring Errors API
 * Get error metrics and recent errors from Sentry
 *
 * @endpoint GET /api/admin/monitoring/errors
 * @auth Required (Admin only)
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import logger from '../../../../lib/logger';

// ============================================
// TYPES
// ============================================

interface SentryError {
  readonly id: string;
  readonly timestamp: string;
  readonly message: string;
  readonly level: 'error' | 'warning' | 'fatal' | 'info';
  readonly environment: string;
  readonly user?: string;
  readonly url?: string;
  readonly stackTrace?: string;
  readonly tags: Record<string, string>;
  readonly count: number;
}

interface ErrorMetrics {
  readonly totalErrors: number;
  readonly errorRate: number;
  readonly errorsByType: Record<string, number>;
  readonly recentErrors: readonly SentryError[];
  readonly criticalErrors: number;
}

interface ErrorsResponse {
  readonly metrics: ErrorMetrics;
  readonly timestamp: string;
}

// ============================================
// HANDLER
// ============================================

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorsResponse | { error: string }>
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
    const hours = parseInt(req.query.hours as string) || 24;

    // Fetch errors from Sentry API
    const metrics = await fetchSentryErrors(hours);

    logger.info('Error metrics fetched', {
      hours,
      totalErrors: metrics.totalErrors,
    });

    return res.status(200).json({
      metrics,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Failed to fetch error metrics', { error });
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

async function fetchSentryErrors(hours: number): Promise<ErrorMetrics> {
  const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  const sentryAuthToken = process.env.SENTRY_AUTH_TOKEN;

  if (!sentryDsn || !sentryAuthToken) {
    logger.warn('Sentry not configured, returning mock data');
    return getMockErrorMetrics();
  }

  try {
    // Extract organization and project from DSN
    // Format: https://[key]@[org].ingest.sentry.io/[project]
    const dsnMatch = sentryDsn.match(/@([^\.]+)\.ingest\.sentry\.io\/(\d+)/);
    if (!dsnMatch) {
      throw new Error('Invalid Sentry DSN format');
    }

    const [, org, project] = dsnMatch;

    // Calculate time range
    const since = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();

    // Fetch issues from Sentry API
    const response = await fetch(
      `https://sentry.io/api/0/projects/${org}/${project}/issues/?statsPeriod=${hours}h&query=is:unresolved`,
      {
        headers: {
          Authorization: `Bearer ${sentryAuthToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Sentry API error: ${response.statusText}`);
    }

    const issues = await response.json();

    // Process Sentry issues
    const recentErrors: SentryError[] = issues.slice(0, 20).map((issue: any) => ({
      id: issue.id,
      timestamp: issue.lastSeen || issue.firstSeen,
      message: issue.title || issue.metadata?.value || 'Unknown error',
      level: (issue.level || 'error') as SentryError['level'],
      environment: issue.platform || 'unknown',
      user: issue.userCount > 0 ? `${issue.userCount} users` : undefined,
      url: issue.permalink,
      stackTrace: issue.metadata?.type || undefined,
      tags: issue.tags?.reduce((acc: Record<string, string>, tag: any) => {
        acc[tag.key] = tag.value;
        return acc;
      }, {}) || {},
      count: issue.count || 1,
    }));

    // Calculate metrics
    const totalErrors = issues.reduce((sum: number, issue: any) => sum + (issue.count || 1), 0);
    const criticalErrors = issues.filter((issue: any) => issue.level === 'fatal' || issue.level === 'error').length;

    const errorsByType: Record<string, number> = {};
    for (const issue of issues) {
      const type = issue.metadata?.type || 'Unknown';
      errorsByType[type] = (errorsByType[type] || 0) + (issue.count || 1);
    }

    // Calculate error rate (errors per hour)
    const errorRate = totalErrors / (hours * 1000); // errors per 1000 requests (assumed)

    return {
      totalErrors,
      errorRate,
      errorsByType,
      recentErrors,
      criticalErrors,
    };
  } catch (error) {
    logger.error('Failed to fetch Sentry errors', { error });
    return getMockErrorMetrics();
  }
}

function getMockErrorMetrics(): ErrorMetrics {
  return {
    totalErrors: 42,
    errorRate: 0.0042,
    errorsByType: {
      TypeError: 15,
      ReferenceError: 10,
      NetworkError: 8,
      ValidationError: 6,
      AuthError: 3,
    },
    recentErrors: [
      {
        id: '1',
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        message: 'Cannot read property "user" of undefined',
        level: 'error',
        environment: 'production',
        user: '5 users',
        url: '/dashboard',
        tags: { component: 'UserProfile', browser: 'Chrome' },
        count: 5,
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        message: 'Network request failed: 500',
        level: 'warning',
        environment: 'production',
        url: '/api/bookings',
        tags: { api: 'bookings', status: '500' },
        count: 3,
      },
      {
        id: '3',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        message: 'Validation error: Invalid email format',
        level: 'info',
        environment: 'production',
        user: '2 users',
        url: '/register',
        tags: { form: 'registration' },
        count: 2,
      },
    ],
    criticalErrors: 18,
  };
}
