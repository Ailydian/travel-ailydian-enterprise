/**
 * Airport Transfers Page
 * VIP and Standard airport transfer services for Antalya/Alanya region
 */

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car,
  Search,
  MapPin,
  Users,
  Luggage,
  Calendar,
  Clock,
  Star,
  Shield,
  Wifi,
  Coffee,
  Sparkles,
  ChevronRight,
  Filter,
  ArrowRight,
  ShoppingCart,
  CheckCircle,
} from 'lucide-react';
import NavigationHeader from '../../components/layout/NavigationHeader';
import { useCart } from '../../context/CartContext';
import { logInfo, logError } from '../../lib/logger';

interface Vehicle {
  id: string;
  vehicleType: string;
  name: string;
  capacity: number;
  luggageCapacity: number;
  priceStandard: number;
  priceVIP: number;
  features: string[];
  image: string;
}

interface Transfer {
  id: string;
  name: string;
  description: string;
  fromLocation: string;
  fromLocationFull: string;
  toLocation: string;
  distance: number;
  duration: number;
  region: string;
  popular?: boolean;
  image: string;
  vehicles: Vehicle[];
}

export default function TransfersPage() {
  const router = useRouter();
  const { addItem } = useCart();
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchFrom, setSearchFrom] = useState('');
  const [searchTo, setSearchTo] = useState('');
  const [passengers, setPassengers] = useState('4');
  const [isVIP, setIsVIP] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Fetch transfers on mount
  useEffect(() => {
    fetchTransfers();
  }, []);

  const fetchTransfers = async (query?: any) => {
    try {
      setLoading(true);
      const params = new URLSearchParams(query || {});
      const response = await fetch(`/api/transfers/search?${params}`);
      const data = await response.json();

      if (data.success) {
        setTransfers(data.transfers);
        logInfo('Transfers loaded', { count: data.count });
      }
    } catch (error) {
      logError('Failed to fetch transfers', error);
      console.error('Transfer fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const query: any = {};
    if (searchFrom) query.from = searchFrom;
    if (searchTo) query.to = searchTo;
    if (passengers) query.passengers = passengers;
    if (isVIP) query.isVIP = 'true';
    if (selectedRegion !== 'all') query.region = selectedRegion;

    fetchTransfers(query);
  };

  // Cart handler functions
  const handleAddToCart = (transfer: Transfer, vehicle: Vehicle) => {
    const price = isVIP ? vehicle.priceVIP : vehicle.priceStandard;
    addItem({
      id: `transfer-${transfer.id}-${vehicle.id}`,
      type: 'transfer',
      title: `${transfer.name} - ${vehicle.name}`,
      description: `${transfer.fromLocation} → ${transfer.toLocation} (${transfer.distance}km, ${transfer.duration} dakika)`,
      image: vehicle.image,
      price: price,
      currency: 'TRY',
      quantity: 1,
      location: `${transfer.fromLocation} - ${transfer.toLocation}`,
      duration: `${transfer.duration} dakika`,
      transferDetails: {
        from: transfer.fromLocation,
        to: transfer.toLocation,
        distance: transfer.distance,
        vehicleType: vehicle.vehicleType,
        capacity: vehicle.capacity,
        luggageCapacity: vehicle.luggageCapacity,
        features: vehicle.features,
        isVIP: isVIP,
        passengers: parseInt(passengers),
      },
      isRefundable: true,
      cancellationPolicy: 'Ücretsiz iptal: 24 saat öncesine kadar'
    });
    setToastMessage(`${vehicle.name} transfer sepete eklendi!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleReserve = (transfer: Transfer, vehicle: Vehicle) => {
    handleAddToCart(transfer, vehicle);
    setTimeout(() => router.push('/cart'), 500);
  };

  const regions = [
    { id: 'all', label: 'Tüm Bölgeler' },
    { id: 'Antalya', label: 'Antalya' },
    { id: 'Alanya', label: 'Alanya' },
    { id: 'Antalya-Alanya', label: 'Antalya-Alanya' },
  ];

  return (
    <>
      <Head>
        <title>Havalimanı Transfer - VIP & Standart Transfer Hizmetleri | Travel.Ailydian</title>
        <meta
          name="description"
          content="Antalya ve Alanya havalimanı transfer hizmetleri. VIP ve standart araçlar, profesyonel şoförler, 7/24 destek. Güvenli ve konforlu yolculuk."
        />
      </Head>

      <NavigationHeader />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative max-w-7xl mx-auto px-4 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">VIP & Standart Transfer Hizmetleri</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Havalimanı Transfer
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Antalya ve Alanya bölgesinde güvenli, konforlu ve profesyonel havalimanı transfer hizmetleri
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Shield, label: '7/24 Güvenli' },
              { icon: Star, label: 'VIP Hizmet' },
              { icon: Wifi, label: 'Ücretsiz Wi-Fi' },
              { icon: Coffee, label: 'İkram' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
              >
                <feature.icon className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm font-medium">{feature.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <Search className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Transfer Ara</h2>
              <p className="text-gray-600">Size en uygun transfer seçeneğini bulun</p>
            </div>
          </div>

          {/* Search Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {/* From */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Nereden
              </label>
              <input
                type="text"
                value={searchFrom}
                onChange={(e) => setSearchFrom(e.target.value)}
                placeholder="Havalimanı"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* To */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Nereye
              </label>
              <input
                type="text"
                value={searchTo}
                onChange={(e) => setSearchTo(e.target.value)}
                placeholder="Destinasyon"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Passengers */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 inline mr-1" />
                Yolcu Sayısı
              </label>
              <select
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14].map((num) => (
                  <option key={num} value={num}>
                    {num} Kişi
                  </option>
                ))}
              </select>
            </div>

            {/* Region */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="w-4 h-4 inline mr-1" />
                Bölge
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {regions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div>
              <label className="block text-sm font-medium text-transparent mb-2">.</label>
              <button
                onClick={handleSearch}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                Ara
              </button>
            </div>
          </div>

          {/* VIP Toggle */}
          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-200">
            <input
              type="checkbox"
              id="vip-toggle"
              checked={isVIP}
              onChange={(e) => setIsVIP(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
            />
            <label htmlFor="vip-toggle" className="flex items-center gap-2 cursor-pointer">
              <Sparkles className="w-5 h-5 text-yellow-600" />
              <span className="font-semibold text-gray-900">VIP Transfer (Lüks araç, meet & greet, özel hizmetler)</span>
            </label>
          </div>
        </motion.div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Transfer seçenekleri yükleniyor...</p>
          </div>
        ) : transfers.length === 0 ? (
          <div className="text-center py-20">
            <Car className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Transfer bulunamadı</h3>
            <p className="text-gray-600">Farklı kriterlerle tekrar deneyin</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Mevcut Transferler
                </h2>
                <p className="text-gray-600 mt-2">
                  {transfers.length} transfer seçeneği bulundu
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {transfers.map((transfer, index) => (
                <motion.div
                  key={transfer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  {/* Transfer Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={transfer.image}
                      alt={transfer.name}
                      className="w-full h-full object-cover"
                    />
                    {transfer.popular && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                        <Star className="w-4 h-4 fill-current" />
                        En Popüler
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                      {transfer.fromLocation} → {transfer.toLocation}
                    </div>
                  </div>

                  {/* Transfer Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{transfer.name}</h3>
                    <p className="text-gray-600 mb-4">{transfer.description}</p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{transfer.distance} km</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{transfer.duration} dakika</span>
                      </div>
                      <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                        {transfer.region}
                      </div>
                    </div>

                    {/* Vehicles */}
                    <div className="space-y-3">
                      {transfer.vehicles.map((vehicle) => (
                        <div
                          key={vehicle.id}
                          className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                          <img
                            src={vehicle.image}
                            alt={vehicle.name}
                            className="w-20 h-16 object-cover rounded-lg"
                          />

                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{vehicle.name}</h4>
                            <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {vehicle.capacity}
                              </span>
                              <span className="flex items-center gap-1">
                                <Luggage className="w-4 h-4" />
                                {vehicle.luggageCapacity}
                              </span>
                            </div>
                          </div>

                          <div className="text-right min-w-[180px]">
                            <div className="text-sm text-gray-500 line-through">
                              {vehicle.priceVIP} TRY
                            </div>
                            <div className="text-2xl font-bold text-blue-600 mb-2">
                              {isVIP ? vehicle.priceVIP : vehicle.priceStandard} TRY
                            </div>
                            <div className="flex flex-col gap-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleAddToCart(transfer, vehicle)}
                                className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-1"
                              >
                                <ShoppingCart className="w-4 h-4" />
                                Sepete Ekle
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleReserve(transfer, vehicle)}
                                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-1"
                              >
                                Rezervasyon
                                <ArrowRight className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 z-50 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3"
          >
            <CheckCircle className="w-6 h-6" />
            <span className="font-medium">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
