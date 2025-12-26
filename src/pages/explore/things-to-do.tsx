import React, { useState } from 'react';
import { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import BookingHeader from '../../components/layout/BookingHeader';
import BookingFooter from '../../components/layout/BookingFooter';
import { ExploreCard } from '../../components/explore/ExploreCard';
import { ExploreFilters } from '../../components/explore/ExploreFilters';
import antalyaTours from '../../data/antalya-tours';
import { ChevronDown, Grid, List, SlidersHorizontal } from 'lucide-react';

const ThingsToDoPage: NextPage = () => {
  const { t } = useTranslation('common');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');

  const tours = antalyaTours.sort((a, b) => {
    if (sortBy === 'price-low') return a.pricing.travelLyDian - b.pricing.travelLyDian;
    if (sortBy === 'price-high') return b.pricing.travelLyDian - a.pricing.travelLyDian;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.reviewCount - a.reviewCount;
  });

  return (
    <>
      <Head>
        <title>{t('explore.thingsToDo.seo.title')} | Travel LyDian</title>
        <meta name="description" content={t('explore.thingsToDo.seo.description')} />
      </Head>

      <BookingHeader />

      <main className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl font-black text-white mb-3">{t('explore.thingsToDo.title')}</h1>
            <p className="text-white/90 text-lg">{t('explore.thingsToDo.subtitle')}</p>
          </div>
        </div>

        {/* Breadcrumbs */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <a href="/" className="hover:text-lydian-primary">{t('navigation.home')}</a>
              <span>/</span>
              <a href="/explore" className="hover:text-lydian-primary">{t('explore.title')}</a>
              <span>/</span>
              <span className="text-gray-900 font-semibold">{t('explore.thingsToDo.title')}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="text-gray-600">
              <span className="font-semibold text-gray-900">{tours.length}</span> {t('explore.experiencesFound')}
            </div>

            <div className="flex items-center gap-4">
              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lydian-primary appearance-none bg-white"
                >
                  <option value="popular">{t('search.sortBy.popular')}</option>
                  <option value="rating">{t('search.sortBy.rating')}</option>
                  <option value="price-low">{t('search.sortBy.priceLow')}</option>
                  <option value="price-high">{t('search.sortBy.priceHigh')}</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* View Toggle */}
              <div className="hidden sm:flex items-center gap-2 bg-white border border-gray-300 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-lydian-primary text-white' : 'text-gray-600'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-lydian-primary text-white' : 'text-gray-600'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <ExploreFilters />
            </div>

            {/* Results Grid */}
            <div className="lg:col-span-3">
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-6'}>
                {tours.map((tour) => (
                  <ExploreCard
                    key={tour.id}
                    id={tour.id}
                    title={tour.name}
                    image={tour.images[0]}
                    price={tour.pricing.travelLyDian}
                    rating={tour.rating}
                    reviewCount={tour.reviewCount}
                    location={tour.region}
                    duration={tour.duration}
                    category={tour.category}
                    href={`/tours/${tour.slug}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
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

export default ThingsToDoPage;
