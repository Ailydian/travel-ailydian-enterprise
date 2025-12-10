import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Car, MapPin, Calendar, Users, Star, CheckCircle, ArrowRight, Shield, Zap, Clock, Fuel } from 'lucide-react';
import NavigationHeader from '../components/layout/NavigationHeader';

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
      category: 'Ekonomik',
      image: 'https://images.unsplash.com/photo-1622353219448-46a009f0d44f?w=800&h=600&q=90', // VW Golf
      price: '₺89',
      features: ['Manuel', '5 Kişi', 'Klima', 'Bluetooth'],
      rating: 4.5,
      popular: false
    },
    {
      id: 2,
      name: 'BMW 3 Serisi',
      category: 'Lüks',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&q=90', // BMW
      price: '₺299',
      features: ['Otomatik', '5 Kişi', 'Deri Döşeme', 'GPS'],
      rating: 4.8,
      popular: true
    },
    {
      id: 3,
      name: 'Ford Transit',
      category: 'Minibüs',
      image: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=800&h=600&q=90', // Ford Transit/Van
      price: '₺199',
      features: ['Manuel', '9 Kişi', 'Geniş Bagaj', 'Klima'],
      rating: 4.6,
      popular: false
    }
  ];

  return (
    <>
      <Head>
        <title>Araç Kiralama - Travel.Ailydian | Ekonomik ve Lüks Araç Kiralama</title>
        <meta name="description" content="Travel.Ailydian ile güvenilir araç kiralama hizmeti. Ekonomik, konfor ve lüks araç seçenekleri ile seyahatinizi özgürce planlayın." />
      </Head>

      <NavigationHeader />

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
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Popüler Araç Seçenekleri</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  title: 'Ekonomik',
                  image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&q=90',
                  badge: 'En Popüler Seçim'
                },
                {
                  title: 'Lüks',
                  image: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=400&h=300&q=90',
                  badge: ''
                },
                {
                  title: 'Minibüs',
                  image: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=400&h=300&q=90',
                  badge: ''
                }
              ].map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg"
                >
                  <div className="relative h-48">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-1">{category.title}</h3>
                      {category.badge && (
                        <span className="inline-block px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                          {category.badge}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <button className="px-4 py-2 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm">
                      Ekran Resmi
                    </button>
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map((car, index) => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {car.popular && (
                    <div className="bg-green-500 text-white text-center py-2 text-sm font-medium">
                      En Popüler Seçim
                    </div>
                  )}
                  
                  <div className="relative">
                    <img 
                      src={car.image} 
                      alt={car.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                      {car.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{car.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{car.rating}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {car.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">{car.price}</span>
                        <span className="text-gray-600">/gün</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => handleReserve(car)}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                      >
                        Rezerve Et
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
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