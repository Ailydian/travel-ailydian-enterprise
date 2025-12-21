'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Home,
  MapPin,
  DollarSign,
  Image,
  Clock,
  CheckCircle2,
  Edit,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

interface Step8Props {
  data?: any;
  allData?: any;
}

export default function Step8Review({ data, allData }: Step8Props) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const submissionType = watch('submissionType');

  // Get data from all steps
  const step1 = allData?.step1 || {};
  const step2 = allData?.step2 || {};
  const step3 = allData?.step3 || {};
  const step4 = allData?.step4 || {};
  const step5 = allData?.step5 || {};
  const step6 = allData?.step6 || {};
  const step7 = allData?.step7 || {};

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-indigo-500 rounded-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-indigo-900 mb-2">
              Review Your Property Listing
            </h3>
            <p className="text-indigo-700">
              Please review all the information below before submitting. You can edit any
              section by clicking the Edit button.
            </p>
          </div>
        </div>
      </div>

      {/* Step 1 Summary - Basic Info */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Home className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-slate-900">Basic Information</h3>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-600">Property Name:</span>
            <p className="font-semibold text-slate-900">{step1.propertyName || 'N/A'}</p>
          </div>
          <div>
            <span className="text-slate-600">Property Type:</span>
            <p className="font-semibold text-slate-900 capitalize">
              {step1.propertyType || 'N/A'}
            </p>
          </div>
          <div>
            <span className="text-slate-600">Bedrooms:</span>
            <p className="font-semibold text-slate-900">{step1.numberOfRooms || 'N/A'}</p>
          </div>
          <div>
            <span className="text-slate-600">Bathrooms:</span>
            <p className="font-semibold text-slate-900">
              {step1.numberOfBathrooms || 'N/A'}
            </p>
          </div>
          <div>
            <span className="text-slate-600">Max Guests:</span>
            <p className="font-semibold text-slate-900">{step1.maximumGuests || 'N/A'}</p>
          </div>
          <div className="md:col-span-2">
            <span className="text-slate-600">Description:</span>
            <p className="font-medium text-slate-900 mt-1 line-clamp-3">
              {step1.description || 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Step 2 Summary - Location */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-red-600" />
            <h3 className="text-lg font-bold text-slate-900">Location</h3>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-600">Address:</span>
            <p className="font-semibold text-slate-900">{step2.address || 'N/A'}</p>
          </div>
          <div>
            <span className="text-slate-600">City:</span>
            <p className="font-semibold text-slate-900">{step2.city || 'N/A'}</p>
          </div>
          <div>
            <span className="text-slate-600">Province/State:</span>
            <p className="font-semibold text-slate-900">{step2.province || 'N/A'}</p>
          </div>
          <div>
            <span className="text-slate-600">Country:</span>
            <p className="font-semibold text-slate-900">{step2.country || 'N/A'}</p>
          </div>
          <div>
            <span className="text-slate-600">Coordinates:</span>
            <p className="font-semibold text-slate-900">
              {step2.coordinates
                ? `${step2.coordinates.latitude}, ${step2.coordinates.longitude}`
                : 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Step 3 Summary - Amenities */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-bold text-slate-900">Amenities & Features</h3>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
        </div>
        <div className="text-sm">
          <span className="text-slate-600">Selected Amenities:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {step3.amenities && step3.amenities.length > 0 ? (
              step3.amenities.map((amenity: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                >
                  {amenity}
                </span>
              ))
            ) : (
              <p className="text-slate-500">No amenities selected</p>
            )}
          </div>
          {step3.customAmenities && step3.customAmenities.length > 0 && (
            <>
              <span className="text-slate-600 mt-4 block">Custom Amenities:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {step3.customAmenities.map((amenity: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Step 4 Summary - Pricing */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <DollarSign className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-bold text-slate-900">Pricing</h3>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-600">Base Price:</span>
            <p className="font-semibold text-slate-900">
              {step4.currency} ${step4.basePrice || 'N/A'} per night
            </p>
          </div>
          <div>
            <span className="text-slate-600">Minimum Stay:</span>
            <p className="font-semibold text-slate-900">
              {step4.availability?.minStay || 'N/A'} night(s)
            </p>
          </div>
          {step4.discounts?.weeklyDiscount > 0 && (
            <div>
              <span className="text-slate-600">Weekly Discount:</span>
              <p className="font-semibold text-green-600">
                {step4.discounts.weeklyDiscount}% off
              </p>
            </div>
          )}
          {step4.discounts?.monthlyDiscount > 0 && (
            <div>
              <span className="text-slate-600">Monthly Discount:</span>
              <p className="font-semibold text-green-600">
                {step4.discounts.monthlyDiscount}% off
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Step 5 Summary - Photos */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Image className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-bold text-slate-900">Photos</h3>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
        </div>
        <div className="text-sm">
          <span className="text-slate-600">
            Total Photos: {step5.photos?.length || 0}
          </span>
          {step5.photos && step5.photos.length > 0 && (
            <div className="grid grid-cols-4 gap-2 mt-3">
              {step5.photos.slice(0, 8).map((photo: any, index: number) => (
                <div
                  key={index}
                  className="aspect-square rounded-lg overflow-hidden border border-slate-200 relative"
                >
                  <img
                    src={photo.url}
                    alt={`Property ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {index === step5.coverPhotoIndex && (
                    <div className="absolute top-1 right-1 px-2 py-0.5 bg-yellow-500 text-white text-xs font-bold rounded">
                      Cover
                    </div>
                  )}
                </div>
              ))}
              {step5.photos.length > 8 && (
                <div className="aspect-square rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 font-semibold">
                  +{step5.photos.length - 8} more
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Step 6 Summary - House Rules */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-900">House Rules</h3>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-600">Check-in:</span>
            <p className="font-semibold text-slate-900">{step6.checkInTime || 'N/A'}</p>
          </div>
          <div>
            <span className="text-slate-600">Check-out:</span>
            <p className="font-semibold text-slate-900">{step6.checkOutTime || 'N/A'}</p>
          </div>
          <div>
            <span className="text-slate-600">Cancellation Policy:</span>
            <p className="font-semibold text-slate-900 capitalize">
              {step6.cancellationPolicy?.replace('_', ' ') || 'N/A'}
            </p>
          </div>
          <div className="md:col-span-2">
            <span className="text-slate-600">Policies:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {step6.policies?.smokingAllowed && (
                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs">
                  Smoking Allowed
                </span>
              )}
              {step6.policies?.petsAllowed && (
                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs">
                  Pets Allowed
                </span>
              )}
              {step6.policies?.eventsAllowed && (
                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs">
                  Events Allowed
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Submission Type */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Submission Type</h3>

        <div className="space-y-3">
          <label
            className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
              submissionType === 'save_draft'
                ? 'border-blue-500 bg-blue-50'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <input
              type="radio"
              value="save_draft"
              {...register('submissionType')}
              className="w-5 h-5 text-blue-600"
            />
            <div>
              <h4 className="font-semibold text-slate-900">Save as Draft</h4>
              <p className="text-sm text-slate-600">
                Save your progress and continue editing later
              </p>
            </div>
          </label>

          <label
            className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
              submissionType === 'submit_for_review'
                ? 'border-blue-500 bg-blue-50'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <input
              type="radio"
              value="submit_for_review"
              {...register('submissionType')}
              className="w-5 h-5 text-blue-600"
            />
            <div>
              <h4 className="font-semibold text-slate-900">Submit for Review</h4>
              <p className="text-sm text-slate-600">
                Submit your property for approval and listing
              </p>
            </div>
          </label>
        </div>

        {errors.submissionType && (
          <p className="mt-2 text-sm text-red-600">
            {errors.submissionType.message?.toString()}
          </p>
        )}
      </div>

      {/* Additional Notes */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">
          Additional Notes (Optional)
        </h3>
        <textarea
          {...register('additionalNotes')}
          rows={4}
          placeholder="Any additional information you'd like to share with our review team..."
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
        />
        {errors.additionalNotes && (
          <p className="mt-1 text-sm text-red-600">
            {errors.additionalNotes.message?.toString()}
          </p>
        )}
      </div>

      {/* Final Checklist */}
      <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl">
        <h3 className="text-lg font-bold text-green-900 mb-4">Final Checklist</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="text-green-800">All required information provided</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="text-green-800">Photos uploaded (minimum 5)</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="text-green-800">Pricing and availability set</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="text-green-800">Terms and agreements accepted</span>
          </div>
        </div>
      </div>

      {/* Warning */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-amber-900 mb-1">Before Submitting:</h4>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>• Review all information for accuracy</li>
              <li>• Ensure all photos accurately represent your property</li>
              <li>
                • Properties typically get reviewed within 24-48 hours
              </li>
              <li>• You'll receive an email notification once approved</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
