/**
 * AI Vision Data Export API
 * Export AI and vision data to CSV format
 *
 * @endpoint GET /api/admin/ai-vision/export
 * @auth Required (Admin only)
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import logger from '../../../../lib/logger';
import { prisma } from '../../../../lib/prisma';

// ============================================
// HANDLER
// ============================================

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
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
    const format = (req.query.format as string) || 'csv';
    const since = new Date(Date.now() - hours * 60 * 60 * 1000);

    if (format !== 'csv') {
      return res.status(400).json({ error: 'Only CSV format is supported' });
    }

    // Fetch data from database
    const [aiLogs, visionQueries] = await Promise.all([
      prisma.aIUsageLog.findMany({
        where: {
          createdAt: {
            gte: since,
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.visionSearchQuery.findMany({
        where: {
          createdAt: {
            gte: since,
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ]);

    // Generate CSV content
    const csvContent = generateCSV(aiLogs, visionQueries);

    // Set headers for file download
    const filename = `ai-vision-export-${new Date().toISOString()}.csv`;
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    logger.info('AI vision data exported', {
      hours,
      aiLogsCount: aiLogs.length,
      visionQueriesCount: visionQueries.length,
    });

    return res.status(200).send(csvContent);
  } catch (error) {
    logger.error('Failed to export AI vision data', { error });
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function generateCSV(aiLogs: any[], visionQueries: any[]): string {
  const lines: string[] = [];

  // AI Usage Logs Section
  lines.push('AI USAGE LOGS');
  lines.push('ID,Timestamp,Provider,Model,Success,Response Time (ms),Cost ($),Tokens Used,Error Message');

  for (const log of aiLogs) {
    const row = [
      log.id,
      log.createdAt.toISOString(),
      log.provider,
      log.model,
      log.success ? 'Yes' : 'No',
      log.responseTime.toString(),
      log.cost.toFixed(6),
      log.tokensUsed.toString(),
      log.errorMessage || '',
    ];
    lines.push(escapeCSVRow(row));
  }

  lines.push(''); // Empty line separator

  // Vision Search Queries Section
  lines.push('VISION SEARCH QUERIES');
  lines.push('ID,Timestamp,Image URL,Provider,Model,Results Count,Confidence,Response Time (ms),Cost ($),User ID');

  for (const query of visionQueries) {
    const row = [
      query.id,
      query.createdAt.toISOString(),
      query.imageUrl,
      query.provider,
      query.model,
      query.resultsCount.toString(),
      (query.confidence * 100).toFixed(2) + '%',
      query.responseTime.toString(),
      query.cost.toFixed(6),
      query.userId || 'Anonymous',
    ];
    lines.push(escapeCSVRow(row));
  }

  return lines.join('\n');
}

function escapeCSVRow(row: string[]): string {
  return row
    .map((field) => {
      // Escape fields containing comma, quote, or newline
      if (field.includes(',') || field.includes('"') || field.includes('\n')) {
        return `"${field.replace(/"/g, '""')}"`;
      }
      return field;
    })
    .join(',');
}
