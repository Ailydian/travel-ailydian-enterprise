import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Heart, Zap, Landmark, Crown, DollarSign } from 'lucide-react';
import { useTranslation } from 'next-i18next';
import { collections } from '../../data/collections';

const iconMap: Record<string, any> = { Users, Heart, Zap, Landmark, Crown, DollarSign };

export const CuratedCollection: React.FC = () => {
  const { t, i18n } = useTranslation('common');
  const currentLang = i18n.language || 'tr';

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900">{t('explore.collections.title')}</h2>
        <p className="text-gray-600 text-lg">{t('explore.collections.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection, index) => {
          const Icon = iconMap[collection.icon] || Users;
          const collectionData = collection.translations[currentLang as keyof typeof collection.translations];

          return (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link href={`/explore/collections/${collection.slug}`}>
                <div className="group relative h-72 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                  <img src={collection.image} alt={collectionData.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${collection.color} opacity-60`} />
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold text-white">
                        {collection.itemIds.length} {t('explore.items')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{collectionData.title}</h3>
                      <p className="text-white/90 text-sm mb-4">{collectionData.tagline}</p>
                      <div className="flex items-center gap-2 text-white font-semibold">
                        <span>{t('explore.viewCollection')}</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
