-- CreateEnum
CREATE TYPE "public"."FlightType" AS ENUM ('DOMESTIC', 'INTERNATIONAL');

-- CreateEnum
CREATE TYPE "public"."CabinClass" AS ENUM ('ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST_CLASS');

-- CreateTable
CREATE TABLE "public"."flights" (
    "id" TEXT NOT NULL,
    "flightNumber" TEXT NOT NULL,
    "airline" TEXT NOT NULL,
    "airlineCode" TEXT NOT NULL,
    "airlineLogo" TEXT,
    "departureAirport" TEXT NOT NULL,
    "departureCity" TEXT NOT NULL,
    "departureCountry" TEXT NOT NULL DEFAULT 'Turkey',
    "departureTime" TIMESTAMP(3) NOT NULL,
    "departureTerminal" TEXT,
    "arrivalAirport" TEXT NOT NULL,
    "arrivalCity" TEXT NOT NULL,
    "arrivalCountry" TEXT NOT NULL,
    "arrivalTime" TIMESTAMP(3) NOT NULL,
    "arrivalTerminal" TEXT,
    "duration" INTEGER NOT NULL,
    "distance" DOUBLE PRECISION,
    "aircraft" TEXT,
    "flightType" "public"."FlightType" NOT NULL,
    "cabinClass" "public"."CabinClass" NOT NULL,
    "stops" INTEGER NOT NULL DEFAULT 0,
    "stopAirports" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "priceAdult" DECIMAL(65,30) NOT NULL,
    "priceChild" DECIMAL(65,30) NOT NULL,
    "priceInfant" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'TRY',
    "taxIncluded" BOOLEAN NOT NULL DEFAULT true,
    "carryOnBaggage" TEXT,
    "checkedBaggage" TEXT,
    "extraBaggagePrice" DECIMAL(65,30),
    "availableSeats" INTEGER NOT NULL,
    "mealService" BOOLEAN NOT NULL DEFAULT false,
    "wifiAvailable" BOOLEAN NOT NULL DEFAULT false,
    "entertainmentSystem" BOOLEAN NOT NULL DEFAULT false,
    "powerOutlets" BOOLEAN NOT NULL DEFAULT false,
    "isRefundable" BOOLEAN NOT NULL DEFAULT false,
    "cancellationFee" DECIMAL(65,30),
    "changeFee" DECIMAL(65,30),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "operatingDays" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "flights_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "flights_departureAirport_arrivalAirport_idx" ON "public"."flights"("departureAirport", "arrivalAirport");

-- CreateIndex
CREATE INDEX "flights_departureTime_idx" ON "public"."flights"("departureTime");

-- CreateIndex
CREATE INDEX "flights_airline_idx" ON "public"."flights"("airline");

-- CreateIndex
CREATE INDEX "flights_flightType_idx" ON "public"."flights"("flightType");

-- CreateIndex
CREATE INDEX "flights_isActive_idx" ON "public"."flights"("isActive");
