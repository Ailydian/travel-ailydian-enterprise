import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { amadeusService, transformFlightData, transformHotelData, transformCarRentalData } from '@/lib/amadeus-service';
import { restaurantService, type Restaurant, type RestaurantSearchParams } from '@/lib/restaurant-service';

// Search state types
interface FlightSearchState {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children?: number;
  infants?: number;
  travelClass?: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';
  nonStop?: boolean;
  loading: boolean;
  error: string | null;
  results: any[];
}

interface HotelSearchState {
  cityCode: string;
  checkInDate: string;
  checkOutDate: string;
  roomQuantity: number;
  adults: number;
  childAges?: number[];
  loading: boolean;
  error: string | null;
  results: any[];
}

interface CarRentalSearchState {
  pickUpLocationCode: string;
  dropOffLocationCode?: string;
  pickUpDate: string;
  dropOffDate: string;
  pickUpTime?: string;
  dropOffTime?: string;
  loading: boolean;
  error: string | null;
  results: any[];
}

interface RestaurantSearchState {
  location: string;
  cuisine?: string;
  priceLevel?: number;
  openNow?: boolean;
  loading: boolean;
  error: string | null;
  results: Restaurant[];
}

type SearchTab = 'flights' | 'hotels' | 'cars' | 'restaurants' | 'activities';

// Combined search context
interface SearchContextProps {
  activeTab: SearchTab;
  setActiveTab: (tab: SearchTab) => void;
  flights: FlightSearchState;
  hotels: HotelSearchState;
  cars: CarRentalSearchState;
  restaurants: RestaurantSearchState;
  searchFlights: (params: Partial<FlightSearchState>) => Promise<void>;
  searchHotels: (params: Partial<HotelSearchState>) => Promise<void>;
  searchCars: (params: Partial<CarRentalSearchState>) => Promise<void>;
  searchRestaurants: (params: Partial<RestaurantSearchState>) => Promise<void>;
  clearResults: (tab?: SearchTab) => void;
  lastSearchTerm: string;
}

// Default states
const defaultFlightState: FlightSearchState = {
  originLocationCode: '',
  destinationLocationCode: '',
  departureDate: '',
  returnDate: '',
  adults: 1,
  travelClass: 'ECONOMY',
  nonStop: false,
  loading: false,
  error: null,
  results: []
};

const defaultHotelState: HotelSearchState = {
  cityCode: '',
  checkInDate: '',
  checkOutDate: '',
  roomQuantity: 1,
  adults: 1,
  loading: false,
  error: null,
  results: []
};

const defaultCarRentalState: CarRentalSearchState = {
  pickUpLocationCode: '',
  dropOffLocationCode: '',
  pickUpDate: '',
  dropOffDate: '',
  loading: false,
  error: null,
  results: []
};

const defaultRestaurantState: RestaurantSearchState = {
  location: '',
  openNow: true,
  loading: false,
  error: null,
  results: []
};

// Create context
const SearchContext = createContext<SearchContextProps | undefined>(undefined);

// Provider component
export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<SearchTab>('flights');
  const [flights, setFlights] = useState<FlightSearchState>(defaultFlightState);
  const [hotels, setHotels] = useState<HotelSearchState>(defaultHotelState);
  const [cars, setCars] = useState<CarRentalSearchState>(defaultCarRentalState);
  const [restaurants, setRestaurants] = useState<RestaurantSearchState>(defaultRestaurantState);
  const [lastSearchTerm, setLastSearchTerm] = useState<string>('');

  // Search flights
  const searchFlights = useCallback(async (params: Partial<FlightSearchState>) => {
    // Update state with search params
    setFlights(prev => ({
      ...prev,
      ...params,
      loading: true,
      error: null
    }));

    try {
      const updatedParams = { ...flights, ...params };
      
      // Check for required fields
      if (!updatedParams.originLocationCode || !updatedParams.destinationLocationCode || !updatedParams.departureDate) {
        throw new Error('Origin, destination and departure date are required');
      }

      // Call Amadeus service
      const response = await amadeusService.searchFlights({
        originLocationCode: updatedParams.originLocationCode,
        destinationLocationCode: updatedParams.destinationLocationCode,
        departureDate: updatedParams.departureDate,
        returnDate: updatedParams.returnDate,
        adults: updatedParams.adults,
        children: updatedParams.children,
        infants: updatedParams.infants,
        travelClass: updatedParams.travelClass,
        nonStop: updatedParams.nonStop
      });

      // Transform and update results
      const transformedResults = response.data.map(transformFlightData).filter(Boolean);
      
      setFlights(prev => ({
        ...prev,
        ...updatedParams,
        loading: false,
        results: transformedResults
      }));

      // Save search term
      setLastSearchTerm(`${updatedParams.originLocationCode} to ${updatedParams.destinationLocationCode}`);
    } catch (error) {
      setFlights(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred during flight search'
      }));
    }
  }, [flights]);

  // Search hotels
  const searchHotels = useCallback(async (params: Partial<HotelSearchState>) => {
    // Update state with search params
    setHotels(prev => ({
      ...prev,
      ...params,
      loading: true,
      error: null
    }));

    try {
      const updatedParams = { ...hotels, ...params };
      
      // Check for required fields
      if (!updatedParams.cityCode || !updatedParams.checkInDate || !updatedParams.checkOutDate) {
        throw new Error('City, check-in date and check-out date are required');
      }

      // Call Amadeus service
      const response = await amadeusService.searchHotels({
        cityCode: updatedParams.cityCode,
        checkInDate: updatedParams.checkInDate,
        checkOutDate: updatedParams.checkOutDate,
        roomQuantity: updatedParams.roomQuantity,
        adults: updatedParams.adults,
        childAges: updatedParams.childAges
      });

      // Transform and update results
      const transformedResults = response.data.map(transformHotelData).filter(Boolean);
      
      setHotels(prev => ({
        ...prev,
        ...updatedParams,
        loading: false,
        results: transformedResults
      }));

      // Save search term
      setLastSearchTerm(updatedParams.cityCode);
    } catch (error) {
      setHotels(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred during hotel search'
      }));
    }
  }, [hotels]);

  // Search car rentals
  const searchCars = useCallback(async (params: Partial<CarRentalSearchState>) => {
    // Update state with search params
    setCars(prev => ({
      ...prev,
      ...params,
      loading: true,
      error: null
    }));

    try {
      const updatedParams = { ...cars, ...params };
      
      // Check for required fields
      if (!updatedParams.pickUpLocationCode || !updatedParams.pickUpDate || !updatedParams.dropOffDate) {
        throw new Error('Pick-up location, pick-up date and drop-off date are required');
      }

      // Call Amadeus service
      const response = await amadeusService.searchCarRentals({
        pickUpLocationCode: updatedParams.pickUpLocationCode,
        dropOffLocationCode: updatedParams.dropOffLocationCode,
        pickUpDate: updatedParams.pickUpDate,
        dropOffDate: updatedParams.dropOffDate,
        pickUpTime: updatedParams.pickUpTime,
        dropOffTime: updatedParams.dropOffTime
      });

      // Transform and update results
      const transformedResults = response.data.map(transformCarRentalData).filter(Boolean);
      
      setCars(prev => ({
        ...prev,
        ...updatedParams,
        loading: false,
        results: transformedResults
      }));

      // Save search term
      setLastSearchTerm(updatedParams.pickUpLocationCode);
    } catch (error) {
      setCars(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred during car rental search'
      }));
    }
  }, [cars]);

  // Search restaurants
  const searchRestaurants = useCallback(async (params: Partial<RestaurantSearchState>) => {
    // Update state with search params
    setRestaurants(prev => ({
      ...prev,
      ...params,
      loading: true,
      error: null
    }));

    try {
      const updatedParams = { ...restaurants, ...params };
      
      // Check for required fields
      if (!updatedParams.location) {
        throw new Error('Location is required for restaurant search');
      }

      // Call restaurant service
      const results = await restaurantService.searchRestaurants({
        location: updatedParams.location,
        cuisine: updatedParams.cuisine,
        openNow: updatedParams.openNow,
        priceLevel: updatedParams.priceLevel as any
      });
      
      setRestaurants(prev => ({
        ...prev,
        ...updatedParams,
        loading: false,
        results
      }));

      // Save search term
      setLastSearchTerm(updatedParams.location);
    } catch (error) {
      setRestaurants(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred during restaurant search'
      }));
    }
  }, [restaurants]);

  // Clear results
  const clearResults = useCallback((tab?: SearchTab) => {
    if (!tab || tab === 'flights') {
      setFlights(prev => ({ ...prev, results: [], error: null }));
    }
    if (!tab || tab === 'hotels') {
      setHotels(prev => ({ ...prev, results: [], error: null }));
    }
    if (!tab || tab === 'cars') {
      setCars(prev => ({ ...prev, results: [], error: null }));
    }
    if (!tab || tab === 'restaurants') {
      setRestaurants(prev => ({ ...prev, results: [], error: null }));
    }
  }, []);

  return (
    <SearchContext.Provider value={{
      activeTab,
      setActiveTab,
      flights,
      hotels,
      cars,
      restaurants,
      searchFlights,
      searchHotels,
      searchCars,
      searchRestaurants,
      clearResults,
      lastSearchTerm
    }}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook to use the search context
export const useSearchContext = () => {
  const context = useContext(SearchContext);
  
  if (context === undefined) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  
  return context;
};