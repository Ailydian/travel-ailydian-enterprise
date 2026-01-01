-- PRODUCTION-GRADE COMPOSITE INDEXES FOR PERFORMANCE OPTIMIZATION
-- Execute this migration to add missing indexes from architecture review

-- ============================================
-- USER TABLE INDEXES
-- ============================================

-- Login and authentication queries
CREATE INDEX IF NOT EXISTS "idx_users_email_active" ON "users"("email", "isActive") WHERE "isActive" = true;

-- Membership and loyalty queries
CREATE INDEX IF NOT EXISTS "idx_users_membership_points" ON "users"("membershipType", "loyaltyPoints" DESC);

-- Analytics queries
CREATE INDEX IF NOT EXISTS "idx_users_created_at" ON "users"("createdAt" DESC);

-- Activity tracking
CREATE INDEX IF NOT EXISTS "idx_users_last_login" ON "users"("lastLoginAt" DESC NULLS LAST) WHERE "lastLoginAt" IS NOT NULL;

-- Localization queries
CREATE INDEX IF NOT EXISTS "idx_users_locale" ON "users"("preferredLanguage", "preferredCurrency");

-- ============================================
-- BOOKING TABLE INDEXES
-- ============================================

-- User booking history (most common query)
CREATE INDEX IF NOT EXISTS "idx_bookings_user_status" ON "bookings"("userId", "status");

-- Type-specific queries
CREATE INDEX IF NOT EXISTS "idx_bookings_type_status" ON "bookings"("bookingType", "status");

-- Payment tracking
CREATE INDEX IF NOT EXISTS "idx_bookings_payment_status" ON "bookings"("paymentStatus") WHERE "paymentStatus" != 'COMPLETED';

-- Date range queries for calendar views
CREATE INDEX IF NOT EXISTS "idx_bookings_dates" ON "bookings"("checkInDate", "checkOutDate") WHERE "checkInDate" IS NOT NULL;

-- User timeline
CREATE INDEX IF NOT EXISTS "idx_bookings_user_created" ON "bookings"("userId", "createdAt" DESC);

-- Recent bookings
CREATE INDEX IF NOT EXISTS "idx_bookings_created" ON "bookings"("createdAt" DESC);

-- ============================================
-- HOTEL TABLE INDEXES
-- ============================================

-- City + star filtering (very common)
CREATE INDEX IF NOT EXISTS "idx_hotels_city_stars" ON "hotels"("city", "stars") WHERE "isActive" = true;

-- Region + rating filtering
CREATE INDEX IF NOT EXISTS "idx_hotels_region_rating" ON "hotels"("region", "rating" DESC) WHERE "isActive" = true;

-- Price range queries
CREATE INDEX IF NOT EXISTS "idx_hotels_price_range" ON "hotels"("priceMin", "priceMax");

-- Featured listings
CREATE INDEX IF NOT EXISTS "idx_hotels_featured_rating" ON "hotels"("isFeatured", "rating" DESC) WHERE "isFeatured" = true AND "isActive" = true;

-- Most common composite query (city + stars + rating)
CREATE INDEX IF NOT EXISTS "idx_hotels_search_composite" ON "hotels"("city", "stars", "rating" DESC) WHERE "isActive" = true;

-- Active city hotels by star rating
CREATE INDEX IF NOT EXISTS "idx_hotels_active_city_stars" ON "hotels"("isActive", "city", "stars") WHERE "isActive" = true;

-- Full-text search on hotel names (PostgreSQL specific)
CREATE INDEX IF NOT EXISTS "idx_hotels_name_fulltext" ON "hotels" USING gin(to_tsvector('english', "name"));

-- ============================================
-- HOTEL ROOM TABLE INDEXES
-- ============================================

-- Room availability by hotel
CREATE INDEX IF NOT EXISTS "idx_hotel_rooms_availability" ON "hotel_rooms"("hotelId", "isAvailable", "pricePerNight") WHERE "isAvailable" = true;

-- Room type filtering
CREATE INDEX IF NOT EXISTS "idx_hotel_rooms_type_price" ON "hotel_rooms"("roomType", "pricePerNight");

-- ============================================
-- TOUR PACKAGE TABLE INDEXES
-- ============================================

-- Destination + rating
CREATE INDEX IF NOT EXISTS "idx_tours_destination_rating" ON "tour_packages"("destination", "rating" DESC) WHERE "isActive" = true;

-- Category browse
CREATE INDEX IF NOT EXISTS "idx_tours_category_rating" ON "tour_packages"("category", "rating" DESC) WHERE "isActive" = true;

-- Price sorting
CREATE INDEX IF NOT EXISTS "idx_tours_price" ON "tour_packages"("priceAdult");

-- Destination + price
CREATE INDEX IF NOT EXISTS "idx_tours_dest_price" ON "tour_packages"("destination", "priceAdult");

-- Featured active tours
CREATE INDEX IF NOT EXISTS "idx_tours_featured" ON "tour_packages"("isActive", "isFeatured", "rating" DESC) WHERE "isActive" = true AND "isFeatured" = true;

-- Difficulty filtering
CREATE INDEX IF NOT EXISTS "idx_tours_difficulty_rating" ON "tour_packages"("difficultyLevel", "rating" DESC) WHERE "isActive" = true;

-- ============================================
-- CAR RENTAL TABLE INDEXES
-- ============================================

-- Category + price (common filter)
CREATE INDEX IF NOT EXISTS "idx_cars_category_price" ON "car_rentals"("category", "pricePerDay") WHERE "isActive" = true;

-- Brand/model search
CREATE INDEX IF NOT EXISTS "idx_cars_brand_model" ON "car_rentals"("brand", "model") WHERE "isActive" = true;

-- Feature filtering
CREATE INDEX IF NOT EXISTS "idx_cars_features" ON "car_rentals"("transmission", "fuelType") WHERE "isActive" = true;

-- Availability check
CREATE INDEX IF NOT EXISTS "idx_cars_availability" ON "car_rentals"("isActive", "isAvailable") WHERE "isActive" = true AND "isAvailable" = true;

-- Capacity + price
CREATE INDEX IF NOT EXISTS "idx_cars_seats_price" ON "car_rentals"("seats", "pricePerDay") WHERE "isActive" = true;

-- ============================================
-- CAR RENTAL BOOKING TABLE INDEXES
-- ============================================

-- User booking history
CREATE INDEX IF NOT EXISTS "idx_car_bookings_user_status" ON "car_rental_bookings"("userId", "status");

-- Date-based queries
CREATE INDEX IF NOT EXISTS "idx_car_bookings_dates" ON "car_rental_bookings"("pickupDate", "dropoffDate");

-- Car availability
CREATE INDEX IF NOT EXISTS "idx_car_bookings_car_date" ON "car_rental_bookings"("carId", "pickupDate", "status");

-- ============================================
-- PRICE HISTORY TABLE INDEXES
-- ============================================

-- Latest price lookup (most common query)
CREATE INDEX IF NOT EXISTS "idx_price_history_latest" ON "price_history"("entityType", "entityId", "createdAt" DESC);

-- Date-based price queries
CREATE INDEX IF NOT EXISTS "idx_price_history_travel_date" ON "price_history"("travelDate", "entityType") WHERE "travelDate" IS NOT NULL;

-- Hotel availability pricing
CREATE INDEX IF NOT EXISTS "idx_price_history_hotel_dates" ON "price_history"("checkInDate", "checkOutDate", "entityId") WHERE "entityType" = 'HOTEL';

-- ============================================
-- PRICE ALERT TABLE INDEXES
-- ============================================

-- User active alerts
CREATE INDEX IF NOT EXISTS "idx_price_alerts_user_status" ON "price_alerts"("userId", "status") WHERE "status" = 'ACTIVE';

-- Entity alerts
CREATE INDEX IF NOT EXISTS "idx_price_alerts_entity" ON "price_alerts"("entityType", "entityId", "status");

-- Alert processing (for cron jobs)
CREATE INDEX IF NOT EXISTS "idx_price_alerts_processing" ON "price_alerts"("status", "expiresAt") WHERE "status" = 'ACTIVE';

-- Notification scheduling
CREATE INDEX IF NOT EXISTS "idx_price_alerts_notification" ON "price_alerts"("lastNotifiedAt" NULLS FIRST) WHERE "status" = 'ACTIVE';

-- ============================================
-- TRANSFER BOOKING TABLE INDEXES
-- ============================================

-- User transfer history
CREATE INDEX IF NOT EXISTS "idx_transfer_bookings_user" ON "transfer_bookings"("userId", "status");

-- Date + status filtering
CREATE INDEX IF NOT EXISTS "idx_transfer_bookings_date_status" ON "transfer_bookings"("pickupDate", "status");

-- Transfer availability
CREATE INDEX IF NOT EXISTS "idx_transfer_bookings_avail" ON "transfer_bookings"("transferId", "pickupDate");

-- ============================================
-- REVIEW TABLE INDEXES
-- ============================================

-- Entity reviews by rating (for sorting)
CREATE INDEX IF NOT EXISTS "idx_reviews_entity_rating" ON "reviews"("entityType", "entityId", "rating" DESC);

-- User review timeline
CREATE INDEX IF NOT EXISTS "idx_reviews_user_created" ON "reviews"("userId", "createdAt" DESC);

-- Verified reviews
CREATE INDEX IF NOT EXISTS "idx_reviews_verified_rating" ON "reviews"("isVerified", "rating" DESC) WHERE "isVerified" = true;

-- Recent reviews for entities
CREATE INDEX IF NOT EXISTS "idx_reviews_recent" ON "reviews"("entityType", "entityId", "createdAt" DESC);

-- ============================================
-- TRIP TABLE INDEXES
-- ============================================

-- User trips by status
CREATE INDEX IF NOT EXISTS "idx_trips_user_status" ON "trips"("userId", "status");

-- Date range filtering
CREATE INDEX IF NOT EXISTS "idx_trips_dates" ON "trips"("startDate", "endDate");

-- Destination trips
CREATE INDEX IF NOT EXISTS "idx_trips_destination" ON "trips"("destination", "startDate");

-- Public trip feed
CREATE INDEX IF NOT EXISTS "idx_trips_public" ON "trips"("isPublic", "createdAt" DESC) WHERE "isPublic" = true;

-- Collaborative trips
CREATE INDEX IF NOT EXISTS "idx_trips_collaborative" ON "trips"("isCollaborative", "shareCode") WHERE "isCollaborative" = true;

-- ============================================
-- TRIP ACTIVITY TABLE INDEXES
-- ============================================

-- Trip activities ordered by time
CREATE INDEX IF NOT EXISTS "idx_trip_activities_time" ON "trip_activities"("tripId", "startTime");

-- Activity type filtering
CREATE INDEX IF NOT EXISTS "idx_trip_activities_type" ON "trip_activities"("type", "startTime");

-- ============================================
-- NOTIFICATION TABLE INDEXES
-- ============================================

-- Unread notifications (very common)
CREATE INDEX IF NOT EXISTS "idx_notifications_unread" ON "notifications"("userId", "isRead") WHERE "isRead" = false;

-- User notification feed
CREATE INDEX IF NOT EXISTS "idx_notifications_feed" ON "notifications"("userId", "createdAt" DESC);

-- Type-specific notifications
CREATE INDEX IF NOT EXISTS "idx_notifications_type" ON "notifications"("type", "userId");

-- ============================================
-- SEO LANDING PAGE TABLE INDEXES
-- ============================================

-- Page type filtering
CREATE INDEX IF NOT EXISTS "idx_seo_pages_type_category" ON "seo_landing_pages"("pageType", "category") WHERE "isActive" = true;

-- Active indexed pages
CREATE INDEX IF NOT EXISTS "idx_seo_pages_indexed" ON "seo_landing_pages"("isActive", "isIndexed") WHERE "isActive" = true;

-- Category pages
CREATE INDEX IF NOT EXISTS "idx_seo_pages_category" ON "seo_landing_pages"("category", "isActive") WHERE "isActive" = true;

-- ============================================
-- PARTNER LISTING TABLE INDEXES
-- ============================================

-- Partner dashboard
CREATE INDEX IF NOT EXISTS "idx_partner_listings_dashboard" ON "partner_listings"("partnerId", "status");

-- Active listings by type
CREATE INDEX IF NOT EXISTS "idx_partner_listings_type" ON "partner_listings"("listingType", "isActive") WHERE "isActive" = true;

-- Top performing listings
CREATE INDEX IF NOT EXISTS "idx_partner_listings_views" ON "partner_listings"("partnerId", "views" DESC);

-- ============================================
-- RENTAL PROPERTY TABLE INDEXES
-- ============================================

-- City filtering
CREATE INDEX IF NOT EXISTS "idx_rental_props_city" ON "rental_properties"("city", "overall" DESC) WHERE "isActive" = true;

-- Type filtering
CREATE INDEX IF NOT EXISTS "idx_rental_props_type" ON "rental_properties"("type", "basePrice") WHERE "isActive" = true;

-- Featured properties
CREATE INDEX IF NOT EXISTS "idx_rental_props_featured" ON "rental_properties"("isFeatured", "overall" DESC) WHERE "isFeatured" = true AND "isActive" = true;

-- Price range search
CREATE INDEX IF NOT EXISTS "idx_rental_props_price" ON "rental_properties"("basePrice") WHERE "isActive" = true;

-- ============================================
-- AIRPORT TRANSFER TABLE INDEXES
-- ============================================

-- Region filtering
CREATE INDEX IF NOT EXISTS "idx_transfers_region" ON "airport_transfers"("region") WHERE "isActive" = true;

-- Location search
CREATE INDEX IF NOT EXISTS "idx_transfers_location" ON "airport_transfers"("fromLocation") WHERE "isActive" = true;

-- ============================================
-- PARTIAL INDEXES FOR PERFORMANCE
-- ============================================

-- Active records only (reduces index size significantly)
CREATE INDEX IF NOT EXISTS "idx_users_active" ON "users"("id") WHERE "isActive" = true;
CREATE INDEX IF NOT EXISTS "idx_hotels_active" ON "hotels"("id") WHERE "isActive" = true;
CREATE INDEX IF NOT EXISTS "idx_tours_active" ON "tour_packages"("id") WHERE "isActive" = true;
CREATE INDEX IF NOT EXISTS "idx_cars_active" ON "car_rentals"("id") WHERE "isActive" = true;

-- ============================================
-- EXPRESSION INDEXES FOR CASE-INSENSITIVE SEARCH
-- ============================================

-- Case-insensitive hotel name search
CREATE INDEX IF NOT EXISTS "idx_hotels_name_lower" ON "hotels"(LOWER("name"));

-- Case-insensitive city search
CREATE INDEX IF NOT EXISTS "idx_hotels_city_lower" ON "hotels"(LOWER("city"));

-- Case-insensitive email search (for admin)
CREATE INDEX IF NOT EXISTS "idx_users_email_lower" ON "users"(LOWER("email"));

-- ============================================
-- ANALYSIS AND VACUUM
-- ============================================

-- Update table statistics for query planner
ANALYZE "users";
ANALYZE "bookings";
ANALYZE "hotels";
ANALYZE "hotel_rooms";
ANALYZE "tour_packages";
ANALYZE "car_rentals";
ANALYZE "car_rental_bookings";
ANALYZE "price_history";
ANALYZE "price_alerts";
ANALYZE "reviews";
ANALYZE "trips";
ANALYZE "notifications";

-- Vacuum to reclaim space and update statistics
VACUUM ANALYZE;

-- ============================================
-- NOTES
-- ============================================

-- 1. These indexes are optimized for read-heavy workloads
-- 2. Write operations may be slightly slower due to index maintenance
-- 3. Monitor index usage with: SELECT * FROM pg_stat_user_indexes;
-- 4. Remove unused indexes with: DROP INDEX CONCURRENTLY IF EXISTS index_name;
-- 5. Rebuild bloated indexes with: REINDEX INDEX CONCURRENTLY index_name;
-- 6. Check index size with: SELECT pg_size_pretty(pg_relation_size('index_name'));
