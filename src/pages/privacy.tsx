import React from 'react';
import Head from 'next/head';
import { FuturisticHeader } from '../components/layout/FuturisticHeader';
import { BookingFooter } from '../components/layout/BookingFooter';

const Privacy: React.FC = () => {
  return (
    <>
      <Head>
        <title>Gizlilik Politikası - Travel.LyDian | Kişisel Verilerin Korunması</title>
        <meta name="description" content="Travel.LyDian gizlilik politikası ve kişisel verilerin korunması hakkında bilgilendirme." />
      </Head>

      <FuturisticHeader />

      <main className="min-h-screen bg-white/5">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-white mb-8">Gizlilik Politikası</h1>
          <div className="bg-transparent rounded-2xl shadow-lg p-8 space-y-8">
            
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Kişisel Verilerin Toplanması</h2>
              <p className="text-gray-200 leading-relaxed">
                Travel.LyDian olarak, size daha iyi hizmet verebilmek için gerekli kişisel verilerinizi KVKK uyarınca toplar ve işleriz. 
                Topladığımız veriler arasında ad-soyad, e-posta adresi, telefon numarası ve seyahat tercihleri yer alır.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Verilerin Kullanım Amacı</h2>
              <ul className="list-disc list-inside text-gray-200 space-y-2">
                <li>Rezervasyon işlemlerinizi gerçekleştirmek</li>
                <li>AI destekli kişiselleştirilmiş öneriler sunmak</li>
                <li>Müşteri hizmetleri desteği sağlamak</li>
                <li>Yasal yükümlülüklerimizi yerine getirmek</li>
                <li>Güvenlik önlemlerini uygulamak</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Veri Güvenliği</h2>
              <p className="text-gray-200 leading-relaxed">
                Verileriniz blockchain teknolojisi ve SSL şifreleme ile korunmaktadır. 
                Kripto ödemelerde ek güvenlik katmanları uygulanır ve hiçbir finansal bilgi saklanmaz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Çerezler (Cookies)</h2>
              <p className="text-gray-200 leading-relaxed">
                Web sitemizde deneyiminizi iyileştirmek için çerezler kullanıyoruz. 
                AI öneri sistemimiz ve kişiselleştirme özellikleri çerez verilerini kullanabilir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Haklarınız</h2>
              <ul className="list-disc list-inside text-gray-200 space-y-2">
                <li>Verilerinize erişim talep etme</li>
                <li>Verilerin düzeltilmesini isteme</li>
                <li>Verilerin silinmesini talep etme</li>
                <li>İşlemeye itiraz etme</li>
                <li>Veri taşınabilirliği</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. İletişim</h2>
              <p className="text-gray-200 leading-relaxed">
                Gizlilik ile ilgili sorularınız için: <strong>privacy@lydian.com</strong> adresinden bize ulaşabilirsiniz.
              </p>
            </section>

            <div className="border-t pt-8">
              <p className="text-sm text-gray-400">
                Son güncelleme: 26 Eylül 2025 | Bu politika KVKK ve GDPR uyumludur.
              </p>
            </div>
          </div>
        </div>
      </main>

      <BookingFooter />
    </>
  );
};

export default Privacy;