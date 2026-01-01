'use client';

import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
import {
  Upload,
  FileText,
  Shield,
  Award,
  CheckCircle2,
  AlertCircle,
  Calendar,
  User,
  Phone,
  CreditCard,
  ClipboardCheck,
  Brain,
} from 'lucide-react';

interface DocumentUpload {
  file: File | null;
  fileName: string;
  uploaded: boolean;
}

interface Step5Props {
  data?: any;
  allData?: any;
}

export default function Step5Legal({ data }: Step5Props) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [documents, setDocuments] = useState<Record<string, DocumentUpload>>({
    tourismLicense: { file: null, fileName: '', uploaded: false },
    commercialPlate: { file: null, fileName: '', uploaded: false },
    vehicleRegistration: { file: null, fileName: '', uploaded: false },
    insurance: { file: null, fileName: '', uploaded: false },
    inspection: { file: null, fileName: '', uploaded: false },
  });

  const handleFileUpload = (docType: string, file: File) => {
    setDocuments({
      ...documents,
      [docType]: {
        file,
        fileName: file.name,
        uploaded: true,
      },
    });
    setValue(`documents.${docType}`, file, { shouldValidate: true });
  };

  const removeDocument = (docType: string) => {
    setDocuments({
      ...documents,
      [docType]: { file: null, fileName: '', uploaded: false },
    });
    setValue(`documents.${docType}`, null, { shouldValidate: true });
  };

  const DocumentUploadCard = ({
    docType,
    title,
    description,
    icon: Icon,
    required = true,
  }: {
    docType: string;
    title: string;
    description: string;
    icon: React.ElementType;
    required?: boolean;
  }) => {
    const doc = documents[docType];
    const isUploaded = doc.uploaded;

    return (
      <div
        className={`p-5 border-2 rounded-xl transition-all ${
          isUploaded
            ? 'border-green-500 bg-green-50'
            : 'border-slate-200 bg-lydian-bg/5 hover:border-cyan-300'
        }`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`p-3 rounded-xl ${
              isUploaded
                ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                : 'bg-gradient-to-br from-slate-100 to-slate-200'
            }`}
          >
            <Icon className={`w-6 h-6 ${isUploaded ? 'text-lydian-text-inverse' : 'text-slate-600'}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  {title}
                  {required && <span className="text-lydian-secondary text-sm">*</span>}
                </h4>
                <p className="text-sm text-slate-600 mt-1">{description}</p>
              </div>
              {isUploaded && (
                <CheckCircle2 className="w-6 h-6 text-lydian-success flex-shrink-0" />
              )}
            </div>

            {isUploaded ? (
              <div className="flex items-center justify-between mt-3 p-3 bg-lydian-bg/5 rounded-lg border border-green-200">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-lydian-success" />
                  <span className="text-sm font-medium text-slate-900">{doc.fileName}</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeDocument(docType)}
                  className="text-sm text-lydian-error hover:text-lydian-primary-hover font-semibold"
                >
                  Kaldır
                </button>
              </div>
            ) : (
              <div className="mt-3">
                <input
                  type="file"
                  id={`upload-${docType}`}
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileUpload(docType, e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />
                <label
                  htmlFor={`upload-${docType}`}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-lydian-text-inverse rounded-lg font-semibold hover:from-cyan-700 hover:to-blue-700 cursor-pointer transition-all"
                >
                  <Upload className="w-4 h-4" />
                  Belge Yükle
                </label>
                <p className="text-xs text-slate-500 mt-2">PDF, JPG veya PNG - Max 10MB</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* D2 Tourism License */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Award className="w-6 h-6 text-cyan-600" />
          D2 Turizm Belgesi
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Belge Veriliş Tarihi <span className="text-lydian-secondary">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="date"
                {...register('tourismLicense.issueDate', {
                  required: 'Belge veriliş tarihi gerekli',
                })}
                className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
              />
            </div>
            {errors.tourismLicense?.issueDate && (
              <p className="mt-1 text-sm text-lydian-error">
                {errors.tourismLicense.issueDate.message?.toString()}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Belge Son Kullanma Tarihi <span className="text-lydian-secondary">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="date"
                {...register('tourismLicense.expiryDate', {
                  required: 'Belge son kullanma tarihi gerekli',
                })}
                className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
              />
            </div>
            {errors.tourismLicense?.expiryDate && (
              <p className="mt-1 text-sm text-lydian-error">
                {errors.tourismLicense.expiryDate.message?.toString()}
              </p>
            )}
          </div>
        </div>

        <DocumentUploadCard
          docType="tourismLicense"
          title="D2 Turizm Belgesi"
          description="Kültür ve Turizm Bakanlığı tarafından verilen D2 turizm işletme belgesi"
          icon={Award}
        />
      </div>

      {/* Vehicle Documents */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <FileText className="w-6 h-6 text-cyan-600" />
          Araç Belgeleri
        </h3>

        <div className="space-y-4">
          <DocumentUploadCard
            docType="commercialPlate"
            title="Ticari Plaka Belgesi"
            description="Sarı plakalı ticari araç tescil belgesi"
            icon={CreditCard}
          />

          <DocumentUploadCard
            docType="vehicleRegistration"
            title="Araç Ruhsatı"
            description="Güncel araç ruhsat belgesi (her iki yüz)"
            icon={FileText}
          />

          <DocumentUploadCard
            docType="inspection"
            title="Periyodik Muayene Belgesi"
            description="Geçerli periyodik araç muayene belgesi"
            icon={ClipboardCheck}
          />
        </div>
      </div>

      {/* Insurance */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Shield className="w-6 h-6 text-cyan-600" />
          Sigorta Bilgileri
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Sigorta Şirketi <span className="text-lydian-secondary">*</span>
            </label>
            <input
              type="text"
              {...register('insurance.provider', { required: 'Sigorta şirketi gerekli' })}
              placeholder="Örn: Anadolu Sigorta"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
            />
            {errors.insurance?.provider && (
              <p className="mt-1 text-sm text-lydian-error">
                {errors.insurance.provider.message?.toString()}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Poliçe Numarası <span className="text-lydian-secondary">*</span>
            </label>
            <input
              type="text"
              {...register('insurance.policyNumber', { required: 'Poliçe numarası gerekli' })}
              placeholder="XXXXXXXX"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
            />
            {errors.insurance?.policyNumber && (
              <p className="mt-1 text-sm text-lydian-error">
                {errors.insurance.policyNumber.message?.toString()}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Yolcu Başı Teminat (₺) <span className="text-lydian-secondary">*</span>
            </label>
            <input
              type="number"
              {...register('insurance.coverage', {
                required: 'Teminat tutarı gerekli',
                valueAsNumber: true,
                min: 100000,
              })}
              placeholder="500000"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
            />
            <p className="mt-1 text-xs text-slate-500">Minimum ₺100,000 (Önerilen: ₺500,000)</p>
            {errors.insurance?.coverage && (
              <p className="mt-1 text-sm text-lydian-error">
                {errors.insurance.coverage.message?.toString()}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Sigorta Bitiş Tarihi <span className="text-lydian-secondary">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="date"
                {...register('insurance.expiryDate', {
                  required: 'Sigorta bitiş tarihi gerekli',
                })}
                className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
              />
            </div>
            {errors.insurance?.expiryDate && (
              <p className="mt-1 text-sm text-lydian-error">
                {errors.insurance.expiryDate.message?.toString()}
              </p>
            )}
          </div>
        </div>

        <DocumentUploadCard
          docType="insurance"
          title="Sigorta Poliçesi"
          description="Kasko ve yolcu sigortası poliçe belgesi"
          icon={Shield}
        />
      </div>

      {/* Driver Information */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <User className="w-6 h-6 text-cyan-600" />
          Ana Sürücü Bilgileri
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Ad Soyad <span className="text-lydian-secondary">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                {...register('driver.name', { required: 'Sürücü adı gerekli' })}
                placeholder="Ahmet Yılmaz"
                className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
              />
            </div>
            {errors.driver?.name && (
              <p className="mt-1 text-sm text-lydian-error">
                {errors.driver.name.message?.toString()}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Telefon <span className="text-lydian-secondary">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="tel"
                {...register('driver.phone', { required: 'Sürücü telefonu gerekli' })}
                placeholder="0532 XXX XX XX"
                className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
              />
            </div>
            {errors.driver?.phone && (
              <p className="mt-1 text-sm text-lydian-error">
                {errors.driver.phone.message?.toString()}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Ehliyet Numarası <span className="text-lydian-secondary">*</span>
            </label>
            <input
              type="text"
              {...register('driver.licenseNumber', { required: 'Ehliyet numarası gerekli' })}
              placeholder="XXXXXX"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
            />
            {errors.driver?.licenseNumber && (
              <p className="mt-1 text-sm text-lydian-error">
                {errors.driver.licenseNumber.message?.toString()}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Ehliyet Son Kullanma <span className="text-lydian-secondary">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="date"
                {...register('driver.licenseExpiry', {
                  required: 'Ehliyet son kullanma tarihi gerekli',
                })}
                className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
              />
            </div>
            {errors.driver?.licenseExpiry && (
              <p className="mt-1 text-sm text-lydian-error">
                {errors.driver.licenseExpiry.message?.toString()}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              SRC-4 Belge No <span className="text-lydian-secondary">*</span>
            </label>
            <div className="relative">
              <ClipboardCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                {...register('driver.src4Number', { required: 'SRC-4 belgesi gerekli' })}
                placeholder="SRC4-XXXXXX"
                className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
              />
            </div>
            <p className="mt-1 text-xs text-slate-500">Mesleki Yeterlilik Belgesi</p>
            {errors.driver?.src4Number && (
              <p className="mt-1 text-sm text-lydian-error">
                {errors.driver.src4Number.message?.toString()}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Psikoteknik Belge No <span className="text-lydian-secondary">*</span>
            </label>
            <div className="relative">
              <Brain className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                {...register('driver.psychotechNumber', {
                  required: 'Psikoteknik belgesi gerekli',
                })}
                placeholder="PSY-XXXXXX"
                className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
              />
            </div>
            {errors.driver?.psychotechNumber && (
              <p className="mt-1 text-sm text-lydian-error">
                {errors.driver.psychotechNumber.message?.toString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-amber-900 mb-2">Önemli Yasal Gereklilikler</h4>
            <ul className="text-sm text-amber-800 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">•</span>
                <span>
                  Tüm belgeler <strong>güncel ve geçerli</strong> olmalıdır
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">•</span>
                <span>
                  D2 turizm belgesi ve ticari plaka <strong>zorunludur</strong>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">•</span>
                <span>
                  Yolcu sigortası minimum <strong>₺100,000</strong> teminat içermelidir
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">•</span>
                <span>
                  Sürücü <strong>SRC-4</strong> mesleki yeterlilik belgesine sahip olmalıdır
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">•</span>
                <span>Belgeler sistem tarafından doğrulanacaktır</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
