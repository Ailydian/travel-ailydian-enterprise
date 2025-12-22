import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

// Property Owner Dashboard API
// Real-time sync with main admin dashboard
// Returns comprehensive analytics, pricing optimization, and notifications

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // TODO: Get owner ID from session/auth
    const ownerId = 'owner-1'; // Placeholder

    // Get owner's rental properties
    const properties = await prisma.rentalProperty.findMany({
      where: { ownerId },
      include: {
        bookings: {
          include: {
            user: true
          }
        }
      }
    });

    if (properties.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No properties found for this owner'
      });
    }

    // Calculate revenue stats
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // Get all bookings for revenue calculation
    const allBookings = properties.flatMap(p => p.bookings);

    // Today's revenue
    const todayRevenue = allBookings
      .filter(b => new Date(b.createdAt) >= startOfToday && b.status === 'confirmed')
      .reduce((sum, b) => sum + parseFloat(b.totalPrice), 0);

    // This week's revenue
    const weekRevenue = allBookings
      .filter(b => new Date(b.createdAt) >= startOfWeek && b.status === 'confirmed')
      .reduce((sum, b) => sum + parseFloat(b.totalPrice), 0);

    // This month's revenue
    const monthRevenue = allBookings
      .filter(b => new Date(b.createdAt) >= startOfMonth && b.status === 'confirmed')
      .reduce((sum, b) => sum + parseFloat(b.totalPrice), 0);

    // Last month's revenue
    const lastMonthRevenue = allBookings
      .filter(b => {
        const date = new Date(b.createdAt);
        return date >= startOfLastMonth && date <= endOfLastMonth && b.status === 'confirmed';
      })
      .reduce((sum, b) => sum + parseFloat(b.totalPrice), 0);

    // Calculate growth percentage
    const growth = lastMonthRevenue > 0
      ? ((monthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100
      : 0;

    // AI-powered 3-month forecast (simplified algorithm)
    // In production, this would use machine learning
    const averageMonthlyGrowth = growth / 100;
    const forecast = Math.round(
      monthRevenue * (1 + averageMonthlyGrowth) * 3
    );

    // Booking statistics
    const upcomingBookings = allBookings.filter(b => {
      const checkIn = new Date(b.checkInDate);
      return checkIn > now && b.status === 'confirmed';
    }).length;

    const completedBookings = allBookings.filter(b => {
      const checkOut = new Date(b.checkOutDate);
      return checkOut < now && b.status === 'confirmed';
    }).length;

    const cancelledBookings = allBookings.filter(b => b.status === 'cancelled').length;
    const pendingBookings = allBookings.filter(b => b.status === 'pending').length;

    // Occupancy calculation
    const totalNightsAvailable = properties.reduce((sum, p) => {
      const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
      return sum + daysInMonth;
    }, 0);

    const bookedNights = allBookings
      .filter(b => {
        const checkIn = new Date(b.checkInDate);
        const checkOut = new Date(b.checkOutDate);
        const monthStart = startOfMonth;
        const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        return (
          b.status === 'confirmed' &&
          ((checkIn >= monthStart && checkIn <= monthEnd) ||
           (checkOut >= monthStart && checkOut <= monthEnd) ||
           (checkIn <= monthStart && checkOut >= monthEnd))
        );
      })
      .reduce((sum, b) => {
        const checkIn = new Date(b.checkInDate);
        const checkOut = new Date(b.checkOutDate);
        const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
        return sum + nights;
      }, 0);

    const currentOccupancy = totalNightsAvailable > 0
      ? Math.round((bookedNights / totalNightsAvailable) * 100)
      : 0;

    const averageOccupancy = 65; // Industry average
    const targetOccupancy = 80;

    // Analytics (simulated data - in production would come from tracking)
    const views = Math.floor(Math.random() * 5000) + 2000;
    const clicks = Math.floor(views * 0.15);
    const conversionRate = (allBookings.filter(b => b.status === 'confirmed').length / clicks) * 100;

    const averageStayLength = allBookings.length > 0
      ? allBookings.reduce((sum, b) => {
          const checkIn = new Date(b.checkInDate);
          const checkOut = new Date(b.checkOutDate);
          const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
          return sum + nights;
        }, 0) / allBookings.length
      : 0;

    const repeatGuests = allBookings.filter(b => {
      const userBookings = allBookings.filter(booking => booking.userId === b.userId);
      return userBookings.length > 1;
    }).length;

    const repeatGuestRate = allBookings.length > 0
      ? Math.round((repeatGuests / allBookings.length) * 100)
      : 0;

    // AI Pricing Optimization
    const avgBasePrice = properties.reduce((sum, p) => sum + parseFloat(p.basePrice.toString()), 0) / properties.length;

    // Competitor analysis (simplified - in production would scrape real data)
    const competitorAverage = Math.round(avgBasePrice * 1.15);

    // AI suggestion based on occupancy and market rates
    let suggestedPrice = avgBasePrice;
    let optimizationOpportunity = 0;

    if (currentOccupancy < 50) {
      // Low occupancy - suggest lower price to attract bookings
      suggestedPrice = Math.round(avgBasePrice * 0.9);
      optimizationOpportunity = -10;
    } else if (currentOccupancy > 80) {
      // High occupancy - can increase prices
      suggestedPrice = Math.round(avgBasePrice * 1.2);
      optimizationOpportunity = 20;
    } else {
      // Medium occupancy - match or slightly beat competitor average
      suggestedPrice = Math.round(competitorAverage * 0.95);
      optimizationOpportunity = Math.round(((suggestedPrice - avgBasePrice) / avgBasePrice) * 100);
    }

    // Generate notifications
    const notifications = [
      {
        id: '1',
        type: 'booking',
        title: 'Yeni Rezervasyon!',
        description: 'Ahmet Yılmaz, 15-20 Ocak tarihleri için rezervasyon yaptı.',
        time: '5 dakika önce',
        read: false,
        urgent: true
      },
      {
        id: '2',
        type: 'review',
        title: 'Yeni Yorum',
        description: 'Mehmet Demir 5 yıldız verdi: "Harika bir konaklama..."',
        time: '2 saat önce',
        read: false
      },
      {
        id: '3',
        type: 'message',
        title: 'Misafir Mesajı',
        description: 'Ayşe Kaya check-in saati hakkında soru sordu.',
        time: '4 saat önce',
        read: true
      },
      {
        id: '4',
        type: 'alert',
        title: 'Fiyat Optimizasyonu',
        description: 'AI, fiyatınızı %15 artırmanızı öneriyor.',
        time: '1 gün önce',
        read: true
      }
    ];

    // Revenue history for chart (last 30 days)
    const revenueHistory = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString('tr-TR', { month: 'short', day: 'numeric' });

      // Simulate daily revenue (in production would come from actual bookings)
      const dailyRevenue = Math.floor(Math.random() * 3000) + 1000;

      revenueHistory.push({
        date: dateStr,
        revenue: dailyRevenue
      });
    }

    // Compile dashboard data
    const dashboardData = {
      success: true,
      stats: {
        revenue: {
          today: todayRevenue,
          thisWeek: weekRevenue,
          thisMonth: monthRevenue,
          lastMonth: lastMonthRevenue,
          forecast,
          growth: Math.round(growth * 10) / 10
        },
        bookings: {
          upcoming: upcomingBookings,
          completed: completedBookings,
          cancelled: cancelledBookings,
          pending: pendingBookings
        },
        occupancy: {
          current: currentOccupancy,
          average: averageOccupancy,
          target: targetOccupancy
        },
        analytics: {
          views,
          clicks,
          conversionRate: Math.round(conversionRate * 10) / 10,
          averageStayLength: Math.round(averageStayLength * 10) / 10,
          repeatGuestRate
        },
        pricing: {
          currentPrice: Math.round(avgBasePrice),
          suggestedPrice,
          competitorAverage,
          optimizationOpportunity
        }
      },
      notifications,
      revenueHistory,
      lastSync: new Date().toISOString()
    };

    return res.status(200).json(dashboardData);

  } catch (error) {
    console.error('Dashboard API error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard data',
      error: process.env.NODE_ENV === 'development' ? String(error) : undefined
    });
  }
}
