import { logger } from '../../lib/logger/winston';
/**
 * Data Compression Utilities (Production-Grade)
 * Brotli compression for cache optimization
 * SERVER-SIDE ONLY - Uses Node.js zlib and Buffer
 * Backend Architect Agent Implementation
 */

// SERVER-SIDE ONLY: Check if running on server
const isServer = typeof window === 'undefined';

// Lazy load Node.js modules only on server
let brotliCompressAsync: any;
let brotliDecompressAsync: any;
let constants: any;

if (isServer) {
  const { promisify } = require('util');
  const { brotliCompress, brotliDecompress, constants: zlibConstants } = require('zlib');
  brotliCompressAsync = promisify(brotliCompress);
  brotliDecompressAsync = promisify(brotliDecompress);
  constants = zlibConstants;
}

// ==========================================
// COMPRESSION FUNCTIONS
// ==========================================

/**
 * Compress string using Brotli (highest compression ratio)
 * SERVER-SIDE ONLY
 */
export async function compress(data: string): Promise<string> {
  // Client-side: return data as-is (no compression)
  if (!isServer) {
    return data;
  }

  try {
    const { Buffer } = require('buffer');
    const buffer = Buffer.from(data, 'utf-8');
    const compressed = await brotliCompressAsync(buffer, {
      params: {
        [constants.BROTLI_PARAM_MODE]: constants.BROTLI_MODE_TEXT,
        [constants.BROTLI_PARAM_QUALITY]: constants.BROTLI_MAX_QUALITY, // Max compression
      },
    });
    return compressed.toString('base64');
  } catch (error) {
    // Return original if compression fails
    logger.error('Compression failed:', error);
    return data;
  }
}

/**
 * Decompress Brotli-compressed string
 * SERVER-SIDE ONLY
 */
export async function decompress(compressedData: string): Promise<string> {
  // Client-side: return data as-is (assume it's not compressed)
  if (!isServer) {
    return compressedData;
  }

  try {
    const { Buffer } = require('buffer');
    const buffer = Buffer.from(compressedData, 'base64');
    const decompressed = await brotliDecompressAsync(buffer);
    return decompressed.toString('utf-8');
  } catch (error) {
    // Return original if decompression fails
    logger.error('Decompression failed:', error);
    return compressedData;
  }
}

/**
 * Calculate compression ratio
 * SERVER-SIDE ONLY
 */
export function getCompressionRatio(original: string, compressed: string): number {
  // Client-side: return 1.0 (no compression)
  if (!isServer) {
    return 1.0;
  }

  const { Buffer } = require('buffer');
  const originalSize = Buffer.from(original, 'utf-8').length;
  const compressedSize = Buffer.from(compressed, 'base64').length;
  return compressedSize / originalSize;
}

/**
 * Check if compression is beneficial (> 20% size reduction)
 * SERVER-SIDE ONLY
 */
export async function shouldCompress(data: string): Promise<boolean> {
  // Client-side: never compress
  if (!isServer) {
    return false;
  }

  const { Buffer } = require('buffer');
  const originalSize = Buffer.from(data, 'utf-8').length;

  // Don't compress small data (< 1KB)
  if (originalSize < 1024) return false;

  // Sample compression check (first 1KB)
  const sample = data.substring(0, Math.min(1024, data.length));
  const compressed = await compress(sample);
  const ratio = getCompressionRatio(sample, compressed);

  return ratio < 0.8; // Compress if > 20% reduction
}
