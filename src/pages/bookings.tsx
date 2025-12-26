import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FuturisticHeader } from '../components/layout/FuturisticHeader';
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
  Package,
  Edit,
  Trash2,
  X
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
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelling, setCancelling] = useState(false);

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
          color: 'bg-gray-100 text-gray-100 border-gray-200',
          icon: <AlertTriangle className="w-4 h-4" />,
          text: status
        };
    }
  };

  // Cancel booking handler
  const handleCancelBooking = async () => {
    if (!bookingToCancel) return;

    setCancelling(true);
    try {
      const response = await fetch('/api/bookings/cancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingId: bookingToCancel.id,
          reason: cancelReason
        })
      });

      const data = await response.json();

      if (response.ok) {
        logInfo('Booking cancelled successfully', { bookingId: bookingToCancel.id });
        alert('Booking cancelled successfully. Refund will be processed within 5-7 business days.');
        setCancelModalOpen(false);
        setBookingToCancel(null);
        setCancelReason('');
        fetchBookings(); // Refresh bookings list
      } else {
        throw new Error(data.message || 'Cancellation failed');
      }
    } catch (error) {
      logError('Booking cancellation failed', error);
      alert('Failed to cancel booking. Please try again.');
    } finally {
      setCancelling(false);
    }
  };

  const openCancelModal = (booking: Booking) => {
    setBookingToCancel(booking);
    setCancelModalOpen(true);
  };

  const handleModifyBooking = (bookingId: string) => {
    // Navigate to modify page
    router.push(`/bookings/${bookingId}/modify`);
  };

  const handleViewDetails = (bookingId: string) => {
    // Navigate to details page
    router.push(`/bookings/${bookingId}`);
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
          <p className="mt-4 text-gray-300">Yükleniyor...</p>
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
        <title>Rezervasyonlarım - Travel.LyDian</title>
        <meta name="description" content="Rezervasyonlarınızı yönetin ve takip edin" />
      </Head>

      <FuturisticHeader />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-6 sm:py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 sm:mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">Rezervasyonlarım</h1>
                <p className="text-sm sm:text-base text-gray-300">Tüm rezervasyonlarınızı tek yerden yönetin</p>
              </div>
              <button
                onClick={fetchBookings}
                className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
              >
                <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4" />
                Yenile
              </button>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-transparent rounded-xl shadow-sm p-4 sm:p-6 mb-4 sm:mb-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="Rezervasyon kodu ile ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
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
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
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
              className="bg-transparent rounded-xl shadow-sm p-12 text-center"
            >
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Henüz Rezervasyon Yok</h3>
              <p className="text-gray-300 mb-6">
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
                    className="bg-transparent rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                  >
                    <div className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                        <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                          {/* Icon */}
                          <div className="p-2 sm:p-3 bg-blue-100 text-blue-600 rounded-lg flex-shrink-0">
                            {getBookingIcon(booking.bookingType)}
                          </div>

                          {/* Details */}
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                              <h3 className="text-base sm:text-lg font-semibold text-white line-clamp-1">
                                {booking.bookingType.charAt(0).toUpperCase() + booking.bookingType.slice(1)} Rezervasyonu
                              </h3>
                              <span className={`inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium border ${statusDisplay.color} w-fit`}>
                                {statusDisplay.icon}
                                {statusDisplay.text}
                              </span>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-300">
                              <div className="flex items-center gap-1">
                                <span className="font-medium">Rezervasyon No:</span>
                                <span className="font-mono text-blue-600 text-xs sm:text-sm">{booking.bookingReference}</span>
                              </div>

                              {booking.checkInDate && (
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                                  <span className="text-xs sm:text-sm">{new Date(booking.checkInDate).toLocaleDateString('tr-TR')}</span>
                                  {booking.checkOutDate && (
                                    <span className="text-xs sm:text-sm">- {new Date(booking.checkOutDate).toLocaleDateString('tr-TR')}</span>
                                  )}
                                </div>
                              )}

                              {booking.guestCount && (
                                <div className="flex items-center gap-1 text-xs sm:text-sm">
                                  <span>{booking.guestCount} Kişi</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-left sm:text-right flex-shrink-0">
                          <div className="flex items-center gap-1 text-xl sm:text-2xl font-bold text-white">
                            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                            {booking.totalAmount.toString()} {booking.currency}
                          </div>
                          <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
                            Ödeme: <span className={`font-medium ${booking.paymentStatus === 'COMPLETED' ? 'text-green-600' : 'text-yellow-600'}`}>
                              {booking.paymentStatus === 'COMPLETED' ? 'Tamamlandı' : booking.paymentStatus === 'PENDING' ? 'Beklemede' : booking.paymentStatus}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Special Requests */}
                      {booking.specialRequests && (
                        <div className="mb-4 p-3 bg-white/5 rounded-lg">
                          <p className="text-sm text-gray-200">
                            <span className="font-medium">Özel İstekler:</span> {booking.specialRequests}
                          </p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                          <button
                            onClick={() => handleViewDetails(booking.id)}
                            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-xs sm:text-sm"
                          >
                            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                            View Details
                          </button>

                          <button
                            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-gray-300 hover:bg-gray-50 rounded-lg transition-colors text-xs sm:text-sm"
                          >
                            <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">Download Invoice</span>
                            <span className="sm:hidden">Invoice</span>
                          </button>

                          {booking.status.toUpperCase() === 'CONFIRMED' && (
                            <>
                              <button
                                onClick={() => handleModifyBooking(booking.id)}
                                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors text-xs sm:text-sm"
                              >
                                <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                                Modify
                              </button>

                              <button
                                onClick={() => openCancelModal(booking)}
                                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-xs sm:text-sm"
                              >
                                <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                                Cancel
                              </button>
                            </>
                          )}
                        </div>

                        <div className="text-[10px] sm:text-xs text-gray-500 sm:ml-auto">
                          Created: {new Date(booking.createdAt).toLocaleDateString('en-US')}
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
              className="mt-6 sm:mt-8 bg-transparent rounded-xl shadow-sm p-4 sm:p-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl sm:text-3xl font-bold text-blue-600">{bookings.length}</p>
                  <p className="text-xs sm:text-sm text-gray-300 mt-1">Toplam Rezervasyon</p>
                </div>
                <div className="text-center p-3 sm:p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl sm:text-3xl font-bold text-green-600">
                    {bookings.filter(b => b.status.toUpperCase() === 'CONFIRMED').length}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-300 mt-1">Onaylı</p>
                </div>
                <div className="text-center p-3 sm:p-4 bg-yellow-50 rounded-lg">
                  <p className="text-2xl sm:text-3xl font-bold text-yellow-600">
                    {bookings.filter(b => b.status.toUpperCase() === 'PENDING').length}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-300 mt-1">Beklemede</p>
                </div>
                <div className="text-center p-3 sm:p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl sm:text-3xl font-bold text-purple-600">
                    {bookings.reduce((sum, b) => sum + Number(b.totalAmount), 0).toFixed(2)} TRY
                  </p>
                  <p className="text-xs sm:text-sm text-gray-300 mt-1">Toplam Harcama</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Cancel Booking Modal */}
      {cancelModalOpen && bookingToCancel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-transparent rounded-2xl shadow-2xl max-w-md w-full p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Cancel Booking</h3>
              <button
                onClick={() => {
                  setCancelModalOpen(false);
                  setBookingToCancel(null);
                  setCancelReason('');
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-red-800">
                  Are you sure you want to cancel this booking?
                </p>
                <p className="text-xs text-red-600 mt-2">
                  Booking Reference: <strong>{bookingToCancel.bookingReference}</strong>
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Cancellation Reason (Optional)
                </label>
                <textarea
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={4}
                  placeholder="Please let us know why you're cancelling..."
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Refund Policy:</strong> Full refund of {bookingToCancel.totalAmount} {bookingToCancel.currency} will be processed within 5-7 business days to your original payment method.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setCancelModalOpen(false);
                  setBookingToCancel(null);
                  setCancelReason('');
                }}
                disabled={cancelling}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-200 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Keep Booking
              </button>
              <button
                onClick={handleCancelBooking}
                disabled={cancelling}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {cancelling ? 'Cancelling...' : 'Confirm Cancellation'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Bookings;
