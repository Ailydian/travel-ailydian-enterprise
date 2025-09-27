import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  CreditCard,
  MapPin,
  Calendar,
  Clock,
  Users,
  Star,
  Shield,
  ArrowRight,
  Tag,
  Gift,
  CheckCircle,
  Heart,
  Share2,
  AlertCircle,
  Percent,
  Sparkles,
  Truck,
  RefreshCw,
  X,
  Info,
  ArrowLeft,
  Lock
} from 'lucide-react';
import NavigationHeader from '../components/layout/NavigationHeader';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { state, updateQuantity, removeItem, applyDiscount, removeDiscount, clearCart } = useCart();
  const [discountCode, setDiscountCode] = useState('');
  const [isApplyingDiscount, setIsApplyingDiscount] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [savedForLater, setSavedForLater] = useState<string[]>([]);
  const [recentlyRemoved, setRecentlyRemoved] = useState<any>(null);

  // Load saved items from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('ailydian_saved_for_later');
    if (saved) {
      setSavedForLater(JSON.parse(saved));
    }
  }, []);

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) return;
    
    setIsApplyingDiscount(true);
    
    // Simulate API call to validate discount code
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const discountCodes = {
      'WELCOME10': 10,
      'SUMMER20': 20,
      'TURKEY15': 15,
      'NEWUSER25': 25,
      'HOLIDAY30': 30
    };
    
    const discountPercent = discountCodes[discountCode.toUpperCase() as keyof typeof discountCodes];
    if (discountPercent) {
      const discountAmount = (state.totalPrice * discountPercent) / 100;
      applyDiscount(discountCode.toUpperCase(), discountAmount);
      setDiscountCode('');
    } else {
      alert('Geçersiz indirim kodu! Geçerli kodlar: WELCOME10, SUMMER20, TURKEY15, NEWUSER25, HOLIDAY30');
    }
    
    setIsApplyingDiscount(false);
  };

  const handleRemoveItem = (item: any) => {
    setRecentlyRemoved(item);
    removeItem(item.id);
    
    // Auto-hide undo after 5 seconds
    setTimeout(() => {
      setRecentlyRemoved(null);
    }, 5000);
  };

  const handleUndoRemove = () => {
    if (recentlyRemoved) {
      // This would need addItem functionality in the context
      setRecentlyRemoved(null);
    }
  };

  const handleSaveForLater = (itemId: string) => {
    const newSaved = [...savedForLater, itemId];
    setSavedForLater(newSaved);
    localStorage.setItem('ailydian_saved_for_later', JSON.stringify(newSaved));
    removeItem(itemId);
  };

  const handleClearCart = () => {
    if (state.items.length === 0) return;
    setShowClearConfirm(true);
  };

  const confirmClearCart = () => {
    clearCart();
    setShowClearConfirm(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hotel': return '🏨';
      case 'flight': return '✈️';
      case 'tour': return '🎯';
      case 'restaurant': return '🍽️';
      case 'activity': return '🎮';
      default: return '📍';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'hotel': return 'bg-blue-500';
      case 'flight': return 'bg-purple-500';
      case 'tour': return 'bg-green-500';
      case 'restaurant': return 'bg-orange-500';
      case 'activity': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <>
      <Head>
        <title>Sepetim - Ailydian Travel | AI Destekli Rezervasyon</title>
        <meta name="description" content="Sepetinizdeki rezervasyonları inceleyin ve güvenli ödeme ile rezervasyonunuzu tamamlayın." />
        <meta name="keywords" content="sepet, rezervasyon, ödeme, travel, Türkiye" />
      </Head>

      <NavigationHeader />

      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 -z-10" />

      {/* Back Button */}
      <Link 
        href="/" 
        className="fixed top-24 left-6 z-40 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 text-gray-700 hover:bg-white hover:text-ailydian-primary transition-all duration-200"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-medium">Ana Sayfaya Dön</span>
      </Link>

      <main className="pt-8 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-ailydian-primary to-ailydian-secondary rounded-2xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-ailydian-primary to-ailydian-secondary bg-clip-text text-transparent">
                Sepetim
              </h1>
              <div className="px-3 py-1 bg-ailydian-primary text-white rounded-full text-sm font-medium">
                {state.totalItems} ürün
              </div>
            </div>
            <p className="text-gray-600 text-lg">Rezervasyonlarınızı gözden geçirin ve güvenli ödeme ile tamamlayın</p>
          </motion.div>

          {/* Recently Removed Item Notification */}
          <AnimatePresence>
            {recentlyRemoved && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="fixed top-32 right-6 z-50 bg-white rounded-2xl shadow-xl border border-gray-200 p-4 max-w-sm"
              >
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Ürün kaldırıldı</p>
                    <p className="text-sm text-gray-600">{recentlyRemoved.title}</p>
                  </div>
                  <button
                    onClick={handleUndoRemove}
                    className="px-3 py-1 bg-ailydian-primary text-white rounded-lg text-sm font-medium hover:bg-ailydian-dark transition-colors"
                  >
                    Geri Al
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {state.items.length === 0 ? (
            /* Empty Cart */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <ShoppingCart className="w-16 h-16 text-gray-400" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Sepetiniz Boş</h2>
              <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
Türkiye&apos;nin en güzel destinasyonlarını ve benzersiz deneyimlerini keşfetmek için alışverişe başlayın!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  href="/" 
                  className="px-8 py-4 bg-gradient-to-r from-ailydian-primary to-ailydian-secondary text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Keşfetmeye Başla
                </Link>
                <Link 
                  href="/tours" 
                  className="px-8 py-4 border-2 border-ailydian-primary text-ailydian-primary rounded-2xl font-semibold hover:bg-ailydian-primary hover:text-white transition-all duration-200"
                >
                  Popüler Turlar
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="xl:col-span-2 space-y-6">
                {/* Clear Cart Button */}
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Sepet Öğeleri ({state.totalItems})</h2>
                  <button
                    onClick={handleClearCart}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Sepeti Temizle</span>
                  </button>
                </div>

                {state.items.map((item, index) => (
                  <motion.div
                    key={`${item.id}-${item.type}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="p-6">
                      <div className="flex gap-6">
                        {/* Image */}
                        <div className="relative">
                          <img 
                            src={item.image || '/api/placeholder/150/120'}
                            alt={item.title}
                            className="w-40 h-32 object-cover rounded-2xl"
                          />
                          <div className={`absolute -top-3 -left-3 w-10 h-10 ${getTypeColor(item.type)} rounded-full flex items-center justify-center text-white text-xl shadow-lg`}>
                            {getTypeIcon(item.type)}
                          </div>
                          {item.rating && (
                            <div className="absolute -bottom-3 -right-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                              <Star className="w-3 h-3 fill-current" />
                              {item.rating}
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                                {item.location && (
                                  <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {item.location}
                                  </div>
                                )}
                                {item.date && (
                                  <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {item.date}
                                  </div>
                                )}
                                {item.duration && (
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {item.duration}
                                  </div>
                                )}
                              </div>
                              {item.description && (
                                <p className="text-gray-600 text-sm line-clamp-2 mb-3">{item.description}</p>
                              )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 ml-4">
                              <button
                                onClick={() => handleSaveForLater(item.id)}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                              >
                                <Heart className="w-5 h-5" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-colors">
                                <Share2 className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleRemoveItem(item)}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>

                          {/* Quantity and Price */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              {/* Quantity Controls */}
                              <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-1">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm hover:bg-gray-50 transition-colors"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>

                              {/* Special Features */}
                              <div className="flex items-center gap-2">
                                {item.isRefundable && (
                                  <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                    <RefreshCw className="w-3 h-3 inline mr-1" />
                                    İptal Edilebilir
                                  </div>
                                )}
                                {item.cancellationPolicy && (
                                  <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                    <Shield className="w-3 h-3 inline mr-1" />
                                    Güvenli
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <div className="flex items-center gap-2">
                                {item.originalPrice && item.originalPrice > item.price && (
                                  <span className="text-gray-400 line-through text-lg">
                                    {item.currency === 'TRY' ? '₺' : item.currency}{item.originalPrice}
                                  </span>
                                )}
                                <span className="text-2xl font-bold text-ailydian-primary">
                                  {item.currency === 'TRY' ? '₺' : item.currency}{(item.price * item.quantity).toLocaleString()}
                                </span>
                              </div>
                              <p className="text-sm text-gray-500">Toplam Fiyat</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Info */}
                    {(item.cancellationPolicy || item.bookingDetails) && (
                      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                        <div className="flex items-center justify-between text-sm">
                          {item.cancellationPolicy && (
                            <div className="flex items-center gap-2 text-gray-600">
                              <Info className="w-4 h-4" />
                              {item.cancellationPolicy}
                            </div>
                          )}
                          {item.provider && (
                            <div className="text-gray-500">
                              Sağlayıcı: {item.provider}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="xl:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden sticky top-8"
                >
                  {/* Header */}
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Sipariş Özeti</h3>
                    <p className="text-gray-600">Fiyat detayları ve ödeme bilgileri</p>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Discount Code */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">İndirim Kodu</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value)}
                          placeholder="Kod girin"
                          className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ailydian-primary focus:border-ailydian-primary outline-none"
                          onKeyPress={(e) => e.key === 'Enter' && handleApplyDiscount()}
                        />
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={handleApplyDiscount}
                          disabled={isApplyingDiscount || !discountCode.trim()}
                          className="px-6 py-3 bg-ailydian-primary text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-ailydian-dark transition-colors flex items-center gap-2"
                        >
                          {isApplyingDiscount ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <Tag className="w-4 h-4" />
                          )}
                          Uygula
                        </motion.button>
                      </div>
                      
                      {/* Applied Discount */}
                      {state.discountCode && (
                        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-green-700 font-medium">{state.discountCode}</span>
                          </div>
                          <button
                            onClick={removeDiscount}
                            className="text-green-600 hover:text-green-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}

                      {/* Available Discount Codes */}
                      <div className="mt-3">
                        <p className="text-xs text-gray-500 mb-2">Mevcut kodlar:</p>
                        <div className="flex flex-wrap gap-2">
                          {['WELCOME10', 'TURKEY15', 'HOLIDAY30'].map((code) => (
                            <button
                              key={code}
                              onClick={() => setDiscountCode(code)}
                              className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs hover:bg-gray-200 transition-colors"
                            >
                              {code}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-gray-600">
                        <span>Ara Toplam ({state.totalItems} ürün)</span>
                        <span>₺{state.totalPrice.toLocaleString()}</span>
                      </div>
                      
                      {state.discountAmount && state.discountAmount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>İndirim ({state.discountCode})</span>
                          <span>-₺{state.discountAmount.toLocaleString()}</span>
                        </div>
                      )}
                      
                      {state.taxAmount && (
                        <div className="flex justify-between text-gray-600">
                          <span>KDV (%18)</span>
                          <span>₺{state.taxAmount.toLocaleString()}</span>
                        </div>
                      )}
                      
                      <div className="pt-3 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold text-gray-900">Toplam</span>
                          <span className="text-2xl font-bold text-ailydian-primary">
                            ₺{state.finalTotal.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">KDV dahil</p>
                      </div>
                    </div>

                    {/* Security Features */}
                    <div className="space-y-3 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Shield className="w-4 h-4 text-green-500" />
                        SSL ile güvenli ödeme
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        24/7 müşteri desteği
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Truck className="w-4 h-4 text-blue-500" />
                        Ücretsiz rezervasyon iptali
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <Link href="/checkout">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 bg-gradient-to-r from-ailydian-primary to-ailydian-secondary text-white rounded-2xl font-bold text-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-3"
                      >
                        <Lock className="w-5 h-5" />
                        Güvenli Ödemeye Geç
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    </Link>

                    {/* Payment Methods */}
                    <div>
                      <p className="text-xs text-gray-500 mb-2">Kabul edilen ödeme yöntemleri:</p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded">
                          <CreditCard className="w-4 h-4" />
                          <span className="text-xs">Kredi Kartı</span>
                        </div>
                        <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded">
                          <Sparkles className="w-4 h-4" />
                          <span className="text-xs">Kripto</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Clear Cart Confirmation Modal */}
      <AnimatePresence>
        {showClearConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Sepeti Temizle</h3>
                <p className="text-gray-600 mb-6">
                  Tüm ürünleri sepetinizden kaldırmak istediğinizden emin misiniz?
                  Bu işlem geri alınamaz.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    İptal
                  </button>
                  <button
                    onClick={confirmClearCart}
                    className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
                  >
                    Temizle
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartPage;