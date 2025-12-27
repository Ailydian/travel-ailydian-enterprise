import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Car, MapPin, Calendar, Users, Star, CheckCircle, ArrowRight, Shield, Zap, Clock, Fuel, Settings, Droplet } from 'lucide-react';
import { FuturisticHeader } from '../components/layout/FuturisticHeader';
import { getBrandLogo } from '../components/icons/CarBrandLogos';
import { AnimatedCarIcon } from '../components/icons/AnimatedCarIcon';
import { TransferCarCard } from '../components/cards/TransferCarCard';
import { NeoHero, FuturisticCard, FuturisticButton } from '../components/neo-glass';
import { HorizontalScrollSection } from '../components/scroll/HorizontalScrollSection';

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
      passengers: searchData.passengers
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
  }];


  return (
    <>
      <Head>
        <title>Araç Kiralama - Travel.LyDian | Ekonomik ve Lüks Araç Kiralama</title>
        <meta name="description" content="Travel.LyDian ile güvenilir araç kiralama hizmeti. Ekonomik, konfor ve lüks araç seçenekleri ile seyahatinizi özgürce planlayın." />
      </Head>

      <FuturisticHeader />

      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* 🎨 NEO-GLASS HERO */}
        <NeoHero
          title="Araç Kiralama"
          subtitle="Ekonomik fiyatlarla güvenilir araç kiralama. Şehir içi, şehirlerarası ve tatil için ideal araç seçenekleri."
          gradient="sunset"
          height="80vh"
          overlayOpacity={0.2}
          showFloatingElements={true}>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto mt-8">
            <div className="bg-lydian-glass-dark-medium backdrop-blur-xl border border-lydian-border-light rounded-3xl shadow-2xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-lydian-text-inverse mb-2">Alış Yeri</label>
                  <input
                    type="text"
                    placeholder="Şehir veya havaalanı"
                    className="w-full px-4 py-3 bg-lydian-bg/90 backdrop-blur-sm border border-lydian-border-light rounded-xl focus:ring-2 focus:ring-[#FF9500] outline-none text-lydian-text-inverse placeholder-lydian-text-tertiary" />

                </div>
                <div>
                  <label className="block text-sm font-semibold text-lydian-text-inverse mb-2">Alış Tarihi</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-lydian-bg/90 backdrop-blur-sm border border-lydian-border-light rounded-xl focus:ring-2 focus:ring-[#FF9500] outline-none text-lydian-text-inverse [color-scheme:light]"
                    style={{ colorScheme: 'light' }} />

                </div>
                <div>
                  <label className="block text-sm font-semibold text-lydian-text-inverse mb-2">İade Tarihi</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-lydian-bg/90 backdrop-blur-sm border border-lydian-border-light rounded-xl focus:ring-2 focus:ring-[#FF9500] outline-none text-lydian-text-inverse [color-scheme:light]"
                    style={{ colorScheme: 'light' }} />

                </div>
                <div>
                  <label className="block text-sm font-semibold text-lydian-text-inverse mb-2">&nbsp;</label>
                  <FuturisticButton
                    variant="gradient"
                    size="lg"
                    fullWidth
                    icon={<ArrowRight className="w-5 h-5" />}>

                    Ara
                  </FuturisticButton>
                </div>
              </div>
            </div>
          </div>
        </NeoHero>

        {/* Car Categories */}
        <section className="py-16 bg-lydian-glass-dark">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-lydian-text-inverse mb-4">Popüler Araç Kategorileri</h2>
              <p className="text-lydian-text-dim max-w-2xl mx-auto">
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
              }].
              map((category, index) =>
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${category.bgColor} rounded-2xl shadow-lg hover:shadow-xl transition-all group cursor-pointer overflow-hidden`}>

                  <div className="p-8">
                    <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <category.icon className="w-8 h-8 text-lydian-text-inverse" />
                    </div>

                    <h3 className="text-2xl font-bold text-lydian-text-inverse mb-2">{category.title}</h3>
                    <p className="text-lydian-text-dim text-sm mb-4">{category.description}</p>

                    {category.badge &&
                  <span className="inline-block px-3 py-1 bg-green-500 text-lydian-text-inverse text-xs font-bold rounded-full mb-4">
                        {category.badge}
                      </span>
                  }

                    <div className="flex items-baseline gap-2 mt-4">
                      <span className="text-2xl font-bold text-lydian-text-inverse">{category.price}</span>
                      <span className="text-sm text-lydian-text-muted">/ gün başlayan fiyatlarla</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* 🎨 NEO-GLASS CAR RESULTS */}
        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF9500] to-[#FF6B00] mb-12 text-center">

              Tüm Araçlar
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {cars.map((car, idx) =>
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}>

                  <FuturisticCard
                  image="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop"
                  title={car.name}
                  description={car.category}
                  price={`${car.price}/gün`}
                  badge={car.popular ? '⭐ POPÜLER' : undefined}
                  badges={[car.brand, car.transmission, car.fuel]}
                  metadata={[
                  { icon: <Settings className="w-4 h-4" />, label: car.transmission },
                  { icon: <Fuel className="w-4 h-4" />, label: car.fuel },
                  { icon: <Users className="w-4 h-4" />, label: `${car.seats} Kişi` }]
                  }
                  rating={car.rating}
                  reviews={Math.floor(Math.random() * 150) + 30}
                  onClick={() => handleReserve(car)}
                  category="car-rental"
                  categoryColor="#FF9500" />

                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-lydian-glass-dark">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-lydian-text-inverse mb-4">Neden Bizden Araç Kiralayın?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
              { icon: Shield, title: 'Güvenli & Temiz', desc: 'Tüm araçlar dezenfekte ve güvenlik kontrollü' },
              { icon: Zap, title: 'Hızlı Teslimat', desc: 'Anında rezervasyon ve hızlı araç teslimi' },
              { icon: Clock, title: '7/24 Destek', desc: 'Yol boyunca kesintisiz destek hizmeti' },
              { icon: Fuel, title: 'Yakıt Dahil', desc: 'Seçili paketlerde yakıt masrafı dahil' }].
              map((feature, index) =>
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center">

                  <div className="w-16 h-16 bg-lydian-success-light text-lydian-success rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-lydian-text-dim">{feature.desc}</p>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>);

};

export default CarRental;