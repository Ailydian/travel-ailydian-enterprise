'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Car, Calendar, Palette, Hash, MapPin, Radio } from 'lucide-react';

interface Step2Props {
  data?: any;
  allData?: any;
}

const transmissionTypes = [
  { value: 'manual', label: 'Manuel', icon: '⚙️' },
  { value: 'automatic', label: 'Otomatik', icon: '🔄' },
  { value: 'semi-automatic', label: 'Yarı Otomatik', icon: '⚡' },
];

const fuelTypes = [
  { value: 'petrol', label: 'Benzin', icon: '⛽' },
  { value: 'diesel', label: 'Dizel', icon: '🛢️' },
  { value: 'electric', label: 'Elektrik', icon: '🔋' },
  { value: 'hybrid', label: 'Hibrit', icon: '🔌' },
  { value: 'lpg', label: 'LPG', icon: '💨' },
];

const popularBrands = [
  'Toyota', 'Volkswagen', 'Ford', 'Honda', 'Hyundai', 'Renault', 'Fiat',
  'Mercedes-Benz', 'BMW', 'Audi', 'Nissan', 'Peugeot', 'Opel', 'Kia',
  'Chevrolet', 'Mazda', 'Skoda', 'Seat', 'Citroen', 'Dacia',
];

const turkishCities = [
  'İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bursa', 'Adana', 'Gaziantep',
  'Konya', 'Kocaeli', 'Mersin', 'Diyarbakır', 'Hatay', 'Manisa', 'Kayseri',
  'Samsun', 'Balıkesir', 'Kahramanmaraş', 'Van', 'Aydın', 'Denizli',
];

export default function Step2VehicleDetails({ data }: Step2Props) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const transmission = watch('transmission');
  const fuelType = watch('fuelType');

  return (
    <div className="space-y-8">
      {/* Basic Vehicle Information */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-slate-9 mb-4">Temel Araç Bilgileri</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Brand */}
          <div>
            <label className="block text-sm font-semibold text-slate-7 mb-2">
              Marka <span className="text-purple-500">*</span>
            </label>
            <div className="relative">
              <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-4" />
              <input
                type="text"
                {...register('brand')}
                list="brands"
                placeholder="Toyota, Volkswagen, vb."
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
              />
              <datalist id="brands">
                {popularBrands.map((brand) => (
                  <option key={brand} value={brand} />
                ))}
              </datalist>
            </div>
            {errors.brand && (
              <p className="mt-1 text-sm text-lydian-error">
                {errors.brand.message?.toString()}
              </p>
            )}
          </div>

          {/* Model */}
          <div>
            <label className="block text-sm font-semibold text-slate-7 mb-2">
              Model <span className="text-purple-500">*</span>
            </label>
            <input
              type="text"
              {...register('model')}
              placeholder="Corolla, Passat, vb."
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
            />
            {errors.model && (
              <p className="mt-1 text-sm text-lydian-error">
                {errors.model.message?.toString()}
              </p>
            )}
          </div>

          {/* Year */}
          <div>
            <label className="block text-sm font-semibold text-slate-7 mb-2">
              Yıl <span className="text-purple-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-4" />
              <input
                type="number"
                {...register('year', { valueAsNumber: true })}
                min={199}
                max={new Date().getFullYear() + 1}
                placeholder="10200"
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
              />
            </div>
            {errors.year && (
              <p className="mt-1 text-sm text-lydian-error">
                {errors.year.message?.toString()}
              </p>
            )}
          </div>

          {/* License Plate */}
          <div>
            <label className="block text-sm font-semibold text-slate-7 mb-2">
              Plaka <span className="text-purple-500">*</span>
            </label>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-4" />
              <input
                type="text"
                {...register('licensePlate')}
                placeholder="34 ABC 123"
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all uppercase"
              />
            </div>
            {errors.licensePlate && (
              <p className="mt-1 text-sm text-lydian-error">
                {errors.licensePlate.message?.toString()}
              </p>
            )}
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-semibold text-slate-7 mb-2">
              Renk <span className="text-purple-500">*</span>
            </label>
            <div className="relative">
              <Palette className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-4" />
              <input
                type="text"
                {...register('color')}
                placeholder="Beyaz, Siyah, Gri, vb."
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
              />
            </div>
            {errors.color && (
              <p className="mt-1 text-sm text-lydian-error">
                {errors.color.message?.toString()}
              </p>
            )}
          </div>

          {/* VIN */}
          <div>
            <label className="block text-sm font-semibold text-slate-7 mb-2">
              Şasi Numarası (VIN) (Opsiyonel)
            </label>
            <input
              type="text"
              {...register('vin')}
              placeholder="17 haneli şasi numarası"
              maxLength={17}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all uppercase"
            />
            <p className="mt-1 text-xs text-slate-500">
              Doğrulama için şasi numaranızı ekleyebilirsiniz
            </p>
          </div>
        </div>
      </div>

      {/* Transmission & Fuel */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-slate-9 mb-4">Vites ve Yakıt Türü</h3>

        <div className="space-y-6">
          {/* Transmission */}
          <div>
            <label className="block text-sm font-semibold text-slate-7 mb-3">
              Vites Türü <span className="text-purple-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {transmissionTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setValue('transmission', type.value, { shouldValidate: true })}
                  className={`p-4 border-2 rounded-lg transition-all text-left ${
                    transmission === type.value
                      ? 'border-green-500 bg-green-600-lighter'
                      : 'border-slate-200 hover:border-slate-3'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{type.icon}</span>
                    <span className={`font-semibold ${
                      transmission === type.value ? 'text-green-9' : 'text-slate-9'
                    }`}>
                      {type.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
            <input type="hidden" {...register('transmission')} />
            {errors.transmission && (
              <p className="mt-2 text-sm text-lydian-error">
                {errors.transmission.message?.toString()}
              </p>
            )}
          </div>

          {/* Fuel Type */}
          <div>
            <label className="block text-sm font-semibold text-slate-7 mb-3">
              Yakıt Türü <span className="text-purple-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {fuelTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setValue('fuelType', type.value, { shouldValidate: true })}
                  className={`p-4 border-2 rounded-lg transition-all text-center ${
                    fuelType === type.value
                      ? 'border-green-500 bg-green-600-lighter'
                      : 'border-slate-200 hover:border-slate-3'
                  }`}
                >
                  <div className="text-2xl mb-2">{type.icon}</div>
                  <span className={`font-semibold text-sm ${
                    fuelType === type.value ? 'text-green-9' : 'text-slate-9'
                  }`}>
                    {type.label}
                  </span>
                </button>
              ))}
            </div>
            <input type="hidden" {...register('fuelType')} />
            {errors.fuelType && (
              <p className="mt-2 text-sm text-lydian-error">
                {errors.fuelType.message?.toString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-slate-9 mb-4">Teknik Özellikler</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Seats */}
          <div>
            <label className="block text-sm font-semibold text-slate-7 mb-2">
              Koltuk Sayısı <span className="text-purple-500">*</span>
            </label>
            <input
              type="number"
              {...register('seats', { valueAsNumber: true })}
              min={2}
              max={500}
              placeholder="5"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
            />
            {errors.seats && (
              <p className="mt-1 text-sm text-lydian-error">
                {errors.seats.message?.toString()}
              </p>
            )}
          </div>

          {/* Doors */}
          <div>
            <label className="block text-sm font-semibold text-slate-7 mb-2">
              Kapı Sayısı <span className="text-purple-500">*</span>
            </label>
            <input
              type="number"
              {...register('doors', { valueAsNumber: true })}
              min={2}
              max={6}
              placeholder="4"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
            />
            {errors.doors && (
              <p className="mt-1 text-sm text-lydian-error">
                {errors.doors.message?.toString()}
              </p>
            )}
          </div>

          {/* Engine Size */}
          <div>
            <label className="block text-sm font-semibold text-slate-7 mb-2">
              Motor Hacmi (Opsiyonel)
            </label>
            <input
              type="text"
              {...register('engineSize')}
              placeholder="1.6L, 2.700L"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
            />
          </div>

          {/* Horse Power */}
          <div>
            <label className="block text-sm font-semibold text-slate-7 mb-2">
              Beygir Gücü (Opsiyonel)
            </label>
            <input
              type="number"
              {...register('horsePower', { valueAsNumber: true })}
              min={to-cyan-700}
              placeholder="1500"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-600-light rounded-lg">
            <MapPin className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-lg font-bold text-slate-9">Araç Konumu</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* City */}
          <div>
            <label className="block text-sm font-semibold text-slate-7 mb-2">
              Şehir <span className="text-purple-500">*</span>
            </label>
            <select
              {...register('city')}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-white/5"
            >
              <option value="">Şehir seçin</option>
              {turkishCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.city && (
              <p className="mt-1 text-sm text-lydian-error">
                {errors.city.message?.toString()}
              </p>
            )}
          </div>

          {/* Airport Options */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-7 mb-3">
              Havalimanı Hizmetleri
            </label>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border-2 border-slate-200 rounded-lg hover:border-green-3 transition-all cursor-pointer">
                <input
                  type="checkbox"
                  {...register('airportPickup')}
                  className="w-5 h-5 text-green-500 rounded focus:ring-2 focus:ring-green-500"
                />
                <div>
                  <span className="font-semibold text-slate-9">Havalimanı Teslim Alma</span>
                  <p className="text-sm text-slate-6">Aracı havalimanından teslim alabilirler</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 border-2 border-slate-200 rounded-lg hover:border-green-3 transition-all cursor-pointer">
                <input
                  type="checkbox"
                  {...register('airportDelivery')}
                  className="w-5 h-5 text-green-500 rounded focus:ring-2 focus:ring-green-500"
                />
                <div>
                  <span className="font-semibold text-slate-9">Havalimanı Teslim Etme</span>
                  <p className="text-sm text-slate-6">Aracı havalimanına teslim edebilirler</p>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="p-4 bg-green-600-lighter border border-green-200 rounded-lg">
        <h4 className="font-semibold text-green-9 mb-2">İpuçları:</h4>
        <ul className="text-sm text-green-8 space-y-1">
          <li>• Tüm bilgilerin doğru olduğundan emin olun - kiracılar bu bilgilere güvenir</li>
          <li>• Şasi numarası (VIN) eklemek, aracınızın doğrulanmasını hızlandırır</li>
          <li>• Havalimanı hizmetleri sunmak, rezervasyon şansınızı artırabilir</li>
          <li>• Aracın mevcut durumunu yansıtan güncel bilgiler ekleyin</li>
        </ul>
      </div>
    </div>
  );
}
