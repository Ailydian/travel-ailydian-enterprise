#!/usr/bin/env ts-node
/**
 * Data Loader for Content Generation
 * Loads all products from data sources and prepares them for batch generation
 */

import path from 'path';
import { ContentConfig } from '../src/lib/ai/content-generator-advanced';

// ============================================================================
// INTERFACES
// ============================================================================

interface DataSource {
  id: string;
  slug: string;
  name: string;
  title?: string;
  description?: string;
  location?: string;
  city?: string;
  region?: string;
  category?: string;
  type?: string;
  pricing?: any;
  price?: number;
  images?: string[];
  rating?: number;
  reviewCount?: number;
  model?: Record<string, string>;
}

interface LoadedData {
  tours: DataSource[];
  hotels: DataSource[];
  transfers: DataSource[];
  carRentals: DataSource[];
  rentals: DataSource[];
}

// ============================================================================
// DATA LOADERS
// ============================================================================

/**
 * Load all data from sources
 */
export async function loadAllData(): Promise<LoadedData> {
  const data: LoadedData = {
    tours: [],
    hotels: [],
    transfers: [],
    carRentals: [],
    rentals: [],
  };

  try {
    // Load tours
    try {
      const antalyaTours = require('../src/data/antalya-tours');
      data.tours.push(...(antalyaTours.antalyaTours || antalyaTours.default || []));
    } catch (e) {
      console.warn('Could not load antalya-tours');
    }

    try {
      const otherTours = require('../src/data/marmaris-bodrum-cesme-tours');
      data.tours.push(...(otherTours.allComprehensiveTours || otherTours.default || []));
    } catch (e) {
      console.warn('Could not load other tours');
    }

    // Load hotels
    try {
      const hotels = require('../src/data/antalya-hotels');
      data.hotels.push(...(hotels.antalyaHotels || hotels.default || []));
    } catch (e) {
      console.warn('Could not load hotels');
    }

    // Load transfers
    try {
      const transfers = require('../src/data/antalya-transfers');
      data.transfers.push(...(transfers.antalyaTransfers || transfers.default || []));
    } catch (e) {
      console.warn('Could not load transfers');
    }

    // Load car rentals
    try {
      const carRentals = require('../src/data/antalya-car-rentals');
      data.carRentals.push(...(carRentals.antalyaCarRentals || carRentals.default || []));
    } catch (e) {
      console.warn('Could not load car rentals');
    }

    // Load rental properties
    try {
      const rentals = require('../src/data/rental-properties');
      data.rentals.push(...(rentals.rentalProperties || rentals.default || []));
    } catch (e) {
      console.warn('Could not load rental properties');
    }
  } catch (error) {
    console.error('Error loading data:', error);
  }

  return data;
}

/**
 * Convert data source to ContentConfig
 */
export function convertToContentConfig(
  item: DataSource,
  type: 'tour' | 'hotel' | 'transfer' | 'car-rental' | 'rental',
  locale: string = 'en'
): ContentConfig {
  return {
    type,
    name: item.name || item.title || item.model?.tr || 'Unknown Product',
    location: item.location || item.city || item.region || 'Turkey',
    category: item.category || type,
    locale: locale as any,
    keywords: [],
    targetLength: 'medium',
    tone: 'professional',
    existingData: {
      description: item.description || '',
    },
  };
}

/**
 * Get all content configs for generation
 */
export async function getAllContentConfigs(): Promise<ContentConfig[]> {
  const data = await loadAllData();
  const configs: ContentConfig[] = [];

  // Tours
  data.tours.forEach(tour => {
    configs.push(convertToContentConfig(tour, 'tour'));
  });

  // Hotels
  data.hotels.forEach(hotel => {
    configs.push(convertToContentConfig(hotel, 'hotel'));
  });

  // Transfers
  data.transfers.forEach(transfer => {
    configs.push(convertToContentConfig(transfer, 'transfer'));
  });

  // Car Rentals
  data.carRentals.forEach(car => {
    configs.push(convertToContentConfig(car, 'car-rental'));
  });

  // Rentals
  data.rentals.forEach(rental => {
    configs.push(convertToContentConfig(rental, 'rental'));
  });

  return configs;
}

/**
 * Get statistics about loaded data
 */
export async function getDataStatistics(): Promise<Record<string, number>> {
  const data = await loadAllData();

  return {
    tours: data.tours.length,
    hotels: data.hotels.length,
    transfers: data.transfers.length,
    carRentals: data.carRentals.length,
    rentals: data.rentals.length,
    total: data.tours.length + data.hotels.length + data.transfers.length + data.carRentals.length + data.rentals.length,
  };
}

/**
 * Main function for testing
 */
async function main() {
  console.log('Loading data...\n');

  const stats = await getDataStatistics();

  console.log('📊 Data Statistics:');
  console.log('─'.repeat(40));
  console.log(`Tours:        ${stats.tours}`);
  console.log(`Hotels:       ${stats.hotels}`);
  console.log(`Transfers:    ${stats.transfers}`);
  console.log(`Car Rentals:  ${stats.carRentals}`);
  console.log(`Rentals:      ${stats.rentals}`);
  console.log('─'.repeat(40));
  console.log(`TOTAL:        ${stats.total}`);
  console.log('');

  const languages = 8;
  const totalPages = stats.total * languages;

  console.log(`🌍 Languages: ${languages}`);
  console.log(`📄 Total Pages: ${totalPages}`);
  console.log('');

  // Load sample configs
  const configs = await getAllContentConfigs();
  if (configs.length > 0) {
    console.log('📝 Sample Product:');
    console.log(JSON.stringify(configs[0], null, 2));
  }
}

// Run if executed directly
if (require.main === module) {
  main().catch(console.error);
}

// ============================================================================
// EXPORTS
// ============================================================================

export { LoadedData, DataSource };
