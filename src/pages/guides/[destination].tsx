/**
 * Destination Guide Page - AI-Optimized 2,000+ Word Content
 * For search engines (Google, Bing, Yandex) and AI models (ChatGPT, Perplexity, Claude)
 *
 * @module pages/guides/[destination]
 * @seo TouristDestination Schema, Long-form Content, Featured Snippets
 */

import React, { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import {
  MapPinIcon,
  ClockIcon,
  CurrencyDollarIcon,
  StarIcon,
  ChevronRightIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import {
  allDestinationGuides,
  DestinationGuide,
  AttractionInfo,
} from '@/data/seo/destination-guides';
import {
  TouristDestinationSchema,
  BreadcrumbSchema,
  FAQPageSchema,
} from '@/components/seo/SchemaMarkup';
import { getFAQsByDestination } from '@/data/seo/faq-data';

// ===================================================
// TYPE DEFINITIONS
// ===================================================

interface GuidePageProps {
  guide: DestinationGuide;
}

// ===================================================
// QUICK FACTS COMPONENT
// ===================================================

const QuickFacts: React.FC<{ guide: DestinationGuide }> = ({ guide }) => {
  const facts = [
    { label: 'Best Time', value: guide.quickFacts.bestTimeToVisit, icon: ClockIcon },
    { label: 'Climate', value: guide.quickFacts.climate, icon: MapPinIcon },
    { label: 'Currency', value: guide.quickFacts.currency, icon: CurrencyDollarIcon },
    { label: 'Language', value: guide.quickFacts.language, icon: MapPinIcon },
  ];

  if (guide.quickFacts.population) {
    facts.push({ label: 'Population', value: guide.quickFacts.population, icon: MapPinIcon });
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {facts.map((fact, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all"
        >
          <div className="flex items-center gap-3 mb-2">
            <fact.icon className="w-5 h-5 text-cyan-400" />
            <span className="text-sm text-gray-400">{fact.label}</span>
          </div>
          <p className="text-white font-semibold">{fact.value}</p>
        </motion.div>
      ))}
    </div>
  );
};

// ===================================================
// ATTRACTION CARD COMPONENT
// ===================================================

const AttractionCard: React.FC<{ attraction: AttractionInfo; index: number }> = ({
  attraction,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-cyan-500/30 transition-all group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
            {attraction.name}
          </h3>
          <span className="inline-block px-3 py-1 text-xs font-medium bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">
            {attraction.category}
          </span>
        </div>
        {attraction.mustSee && (
          <div className="flex items-center gap-1 px-3 py-1 bg-cyan-500/20 rounded-full border border-cyan-500/30">
            <StarIcon className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-semibold text-cyan-300">Must See</span>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-300 leading-relaxed mb-4">{attraction.description}</p>

      {/* Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10">
        {attraction.admissionPrice && (
          <div className="flex items-center gap-2">
            <CurrencyDollarIcon className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span className="text-sm text-gray-400">
              <span className="font-semibold text-white">{attraction.admissionPrice}</span>
            </span>
          </div>
        )}
        {attraction.openingHours && (
          <div className="flex items-center gap-2">
            <ClockIcon className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span className="text-sm text-gray-400">{attraction.openingHours}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <StarIcon className="w-4 h-4 text-yellow-400 flex-shrink-0" />
          <span className="text-sm text-gray-400">
            Rating: <span className="font-semibold text-white">{attraction.rating}/5</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// ===================================================
// SECTION COMPONENT
// ===================================================

const GuideSection: React.FC<{
  title: string;
  content: string;
  highlights?: string[];
  id?: string;
}> = ({ title, content, highlights, id }) => {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">
        {title}
      </h2>

      <div className="prose prose-invert max-w-none">
        {content.split('\n\n').map((paragraph, i) => {
          // Check if paragraph is a heading (starts with **)
          if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**')) {
            const heading = paragraph.replace(/\*\*/g, '');
            return (
              <h3 key={i} className="text-xl font-bold text-white mt-8 mb-4">
                {heading}
              </h3>
            );
          }

          // Check if paragraph is a list item
          if (paragraph.trim().startsWith('-')) {
            const items = paragraph.split('\n').filter(line => line.trim().startsWith('-'));
            return (
              <ul key={i} className="list-disc list-inside space-y-2 mb-6">
                {items.map((item, j) => (
                  <li key={j} className="text-gray-300">
                    {item.replace(/^-\s*/, '')}
                  </li>
                ))}
              </ul>
            );
          }

          // Regular paragraph
          return (
            <p key={i} className="text-gray-300 leading-relaxed mb-6">
              {paragraph}
            </p>
          );
        })}
      </div>

      {highlights && highlights.length > 0 && (
        <div className="mt-6 bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-cyan-300 mb-4 flex items-center gap-2">
            <CheckCircleIcon className="w-5 h-5" />
            Key Highlights
          </h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {highlights.map((highlight, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-300">
                <ChevronRightIcon className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

// ===================================================
// MAIN GUIDE PAGE COMPONENT
// ===================================================

const DestinationGuidePage: React.FC<GuidePageProps> = ({ guide }) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [activeSection, setActiveSection] = useState('overview');

  const canonicalUrl = `https://holiday.ailydian.com${router.asPath}`;
  const locale = router.locale || 'en';

  // Page meta
  const pageTitle = `${guide.destination} Travel Guide 2026 - ${guide.destination} Tourism & Vacation Guide | AILYDIAN Holiday`;
  const pageDescription = guide.metaDescription;

  // Get FAQs for this destination
  const destinationFAQs = getFAQsByDestination(guide.slug);

  // Breadcrumbs
  const breadcrumbItems = [
    { name: 'Home', url: 'https://holiday.ailydian.com', position: 1 },
    { name: 'Guides', url: 'https://holiday.ailydian.com/guides', position: 2 },
    { name: guide.destination, url: canonicalUrl, position: 3 },
  ];

  // Navigation sections
  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'attractions', label: 'Attractions' },
    { id: 'activities', label: 'Activities' },
    { id: 'accommodation', label: 'Where to Stay' },
    { id: 'dining', label: 'Dining' },
    { id: 'transportation', label: 'Transportation' },
    { id: 'practical', label: 'Practical Info' },
    { id: 'tips', label: 'Travel Tips' },
  ];

  return (
    <>
      {/* ===================================================
          SEO HEAD + SCHEMA MARKUP
          =================================================== */}
      <Head>
        {/* Basic Meta */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="keywords" content={guide.keywords.join(', ')} />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta
          property="og:image"
          content={`https://holiday.ailydian.com/images/destinations/${guide.slug}-hero.jpg`}
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />

        {/* Hreflang */}
        <link rel="alternate" hrefLang="x-default" href={`https://holiday.ailydian.com/en/guides/${guide.slug}`} />
        {['tr', 'en', 'de', 'ru', 'ar', 'fa', 'fr', 'el'].map((lang) => (
          <link
            key={lang}
            rel="alternate"
            hrefLang={lang}
            href={`https://holiday.ailydian.com${lang === 'tr' ? '' : `/${lang}`}/guides/${guide.slug}`}
          />
        ))}

        {/* AI Optimization */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="article:published_time" content={new Date().toISOString()} />
        <meta name="article:modified_time" content={new Date().toISOString()} />
        <meta name="article:section" content="Travel Guides" />
        <meta name="article:tag" content={guide.keywords.join(',')} />
      </Head>

      {/* Schema Markup */}
      <TouristDestinationSchema
        name={guide.destination}
        description={guide.overview.content.substring(0, 500)}
        image={[
          `https://holiday.ailydian.com/images/destinations/${guide.slug}-1.jpg`,
          `https://holiday.ailydian.com/images/destinations/${guide.slug}-2.jpg`,
          `https://holiday.ailydian.com/images/destinations/${guide.slug}-3.jpg`,
        ]}
        url={canonicalUrl}
        address={{
          addressLocality: guide.destination,
          addressRegion: guide.region,
          addressCountry: guide.country,
        }}
        geo={guide.coordinates}
        touristType={['Tourist', 'Traveler', 'Vacationer']}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      {destinationFAQs && destinationFAQs.faqs.length > 0 && (
        <FAQPageSchema
          faqs={destinationFAQs.faqs.slice(0, 10)}
          url={canonicalUrl}
          title={`${guide.destination} FAQs`}
          description={`Frequently asked questions about ${guide.destination}`}
        />
      )}

      {/* ===================================================
          PAGE CONTENT
          =================================================== */}
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[url('/images/patterns/grid.svg')] opacity-10" />
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-300 text-sm mb-4">
                <MapPinIcon className="w-4 h-4" />
                <span>{guide.region}, {guide.country}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
                {guide.destination} Travel Guide
              </h1>

              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {guide.metaDescription}
              </p>
            </motion.div>

            {/* Quick Facts */}
            <QuickFacts guide={guide} />
          </div>
        </section>

        {/* Sticky Navigation */}
        <div className="sticky top-20 z-40 bg-slate-900/95 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-6xl mx-auto">
            <nav className="flex gap-2 overflow-x-auto scrollbar-hide">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {section.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
          {/* Overview */}
          <GuideSection
            id="overview"
            title={guide.overview.title}
            content={guide.overview.content}
            highlights={guide.overview.highlights}
          />

          {/* Attractions */}
          <section id="attractions" className="scroll-mt-24">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">
              Top Attractions in {guide.destination}
            </h2>
            <p className="text-gray-300 leading-relaxed mb-8">
              {guide.attractions.description}
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {guide.attractions.topAttractions.map((attraction, i) => (
                <AttractionCard key={i} attraction={attraction} index={i} />
              ))}
            </div>
          </section>

          {/* Activities */}
          <GuideSection
            id="activities"
            title={guide.activities.title}
            content={guide.activities.content}
            highlights={guide.activities.highlights}
          />

          {/* Accommodation */}
          <section id="accommodation" className="scroll-mt-24">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">
              Where to Stay in {guide.destination}
            </h2>
            <p className="text-gray-300 leading-relaxed mb-8">
              {guide.accommodation.description}
            </p>
            <div className="space-y-6">
              {guide.accommodation.recommendations.map((rec, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{rec.type}</h3>
                    <span className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-cyan-300 font-semibold">
                      {rec.priceRange}
                    </span>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-4">{rec.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {rec.bestFor.map((tag, j) => (
                      <span
                        key={j}
                        className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Dining */}
          <GuideSection
            id="dining"
            title={guide.dining.title}
            content={guide.dining.content}
            highlights={guide.dining.highlights}
          />

          {/* Transportation */}
          <section id="transportation" className="scroll-mt-24">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">
              Getting Around {guide.destination}
            </h2>
            <p className="text-gray-300 leading-relaxed mb-8">
              {guide.transportation.description}
            </p>
            <div className="space-y-4">
              {guide.transportation.options.map((option, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-white">{option.type}</h3>
                    <div className="text-right">
                      <div className="text-cyan-300 font-semibold">{option.cost}</div>
                      {option.duration && (
                        <div className="text-sm text-gray-400">{option.duration}</div>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{option.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Practical Info */}
          <GuideSection
            id="practical"
            title={guide.practicalInfo.title}
            content={guide.practicalInfo.content}
            highlights={guide.practicalInfo.highlights}
          />

          {/* Travel Tips */}
          <section id="tips" className="scroll-mt-24">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">
              Essential Travel Tips for {guide.destination}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guide.travelTips.map((tip, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.02 }}
                  className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all"
                >
                  <CheckCircleIcon className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-300 text-sm leading-relaxed">{tip}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* CTA Section */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                Ready to explore {guide.destination}?
              </h2>
              <p className="text-gray-300 mb-6">
                Book your {guide.destination} adventure today and experience the magic yourself.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href={`/tours?destination=${guide.slug}`}
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                >
                  Browse {guide.destination} Tours
                </Link>
                {destinationFAQs && (
                  <Link
                    href={`/faq/${guide.slug}`}
                    className="px-8 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all"
                  >
                    View FAQs
                  </Link>
                )}
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

export const getStaticPaths: GetStaticPaths = async () => {
  const locales = ['tr', 'en', 'de', 'ru', 'ar', 'fa', 'fr', 'el'];
  const paths: Array<{ params: { destination: string }; locale: string }> = [];

  allDestinationGuides.forEach((guide) => {
    locales.forEach((locale) => {
      paths.push({
        params: { destination: guide.slug },
        locale,
      });
    });
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<GuidePageProps> = async ({ params, locale }) => {
  const destinationSlug = params?.destination as string;
  const guide = allDestinationGuides.find((g) => g.slug === destinationSlug);

  if (!guide) {
    return { notFound: true };
  }

  return {
    props: {
      guide,
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
    revalidate: 3600, // Hourly revalidation
  };
};

export default DestinationGuidePage;
