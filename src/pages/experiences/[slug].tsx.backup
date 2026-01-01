import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Star,
  Clock,
  Users,
  Heart,
  Share2,
  Check,
  X,
  Calendar,
  Globe,
  Shield,
  Info,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  DollarSign } from
'lucide-react';
import ResponsiveHeaderBar from '../../components/layout/ResponsiveHeaderBar';
import {
  Experience,
  EXPERIENCES_TURKEY,
  getAllExperienceSlugs,
  getExperienceBySlug,
  getExperiencesByCategory } from
'../../data/experiences-turkey';
import { getDestinationById } from '../../data/destinations-turkey';
import logger from '../../lib/logger';

interface ExperienceDetailProps {
  experience: Experience;
  relatedExperiences: Experience[];
}

export default function ExperienceDetail({ experience, relatedExperiences }: ExperienceDetailProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  // Combine hero and gallery images for consistent rendering
  const allImages = [experience.images.hero, ...experience.images.gallery];

  const destination = getDestinationById(experience.destinationId);

  const totalPrice = adults * experience.pricing.adult + children * experience.pricing.child;
  const discount = experience.originalPrice ? experience.originalPrice - experience.pricing.adult : 0;
  const discountPercentage = experience.originalPrice ?
  Math.round(discount / experience.originalPrice * 100) :
  0;

  // Schema.org structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": experience.title,
    "description": experience.description,
    "image": experience.images.hero,
    "url": `https://holiday.ailydian.com/experiences/${experience.slug}`,
    "provider": {
      "@type": "Organization",
      "name": "AILYDIAN Holiday"
    },
    "offers": {
      "@type": "Offer",
      "price": experience.pricing.adult,
      "priceCurrency": experience.pricing.currency,
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": experience.rating,
      "reviewCount": experience.reviewCount,
      "bestRating": 5,
      "worstRating": 1
    },
    "duration": `PT${experience.durationMinutes}M`,
    "touristType": experience.category
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: experience.title,
          text: experience.shortDescription,
          url: window.location.href
        });
      } catch (err) {
        logger.debug('Share cancelled', { component: 'Slug' });
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link kopyalandı!');
    }
  };

  const handleBooking = () => {
    const bookingData = {
      type: 'experience',
      id: experience.id,
      title: experience.title,
      date: selectedDate,
      adults,
      children,
      totalPrice,
      image: experience.images.hero
    };
    localStorage.setItem('pendingBooking', JSON.stringify(bookingData));
    window.location.href = '/reservation';
  };

  return (
    <>
      <Head>
        <title>{experience.seo.title}</title>
        <meta name="description" content={experience.seo.description} />
        <meta name="keywords" content={experience.seo.keywords.join(', ')} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://holiday.ailydian.com/experiences/${experience.slug}`} />
        <meta property="og:title" content={experience.seo.title} />
        <meta property="og:description" content={experience.seo.description} />
        <meta property="og:image" content={experience.seo.ogImage} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={experience.seo.title} />
        <meta property="twitter:description" content={experience.seo.description} />
        <meta property="twitter:image" content={experience.seo.ogImage} />

        <link rel="canonical" href={`https://holiday.ailydian.com/experiences/${experience.slug}`} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      </Head>

      <ResponsiveHeaderBar />

      <main className="pt-16 bg-lydian-glass-dark min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[400px] bg-black">
          <Image
            src={allImages[selectedImageIndex]}
            alt={experience.title}
            fill
            className="object-cover opacity-80"
            priority />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

          {/* Gallery Thumbnails */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
            {allImages.slice(0, 5).map((img, idx) =>
            <button
              key={idx}
              onClick={() => setSelectedImageIndex(idx)}
              className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
              selectedImageIndex === idx ? 'border-white scale-110' : 'border-transparent opacity-70'}`
              }>

                <Image src={img} alt="" width={64} height={64} className="object-cover w-full h-full" />
              </button>
            )}
          </div>

          {/* Overlay Content */}
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
              <div className="flex items-end justify-between">
                <div className="text-lydian-text-inverse flex-1">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {discountPercentage > 0 &&
                    <span className="px-3 py-1 bg-lydian-error rounded-full text-sm font-bold">
                        %{discountPercentage} İndirim
                      </span>
                    }
                    <span className="px-3 py-1 bg-lydian-glass-dark-heavy backdrop-blur-sm rounded-full text-sm">
                      {experience.category}
                    </span>
                    <span className="px-3 py-1 bg-lydian-glass-dark-heavy backdrop-blur-sm rounded-full text-sm">
                      {experience.difficulty}
                    </span>
                  </div>

                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{experience.title}</h1>

                  <div className="flex flex-wrap items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-5 h-5" />
                      <span>{experience.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="font-semibold">{experience.rating}</span>
                      <span className="text-lydian-text-dim">({experience.reviewCount} yorum)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-5 h-5" />
                      <span>{experience.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="p-3 bg-lydian-glass-dark-heavy backdrop-blur-sm rounded-full hover:bg-lydian-bg/30">

                    <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                  </button>
                  <button onClick={handleShare} className="p-3 bg-lydian-glass-dark-heavy backdrop-blur-sm rounded-full hover:bg-lydian-bg/30">
                    <Share2 className="w-6 h-6 text-lydian-text-inverse" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div className="bg-lydian-bg-hover rounded-2xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-lydian-text-inverse mb-4">Açıklama</h2>
                <p className="text-lydian-text-muted leading-relaxed">{experience.description}</p>
              </div>

              {/* Highlights */}
              <div className="bg-lydian-bg-hover rounded-2xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-lydian-text-inverse mb-4">Öne Çıkanlar</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {experience.highlights.map((highlight, idx) =>
                  <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-lydian-success flex-shrink-0 mt-0.5" />
                      <span className="text-lydian-text-muted">{highlight}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Itinerary */}
              {experience.itinerary.length > 0 &&
              <div className="bg-lydian-bg-hover rounded-2xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-lydian-text-inverse mb-6">Program</h2>
                  <div className="space-y-4">
                    {experience.itinerary.map((item, idx) =>
                  <div key={idx} className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 rounded-full bg-lydian-primary/10 flex items-center justify-center">
                            <span className="text-lydian-primary font-bold">{item.time}</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lydian-text-inverse mb-1">{item.activity}</h3>
                          <p className="text-lydian-text-dim text-sm">{item.description}</p>
                        </div>
                      </div>
                  )}
                  </div>
                </div>
              }

              {/* Included/Excluded */}
              <div className="bg-lydian-bg-hover rounded-2xl shadow-sm p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-bold text-lydian-text-inverse mb-4">Dahil Olanlar</h3>
                    <div className="space-y-2">
                      {experience.included.map((item, idx) =>
                      <div key={idx} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-lydian-success flex-shrink-0 mt-0.5" />
                          <span className="text-lydian-text-muted text-sm">{item}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-lydian-text-inverse mb-4">Dahil Olmayanlar</h3>
                    <div className="space-y-2">
                      {experience.excluded.map((item, idx) =>
                      <div key={idx} className="flex items-start gap-2">
                          <X className="w-5 h-5 text-lydian-primary flex-shrink-0 mt-0.5" />
                          <span className="text-lydian-text-muted text-sm">{item}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Cancellation Policy */}
              <div className="bg-lydian-primary-lighter rounded-2xl p-6">
                <h3 className="text-lg font-bold text-lydian-text-inverse mb-3 flex items-center gap-2">
                  <Info className="w-5 h-5 text-lydian-primary" />
                  İptal Politikası
                </h3>
                <p className="text-lydian-text-muted">
                  {experience.cancellationPolicy.freeCancellation ?
                  <>
                      <span className="font-semibold text-lydian-success-text">Ücretsiz iptal!</span> Aktivite başlangıcından {experience.cancellationPolicy.hoursBeforeStart} saat önce iptal ederseniz %{experience.cancellationPolicy.refundPercentage} iade alırsınız.
                    </> :

                  'İptal için lütfen müşteri hizmetleri ile iletişime geçin.'
                  }
                </p>
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div>
              <div className="bg-lydian-bg-hover rounded-2xl shadow-lg p-6 sticky top-24">
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-lydian-primary">₺{experience.pricing.adult}</span>
                    {experience.originalPrice &&
                    <span className="text-lg text-lydian-text-muted line-through">₺{experience.originalPrice}</span>
                    }
                  </div>
                  <span className="text-lydian-text-dim">kişi başı</span>
                </div>

                {/* Date Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-lydian-text-muted mb-2">
                    Tarih Seçin
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-lydian-border-light rounded-lg focus:ring-2 focus:ring-lydian-primary focus:border-lydian-border" />

                </div>

                {/* Participant Selection */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-lydian-text-inverse">Yetişkin</div>
                      <div className="text-sm text-lydian-text-dim">₺{experience.pricing.adult}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="w-8 h-8 rounded-full border border-lydian-border-light hover:bg-lydian-glass-dark-medium">

                        -
                      </button>
                      <span className="w-8 text-center font-semibold">{adults}</span>
                      <button
                        onClick={() => setAdults(Math.min(experience.groupSize.max, adults + 1))}
                        className="w-8 h-8 rounded-full border border-lydian-border-light hover:bg-lydian-glass-dark-medium">

                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-lydian-text-inverse">Çocuk</div>
                      <div className="text-sm text-lydian-text-dim">₺{experience.pricing.child}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="w-8 h-8 rounded-full border border-lydian-border-light hover:bg-lydian-glass-dark-medium">

                        -
                      </button>
                      <span className="w-8 text-center font-semibold">{children}</span>
                      <button
                        onClick={() => setChildren(Math.min(experience.groupSize.max - adults, children + 1))}
                        className="w-8 h-8 rounded-full border border-lydian-border-light hover:bg-lydian-glass-dark-medium">

                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Total Price */}
                <div className="border-t border-lydian-border-light/10 pt-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lydian-text-dim">Toplam</span>
                    <span className="text-2xl font-bold text-lydian-text-inverse">₺{totalPrice.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-lydian-text-muted">Vergi ve hizmet bedeli dahil</p>
                </div>

                {/* Book Button */}
                <button
                  onClick={handleBooking}
                  disabled={!selectedDate}
                  className="w-full py-4 bg-lydian-primary text-lydian-text-inverse rounded-lg font-semibold hover:bg-lydian-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed">

                  Rezervasyon Yap
                </button>

                {/* Additional Info */}
                <div className="mt-6 space-y-3 text-sm text-lydian-text-dim">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-lydian-success" />
                    <span>%100 Güvenli Ödeme</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-lydian-success" />
                    <span>Anında Onay</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-lydian-primary" />
                    <span>Diller: {experience.languages.join(', ')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-600" />
                    <span>Grup: {experience.groupSize.min}-{experience.groupSize.max} kişi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Experiences */}
        {relatedExperiences.length > 0 &&
        <section className="bg-lydian-bg-hover py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-lydian-text-inverse mb-8">Benzer Deneyimler</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedExperiences.map((exp) =>
              <Link
                key={exp.id}
                href={`/experiences/${exp.slug}`}
                className="group bg-lydian-bg-hover rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all">

                    <div className="relative h-48">
                      <Image src={exp.images.hero} alt={exp.title} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-lydian-text-inverse mb-2 line-clamp-2">{exp.title}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-semibold">{exp.rating}</span>
                        <span className="text-sm text-lydian-text-dim">({exp.reviewCount})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-lydian-text-dim">{exp.duration}</span>
                        <span className="text-lg font-bold text-lydian-primary">₺{exp.pricing.adult}</span>
                      </div>
                    </div>
                  </Link>
              )}
              </div>
            </div>
          </section>
        }
      </main>
    </>);

}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllExperienceSlugs();
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
  const experience = getExperienceBySlug(slug);

  if (!experience) {
    return {
      notFound: true
    };
  }

  // Get related experiences from the same category
  const relatedExperiences = getExperiencesByCategory(experience.category).
  filter((e) => e.id !== experience.id).
  slice(0, 3);

  return {
    props: {
      experience,
      relatedExperiences
    },
    revalidate: 3600
  };
};