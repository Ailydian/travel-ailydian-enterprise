import { NextApiRequest, NextApiResponse } from 'next';
import { gzipSync, brotliCompressSync } from 'zlib';
import { logger } from '../logger/winston';

/**
 * PRODUCTION-GRADE COMPRESSION MIDDLEWARE
 *
 * Features:
 * - Automatic gzip and brotli compression
 * - Content-type based compression
 * - Configurable compression thresholds
 * - Performance metrics
 * - Compression ratio logging
 */

export interface CompressionOptions {
  threshold?: number; // Minimum response size to compress (bytes)
  level?: number; // Compression level (1-9 for gzip, 0-11 for brotli)
  filter?: (req: NextApiRequest, res: NextApiResponse) => boolean;
}

const DEFAULT_OPTIONS: Required<CompressionOptions> = {
  threshold: 1024, // 1 KB
  level: 6, // Balanced compression
  filter: (req, res) => {
    const contentType = res.getHeader('content-type') as string;

    // Compress text-based responses
    return (
      contentType &&
      (contentType.includes('text/') ||
        contentType.includes('application/json') ||
        contentType.includes('application/javascript') ||
        contentType.includes('application/xml'))
    );
  },
};

/**
 * Determine best compression algorithm based on Accept-Encoding header
 */
function getBestEncoding(req: NextApiRequest): 'br' | 'gzip' | null {
  const acceptEncoding = req.headers['accept-encoding'] as string;

  if (!acceptEncoding) {
    return null;
  }

  // Prefer Brotli (better compression ratio)
  if (acceptEncoding.includes('br')) {
    return 'br';
  }

  // Fallback to gzip (better browser support)
  if (acceptEncoding.includes('gzip')) {
    return 'gzip';
  }

  return null;
}

/**
 * Compress data using specified algorithm
 */
function compressData(
  data: Buffer,
  encoding: 'br' | 'gzip',
  level: number
): Buffer {
  if (encoding === 'br') {
    return brotliCompressSync(data, {
      params: {
        [0]: level, // BROTLI_PARAM_QUALITY
      },
    });
  } else {
    return gzipSync(data, { level });
  }
}

/**
 * Compression middleware wrapper
 */
export function withCompression(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>,
  options: CompressionOptions = {}
): (req: NextApiRequest, res: NextApiResponse) => Promise<void> {
  const config = { ...DEFAULT_OPTIONS, ...options };

  return async (req: NextApiRequest, res: NextApiResponse) => {
    // Original json method
    const originalJson = res.json.bind(res);

    // Override json method to intercept response
    res.json = function (data: any) {
      const encoding = getBestEncoding(req);

      // No compression support
      if (!encoding) {
        return originalJson(data);
      }

      // Check if should compress
      if (!config.filter(req, res)) {
        return originalJson(data);
      }

      // Convert data to buffer
      const jsonString = JSON.stringify(data);
      const originalBuffer = Buffer.from(jsonString, 'utf-8');
      const originalSize = originalBuffer.length;

      // Check threshold
      if (originalSize < config.threshold) {
        return originalJson(data);
      }

      try {
        // Compress data
        const startTime = Date.now();
        const compressedBuffer = compressData(
          originalBuffer,
          encoding,
          config.level
        );
        const compressionTime = Date.now() - startTime;

        const compressedSize = compressedBuffer.length;
        const ratio = ((1 - compressedSize / originalSize) * 100).toFixed(2);

        // Set compression headers
        res.setHeader('Content-Encoding', encoding);
        res.setHeader('Content-Length', compressedSize);
        res.setHeader('Vary', 'Accept-Encoding');

        // Log compression metrics
        logger.debug('Response compressed', {
          encoding,
          originalSize: `${(originalSize / 1024).toFixed(2)} KB`,
          compressedSize: `${(compressedSize / 1024).toFixed(2)} KB`,
          ratio: `${ratio}%`,
          time: `${compressionTime}ms`,
        });

        // Send compressed response
        res.setHeader('Content-Type', 'application/json');
        res.status(res.statusCode || 200);
        return res.end(compressedBuffer);
      } catch (error) {
        logger.error('Compression error', error as Error);
        // Fallback to uncompressed response
        return originalJson(data);
      }
    };

    // Call original handler
    await handler(req, res);
  };
}

/**
 * Alternative: Manual compression for specific responses
 */
export function compressResponse(
  res: NextApiResponse,
  data: any,
  req: NextApiRequest
): void {
  const encoding = getBestEncoding(req);

  if (!encoding) {
    res.json(data);
    return;
  }

  const jsonString = JSON.stringify(data);
  const originalBuffer = Buffer.from(jsonString, 'utf-8');
  const compressedBuffer = compressData(originalBuffer, encoding, 6);

  res.setHeader('Content-Encoding', encoding);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Length', compressedBuffer.length);
  res.setHeader('Vary', 'Accept-Encoding');

  res.status(200).end(compressedBuffer);
}

/**
 * Compression statistics
 */
export class CompressionStats {
  private static stats = {
    totalRequests: 0,
    compressedRequests: 0,
    totalOriginalSize: 0,
    totalCompressedSize: 0,
    totalCompressionTime: 0,
  };

  static record(
    originalSize: number,
    compressedSize: number,
    time: number
  ): void {
    this.stats.totalRequests++;
    this.stats.compressedRequests++;
    this.stats.totalOriginalSize += originalSize;
    this.stats.totalCompressedSize += compressedSize;
    this.stats.totalCompressionTime += time;
  }

  static getStats() {
    const compressionRatio =
      this.stats.totalOriginalSize > 0
        ? (
            (1 -
              this.stats.totalCompressedSize / this.stats.totalOriginalSize) *
            100
          ).toFixed(2)
        : '0';

    const avgCompressionTime =
      this.stats.compressedRequests > 0
        ? (
            this.stats.totalCompressionTime / this.stats.compressedRequests
          ).toFixed(2)
        : '0';

    return {
      totalRequests: this.stats.totalRequests,
      compressedRequests: this.stats.compressedRequests,
      compressionRate: (
        (this.stats.compressedRequests / this.stats.totalRequests) *
        100
      ).toFixed(2),
      totalOriginalSize: this.stats.totalOriginalSize,
      totalCompressedSize: this.stats.totalCompressedSize,
      totalSaved: this.stats.totalOriginalSize - this.stats.totalCompressedSize,
      averageCompressionRatio: compressionRatio,
      averageCompressionTime: avgCompressionTime,
    };
  }

  static reset(): void {
    this.stats = {
      totalRequests: 0,
      compressedRequests: 0,
      totalOriginalSize: 0,
      totalCompressedSize: 0,
      totalCompressionTime: 0,
    };
  }
}

export default withCompression;
