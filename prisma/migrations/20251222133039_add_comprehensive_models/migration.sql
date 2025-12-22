-- CreateEnum
CREATE TYPE "public"."CarCategory" AS ENUM ('ECONOMY_SEDAN', 'PREMIUM_SEDAN', 'ECONOMY_SUV', 'PREMIUM_SUV', 'LUXURY', 'SPORTS', 'VAN', 'MINIVAN', 'COMPACT', 'FULLSIZE');

-- CreateEnum
CREATE TYPE "public"."TransmissionType" AS ENUM ('MANUAL', 'AUTOMATIC', 'SEMI_AUTOMATIC');

-- CreateEnum
CREATE TYPE "public"."FuelType" AS ENUM ('GASOLINE', 'DIESEL', 'ELECTRIC', 'HYBRID', 'PLUGIN_HYBRID');

-- CreateEnum
CREATE TYPE "public"."PropertyType" AS ENUM ('VILLA', 'APARTMENT', 'HOUSE', 'STUDIO', 'PENTHOUSE', 'COTTAGE');

-- CreateEnum
CREATE TYPE "public"."SettingsCategory" AS ENUM ('GENERAL', 'PAYMENT', 'EMAIL', 'SMS', 'NOTIFICATION', 'SEO', 'ANALYTICS', 'SECURITY', 'API', 'FEATURE_FLAGS');

-- CreateTable
CREATE TABLE "public"."car_rentals" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "shortDescription" TEXT,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "category" "public"."CarCategory" NOT NULL,
    "transmission" "public"."TransmissionType" NOT NULL DEFAULT 'AUTOMATIC',
    "fuelType" "public"."FuelType" NOT NULL DEFAULT 'GASOLINE',
    "seats" INTEGER NOT NULL,
    "doors" INTEGER NOT NULL,
    "luggage" INTEGER NOT NULL,
    "features" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "airConditioning" BOOLEAN NOT NULL DEFAULT true,
    "gps" BOOLEAN NOT NULL DEFAULT false,
    "bluetooth" BOOLEAN NOT NULL DEFAULT false,
    "usbCharger" BOOLEAN NOT NULL DEFAULT false,
    "pricePerDay" DECIMAL(65,30) NOT NULL,
    "pricePerWeek" DECIMAL(65,30),
    "pricePerMonth" DECIMAL(65,30),
    "currency" TEXT NOT NULL DEFAULT 'TRY',
    "deposit" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "insuranceIncluded" BOOLEAN NOT NULL DEFAULT true,
    "insuranceType" TEXT,
    "pickupLocations" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "allowDifferentDropoff" BOOLEAN NOT NULL DEFAULT true,
    "availableCount" INTEGER NOT NULL DEFAULT 1,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "mainImage" TEXT NOT NULL,
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "minimumAge" INTEGER NOT NULL DEFAULT 21,
    "drivingLicenseYears" INTEGER NOT NULL DEFAULT 1,
    "requiredDocuments" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "unlimitedMileage" BOOLEAN NOT NULL DEFAULT true,
    "mileageLimit" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "rating" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "keywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "car_rentals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."car_rental_bookings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "carId" TEXT NOT NULL,
    "bookingRef" TEXT NOT NULL,
    "pickupLocation" TEXT NOT NULL,
    "dropoffLocation" TEXT NOT NULL,
    "pickupDate" TIMESTAMP(3) NOT NULL,
    "pickupTime" TEXT NOT NULL,
    "dropoffDate" TIMESTAMP(3) NOT NULL,
    "dropoffTime" TEXT NOT NULL,
    "dailyRate" DECIMAL(65,30) NOT NULL,
    "numberOfDays" INTEGER NOT NULL,
    "subtotal" DECIMAL(65,30) NOT NULL,
    "tax" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "deposit" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "totalPrice" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'TRY',
    "gpsRequested" BOOLEAN NOT NULL DEFAULT false,
    "childSeatRequested" BOOLEAN NOT NULL DEFAULT false,
    "additionalDriver" BOOLEAN NOT NULL DEFAULT false,
    "extrasTotal" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "driverName" TEXT NOT NULL,
    "driverLicense" TEXT NOT NULL,
    "driverPhone" TEXT NOT NULL,
    "driverEmail" TEXT NOT NULL,
    "status" "public"."BookingStatus" NOT NULL DEFAULT 'PENDING',
    "paymentStatus" "public"."PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paymentMethod" "public"."PaymentMethod",
    "paymentIntentId" TEXT,
    "specialRequests" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "car_rental_bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."rental_properties" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "shortDescription" TEXT,
    "type" "public"."PropertyType" NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "coordinates" JSONB,
    "guests" INTEGER NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "beds" INTEGER NOT NULL,
    "squareMeters" DOUBLE PRECISION,
    "basePrice" DECIMAL(65,30) NOT NULL,
    "weeklyDiscount" DECIMAL(65,30),
    "monthlyDiscount" DECIMAL(65,30),
    "currency" TEXT NOT NULL DEFAULT 'TRY',
    "cleaningFee" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "securityDeposit" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "wifi" BOOLEAN NOT NULL DEFAULT false,
    "kitchen" BOOLEAN NOT NULL DEFAULT false,
    "parking" BOOLEAN NOT NULL DEFAULT false,
    "pool" BOOLEAN NOT NULL DEFAULT false,
    "airConditioning" BOOLEAN NOT NULL DEFAULT false,
    "heating" BOOLEAN NOT NULL DEFAULT false,
    "tv" BOOLEAN NOT NULL DEFAULT false,
    "washer" BOOLEAN NOT NULL DEFAULT false,
    "beachfront" BOOLEAN NOT NULL DEFAULT false,
    "seaview" BOOLEAN NOT NULL DEFAULT false,
    "balcony" BOOLEAN NOT NULL DEFAULT false,
    "smokingAllowed" BOOLEAN NOT NULL DEFAULT false,
    "petsAllowed" BOOLEAN NOT NULL DEFAULT false,
    "partiesAllowed" BOOLEAN NOT NULL DEFAULT false,
    "childrenAllowed" BOOLEAN NOT NULL DEFAULT true,
    "instantBook" BOOLEAN NOT NULL DEFAULT false,
    "minimumStay" INTEGER NOT NULL DEFAULT 1,
    "maximumStay" INTEGER,
    "checkInTime" TEXT NOT NULL DEFAULT '15:00',
    "checkOutTime" TEXT NOT NULL DEFAULT '11:00',
    "mainImage" TEXT NOT NULL,
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "virtualTourUrl" TEXT,
    "hostName" TEXT NOT NULL,
    "hostSuperhost" BOOLEAN NOT NULL DEFAULT false,
    "hostResponseTime" TEXT,
    "hostLanguages" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "overall" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "cleanliness" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "accuracy" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "checkIn" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "communication" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "location" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "value" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "airbnbPrice" DECIMAL(65,30),
    "bookingPrice" DECIMAL(65,30),
    "agodaPrice" DECIMAL(65,30),
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "keywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rental_properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."rental_property_bookings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "bookingRef" TEXT NOT NULL,
    "checkIn" TIMESTAMP(3) NOT NULL,
    "checkOut" TIMESTAMP(3) NOT NULL,
    "numberOfNights" INTEGER NOT NULL,
    "numberOfGuests" INTEGER NOT NULL,
    "nightlyRate" DECIMAL(65,30) NOT NULL,
    "subtotal" DECIMAL(65,30) NOT NULL,
    "cleaningFee" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "serviceFee" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "tax" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "totalPrice" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'TRY',
    "guestName" TEXT NOT NULL,
    "guestPhone" TEXT NOT NULL,
    "guestEmail" TEXT NOT NULL,
    "status" "public"."BookingStatus" NOT NULL DEFAULT 'PENDING',
    "paymentStatus" "public"."PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paymentMethod" "public"."PaymentMethod",
    "paymentIntentId" TEXT,
    "specialRequests" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rental_property_bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."system_settings" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "description" TEXT,
    "category" "public"."SettingsCategory" NOT NULL DEFAULT 'GENERAL',
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "system_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "car_rentals_slug_key" ON "public"."car_rentals"("slug");

-- CreateIndex
CREATE INDEX "car_rentals_category_idx" ON "public"."car_rentals"("category");

-- CreateIndex
CREATE INDEX "car_rentals_brand_idx" ON "public"."car_rentals"("brand");

-- CreateIndex
CREATE INDEX "car_rentals_isActive_idx" ON "public"."car_rentals"("isActive");

-- CreateIndex
CREATE INDEX "car_rentals_isFeatured_idx" ON "public"."car_rentals"("isFeatured");

-- CreateIndex
CREATE UNIQUE INDEX "car_rental_bookings_bookingRef_key" ON "public"."car_rental_bookings"("bookingRef");

-- CreateIndex
CREATE INDEX "car_rental_bookings_userId_idx" ON "public"."car_rental_bookings"("userId");

-- CreateIndex
CREATE INDEX "car_rental_bookings_carId_idx" ON "public"."car_rental_bookings"("carId");

-- CreateIndex
CREATE INDEX "car_rental_bookings_pickupDate_idx" ON "public"."car_rental_bookings"("pickupDate");

-- CreateIndex
CREATE INDEX "car_rental_bookings_status_idx" ON "public"."car_rental_bookings"("status");

-- CreateIndex
CREATE UNIQUE INDEX "rental_properties_slug_key" ON "public"."rental_properties"("slug");

-- CreateIndex
CREATE INDEX "rental_properties_type_idx" ON "public"."rental_properties"("type");

-- CreateIndex
CREATE INDEX "rental_properties_city_idx" ON "public"."rental_properties"("city");

-- CreateIndex
CREATE INDEX "rental_properties_isActive_idx" ON "public"."rental_properties"("isActive");

-- CreateIndex
CREATE INDEX "rental_properties_isFeatured_idx" ON "public"."rental_properties"("isFeatured");

-- CreateIndex
CREATE UNIQUE INDEX "rental_property_bookings_bookingRef_key" ON "public"."rental_property_bookings"("bookingRef");

-- CreateIndex
CREATE INDEX "rental_property_bookings_userId_idx" ON "public"."rental_property_bookings"("userId");

-- CreateIndex
CREATE INDEX "rental_property_bookings_propertyId_idx" ON "public"."rental_property_bookings"("propertyId");

-- CreateIndex
CREATE INDEX "rental_property_bookings_checkIn_idx" ON "public"."rental_property_bookings"("checkIn");

-- CreateIndex
CREATE INDEX "rental_property_bookings_status_idx" ON "public"."rental_property_bookings"("status");

-- CreateIndex
CREATE UNIQUE INDEX "system_settings_key_key" ON "public"."system_settings"("key");

-- CreateIndex
CREATE INDEX "system_settings_category_idx" ON "public"."system_settings"("category");

-- AddForeignKey
ALTER TABLE "public"."car_rental_bookings" ADD CONSTRAINT "car_rental_bookings_carId_fkey" FOREIGN KEY ("carId") REFERENCES "public"."car_rentals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."rental_property_bookings" ADD CONSTRAINT "rental_property_bookings_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."rental_properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
