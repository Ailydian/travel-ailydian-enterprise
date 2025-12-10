import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { logInfo, logError } from '../lib/logger';
import {
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Plane,
  Building,
  Activity,
  Car,
  Filter,
  Search,
  Download,
  Eye,
  RefreshCw,
  ChevronRight,
  Package
} from 'lucide-react';

interface Booking {
  id: string;
  bookingType: string;
  status: string;
  totalAmount: number;
  currency: string;
  paymentStatus: string;
  checkInDate?: string;
  checkOutDate?: string;
  guestCount?: number;
  specialRequests?: string;
  bookingReference: string;
  metaData?: any;
  createdAt: string;
  updatedAt: string;
}

const Bookings: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'loading') return;
    if (!session) router.push('/auth/signin');
  }, [session, status, router]);

  // Fetch bookings
  useEffect(() => {
    if (session && status === 'authenticated') {
      fetchBookings();
    }
  }, [session, status]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      logInfo('Fetching user bookings');

      const response = await fetch('/api/bookings/list');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Rezervasyonlar alınamadı');
      }

      logInfo('Bookings loaded successfully', { count: data.bookings?.length || 0 });
      setBookings(data.bookings || []);
    } catch (error) {
      logError('Bookings fetch failed', error);
      console.error('Bookings error:', error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  // Get booking icon
  const getBookingIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'flight':
        return <Plane className="w-5 h-5" />;
      case 'hotel':
        return <Building className="w-5 h-5" />;
      case 'activity':
      case 'tour':
        return <Activity className="w-5 h-5" />;
      case 'transfer':
        return <Car className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  // Get status color and icon
  const getStatusDisplay = (status: string) => {
    switch (status.toUpperCase()) {
      case 'CONFIRMED':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: <CheckCircle className="w-4 h-4" />,
          text: 'Onaylandı'
        };
      case 'PENDING':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: <Clock className="w-4 h-4" />,
          text: 'Beklemede'
        };
      case 'CANCELLED':
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: <XCircle className="w-4 h-4" />,
          text: 'İptal Edildi'
        };
      case 'COMPLETED':
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: <CheckCircle className="w-4 h-4" />,
          text: 'Tamamlandı'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: <AlertTriangle className="w-4 h-4" />,
          text: status
        };
    }
  };

  // Filter bookings
  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = filterStatus === 'all' || booking.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesType = filterType === 'all' || booking.bookingType.toLowerCase() === filterType.toLowerCase();
    const matchesSearch = !searchQuery ||
      booking.bookingReference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.bookingType.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesType && matchesSearch;
  });

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Rezervasyonlarım - Travel.Ailydian</title>
        <meta name="description" content="Rezervasyonlarınızı yönetin ve takip edin" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Rezervasyonlarım</h1>
                <p className="text-gray-600">Tüm rezervasyonlarınızı tek yerden yönetin</p>
              </div>
              <button
                onClick={fetchBookings}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Yenile
              </button>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6 mb-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rezervasyon kodu ile ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="all">Tüm Durumlar</option>
                  <option value="confirmed">Onaylandı</option>
                  <option value="pending">Beklemede</option>
                  <option value="completed">Tamamlandı</option>
                  <option value="cancelled">İptal Edildi</option>
                </select>
              </div>

              {/* Type Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="all">Tüm Tipler</option>
                  <option value="hotel">Otel</option>
                  <option value="flight">Uçuş</option>
                  <option value="activity">Aktivite</option>
                  <option value="tour">Tur</option>
                  <option value="transfer">Transfer</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Bookings List */}
          {filteredBookings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-sm p-12 text-center"
            >
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Henüz Rezervasyon Yok</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery || filterStatus !== 'all' || filterType !== 'all'
                  ? 'Arama kriterlerine uygun rezervasyon bulunamadı.'
                  : 'Henüz hiç rezervasyon yapmadınız. Hemen keşfetmeye başlayın!'}
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Destinasyonları Keşfet
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((booking, index) => {
                const statusDisplay = getStatusDisplay(booking.status);

                return (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                            {getBookingIcon(booking.bookingType)}
                          </div>

                          {/* Details */}
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {booking.bookingType.charAt(0).toUpperCase() + booking.bookingType.slice(1)} Rezervasyonu
                              </h3>
                              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${statusDisplay.color}`}>
                                {statusDisplay.icon}
                                {statusDisplay.text}
                              </span>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <span className="font-medium">Rezervasyon No:</span>
                                <span className="font-mono text-blue-600">{booking.bookingReference}</span>
                              </div>

                              {booking.checkInDate && (
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{new Date(booking.checkInDate).toLocaleDateString('tr-TR')}</span>
                                  {booking.checkOutDate && (
                                    <span>- {new Date(booking.checkOutDate).toLocaleDateString('tr-TR')}</span>
                                  )}
                                </div>
                              )}

                              {booking.guestCount && (
                                <div className="flex items-center gap-1">
                                  <span>{booking.guestCount} Kişi</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-2xl font-bold text-gray-900">
                            <DollarSign className="w-5 h-5 text-gray-500" />
                            {booking.totalAmount.toString()} {booking.currency}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Ödeme: <span className={`font-medium ${booking.paymentStatus === 'COMPLETED' ? 'text-green-600' : 'text-yellow-600'}`}>
                              {booking.paymentStatus === 'COMPLETED' ? 'Tamamlandı' : booking.paymentStatus === 'PENDING' ? 'Beklemede' : booking.paymentStatus}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Special Requests */}
                      {booking.specialRequests && (
                        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Özel İstekler:</span> {booking.specialRequests}
                          </p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                        <Link
                          href={`/bookings/${booking.id}`}
                          className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          Detaylar
                        </Link>

                        <button
                          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          Fatura İndir
                        </button>

                        <div className="ml-auto text-xs text-gray-500">
                          Oluşturulma: {new Date(booking.createdAt).toLocaleDateString('tr-TR')}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Summary Stats */}
          {bookings.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-white rounded-xl shadow-sm p-6"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600">{bookings.length}</p>
                  <p className="text-sm text-gray-600 mt-1">Toplam Rezervasyon</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-3xl font-bold text-green-600">
                    {bookings.filter(b => b.status.toUpperCase() === 'CONFIRMED').length}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Onaylı</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-3xl font-bold text-yellow-600">
                    {bookings.filter(b => b.status.toUpperCase() === 'PENDING').length}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Beklemede</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-3xl font-bold text-purple-600">
                    {bookings.reduce((sum, b) => sum + Number(b.totalAmount), 0).toFixed(2)} TRY
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Toplam Harcama</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default Bookings;
