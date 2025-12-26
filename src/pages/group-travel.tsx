import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Users, Star, CheckCircle, ArrowRight, Shield, Calendar, MapPin, Phone } from 'lucide-react';
import SimplifiedHeader from '../components/layout/SimplifiedHeader';

const GroupTravel: React.FC = () => {
  return (
    <>
      <Head>
        <title>Grup Seyahatleri - Travel.LyDian | Kurumsal ve Grup Turları</title>
        <meta name="description" content="Şirket gezileri, okul turları ve grup seyahatleri için özel planlar. Grup indirimleri ve kişiselleştirilmiş hizmetlerle unutulmaz deneyimler." />
      </Head>

      <SimplifiedHeader />

      <main className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Grup Seyahatleri</h1>
              <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
                10+ kişilik gruplar için özel planlar, indirimler ve kişiselleştirilmiş hizmetler.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'Şirket Gezileri', desc: 'Ekip motivasyonu ve kurumsal etkinlikler', icon: '🏢' },
                { title: 'Okul Turları', desc: 'Eğitici ve güvenli okul gezileri', icon: '🎓' },
                { title: 'Aile Reunionları', desc: 'Büyük aile buluşmaları için özel planlar', icon: '👨‍👩‍👧‍👦' },
                { title: 'Düğün Grupları', desc: 'Balayı ve düğün organizasyonları', icon: '💒' },
                { title: 'Spor Takımları', desc: 'Spor kulüpleri ve takım gezileri', icon: '⚽' },
                { title: 'Hobbyist Gruplar', desc: 'Özel ilgi alanları için temalaşmış turlar', icon: '📸' }
              ].map((type, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-lg text-center"
                >
                  <div className="text-4xl mb-4">{type.icon}</div>
                  <h3 className="font-bold text-xl mb-2">{type.title}</h3>
                  <p className="text-gray-600">{type.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Grup Avantajları</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { icon: Star, title: '%30 Grup İndirimi', desc: '10+ kişi için özel indirim' },
                { icon: Shield, title: 'Güvenlik Garantisi', desc: '7/24 rehber eşliliği' },
                { icon: Calendar, title: 'Esnek Planlama', desc: 'Gruba özel itinerary' },
                { icon: Phone, title: 'Özel Koordinatör', desc: 'Grup için ayrılmış temsilci' }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default GroupTravel;