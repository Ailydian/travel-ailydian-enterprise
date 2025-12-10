// Cloudinary Configuration and Utilities

import { v2 as cloudinary } from 'cloudinary';

// Initialize Cloudinary
if (process.env.CLOUDINARY_CLOUD_NAME) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

/**
 * Upload image to Cloudinary
 */
export const uploadToCloudinary = async (
  fileBuffer: Buffer | string,
  options: {
    folder?: string;
    transformation?: any;
    public_id?: string;
  } = {}
): Promise<{
  url: string;
  secureUrl: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
}> => {
  try {
    const result = await cloudinary.uploader.upload(
      typeof fileBuffer === 'string' ? fileBuffer : `data:image/jpeg;base64,${fileBuffer.toString('base64')}`,
      {
        folder: options.folder || 'visual-search',
        transformation: options.transformation,
        public_id: options.public_id,
        resource_type: 'image',
      }
    );

    return {
      url: result.url,
      secureUrl: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
};

/**
 * Delete image from Cloudinary
 */
export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Failed to delete image from Cloudinary');
  }
};

/**
 * Generate optimized image URL
 */
export const getOptimizedImageUrl = (
  publicId: string,
  options: {
    width?: number;
    height?: number;
    crop?: 'fill' | 'fit' | 'scale' | 'thumb';
    quality?: number;
    format?: 'auto' | 'webp' | 'jpg' | 'png';
  } = {}
): string => {
  const {
    width = 800,
    height = 600,
    crop = 'fill',
    quality = 80,
    format = 'auto',
  } = options;

  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    return '';
  }

  const transformations = [
    `w_${width}`,
    `h_${height}`,
    `c_${crop}`,
    `q_${quality}`,
    `f_${format}`,
  ].join(',');

  return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${transformations}/${publicId}`;
};

/**
 * Generate thumbnail URL
 */
export const getThumbnailUrl = (publicId: string, size: number = 200): string => {
  return getOptimizedImageUrl(publicId, {
    width: size,
    height: size,
    crop: 'thumb',
    quality: 80,
  });
};

/**
 * Extract public ID from Cloudinary URL
 */
export const extractPublicId = (url: string): string | null => {
  const match = url.match(/\/v\d+\/(.+)\.\w+$/);
  return match ? match[1] : null;
};

/**
 * Upload image from URL
 */
export const uploadFromUrl = async (
  imageUrl: string,
  folder: string = 'visual-search'
): Promise<{
  url: string;
  secureUrl: string;
  publicId: string;
}> => {
  try {
    const result = await cloudinary.uploader.upload(imageUrl, {
      folder,
      resource_type: 'image',
    });

    return {
      url: result.url,
      secureUrl: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error('Cloudinary URL upload error:', error);
    throw new Error('Failed to upload image from URL');
  }
};

export default cloudinary;
