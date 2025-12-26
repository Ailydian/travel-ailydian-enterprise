'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingDown,
  Check,
  X,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Award,
  Shield,
  Zap,
  Star
} from 'lucide-react';

interface CompetitorPrice {
  provider: string;
  price: number;
  currency: string;
  logo?: string;
  url?: string;
  rating?: number;
  features?: string[];
  badge?: 'bestseller' | 'recommended' | 'budget';
}

interface PriceComparisonWidgetProps {
  ourPrice: number;
  currency?: string;
  competitors: CompetitorPrice[];
  productName: string;
  savings?: number;
  className?: string;
}

export const PriceComparisonWidget: React.FC<PriceComparisonWidgetProps> = ({
  ourPrice,
  currency = '₺',
  competitors,
  productName,
  savings,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate savings percentage
  const avgCompetitorPrice = competitors.reduce((sum, c) => sum + c.price, 0) / competitors.length;
  const savingsPercent = ((avgCompetitorPrice - ourPrice) / avgCompetitorPrice * 100).toFixed(0);
  const actualSavings = avgCompetitorPrice - ourPrice;

  // Sort competitors by price
  const sortedCompetitors = [...competitors].sort((a, b) => a.price - b.price);

  return (
    <div className={`bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl overflow-hidden shadow-lg border-2 border-green-200 ${className}`}>
      {/* Header - Always Visible */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                En İyi Fiyat Garantisi
              </h3>
              <p className="text-sm text-gray-600">
                Rakiplerimizden %{savingsPercent} daha ucuz
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 line-through">
              {currency}{avgCompetitorPrice.toFixed(0)}
            </div>
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              {currency}{ourPrice}
            </div>
          </div>
        </div>

        {/* Savings Badge */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl flex items-center justify-between mb-4"
        >
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            <span className="font-semibold">
              {currency}{actualSavings.toFixed(0)} Tasarruf Ediyorsunuz!
            </span>
          </div>
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">
            %{savingsPercent} İNDİRİM
          </span>
        </motion.div>

        {/* Our Features */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center">
            <Shield className="w-5 h-5 text-green-600 mx-auto mb-1" />
            <div className="text-xs font-semibold text-gray-700">Ücretsiz İptal</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center">
            <Zap className="w-5 h-5 text-green-600 mx-auto mb-1" />
            <div className="text-xs font-semibold text-gray-700">Anında Onay</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center">
            <Star className="w-5 h-5 text-green-600 mx-auto mb-1" />
            <div className="text-xs font-semibold text-gray-700">4.9★ Puan</div>
          </div>
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full bg-white/60 hover:bg-white/80 backdrop-blur-sm rounded-lg px-4 py-3 flex items-center justify-between transition-all group"
        >
          <span className="text-sm font-semibold text-gray-700">
            Tüm Rakipleri Karşılaştır ({competitors.length} firma)
          </span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-600 group-hover:text-green-600 transition-colors" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600 group-hover:text-green-600 transition-colors" />
          )}
        </button>
      </div>

      {/* Expanded Comparison Table */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t-2 border-green-200 bg-white/50 backdrop-blur-sm"
          >
            <div className="p-6 space-y-3">
              {/* Our Price Row - Highlighted */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl p-4 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-lg">Travel LyDian</div>
                      <div className="text-xs text-green-100 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        <span>4.9/5 (1,247 değerlendirme)</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{currency}{ourPrice}</div>
                    <div className="text-xs text-green-100">EN İYİ FİYAT</div>
                  </div>
                </div>
              </motion.div>

              {/* Competitor Rows */}
              {sortedCompetitors.map((competitor, index) => (
                <motion.div
                  key={competitor.provider}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-4 border border-gray-200 hover:border-gray-300 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        {competitor.logo ? (
                          <img src={competitor.logo} alt={competitor.provider} className="w-8 h-8 object-contain" />
                        ) : (
                          <span className="text-xs font-bold text-gray-500">
                            {competitor.provider.substring(0, 2).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{competitor.provider}</div>
                        {competitor.rating && (
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span>{competitor.rating}/5</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-900">
                        {currency}{competitor.price}
                      </div>
                      <div className="text-xs text-red-600 font-semibold">
                        +{currency}{(competitor.price - ourPrice).toFixed(0)} daha pahalı
                      </div>
                    </div>
                  </div>

                  {/* Features Comparison */}
                  {competitor.features && (
                    <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2">
                      {competitor.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-1 text-xs">
                          <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Visit Link */}
                  {competitor.url && (
                    <a
                      href={competitor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      <span>Siteyi Ziyaret Et</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Footer Note */}
            <div className="px-6 pb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-xs text-gray-600 text-center">
                  <span className="font-semibold text-blue-600">💡 Fiyat Garantisi:</span>
                  {' '}Aynı tur için daha ucuz fiyat bulursanız, farkı iade ediyoruz!
                  <br />
                  Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PriceComparisonWidget;
