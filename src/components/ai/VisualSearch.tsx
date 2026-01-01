/**
 * Visual Search Component
 * AI-powered image-based destination discovery
 *
 * @component VisualSearch
 * @performance Optimized with React.memo and lazy loading
 */

'use client';

import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  Upload,
  Search,
  Loader2,
  MapPin,
  Thermometer,
  Calendar,
  Star,
  TrendingUp,
  Image as ImageIcon,
  X,
  ExternalLink,
  Info
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import type { VisionSearchResult } from '../../lib/ai/vision-search-service';

// ============================================
// TYPES
// ============================================

interface VisualSearchProps {
  onResultSelect?: (result: VisionSearchResult) => void;
  locale?: string;
  className?: string;
}

interface UploadState {
  file: File | null;
  preview: string | null;
  uploading: boolean;
}

// ============================================
// MAIN COMPONENT
// ============================================

export const VisualSearch: React.FC<VisualSearchProps> = React.memo(({
  onResultSelect,
  locale = 'en',
  className = ''
}) => {
  const { showSuccess, showError, showInfo } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadState, setUploadState] = useState<UploadState>({
    file: null,
    preview: null,
    uploading: false
  });
  const [searchResult, setSearchResult] = useState<VisionSearchResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  /**
   * Handle file selection
   */
  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      showError('Please select a valid image file (JPEG, PNG, WebP, GIF)');
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      showError('Image size must be less than 10MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadState({
        file,
        preview: e.target?.result as string,
        uploading: false
      });
    };
    reader.readAsDataURL(file);
  }, [showError]);

  /**
   * Handle drag and drop
   */
  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showError('Please drop a valid image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadState({
        file,
        preview: e.target?.result as string,
        uploading: false
      });
    };
    reader.readAsDataURL(file);
  }, [showError]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  /**
   * Analyze uploaded image
   */
  const handleAnalyze = useCallback(async () => {
    if (!uploadState.file) {
      showError('Please select an image first');
      return;
    }

    setIsAnalyzing(true);
    setSearchResult(null);

    try {
      const formData = new FormData();
      formData.append('image', uploadState.file);
      formData.append('locale', locale);
      formData.append('includeActivities', 'true');
      formData.append('includeSimilar', 'true');

      const response = await fetch('/api/ai/vision-search', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to analyze image');
      }

      const data = await response.json();

      if (!data.success || !data.result) {
        throw new Error('Invalid response from server');
      }

      setSearchResult(data.result);
      showSuccess(`Destination identified: ${data.result.destination.name}!`);

      // Notify parent component
      if (onResultSelect) {
        onResultSelect(data.result);
      }

    } catch (error) {
      showError(
        error instanceof Error
          ? error.message
          : 'Failed to analyze image. Please try again.'
      );
    } finally {
      setIsAnalyzing(false);
    }
  }, [uploadState.file, locale, showSuccess, showError, onResultSelect]);

  /**
   * Clear selection
   */
  const handleClear = useCallback(() => {
    setUploadState({
      file: null,
      preview: null,
      uploading: false
    });
    setSearchResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  /**
   * Confidence color
   */
  const getConfidenceColor = (confidence: number): string => {
    if (confidence >= 0.9) return 'text-success-400';
    if (confidence >= 0.7) return 'text-warning-400';
    return 'text-error-400';
  };

  return (
    <div className={`visual-search ${className}`}>
      {/* Upload Area */}
      {!uploadState.preview && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-primary-500/30 rounded-2xl p-12 text-center hover:border-primary-500/60 transition-colors duration-300 bg-surface-elevated/50 backdrop-blur-sm"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <div className="absolute inset-0 bg-primary-500/20 blur-3xl rounded-full" />
                <div className="relative bg-gradient-to-br from-primary-500 to-accent-500 p-6 rounded-2xl">
                  <ImageIcon className="w-12 h-12 text-white" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-text-primary">
                  Visual Search
                </h3>
                <p className="text-text-secondary max-w-md">
                  Upload a travel photo to discover destinations, landmarks, and personalized recommendations
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors duration-200"
                >
                  <Upload className="w-5 h-5" />
                  Upload Image
                </button>

                <button
                  onClick={() => showInfo('Camera feature coming soon!')}
                  className="flex items-center gap-2 px-6 py-3 bg-surface-elevated hover:bg-surface-card text-text-primary rounded-lg border border-border-subtle transition-colors duration-200"
                >
                  <Camera className="w-5 h-5" />
                  Take Photo
                </button>
              </div>

              <p className="text-sm text-text-muted">
                Supported: JPEG, PNG, WebP, GIF (max 10MB)
              </p>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </motion.div>
      )}

      {/* Preview & Analysis */}
      {uploadState.preview && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          {/* Image Preview */}
          <div className="relative group">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src={uploadState.preview}
                alt="Upload preview"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <button
              onClick={handleClear}
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>

            {!searchResult && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500/50 text-white rounded-xl font-semibold shadow-xl transition-all duration-200 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing Image...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      Discover Destination
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Analysis Result */}
          <AnimatePresence>
            {searchResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Destination Info */}
                <div className="bg-surface-elevated rounded-2xl p-6 border border-border-subtle">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-3xl font-bold text-text-primary mb-2">
                        {searchResult.destination.name}
                      </h2>
                      <p className="text-text-secondary flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {searchResult.destination.region}, {searchResult.destination.country}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div className={`flex items-center gap-2 ${getConfidenceColor(searchResult.confidence)}`}>
                        <Star className="w-5 h-5 fill-current" />
                        <span className="font-bold">
                          {(searchResult.confidence * 100).toFixed(0)}% Match
                        </span>
                      </div>
                      <span className="text-xs text-text-muted px-3 py-1 bg-surface-card rounded-full">
                        {searchResult.metadata.provider.toUpperCase()} AI
                      </span>
                    </div>
                  </div>

                  <p className="text-text-secondary leading-relaxed mb-4">
                    {searchResult.destination.description}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Thermometer className="w-4 h-4" />
                      <span className="text-sm">
                        {searchResult.destination.climate.averageTemp.min}°-
                        {searchResult.destination.climate.averageTemp.max}°
                        {searchResult.destination.climate.averageTemp.unit}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm capitalize">
                        {searchResult.destination.climate.type} Climate
                      </span>
                    </div>
                  </div>
                </div>

                {/* Landmarks */}
                {searchResult.landmarks.length > 0 && (
                  <div className="bg-surface-elevated rounded-2xl p-6 border border-border-subtle">
                    <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary-500" />
                      Top Landmarks
                    </h3>
                    <div className="grid gap-4">
                      {searchResult.landmarks.slice(0, 3).map((landmark, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-4 p-4 bg-surface-card rounded-xl"
                        >
                          <div className="flex-shrink-0 w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center text-primary-500 font-bold">
                            {idx + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-text-primary mb-1">
                              {landmark.name}
                            </h4>
                            <p className="text-sm text-text-secondary mb-2">
                              {landmark.description}
                            </p>
                            <div className="flex gap-4 text-xs text-text-muted">
                              <span>⏱️ {landmark.visitDuration}</span>
                              <span>💰 {landmark.entryFee}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Activities */}
                {searchResult.activities.length > 0 && (
                  <div className="bg-surface-elevated rounded-2xl p-6 border border-border-subtle">
                    <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-accent-500" />
                      Recommended Activities
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {searchResult.activities.slice(0, 4).map((activity, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-surface-card rounded-xl"
                        >
                          <h4 className="font-semibold text-text-primary mb-2">
                            {activity.name}
                          </h4>
                          <div className="flex flex-wrap gap-2 text-xs">
                            <span className="px-2 py-1 bg-primary-500/10 text-primary-500 rounded">
                              {activity.difficulty}
                            </span>
                            <span className="px-2 py-1 bg-surface-elevated text-text-muted rounded">
                              {activity.duration}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Similar Destinations */}
                {searchResult.similarDestinations.length > 0 && (
                  <div className="bg-surface-elevated rounded-2xl p-6 border border-border-subtle">
                    <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                      <ExternalLink className="w-5 h-5 text-success-500" />
                      Similar Destinations
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {searchResult.similarDestinations.map((dest, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-surface-card rounded-xl hover:bg-surface-elevated transition-colors duration-200 cursor-pointer"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-text-primary">
                              {dest.name}
                            </h4>
                            <span className="text-sm text-success-400">
                              {(dest.similarity * 100).toFixed(0)}%
                            </span>
                          </div>
                          <p className="text-sm text-text-secondary mb-1">
                            {dest.country}
                          </p>
                          <p className="text-xs text-text-muted">
                            {dest.reason}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Travel Tips */}
                {searchResult.travelTips.length > 0 && (
                  <div className="bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-2xl p-6 border border-primary-500/20">
                    <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                      <Info className="w-5 h-5 text-primary-500" />
                      Travel Tips
                    </h3>
                    <ul className="space-y-2">
                      {searchResult.travelTips.map((tip, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-text-secondary"
                        >
                          <span className="flex-shrink-0 w-6 h-6 bg-primary-500/20 rounded-full flex items-center justify-center text-primary-500 text-xs font-bold mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
});

VisualSearch.displayName = 'VisualSearch';

export default VisualSearch;
