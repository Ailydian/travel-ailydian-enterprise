'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FileText,
  Shield,
  Users,
  MessageSquare,
  CheckCircle2,
  ExternalLink,
  AlertTriangle,
} from 'lucide-react';

interface Step7Props {
  data?: any;
  allData?: any;
}

export default function Step7HouseRules({ data }: Step7Props) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const allAgreed =
    watch('agreeToTerms') &&
    watch('agreeToPrivacyPolicy') &&
    watch('agreeToHouseRules') &&
    watch('agreeToGuestCommunicationPolicy') &&
    watch('guestVettingConsent');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-500 rounded-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-blue-900 mb-2">
              Terms & Agreements
            </h3>
            <p className="text-blue-700">
              Please review and accept the following terms before submitting your
              property. These agreements help maintain a safe and trusted community for
              all users.
            </p>
          </div>
        </div>
      </div>

      {/* Required Agreements */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900">Required Agreements</h3>

        {/* Terms of Service */}
        <div
          className={`border-2 rounded-xl p-6 transition-all ${
            watch('agreeToTerms')
              ? 'border-green-500 bg-green-50'
              : 'border-slate-200 bg-white'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div
                className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                  watch('agreeToTerms')
                    ? 'border-green-500 bg-green-500'
                    : 'border-slate-300'
                }`}
              >
                {watch('agreeToTerms') && (
                  <CheckCircle2 className="w-4 h-4 text-white" />
                )}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-slate-600" />
                  <h4 className="font-semibold text-slate-900">Terms of Service</h4>
                </div>
                <a
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  Read Terms
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                By accepting, you agree to comply with our platform's terms of service,
                including hosting standards, booking policies, and community guidelines.
              </p>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  {...register('agreeToTerms')}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                  I agree to the Terms of Service <span className="text-red-500">*</span>
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.agreeToTerms.message?.toString()}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Privacy Policy */}
        <div
          className={`border-2 rounded-xl p-6 transition-all ${
            watch('agreeToPrivacyPolicy')
              ? 'border-green-500 bg-green-50'
              : 'border-slate-200 bg-white'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div
                className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                  watch('agreeToPrivacyPolicy')
                    ? 'border-green-500 bg-green-500'
                    : 'border-slate-300'
                }`}
              >
                {watch('agreeToPrivacyPolicy') && (
                  <CheckCircle2 className="w-4 h-4 text-white" />
                )}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-slate-600" />
                  <h4 className="font-semibold text-slate-900">Privacy Policy</h4>
                </div>
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  Read Policy
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                We respect your privacy and protect your personal data. Review how we
                collect, use, and share information about you and your property.
              </p>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  {...register('agreeToPrivacyPolicy')}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                  I agree to the Privacy Policy <span className="text-red-500">*</span>
                </span>
              </label>
              {errors.agreeToPrivacyPolicy && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.agreeToPrivacyPolicy.message?.toString()}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* House Rules Agreement */}
        <div
          className={`border-2 rounded-xl p-6 transition-all ${
            watch('agreeToHouseRules')
              ? 'border-green-500 bg-green-50'
              : 'border-slate-200 bg-white'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div
                className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                  watch('agreeToHouseRules')
                    ? 'border-green-500 bg-green-500'
                    : 'border-slate-300'
                }`}
              >
                {watch('agreeToHouseRules') && (
                  <CheckCircle2 className="w-4 h-4 text-white" />
                )}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-slate-600" />
                <h4 className="font-semibold text-slate-900">
                  Host Responsibilities & House Rules
                </h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                As a host, you commit to providing accurate property information,
                maintaining quality standards, and responding to guest inquiries promptly.
              </p>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  {...register('agreeToHouseRules')}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                  I agree to uphold host responsibilities{' '}
                  <span className="text-red-500">*</span>
                </span>
              </label>
              {errors.agreeToHouseRules && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.agreeToHouseRules.message?.toString()}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Guest Communication Policy */}
        <div
          className={`border-2 rounded-xl p-6 transition-all ${
            watch('agreeToGuestCommunicationPolicy')
              ? 'border-green-500 bg-green-50'
              : 'border-slate-200 bg-white'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div
                className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                  watch('agreeToGuestCommunicationPolicy')
                    ? 'border-green-500 bg-green-500'
                    : 'border-slate-300'
                }`}
              >
                {watch('agreeToGuestCommunicationPolicy') && (
                  <CheckCircle2 className="w-4 h-4 text-white" />
                )}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-5 h-5 text-slate-600" />
                <h4 className="font-semibold text-slate-900">
                  Guest Communication Policy
                </h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                Commit to responding to guest messages within 24 hours and maintaining
                professional, respectful communication at all times.
              </p>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  {...register('agreeToGuestCommunicationPolicy')}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                  I agree to the communication policy{' '}
                  <span className="text-red-500">*</span>
                </span>
              </label>
              {errors.agreeToGuestCommunicationPolicy && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.agreeToGuestCommunicationPolicy.message?.toString()}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Guest Vetting Consent */}
        <div
          className={`border-2 rounded-xl p-6 transition-all ${
            watch('guestVettingConsent')
              ? 'border-green-500 bg-green-50'
              : 'border-slate-200 bg-white'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div
                className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                  watch('guestVettingConsent')
                    ? 'border-green-500 bg-green-500'
                    : 'border-slate-300'
                }`}
              >
                {watch('guestVettingConsent') && (
                  <CheckCircle2 className="w-4 h-4 text-white" />
                )}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-slate-600" />
                <h4 className="font-semibold text-slate-900">Guest Vetting Consent</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                Allow the platform to verify guest identities and backgrounds to ensure
                safety and security for all hosts and properties.
              </p>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  {...register('guestVettingConsent')}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                  I consent to guest vetting procedures{' '}
                  <span className="text-red-500">*</span>
                </span>
              </label>
              {errors.guestVettingConsent && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.guestVettingConsent.message?.toString()}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Optional Legal Information */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">
          Legal Information (Optional)
        </h3>
        <p className="text-sm text-slate-600 mb-6">
          Providing this information can help with regulatory compliance in your area.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              License Number
            </label>
            <input
              type="text"
              {...register('legalInformation.licenseNumber')}
              placeholder="e.g., STR-2024-001234"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Business Registration
            </label>
            <input
              type="text"
              {...register('legalInformation.businessRegistration')}
              placeholder="e.g., BR-123456789"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Tax ID
            </label>
            <input
              type="text"
              {...register('legalInformation.taxId')}
              placeholder="e.g., 12-3456789"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Insurance Details
            </label>
            <input
              type="text"
              {...register('legalInformation.insuranceDetails')}
              placeholder="e.g., Policy #ABC123"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Agreement Status */}
      <div
        className={`p-6 border-2 rounded-xl ${
          allAgreed
            ? 'border-green-500 bg-green-50'
            : 'border-amber-500 bg-amber-50'
        }`}
      >
        <div className="flex items-start gap-4">
          {allAgreed ? (
            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
          ) : (
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
          )}
          <div>
            <h4
              className={`font-semibold mb-1 ${
                allAgreed ? 'text-green-900' : 'text-amber-900'
              }`}
            >
              {allAgreed
                ? 'All required agreements accepted'
                : 'Please accept all required agreements'}
            </h4>
            <p
              className={`text-sm ${
                allAgreed ? 'text-green-700' : 'text-amber-700'
              }`}
            >
              {allAgreed
                ? "You're ready to proceed to the final step!"
                : 'You must accept all agreements marked with * to continue'}
            </p>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
        <h4 className="font-semibold text-slate-900 mb-2">Why these agreements?</h4>
        <ul className="text-sm text-slate-700 space-y-1">
          <li>
            • Protects both hosts and guests by setting clear expectations
          </li>
          <li>• Ensures compliance with local laws and platform policies</li>
          <li>
            • Maintains quality standards across all properties on the platform
          </li>
          <li>• Enables us to provide support and resolve disputes fairly</li>
        </ul>
      </div>
    </div>
  );
}
