import React from 'react';
import Head from 'next/head';
import { BookingHeader } from '../components/layout/BookingHeader';
import { BookingFooter } from '../components/layout/BookingFooter';

const Terms: React.FC = () => {
  return (
    <>
      <Head>
        <title>Kullanım Şartları - Travel.Ailydian | Hizmet Şartları</title>
        <meta name="description" content="Travel.Ailydian hizmet kullanım şartları ve koşulları hakkında detaylı bilgilendirme." />
      </Head>

      <BookingHeader />

      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Kullanım Şartları</h1>
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Hizmet Koşulları</h2>
              <p className="text-gray-700 leading-relaxed">
                Travel.Ailydian platformunu kullanarak bu şartları kabul etmiş sayılırsınız. 
                AI destekli seyahat planlama, VR önizlemeler ve blockchain güvenlik hizmetlerimiz bu şartlar kapsamındadır.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Kullanıcı Yükümlülükleri</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Doğru ve güncel bilgiler sağlamak</li>
                <li>Platform kurallarına uymak</li>
                <li>Ödeme yükümlülüklerini yerine getirmek</li>
                <li>Diğer kullanıcılara saygı göstermek</li>
                <li>Yasal düzenlemelere uymak</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Rezervasyon ve İptal Koşulları</h2>
              <p className="text-gray-700 leading-relaxed">
                Rezervasyonlar onay e-postası ile teyit edilir. İptal koşulları ürün/hizmet türüne göre değişiklik gösterir. 
                Premium üyeler için özel iptal koşulları geçerlidir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Ödeme ve Faturalama</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Tüm fiyatlar Türk Lirası (TL) cinsindendir</li>
                <li>Kripto para ödemeleri kabul edilir</li>
                <li>Blockchain doğrulama ile güvenli ödemeler</li>
                <li>Otomatik yenileme seçenekleri mevcuttur</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. AI ve VR Hizmetleri</h2>
              <p className="text-gray-700 leading-relaxed">
                AI seyahat planlama ve VR önizleme hizmetlerimiz sürekli geliştirilmektedir. 
                Bu teknolojilerin kullanımında doğruluk oranları %95&apos;in üzerindedir ancak mutlak değildir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Sorumluluk Sınırlaması</h2>
              <p className="text-gray-700 leading-relaxed">
                Travel.Ailydian, üçüncü taraf hizmet sağlayıcılarının hataları veya doğal afetler gibi 
                kontrol dışındaki durumlardan sorumlu değildir. Seyahat sigortası önerilir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Fikri Mülkiyet</h2>
              <p className="text-gray-700 leading-relaxed">
                Platformdaki tüm içerik, AI algoritmaları, VR deneyimleri ve blockchain teknolojisi 
                Travel.Ailydian&apos;n fikri mülkiyetindedir ve korunmaktadır.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Uyuşmazlıkların Çözümü</h2>
              <p className="text-gray-700 leading-relaxed">
                Öncelikle müşteri hizmetleri ile çözüm aranır. Çözülemeyenler için İstanbul Mahkemeleri yetkilidir.
              </p>
            </section>

            <div className="border-t pt-8">
              <p className="text-sm text-gray-500">
                Son güncelleme: 26 Eylül 2025 | Bu şartlar Türk Hukuku&apos;na tabidir.
              </p>
            </div>
          </div>
        </div>
      </main>

      <BookingFooter />
    </>
  );
};

export default Terms;