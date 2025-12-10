import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../lib/auth';
import { prisma } from '../../../lib/prisma';
import { logInfo, logError } from '../../../lib/logger';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user?.email) {
      logError('Unauthorized dashboard access attempt', new Error('No session'));
      return res.status(401).json({ message: 'Yetkisiz erişim' });
    }

    logInfo('Fetching dashboard data', { email: session.user.email });

    // Get user with their data
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        name: true,
        email: true,
        membershipType: true,
        loyaltyPoints: true,
        createdAt: true,
      }
    });

    if (!user) {
      logError('User not found', new Error('User not found'), { email: session.user.email });
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    // Get booking statistics
    const bookings = await prisma.booking.findMany({
      where: { userId: user.id },
      select: {
        id: true,
        type: true,
        status: true,
        totalAmount: true,
        bookingDate: true,
        checkIn: true,
        checkOut: true,
        destination: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10
    });

    const totalBookings = bookings.length;
    const completedTrips = bookings.filter(b => b.status === 'COMPLETED').length;
    const upcomingTrips = bookings.filter(b =>
      b.status === 'CONFIRMED' &&
      b.checkIn &&
      new Date(b.checkIn) > new Date()
    ).length;

    // Calculate savings (mock calculation - 10% of completed bookings)
    const completedBookingsTotal = bookings
      .filter(b => b.status === 'COMPLETED')
      .reduce((sum, b) => sum + (b.totalAmount || 0), 0);
    const savedMoney = Math.round(completedBookingsTotal * 0.1);

    // Get favorites count
    const favoritesCount = await prisma.favorite.count({
      where: { userId: user.id }
    });

    // Get recent bookings for display
    const recentBookings = bookings.slice(0, 3).map(booking => ({
      id: booking.id,
      type: booking.type.toLowerCase(),
      title: booking.destination || 'Rezervasyon',
      location: booking.destination || 'N/A',
      date: booking.bookingDate?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
      status: booking.status.toLowerCase(),
      amount: booking.totalAmount || 0,
      image: getBookingImage(booking.type)
    }));

    // Get upcoming trips
    const upcomingBookings = await prisma.booking.findMany({
      where: {
        userId: user.id,
        status: 'CONFIRMED',
        checkIn: {
          gt: new Date()
        }
      },
      orderBy: {
        checkIn: 'asc'
      },
      take: 2,
      select: {
        id: true,
        destination: true,
        checkIn: true,
        checkOut: true,
        type: true,
      }
    });

    const upcomingTripsData = upcomingBookings.map(trip => ({
      id: trip.id,
      destination: trip.destination || 'Destinasyon',
      date: trip.checkIn?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
      days: trip.checkIn && trip.checkOut ?
        Math.ceil((new Date(trip.checkOut).getTime() - new Date(trip.checkIn).getTime()) / (1000 * 60 * 60 * 24)) : 1,
      type: getBookingTypeText(trip.type),
      image: getBookingImage(trip.type)
    }));

    const stats = {
      totalBookings,
      completedTrips,
      savedMoney,
      loyaltyPoints: user.loyaltyPoints || 0,
      upcomingTrips,
      favoriteDestinations: favoritesCount
    };

    logInfo('Dashboard data fetched successfully', { userId: user.id });

    res.status(200).json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        membershipType: user.membershipType,
        loyaltyPoints: user.loyaltyPoints,
      },
      stats,
      recentBookings,
      upcomingTrips: upcomingTripsData,
    });

  } catch (error) {
    logError('Dashboard data fetch error', error);
    res.status(500).json({
      success: false,
      message: 'Dashboard verileri alınırken bir hata oluştu'
    });
  }
}

function getBookingImage(type: string): string {
  const images = {
    HOTEL: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&q=80',
    FLIGHT: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=300&h=200&q=80',
    ACTIVITY: 'https://images.unsplash.com/photo-1570939274719-c60ee3bf5cd9?w=300&h=200&q=80',
    TOUR: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=300&h=200&q=80',
    RESTAURANT: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&q=80',
    TRANSFER: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=300&h=200&q=80',
  };
  return images[type as keyof typeof images] || images.HOTEL;
}

function getBookingTypeText(type: string): string {
  const types = {
    HOTEL: 'Konaklama',
    FLIGHT: 'Uçuş',
    ACTIVITY: 'Aktivite',
    TOUR: 'Tur',
    RESTAURANT: 'Restoran',
    TRANSFER: 'Transfer',
  };
  return types[type as keyof typeof types] || 'Seyahat';
}
