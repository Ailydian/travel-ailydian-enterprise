import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingCart,
  Tag,
  TrendingUp,
  Gift,
  Sparkles,
  Info
} from 'lucide-react';
import {
  calculateBundlePricing,
  formatCurrency,
  getBundleRecommendation,
  type BundleItem
} from '@/lib/bundlePricing';

interface BundlePricingCardProps {
  items: BundleItem[];
  bookingDate?: Date;
  travelDate?: Date;
  nights?: number;
  location?: string;
  userMiles?: number;
  onCheckout?: () => void;
}

const BundlePricingCard: React.FC<BundlePricingCardProps> = ({
  items,
  bookingDate,
  travelDate,
  nights,
  location,
  userMiles = 0,
  onCheckout
}) => {
  // Calculate pricing
  const pricing = useMemo(() => {
    return calculateBundlePricing(items, {
      bookingDate,
      travelDate,
      nights,
      location,
      userMiles
    });
  }, [items, bookingDate, travelDate, nights, location, userMiles]);

  // Get recommendation for more savings
  const recommendation = getBundleRecommendation(items.map(item => item.category));

  // Category icons
  const categoryIcons: Record<string, string> = {
    hotel: '🏨',
    car: '🚗',
    flight: '✈️',
    tour: '🎭',
    transfer: '🚕'
  };

  // Category names in Turkish
  const categoryNames: Record<string, string> = {
    hotel: 'Otel',
    car: 'Araç Kiralama',
    flight: 'Uçuş',
    tour: 'Tur',
    transfer: 'Transfer'
  };

  return (
    <div className="bg-white/5 rounded-2xl shadow-xl p-6 sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-purple-600" />
          Sepetiniz
        </h3>
        {items.length > 1 && (
          <span className="bg-purple-100 text-purple-600 text-xs font-bold px-3 py-1 rounded-full">
            {items.length} Ürün
          </span>
        )}
      </div>

      {/* Items List */}
      <div className="space-y-3 mb-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 bg-white/5 rounded-lg"
          >
            <span className="text-2xl">{categoryIcons[item.category]}</span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">{item.name}</p>
              <p className="text-xs text-gray-400">{categoryNames[item.category]}</p>
              {item.quantity && item.quantity > 1 && (
                <p className="text-xs text-purple-600 mt-1">
                  {item.quantity} {item.category === 'hotel' ? 'gece' : 'gün'}
                </p>
              )}
            </div>
            <p className="text-sm font-bold text-white">
              {formatCurrency(item.basePrice * (item.quantity || 1))}
            </p>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="border-t border-white/10 pt-4 mb-4">
        <div className="flex justify-between text-sm text-gray-300 mb-2">
          <span>Ara Toplam</span>
          <span className="font-semibold">{formatCurrency(pricing.subtotal)}</span>
        </div>

        {/* Discounts */}
        {pricing.discounts.length > 0 && (
          <div className="space-y-2 mb-3">
            {pricing.discounts.map((discount, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex justify-between items-start text-sm"
              >
                <div className="flex items-start gap-2 flex-1">
                  <Tag className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-green-700 font-medium">{discount.reason}</p>
                    <span className="text-xs text-green-600 font-semibold">
                      {discount.badge}
                    </span>
                  </div>
                </div>
                <span className="text-green-700 font-bold whitespace-nowrap ml-2">
                  -{formatCurrency(discount.amount)}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        {/* Total Savings */}
        {pricing.totalDiscount > 0 && (
          <div className="flex justify-between items-center bg-green-50 p-3 rounded-lg mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm font-semibold text-green-800">
                Toplam İndirim
              </span>
            </div>
            <span className="text-lg font-bold text-green-700">
              -{formatCurrency(pricing.totalDiscount)}
            </span>
          </div>
        )}

        {/* Final Total */}
        <div className="flex justify-between items-center pt-3 border-t-2 border-white/10">
          <span className="text-lg font-bold text-white">Toplam</span>
          <div className="text-right">
            {pricing.savingsPercentage > 0 && (
              <div className="text-xs text-green-600 font-semibold mb-1">
                %{pricing.savingsPercentage} tasarruf
              </div>
            )}
            <span className="text-2xl font-bold text-purple-600">
              {formatCurrency(pricing.finalTotal)}
            </span>
          </div>
        </div>
      </div>

      {/* LyDian Miles */}
      {pricing.ailydiانMiles > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-semibold text-purple-900">
              Kazanacağınız Puan
            </span>
          </div>
          <p className="text-2xl font-bold text-purple-600">
            {pricing.ailydiانMiles.toLocaleString()} Miles
          </p>
          <p className="text-xs text-gray-300 mt-1">
            Sonraki rezervasyonunuzda kullanabilirsiniz
          </p>
        </div>
      )}

      {/* Recommendation Banner */}
      {recommendation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg mb-4 border border-orange-200"
        >
          <div className="flex items-start gap-2">
            <Gift className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-orange-900 mb-1">
                Daha Fazla Tasarruf!
              </p>
              <p className="text-xs text-orange-700">{recommendation}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        disabled={items.length === 0}
        className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg hover:shadow-xl"
      >
        {items.length === 0 ? 'Sepet Boş' : 'Rezervasyonu Tamamla'}
      </button>

      {/* Info Text */}
      <div className="mt-4 flex items-start gap-2 text-xs text-gray-400">
        <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
        <p>
          Ödeme sonrası rezervasyon onayınız email ve SMS ile gönderilecektir.
          Ücretsiz iptal 24 saat öncesine kadar geçerlidir.
        </p>
      </div>

      {/* Trust Badges */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl mb-1">🔒</div>
            <p className="text-xs text-gray-300">Güvenli Ödeme</p>
          </div>
          <div>
            <div className="text-2xl mb-1">✅</div>
            <p className="text-xs text-gray-300">Anında Onay</p>
          </div>
          <div>
            <div className="text-2xl mb-1">💳</div>
            <p className="text-xs text-gray-300">3D Secure</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BundlePricingCard;
