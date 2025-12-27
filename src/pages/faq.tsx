import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ChevronDown, Search, HelpCircle, ArrowLeft } from 'lucide-react';
import { FuturisticHeader } from '../components/layout/FuturisticHeader';
import { BookingFooter } from '../components/layout/BookingFooter';

const FAQ_CATEGORIES = [
{
  id: 'booking',
  name: 'Rezervasyon ve İptal',
  questions: [
  {
    question: 'Nasıl rezervasyon yapabilirim?',
    answer: 'LyDian Travel ile rezervasyon yapmak çok kolay! İstediğiniz oteli, turu veya aktiviteyi seçin, tarihlerinizi belirleyin ve ödeme işlemini tamamlayın. Rezervasyon onayınız e-posta ve SMS ile gönderilecektir.'
  },
  {
    question: 'Rezervasyonumu nasıl iptal edebilirim?',
    answer: 'Hesabınıza giriş yaparak "Rezervasyonlarım" bölümünden iptal işlemi yapabilirsiniz. İptal koşulları, rezervasyon yaptığınız hizmet sağlayıcının politikasına göre değişiklik gösterebilir.'
  },
  {
    question: 'İptal durumunda ücret iadesi ne zaman yapılır?',
    answer: 'İptal koşullarına uygun iptallerde, ücret iadesi 5-10 iş günü içinde kredi kartınıza veya ödeme yaptığınız hesaba yapılır. Kripto para ödeme iadelerinde blockchain onay süreleri geçerlidir.'
  },
  {
    question: 'Rezervasyonumu değiştirebilir miyim?',
    answer: 'Evet, çoğu rezervasyon için tarih ve kişi sayısı değişikliği yapabilirsiniz. Değişiklik ücreti ve müsaitlik durumu için müşteri hizmetlerimizle iletişime geçebilirsiniz.'
  }]

},
{
  id: 'payment',
  name: 'Ödeme ve Fiyatlandırma',
  questions: [
  {
    question: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?',
    answer: 'Kredi kartı (Visa, Mastercard, American Express), banka kartı, havale/EFT ve kripto para (Bitcoin, Ethereum, USDT) ile ödeme yapabilirsiniz. Blockchain tabanlı güvenli ödeme sistemimiz sayesinde tüm işlemleriniz doğrulanır.'
  },
  {
    question: 'Fiyatlara vergi dahil mi?',
    answer: 'Gösterilen fiyatlara KDV ve diğer zorunlu vergiler dahildir. Ek hizmetler için (bagaj, yemek vb.) ek ücret talep edilebilir.'
  },
  {
    question: 'Taksitli ödeme yapabilir miyim?',
    answer: 'Evet, kredi kartı ile 3, 6, 9 ve 12 taksit seçeneklerinden faydalanabilirsiniz. Taksit imkanları bankanıza ve kampanyalara göre değişiklik gösterebilir.'
  },
  {
    question: 'Kripto para ile nasıl ödeme yaparım?',
    answer: 'Ödeme adımında "Kripto Para" seçeneğini işaretleyin. Ardından tercih ettiğiniz kripto parayı (BTC, ETH, USDT) seçin ve cüzdanınızdan ödemeyi tamamlayın. Blockchain onayından sonra rezervasyonunuz otomatik olarak onaylanır.'
  }]

},
{
  id: 'account',
  name: 'Hesap ve Profil',
  questions: [
  {
    question: 'Hesap nasıl oluşturabilirim?',
    answer: 'Ana sayfada "Kayıt Ol" butonuna tıklayarak e-posta adresiniz ve şifrenizle üyelik oluşturabilirsiniz. Sosyal medya hesaplarınız (Google, Facebook) ile de hızlı kayıt olabilirsiniz.'
  },
  {
    question: 'Şifremi unuttum, ne yapmalıyım?',
    answer: 'Giriş sayfasında "Şifremi Unuttum" linkine tıklayın. E-posta adresinize şifre sıfırlama linki gönderilecektir.'
  },
  {
    question: 'Profil bilgilerimi nasıl güncellerim?',
    answer: 'Hesabınıza giriş yaptıktan sonra "Profilim" bölümünden ad, soyad, telefon, e-posta ve diğer bilgilerinizi güncelleyebilirsiniz.'
  },
  {
    question: 'Hesabımı silebilir miyim?',
    answer: 'Evet, "Hesap Ayarları" bölümünden hesabınızı kalıcı olarak silebilirsiniz. Bu işlem geri alınamaz ve tüm verileriniz silinir.'
  }]

},
{
  id: 'services',
  name: 'Hizmetler ve Özellikler',
  questions: [
  {
    question: 'AI Seyahat Asistanı nasıl çalışır?',
    answer: 'AI asistanımız, seyahat tercihlerinizi öğrenerek size özel öneriler sunar. Sesli komutlarla arama yapabilir, rezervasyon oluşturabilir ve seyahat planınızı optimize edebilirsiniz.'
  },
  {
    question: 'VR Önizleme özelliği nedir?',
    answer: 'Otelleri, turları ve destinasyonları rezervasyon yapmadan önce sanal gerçeklik (VR) ile 360 derece gezilebilirsiniz. VR gözlük veya mobil cihazınızla deneyimleyebilirsiniz.'
  },
  {
    question: 'Blockchain doğrulama ne işe yarar?',
    answer: 'Tüm rezervasyonlarınız blockchain üzerinde şifrelenip saklanır. Bu sayede rezervasyon geçerliliği, ödeme güvenliği ve veri bütünlüğü garanti altına alınır.'
  },
  {
    question: 'Grup seyahati için özel teklifler var mı?',
    answer: 'Evet, 10 kişi ve üzeri grup rezervasyonlarında özel indirimler ve organizasyon hizmetleri sunuyoruz. Grup Seyahati sayfamızdan teklif alabilirsiniz.'
  }]

},
{
  id: 'travel',
  name: 'Seyahat ve Lojistik',
  questions: [
  {
    question: 'Havalimanı transferi hizmeti var mı?',
    answer: 'Evet, tüm büyük şehirlerde havalimanı transfer hizmeti sunuyoruz. Özel araç, VIP transfer ve paylaşımlı transfer seçeneklerinden birini tercih edebilirsiniz.'
  },
  {
    question: 'Vize işlemleri için yardım alabilir miyim?',
    answer: 'Müşteri hizmetlerimiz vize gereklilikleri hakkında bilgi verir, ancak vize başvuru işlemlerini sizin yapmanız gerekmektedir.'
  },
  {
    question: 'Seyahat sigortası dahil mi?',
    answer: 'Bazı paket turlarda seyahat sigortası dahildir. Diğer rezervasyonlarda ödeme adımında seyahat sigortası ekleyebilirsiniz.'
  },
  {
    question: 'Yurt dışı seyahatlerinde roaming ücreti var mı?',
    answer: 'Roaming ücretleri telekomünikasyon operatörünüze bağlıdır. LyDian Travel mobil uygulamamız offline çalışabilir ve Wi-Fi bağlantısı olmadan da rezervasyonlarınıza erişebilirsiniz.'
  }]

},
{
  id: 'support',
  name: 'Müşteri Desteği',
  questions: [
  {
    question: 'Müşteri hizmetlerine nasıl ulaşabilirim?',
    answer: '7/24 canlı destek hattımız, e-posta, WhatsApp ve uygulama içi canlı sohbet üzerinden bize ulaşabilirsiniz. Ayrıca sesli asistan ile de destek alabilirsiniz.'
  },
  {
    question: 'Acil durumlarda ne yapmalıyım?',
    answer: 'Rezervasyon onay e-postanızda acil durum telefon numarası bulunmaktadır. 7/24 acil destek hattımızdan anında yardım alabilirsiniz.'
  },
  {
    question: 'Şikayet ve önerilerimi nasıl iletebilirim?',
    answer: 'İletişim sayfamızdaki formu doldurarak veya info@lydian.com adresine e-posta göndererek şikayet ve önerilerinizi iletebilirsiniz.'
  },
  {
    question: 'Hangi dillerde destek veriyorsunuz?',
    answer: 'Türkçe, İngilizce, Almanca, Rusça ve Arapça dillerinde müşteri desteği sunuyoruz. AI asistanımız 50+ dilde hizmet verebilmektedir.'
  }]

}];


export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());

  const toggleQuestion = (categoryId: string, questionIndex: number) => {
    const key = `${categoryId}-${questionIndex}`;
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedQuestions(newExpanded);
  };

  const filteredCategories = FAQ_CATEGORIES.map((category) => ({
    ...category,
    questions: category.questions.filter((q) =>
    q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter((category) =>
  !selectedCategory || category.id === selectedCategory
  ).filter((category) => category.questions.length > 0);

  return (
    <>
      <Head>
        <title>Sık Sorulan Sorular | LyDian Travel - Türkiye'nin AI Destekli Seyahat Platformu</title>
        <meta name="description" content="LyDian Travel hakkında merak ettikleriniz: Rezervasyon, ödeme, iptal, AI asistan, VR önizleme, blockchain doğrulama ve daha fazlası." />
        <meta name="keywords" content="sık sorulan sorular, faq, lydian travel, rezervasyon iptal, ödeme, müşteri hizmetleri, ai asistan, vr önizleme" />

        {/* Open Graph */}
        <meta property="og:title" content="Sık Sorulan Sorular | LyDian Travel" />
        <meta property="og:description" content="Rezervasyon, ödeme, iptal ve tüm hizmetlerimiz hakkında merak ettikleriniz." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://travel.lydian.com/faq" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sık Sorulan Sorular | LyDian Travel" />
        <meta name="twitter:description" content="Rezervasyon, ödeme, iptal ve tüm hizmetlerimiz hakkında merak ettikleriniz." />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": FAQ_CATEGORIES.flatMap((category) =>
            category.questions.map((q) => ({
              "@type": "Question",
              "name": q.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": q.answer
              }
            }))
            )
          })}
        </script>
      </Head>

      <FuturisticHeader />

      {/* Return to Home Button */}
      <Link
        href="/"
        className="fixed top-24 left-6 z-10 flex items-center gap-2 px-4 py-2 bg-lydian-bg/90 backdrop-blur-sm rounded-xl shadow-lg border border-lydian-border text-lydian-text-muted hover:bg-lydian-glass-dark hover:text-lydian-primary transition-all duration-200">

        <ArrowLeft className="w-4 h-4" />
        <span className="font-medium">Ana Sayfaya Dön</span>
      </Link>

      <div className="min-h-screen bg-lydian-glass-dark pt-8">
        {/* Hero Section */}
        <div className="text-lydian-text-inverse py-16" style={{ background: 'linear-gradient(135deg, var(--ac-1) 0%, var(--ac-2) 50%, var(--ac-3) 100%)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <HelpCircle className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Sık Sorulan Sorular
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Merak ettiklerinizin cevaplarını bulun
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-4 h-5 w-5 text-lydian-text-muted" />
              <input
                type="text"
                placeholder="Soru ara..."
                className="w-full pl-12 pr-4 py-4 rounded-xl text-lydian-text-inverse focus:ring-2 focus:ring-white focus:outline-none shadow-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} />

            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              !selectedCategory ?
              'ocean-button' :
              'ocean-button-secondary'}`
              }>

              Tümü
            </button>
            {FAQ_CATEGORIES.map((category) =>
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === category.id ?
              'ocean-button' :
              'ocean-button-secondary'}`
              }>

                {category.name}
              </button>
            )}
          </div>

          {/* FAQ Content */}
          <div className="space-y-8">
            {filteredCategories.map((category) =>
            <div key={category.id} className="bg-lydian-bg-hover rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-lydian-text-inverse mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-lydian-primary to-lydian-secondary rounded-full"></div>
                  {category.name}
                </h2>

                <div className="space-y-4">
                  {category.questions.map((q, index) => {
                  const key = `${category.id}-${index}`;
                  const isExpanded = expandedQuestions.has(key);

                  return (
                    <div
                      key={index}
                      className="border border-lydian-border rounded-lg overflow-hidden hover:border-lydian-primary transition-colors">

                        <button
                        onClick={() => toggleQuestion(category.id, index)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-lydian-glass-dark transition-colors">

                          <span className="font-semibold text-lydian-text-inverse pr-4">{q.question}</span>
                          <ChevronDown
                          className={`w-5 h-5 text-lydian-primary transition-transform flex-shrink-0 ${
                          isExpanded ? 'rotate-180' : ''}`
                          } />

                        </button>
                        {isExpanded &&
                      <div className="px-6 py-4 bg-lydian-glass-dark border-t border-lydian-border">
                            <p className="text-lydian-text-muted leading-relaxed">{q.answer}</p>
                          </div>
                      }
                      </div>);

                })}
                </div>
              </div>
            )}
          </div>

          {/* No Results */}
          {filteredCategories.length === 0 &&
          <div className="text-center py-16">
              <HelpCircle className="h-24 w-24 text-lydian-text-dim mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-lydian-text-inverse mb-4">
                Aradığınız soruya cevap bulunamadı
              </h2>
              <p className="text-lydian-text-dim mb-8">
                Farklı anahtar kelimeler deneyin veya bizimle iletişime geçin
              </p>
              <div className="flex items-center justify-center gap-4">
                <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                }}
                className="px-6 py-3 bg-lydian-bg-active text-lydian-text-muted rounded-lg hover:bg-gray-300 transition-colors font-semibold">

                  Aramayı Temizle
                </button>
                <Link
                href="/contact"
                className="px-6 py-3 bg-gradient-to-r from-lydian-primary to-lydian-secondary text-lydian-text-inverse rounded-lg hover:shadow-lg transition-all font-semibold">

                  İletişime Geç
                </Link>
              </div>
            </div>
          }

          {/* Contact CTA */}
          <div className="mt-16 bg-gradient-to-r from-[#667EEA] via-[#764BA2] to-[#667EEA] rounded-2xl p-8 text-lydian-text-inverse text-center">
            <h3 className="text-2xl font-bold mb-4">Sorunuza cevap bulamadınız mı?</h3>
            <p className="mb-6 text-blue-100">
              7/24 müşteri hizmetlerimiz size yardımcı olmak için burada!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-6 py-3 bg-lydian-bg-hover text-lydian-primary rounded-lg hover:bg-lydian-primary-lighter transition-colors font-semibold">

                İletişime Geç
              </Link>
              <Link
                href="/support"
                className="px-6 py-3 bg-lydian-glass-dark-heavy backdrop-blur-sm text-lydian-text-inverse rounded-lg hover:bg-lydian-bg/30 transition-colors font-semibold">

                Canlı Destek
              </Link>
            </div>
          </div>
        </div>
      </div>

      <BookingFooter />
    </>);

}