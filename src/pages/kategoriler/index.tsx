import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import {
  MapPin,
  Calendar,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Filter
} from 'lucide-react';
import {
  getAllCategories,
  getSeasonalRecommendations,
  type TurkeyCategory
} from '@/lib/turkeyCategories';

const CategoriesPage: React.FC = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<TurkeyCategory[]>([]);
  const [seasonal, setSeasonal] = useState<{
    current: TurkeyCategory[];
    upcoming: TurkeyCategory[];
  }>({ current: [], upcoming: [] });
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'seasonal'>('all');

  useEffect(() => {
    const allCategories = getAllCategories();
    const seasonalRecs = getSeasonalRecommendations();

    setCategories(allCategories);
    setSeasonal(seasonalRecs);
  }, []);

  const currentMonth = new Date().toLocaleString('tr-TR', { month: 'long' });

  const displayedCategories = selectedFilter === 'seasonal'
    ? seasonal.current
    : categories;

  return (
    <>
      <Head>
        <title>Türkiye'ye Özel Tatil Kategorileri | Travel LyDian</title>
        <meta
          name="description"
          content="Termal oteller, kış sporları, butik oteller, koy otelleri, tarihi konaklar ve daha fazlası. Türkiye'nin benzersiz tatil deneyimleri."
        />
        <meta
          name="keywords"
          content="termal otel, kayak oteli, butik otel, koy oteli, tarihi konak, yayla evi, mağara otel, bağ evi"
        />
      </Head>

      <div className="min-h-screen bg-white/5">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">Türkiye'ye Özel Kategoriler</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Benzersiz Tatil Deneyimleri
              </h1>

              <p className="text-xl text-purple-100 max-w-3xl mx-auto">
                Türkiye'nin doğal güzelliklerini ve kültürel zenginliklerini
                yansıtan özel kategorilerimizle unutulmaz tatiller yapın
              </p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Filters */}
          <div className="flex items-center gap-3 mb-8">
            <Filter className="h-5 w-5 text-gray-300" />
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedFilter === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/5 text-gray-200 hover:bg-white/10'
              }`}
            >
              Tüm Kategoriler ({categories.length})
            </button>
            <button
              onClick={() => setSelectedFilter('seasonal')}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedFilter === 'seasonal'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/5 text-gray-200 hover:bg-white/10'
              }`}
            >
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {currentMonth} için İdeal ({seasonal.current.length})
              </span>
            </button>
          </div>

          {/* Seasonal Banner */}
          {selectedFilter === 'seasonal' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border border-purple-200"
            >
              <div className="flex items-start gap-4">
                <TrendingUp className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {currentMonth} Ayı İçin Önerilerimiz
                  </h3>
                  <p className="text-sm text-gray-200">
                    Bu ay için en uygun {seasonal.current.length} kategoriyi sizin için seçtik.
                    Hava koşulları, sezon açılışları ve yerel etkinlikler göz önünde bulunduruldu.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => router.push(`/kategoriler/${category.slug}`)}
                className="group bg-transparent rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/80 to-blue-600/80 group-hover:from-purple-600/70 group-hover:to-blue-600/70 transition-all"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl group-hover:scale-110 transition-transform">
                      {category.icon}
                    </span>
                  </div>

                  {/* Best Months Badge */}
                  {category.bestMonths.includes(new Date().getMonth() + 1) && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      İdeal Sezon
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-600 transition-colors">
                    {category.name}
                  </h3>

                  <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                    {category.description}
                  </p>

                  {/* Popular Destinations */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-xs font-semibold text-gray-200">
                        Popüler Destinasyonlar:
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {category.popularDestinations.slice(0, 4).map((dest) => (
                        <span
                          key={dest}
                          className="text-xs bg-white/10 text-gray-200 px-2 py-1 rounded-full"
                        >
                          {dest}
                        </span>
                      ))}
                      {category.popularDestinations.length > 4 && (
                        <span className="text-xs text-gray-400 px-2 py-1">
                          +{category.popularDestinations.length - 4} daha
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-gray-300">Ortalama Fiyat:</span>
                    <span className="text-sm font-bold text-purple-600">
                      ₺{category.averagePrice.min.toLocaleString()} - ₺
                      {category.averagePrice.max.toLocaleString()}
                    </span>
                  </div>

                  {/* Features */}
                  <div className="flex items-center gap-2 text-xs text-gray-300 mb-4">
                    {category.features.slice(0, 3).map((feature) => (
                      <span key={feature} className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-purple-600 rounded-full"></div>
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors group-hover:shadow-lg">
                    <span>İncele</span>
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Why Choose These Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 bg-transparent rounded-xl shadow-md p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Neden Travel LyDian Kategorileri?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-white mb-2">
                  Türkiye'ye Özel
                </h3>
                <p className="text-sm text-gray-300">
                  Rakip platformlarda bulamayacağınız, Türkiye'nin benzersiz
                  tatil deneyimlerini kategorize ettik.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-white mb-2">Yerel Uzmanlık</h3>
                <p className="text-sm text-gray-300">
                  Her kategori için en iyi destinasyonları, zamanlamaları ve
                  aktiviteleri özenle seçtik.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-bold text-white mb-2">
                  En İyi Fiyat Garantisi
                </h3>
                <p className="text-sm text-gray-300">
                  Bundle pricing sistemimizle paket rezervasyonlarda %20'ye
                  varan indirimler kazanın.
                </p>
              </div>
            </div>
          </motion.div>

          {/* SEO Content */}
          <div className="mt-12 bg-white/10 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Türkiye'nin Benzersiz Tatil Deneyimleri
            </h2>

            <div className="prose max-w-none text-gray-200">
              <p>
                Travel LyDian olarak, Türkiye'nin zengin kültürel mirası ve doğal güzelliklerini
                yansıtan özel kategoriler oluşturduk. Termal oteller, kış sporları tesisleri,
                butik oteller, koy otelleri, tarihi konaklar, yayla evleri, mağara oteller ve
                bağ evleri gibi benzersiz konaklama seçenekleriyle unutulmaz tatiller yapabilirsiniz.
              </p>

              <p className="mt-4">
                Her kategori, destinasyonun özelliklerine göre özenle seçilmiş tesisleri,
                aktiviteleri ve en uygun seyahat zamanlarını içerir. AI-powered arama sistemimiz
                sayesinde size en uygun kategoriyi ve tesisi kolayca bulabilirsiniz.
              </p>

              <p className="mt-4">
                Bundle pricing sistemimizle paket rezervasyonlar yaparak %20'ye varan
                indirimlerden yararlanabilir, LyDian Miles programıyla her rezervasyonunuzda
                puan kazanabilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
