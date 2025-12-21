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
              Mülk İlanınızı Gözden Geçirin
            </h3>
            <p className="text-indigo-700">
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
            <Home className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-slate-900">Temel Bilgiler</h3>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
          >
            <Edit className="w-4 h-4" />
            Düzenle
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-600">Mülk Adı:</span>
            <p className="font-semibold text-slate-900">{step1.propertyName || 'Belirtilmemiş'}</p>
          </div>
          <div>
            <span className="text-slate-600">Mülk Tipi:</span>
            <p className="font-semibold text-slate-900 capitalize">
              {step1.propertyType || 'Belirtilmemiş'}
            </p>
          </div>
          <div>
            <span className="text-slate-600">Yatak Odaları:</span>
            <p className="font-semibold text-slate-900">{step1.numberOfRooms || 'Belirtilmemiş'}</p>
          </div>
          <div>
            <span className="text-slate-600">Banyolar:</span>
            <p className="font-semibold text-slate-900">
              {step1.numberOfBathrooms || 'Belirtilmemiş'}
            </p>
          </div>
          <div>
            <span className="text-slate-600">Maksimum Misafir:</span>
            <p className="font-semibold text-slate-900">{step1.maximumGuests || 'Belirtilmemiş'}</p>
          </div>
          <div className="md:col-span-2">
            <span className="text-slate-600">Açıklama:</span>
            <p className="font-medium text-slate-900 mt-1 line-clamp-3">
              {step1.description || 'Belirtilmemiş'}
            </p>
          </div>
        </div>
      </div>

      {/* Step 2 Summary - Location */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-red-600" />
            <h3 className="text-lg font-bold text-slate-900">Konum</h3>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
          >
            <Edit className="w-4 h-4" />
            Düzenle
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-600">Adres:</span>
            <p className="font-semibold text-slate-900">{step2.address || 'Belirtilmemiş'}</p>
          </div>
          <div>
            <span className="text-slate-600">Şehir:</span>
            <p className="font-semibold text-slate-900">{step2.city || 'Belirtilmemiş'}</p>
          </div>
          <div>
            <span className="text-slate-600">İl/Eyalet:</span>
            <p className="font-semibold text-slate-900">{step2.province || 'Belirtilmemiş'}</p>
          </div>
          <div>
            <span className="text-slate-600">Ülke:</span>
            <p className="font-semibold text-slate-900">{step2.country || 'Belirtilmemiş'}</p>
          </div>
          <div>
            <span className="text-slate-600">Koordinatlar:</span>
            <p className="font-semibold text-slate-900">
              {step2.coordinates
                ? `${step2.coordinates.latitude}, ${step2.coordinates.longitude}`
                : 'Belirtilmemiş'}
            </p>
          </div>
        </div>
      </div>

      {/* Step 3 Summary - Amenities */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-bold text-slate-900">Olanaklar ve Özellikler</h3>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
          >
            <Edit className="w-4 h-4" />
            Düzenle
          </button>
        </div>
        <div className="text-sm">
          <span className="text-slate-600">Seçilen Olanaklar:</span>
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
              <p className="text-slate-500">Olanak seçilmedi</p>
            )}
          </div>
          {step3.customAmenities && step3.customAmenities.length > 0 && (
            <>
              <span className="text-slate-600 mt-4 block">Özel Olanaklar:</span>
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
            <h3 className="text-lg font-bold text-slate-900">Fiyatlandırma</h3>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
          >
            <Edit className="w-4 h-4" />
            Düzenle
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-600">Temel Fiyat:</span>
            <p className="font-semibold text-slate-900">
              {step4.currency} ${step4.basePrice || 'Belirtilmemiş'} gecelik
            </p>
          </div>
          <div>
            <span className="text-slate-600">Minimum Konaklama:</span>
            <p className="font-semibold text-slate-900">
              {step4.availability?.minStay || 'Belirtilmemiş'} gece
            </p>
          </div>
          {step4.discounts?.weeklyDiscount > 0 && (
            <div>
              <span className="text-slate-600">Haftalık İndirim:</span>
              <p className="font-semibold text-green-600">
                %{step4.discounts.weeklyDiscount} indirim
              </p>
            </div>
          )}
          {step4.discounts?.monthlyDiscount > 0 && (
            <div>
              <span className="text-slate-600">Aylık İndirim:</span>
              <p className="font-semibold text-green-600">
                %{step4.discounts.monthlyDiscount} indirim
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
            <h3 className="text-lg font-bold text-slate-900">Fotoğraflar</h3>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
          >
            <Edit className="w-4 h-4" />
            Düzenle
          </button>
        </div>
        <div className="text-sm">
          <span className="text-slate-600">
            Toplam Fotoğraf: {step5.photos?.length || 0}
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
                      Kapak
                    </div>
                  )}
                </div>
              ))}
              {step5.photos.length > 8 && (
                <div className="aspect-square rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 font-semibold">
                  +{step5.photos.length - 8} tane daha
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
            <h3 className="text-lg font-bold text-slate-900">Ev Kuralları</h3>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
          >
            <Edit className="w-4 h-4" />
            Düzenle
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-600">Giriş:</span>
            <p className="font-semibold text-slate-900">{step6.checkInTime || 'Belirtilmemiş'}</p>
          </div>
          <div>
            <span className="text-slate-600">Çıkış:</span>
            <p className="font-semibold text-slate-900">{step6.checkOutTime || 'Belirtilmemiş'}</p>
          </div>
          <div>
            <span className="text-slate-600">İptal Politikası:</span>
            <p className="font-semibold text-slate-900 capitalize">
              {step6.cancellationPolicy?.replace('_', ' ') || 'Belirtilmemiş'}
            </p>
          </div>
          <div className="md:col-span-2">
            <span className="text-slate-600">Politikalar:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {step6.policies?.smokingAllowed && (
                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs">
                  Sigara İçilebilir
                </span>
              )}
              {step6.policies?.petsAllowed && (
                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs">
                  Evcil Hayvan Kabul Edilir
                </span>
              )}
              {step6.policies?.eventsAllowed && (
                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs">
                  Etkinliklere İzin Verilir
                </span>
              )}
            </div>
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
              <h4 className="font-semibold text-slate-900">Taslak Olarak Kaydet</h4>
              <p className="text-sm text-slate-600">
                İlerlemenizi kaydedin ve daha sonra düzenlemeye devam edin
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
              <h4 className="font-semibold text-slate-900">İnceleme İçin Gönder</h4>
              <p className="text-sm text-slate-600">
                Mülkünüzü onay ve ilanlamak için gönderin
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
          Ek Notlar (İsteğe Bağlı)
        </h3>
        <textarea
          {...register('additionalNotes')}
          rows={4}
          placeholder="İnceleme ekibimizle paylaşmak istediğiniz ek bilgiler..."
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
        <h3 className="text-lg font-bold text-green-900 mb-4">Son Kontrol Listesi</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="text-green-800">Tüm zorunlu bilgiler sağlandı</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="text-green-800">Fotoğraflar yüklendi (minimum 5)</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="text-green-800">Fiyatlandırma ve müsaitlik ayarlandı</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="text-green-800">Şartlar ve sözleşmeler kabul edildi</span>
          </div>
        </div>
      </div>

      {/* Warning */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-amber-900 mb-1">Göndermeden Önce:</h4>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>• Tüm bilgilerin doğruluğunu gözden geçirin</li>
              <li>• Tüm fotoğrafların mülkünüzü doğru şekilde temsil ettiğinden emin olun</li>
              <li>
                • Mülkler genellikle 24-48 saat içinde incelenir
              </li>
              <li>• Onaylandıktan sonra e-posta bildirimi alacaksınız</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
