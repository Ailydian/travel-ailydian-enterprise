'use client';

import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Clock,
  Ban,
  PawPrint,
  PartyPopper,
  Camera,
  Plus,
  X,
  Shield,
} from 'lucide-react';

interface Step6Props {
  data?: any;
  allData?: any;
}

const cancellationPolicies = [
  {
    value: 'flexible',
    label: 'Esnek',
    description: 'Girişten 24 saat öncesine kadar tam iade',
  },
  {
    value: 'moderate',
    label: 'Orta',
    description: 'Girişten 5 gün öncesine kadar tam iade',
  },
  {
    value: 'strict',
    label: 'Sıkı',
    description: 'Girişten 14 gün öncesine kadar tam iade',
  },
  {
    value: 'very_strict',
    label: 'Çok Sıkı',
    description: 'Girişten 30 gün öncesine kadar tam iade',
  },
  {
    value: 'non_refundable',
    label: 'İade Edilemez',
    description: 'Rezervasyon sonrası iade yok',
  },
];

export default function Step6Pricing({ data }: Step6Props) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [customRules, setCustomRules] = useState<string[]>(
    watch('customRules') || []
  );
  const [newRule, setNewRule] = useState('');

  const selectedPolicy = watch('cancellationPolicy');

  const addCustomRule = () => {
    if (newRule.trim() && customRules.length < 5) {
      const updated = [...customRules, newRule.trim()];
      setCustomRules(updated);
      setValue('customRules', updated, { shouldValidate: true });
      setNewRule('');
    }
  };

  const removeCustomRule = (index: number) => {
    const updated = customRules.filter((_, i) => i !== index);
    setCustomRules(updated);
    setValue('customRules', updated, { shouldValidate: true });
  };

  return (
    <div className="space-y-8">
      {/* Check-in/Check-out Times */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Clock className="w-5 h-5 text-lydian-primary" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Giriş ve Çıkış</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Giriş Saati <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              {...register('checkInTime')}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-lydian-primary focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
            <p className="mt-1 text-xs text-slate-500">
              Format: SS:dd (24 saat formatı)
            </p>
            {errors.checkInTime && (
              <p className="mt-1 text-sm text-lydian-error">
                {errors.checkInTime.message?.toString()}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Çıkış Saati <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              {...register('checkOutTime')}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-lydian-primary focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
            <p className="mt-1 text-xs text-slate-500">
              Format: SS:dd (24 saat formatı)
            </p>
            {errors.checkOutTime && (
              <p className="mt-1 text-sm text-lydian-error">
                {errors.checkOutTime.message?.toString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* House Policies */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Ev Politikaları</h3>

        <div className="space-y-4">
          {/* Smoking */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Ban className="w-5 h-5 text-lydian-error" />
              </div>
              <div>
                <label
                  htmlFor="smokingAllowed"
                  className="font-medium text-slate-900 cursor-pointer"
                >
                  Sigara İçilebilir
                </label>
                <p className="text-sm text-slate-600">
                  Misafirlerin mülkte sigara içmesine izin ver
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              id="smokingAllowed"
              {...register('policies.smokingAllowed')}
              className="w-6 h-6 text-lydian-primary rounded focus:ring-2 focus:ring-lydian-primary"
            />
          </div>

          {/* Pets */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <PawPrint className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <label
                  htmlFor="petsAllowed"
                  className="font-medium text-slate-900 cursor-pointer"
                >
                  Evcil Hayvan Kabul Edilir
                </label>
                <p className="text-sm text-slate-600">
                  Misafirlerin evcil hayvan getirmesine izin ver
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              id="petsAllowed"
              {...register('policies.petsAllowed')}
              className="w-6 h-6 text-lydian-primary rounded focus:ring-2 focus:ring-lydian-primary"
            />
          </div>

          {/* Pet Types (conditional) */}
          {watch('policies.petsAllowed') && (
            <div className="ml-14 p-4 bg-lydian-bg/5 border border-slate-200 rounded-lg">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                İzin Verilen Evcil Hayvan Türleri
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value="dogs"
                    {...register('policies.petTypes')}
                    className="w-4 h-4 text-lydian-primary rounded"
                  />
                  <span className="text-sm text-slate-700">Köpekler</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value="cats"
                    {...register('policies.petTypes')}
                    className="w-4 h-4 text-lydian-primary rounded"
                  />
                  <span className="text-sm text-slate-700">Kediler</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value="other"
                    {...register('policies.petTypes')}
                    className="w-4 h-4 text-lydian-primary rounded"
                  />
                  <span className="text-sm text-slate-700">Diğer küçük evcil hayvanlar</span>
                </label>
              </div>
            </div>
          )}

          {/* Events */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <PartyPopper className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <label
                  htmlFor="eventsAllowed"
                  className="font-medium text-slate-900 cursor-pointer"
                >
                  Etkinliklere İzin Verilir
                </label>
                <p className="text-sm text-slate-600">
                  Misafirlerin etkinlik veya toplantı düzenlemesine izin ver
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              id="eventsAllowed"
              {...register('policies.eventsAllowed')}
              className="w-6 h-6 text-lydian-primary rounded focus:ring-2 focus:ring-lydian-primary"
            />
          </div>

          {/* Parties */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-pink-100 rounded-lg">
                <PartyPopper className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <label
                  htmlFor="partiesAllowed"
                  className="font-medium text-slate-900 cursor-pointer"
                >
                  Partilere İzin Verilir
                </label>
                <p className="text-sm text-slate-600">
                  Misafirlerin parti düzenlemesine izin ver
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              id="partiesAllowed"
              {...register('policies.partiesAllowed')}
              className="w-6 h-6 text-lydian-primary rounded focus:ring-2 focus:ring-lydian-primary"
            />
          </div>

          {/* Commercial Photography */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Camera className="w-5 h-5 text-lydian-success" />
              </div>
              <div>
                <label
                  htmlFor="commercialPhotographyAllowed"
                  className="font-medium text-slate-900 cursor-pointer"
                >
                  Ticari Fotoğrafçılığa İzin Verilir
                </label>
                <p className="text-sm text-slate-600">
                  Profesyonel fotoğraf/video çekimlerine izin ver
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              id="commercialPhotographyAllowed"
              {...register('policies.commercialPhotographyAllowed')}
              className="w-6 h-6 text-lydian-primary rounded focus:ring-2 focus:ring-lydian-primary"
            />
          </div>
        </div>
      </div>

      {/* Custom Rules */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">
          Ek Ev Kuralları
        </h3>
        <p className="text-sm text-slate-600 mb-4">
          Mülkünüze özel kurallar ekleyin (maksimum 5)
        </p>

        <div className="space-y-3 mb-4">
          {customRules.map((rule, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg"
            >
              <span className="flex-1 text-sm text-slate-800">{rule}</span>
              <button
                type="button"
                onClick={() => removeCustomRule(index)}
                className="p-1 text-lydian-error hover:bg-red-50 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            value={newRule}
            onChange={(e) => setNewRule(e.target.value)}
            onKeyPress={(e) =>
              e.key === 'Enter' && (e.preventDefault(), addCustomRule())
            }
            placeholder="örn., Saat 22:00'den sonra yüksek sesle müzik yasaktır"
            maxLength={200}
            className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-lydian-primary focus:ring-2 focus:ring-blue-200 outline-none transition-all"
          />
          <button
            type="button"
            onClick={addCustomRule}
            disabled={!newRule.trim() || customRules.length >= 5}
            className="px-6 py-3 bg-lydian-primary text-white rounded-lg font-medium hover:bg-lydian-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Ekle
          </button>
        </div>

        <input type="hidden" {...register('customRules')} value={customRules} />
      </div>

      {/* Cancellation Policy */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-100 rounded-lg">
            <Shield className="w-5 h-5 text-lydian-error" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">İptal Politikası</h3>
        </div>
        <p className="text-sm text-slate-600 mb-4">
          İptallerde ne kadar esnek olmak istediğinizi seçin
        </p>

        <div className="space-y-3">
          {cancellationPolicies.map((policy) => {
            const isSelected = selectedPolicy === policy.value;

            return (
              <button
                key={policy.value}
                type="button"
                onClick={() =>
                  setValue('cancellationPolicy', policy.value, { shouldValidate: true })
                }
                className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                  isSelected
                    ? 'border-lydian-primary bg-blue-50'
                    : 'border-slate-200 bg-lydian-bg/5 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected
                            ? 'border-lydian-primary bg-blue-500'
                            : 'border-slate-300'
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2 h-2 bg-lydian-bg/5 rounded-full" />
                        )}
                      </div>
                      <h4
                        className={`font-semibold ${
                          isSelected ? 'text-blue-900' : 'text-slate-900'
                        }`}
                      >
                        {policy.label}
                      </h4>
                    </div>
                    <p
                      className={`text-sm ml-8 ${
                        isSelected ? 'text-lydian-primary-hover' : 'text-slate-600'
                      }`}
                    >
                      {policy.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <input type="hidden" {...register('cancellationPolicy')} />
        {errors.cancellationPolicy && (
          <p className="mt-2 text-sm text-lydian-error">
            {errors.cancellationPolicy.message?.toString()}
          </p>
        )}
      </div>

      {/* Info Box */}
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h4 className="font-semibold text-yellow-900 mb-2">Ev Kuralları İpuçları:</h4>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>• Net kurallar, misafirler için uygun beklentiler belirlemeye yardımcı olur</li>
          <li>• Daha sıkı iptal politikaları rezervasyonları azaltabilir ancak geliri korur</li>
          <li>• Mahallenizi ve yerel düzenlemeleri göz önünde bulundurun</li>
          <li>• Evcil hayvan dostu mülkler genellikle daha uzun konaklamaları çeker</li>
        </ul>
      </div>
    </div>
  );
}
