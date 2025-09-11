import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Users, Globe, Shield, Award, Zap, Heart } from 'lucide-react';

export default function About() {
  const stats = [
    { label: 'Mutlu Müşteri', value: '2M+', icon: Users },
    { label: 'Ülke', value: '150+', icon: Globe },
    { label: 'Yıllık Deneyim', value: '15', icon: Award },
    { label: 'Rezervasyon', value: '5M+', icon: Heart }
  ];

  const team = [
    {
      name: 'Ahmet Yılmaz',
      role: 'Genel Müdür',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      description: '20+ yıl turizm sektörü deneyimi'
    },
    {
      name: 'Elif Kaya',
      role: 'Operasyon Direktörü',
      image: 'https://images.unsplash.com/photo-1494790108755-2616c9dde2e0?w=300&h=300&fit=crop&crop=face',
      description: 'Müşteri memnuniyeti uzmanı'
    },
    {
      name: 'Mehmet Özkan',
      role: 'Teknoloji Direktörü',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      description: 'AI ve blockchain teknolojileri lideri'
    }
  ];

  return (
    <>
      <Head>
        <title>Hakkımızda - Ailydian Travel</title>
        <meta name="description" content="Ailydian Travel olarak 15 yıldır seyahat tutkusunu teknoloji ile buluşturuyoruz." />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <Link href="/" className="text-2xl font-bold text-blue-600">
                  Ailydian Travel
                </Link>
              </div>
              <Link
                href="/"
                className="text-gray-600 hover:text-blue-600 flex items-center"
              >
                <ArrowRight className="h-5 w-5 mr-2 rotate-180" />
                Ana Sayfa&apos;ya Dön
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-6">Ailydian Travel</h1>
            <p className="text-2xl mb-8 text-blue-100">
              Seyahati Teknoloji ile Buluşturan Lider
            </p>
            <p className="text-lg max-w-3xl mx-auto text-blue-100">
              2010&apos;dan beri seyahat deneyimlerini daha keyifli, güvenli ve erişilebilir hale getirmek için 
              yapay zeka ve blockchain teknolojilerini kullanıyor, müşterilerimize benzersiz hizmetler sunuyoruz.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white dark:bg-gray-800 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
                      <IconComponent className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <Zap className="h-8 w-8 text-blue-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Misyonumuz
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  Yapay zeka ve blockchain teknolojilerini kullanarak, her bütçeye uygun, 
                  güvenli ve kişiselleştirilmiş seyahat deneyimleri sunmak. Müşterilerimizin 
                  hayallerindeki tatili gerçekleştirmelerine yardımcı olmak.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <Shield className="h-8 w-8 text-blue-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Vizyonumuz
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  Türkiye&apos;nin en güvenilir ve teknolojik seyahat platformu olmak. 
                  Global pazarda öncü konumda yer alan, sürdürülebilir turizme katkıda bulunan, 
                  müşteri memnuniyetinde sektör lideri bir şirket olarak tanınmak.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="bg-white dark:bg-gray-800 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Değerlerimiz
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
                  <Heart className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Müşteri Odaklılık
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Her kararımızda müşteri memnuniyetini ön planda tutarak, 
                  beklentileri aşan hizmetler sunmayı hedefliyoruz.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mb-4">
                  <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Güvenlik
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Blockchain teknolojisi ile korunan ödemeler ve 
                  kişisel verilerinizin güvenliği bizim önceliğimizdir.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full mb-4">
                  <Zap className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  İnovasyon
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  AI teknolojileri ile kişiselleştirilmiş öneriler sunarak, 
                  seyahat deneyimini sürekli geliştiriyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Liderlik Ekibimiz
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {member.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 py-16">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white mb-6">
              Hayalinizdeki Seyahate Başlayın
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              15 yıllık deneyimimiz ve teknolojik altyapımızla sizin için en iyi seyahat deneyimini yaratıyoruz
            </p>
            <Link
              href="/"
              className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Seyahat Planlamaya Başla
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}