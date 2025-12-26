import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Download,
  Calendar,
  Mail,
  MapPin,
  Users,
  CreditCard,
  ArrowRight,
  Share2,
  Printer,
  Home,
  FileText,
  Star,
  Gift,
  Sparkles
} from 'lucide-react';

interface BookingDetails {
  id: string;
  bookingReference: string;
  status: string;
  totalAmount: number;
  currency: string;
  checkInDate?: string;
  checkOutDate?: string;
  guestCount?: number;
  bookingType: string;
  metaData?: any;
}

const BookingConfirmed: React.FC = () => {
  const router = useRouter();
  const { ref } = router.query;
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (ref) {
      fetchBookingDetails(ref as string);
    }
  }, [ref]);

  const fetchBookingDetails = async (bookingRef: string) => {
    try {
      // In production, fetch from API
      // For now, simulate booking details
      setTimeout(() => {
        setBooking({
          id: '1',
          bookingReference: bookingRef,
          status: 'CONFIRMED',
          totalAmount: 6156,
          currency: 'TRY',
          checkInDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          guestCount: 2,
          bookingType: 'PACKAGE',
          metaData: {
            items: [
              { title: 'Kapadokya: Blockchain Verified Hot Air Balloon Tour', guests: 2, price: 900 },
              { title: 'Bogazici Palace Hotel', guests: 2, price: 4800 }
            ]
          }
        });
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching booking:', error);
      setLoading(false);
    }
  };

  const handleDownloadTicket = () => {
    // Implement ticket download
    alert('Downloading ticket/invoice...');
  };

  const handleAddToCalendar = () => {
    if (!booking || !booking.checkInDate) return;

    const event = {
      title: `Travel Booking - ${booking.bookingReference}`,
      start: new Date(booking.checkInDate).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
      end: booking.checkOutDate
        ? new Date(booking.checkOutDate).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
        : new Date(new Date(booking.checkInDate).getTime() + 24 * 60 * 60 * 1000).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
      description: `Booking Reference: ${booking.bookingReference}`,
      location: 'Turkey'
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${event.start}
DTEND:${event.end}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `booking-${booking.bookingReference}.ics`;
    link.click();
  };

  const copyBookingReference = () => {
    if (booking) {
      navigator.clipboard.writeText(booking.bookingReference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading your booking details...</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <p className="text-gray-300">Booking not found</p>
          <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Booking Confirmed - Travel.LyDian</title>
        <meta name="description" content="Your booking has been confirmed successfully" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-block mb-6"
            >
              <div className="relative">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-2xl opacity-50"
                />
                <div className="relative w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-16 h-16 text-white" strokeWidth={2} />
                </div>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Booking Confirmed!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-300 mb-2"
            >
              Your adventure awaits
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-transparent rounded-full shadow-lg"
            >
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold text-white">Confirmation sent to your email</span>
              <Mail className="w-5 h-5 text-blue-500" />
            </motion.div>
          </motion.div>

          {/* Booking Reference Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-transparent rounded-2xl shadow-xl p-8 mb-6"
          >
            <div className="text-center mb-6">
              <p className="text-sm text-gray-400 mb-2">Your Booking Reference</p>
              <div className="flex items-center justify-center gap-3">
                <h2 className="text-3xl font-bold text-blue-600 font-mono">
                  {booking.bookingReference}
                </h2>
                <button
                  onClick={copyBookingReference}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <FileText className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Please save this reference number for your records
              </p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={handleDownloadTicket}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
              >
                <Download className="w-5 h-5" />
                <span className="font-semibold">Download Ticket</span>
              </button>

              <button
                onClick={handleAddToCalendar}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
              >
                <Calendar className="w-5 h-5" />
                <span className="font-semibold">Add to Calendar</span>
              </button>

              <button
                className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg"
              >
                <Share2 className="w-5 h-5" />
                <span className="font-semibold">Share</span>
              </button>
            </div>
          </motion.div>

          {/* Booking Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-transparent rounded-2xl shadow-xl p-8 mb-6"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Booking Details</h3>

            <div className="space-y-4">
              {/* Items */}
              {booking.metaData?.items?.map((item: any, index: number) => (
                <div key={index} className="flex justify-between items-start p-4 bg-white/5 rounded-xl">
                  <div>
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="text-sm text-gray-300">{item.guests} guests</p>
                  </div>
                  <span className="font-bold text-white">{item.price} TRY</span>
                </div>
              ))}

              {/* Summary */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex items-center gap-3 text-gray-200">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">Check-in:</span>
                  <span>{booking.checkInDate ? new Date(booking.checkInDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'TBD'}</span>
                </div>

                {booking.checkOutDate && (
                  <div className="flex items-center gap-3 text-gray-200">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">Check-out:</span>
                    <span>{new Date(booking.checkOutDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                )}

                <div className="flex items-center gap-3 text-gray-200">
                  <Users className="w-5 h-5 text-purple-500" />
                  <span className="font-medium">Guests:</span>
                  <span>{booking.guestCount} people</span>
                </div>

                <div className="flex items-center gap-3 text-gray-200">
                  <CreditCard className="w-5 h-5 text-green-500" />
                  <span className="font-medium">Total Paid:</span>
                  <span className="text-xl font-bold text-green-600">{booking.totalAmount} {booking.currency}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Loyalty Points Earned */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 rounded-2xl shadow-xl p-8 mb-6 text-white"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Gift className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-1">Congratulations!</h4>
                  <p className="text-white/90">You earned loyalty points with this booking</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold">{Math.floor(booking.totalAmount * 0.1)}</p>
                <p className="text-white/90 text-sm">Points</p>
              </div>
            </div>
          </motion.div>

          {/* Email Confirmation Notice */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6"
          >
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-white mb-2">Email Confirmation Sent</h4>
                <p className="text-gray-200 text-sm leading-relaxed">
                  A detailed confirmation email has been sent to your registered email address.
                  Please check your inbox (and spam folder) for complete booking details, important information,
                  and next steps for your journey.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="bg-transparent rounded-2xl shadow-xl p-8 mb-6"
          >
            <h3 className="text-2xl font-bold text-white mb-6">What's Next?</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-semibold text-white">Check Your Email</p>
                  <p className="text-sm text-gray-300">Review your booking details and save important documents</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-semibold text-white">Prepare for Your Trip</p>
                  <p className="text-sm text-gray-300">Check travel requirements, weather, and pack accordingly</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-semibold text-white">Arrive and Enjoy</p>
                  <p className="text-sm text-gray-300">Present your booking reference at check-in and enjoy your experience</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/bookings"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg font-semibold"
            >
              <FileText className="w-5 h-5" />
              View My Bookings
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-gray-200 border-2 border-gray-300 rounded-xl hover:bg-white/5 transition-all shadow-md hover:shadow-lg font-semibold"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
          </motion.div>

          {/* Support Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center mt-8 text-sm text-gray-300"
          >
            <p>Need help? Contact our 24/7 support team at support@travel.lydian.com</p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default BookingConfirmed;
