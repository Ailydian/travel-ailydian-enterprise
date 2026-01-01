'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Car,
  MapPin,
  DollarSign,
  Image,
  Calendar,
  CheckCircle2,
  Edit,
  AlertCircle,
  Sparkles,
  Shield,
  FileText,
  Zap,
  Settings,
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
      <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-lydian-success rounded-lg">
            <Sparkles className="w-6 h-6 text-lydian-text-inverse" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-green-900 mb-2">
              Araç İlanınızı Gözden Geçirin
            </h3>
            <p className="text-lydian-success-text">
              Göndermeden önce lütfen aşağıdaki tüm bilgileri gözden geçirin. Düzenle düğmesine
              tıklayarak herhangi bir bölümü düzenleyebilirsiniz.
            </p>
          </div>
        </div>
      </div>

      {/* Step 1 Summary - Basic Info */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Car className="w-5 h-5 text-lydian-success" />
            <h3 className="text-lg font-bold text-slate-900">Temel Bilgiler</h3>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 text-sm text-lydian-success hover:bg-green-50 rounded-lg transition-all"
          >
            <Edit className="w-4 h-4" />
            Düzenle
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-600">Marka:</span>
            <p className="font-semibold text-slate-900">{step1.brand || 'Belirtilmemiş'}</p>
          </div>
          <div>
            <span className="text-slate-600">Model:</span>
            <p className="font-semibold text-slate-900">{step1.model || 'Belirtilmemiş'}</p>
          </div>
          <div>
            <span className="text-slate-600">Yıl:</span>
            <p className="font-semibold text-slate-900">{step1.year || 'Belirtilmemiş'}</p>
          </div>
          <div>
            <span className="text-slate-600">Plaka:</span>
            <p className="font-semibold text-slate-900 uppercase">
              {step1.licensePlate || 'Belirtilmemiş'}
            </p>
          </div>
          <div>
            <span className="text-slate-600">Araç Tipi:</span>
            <p className="font-semibold text-slate-900 capitalize">
              {step1.vehicleType?.replace('-', ' ') || 'Belirtilmemiş'}
            </p>
          </div>
          <div>
            <span className="text-slate-600">Renk:</span>
            <p className="font-semibold text-slate-900">{step1.color || 'Belirtilmemiş'}</p>
          </div>
          <div className="md:col-span-2">
            <span className="text-slate-600">Açıklama:</span>
            <p className="font-medium text-slate-900 mt-1 line-clamp-3">
              {step1.description || 'Belirtilmemiş'}
            </p>
          </div>
        </div>
      </div>

      {/* Step 2 Summary - Details & Location */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-lydian-primary" />
            <h3 className="text-lg font-bold text-slate-900">Araç Detayları ve Konum</h3>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 text-sm text-lydian-success hover:bg-green-50 rounded-lg transition-all"
          >
            <Edit className="w-4 h-4" />
            Düzenle
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-600">Vites:</span>
            <p className="font-semibold text-slate-900 capitalize">
              {step2.transmission === 'manual' && 'Manuel'}
              {step2.transmission === 'automatic' && 'Otomatik'}
              {step2.transmission === 'semi-automatic' && 'Yarı Otomatik'}
              {!step2.transmission && 'Belirtilmemiş'}
            </p>
          </div>
          <div>
            <span className="text-slate-600">Yakıt Türü:</span>
            <p className="font-semibold text-slate-900 capitalize">
              {step2.fuelType === 'petrol' && 'Benzin'}
              {step2.fuelType === 'diesel' && 'Dizel'}
              {step2.fuelType === 'electric' && 'Elektrik'}
              {step2.fuelType === 'hybrid' && 'Hibrit'}
              {!step2.fuelType && 'Belirtilmemiş'}
            </p>
          </div>
          <div>
            <span className="text-slate-600">Koltuk Sayısı:</span>
            <p className="font-semibold text-slate-900">{step2.seats || 'Belirtilmemiş'}</p>
          </div>
          <div>
            <span className="text-slate-600">Kilometre:</span>
            <p className="font-semibold text-slate-900">
              {step2.mileage ? `${step2.mileage.toLocaleString()} km` : 'Belirtilmemiş'}
            </p>
          </div>
          <div>
            <span className="text-slate-600">Şehir:</span>
            <p className="font-semibold text-slate-900">{step2.city || 'Belirtilmemiş'}</p>
          </div>
          <div>
            <span className="text-slate-600">İlçe:</span>
            <p className="font-semibold text-slate-900">{step2.district || 'Belirtilmemiş'}</p>
          </div>
        </div>
      </div>

      {/* Step 3 Summary - Features */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-bold text-slate-900">Araç Özellikleri</h3>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 text-sm text-lydian-success hover:bg-green-50 rounded-lg transition-all"
          >
            <Edit className="w-4 h-4" />
            Düzenle
          </button>
        </div>
        <div className="text-sm">
          <span className="text-slate-600">Seçilen Özellikler:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {step3.features?.hasAirConditioning && (
              <span className="px-3 py-1 bg-lydian-success-light text-green-800 rounded-full text-xs font-medium">
                Klima
              </span>
            )}
            {step3.features?.hasGPS && (
              <span className="px-3 py-1 bg-lydian-success-light text-green-800 rounded-full text-xs font-medium">
                GPS
              </span>
            )}
            {step3.features?.hasBluetoothAudio && (
              <span className="px-3 py-1 bg-lydian-success-light text-green-800 rounded-full text-xs font-medium">
                Bluetooth
              </span>
            )}
            {step3.features?.hasRearCamera && (
              <span className="px-3 py-1 bg-lydian-success-light text-green-800 rounded-full text-xs font-medium">
                Geri Görüş Kamerası
              </span>
            )}
            {step3.features?.hasParkingSensors && (
              <span className="px-3 py-1 bg-lydian-success-light text-green-800 rounded-full text-xs font-medium">
                Park Sensörü
              </span>
            )}
            {!step3.features && (
              <p className="text-slate-500">Özellik seçilmedi</p>
            )}
          </div>
        </div>
      </div>

      {/* Step 4 Summary - Photos */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Image className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-900">Fotoğraflar</h3>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 text-sm text-lydian-success hover:bg-green-50 rounded-lg transition-all"
          >
            <Edit className="w-4 h-4" />
            Düzenle
          </button>
        </div>
        <div className="text-sm">
          <span className="text-slate-600">
            Toplam Fotoğraf: {step4.photos?.length || 0}
          </span>
          {step4.photos && step4.photos.length > 0 && (
            <div className="grid grid-cols-4 gap-2 mt-3">
              {step4.photos.slice(0, 8).map((photo: any, index: number) => (
                <div
                  key={index}
                  className="aspect-square rounded-lg overflow-hidden border border-slate-200 relative"
                >
                  <img
                    src={photo.url}
                    alt={`Vehicle ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {index === step4.coverPhotoIndex && (
                    <div className="absolute top-1 right-1 px-2 py-0.5 bg-lydian-warning-hover text-lydian-text-inverse text-xs font-bold rounded">
                      Kapak
                    </div>
                  )}
                </div>
              ))}
              {step4.photos.length > 8 && (
                <div className="aspect-square rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 font-semibold">
                  +{step4.photos.length - 8} tane daha
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Step 5 Summary - Pricing */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <DollarSign className="w-5 h-5 text-lydian-success" />
            <h3 className="text-lg font-bold text-slate-900">Fiyatlandırma</h3>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 text-sm text-lydian-success hover:bg-green-50 rounded-lg transition-all"
          >
            <Edit className="w-4 h-4" />
            Düzenle
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-600">Günlük Ücret:</span>
            <p className="font-semibold text-slate-900">
              {step5.currency === 'TRY' && '₺'}
              {step5.currency === 'USD' && '$'}
              {step5.currency === 'EUR' && '€'}
              {step5.dailyRate || 'Belirtilmemiş'}
            </p>
          </div>
          <div>
            <span className="text-slate-600">Güvenlik Deposu:</span>
            <p className="font-semibold text-slate-900">
              {step5.currency === 'TRY' && '₺'}
              {step5.currency === 'USD' && '$'}
              {step5.currency === 'EUR' && '€'}
              {step5.securityDeposit || 'Belirtilmemiş'}
            </p>
          </div>
          {step5.discounts?.weeklyDiscount > 0 && (
            <div>
              <span className="text-slate-600">Haftalık İndirim:</span>
              <p className="font-semibold text-lydian-success">
                %{step5.discounts.weeklyDiscount}
              </p>
            </div>
          )}
          {step5.discounts?.monthlyDiscount > 0 && (
            <div>
              <span className="text-slate-600">Aylık İndirim:</span>
              <p className="font-semibold text-lydian-success">
                %{step5.discounts.monthlyDiscount}
              </p>
            </div>
          )}
          <div>
            <span className="text-slate-600">Kilometre Limiti:</span>
            <p className="font-semibold text-slate-900 capitalize">
              {step5.mileageLimit?.type === 'unlimited' ? 'Sınırsız' : 'Limitli'}
            </p>
          </div>
          <div>
            <span className="text-slate-600">Yakıt Politikası:</span>
            <p className="font-semibold text-slate-900">
              {step5.fuelPolicy === 'full-to-full' && 'Dolu/Dolu'}
              {step5.fuelPolicy === 'same-to-same' && 'Aynı/Aynı'}
            </p>
          </div>
        </div>
      </div>

      {/* Step 6 Summary - Availability */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-bold text-slate-900">Müsaitlik</h3>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 text-sm text-lydian-success hover:bg-green-50 rounded-lg transition-all"
          >
            <Edit className="w-4 h-4" />
            Düzenle
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-600">Minimum Kiralama:</span>
            <p className="font-semibold text-slate-900">
              {step6.minRentalDays || 'Belirtilmemiş'} gün
            </p>
          </div>
          <div>
            <span className="text-slate-600">Anında Rezervasyon:</span>
            <p className="font-semibold text-slate-900">
              {step6.instantBookingEnabled ? 'Aktif' : 'Pasif'}
            </p>
          </div>
          <div>
            <span className="text-slate-600">Engellenmiş Tarihler:</span>
            <p className="font-semibold text-slate-900">
              {step6.blockedDates?.length || 0} tarih aralığı
            </p>
          </div>
          <div>
            <span className="text-slate-600">Önceden Bildirim:</span>
            <p className="font-semibold text-slate-900">
              {step6.advanceNoticeHours ? `${step6.advanceNoticeHours} saat` : 'Anında'}
            </p>
          </div>
        </div>
      </div>

      {/* Step 7 Summary - Insurance */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-lydian-primary" />
            <h3 className="text-lg font-bold text-slate-900">Sigorta ve Belgeler</h3>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 text-sm text-lydian-success hover:bg-green-50 rounded-lg transition-all"
          >
            <Edit className="w-4 h-4" />
            Düzenle
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-600">Sigorta Şirketi:</span>
            <p className="font-semibold text-slate-900">
              {step7.insurance?.insuranceProvider || 'Belirtilmemiş'}
            </p>
          </div>
          <div>
            <span className="text-slate-600">Poliçe No:</span>
            <p className="font-semibold text-slate-900">
              {step7.insurance?.policyNumber || 'Belirtilmemiş'}
            </p>
          </div>
          <div>
            <span className="text-slate-600">Ruhsat No:</span>
            <p className="font-semibold text-slate-900">
              {step7.registration?.registrationNumber || 'Belirtilmemiş'}
            </p>
          </div>
          <div>
            <span className="text-slate-600">Yüklenen Belgeler:</span>
            <p className="font-semibold text-slate-900">
              {step7.uploadedDocuments?.length || 0} belge
            </p>
          </div>
        </div>
      </div>

      {/* Submission Type */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Gönderim Türü</h3>

        <div className="space-y-3">
          <label
            className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
              submissionType === 'save_draft'
                ? 'border-green-500 bg-green-50'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <input
              type="radio"
              value="save_draft"
              {...register('submissionType')}
              className="w-5 h-5 text-lydian-success"
            />
            <div>
              <h4 className="font-semibold text-slate-900">Taslak Olarak Kaydet</h4>
              <p className="text-sm text-slate-600">
                İlerlemenizi kaydedin ve daha sonra düzenlemeye devam edin
              </p>
            </div>
          </label>

          <label
            className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
              submissionType === 'submit_for_review'
                ? 'border-green-500 bg-green-50'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <input
              type="radio"
              value="submit_for_review"
              {...register('submissionType')}
              className="w-5 h-5 text-lydian-success"
            />
            <div>
              <h4 className="font-semibold text-slate-900">Yayınla</h4>
              <p className="text-sm text-slate-600">
                Aracınızı onay için gönderin ve yayınlayın
              </p>
            </div>
          </label>
        </div>

        {errors.submissionType && (
          <p className="mt-2 text-sm text-lydian-error">
            {errors.submissionType.message?.toString()}
          </p>
        )}
      </div>

      {/* Terms & Agreements */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Şartlar ve Sözleşmeler</h3>

        <div className="space-y-4">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              {...register('agreeToTerms')}
              className="w-5 h-5 text-lydian-success rounded focus:ring-2 focus:ring-green-500 mt-0.5"
            />
            <span className="text-sm text-slate-700 group-hover:text-slate-900">
              Hizmet şartlarını, araç kiralama politikasını ve topluluk kurallarını okudum ve kabul
              ediyorum. <span className="text-lydian-secondary">*</span>
            </span>
          </label>
          {errors.agreeToTerms && (
            <p className="ml-8 text-sm text-lydian-error">
              {errors.agreeToTerms.message?.toString()}
            </p>
          )}

          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              {...register('agreeToPrivacyPolicy')}
              className="w-5 h-5 text-lydian-success rounded focus:ring-2 focus:ring-green-500 mt-0.5"
            />
            <span className="text-sm text-slate-700 group-hover:text-slate-900">
              Gizlilik politikasını kabul ediyorum ve kişisel verilerimin işlenmesine onay
              veriyorum. <span className="text-lydian-secondary">*</span>
            </span>
          </label>
          {errors.agreeToPrivacyPolicy && (
            <p className="ml-8 text-sm text-lydian-error">
              {errors.agreeToPrivacyPolicy.message?.toString()}
            </p>
          )}

          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              {...register('agreeToInsurancePolicy')}
              className="w-5 h-5 text-lydian-success rounded focus:ring-2 focus:ring-green-500 mt-0.5"
            />
            <span className="text-sm text-slate-700 group-hover:text-slate-900">
              Araç sigorta gereksinimlerini ve sorumluluk politikalarını anlıyorum ve kabul
              ediyorum. <span className="text-lydian-secondary">*</span>
            </span>
          </label>
          {errors.agreeToInsurancePolicy && (
            <p className="ml-8 text-sm text-lydian-error">
              {errors.agreeToInsurancePolicy.message?.toString()}
            </p>
          )}

          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              {...register('agreeToBackgroundCheck')}
              className="w-5 h-5 text-lydian-success rounded focus:ring-2 focus:ring-green-500 mt-0.5"
            />
            <span className="text-sm text-slate-700 group-hover:text-slate-900">
              Kiracıların kimlik ve geçmiş kontrollerinin yapılmasına onay veriyorum.{' '}
              <span className="text-lydian-secondary">*</span>
            </span>
          </label>
          {errors.agreeToBackgroundCheck && (
            <p className="ml-8 text-sm text-lydian-error">
              {errors.agreeToBackgroundCheck.message?.toString()}
            </p>
          )}
        </div>
      </div>

      {/* Additional Notes */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">
          Ek Notlar (İsteğe Bağlı)
        </h3>
        <textarea
          {...register('additionalNotes')}
          rows={4}
          placeholder="İnceleme ekibimizle paylaşmak istediğiniz ek bilgiler..."
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all resize-none"
        />
        {errors.additionalNotes && (
          <p className="mt-1 text-sm text-lydian-error">
            {errors.additionalNotes.message?.toString()}
          </p>
        )}
      </div>

      {/* Final Checklist */}
      <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl">
        <h3 className="text-lg font-bold text-green-900 mb-4">Son Kontrol Listesi</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-lydian-success" />
            <span className="text-green-800">Tüm zorunlu bilgiler sağlandı</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-lydian-success" />
            <span className="text-green-800">Araç fotoğrafları yüklendi (4 açıdan dış görünüm)</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-lydian-success" />
            <span className="text-green-800">Fiyatlandırma ve müsaitlik ayarlandı</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-lydian-success" />
            <span className="text-green-800">Sigorta ve belgeler yüklendi</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-lydian-success" />
            <span className="text-green-800">Şartlar ve sözleşmeler kabul edildi</span>
          </div>
        </div>
      </div>

      {/* Warning */}
      <div className="p-4 bg-lydian-warning-lighter border border-amber-200 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-amber-900 mb-1">Göndermeden Önce:</h4>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>• Tüm bilgilerin doğruluğunu gözden geçirin</li>
              <li>• Tüm fotoğrafların aracınızı doğru şekilde temsil ettiğinden emin olun</li>
              <li>• Sigorta ve belgelerin güncel olduğunu kontrol edin</li>
              <li>• Araçlar genellikle 24-48 saat içinde incelenir</li>
              <li>• Onaylandıktan sonra e-posta bildirimi alacaksınız</li>
              <li>• Yanlış veya sahte bilgi platform kurallarını ihlal eder</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
