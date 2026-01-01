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

      <main className="min-h-screen bg-lydian-glass-dark">
        {/* Hero Section */}
        <div className="relative h-[500px]">
          <img src={destination.images.hero} alt={destData.name} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="relative h-full max-w-7xl mx-auto px-4 flex items-end pb-12">
            <div className="text-lydian-text-inverse">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6" />
                <span className="text-lg">{destination.region}</span>
              </div>
              <h1 className="text-5xl sm:text-6xl font-black mb-4">{destData.name}</h1>
              <p className="text-2xl text-lydian-text-inverse/90 mb-6">{destData.tagline}</p>
              <div className="flex flex-wrap gap-6 text-sm">
                <div>
                  <span className="text-lydian-text-inverse/70">{t('explore.destination.tours')}: </span>
                  <span className="font-bold">{destination.stats.tours}</span>
                </div>
                <div>
                  <span className="text-lydian-text-inverse/70">{t('explore.destination.hotels')}: </span>
                  <span className="font-bold">{destination.stats.hotels}</span>
                </div>
                <div>
                  <span className="text-lydian-text-inverse/70">{t('explore.destination.attractions')}: </span>
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
                <h2 className="text-3xl font-black text-lydian-text-inverse mb-4">{t('explore.destination.overview')}</h2>
                <p className="text-lg text-lydian-text-muted leading-relaxed">{destData.overview}</p>
              </div>

              <div className="bg-lydian-glass-dark rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-lydian-text-inverse mb-4">{t('explore.destination.bestFor')}</h3>
                <div className="flex flex-wrap gap-2">
                  {destData.bestFor.map((item, index) =>
                  <span key={index} className="px-4 py-2 bg-lydian-primary/10 text-lydian-primary rounded-full font-semibold">
                      {item}
                    </span>
                  )}
                </div>
              </div>

              {/* Things to Do */}
              <div>
                <h3 className="text-2xl font-black text-lydian-text-inverse mb-4">{destData.thingsToDo.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {destData.thingsToDo.items.map((item, index) =>
                  <div key={index} className="bg-lydian-glass-dark rounded-lg p-4 shadow-md">
                      <h4 className="font-bold text-lydian-text-inverse mb-2">{item.name}</h4>
                      <p className="text-sm text-lydian-text-dim">{item.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Weather */}
              <div className="bg-lydian-glass-dark rounded-xl p-6 shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <ThermometerSun className="w-6 h-6 text-lydian-primary" />
                  <h3 className="text-lg font-bold text-lydian-text-inverse">{t('explore.destination.weather')}</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lydian-text-dim">{t('explore.destination.summer')}</span>
                    <span className="font-bold text-2xl text-orange-500">{destination.weather.avgTemp.summer}°C</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lydian-text-dim">{t('explore.destination.winter')}</span>
                    <span className="font-bold text-2xl text-lydian-primary">{destination.weather.avgTemp.winter}°C</span>
                  </div>
                </div>
              </div>

              {/* Best Months */}
              <div className="bg-lydian-glass-dark rounded-xl p-6 shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-6 h-6 text-lydian-primary" />
                  <h3 className="text-lg font-bold text-lydian-text-inverse">{t('explore.destination.bestMonths')}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {destination.weather.bestMonths.map((month, index) =>
                  <span key={index} className="px-3 py-1 bg-lydian-success-light text-lydian-success-text rounded-full text-sm font-semibold">
                      {month}
                    </span>
                  )}
                </div>
              </div>

              {/* Top Attractions */}
              <div className="bg-lydian-glass-dark rounded-xl p-6 shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-6 h-6 text-lydian-primary" />
                  <h3 className="text-lg font-bold text-lydian-text-inverse">{t('explore.destination.topAttractions')}</h3>
                </div>
                <ul className="space-y-2">
                  {destination.topAttractions.map((attr, index) =>
                  <li key={index} className="flex items-start gap-2">
                      <span className="text-lydian-primary mt-1">•</span>
                      <span className="text-lydian-text-muted">{attr}</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Top Experiences */}
        <section className="bg-lydian-glass-dark py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="w-8 h-8 text-lydian-primary" />
              <h2 className="text-3xl font-black text-lydian-text-inverse">{t('explore.destination.topExperiences')}</h2>
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