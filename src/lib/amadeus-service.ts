// Enhanced Amadeus API Service for Real Travel Data
import NodeCache from 'node-cache';

// Cache instance for API responses
const cache = new NodeCache({ 
  stdTTL: parseInt(process.env.API_CACHE_DURATION_MINUTES || '15') * 60,
  checkperiod: 120 
});

interface AmadeusToken {
  access_token: string;
  expires_in: number;
  token_type: string;
}

interface FlightSearchParams {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children?: number;
  infants?: number;
  travelClass?: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';
  nonStop?: boolean;
  currencyCode?: string;
  max?: number;
}

interface HotelSearchParams {
  cityCode: string;
  checkInDate: string;
  checkOutDate: string;
  roomQuantity?: number;
  adults?: number;
  childAges?: number[];
  radius?: number;
  radiusUnit?: 'KM' | 'MILE';
  ratings?: number[];
}

interface CarRentalSearchParams {
  pickUpLocationCode: string;
  dropOffLocationCode?: string;
  pickUpDate: string;
  dropOffDate: string;
  pickUpTime?: string;
  dropOffTime?: string;
}

class AmadeusService {
  private baseURL = process.env.AMADEUS_API_BASE_URL || 'https://test.api.amadeus.com';
  private clientId: string;
  private clientSecret: string;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor() {
    this.clientId = process.env.NEXT_PUBLIC_AMADEUS_CLIENT_ID || '';
    this.clientSecret = process.env.AMADEUS_CLIENT_SECRET || '';
    
    if (!this.clientId || !this.clientSecret) {
      console.warn('Amadeus API credentials not found. Using mock data.');
    }
  }

  // Get OAuth token with error handling
  private async getAccessToken(): Promise<string> {
    if (!this.clientId || !this.clientSecret) {
      throw new Error('Amadeus API credentials not configured');
    }

    // Check if token is still valid
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const response = await fetch(`${this.baseURL}/v1/security/oauth2/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: this.clientId,
          client_secret: this.clientSecret,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Token request failed: ${response.status} - ${errorData.error_description || 'Unknown error'}`);
      }

      const data: AmadeusToken = await response.json();
      this.accessToken = data.access_token;
      this.tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000; // 1 minute buffer

      return this.accessToken;
    } catch (error) {
      console.error('Failed to get Amadeus access token:', error);
      throw error;
    }
  }

  // Generic API call method with caching and error handling
  private async makeRequest(endpoint: string, params: Record<string, any> = {}, useCache: boolean = true) {
    const cacheKey = `amadeus_${endpoint}_${JSON.stringify(params)}`;
    
    // Check cache first
    if (useCache) {
      const cached = cache.get(cacheKey);
      if (cached) {
        return cached;
      }
    }

    try {
      const token = await this.getAccessToken();
      const url = new URL(`${this.baseURL}${endpoint}`);
      
      // Add query parameters
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          if (Array.isArray(params[key])) {
            params[key].forEach((value: any) => {
              url.searchParams.append(key, value.toString());
            });
          } else {
            url.searchParams.append(key, params[key].toString());
          }
        }
      });

      const response = await fetch(url.toString(), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`API request failed: ${response.status} - ${errorData.error_description || 'Unknown error'}`);
      }

      const data = await response.json();
      
      // Cache successful responses
      if (useCache && data) {
        cache.set(cacheKey, data);
      }

      return data;
    } catch (error) {
      console.error(`Amadeus API error for ${endpoint}:`, error);
      throw error;
    }
  }

  // Flight search with enhanced error handling
  async searchFlights(params: FlightSearchParams) {
    try {
      return await this.makeRequest('/v2/shopping/flight-offers', {
        originLocationCode: params.originLocationCode,
        destinationLocationCode: params.destinationLocationCode,
        departureDate: params.departureDate,
        returnDate: params.returnDate,
        adults: params.adults,
        children: params.children || 0,
        infants: params.infants || 0,
        travelClass: params.travelClass || 'ECONOMY',
        nonStop: params.nonStop || false,
        currencyCode: params.currencyCode || 'TRY',
        max: params.max || 20,
      });
    } catch (error) {
      console.error('Flight search error:', error);
      // Return mock data if API fails
      return this.getMockFlightData(params);
    }
  }

  // Hotel search
  async searchHotels(params: HotelSearchParams) {
    try {
      return await this.makeRequest('/v3/shopping/hotel-offers', {
        cityCode: params.cityCode,
        checkInDate: params.checkInDate,
        checkOutDate: params.checkOutDate,
        roomQuantity: params.roomQuantity || 1,
        adults: params.adults || 1,
        radius: params.radius || 5,
        radiusUnit: params.radiusUnit || 'KM',
      });
    } catch (error) {
      console.error('Hotel search error:', error);
      return this.getMockHotelData(params);
    }
  }

  // Car rental search
  async searchCarRentals(params: CarRentalSearchParams) {
    try {
      return await this.makeRequest('/v1/shopping/car-offers', {
        pickUpLocationCode: params.pickUpLocationCode,
        dropOffLocationCode: params.dropOffLocationCode || params.pickUpLocationCode,
        pickUpDate: params.pickUpDate,
        dropOffDate: params.dropOffDate,
        pickUpTime: params.pickUpTime || '10:00',
        dropOffTime: params.dropOffTime || '10:00',
      });
    } catch (error) {
      console.error('Car rental search error:', error);
      return this.getMockCarRentalData(params);
    }
  }

  // Location search for airports and cities
  async searchLocations(keyword: string, subType: 'AIRPORT' | 'CITY' = 'CITY') {
    try {
      return await this.makeRequest('/v1/reference-data/locations', {
        keyword,
        subType,
        'page[limit]': 10,
      });
    } catch (error) {
      console.error('Location search error:', error);
      return { data: [] };
    }
  }

  // Airport search
  async searchAirports(keyword: string) {
    return this.searchLocations(keyword, 'AIRPORT');
  }

  // City search
  async searchCities(keyword: string) {
    try {
      return await this.makeRequest('/v1/reference-data/locations/cities', {
        keyword,
        'page[limit]': 10,
      });
    } catch (error) {
      console.error('City search error:', error);
      return { data: [] };
    }
  }

  // Points of Interest
  async getPointsOfInterest(latitude: number, longitude: number, radius: number = 1) {
    try {
      return await this.makeRequest('/v1/reference-data/locations/pois', {
        latitude,
        longitude,
        radius,
        'page[limit]': 20,
      });
    } catch (error) {
      console.error('POI search error:', error);
      return { data: [] };
    }
  }

  // Mock data fallbacks when API is not available
  private getMockFlightData(params: FlightSearchParams) {
    return {
      data: [
        {
          id: 'MOCK_FLIGHT_1',
          type: 'flight-offer',
          source: 'GDS',
          price: {
            currency: 'TRY',
            total: '450.00',
            base: '380.00',
          },
          pricingOptions: {
            fareType: ['PUBLISHED'],
            includedCheckedBagsOnly: true
          },
          validatingAirlineCodes: ['TK'],
          travelerPricings: [{
            travelerId: '1',
            fareOption: 'STANDARD',
            travelerType: 'ADULT',
            price: {
              currency: 'TRY',
              total: '450.00',
              base: '380.00',
            }
          }],
          itineraries: [{
            duration: 'PT1H45M',
            segments: [{
              departure: {
                iataCode: params.originLocationCode,
                at: `${params.departureDate}T08:30:00`
              },
              arrival: {
                iataCode: params.destinationLocationCode,
                at: `${params.departureDate}T10:15:00`
              },
              carrierCode: 'TK',
              number: '2468',
              aircraft: {
                code: '738'
              },
              duration: 'PT1H45M'
            }]
          }]
        }
      ],
      meta: {
        count: 1,
        links: {
          self: 'https://api.amadeus.com/v2/shopping/flight-offers'
        }
      }
    };
  }

  private getMockHotelData(params: HotelSearchParams) {
    return {
      data: [
        {
          type: 'hotel-offers',
          hotel: {
            type: 'hotel',
            hotelId: 'MOCK_HOTEL_1',
            chainCode: 'FS',
            dupeId: '123456',
            name: 'Four Seasons Hotel',
            cityCode: params.cityCode,
            rating: 5,
            amenities: ['SPA', 'WIFI', 'POOL', 'RESTAURANT']
          },
          available: true,
          offers: [{
            id: 'OFFER_1',
            checkInDate: params.checkInDate,
            checkOutDate: params.checkOutDate,
            roomQuantity: params.roomQuantity || 1,
            rateCode: 'RAC',
            price: {
              currency: 'TRY',
              base: '2800.00',
              total: '3200.00',
              taxes: [{
                code: 'CITY_TAX',
                percentage: '14.29',
                included: true
              }]
            },
            room: {
              type: 'room',
              typeEstimated: {
                category: 'DELUXE_ROOM',
                beds: 1,
                bedType: 'KING'
              }
            }
          }]
        }
      ],
      meta: {
        count: 1
      }
    };
  }

  private getMockCarRentalData(params: CarRentalSearchParams) {
    return {
      data: [
        {
          type: 'car-offers',
          id: 'MOCK_CAR_1',
          provider: {
            company: {
              name: 'AVIS'
            }
          },
          vehicle: {
            category: 'ECONOMY',
            description: 'Volkswagen Golf or similar',
            imageURL: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=300&h=200',
            seats: {
              count: 5
            },
            bags: {
              count: 2
            },
            transmission: 'MANUAL',
            fuel: {
              type: 'PETROL'
            },
            airConditioning: true
          },
          rateCode: 'RAC',
          pickUpLocation: {
            code: params.pickUpLocationCode
          },
          dropOffLocation: {
            code: params.dropOffLocationCode || params.pickUpLocationCode
          },
          pickUpDate: params.pickUpDate,
          dropOffDate: params.dropOffDate,
          price: {
            currency: 'TRY',
            total: '150.00'
          }
        }
      ],
      meta: {
        count: 1
      }
    };
  }
}

// Singleton instance
export const amadeusService = new AmadeusService();

// Helper functions for data transformation
export const transformFlightData = (amadeusFlightOffer: any) => {
  try {
    const flight = amadeusFlightOffer.itineraries[0].segments[0];
    const pricing = amadeusFlightOffer.price;
    
    return {
      id: amadeusFlightOffer.id,
      airline: flight.carrierCode,
      from: flight.departure.iataCode,
      to: flight.arrival.iataCode,
      departure: flight.departure.at.split('T')[1].substring(0, 5),
      arrival: flight.arrival.at.split('T')[1].substring(0, 5),
      duration: flight.duration.replace('PT', '').replace('H', 's ').replace('M', 'd'),
      price: parseFloat(pricing.total),
      currency: pricing.currency,
      type: amadeusFlightOffer.oneWay ? 'Tek Yön' : 'Gidiş-Dönüş',
      aircraft: flight.aircraft?.code || 'N/A',
      availability: amadeusFlightOffer.numberOfBookableSeats || 10,
      amenities: ['WiFi', 'Yemek', 'Eğlence'] // Default amenities
    };
  } catch (error) {
    console.error('Flight data transformation error:', error);
    return null;
  }
};

export const transformHotelData = (amadeusHotelOffer: any) => {
  try {
    const hotel = amadeusHotelOffer.hotel;
    const offer = amadeusHotelOffer.offers[0];
    
    return {
      id: hotel.hotelId,
      name: hotel.name,
      location: `${hotel.address?.cityName || ''}, ${hotel.address?.countryCode || ''}`,
      rating: hotel.rating || 0,
      price: parseFloat(offer.price.total),
      currency: offer.price.currency,
      checkIn: offer.checkInDate,
      checkOut: offer.checkOutDate,
      roomType: offer.room?.typeEstimated?.category || 'Standard',
      amenities: hotel.amenities || [],
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=400&fit=crop',
      reviews: Math.floor(Math.random() * 1000) + 500,
      stars: hotel.rating || 4
    };
  } catch (error) {
    console.error('Hotel data transformation error:', error);
    return null;
  }
};

export const transformCarRentalData = (amadeusCarOffer: any) => {
  try {
    return {
      id: amadeusCarOffer.id,
      company: amadeusCarOffer.provider.company.name,
      category: amadeusCarOffer.vehicle.category,
      model: amadeusCarOffer.vehicle.description,
      seats: amadeusCarOffer.vehicle.seats.count,
      bags: amadeusCarOffer.vehicle.bags.count,
      transmission: amadeusCarOffer.vehicle.transmission,
      fuel: amadeusCarOffer.vehicle.fuel.type,
      airConditioning: amadeusCarOffer.vehicle.airConditioning,
      price: parseFloat(amadeusCarOffer.price.total),
      currency: amadeusCarOffer.price.currency,
      pickUpDate: amadeusCarOffer.pickUpDate,
      dropOffDate: amadeusCarOffer.dropOffDate,
      image: amadeusCarOffer.vehicle.imageURL || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop',
      features: ['Klima', 'Airbag', 'ABS', 'Bluetooth'],
      rating: 4.5,
      mileage: 'Unlimited'
    };
  } catch (error) {
    console.error('Car rental data transformation error:', error);
    return null;
  }
};