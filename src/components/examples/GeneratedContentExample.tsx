/**
 * Example Component - Using AI Generated Content
 * Demonstrates how to integrate AI-generated content into your components
 */

import React from 'react';
import Head from 'next/head';
import {
  useGeneratedContent,
  useContentSEO,
  useContentReviews,
  useContentFAQs,
  useContentItinerary,
} from '@/hooks/useGeneratedContent';

// ============================================================================
// TOUR PAGE EXAMPLE
// ============================================================================

interface TourPageProps {
  tourId: string;
}

export function TourPageExample({ tourId }: TourPageProps) {
  const { content, isLoading, error } = useGeneratedContent(tourId, 'tour');
  const seo = useContentSEO(tourId, 'tour');

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error || !content) {
    return <ErrorMessage error={error} />;
  }

  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        <title>{seo?.metaTitle}</title>
        <meta name="description" content={seo?.metaDescription} />
        <meta name="keywords" content={seo?.keywords.join(', ')} />
        <link rel="canonical" href={seo?.canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={seo?.metaTitle} />
        <meta property="og:description" content={seo?.metaDescription} />
        <meta property="og:type" content="product" />

        {/* Structured Data */}
        {seo?.structuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(seo.structuredData),
            }}
          />
        )}
      </Head>

      <article className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
          <p className="text-xl text-gray-600 mb-6">{content.description}</p>

          {/* Quality Badge */}
          {content.quality.score >= 80 && (
            <div className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              ✓ AI-Verified Content - Quality Score: {content.quality.score.toFixed(0)}%
            </div>
          )}
        </section>

        {/* Highlights */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.highlights.map((highlight, index) => (
              <div key={index} className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-gray-700">{highlight}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What to Expect */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">What to Expect</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">{content.whatToExpect}</p>
          </div>
        </section>

        {/* Long Description */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">About This Experience</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {content.longDescription}
            </p>
          </div>
        </section>

        {/* Itinerary */}
        {content.itinerary && content.itinerary.length > 0 && (
          <ItinerarySection itinerary={content.itinerary} />
        )}

        {/* Included/Not Included */}
        <section className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Included */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <svg className="w-6 h-6 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              What's Included
            </h3>
            <ul className="space-y-2">
              {content.included.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not Included */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <svg className="w-6 h-6 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              Not Included
            </h3>
            <ul className="space-y-2">
              {content.notIncluded.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-gray-400 mr-2">✗</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Important Info */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Important Information</h2>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <ul className="space-y-2">
              {content.importantInfo.map((info, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{info}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Cancellation Policy */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Cancellation Policy</h2>
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700">{content.cancellationPolicy}</p>
          </div>
        </section>

        {/* FAQs */}
        <FAQSection faqs={content.faqs} />

        {/* Reviews */}
        {content.reviews && content.reviews.length > 0 && (
          <ReviewsSection reviews={content.reviews} />
        )}
      </article>
    </>
  );
}

// ============================================================================
// ITINERARY SECTION
// ============================================================================

function ItinerarySection({ itinerary }: { itinerary: any[] }) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Itinerary</h2>
      <div className="space-y-4">
        {itinerary.map((item, index) => (
          <div key={index} className="flex">
            {/* Timeline */}
            <div className="flex flex-col items-center mr-4">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full font-bold">
                {index + 1}
              </div>
              {index < itinerary.length - 1 && (
                <div className="w-0.5 h-full bg-blue-200 my-2" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-8">
              <div className="flex items-center mb-2">
                <span className="text-blue-600 font-semibold mr-2">{item.time}</span>
                {item.duration && (
                  <span className="text-gray-500 text-sm">({item.duration})</span>
                )}
              </div>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-gray-700">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================================
// FAQ SECTION
// ============================================================================

function FAQSection({ faqs }: { faqs: any[] }) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details key={index} className="bg-gray-50 rounded-lg">
            <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-100 rounded-lg">
              {faq.question}
            </summary>
            <div className="px-4 pb-4">
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          </details>
        ))}
      </div>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(faq => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
}

// ============================================================================
// REVIEWS SECTION
// ============================================================================

function ReviewsSection({ reviews }: { reviews: any[] }) {
  const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <div className="flex items-center">
          <div className="flex items-center mr-2">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${i < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-gray-600">
            {averageRating.toFixed(1)} ({reviews.length} reviews)
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={index} className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center mb-1">
                  <span className="font-semibold mr-2">{review.author}</span>
                  {review.verified && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">
                      Verified Purchase
                    </span>
                  )}
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
            {review.title && (
              <h4 className="font-semibold mb-2">{review.title}</h4>
            )}
            <p className="text-gray-700">{review.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================================
// LOADING SKELETON
// ============================================================================

function LoadingSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
      <div className="h-10 bg-gray-200 rounded w-3/4 mb-4" />
      <div className="h-6 bg-gray-200 rounded w-1/2 mb-8" />
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-4/6" />
      </div>
    </div>
  );
}

// ============================================================================
// ERROR MESSAGE
// ============================================================================

function ErrorMessage({ error }: { error: Error | null }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Error Loading Content
            </h3>
            <p className="mt-2 text-sm text-red-700">
              {error?.message || 'Failed to load generated content. Please try again later.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// EXPORTS
// ============================================================================

export default TourPageExample;
