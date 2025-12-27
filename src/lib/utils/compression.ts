/**
 * Data Compression Utilities (Production-Grade)
 * Brotli compression for cache optimization
 * Backend Architect Agent Implementation
 */

import { promisify } from 'util';
import { brotliCompress as brotliCompressCallback, brotliDecompress as brotliDecompressCallback, constants } from 'zlib';

const brotliCompressAsync = promisify(brotliCompressCallback);
const brotliDecompressAsync = promisify(brotliDecompressCallback);

// ==========================================
// COMPRESSION FUNCTIONS
// ==========================================

/**
 * Compress string using Brotli (highest compression ratio)
 */
export async function compress(data: string): Promise<string> {
  try {
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
    console.error('Compression failed:', error);
    return data;
  }
}

/**
 * Decompress Brotli-compressed string
 */
export async function decompress(compressedData: string): Promise<string> {
  try {
    const buffer = Buffer.from(compressedData, 'base64');
    const decompressed = await brotliDecompressAsync(buffer);
    return decompressed.toString('utf-8');
  } catch (error) {
    // Return original if decompression fails
    console.error('Decompression failed:', error);
    return compressedData;
  }
}

/**
 * Calculate compression ratio
 */
export function getCompressionRatio(original: string, compressed: string): number {
  const originalSize = Buffer.from(original, 'utf-8').length;
  const compressedSize = Buffer.from(compressed, 'base64').length;
  return compressedSize / originalSize;
}

/**
 * Check if compression is beneficial (> 20% size reduction)
 */
export async function shouldCompress(data: string): Promise<boolean> {
  const originalSize = Buffer.from(data, 'utf-8').length;

  // Don't compress small data (< 1KB)
  if (originalSize < 1024) return false;

  // Sample compression check (first 1KB)
  const sample = data.substring(0, Math.min(1024, data.length));
  const compressed = await compress(sample);
  const ratio = getCompressionRatio(sample, compressed);

  return ratio < 0.8; // Compress if > 20% reduction
}
