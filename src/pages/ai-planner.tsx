import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Bot,
  MapPin,
  Calendar,
  Users,
  Clock,
  Star,
  Sparkles,
  Brain,
  Target,
  Wand2,
  ArrowRight,
  CheckCircle,
  Zap,
  Globe,
  Camera,
  Send,
  Plus,
  Minus
} from 'lucide-react';
import SimplifiedHeader from '../components/layout/SimplifiedHeader';

const AITravelPlanner: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: '',
    duration: '',
    travelers: 1,
    budget: '',
    interests: [] as string[],
    travelStyle: '',
    dates: ''
  });

  const interests = [
    'Kültürel Turlar', 'Doğa ve Macera', 'Gece Hayatı', 'Gastronomi',
    'Sanat ve Müze', 'Plaj ve Deniz', 'Tarih', 'Spa & Wellness',
    'Fotoğrafçılık', 'Aile Aktiviteleri', 'Romantik', 'Alışveriş'
  ];

  const travelStyles = [
    { id: 'luxury', name: 'Lüks', desc: 'En iyi oteller ve premium deneyimler' },
    { id: 'comfort', name: 'Konforlu', desc: 'Kaliteli konaklama ve güzel deneyimler' },
    { id: 'budget', name: 'Ekonomik', desc: 'Bütçe dostu seçenekler' },
    { id: 'adventure', name: 'Macera', desc: 'Adrenalin dolu deneyimler' }
  ];

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest) 
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <>
      <Head>
        <title>AI Seyahat Planlama - Travel.Ailydian | Akıllı Seyahat Planı</title>
        <meta name="description" content="Yapay zeka destekli kişiselleştirilmiş seyahat planı oluşturun. AI algoritmaları ile size özel itineraryler ve öneriler." />
        <meta name="keywords" content="AI seyahat planlama, akıllı seyahat, yapay zeka turizm, otomatik itinerary, seyahat planlayıcı" />
      </Head>

      <SimplifiedHeader />

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-white">
                  AI Seyahat Planlama
                </h1>
              </div>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Yapay zeka teknolojisi ile kişiselleştirilmiş seyahat planları oluşturun. 
                Tercihlerinize göre otomatik itinerary, otel önerileri ve aktivite planları.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { icon: Sparkles, text: '1M+ Başarılı Plan' },
                  { icon: Target, text: '%95 Memnuniyet' },
                  { icon: Zap, text: '30 Saniyede Plan' },
                  { icon: Globe, text: '190+ Ülke' }
                ].map((stat, index) => (
                  <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                    <stat.icon className="w-5 h-5 text-yellow-400" />
                    <span className="text-white font-medium">{stat.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* AI Planner Form */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Progress Bar */}
              <div className="bg-gray-50 px-8 py-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    AI ile Kişisel Seyahat Planı Oluştur
                  </h2>
                  <span className="text-sm text-gray-600">Adım {step}/4</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(step / 4) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="p-8">
                {/* Step 1: Destination & Basics */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">Nereye gitmek istiyorsunuz?</h3>
                      <p className="text-gray-600">Temel bilgileri verin, AI size en uygun planı oluştursun.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Destinasyon
                        </label>
                        <input
                          type="text"
                          value={formData.destination}
                          onChange={(e) => setFormData({...formData, destination: e.target.value})}
                          placeholder="Örn: İstanbul, Kapadokya..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Seyahat Süresi
                        </label>
                        <select
                          value={formData.duration}
                          onChange={(e) => setFormData({...formData, duration: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                          <option value="">Seçin</option>
                          <option value="1-2">1-2 Gün</option>
                          <option value="3-5">3-5 Gün</option>
                          <option value="1-week">1 Hafta</option>
                          <option value="2-weeks">2 Hafta</option>
                          <option value="1-month">1 Ay+</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Kaç Kişi?
                        </label>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => setFormData({...formData, travelers: Math.max(1, formData.travelers - 1)})}
                            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-xl font-semibold w-12 text-center">{formData.travelers}</span>
                          <button
                            onClick={() => setFormData({...formData, travelers: formData.travelers + 1})}
                            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bütçe (Kişi başı)
                        </label>
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData({...formData, budget: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                          <option value="">Seçin</option>
                          <option value="budget">Ekonomik (₺500-1500)</option>
                          <option value="mid">Orta (₺1500-3000)</option>
                          <option value="high">Yüksek (₺3000-6000)</option>
                          <option value="luxury">Lüks (₺6000+)</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Interests */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <Star className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">İlgi Alanlarınız</h3>
                      <p className="text-gray-600">Hangi aktiviteler sizi heyecanlandırıyor?</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {interests.map((interest) => (
                        <button
                          key={interest}
                          onClick={() => handleInterestToggle(interest)}
                          className={`p-4 rounded-xl border-2 transition-all text-sm font-medium ${
                            formData.interests.includes(interest)
                              ? 'border-purple-500 bg-purple-50 text-purple-700'
                              : 'border-gray-200 hover:border-gray-300 text-gray-700'
                          }`}
                        >
                          {interest}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Travel Style */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <Wand2 className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">Seyahat Tarzınız</h3>
                      <p className="text-gray-600">Nasıl bir deneyim yaşamak istiyorsunuz?</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {travelStyles.map((style) => (
                        <button
                          key={style.id}
                          onClick={() => setFormData({...formData, travelStyle: style.id})}
                          className={`p-6 rounded-xl border-2 transition-all text-left ${
                            formData.travelStyle === style.id
                              ? 'border-indigo-500 bg-indigo-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <h4 className="font-bold text-lg mb-2">{style.name}</h4>
                          <p className="text-gray-600">{style.desc}</p>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Final & Generate */}
                {step === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <Bot className="w-12 h-12 text-green-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">AI Planınız Hazırlanıyor</h3>
                      <p className="text-gray-600">Son bir kontrol yapalım ve AI size mükemmel planı oluştursun!</p>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h4 className="font-bold mb-4">Plan Özeti:</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div><strong>Destinasyon:</strong> {formData.destination}</div>
                        <div><strong>Süre:</strong> {formData.duration}</div>
                        <div><strong>Kişi:</strong> {formData.travelers}</div>
                        <div><strong>Bütçe:</strong> {formData.budget}</div>
                        <div className="col-span-2"><strong>İlgi Alanları:</strong> {formData.interests.join(', ')}</div>
                      </div>
                    </div>

                    <div className="text-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-3 mx-auto"
                      >
                        <Sparkles className="w-6 h-6" />
                        AI Planımı Oluştur
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-12 pt-6 border-t">
                  <button
                    onClick={() => setStep(Math.max(1, step - 1))}
                    disabled={step === 1}
                    className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Geri
                  </button>
                  <button
                    onClick={() => setStep(Math.min(4, step + 1))}
                    disabled={step === 4}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    İleri
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">AI Planlama Avantajları</h2>
              <p className="text-gray-600">Neden AI ile seyahat planlamak daha iyi?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Brain,
                  title: 'Akıllı Algoritma',
                  description: 'Milyonlarca veri noktasından öğrenen AI ile size en uygun önerileri alın.',
                  color: 'text-blue-600 bg-blue-100'
                },
                {
                  icon: Clock,
                  title: '30 Saniyede Plan',
                  description: 'Saatlerce araştırma yerine AI sayesinde dakikalar içinde detaylı plan.',
                  color: 'text-green-600 bg-green-100'
                },
                {
                  icon: Target,
                  title: 'Kişiselleştirilmiş',
                  description: 'Bütçenize, ilgi alanlarınıza ve seyahat tarzınıza özel planlar.',
                  color: 'text-purple-600 bg-purple-100'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-8"
                >
                  <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mx-auto mb-6`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-xl mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AITravelPlanner;