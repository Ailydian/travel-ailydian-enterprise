import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Home, Car, Map, Utensils, Mountain } from 'lucide-react';
import { useTranslation } from 'next-i18next';
import { exploreCategories } from '../../data/explore-categories';

const iconMap: Record<string, any> = { Compass, Home, Car, Map, Utensils, Mountain };

export const ExploreCategoryGrid: React.FC = () => {
  const { t, i18n } = useTranslation('common');
  const currentLang = i18n.language || 'tr';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {exploreCategories.map((category, index) => {
        const Icon = iconMap[category.icon] || Compass;
        const categoryData = category.translations[currentLang as keyof typeof category.translations];

        return (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link href={`/explore/${category.id}`}>
              <div className="group relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                <img src={category.image} alt={categoryData.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className={`w-14 h-14 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">{categoryData.name}</h3>
                  <p className="text-white text-sm mb-4 drop-shadow-md">{categoryData.description}</p>
                  <div className="flex items-center gap-2 text-white font-semibold drop-shadow-md">
                    <span>{t('explore.exploreMore')}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};
