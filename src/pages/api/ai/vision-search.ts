/**
 * Vision Search API Endpoint
 * Image-based destination discovery powered by multi-modal AI
 *
 * @endpoint POST /api/ai/vision-search
 * @performance < 2s response time (p95)
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { VisionSearchService, VisionSearchResult } from '../../../lib/ai/vision-search-service';
import logger from '../../../lib/logger';
import formidable, { File } from 'formidable';
import fs from 'fs/promises';
import path from 'path';

// Disable body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// Rate limiting
const rateLimits = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // requests per minute
const RATE_WINDOW = 60 * 1000; // 1 minute
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

interface VisionSearchRequest {
  imageUrl?: string;
  locale?: string;
  includeActivities?: boolean;
  includeSimilar?: boolean;
  provider?: 'openai' | 'anthropic' | 'google';
}

interface VisionSearchResponse {
  success: boolean;
  result?: VisionSearchResult;
  error?: string;
}

/**
 * Check rate limit
 */
function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const limit = rateLimits.get(identifier);

  if (!limit || now > limit.resetTime) {
    rateLimits.set(identifier, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }

  if (limit.count >= RATE_LIMIT) {
    return false;
  }

  limit.count++;
  return true;
}

/**
 * Parse multipart form data
 */
async function parseForm(
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
  return new Promise((resolve, reject) => {
    const form = formidable({
      maxFileSize: MAX_FILE_SIZE,
      keepExtensions: true,
      allowEmptyFiles: false,
    });

    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

/**
 * Convert uploaded file to base64 data URI
 */
async function fileToDataUri(file: File): Promise<string> {
  const buffer = await fs.readFile(file.filepath);
  const base64 = buffer.toString('base64');

  // Detect MIME type from extension
  const ext = path.extname(file.originalFilename || '').toLowerCase();
  const mimeTypes: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif'
  };

  const mimeType = mimeTypes[ext] || 'image/jpeg';

  return `data:${mimeType};base64,${base64}`;
}

/**
 * Main handler
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VisionSearchResponse>
) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Use POST.',
    });
  }

  let imageSource: string | undefined;
  let options: Omit<VisionSearchRequest, 'imageUrl'> = {};

  try {
    // Rate limiting
    const rateLimitKey = req.socket.remoteAddress || 'unknown';
    if (!checkRateLimit(rateLimitKey)) {
      return res.status(429).json({
        success: false,
        error: 'Rate limit exceeded. Please try again in a minute.',
      });
    }

    // Check if it's multipart form data (file upload) or JSON
    const contentType = req.headers['content-type'] || '';

    if (contentType.includes('multipart/form-data')) {
      // Handle file upload
      const { fields, files } = await parseForm(req);

      // Get image file
      const imageFile = files.image;
      if (!imageFile) {
        return res.status(400).json({
          success: false,
          error: 'No image file provided. Include "image" field in form data.',
        });
      }

      const file = Array.isArray(imageFile) ? imageFile[0] : imageFile;
      if (!file) {
        return res.status(400).json({
          success: false,
          error: 'Invalid image file.',
        });
      }

      // Validate file type
      if (!file.mimetype?.startsWith('image/')) {
        return res.status(400).json({
          success: false,
          error: 'File must be an image (JPEG, PNG, WebP, GIF).',
        });
      }

      // Convert to data URI
      imageSource = await fileToDataUri(file);

      // Clean up temp file
      try {
        await fs.unlink(file.filepath);
      } catch (error) {
        logger.warn('Failed to delete temp file', { error });
      }

      // Parse options from fields
      options = {
        locale: Array.isArray(fields.locale) ? fields.locale[0] : fields.locale,
        includeActivities: fields.includeActivities === 'true',
        includeSimilar: fields.includeSimilar === 'true',
        provider: (Array.isArray(fields.provider) ? fields.provider[0] : fields.provider) as any,
      };

    } else {
      // Handle JSON body
      const body: VisionSearchRequest = req.body;

      if (!body.imageUrl || typeof body.imageUrl !== 'string') {
        return res.status(400).json({
          success: false,
          error: 'imageUrl is required and must be a string (URL or data URI).',
        });
      }

      imageSource = body.imageUrl;
      options = {
        locale: body.locale,
        includeActivities: body.includeActivities,
        includeSimilar: body.includeSimilar,
        provider: body.provider,
      };
    }

    // Validate image source
    if (!imageSource) {
      return res.status(400).json({
        success: false,
        error: 'No image provided.',
      });
    }

    // Validate image URL/data URI format
    const isValidUrl = /^https?:\/\/.+/.test(imageSource);
    const isValidDataUri = /^data:image\/.+;base64,.+/.test(imageSource);

    if (!isValidUrl && !isValidDataUri) {
      return res.status(400).json({
        success: false,
        error: 'Invalid image source. Provide a valid URL or base64 data URI.',
      });
    }

    logger.info('Vision search request', {
      source: isValidUrl ? 'url' : 'upload',
      locale: options.locale,
      provider: options.provider
    });

    // Initialize vision search service
    const visionService = new VisionSearchService({
      provider: options.provider,
    });

    // Analyze image
    const result = await visionService.analyzeImage(imageSource, {
      locale: options.locale || 'en',
      includeActivities: options.includeActivities ?? true,
      includeSimilar: options.includeSimilar ?? true,
    });

    logger.info('Vision search completed', {
      destination: result.destination.name,
      confidence: result.confidence,
      provider: result.metadata.provider,
      processingTime: result.metadata.processingTime
    });

    return res.status(200).json({
      success: true,
      result,
    });

  } catch (error) {
    logger.error('Vision search error', { error });

    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';

    // Clean up temp file if exists
    if (imageSource?.startsWith('/tmp/')) {
      try {
        await fs.unlink(imageSource);
      } catch (cleanupError) {
        // Ignore cleanup errors
      }
    }

    return res.status(500).json({
      success: false,
      error: errorMessage,
    });
  }
}
