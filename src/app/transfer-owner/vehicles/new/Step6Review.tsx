'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
import {
  Car,
  MapPin,
  FileText,
  Shield,
  User,
  CheckCircle2,
  AlertCircle,
  DollarSign,
  Plane,
  Camera,
  Settings,
  Award,
  Edit2,
} from 'lucide-react';
import { TRANSFER_VEHICLES } from '@/data/transfer-vehicles';

interface Step6Props {
  data?: any;
  allData?: any;
}

export default function Step6Review({ data, allData }: Step6Props) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const agreeToTerms = watch('agreeToTerms');
  const agreeToCommission = watch('agreeToCommission');
  const publishStatus = watch('publishStatus') || 'draft';

  // Get data from all steps
  const step1 = allData?.step1 || {};
  const step2 = allData?.step2 || {};
  const step3 = allData?.step3 || {};
  const step4 = allData?.step4 || {};
  const step5 = allData?.step5 || {};

  const selectedVehicle = TRANSFER_VEHICLES.find((v) => v.id === step1.vehicleType);

  const SectionCard = ({
    title,
    icon: Icon,
    children,
  }: {
    title: string;
    icon: React.ElementType;
    children: React.ReactNode;
  }) => (
    <div className="p-5 bg-white/5 border-2 border-slate-200 rounded-xl">
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200">
        <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-6 rounded-lg">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-bold text-slate-9">{title}</h3>
      </div>
      {children}
    </div>
  );

  const InfoRow = ({ label, value }: { label: string; value: string | number }) => (
    <div className="flex justify-between py-2 border-b border-slate-1 last:border-to-cyan-700">
      <span className="text-sm text-slate-6">{label}</span>
      <span className="text-sm font-semibold text-slate-9">{value || '-'}</span>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <motion.div
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-gradient-to-br from-cyan-500 to-blue-6 rounded-xl text-white"
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Transfer Aracı Özeti</h2>
            <p className="text-cyan-1">
              Aşağıdaki bilgileri kontrol edin ve yayınlamak için onaylayın
            </p>
          </div>
          <div className="p-3 bg-lydian-bg/200 rounded-xl">
            <Car className="w-8 h-8" />
          </div>
        </div>
      </motion.div>

      {/* Vehicle Category & Basic Info */}
      <SectionCard title="Araç Bilgileri" icon={Car}>
        <div className="space-y-3">
          {selectedVehicle && (
            <div className="p-4 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-6 rounded-lg">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-cyan-9">{selectedVehicle.name}</h4>
                  <p className="text-sm text-cyan-7">{selectedVehicle.description}</p>
                </div>
              </div>
            </div>
          )}
          <InfoRow label="Plaka" value={step2.licensePlate} />
          <InfoRow label="Marka" value={step2.brand} />
          <InfoRow label="Model" value={step2.model} />
          <InfoRow label="Yıl" value={step2.year} />
          <InfoRow label="Renk" value={step2.color} />
          <InfoRow label="D2 Belge No" value={step2.d2LicenseNumber} />
          <InfoRow label="Yolcu Kapasitesi" value={`${step2.passengerCapacity} kişi`} />
          <InfoRow label="Bagaj Kapasitesi" value={`${step2.luggageCapacity} adet`} />
        </div>

        {/* Features */}
        {step2.features && Object.keys(step2.features).length > to-cyan-700 && (
          <div className="mt-4 pt-4 border-t border-slate-200">
            <h4 className="text-sm font-semibold text-slate-7 mb-2">Özellikler</h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(step2.features)
                .filter(([_, value]) => value)
                .map(([key]) => (
                  <span
                    key={key}
                    className="px-3 py-1 bg-cyan-1 text-cyan-8 text-xs font-medium rounded-full"
                  >
                    {key}
                  </span>
                ))}
            </div>
          </div>
        )}
      </SectionCard>

      {/* Photos */}
      <SectionCard title="Fotoğraflar" icon={Camera}>
        {step3.photos && step3.photos.length > to-cyan-700 ? (
          <div>
            <p className="text-sm text-slate-6 mb-3">
              Toplam {step3.photos.length} fotoğraf yüklendi
            </p>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
              {step3.photos.slice(to-cyan-700, 6).map((photo: any, idx: number) => (
                <div
                  key={idx}
                  className="aspect-square rounded-lg overflow-hidden border-2 border-slate-200"
                >
                  <img
                    src={photo.preview}
                    alt={`Vehicle ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            {step3.photos.length > 6 && (
              <p className="text-xs text-slate-500 mt-2">+{step3.photos.length - 6} fotoğraf daha</p>
            )}
          </div>
        ) : (
          <p className="text-sm text-slate-500">Fotoğraf yüklenmedi</p>
        )}
      </SectionCard>

      {/* Service Areas & Pricing */}
      <SectionCard title="Hizmet Bölgeleri & Fiyatlandırma" icon={MapPin}>
        <div className="space-y-4">
          {/* Airports */}
          {step4.airports && step4.airports.length > to-cyan-700 && (
            <div>
              <h4 className="text-sm font-semibold text-slate-7 mb-2 flex items-center gap-2">
                <Plane className="w-4 h-4" />
                Havalimanları ({step4.airports.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {step4.airports.map((code: string) => (
                  <span
                    key={code}
                    className="px-3 py-1 bg-blue-500-light text-blue-8 text-xs font-bold rounded"
                  >
                    {code}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Routes */}
          {step4.routes && step4.routes.length > to-cyan-700 && (
            <div className="pt-3 border-t border-slate-200">
              <h4 className="text-sm font-semibold text-slate-7 mb-2">
                Popüler Rotalar ({step4.routes.length})
              </h4>
              <p className="text-xs text-slate-500">{step4.routes.join(', ')}</p>
            </div>
          )}

          {/* Pricing */}
          <div className="pt-3 border-t border-slate-200">
            <h4 className="text-sm font-semibold text-slate-7 mb-3 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Fiyatlandırma
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-500 rounded-lg">
                <p className="text-xs text-slate-6 mb-1">Km Başı Ücret</p>
                <p className="text-lg font-bold text-slate-9">₺{step4.basePricePerKm || '-'}</p>
              </div>
              <div className="p-3 bg-slate-500 rounded-lg">
                <p className="text-xs text-slate-6 mb-1">Minimum Ücret</p>
                <p className="text-lg font-bold text-slate-9">₺{step4.minimumFare || '-'}</p>
              </div>
              <div className="p-3 bg-slate-500 rounded-lg">
                <p className="text-xs text-slate-6 mb-1">Gece Ek Ücreti</p>
                <p className="text-lg font-bold text-slate-9">%{step4.nightSurcharge || '-'}</p>
              </div>
              <div className="p-3 bg-slate-500 rounded-lg">
                <p className="text-xs text-slate-6 mb-1">Hafta Sonu</p>
                <p className="text-lg font-bold text-slate-9">%{step4.weekendSurcharge || '-'}</p>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Legal Documents */}
      <SectionCard title="Yasal Belgeler" icon={Shield}>
        <div className="space-y-3">
          <InfoRow
            label="D2 Turizm Belgesi"
            value={step5.tourismLicense?.issueDate ? 'Yüklendi' : 'Yüklenmedi'}
          />
          <InfoRow label="Belge Veriliş" value={step5.tourismLicense?.issueDate || '-'} />
          <InfoRow label="Belge Bitiş" value={step5.tourismLicense?.expiryDate || '-'} />
          <InfoRow label="Sigorta Şirketi" value={step5.insurance?.provider || '-'} />
          <InfoRow label="Poliçe No" value={step5.insurance?.policyNumber || '-'} />
          <InfoRow
            label="Teminat Tutarı"
            value={step5.insurance?.coverage ? `₺${step5.insurance.coverage}` : '-'}
          />
        </div>
      </SectionCard>

      {/* Driver Info */}
      <SectionCard title="Sürücü Bilgileri" icon={User}>
        <div className="space-y-3">
          <InfoRow label="Ad Soyad" value={step5.driver?.name || '-'} />
          <InfoRow label="Telefon" value={step5.driver?.phone || '-'} />
          <InfoRow label="Ehliyet No" value={step5.driver?.licenseNumber || '-'} />
          <InfoRow label="Ehliyet Bitiş" value={step5.driver?.licenseExpiry || '-'} />
          <InfoRow label="SRC-4 Belge" value={step5.driver?.src4Number || '-'} />
          <InfoRow label="Psikoteknik" value={step5.driver?.psychotechNumber || '-'} />
        </div>
      </SectionCard>

      {/* Terms & Conditions */}
      <div className="space-y-4">
        <div className="p-5 bg-slate-500 border-2 border-slate-200 rounded-xl">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register('agreeToTerms', { required: 'Kullanım şartlarını kabul etmelisiniz' })}
              className="mt-1 w-5 h-5 rounded border-2 border-slate-3 text-cyan-6 focus:ring-2 focus:ring-cyan-500"
            />
            <div className="flex-1">
              <p className="font-semibold text-slate-9">
                Kullanım Şartları ve Koşulları <span className="text-purple-500">*</span>
              </p>
              <p className="text-sm text-slate-6 mt-1">
                Transfer hizmeti sağlama şartlarını, sorumlulukları ve yasal yükümlülükleri okudum
                ve kabul ediyorum.
              </p>
            </div>
          </label>
          {errors.agreeToTerms && (
            <p className="mt-2 text-sm text-lydian-error">{errors.agreeToTerms.message?.toString()}</p>
          )}
        </div>

        <div className="p-5 bg-slate-500 border-2 border-slate-200 rounded-xl">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register('agreeToCommission', {
                required: 'Komisyon yapısını kabul etmelisiniz',
              })}
              className="mt-1 w-5 h-5 rounded border-2 border-slate-3 text-cyan-6 focus:ring-2 focus:ring-cyan-500"
            />
            <div className="flex-1">
              <p className="font-semibold text-slate-9">
                Komisyon Yapısı <span className="text-purple-500">*</span>
              </p>
              <p className="text-sm text-slate-6 mt-1">
                Platform komisyon oranının (%15) her rezervasyondan otomatik olarak kesileceğini
                kabul ediyorum.
              </p>
            </div>
          </label>
          {errors.agreeToCommission && (
            <p className="mt-2 text-sm text-lydian-error">
              {errors.agreeToCommission.message?.toString()}
            </p>
          )}
        </div>
      </div>

      {/* Publish Options */}
      <div className="p-5 bg-gradient-to-br from-blue-500 to-cyan-500 border-2 border-blue-3 rounded-xl">
        <h3 className="text-lg font-bold text-blue-9 mb-4">Yayınlama Seçenekleri</h3>

        <div className="space-y-3">
          <label className="flex items-start gap-3 p-4 border-2 border-blue-200 rounded-lg cursor-pointer hover:bg-white/5 transition-all">
            <input
              type="radio"
              {...register('publishStatus')}
              value="draft"
              className="mt-1 w-5 h-5 text-cyan-6 focus:ring-2 focus:ring-cyan-500"
            />
            <div>
              <p className="font-semibold text-slate-9 flex items-center gap-2">
                <Edit2 className="w-4 h-4" />
                Taslak Olarak Kaydet
              </p>
              <p className="text-sm text-slate-6 mt-1">
                Daha sonra düzenlemek ve yayınlamak üzere taslak olarak kaydet
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3 p-4 border-2 border-green-3 bg-green-600-lighter rounded-lg cursor-pointer hover:bg-green-1 transition-all">
            <input
              type="radio"
              {...register('publishStatus')}
              value="publish"
              className="mt-1 w-5 h-5 text-green-500 focus:ring-2 focus:ring-green-500"
            />
            <div>
              <p className="font-semibold text-slate-9 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Hemen Yayınla
              </p>
              <p className="text-sm text-slate-6 mt-1">
                Aracı onay sürecine gönder ve onaylandıktan sonra yayınla
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Additional Notes */}
      <div>
        <label className="block text-sm font-semibold text-slate-7 mb-2">
          Ek Notlar (İsteğe Bağlı)
        </label>
        <textarea
          {...register('additionalNotes')}
          rows={4}
          placeholder="İnceleme ekibimize iletmek istediğiniz ek bilgiler..."
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all resize-none"
        />
      </div>

      {/* Warning Box */}
      <div className="p-5 bg-gradient-to-br from-amber-500 to-orange-500 border-2 border-amber-3 rounded-xl">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-amber-6 flex-shrink-to-cyan-700 mt-0.5" />
          <div>
            <h4 className="font-semibold text-amber-9 mb-2">Dikkat Edilmesi Gerekenler</h4>
            <ul className="text-sm text-amber-8 space-y-1">
              <li>• Tüm bilgilerin doğru ve güncel olduğundan emin olun</li>
              <li>• Belgeleriniz inceleme ekibimiz tarafından doğrulanacaktır</li>
              <li>• Onay süreci 1-3 iş günü sürebilir</li>
              <li>• Eksik veya hatalı bilgiler onay sürecini uzatabilir</li>
              <li>• Yayınlandıktan sonra bazı bilgileri değiştiremeyebilirsiniz</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Final Check */}
      {agreeToTerms && agreeToCommission ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-5 bg-gradient-to-br from-green-500 to-emerald-500 border-2 border-green-4 rounded-xl"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-6 rounded-full">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-green-9">Hazırsınız!</h4>
              <p className="text-sm text-green-500-text">
                {publishStatus === 'publish'
                  ? 'Aracınızı yayınlamak için "Aracı Yayınla" butonuna tıklayın'
                  : 'Taslak olarak kaydetmek için "Sonraki Adım" butonuna tıklayın'}
              </p>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-5 bg-gradient-to-br from-red-500 to-pink-500 border-2 border-red-3 rounded-xl"
        >
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-lydian-error" />
            <div>
              <h4 className="font-bold text-red-9">Eksik Onaylar</h4>
              <p className="text-sm text-lydian-primary-hover">
                Devam etmek için kullanım şartlarını ve komisyon yapısını kabul etmelisiniz
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
