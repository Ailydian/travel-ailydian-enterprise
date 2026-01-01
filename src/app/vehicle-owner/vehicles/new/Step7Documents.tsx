'use client';

import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import {
  FileText,
  Shield,
  Upload,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Building2,
  User,
  Globe,
} from 'lucide-react';

export default function Step7Documents() {
  const { t } = useTranslation('vehicle-owner');
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, boolean>>({});

  const formData = watch();

  const handleFileUpload = (field: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulated file upload
      const reader = new FileReader();
      reader.onload = (e) => {
        setValue(field, e.target?.result as string);
        setUploadedFiles(prev => ({ ...prev, [field]: true }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center">
        <Shield className="w-16 h-16 text-lydian-success mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-lydian-text-inverse">
          {t('vehicleSubmission.step7.title')}
        </h2>
        <p className="text-lydian-text-dim mt-2">
          {t('vehicleSubmission.step7.description')}
        </p>
      </div>

      {/* Insurance Section */}
      <div className="bg-lydian-bg/5 rounded-xl shadow-sm border border-lydian-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-lydian-success" />
          <h3 className="text-xl font-semibold text-lydian-text-inverse">
            {t('vehicleSubmission.step7.insurance.title')}
          </h3>
        </div>

        {/* Traffic Insurance */}
        <div className="space-y-4 mb-6 pb-6 border-b border-lydian-border">
          <h4 className="font-medium text-lydian-text-inverse flex items-center gap-2">
            <Shield className="w-5 h-5 text-lydian-primary" />
            {t('vehicleSubmission.step7.insurance.traffic.title')}
            <span className="text-lydian-secondary">*</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                {t('vehicleSubmission.step7.insurance.policyNumber')}
              </label>
              <input
                {...register('insurance.trafficInsurance.policyNumber')}
                type="text"
                className="w-full px-4 py-3 border border-lydian-border-medium rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="12345678901234"
              />
              {errors.insurance?.trafficInsurance?.policyNumber && (
                <p className="text-lydian-secondary text-sm mt-1">
                  {errors.insurance.trafficInsurance.policyNumber.message as string}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                {t('vehicleSubmission.step7.insurance.company')}
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-lydian-text-muted" />
                <input
                  {...register('insurance.trafficInsurance.company')}
                  type="text"
                  className="w-full pl-11 pr-4 py-3 border border-lydian-border-medium rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Anadolu Sigorta"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                {t('vehicleSubmission.step7.insurance.expiryDate')}
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-lydian-text-muted" />
                <input
                  {...register('insurance.trafficInsurance.expiryDate')}
                  type="date"
                  className="w-full pl-11 pr-4 py-3 border border-lydian-border-medium rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                {t('vehicleSubmission.step7.insurance.document')}
              </label>
              <label className="relative cursor-pointer group">
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  className="hidden"
                  onChange={(e) => handleFileUpload('insurance.trafficInsurance.document', e)}
                />
                <div className={`flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed rounded-lg transition-all ${
                  uploadedFiles['insurance.trafficInsurance.document']
                    ? 'border-green-500 bg-green-50'
                    : 'border-lydian-border-medium hover:border-green-500'
                }`}>
                  {uploadedFiles['insurance.trafficInsurance.document'] ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-lydian-success" />
                      <span className="text-sm text-lydian-success font-medium">
                        {t('vehicleSubmission.step7.uploaded')}
                      </span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 text-lydian-text-muted group-hover:text-lydian-success" />
                      <span className="text-sm text-lydian-text-dim group-hover:text-lydian-success">
                        {t('vehicleSubmission.step7.uploadFile')}
                      </span>
                    </>
                  )}
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Comprehensive Insurance (Optional) */}
        <div className="space-y-4">
          <h4 className="font-medium text-lydian-text-inverse flex items-center gap-2">
            <Shield className="w-5 h-5 text-lydian-success" />
            {t('vehicleSubmission.step7.insurance.comprehensive.title')}
            <span className="text-sm text-lydian-text-muted">({t('common.optional')})</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                {...register('insurance.comprehensiveInsurance.policyNumber')}
                type="text"
                className="w-full px-4 py-3 border border-lydian-border-medium rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder={t('vehicleSubmission.step7.insurance.policyNumber')}
              />
            </div>

            <div>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-lydian-text-muted" />
                <input
                  {...register('insurance.comprehensiveInsurance.company')}
                  type="text"
                  className="w-full pl-11 pr-4 py-3 border border-lydian-border-medium rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder={t('vehicleSubmission.step7.insurance.company')}
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-lydian-text-muted" />
                <input
                  {...register('insurance.comprehensiveInsurance.expiryDate')}
                  type="date"
                  className="w-full pl-11 pr-4 py-3 border border-lydian-border-medium rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div>
              <label className="relative cursor-pointer group">
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  className="hidden"
                  onChange={(e) => handleFileUpload('insurance.comprehensiveInsurance.document', e)}
                />
                <div className={`flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed rounded-lg transition-all ${
                  uploadedFiles['insurance.comprehensiveInsurance.document']
                    ? 'border-green-500 bg-green-50'
                    : 'border-lydian-border-medium hover:border-green-500'
                }`}>
                  {uploadedFiles['insurance.comprehensiveInsurance.document'] ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-lydian-success" />
                      <span className="text-sm text-lydian-success font-medium">
                        {t('vehicleSubmission.step7.uploaded')}
                      </span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 text-lydian-text-muted group-hover:text-lydian-success" />
                      <span className="text-sm text-lydian-text-dim group-hover:text-lydian-success">
                        {t('vehicleSubmission.step7.uploadFile')}
                      </span>
                    </>
                  )}
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Documents */}
      <div className="bg-lydian-bg/5 rounded-xl shadow-sm border border-lydian-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-6 h-6 text-lydian-success" />
          <h3 className="text-xl font-semibold text-lydian-text-inverse">
            {t('vehicleSubmission.step7.documents.title')}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Registration Document */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              {t('vehicleSubmission.step7.documents.registration')}
              <span className="text-lydian-secondary ml-1">*</span>
            </label>
            <label className="relative cursor-pointer group">
              <input
                type="file"
                accept="image/*,application/pdf"
                className="hidden"
                onChange={(e) => handleFileUpload('documents.registrationDocument', e)}
              />
              <div className={`flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed rounded-lg transition-all min-h-[120px] ${
                uploadedFiles['documents.registrationDocument']
                  ? 'border-green-500 bg-green-50'
                  : 'border-lydian-border-medium hover:border-green-500'
              }`}>
                {uploadedFiles['documents.registrationDocument'] ? (
                  <>
                    <CheckCircle2 className="w-8 h-8 text-lydian-success" />
                    <span className="text-sm text-lydian-success font-medium text-center">
                      {t('vehicleSubmission.step7.uploaded')}
                    </span>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-lydian-text-muted group-hover:text-lydian-success" />
                    <span className="text-sm text-lydian-text-dim group-hover:text-lydian-success text-center">
                      {t('vehicleSubmission.step7.uploadFile')}
                    </span>
                  </>
                )}
              </div>
            </label>
          </div>

          {/* Inspection Report */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              {t('vehicleSubmission.step7.documents.inspection')}
              <span className="text-sm text-lydian-text-muted ml-1">({t('common.optional')})</span>
            </label>
            <label className="relative cursor-pointer group">
              <input
                type="file"
                accept="image/*,application/pdf"
                className="hidden"
                onChange={(e) => handleFileUpload('documents.inspectionReport', e)}
              />
              <div className={`flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed rounded-lg transition-all min-h-[120px] ${
                uploadedFiles['documents.inspectionReport']
                  ? 'border-green-500 bg-green-50'
                  : 'border-lydian-border-medium hover:border-green-500'
              }`}>
                {uploadedFiles['documents.inspectionReport'] ? (
                  <>
                    <CheckCircle2 className="w-8 h-8 text-lydian-success" />
                    <span className="text-sm text-lydian-success font-medium text-center">
                      {t('vehicleSubmission.step7.uploaded')}
                    </span>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-lydian-text-muted group-hover:text-lydian-success" />
                    <span className="text-sm text-lydian-text-dim group-hover:text-lydian-success text-center">
                      {t('vehicleSubmission.step7.uploadFile')}
                    </span>
                  </>
                )}
              </div>
            </label>
          </div>

          {/* Ownership Proof */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              {t('vehicleSubmission.step7.documents.ownership')}
              <span className="text-lydian-secondary ml-1">*</span>
            </label>
            <label className="relative cursor-pointer group">
              <input
                type="file"
                accept="image/*,application/pdf"
                className="hidden"
                onChange={(e) => handleFileUpload('documents.ownershipProof', e)}
              />
              <div className={`flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed rounded-lg transition-all min-h-[120px] ${
                uploadedFiles['documents.ownershipProof']
                  ? 'border-green-500 bg-green-50'
                  : 'border-lydian-border-medium hover:border-green-500'
              }`}>
                {uploadedFiles['documents.ownershipProof'] ? (
                  <>
                    <CheckCircle2 className="w-8 h-8 text-lydian-success" />
                    <span className="text-sm text-lydian-success font-medium text-center">
                      {t('vehicleSubmission.step7.uploaded')}
                    </span>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-lydian-text-muted group-hover:text-lydian-success" />
                    <span className="text-sm text-lydian-text-dim group-hover:text-lydian-success text-center">
                      {t('vehicleSubmission.step7.uploadFile')}
                    </span>
                  </>
                )}
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Driver Requirements */}
      <div className="bg-lydian-bg/5 rounded-xl shadow-sm border border-lydian-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-6 h-6 text-lydian-success" />
          <h3 className="text-xl font-semibold text-lydian-text-inverse">
            {t('vehicleSubmission.step7.driverRequirements.title')}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              {t('vehicleSubmission.step7.driverRequirements.minAge')}
            </label>
            <input
              {...register('driverRequirements.minAge', { valueAsNumber: true })}
              type="number"
              min="18"
              max="70"
              defaultValue={21}
              className="w-full px-4 py-3 border border-lydian-border-medium rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              {t('vehicleSubmission.step7.driverRequirements.minLicenseYears')}
            </label>
            <input
              {...register('driverRequirements.minLicenseYears', { valueAsNumber: true })}
              type="number"
              min="0"
              max="20"
              defaultValue={2}
              className="w-full px-4 py-3 border border-lydian-border-medium rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              {t('vehicleSubmission.step7.driverRequirements.internationalLicense')}
            </label>
            <div className="flex items-center gap-4 h-[48px]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  {...register('driverRequirements.internationalLicense')}
                  type="radio"
                  value="true"
                  className="w-4 h-4 text-lydian-success"
                />
                <span className="text-sm text-gray-200">{t('common.required')}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  {...register('driverRequirements.internationalLicense')}
                  type="radio"
                  value="false"
                  defaultChecked
                  className="w-4 h-4 text-lydian-success"
                />
                <span className="text-sm text-gray-200">{t('common.notRequired')}</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Info Alert */}
      <div className="bg-lydian-info-lighter border border-blue-200 rounded-lg p-4 flex gap-3">
        <AlertCircle className="w-5 h-5 text-lydian-primary flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-900">
          <p className="font-medium mb-1">{t('vehicleSubmission.step7.infoTitle')}</p>
          <p>{t('vehicleSubmission.step7.infoDescription')}</p>
        </div>
      </div>
    </motion.div>
  );
}
