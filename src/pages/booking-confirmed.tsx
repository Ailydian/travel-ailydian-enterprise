import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FuturisticHeader } from '../components/layout/FuturisticHeader';
import { FuturisticButton } from '../components/neo-glass/FuturisticButton';
import logger from '../lib/logger';
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
  Sparkles,
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
              { title: 'Bogazici Palace Hotel', guests: 2, price: 4800 },
            ],
          },
        });
        setLoading(false);
      }, 500);
    } catch (error) {
      logger.error('Error fetching booking:', error as Error, { component: 'BookingConfirmed' });
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
        : new Date(new Date(booking.checkInDate).getTime() + 24 * 60 * 60 * 1000)
            .toISOString()
            .replace(/[-:]/g, '')
            .split('.')[0] + 'Z',
      description: `Booking Reference: ${booking.bookingReference}`,
      location: 'Turkey',
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
      <div className="min-h-screen flex items-center justify-center bg-lydian-glass-dark">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00BAFF] mx-auto"></div>
          <p className="mt-4 text-lydian-text-dim">Loading your booking details...</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-lydian-glass-dark">
        <div className="text-center">
          <p className="text-lydian-text-dim">Booking not found</p>
          <Link href="/" className="text-[#00BAFF] hover:underline mt-4 inline-block">
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

      <FuturisticHeader />

      <div className="min-h-screen bg-lydian-glass-dark py-12">
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
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-2xl opacity-50"
                />
                <div className="relative w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50">
                  <CheckCircle className="w-16 h-16 text-white" strokeWidth={2} />
                </div>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-lydian-text-inverse mb-4"
            >
              Booking Confirmed!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-lydian-text-dim mb-2"
            >
              Your adventure awaits
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-lg"
            >
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="font-semibold text-lydian-text-inverse">
                Confirmation sent to your email
              </span>
              <Mail className="w-5 h-5 text-[#00BAFF]" />
            </motion.div>
          </motion.div>

          {/* Booking Reference Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 p-8 mb-6"
          >
            <div className="text-center mb-6">
              <p className="text-sm text-lydian-text-muted mb-2">Your Booking Reference</p>
              <div className="flex items-center justify-center gap-3">
                <h2 className="text-3xl font-bold text-[#00BAFF] font-mono">
                  {booking.bookingReference}
                </h2>
                <button
                  onClick={copyBookingReference}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <FileText className="w-5 h-5 text-lydian-text-muted" />
                  )}
                </button>
              </div>
              <p className="text-xs text-lydian-text-muted mt-2">
                Please save this reference number for your records
              </p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FuturisticButton
                variant="primary"
                size="md"
                fullWidth
                onClick={handleDownloadTicket}
                icon={<Download className="w-5 h-5" />}
                iconPosition="left"
              >
                Download Ticket
              </FuturisticButton>

              <FuturisticButton
                variant="secondary"
                size="md"
                fullWidth
                onClick={handleAddToCalendar}
                icon={<Calendar className="w-5 h-5" />}
                iconPosition="left"
              >
                Add to Calendar
              </FuturisticButton>

              <FuturisticButton
                variant="accent"
                size="md"
                fullWidth
                icon={<Share2 className="w-5 h-5" />}
                iconPosition="left"
              >
                Share
              </FuturisticButton>
            </div>
          </motion.div>

          {/* Booking Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 p-8 mb-6"
          >
            <h3 className="text-2xl font-bold text-lydian-text-inverse mb-6">Booking Details</h3>

            <div className="space-y-4">
              {/* Items */}
              {booking.metaData?.items?.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex justify-between items-start p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10"
                >
                  <div>
                    <p className="font-semibold text-lydian-text-inverse">{item.title}</p>
                    <p className="text-sm text-lydian-text-dim">{item.guests} guests</p>
                  </div>
                  <span className="font-bold text-lydian-text-inverse">{item.price} TRY</span>
                </div>
              ))}

              {/* Summary */}
              <div className="border-t border-white/10 pt-4 space-y-3">
                <div className="flex items-center gap-3 text-lydian-text-dim">
                  <Calendar className="w-5 h-5 text-[#00BAFF]" />
                  <span className="font-medium">Check-in:</span>
                  <span>
                    {booking.checkInDate
                      ? new Date(booking.checkInDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : 'TBD'}
                  </span>
                </div>

                {booking.checkOutDate && (
                  <div className="flex items-center gap-3 text-lydian-text-dim">
                    <Calendar className="w-5 h-5 text-[#00BAFF]" />
                    <span className="font-medium">Check-out:</span>
                    <span>
                      {new Date(booking.checkOutDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 text-lydian-text-dim">
                  <Users className="w-5 h-5 text-[#EC4899]" />
                  <span className="font-medium">Guests:</span>
                  <span>{booking.guestCount} people</span>
                </div>

                <div className="flex items-center gap-3 text-lydian-text-dim">
                  <CreditCard className="w-5 h-5 text-green-400" />
                  <span className="font-medium">Total Paid:</span>
                  <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                    {booking.totalAmount} {booking.currency}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Loyalty Points Earned */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-r from-[#FF9500]/20 to-[#EC4899]/20 backdrop-blur-xl rounded-2xl shadow-xl border border-[#FF9500]/30 p-8 mb-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Gift className="w-8 h-8 text-[#FF9500]" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-1 text-lydian-text-inverse">
                    Congratulations!
                  </h4>
                  <p className="text-lydian-text-dim">
                    You earned loyalty points with this booking
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF9500] to-[#EC4899]">
                  {Math.floor(booking.totalAmount * 0.1)}
                </p>
                <p className="text-lydian-text-dim text-sm">Points</p>
              </div>
            </div>
          </motion.div>

          {/* Email Confirmation Notice */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-[#00BAFF]/10 backdrop-blur-xl border border-[#00BAFF]/30 rounded-2xl p-6 mb-6"
          >
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-[#00BAFF] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-lydian-text-inverse mb-2">
                  Email Confirmation Sent
                </h4>
                <p className="text-lydian-text-dim text-sm leading-relaxed">
                  A detailed confirmation email has been sent to your registered email address. Please
                  check your inbox (and spam folder) for complete booking details, important
                  information, and next steps for your journey.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 p-8 mb-6"
          >
            <h3 className="text-2xl font-bold text-lydian-text-inverse mb-6">What's Next?</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-gradient-to-r from-[#667EEA] to-[#00BAFF] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-semibold text-lydian-text-inverse">Check Your Email</p>
                  <p className="text-sm text-lydian-text-dim">
                    Review your booking details and save important documents
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-gradient-to-r from-[#EC4899] to-[#FF9500] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-semibold text-lydian-text-inverse">Prepare for Your Trip</p>
                  <p className="text-sm text-lydian-text-dim">
                    Check travel requirements, weather, and pack accordingly
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-semibold text-lydian-text-inverse">Arrive and Enjoy</p>
                  <p className="text-sm text-lydian-text-dim">
                    Present your booking reference at check-in and enjoy your experience
                  </p>
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
            <Link href="/bookings">
              <FuturisticButton
                variant="ai"
                size="lg"
                icon={<FileText className="w-5 h-5" />}
                iconPosition="left"
                glow
              >
                View My Bookings
                <ArrowRight className="w-5 h-5 ml-2" />
              </FuturisticButton>
            </Link>

            <Link href="/">
              <FuturisticButton
                variant="secondary"
                size="lg"
                icon={<Home className="w-5 h-5" />}
                iconPosition="left"
              >
                Back to Home
              </FuturisticButton>
            </Link>
          </motion.div>

          {/* Support Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center mt-8 text-sm text-lydian-text-dim"
          >
            <p>Need help? Contact our 24/7 support team at support@travel.lydian.com</p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default BookingConfirmed;
