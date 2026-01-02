'use client';

import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { MapPin, Navigation, Globe } from 'lucide-react';
import logger from '../../../../lib/logger';
import { useToast } from '../../../../context/ToastContext';

interface Step2Props {
  data?: any;
  allData?: any;
}

const countries = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Italy',
  'Spain',
  'Japan',
  'Brazil',
  'Mexico',
  'Turkey',
  'Greece',
  'Thailand',
  'Portugal',
  'Netherlands',
  'Switzerland',
  'Austria',
  'Belgium',
  'Sweden',
  'Norway',
  'Denmark',
  'Ireland',
];

const timezones = [
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Europe/Rome',
  'Asia/Tokyo',
  'Asia/Dubai',
  'Asia/Singapore',
  'Australia/Sydney',
  'Pacific/Auckland',
];

export default function Step2Location({ data }: Step2Props) {
  const { showSuccess, showError, showWarning, showInfo, showToast } = useToast();

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [isLocating, setIsLocating] = useState(false);

  const latitude = watch('coordinates.latitude');
  const longitude = watch('coordinates.longitude');
  const address = watch('address');

  // Get current location
  const handleGetCurrentLocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setValue('coordinates.latitude', position.coords.latitude, {
            shouldValidate: true,
          });
          setValue('coordinates.longitude', position.coords.longitude, {
            shouldValidate: true,
          });
          setIsLocating(false);
        },
        (error) => {
          logger.error('Error getting location:', error as Error, {component:'Step2location'});
          showToast({ type: 'error', title: 'Konumunuz alınamadı. Lütfen koordinatları manuel olarak girin.' });
          setIsLocating(false);
        }
      );
    } else {
      showToast({ type: 'info', title: 'Coğrafi konum tarayıcınız tarafından desteklenmiyor' });
      setIsLocating(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Country */}
      <div>
        <label className="block text-sm font-semibold text-slate-7 mb-2">
          Ülke <span className="text-purple-500">*</span>
        </label>
        <select
          {...register('country')}
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white/5"
        >
          <option value="">Ülke seçin</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {errors.country && (
          <p className="mt-1 text-sm text-lydian-error">
            {errors.country.message?.toString()}
          </p>
        )}
      </div>

      {/* Province/State and City */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-7 mb-2">
            İl/Eyalet <span className="text-purple-500">*</span>
          </label>
          <input
            type="text"
            {...register('province')}
            placeholder="örn., İstanbul"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
          />
          {errors.province && (
            <p className="mt-1 text-sm text-lydian-error">
              {errors.province.message?.toString()}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-7 mb-2">
            Şehir <span className="text-purple-500">*</span>
          </label>
          <input
            type="text"
            {...register('city')}
            placeholder="örn., Kadıköy"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
          />
          {errors.city && (
            <p className="mt-1 text-sm text-lydian-error">{errors.city.message?.toString()}</p>
          )}
        </div>
      </div>

      {/* District and Postal Code */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-7 mb-2">
            İlçe/Mahalle <span className="text-purple-500">*</span>
          </label>
          <input
            type="text"
            {...register('district')}
            placeholder="örn., Moda"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
          />
          {errors.district && (
            <p className="mt-1 text-sm text-lydian-error">
              {errors.district.message?.toString()}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-7 mb-2">
            Posta Kodu <span className="text-purple-500">*</span>
          </label>
          <input
            type="text"
            {...register('postalCode')}
            placeholder="örn., 3471"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
          />
          {errors.postalCode && (
            <p className="mt-1 text-sm text-lydian-error">
              {errors.postalCode.message?.toString()}
            </p>
          )}
        </div>
      </div>

      {/* Street Address */}
      <div>
        <label className="block text-sm font-semibold text-slate-7 mb-2">
          Sokak Adresi <span className="text-purple-500">*</span>
        </label>
        <input
          type="text"
          {...register('address')}
          placeholder="örn., Bağdat Caddesi No:123, Daire 4B"
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
        />
        {errors.address && (
          <p className="mt-1 text-sm text-lydian-error">
            {errors.address.message?.toString()}
          </p>
        )}
      </div>

      {/* Timezone */}
      <div>
        <label className="block text-sm font-semibold text-slate-7 mb-2">
          Saat Dilimi <span className="text-purple-500">*</span>
        </label>
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-4" />
          <select
            {...register('timezone')}
            className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white/5"
          >
            <option value="">Saat dilimi seçin</option>
            {timezones.map((tz) => (
              <option key={tz} value={tz}>
                {tz.replace(/_/g, ' ')}
              </option>
            ))}
          </select>
        </div>
        {errors.timezone && (
          <p className="mt-1 text-sm text-lydian-error">
            {errors.timezone.message?.toString()}
          </p>
        )}
      </div>

      {/* GPS Coordinates */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-semibold text-slate-7">
            GPS Koordinatları <span className="text-purple-500">*</span>
          </label>
          <button
            type="button"
            onClick={handleGetCurrentLocation}
            disabled={isLocating}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-500-lighter text-blue-500 rounded-lg hover:bg-blue-1 transition-all disabled:opacity-500"
          >
            <Navigation className="w-4 h-4" />
            {isLocating ? 'Konum alınıyor...' : 'Mevcut Konumu Kullan'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-6 mb-1">
              Enlem
            </label>
            <input
              type="number"
              step="0.700to-cyan-B41"
              {...register('coordinates.latitude', { valueAsNumber: true })}
              placeholder="41.1082"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
            {errors.coordinates?.latitude && (
              <p className="mt-1 text-sm text-lydian-error">
                {errors.coordinates.latitude.message?.toString()}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-6 mb-1">
              Boylam
            </label>
            <input
              type="number"
              step="0.700to-cyan-B41"
              {...register('coordinates.longitude', { valueAsNumber: true })}
              placeholder="28.9784"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
            {errors.coordinates?.longitude && (
              <p className="mt-1 text-sm text-lydian-error">
                {errors.coordinates.longitude.message?.toString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Map Preview */}
      {latitude && longitude && (
        <div className="border-2 border-slate-200 rounded-xl overflow-hidden">
          <div className="bg-slate-1 p-4 border-b border-slate-200">
            <div className="flex items-center gap-2 text-slate-7">
              <MapPin className="w-5 h-5" />
              <span className="font-semibold">Konum Önizlemesi</span>
            </div>
          </div>
          <div className="aspect-video bg-slate-200 relative">
            {/* Placeholder for map - In production, integrate Google Maps or Leaflet */}
            <div className="absolute inset-to-cyan-700 flex items-center justify-center bg-gradient-to-br from-blue-1 to-indigo-1">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                <p className="text-slate-7 font-medium">
                  {latitude.toFixed(6)}, {longitude.toFixed(6)}
                </p>
                <p className="text-sm text-slate-6 mt-1">{address || 'Konum'}</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-500 p-3 text-xs text-slate-6">
            Not: Gerçek entegrasyon ile etkileşimli harita burada görüntülenecektir
          </div>
        </div>
      )}

      {/* Bedroom Configuration */}
      <div className="border-t-2 border-slate-200 pt-8">
        <h3 className="text-lg font-bold text-slate-9 mb-4">Yatak Odası Yapılandırması</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-7 mb-2">
              Çift Kişilik Yataklar
            </label>
            <input
              type="number"
              {...register('bedrooms.queen', { valueAsNumber: true })}
              min={to-cyan-700}
              max={200}
              defaultValue={to-cyan-700}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-7 mb-2">
              Çift Kişilik Yataklar (Standart)
            </label>
            <input
              type="number"
              {...register('bedrooms.double', { valueAsNumber: true })}
              min={to-cyan-700}
              max={200}
              defaultValue={to-cyan-700}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-7 mb-2">
              Tek Kişilik Yataklar
            </label>
            <input
              type="number"
              {...register('bedrooms.single', { valueAsNumber: true })}
              min={to-cyan-700}
              max={200}
              defaultValue={to-cyan-700}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-7 mb-2">
              Ranza Yataklar
            </label>
            <input
              type="number"
              {...register('bedrooms.bunk', { valueAsNumber: true })}
              min={to-cyan-700}
              max={200}
              defaultValue={to-cyan-700}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          </div>
        </div>
        {errors.bedrooms && (
          <p className="mt-2 text-sm text-lydian-error">
            {errors.bedrooms.message?.toString()}
          </p>
        )}
      </div>

      {/* Living Areas */}
      <div className="border-t-2 border-slate-200 pt-8">
        <h3 className="text-lg font-bold text-slate-9 mb-4">Yaşam Alanları</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              id="hasKitchen"
              {...register('livingAreas.hasKitchen')}
              className="w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-lydian-primary"
            />
            <label htmlFor="hasKitchen" className="font-medium text-slate-7">
              Mutfak Var
            </label>
          </div>

          {watch('livingAreas.hasKitchen') && (
            <div className="ml-9">
              <label className="block text-sm font-medium text-slate-7 mb-2">
                Mutfak Tipi
              </label>
              <select
                {...register('livingAreas.kitchenType')}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white/5"
              >
                <option value="full">Tam Mutfak</option>
                <option value="kitchenette">Mini Mutfak</option>
                <option value="none">Yok</option>
              </select>
            </div>
          )}

          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              id="hasLivingRoom"
              {...register('livingAreas.hasLivingRoom')}
              className="w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-lydian-primary"
            />
            <label htmlFor="hasLivingRoom" className="font-medium text-slate-7">
              Oturma Odası Var
            </label>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              id="hasDiningArea"
              {...register('livingAreas.hasDiningArea')}
              className="w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-lydian-primary"
            />
            <label htmlFor="hasDiningArea" className="font-medium text-slate-7">
              Yemek Alanı Var
            </label>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="p-4 bg-yellow-500-lighter border border-amber-200 rounded-lg">
        <h4 className="font-semibold text-amber-9 mb-2">Konum İpuçları:</h4>
        <ul className="text-sm text-amber-8 space-y-1">
          <li>• Doğru GPS koordinatları misafirlerin mülkünüzü kolayca bulmasına yardımcı olur</li>
          <li>• Tam adresiniz rezervasyon onaylanana kadar paylaşılmayacaktır</li>
          <li>• Yatak tiplerini belirterek misafirlerin uyku düzenini anlamasına yardımcı olun</li>
          <li>• Mülkünüzün tam kapasitesini göstermek için tüm yaşam alanlarını ekleyin</li>
        </ul>
      </div>
    </div>
  );
}
