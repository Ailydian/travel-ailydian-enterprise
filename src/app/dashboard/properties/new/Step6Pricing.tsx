'use client';

import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Clock,
  Ban,
  PawPrint,
  PartyPopper,
  Camera,
  Plus,
  X,
  Shield,
} from 'lucide-react';

interface Step6Props {
  data?: any;
  allData?: any;
}

const cancellationPolicies = [
  {
    value: 'flexible',
    label: 'Flexible',
    description: 'Full refund up to 24 hours before check-in',
  },
  {
    value: 'moderate',
    label: 'Moderate',
    description: 'Full refund up to 5 days before check-in',
  },
  {
    value: 'strict',
    label: 'Strict',
    description: 'Full refund up to 14 days before check-in',
  },
  {
    value: 'very_strict',
    label: 'Very Strict',
    description: 'Full refund up to 30 days before check-in',
  },
  {
    value: 'non_refundable',
    label: 'Non-Refundable',
    description: 'No refunds after booking',
  },
];

export default function Step6Pricing({ data }: Step6Props) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [customRules, setCustomRules] = useState<string[]>(
    watch('customRules') || []
  );
  const [newRule, setNewRule] = useState('');

  const selectedPolicy = watch('cancellationPolicy');

  const addCustomRule = () => {
    if (newRule.trim() && customRules.length < 5) {
      const updated = [...customRules, newRule.trim()];
      setCustomRules(updated);
      setValue('customRules', updated, { shouldValidate: true });
      setNewRule('');
    }
  };

  const removeCustomRule = (index: number) => {
    const updated = customRules.filter((_, i) => i !== index);
    setCustomRules(updated);
    setValue('customRules', updated, { shouldValidate: true });
  };

  return (
    <div className="space-y-8">
      {/* Check-in/Check-out Times */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Check-in & Check-out</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Check-in Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              {...register('checkInTime')}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
            <p className="mt-1 text-xs text-slate-500">
              Format: HH:mm (24-hour format)
            </p>
            {errors.checkInTime && (
              <p className="mt-1 text-sm text-red-600">
                {errors.checkInTime.message?.toString()}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Check-out Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              {...register('checkOutTime')}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
            <p className="mt-1 text-xs text-slate-500">
              Format: HH:mm (24-hour format)
            </p>
            {errors.checkOutTime && (
              <p className="mt-1 text-sm text-red-600">
                {errors.checkOutTime.message?.toString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* House Policies */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">House Policies</h3>

        <div className="space-y-4">
          {/* Smoking */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Ban className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <label
                  htmlFor="smokingAllowed"
                  className="font-medium text-slate-900 cursor-pointer"
                >
                  Smoking Allowed
                </label>
                <p className="text-sm text-slate-600">
                  Allow guests to smoke on the property
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              id="smokingAllowed"
              {...register('policies.smokingAllowed')}
              className="w-6 h-6 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Pets */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <PawPrint className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <label
                  htmlFor="petsAllowed"
                  className="font-medium text-slate-900 cursor-pointer"
                >
                  Pets Allowed
                </label>
                <p className="text-sm text-slate-600">
                  Allow guests to bring pets
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              id="petsAllowed"
              {...register('policies.petsAllowed')}
              className="w-6 h-6 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Pet Types (conditional) */}
          {watch('policies.petsAllowed') && (
            <div className="ml-14 p-4 bg-white border border-slate-200 rounded-lg">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Allowed Pet Types
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value="dogs"
                    {...register('policies.petTypes')}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="text-sm text-slate-700">Dogs</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value="cats"
                    {...register('policies.petTypes')}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="text-sm text-slate-700">Cats</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value="other"
                    {...register('policies.petTypes')}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="text-sm text-slate-700">Other small pets</span>
                </label>
              </div>
            </div>
          )}

          {/* Events */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <PartyPopper className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <label
                  htmlFor="eventsAllowed"
                  className="font-medium text-slate-900 cursor-pointer"
                >
                  Events Allowed
                </label>
                <p className="text-sm text-slate-600">
                  Allow guests to host events or gatherings
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              id="eventsAllowed"
              {...register('policies.eventsAllowed')}
              className="w-6 h-6 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Parties */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-pink-100 rounded-lg">
                <PartyPopper className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <label
                  htmlFor="partiesAllowed"
                  className="font-medium text-slate-900 cursor-pointer"
                >
                  Parties Allowed
                </label>
                <p className="text-sm text-slate-600">
                  Allow guests to host parties
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              id="partiesAllowed"
              {...register('policies.partiesAllowed')}
              className="w-6 h-6 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Commercial Photography */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Camera className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <label
                  htmlFor="commercialPhotographyAllowed"
                  className="font-medium text-slate-900 cursor-pointer"
                >
                  Commercial Photography Allowed
                </label>
                <p className="text-sm text-slate-600">
                  Allow professional photo/video shoots
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              id="commercialPhotographyAllowed"
              {...register('policies.commercialPhotographyAllowed')}
              className="w-6 h-6 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Custom Rules */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">
          Additional House Rules
        </h3>
        <p className="text-sm text-slate-600 mb-4">
          Add custom rules specific to your property (max 5)
        </p>

        <div className="space-y-3 mb-4">
          {customRules.map((rule, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg"
            >
              <span className="flex-1 text-sm text-slate-800">{rule}</span>
              <button
                type="button"
                onClick={() => removeCustomRule(index)}
                className="p-1 text-red-600 hover:bg-red-50 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            value={newRule}
            onChange={(e) => setNewRule(e.target.value)}
            onKeyPress={(e) =>
              e.key === 'Enter' && (e.preventDefault(), addCustomRule())
            }
            placeholder="e.g., No loud music after 10 PM"
            maxLength={200}
            className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
          />
          <button
            type="button"
            onClick={addCustomRule}
            disabled={!newRule.trim() || customRules.length >= 5}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add
          </button>
        </div>

        <input type="hidden" {...register('customRules')} value={customRules} />
      </div>

      {/* Cancellation Policy */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-100 rounded-lg">
            <Shield className="w-5 h-5 text-red-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Cancellation Policy</h3>
        </div>
        <p className="text-sm text-slate-600 mb-4">
          Choose how flexible you want to be with cancellations
        </p>

        <div className="space-y-3">
          {cancellationPolicies.map((policy) => {
            const isSelected = selectedPolicy === policy.value;

            return (
              <button
                key={policy.value}
                type="button"
                onClick={() =>
                  setValue('cancellationPolicy', policy.value, { shouldValidate: true })
                }
                className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-slate-300'
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                      <h4
                        className={`font-semibold ${
                          isSelected ? 'text-blue-900' : 'text-slate-900'
                        }`}
                      >
                        {policy.label}
                      </h4>
                    </div>
                    <p
                      className={`text-sm ml-8 ${
                        isSelected ? 'text-blue-700' : 'text-slate-600'
                      }`}
                    >
                      {policy.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <input type="hidden" {...register('cancellationPolicy')} />
        {errors.cancellationPolicy && (
          <p className="mt-2 text-sm text-red-600">
            {errors.cancellationPolicy.message?.toString()}
          </p>
        )}
      </div>

      {/* Info Box */}
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h4 className="font-semibold text-yellow-900 mb-2">House Rules Tips:</h4>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>• Clear rules help set proper expectations for guests</li>
          <li>• Stricter cancellation policies may reduce bookings but protect revenue</li>
          <li>• Consider your neighborhood and local regulations</li>
          <li>• Pet-friendly properties often attract longer stays</li>
        </ul>
      </div>
    </div>
  );
}
