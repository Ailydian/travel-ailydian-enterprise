'use client';

import React, { useState, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Shield,
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  X,
  File,
  Calendar,
  AlertTriangle,
} from 'lucide-react';

interface Step7Props {
  data?: any;
  allData?: any;
}

interface UploadedDocument {
  id: string;
  type: string;
  url: string;
  file?: File;
  fileName: string;
  uploadedAt: Date;
}

const documentTypes = [
  {
    id: 'registration',
    name: 'Ruhsat',
    description: 'Araç ruhsat belgesi (her iki yüz)',
    required: true,
  },
  {
    id: 'insurance',
    name: 'Kasko Poliçesi',
    description: 'Kasko sigorta belgesi',
    required: true,
  },
  {
    id: 'trafficInsurance',
    name: 'Trafik Sigortası',
    description: 'Zorunlu trafik sigortası belgesi',
    required: true,
  },
  {
    id: 'inspection',
    name: 'Muayene Belgesi',
    description: 'Araç muayene raporu',
    required: false,
  },
];

const coverageTypes = [
  { value: 'comprehensive', label: 'Kasko (Tam Kapsamlı)' },
  { value: 'third-party', label: 'Zorunlu Trafik Sigortası' },
  { value: 'collision', label: 'Çarpma Hasarı' },
];

export default function Step7Insurance({ data }: Step7Props) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [documents, setDocuments] = useState<UploadedDocument[]>(
    watch('uploadedDocuments') || []
  );

  const handleFileUpload = useCallback(
    (docType: string, files: FileList | null) => {
      if (!files || files.length === 0) return;

      const file = files[0];

      // Validate file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        alert('Sadece PDF, JPG ve PNG dosyaları yüklenebilir');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Dosya boyutu 5MB\'dan küçük olmalıdır');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const newDoc: UploadedDocument = {
          id: `doc-${Date.now()}`,
          type: docType,
          url: e.target?.result as string,
          file,
          fileName: file.name,
          uploadedAt: new Date(),
        };

        // Remove existing document of same type
        const filtered = documents.filter((d) => d.type !== docType);
        const updated = [...filtered, newDoc];
        setDocuments(updated);
        setValue('uploadedDocuments', updated, { shouldValidate: true });
      };

      reader.readAsDataURL(file);
    },
    [documents, setValue]
  );

  const removeDocument = (id: string) => {
    const updated = documents.filter((d) => d.id !== id);
    setDocuments(updated);
    setValue('uploadedDocuments', updated, { shouldValidate: true });
  };

  const getDocumentForType = (type: string) => {
    return documents.find((d) => d.type === type);
  };

  const checkExpiryDate = (date: string) => {
    if (!date) return null;

    const expiryDate = new Date(date);
    const today = new Date();
    const daysUntilExpiry = Math.ceil(
      (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysUntilExpiry < 0) {
      return { type: 'expired', message: 'Süresi dolmuş!' };
    } else if (daysUntilExpiry <= 30) {
      return { type: 'warning', message: `${daysUntilExpiry} gün içinde sona erecek` };
    }
    return null;
  };

  const insuranceExpiryDate = watch('insurance.expiryDate');
  const registrationExpiryDate = watch('registration.registrationExpiryDate');
  const inspectionExpiryDate = watch('inspection.nextInspectionDate');

  return (
    <div className="space-y-8">
      {/* Insurance Information */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Shield className="w-5 h-5 text-lydian-primary" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Sigorta Bilgileri</h3>
        </div>

        <div className="space-y-6">
          {/* Insurance Provider */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Sigorta Şirketi <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('insurance.insuranceProvider')}
              placeholder="örn., Anadolu Sigorta, Aksigorta"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
            />
            {errors.insurance?.insuranceProvider && (
              <p className="mt-1 text-sm text-lydian-error">
                {errors.insurance.insuranceProvider.message?.toString()}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Policy Number */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Poliçe Numarası <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('insurance.policyNumber')}
                placeholder="örn., POL-2024-123456"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
              />
              {errors.insurance?.policyNumber && (
                <p className="mt-1 text-sm text-lydian-error">
                  {errors.insurance.policyNumber.message?.toString()}
                </p>
              )}
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Bitiş Tarihi <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                {...register('insurance.expiryDate')}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
              />
              {checkExpiryDate(insuranceExpiryDate) && (
                <div className="mt-2 flex items-center gap-2">
                  <AlertTriangle
                    className={`w-4 h-4 ${
                      checkExpiryDate(insuranceExpiryDate)?.type === 'expired'
                        ? 'text-lydian-error'
                        : 'text-amber-600'
                    }`}
                  />
                  <p
                    className={`text-sm ${
                      checkExpiryDate(insuranceExpiryDate)?.type === 'expired'
                        ? 'text-lydian-error'
                        : 'text-amber-600'
                    }`}
                  >
                    {checkExpiryDate(insuranceExpiryDate)?.message}
                  </p>
                </div>
              )}
              {errors.insurance?.expiryDate && (
                <p className="mt-1 text-sm text-lydian-error">
                  {errors.insurance.expiryDate.message?.toString()}
                </p>
              )}
            </div>
          </div>

          {/* Coverage Type */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Sigorta Türü <span className="text-red-500">*</span>
            </label>
            <select
              {...register('insurance.coverageType')}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-lydian-bg/5"
            >
              <option value="">Seçiniz</option>
              {coverageTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {errors.insurance?.coverageType && (
              <p className="mt-1 text-sm text-lydian-error">
                {errors.insurance.coverageType.message?.toString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Registration Information */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <FileText className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Ruhsat Bilgileri</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Registration Number */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Ruhsat Numarası <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('registration.registrationNumber')}
              placeholder="örn., TR-123456789"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
            />
            {errors.registration?.registrationNumber && (
              <p className="mt-1 text-sm text-lydian-error">
                {errors.registration.registrationNumber.message?.toString()}
              </p>
            )}
          </div>

          {/* Registered Owner */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Kayıtlı Malik <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('registration.registeredOwner')}
              placeholder="örn., Ali Veli"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
            />
            {errors.registration?.registeredOwner && (
              <p className="mt-1 text-sm text-lydian-error">
                {errors.registration.registeredOwner.message?.toString()}
              </p>
            )}
          </div>

          {/* Expiry Date */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Ruhsat Geçerlilik Tarihi
            </label>
            <input
              type="date"
              {...register('registration.registrationExpiryDate')}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
            />
            {checkExpiryDate(registrationExpiryDate) && (
              <div className="mt-2 flex items-center gap-2">
                <AlertTriangle
                  className={`w-4 h-4 ${
                    checkExpiryDate(registrationExpiryDate)?.type === 'expired'
                      ? 'text-lydian-error'
                      : 'text-amber-600'
                  }`}
                />
                <p
                  className={`text-sm ${
                    checkExpiryDate(registrationExpiryDate)?.type === 'expired'
                      ? 'text-lydian-error'
                      : 'text-amber-600'
                  }`}
                >
                  {checkExpiryDate(registrationExpiryDate)?.message}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Inspection Information */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <CheckCircle2 className="w-5 h-5 text-lydian-success" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Muayene Bilgileri (İsteğe Bağlı)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Last Inspection Date */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Son Muayene Tarihi
            </label>
            <input
              type="date"
              {...register('inspection.lastInspectionDate')}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
            />
          </div>

          {/* Next Inspection Date */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Sonraki Muayene Tarihi
            </label>
            <input
              type="date"
              {...register('inspection.nextInspectionDate')}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
            />
            {checkExpiryDate(inspectionExpiryDate) && (
              <div className="mt-2 flex items-center gap-2">
                <AlertTriangle
                  className={`w-4 h-4 ${
                    checkExpiryDate(inspectionExpiryDate)?.type === 'expired'
                      ? 'text-lydian-error'
                      : 'text-amber-600'
                  }`}
                />
                <p
                  className={`text-sm ${
                    checkExpiryDate(inspectionExpiryDate)?.type === 'expired'
                      ? 'text-lydian-error'
                      : 'text-amber-600'
                  }`}
                >
                  {checkExpiryDate(inspectionExpiryDate)?.message}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Document Uploads */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Upload className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Belge Yüklemeleri</h3>
        </div>

        <div className="space-y-4">
          {documentTypes.map((docType) => {
            const uploadedDoc = getDocumentForType(docType.id);

            return (
              <div
                key={docType.id}
                className="border-2 border-slate-200 rounded-lg p-4 hover:border-green-300 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-slate-900">{docType.name}</h4>
                      {docType.required && (
                        <span className="text-xs text-red-500 font-medium">Zorunlu</span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600">{docType.description}</p>
                  </div>
                </div>

                {uploadedDoc ? (
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded">
                        <File className="w-5 h-5 text-lydian-success" />
                      </div>
                      <div>
                        <p className="font-medium text-green-900 text-sm">
                          {uploadedDoc.fileName}
                        </p>
                        <p className="text-xs text-lydian-success">
                          {new Date(uploadedDoc.uploadedAt).toLocaleDateString('tr-TR')}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeDocument(uploadedDoc.id)}
                      className="p-2 text-lydian-error hover:bg-red-50 rounded-lg transition-all"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <label className="block">
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-green-500 hover:bg-green-50 transition-all cursor-pointer">
                      <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-slate-700">
                        Belge Yükle
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        PDF, JPG veya PNG (Max 5MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(docType.id, e.target.files)}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            );
          })}
        </div>

        <input type="hidden" {...register('uploadedDocuments')} value={JSON.stringify(documents)} />
      </div>

      {/* Verification Checklist */}
      <div className="border-2 border-green-500 bg-green-50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-green-900 mb-4">Doğrulama Kontrol Listesi</h3>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            {getDocumentForType('registration') ? (
              <CheckCircle2 className="w-5 h-5 text-lydian-success" />
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
            )}
            <span className="text-sm text-slate-800">Ruhsat belgesi yüklendi</span>
          </div>

          <div className="flex items-center gap-3">
            {getDocumentForType('insurance') ? (
              <CheckCircle2 className="w-5 h-5 text-lydian-success" />
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
            )}
            <span className="text-sm text-slate-800">Kasko belgesi yüklendi</span>
          </div>

          <div className="flex items-center gap-3">
            {getDocumentForType('trafficInsurance') ? (
              <CheckCircle2 className="w-5 h-5 text-lydian-success" />
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
            )}
            <span className="text-sm text-slate-800">Trafik sigortası belgesi yüklendi</span>
          </div>

          <div className="flex items-center gap-3">
            {watch('insurance.insuranceProvider') &&
            watch('insurance.policyNumber') &&
            watch('insurance.expiryDate') ? (
              <CheckCircle2 className="w-5 h-5 text-lydian-success" />
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
            )}
            <span className="text-sm text-slate-800">Sigorta bilgileri tamamlandı</span>
          </div>

          <div className="flex items-center gap-3">
            {watch('registration.registrationNumber') &&
            watch('registration.registeredOwner') ? (
              <CheckCircle2 className="w-5 h-5 text-lydian-success" />
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
            )}
            <span className="text-sm text-slate-800">Ruhsat bilgileri tamamlandı</span>
          </div>
        </div>
      </div>

      {/* Important Info */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-amber-900 mb-1">Önemli Bilgiler:</h4>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>• Tüm belgeler güncel ve geçerli olmalıdır</li>
              <li>• Ruhsat üzerindeki plaka ile girdiğiniz plaka uyuşmalıdır</li>
              <li>• Sigorta belgeniz kasko veya tam kapsamlı olmalıdır</li>
              <li>• Belgeleriniz platform ekibi tarafından doğrulanacaktır</li>
              <li>• Yanlış veya sahte belge tespit edilirse hesabınız kapatılabilir</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
