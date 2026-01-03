/**
 * FAQ Page - Dynamic Destination FAQs
 * AI-optimized Q&A for search engines and AI models (ChatGPT, Perplexity, Claude)
 *
 * @module pages/faq/[destination]
 * @seo Featured Snippets, FAQPage Schema, AI Visibility
 */

import React, { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, SearchIcon } from '@heroicons/react/24/outline';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import {
  allDestinationFAQs,
  DestinationFAQ,
  FAQItem,
  getCategories,
  getFAQsByCategory,
} from '@/data/seo/faq-data';
import { FAQPageSchema, BreadcrumbSchema } from '@/components/seo/SchemaMarkup';

// ===================================================
// TYPE DEFINITIONS
// ===================================================

interface FAQPageProps {
  destination: DestinationFAQ;
  categories: string[];
}

// ===================================================
// FAQ ACCORDION COMPONENT
// ===================================================

const FAQAccordion: React.FC<{ faq: FAQItem; index: number }> = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 group"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors flex-1">
          {faq.question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDownIcon className="w-6 h-6 text-cyan-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            id={`faq-answer-${index}`}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 pt-2">
              <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mb-4" />
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {faq.answer}
              </p>
              {faq.category && (
                <div className="mt-4">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/30">
                    {faq.category}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ===================================================
// MAIN FAQ PAGE COMPONENT
// ===================================================

const FAQPage: React.FC<FAQPageProps> = ({ destination, categories }) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter FAQs by category and search
  const filteredFAQs = destination.faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Canonical URL
  const canonicalUrl = `https://holiday.ailydian.com${router.asPath}`;
  const locale = router.locale || 'en';

  // SEO meta data
  const pageTitle = `${destination.destination} FAQ - Frequently Asked Questions | AILYDIAN Holiday`;
  const pageDescription = `Get answers to your ${destination.destination} travel questions. ${destination.faqs.length}+ expert answers about tours, hotels, transportation, safety, and more.`;

  // Breadcrumb items
  const breadcrumbItems = [
    {
      name: 'Home',
      url: 'https://holiday.ailydian.com',
      position: 1,
    },
    {
      name: 'FAQ',
      url: 'https://holiday.ailydian.com/faq',
      position: 2,
    },
    {
      name: destination.destination,
      url: canonicalUrl,
      position: 3,
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
          content={`https://holiday.ailydian.com/images/destinations/${destination.slug}-faq.jpg`}
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta
          name="twitter:image"
          content={`https://holiday.ailydian.com/images/destinations/${destination.slug}-faq.jpg`}
        />

        {/* Hreflang for Multi-language */}
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`https://holiday.ailydian.com/en/faq/${destination.slug}`}
        />
        {['tr', 'en', 'de', 'ru', 'ar', 'fa', 'fr', 'el'].map((lang) => (
          <link
            key={lang}
            rel="alternate"
            hrefLang={lang}
            href={`https://holiday.ailydian.com${lang === 'tr' ? '' : `/${lang}`}/faq/${destination.slug}`}
          />
        ))}

        {/* AI Optimization Meta Tags */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
      </Head>

      {/* Schema.org Structured Data */}
      <FAQPageSchema
        faqs={destination.faqs}
        url={canonicalUrl}
        title={pageTitle}
        description={pageDescription}
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* ===================================================
          PAGE CONTENT
          =================================================== */}
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[url('/images/patterns/grid.svg')] opacity-10" />
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
                {destination.destination} FAQ
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Get expert answers to your {destination.destination} travel questions
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-300 text-sm">
                <span className="font-semibold">{destination.faqs.length}+</span>
                <span>Expert Answers</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Search & Filter Section */}
        <section className="px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              {/* Search Input */}
              <div className="relative mb-6">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  All ({destination.faqs.length})
                </button>
                {categories.map((category) => {
                  const count = getFAQsByCategory(destination.slug, category).length;
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      {category} ({count})
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ List */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-4xl mx-auto">
            {filteredFAQs.length > 0 ? (
              <div className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <FAQAccordion key={index} faq={faq} index={index} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl"
              >
                <p className="text-gray-400 text-lg">
                  No questions found matching your search.
                </p>
              </motion.div>
            )}
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
                Still have questions?
              </h2>
              <p className="text-gray-300 mb-6">
                Our travel experts are ready to help you plan your perfect {destination.destination} vacation.
              </p>
              <a
                href="/contact"
                className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
              >
                Contact Us
              </a>
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

export const getStaticPaths: GetStaticPaths = async () => {
  const locales = ['tr', 'en', 'de', 'ru', 'ar', 'fa', 'fr', 'el'];
  const paths: Array<{ params: { destination: string }; locale: string }> = [];

  allDestinationFAQs.forEach((destination) => {
    locales.forEach((locale) => {
      paths.push({
        params: { destination: destination.slug },
        locale,
      });
    });
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<FAQPageProps> = async ({ params, locale }) => {
  const destinationSlug = params?.destination as string;
  const destination = allDestinationFAQs.find((d) => d.slug === destinationSlug);

  if (!destination) {
    return { notFound: true };
  }

  const categories = getCategories(destinationSlug);

  return {
    props: {
      destination,
      categories,
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
    revalidate: 3600, // Revalidate every hour
  };
};

export default FAQPage;
