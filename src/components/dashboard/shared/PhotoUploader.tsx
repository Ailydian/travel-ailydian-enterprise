import React, { useState, useRef, useCallback } from 'react';
import logger from '../../../lib/logger';
import {
  Upload,
  X,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  Star,
  GripVertical,
  Loader } from
'lucide-react';

/**
 * Uploaded image with metadata
 */
export interface UploadedImage {
  /** Unique identifier */
  id: string;
  /** File object */
  file: File;
  /** Preview URL (base64 or object URL) */
  preview: string;
  /** Upload progress (0-100) */
  progress: number;
  /** Upload status */
  status: 'uploading' | 'success' | 'error';
  /** Error message if failed */
  error?: string;
  /** Whether this is the cover photo */
  isCover?: boolean;
  /** Compressed file (if compression was applied) */
  compressedFile?: File;
}

/**
 * Validation requirements
 */
export interface ValidationRequirements {
  /** Minimum number of photos required */
  minPhotos?: number;
  /** Maximum number of photos allowed */
  maxPhotos?: number;
  /** Maximum file size in bytes */
  maxFileSize?: number;
  /** Minimum image width in pixels */
  minWidth?: number;
  /** Minimum image height in pixels */
  minHeight?: number;
  /** Allowed file types */
  allowedTypes?: string[];
  /** Enable image compression */
  enableCompression?: boolean;
  /** Compression quality (0-1) */
  compressionQuality?: number;
  /** Max dimension for compression */
  maxDimension?: number;
}

/**
 * Props for the PhotoUploader component
 */
export interface PhotoUploaderProps {
  /** Current uploaded images */
  images: UploadedImage[];
  /** Handler when images change */
  onChange: (images: UploadedImage[]) => void;
  /** Validation requirements */
  requirements?: ValidationRequirements;
  /** Custom upload function (returns promise with uploaded URL) */
  onUpload?: (file: File, onProgress: (progress: number) => void) => Promise<string>;
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const DEFAULT_REQUIREMENTS: ValidationRequirements = {
  minPhotos: 5,
  maxPhotos: 20,
  maxFileSize: 10 * 1024 * 1024, // 10MB
  minWidth: 1920,
  minHeight: 1080,
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
  enableCompression: true,
  compressionQuality: 0.85,
  maxDimension: 2400
};

/**
 * PhotoUploader - Advanced photo upload component with drag & drop, compression, and reordering
 *
 * @example
 * ```tsx
 * const [images, setImages] = useState<UploadedImage[]>([]);
 *
 * <PhotoUploader
 *   images={images}
 *   onChange={setImages}
 *   requirements={{
 *     minPhotos: 5,
 *     maxPhotos: 15,
 *     maxFileSize: 10 * 1024 * 1024,
 *   }}
 *   onUpload={async (file, onProgress) => {
 *     // Your upload logic here
 *     return uploadedUrl;
 *   }}
 * />
 * ```
 */
export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  images,
  onChange,
  requirements = {},
  onUpload,
  disabled = false,
  className = ''
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const reqs = { ...DEFAULT_REQUIREMENTS, ...requirements };

  /**
   * Compress image using canvas
   */
  const compressImage = useCallback(
    async (file: File): Promise<File> => {
      if (!reqs.enableCompression) return file;

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          const img = new Image();
          img.src = e.target?.result as string;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            let { width, height } = img;

            // Calculate new dimensions
            const maxDim = reqs.maxDimension || 2400;
            if (width > maxDim || height > maxDim) {
              if (width > height) {
                height = height / width * maxDim;
                width = maxDim;
              } else {
                width = width / height * maxDim;
                height = maxDim;
              }
            }

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            if (!ctx) {
              reject(new Error('Could not get canvas context'));
              return;
            }

            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(
              (blob) => {
                if (!blob) {
                  reject(new Error('Could not compress image'));
                  return;
                }

                const compressedFile = new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now()
                });

                // Only use compressed version if it's smaller
                resolve(
                  compressedFile.size < file.size ? compressedFile : file
                );
              },
              file.type,
              reqs.compressionQuality || 0.85
            );
          };
          img.onerror = () => reject(new Error('Could not load image'));
        };
        reader.onerror = () => reject(new Error('Could not read file'));
      });
    },
    [reqs.enableCompression, reqs.compressionQuality, reqs.maxDimension]
  );

  /**
   * Validate image file
   */
  const validateImage = useCallback(
    async (file: File): Promise<{valid: boolean;error?: string;}> => {
      // Check file type
      if (
      reqs.allowedTypes &&
      !reqs.allowedTypes.includes(file.type))
      {
        return {
          valid: false,
          error: `Invalid file type. Allowed: ${reqs.allowedTypes.join(', ')}`
        };
      }

      // Check file size
      if (reqs.maxFileSize && file.size > reqs.maxFileSize) {
        return {
          valid: false,
          error: `File too large. Max size: ${(reqs.maxFileSize / 1024 / 1024).toFixed(0)}MB`
        };
      }

      // Check dimensions
      if (reqs.minWidth || reqs.minHeight) {
        const dimensions = await getImageDimensions(file);
        if (
        reqs.minWidth &&
        dimensions.width < reqs.minWidth)
        {
          return {
            valid: false,
            error: `Image width too small. Minimum: ${reqs.minWidth}px`
          };
        }
        if (
        reqs.minHeight &&
        dimensions.height < reqs.minHeight)
        {
          return {
            valid: false,
            error: `Image height too small. Minimum: ${reqs.minHeight}px`
          };
        }
      }

      return { valid: true };
    },
    [reqs.allowedTypes, reqs.maxFileSize, reqs.minWidth, reqs.minHeight]
  );

  /**
   * Get image dimensions from file
   */
  const getImageDimensions = (
  file: File)
  : Promise<{width: number;height: number;}> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve({ width: img.width, height: img.height });
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Could not load image'));
      };
      img.src = url;
    });
  };

  /**
   * Process and add files
   */
  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files);
      const newErrors: string[] = [];
      const newImages: UploadedImage[] = [];

      // Check max photos limit
      if (
      reqs.maxPhotos &&
      images.length + fileArray.length > reqs.maxPhotos)
      {
        newErrors.push(
          `Maximum ${reqs.maxPhotos} photos allowed. You can only add ${reqs.maxPhotos - images.length} more.`
        );
        setErrors(newErrors);
        return;
      }

      for (const file of fileArray) {
        // Validate
        const validation = await validateImage(file);
        if (!validation.valid) {
          newErrors.push(`${file.name}: ${validation.error}`);
          continue;
        }

        // Create preview
        const preview = URL.createObjectURL(file);

        // Create image object
        const uploadedImage: UploadedImage = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          file,
          preview,
          progress: 0,
          status: 'uploading',
          isCover: images.length === 0 && newImages.length === 0
        };

        newImages.push(uploadedImage);

        // Compress in background
        compressImage(file).
        then((compressedFile) => {
          uploadedImage.compressedFile = compressedFile;
        }).
        catch((err) => {
          logger.error('Compression failed:', err as Error, { component: 'Photouploader' });
        });

        // Upload if handler provided
        if (onUpload) {
          onUpload(file, (progress) => {
            uploadedImage.progress = progress;
            onChange([...images, ...newImages]);
          }).
          then(() => {
            uploadedImage.status = 'success';
            uploadedImage.progress = 100;
            onChange([...images, ...newImages]);
          }).
          catch((err) => {
            uploadedImage.status = 'error';
            uploadedImage.error = err.message;
            onChange([...images, ...newImages]);
          });
        } else {
          // No upload handler, mark as success immediately
          uploadedImage.status = 'success';
          uploadedImage.progress = 100;
        }
      }

      setErrors(newErrors);
      onChange([...images, ...newImages]);
    },
    [images, onChange, validateImage, compressImage, onUpload, reqs.maxPhotos]
  );

  /**
   * Handle file input change
   */
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  /**
   * Handle drag and drop
   */
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  /**
   * Remove image
   */
  const handleRemoveImage = (id: string) => {
    const updatedImages = images.filter((img) => img.id !== id);

    // If removed image was cover, make first image the cover
    if (updatedImages.length > 0) {
      const hadCover = images.find((img) => img.id === id)?.isCover;
      if (hadCover) {
        updatedImages[0].isCover = true;
      }
    }

    // Cleanup preview URL
    const image = images.find((img) => img.id === id);
    if (image?.preview.startsWith('blob:')) {
      URL.revokeObjectURL(image.preview);
    }

    onChange(updatedImages);
  };

  /**
   * Set cover image
   */
  const handleSetCover = (id: string) => {
    const updatedImages = images.map((img) => ({
      ...img,
      isCover: img.id === id
    }));
    onChange(updatedImages);
  };

  /**
   * Handle image reordering
   */
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragEnter = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) return;

    const updatedImages = [...images];
    const [draggedItem] = updatedImages.splice(draggedIndex, 1);
    updatedImages.splice(index, 0, draggedItem);

    setDraggedIndex(index);
    onChange(updatedImages);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const meetsMinRequirement =
  !reqs.minPhotos || images.length >= reqs.minPhotos;

  return (
    <div className={className}>
      {/* Requirements Display */}
      <div className="mb-4 p-4 bg-lydian-primary-lighter border border-blue-200 rounded-lg">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">
          Photo Requirements
        </h4>
        <ul className="text-xs text-blue-800 space-y-1">
          {reqs.minPhotos &&
          <li className="flex items-center">
              {images.length >= reqs.minPhotos ?
            <CheckCircle className="h-3 w-3 text-lydian-success mr-1" /> :

            <AlertCircle className="h-3 w-3 text-lydian-warning mr-1" />
            }
              Minimum {reqs.minPhotos} photos (
              {images.length}/{reqs.minPhotos})
            </li>
          }
          {reqs.maxPhotos &&
          <li className="flex items-center">
              <CheckCircle className="h-3 w-3 text-lydian-success mr-1" />
              Maximum {reqs.maxPhotos} photos
            </li>
          }
          {reqs.minWidth && reqs.minHeight &&
          <li className="flex items-center">
              <CheckCircle className="h-3 w-3 text-lydian-success mr-1" />
              Minimum dimensions: {reqs.minWidth}x{reqs.minHeight}px
            </li>
          }
          {reqs.maxFileSize &&
          <li className="flex items-center">
              <CheckCircle className="h-3 w-3 text-lydian-success mr-1" />
              Maximum file size:{' '}
              {(reqs.maxFileSize / 1024 / 1024).toFixed(0)}MB per image
            </li>
          }
          {reqs.allowedTypes &&
          <li className="flex items-center">
              <CheckCircle className="h-3 w-3 text-lydian-success mr-1" />
              Allowed formats: JPG, PNG, WebP
            </li>
          }
        </ul>
      </div>

      {/* Error Messages */}
      {errors.length > 0 &&
      <div className="mb-4 p-4 bg-lydian-error-lighter border border-red-200 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-lydian-primary mr-2 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-red-900 mb-1">
                Upload Errors
              </h4>
              <ul className="text-xs text-red-800 space-y-1">
                {errors.map((error, index) =>
              <li key={index}>{error}</li>
              )}
              </ul>
            </div>
            <button
            onClick={() => setErrors([])}
            className="text-lydian-primary hover:text-red-800">

              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      }

      {/* Upload Zone */}
      {(!reqs.maxPhotos || images.length < reqs.maxPhotos) &&
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        isDragging ?
        'border-blue-500 bg-blue-50' :
        'border-gray-300 bg-white/5'} ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-blue-400 hover:bg-blue-50'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}>

          <Upload
          className={`h-12 w-12 mx-auto mb-4 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />

          <p className="text-sm font-medium text-lydian-text-inverse mb-1">
            {isDragging ?
          'Drop your images here' :
          'Drag & drop images here, or click to browse'}
          </p>
          <p className="text-xs text-lydian-text-muted">
            {reqs.allowedTypes?.join(', ').replace(/image\//g, '').toUpperCase()}{' '}
            up to {(reqs.maxFileSize || 0) / 1024 / 1024}MB each
          </p>

          <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={reqs.allowedTypes?.join(',')}
          onChange={handleFileInputChange}
          className="hidden"
          disabled={disabled} />

        </div>
      }

      {/* Image Grid */}
      {images.length > 0 &&
      <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-lydian-text-inverse">
              Uploaded Photos ({images.length}
              {reqs.maxPhotos && `/${reqs.maxPhotos}`})
            </h4>
            <p className="text-xs text-lydian-text-muted">
              Drag to reorder • Click star to set cover photo
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images.map((image, index) =>
          <div
            key={image.id}
            draggable={!disabled}
            onDragStart={() => handleDragStart(index)}
            onDragEnter={() => handleDragEnter(index)}
            onDragEnd={handleDragEnd}
            className={`relative group rounded-lg overflow-hidden border-2 transition-all ${
            image.isCover ?
            'border-blue-500 ring-2 ring-blue-500' :
            'border-gray-200 hover:border-gray-300'} ${
            draggedIndex === index ? 'opacity-50' : ''}`}>

                {/* Image */}
                <div className="aspect-square bg-lydian-glass-dark-medium">
                  <img
                src={image.preview}
                alt={`Upload ${index + 1}`}
                className="w-full h-full object-cover" />

                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-2">
                    {/* Set as Cover */}
                    <button
                  onClick={() => handleSetCover(image.id)}
                  className={`p-2 rounded-full transition-colors ${
                  image.isCover ?
                  'bg-blue-600 text-white' :
                  'bg-white/5 text-gray-200 hover:bg-blue-600 hover:text-white'}`
                  }
                  title={image.isCover ? 'Cover photo' : 'Set as cover'}>

                      <Star
                    className={`h-4 w-4 ${image.isCover ? 'fill-current' : ''}`} />

                    </button>

                    {/* Remove */}
                    <button
                  onClick={() => handleRemoveImage(image.id)}
                  className="p-2 bg-lydian-primary text-lydian-text-inverse rounded-full hover:bg-lydian-primary-dark transition-colors"
                  title="Remove image">

                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Cover Badge */}
                {image.isCover &&
            <div className="absolute top-2 left-2 px-2 py-1 bg-lydian-primary text-lydian-text-inverse text-xs font-semibold rounded-full flex items-center">
                    <Star className="h-3 w-3 fill-current mr-1" />
                    Cover
                  </div>
            }

                {/* Drag Handle */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="p-1 bg-lydian-glass-dark rounded cursor-move">
                    <GripVertical className="h-4 w-4 text-lydian-text-dim" />
                  </div>
                </div>

                {/* Upload Progress */}
                {image.status === 'uploading' &&
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
                    <Loader className="h-6 w-6 text-lydian-text-inverse animate-spin mb-2" />
                    <div className="w-3/4 bg-lydian-bg-active rounded-full h-2 overflow-hidden">
                      <div
                  className="bg-lydian-primary h-full transition-all duration-300"
                  style={{ width: `${image.progress}%` }} />

                    </div>
                    <p className="text-lydian-text-inverse text-xs mt-1">
                      {image.progress}%
                    </p>
                  </div>
            }

                {/* Error State */}
                {image.status === 'error' &&
            <div className="absolute inset-0 bg-lydian-error bg-opacity-90 flex flex-col items-center justify-center p-2">
                    <AlertCircle className="h-6 w-6 text-lydian-text-inverse mb-1" />
                    <p className="text-lydian-text-inverse text-xs text-center">
                      {image.error || 'Upload failed'}
                    </p>
                  </div>
            }

                {/* Success Indicator */}
                {image.status === 'success' && image.progress === 100 &&
            <div className="absolute bottom-2 right-2 p-1 bg-green-500 rounded-full">
                    <CheckCircle className="h-4 w-4 text-lydian-text-inverse" />
                  </div>
            }
              </div>
          )}
          </div>
        </div>
      }

      {/* Summary */}
      {reqs.minPhotos &&
      <div className="mt-4">
          {!meetsMinRequirement ?
        <p className="text-sm text-lydian-warning-text bg-lydian-warning-lighter border border-yellow-200 rounded-lg p-3 flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>
                Please upload at least {reqs.minPhotos - images.length} more
                photo{reqs.minPhotos - images.length !== 1 ? 's' : ''} to meet
                the minimum requirement.
              </span>
            </p> :

        <p className="text-sm text-lydian-success-text bg-lydian-success-lighter border border-green-200 rounded-lg p-3 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>Photo requirements met! Ready to proceed.</span>
            </p>
        }
        </div>
      }
    </div>);

};

export default PhotoUploader;