import type { NextApiRequest, NextApiResponse } from 'next';
import antalyaHotels from '@/data/antalya-hotels';
import logger from '../../../../../../lib/logger';

/**
 * ADMIN RENTAL PROPERTIES API - REAL DATA VERSION
 * Uses actual hotel data from antalya-hotels.ts (NOT mock/demo data)
 * GET - List all properties with filters
 * POST - Not implemented (data is static from antalya-hotels.ts)
 */

// Transform hotel data to match admin rental property interface
const transformHotelToRentalProperty = (hotel: typeof antalyaHotels[0]) => {
  return {
    id: hotel.id,
    title: hotel.name.tr,
    slug: hotel.slug,
    type: hotel.category.toUpperCase(),
    city: 'Antalya',
    district: hotel.location.region,
    address: hotel.location.address.tr,
    coordinates: hotel.location.coordinates,
    guests: hotel.roomTypes.reduce((max, room) => Math.max(max, room.capacity), 0),
    bedrooms: hotel.roomTypes.length,
    bathrooms: hotel.roomTypes.length,
    beds: hotel.roomTypes.reduce((sum, room) => sum + room.capacity, 0),
    squareMeters: null,
    basePrice: hotel.pricing.perNight,
    weeklyDiscount: null,
    monthlyDiscount: null,
    currency: hotel.pricing.currency,
    cleaningFee: 0,
    securityDeposit: 0,
    // Amenities - extracted from hotel amenities
    wifi: hotel.amenities.tr.some(a => a.toLowerCase().includes('wifi') || a.toLowerCase().includes('internet')),
    kitchen: hotel.amenities.tr.some(a => a.toLowerCase().includes('mutfak') || a.toLowerCase().includes('kitchen')),
    parking: hotel.amenities.tr.some(a => a.toLowerCase().includes('park') || a.toLowerCase().includes('otopark')),
    pool: hotel.amenities.tr.some(a => a.toLowerCase().includes('havuz') || a.toLowerCase().includes('pool')),
    airConditioning: hotel.amenities.tr.some(a => a.toLowerCase().includes('klima') || a.toLowerCase().includes('air')),
    heating: hotel.amenities.tr.some(a => a.toLowerCase().includes('ısıtma') || a.toLowerCase().includes('heat')),
    tv: hotel.amenities.tr.some(a => a.toLowerCase().includes('tv') || a.toLowerCase().includes('televizyon')),
    washer: hotel.amenities.tr.some(a => a.toLowerCase().includes('çamaşır') || a.toLowerCase().includes('washer')),
    beachfront: hotel.location.region.toLowerCase().includes('lara') || hotel.location.region.toLowerCase().includes('belek'),
    seaview: hotel.amenities.tr.some(a => a.toLowerCase().includes('deniz') || a.toLowerCase().includes('manzara')),
    balcony: hotel.amenities.tr.some(a => a.toLowerCase().includes('balkon') || a.toLowerCase().includes('terrace')),
    // House Rules
    smokingAllowed: false,
    petsAllowed: false,
    partiesAllowed: false,
    childrenAllowed: true,
    // Booking
    instantBook: true,
    minimumStay: 1,
    maximumStay: null,
    checkInTime: hotel.checkInTime,
    checkOutTime: hotel.checkOutTime,
    // Media
    mainImage: hotel.images[0],
    images: hotel.images,
    virtualTourUrl: null,
    // Host
    hostName: 'Travel LyDian',
    hostSuperhost: hotel.rating >= 4.5,
    hostResponseTime: 'Within 1 hour',
    hostLanguages: ['tr', 'en', 'de', 'ru'],
    // Status
    isActive: true,
    isFeatured: hotel.stars >= 5 || hotel.rating >= 4.7,
    // Ratings
    overall: hotel.rating,
    cleanliness: hotel.rating,
    accuracy: hotel.rating,
    checkIn: hotel.rating,
    communication: hotel.rating,
    location: hotel.rating,
    value: hotel.rating,
    reviewCount: hotel.reviewCount,
    // Price Comparison (estimated competitors)
    airbnbPrice: Math.round(hotel.pricing.perNight * 1.15),
    bookingPrice: Math.round(hotel.pricing.perNight * 1.12),
    agodaPrice: Math.round(hotel.pricing.perNight * 1.10),
    // SEO
    metaTitle: hotel.name.tr + ' - ' + hotel.location.region,
    metaDescription: hotel.description.tr,
    keywords: [],
    // Additional admin fields
    _count: {
      bookings: Math.floor(hotel.reviewCount * 0.8) // Estimate bookings from reviews
    },
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date(),
  };
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const {
        type,
        city,
        district,
        minGuests,
        maxGuests,
        minBedrooms,
        minPrice,
        maxPrice,
        wifi,
        pool,
        beachfront,
        instantBook,
        isActive,
        isFeatured,
        search,
        page = '1',
        limit = '20',
        sortBy = 'createdAt',
        sortOrder = 'desc'
      } = req.query;

      // Transform all hotels to rental properties
      let properties = antalyaHotels.map(transformHotelToRentalProperty);

      // Apply filters
      if (type) {
        properties = properties.filter(p => p.type === type);
      }

      if (city && typeof city === 'string') {
        properties = properties.filter(p =>
          p.city.toLowerCase().includes(city.toLowerCase())
        );
      }

      if (district && typeof district === 'string') {
        properties = properties.filter(p =>
          p.district.toLowerCase().includes(district.toLowerCase())
        );
      }

      if (minGuests) {
        properties = properties.filter(p => p.guests >= parseInt(minGuests as string));
      }

      if (maxGuests) {
        properties = properties.filter(p => p.guests <= parseInt(maxGuests as string));
      }

      if (minBedrooms) {
        properties = properties.filter(p => p.bedrooms >= parseInt(minBedrooms as string));
      }

      if (minPrice) {
        properties = properties.filter(p => p.basePrice >= parseFloat(minPrice as string));
      }

      if (maxPrice) {
        properties = properties.filter(p => p.basePrice <= parseFloat(maxPrice as string));
      }

      // Amenities filters
      if (wifi === 'true') {
        properties = properties.filter(p => p.wifi);
      }

      if (pool === 'true') {
        properties = properties.filter(p => p.pool);
      }

      if (beachfront === 'true') {
        properties = properties.filter(p => p.beachfront);
      }

      if (instantBook === 'true') {
        properties = properties.filter(p => p.instantBook);
      }

      if (isActive !== undefined) {
        const activeFilter = isActive === 'true';
        properties = properties.filter(p => p.isActive === activeFilter);
      }

      if (isFeatured !== undefined) {
        const featuredFilter = isFeatured === 'true';
        properties = properties.filter(p => p.isFeatured === featuredFilter);
      }

      if (search && typeof search === 'string') {
        const searchLower = search.toLowerCase();
        properties = properties.filter(p =>
          p.title.toLowerCase().includes(searchLower) ||
          p.city.toLowerCase().includes(searchLower) ||
          p.district.toLowerCase().includes(searchLower) ||
          p.hostName.toLowerCase().includes(searchLower)
        );
      }

      // Apply sorting
      if (sortBy === 'overall') {
        properties.sort((a, b) => sortOrder === 'desc' ? b.overall - a.overall : a.overall - b.overall);
      } else if (sortBy === 'basePrice') {
        properties.sort((a, b) => sortOrder === 'desc' ? b.basePrice - a.basePrice : a.basePrice - b.basePrice);
      } else if (sortBy === 'reviewCount') {
        properties.sort((a, b) => sortOrder === 'desc' ? b.reviewCount - a.reviewCount : a.reviewCount - b.reviewCount);
      }

      // Pagination
      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      const skip = (pageNum - 1) * limitNum;
      const total = properties.length;
      const paginatedProperties = properties.slice(skip, skip + limitNum);

      return res.status(200).json({
        success: true,
        data: paginatedProperties,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(total / limitNum),
        },
      });
    }

    if (req.method === 'POST') {
      return res.status(501).json({
        success: false,
        error: 'Creating new properties via API is not implemented. This system uses real data from src/data/antalya-hotels.ts. To add new hotels, please edit that file directly.',
        message: 'Use real data file: src/data/antalya-hotels.ts'
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    logger.error('Rental Properties Admin API Error:', error as Error, {component:'Index'});
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
}
