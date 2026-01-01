/**
 * Explore Mega Menu Component
 * TripAdvisor-style dropdown menu for the Explore/Discover section
 */
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Map,
  Utensils,
  Mountain,
  Landmark,
  Waves,
  Users,
  Home,
  Building,
  Building2,
  Star,
  Car,
  Plane,
  Bus,
  Crown,
  ChevronDown,
  TrendingUp,
  MapPin } from
'lucide-react';
import { exploreCategories, popularDestinations } from '../../data/explore-categories';
import { useTranslation } from 'next-i18next';

const iconMap: Record<string, any> = {
  Compass,
  Map,
  Utensils,
  Mountain,
  Landmark,
  Waves,
  Users,
  Home,
  Building,
  Building2,
  Star,
  Car,
  Plane,
  Bus,
  Crown
};

export const ExploreMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation('common');
  const router = useRouter();
  const currentLang = i18n.language || 'tr';

  return (
    <div className="relative">
      {/* Explore Button */}
      <button
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-colors
          ${isOpen ?
        'text-lydian-primary bg-red-50' :
        'text-gray-200 hover:text-lydian-primary hover:bg-lydian-bg/5'}
        `
        }>

        <Compass className="w-4 h-4" />
        <span>{t('explore.title')}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Mega Menu Dropdown */}
      <AnimatePresence>
        {isOpen &&
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className="absolute top-full left-0 mt-2 w-[900px] bg-lydian-glass-dark rounded-xl shadow-2xl border border-lydian-border-light/10 overflow-hidden z-50">

            <div className="grid grid-cols-12 gap-6 p-6">
              {/* Main Categories - Left Side */}
              <div className="col-span-8 grid grid-cols-2 gap-4">
                {exploreCategories.map((category) => {
                const CategoryIcon = iconMap[category.icon];
                const categoryData = category.translations[currentLang as keyof typeof category.translations];

                return (
                  <div key={category.id} className="space-y-3">
                      {/* Category Header */}
                      <Link
                      href={`/explore/${category.id}`}
                      className="flex items-center gap-3 group"
                      onClick={() => setIsOpen(false)}>

                        <div className={`w-10 h-10 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <CategoryIcon className="w-5 h-5 text-lydian-text-inverse" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lydian-text-inverse group-hover:text-lydian-primary transition-colors">
                            {categoryData.name}
                          </h3>
                          <p className="text-xs text-lydian-text-muted">{categoryData.description}</p>
                        </div>
                      </Link>

                      {/* Subcategories */}
                      <div className="space-y-1 pl-13">
                        {category.subcategories.slice(0, 3).map((sub) => {
                        const SubIcon = iconMap[sub.icon];
                        const subData = sub.translations[currentLang as keyof typeof sub.translations];

                        return (
                          <Link
                            key={sub.id}
                            href={`/explore/${category.id}/${sub.slug}`}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 py-1.5 px-2 rounded-md hover:bg-lydian-glass-dark transition-colors group">

                              <SubIcon className="w-3.5 h-3.5 text-lydian-text-muted group-hover:text-lydian-primary" />
                              <span className="text-sm text-lydian-text-muted group-hover:text-lydian-primary">
                                {subData.name}
                              </span>
                            </Link>);

                      })}
                      </div>
                    </div>);

              })}
              </div>

              {/* Popular Destinations - Right Side */}
              <div className="col-span-4 border-l border-lydian-border-light/10 pl-6">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-lydian-primary" />
                  <h3 className="font-bold text-lydian-text-inverse">{t('explore.popularDestinations')}</h3>
                </div>

                <div className="space-y-2">
                  {popularDestinations.map((destination) => {
                  const destData = destination.translations[currentLang as keyof typeof destination.translations];

                  return (
                    <Link
                      key={destination.id}
                      href={`/explore/destinations/${destination.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-lydian-glass-dark transition-colors group">

                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                          src={destination.image}
                          alt={destData.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform" />

                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-lydian-text-inverse group-hover:text-lydian-primary truncate">
                            {destData.name}
                          </h4>
                          <p className="text-xs text-lydian-text-muted truncate">{destData.description}</p>
                        </div>
                      </Link>);

                })}
                </div>

                {/* View All Link */}
                <Link
                href="/explore"
                onClick={() => setIsOpen(false)}
                className="mt-4 flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-lydian-primary to-lydian-secondary text-lydian-text-inverse rounded-lg hover:shadow-lg transition-all font-medium text-sm">

                  <TrendingUp className="w-4 h-4" />
                  <span>{t('explore.viewAll')}</span>
                </Link>
              </div>
            </div>

            {/* Bottom Featured Section */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-t border-lydian-border-light/10 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-lydian-primary to-lydian-secondary rounded-full flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-lydian-text-inverse" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lydian-text-inverse">{t('explore.trending')}</h4>
                    <p className="text-xs text-lydian-text-dim">{t('explore.trendingDescription')}</p>
                  </div>
                </div>
                <Link
                href="/explore/trending"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-lydian-glass-dark text-lydian-primary rounded-lg hover:shadow-md transition-all font-medium text-sm border border-lydian-border-light/10">

                  {t('explore.exploreTrending')}
                </Link>
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

};

export default ExploreMenu;