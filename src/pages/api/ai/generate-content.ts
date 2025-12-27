import type { NextApiRequest, NextApiResponse } from 'next';
import logger from '../../../lib/logger';
import {
  generateAIContent,
  generateBatchContent,
  calculateContentQuality,
  exportContentJSON,
  generateHTMLPreview,
  type ContentRequest,
  type GeneratedContent
} from '@/lib/aiContentWriter';

/**
 * AI Content Generation API
 *
 * Endpoints:
 * POST /api/ai/generate-content - Single content generation
 * POST /api/ai/generate-content?batch=true - Batch generation
 * POST /api/ai/generate-content?preview=html - Generate HTML preview
 *
 * Features:
 * - SEO-optimized content
 * - Multi-type support (hotel, car, tour, transfer, vehicle, property)
 * - Quality scoring
 * - Batch processing
 * - HTML preview
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { batch, preview } = req.query;

    // Batch generation
    if (batch === 'true') {
      const requests: ContentRequest[] = req.body.requests;

      if (!requests || !Array.isArray(requests)) {
        return res.status(400).json({ error: 'Invalid batch request format' });
      }

      const results = generateBatchContent(requests);
      const quality = results.map(content => calculateContentQuality(content));

      return res.status(200).json({
        success: true,
        count: results.length,
        results,
        quality
      });
    }

    // Single generation
    const request: ContentRequest = req.body;

    // Validate request
    if (!request.type || !request.name || !request.location) {
      return res.status(400).json({
        error: 'Missing required fields: type, name, location'
      });
    }

    // Generate content
    const content = generateAIContent(request);

    // Calculate quality score
    const quality = calculateContentQuality(content);

    // HTML preview
    if (preview === 'html') {
      const html = generateHTMLPreview(content);
      return res.status(200).json({
        success: true,
        content,
        quality,
        html
      });
    }

    // JSON export
    if (preview === 'json') {
      const json = exportContentJSON(content);
      return res.status(200).json({
        success: true,
        content,
        quality,
        export: json
      });
    }

    // Default response
    return res.status(200).json({
      success: true,
      content,
      quality,
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    logger.error('AI Content Generation error:', error as Error, {component:'GenerateContent'});
    return res.status(500).json({
      error: 'Content generation failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
