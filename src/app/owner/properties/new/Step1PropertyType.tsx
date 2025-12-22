'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
import {
  Home,
  Building2,
  Castle,
  TreePine,
  Hotel,
  Warehouse,
  Building,
  Crown,
  Anchor,
  HelpCircle,
} from 'lucide-react';
import type { PropertyType } from '@/types/dashboard.types';

interface PropertyTypeOption {
  value: PropertyType;
  label: string;
  description: string;
  icon: React.ElementType;
}

const propertyTypes: PropertyTypeOption[] = [
  {
    value: 'apartment',
    label: 'Apart',
    description: 'Şehir merkezi daire',
    icon: Building2,
  },
  {
    value: 'house',
    label: 'Ev',
    description: 'Müstakil ev',
    icon: Home,
  },
  {
    value: 'villa',
    label: 'Villa',
    description: 'Lüks bahçeli villa',
    icon: Castle,
  },
  {
    value: 'cottage',
    label: 'Kotra',
    description: 'Kırsal bölgede küçük, şirin ev',
    icon: TreePine,
  },
  {
    value: 'studio',
    label: 'Stüdyo',
    description: 'Kompakt stüdyo daire',
    icon: Warehouse,
  },
  {
    value: 'townhouse',
    label: 'Sıra Ev',
    description: 'Komşularla duvar paylaşan çok katlı ev',
    icon: Building,
  },
  {
    value: 'bungalow',
    label: 'Bungalov',
    description: 'Tek katlı alçak çatılı ev',
    icon: Hotel,
  },
  {
    value: 'penthouse',
    label: 'Çatı Katı',
    description: 'En üst katta lüks daire',
    icon: Crown,
  },
  {
    value: 'houseboat',
    label: 'Ev Bot',
    description: 'Su üzerinde yüzen ev',
    icon: Anchor,
  },
  {
    value: 'other',
    label: 'Diğer',
    description: 'Benzersiz mülk tipi',
    icon: HelpCircle,
  },
];

interface Step1Props {
  data?: any;
  allData?: any;
}

export default function Step1PropertyType({ data }: Step1Props) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const selectedType = watch('propertyType');
  const propertyName = watch('propertyName');
  const numberOfRooms = watch('numberOfRooms');
  const numberOfBathrooms = watch('numberOfBathrooms');
  const maximumGuests = watch('maximumGuests');
  const description = watch('description');

  return (
    <div className="space-y-8">
      {/* Property Name */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Mülk Adı <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('propertyName')}
          placeholder="örn., Şehir Merkezinde Rahat Daire"
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
        />
        {errors.propertyName && (
          <p className="mt-1 text-sm text-red-600">
            {errors.propertyName.message?.toString()}
          </p>
        )}
      </div>

      {/* Property Type Selection */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-4">
          Mülk Tipi <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {propertyTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = selectedType === type.value;

            return (
              <motion.button
                key={type.value}
                type="button"
                onClick={() => setValue('propertyType', type.value, { shouldValidate: true })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-4 border-2 rounded-xl text-left transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      isSelected ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-semibold mb-1 ${
                        isSelected ? 'text-blue-900' : 'text-slate-900'
                      }`}
                    >
                      {type.label}
                    </h3>
                    <p
                      className={`text-sm ${
                        isSelected ? 'text-blue-700' : 'text-slate-600'
                      }`}
                    >
                      {type.description}
                    </p>
                  </div>
                </div>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                  >
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
        <input type="hidden" {...register('propertyType')} />
        {errors.propertyType && (
          <p className="mt-2 text-sm text-red-600">
            {errors.propertyType.message?.toString()}
          </p>
        )}
      </div>

      {/* Basic Capacity Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Number of Rooms */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Yatak Odası Sayısı <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            {...register('numberOfRooms', { valueAsNumber: true })}
            min={1}
            max={20}
            placeholder="1"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
          />
          {errors.numberOfRooms && (
            <p className="mt-1 text-sm text-red-600">
              {errors.numberOfRooms.message?.toString()}
            </p>
          )}
        </div>

        {/* Number of Bathrooms */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Banyo Sayısı <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            {...register('numberOfBathrooms', { valueAsNumber: true })}
            min={0.5}
            step={0.5}
            max={20}
            placeholder="1"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
          />
          {errors.numberOfBathrooms && (
            <p className="mt-1 text-sm text-red-600">
              {errors.numberOfBathrooms.message?.toString()}
            </p>
          )}
        </div>

        {/* Maximum Guests */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Maksimum Misafir Sayısı <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            {...register('maximumGuests', { valueAsNumber: true })}
            min={1}
            max={50}
            placeholder="2"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
          />
          {errors.maximumGuests && (
            <p className="mt-1 text-sm text-red-600">
              {errors.maximumGuests.message?.toString()}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Mülk Açıklaması <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register('description')}
          rows={6}
          placeholder="Mülkünüzü detaylı bir şekilde açıklayın. Benzersiz özellikleri, yakındaki cazibe merkezlerini ve özel kılan yanlarını ekleyin..."
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
        />
        <div className="flex justify-between items-center mt-1">
          <div>
            {errors.description && (
              <p className="text-sm text-red-600">
                {errors.description.message?.toString()}
              </p>
            )}
          </div>
          <p
            className={`text-sm ${
              description?.length >= 50 ? 'text-green-600' : 'text-slate-500'
            }`}
          >
            {description?.length || 0} / 50 karakter minimum
          </p>
        </div>
      </div>

      {/* Highlight Description (Optional) */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Öne Çıkan Özellik Açıklaması (İsteğe Bağlı)
        </label>
        <input
          type="text"
          {...register('highlightDescription')}
          placeholder="örn., Deniz Manzarası • Plaja Yürüme Mesafesinde"
          maxLength={60}
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
        />
        <p className="mt-1 text-sm text-slate-500">
          Mülkünüzün en iyi özelliğini vurgulayan kısa, çekici bir açıklama
        </p>
        {errors.highlightDescription && (
          <p className="mt-1 text-sm text-red-600">
            {errors.highlightDescription.message?.toString()}
          </p>
        )}
      </div>

      {/* Info Box */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">Harika bir ilan için ipuçları:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Açıklayıcı ve akılda kalıcı bir mülk adı seçin</li>
          <li>• Benzersiz özellikleri vurgulayan detaylı bir açıklama yazın</li>
          <li>• Doğru beklentiler oluşturmak için kapasite bilgilerinde kesin olun</li>
          <li>• Yakındaki cazibe merkezlerini ve olanakları açıklamanıza dahil edin</li>
        </ul>
      </div>
    </div>
  );
}
