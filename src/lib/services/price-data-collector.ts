/**
 * Price Data Collector Service
 *
 * This service automatically collects and stores price data from various sources
 * to build historical price database for ML predictions
 */

import { prisma } from '@/lib/prisma';

export interface PriceDataSource {
  entityType: 'HOTEL' | 'FLIGHT' | 'TOUR';
  entityId: string;
  price: number;
  currency?: string;
  metadata?: any;
  source: string;
  checkInDate?: Date;
  checkOutDate?: Date;
  travelDate?: Date;
}

/**
 * Save price data to history
 */
export async function savePriceData(data: PriceDataSource): Promise<void> {
  try {
    await prisma.priceHistory.create({
      data: {
        entityType: data.entityType,
        entityId: data.entityId,
        price: data.price,
        currency: data.currency || 'TRY',
        metadata: data.metadata,
        source: data.source,
        checkInDate: data.checkInDate,
        checkOutDate: data.checkOutDate,
        travelDate: data.travelDate,
      },
    });

    console.log(`Price data saved: ${data.entityType} ${data.entityId} - ${data.price}`);
  } catch (error) {
    console.error('Error saving price data:', error);
  }
}

/**
 * Batch save multiple price records
 */
export async function batchSavePriceData(dataArray: PriceDataSource[]): Promise<void> {
  try {
    await prisma.priceHistory.createMany({
      data: dataArray.map((data) => ({
        entityType: data.entityType,
        entityId: data.entityId,
        price: data.price,
        currency: data.currency || 'TRY',
        metadata: data.metadata,
        source: data.source,
        checkInDate: data.checkInDate,
        checkOutDate: data.checkOutDate,
        travelDate: data.travelDate,
      })),
      skipDuplicates: true,
    });

    console.log(`Batch saved ${dataArray.length} price records`);
  } catch (error) {
    console.error('Error batch saving price data:', error);
  }
}

/**
 * Hook into hotel search to collect prices
 */
export async function collectHotelPrices(hotels: any[], searchParams: any): Promise<void> {
  const priceData: PriceDataSource[] = hotels.map((hotel) => ({
    entityType: 'HOTEL' as const,
    entityId: hotel.id || hotel.hotelId,
    price: parseFloat(hotel.price || hotel.totalPrice || 0),
    currency: searchParams.currency || 'TRY',
    source: 'HOTEL_SEARCH_API',
    metadata: {
      roomType: hotel.roomType,
      guests: searchParams.guests,
      location: hotel.location,
    },
    checkInDate: searchParams.checkIn ? new Date(searchParams.checkIn) : undefined,
    checkOutDate: searchParams.checkOut ? new Date(searchParams.checkOut) : undefined,
  }));

  await batchSavePriceData(priceData);
}

/**
 * Hook into flight search to collect prices
 */
export async function collectFlightPrices(flights: any[], searchParams: any): Promise<void> {
  const priceData: PriceDataSource[] = flights.map((flight) => ({
    entityType: 'FLIGHT' as const,
    entityId: flight.id || flight.flightId || `${flight.airline}-${flight.flightNumber}`,
    price: parseFloat(flight.price || flight.totalPrice || 0),
    currency: searchParams.currency || 'TRY',
    source: 'FLIGHT_SEARCH_API',
    metadata: {
      airline: flight.airline,
      flightNumber: flight.flightNumber,
      route: flight.route,
      class: flight.class,
      stops: flight.stops,
    },
    travelDate: searchParams.departureDate ? new Date(searchParams.departureDate) : undefined,
  }));

  await batchSavePriceData(priceData);
}

/**
 * Hook into tour search to collect prices
 */
export async function collectTourPrices(tours: any[], searchParams: any): Promise<void> {
  const priceData: PriceDataSource[] = tours.map((tour) => ({
    entityType: 'TOUR' as const,
    entityId: tour.id || tour.tourId,
    price: parseFloat(tour.price || tour.totalPrice || 0),
    currency: searchParams.currency || 'TRY',
    source: 'TOUR_SEARCH_API',
    metadata: {
      duration: tour.duration,
      participants: searchParams.participants,
      category: tour.category,
    },
    travelDate: searchParams.date ? new Date(searchParams.date) : undefined,
  }));

  await batchSavePriceData(priceData);
}

/**
 * Clean old price history (keep last 90 days only)
 */
export async function cleanOldPriceHistory(): Promise<void> {
  try {
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    const result = await prisma.priceHistory.deleteMany({
      where: {
        createdAt: {
          lt: ninetyDaysAgo,
        },
      },
    });

    console.log(`Cleaned ${result.count} old price records`);
  } catch (error) {
    console.error('Error cleaning old price history:', error);
  }
}

/**
 * Get price statistics for an entity
 */
export async function getPriceStats(
  entityType: string,
  entityId: string,
  days: number = 30
): Promise<{
  count: number;
  min: number;
  max: number;
  avg: number;
  latest: number;
}> {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const prices = await prisma.priceHistory.findMany({
    where: {
      entityType,
      entityId,
      createdAt: {
        gte: startDate,
      },
    },
    select: {
      price: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (prices.length === 0) {
    return { count: 0, min: 0, max: 0, avg: 0, latest: 0 };
  }

  const priceValues = prices.map((p) => parseFloat(p.price.toString()));
  const min = Math.min(...priceValues);
  const max = Math.max(...priceValues);
  const avg = priceValues.reduce((a, b) => a + b, 0) / priceValues.length;
  const latest = priceValues[0];

  return {
    count: prices.length,
    min,
    max,
    avg,
    latest,
  };
}

/**
 * Example integration with your existing search API
 *
 * Add this to your hotel search endpoint:
 *
 * ```typescript
 * import { collectHotelPrices } from '@/lib/services/price-data-collector';
 *
 * export default async function handler(req, res) {
 *   // Your existing hotel search logic
 *   const hotels = await searchHotels(req.query);
 *
 *   // Collect prices in background (don't await to avoid slowing down response)
 *   collectHotelPrices(hotels, req.query).catch(console.error);
 *
 *   return res.json({ hotels });
 * }
 * ```
 */
