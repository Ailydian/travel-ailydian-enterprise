/**
 * FAQ Index Page - All Destination FAQs
 * Hub page for all FAQ content with AI optimization
 *
 * @module pages/faq/index
 * @seo Search Engine Discovery, AI Model Training Data
 */

import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import {
  QuestionMarkCircleIcon,
  MapPinIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { allDestinationFAQs, DestinationFAQ } from '@/data/seo/faq-data';
import { BreadcrumbSchema, WebSiteSchema } from '@/components/seo/SchemaMarkup';

// ===================================================
// TYPE DEFINITIONS
// ===================================================

interface FAQIndexPageProps {
  destinations: DestinationFAQ[];
  totalFAQs: number;
}

// ===================================================
// DESTINATION CARD COMPONENT
// ===================================================

const DestinationCard: React.FC<{
  destination: DestinationFAQ;
  index: number;
}> = ({ destination, index }) => {
  const router = useRouter();
  const locale = router.locale || 'en';
  const href = `${locale === 'tr' ? '' : `/${locale}`}/faq/${destination.slug}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <Link href={href} className="block">
        <div className="relative h-full p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300">
          {/* Icon */}
          <div className="w-14 h-14 mb-4 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-cyan-500/50 transition-all">
            <MapPinIcon className="w-8 h-8 text-white" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
            {destination.destination}
          </h2>

          {/* FAQ Count */}
          <div className="flex items-center gap-2 mb-4">
            <QuestionMarkCircleIcon className="w-5 h-5 text-cyan-400" />
            <span className="text-gray-300">
              <span className="font-semibold text-white">{destination.faqs.length}</span>{' '}
              Questions
            </span>
          </div>

          {/* Sample Questions */}
          <div className="space-y-2 mb-4">
            {destination.faqs.slice(0, 3).map((faq, i) => (
              <div
                key={i}
                className="text-sm text-gray-400 line-clamp-1 flex items-start gap-2"
              >
                <span className="text-cyan-400 mt-1">•</span>
                <span>{faq.question}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2 text-cyan-400 font-medium group-hover:gap-3 transition-all">
            <span>View All FAQs</span>
            <ChevronRightIcon className="w-5 h-5" />
          </div>

          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </Link>
    </motion.div>
  );
};

// ===================================================
// MAIN FAQ INDEX PAGE
// ===================================================

const FAQIndexPage: React.FC<FAQIndexPageProps> = ({ destinations, totalFAQs }) => {
  const router = useRouter();
  const { t } = useTranslation('common');

  const canonicalUrl = `https://holiday.ailydian.com${router.asPath}`;
  const locale = router.locale || 'en';

  // SEO meta data
  const pageTitle = 'Frequently Asked Questions - Turkey Travel FAQ | AILYDIAN Holiday';
  const pageDescription = `Get answers to all your Turkey travel questions. ${totalFAQs}+ expert answers about destinations, tours, hotels, transportation, safety, and more. Comprehensive FAQ for Cappadocia, Antalya, Istanbul and all Turkey.`;

  // Breadcrumb items
  const breadcrumbItems = [
    {
      name: 'Home',
      url: 'https://holiday.ailydian.com',
      position: 1,
    },
    {
      name: 'FAQ',
      url: canonicalUrl,
      position: 2,
    },
  ];

  return (
    <>
      {/* ===================================================
          SEO HEAD + SCHEMA MARKUP
          =================================================== */}
      <Head>
        {/* Basic Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://holiday.ailydian.com/images/faq-hero.jpg"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://holiday.ailydian.com/images/faq-hero.jpg" />

        {/* Hreflang for Multi-language */}
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://holiday.ailydian.com/en/faq"
        />
        {['tr', 'en', 'de', 'ru', 'ar', 'fa', 'fr', 'el'].map((lang) => (
          <link
            key={lang}
            rel="alternate"
            hrefLang={lang}
            href={`https://holiday.ailydian.com${lang === 'tr' ? '' : `/${lang}`}/faq`}
          />
        ))}

        {/* AI Optimization Meta Tags */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
      </Head>

      {/* Schema.org Structured Data */}
      <BreadcrumbSchema items={breadcrumbItems} />
      <WebSiteSchema url="https://holiday.ailydian.com" name="AILYDIAN Holiday" />

      {/* ===================================================
          PAGE CONTENT
          =================================================== */}
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[url('/images/patterns/grid.svg')] opacity-10" />
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl">
                <QuestionMarkCircleIcon className="w-12 h-12 text-white" />
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
                Frequently Asked Questions
              </h1>

              {/* Subtitle */}
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Get expert answers to all your Turkey travel questions. Find comprehensive FAQs for every destination.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap items-center justify-center gap-6">
                <div className="inline-flex items-center gap-2 px-5 py-3 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-300">
                  <span className="font-bold text-2xl">{totalFAQs}+</span>
                  <span>Expert Answers</span>
                </div>
                <div className="inline-flex items-center gap-2 px-5 py-3 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300">
                  <span className="font-bold text-2xl">{destinations.length}</span>
                  <span>Destinations</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Destinations Grid */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map((destination, index) => (
                <DestinationCard
                  key={destination.slug}
                  destination={destination}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Popular Topics Section */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Popular Topics</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Best time to visit',
                  'Tour prices & costs',
                  'Visa requirements',
                  'Hotel recommendations',
                  'Transportation options',
                  'Safety information',
                  'Food & dining',
                  'Currency & payment',
                ].map((topic, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                    <span className="text-gray-300">{topic}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                Can't find what you're looking for?
              </h2>
              <p className="text-gray-300 mb-6">
                Our travel experts are ready to help you with any questions about your Turkey vacation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/contact"
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                >
                  Contact Us
                </a>
                <a
                  href="/tours"
                  className="px-8 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300"
                >
                  Browse Tours
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

// ===================================================
// STATIC GENERATION
// ===================================================

export const getStaticProps: GetStaticProps<FAQIndexPageProps> = async ({ locale }) => {
  const totalFAQs = allDestinationFAQs.reduce((sum, dest) => sum + dest.faqs.length, 0);

  return {
    props: {
      destinations: allDestinationFAQs,
      totalFAQs,
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
    revalidate: 3600, // Revalidate every hour
  };
};

export default FAQIndexPage;
