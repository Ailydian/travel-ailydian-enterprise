'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
import {
  Wifi,
  Tv,
  Wind,
  Coffee,
  Sparkles,
  Music,
  Lamp,
  ShoppingBag,
  Award,
  Shield,
} from 'lucide-react';

interface VehicleFeature {
  id: string;
  label: string;
  icon: React.ElementType;
  category: 'basic' | 'comfort' | 'vip';
}

const vehicleFeatures: VehicleFeature[] = [
  { id: 'wifi', label: 'WiFi', icon: Wifi, category: 'comfort' },
  { id: 'tv', label: 'TV/Eğlence Sistemi', icon: Tv, category: 'vip' },
  { id: 'airConditioning', label: 'Klima', icon: Wind, category: 'basic' },
  { id: 'minibar', label: 'Minibar', icon: Coffee, category: 'vip' },
  { id: 'leatherSeats', label: 'Deri Koltuklar', icon: Sparkles, category: 'comfort' },
  { id: 'soundSystem', label: 'Premium Ses Sistemi', icon: Music, category: 'comfort' },
  { id: 'ledLighting', label: 'LED Aydınlatma', icon: Lamp, category: 'vip' },
  { id: 'privacyGlass', label: 'Privacy Cam', icon: Shield, category: 'vip' },
  { id: 'massageSeats', label: 'Masaj Koltuğu', icon: Award, category: 'vip' },
  { id: 'hasWC', label: 'Tuvalet (Otobüs)', icon: ShoppingBag, category: 'basic' },
];

interface Step2Props {
  data?: any;
  allData?: any;
}

export default function Step2VehicleInfo({ data, allData }: Step2Props) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const selectedFeatures = watch('features') || {};
  const year = watch('year');
  const color = watch('color');

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 15 }, (_, i) => currentYear - i);

  const colors = [
    { value: 'white', label: 'Beyaz', hex: 'var(--lydian-text-inverse)' },
    { value: 'black', label: 'Siyah', hex: '#000000' },
    { value: 'gray', label: 'Gri', hex: 'var(--lydian-text-tertiary)' },
    { value: 'silver', label: 'Gümüş', hex: '#C0C0C0' },
    { value: 'blue', label: 'Mavi', hex: 'var(--lydian-info)' },
    { value: 'red', label: 'Kırmızı', hex: 'var(--lydian-secondary)' },
    { value: 'other', label: 'Diğer', hex: 'var(--lydian-accent-purple)' },
  ];

  const toggleFeature = (featureId: string) => {
    setValue(`features.${featureId}`, !selectedFeatures[featureId], { shouldValidate: true });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'basic':
        return 'from-blue-500 to-cyan-500';
      case 'comfort':
        return 'from-indigo-500 to-purple-500';
      case 'vip':
        return 'from-purple-600 to-pink-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="space-y-8">
      {/* License Plate & Brand */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Plaka Numarası <span className="text-lydian-secondary">*</span>
          </label>
          <input
            type="text"
            {...register('licensePlate', { required: 'Plaka numarası gerekli' })}
            placeholder="34 ABC 123"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all uppercase"
            maxLength={20}
          />
          <p className="mt-1 text-xs text-slate-500">Ticari sarı plaka numaranızı girin</p>
          {errors.licensePlate && (
            <p className="mt-1 text-sm text-lydian-error">
              {errors.licensePlate.message?.toString()}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Marka <span className="text-lydian-secondary">*</span>
          </label>
          <input
            type="text"
            {...register('brand', { required: 'Marka gerekli' })}
            placeholder="Mercedes, BMW, Volkswagen..."
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
          />
          {errors.brand && (
            <p className="mt-1 text-sm text-lydian-error">{errors.brand.message?.toString()}</p>
          )}
        </div>
      </div>

      {/* Model, Year, Color */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Model <span className="text-lydian-secondary">*</span>
          </label>
          <input
            type="text"
            {...register('model', { required: 'Model gerekli' })}
            placeholder="E-Class, Vito, Sprinter..."
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
          />
          {errors.model && (
            <p className="mt-1 text-sm text-lydian-error">{errors.model.message?.toString()}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Yıl <span className="text-lydian-secondary">*</span>
          </label>
          <select
            {...register('year', { required: 'Yıl gerekli', valueAsNumber: true })}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
          >
            <option value="">Seçiniz</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          {errors.year && (
            <p className="mt-1 text-sm text-lydian-error">{errors.year.message?.toString()}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Renk <span className="text-lydian-secondary">*</span>
          </label>
          <div className="relative">
            <select
              {...register('color', { required: 'Renk gerekli' })}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all appearance-none"
            >
              <option value="">Seçiniz</option>
              {colors.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            {color && (
              <div
                className="absolute right-12 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-slate-300"
                style={{
                  backgroundColor: colors.find((c) => c.value === color)?.hex || '#gray',
                }}
              />
            )}
          </div>
          {errors.color && (
            <p className="mt-1 text-sm text-lydian-error">{errors.color.message?.toString()}</p>
          )}
        </div>
      </div>

      {/* Capacity */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">Kapasite Bilgileri</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Yolcu Kapasitesi <span className="text-lydian-secondary">*</span>
            </label>
            <input
              type="number"
              {...register('passengerCapacity', {
                required: 'Yolcu kapasitesi gerekli',
                valueAsNumber: true,
                min: 1,
                max: 50,
              })}
              min={1}
              max={50}
              placeholder="4"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
            />
            <p className="mt-1 text-xs text-slate-500">Maksimum yolcu sayısı</p>
            {errors.passengerCapacity && (
              <p className="mt-1 text-sm text-lydian-error">
                {errors.passengerCapacity.message?.toString()}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Bagaj Kapasitesi <span className="text-lydian-secondary">*</span>
            </label>
            <input
              type="number"
              {...register('luggageCapacity', {
                required: 'Bagaj kapasitesi gerekli',
                valueAsNumber: true,
                min: 1,
                max: 50,
              })}
              min={1}
              max={50}
              placeholder="3"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
            />
            <p className="mt-1 text-xs text-slate-500">Standart valiz (23kg) sayısı</p>
            {errors.luggageCapacity && (
              <p className="mt-1 text-sm text-lydian-error">
                {errors.luggageCapacity.message?.toString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Features */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">Araç Özellikleri ve Donanımları</h3>
        <p className="text-sm text-slate-600 mb-4">
          Aracınızda bulunan özellikleri seçin. Bu bilgiler müşterilere gösterilecektir.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {vehicleFeatures.map((feature) => {
            const Icon = feature.icon;
            const isSelected = selectedFeatures[feature.id];

            return (
              <motion.button
                key={feature.id}
                type="button"
                onClick={() => toggleFeature(feature.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 border-2 rounded-xl text-left transition-all ${
                  isSelected
                    ? 'border-cyan-500 bg-cyan-50 shadow-md'
                    : 'border-slate-200 bg-lydian-bg/5 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg bg-gradient-to-br ${
                      isSelected ? getCategoryColor(feature.category) : 'from-slate-100 to-slate-200'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-lydian-text-inverse' : 'text-slate-600'}`} />
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-sm font-semibold ${
                        isSelected ? 'text-cyan-900' : 'text-slate-900'
                      }`}
                    >
                      {feature.label}
                    </p>
                  </div>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-5 h-5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center"
                    >
                      <svg
                        className="w-3 h-3 text-lydian-text-inverse"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </motion.div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* D2 Tourism License */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">D2 Turizm Belgesi</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              D2 Belge Numarası <span className="text-lydian-secondary">*</span>
            </label>
            <input
              type="text"
              {...register('d2LicenseNumber', { required: 'D2 belge numarası gerekli' })}
              placeholder="D2-XX-XXXXX"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
            />
            <p className="mt-1 text-xs text-slate-500">Turizm işletme belgesi numaranız</p>
            {errors.d2LicenseNumber && (
              <p className="mt-1 text-sm text-lydian-error">
                {errors.d2LicenseNumber.message?.toString()}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Ticari Plaka Tipi
            </label>
            <select
              {...register('commercialPlateType')}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
            >
              <option value="yellow">Sarı Plaka (Ticari)</option>
              <option value="tourism">Turizm Plakası</option>
            </select>
            <p className="mt-1 text-xs text-slate-500">Transfer araçları için sarı plaka zorunludur</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Araç Açıklaması
        </label>
        <textarea
          {...register('description')}
          rows={4}
          placeholder="Aracınız hakkında detaylı bilgi verin. Özel özellikler, bakım durumu, ek hizmetler..."
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all resize-none"
        />
        <p className="mt-1 text-xs text-slate-500">
          Müşterilere gösterilecek açıklama (isteğe bağlı)
        </p>
      </div>

      {/* Info Box */}
      <div className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl">
        <h4 className="font-semibold text-blue-900 mb-3">Önemli Bilgiler</h4>
        <ul className="text-sm text-blue-800 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-lydian-primary mt-0.5">•</span>
            <span>
              Tüm transfer araçları için <strong>ticari sarı plaka</strong> ve{' '}
              <strong>D2 turizm belgesi</strong> zorunludur
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-lydian-primary mt-0.5">•</span>
            <span>Kapasite bilgileri, rezervasyon sisteminde kullanılacaktır</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-lydian-primary mt-0.5">•</span>
            <span>Seçtiğiniz özellikler müşterilere gösterilecek ve fiyatlandırmayı etkileyebilir</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-lydian-primary mt-0.5">•</span>
            <span>Araç bilgilerinin doğru olması, müşteri memnuniyeti için önemlidir</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
