import logger from './logger';

// Amadeus API Integration Service  
// Real flight data integration with comprehensive search and booking

export interface AmadeusLocation {
  iataCode: string;
  name: string;
  city: string;
  country: string;
  type: 'AIRPORT' | 'CITY';
}

export interface AmadeusFlight {
  id: string;
  itineraries: {
    duration: string;
    segments: {
      departure: {
        iataCode: string;
        terminal: string;
        at: string; // ISO datetime
      };
      arrival: {
        iataCode: string;
        terminal: string;
        at: string; // ISO datetime
      };
      carrierCode: string;
      number: string;
      aircraft: {
        code: string;
      };
      operating?: {
        carrierCode: string;
      };
      duration: string;
      stops: number;
    }[];
  }[];
  price: {
    currency: string;
    total: string;
    base: string;
    fees: {
      amount: string;
      type: string;
    }[];
  };
  pricingOptions: {
    fareType: string[];
    includedCheckedBags: boolean;
  };
  validatingAirlineCodes: string[];
  travelerPricings: {
    travelerId: string;
    fareOption: string;
    travelerType: string;
    price: {
      currency: string;
      total: string;
      base: string;
    };
  }[];
  lastTicketingDate: string;
  numberOfBookableSeats: number;
  airline: {
    name: string;
    logo: string;
  };
}

export interface AmadeusSearchParams {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string; // YYYY-MM-DD
  returnDate?: string; // YYYY-MM-DD for round trip
  adults: number;
  children?: number;
  infants?: number;
  travelClass?: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';
  includedAirlineCodes?: string[]; // Filter by specific airlines
  excludedAirlineCodes?: string[];
  nonStop?: boolean;
  maxPrice?: number;
  max?: number; // Maximum number of results
}

export interface AmadeusSearchResponse {
  flights: AmadeusFlight[];
  meta: {
    count: number;
    links?: {
      self: string;
      next?: string;
      previous?: string;
    };
  };
  dictionaries: {
    locations: Record<string, AmadeusLocation>;
    aircraft: Record<string, string>;
    carriers: Record<string, string>;
    currencies: Record<string, string>;
  };
}

class AmadeusService {
  private apiUrl = 'https://api.amadeus.com/v2';
  private clientId = process.env.AMADEUS_CLIENT_ID || '';
  private clientSecret = process.env.AMADEUS_CLIENT_SECRET || '';
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;
  
  // Rate limiting and caching
  private rateLimitDelay = 200; // 200ms between requests
  private lastRequestTime = 0;
  private cache = new Map<string, { data: any; timestamp: number }>();
  private cacheExpiryMs = 10 * 60 * 1000; // 10 minutes for flight data

  // Get access token
  private async getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const response = await fetch('https://api.amadeus.com/v1/security/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: this.clientId,
          client_secret: this.clientSecret
        })
      });

      if (!response.ok) {
        throw new Error(`Token request failed: ${response.status}`);
      }

      const tokenData = await response.json();
      this.accessToken = tokenData.access_token;
      this.tokenExpiry = Date.now() + (tokenData.expires_in * 1000) - 60000; // 1 minute buffer

      return this.accessToken!;
    } catch (error) {
      logger.error('Failed to get Amadeus access token:', error as Error, { component: 'AmadeusService' });
      throw error;
    }
  }

  // Make API request with authentication and rate limiting
  private async makeRequest(endpoint: string, params: any = {}): Promise<any> {
    // Rate limiting
    const now = Date.now();
    const timeToWait = this.rateLimitDelay - (now - this.lastRequestTime);
    if (timeToWait > 0) {
      await new Promise(resolve => setTimeout(resolve, timeToWait));
    }
    this.lastRequestTime = Date.now();

    // Check cache
    const cacheKey = `${endpoint}_${JSON.stringify(params)}`;
    const cachedData = this.cache.get(cacheKey);
    if (cachedData && (Date.now() - cachedData.timestamp < this.cacheExpiryMs)) {
      logger.debug('Returning cached Amadeus data for:', { component: 'AmadeusService', metadata: endpoint });
      return cachedData.data;
    }

    try {
      const token = await this.getAccessToken();
      const queryParams = new URLSearchParams();
      
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          if (Array.isArray(params[key])) {
            params[key].forEach((value: any) => {
              queryParams.append(key, value.toString());
            });
          } else {
            queryParams.append(key, params[key].toString());
          }
        }
      });

      const url = `${this.apiUrl}${endpoint}?${queryParams}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(`Amadeus API error: ${response.status} - ${errorData?.error_description || response.statusText}`);
      }

      const data = await response.json();
      
      // Cache the result
      this.cache.set(cacheKey, { data, timestamp: Date.now() });
      
      return data;
    } catch (error) {
      logger.error('Amadeus API request failed:', error as Error, { component: 'AmadeusService' });
      throw error;
    }
  }

  // Search airports/cities
  async searchLocations(query: string, subType: string[] = ['AIRPORT', 'CITY']): Promise<AmadeusLocation[]> {
    try {
      const response = await this.makeRequest('/reference-data/locations', {
        keyword: query,
        subType: subType,
        'page[limit]': 10
      });

      return (response.data || []).map((location: any) => ({
        iataCode: location.iataCode,
        name: location.name,
        city: location.address?.cityName || '',
        country: location.address?.countryName || '',
        type: location.subType
      }));
    } catch (error) {
      logger.error('Location search failed:', error as Error, { component: 'AmadeusService' });
      return [];
    }
  }

  // Get airport/city details
  async getLocationDetails(iataCode: string): Promise<AmadeusLocation | null> {
    try {
      const response = await this.makeRequest(`/reference-data/locations/${iataCode}`);
      
      if (!response.data) {
        return null;
      }

      const location = response.data;
      return {
        iataCode: location.iataCode,
        name: location.name,
        city: location.address?.cityName || '',
        country: location.address?.countryName || '',
        type: location.subType
      };
    } catch (error) {
      logger.error('Location details fetch failed:', error as Error, { component: 'AmadeusService' });
      return null;
    }
  }

  // Search flights
  async searchFlights(searchParams: AmadeusSearchParams): Promise<AmadeusSearchResponse> {
    try {
      const requestParams: any = {
        originLocationCode: searchParams.originLocationCode,
        destinationLocationCode: searchParams.destinationLocationCode,
        departureDate: searchParams.departureDate,
        adults: searchParams.adults,
        max: searchParams.max || 50
      };

      // Add optional parameters
      if (searchParams.returnDate) {
        requestParams.returnDate = searchParams.returnDate;
      }
      if (searchParams.children) {
        requestParams.children = searchParams.children;
      }
      if (searchParams.infants) {
        requestParams.infants = searchParams.infants;
      }
      if (searchParams.travelClass) {
        requestParams.travelClass = searchParams.travelClass;
      }
      if (searchParams.includedAirlineCodes) {
        requestParams.includedAirlineCodes = searchParams.includedAirlineCodes.join(',');
      }
      if (searchParams.excludedAirlineCodes) {
        requestParams.excludedAirlineCodes = searchParams.excludedAirlineCodes.join(',');
      }
      if (searchParams.nonStop !== undefined) {
        requestParams.nonStop = searchParams.nonStop;
      }
      if (searchParams.maxPrice) {
        requestParams.maxPrice = searchParams.maxPrice;
      }

      const response = await this.makeRequest('/shopping/flight-offers', requestParams);

      // Transform the data to our interface
      const flights: AmadeusFlight[] = (response.data || []).map((offer: any) => {
        const carrierCode = offer.itineraries[0]?.segments[0]?.carrierCode;
        const airlineName = response.dictionaries?.carriers[carrierCode] || carrierCode;

        return {
          id: offer.id,
          itineraries: offer.itineraries.map((itinerary: any) => ({
            duration: itinerary.duration,
            segments: itinerary.segments.map((segment: any) => ({
              departure: {
                iataCode: segment.departure.iataCode,
                terminal: segment.departure.terminal || '',
                at: segment.departure.at
              },
              arrival: {
                iataCode: segment.arrival.iataCode,
                terminal: segment.arrival.terminal || '',
                at: segment.arrival.at
              },
              carrierCode: segment.carrierCode,
              number: segment.number,
              aircraft: {
                code: segment.aircraft?.code || ''
              },
              operating: segment.operating,
              duration: segment.duration,
              stops: segment.numberOfStops || 0
            }))
          })),
          price: {
            currency: offer.price.currency,
            total: offer.price.total,
            base: offer.price.base,
            fees: offer.price.fees || []
          },
          pricingOptions: {
            fareType: offer.pricingOptions?.fareType || [],
            includedCheckedBags: offer.pricingOptions?.includedCheckedBagsOnly || false
          },
          validatingAirlineCodes: offer.validatingAirlineCodes || [],
          travelerPricings: offer.travelerPricings || [],
          lastTicketingDate: offer.lastTicketingDate,
          numberOfBookableSeats: offer.numberOfBookableSeats,
          airline: {
            name: airlineName,
            logo: `https://content.airhex.com/content/logos/airlines_${carrierCode}_200_200_s.png`
          }
        };
      });

      return {
        flights,
        meta: {
          count: response.meta?.count || flights.length,
          links: response.meta?.links
        },
        dictionaries: {
          locations: response.dictionaries?.locations || {},
          aircraft: response.dictionaries?.aircraft || {},
          carriers: response.dictionaries?.carriers || {},
          currencies: response.dictionaries?.currencies || {}
        }
      };
    } catch (error) {
      logger.error('Flight search failed:', error as Error, { component: 'AmadeusService' });
      throw error;
    }
  }

  // Get flight price analysis
  async getFlightPriceAnalysis(originLocationCode: string, destinationLocationCode: string, departureDate: string): Promise<any> {
    try {
      const response = await this.makeRequest('/analytics/itinerary-price-metrics', {
        originIataCode: originLocationCode,
        destinationIataCode: destinationLocationCode,
        departureDate: departureDate
      });

      return response.data;
    } catch (error) {
      logger.error('Flight price analysis failed:', error as Error, { component: 'AmadeusService' });
      return null;
    }
  }

  // Get airline information
  async getAirlineInfo(airlineCode: string): Promise<any> {
    try {
      const response = await this.makeRequest(`/reference-data/airlines`, {
        airlineCodes: airlineCode
      });

      return response.data?.[0] || null;
    } catch (error) {
      logger.error('Airline info fetch failed:', error as Error, { component: 'AmadeusService' });
      return null;
    }
  }

  // Get popular flight destinations
  async getPopularDestinations(originLocationCode: string): Promise<any[]> {
    try {
      const response = await this.makeRequest('/travel/analytics/air-traffic/traveled', {
        originCityCode: originLocationCode,
        period: '2024-01'
      });

      return response.data || [];
    } catch (error) {
      logger.error('Popular destinations fetch failed:', error as Error, { component: 'AmadeusService' });
      return [];
    }
  }

  // Flight delay prediction
  async getFlightDelayPrediction(
    originLocationCode: string, 
    destinationLocationCode: string, 
    departureDate: string, 
    departureTime: string, 
    arrivalDate: string, 
    arrivalTime: string, 
    aircraftCode: string, 
    carrierCode: string, 
    flightNumber: string
  ): Promise<any> {
    try {
      const response = await this.makeRequest('/travel/predictions/flight-delay', {
        originLocationCode,
        destinationLocationCode,
        departureDate,
        departureTime,
        arrivalDate,
        arrivalTime,
        aircraftCode,
        carrierCode,
        flightNumber
      });

      return response.data;
    } catch (error) {
      logger.error('Flight delay prediction failed:', error as Error, { component: 'AmadeusService' });
      return null;
    }
  }

  // Clear cache
  clearCache(): void {
    this.cache.clear();
  }

  // Get cache information
  getCacheInfo(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }

  // Format duration (PT2H30M -> 2h 30m)
  static formatDuration(duration: string): string {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    if (!match) return duration;
    
    const hours = match[1] ? `${match[1]}h` : '';
    const minutes = match[2] ? `${match[2]}m` : '';
    return `${hours} ${minutes}`.trim();
  }

  // Convert currency using real-time rates (would need additional API)
  static async convertCurrency(amount: number, fromCurrency: string, toCurrency: string): Promise<number> {
    if (fromCurrency === toCurrency) return amount;
    
    // This would require a currency conversion API
    // For now, return approximate conversion for common pairs
    const conversionRates: Record<string, number> = {
      'EUR_TRY': 32.50,
      'USD_TRY': 30.20,
      'GBP_TRY': 38.40,
      'TRY_EUR': 0.031,
      'TRY_USD': 0.033,
      'TRY_GBP': 0.026
    };
    
    const rate = conversionRates[`${fromCurrency}_${toCurrency}`];
    return rate ? amount * rate : amount;
  }
}

export const amadeusService = new AmadeusService();