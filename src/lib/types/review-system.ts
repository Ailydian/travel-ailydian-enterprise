// Global Review System Types
export interface MultiLanguageContent {
  [languageCode: string]: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Country {
  id: number;
  code: string;
  name: MultiLanguageContent;
  continent: string;
  currency_code?: string;
  phone_code?: string;
  timezone?: string;
  coordinates?: Coordinates;
  created_at: string;
  updated_at: string;
}

export interface City {
  id: number;
  country_id: number;
  country?: Country;
  name: MultiLanguageContent;
  slug: string;
  description?: MultiLanguageContent;
  population?: number;
  coordinates: Coordinates;
  timezone?: string;
  popular_rank: number;
  created_at: string;
  updated_at: string;
}

export interface LocationCategory {
  id: number;
  name: MultiLanguageContent;
  slug: string;
  icon?: string;
  parent_id?: number;
  parent?: LocationCategory;
  children?: LocationCategory[];
  sort_order: number;
}

export interface BusinessHours {
  [day: string]: {
    open: string;
    close: string;
    closed?: boolean;
  };
}

export interface Location {
  id: number;
  category_id: number;
  category?: LocationCategory;
  city_id: number;
  city?: City;
  name: MultiLanguageContent;
  slug: string;
  description?: MultiLanguageContent;
  address?: MultiLanguageContent;
  coordinates: Coordinates;
  phone?: string;
  email?: string;
  website?: string;
  price_range: number; // 1-4 scale
  opening_hours?: BusinessHours;
  features?: string[]; // ["wifi", "parking", "pet_friendly"]
  
  // External integrations
  google_place_id?: string;
  tripadvisor_id?: string;
  
  // SEO
  seo_title?: MultiLanguageContent;
  seo_description?: MultiLanguageContent;
  meta_keywords?: MultiLanguageContent;
  
  // Status
  status: 'active' | 'inactive' | 'pending' | 'blocked';
  verified: boolean;
  claimed: boolean;
  claim_date?: string;
  
  // Statistics
  total_reviews: number;
  average_rating: number;
  total_photos: number;
  total_views: number;
  
  // Relations
  reviews?: Review[];
  photos?: Photo[];
  
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  email: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  bio?: MultiLanguageContent;
  
  // Location
  country_id?: number;
  country?: Country;
  city_id?: number;
  city?: City;
  
  // Preferences
  preferred_language: string;
  preferred_currency: string;
  
  // Social auth
  google_id?: string;
  facebook_id?: string;
  
  // Status and reputation
  status: 'active' | 'inactive' | 'suspended' | 'banned';
  reputation_score: number;
  total_reviews: number;
  total_photos: number;
  reviewer_level: number; // 1-10
  
  // Privacy
  profile_public: boolean;
  location_public: boolean;
  
  created_at: string;
  updated_at: string;
  last_login?: string;
}

export interface Review {
  id: number;
  location_id: number;
  location?: Location;
  user_id: number;
  user?: User;
  
  // Content
  title?: MultiLanguageContent;
  content: MultiLanguageContent;
  language: string;
  
  // Ratings (1-5)
  overall_rating: number;
  service_rating?: number;
  food_rating?: number;
  atmosphere_rating?: number;
  value_rating?: number;
  cleanliness_rating?: number;
  
  // Visit details
  visit_date?: string;
  visit_type?: 'business' | 'leisure' | 'family' | 'couple' | 'solo';
  
  // Status
  status: 'active' | 'pending' | 'hidden' | 'spam' | 'deleted';
  moderation_notes?: string;
  flagged_count: number;
  helpful_count: number;
  
  // External sync
  synced_to_google: boolean;
  synced_to_tripadvisor: boolean;
  google_review_id?: string;
  tripadvisor_review_id?: string;
  
  // Relations
  photos?: Photo[];
  votes?: ReviewVote[];
  
  created_at: string;
  updated_at: string;
}

export interface Photo {
  id: number;
  location_id?: number;
  location?: Location;
  review_id?: number;
  review?: Review;
  user_id: number;
  user?: User;
  
  // File details
  url: string;
  thumbnail_url?: string;
  medium_url?: string;
  filename: string;
  original_filename?: string;
  file_size?: number;
  width?: number;
  height?: number;
  
  // Content
  caption?: MultiLanguageContent;
  alt_text?: MultiLanguageContent;
  
  // Categorization
  photo_type?: 'exterior' | 'interior' | 'food' | 'menu' | 'amenity' | 'view' | 'other';
  tags?: string[];
  
  // Status
  status: 'active' | 'pending' | 'hidden' | 'rejected';
  moderation_status: 'pending' | 'approved' | 'rejected';
  is_cover_photo: boolean;
  
  // External sync
  synced_to_google: boolean;
  synced_to_tripadvisor: boolean;
  
  // Engagement
  view_count: number;
  like_count: number;
  
  // Relations
  likes?: PhotoLike[];
  
  created_at: string;
  updated_at: string;
}

export interface ReviewVote {
  id: number;
  review_id: number;
  review?: Review;
  user_id: number;
  user?: User;
  vote_type: 'helpful' | 'not_helpful';
  created_at: string;
}

export interface PhotoLike {
  id: number;
  photo_id: number;
  photo?: Photo;
  user_id: number;
  user?: User;
  created_at: string;
}

export interface LocationFavorite {
  id: number;
  location_id: number;
  location?: Location;
  user_id: number;
  user?: User;
  created_at: string;
}

export interface ContentReport {
  id: number;
  reported_by: number;
  reporter?: User;
  content_type: 'review' | 'photo' | 'location';
  content_id: number;
  reason: 'spam' | 'inappropriate' | 'fake' | 'offensive' | 'copyright' | 'other';
  description?: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  moderator_id?: number;
  moderator?: User;
  moderator_notes?: string;
  created_at: string;
  resolved_at?: string;
}

// API Request/Response Types
export interface CreateReviewRequest {
  location_id: number;
  title?: MultiLanguageContent;
  content: MultiLanguageContent;
  language: string;
  overall_rating: number;
  service_rating?: number;
  food_rating?: number;
  atmosphere_rating?: number;
  value_rating?: number;
  cleanliness_rating?: number;
  visit_date?: string;
  visit_type?: string;
  photos?: File[];
}

export interface UpdateReviewRequest extends Partial<CreateReviewRequest> {
  id: number;
}

export interface CreateLocationRequest {
  category_id: number;
  city_id: number;
  name: MultiLanguageContent;
  description?: MultiLanguageContent;
  address?: MultiLanguageContent;
  coordinates: Coordinates;
  phone?: string;
  email?: string;
  website?: string;
  price_range?: number;
  opening_hours?: BusinessHours;
  features?: string[];
  google_place_id?: string;
  tripadvisor_id?: string;
}

export interface SearchLocationsRequest {
  query?: string;
  city_id?: number;
  country_id?: number;
  category_id?: number;
  coordinates?: Coordinates;
  radius?: number; // in kilometers
  min_rating?: number;
  max_price_range?: number;
  features?: string[];
  sort_by?: 'rating' | 'reviews' | 'distance' | 'name' | 'price';
  sort_order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  language?: string;
}

export interface SearchLocationsResponse {
  locations: Location[];
  total_count: number;
  page: number;
  limit: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface LocationAnalytics {
  total_views: number;
  total_reviews: number;
  average_rating: number;
  rating_distribution: { [key: number]: number };
  review_trends: {
    date: string;
    count: number;
    average_rating: number;
  }[];
  popular_times: {
    day: string;
    hours: { [hour: string]: number };
  }[];
  visitor_demographics: {
    age_groups: { [key: string]: number };
    visit_types: { [key: string]: number };
    countries: { [key: string]: number };
  };
}

// Filter and pagination types
export interface PaginationParams {
  page: number;
  limit: number;
  offset: number;
}

export interface SortParams {
  field: string;
  direction: 'asc' | 'desc';
}

export interface FilterParams {
  [key: string]: any;
}

// API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  metadata?: {
    pagination?: PaginationParams & { total: number; pages: number };
    filters?: FilterParams;
    sort?: SortParams;
  };
}

// External API integration types
export interface GooglePlaceDetails {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  types: string[];
  business_status?: string;
  opening_hours?: {
    periods: Array<{
      open: { day: number; time: string };
      close?: { day: number; time: string };
    }>;
  };
  rating?: number;
  user_ratings_total?: number;
  photos?: Array<{
    photo_reference: string;
    height: number;
    width: number;
  }>;
  reviews?: Array<{
    author_name: string;
    author_url?: string;
    language: string;
    profile_photo_url?: string;
    rating: number;
    relative_time_description: string;
    text: string;
    time: number;
  }>;
}

export interface TripAdvisorLocation {
  location_id: string;
  name: string;
  address_obj: {
    street1?: string;
    street2?: string;
    city?: string;
    state?: string;
    country?: string;
    postalcode?: string;
    address_string: string;
  };
  latitude: string;
  longitude: string;
  rating?: string;
  num_reviews?: string;
  category: {
    key: string;
    name: string;
  };
  subcategory: Array<{
    key: string;
    name: string;
  }>;
}

// Validation schemas (to be used with Zod)
export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface FormattedLocation extends Location {
  distance?: number; // For location-based searches
  relevance_score?: number; // For search relevance
  formatted_address?: string;
  display_name?: string; // Localized name for current language
  price_range_text?: string; // $ to $$$$
  status_text?: string;
  category_name?: string;
  city_name?: string;
  country_name?: string;
}