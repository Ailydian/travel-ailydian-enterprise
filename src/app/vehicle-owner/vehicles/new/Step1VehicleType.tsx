'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { VEHICLE_CATEGORIES } from '@/data/vehicleCategories';
import type { VehicleType } from '@/types/vehicle.types';

interface Step1Props {
  data?: any;
  allData?: any;
}

export default function Step1VehicleType({ data }: Step1Props) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const selectedType = watch('vehicleType');

  return (
    <div className="space-y-8">
      {/* Vehicle Type Selection */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-4">
          Araç Kategorisi <span className="text-lydian-secondary">*</span>
        </label>
        <p className="text-sm text-slate-600 mb-6">
          Aracınızın kategorisini seçin. Bu, kiracıların aracınızı bulmasına yardımcı olacaktır.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {VEHICLE_CATEGORIES.map((type) => {
            const iconName = type.icon as keyof typeof LucideIcons;
            const Icon = LucideIcons[iconName] as React.ElementType;
            const isSelected = selectedType === type.value;

            return (
              <motion.button
                key={type.value}
                type="button"
                onClick={() => setValue('vehicleType', type.value, { shouldValidate: true })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-4 border-2 rounded-xl text-left transition-all ${
                  isSelected
                    ? 'border-green-500 bg-lydian-success-lighter shadow-md'
                    : 'border-slate-200 bg-lydian-bg/5 hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      isSelected ? 'bg-lydian-success text-lydian-text-inverse' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {Icon && <Icon className="w-6 h-6" />}
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-semibold mb-1 ${
                        isSelected ? 'text-green-900' : 'text-slate-900'
                      }`}
                    >
                      {type.label}
                    </h3>
                    <p
                      className={`text-sm ${
                        isSelected ? 'text-green-700' : 'text-slate-600'
                      }`}
                    >
                      {type.description}
                    </p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                      <span>{type.seats} Koltuk</span>
                      <span>•</span>
                      <span>~₺{type.averagePrice}/gün</span>
                    </div>
                    {type.popular && (
                      <span className="inline-block mt-2 px-2 py-1 bg-lydian-warning-light text-lydian-warning-text text-xs font-semibold rounded">
                        Popüler
                      </span>
                    )}
                  </div>
                </div>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 w-6 h-6 bg-lydian-success rounded-full flex items-center justify-center"
                  >
                    <svg
                      className="w-4 h-4 text-lydian-text-inverse"
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
        <input type="hidden" {...register('vehicleType')} />
        {errors.vehicleType && (
          <p className="mt-2 text-sm text-lydian-error">
            {errors.vehicleType.message?.toString()}
          </p>
        )}
      </div>

      {/* Info Box */}
      <div className="p-4 bg-lydian-success-lighter border border-green-200 rounded-lg">
        <h4 className="font-semibold text-green-900 mb-2">İpuçları:</h4>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• Doğru kategori seçimi, aracınızın doğru kiracılara ulaşmasını sağlar</li>
          <li>• Popüler kategoriler genellikle daha yüksek talep görür</li>
          <li>• Fiyatlandırma, kategori ve özelliklerinize göre otomatik olarak önerilecektir</li>
          <li>• Kategoriyi daha sonra değiştirebilirsiniz</li>
        </ul>
      </div>
    </div>
  );
}
