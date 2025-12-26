import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Car, MapPin, Calendar, Users, Star, CheckCircle, ArrowRight, Shield, Zap, Clock, Fuel, Settings, Droplet } from 'lucide-react';
import { BookingHeader } from '../components/layout/BookingHeader';
import { getBrandLogo } from '../components/icons/CarBrandLogos';
import { AnimatedCarIcon } from '../components/icons/AnimatedCarIcon';
import { TransferCarCard } from '../components/cards/TransferCarCard';

const CarRental: React.FC = () => {
  const router = useRouter();
  const [searchData, setSearchData] = useState({
    location: '',
    pickupDate: '',
    returnDate: '',
    passengers: 1
  });

  const handleReserve = (car: typeof cars[0]) => {
    // Save product info to localStorage and redirect to reservation page
    const productInfo = {
      id: car.id,
      type: 'car',
      name: car.name,
      category: car.category,
      image: car.image,
      price: car.price,
      features: car.features,
      rating: car.rating,
      location: searchData.location,
      pickupDate: searchData.pickupDate,
      returnDate: searchData.returnDate,
      passengers: searchData.passengers,
    };

    localStorage.setItem('selectedProduct', JSON.stringify(productInfo));
    router.push('/reservation');
  };

  const cars = [
    {
      id: 1,
      name: 'Volkswagen Golf',
      brand: 'Volkswagen',
      category: 'Ekonomik',
      price: '₺89',
      features: ['Manuel', '5 Kişi', 'Klima', 'Bluetooth'],
      transmission: 'Manuel',
      fuel: 'Benzin',
      seats: 5,
      rating: 4.5,
      popular: false
    },
    {
      id: 2,
      name: 'BMW 3 Serisi',
      brand: 'BMW',
      category: 'Lüks',
      price: '₺299',
      features: ['Otomatik', '5 Kişi', 'Deri Döşeme', 'GPS'],
      transmission: 'Otomatik',
      fuel: 'Dizel',
      seats: 5,
      rating: 4.8,
      popular: true
    },
    {
      id: 3,
      name: 'Ford Transit',
      brand: 'Ford',
      category: 'Minibüs',
      price: '₺199',
      features: ['Manuel', '9 Kişi', 'Geniş Bagaj', 'Klima'],
      transmission: 'Manuel',
      fuel: 'Dizel',
      seats: 9,
      rating: 4.6,
      popular: false
    },
    {
      id: 4,
      name: 'Renault Symbol',
      brand: 'Renault',
      category: 'Ekonomik',
      price: '₺79',
      features: ['Manuel', '5 Kişi', 'Klima', 'USB'],
      transmission: 'Manuel',
      fuel: 'Benzin',
      seats: 5,
      rating: 4.4,
      popular: true
    },
    {
      id: 5,
      name: 'Fiat Egea',
      brand: 'Fiat',
      category: 'Ekonomik',
      price: '₺85',
      features: ['Manuel', '5 Kişi', 'Klima', 'ABS'],
      transmission: 'Manuel',
      fuel: 'Benzin',
      seats: 5,
      rating: 4.3,
      popular: false
    },
    {
      id: 6,
      name: 'Toyota Corolla',
      brand: 'Toyota',
      category: 'Konfor',
      price: '₺149',
      features: ['Otomatik', '5 Kişi', 'Hibrit', 'Güvenlik+'],
      transmission: 'Otomatik',
      fuel: 'Hibrit',
      seats: 5,
      rating: 4.7,
      popular: true
    },
    {
      id: 7,
      name: 'Hyundai Accent',
      brand: 'Hyundai',
      category: 'Ekonomik',
      price: '₺82',
      features: ['Manuel', '5 Kişi', 'Klima', 'Bluetooth'],
      transmission: 'Manuel',
      fuel: 'Benzin',
      seats: 5,
      rating: 4.4,
      popular: false
    },
    {
      id: 8,
      name: 'Mercedes E-Class',
      brand: 'Mercedes',
      category: 'Lüks',
      price: '₺399',
      features: ['Otomatik', '5 Kişi', 'Premium', 'Navigasyon'],
      transmission: 'Otomatik',
      fuel: 'Dizel',
      seats: 5,
      rating: 4.9,
      popular: true
    }
  ];

  return (
    <>
      <Head>
        <title>Araç Kiralama - Travel.LyDian | Ekonomik ve Lüks Araç Kiralama</title>
        <meta name="description" content="Travel.LyDian ile güvenilir araç kiralama hizmeti. Ekonomik, konfor ve lüks araç seçenekleri ile seyahatinizi özgürce planlayın." />
      </Head>

      <BookingHeader />

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-600 via-teal-600 to-cyan-600 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
                Araç Kiralama
              </h1>
              <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
                Ekonomik fiyatlarla güvenilir araç kiralama. Şehir içi, şehirlerarası ve tatil için ideal araç seçenekleri.
              </p>
            </motion.div>

            {/* Search Form */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Alış Yeri</label>
                    <input
                      type="text"
                      placeholder="Şehir veya havaalanı"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-gray-900 placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Alış Tarihi</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-gray-900 [color-scheme:light]"
                      style={{ colorScheme: 'light' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">İade Tarihi</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-gray-900 [color-scheme:light]"
                      style={{ colorScheme: 'light' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">&nbsp;</label>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-bold hover:from-green-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl"
                    >
                      Ara
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Car Categories */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Popüler Araç Kategorileri</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                İhtiyacınıza uygun araç kategorisini seçin. Ekonomik, konfor ve lüks seçeneklerimizle her bütçeye uygun araçlar.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  title: 'Ekonomik',
                  icon: Car,
                  description: 'Şehir içi ve günlük kullanım için ideal',
                  color: 'from-green-500 to-teal-500',
                  bgColor: 'bg-green-50',
                  badge: 'En Popüler Seçim',
                  price: '₺79'
                },
                {
                  title: 'Lüks',
                  icon: Shield,
                  description: 'Konforlu ve prestijli seyahat deneyimi',
                  color: 'from-purple-500 to-pink-500',
                  bgColor: 'bg-purple-50',
                  badge: '',
                  price: '₺299'
                },
                {
                  title: 'Minibüs',
                  icon: Users,
                  description: 'Grup transferleri ve aile seyahatleri',
                  color: 'from-blue-500 to-cyan-500',
                  bgColor: 'bg-blue-50',
                  badge: '',
                  price: '₺199'
                }
              ].map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`${category.bgColor} rounded-2xl shadow-lg hover:shadow-xl transition-all group cursor-pointer overflow-hidden`}
                >
                  <div className="p-8">
                    <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <category.icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{category.description}</p>

                    {category.badge && (
                      <span className="inline-block px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full mb-4">
                        {category.badge}
                      </span>
                    )}

                    <div className="flex items-baseline gap-2 mt-4">
                      <span className="text-2xl font-bold text-gray-900">{category.price}</span>
                      <span className="text-sm text-gray-500">/ gün başlayan fiyatlarla</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Car Results */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Tüm Araçlar</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {cars.map((car) => (
                <TransferCarCard
                  key={car.id}
                  id={car.id}
                  slug={car.brand.toLowerCase() + '-' + car.name.toLowerCase().replace(/\s+/g, '-')}
                  title={`${car.brand} ${car.name}`}
                  category={car.category}
                  price={car.price}
                  capacity={car.seats}
                  rating={car.rating}
                  reviews={Math.floor(Math.random() * 150) + 30}
                  popular={car.popular}
                  href={`/car-rentals/${car.brand.toLowerCase()}-${car.name.toLowerCase().replace(/\s+/g, '-')}`}
                  from={car.transmission}
                  to={car.fuel}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Neden Bizden Araç Kiralayın?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { icon: Shield, title: 'Güvenli & Temiz', desc: 'Tüm araçlar dezenfekte ve güvenlik kontrollü' },
                { icon: Zap, title: 'Hızlı Teslimat', desc: 'Anında rezervasyon ve hızlı araç teslimi' },
                { icon: Clock, title: '7/24 Destek', desc: 'Yol boyunca kesintisiz destek hizmeti' },
                { icon: Fuel, title: 'Yakıt Dahil', desc: 'Seçili paketlerde yakıt masrafı dahil' }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default CarRental;