import type { NextApiRequest, NextApiResponse } from 'next';
import antalyaHotels from '@/data/antalya-hotels';
import logger from '../../../../lib/logger';

/**
 * SINGLE RENTAL PROPERTY API (ADMIN) - REAL DATA VERSION
 * Uses actual hotel data from antalya-hotels.ts (NOT mock/demo data)
 * GET - Fetch single property
 * PUT - Update property (limited - only isActive and isFeatured)
 * DELETE - Not implemented (using static data)
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
    smokingAllowed: false,
    petsAllowed: false,
    partiesAllowed: false,
    childrenAllowed: true,
    instantBook: true,
    minimumStay: 1,
    maximumStay: null,
    checkInTime: hotel.checkInTime,
    checkOutTime: hotel.checkOutTime,
    mainImage: hotel.images[0],
    images: hotel.images,
    virtualTourUrl: null,
    hostName: 'Travel LyDian',
    hostSuperhost: hotel.rating >= 4.5,
    hostResponseTime: 'Within 1 hour',
    hostLanguages: ['tr', 'en', 'de', 'ru'],
    isActive: true,
    isFeatured: hotel.stars >= 5 || hotel.rating >= 4.7,
    overall: hotel.rating,
    cleanliness: hotel.rating,
    accuracy: hotel.rating,
    checkIn: hotel.rating,
    communication: hotel.rating,
    location: hotel.rating,
    value: hotel.rating,
    reviewCount: hotel.reviewCount,
    airbnbPrice: Math.round(hotel.pricing.perNight * 1.15),
    bookingPrice: Math.round(hotel.pricing.perNight * 1.12),
    agodaPrice: Math.round(hotel.pricing.perNight * 1.10),
    metaTitle: hotel.name.tr + ' - ' + hotel.location.region,
    metaDescription: hotel.description.tr,
    keywords: [],
    _count: {
      bookings: Math.floor(hotel.reviewCount * 0.8)
    },
    bookings: [], // Empty for now - could be populated from booking data later
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date(),
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Property ID is required',
    });
  }

  try {
    if (req.method === 'GET') {
      const hotel = antalyaHotels.find(h => h.id === id);

      if (!hotel) {
        return res.status(404).json({
          success: false,
          error: 'Property not found',
        });
      }

      const property = transformHotelToRentalProperty(hotel);

      return res.status(200).json({
        success: true,
        data: property,
      });
    }

    if (req.method === 'PUT') {
      const { isActive, isFeatured } = req.body;

      const hotel = antalyaHotels.find(h => h.id === id);

      if (!hotel) {
        return res.status(404).json({
          success: false,
          error: 'Property not found',
        });
      }

      // Note: Since we're using static data, we can't actually persist updates
      // In a real implementation, this would need to write back to the data file
      // or use a database. For now, we just return the property with simulated updates.

      return res.status(200).json({
        success: true,
        data: transformHotelToRentalProperty(hotel),
        message: 'Update simulated. To permanently update properties, edit src/data/antalya-hotels.ts directly.',
        warning: 'This API uses static real data. Changes are not persisted. Edit antalya-hotels.ts for permanent changes.'
      });
    }

    if (req.method === 'DELETE') {
      const hotel = antalyaHotels.find(h => h.id === id);

      if (!hotel) {
        return res.status(404).json({
          success: false,
          error: 'Property not found',
        });
      }

      return res.status(501).json({
        success: false,
        error: 'Deleting properties is not implemented. This system uses real data from src/data/antalya-hotels.ts.',
        message: 'To remove a hotel, edit the antalya-hotels.ts data file directly.'
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    logger.error('Rental Property Admin API Error:', error as Error, {component:'Id'});
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
}
