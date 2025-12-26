'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { DollarSign, Percent, Calendar, TrendingDown } from 'lucide-react';

interface Step4Props {
  data?: any;
  allData?: any;
}

const currencies = [
  { code: 'USD', symbol: '$', name: 'ABD Doları' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'İngiliz Sterlini' },
  { code: 'CAD', symbol: 'C$', name: 'Kanada Doları' },
  { code: 'AUD', symbol: 'A$', name: 'Avustralya Doları' },
  { code: 'JPY', symbol: '¥', name: 'Japon Yeni' },
  { code: 'TRY', symbol: '₺', name: 'Türk Lirası' },
];

export default function Step4Amenities({ data }: Step4Props) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const basePrice = watch('basePrice');
  const weeklyDiscount = watch('discounts.weeklyDiscount');
  const monthlyDiscount = watch('discounts.monthlyDiscount');
  const minStay = watch('availability.minStay');
  const maxStay = watch('availability.maxStay');

  // Calculate discounted prices
  const weeklyPrice = basePrice && weeklyDiscount
    ? basePrice * 7 * (1 - weeklyDiscount / 100)
    : null;

  const monthlyPrice = basePrice && monthlyDiscount
    ? basePrice * 30 * (1 - monthlyDiscount / 100)
    : null;

  return (
    <div className="space-y-8">
      {/* Base Pricing */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Temel Fiyatlandırma</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Currency */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Para Birimi <span className="text-red-500">*</span>
            </label>
            <select
              {...register('currency')}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white/5"
            >
              <option value="">Para birimi seçin</option>
              {currencies.map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.symbol} {curr.name} ({curr.code})
                </option>
              ))}
            </select>
            {errors.currency && (
              <p className="mt-1 text-sm text-red-600">
                {errors.currency.message?.toString()}
              </p>
            )}
          </div>

          {/* Base Price */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Gecelik Temel Fiyat <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="number"
                {...register('basePrice', { valueAsNumber: true })}
                min={10}
                step={1}
                placeholder="100"
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
            {errors.basePrice && (
              <p className="mt-1 text-sm text-red-600">
                {errors.basePrice.message?.toString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Discounts */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <TrendingDown className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Konaklama Süresi İndirimleri</h3>
        </div>
        <p className="text-sm text-slate-600 mb-4">
          İndirimli oranlarla daha uzun konaklamaları teşvik edin
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Weekly Discount */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Haftalık İndirim (7+ gece)
            </label>
            <div className="relative">
              <Percent className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="number"
                {...register('discounts.weeklyDiscount', { valueAsNumber: true })}
                min={0}
                max={100}
                step={1}
                placeholder="10"
                className="w-full px-4 pr-12 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
            {weeklyPrice && (
              <p className="mt-1 text-sm text-green-600">
                ≈ ${weeklyPrice.toFixed(0)} haftalık
              </p>
            )}
          </div>

          {/* Monthly Discount */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Aylık İndirim (30+ gece)
            </label>
            <div className="relative">
              <Percent className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="number"
                {...register('discounts.monthlyDiscount', { valueAsNumber: true })}
                min={0}
                max={100}
                step={1}
                placeholder="20"
                className="w-full px-4 pr-12 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
            {monthlyPrice && (
              <p className="mt-1 text-sm text-green-600">
                ≈ ${monthlyPrice.toFixed(0)} aylık
              </p>
            )}
          </div>

          {/* Early Booking Discount */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Erken Rezervasyon İndirimi
            </label>
            <div className="relative">
              <Percent className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="number"
                {...register('discounts.earlyBookingDiscount', { valueAsNumber: true })}
                min={0}
                max={100}
                step={1}
                placeholder="5"
                className="w-full px-4 pr-12 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
            <p className="mt-1 text-xs text-slate-500">
              30+ gün önceden yapılan rezervasyonlar için
            </p>
          </div>
        </div>
      </div>

      {/* Additional Fees */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Ek Ücretler</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cleaning Fee */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Temizlik Ücreti
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="number"
                {...register('fees.cleaningFee', { valueAsNumber: true })}
                min={0}
                step={1}
                placeholder="50"
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
            <p className="mt-1 text-xs text-slate-500">Rezervasyon başına tek seferlik ücret</p>
          </div>

          {/* Service Fee */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Hizmet Ücreti
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="number"
                {...register('fees.serviceFee', { valueAsNumber: true })}
                min={0}
                step={1}
                placeholder="25"
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
            <p className="mt-1 text-xs text-slate-500">Rezervasyon başına tek seferlik ücret</p>
          </div>

          {/* Tax Percentage */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Vergi Yüzdesi
            </label>
            <div className="relative">
              <Percent className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="number"
                {...register('fees.taxPercentage', { valueAsNumber: true })}
                min={0}
                max={100}
                step={0.1}
                placeholder="10"
                className="w-full px-4 pr-12 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Toplam rezervasyon tutarına uygulanır
            </p>
          </div>

          {/* Pet Fee */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Evcil Hayvan Ücreti (evcil hayvan kabul ediliyorsa)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="number"
                {...register('fees.petFee', { valueAsNumber: true })}
                min={0}
                step={1}
                placeholder="30"
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
            <div className="mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register('fees.petFeePerNight')}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">Gecelik ücret</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Availability */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Konaklama Gereksinimleri</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Minimum Stay */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Minimum Konaklama <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                {...register('availability.minStay', { valueAsNumber: true })}
                min={1}
                max={365}
                placeholder="1"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                gece
              </span>
            </div>
            {errors.availability?.minStay && (
              <p className="mt-1 text-sm text-red-600">
                {errors.availability.minStay.message?.toString()}
              </p>
            )}
          </div>

          {/* Maximum Stay */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Maksimum Konaklama (isteğe bağlı)
            </label>
            <div className="relative">
              <input
                type="number"
                {...register('availability.maxStay', { valueAsNumber: true })}
                min={1}
                max={365}
                placeholder="Limit yok"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                gece
              </span>
            </div>
            {errors.availability?.maxStay && (
              <p className="mt-1 text-sm text-red-600">
                {errors.availability.maxStay.message?.toString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Price Summary */}
      {basePrice && (
        <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl">
          <h4 className="font-bold text-blue-900 mb-4">Fiyat Özeti</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-700">Gecelik temel fiyat:</span>
              <span className="font-semibold text-slate-900">${basePrice}</span>
            </div>
            {weeklyDiscount > 0 && weeklyPrice && (
              <div className="flex justify-between">
                <span className="text-slate-700">Haftalık ücret (%{weeklyDiscount} indirimli):</span>
                <span className="font-semibold text-green-600">${weeklyPrice.toFixed(0)}</span>
              </div>
            )}
            {monthlyDiscount > 0 && monthlyPrice && (
              <div className="flex justify-between">
                <span className="text-slate-700">Aylık ücret (%{monthlyDiscount} indirimli):</span>
                <span className="font-semibold text-green-600">${monthlyPrice.toFixed(0)}</span>
              </div>
            )}
            {watch('fees.cleaningFee') > 0 && (
              <div className="flex justify-between">
                <span className="text-slate-700">Temizlik ücreti:</span>
                <span className="font-semibold text-slate-900">
                  ${watch('fees.cleaningFee')}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
        <h4 className="font-semibold text-purple-900 mb-2">Fiyatlandırma İpuçları:</h4>
        <ul className="text-sm text-purple-800 space-y-1">
          <li>• Rekabetçi fiyatlar belirlemek için bölgenizdeki benzer mülkleri araştırın</li>
          <li>• Haftalık ve aylık indirimler rezervasyon oranınızı artırabilir</li>
          <li>• Ücret belirlerken temizlik ve hizmet maliyetlerinizi göz önünde bulundurun</li>
          <li>• Minimum konaklama gereksinimleri devir ve maliyetleri azaltabilir</li>
        </ul>
      </div>
    </div>
  );
}
