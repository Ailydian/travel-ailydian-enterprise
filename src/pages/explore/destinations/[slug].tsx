import React from 'react';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import ModernHeader from '../../../components/layout/ModernHeader';
import BookingFooter from '../../../components/layout/BookingFooter';
import { destinations } from '../../../data/destinations';
import { MapPin, Star, ThermometerSun, Calendar, TrendingUp } from 'lucide-react';
import { ExploreCard } from '../../../components/explore/ExploreCard';
import antalyaTours from '../../../data/antalya-tours';

const DestinationPage: NextPage = () => {
  const { t, i18n } = useTranslation('common');
  const router = useRouter();
  const { slug } = router.query;
  const currentLang = i18n.language || 'tr';

  const destination = destinations.find((d) => d.slug === slug);
  if (!destination) return null;

  const destData = destination.translations[currentLang as keyof typeof destination.translations];
  const topTours = antalyaTours.slice(0, 6);

  return (
    <>
      <Head>
        <title>{destData.seo.metaTitle} | Travel LyDian</title>
        <meta name="description" content={destData.seo.metaDescription} />
        <meta name="keywords" content={destData.seo.keywords.join(', ')} />
        <meta property="og:title" content={destData.seo.metaTitle} />
        <meta property="og:description" content={destData.seo.metaDescription} />
        <meta property="og:image" content={destination.images.hero} />
      </Head>

      <ModernHeader />

      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-800">
        {/* Hero Section */}
        <div className="relative h-[500px]">
          <img src={destination.images.hero} alt={destData.name} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="relative h-full max-w-7xl mx-auto px-4 flex items-end pb-12">
            <div className="text-white">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6" />
                <span className="text-lg">{destination.region}</span>
              </div>
              <h1 className="text-5xl sm:text-6xl font-black mb-4">{destData.name}</h1>
              <p className="text-2xl text-white/90 mb-6">{destData.tagline}</p>
              <div className="flex flex-wrap gap-6 text-sm">
                <div>
                  <span className="text-white/70">{t('explore.destination.tours')}: </span>
                  <span className="font-bold">{destination.stats.tours}</span>
                </div>
                <div>
                  <span className="text-white/70">{t('explore.destination.hotels')}: </span>
                  <span className="font-bold">{destination.stats.hotels}</span>
                </div>
                <div>
                  <span className="text-white/70">{t('explore.destination.attractions')}: </span>
                  <span className="font-bold">{destination.stats.attractions}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overview */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-3xl font-black text-white mb-4">{t('explore.destination.overview')}</h2>
                <p className="text-lg text-gray-300 leading-relaxed">{destData.overview}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-white mb-4">{t('explore.destination.bestFor')}</h3>
                <div className="flex flex-wrap gap-2">
                  {destData.bestFor.map((item, index) =>
                  <span key={index} className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full font-semibold border border-blue-500/20">
                      {item}
                    </span>
                  )}
                </div>
              </div>

              {/* Things to Do */}
              <div>
                <h3 className="text-2xl font-black text-white mb-4">{destData.thingsToDo.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {destData.thingsToDo.items.map((item, index) =>
                  <div key={index} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 shadow-md hover:shadow-lg hover:shadow-blue-500/20 transition-all">
                      <h4 className="font-bold text-white mb-2">{item.name}</h4>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Weather */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <ThermometerSun className="w-6 h-6 text-blue-400" />
                  <h3 className="text-lg font-bold text-white">{t('explore.destination.weather')}</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">{t('explore.destination.summer')}</span>
                    <span className="font-bold text-2xl text-orange-400">{destination.weather.avgTemp.summer}°C</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">{t('explore.destination.winter')}</span>
                    <span className="font-bold text-2xl text-blue-400">{destination.weather.avgTemp.winter}°C</span>
                  </div>
                </div>
              </div>

              {/* Best Months */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-6 h-6 text-blue-400" />
                  <h3 className="text-lg font-bold text-white">{t('explore.destination.bestMonths')}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {destination.weather.bestMonths.map((month, index) =>
                  <span key={index} className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm font-semibold border border-green-500/20">
                      {month}
                    </span>
                  )}
                </div>
              </div>

              {/* Top Attractions */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-6 h-6 text-blue-400" />
                  <h3 className="text-lg font-bold text-white">{t('explore.destination.topAttractions')}</h3>
                </div>
                <ul className="space-y-2">
                  {destination.topAttractions.map((attr, index) =>
                  <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span className="text-gray-300">{attr}</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Top Experiences */}
        <section className="bg-slate-900/50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="w-8 h-8 text-blue-400" />
              <h2 className="text-3xl font-black text-white">{t('explore.destination.topExperiences')}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topTours.map((tour) =>
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
                href={`/tours/${tour.slug}`} />

              )}
            </div>
          </div>
        </section>
      </main>

      <BookingFooter />
    </>);

};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = destinations.flatMap((dest) =>
  ['tr', 'en', 'de', 'ru', 'ar', 'fa', 'fr'].map((locale) => ({
    params: { slug: dest.slug },
    locale
  }))
  );

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'tr', ['common']))
    }
  };
};

export default DestinationPage;