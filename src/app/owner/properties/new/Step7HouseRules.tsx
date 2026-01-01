'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FileText,
  Shield,
  Users,
  MessageSquare,
  CheckCircle2,
  ExternalLink,
  AlertTriangle,
} from 'lucide-react';

interface Step7Props {
  data?: any;
  allData?: any;
}

export default function Step7HouseRules({ data }: Step7Props) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const allAgreed =
    watch('agreeToTerms') &&
    watch('agreeToPrivacyPolicy') &&
    watch('agreeToHouseRules') &&
    watch('agreeToGuestCommunicationPolicy') &&
    watch('guestVettingConsent');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-lydian-info rounded-lg">
            <Shield className="w-6 h-6 text-lydian-text-inverse" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-blue-900 mb-2">
              Şartlar ve Sözleşmeler
            </h3>
            <p className="text-lydian-primary-hover">
              Mülkünüzü göndermeden önce lütfen aşağıdaki şartları inceleyin ve kabul edin.
              Bu sözleşmeler, tüm kullanıcılar için güvenli ve güvenilir bir topluluğun sürdürülmesine yardımcı olur.
            </p>
          </div>
        </div>
      </div>

      {/* Required Agreements */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900">Zorunlu Sözleşmeler</h3>

        {/* Terms of Service */}
        <div
          className={`border-2 rounded-xl p-6 transition-all ${
            watch('agreeToTerms')
              ? 'border-green-500 bg-green-50'
              : 'border-slate-200 bg-lydian-bg'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div
                className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                  watch('agreeToTerms')
                    ? 'border-green-500 bg-green-500'
                    : 'border-slate-300'
                }`}
              >
                {watch('agreeToTerms') && (
                  <CheckCircle2 className="w-4 h-4 text-lydian-text-inverse" />
                )}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-slate-600" />
                  <h4 className="font-semibold text-slate-900">Hizmet Şartları</h4>
                </div>
                <a
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-lydian-primary hover:text-blue-800 flex items-center gap-1"
                >
                  Şartları Oku
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                Kabul ederek, platformumuzun hizmet şartlarına, ev sahibi standartları, rezervasyon politikaları
                ve topluluk yönergelerine uymayı kabul etmiş olursunuz.
              </p>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  {...register('agreeToTerms')}
                  className="w-5 h-5 text-lydian-primary rounded focus:ring-2 focus:ring-lydian-primary"
                />
                <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                  Hizmet Şartlarını kabul ediyorum <span className="text-lydian-secondary">*</span>
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="mt-2 text-sm text-lydian-error">
                  {errors.agreeToTerms.message?.toString()}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Privacy Policy */}
        <div
          className={`border-2 rounded-xl p-6 transition-all ${
            watch('agreeToPrivacyPolicy')
              ? 'border-green-500 bg-green-50'
              : 'border-slate-200 bg-lydian-bg'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div
                className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                  watch('agreeToPrivacyPolicy')
                    ? 'border-green-500 bg-green-500'
                    : 'border-slate-300'
                }`}
              >
                {watch('agreeToPrivacyPolicy') && (
                  <CheckCircle2 className="w-4 h-4 text-lydian-text-inverse" />
                )}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-slate-600" />
                  <h4 className="font-semibold text-slate-900">Gizlilik Politikası</h4>
                </div>
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-lydian-primary hover:text-blue-800 flex items-center gap-1"
                >
                  Politikayı Oku
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                Gizliliğinize saygı duyuyor ve kişisel verilerinizi koruyoruz. Sizin ve mülkünüz hakkındaki
                bilgileri nasıl topladığımızı, kullandığımızı ve paylaştığımızı inceleyin.
              </p>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  {...register('agreeToPrivacyPolicy')}
                  className="w-5 h-5 text-lydian-primary rounded focus:ring-2 focus:ring-lydian-primary"
                />
                <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                  Gizlilik Politikasını kabul ediyorum <span className="text-lydian-secondary">*</span>
                </span>
              </label>
              {errors.agreeToPrivacyPolicy && (
                <p className="mt-2 text-sm text-lydian-error">
                  {errors.agreeToPrivacyPolicy.message?.toString()}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* House Rules Agreement */}
        <div
          className={`border-2 rounded-xl p-6 transition-all ${
            watch('agreeToHouseRules')
              ? 'border-green-500 bg-green-50'
              : 'border-slate-200 bg-lydian-bg'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div
                className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                  watch('agreeToHouseRules')
                    ? 'border-green-500 bg-green-500'
                    : 'border-slate-300'
                }`}
              >
                {watch('agreeToHouseRules') && (
                  <CheckCircle2 className="w-4 h-4 text-lydian-text-inverse" />
                )}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-slate-600" />
                <h4 className="font-semibold text-slate-900">
                  Ev Sahibi Sorumlulukları ve Ev Kuralları
                </h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                Ev sahibi olarak, doğru mülk bilgisi sağlamayı, kalite standartlarını korumayı ve
                misafir sorularına hızlı yanıt vermeyi taahhüt ediyorsunuz.
              </p>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  {...register('agreeToHouseRules')}
                  className="w-5 h-5 text-lydian-primary rounded focus:ring-2 focus:ring-lydian-primary"
                />
                <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                  Ev sahibi sorumluluklarını yerine getirmeyi kabul ediyorum{' '}
                  <span className="text-lydian-secondary">*</span>
                </span>
              </label>
              {errors.agreeToHouseRules && (
                <p className="mt-2 text-sm text-lydian-error">
                  {errors.agreeToHouseRules.message?.toString()}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Guest Communication Policy */}
        <div
          className={`border-2 rounded-xl p-6 transition-all ${
            watch('agreeToGuestCommunicationPolicy')
              ? 'border-green-500 bg-green-50'
              : 'border-slate-200 bg-lydian-bg'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div
                className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                  watch('agreeToGuestCommunicationPolicy')
                    ? 'border-green-500 bg-green-500'
                    : 'border-slate-300'
                }`}
              >
                {watch('agreeToGuestCommunicationPolicy') && (
                  <CheckCircle2 className="w-4 h-4 text-lydian-text-inverse" />
                )}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-5 h-5 text-slate-600" />
                <h4 className="font-semibold text-slate-900">
                  Misafir İletişim Politikası
                </h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                Misafir mesajlarına 24 saat içinde yanıt vermeyi ve her zaman profesyonel,
                saygılı iletişim sürdürmeyi taahhüt edin.
              </p>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  {...register('agreeToGuestCommunicationPolicy')}
                  className="w-5 h-5 text-lydian-primary rounded focus:ring-2 focus:ring-lydian-primary"
                />
                <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                  İletişim politikasını kabul ediyorum{' '}
                  <span className="text-lydian-secondary">*</span>
                </span>
              </label>
              {errors.agreeToGuestCommunicationPolicy && (
                <p className="mt-2 text-sm text-lydian-error">
                  {errors.agreeToGuestCommunicationPolicy.message?.toString()}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Guest Vetting Consent */}
        <div
          className={`border-2 rounded-xl p-6 transition-all ${
            watch('guestVettingConsent')
              ? 'border-green-500 bg-green-50'
              : 'border-slate-200 bg-lydian-bg'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div
                className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                  watch('guestVettingConsent')
                    ? 'border-green-500 bg-green-500'
                    : 'border-slate-300'
                }`}
              >
                {watch('guestVettingConsent') && (
                  <CheckCircle2 className="w-4 h-4 text-lydian-text-inverse" />
                )}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-slate-600" />
                <h4 className="font-semibold text-slate-900">Misafir Kontrolü Onayı</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                Tüm ev sahipleri ve mülkler için güvenlik sağlamak amacıyla platformun misafir kimliklerini
                ve geçmişlerini doğrulamasına izin verin.
              </p>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  {...register('guestVettingConsent')}
                  className="w-5 h-5 text-lydian-primary rounded focus:ring-2 focus:ring-lydian-primary"
                />
                <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                  Misafir kontrol prosedürlerini kabul ediyorum{' '}
                  <span className="text-lydian-secondary">*</span>
                </span>
              </label>
              {errors.guestVettingConsent && (
                <p className="mt-2 text-sm text-lydian-error">
                  {errors.guestVettingConsent.message?.toString()}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Optional Legal Information */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">
          Yasal Bilgiler (İsteğe Bağlı)
        </h3>
        <p className="text-sm text-slate-600 mb-6">
          Bu bilgileri sağlamak, bölgenizdeki düzenleyici uyumlulukta yardımcı olabilir.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Lisans Numarası
            </label>
            <input
              type="text"
              {...register('legalInformation.licenseNumber')}
              placeholder="örn., STR-2024-001234"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-lydian-primary focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              İşletme Kaydı
            </label>
            <input
              type="text"
              {...register('legalInformation.businessRegistration')}
              placeholder="örn., BR-123456789"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-lydian-primary focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Vergi Kimlik Numarası
            </label>
            <input
              type="text"
              {...register('legalInformation.taxId')}
              placeholder="örn., 12-3456789"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-lydian-primary focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Sigorta Detayları
            </label>
            <input
              type="text"
              {...register('legalInformation.insuranceDetails')}
              placeholder="örn., Poliçe #ABC123"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-lydian-primary focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Agreement Status */}
      <div
        className={`p-6 border-2 rounded-xl ${
          allAgreed
            ? 'border-green-500 bg-green-50'
            : 'border-amber-500 bg-amber-50'
        }`}
      >
        <div className="flex items-start gap-4">
          {allAgreed ? (
            <CheckCircle2 className="w-6 h-6 text-lydian-success flex-shrink-0" />
          ) : (
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
          )}
          <div>
            <h4
              className={`font-semibold mb-1 ${
                allAgreed ? 'text-green-900' : 'text-amber-900'
              }`}
            >
              {allAgreed
                ? 'Tüm zorunlu sözleşmeler kabul edildi'
                : 'Lütfen tüm zorunlu sözleşmeleri kabul edin'}
            </h4>
            <p
              className={`text-sm ${
                allAgreed ? 'text-green-700' : 'text-amber-700'
              }`}
            >
              {allAgreed
                ? 'Son adıma geçmeye hazırsınız!'
                : 'Devam etmek için * ile işaretlenmiş tüm sözleşmeleri kabul etmelisiniz'}
            </p>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
        <h4 className="font-semibold text-slate-900 mb-2">Bu sözleşmeler neden gerekli?</h4>
        <ul className="text-sm text-slate-700 space-y-1">
          <li>
            • Net beklentiler belirleyerek hem ev sahiplerini hem de misafirleri korur
          </li>
          <li>• Yerel yasalara ve platform politikalarına uyumu sağlar</li>
          <li>
            • Platformdaki tüm mülklerde kalite standartlarını korur
          </li>
          <li>• Destek sağlamamıza ve anlaşmazlıkları adil bir şekilde çözmemize olanak tanır</li>
        </ul>
      </div>
    </div>
  );
}
