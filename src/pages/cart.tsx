import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
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

      <NavigationHeader />

      {/* Return to Home Button */}
      <Link 
        href="/" 
        className="fixed top-24 left-6 z-10 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 text-gray-700 hover:bg-white hover:text-ailydian-primary transition-all duration-200"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-medium">Ana Sayfaya Dön</span>
      </Link>

      <main className="pt-8 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sepetim</h1>
            <p className="text-gray-600">Rezervasyonlarınızı gözden geçirin ve ödemeyi tamamlayın</p>
          </motion.div>

          {cartItems.length === 0 ? (
            /* Empty Cart */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-8" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sepetiniz Boş</h2>
              <p className="text-gray-600 mb-8">Harika deneyimler keşfetmek için alışverişe başlayın!</p>
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-ailydian-primary text-white rounded-xl font-semibold hover:bg-ailydian-dark transition-colors"
              >
                Alışverişe Başla
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
                  >
                    <div className="flex gap-6">
                      {/* Image */}
                      <div className="relative">
                        <img 
                          src={item.image}
                          alt={item.title}
                          className="w-32 h-24 object-cover rounded-xl"
                        />
                        <div className="absolute -top-2 -left-2 w-8 h-8 bg-ailydian-primary rounded-full flex items-center justify-center text-white text-lg">
                          {getTypeIcon(item.type)}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-bold text-lg text-gray-900 mb-1">{item.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {item.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {item.date}
                              </div>
                              {item.duration && (
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {item.duration}
                                </div>
                              )}
                            </div>
                          </div>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.badges.map(badge => (
                            <span key={badge} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                              {badge}
                            </span>
                          ))}
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{item.rating}</span>
                          </div>
                        </div>

                        {/* Quantity & Price */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600">Kişi sayısı:</span>
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => updateGuestCount(item.id, item.guests - 1)}
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center font-semibold">{item.guests}</span>
                              <button 
                                onClick={() => updateGuestCount(item.id, item.guests + 1)}
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold text-gray-900">₺{item.price * item.guests}</span>
                              {item.originalPrice && (
                                <span className="text-sm text-gray-500 line-through">₺{item.originalPrice * item.guests}</span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">₺{item.price} x {item.guests} kişi</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="space-y-6">
                {/* Promo Code */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
                >
                  <h3 className="font-bold text-lg text-gray-900 mb-4">Promosyon Kodu</h3>
                  {appliedPromo ? (
                    <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <Tag className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-900">{appliedPromo}</span>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Promosyon kodunu girin"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ailydian-primary focus:border-transparent outline-none"
                      />
                      <button
                        onClick={applyPromoCode}
                        className="px-6 py-3 bg-ailydian-primary text-white rounded-lg font-semibold hover:bg-ailydian-dark transition-colors"
                      >
                        Uygula
                      </button>
                    </div>
                  )}
                  <div className="mt-4 space-y-2 text-sm">
                    <p className="text-gray-600">Mevcut kodlar:</p>
                    <p className="text-ailydian-primary">• AILYDIAN10 (%10 indirim)</p>
                    <p className="text-ailydian-primary">• BLOCKCHAIN20 (%20 indirim)</p>
                  </div>
                </motion.div>

                {/* Order Summary */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
                >
                  <h3 className="font-bold text-lg text-gray-900 mb-6">Sipariş Özeti</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ara Toplam</span>
                      <span className="font-semibold">₺{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">KDV (%18)</span>
                      <span className="font-semibold">₺{tax.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>İndirim ({appliedPromo})</span>
                        <span className="font-semibold">-₺{discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">Toplam</span>
                        <span className="text-2xl font-bold text-ailydian-primary">₺{total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Security Features */}
                  <div className="space-y-3 mb-6 p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">SSL Güvenli Ödeme</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                      <span className="text-gray-700">Blockchain Doğrulama</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CreditCard className="w-4 h-4 text-purple-500" />
                      <span className="text-gray-700">Anında Rezervasyon</span>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    className="w-full bg-gradient-to-r from-ailydian-primary to-ailydian-secondary text-white py-4 px-6 rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-5 h-5" />
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