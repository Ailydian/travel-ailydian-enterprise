-- CreateEnum
CREATE TYPE "public"."MembershipType" AS ENUM ('BASIC', 'PREMIUM', 'VIP', 'ENTERPRISE');

-- CreateEnum
CREATE TYPE "public"."BookingType" AS ENUM ('HOTEL', 'FLIGHT', 'ACTIVITY', 'TOUR', 'CAR_RENTAL', 'RESTAURANT', 'PACKAGE', 'AIRPORT_TRANSFER');

-- CreateEnum
CREATE TYPE "public"."BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "public"."PaymentMethod" AS ENUM ('CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'PAYPAL', 'BITCOIN', 'ETHEREUM', 'USDT', 'LOYALTY_POINTS');

-- CreateEnum
CREATE TYPE "public"."PaymentStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REFUNDED', 'PARTIALLY_REFUNDED');

-- CreateEnum
CREATE TYPE "public"."NotificationType" AS ENUM ('BOOKING_CONFIRMATION', 'BOOKING_REMINDER', 'PAYMENT_SUCCESS', 'PAYMENT_FAILED', 'REVIEW_REQUEST', 'PROMOTION', 'AI_RECOMMENDATION', 'SYSTEM_UPDATE', 'PRICE_DROP', 'PRICE_ALERT');

-- CreateEnum
CREATE TYPE "public"."TransactionType" AS ENUM ('DEPOSIT', 'WITHDRAWAL', 'PAYMENT', 'REFUND', 'LOYALTY_EARN', 'LOYALTY_REDEEM');

-- CreateEnum
CREATE TYPE "public"."TransactionStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."VehicleType" AS ENUM ('SEDAN', 'VAN', 'MINIBUS', 'BUS', 'LUXURY_SEDAN', 'LUXURY_VAN');

-- CreateEnum
CREATE TYPE "public"."TransferType" AS ENUM ('ONE_WAY', 'ROUND_TRIP');

-- CreateEnum
CREATE TYPE "public"."AdminRole" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'MODERATOR');

-- CreateEnum
CREATE TYPE "public"."PriceAlertStatus" AS ENUM ('ACTIVE', 'TRIGGERED', 'EXPIRED', 'DISABLED');

-- CreateEnum
CREATE TYPE "public"."TripStatus" AS ENUM ('DRAFT', 'PLANNING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."CollaboratorRole" AS ENUM ('OWNER', 'EDITOR', 'VIEWER');

-- CreateEnum
CREATE TYPE "public"."CollaboratorStatus" AS ENUM ('PENDING', 'ACTIVE', 'DECLINED', 'REMOVED');

-- CreateEnum
CREATE TYPE "public"."ActivityType" AS ENUM ('HOTEL', 'FLIGHT', 'RESTAURANT', 'ATTRACTION', 'TOUR', 'TRANSPORTATION', 'SHOPPING', 'ENTERTAINMENT', 'RELAXATION', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."VoteType" AS ENUM ('UPVOTE', 'DOWNVOTE', 'INTERESTED', 'NOT_INTERESTED');

-- CreateEnum
CREATE TYPE "public"."HotelType" AS ENUM ('RESORT', 'BOUTIQUE', 'CITY_HOTEL', 'BEACH_HOTEL', 'APARTMENT', 'VILLA', 'HOSTEL', 'GUESTHOUSE');

-- CreateEnum
CREATE TYPE "public"."RoomType" AS ENUM ('STANDARD', 'DELUXE', 'SUITE', 'FAMILY', 'PENTHOUSE', 'VILLA', 'BUNGALOW');

-- CreateTable
CREATE TABLE "public"."Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "password" TEXT,
    "phone" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "gender" TEXT,
    "address" TEXT,
    "city" TEXT,
    "country" TEXT,
    "postalCode" TEXT,
    "preferredLanguage" TEXT NOT NULL DEFAULT 'tr',
    "preferredCurrency" TEXT NOT NULL DEFAULT 'TRY',
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "isPhoneVerified" BOOLEAN NOT NULL DEFAULT false,
    "membershipType" "public"."MembershipType" NOT NULL DEFAULT 'BASIC',
    "loyaltyPoints" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLoginAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "twoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "public"."bookings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bookingType" "public"."BookingType" NOT NULL,
    "status" "public"."BookingStatus" NOT NULL DEFAULT 'PENDING',
    "totalAmount" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'TRY',
    "paymentMethod" "public"."PaymentMethod" NOT NULL,
    "paymentStatus" "public"."PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "checkInDate" TIMESTAMP(3),
    "checkOutDate" TIMESTAMP(3),
    "guestCount" INTEGER,
    "specialRequests" TEXT,
    "bookingReference" TEXT NOT NULL,
    "metaData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."reviews" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bookingId" TEXT,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "title" TEXT,
    "content" TEXT NOT NULL,
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isBlockchain" BOOLEAN NOT NULL DEFAULT false,
    "blockchainHash" TEXT,
    "helpfulVotes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."favorites" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."notifications" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "public"."NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "data" JSONB,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."wallet_transactions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "public"."TransactionType" NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL,
    "cryptoCurrency" TEXT,
    "cryptoAmount" DECIMAL(65,30),
    "status" "public"."TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "description" TEXT NOT NULL,
    "reference" TEXT,
    "blockchainTxHash" TEXT,
    "metaData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wallet_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ai_preferences" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "travelStyle" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "budgetRange" TEXT,
    "preferredDestinations" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "interests" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "groupSize" TEXT,
    "travelFrequency" TEXT,
    "accommodationType" TEXT,
    "transportPreference" TEXT,
    "dietaryRestrictions" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "accessibilityNeeds" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."airport_transfers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "fromLocation" TEXT NOT NULL,
    "toLocation" TEXT NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "duration" INTEGER NOT NULL,
    "region" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "airport_transfers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."transfer_vehicles" (
    "id" TEXT NOT NULL,
    "transferId" TEXT NOT NULL,
    "vehicleType" "public"."VehicleType" NOT NULL,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "luggageCapacity" INTEGER NOT NULL,
    "priceStandard" DECIMAL(65,30) NOT NULL,
    "priceVIP" DECIMAL(65,30) NOT NULL,
    "features" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "image" TEXT,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transfer_vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."transfer_bookings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "transferId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "bookingRef" TEXT NOT NULL,
    "transferType" "public"."TransferType" NOT NULL DEFAULT 'ONE_WAY',
    "pickupLocation" TEXT NOT NULL,
    "dropoffLocation" TEXT NOT NULL,
    "pickupDate" TIMESTAMP(3) NOT NULL,
    "pickupTime" TEXT NOT NULL,
    "returnDate" TIMESTAMP(3),
    "returnTime" TEXT,
    "passengerCount" INTEGER NOT NULL,
    "luggageCount" INTEGER NOT NULL,
    "specialRequests" TEXT,
    "flightNumber" TEXT,
    "arrivalTime" TEXT,
    "basePrice" DECIMAL(65,30) NOT NULL,
    "totalPrice" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'TRY',
    "isVIP" BOOLEAN NOT NULL DEFAULT false,
    "status" "public"."BookingStatus" NOT NULL DEFAULT 'PENDING',
    "paymentStatus" "public"."PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paymentMethod" "public"."PaymentMethod",
    "paymentIntentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transfer_bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."admins" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "public"."AdminRole" NOT NULL DEFAULT 'MODERATOR',
    "permissions" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLogin" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."price_history" (
    "id" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'TRY',
    "metadata" JSONB,
    "source" TEXT,
    "checkInDate" TIMESTAMP(3),
    "checkOutDate" TIMESTAMP(3),
    "travelDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "price_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."price_alerts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "entityName" TEXT NOT NULL,
    "targetPrice" DECIMAL(65,30) NOT NULL,
    "currentPrice" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'TRY',
    "status" "public"."PriceAlertStatus" NOT NULL DEFAULT 'ACTIVE',
    "notificationMethod" TEXT[] DEFAULT ARRAY['EMAIL']::TEXT[],
    "metadata" JSONB,
    "priceDropPercentage" DECIMAL(65,30),
    "expiresAt" TIMESTAMP(3),
    "lastNotifiedAt" TIMESTAMP(3),
    "notificationCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "price_alerts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."trips" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "destination" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "budget" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'TRY',
    "travelers" INTEGER NOT NULL DEFAULT 1,
    "status" "public"."TripStatus" NOT NULL DEFAULT 'DRAFT',
    "preferences" JSONB,
    "aiGenerated" BOOLEAN NOT NULL DEFAULT false,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "shareLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."trip_itineraries" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "activities" JSONB[],
    "totalCost" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "weather" JSONB,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trip_itineraries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."trip_collaborators" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "userId" TEXT,
    "email" TEXT NOT NULL,
    "role" "public"."CollaboratorRole" NOT NULL DEFAULT 'VIEWER',
    "status" "public"."CollaboratorStatus" NOT NULL DEFAULT 'PENDING',
    "invitedBy" TEXT NOT NULL,
    "invitedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "joinedAt" TIMESTAMP(3),
    "permissions" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "trip_collaborators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."trip_activities" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" "public"."ActivityType" NOT NULL,
    "location" TEXT NOT NULL,
    "address" TEXT,
    "coordinates" JSONB,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3),
    "duration" INTEGER,
    "cost" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'TRY',
    "bookingUrl" TEXT,
    "bookingStatus" TEXT DEFAULT 'PENDING',
    "notes" TEXT,
    "addedBy" TEXT NOT NULL,
    "aiSuggested" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trip_activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."trip_comments" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "activityId" TEXT,
    "content" TEXT NOT NULL,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trip_comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."trip_votes" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "activityId" TEXT,
    "userId" TEXT NOT NULL,
    "voteType" "public"."VoteType" NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trip_votes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."hotels" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "shortDescription" TEXT,
    "country" TEXT NOT NULL DEFAULT 'Turkey',
    "city" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "coordinates" JSONB,
    "distanceToAirport" DOUBLE PRECISION,
    "distanceToBeach" DOUBLE PRECISION,
    "distanceToCenter" DOUBLE PRECISION,
    "stars" INTEGER NOT NULL,
    "rating" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "hotelType" "public"."HotelType" NOT NULL,
    "checkInTime" TEXT NOT NULL DEFAULT '14:00',
    "checkOutTime" TEXT NOT NULL DEFAULT '12:00',
    "yearBuilt" INTEGER,
    "yearRenovated" INTEGER,
    "roomCount" INTEGER NOT NULL,
    "floorCount" INTEGER,
    "mainImage" TEXT NOT NULL,
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "virtualTourUrl" TEXT,
    "amenities" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "facilities" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "roomFeatures" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "cancellationPolicy" TEXT,
    "childPolicy" TEXT,
    "petPolicy" TEXT,
    "priceMin" DECIMAL(65,30) NOT NULL,
    "priceMax" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'TRY',
    "phone" TEXT,
    "email" TEXT,
    "website" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isRecommended" BOOLEAN NOT NULL DEFAULT false,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "keywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hotels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."hotel_rooms" (
    "id" TEXT NOT NULL,
    "hotelId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "roomType" "public"."RoomType" NOT NULL,
    "size" DOUBLE PRECISION,
    "bedType" TEXT NOT NULL,
    "maxOccupancy" INTEGER NOT NULL,
    "maxAdults" INTEGER NOT NULL,
    "maxChildren" INTEGER NOT NULL,
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "amenities" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "view" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "pricePerNight" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'TRY',
    "roomCount" INTEGER NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "mealPlans" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hotel_rooms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "public"."Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "public"."Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "public"."VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "public"."VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "bookings_bookingReference_key" ON "public"."bookings"("bookingReference");

-- CreateIndex
CREATE UNIQUE INDEX "favorites_userId_entityType_entityId_key" ON "public"."favorites"("userId", "entityType", "entityId");

-- CreateIndex
CREATE UNIQUE INDEX "wallet_transactions_reference_key" ON "public"."wallet_transactions"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "ai_preferences_userId_key" ON "public"."ai_preferences"("userId");

-- CreateIndex
CREATE INDEX "airport_transfers_region_idx" ON "public"."airport_transfers"("region");

-- CreateIndex
CREATE INDEX "airport_transfers_fromLocation_idx" ON "public"."airport_transfers"("fromLocation");

-- CreateIndex
CREATE INDEX "transfer_vehicles_transferId_idx" ON "public"."transfer_vehicles"("transferId");

-- CreateIndex
CREATE INDEX "transfer_vehicles_vehicleType_idx" ON "public"."transfer_vehicles"("vehicleType");

-- CreateIndex
CREATE UNIQUE INDEX "transfer_bookings_bookingRef_key" ON "public"."transfer_bookings"("bookingRef");

-- CreateIndex
CREATE INDEX "transfer_bookings_userId_idx" ON "public"."transfer_bookings"("userId");

-- CreateIndex
CREATE INDEX "transfer_bookings_transferId_idx" ON "public"."transfer_bookings"("transferId");

-- CreateIndex
CREATE INDEX "transfer_bookings_pickupDate_idx" ON "public"."transfer_bookings"("pickupDate");

-- CreateIndex
CREATE INDEX "transfer_bookings_status_idx" ON "public"."transfer_bookings"("status");

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "public"."admins"("email");

-- CreateIndex
CREATE INDEX "admins_email_idx" ON "public"."admins"("email");

-- CreateIndex
CREATE INDEX "admins_role_idx" ON "public"."admins"("role");

-- CreateIndex
CREATE INDEX "price_history_entityType_entityId_idx" ON "public"."price_history"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "price_history_entityType_entityId_createdAt_idx" ON "public"."price_history"("entityType", "entityId", "createdAt");

-- CreateIndex
CREATE INDEX "price_history_createdAt_idx" ON "public"."price_history"("createdAt");

-- CreateIndex
CREATE INDEX "price_alerts_userId_idx" ON "public"."price_alerts"("userId");

-- CreateIndex
CREATE INDEX "price_alerts_entityType_entityId_idx" ON "public"."price_alerts"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "price_alerts_status_idx" ON "public"."price_alerts"("status");

-- CreateIndex
CREATE INDEX "price_alerts_expiresAt_idx" ON "public"."price_alerts"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "trips_shareLink_key" ON "public"."trips"("shareLink");

-- CreateIndex
CREATE INDEX "trips_userId_idx" ON "public"."trips"("userId");

-- CreateIndex
CREATE INDEX "trips_status_idx" ON "public"."trips"("status");

-- CreateIndex
CREATE INDEX "trips_startDate_idx" ON "public"."trips"("startDate");

-- CreateIndex
CREATE INDEX "trips_shareLink_idx" ON "public"."trips"("shareLink");

-- CreateIndex
CREATE INDEX "trip_itineraries_tripId_idx" ON "public"."trip_itineraries"("tripId");

-- CreateIndex
CREATE INDEX "trip_itineraries_day_idx" ON "public"."trip_itineraries"("day");

-- CreateIndex
CREATE INDEX "trip_collaborators_tripId_idx" ON "public"."trip_collaborators"("tripId");

-- CreateIndex
CREATE INDEX "trip_collaborators_userId_idx" ON "public"."trip_collaborators"("userId");

-- CreateIndex
CREATE INDEX "trip_collaborators_email_idx" ON "public"."trip_collaborators"("email");

-- CreateIndex
CREATE UNIQUE INDEX "trip_collaborators_tripId_email_key" ON "public"."trip_collaborators"("tripId", "email");

-- CreateIndex
CREATE INDEX "trip_activities_tripId_idx" ON "public"."trip_activities"("tripId");

-- CreateIndex
CREATE INDEX "trip_activities_type_idx" ON "public"."trip_activities"("type");

-- CreateIndex
CREATE INDEX "trip_activities_startTime_idx" ON "public"."trip_activities"("startTime");

-- CreateIndex
CREATE INDEX "trip_comments_tripId_idx" ON "public"."trip_comments"("tripId");

-- CreateIndex
CREATE INDEX "trip_comments_userId_idx" ON "public"."trip_comments"("userId");

-- CreateIndex
CREATE INDEX "trip_comments_activityId_idx" ON "public"."trip_comments"("activityId");

-- CreateIndex
CREATE INDEX "trip_comments_parentId_idx" ON "public"."trip_comments"("parentId");

-- CreateIndex
CREATE INDEX "trip_votes_tripId_idx" ON "public"."trip_votes"("tripId");

-- CreateIndex
CREATE INDEX "trip_votes_activityId_idx" ON "public"."trip_votes"("activityId");

-- CreateIndex
CREATE INDEX "trip_votes_userId_idx" ON "public"."trip_votes"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "trip_votes_tripId_activityId_userId_key" ON "public"."trip_votes"("tripId", "activityId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "hotels_slug_key" ON "public"."hotels"("slug");

-- CreateIndex
CREATE INDEX "hotels_city_idx" ON "public"."hotels"("city");

-- CreateIndex
CREATE INDEX "hotels_region_idx" ON "public"."hotels"("region");

-- CreateIndex
CREATE INDEX "hotels_stars_idx" ON "public"."hotels"("stars");

-- CreateIndex
CREATE INDEX "hotels_rating_idx" ON "public"."hotels"("rating");

-- CreateIndex
CREATE INDEX "hotels_isActive_idx" ON "public"."hotels"("isActive");

-- CreateIndex
CREATE INDEX "hotels_isFeatured_idx" ON "public"."hotels"("isFeatured");

-- CreateIndex
CREATE INDEX "hotel_rooms_hotelId_idx" ON "public"."hotel_rooms"("hotelId");

-- CreateIndex
CREATE INDEX "hotel_rooms_roomType_idx" ON "public"."hotel_rooms"("roomType");

-- CreateIndex
CREATE INDEX "hotel_rooms_isAvailable_idx" ON "public"."hotel_rooms"("isAvailable");

-- AddForeignKey
ALTER TABLE "public"."Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."bookings" ADD CONSTRAINT "bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reviews" ADD CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reviews" ADD CONSTRAINT "reviews_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "public"."bookings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."favorites" ADD CONSTRAINT "favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."wallet_transactions" ADD CONSTRAINT "wallet_transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ai_preferences" ADD CONSTRAINT "ai_preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."transfer_vehicles" ADD CONSTRAINT "transfer_vehicles_transferId_fkey" FOREIGN KEY ("transferId") REFERENCES "public"."airport_transfers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."transfer_bookings" ADD CONSTRAINT "transfer_bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."transfer_bookings" ADD CONSTRAINT "transfer_bookings_transferId_fkey" FOREIGN KEY ("transferId") REFERENCES "public"."airport_transfers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."transfer_bookings" ADD CONSTRAINT "transfer_bookings_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "public"."transfer_vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."price_alerts" ADD CONSTRAINT "price_alerts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trips" ADD CONSTRAINT "trips_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trip_itineraries" ADD CONSTRAINT "trip_itineraries_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "public"."trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trip_collaborators" ADD CONSTRAINT "trip_collaborators_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "public"."trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trip_activities" ADD CONSTRAINT "trip_activities_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "public"."trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trip_comments" ADD CONSTRAINT "trip_comments_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "public"."trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trip_votes" ADD CONSTRAINT "trip_votes_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "public"."trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trip_votes" ADD CONSTRAINT "trip_votes_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "public"."trip_activities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."hotel_rooms" ADD CONSTRAINT "hotel_rooms_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "public"."hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;
