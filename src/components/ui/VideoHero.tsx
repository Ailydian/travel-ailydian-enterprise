import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Users, MapPin, Star, TrendingUp } from 'lucide-react';

export const VideoHero: React.FC = () => {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://videos.pexels.com/video-files/3147741/3147741-uhd_2560_1440_30fps.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-16 text-center">
        {/* Main Heading with Animated Gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-red-200 mb-6 leading-tight"
        >
          Türkiye'nin En Güvenilir
          <br />
          Seyahat Platformu
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-2xl text-white/90 max-w-3xl mx-auto mb-12"
        >
          Turlar, Transferler, Araç Kiralama ve Konaklama Hizmetleri
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link href="/tours">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(220, 38, 38, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-red-600 via-ailydian-primary to-ailydian-secondary text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-red-500/50 transition-all duration-300 flex items-center gap-2 min-w-[200px] justify-center"
            >
              Turları Keşfet
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>

          <Link href="/help">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 255, 255, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/20 backdrop-blur-md border-2 border-white/40 rounded-full font-black text-lg shadow-2xl hover:bg-white/30 transition-all duration-300 flex items-center gap-2 min-w-[200px] justify-center"
            >
              <span className="text-white drop-shadow-lg">Yardım Al</span>
              <ArrowRight className="w-5 h-5 text-white drop-shadow-lg" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {[
            { icon: MapPin, label: 'Turlar', value: '500+', gradient: 'from-red-500 to-ailydian-primary' },
            { icon: TrendingUp, label: 'Destinasyonlar', value: '50+', gradient: 'from-ailydian-primary to-ailydian-secondary' },
            { icon: Users, label: 'Mutlu Müşteri', value: '100K+', gradient: 'from-ailydian-secondary to-red-600' },
            { icon: Star, label: 'Değerlendirme', value: '4.9/5', gradient: 'from-yellow-400 to-red-500' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="relative group"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r ${stat.gradient} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-black text-white mb-1 bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-white/80 font-medium">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent" />
    </section>
  );
};
