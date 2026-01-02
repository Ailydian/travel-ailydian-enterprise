import React, { useState } from 'react';
import Head from 'next/head';
import { ModernHeader } from '../components/layout/ModernHeader';
import { BookingFooter } from '../components/layout/BookingFooter';
import { Briefcase, MapPin, Clock, TrendingUp, Users, Heart, Zap, Globe, Coffee, GraduationCap, Trophy, ChevronRight, Send } from 'lucide-react';

interface JobPosition {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
}

export default function Careers() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');

  const jobPositions: JobPosition[] = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    department: 'Teknoloji',
    location: 'İstanbul',
    type: 'Tam Zamanlı',
    experience: '5+ yıl',
    description: 'React, Next.js ve TypeScript konusunda deneyimli, kullanıcı deneyimi odaklı frontend geliştirici arıyoruz.'
  },
  {
    id: 2,
    title: 'Seyahat Danışmanı',
    department: 'Müşteri Hizmetleri',
    location: 'Antalya',
    type: 'Tam Zamanlı',
    experience: '2+ yıl',
    description: 'Müşterilerimize en iyi seyahat deneyimini sunmak için tutkulu ve deneyimli seyahat danışmanı arıyoruz.'
  },
  {
    id: 3,
    title: 'Ürün Müdürü',
    department: 'Ürün Yönetimi',
    location: 'İstanbul',
    type: 'Tam Zamanlı',
    experience: '3+ yıl',
    description: 'Seyahat teknolojileri alanında yenilikçi ürünler geliştirmek için deneyimli ürün müdürü arıyoruz.'
  },
  {
    id: 4,
    title: 'Dijital Pazarlama Uzmanı',
    department: 'Pazarlama',
    location: 'İstanbul / Uzaktan',
    type: 'Tam Zamanlı',
    experience: '3+ yıl',
    description: 'SEO, SEM ve sosyal medya stratejileri konusunda deneyimli dijital pazarlama uzmanı arıyoruz.'
  },
  {
    id: 5,
    title: 'Backend Developer',
    department: 'Teknoloji',
    location: 'İzmir',
    type: 'Tam Zamanlı',
    experience: '3+ yıl',
    description: 'Node.js, Python ve mikroservis mimarisi konusunda deneyimli backend geliştirici arıyoruz.'
  },
  {
    id: 6,
    title: 'Müşteri Destek Temsilcisi',
    department: 'Müşteri Hizmetleri',
    location: 'Ankara',
    type: 'Vardiyalı',
    experience: 'Deneyimsiz kabul',
    description: 'Müşteri memnuniyeti odaklı, iletişim becerileri güçlü destek temsilcisi arıyoruz.'
  }];


  const benefits = [
  {
    icon: Coffee,
    title: 'Esnek Çalışma',
    description: 'Hibrit çalışma modeli ve esnek mesai saatleri'
  },
  {
    icon: GraduationCap,
    title: 'Eğitim Desteği',
    description: 'Sürekli eğitim programları ve sertifikasyon destekleri'
  },
  {
    icon: Heart,
    title: 'Sağlık Sigortası',
    description: 'Özel sağlık sigortası ve spor salonu üyeliği'
  },
  {
    icon: Globe,
    title: 'Seyahat İndirimleri',
    description: 'Çalışanlara özel seyahat ve konaklama indirimleri'
  },
  {
    icon: TrendingUp,
    title: 'Kariyer Gelişimi',
    description: 'Net kariyer yolu ve terfi fırsatları'
  },
  {
    icon: Trophy,
    title: 'Performans Bonusu',
    description: 'Başarı odaklı prim ve ödül sistemi'
  }];


  const departments = [
  'all',
  'Teknoloji',
  'Müşteri Hizmetleri',
  'Pazarlama',
  'Ürün Yönetimi'];


  const filteredJobs = selectedDepartment === 'all' ?
  jobPositions :
  jobPositions.filter((job) => job.department === selectedDepartment);

  return (
    <>
      <Head>
        <title>Kariyer - Travel.com</title>
        <meta name="description" content="Travel.com ekibine katılın! Seyahat teknolojilerinde kariyer fırsatları, açık pozisyonlar ve çalışan avantajları." />
        <meta name="keywords" content="kariyer, iş fırsatları, travel jobs, seyahat sektörü iş ilanları, açık pozisyonlar" />
      </Head>

      <ModernHeader />

      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-800">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-lydian-dark text-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Geleceği Birlikte İnşa Edelim
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Seyahat teknolojilerinde öncü bir şirkette kariyer yapın.
                Yenilikçi projeler, harika bir ekip ve sınırsız gelişim fırsatları sizi bekliyor.
              </p>
              <a
                href="#open-positions"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-blue-500 px-8 py-4 rounded-lg font-semibold hover:bg-blue-500/10er transition-colors">

                Açık Pozisyonları Gör
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl border-b border-white/20 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-500 mb-2">200+</div>
                <div className="text-gray-400">Çalışan</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-500 mb-2">15+</div>
                <div className="text-gray-400">Ülkede Ofis</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-500 mb-2">4.8/5</div>
                <div className="text-gray-400">Çalışan Memnuniyeti</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-500 mb-2">%85</div>
                <div className="text-gray-400">İç Terfi Oranı</div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Join Us */}
        <div className="py-16 bg-gradient-to-br from-slate-900 via-black to-slate-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Neden Travel.com?
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Çalışanlarımızın mutluluğu ve gelişimi bizim önceliğimiz
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 bg-lydian-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-400">
                      {benefit.description}
                    </p>
                  </div>);

              })}
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="py-16 bg-gradient-to-br from-slate-900 via-black to-slate-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Değerlerimiz
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Takım Ruhu
                </h3>
                <p className="text-gray-400">
                  Birlikte çalışarak daha güçlü olduğumuza inanıyoruz.
                  İşbirliği ve karşılıklı destek kültürümüzün temelidir.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  İnovasyon
                </h3>
                <p className="text-gray-400">
                  Yenilikçi düşünmeyi ve risk almayı teşvik ediyoruz.
                  Her fikir değerli ve her ses duyulur.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-600-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Müşteri Odaklılık
                </h3>
                <p className="text-gray-400">
                  Müşterilerimizin seyahat deneyimini mükemmelleştirmek
                  için tutkuyla çalışıyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Open Positions */}
        <div id="open-positions" className="py-16 bg-gradient-to-br from-slate-900 via-black to-slate-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Açık Pozisyonlar
              </h2>
              <p className="text-xl text-gray-400">
                Size uygun pozisyonu bulun ve başvurun
              </p>
            </div>

            {/* Department Filter */}
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {departments.map((dept) =>
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedDepartment === dept ?
                'bg-gradient-to-r from-blue-600 to-purple-600 text-white' :
                'bg-white/5 text-gray-200 hover:bg-lydian-bg/10'}`
                }>

                  {dept === 'all' ? 'Tümü' : dept}
                </button>
              )}
            </div>

            {/* Job Listings */}
            <div className="space-y-4">
              {filteredJobs.map((job) =>
              <div key={job.id} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {job.title}
                      </h3>
                      <p className="text-gray-400 mb-4">
                        {job.description}
                      </p>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <span className="inline-flex items-center gap-1 text-gray-400">
                          <Briefcase className="w-4 h-4" />
                          {job.department}
                        </span>
                        <span className="inline-flex items-center gap-1 text-gray-400">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="inline-flex items-center gap-1 text-gray-400">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </span>
                        <span className="inline-flex items-center gap-1 text-gray-400">
                          <TrendingUp className="w-4 h-4" />
                          {job.experience}
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <button className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-lydian-dark transition-colors flex items-center gap-2 justify-center">
                        Başvur
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {filteredJobs.length === 0 &&
            <div className="text-center py-12">
                <p className="text-gray-300 text-lg">
                  Bu departmanda şu anda açık pozisyon bulunmamaktadır.
                </p>
              </div>
            }
          </div>
        </div>

        {/* Spontaneous Application */}
        <div className="py-16 bg-gradient-to-br from-slate-900 via-black to-slate-800">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-gradient-to-r from-blue-600 to-lydian-dark text-white rounded-2xl p-8 md:p-12">
              <div className="text-center">
                <Send className="w-16 h-16 mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-4">
                  Aradığınız Pozisyonu Bulamadınız mı?
                </h2>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                  Kendiliğinden başvuru yapın! CV&apos;nizi gönderin, size uygun bir pozisyon
                  açıldığında sizi bilgilendirmekten mutluluk duyarız.
                </p>
                <a
                  href="mailto:kariyer@holiday.ailydian.com"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-blue-500 px-8 py-4 rounded-lg font-semibold hover:bg-blue-500/10er transition-colors">

                  <Send className="w-5 h-5" />
                  CV Gönder
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Culture Section */}
        <div className="py-16 bg-gradient-to-br from-slate-900 via-black to-slate-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Ofis Kültürümüz
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Travel.com&apos;da sadece çalışmıyorsunuz, aynı zamanda eğleniyor ve gelişiyorsunuz
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Sosyal Aktiviteler
                </h3>
                <p className="text-gray-400 mb-4">
                  Düzenli team building etkinlikleri, oyun turnuvaları ve sosyal geziler
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Modern Ofis
                </h3>
                <p className="text-gray-400 mb-4">
                  Son teknoloji ekipman, rahat çalışma alanları ve dinlenme odaları
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Çeşitlilik ve Kapsayıcılık
                </h3>
                <p className="text-gray-400 mb-4">
                  Farklılıkları değerli bulan, herkesin kendini değerli hissettiği bir ortam
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BookingFooter />
    </>);

}