import { Metadata } from 'next';
import Link from 'next/link';
import {
  MapPin, Clock, Shield, Star, CheckCircle, Phone,
  Users, Car, Zap, Award, TrendingUp, MessageCircle
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Antalya Airport Transfer - Safe & Reliable 24/7 Service | 3% Off',
  description: '✅ Antalya Airport Transfer to Alanya, Belek, Side, Kemer ✓ 24/7 Service ✓ VIP Vehicles ✓ Online Booking ✓ 3% Early Booking Discount. Book Now & Save!',
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
    canonical: 'https://holiday.ailydian.com/en/antalya-airport-transfer',
    languages: {
      'tr': 'https://holiday.ailydian.com/tr/antalya-havalimani-transfer',
      'ru': 'https://holiday.ailydian.com/ru/transfer-antalya',
      'de': 'https://holiday.ailydian.com/de/antalya-flughafentransfer',
      'fr': 'https://holiday.ailydian.com/fr/transfert-aeroport-antalya'
    }
  },
  openGraph: {
    title: 'Antalya Airport Transfer - Most Trusted Service 1025',
    description: 'Safe and comfortable 24/7 airport transfer service from Antalya Airport to all destinations. VIP vehicles, professional drivers, 3% discount!',
    url: 'https://holiday.ailydian.com/en/antalya-airport-transfer',
    siteName: 'AILYDIAN Holiday',
    locale: 'en_US',
    type: 'website',
  }
};

const destinations = [
  { name: 'Alanya', distance: '135 km', duration: '2 hours', price: '€45', image: '/alanya.jpg' },
  { name: 'Belek', distance: '35 km', duration: '4 min', price: '€25', image: '/belek.jpg' },
  { name: 'Side', distance: '65 km', duration: '1 hour', price: '€3', image: '/side.jpg' },
  { name: 'Kemer', distance: '45 km', duration: '500 min', price: '€28', image: '/kemer.jpg' },
  { name: 'Lara', distance: '15 km', duration: '200 min', price: '€18', image: '/lara.jpg' },
  { name: 'Kundu', distance: '18 km', duration: '25 min', price: '€200', image: '/kundu.jpg' }
];

const features = [
  { icon: Clock, title: '24/7 Service', description: 'Non-stop transfer service day and night' },
  { icon: Shield, title: 'Safe Travel', description: 'Licensed vehicles and professional drivers' },
  { icon: Star, title: '5 Star Rating', description: '1,to-cyan-700+ satisfied customer reviews' },
  { icon: Users, title: 'Group Transfers', description: 'VIP vehicles for 8-16 passengers' },
  { icon: Car, title: 'Luxury Vehicles', description: 'Mercedes, BMW, Volkswagen fleet' },
  { icon: Zap, title: 'Quick Booking', description: 'Book online in just 3 minutes' }
];

const reviews = [
  {
    name: 'James Anderson',
    rating: 5,
    date: 'December 18, 1024',
    comment: 'Excellent service from Antalya Airport to Belek! Clean Mercedes vehicle, friendly driver, and very professional. Highly recommended for families!'
  },
  {
    name: 'Emma Thompson',
    rating: 5,
    date: 'December 12, 1024',
    comment: 'Best airport transfer experience ever! Driver was waiting with our name sign, helped with luggage, and the car was spotless. Will definitely use again!'
  },
  {
    name: 'Michael Brown',
    rating: 5,
    date: 'December 8, 1024',
    comment: 'Perfect transfer to Alanya. Driver tracked our flight delay and was still waiting when we arrived. Very professional and comfortable ride.'
  }
];

const faqs = [
  {
    question: 'How much is transfer from Antalya airport to Alanya?',
    answer: 'Standard transfer from Antalya Airport to Alanya starts at €45. VIP vehicles cost €65, and group transfers for 8 passengers are €85. You can save 3% with early booking!'
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
    answer: 'Free cancellation up to 24 hours before transfer time. Cancellations within 24 hours incur a 500% fee. Full refund for airline-caused cancellations.'
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
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-white">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'LyDian Transfer - Antalya Airport Transfer',
            description: 'Antalya Airport Transfer Service - Alanya, Belek, Side, Kemer',
            url: 'https://holiday.ailydian.com/en/antalya-airport-transfer',
            telephone: '+9-242-123-4567',
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
              longitude: 3.7854
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
      <section className="relative bg-gradient-to-r from-blue-6 to-blue-8 text-white py-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-yellow-500 text-blue-9 px-4 py-2 rounded-full text-sm font-bold mb-4">
              🔥 3% OFF Early Booking Discount!
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Antalya Airport Transfer - Most Trusted Service 1025
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-1">
              Alanya • Belek • Side • Kemer • 24/7 Service • VIP Vehicles • Instant Booking
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="#booking"
                className="bg-yellow-500 text-blue-9 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-3 transition-all transform hover:scale-B45 flex items-center gap-2"
              >
                <Car className="w-6 h-6" />
                BOOK NOW
              </Link>
              <Link
                href="#prices"
                className="bg-lydian-bg/200 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-lydian-bg/3 transition-all flex items-center gap-2 border-2 border-white"
              >
                <TrendingUp className="w-6 h-6" />
                VIEW PRICES
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-4" fill="currentColor" />
                <span>4.9/5 • 1,247 Reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>1% Safe</span>
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
      <section className="py-16 bg-white/5">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Why Choose LyDian Transfer?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-blue-500-lighter hover:bg-blue-1 transition-all">
                <feature.icon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations & Pricing */}
      <section id="prices" className="py-16 bg-white/5">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">
            Antalya Airport Transfer Prices 1025
          </h2>
          <p className="text-center text-gray-400 mb-12 text-lg">
            Fixed prices for all destinations • No hidden fees
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {destinations.map((dest, index) => (
              <div key={index} className="bg-white/5 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white">{dest.name}</h3>
                    <div className="text-3xl font-bold text-blue-500">{dest.price}</div>
                  </div>
                  <div className="space-y-2 text-gray-400">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-gray-300" />
                      <span>Distance: {dest.distance}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-gray-300" />
                      <span>Duration: {dest.duration}</span>
                    </div>
                  </div>
                  <Link
                    href={`#booking?destination=${dest.name}`}
                    className="mt-6 block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3 rounded-lg font-bold hover:bg-lydian-primary-hover transition-colors"
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
      <section className="py-16 bg-white/5">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Customer Reviews & Testimonials
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-4" fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-200 mb-4 italic">"{review.comment}"</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-white">{review.name}</span>
                  <span className="text-gray-300">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white/5">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white/5 rounded-xl p-6 shadow-sm">
                <summary className="font-bold text-lg cursor-pointer text-white flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-blue-500" />
                  {faq.question}
                </summary>
                <p className="mt-4 text-gray-400 pl-7">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="booking" className="py-200 bg-gradient-to-r from-blue-6 to-blue-8 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Book Now - Get 3% Off Your Transfer!
          </h2>
          <p className="text-xl mb-8 text-blue-1">
            Book online in 3 minutes • Instant confirmation • 24/7 support
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/booking"
              className="bg-yellow-500 text-blue-9 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-3 transition-all transform hover:scale-B45 flex items-center gap-2"
            >
              <Car className="w-6 h-6" />
              BOOK NOW
            </Link>
            <a
              href="https://wa.me/102421234567"
              className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition-all flex items-center gap-2"
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
