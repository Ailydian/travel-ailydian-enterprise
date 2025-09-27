import React from 'react';
import Head from 'next/head';
import NavigationHeader from '../components/layout/NavigationHeader';

const Cookies: React.FC = () => {
  return (
    <>
      <Head>
        <title>Çerez Politikası - Travel.Ailydian | Cookie Kullanımı</title>
        <meta name="description" content="Travel.Ailydian çerez kullanım politikası ve web sitesinde kullanılan çerez türleri hakkında bilgi." />
      </Head>

      <NavigationHeader />

      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Çerez Politikası</h1>
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Çerez Nedir?</h2>
              <p className="text-gray-700 leading-relaxed">
                Çerezler, web sitelerini ziyaret ettiğinizde tarayıcınıza kaydedilen küçük metin dosyalarıdır. 
                Travel.Ailydian&apos;da çerezler, AI öneri sistemi, kişiselleştirme ve site performansını iyileştirmek için kullanılır.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Kullandığımız Çerez Türleri</h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Gerekli Çerezler</h3>
                  <p className="text-gray-700">Web sitesinin temel işlevleri için zorunlu olan çerezlerdir. Giriş durumu, sepet içeriği ve güvenlik.</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Analitik Çerezler</h3>
                  <p className="text-gray-700">Google Analytics ile site kullanım istatistikleri. Hangi sayfaların popüler olduğunu anlamaya yarar.</p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">AI Kişiselleştirme Çerezler</h3>
                  <p className="text-gray-700">Seyahat tercihlerinizi öğrenmek ve size özel AI öneriler sunmak için kullanılır.</p>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Pazarlama Çerezler</h3>
                  <p className="text-gray-700">İlgi alanlarınıza uygun reklamlar göstermek için üçüncü taraf platformlarda kullanılır.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Çerez Yönetimi</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Çerezleri kontrol etmek için tarayıcı ayarlarınızı kullanabilirsiniz:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Chrome:</strong> Ayarlar &gt; Gizlilik ve Güvenlik &gt; Çerezler</li>
                <li><strong>Firefox:</strong> Seçenekler &gt; Gizlilik ve Güvenlik</li>
                <li><strong>Safari:</strong> Tercihler &gt; Gizlilik</li>
                <li><strong>Edge:</strong> Ayarlar &gt; Çerezler ve Site İzinleri</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. AI ve Blockchain Çerezler</h2>
              <p className="text-gray-700 leading-relaxed">
                AI seyahat asistanımız ve blockchain güvenlik sistemi, kullanım deneyiminizi kişiselleştirmek için 
                özel çerezler kullanabilir. Bu çerezler anonim veri analizi için kullanılır.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Üçüncü Taraf Çerezler</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Google Analytics:</strong> Site kullanım istatistikleri</li>
                <li><strong>Facebook Pixel:</strong> Sosyal medya entegrasyonu</li>
                <li><strong>Kripto Ödeme Sağlayıcıları:</strong> Güvenli ödeme işlemleri</li>
                <li><strong>VR Teknoloji Ortakları:</strong> 3D önizleme hizmetleri</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Çerez Onayı</h2>
              <p className="text-gray-700 leading-relaxed">
                İlk ziyaretinizde çerez onay paneli görünür. Tercihlerinizi istediğiniz zaman değiştirebilirsiniz. 
                Gerekli çerezler site işleyişi için zorunludur.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. İletişim</h2>
              <p className="text-gray-700 leading-relaxed">
                Çerezler hakkında sorularınız için: <strong>cookies@ailydian.com</strong>
              </p>
            </section>

            <div className="border-t pt-8">
              <p className="text-sm text-gray-500">
                Son güncelleme: 26 Eylül 2025 | KVKK ve GDPR uyumlu çerez politikası.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Cookies;