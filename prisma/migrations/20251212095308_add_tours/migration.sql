-- CreateEnum
CREATE TYPE "public"."TourCategory" AS ENUM ('CULTURAL', 'ADVENTURE', 'NATURE', 'BEACH', 'CITY_TOUR', 'FOOD_WINE', 'HISTORICAL', 'WATER_SPORTS', 'DIVING', 'SAFARI', 'BALLOON', 'PARAGLIDING', 'BOAT_TOUR', 'DAY_TRIP', 'MULTI_DAY');

-- CreateEnum
CREATE TYPE "public"."DifficultyLevel" AS ENUM ('EASY', 'MODERATE', 'CHALLENGING', 'DIFFICULT', 'EXTREME');

-- CreateTable
CREATE TABLE "public"."tour_packages" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "shortDescription" TEXT,
    "category" "public"."TourCategory" NOT NULL,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "destination" TEXT NOT NULL,
    "destinations" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "region" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'Turkey',
    "duration" INTEGER NOT NULL,
    "nights" INTEGER NOT NULL,
    "minGroupSize" INTEGER NOT NULL DEFAULT 1,
    "maxGroupSize" INTEGER NOT NULL,
    "priceAdult" DECIMAL(65,30) NOT NULL,
    "priceChild" DECIMAL(65,30) NOT NULL,
    "priceInfant" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'TRY',
    "includes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "excludes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "itinerary" JSONB NOT NULL,
    "availableDays" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "startDates" TIMESTAMP(3)[] DEFAULT ARRAY[]::TIMESTAMP(3)[],
    "mainImage" TEXT NOT NULL,
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "videoUrl" TEXT,
    "difficultyLevel" "public"."DifficultyLevel" NOT NULL DEFAULT 'EASY',
    "physicalRating" INTEGER NOT NULL DEFAULT 1,
    "minimumAge" INTEGER,
    "requiredDocs" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "mealsIncluded" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "transportType" TEXT,
    "pickupIncluded" BOOLEAN NOT NULL DEFAULT false,
    "pickupLocations" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "guideLanguages" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "guideIncluded" BOOLEAN NOT NULL DEFAULT true,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "rating" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "keywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "cancellationPolicy" TEXT,
    "refundable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tour_packages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tour_packages_slug_key" ON "public"."tour_packages"("slug");

-- CreateIndex
CREATE INDEX "tour_packages_category_idx" ON "public"."tour_packages"("category");

-- CreateIndex
CREATE INDEX "tour_packages_destination_idx" ON "public"."tour_packages"("destination");

-- CreateIndex
CREATE INDEX "tour_packages_region_idx" ON "public"."tour_packages"("region");

-- CreateIndex
CREATE INDEX "tour_packages_isActive_idx" ON "public"."tour_packages"("isActive");

-- CreateIndex
CREATE INDEX "tour_packages_isFeatured_idx" ON "public"."tour_packages"("isFeatured");

-- CreateIndex
CREATE INDEX "tour_packages_rating_idx" ON "public"."tour_packages"("rating");
