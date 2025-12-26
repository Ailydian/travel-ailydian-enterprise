/**
 * Main Explore/Discover Page
 * TripAdvisor-style exploration hub with categories, collections, and destinations
 */
import React from 'react';
import { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import FuturisticHeader from '../../components/layout/FuturisticHeader';
import BookingFooter from '../../components/layout/BookingFooter';
import { ExploreHero } from '../../components/explore/ExploreHero';
import { ExploreCategoryGrid } from '../../components/explore/ExploreCategoryGrid';
import { CuratedCollection } from '../../components/explore/CuratedCollection';
import { motion } from 'framer-motion';
import { TrendingUp, Map, Star } from 'lucide-react';
import antalyaTours from '../../data/antalya-tours';
import { popularDestinations } from '../../data/explore-categories';

const ExplorePage: NextPage = () => {
  const { t, i18n } = useTranslation('common');
  const currentLang = i18n.language || 'tr';

  // Get trending tours (top rated)
  const trendingTours = antalyaTours
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  return (
    <>
      <Head>
        <title>{t('explore.seo.title')} | Travel LyDian</title>
        <meta name="description" content={t('explore.seo.description')} />
        <meta name="keywords" content={t('explore.seo.keywords')} />

        {/* Open Graph */}
        <meta property="og:title" content={t('explore.seo.title')} />
        <meta property="og:description" content={t('explore.seo.description')} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1200&q=80" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              "name": "Travel LyDian",
              "description": t('explore.seo.description'),
              "url": "https://travel.lydian.com/explore",
              "offers": {
                "@type": "AggregateOffer",
                "offerCount": antalyaTours.length,
                "lowPrice": Math.min(...antalyaTours.map(t => t.pricing.travelLyDian)),
                "highPrice": Math.max(...antalyaTours.map(t => t.pricing.travelLyDian)),
                "priceCurrency": "TRY"
              }
            })
          }}
        />
      </Head>

      <FuturisticHeader />

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <ExploreHero />

        {/* Main Categories */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              {t('explore.categories.title')}
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              {t('explore.categories.subtitle')}
            </p>
          </div>
          <ExploreCategoryGrid />
        </section>

        {/* Trending Experiences */}
        <section className="bg-transparent py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-8 h-8 text-lydian-primary" />
                  <h2 className="text-3xl font-black text-white">{t('explore.trending')}</h2>
                </div>
                <p className="text-gray-300">{t('explore.trendingDescription')}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingTours.map((tour) => (
                <motion.div
                  key={tour.id}
                  whileHover={{ y: -4 }}
                  className="bg-transparent rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
                >
                  <div className="relative h-56">
                    <img src={tour.images[0]} alt={tour.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3 bg-lydian-primary text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{tour.rating}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{tour.name}</h3>
                    <p className="text-sm text-gray-300 mb-3 line-clamp-2">{tour.description}</p>
                    <div className="flex items-end justify-between">
                      <div className="text-sm text-gray-300">{tour.duration}</div>
                      <div className="text-right">
                        <span className="text-2xl font-black text-lydian-primary">
                          ₺{tour.pricing.travelLyDian}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Curated Collections */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <CuratedCollection />
        </section>

        {/* Popular Destinations Map */}
        <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Map className="w-8 h-8 text-white" />
                <h2 className="text-3xl sm:text-4xl font-black text-white">
                  {t('explore.popularDestinations')}
                </h2>
              </div>
              <p className="text-white/90 text-lg">{t('explore.destinationsSubtitle')}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {popularDestinations.map((dest) => {
                const destData = dest.translations[currentLang as keyof typeof dest.translations];
                return (
                  <motion.a
                    key={dest.id}
                    href={`/explore/destinations/${dest.slug}`}
                    whileHover={{ scale: 1.05 }}
                    className="group"
                  >
                    <div className="relative h-40 rounded-xl overflow-hidden shadow-lg">
                      <img src={dest.image} alt={destData.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="font-bold text-white text-lg">{destData.name}</h3>
                        <p className="text-white/80 text-xs line-clamp-1">{destData.description}</p>
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-gradient-to-r from-lydian-primary to-lydian-secondary rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="text-3xl font-black text-white mb-4">
              {t('explore.newsletter.title')}
            </h2>
            <p className="text-white/90 mb-6">{t('explore.newsletter.subtitle')}</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder={t('explore.newsletter.placeholder')}
                className="flex-1 px-4 py-3 rounded-lg focus:ring-2 focus:ring-white"
              />
              <button className="px-6 py-3 bg-transparent text-lydian-primary rounded-lg font-bold hover:shadow-lg transition-all">
                {t('explore.newsletter.subscribe')}
              </button>
            </div>
          </div>
        </section>
      </main>

      <BookingFooter />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'tr', ['common'])),
    },
  };
};

export default ExplorePage;
