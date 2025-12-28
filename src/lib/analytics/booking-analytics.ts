import { PrismaClient, BookingStatus, BookingType } from '@prisma/client'

const prisma = new PrismaClient()

export interface BookingAnalytics {
  totalBookings: number
  totalRevenue: number
  averageBookingValue: number
  conversionRate: number
  bookingsByStatus: Record<string, number>
  bookingsByType: Record<string, number>
  revenueByType: Record<string, number>
  topDestinations: Array<{ destination: string; count: number; revenue: number }>
  topVehicles: Array<{ vehicle: string; count: number; revenue: number }>
  monthlyTrends: Array<{ month: string; bookings: number; revenue: number }>
}

export interface AnalyticsFilters {
  startDate?: Date
  endDate?: Date
  bookingType?: BookingType
  status?: BookingStatus
  userId?: string
}

/**
 * Get comprehensive booking analytics
 */
export async function getBookingAnalytics(
  filters?: AnalyticsFilters
): Promise<BookingAnalytics> {
  const where: any = {}

  if (filters?.startDate || filters?.endDate) {
    where.createdAt = {}
    if (filters.startDate) where.createdAt.gte = filters.startDate
    if (filters.endDate) where.createdAt.lte = filters.endDate
  }

  if (filters?.bookingType) {
    where.bookingType = filters.bookingType
  }

  if (filters?.status) {
    where.status = filters.status
  }

  if (filters?.userId) {
    where.userId = filters.userId
  }

  // Get all bookings
  const bookings = await prisma.booking.findMany({
    where,
    select: {
      id: true,
      bookingType: true,
      status: true,
      totalAmount: true,
      currency: true,
      createdAt: true,
    },
  })

  // Calculate total revenue
  const totalRevenue = bookings.reduce(
    (sum, booking) => sum + parseFloat(booking.totalAmount.toString()),
    0
  )

  // Calculate average booking value
  const averageBookingValue = bookings.length > 0 ? totalRevenue / bookings.length : 0

  // Bookings by status
  const bookingsByStatus: Record<string, number> = {}
  Object.values(BookingStatus).forEach((status) => {
    bookingsByStatus[status] = bookings.filter((b) => b.status === status).length
  })

  // Bookings by type
  const bookingsByType: Record<string, number> = {}
  const revenueByType: Record<string, number> = {}

  Object.values(BookingType).forEach((type) => {
    const typeBookings = bookings.filter((b) => b.bookingType === type)
    bookingsByType[type] = typeBookings.length
    revenueByType[type] = typeBookings.reduce(
      (sum, b) => sum + parseFloat(b.totalAmount.toString()),
      0
    )
  })

  // Top destinations (for property and transfer bookings)
  const topDestinations = await getTopDestinations(where)

  // Top vehicles (for car rental and transfer bookings)
  const topVehicles = await getTopVehicles(where)

  // Monthly trends
  const monthlyTrends = calculateMonthlyTrends(bookings)

  // Calculate conversion rate (assuming we have page views data)
  // This is a placeholder - you'd need to integrate with your analytics platform
  const conversionRate = 0 // Placeholder

  return {
    totalBookings: bookings.length,
    totalRevenue: parseFloat(totalRevenue.toFixed(2)),
    averageBookingValue: parseFloat(averageBookingValue.toFixed(2)),
    conversionRate,
    bookingsByStatus,
    bookingsByType,
    revenueByType,
    topDestinations,
    topVehicles,
    monthlyTrends,
  }
}

/**
 * Get top destinations by bookings
 */
async function getTopDestinations(where: any): Promise<
  Array<{ destination: string; count: number; revenue: number }>
> {
  const propertyBookings = await prisma.rentalPropertyBooking.findMany({
    where: {
      status: { in: [BookingStatus.CONFIRMED, BookingStatus.COMPLETED] },
    },
    include: {
      property: {
        select: {
          city: true,
          district: true,
        },
      },
    },
  })

  const destinationMap: Record<string, { count: number; revenue: number }> = {}

  propertyBookings.forEach((booking) => {
    const destination = `${booking.property.city}, ${booking.property.district}`
    if (!destinationMap[destination]) {
      destinationMap[destination] = { count: 0, revenue: 0 }
    }
    destinationMap[destination].count++
    destinationMap[destination].revenue += parseFloat(booking.totalPrice.toString())
  })

  return Object.entries(destinationMap)
    .map(([destination, data]) => ({
      destination,
      count: data.count,
      revenue: parseFloat(data.revenue.toFixed(2)),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
}

/**
 * Get top vehicles by bookings
 */
async function getTopVehicles(where: any): Promise<
  Array<{ vehicle: string; count: number; revenue: number }>
> {
  const carBookings = await prisma.carRentalBooking.findMany({
    where: {
      status: { in: [BookingStatus.CONFIRMED, BookingStatus.COMPLETED] },
    },
    include: {
      car: {
        select: {
          name: true,
          brand: true,
          model: true,
        },
      },
    },
  })

  const vehicleMap: Record<string, { count: number; revenue: number }> = {}

  carBookings.forEach((booking) => {
    const vehicle = booking.car.name
    if (!vehicleMap[vehicle]) {
      vehicleMap[vehicle] = { count: 0, revenue: 0 }
    }
    vehicleMap[vehicle].count++
    vehicleMap[vehicle].revenue += parseFloat(booking.totalPrice.toString())
  })

  return Object.entries(vehicleMap)
    .map(([vehicle, data]) => ({
      vehicle,
      count: data.count,
      revenue: parseFloat(data.revenue.toFixed(2)),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
}

/**
 * Calculate monthly booking trends
 */
function calculateMonthlyTrends(
  bookings: Array<{
    createdAt: Date
    totalAmount: any
  }>
): Array<{ month: string; bookings: number; revenue: number }> {
  const monthMap: Record<string, { bookings: number; revenue: number }> = {}

  bookings.forEach((booking) => {
    const monthKey = booking.createdAt.toISOString().substring(0, 7) // YYYY-MM
    if (!monthMap[monthKey]) {
      monthMap[monthKey] = { bookings: 0, revenue: 0 }
    }
    monthMap[monthKey].bookings++
    monthMap[monthKey].revenue += parseFloat(booking.totalAmount.toString())
  })

  return Object.entries(monthMap)
    .map(([month, data]) => ({
      month,
      bookings: data.bookings,
      revenue: parseFloat(data.revenue.toFixed(2)),
    }))
    .sort((a, b) => a.month.localeCompare(b.month))
}

/**
 * Get revenue by date range
 */
export async function getRevenueByDateRange(
  startDate: Date,
  endDate: Date,
  groupBy: 'day' | 'week' | 'month' = 'day'
): Promise<Array<{ date: string; revenue: number; bookings: number }>> {
  const bookings = await prisma.booking.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
      status: { in: [BookingStatus.CONFIRMED, BookingStatus.COMPLETED] },
    },
    select: {
      createdAt: true,
      totalAmount: true,
    },
  })

  const dateMap: Record<string, { revenue: number; bookings: number }> = {}

  bookings.forEach((booking) => {
    let dateKey: string
    const date = new Date(booking.createdAt)

    switch (groupBy) {
      case 'day':
        dateKey = date.toISOString().substring(0, 10) // YYYY-MM-DD
        break
      case 'week':
        // Get ISO week number
        const weekNumber = getWeekNumber(date)
        dateKey = `${date.getFullYear()}-W${weekNumber}`
        break
      case 'month':
        dateKey = date.toISOString().substring(0, 7) // YYYY-MM
        break
    }

    if (!dateMap[dateKey]) {
      dateMap[dateKey] = { revenue: 0, bookings: 0 }
    }
    dateMap[dateKey].revenue += parseFloat(booking.totalAmount.toString())
    dateMap[dateKey].bookings++
  })

  return Object.entries(dateMap)
    .map(([date, data]) => ({
      date,
      revenue: parseFloat(data.revenue.toFixed(2)),
      bookings: data.bookings,
    }))
    .sort((a, b) => a.date.localeCompare(b.date))
}

/**
 * Get booking conversion funnel
 */
export async function getBookingFunnel(
  startDate?: Date,
  endDate?: Date
): Promise<{
  pending: number
  confirmed: number
  completed: number
  cancelled: number
  conversionRate: number
}> {
  const where: any = {}
  if (startDate || endDate) {
    where.createdAt = {}
    if (startDate) where.createdAt.gte = startDate
    if (endDate) where.createdAt.lte = endDate
  }

  const [pending, confirmed, completed, cancelled, total] = await Promise.all([
    prisma.booking.count({ where: { ...where, status: BookingStatus.PENDING } }),
    prisma.booking.count({ where: { ...where, status: BookingStatus.CONFIRMED } }),
    prisma.booking.count({ where: { ...where, status: BookingStatus.COMPLETED } }),
    prisma.booking.count({ where: { ...where, status: BookingStatus.CANCELLED } }),
    prisma.booking.count({ where }),
  ])

  const conversionRate = total > 0 ? ((confirmed + completed) / total) * 100 : 0

  return {
    pending,
    confirmed,
    completed,
    cancelled,
    conversionRate: parseFloat(conversionRate.toFixed(2)),
  }
}

/**
 * Get top customers by booking count and revenue
 */
export async function getTopCustomers(
  limit: number = 10
): Promise<
  Array<{
    userId: string
    userName: string
    email: string
    bookingCount: number
    totalRevenue: number
  }>
> {
  const bookings = await prisma.booking.findMany({
    where: {
      status: { in: [BookingStatus.CONFIRMED, BookingStatus.COMPLETED] },
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  })

  const customerMap: Record<
    string,
    {
      userName: string
      email: string
      bookingCount: number
      totalRevenue: number
    }
  > = {}

  bookings.forEach((booking) => {
    const userId = booking.userId
    if (!customerMap[userId]) {
      customerMap[userId] = {
        userName: booking.user.name || 'Unknown',
        email: booking.user.email,
        bookingCount: 0,
        totalRevenue: 0,
      }
    }
    customerMap[userId].bookingCount++
    customerMap[userId].totalRevenue += parseFloat(booking.totalAmount.toString())
  })

  return Object.entries(customerMap)
    .map(([userId, data]) => ({
      userId,
      userName: data.userName,
      email: data.email,
      bookingCount: data.bookingCount,
      totalRevenue: parseFloat(data.totalRevenue.toFixed(2)),
    }))
    .sort((a, b) => b.totalRevenue - a.totalRevenue)
    .slice(0, limit)
}

// Helper function to get ISO week number
function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
}
