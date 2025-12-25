import React, { useState } from 'react';
import Head from 'next/head';
import { BookingHeader } from '../components/layout/BookingHeader';
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
    }
  ];

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
    }
  ];

  const departments = [
    'all',
    'Teknoloji',
    'Müşteri Hizmetleri',
    'Pazarlama',
    'Ürün Yönetimi'
  ];

  const filteredJobs = selectedDepartment === 'all'
    ? jobPositions
    : jobPositions.filter(job => job.department === selectedDepartment);

  return (
    <>
      <Head>
        <title>Kariyer - Travel.com</title>
        <meta name="description" content="Travel.com ekibine katılın! Seyahat teknolojilerinde kariyer fırsatları, açık pozisyonlar ve çalışan avantajları." />
        <meta name="keywords" content="kariyer, iş fırsatları, travel jobs, seyahat sektörü iş ilanları, açık pozisyonlar" />
      </Head>

      <BookingHeader />

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-ailydian-primary to-ailydian-dark text-white py-20">
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
                className="inline-flex items-center gap-2 bg-white text-ailydian-primary px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Açık Pozisyonları Gör
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white border-b border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-ailydian-primary mb-2">200+</div>
                <div className="text-gray-600">Çalışan</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-ailydian-primary mb-2">15+</div>
                <div className="text-gray-600">Ülkede Ofis</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-ailydian-primary mb-2">4.8/5</div>
                <div className="text-gray-600">Çalışan Memnuniyeti</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-ailydian-primary mb-2">%85</div>
                <div className="text-gray-600">İç Terfi Oranı</div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Join Us */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Neden Travel.com?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Çalışanlarımızın mutluluğu ve gelişimi bizim önceliğimiz
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 bg-ailydian-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-ailydian-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Değerlerimiz
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-ailydian-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Takım Ruhu
                </h3>
                <p className="text-gray-600">
                  Birlikte çalışarak daha güçlü olduğumuza inanıyoruz.
                  İşbirliği ve karşılıklı destek kültürümüzün temelidir.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  İnovasyon
                </h3>
                <p className="text-gray-600">
                  Yenilikçi düşünmeyi ve risk almayı teşvik ediyoruz.
                  Her fikir değerli ve her ses duyulur.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Müşteri Odaklılık
                </h3>
                <p className="text-gray-600">
                  Müşterilerimizin seyahat deneyimini mükemmelleştirmek
                  için tutkuyla çalışıyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Open Positions */}
        <div id="open-positions" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Açık Pozisyonlar
              </h2>
              <p className="text-xl text-gray-600">
                Size uygun pozisyonu bulun ve başvurun
              </p>
            </div>

            {/* Department Filter */}
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    selectedDepartment === dept
                      ? 'bg-ailydian-primary text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {dept === 'all' ? 'Tümü' : dept}
                </button>
              ))}
            </div>

            {/* Job Listings */}
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div key={job.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {job.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {job.description}
                      </p>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <span className="inline-flex items-center gap-1 text-gray-600">
                          <Briefcase className="w-4 h-4" />
                          {job.department}
                        </span>
                        <span className="inline-flex items-center gap-1 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="inline-flex items-center gap-1 text-gray-600">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </span>
                        <span className="inline-flex items-center gap-1 text-gray-600">
                          <TrendingUp className="w-4 h-4" />
                          {job.experience}
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <button className="w-full md:w-auto bg-ailydian-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-ailydian-dark transition-colors flex items-center gap-2 justify-center">
                        Başvur
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Bu departmanda şu anda açık pozisyon bulunmamaktadır.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Spontaneous Application */}
        <div className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-gradient-to-r from-ailydian-primary to-ailydian-dark text-white rounded-2xl p-8 md:p-12">
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
                  href="mailto:kariyer@travel.ailydian.com"
                  className="inline-flex items-center gap-2 bg-white text-ailydian-primary px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  <Send className="w-5 h-5" />
                  CV Gönder
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Culture Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Ofis Kültürümüz
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Travel.com&apos;da sadece çalışmıyorsunuz, aynı zamanda eğleniyor ve gelişiyorsunuz
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Sosyal Aktiviteler
                </h3>
                <p className="text-gray-600 mb-4">
                  Düzenli team building etkinlikleri, oyun turnuvaları ve sosyal geziler
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Modern Ofis
                </h3>
                <p className="text-gray-600 mb-4">
                  Son teknoloji ekipman, rahat çalışma alanları ve dinlenme odaları
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Çeşitlilik ve Kapsayıcılık
                </h3>
                <p className="text-gray-600 mb-4">
                  Farklılıkları değerli bulan, herkesin kendini değerli hissettiği bir ortam
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BookingFooter />
    </>
  );
}
