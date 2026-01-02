/**
 * Universal SEO System - Usage Examples
 * Copy-paste ready examples for all page types
 *
 * @module seo/USAGE_EXAMPLES
 * @version 2.0.0
 */

/* eslint-disable */

// ===================================================
// EXAMPLE 1: TOUR DETAIL PAGE
// ===================================================

import { UniversalSEO } from '@/components/seo/UniversalSEO';
import { useTourSEO } from '@/hooks/useSEO';
import type { GetStaticProps, GetStaticPaths } from 'next';

interface TourPageProps {
  tour: any;
}

export default function TourDetailPage({ tour }: TourPageProps) {
  const seoData = useTourSEO(tour);

  return (
    <>
      <UniversalSEO
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        ogImage={seoData.ogImage}
        schema={seoData.schema}
        breadcrumbs={seoData.breadcrumbs}
        type="product"
      />

      {/* Your page content */}
      <div>
        <h1>{tour.title}</h1>
        <p>{tour.description}</p>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  // Generate paths for all tours in all languages
  const tours = await fetchAllTours();

  const paths = tours.flatMap((tour) =>
    locales!.map((locale) => ({
      params: { slug: tour.slug },
      locale,
    }))
  );

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const tour = await fetchTourBySlug(params!.slug as string);

  return {
    props: { tour },
    revalidate: 3600, // Revalidate every hour
  };
};

// ===================================================
// EXAMPLE 2: HOTEL DETAIL PAGE
// ===================================================

import { useHotelSEO } from '@/hooks/useSEO';

interface HotelPageProps {
  hotel: any;
}

export default function HotelDetailPage({ hotel }: HotelPageProps) {
  const seoData = useHotelSEO(hotel);

  return (
    <>
      <UniversalSEO
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        ogImage={seoData.ogImage}
        schema={seoData.schema}
        breadcrumbs={seoData.breadcrumbs}
        type="business.business"
      />

      <div>
        <h1>{hotel.name}</h1>
        <p>{hotel.description}</p>
      </div>
    </>
  );
}

// ===================================================
// EXAMPLE 3: HOMEPAGE WITH ORGANIZATION SCHEMA
// ===================================================

import { getPageSEO } from '@/lib/seo';
import { useRouter } from 'next/router';

export default function HomePage() {
  const { locale } = useRouter();
  const seoData = getPageSEO('home', locale as any);

  return (
    <>
      <UniversalSEO
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords?.split(', ')}
        ogImage={seoData.ogImage}
        includeOrganization={true}
        includeWebsite={true}
      />

      <div>
        <h1>Welcome to AILYDIAN Holiday</h1>
      </div>
    </>
  );
}

// ===================================================
// EXAMPLE 4: TOURS LIST PAGE
// ===================================================

import { generateBreadcrumbSchema } from '@/lib/seo';

interface ToursListPageProps {
  tours: any[];
  city?: string;
}

export default function ToursListPage({ tours, city }: ToursListPageProps) {
  const { locale } = useRouter();
  const seoData = getPageSEO('tours', locale as any);

  const breadcrumbs = city
    ? [
        { name: 'Home', url: 'https://holiday.ailydian.com' },
        { name: 'Tours', url: 'https://holiday.ailydian.com/tours' },
        { name: city, url: `https://holiday.ailydian.com/tours?city=${city}` },
      ]
    : [
        { name: 'Home', url: 'https://holiday.ailydian.com' },
        { name: 'Tours', url: 'https://holiday.ailydian.com/tours' },
      ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <>
      <UniversalSEO
        title={city ? `${city} Tours - Holiday.AILYDIAN` : seoData.title}
        description={seoData.description}
        keywords={seoData.keywords?.split(', ')}
        schema={breadcrumbSchema}
        breadcrumbs={breadcrumbs}
      />

      <div>
        <h1>{city ? `Tours in ${city}` : 'All Tours'}</h1>
        {/* Tour list */}
      </div>
    </>
  );
}

// ===================================================
// EXAMPLE 5: CAR RENTAL PAGE
// ===================================================

import { useCarRentalSEO } from '@/hooks/useSEO';

interface CarRentalPageProps {
  car: any;
}

export default function CarRentalPage({ car }: CarRentalPageProps) {
  const seoData = useCarRentalSEO(car);

  return (
    <>
      <UniversalSEO
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        ogImage={seoData.ogImage}
        schema={seoData.schema}
        breadcrumbs={seoData.breadcrumbs}
        type="product"
      />

      <div>
        <h1>{car.brand} {car.model}</h1>
        <p>{car.description}</p>
      </div>
    </>
  );
}

// ===================================================
// EXAMPLE 6: CUSTOM PAGE WITH FAQ SCHEMA
// ===================================================

import { generateFAQSchema } from '@/lib/seo';

export default function AboutPage() {
  const faqs = [
    {
      question: 'What is AILYDIAN Holiday?',
      answer: 'AILYDIAN Holiday is Turkey\'s premier travel and tourism booking platform.',
    },
    {
      question: 'How do I book a tour?',
      answer: 'Select your preferred tour, choose your date, and complete the secure payment process.',
    },
    {
      question: 'Can I cancel my booking?',
      answer: 'Yes, free cancellation is available up to 24 hours before your tour date.',
    },
  ];

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <UniversalSEO
        title="About AILYDIAN Holiday | Turkey Travel Platform"
        description="Learn about AILYDIAN Holiday, the leading travel platform in Turkey with 1000+ tours and 500+ hotels."
        keywords={['about ailydian', 'turkey travel', 'holiday platform']}
        schema={faqSchema}
      />

      <div>
        <h1>About AILYDIAN Holiday</h1>
        {/* FAQ section */}
      </div>
    </>
  );
}

// ===================================================
// EXAMPLE 7: BLOG POST / ARTICLE PAGE
// ===================================================

interface BlogPostProps {
  post: {
    title: string;
    description: string;
    content: string;
    author: string;
    publishedAt: string;
    updatedAt: string;
    coverImage: string;
    slug: string;
  };
}

export default function BlogPostPage({ post }: BlogPostProps) {
  return (
    <>
      <UniversalSEO
        title={`${post.title} | AILYDIAN Blog`}
        description={post.description}
        ogImage={post.coverImage}
        type="article"
        author={post.author}
        publishedTime={post.publishedAt}
        modifiedTime={post.updatedAt}
        breadcrumbs={[
          { name: 'Home', url: 'https://holiday.ailydian.com' },
          { name: 'Blog', url: 'https://holiday.ailydian.com/blog' },
          { name: post.title, url: `https://holiday.ailydian.com/blog/${post.slug}` },
        ]}
      />

      <article>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </>
  );
}

// ===================================================
// EXAMPLE 8: CITY/DESTINATION PAGE WITH GEO SEO
// ===================================================

import { getCityGeoSEO } from '@/lib/seo';

interface CityPageProps {
  citySlug: string;
}

export default function CityPage({ citySlug }: CityPageProps) {
  const { locale } = useRouter();
  const cityData = getCityGeoSEO(citySlug, locale as any);

  if (!cityData) {
    return <div>City not found</div>;
  }

  const { localizedSEO } = cityData;

  return (
    <>
      <UniversalSEO
        title={localizedSEO.title}
        description={localizedSEO.description}
        keywords={localizedSEO.keywords.split(', ')}
      />

      <div>
        <h1>{localizedSEO.h1}</h1>
        <p>{localizedSEO.content}</p>

        <h2>Landmarks</h2>
        <ul>
          {localizedSEO.landmarks.map((landmark) => (
            <li key={landmark}>{landmark}</li>
          ))}
        </ul>

        <h2>Nearby Places</h2>
        <ul>
          {localizedSEO.nearbyPlaces.map((place) => (
            <li key={place}>{place}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

// ===================================================
// EXAMPLE 9: SEARCH RESULTS PAGE
// ===================================================

interface SearchPageProps {
  query: string;
  results: any[];
}

export default function SearchPage({ query, results }: SearchPageProps) {
  return (
    <>
      <UniversalSEO
        title={`Search Results for "${query}" | AILYDIAN Holiday`}
        description={`Found ${results.length} results for "${query}". Browse tours, hotels, and activities.`}
        noindex={true} // Don't index search results
      />

      <div>
        <h1>Search Results: {query}</h1>
        <p>{results.length} results found</p>
      </div>
    </>
  );
}

// ===================================================
// EXAMPLE 10: ERROR PAGE (404, 500)
// ===================================================

export default function Custom404() {
  return (
    <>
      <UniversalSEO
        title="Page Not Found (404) | AILYDIAN Holiday"
        description="The page you're looking for could not be found."
        noindex={true}
        nofollow={true}
      />

      <div>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you're looking for doesn't exist.</p>
      </div>
    </>
  );
}

// ===================================================
// HELPER FUNCTIONS FOR DATA FETCHING
// ===================================================

async function fetchAllTours() {
  // Implement your data fetching logic
  return [];
}

async function fetchTourBySlug(slug: string) {
  // Implement your data fetching logic
  return {};
}

// ===================================================
// END OF EXAMPLES
// ===================================================

/**
 * QUICK REFERENCE
 *
 * Basic Usage:
 * <UniversalSEO title="..." description="..." />
 *
 * With Schema:
 * <UniversalSEO title="..." schema={schema} />
 *
 * With Breadcrumbs:
 * <UniversalSEO title="..." breadcrumbs={breadcrumbs} />
 *
 * Article/Blog:
 * <UniversalSEO type="article" author="..." publishedTime="..." />
 *
 * Noindex Page:
 * <UniversalSEO noindex={true} />
 *
 * Homepage:
 * <UniversalSEO includeOrganization includeWebsite />
 */
