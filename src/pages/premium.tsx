import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  Crown,
  Check,
  Star,
  Zap,
  Shield,
  Sparkles,
  ArrowRight,
  Users,
  Globe,
  Heart
} from 'lucide-react';
import NavigationHeader from '../components/layout/NavigationHeader';

const Premium: React.FC = () => {
  const plans = [
    {
      name: 'Basic',
      price: '₺0',
      period: '/ay',
      description: 'Temel özellikleri keşfedin',
      features: [
        'Temel arama ve rezervasyon',
        'E-posta desteği',
        'Standart iptal koşulları',
        '3 rezervasyon/ay sınırı'
      ],
      color: 'border-gray-200',
      button: 'bg-gray-600 hover:bg-gray-700',
      popular: false
    },
    {
      name: 'Premium',
      price: '₺99',
      period: '/ay',
      description: 'En popüler seçim',
      features: [
        'AI destekli seyahat planlama',
        'VR önizlemeler',
        '7/24 öncelikli destek',
        'Sınırsız rezervasyon',
        '%15 indirim tüm rezervasyonlarda',
        'Kripto ödeme avantajları',
        'Erken erişim yeni özellikler'
      ],
      color: 'border-blue-500 ring-2 ring-blue-500',
      button: 'bg-blue-600 hover:bg-blue-700',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '₺299',
      period: '/ay',
      description: 'Şirketler için özel çözümler',
      features: [
        'Tüm Premium özellikler',
        'Blockchain güvenlik',
        'NFT seyahat anıları',
        'Özel AI asistan',
        'Grup rezervasyon yönetimi',
        'API erişimi',
        'Özel hesap yöneticisi'
      ],
      color: 'border-purple-500',
      button: 'bg-purple-600 hover:bg-purple-700',
      popular: false
    }
  ];

  return (
    <>
      <Head>
        <title>Premium Üyelik - Travel.Ailydian | AI Destekli Premium Seyahat</title>
        <meta name="description" content="Travel.Ailydian Premium ile AI destekli seyahat planlama, VR önizlemeler, blockchain güvenlik ve özel avantajlara sahip olun." />
        <meta name="keywords" content="premium üyelik, VIP seyahat, AI planlama, VR turlar, blockchain güvenlik" />
      </Head>

      <NavigationHeader />

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl">
                  <Crown className="w-8 h-8 text-yellow-400" />
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-white">
                  Premium Üyelik
                </h1>
              </div>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                AI destekli premium seyahat deneyimi yaşayın. VR önizlemeler, blockchain güvenlik 
                ve kişiselleştirilmiş hizmetlerle seyahatin geleceğini keşfedin.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { icon: Sparkles, text: '50K+ Premium Üye' },
                  { icon: Star, text: '%98 Memnuniyet' },
                  { icon: Zap, text: 'Anında Aktivasyon' },
                  { icon: Shield, text: 'Güvenlik Garantisi' }
                ].map((stat, index) => (
                  <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                    <stat.icon className="w-5 h-5 text-yellow-300" />
                    <span className="text-white font-medium">{stat.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Size Uygun Planı Seçin</h2>
              <p className="text-gray-600">Her ihtiyaca uygun esnek üyelik paketleri</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative bg-white rounded-3xl shadow-xl p-8 border-2 ${plan.color} ${plan.popular ? 'transform scale-105' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        En Popüler
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600">{plan.period}</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-4 text-white rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 ${plan.button}`}
                  >
                    {plan.name === 'Basic' ? 'Ücretsiz Başla' : 'Premium Ol'}
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Premium Features */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Premium Özellikler</h2>
              <p className="text-gray-600">Neden Premium üyelik tercih etmelisiniz?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Sparkles,
                  title: 'AI Seyahat Asistanı',
                  description: '7/24 kişisel AI asistanınız ile akıllı seyahat planlaması ve önerileri.'
                },
                {
                  icon: Star,
                  title: 'VR Önizlemeler',
                  description: 'Rezervasyon yapmadan önce destinasyonları 360° sanal gerçeklik ile keşfedin.'
                },
                {
                  icon: Shield,
                  title: 'Blockchain Güvenlik',
                  description: 'Tüm rezervasyonlarınız blockchain teknolojisi ile güvence altında.'
                },
                {
                  icon: Heart,
                  title: '%15 İndirim',
                  description: 'Tüm rezervasyonlarınızda otomatik %15 premium üye indirimi.'
                },
                {
                  icon: Users,
                  title: 'Öncelikli Destek',
                  description: '7/24 premium müşteri hizmetleri ve anında cevap garantisi.'
                },
                {
                  icon: Globe,
                  title: 'Kripto Avantajları',
                  description: 'Kripto para ile ödeme yapın ve ek %5 indirim kazanın.'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-xl mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Premium Deneyimi Yaşamaya Hazır mısınız?
              </h2>
              <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
                İlk 30 gün ücretsiz deneme ile başlayın. İstediğiniz zaman iptal edebilirsiniz.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors inline-flex items-center gap-2"
              >
                30 Gün Ücretsiz Dene
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Premium;