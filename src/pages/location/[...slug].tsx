import { GetServerSideProps } from 'next';
import { NextSeo, LocalBusinessJsonLd } from 'next-seo';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Star, MapPin, Clock, Phone, Globe, Camera, Heart, Share2, Flag, ExternalLink, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

import { Location, Review, Photo } from '../../lib/types/review-system';
import reviewService from '../../lib/services/review-service';
import PhotoGallery from '../../components/location/PhotoGallery';
import ReviewsList from '../../components/location/ReviewsList';
import WriteReviewModal from '../../components/reviews/WriteReviewModal';
import LocationMap from '../../components/location/LocationMap';
import ExternalPlatformReviews from '../../components/reviews/ExternalPlatformReviews';
import logger from '../../lib/logger';
import { useToast } from '../../context/ToastContext';

interface LocationPageProps {
  location: Location;
  reviews: Review[];
  photos: Photo[];
  nearbyLocations: Location[];
  locale: string;
}

export default function LocationPage({
  location,
  reviews,
  photos,
  nearbyLocations,
  locale = 'en'
}: LocationPageProps) {
  const { showSuccess, showError, showWarning, showInfo, showToast } = useToast();
  const { t } = useTranslation('common');
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [syncingGoogle, setSyncingGoogle] = useState(false);
  const [syncingTripAdvisor, setSyncingTripAdvisor] = useState(false);
  const [syncStatus, setSyncStatus] = useState<{
    google?: {success: boolean;lastSync?: string;error?: string;};
    tripAdvisor?: {success: boolean;lastSync?: string;error?: string;};
  }>({});

  // Mock external reviews (in real implementation, this would come from props or API)
  const [externalReviews] = useState({
    google: location.google_place_id ? [
    {
      id: 'google_1',
      content: 'Amazing place! Great food and excellent service. Highly recommend for anyone visiting the area.',
      rating: 5,
      author_name: 'John Smith',
      author_avatar: undefined,
      publish_date: '2024-01-15T00:00:00Z',
      source: 'google' as const,
      source_url: `https://maps.google.com/place/${location.google_place_id}`
    },
    {
      id: 'google_2',
      content: 'Good experience overall. The location is convenient and staff is friendly.',
      rating: 4,
      author_name: 'Sarah Johnson',
      author_avatar: undefined,
      publish_date: '2024-01-10T00:00:00Z',
      source: 'google' as const,
      source_url: `https://maps.google.com/place/${location.google_place_id}`
    }] :
    [],
    tripadvisor: location.tripadvisor_id ? [
    {
      id: 'ta_1',
      title: 'Excellent Experience',
      content: 'One of the best places we visited during our trip. The atmosphere is wonderful and the quality is top-notch.',
      rating: 5,
      author_name: 'Travel_Enthusiast_2024',
      author_avatar: undefined,
      publish_date: '2024-01-12T00:00:00Z',
      source: 'tripadvisor' as const,
      source_url: `https://tripadvisor.com/ShowUserReviews-${location.tripadvisor_id}`,
      helpful_votes: 3,
      trip_type: 'family',
      travel_date: '2024-01-05T00:00:00Z'
    }] :
    []
  });

  // Get localized content
  const getLocalizedContent = (content: any, fallback = '') => {
    if (!content) return fallback;
    return content[locale] || content['en'] || Object.values(content)[0] || fallback;
  };

  const locationName = getLocalizedContent(location.name);
  const locationDescription = getLocalizedContent(location.description);
  const locationAddress = getLocalizedContent(location.address);
  const cityName = getLocalizedContent(location.city?.name);
  const countryName = getLocalizedContent(location.city?.country?.name);
  const categoryName = getLocalizedContent(location.category?.name);

  // SEO data
  const seoTitle = getLocalizedContent(location.seo_title, `${locationName} - ${cityName}, ${countryName}`);
  const seoDescription = getLocalizedContent(location.seo_description,
  `${locationDescription} Located in ${cityName}, ${countryName}. Read ${location.total_reviews} reviews and see ${location.total_photos} photos.`);

  // Structured data for rich snippets
  const structuredData = {
    "@context": "https://schema.org",
    "@type": location.category?.slug === 'restaurants' ? 'Restaurant' :
    location.category?.slug === 'hotels' ? 'Hotel' :
    location.category?.slug === 'attractions' ? 'TouristAttraction' : 'LocalBusiness',
    "name": locationName,
    "description": locationDescription,
    "image": photos.map((photo) => photo.url),
    "address": {
      "@type": "PostalAddress",
      "streetAddress": locationAddress,
      "addressLocality": cityName,
      "addressCountry": countryName
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": location.coordinates.lat,
      "longitude": location.coordinates.lng
    },
    "telephone": location.phone,
    "url": location.website,
    "aggregateRating": location.total_reviews > 0 ? {
      "@type": "AggregateRating",
      "ratingValue": location.average_rating,
      "reviewCount": location.total_reviews,
      "bestRating": 5,
      "worstRating": 1
    } : undefined,
    "review": reviews.slice(0, 5).map((review) => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.user?.first_name && review.user?.last_name ?
        `${review.user.first_name} ${review.user.last_name}` :
        review.user?.username || 'Anonymous'
      },
      "datePublished": review.created_at,
      "description": getLocalizedContent(review.content),
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.overall_rating,
        "bestRating": 5,
        "worstRating": 1
      }
    })),
    "openingHours": location.opening_hours ? Object.entries(location.opening_hours).map(([day, hours]: [string, any]) =>
    hours.closed ? null : `${day.substring(0, 2)} ${hours.open}-${hours.close}`
    ).filter(Boolean) : undefined,
    "priceRange": location.price_range ? '$'.repeat(location.price_range) : undefined
  };

  // Handle favorite toggle
  const handleFavoriteToggle = async () => {
    try {
      if (isFavorited) {
        await reviewService.unfavoriteLocation(location.id);
        setIsFavorited(false);
      } else {
        await reviewService.favoriteLocation(location.id);
        setIsFavorited(true);
      }
    } catch (error) {
      logger.error('Error toggling favorite:', error as Error, { component: 'Slug' });
    }
  };

  // Handle share
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: locationName,
          text: locationDescription,
          url: window.location.href
        });
      } catch (error) {
        logger.debug('Error sharing:', { component: 'Slug', metadata: { data: error } });
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  // Handle Google sync
  const handleGoogleSync = async () => {
    if (!location.google_place_id) {
      showToast({ type: 'info', title: 'Google Place ID not configured for this location' });
      return;
    }

    setSyncingGoogle(true);
    try {
      await reviewService.syncWithGoogle(location.id);
      setSyncStatus((prev) => ({
        ...prev,
        google: { success: true, lastSync: new Date().toISOString() }
      }));
      showToast({ type: 'success', title: 'Successfully synced with Google My Business!' });
    } catch (error) {
      logger.error('Google sync error:', error as Error, { component: 'Slug' });
      setSyncStatus((prev) => ({
        ...prev,
        google: { success: false, error: 'Sync failed. Please try again.' }
      }));
      showToast({ type: 'error', title: 'Failed to sync with Google My Business. Please try again.' });
    } finally {
      setSyncingGoogle(false);
    }
  };

  // Handle TripAdvisor sync
  const handleTripAdvisorSync = async () => {
    if (!location.tripadvisor_id) {
      showToast({ type: 'info', title: 'TripAdvisor ID not configured for this location' });
      return;
    }

    setSyncingTripAdvisor(true);
    try {
      await reviewService.syncWithTripAdvisor(location.id);
      setSyncStatus((prev) => ({
        ...prev,
        tripAdvisor: { success: true, lastSync: new Date().toISOString() }
      }));
      showToast({ type: 'success', title: 'Successfully synced with TripAdvisor!' });
    } catch (error) {
      logger.error('TripAdvisor sync error:', error as Error, { component: 'Slug' });
      setSyncStatus((prev) => ({
        ...prev,
        tripAdvisor: { success: false, error: 'Sync failed. Please try again.' }
      }));
      showToast({ type: 'error', title: 'Failed to sync with TripAdvisor. Please try again.' });
    } finally {
      setSyncingTripAdvisor(false);
    }
  };

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={`https://holiday.ailydian.com/location/${location.slug}`}
        openGraph={{
          type: 'business.business',
          title: seoTitle,
          description: seoDescription,
          url: `https://holiday.ailydian.com/location/${location.slug}`,
          images: photos.slice(0, 4).map((photo) => ({
            url: photo.url,
            width: photo.width || 800,
            height: photo.height || 600,
            alt: getLocalizedContent(photo.alt_text, locationName)
          })),
          site_name: 'Holiday.AILYDIAN'
        }}
        twitter={{
          cardType: 'summary_large_image'
        }}
        additionalMetaTags={[
        {
          property: 'business:hours',
          content: location.opening_hours ? JSON.stringify(location.opening_hours) : ''
        },
        {
          property: 'place:location:latitude',
          content: location.coordinates.lat.toString()
        },
        {
          property: 'place:location:longitude',
          content: location.coordinates.lng.toString()
        },
        {
          name: 'geo.position',
          content: `${location.coordinates.lat};${location.coordinates.lng}`
        },
        {
          name: 'geo.region',
          content: countryName
        },
        {
          name: 'geo.placename',
          content: cityName
        }]
        }
        additionalLinkTags={[
        {
          rel: 'alternate',
          hrefLang: 'x-default',
          href: `https://holiday.ailydian.com/location/${location.slug}`
        },
        ...['en', 'tr', 'de', 'fr', 'es'].map((lang) => ({
          rel: 'alternate',
          hrefLang: lang,
          href: `https://holiday.ailydian.com/${lang}/location/${location.slug}`
        }))]
        } />


      <LocalBusinessJsonLd
        type={location.category?.slug === 'restaurants' ? 'Restaurant' : 'LocalBusiness'}
        id={`https://holiday.ailydian.com/location/${location.slug}`}
        name={locationName}
        description={locationDescription}
        url={`https://holiday.ailydian.com/location/${location.slug}`}
        telephone={location.phone}
        address={{
          streetAddress: locationAddress,
          addressLocality: cityName,
          addressRegion: '',
          postalCode: '',
          addressCountry: countryName
        }}
        geo={{
          latitude: location.coordinates.lat,
          longitude: location.coordinates.lng
        }}
        images={photos.map((photo) => photo.url)}
        rating={location.total_reviews > 0 ? {
          ratingValue: location.average_rating,
          ratingCount: location.total_reviews
        } : undefined}
        priceRange={location.price_range ? '$'.repeat(location.price_range) : undefined}
        openingHours={location.opening_hours ? [
        {
          opens: location.opening_hours.monday?.open || '09:00',
          closes: location.opening_hours.monday?.close || '21:00',
          dayOfWeek: ['Monday']
        }
        // Add more days...
        ] : []} />


      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }} />

        
        {/* Breadcrumb structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://holiday.ailydian.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": countryName,
                "item": `https://holiday.ailydian.com/country/${location.city?.country?.code?.toLowerCase()}`
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": cityName,
                "item": `https://holiday.ailydian.com/city/${location.city?.slug}`
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": categoryName,
                "item": `https://holiday.ailydian.com/${location.category?.slug}`
              },
              {
                "@type": "ListItem",
                "position": 5,
                "name": locationName,
                "item": `https://holiday.ailydian.com/location/${location.slug}`
              }]

            })
          }} />


        {/* Preload critical images */}
        {photos.slice(0, 2).map((photo, index) =>
        <link
          key={photo.id}
          rel="preload"
          as="image"
          href={photo.url}
          fetchPriority={index === 0 ? "high" : "low"} />

        )}
      </Head>

      <main className="min-h-screen bg-lydian-glass-dark">
        {/* Breadcrumb Navigation */}
        <nav className="bg-lydian-bg-hover border-b border-lydian-border-light/10" aria-label="Breadcrumb">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ol className="flex items-center space-x-2 py-4 text-sm">
              <li><Link href="/" className="text-lydian-text-muted hover:text-lydian-text-muted">Home</Link></li>
              <li><span className="text-lydian-text-muted">/</span></li>
              <li><a href={`/country/${location.city?.country?.code?.toLowerCase()}`} className="text-lydian-text-muted hover:text-lydian-text-muted">{countryName}</a></li>
              <li><span className="text-lydian-text-muted">/</span></li>
              <li><a href={`/city/${location.city?.slug}`} className="text-lydian-text-muted hover:text-lydian-text-muted">{cityName}</a></li>
              <li><span className="text-lydian-text-muted">/</span></li>
              <li><span className="text-lydian-text-inverse font-medium">{locationName}</span></li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-lydian-glass-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8">
              <div className="flex-1">
                <h1 className="text-3xl lg:text-4xl font-bold text-lydian-text-inverse mb-2">
                  {locationName}
                </h1>
                
                {/* Rating and Reviews */}
                <div className="flex items-center space-x-4 mb-4">
                  {location.total_reviews > 0 &&
                  <div className="flex items-center">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) =>
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                        i < Math.floor(location.average_rating) ?
                        'text-yellow-400 fill-current' :
                        'text-lydian-text-dim'}`
                        } />

                      )}
                      </div>
                      <span className="ml-2 text-lg font-semibold text-lydian-text-inverse">
                        {location.average_rating.toFixed(1)}
                      </span>
                      <span className="ml-1 text-lydian-text-dim">
                        ({location.total_reviews} {t('reviews')})
                      </span>
                    </div>
                  }
                  
                  {location.price_range > 0 &&
                  <div className="text-lydian-text-dim">
                      {reviewService.formatPriceRange(location.price_range)}
                    </div>
                  }
                  
                  <span className="px-2 py-1 bg-lydian-primary-light text-blue-800 text-xs rounded-full">
                    {categoryName}
                  </span>

                  {location.verified &&
                  <span className="px-2 py-1 bg-lydian-success-light text-green-800 text-xs rounded-full">
                      ✓ {t('verified')}
                    </span>
                  }
                </div>

                {/* Location */}
                <div className="flex items-start text-lydian-text-dim mb-4">
                  <MapPin className="h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p>{locationAddress}</p>
                    <p>{cityName}, {countryName}</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="flex flex-wrap gap-4 text-sm">
                  {location.phone &&
                  <a
                    href={`tel:${location.phone}`}
                    className="flex items-center text-lydian-primary hover:text-lydian-primary-dark">

                      <Phone className="h-4 w-4 mr-1" />
                      {location.phone}
                    </a>
                  }
                  
                  {location.website &&
                  <a
                    href={location.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-lydian-primary hover:text-lydian-primary-dark">

                      <Globe className="h-4 w-4 mr-1" />
                      {t('website')}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  }
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3 mt-6 lg:mt-0">
                <button
                  onClick={handleFavoriteToggle}
                  className={`flex items-center px-4 py-2 rounded-lg border ${
                  isFavorited ?
                  'bg-red-50 border-red-300 text-red-700' :
                  'bg-lydian-bg/5 border-white/20 text-gray-200 hover:bg-lydian-bg/5'}`
                  }>

                  <Heart className={`h-5 w-5 mr-2 ${isFavorited ? 'fill-current' : ''}`} />
                  {t(isFavorited ? 'saved' : 'save')}
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center px-4 py-2 rounded-lg border border-lydian-border-light text-lydian-text-muted hover:bg-lydian-glass-dark">

                  <Share2 className="h-5 w-5 mr-2" />
                  {t('share')}
                </button>

                <button
                  onClick={() => setShowWriteReview(true)}
                  className="flex items-center px-6 py-2 bg-lydian-primary text-lydian-text-inverse rounded-lg hover:bg-lydian-primary-dark">

                  <Star className="h-5 w-5 mr-2" />
                  {t('writeReview')}
                </button>
              </div>
            </div>

            {/* Photo Gallery */}
            {photos.length > 0 &&
            <div className="mb-8">
                <PhotoGallery
                photos={photos}
                locationName={locationName} />

              </div>
            }
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              {locationDescription &&
              <section className="bg-lydian-bg-hover rounded-lg p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-lydian-text-inverse mb-4">
                    {t('about')}
                  </h2>
                  <div className={`text-lydian-text-muted leading-relaxed ${showFullDescription ? '' : 'line-clamp-4'}`}>
                    <p>{locationDescription}</p>
                  </div>
                  {locationDescription.length > 300 &&
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-lydian-primary hover:text-lydian-primary-dark font-medium mt-2">

                      {showFullDescription ? t('showLess') : t('showMore')}
                    </button>
                }
                </section>
              }

              {/* Reviews Section */}
              <section className="bg-lydian-bg-hover rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-lydian-text-inverse">
                    {t('reviews')} ({location.total_reviews})
                  </h2>
                  {location.total_reviews > 0 &&
                  <div className="text-right">
                      <div className="text-3xl font-bold text-lydian-text-inverse">
                        {location.average_rating.toFixed(1)}
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) =>
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                        i < Math.floor(location.average_rating) ?
                        'text-yellow-400 fill-current' :
                        'text-lydian-text-dim'}`
                        } />

                      )}
                      </div>
                    </div>
                  }
                </div>
                
                <ReviewsList
                  reviews={reviews}
                  language={locale} />

                
                {/* External Platform Reviews */}
                {(externalReviews.google.length > 0 || externalReviews.tripadvisor.length > 0) &&
                <div className="mt-8 space-y-6">
                    <h3 className="text-xl font-semibold text-lydian-text-inverse">
                      {t('externalReviews', 'Reviews from Other Platforms')}
                    </h3>
                    
                    {/* Google Reviews */}
                    {externalReviews.google.length > 0 &&
                  <ExternalPlatformReviews
                    reviews={externalReviews.google}
                    platform="google"
                    totalReviews={15} // Mock data
                    averageRating={4.2} // Mock data
                  />
                  }
                    
                    {/* TripAdvisor Reviews */}
                    {externalReviews.tripadvisor.length > 0 &&
                  <ExternalPlatformReviews
                    reviews={externalReviews.tripadvisor}
                    platform="tripadvisor"
                    totalReviews={8} // Mock data
                    averageRating={4.5} // Mock data
                  />
                  }
                  </div>
                }
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <div className="bg-lydian-bg-hover rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-lydian-text-inverse mb-4">
                  {t('quickInfo')}
                </h3>
                
                {/* Opening Hours */}
                {location.opening_hours &&
                <div className="mb-4">
                    <h4 className="font-medium text-lydian-text-inverse mb-2 flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {t('openingHours')}
                    </h4>
                    <div className="space-y-1 text-sm text-lydian-text-dim">
                      {Object.entries(location.opening_hours).map(([day, hours]: [string, any]) =>
                    <div key={day} className="flex justify-between">
                          <span className="capitalize">{t(day)}</span>
                          <span>
                            {hours.closed ? t('closed') : `${hours.open} - ${hours.close}`}
                          </span>
                        </div>
                    )}
                    </div>
                  </div>
                }

                {/* Features */}
                {location.features && location.features.length > 0 &&
                <div>
                    <h4 className="font-medium text-lydian-text-inverse mb-2">
                      {t('amenities')}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {location.features.map((feature) =>
                    <span
                      key={feature}
                      className="px-2 py-1 bg-lydian-glass-dark-medium text-lydian-text-muted text-xs rounded">

                          {t(`features.${feature}`, feature.replace('_', ' '))}
                        </span>
                    )}
                    </div>
                  </div>
                }
              </div>

              {/* External Platforms */}
              {(location.google_place_id || location.tripadvisor_id) &&
              <div className="bg-lydian-bg-hover rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-lydian-text-inverse mb-4">
                    {t('externalPlatforms', 'External Platforms')}
                  </h3>
                  <div className="space-y-3">
                    {/* Google My Business */}
                    {location.google_place_id &&
                  <div className="flex items-center justify-between p-3 border border-lydian-border-light/10 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-lydian-error-light rounded-full flex items-center justify-center mr-3">
                            <Globe className="h-4 w-4 text-lydian-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-lydian-text-inverse">Google My Business</p>
                            <p className="text-sm text-lydian-text-dim">
                              {syncStatus.google?.success ?
                          <span className="flex items-center text-lydian-success">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Last synced
                                </span> :
                          syncStatus.google?.error ?
                          <span className="flex items-center text-lydian-primary">
                                  <AlertCircle className="h-3 w-3 mr-1" />
                                  Sync failed
                                </span> :

                          'Ready to sync'
                          }
                            </p>
                          </div>
                        </div>
                        <button
                      onClick={handleGoogleSync}
                      disabled={syncingGoogle}
                      className="flex items-center px-3 py-1.5 bg-lydian-primary text-lydian-text-inverse text-sm rounded-md hover:bg-lydian-primary-dark disabled:opacity-50">

                          <RefreshCw className={`h-3 w-3 mr-1 ${syncingGoogle ? 'animate-spin' : ''}`} />
                          {syncingGoogle ? 'Syncing...' : 'Sync'}
                        </button>
                      </div>
                  }
                    
                    {/* TripAdvisor */}
                    {location.tripadvisor_id &&
                  <div className="flex items-center justify-between p-3 border border-lydian-border-light/10 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-lydian-success-light rounded-full flex items-center justify-center mr-3">
                            <Globe className="h-4 w-4 text-lydian-success" />
                          </div>
                          <div>
                            <p className="font-medium text-lydian-text-inverse">TripAdvisor</p>
                            <p className="text-sm text-lydian-text-dim">
                              {syncStatus.tripAdvisor?.success ?
                          <span className="flex items-center text-lydian-success">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Last synced
                                </span> :
                          syncStatus.tripAdvisor?.error ?
                          <span className="flex items-center text-lydian-primary">
                                  <AlertCircle className="h-3 w-3 mr-1" />
                                  Sync failed
                                </span> :

                          'Ready to sync'
                          }
                            </p>
                          </div>
                        </div>
                        <button
                      onClick={handleTripAdvisorSync}
                      disabled={syncingTripAdvisor}
                      className="flex items-center px-3 py-1.5 bg-lydian-success text-lydian-text-inverse text-sm rounded-md hover:bg-lydian-success-hover disabled:opacity-50">

                          <RefreshCw className={`h-3 w-3 mr-1 ${syncingTripAdvisor ? 'animate-spin' : ''}`} />
                          {syncingTripAdvisor ? 'Syncing...' : 'Sync'}
                        </button>
                      </div>
                  }
                    
                    <p className="text-xs text-lydian-text-muted mt-2">
                      {t('syncDescription', 'Sync reviews and ratings from external platforms to keep your listing up-to-date.')}
                    </p>
                  </div>
                </div>
              }

              {/* Map */}
              <div className="bg-lydian-bg-hover rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-lydian-text-inverse mb-4">
                  {t('location')}
                </h3>
                <LocationMap
                  coordinates={location.coordinates}
                  locationName={locationName}
                  address={locationAddress} />

              </div>

              {/* Nearby Locations */}
              {nearbyLocations.length > 0 &&
              <div className="bg-lydian-bg-hover rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-lydian-text-inverse mb-4">
                    {t('nearbyLocations')}
                  </h3>
                  <div className="space-y-3">
                    {nearbyLocations.slice(0, 5).map((nearby) =>
                  <a
                    key={nearby.id}
                    href={`/location/${nearby.slug}`}
                    className="block p-3 rounded-lg border border-lydian-border-light/10 hover:bg-lydian-glass-dark">

                        <h4 className="font-medium text-lydian-text-inverse truncate">
                          {getLocalizedContent(nearby.name)}
                        </h4>
                        <div className="flex items-center text-sm text-lydian-text-dim mt-1">
                          {nearby.average_rating > 0 &&
                      <div className="flex items-center mr-3">
                              <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                              {nearby.average_rating.toFixed(1)}
                            </div>
                      }
                          <span>{getLocalizedContent(nearby.category?.name)}</span>
                        </div>
                      </a>
                  )}
                  </div>
                </div>
              }
            </div>
          </div>
        </div>

        {/* Write Review Modal */}
        {showWriteReview &&
        <WriteReviewModal
          locationId={location.id}
          locationName={locationName}
          onClose={() => setShowWriteReview(false)}
          onSuccess={() => {
            setShowWriteReview(false);
            // Refresh reviews
            window.location.reload();
          }} />

        }
      </main>
    </>);

}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug, locale = 'en' } = context.query;

  if (!slug || !Array.isArray(slug)) {
    return { notFound: true };
  }

  const locationSlug = slug[slug.length - 1]; // Get the last part of the slug

  try {
    // Fetch location data
    const location = await reviewService.getLocationBySlug(locationSlug, locale as string);

    // Fetch reviews
    const reviews = await reviewService.getReviews(location.id, 1, 10, locale as string);

    // Fetch photos
    const photos = await reviewService.getLocationPhotos(location.id, 1, 20);

    // Fetch nearby locations
    const nearbyLocations = await reviewService.getNearbyLocations(
      location.coordinates.lat,
      location.coordinates.lng,
      5, // 5km radius
      10 // limit
    );

    return {
      props: {
        location,
        reviews,
        photos,
        nearbyLocations,
        locale,
        ...(await serverSideTranslations(locale as string, ['common', 'location']))
      }
    };
  } catch (error) {
    logger.error('Error fetching location data:', error as Error, { component: 'Slug' });
    return { notFound: true };
  }
};