-- CreateEnum
CREATE TYPE "public"."AirportType" AS ENUM ('INTERNATIONAL', 'DOMESTIC', 'REGIONAL');

-- CreateTable
CREATE TABLE "public"."airports" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "icaoCode" TEXT,
    "name" TEXT NOT NULL,
    "nameLocal" TEXT,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "continent" TEXT NOT NULL,
    "timezone" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "elevation" INTEGER,
    "airportType" "public"."AirportType" NOT NULL DEFAULT 'INTERNATIONAL',
    "terminals" INTEGER NOT NULL DEFAULT 1,
    "runways" INTEGER NOT NULL DEFAULT 1,
    "hasCustoms" BOOLEAN NOT NULL DEFAULT true,
    "hasWifi" BOOLEAN NOT NULL DEFAULT true,
    "hasLounge" BOOLEAN NOT NULL DEFAULT false,
    "distanceToCity" DOUBLE PRECISION,
    "avgTransferTime" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isHub" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "airports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "airports_code_key" ON "public"."airports"("code");

-- CreateIndex
CREATE INDEX "airports_code_idx" ON "public"."airports"("code");

-- CreateIndex
CREATE INDEX "airports_country_idx" ON "public"."airports"("country");

-- CreateIndex
CREATE INDEX "airports_city_idx" ON "public"."airports"("city");
