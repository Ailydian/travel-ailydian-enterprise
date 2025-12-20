/**
 * 🚗 Antalya Airport Transfer - Premium Transfer Service
 * Complete transfer solution for Antalya region (AYT & GZP airports)
 * Industry-leading features: real-time pricing, vehicle selection, booking flow
 * SEO-optimized for Akdeniz region top rankings
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
  Info,
  Phone,
  MessageCircle,
  Award,
  Zap,
  Heart,
  TrendingUp,
  ArrowLeftRight,
  Plus,
  Minus,
  X,
  Check,
  AlertCircle,
  Baby,
  MapPinned,
  Navigation,
  DollarSign,
  Hand,
  ShoppingBag,
  UserCheck,
} from 'lucide-react';
import ResponsiveHeaderBar from '../../components/layout/ResponsiveHeaderBar';
import { useCart } from '../../context/CartContext';
import { logInfo, logError } from '../../lib/logger';
import {
  ALL_ANTALYA_LOCATIONS,
  ANTALYA_AIRPORTS,
  getLocationById,
  getPopularLocations,
  searchLocations,
  type TransferLocation,
} from '../../data/antalya-transfer-locations';
import {
  TRANSFER_VEHICLES,
  getVehiclesByCapacity,
  calculateTransferPrice,
  EXTRA_SERVICES,
  type VehicleType,
  type ExtraService,
} from '../../data/transfer-vehicles';

interface TransferSearchParams {
  from: string;
  to: string;
  fromType: 'airport' | 'location';
  toType: 'airport' | 'location';
  passengers: number;
  luggage: number;
  date: string;
  time: string;
  returnDate?: string;
  isRoundTrip: boolean;
}

interface TransferQuote {
  fromLocation: TransferLocation;
  toLocation: TransferLocation;
  distance: number;
  duration: number;
  vehicles: Array<{
    vehicle: VehicleType;
    price: number;
    priceReturn?: number;
    totalPrice: number;
  }>;
}

// Icon mapper for extra services
const getExtraServiceIcon = (iconName: string) => {
  const icons: Record<string, React.ElementType> = {
    baby: Baby,
    child: UserCheck,
    meetgreet: Hand,
    clock: Clock,
    shopping: ShoppingBag,
    wifi: Wifi,
  };
  return icons[iconName] || Baby;
};

export default function AntalyaTransferPage() {
  const router = useRouter();
  const { addItem } = useCart();

  // Search State
  const [searchParams, setSearchParams] = useState<TransferSearchParams>({
    from: '',
    to: '',
    fromType: 'airport',
    toType: 'location',
    passengers: 2,
    luggage: 2,
    date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: '12:00',
    isRoundTrip: false,
  });

  // UI State
  const [quotes, setQuotes] = useState<TransferQuote | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [showQuickBooking, setShowQuickBooking] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [fromSuggestions, setFromSuggestions] = useState<TransferLocation[]>([]);
  const [toSuggestions, setToSuggestions] = useState<TransferLocation[]>([]);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  // Initialize from URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('from')) {
      setSearchParams(prev => ({ ...prev, from: params.get('from')! }));
    }
    if (params.get('to')) {
      setSearchParams(prev => ({ ...prev, to: params.get('to')! }));
    }
  }, []);

  // Handle "From" search
  const handleFromSearch = useCallback((query: string) => {
    setSearchParams(prev => ({ ...prev, from: query }));
    if (query.length >= 2) {
      const results = searchLocations(query);
      const airports = results.filter(loc => loc.type === 'airport');
      setFromSuggestions(airports.length > 0 ? airports : results.slice(0, 8));
      setShowFromDropdown(true);
    } else {
      setShowFromDropdown(false);
    }
  }, []);

  // Handle "To" search
  const handleToSearch = useCallback((query: string) => {
    setSearchParams(prev => ({ ...prev, to: query }));
    if (query.length >= 2) {
      const results = searchLocations(query);
      setToSuggestions(results.slice(0, 10));
      setShowToDropdown(true);
    } else {
      setShowToDropdown(false);
    }
  }, []);

  // Select location
  const selectFromLocation = (location: TransferLocation) => {
    setSearchParams(prev => ({
      ...prev,
      from: location.name,
      fromType: location.type === 'airport' ? 'airport' : 'location',
    }));
    setShowFromDropdown(false);
  };

  const selectToLocation = (location: TransferLocation) => {
    setSearchParams(prev => ({
      ...prev,
      to: location.name,
      toType: location.type === 'airport' ? 'airport' : 'location',
    }));
    setShowToDropdown(false);
  };

  // Swap locations
  const swapLocations = () => {
    setSearchParams(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from,
      fromType: prev.toType,
      toType: prev.fromType,
    }));
  };

  // Search transfers
  const handleSearch = useCallback(async () => {
    if (!searchParams.from || !searchParams.to) {
      setToastMessage('⚠️ Lütfen kalkış ve varış noktalarını seçin');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    setLoading(true);
    setQuotes(null);

    try {
      // Find locations
      const fromLocations = searchLocations(searchParams.from);
      const toLocations = searchLocations(searchParams.to);

      const fromLoc = fromLocations[0];
      const toLoc = toLocations[0];

      if (!fromLoc || !toLoc) {
        throw new Error('Lokasyon bulunamadı');
      }

      // Calculate distance and duration
      const distance =
        searchParams.fromType === 'airport' && searchParams.toType === 'location'
          ? toLoc.distanceFromAYT || toLoc.distanceFromGZP
          : searchParams.fromType === 'location' && searchParams.toType === 'airport'
          ? fromLoc.distanceFromAYT || fromLoc.distanceFromGZP
          : Math.abs(fromLoc.distanceFromAYT - toLoc.distanceFromAYT);

      const duration =
        searchParams.fromType === 'airport' && searchParams.toType === 'location'
          ? toLoc.transferDuration.fromAYT || toLoc.transferDuration.fromGZP
          : searchParams.fromType === 'location' && searchParams.toType === 'airport'
          ? fromLoc.transferDuration.fromAYT || fromLoc.transferDuration.fromGZP
          : Math.abs(fromLoc.transferDuration.fromAYT - toLoc.transferDuration.fromAYT);

      // Get suitable vehicles
      const suitableVehicles = getVehiclesByCapacity(searchParams.passengers);

      // Calculate prices
      const vehiclesWithPrices = suitableVehicles.map(vehicle => {
        const price = calculateTransferPrice(distance, vehicle.id, false);
        const priceReturn = searchParams.isRoundTrip
          ? calculateTransferPrice(distance, vehicle.id, false)
          : undefined;
        const totalPrice = searchParams.isRoundTrip ? price + (priceReturn || 0) : price;

        return {
          vehicle,
          price,
          priceReturn,
          totalPrice,
        };
      });

      setQuotes({
        fromLocation: fromLoc,
        toLocation: toLoc,
        distance,
        duration,
        vehicles: vehiclesWithPrices,
      });

      logInfo('Transfer quotes generated', {
        from: fromLoc.name,
        to: toLoc.name,
        distance,
        vehicleCount: vehiclesWithPrices.length,
      });
    } catch (error) {
      logError('Transfer search failed', error);
      setToastMessage('❌ Transfer araması başarısız oldu');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  // Add to cart
  const handleAddToCart = useCallback(
    (vehicleWithPrice: { vehicle: VehicleType; price: number; totalPrice: number }) => {
      if (!quotes) return;

      const extrasTotal = selectedExtras.reduce((sum, extraId) => {
        const extra = EXTRA_SERVICES.find(e => e.id === extraId);
        return sum + (extra?.price || 0);
      }, 0);

      addItem({
        id: `transfer-${Date.now()}`,
        type: 'transfer',
        title: `${vehicleWithPrice.vehicle.name} Transfer`,
        description: `${quotes.fromLocation.name} → ${quotes.toLocation.name}${
          searchParams.isRoundTrip ? ' (Gidiş-Dönüş)' : ''
        }`,
        image: vehicleWithPrice.vehicle.image,
        price: vehicleWithPrice.totalPrice + extrasTotal,
        currency: 'TRY',
        quantity: 1,
        location: `${quotes.fromLocation.name} - ${quotes.toLocation.name}`,
        duration: `${quotes.duration} dakika`,
        transferDetails: {
          from: quotes.fromLocation.name,
          to: quotes.toLocation.name,
          distance: quotes.distance,
          vehicleType: vehicleWithPrice.vehicle.id,
          capacity: vehicleWithPrice.vehicle.capacity.passengers,
          luggageCapacity: vehicleWithPrice.vehicle.capacity.luggage,
          features: vehicleWithPrice.vehicle.features,
          isVIP: vehicleWithPrice.vehicle.category === 'premium' || vehicleWithPrice.vehicle.category === 'luxury',
          passengers: searchParams.passengers,
          date: searchParams.date,
          time: searchParams.time,
          isRoundTrip: searchParams.isRoundTrip,
          extras: selectedExtras.map(id => EXTRA_SERVICES.find(e => e.id === id)!.name),
        },
        isRefundable: true,
        cancellationPolicy: 'Ücretsiz iptal: 24 saat öncesine kadar',
      });

      setToastMessage(`✅ ${vehicleWithPrice.vehicle.name} sepete eklendi!`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setSelectedExtras([]);
    },
    [quotes, searchParams, selectedExtras, addItem]
  );

  // Quick booking (Add to cart + Go to checkout)
  const handleQuickBook = useCallback(
    (vehicleWithPrice: { vehicle: VehicleType; price: number; totalPrice: number }) => {
      handleAddToCart(vehicleWithPrice);
      setTimeout(() => router.push('/cart'), 800);
    },
    [handleAddToCart, router]
  );

  // Popular routes
  const popularRoutes = useMemo(
    () => [
      { from: 'AYT', to: 'lara', label: 'Antalya Havalimanı → Lara' },
      { from: 'AYT', to: 'belek', label: 'Antalya Havalimanı → Belek' },
      { from: 'AYT', to: 'side', label: 'Antalya Havalimanı → Side' },
      { from: 'AYT', to: 'kemer', label: 'Antalya Havalimanı → Kemer' },
      { from: 'GZP', to: 'alanya', label: 'Gazipaşa Havalimanı → Alanya' },
      { from: 'GZP', to: 'mahmutlar', label: 'Gazipaşa Havalimanı → Mahmutlar' },
    ],
    []
  );

  const fillPopularRoute = (from: string, to: string) => {
    const fromLoc = getLocationById(from);
    const toLoc = getLocationById(to);
    if (fromLoc && toLoc) {
      setSearchParams(prev => ({
        ...prev,
        from: fromLoc.name,
        to: toLoc.name,
        fromType: fromLoc.type === 'airport' ? 'airport' : 'location',
        toType: toLoc.type === 'airport' ? 'airport' : 'location',
      }));
      setTimeout(() => handleSearch(), 300);
    }
  };

  return (
    <>
      <Head>
        <title>
          Antalya Havalimanı Transfer | AYT & Gazipaşa Transfer Hizmetleri | Ailydian
        </title>
        <meta
          name="description"
          content="Antalya Havalimanı (AYT) ve Gazipaşa (GZP) havalimanı transfer hizmetleri. Tüm Antalya ilçeleri: Lara, Belek, Side, Kemer, Alanya. VIP ve ekonomik araçlar, 7/24 hizmet, güvenli transfer."
        />
        <meta
          name="keywords"
          content="antalya havalimanı transfer, antalya airport transfer, gazipaşa havalimanı transfer, belek transfer, side transfer, kemer transfer, alanya transfer, lara transfer, antalya vip transfer, ucuz transfer antalya, akdeniz transfer"
        />
        <meta property="og:title" content="Antalya Havalimanı Transfer - Premium Transfer Hizmetleri" />
        <meta
          property="og:description"
          content="Antalya ve Gazipaşa havalimanlarından tüm Akdeniz bölgesine transfer hizmetleri. Online rezervasyon, sabit fiyat garantisi."
        />
        <link rel="canonical" href="https://travel.ailydian.com/transfers" />
      </Head>

      <ResponsiveHeaderBar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white pt-24 pb-32 md:pb-40 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/30"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-semibold">7/24 Premium Transfer Hizmeti</span>
            </motion.div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Antalya Havalimanı
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Transfer Hizmetleri
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Antalya (AYT) ve Gazipaşa (GZP) havalimanlarından tüm Akdeniz bölgesine
              <br className="hidden md:block" />
              güvenli, konforlu ve ekonomik transfer
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { icon: Shield, label: '7/24 Güvenli', desc: 'Lisanslı Şoförler' },
                { icon: Star, label: 'VIP Araçlar', desc: 'Lüks Filo' },
                { icon: DollarSign, label: 'Sabit Fiyat', desc: 'Ek Ücret Yok' },
                { icon: Award, label: '%100 Garanti', desc: 'Zamanında Teslimat' },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all"
                >
                  <feature.icon className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                  <p className="text-sm font-bold mb-1">{feature.label}</p>
                  <p className="text-xs text-white/70">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-12 md:h-24 text-white"
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </section>

      {/* Search Section */}
      <section className="-mt-20 md:-mt-32 relative z-10 mb-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 border border-gray-100"
          >
            {/* Search Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                  <Search className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Transfer Ara</h2>
                  <p className="text-gray-600 mt-1">Size en uygun transfer seçeneğini bulun</p>
                </div>
              </div>

              {/* Round Trip Toggle */}
              <div className="hidden md:flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 px-5 py-3 rounded-xl border border-green-200">
                <input
                  type="checkbox"
                  id="round-trip"
                  checked={searchParams.isRoundTrip}
                  onChange={e => setSearchParams(prev => ({ ...prev, isRoundTrip: e.target.checked }))}
                  className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <label htmlFor="round-trip" className="flex items-center gap-2 cursor-pointer">
                  <ArrowLeftRight className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-gray-900">Gidiş-Dönüş</span>
                  <span className="text-xs text-green-700 font-bold bg-green-200 px-2 py-0.5 rounded-full">
                    %10 İndirim
                  </span>
                </label>
              </div>
            </div>

            {/* Search Form */}
            <div className="space-y-6">
              {/* From & To */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* From */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1 text-blue-600" />
                    Nereden (Kalkış)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchParams.from}
                      onChange={e => handleFromSearch(e.target.value)}
                      onFocus={() => {
                        if (searchParams.from.length >= 2) setShowFromDropdown(true);
                      }}
                      placeholder="Antalya Havalimanı, Gazipaşa..."
                      className="w-full px-4 py-4 pr-12 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition-all"
                    />
                    <MapPinned className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>

                  {/* From Dropdown */}
                  <AnimatePresence>
                    {showFromDropdown && fromSuggestions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-200 max-h-80 overflow-y-auto"
                      >
                        {fromSuggestions.map(loc => (
                          <button
                            key={loc.id}
                            onClick={() => selectFromLocation(loc)}
                            className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center gap-3 border-b border-gray-100 last:border-0"
                          >
                            <MapPin className="w-4 h-4 text-blue-600" />
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900">{loc.name}</p>
                              <p className="text-xs text-gray-500">{loc.region}</p>
                            </div>
                            {loc.type === 'airport' && (
                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-bold">
                                Havalimanı
                              </span>
                            )}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* To */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Navigation className="w-4 h-4 inline mr-1 text-purple-600" />
                    Nereye (Varış)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchParams.to}
                      onChange={e => handleToSearch(e.target.value)}
                      onFocus={() => {
                        if (searchParams.to.length >= 2) setShowToDropdown(true);
                      }}
                      placeholder="Lara, Belek, Side, Kemer, Alanya..."
                      className="w-full px-4 py-4 pr-12 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg transition-all"
                    />
                    <button
                      onClick={swapLocations}
                      className="absolute right-12 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-gray-100 transition-colors z-10"
                      title="Yerleri Değiştir"
                    >
                      <ArrowLeftRight className="w-5 h-5 text-gray-600 hover:text-purple-600" />
                    </button>
                    <MapPinned className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>

                  {/* To Dropdown */}
                  <AnimatePresence>
                    {showToDropdown && toSuggestions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-200 max-h-80 overflow-y-auto"
                      >
                        {toSuggestions.map(loc => (
                          <button
                            key={loc.id}
                            onClick={() => selectToLocation(loc)}
                            className="w-full px-4 py-3 text-left hover:bg-purple-50 transition-colors flex items-center gap-3 border-b border-gray-100 last:border-0"
                          >
                            <Navigation className="w-4 h-4 text-purple-600" />
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900">{loc.name}</p>
                              <p className="text-xs text-gray-500">
                                {loc.region} • {loc.distanceFromAYT}km from AYT
                              </p>
                            </div>
                            {loc.popular && (
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            )}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Date, Time, Passengers, Luggage */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {/* Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1 text-green-600" />
                    Tarih
                  </label>
                  <input
                    type="date"
                    value={searchParams.date}
                    onChange={e => setSearchParams(prev => ({ ...prev, date: e.target.value }))}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-1 text-orange-600" />
                    Saat
                  </label>
                  <input
                    type="time"
                    value={searchParams.time}
                    onChange={e => setSearchParams(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  />
                </div>

                {/* Passengers */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Users className="w-4 h-4 inline mr-1 text-indigo-600" />
                    Yolcu
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setSearchParams(prev => ({ ...prev, passengers: Math.max(1, prev.passengers - 1) }))
                      }
                      className="flex-shrink-0 w-10 h-12 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <div className="flex-1 min-w-0 text-center text-lg font-bold text-gray-900 bg-gray-50 rounded-lg py-3">
                      {searchParams.passengers}
                    </div>
                    <button
                      onClick={() =>
                        setSearchParams(prev => ({ ...prev, passengers: Math.min(30, prev.passengers + 1) }))
                      }
                      className="flex-shrink-0 w-10 h-12 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Luggage */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Luggage className="w-4 h-4 inline mr-1 text-red-600" />
                    Bagaj
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setSearchParams(prev => ({ ...prev, luggage: Math.max(0, prev.luggage - 1) }))
                      }
                      className="flex-shrink-0 w-10 h-12 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <div className="flex-1 min-w-0 text-center text-lg font-bold text-gray-900 bg-gray-50 rounded-lg py-3">
                      {searchParams.luggage}
                    </div>
                    <button
                      onClick={() =>
                        setSearchParams(prev => ({ ...prev, luggage: Math.min(20, prev.luggage + 1) }))
                      }
                      className="flex-shrink-0 w-10 h-12 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile Round Trip */}
              <div className="md:hidden flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 px-5 py-3 rounded-xl border border-green-200">
                <input
                  type="checkbox"
                  id="round-trip-mobile"
                  checked={searchParams.isRoundTrip}
                  onChange={e => setSearchParams(prev => ({ ...prev, isRoundTrip: e.target.checked }))}
                  className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <label htmlFor="round-trip-mobile" className="flex items-center gap-2 cursor-pointer flex-1">
                  <ArrowLeftRight className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-gray-900">Gidiş-Dönüş</span>
                  <span className="text-xs text-green-700 font-bold bg-green-200 px-2 py-0.5 rounded-full">
                    %10 İndirim
                  </span>
                </label>
              </div>

              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSearch}
                disabled={loading}
                className="w-full py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Araçlar Bulunuyor...
                  </>
                ) : (
                  <>
                    <Search className="w-6 h-6" />
                    Transfer Seçeneklerini Göster
                    <ChevronRight className="w-6 h-6" />
                  </>
                )}
              </motion.button>
            </div>

            {/* Popular Routes */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                Popüler Transferler:
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularRoutes.map((route, i) => (
                  <button
                    key={i}
                    onClick={() => fillPopularRoute(route.from, route.to)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border border-blue-200 text-blue-700 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-md"
                  >
                    {route.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quotes/Results Section */}
      {quotes && (
        <section className="max-w-7xl mx-auto px-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Result Header */}
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Transfer Seçenekleri
              </h2>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">{quotes.fromLocation.name}</span>
                </div>
                <ArrowRight className="w-5 h-5" />
                <div className="flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold">{quotes.toLocation.name}</span>
                </div>
                <span className="text-gray-400">•</span>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{quotes.distance} km</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{quotes.duration} dakika</span>
                </div>
              </div>
            </div>

            {/* Vehicles Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {quotes.vehicles.map((vehicleQuote, index) => (
                <motion.div
                  key={vehicleQuote.vehicle.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-blue-200"
                >
                  {/* Vehicle Image */}
                  <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-8">
                    <Car className="w-32 h-32 text-gray-400" />
                    {vehicleQuote.vehicle.popular && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                        <Star className="w-4 h-4 fill-current" />
                        Popüler
                      </div>
                    )}
                    {vehicleQuote.vehicle.category === 'luxury' && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                        <Sparkles className="w-4 h-4" />
                        Lüks
                      </div>
                    )}
                  </div>

                  {/* Vehicle Info */}
                  <div className="p-6">
                    {/* Title */}
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {vehicleQuote.vehicle.name}
                      </h3>
                      <p className="text-gray-600">{vehicleQuote.vehicle.description}</p>
                    </div>

                    {/* Capacity */}
                    <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold text-gray-900">
                          {vehicleQuote.vehicle.capacity.passengers} Yolcu
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Luggage className="w-5 h-5 text-purple-600" />
                        <span className="font-semibold text-gray-900">
                          {vehicleQuote.vehicle.capacity.luggage} Bagaj
                        </span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Özellikler:
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {vehicleQuote.vehicle.features.slice(0, 6).map((feature, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                            <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-5 mb-6 border border-blue-100">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-gray-700 font-semibold">Tek Yön:</span>
                        <span className="text-3xl font-bold text-blue-600">
                          {vehicleQuote.price} ₺
                        </span>
                      </div>
                      {searchParams.isRoundTrip && vehicleQuote.priceReturn && (
                        <>
                          <div className="flex items-center justify-between mb-3 text-sm">
                            <span className="text-gray-600">Dönüş:</span>
                            <span className="text-gray-600 line-through">
                              {vehicleQuote.priceReturn} ₺
                            </span>
                          </div>
                          <div className="flex items-center justify-between pt-3 border-t border-blue-200">
                            <span className="font-bold text-gray-900">Toplam (Gidiş-Dönüş):</span>
                            <div className="text-right">
                              <div className="text-xs text-green-600 font-semibold mb-1">%10 İndirim Uygulandı</div>
                              <span className="text-3xl font-bold text-green-600">
                                {vehicleQuote.totalPrice} ₺
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleQuickBook(vehicleQuote)}
                        className="w-full py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        Hemen Rezervasyon Yap
                        <ChevronRight className="w-5 h-5" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAddToCart(vehicleQuote)}
                        className="w-full py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        Sepete Ekle
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Extra Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-3xl p-8 border-2 border-yellow-200"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Plus className="w-7 h-7 text-yellow-600" />
                Ekstra Hizmetler
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {EXTRA_SERVICES.map(extra => (
                  <label
                    key={extra.id}
                    className="flex items-center gap-4 p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-yellow-400 cursor-pointer transition-all"
                  >
                    <input
                      type="checkbox"
                      checked={selectedExtras.includes(extra.id)}
                      onChange={e => {
                        if (e.target.checked) {
                          setSelectedExtras(prev => [...prev, extra.id]);
                        } else {
                          setSelectedExtras(prev => prev.filter(id => id !== extra.id));
                        }
                      }}
                      className="w-5 h-5 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {React.createElement(getExtraServiceIcon(extra.iconName), {
                          className: "w-6 h-6 text-yellow-600"
                        })}
                        <p className="font-semibold text-gray-900">{extra.name}</p>
                      </div>
                      <p className="text-xs text-gray-600">{extra.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-yellow-600">+{extra.price} ₺</p>
                    </div>
                  </label>
                ))}
              </div>
              {selectedExtras.length > 0 && (
                <div className="mt-6 pt-6 border-t border-yellow-200 flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">Ekstra Hizmetler Toplamı:</span>
                  <span className="text-2xl font-bold text-yellow-600">
                    +
                    {selectedExtras.reduce((sum, id) => {
                      const extra = EXTRA_SERVICES.find(e => e.id === id);
                      return sum + (extra?.price || 0);
                    }, 0)}{' '}
                    ₺
                  </span>
                </div>
              )}
            </motion.div>
          </motion.div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Neden Ailydian Transfer?
            </h2>
            <p className="text-xl text-gray-600">
              Akdeniz bölgesinin en güvenilir transfer hizmeti
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: '7/24 Güvenli Transfer',
                desc: 'Lisanslı şoförler ve sigortalı araçlarla güvenle seyahat edin',
                color: 'blue',
              },
              {
                icon: DollarSign,
                title: 'Sabit Fiyat Garantisi',
                desc: 'Rezervasyon sonrası ek ücret yok, şeffaf fiyatlandırma',
                color: 'green',
              },
              {
                icon: Award,
                title: '%100 Zamanında',
                desc: 'Uçuş takibi ile gecikmesiz karşılama garantisi',
                color: 'purple',
              },
              {
                icon: Heart,
                title: 'Müşteri Memnuniyeti',
                desc: '50,000+ mutlu müşteri, %98 memnuniyet oranı',
                color: 'pink',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 flex items-center justify-center mb-4 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Sıkça Sorulan Sorular
          </h2>
        </motion.div>

        <div className="space-y-4">
          {[
            {
              q: 'Transfer rezervasyonu nasıl yapılır?',
              a: 'Yukarıdaki arama formunu doldurarak kalkış ve varış noktalarınızı, tarih ve yolcu sayınızı seçin. Size uygun aracı seçtikten sonra sepete ekleyerek rezervasyonunuzu tamamlayabilirsiniz.',
            },
            {
              q: 'Ödeme nasıl yapılır?',
              a: 'Kredi kartı, banka kartı ve havale ile ödeme yapabilirsiniz. Tüm ödemeler SSL sertifikası ile güvenli şekilde işlenir.',
            },
            {
              q: 'Uçuşum gecikirse ne olur?',
              a: 'Şoförlerimiz uçuş takibi yapar. Uçuşunuz gecikirse şoförünüz sizi bekler, ek ücret talep edilmez.',
            },
            {
              q: 'İptal politikası nedir?',
              a: 'Transfer tarihinden 24 saat öncesine kadar ücretsiz iptal hakkınız bulunmaktadır.',
            },
          ].map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />
                {faq.q}
              </h3>
              <p className="text-gray-600 pl-8">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Güvenli ve Konforlu Yolculuk İçin
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Hemen rezervasyon yapın, sorunsuz transfer deneyimi yaşayın
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#search"
                onClick={e => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-2"
              >
                <Search className="w-6 h-6" />
                Hemen Transfer Ara
              </a>
              <a
                href="tel:+908501234567"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
              >
                <Phone className="w-6 h-6" />
                0850 123 45 67
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-[9999] max-w-md"
          >
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border-2 border-white/30">
              <CheckCircle className="w-6 h-6 flex-shrink-0" />
              <span className="font-semibold">{toastMessage}</span>
              <button
                onClick={() => setShowToast(false)}
                className="ml-4 p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Contact Button */}
      <motion.a
        href="https://wa.me/908501234567"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 left-8 z-[9998] w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-3xl transition-all duration-300"
      >
        <MessageCircle className="w-8 h-8" />
      </motion.a>
    </>
  );
}
