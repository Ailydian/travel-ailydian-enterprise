/**
 * Explore Hero Section
 * Main hero for the explore/discover page
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { useTranslation } from 'next-i18next';

export const ExploreHero: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] bg-repeat" />
      </div>

      {/* Floating Shapes */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"
      />
      <motion.div
        animate={{
          y: [0, 30, 0],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-20 left-20 w-40 h-40 bg-yellow-300/10 rounded-full blur-xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-28">
        <div className="text-center space-y-8">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white">
              {t('explore.hero.title')}
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto">
              {t('explore.hero.subtitle')}
            </p>
          </motion.div>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Destination */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('search.destination')}
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder={t('explore.hero.searchPlaceholder')}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lydian-primary focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('search.dates')}
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder={t('explore.hero.selectDates')}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lydian-primary focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Guests */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('search.guests')}
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lydian-primary focus:border-transparent appearance-none">
                      <option>1 {t('search.guest')}</option>
                      <option>2 {t('search.guests')}</option>
                      <option>3-4 {t('search.guests')}</option>
                      <option>5+ {t('search.guests')}</option>
                    </select>
                  </div>
                </div>

                {/* Search Button */}
                <div className="flex items-end">
                  <button className="w-full bg-gradient-to-r from-lydian-primary to-lydian-secondary text-white py-3 px-6 rounded-lg font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2">
                    <Search className="w-5 h-5" />
                    <span>{t('search.search')}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 text-white"
          >
            <div className="text-center">
              <div className="text-4xl font-black">500+</div>
              <div className="text-sm opacity-90">{t('explore.hero.stats.experiences')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black">10K+</div>
              <div className="text-sm opacity-90">{t('explore.hero.stats.reviews')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black">50+</div>
              <div className="text-sm opacity-90">{t('explore.hero.stats.destinations')}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ExploreHero;
