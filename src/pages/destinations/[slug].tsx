import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Star,
  Calendar,
  Clock,
  Users,
  Heart,
  Share2,
  Check,
  Info,
  TrendingUp,
  Thermometer,
  Plane,
  Car,
  Hotel,
  Utensils,
  Camera,
  AlertCircle,
  ChevronRight,
  Globe,
  DollarSign,
  Navigation
} from 'lucide-react';
import ResponsiveHeaderBar from '../../components/layout/ResponsiveHeaderBar';
import {
  Destination,
  DESTINATIONS_TURKEY,
  getAllDestinationSlugs,
  getDestinationBySlug,
  getDestinationById
} from '../../data/destinations-turkey';
import { EXPERIENCES_TURKEY, getExperiencesByDestination } from '../../data/experiences-turkey';

interface DestinationDetailProps {
  destination: Destination;
  relatedDestinations: Destination[];
  experiences: typeof EXPERIENCES_TURKEY;
}

export default function DestinationDetail({ destination, relatedDestinations, experiences }: DestinationDetailProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'places' | 'activities' | 'tips'>('overview');

  // Combine hero and gallery images for consistent rendering
  const allImages = [destination.images.hero, ...destination.images.gallery];

  // Schema.org structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "name": destination.name,
    "description": destination.description,
    "image": destination.images.hero,
    "url": `https://travel.lydian.com/destinations/${destination.slug}`,
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": destination.coordinates.lat,
      "longitude": destination.coordinates.lng
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": destination.country,
      "addressRegion": destination.region
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": destination.rating,
      "reviewCount": destination.reviews,
      "bestRating": 5,
      "worstRating": 1
    },
    "tourBookingPage": `https://travel.lydian.com/destinations/${destination.slug}`
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: destination.name,
          text: destination.shortDescription,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link kopyalandı!');
    }
  };

  return (
    <>
      <Head>
        <title>{destination.seo.title}</title>
        <meta name="description" content={destination.seo.description} />
        <meta name="keywords" content={destination.seo.keywords.join(', ')} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://travel.lydian.com/destinations/${destination.slug}`} />
        <meta property="og:title" content={destination.seo.title} />
        <meta property="og:description" content={destination.seo.description} />
        <meta property="og:image" content={destination.seo.ogImage} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://travel.lydian.com/destinations/${destination.slug}`} />
        <meta property="twitter:title" content={destination.seo.title} />
        <meta property="twitter:description" content={destination.seo.description} />
        <meta property="twitter:image" content={destination.seo.ogImage} />

        {/* Canonical URL */}
        <link rel="canonical" href={`https://travel.lydian.com/destinations/${destination.slug}`} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <ResponsiveHeaderBar />

      <main className="pt-16 bg-white/5 min-h-screen">
        {/* Hero Section with Gallery */}
        <section className="relative h-[500px] bg-black">
          <Image
            src={allImages[selectedImageIndex]}
            alt={destination.name}
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

          {/* Image Gallery Thumbnails */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
            {allImages.slice(0, 5).map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImageIndex === idx ? 'border-white scale-110' : 'border-transparent opacity-70'
                }`}
              >
                <Image src={img} alt="" width={64} height={64} className="object-cover w-full h-full" />
              </button>
            ))}
          </div>

          {/* Overlay Content */}
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
              <div className="flex items-end justify-between">
                <div className="text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5" />
                    <span className="text-lg">{destination.region}, {destination.country}</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-3">{destination.name}</h1>
                  <p className="text-xl text-gray-200 mb-4">{destination.shortDescription}</p>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="font-semibold">{destination.rating}</span>
                      <span className="text-gray-300">({destination.reviews.toLocaleString()} değerlendirme)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-5 h-5" />
                      <span>{destination.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                  >
                    <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                  >
                    <Share2 className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Info Bar - Premium Tab Menu */}
        <section className="bg-gradient-to-r from-gray-50 to-white border-b border-white/10 sticky top-16 z-10 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab('overview')}
                  className={`relative px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                    activeTab === 'overview'
                      ? 'bg-gradient-to-r from-lydian-primary to-lydian-secondary text-white shadow-lg shadow-red-500/30'
                      : 'bg-white/5 text-gray-200 hover:bg-white/5 border border-white/10 hover:border-lydian-primary/50'
                  }`}
                >
                  <span className="relative z-10">Genel Bakış</span>
                  {activeTab === 'overview' && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-lydian-primary to-lydian-secondary rounded-xl"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab('places')}
                  className={`relative px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                    activeTab === 'places'
                      ? 'bg-gradient-to-r from-lydian-primary to-lydian-secondary text-white shadow-lg shadow-red-500/30'
                      : 'bg-white/5 text-gray-200 hover:bg-white/5 border border-white/10 hover:border-lydian-primary/50'
                  }`}
                >
                  <span className="relative z-10">Gezilecek Yerler</span>
                  {activeTab === 'places' && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-lydian-primary to-lydian-secondary rounded-xl"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab('activities')}
                  className={`relative px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                    activeTab === 'activities'
                      ? 'bg-gradient-to-r from-lydian-primary to-lydian-secondary text-white shadow-lg shadow-red-500/30'
                      : 'bg-white/5 text-gray-200 hover:bg-white/5 border border-white/10 hover:border-lydian-primary/50'
                  }`}
                >
                  <span className="relative z-10">Aktiviteler</span>
                  {activeTab === 'activities' && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-lydian-primary to-lydian-secondary rounded-xl"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab('tips')}
                  className={`relative px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                    activeTab === 'tips'
                      ? 'bg-gradient-to-r from-lydian-primary to-lydian-secondary text-white shadow-lg shadow-red-500/30'
                      : 'bg-white/5 text-gray-200 hover:bg-white/5 border border-white/10 hover:border-lydian-primary/50'
                  }`}
                >
                  <span className="relative z-10">İpuçları</span>
                  {activeTab === 'tips' && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-lydian-primary to-lydian-secondary rounded-xl"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm text-gray-300">Ortalama Bütçe</div>
                  <div className="text-xl font-bold text-lydian-primary">{destination.pricing.budgetRange}</div>
                </div>
                <Link
                  href={`/tours?destination=${destination.id}`}
                  className="px-6 py-3 bg-lydian-primary text-white rounded-lg font-semibold hover:bg-lydian-dark transition-colors"
                >
                  Turları İncele
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  {/* Description */}
                  <div className="bg-transparent rounded-2xl shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-white mb-4">Hakkında</h2>
                    <p className="text-gray-200 leading-relaxed">{destination.description}</p>
                  </div>

                  {/* Highlights */}
                  <div className="bg-transparent rounded-2xl shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-white mb-4">Öne Çıkanlar</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {destination.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-200">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Activities */}
                  <div className="bg-transparent rounded-2xl shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-white mb-4">Aktiviteler</h2>
                    <div className="flex flex-wrap gap-2">
                      {destination.activities.map((activity, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Food & Drink */}
                  <div className="bg-transparent rounded-2xl shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                      <Utensils className="w-6 h-6 text-lydian-primary" />
                      Yerel Lezzetler
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {destination.foodAndDrink.map((food, idx) => (
                        <div key={idx} className="text-center p-3 bg-orange-50 rounded-lg">
                          <span className="text-gray-100 font-medium">{food}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'places' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {destination.mustSee.map((place, idx) => (
                    <div key={idx} className="bg-transparent rounded-2xl shadow-sm p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2">{place.name}</h3>
                          <p className="text-gray-200">{place.description}</p>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-sm text-gray-300">Giriş</div>
                          <div className="font-semibold text-lydian-primary">{place.entrance}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-300">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{place.estimatedTime}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'activities' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {experiences.slice(0, 4).map((exp) => (
                    <Link
                      key={exp.id}
                      href={`/experiences/${exp.slug}`}
                      className="bg-transparent rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="relative h-48">
                        <Image src={exp.images.hero} alt={exp.title} fill className="object-cover" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-white mb-2 line-clamp-2">{exp.title}</h3>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-300">{exp.duration}</span>
                          <span className="font-bold text-lydian-primary">₺{exp.pricing.adult}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}

              {activeTab === 'tips' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-transparent rounded-2xl shadow-sm p-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <AlertCircle className="w-6 h-6 text-lydian-primary" />
                    Seyahat İpuçları
                  </h2>
                  <div className="space-y-4">
                    {destination.tips.map((tip, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-100">{tip}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Weather Info */}
              <div className="bg-transparent rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-lydian-primary" />
                  İklim Bilgisi
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Yaz:</span>
                    <span className="font-medium">{destination.climate.summer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Kış:</span>
                    <span className="font-medium">{destination.climate.winter}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">İlkbahar:</span>
                    <span className="font-medium">{destination.climate.spring}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Sonbahar:</span>
                    <span className="font-medium">{destination.climate.autumn}</span>
                  </div>
                </div>
              </div>

              {/* Best Time to Visit */}
              <div className="bg-transparent rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-lydian-primary" />
                  En İyi Ziyaret Zamanı
                </h3>
                <div className="flex flex-wrap gap-2">
                  {destination.bestTime.map((month, idx) => (
                    <span key={idx} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {month}
                    </span>
                  ))}
                </div>
              </div>

              {/* Transportation */}
              <div className="bg-transparent rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Car className="w-5 h-5 text-lydian-primary" />
                  Ulaşım
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-300 mb-1">İstanbul'dan:</div>
                    <div className="font-medium">{destination.transportation.fromIstanbul}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-300 mb-1">Ankara'dan:</div>
                    <div className="font-medium">{destination.transportation.fromAnkara}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-300 mb-1">Şehir içi:</div>
                    <div className="flex flex-wrap gap-1">
                      {destination.transportation.local.map((transport, idx) => (
                        <span key={idx} className="px-2 py-1 bg-white/10 rounded text-sm">{transport}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Budget Info */}
              <div className="bg-transparent rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Hotel className="w-5 h-5 text-lydian-primary" />
                  Konaklama Fiyatları
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Ekonomik:</span>
                    <span className="font-medium">₺{destination.accommodation.budget}/gece</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Orta:</span>
                    <span className="font-medium">₺{destination.accommodation.midRange}/gece</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Lüks:</span>
                    <span className="font-medium">₺{destination.accommodation.luxury}/gece</span>
                  </div>
                </div>
              </div>

              {/* Accessibility */}
              <div className="bg-transparent rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-white mb-4">Erişilebilirlik</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {destination.accessibility.wheelchairFriendly ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <span className="w-5 h-5" />
                    )}
                    <span className={destination.accessibility.wheelchairFriendly ? 'text-white' : 'text-gray-400'}>
                      Tekerlekli Sandalye
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {destination.accessibility.publicTransport ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <span className="w-5 h-5" />
                    )}
                    <span className={destination.accessibility.publicTransport ? 'text-white' : 'text-gray-400'}>
                      Toplu Taşıma
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {destination.accessibility.englishSpoken ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <span className="w-5 h-5" />
                    )}
                    <span className={destination.accessibility.englishSpoken ? 'text-white' : 'text-gray-400'}>
                      İngilizce Konuşulur
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Destinations */}
        {relatedDestinations.length > 0 && (
          <section className="bg-transparent py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-white mb-8">Benzer Destinasyonlar</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedDestinations.map((dest) => (
                  <Link
                    key={dest.id}
                    href={`/destinations/${dest.slug}`}
                    className="group bg-transparent rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all"
                  >
                    <div className="relative h-48">
                      <Image src={dest.images.hero} alt={dest.name} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{dest.name}</h3>
                      <p className="text-gray-300 mb-4">{dest.shortDescription}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-semibold">{dest.rating}</span>
                        </div>
                        <span className="text-lydian-primary font-semibold flex items-center gap-1">
                          İncele <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllDestinationSlugs();
  const paths = slugs.map((slug) => ({
    params: { slug }
  }));

  return {
    paths,
    fallback: false // No 404s - all paths are pre-generated
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const destination = getDestinationBySlug(slug);

  if (!destination) {
    return {
      notFound: true
    };
  }

  // Get related destinations
  const relatedDestinations = destination.relatedDestinations
    .map(id => getDestinationById(id))
    .filter((d): d is Destination => d !== undefined);

  // Get experiences for this destination
  const experiences = getExperiencesByDestination(destination.id);

  return {
    props: {
      destination,
      relatedDestinations,
      experiences
    },
    revalidate: 3600 // Revalidate every hour
  };
};
