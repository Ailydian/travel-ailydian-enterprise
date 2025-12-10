// Visual Search Types

export interface VisualSearchResult {
  id: string;
  type: 'destination' | 'hotel' | 'restaurant' | 'activity' | 'landmark';
  name: string;
  description: string;
  location: string;
  imageUrl: string;
  similarityScore: number;
  confidence: number;
  matchReasons: string[];
  price?: {
    amount: number;
    currency: string;
  };
  rating?: number;
  reviewCount?: number;
  tags?: string[];
}

export interface ImageAnalysis {
  landmarks: string[];
  sceneryType: string[];
  architectureStyle: string[];
  colorPalette: string[];
  dominantColors: string[];
  detectedObjects: string[];
  atmosphere: string;
  timeOfDay?: string;
  weather?: string;
  season?: string;
}

export interface VisualSearchRequest {
  imageUrl?: string;
  imageData?: string; // Base64 encoded
  searchType?: 'all' | 'destination' | 'hotel' | 'restaurant' | 'activity';
  filters?: {
    minSimilarity?: number;
    maxResults?: number;
    priceRange?: {
      min: number;
      max: number;
    };
    rating?: number;
    location?: string;
  };
}

export interface VisualSearchResponse {
  success: boolean;
  analysis: ImageAnalysis;
  results: VisualSearchResult[];
  searchId: string;
  processingTime: number;
  message?: string;
}

export interface SearchHistoryItem {
  id: string;
  imageUrl: string;
  thumbnailUrl: string;
  timestamp: Date;
  analysis: ImageAnalysis;
  resultCount: number;
  topMatch?: VisualSearchResult;
}

export interface UploadedImage {
  file: File;
  preview: string;
  url?: string;
  cloudinaryId?: string;
  analysis?: ImageAnalysis;
}
