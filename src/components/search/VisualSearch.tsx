'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CameraIcon,
  PhotoIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ArrowUpTrayIcon,
  SparklesIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import Webcam from 'react-webcam';
import { useDropzone } from 'react-dropzone';
import {
  validateImageFile,
  compressImage,
  createThumbnail,
  formatFileSize,
} from '@/utils/imageProcessing';
import { UploadedImage, VisualSearchResult, ImageAnalysis } from '@/types/visualSearch';

interface VisualSearchProps {
  onSearch?: (results: VisualSearchResult[], analysis: ImageAnalysis) => void;
  className?: string;
  maxFileSize?: number; // in MB
  autoSearch?: boolean;
}

const VisualSearch: React.FC<VisualSearchProps> = ({
  onSearch,
  className = '',
  maxFileSize = 5,
  autoSearch = true,
}) => {
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file drop
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    setError(null);
    setSuccess(false);

    // Validate file
    const validation = validateImageFile(file, maxFileSize);
    if (!validation.valid) {
      setError(validation.error || 'Invalid file');
      return;
    }

    try {
      setIsProcessing(true);
      setProgress(20);

      // Compress image if needed
      const compressedFile = await compressImage(file, 2);
      setProgress(40);

      // Create preview
      const preview = URL.createObjectURL(compressedFile);
      const thumbnail = await createThumbnail(compressedFile);
      setProgress(60);

      const uploadedImg: UploadedImage = {
        file: compressedFile,
        preview,
      };

      setUploadedImage(uploadedImg);
      setProgress(80);

      // Auto-search if enabled
      if (autoSearch) {
        await handleSearch(uploadedImg);
      }

      setProgress(100);
      setSuccess(true);
    } catch (err) {
      setError('Failed to process image. Please try again.');
      console.error('Image processing error:', err);
    } finally {
      setIsProcessing(false);
      setTimeout(() => setProgress(0), 1000);
    }
  }, [maxFileSize, autoSearch]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    maxFiles: 1,
    multiple: false,
  });

  // Capture from webcam
  const capturePhoto = useCallback(() => {
    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    // Convert base64 to blob
    fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
        onDrop([file]);
        setShowCamera(false);
      });
  }, [onDrop]);

  // Handle URL input
  const handleUrlSubmit = useCallback(() => {
    if (!imageUrl.trim()) {
      setError('Please enter a valid image URL');
      return;
    }

    setError(null);
    const uploadedImg: UploadedImage = {
      file: new File([], 'url-image.jpg'),
      preview: imageUrl,
      url: imageUrl,
    };

    setUploadedImage(uploadedImg);
    setShowUrlInput(false);

    if (autoSearch) {
      handleSearch(uploadedImg);
    }
  }, [imageUrl, autoSearch]);

  // Search by image
  const handleSearch = async (image?: UploadedImage) => {
    const searchImage = image || uploadedImage;
    if (!searchImage) return;

    try {
      setIsProcessing(true);
      setError(null);

      const formData = new FormData();

      if (searchImage.url) {
        formData.append('imageUrl', searchImage.url);
      } else {
        formData.append('image', searchImage.file);
      }

      const response = await fetch('/api/search/visual', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        if (onSearch) {
          onSearch(data.results, data.analysis);
        }
      } else {
        throw new Error(data.message || 'Search failed');
      }
    } catch (err) {
      setError('Failed to search. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Clear uploaded image
  const clearImage = useCallback(() => {
    if (uploadedImage?.preview) {
      URL.revokeObjectURL(uploadedImage.preview);
    }
    setUploadedImage(null);
    setError(null);
    setSuccess(false);
    setProgress(0);
  }, [uploadedImage]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (uploadedImage?.preview) {
        URL.revokeObjectURL(uploadedImage.preview);
      }
    };
  }, [uploadedImage]);

  return (
    <div className={`w-full ${className}`}>
      {/* Upload Area */}
      {!uploadedImage && !showCamera && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div
            {...getRootProps()}
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
              isDragActive
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-blue-400 bg-white'
            }`}
          >
            <input {...getInputProps()} />

            {/* Upload Icon */}
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                <PhotoIcon className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Upload Text */}
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {isDragActive ? 'Drop your image here' : 'Upload an image to search'}
            </h3>
            <p className="text-gray-600 mb-6">
              Drag & drop or click to browse • Max {maxFileSize}MB
            </p>

            {/* Upload Options */}
            <div className="flex flex-wrap justify-center gap-4">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors duration-200 flex items-center space-x-2"
              >
                <ArrowUpTrayIcon className="w-5 h-5" />
                <span>Browse Files</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCamera(true);
                }}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-colors duration-200 flex items-center space-x-2"
              >
                <CameraIcon className="w-5 h-5" />
                <span>Use Camera</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowUrlInput(true);
                }}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors duration-200 flex items-center space-x-2"
              >
                <SparklesIcon className="w-5 h-5" />
                <span>Paste URL</span>
              </button>
            </div>

            {/* Supported Formats */}
            <p className="text-sm text-gray-500 mt-6">
              Supported formats: JPG, PNG, WebP
            </p>
          </div>

          {/* URL Input Modal */}
          <AnimatePresence>
            {showUrlInput && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                onClick={() => setShowUrlInput(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  className="bg-white rounded-2xl p-8 max-w-lg w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Enter Image URL
                  </h3>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 mb-4"
                    onKeyPress={(e) => e.key === 'Enter' && handleUrlSubmit()}
                  />
                  <div className="flex space-x-3">
                    <button
                      onClick={handleUrlSubmit}
                      className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors duration-200"
                    >
                      Search
                    </button>
                    <button
                      onClick={() => setShowUrlInput(false)}
                      className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Camera View */}
      {showCamera && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-50 flex flex-col"
        >
          <div className="flex-1 relative">
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              className="w-full h-full object-cover"
              videoConstraints={{
                facingMode: 'environment',
              }}
            />
          </div>

          <div className="p-6 bg-black/80 flex items-center justify-center space-x-4">
            <button
              onClick={() => setShowCamera(false)}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={capturePhoto}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-colors duration-200 flex items-center space-x-2"
            >
              <CameraIcon className="w-6 h-6" />
              <span>Capture</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Uploaded Image Preview */}
      {uploadedImage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
        >
          <div className="relative">
            <img
              src={uploadedImage.preview}
              alt="Uploaded"
              className="w-full h-64 object-cover"
            />

            {/* Clear Button */}
            <button
              onClick={clearImage}
              className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full transition-colors duration-200 shadow-lg"
            >
              <XMarkIcon className="w-5 h-5 text-gray-700" />
            </button>

            {/* Progress Bar */}
            {progress > 0 && progress < 100 && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                />
              </div>
            )}
          </div>

          {/* Search Button */}
          {!autoSearch && (
            <div className="p-6">
              <button
                onClick={() => handleSearch()}
                disabled={isProcessing}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <MagnifyingGlassIcon className="w-5 h-5" />
                    <span>Search by Image</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Status Messages */}
          <AnimatePresence>
            {(error || success) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="px-6 pb-6"
              >
                {error && (
                  <div className="flex items-center space-x-2 text-red-600 bg-red-50 px-4 py-3 rounded-xl">
                    <ExclamationCircleIcon className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm font-medium">{error}</span>
                  </div>
                )}
                {success && (
                  <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-4 py-3 rounded-xl">
                    <CheckCircleIcon className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm font-medium">Image processed successfully!</span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default VisualSearch;
