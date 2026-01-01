/**
 * AI Vision Providers API
 * Get AI provider statistics and health metrics
 *
 * @endpoint GET /api/admin/ai-vision/providers
 * @auth Required (Admin only)
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import logger from '../../../../lib/logger';
import { prisma } from '../../../../lib/prisma';

// ============================================
// TYPES
// ============================================

interface AIProvider {
  readonly id: string;
  readonly name: string;
  readonly status: 'active' | 'inactive' | 'error';
  readonly model: string;
  readonly requestsToday: number;
  readonly avgResponseTime: number;
  readonly successRate: number;
  readonly costToday: number;
  readonly tokensUsed: number;
  readonly errors: number;
}

interface ProvidersResponse {
  readonly providers: readonly AIProvider[];
  readonly timestamp: string;
}

// ============================================
// HANDLER
// ============================================

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProvidersResponse | { error: string }>
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
    const since = new Date(Date.now() - hours * 60 * 60 * 1000);

    // Fetch provider statistics from database
    const [openaiStats, anthropicStats, googleStats, groqStats] = await Promise.all([
      getProviderStats('openai', since),
      getProviderStats('anthropic', since),
      getProviderStats('google', since),
      getProviderStats('groq', since),
    ]);

    const providers: AIProvider[] = [
      {
        id: 'openai',
        name: 'OpenAI',
        status: openaiStats.status,
        model: 'gpt-4-vision-preview',
        requestsToday: openaiStats.requests,
        avgResponseTime: openaiStats.avgResponseTime,
        successRate: openaiStats.successRate,
        costToday: openaiStats.cost,
        tokensUsed: openaiStats.tokens,
        errors: openaiStats.errors,
      },
      {
        id: 'anthropic',
        name: 'Anthropic',
        status: anthropicStats.status,
        model: 'claude-3-opus-20240229',
        requestsToday: anthropicStats.requests,
        avgResponseTime: anthropicStats.avgResponseTime,
        successRate: anthropicStats.successRate,
        costToday: anthropicStats.cost,
        tokensUsed: anthropicStats.tokens,
        errors: anthropicStats.errors,
      },
      {
        id: 'google',
        name: 'Google',
        status: googleStats.status,
        model: 'gemini-pro-vision',
        requestsToday: googleStats.requests,
        avgResponseTime: googleStats.avgResponseTime,
        successRate: googleStats.successRate,
        costToday: googleStats.cost,
        tokensUsed: googleStats.tokens,
        errors: googleStats.errors,
      },
      {
        id: 'groq',
        name: 'Groq',
        status: groqStats.status,
        model: 'llava-v1.5-7b-4096-preview',
        requestsToday: groqStats.requests,
        avgResponseTime: groqStats.avgResponseTime,
        successRate: groqStats.successRate,
        costToday: groqStats.cost,
        tokensUsed: groqStats.tokens,
        errors: groqStats.errors,
      },
    ];

    logger.info('AI providers fetched', {
      hours,
      providersCount: providers.length,
    });

    return res.status(200).json({
      providers,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Failed to fetch AI providers', { error });
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

interface ProviderStats {
  readonly status: 'active' | 'inactive' | 'error';
  readonly requests: number;
  readonly avgResponseTime: number;
  readonly successRate: number;
  readonly cost: number;
  readonly tokens: number;
  readonly errors: number;
}

async function getProviderStats(
  provider: string,
  since: Date
): Promise<ProviderStats> {
  try {
    // Fetch from AI usage logs table
    const logs = await prisma.aIUsageLog.findMany({
      where: {
        provider,
        createdAt: {
          gte: since,
        },
      },
      select: {
        success: true,
        responseTime: true,
        cost: true,
        tokensUsed: true,
      },
    });

    if (logs.length === 0) {
      return {
        status: 'inactive',
        requests: 0,
        avgResponseTime: 0,
        successRate: 0,
        cost: 0,
        tokens: 0,
        errors: 0,
      };
    }

    const requests = logs.length;
    const successfulRequests = logs.filter((log) => log.success).length;
    const totalResponseTime = logs.reduce((sum, log) => sum + log.responseTime, 0);
    const totalCost = logs.reduce((sum, log) => sum + log.cost, 0);
    const totalTokens = logs.reduce((sum, log) => sum + log.tokensUsed, 0);
    const errors = requests - successfulRequests;

    const avgResponseTime = totalResponseTime / requests;
    const successRate = successfulRequests / requests;

    // Determine status
    let status: 'active' | 'inactive' | 'error' = 'active';
    if (errors > requests * 0.5) {
      status = 'error'; // More than 50% error rate
    } else if (requests === 0) {
      status = 'inactive';
    }

    return {
      status,
      requests,
      avgResponseTime,
      successRate,
      cost: totalCost,
      tokens: totalTokens,
      errors,
    };
  } catch (error) {
    logger.error('Failed to get provider stats', { error, provider });
    return {
      status: 'error',
      requests: 0,
      avgResponseTime: 0,
      successRate: 0,
      cost: 0,
      tokens: 0,
      errors: 0,
    };
  }
}
