'use client';

import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Calendar,
  Clock,
  Zap,
  Ban,
  Plus,
  X,
  Info,
  Sun,
  Snowflake,
  AlertCircle,
} from 'lucide-react';

interface Step6Props {
  data?: any;
  allData?: any;
}

interface BlockedDate {
  id: string;
  startDate: string;
  endDate: string;
  reason: string;
  type: 'maintenance' | 'personal-use' | 'other';
}

export default function Step6Availability({ data }: Step6Props) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>(
    watch('blockedDates') || []
  );
  const [newBlockedDate, setNewBlockedDate] = useState({
    startDate: '',
    endDate: '',
    reason: '',
    type: 'other' as 'maintenance' | 'personal-use' | 'other',
  });

  const instantBooking = watch('instantBookingEnabled');

  const addBlockedDate = () => {
    if (newBlockedDate.startDate && newBlockedDate.endDate && newBlockedDate.reason) {
      const blocked: BlockedDate = {
        id: `blocked-${Date.now()}`,
        ...newBlockedDate,
      };
      const updated = [...blockedDates, blocked];
      setBlockedDates(updated);
      setValue('blockedDates', updated, { shouldValidate: true });
      setNewBlockedDate({
        startDate: '',
        endDate: '',
        reason: '',
        type: 'other',
      });
    }
  };

  const removeBlockedDate = (id: string) => {
    const updated = blockedDates.filter((d) => d.id !== id);
    setBlockedDates(updated);
    setValue('blockedDates', updated, { shouldValidate: true });
  };

  return (
    <div className="space-y-8">
      {/* Rental Duration */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Calendar className="w-5 h-5 text-lydian-primary" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Kiralama Süresi</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Minimum Rental Days */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Minimum Kiralama Süresi (gün) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register('minRentalDays')}
              placeholder="1"
              min="1"
              max="30"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
            />
            <p className="mt-1 text-xs text-slate-500">
              Araç en az kaç gün kiralanmalı
            </p>
            {errors.minRentalDays && (
              <p className="mt-1 text-sm text-lydian-error">
                {errors.minRentalDays.message?.toString()}
              </p>
            )}
          </div>

          {/* Maximum Rental Days */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Maksimum Kiralama Süresi (gün)
            </label>
            <input
              type="number"
              {...register('maxRentalDays')}
              placeholder="90"
              min="1"
              max="365"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
            />
            <p className="mt-1 text-xs text-slate-500">
              Araç maksimum kaç gün kiralanabilir (isteğe bağlı)
            </p>
          </div>
        </div>
      </div>

      {/* Advance Booking */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Clock className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Önceden Rezervasyon</h3>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Kaç Gün Önceden Rezervasyon Yapılmalı
          </label>
          <select
            {...register('advanceNoticeHours')}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-lydian-bg/5"
          >
            <option value="0">Anında (0 saat)</option>
            <option value="3">3 saat önce</option>
            <option value="6">6 saat önce</option>
            <option value="12">12 saat önce</option>
            <option value="24">1 gün önce</option>
            <option value="48">2 gün önce</option>
            <option value="72">3 gün önce</option>
            <option value="168">1 hafta önce</option>
          </select>
          <p className="mt-1 text-xs text-slate-500">
            Rezervasyon için gereken minimum bildirim süresi
          </p>
        </div>
      </div>

      {/* Instant Booking */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-amber-100 rounded-lg">
            <Zap className="w-5 h-5 text-amber-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Anında Rezervasyon</h3>
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
          <div className="flex-1">
            <label
              htmlFor="instantBookingEnabled"
              className="font-medium text-slate-900 cursor-pointer block mb-1"
            >
              Anında Rezervasyonu Etkinleştir
            </label>
            <p className="text-sm text-slate-600">
              Kiracılar onay beklemeden hemen rezervasyon yapabilir
            </p>
          </div>
          <input
            type="checkbox"
            id="instantBookingEnabled"
            {...register('instantBookingEnabled')}
            className="w-6 h-6 text-lydian-success rounded focus:ring-2 focus:ring-green-500"
          />
        </div>

        {instantBooking && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start gap-2">
              <Info className="w-5 h-5 text-lydian-success mt-0.5" />
              <p className="text-sm text-green-800">
                Anında rezervasyon etkinleştirildiğinde, aracınız daha fazla görünürlük kazanır ve
                kiracılar onay beklemeden rezervasyon yapabilir.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Check-in/Check-out Times */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Clock className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Teslim Alma/İade Saatleri</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Teslim Alma Saati
            </label>
            <input
              type="time"
              {...register('pickupTime')}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
            />
            <p className="mt-1 text-xs text-slate-500">
              Varsayılan teslim alma saati
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              İade Saati
            </label>
            <input
              type="time"
              {...register('returnTime')}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
            />
            <p className="mt-1 text-xs text-slate-500">
              Varsayılan iade saati
            </p>
          </div>
        </div>
      </div>

      {/* Blocked Dates */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-100 rounded-lg">
            <Ban className="w-5 h-5 text-lydian-error" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Müsait Olmayan Tarihler</h3>
        </div>
        <p className="text-sm text-slate-600 mb-4">
          Aracın kullanılamayacağı tarih aralıklarını ekleyin
        </p>

        {/* Existing Blocked Dates */}
        {blockedDates.length > 0 && (
          <div className="space-y-3 mb-4">
            {blockedDates.map((blocked) => (
              <div
                key={blocked.id}
                className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <span className="font-medium text-slate-900">
                      {new Date(blocked.startDate).toLocaleDateString('tr-TR')} -{' '}
                      {new Date(blocked.endDate).toLocaleDateString('tr-TR')}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{blocked.reason}</p>
                  <span className="text-xs text-slate-500 capitalize">
                    {blocked.type === 'maintenance' && 'Bakım'}
                    {blocked.type === 'personal-use' && 'Kişisel Kullanım'}
                    {blocked.type === 'other' && 'Diğer'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeBlockedDate(blocked.id)}
                  className="p-2 text-lydian-error hover:bg-red-50 rounded-lg transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add New Blocked Date */}
        <div className="space-y-4 p-4 bg-lydian-bg/5 border-2 border-slate-200 rounded-lg">
          <h4 className="font-semibold text-slate-900">Yeni Tarih Aralığı Ekle</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Başlangıç Tarihi
              </label>
              <input
                type="date"
                value={newBlockedDate.startDate}
                onChange={(e) =>
                  setNewBlockedDate({ ...newBlockedDate, startDate: e.target.value })
                }
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Bitiş Tarihi
              </label>
              <input
                type="date"
                value={newBlockedDate.endDate}
                onChange={(e) =>
                  setNewBlockedDate({ ...newBlockedDate, endDate: e.target.value })
                }
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Sebep
              </label>
              <select
                value={newBlockedDate.type}
                onChange={(e) =>
                  setNewBlockedDate({
                    ...newBlockedDate,
                    type: e.target.value as 'maintenance' | 'personal-use' | 'other',
                  })
                }
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none bg-lydian-bg/5"
              >
                <option value="maintenance">Bakım</option>
                <option value="personal-use">Kişisel Kullanım</option>
                <option value="other">Diğer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Açıklama
              </label>
              <input
                type="text"
                value={newBlockedDate.reason}
                onChange={(e) =>
                  setNewBlockedDate({ ...newBlockedDate, reason: e.target.value })
                }
                placeholder="örn., Yıllık bakım"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={addBlockedDate}
            disabled={
              !newBlockedDate.startDate ||
              !newBlockedDate.endDate ||
              !newBlockedDate.reason
            }
            className="w-full px-4 py-3 bg-lydian-success text-white rounded-lg font-medium hover:bg-lydian-success-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Tarih Ekle
          </button>
        </div>

        <input type="hidden" {...register('blockedDates')} value={JSON.stringify(blockedDates)} />
      </div>

      {/* Seasonal Availability (Optional) */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-cyan-100 rounded-lg">
            <Sun className="w-5 h-5 text-cyan-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Mevsimsel Müsaitlik (İsteğe Bağlı)
          </h3>
        </div>

        <div className="space-y-4">
          {/* Summer Availability */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Sun className="w-5 h-5 text-orange-500" />
              <div>
                <label
                  htmlFor="summerAvailable"
                  className="font-medium text-slate-900 cursor-pointer block"
                >
                  Yaz Sezonu Müsait
                </label>
                <p className="text-xs text-slate-600">Haziran - Ağustos</p>
              </div>
            </div>
            <input
              type="checkbox"
              id="summerAvailable"
              {...register('seasonalAvailability.summer')}
              defaultChecked
              className="w-6 h-6 text-lydian-success rounded focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Winter Availability */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Snowflake className="w-5 h-5 text-blue-500" />
              <div>
                <label
                  htmlFor="winterAvailable"
                  className="font-medium text-slate-900 cursor-pointer block"
                >
                  Kış Sezonu Müsait
                </label>
                <p className="text-xs text-slate-600">Aralık - Şubat</p>
              </div>
            </div>
            <input
              type="checkbox"
              id="winterAvailable"
              {...register('seasonalAvailability.winter')}
              defaultChecked
              className="w-6 h-6 text-lydian-success rounded focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-lydian-primary mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">Müsaitlik İpuçları:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Minimum kiralama süresini düşük tutmak daha fazla rezervasyon getirir</li>
              <li>• Anında rezervasyon özelliği görünürlüğü artırır</li>
              <li>• Bakım ve tatil planlarınızı önceden engelleyin</li>
              <li>• Esnek saatler kiracılar için daha uygundur</li>
              <li>
                • Tatil ve özel günlerde talebin yüksek olacağını unutmayın
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
