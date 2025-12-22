import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  CreditCard,
  Shield,
  Clock,
  MapPin,
  Calendar,
  Users,
  Star,
  Tag,
  CheckCircle
} from 'lucide-react';
import NavigationHeader from '../components/layout/NavigationHeader';

interface CartItem {
  id: string;
  type: 'experience' | 'hotel' | 'flight';
  title: string;
  location: string;
  date: string;
  duration?: string;
  guests: number;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  badges: string[];
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      type: 'experience',
      title: 'Kapadokya: Blockchain Doğrulamalı Balon Turu',
      location: 'Kapadokya, Türkiye',
      date: '2024-12-15',
      duration: '4 saat',
      guests: 2,
      price: 450,
      originalPrice: 550,
      image: 'https://images.unsplash.com/photo-1570939274719-c60ee3bf5cd9?w=200&h=150&q=90',
      rating: 4.8,
      badges: ['Blockchain Doğrulamalı', 'VR Önizleme']
    },
    {
      id: '2',
      type: 'hotel',
      title: 'Boğaziçi Palace Hotel',
      location: 'Sultanahmet, İstanbul',
      date: '2024-12-20',
      duration: '3 gece',
      guests: 2,
      price: 2400,
      originalPrice: 3000,
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=200&h=150&q=90',
      rating: 4.9,
      badges: ['AI Önerisi', 'Lüks']
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');
  const [discount, setDiscount] = useState(0);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.guests), 0);
  const tax = subtotal * 0.18; // KDV %18
  const total = subtotal + tax - discount;

  const updateGuestCount = (id: string, newCount: number) => {
    if (newCount < 1) return;
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, guests: newCount } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'ailydian10') {
      setAppliedPromo(promoCode);
      setDiscount(subtotal * 0.1); // %10 indirim
      setPromoCode('');
    } else if (promoCode.toLowerCase() === 'blockchain20') {
      setAppliedPromo(promoCode);
      setDiscount(subtotal * 0.2); // %20 indirim
      setPromoCode('');
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'experience': return '🎯';
      case 'hotel': return '🏨';
      case 'flight': return '✈️';
      default: return '📍';
    }
  };

  return (
    <>
      <Head>
        <title>Sepetim - Ailydian Travel | Güvenli Rezervasyon</title>
        <meta name="description" content="Sepetinizdeki rezervasyonları inceleyin ve güvenli ödeme ile rezervasyonunuzu tamamlayın." />
      </Head>

      <NavigationHeader theme="default" />

      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-4 sm:mb-8"
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Sepetim</h1>
            <p className="text-sm sm:text-base text-gray-600">Rezervasyonlarınızı gözden geçirin ve ödemeyi tamamlayın</p>
          </motion.div>

          {cartItems.length === 0 ? (
            /* Empty Cart */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 sm:py-16"
            >
              <ShoppingCart className="w-16 h-16 sm:w-24 sm:h-24 text-gray-300 mx-auto mb-4 sm:mb-8" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Sepetiniz Boş</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 px-4">Harika deneyimler keşfetmek için alışverişe başlayın!</p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-ailydian-primary text-white rounded-lg sm:rounded-xl font-semibold hover:bg-ailydian-dark transition-colors"
              >
                Alışverişe Başla
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-3 sm:space-y-4 lg:space-y-6">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6"
                  >
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6">
                      {/* Image */}
                      <div className="relative w-full sm:w-24 md:w-28 lg:w-32 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-32 sm:h-20 md:h-22 lg:h-24 object-cover rounded-lg sm:rounded-xl"
                        />
                        <div className="absolute -top-2 -left-2 w-7 h-7 sm:w-8 sm:h-8 bg-ailydian-primary rounded-full flex items-center justify-center text-white text-base sm:text-lg">
                          {getTypeIcon(item.type)}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2 sm:mb-3">
                          <div className="flex-1 min-w-0 pr-2">
                            <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1 line-clamp-2">{item.title}</h3>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                <span className="truncate">{item.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                <span>{item.date}</span>
                              </div>
                              {item.duration && (
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                  <span>{item.duration}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1.5 sm:p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                          >
                            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                          {item.badges.map(badge => (
                            <span key={badge} className="px-2 py-0.5 sm:py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] sm:text-xs font-medium">
                              {badge}
                            </span>
                          ))}
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
                            <span className="text-xs sm:text-sm font-medium">{item.rating}</span>
                          </div>
                        </div>

                        {/* Quantity & Price */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <span className="text-xs sm:text-sm text-gray-600">Kişi:</span>
                            <div className="flex items-center gap-1.5 sm:gap-2">
                              <button
                                onClick={() => updateGuestCount(item.id, item.guests - 1)}
                                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                              >
                                <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                              </button>
                              <span className="w-7 sm:w-8 text-center text-sm sm:text-base font-semibold">{item.guests}</span>
                              <button
                                onClick={() => updateGuestCount(item.id, item.guests + 1)}
                                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                              >
                                <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="text-left sm:text-right">
                            <div className="flex items-center gap-2">
                              <span className="text-xl sm:text-2xl font-bold text-gray-900">₺{item.price * item.guests}</span>
                              {item.originalPrice && (
                                <span className="text-xs sm:text-sm text-gray-500 line-through">₺{item.originalPrice * item.guests}</span>
                              )}
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600">₺{item.price} x {item.guests} kişi</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                {/* Promo Code */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-5 lg:p-6"
                >
                  <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-3 sm:mb-4">Promosyon Kodu</h3>
                  {appliedPromo ? (
                    <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-2.5 sm:p-3">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                        <span className="text-sm sm:text-base font-semibold text-green-900">{appliedPromo}</span>
                      </div>
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Promosyon kodu"
                        className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-ailydian-primary focus:border-transparent outline-none"
                      />
                      <button
                        onClick={applyPromoCode}
                        className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-ailydian-primary text-white rounded-lg font-semibold hover:bg-ailydian-dark transition-colors whitespace-nowrap"
                      >
                        Uygula
                      </button>
                    </div>
                  )}
                  <div className="mt-3 sm:mt-4 space-y-1 sm:space-y-2 text-xs sm:text-sm">
                    <p className="text-gray-600 font-medium">Mevcut kodlar:</p>
                    <p className="text-ailydian-primary">• AILYDIAN10 (%10 indirim)</p>
                    <p className="text-ailydian-primary">• BLOCKCHAIN20 (%20 indirim)</p>
                  </div>
                </motion.div>

                {/* Order Summary */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-5 lg:p-6"
                >
                  <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-4 sm:mb-6">Sipariş Özeti</h3>

                  <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600">Ara Toplam</span>
                      <span className="font-semibold">₺{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600">KDV (%18)</span>
                      <span className="font-semibold">₺{tax.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600 text-sm sm:text-base">
                        <span>İndirim ({appliedPromo})</span>
                        <span className="font-semibold">-₺{discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t border-gray-200 pt-3 sm:pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-base sm:text-lg font-bold text-gray-900">Toplam</span>
                        <span className="text-xl sm:text-2xl font-bold text-ailydian-primary">₺{total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Security Features */}
                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                      <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">SSL Güvenli Ödeme</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                      <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
                      <span className="text-gray-700">Blockchain Doğrulama</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                      <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500 flex-shrink-0" />
                      <span className="text-gray-700">Anında Rezervasyon</span>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    className="w-full bg-gradient-to-r from-ailydian-primary to-ailydian-secondary text-white py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base rounded-lg sm:rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                    Ödemeye Geç
                  </Link>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Cart;