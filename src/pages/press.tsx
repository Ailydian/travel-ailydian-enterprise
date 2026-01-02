import React from 'react';
import Head from 'next/head';
import { ModernHeader } from '../components/layout/ModernHeader';
import { BookingFooter } from '../components/layout/BookingFooter';
import { Newspaper, Download, Mail, Phone, Award, TrendingUp, Users, Globe, Calendar, ExternalLink, Image as ImageIcon } from 'lucide-react';

interface PressRelease {
  id: number;
  date: string;
  title: string;
  excerpt: string;
  category: string;
}

interface Award {
  id: number;
  year: string;
  title: string;
  organization: string;
  description: string;
}

export default function Press() {
  const pressReleases: PressRelease[] = [
  {
    id: 1,
    date: '15 Aralık 2025',
    title: 'Travel.com Yapay Zeka Destekli Seyahat Asistanını Tanıttı',
    excerpt: 'Türkiye\'nin önde gelen seyahat platformu Travel.com, yapay zeka teknolojisi ile güçlendirilmiş yeni seyahat asistanını kullanıcılarının hizmetine sundu.',
    category: 'Ürün Lansmanı'
  },
  {
    id: 2,
    date: '1 Aralık 2025',
    title: 'Travel.com 2025 Yılında 2 Milyon Mutlu Müşteriye Ulaştı',
    excerpt: 'Platform, 2025 yılını 2 milyon mutlu müşteri ve 5 milyon rezervasyon rakamıyla kapatarak sektörde önemli bir başarıya imza attı.',
    category: 'Şirket Haberi'
  },
  {
    id: 3,
    date: '20 Kasım 2025',
    title: 'Blockchain Tabanlı Ödeme Sistemi Hayata Geçti',
    excerpt: 'Travel.com, blockchain teknolojisi ile güvenli ve şeffaf ödeme altyapısını devreye alarak sektörde bir ilke imza attı.',
    category: 'Teknoloji'
  },
  {
    id: 4,
    date: '5 Kasım 2025',
    title: 'Sürdürülebilir Turizm Sertifikası Aldı',
    excerpt: 'Travel.com, çevre dostu turizm uygulamaları ve karbon nötr hedefleri ile Uluslararası Sürdürülebilir Turizm Sertifikası almaya hak kazandı.',
    category: 'Ödül & Başarı'
  },
  {
    id: 5,
    date: '15 Ekim 2025',
    title: '15 Ülkede Hizmet Ağını Genişletti',
    excerpt: 'Platform, Avrupa ve Asya\'da 5 yeni ülkede hizmet vermeye başlayarak küresel büyümesine devam ediyor.',
    category: 'Genişleme'
  },
  {
    id: 6,
    date: '1 Ekim 2025',
    title: 'Kariyer Fuarında 200+ Pozisyon İlanı Verildi',
    excerpt: 'Travel.com, İstanbul Kariyer Fuarı\'nda teknoloji, pazarlama ve müşteri hizmetleri alanlarında 200\'den fazla yeni pozisyon açtı.',
    category: 'İnsan Kaynakları'
  }];


  const awards: Award[] = [
  {
    id: 1,
    year: '2025',
    title: 'Yılın Dijital Platformu',
    organization: 'Türkiye Turizm Yatırımcıları Derneği',
    description: 'Yenilikçi teknolojiler ve müşteri memnuniyeti odaklı hizmetleri'
  },
  {
    id: 2,
    year: '2025',
    title: 'En İyi Müşteri Deneyimi Ödülü',
    organization: 'E-Ticaret Zirvesi',
    description: 'Üstün müşteri hizmetleri ve kullanıcı dostu platform tasarımı'
  },
  {
    id: 3,
    year: '2024',
    title: 'Teknoloji İnovasyon Ödülü',
    organization: 'Bilişim 500',
    description: 'Yapay zeka ve blockchain teknolojilerinin seyahat sektöründe kullanımı'
  },
  {
    id: 4,
    year: '2024',
    title: 'Sürdürülebilir İşletme Sertifikası',
    organization: 'Global Sustainable Tourism Council',
    description: 'Çevre dostu turizm uygulamaları ve karbon nötr operasyonlar'
  }];


  const stats = [
  { icon: Users, value: '2M+', label: 'Mutlu Müşteri' },
  { icon: Globe, value: '150+', label: 'Ülke' },
  { icon: TrendingUp, value: '5M+', label: 'Rezervasyon' },
  { icon: Award, value: '25+', label: 'Ödül' }];


  return (
    <>
      <Head>
        <title>Basın Odası - Travel.com</title>
        <meta name="description" content="Travel.com basın bültenleri, şirket haberleri, ödüller ve medya kiti. Basın mensupları için iletişim bilgileri ve kaynaklar." />
        <meta name="keywords" content="basın odası, basın bülteni, medya, şirket haberleri, ödüller, press kit" />
      </Head>

      <ModernHeader />

      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-800">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-lydian-dark text-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-4 mb-6">
              <Newspaper className="w-16 h-16" />
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-2">
                  Basın Odası
                </h1>
                <p className="text-xl text-blue-100">
                  Travel.com hakkında güncel haberler ve basın bültenleri
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl border-b border-white/20 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-lydian-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-blue-500" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-gray-400">
                      {stat.label}
                    </div>
                  </div>);

              })}
            </div>
          </div>
        </div>

        {/* Press Contact */}
        <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10 mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-lydian-dark text-white rounded-xl shadow-xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Basın İletişim</h2>
                <p className="text-blue-100 mb-6">
                  Basın sorguları ve röportaj talepleri için bizimle iletişime geçin
                </p>
                <div className="space-y-3">
                  <a href="mailto:basin@holiday.ailydian.com" className="flex items-center gap-3 text-white hover:text-blue-100 transition-colors">
                    <Mail className="w-5 h-5" />
                    <span>basin@holiday.ailydian.com</span>
                  </a>
                  <a href="tel:+902121234567" className="flex items-center gap-3 text-white hover:text-blue-100 transition-colors">
                    <Phone className="w-5 h-5" />
                    <span>+90 (212) 123 45 67</span>
                  </a>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Medya Kiti</h2>
                <p className="text-blue-100 mb-6">
                  Logo, görseller ve kurumsal kimlik materyallerini indirin
                </p>
                <button className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-blue-500 px-6 py-3 rounded-lg font-semibold hover:bg-blue-500/10er transition-colors">
                  <Download className="w-5 h-5" />
                  Medya Kitini İndir
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Press Releases */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Son Basın Bültenleri
            </h2>
            <p className="text-xl text-gray-400">
              Travel.com&apos;dan en güncel haberler ve duyurular
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {pressReleases.map((release) =>
            <article key={release.id} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center gap-1 text-sm text-gray-300">
                      <Calendar className="w-4 h-4" />
                      {release.date}
                    </span>
                    <span className="px-3 py-1 bg-lydian-primary/10 text-blue-500 text-sm font-medium rounded-full">
                      {release.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 hover:text-blue-500 transition-colors">
                    {release.title}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {release.excerpt}
                  </p>
                  <button className="inline-flex items-center gap-2 text-blue-500 font-semibold hover:gap-3 transition-all">
                    Devamını Oku
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </article>
            )}
          </div>
        </div>

        {/* Awards Section */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Ödüller ve Başarılar
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Sektördeki mükemmellik ve inovasyonumuz için aldığımız prestijli ödüller
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {awards.map((award) =>
              <div key={award.id} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-6 border border-white/20">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-lydian-dark text-white rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-blue-500 mb-1">
                        {award.year}
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {award.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-2">
                        {award.organization}
                      </p>
                      <p className="text-sm text-gray-300">
                        {award.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Company Overview */}
        <div className="py-16 bg-gradient-to-br from-slate-900 via-black to-slate-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">
                  Şirket Hakkında
                </h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Travel.com, 2010 yılında kurulan ve Türkiye&apos;nin önde gelen dijital seyahat platformlarından biridir.
                    Yapay zeka ve blockchain teknolojilerini seyahat sektörüne entegre eden öncü şirketlerden biri olarak,
                    müşterilerimize güvenli, kişiselleştirilmiş ve sorunsuz seyahat deneyimleri sunuyoruz.
                  </p>
                  <p>
                    150&apos;den fazla ülkede hizmet veren platformumuz, 2 milyondan fazla mutlu müşteriye ulaşmış ve
                    5 milyonun üzerinde başarılı rezervasyon gerçekleştirmiştir. 200&apos;ü aşkın çalışanımızla
                    15 farklı ülkede ofislerimiz bulunmaktadır.
                  </p>
                  <p>
                    Misyonumuz, teknoloji ile seyahati herkes için daha erişilebilir, güvenli ve keyifli hale getirmektir.
                    Sürdürülebilir turizm konusunda öncü rolümüzü sürdürürken, müşteri memnuniyetini her zaman
                    önceliğimiz olarak görüyoruz.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-6">
                  Medya Kaynakları
                </h2>
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <ImageIcon className="w-6 h-6 text-blue-500" />
                      <h3 className="text-lg font-semibold text-white">
                        Logolar ve Görseller
                      </h3>
                    </div>
                    <p className="text-gray-400 mb-4">
                      Yüksek çözünürlüklü logo dosyaları ve kurumsal görseller
                    </p>
                    <button className="text-blue-500 font-semibold hover:underline flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      İndir
                    </button>
                  </div>

                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <Users className="w-6 h-6 text-blue-500" />
                      <h3 className="text-lg font-semibold text-white">
                        Yönetim Ekibi Fotoğrafları
                      </h3>
                    </div>
                    <p className="text-gray-400 mb-4">
                      Üst düzey yöneticilerin biyografileri ve profesyonel fotoğrafları
                    </p>
                    <button className="text-blue-500 font-semibold hover:underline flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      İndir
                    </button>
                  </div>

                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <Newspaper className="w-6 h-6 text-blue-500" />
                      <h3 className="text-lg font-semibold text-white">
                        Kurumsal Sunum
                      </h3>
                    </div>
                    <p className="text-gray-400 mb-4">
                      Şirket hakkında detaylı bilgi içeren kurumsal sunumumuz
                    </p>
                    <button className="text-blue-500 font-semibold hover:underline flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      İndir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="py-16 bg-gradient-to-br from-slate-900 via-black to-slate-800">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-gradient-to-r from-blue-600 to-lydian-dark text-white rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Basın Bültenlerimizi Takip Edin
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Travel.com&apos;dan en son haberleri ve duyuruları ilk siz öğrenin
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="flex-1 px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white" />

                <button className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-blue-500 px-6 py-3 rounded-lg font-semibold hover:bg-blue-500/10er transition-colors whitespace-nowrap">
                  Abone Ol
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BookingFooter />
    </>);

}