import { Metadata } from 'next';
import Link from 'next/link';
import {
  MapPin, Clock, Shield, Star, CheckCircle, Phone,
  Users, Car, Zap, Award, TrendingUp, MessageCircle
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Antalya Airport Transfer - Safe & Reliable 24/7 Service | 30% Off',
  description: '✅ Antalya Airport Transfer to Alanya, Belek, Side, Kemer ✓ 24/7 Service ✓ VIP Vehicles ✓ Online Booking ✓ 30% Early Booking Discount. Book Now & Save!',
  keywords: [
    'antalya airport transfer',
    'alanya transfer service',
    'belek airport transfer',
    'side transfer',
    'kemer airport shuttle',
    'vip airport transfer antalya',
    'airport transfer prices',
    'book antalya transfer'
  ],
  alternates: {
    canonical: 'https://travel.ailydian.com/en/antalya-airport-transfer',
    languages: {
      'tr': 'https://travel.ailydian.com/tr/antalya-havalimani-transfer',
      'ru': 'https://travel.ailydian.com/ru/transfer-antalya',
      'de': 'https://travel.ailydian.com/de/antalya-flughafentransfer',
      'fr': 'https://travel.ailydian.com/fr/transfert-aeroport-antalya'
    }
  },
  openGraph: {
    title: 'Antalya Airport Transfer - Most Trusted Service 2025',
    description: 'Safe and comfortable 24/7 airport transfer service from Antalya Airport to all destinations. VIP vehicles, professional drivers, 30% discount!',
    url: 'https://travel.ailydian.com/en/antalya-airport-transfer',
    siteName: 'Ailydian Travel',
    locale: 'en_US',
    type: 'website',
  }
};

const destinations = [
  { name: 'Alanya', distance: '135 km', duration: '2 hours', price: '€45', image: '/alanya.jpg' },
  { name: 'Belek', distance: '35 km', duration: '40 min', price: '€25', image: '/belek.jpg' },
  { name: 'Side', distance: '65 km', duration: '1 hour', price: '€30', image: '/side.jpg' },
  { name: 'Kemer', distance: '45 km', duration: '50 min', price: '€28', image: '/kemer.jpg' },
  { name: 'Lara', distance: '15 km', duration: '20 min', price: '€18', image: '/lara.jpg' },
  { name: 'Kundu', distance: '18 km', duration: '25 min', price: '€20', image: '/kundu.jpg' }
];

const features = [
  { icon: Clock, title: '24/7 Service', description: 'Non-stop transfer service day and night' },
  { icon: Shield, title: 'Safe Travel', description: 'Licensed vehicles and professional drivers' },
  { icon: Star, title: '5 Star Rating', description: '10,000+ satisfied customer reviews' },
  { icon: Users, title: 'Group Transfers', description: 'VIP vehicles for 8-16 passengers' },
  { icon: Car, title: 'Luxury Vehicles', description: 'Mercedes, BMW, Volkswagen fleet' },
  { icon: Zap, title: 'Quick Booking', description: 'Book online in just 3 minutes' }
];

const reviews = [
  {
    name: 'James Anderson',
    rating: 5,
    date: 'December 18, 2024',
    comment: 'Excellent service from Antalya Airport to Belek! Clean Mercedes vehicle, friendly driver, and very professional. Highly recommended for families!'
  },
  {
    name: 'Emma Thompson',
    rating: 5,
    date: 'December 12, 2024',
    comment: 'Best airport transfer experience ever! Driver was waiting with our name sign, helped with luggage, and the car was spotless. Will definitely use again!'
  },
  {
    name: 'Michael Brown',
    rating: 5,
    date: 'December 8, 2024',
    comment: 'Perfect transfer to Alanya. Driver tracked our flight delay and was still waiting when we arrived. Very professional and comfortable ride.'
  }
];

const faqs = [
  {
    question: 'How much is transfer from Antalya airport to Alanya?',
    answer: 'Standard transfer from Antalya Airport to Alanya starts at €45. VIP vehicles cost €65, and group transfers for 8 passengers are €85. You can save 30% with early booking!'
  },
  {
    question: 'How to book airport transfer?',
    answer: 'You can book in just 3 minutes using our online booking form. Simply enter your flight details, destination, and passenger count. You\'ll receive instant email confirmation.'
  },
  {
    question: 'What happens if my flight is delayed?',
    answer: 'Our flight tracking system automatically monitors delays. Your driver will wait for you at no extra charge. Our 24/7 support team is always available to assist you.'
  },
  {
    question: 'Are vehicles air-conditioned?',
    answer: 'Yes! All our vehicles are air-conditioned, clean, and well-maintained. We use Mercedes, BMW, and Volkswagen vehicles equipped for maximum comfort, with WiFi and complimentary water.'
  },
  {
    question: 'What vehicle sizes are available?',
    answer: 'We offer sedans for 1-3 passengers, minivans for 4-6 passengers, and VIP minibuses for 8-16 passengers. All vehicles have ample luggage space.'
  },
  {
    question: 'Do you provide baby seats?',
    answer: 'Yes, we provide free baby seats upon request. Simply mention your baby seat requirement when making your reservation.'
  },
  {
    question: 'How do I pay?',
    answer: 'You can pay online via credit card, PayPal, or in the vehicle with cash/card. All payments are secured with SSL encryption. We accept €, $, and ₺.'
  },
  {
    question: 'What is the cancellation policy?',
    answer: 'Free cancellation up to 24 hours before transfer time. Cancellations within 24 hours incur a 50% fee. Full refund for airline-caused cancellations.'
  },
  {
    question: 'How will I be met at the airport?',
    answer: 'Your driver will wait at the arrivals terminal with a sign displaying your name. You\'ll find them easily at the baggage claim exit. WhatsApp contact is also available.'
  },
  {
    question: 'What is the difference between VIP and standard transfer?',
    answer: 'VIP transfers include luxury vehicles (Mercedes E/S Class, BMW 5/7 Series), personalized meet & greet, cold beverages, and maximum comfort. Extra luggage space and WiFi are guaranteed.'
  },
  {
    question: 'Is travel insurance included?',
    answer: 'Yes, all our vehicles are fully insured with comprehensive coverage. Passengers are protected during the entire journey.'
  },
  {
    question: 'Can I add extra stops?',
    answer: 'Yes! You can add stops for an additional fee. Popular stops include supermarkets, ATMs, or quick photo opportunities. Just let us know when booking.'
  },
  {
    question: 'Do you accept credit cards?',
    answer: 'Yes, we accept all major credit cards: Visa, Mastercard, American Express. Online payments are processed through secure PayPal gateway.'
  },
  {
    question: 'Is WiFi available in vehicles?',
    answer: 'WiFi is available in all VIP vehicles and most standard vehicles. Let us know if you specifically need WiFi when booking.'
  },
  {
    question: 'Can I book for someone else?',
    answer: 'Absolutely! You can book and pay for transfers for family or friends. Just provide their contact details and flight information during booking.'
  }
];

export default function AntalyaAirportTransferPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Ailydian Transfer - Antalya Airport Transfer',
            description: 'Antalya Airport Transfer Service - Alanya, Belek, Side, Kemer',
            url: 'https://travel.ailydian.com/en/antalya-airport-transfer',
            telephone: '+90-242-123-4567',
            priceRange: '€€',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Antalya',
              addressCountry: 'TR'
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '10247',
              bestRating: '5',
              worstRating: '1'
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 36.8987,
              longitude: 30.7854
            },
            areaServed: ['Alanya', 'Belek', 'Side', 'Kemer', 'Lara', 'Antalya']
          })
        }}
      />

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
                text: faq.answer
              }
            }))
          })
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-yellow-400 text-blue-900 px-4 py-2 rounded-full text-sm font-bold mb-4">
              🔥 30% OFF Early Booking Discount!
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Antalya Airport Transfer - Most Trusted Service 2025
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Alanya • Belek • Side • Kemer • 24/7 Service • VIP Vehicles • Instant Booking
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="#booking"
                className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all transform hover:scale-105 flex items-center gap-2"
              >
                <Car className="w-6 h-6" />
                BOOK NOW
              </Link>
              <Link
                href="#prices"
                className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/30 transition-all flex items-center gap-2 border-2 border-white"
              >
                <TrendingUp className="w-6 h-6" />
                VIEW PRICES
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                <span>4.9/5 • 10,247 Reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>100% Safe</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Why Choose Ailydian Transfer?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-blue-50 hover:bg-blue-100 transition-all">
                <feature.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations & Pricing */}
      <section id="prices" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            Antalya Airport Transfer Prices 2025
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Fixed prices for all destinations • No hidden fees
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {destinations.map((dest, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">{dest.name}</h3>
                    <div className="text-3xl font-bold text-blue-600">{dest.price}</div>
                  </div>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span>Distance: {dest.distance}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <span>Duration: {dest.duration}</span>
                    </div>
                  </div>
                  <Link
                    href={`#booking?destination=${dest.name}`}
                    className="mt-6 block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                  >
                    BOOK NOW
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Customer Reviews & Testimonials
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{review.comment}"</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-gray-900">{review.name}</span>
                  <span className="text-gray-500">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <summary className="font-bold text-lg cursor-pointer text-gray-900 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  {faq.question}
                </summary>
                <p className="mt-4 text-gray-600 pl-7">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="booking" className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Book Now - Get 30% Off Your Transfer!
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Book online in 3 minutes • Instant confirmation • 24/7 support
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/booking"
              className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all transform hover:scale-105 flex items-center gap-2"
            >
              <Car className="w-6 h-6" />
              BOOK NOW
            </Link>
            <a
              href="https://wa.me/902421234567"
              className="bg-green-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition-all flex items-center gap-2"
            >
              <Phone className="w-6 h-6" />
              WHATSAPP CONTACT
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
