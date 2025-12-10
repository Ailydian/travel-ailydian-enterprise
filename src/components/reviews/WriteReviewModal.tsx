import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { X, Star, Upload, Camera, MapPin, Calendar, Users, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { CreateReviewRequest } from '../../lib/types/review-system';
import reviewService from '../../lib/services/review-service';

interface WriteReviewModalProps {
  locationId: number;
  locationName: string;
  onClose: () => void;
  onSuccess: () => void;
}

const MAX_PHOTOS = 10;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];

interface PhotoPreview {
  file: File;
  preview: string;
  id: string;
  caption?: string;
  type?: 'exterior' | 'interior' | 'food' | 'menu' | 'amenity' | 'view' | 'other';
}

interface ReviewData {
  overall_rating: number;
  service_rating: number;
  food_rating?: number;
  atmosphere_rating: number;
  value_rating: number;
  cleanliness_rating?: number;
  title: string;
  content: string;
  visit_date?: string;
  visit_type: 'business' | 'leisure' | 'family' | 'couple' | 'solo';
  language: string;
}

export default function WriteReviewModal({ locationId, locationName, onClose, onSuccess }: WriteReviewModalProps) {
  const { t, i18n } = useTranslation('common');
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [photos, setPhotos] = useState<PhotoPreview[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [reviewData, setReviewData] = useState<ReviewData>({
    overall_rating: 0,
    service_rating: 0,
    food_rating: 0,
    atmosphere_rating: 0,
    value_rating: 0,
    cleanliness_rating: 0,
    title: '',
    content: '',
    visit_type: 'leisure',
    language: i18n.language || 'en'
  });

  // Photo upload handling
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newPhotos = acceptedFiles
      .filter(file => {
        if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
          alert(t('errors.invalidFileType'));
          return false;
        }
        if (file.size > MAX_FILE_SIZE) {
          alert(t('errors.fileTooLarge'));
          return false;
        }
        return true;
      })
      .slice(0, MAX_PHOTOS - photos.length)
      .map(file => ({
        file,
        preview: URL.createObjectURL(file),
        id: Math.random().toString(36).substring(7),
        type: 'other' as const
      }));

    setPhotos(prev => [...prev, ...newPhotos]);
  }, [photos.length, t]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.heic']
    },
    maxFiles: MAX_PHOTOS,
    maxSize: MAX_FILE_SIZE,
    disabled: photos.length >= MAX_PHOTOS
  });

  const removePhoto = (id: string) => {
    setPhotos(prev => {
      const photo = prev.find(p => p.id === id);
      if (photo) {
        URL.revokeObjectURL(photo.preview);
      }
      return prev.filter(p => p.id !== id);
    });
  };

  const updatePhotoCaption = (id: string, caption: string) => {
    setPhotos(prev => prev.map(p => 
      p.id === id ? { ...p, caption } : p
    ));
  };

  const updatePhotoType = (id: string, type: PhotoPreview['type']) => {
    setPhotos(prev => prev.map(p => 
      p.id === id ? { ...p, type } : p
    ));
  };

  // Rating component
  const RatingInput = ({ 
    label, 
    value, 
    onChange, 
    required = false,
    description 
  }: { 
    label: string; 
    value: number; 
    onChange: (rating: number) => void;
    required?: boolean;
    description?: string;
  }) => (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {value > 0 && (
          <span className="text-sm text-gray-500">{value}/5</span>
        )}
      </div>
      {description && (
        <p className="text-xs text-gray-500 mb-2">{description}</p>
      )}
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() => onChange(rating)}
            className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          >
            <Star
              className={`h-6 w-6 transition-colors ${
                rating <= value
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300 hover:text-yellow-200'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );

  // Content validation
  const validateContent = (content: string) => {
    if (content.length < 50) {
      return t('errors.reviewTooShort');
    }
    if (content.length > 5000) {
      return t('errors.reviewTooLong');
    }
    
    // Check for spam patterns
    const spamPatterns = [
      /(.)\1{10,}/, // Repeated characters
      /https?:\/\/[^\s]+/g, // URLs (not allowed in reviews)
      /\b\d{10,}\b/, // Phone numbers
      /@[a-zA-Z0-9._-]+/, // Email addresses
    ];
    
    if (spamPatterns.some(pattern => pattern.test(content))) {
      return t('errors.contentNotAllowed');
    }
    
    return null;
  };

  // Submit review
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Validate required fields
      if (reviewData.overall_rating === 0) {
        throw new Error(t('errors.overallRatingRequired'));
      }

      if (reviewData.service_rating === 0) {
        throw new Error(t('errors.serviceRatingRequired'));
      }

      if (!reviewData.content.trim()) {
        throw new Error(t('errors.reviewContentRequired'));
      }

      const contentError = validateContent(reviewData.content);
      if (contentError) {
        throw new Error(contentError);
      }

      // Prepare review data
      const reviewRequest: CreateReviewRequest = {
        location_id: locationId,
        title: reviewData.title ? { [reviewData.language]: reviewData.title } : undefined,
        content: { [reviewData.language]: reviewData.content },
        language: reviewData.language,
        overall_rating: reviewData.overall_rating,
        service_rating: reviewData.service_rating,
        atmosphere_rating: reviewData.atmosphere_rating,
        value_rating: reviewData.value_rating,
        visit_date: reviewData.visit_date,
        visit_type: reviewData.visit_type,
        photos: photos.map(p => p.file)
      };

      // Add optional ratings based on location type
      if (reviewData.food_rating && reviewData.food_rating > 0) {
        reviewRequest.food_rating = reviewData.food_rating;
      }
      if (reviewData.cleanliness_rating && reviewData.cleanliness_rating > 0) {
        reviewRequest.cleanliness_rating = reviewData.cleanliness_rating;
      }

      await reviewService.createReview(reviewRequest);
      onSuccess();
    } catch (error: any) {
      console.error('Error submitting review:', error);
      setSubmitError(error.message || t('errors.genericSubmissionError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {t('review.rateYourExperience')}
            </h3>
            
            <RatingInput
              label={t('review.overallRating')}
              value={reviewData.overall_rating}
              onChange={(rating) => setReviewData(prev => ({ ...prev, overall_rating: rating }))}
              required
              description={t('review.overallRatingDescription')}
            />

            <RatingInput
              label={t('review.serviceRating')}
              value={reviewData.service_rating}
              onChange={(rating) => setReviewData(prev => ({ ...prev, service_rating: rating }))}
              required
              description={t('review.serviceRatingDescription')}
            />

            <RatingInput
              label={t('review.atmosphereRating')}
              value={reviewData.atmosphere_rating}
              onChange={(rating) => setReviewData(prev => ({ ...prev, atmosphere_rating: rating }))}
              description={t('review.atmosphereRatingDescription')}
            />

            <RatingInput
              label={t('review.valueRating')}
              value={reviewData.value_rating}
              onChange={(rating) => setReviewData(prev => ({ ...prev, value_rating: rating }))}
              description={t('review.valueRatingDescription')}
            />

            {/* Optional ratings */}
            <RatingInput
              label={t('review.foodRating')}
              value={reviewData.food_rating || 0}
              onChange={(rating) => setReviewData(prev => ({ ...prev, food_rating: rating }))}
              description={t('review.foodRatingDescription')}
            />

            <RatingInput
              label={t('review.cleanlinessRating')}
              value={reviewData.cleanliness_rating || 0}
              onChange={(rating) => setReviewData(prev => ({ ...prev, cleanliness_rating: rating }))}
              description={t('review.cleanlinessRatingDescription')}
            />
          </div>
        );

      case 2:
        return (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {t('review.tellUsMore')}
            </h3>

            {/* Visit details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  {t('review.visitDate')}
                </label>
                <input
                  type="date"
                  value={reviewData.visit_date || ''}
                  onChange={(e) => setReviewData(prev => ({ ...prev, visit_date: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 [color-scheme:light]"
                  style={{ colorScheme: 'light' }}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="inline h-4 w-4 mr-1" />
                  {t('review.visitType')}
                </label>
                <select
                  value={reviewData.visit_type}
                  onChange={(e) => setReviewData(prev => ({ ...prev, visit_type: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="business">{t('review.visitTypes.business')}</option>
                  <option value="leisure">{t('review.visitTypes.leisure')}</option>
                  <option value="family">{t('review.visitTypes.family')}</option>
                  <option value="couple">{t('review.visitTypes.couple')}</option>
                  <option value="solo">{t('review.visitTypes.solo')}</option>
                </select>
              </div>
            </div>

            {/* Review title */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('review.title')} <span className="text-gray-500">({t('optional')})</span>
              </label>
              <input
                type="text"
                value={reviewData.title}
                onChange={(e) => setReviewData(prev => ({ ...prev, title: e.target.value }))}
                placeholder={t('review.titlePlaceholder')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                maxLength={100}
              />
            </div>

            {/* Review content */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('review.content')} <span className="text-red-500">*</span>
              </label>
              <textarea
                value={reviewData.content}
                onChange={(e) => setReviewData(prev => ({ ...prev, content: e.target.value }))}
                placeholder={t('review.contentPlaceholder')}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                minLength={50}
                maxLength={5000}
                required
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>
                  {reviewData.content.length < 50 
                    ? t('review.minimumLength', { count: 50 - reviewData.content.length })
                    : t('review.goodLength')
                  }
                </span>
                <span>{reviewData.content.length}/5000</span>
              </div>
            </div>

            {/* Content guidelines */}
            <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-blue-800">
                    {t('review.guidelines.title')}
                  </h4>
                  <ul className="text-sm text-blue-700 mt-1 space-y-1">
                    <li>• {t('review.guidelines.beHonest')}</li>
                    <li>• {t('review.guidelines.beSpecific')}</li>
                    <li>• {t('review.guidelines.noPersonalInfo')}</li>
                    <li>• {t('review.guidelines.respectful')}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {t('review.addPhotos')} <span className="text-gray-500">({t('optional')})</span>
            </h3>

            {/* Photo upload area */}
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                isDragActive
                  ? 'border-blue-400 bg-blue-50'
                  : photos.length >= MAX_PHOTOS
                  ? 'border-gray-200 bg-gray-50'
                  : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
              } ${photos.length >= MAX_PHOTOS ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <input {...getInputProps()} ref={fileInputRef} />
              
              {photos.length >= MAX_PHOTOS ? (
                <div className="text-gray-500">
                  <Camera className="mx-auto h-8 w-8 mb-2" />
                  <p>{t('review.maxPhotosReached', { max: MAX_PHOTOS })}</p>
                </div>
              ) : (
                <div className="text-gray-600">
                  <Upload className="mx-auto h-8 w-8 mb-2" />
                  <p>
                    {isDragActive
                      ? t('review.dropPhotosHere')
                      : t('review.dragDropPhotos')
                    }
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {t('review.photoRequirements')}
                  </p>
                </div>
              )}
            </div>

            {/* Photo previews */}
            {photos.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  {t('review.uploadedPhotos')} ({photos.length}/{MAX_PHOTOS})
                </h4>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {photos.map((photo) => (
                    <div key={photo.id} className="relative group">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={photo.preview}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      {/* Remove button */}
                      <button
                        type="button"
                        onClick={() => removePhoto(photo.id)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>

                      {/* Photo type selector */}
                      <select
                        value={photo.type || 'other'}
                        onChange={(e) => updatePhotoType(photo.id, e.target.value as any)}
                        className="absolute bottom-2 left-2 right-2 px-2 py-1 bg-black bg-opacity-75 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <option value="exterior">{t('review.photoTypes.exterior')}</option>
                        <option value="interior">{t('review.photoTypes.interior')}</option>
                        <option value="food">{t('review.photoTypes.food')}</option>
                        <option value="menu">{t('review.photoTypes.menu')}</option>
                        <option value="amenity">{t('review.photoTypes.amenity')}</option>
                        <option value="view">{t('review.photoTypes.view')}</option>
                        <option value="other">{t('review.photoTypes.other')}</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Photo tips */}
            <div className="bg-green-50 border border-green-200 rounded-md p-3 mt-4">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-green-800">
                    {t('review.photoTips.title')}
                  </h4>
                  <ul className="text-sm text-green-700 mt-1 space-y-1">
                    <li>• {t('review.photoTips.goodLighting')}</li>
                    <li>• {t('review.photoTips.clearImages')}</li>
                    <li>• {t('review.photoTips.varietyOfViews')}</li>
                    <li>• {t('review.photoTips.respectPrivacy')}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1:
        return reviewData.overall_rating > 0 && reviewData.service_rating > 0;
      case 2:
        return reviewData.content.trim().length >= 50 && !validateContent(reviewData.content);
      case 3:
        return true; // Photos are optional
      default:
        return false;
    }
  };

  // Cleanup object URLs on unmount
  React.useEffect(() => {
    return () => {
      photos.forEach(photo => {
        URL.revokeObjectURL(photo.preview);
      });
    };
  }, [photos]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {t('review.writeReviewFor')}
              </h2>
              <p className="text-sm text-gray-600 flex items-center mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                {locationName}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
              disabled={isSubmitting}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Progress indicators */}
          <div className="flex items-center mb-6">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step === currentStep
                    ? 'bg-blue-600 text-white'
                    : step < currentStep
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step < currentStep ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    step
                  )}
                </div>
                {step < 3 && (
                  <div className={`flex-1 h-0.5 mx-2 ${
                    step < currentStep ? 'bg-green-600' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Error message */}
          {submitError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-red-700">{submitError}</div>
              </div>
            </div>
          )}

          {/* Step content */}
          <div className="mb-6 max-h-96 overflow-y-auto">
            {renderStepContent()}
          </div>

          {/* Footer buttons */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                if (currentStep === 1) {
                  onClose();
                } else {
                  setCurrentStep(currentStep - 1);
                }
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
              disabled={isSubmitting}
            >
              {currentStep === 1 ? t('cancel') : t('back')}
            </button>

            <div className="flex space-x-3">
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!canProceedToNextStep() || isSubmitting}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
                >
                  {t('next')}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canProceedToNextStep() || isSubmitting}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4 mr-2" />
                      {t('review.submitting')}
                    </>
                  ) : (
                    t('review.submitReview')
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}