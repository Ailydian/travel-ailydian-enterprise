// Amadeus API Integration for Real Travel Data
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
  hotelIds?: string[];
  ratings?: number[];
}

class AmadeusAPI {
  private baseURL = 'https://test.api.amadeus.com';
  private clientId: string;
  private clientSecret: string;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor() {
    this.clientId = process.env.NEXT_PUBLIC_AMADEUS_CLIENT_ID || '';
    this.clientSecret = process.env.AMADEUS_CLIENT_SECRET || '';
  }

  // Get OAuth token
  private async getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

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
      throw new Error('Failed to get Amadeus access token');
    }

    const data: AmadeusToken = await response.json();
    this.accessToken = data.access_token;
    this.tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000; // 1 minute buffer

    return this.accessToken;
  }

  // Generic API call method
  private async makeRequest(endpoint: string, params: Record<string, any> = {}) {
    const token = await this.getAccessToken();
    const url = new URL(`${this.baseURL}${endpoint}`);
    
    // Add query parameters
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        url.searchParams.append(key, params[key].toString());
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
      throw new Error(`Amadeus API error: ${response.status} - ${errorData.error_description || 'Unknown error'}`);
    }

    return response.json();
  }

  // Flight search
  async searchFlights(params: FlightSearchParams) {
    return this.makeRequest('/v2/shopping/flight-offers', {
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
      max: params.max || 10,
    });
  }

  // Hotel search
  async searchHotels(params: HotelSearchParams) {
    return this.makeRequest('/v3/shopping/hotel-offers', {
      cityCode: params.cityCode,
      checkInDate: params.checkInDate,
      checkOutDate: params.checkOutDate,
      roomQuantity: params.roomQuantity || 1,
      adults: params.adults || 1,
      radius: params.radius || 5,
      radiusUnit: params.radiusUnit || 'KM',
    });
  }

  // Location search
  async searchLocations(keyword: string, subType: 'AIRPORT' | 'CITY' = 'CITY') {
    return this.makeRequest('/v1/reference-data/locations', {
      keyword,
      subType,
      'page[limit]': 10,
    });
  }

  // Airport search
  async searchAirports(keyword: string) {
    return this.makeRequest('/v1/reference-data/locations', {
      keyword,
      subType: 'AIRPORT',
      'page[limit]': 10,
    });
  }

  // City search
  async searchCities(keyword: string) {
    return this.makeRequest('/v1/reference-data/locations/cities', {
      keyword,
      'page[limit]': 10,
    });
  }

  // Points of Interest
  async getPointsOfInterest(latitude: number, longitude: number, radius: number = 1) {
    return this.makeRequest('/v1/reference-data/locations/pois', {
      latitude,
      longitude,
      radius,
      'page[limit]': 20,
    });
  }

  // Activities search
  async searchActivities(latitude: number, longitude: number, radius: number = 1) {
    return this.makeRequest('/v1/shopping/activities', {
      latitude,
      longitude,
      radius,
    });
  }

  // Flight price prediction
  async predictFlightPrices(originLocationCode: string, destinationLocationCode: string, departureDate: string) {
    return this.makeRequest('/v1/analytics/itinerary-price-metrics', {
      originIataCode: originLocationCode,
      destinationIataCode: destinationLocationCode,
      departureDate,
    });
  }

  // Travel recommendations
  async getTravelRecommendations(cityCodes: string[], travelerCountryCode: string = 'TR') {
    return this.makeRequest('/v1/reference-data/recommended-locations', {
      cityCodes: cityCodes.join(','),
      travelerCountryCode,
    });
  }
}

// Singleton instance
export const amadeusAPI = new AmadeusAPI();

// Helper functions for data transformation
export const transformFlightData = (amadeusFlightOffer: any) => {
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
    availability: amadeusFlightOffer.numberOfBookableSeats,
  };
};

export const transformHotelData = (amadeusHotelOffer: any) => {
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
  };
};

// Turkey-specific data
export const TURKEY_AIRPORTS = [
  { code: 'IST', name: 'İstanbul Havalimanı', city: 'İstanbul' },
  { code: 'SAW', name: 'Sabiha Gökçen Havalimanı', city: 'İstanbul' },
  { code: 'AYT', name: 'Antalya Havalimanı', city: 'Antalya' },
  { code: 'ESB', name: 'Esenboğa Havalimanı', city: 'Ankara' },
  { code: 'ADB', name: 'Adnan Menderes Havalimanı', city: 'İzmir' },
  { code: 'TZX', name: 'Trabzon Havalimanı', city: 'Trabzon' },
  { code: 'BJV', name: 'Bodrum-Milas Havalimanı', city: 'Bodrum' },
  { code: 'DLM', name: 'Dalaman Havalimanı', city: 'Dalaman' },
];

export const TURKEY_CITIES = [
  { code: 'IST', name: 'İstanbul', coordinates: { lat: 41.0082, lng: 28.9784 } },
  { code: 'ANK', name: 'Ankara', coordinates: { lat: 39.9334, lng: 32.8597 } },
  { code: 'IZM', name: 'İzmir', coordinates: { lat: 38.4192, lng: 27.1287 } },
  { code: 'AYT', name: 'Antalya', coordinates: { lat: 36.8969, lng: 30.7133 } },
  { code: 'ADA', name: 'Adana', coordinates: { lat: 37.0000, lng: 35.3213 } },
  { code: 'BUR', name: 'Bursa', coordinates: { lat: 40.1826, lng: 29.0665 } },
];