// Image Processing Utilities

/**
 * Resize image to max dimensions while maintaining aspect ratio
 */
export const resizeImage = (
  file: File,
  maxWidth: number = 1920,
  maxHeight: number = 1080,
  quality: number = 0.85
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to create blob'));
            }
          },
          'image/jpeg',
          quality
        );
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

/**
 * Convert File to base64 string
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

/**
 * Convert blob to File
 */
export const blobToFile = (blob: Blob, fileName: string): File => {
  return new File([blob], fileName, { type: blob.type });
};

/**
 * Validate image file
 */
export const validateImageFile = (
  file: File,
  maxSizeMB: number = 5
): { valid: boolean; error?: string } => {
  // Check file type
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Please upload JPG, PNG, or WebP images.',
    };
  }

  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: `File size exceeds ${maxSizeMB}MB limit.`,
    };
  }

  return { valid: true };
};

/**
 * Create image thumbnail
 */
export const createThumbnail = (
  file: File,
  size: number = 200
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        // Calculate dimensions for square thumbnail
        const minDim = Math.min(img.width, img.height);
        const sx = (img.width - minDim) / 2;
        const sy = (img.height - minDim) / 2;

        canvas.width = size;
        canvas.height = size;

        ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size);

        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

/**
 * Extract dominant colors from image
 */
export const extractDominantColors = (
  imageUrl: string,
  colorCount: number = 5
): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      // Use smaller canvas for performance
      const size = 150;
      canvas.width = size;
      canvas.height = size;

      ctx.drawImage(img, 0, 0, size, size);

      const imageData = ctx.getImageData(0, 0, size, size);
      const pixels = imageData.data;

      // Simple color extraction (could be improved with k-means clustering)
      const colorMap: { [key: string]: number } = {};

      for (let i = 0; i < pixels.length; i += 16) {
        // Skip every 4th pixel for performance
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const a = pixels[i + 3];

        // Skip transparent and very light/dark pixels
        if (a < 125 || (r + g + b) / 3 > 240 || (r + g + b) / 3 < 15) {
          continue;
        }

        // Round to nearest 32 to group similar colors
        const rRounded = Math.round(r / 32) * 32;
        const gRounded = Math.round(g / 32) * 32;
        const bRounded = Math.round(b / 32) * 32;

        const color = `rgb(${rRounded}, ${gRounded}, ${bRounded})`;
        colorMap[color] = (colorMap[color] || 0) + 1;
      }

      // Sort by frequency and get top colors
      const colors = Object.entries(colorMap)
        .sort(([, a], [, b]) => b - a)
        .slice(0, colorCount)
        .map(([color]) => color);

      resolve(colors);
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = imageUrl;
  });
};

/**
 * Convert RGB to HEX
 */
export const rgbToHex = (rgb: string): string => {
  const result = rgb.match(/\d+/g);
  if (!result || result.length < 3) return '#000000';

  const r = parseInt(result[0]);
  const g = parseInt(result[1]);
  const b = parseInt(result[2]);

  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
};

/**
 * Compress image for upload
 */
export const compressImage = async (
  file: File,
  maxSizeMB: number = 1
): Promise<File> => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  if (file.size <= maxSizeBytes) {
    return file;
  }

  // Start with high quality and reduce if needed
  let quality = 0.9;
  let compressedBlob = await resizeImage(file, 1920, 1080, quality);

  while (compressedBlob.size > maxSizeBytes && quality > 0.1) {
    quality -= 0.1;
    compressedBlob = await resizeImage(file, 1920, 1080, quality);
  }

  return blobToFile(compressedBlob, file.name);
};

/**
 * Get image dimensions
 */
export const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

/**
 * Format file size for display
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};
