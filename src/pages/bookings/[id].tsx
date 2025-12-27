import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import logger from '../../lib/logger';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  CreditCard,
  CheckCircle,
  Clock,
  Mail,
  Phone,
  Download,
  Edit,
  Trash2,
  Package,
  Building,
  Activity,
  Plane,
  Car,
  FileText,
  Share2 } from
'lucide-react';

interface BookingDetails {
  id: string;
  bookingReference: string;
  bookingType: string;
  status: string;
  totalAmount: number;
  currency: string;
  paymentMethod: string;
  paymentStatus: string;
  checkInDate?: string;
  checkOutDate?: string;
  guestCount?: number;
  specialRequests?: string;
  metaData?: any;
  createdAt: string;
  updatedAt: string;
}

const BookingDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: session, status } = useSession();
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) router.push('/auth/signin');
  }, [session, status, router]);

  useEffect(() => {
    if (id) {
      fetchBookingDetails(id as string);
    }
  }, [id]);

  const fetchBookingDetails = async (bookingId: string) => {
    try {
      setLoading(true);
      // In production, fetch from API
      // Simulating API call
      setTimeout(() => {
        setBooking({
          id: bookingId,
          bookingReference: 'AILD-1234567890-ABC123',
          bookingType: 'PACKAGE',
          status: 'CONFIRMED',
          totalAmount: 6156,
          currency: 'TRY',
          paymentMethod: 'CREDIT_CARD',
          paymentStatus: 'COMPLETED',
          checkInDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          checkOutDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
          guestCount: 2,
          specialRequests: 'Early check-in requested',
          metaData: {
            items: [
            { title: 'Kapadokya: Blockchain Verified Hot Air Balloon Tour', guests: 2, price: 900 },
            { title: 'Bogazici Palace Hotel', guests: 2, price: 4800 }],

            customerInfo: {
              firstName: 'John',
              lastName: 'Doe',
              email: 'john.doe@example.com',
              phone: '+90 555 123 4567'
            }
          },
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        });
        setLoading(false);
      }, 500);
    } catch (error) {
      logger.error('Error fetching booking:', error as Error, { component: 'Id' });
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toUpperCase()) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-white/10 text-gray-100 border-white/10';
    }
  };

  const getBookingIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'flight':
        return <Plane className="w-6 h-6" />;
      case 'hotel':
        return <Building className="w-6 h-6" />;
      case 'activity':
      case 'tour':
        return <Activity className="w-6 h-6" />;
      case 'transfer':
        return <Car className="w-6 h-6" />;
      default:
        return <Package className="w-6 h-6" />;
    }
  };

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-lydian-glass-dark">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lydian-primary mx-auto"></div>
          <p className="mt-4 text-lydian-text-dim">Loading booking details...</p>
        </div>
      </div>);

  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-lydian-glass-dark">
        <div className="text-center">
          <p className="text-lydian-text-dim">Booking not found</p>
          <Link href="/bookings" className="text-lydian-primary hover:underline mt-4 inline-block">
            Back to Bookings
          </Link>
        </div>
      </div>);

  }

  return (
    <>
      <Head>
        <title>Booking Details - {booking.bookingReference} - Travel.LyDian</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            href="/bookings"
            className="inline-flex items-center gap-2 text-lydian-primary hover:text-lydian-primary-dark mb-6">

            <ArrowLeft className="w-4 h-4" />
            Back to Bookings
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-lydian-bg-hover rounded-2xl shadow-lg p-8 mb-6">

            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                <div className="p-4 bg-lydian-primary-light text-lydian-primary rounded-xl">
                  {getBookingIcon(booking.bookingType)}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-lydian-text-inverse mb-2">
                    {booking.bookingType.charAt(0).toUpperCase() + booking.bookingType.slice(1)} Booking
                  </h1>
                  <p className="text-lydian-text-dim font-mono text-lg">{booking.bookingReference}</p>
                </div>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusBadge(booking.status)}`}>
                {booking.status}
              </span>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-lydian-primary text-lydian-text-inverse rounded-lg hover:bg-lydian-primary-dark transition-colors">
                <Download className="w-4 h-4" />
                Download Invoice
              </button>
              {booking.status.toUpperCase() === 'CONFIRMED' &&
              <>
                  <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-lydian-text-inverse rounded-lg hover:bg-purple-700 transition-colors">
                    <Edit className="w-4 h-4" />
                    Modify Booking
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-lydian-primary text-lydian-text-inverse rounded-lg hover:bg-lydian-primary-dark transition-colors">
                    <Trash2 className="w-4 h-4" />
                    Cancel Booking
                  </button>
                </>
              }
              <button className="flex items-center gap-2 px-4 py-2 bg-lydian-glass-dark-medium text-lydian-text-muted rounded-lg hover:bg-lydian-bg-active transition-colors">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </motion.div>

          {/* Booking Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-lydian-bg-hover rounded-2xl shadow-lg p-8 mb-6">

            <h2 className="text-2xl font-bold text-lydian-text-inverse mb-6">Booking Items</h2>
            <div className="space-y-4">
              {booking.metaData?.items?.map((item: any, index: number) =>
              <div key={index} className="flex justify-between items-start p-4 bg-lydian-glass-dark rounded-xl">
                  <div>
                    <p className="font-semibold text-lydian-text-inverse mb-1">{item.title}</p>
                    <p className="text-sm text-lydian-text-dim">{item.guests} guests</p>
                  </div>
                  <span className="font-bold text-lydian-text-inverse">{item.price} TRY</span>
                </div>
              )}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Travel Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-lydian-bg-hover rounded-2xl shadow-lg p-8">

              <h2 className="text-xl font-bold text-lydian-text-inverse mb-6">Travel Details</h2>
              <div className="space-y-4">
                {booking.checkInDate &&
                <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-lydian-primary mt-1" />
                    <div>
                      <p className="text-sm text-lydian-text-dim">Check-in</p>
                      <p className="font-semibold text-lydian-text-inverse">
                        {new Date(booking.checkInDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                      </p>
                    </div>
                  </div>
                }

                {booking.checkOutDate &&
                <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-lydian-primary mt-1" />
                    <div>
                      <p className="text-sm text-lydian-text-dim">Check-out</p>
                      <p className="font-semibold text-lydian-text-inverse">
                        {new Date(booking.checkOutDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                      </p>
                    </div>
                  </div>
                }

                {booking.guestCount &&
                <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-purple-600 mt-1" />
                    <div>
                      <p className="text-sm text-lydian-text-dim">Guests</p>
                      <p className="font-semibold text-lydian-text-inverse">{booking.guestCount} people</p>
                    </div>
                  </div>
                }

                {booking.specialRequests &&
                <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-orange-600 mt-1" />
                    <div>
                      <p className="text-sm text-lydian-text-dim">Special Requests</p>
                      <p className="font-semibold text-lydian-text-inverse">{booking.specialRequests}</p>
                    </div>
                  </div>
                }
              </div>
            </motion.div>

            {/* Payment & Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-lydian-bg-hover rounded-2xl shadow-lg p-8">

              <h2 className="text-xl font-bold text-lydian-text-inverse mb-6">Payment & Contact</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CreditCard className="w-5 h-5 text-lydian-success mt-1" />
                  <div>
                    <p className="text-sm text-lydian-text-dim">Total Amount</p>
                    <p className="font-bold text-2xl text-lydian-success">
                      {booking.totalAmount} {booking.currency}
                    </p>
                    <p className="text-xs text-lydian-text-muted mt-1">
                      Payment Status: {booking.paymentStatus}
                    </p>
                  </div>
                </div>

                {booking.metaData?.customerInfo &&
                <>
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-lydian-primary mt-1" />
                      <div>
                        <p className="text-sm text-lydian-text-dim">Email</p>
                        <p className="font-semibold text-lydian-text-inverse">{booking.metaData.customerInfo.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-purple-600 mt-1" />
                      <div>
                        <p className="text-sm text-lydian-text-dim">Phone</p>
                        <p className="font-semibold text-lydian-text-inverse">{booking.metaData.customerInfo.phone}</p>
                      </div>
                    </div>
                  </>
                }

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-lydian-text-dim mt-1" />
                  <div>
                    <p className="text-sm text-lydian-text-dim">Booked on</p>
                    <p className="font-semibold text-lydian-text-inverse">
                      {new Date(booking.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Important Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-lydian-primary-lighter border border-blue-200 rounded-2xl p-6 mt-6">

            <h3 className="font-bold text-lydian-text-inverse mb-3">Important Information</h3>
            <ul className="space-y-2 text-sm text-lydian-text-muted">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-lydian-primary mt-0.5 flex-shrink-0" />
                <span>Please arrive 15 minutes before your scheduled time</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-lydian-primary mt-0.5 flex-shrink-0" />
                <span>Bring a valid ID and your booking reference number</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-lydian-primary mt-0.5 flex-shrink-0" />
                <span>Cancellations must be made at least 24 hours in advance for a full refund</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-lydian-primary mt-0.5 flex-shrink-0" />
                <span>For any questions, contact our 24/7 support at support@travel.lydian.com</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </>);

};

export default BookingDetailPage;