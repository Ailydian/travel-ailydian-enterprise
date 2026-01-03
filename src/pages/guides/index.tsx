/**
 * Travel Guides Index - Hub for All Destination Guides
 * SEO-optimized landing page for travel guides
 *
 * @module pages/guides/index
 */

import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { MapPinIcon, ChevronRightIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { allDestinationGuides, DestinationGuide } from '@/data/seo/destination-guides';
import { BreadcrumbSchema, WebSiteSchema } from '@/components/seo/SchemaMarkup';

interface GuidesIndexProps {
  guides: DestinationGuide[];
}

const GuideCard: React.FC<{ guide: DestinationGuide; index: number }> = ({ guide, index }) => {
  const router = useRouter();
  const locale = router.locale || 'en';
  const href = `${locale === 'tr' ? '' : `/${locale}`}/guides/${guide.slug}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <Link href={href} className="block">
        <div className="relative h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-cyan-500/50 transition-all">
          {/* Image Placeholder */}
          <div className="h-48 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/patterns/topography.svg')] opacity-20" />
            <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm">
              {guide.region}
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
              {guide.destination}
            </h2>

            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {guide.metaDescription}
            </p>

            {/* Quick Facts */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPinIcon className="w-4 h-4 text-cyan-400" />
                <span>Best Time: {guide.quickFacts.bestTimeToVisit}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <BookOpenIcon className="w-4 h-4 text-cyan-400" />
                <span>{guide.attractions.topAttractions.length} Top Attractions</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-2 text-cyan-400 font-medium group-hover:gap-3 transition-all">
              <span>Read Full Guide</span>
              <ChevronRightIcon className="w-5 h-5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const GuidesIndexPage: React.FC<GuidesIndexProps> = ({ guides }) => {
  const router = useRouter();
  const canonicalUrl = `https://holiday.ailydian.com${router.asPath}`;

  const pageTitle = 'Turkey Travel Guides 2026 - Comprehensive Destination Guides | AILYDIAN Holiday';
  const pageDescription = 'Expert travel guides for Turkey\'s top destinations. Comprehensive information on attractions, hotels, dining, transportation, and practical tips. Plan your perfect Turkey vacation.';

  const breadcrumbItems = [
    { name: 'Home', url: 'https://holiday.ailydian.com', position: 1 },
    { name: 'Travel Guides', url: canonicalUrl, position: 2 },
  ];

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />

        <link rel="alternate" hrefLang="x-default" href="https://holiday.ailydian.com/en/guides" />
        {['tr', 'en', 'de', 'ru', 'ar', 'fa', 'fr', 'el'].map((lang) => (
          <link
            key={lang}
            rel="alternate"
            hrefLang={lang}
            href={`https://holiday.ailydian.com${lang === 'tr' ? '' : `/${lang}`}/guides`}
          />
        ))}

        <meta name="robots" content="index, follow, max-snippet:-1" />
      </Head>

      <BreadcrumbSchema items={breadcrumbItems} />
      <WebSiteSchema url="https://holiday.ailydian.com" name="AILYDIAN Holiday" />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Hero */}
        <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[url('/images/patterns/grid.svg')] opacity-10" />
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl">
                <BookOpenIcon className="w-12 h-12 text-white" />
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
                Turkey Travel Guides
              </h1>

              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Comprehensive destination guides with expert insights, practical tips, and everything you need to plan your perfect Turkey vacation.
              </p>

              <div className="inline-flex items-center gap-2 px-5 py-3 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-300">
                <span className="font-bold text-2xl">{guides.length}</span>
                <span>Detailed Guides</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Guides Grid */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map((guide, index) => (
                <GuideCard key={guide.slug} guide={guide} index={index} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<GuidesIndexProps> = async ({ locale }) => {
  return {
    props: {
      guides: allDestinationGuides,
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
    revalidate: 3600,
  };
};

export default GuidesIndexPage;
