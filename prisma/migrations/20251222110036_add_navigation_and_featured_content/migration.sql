/*
  Warnings:

  - You are about to drop the column `voteType` on the `trip_votes` table. All the data in the column will be lost.
  - Added the required column `value` to the `trip_votes` table without a default value. This is not possible if the table is not empty.
  - Made the column `activityId` on table `trip_votes` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "public"."MenuType" AS ENUM ('HEADER', 'FOOTER', 'SIDEBAR', 'MOBILE');

-- CreateEnum
CREATE TYPE "public"."ContentType" AS ENUM ('DESTINATION', 'EXPERIENCE', 'PROMOTION', 'ANNOUNCEMENT', 'BANNER');

-- AlterTable
ALTER TABLE "public"."trip_votes" DROP COLUMN "voteType",
ADD COLUMN     "value" INTEGER NOT NULL,
ALTER COLUMN "activityId" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."trips" ADD COLUMN     "collaborationData" JSONB,
ADD COLUMN     "isCollaborative" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "shareCode" TEXT;

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "profileAnalyzedAt" TIMESTAMP(3),
ADD COLUMN     "travelProfile" JSONB;

-- CreateTable
CREATE TABLE "public"."navigation_menus" (
    "id" TEXT NOT NULL,
    "type" "public"."MenuType" NOT NULL DEFAULT 'HEADER',
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "icon" TEXT,
    "description" TEXT,
    "badge" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "parentId" TEXT,
    "translations" JSONB,
    "requiredRole" TEXT,
    "permissions" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "metadata" JSONB,
    "openInNewTab" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "navigation_menus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."featured_content" (
    "id" TEXT NOT NULL,
    "type" "public"."ContentType" NOT NULL DEFAULT 'DESTINATION',
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT NOT NULL,
    "link" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "metadata" JSONB,
    "translations" JSONB,
    "displayFrom" TIMESTAMP(3),
    "displayUntil" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "featured_content_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "navigation_menus_slug_key" ON "public"."navigation_menus"("slug");

-- CreateIndex
CREATE INDEX "navigation_menus_type_order_idx" ON "public"."navigation_menus"("type", "order");

-- CreateIndex
CREATE INDEX "navigation_menus_isActive_idx" ON "public"."navigation_menus"("isActive");

-- CreateIndex
CREATE INDEX "navigation_menus_slug_idx" ON "public"."navigation_menus"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "featured_content_slug_key" ON "public"."featured_content"("slug");

-- CreateIndex
CREATE INDEX "featured_content_type_order_idx" ON "public"."featured_content"("type", "order");

-- CreateIndex
CREATE INDEX "featured_content_isActive_idx" ON "public"."featured_content"("isActive");

-- CreateIndex
CREATE INDEX "trips_shareCode_idx" ON "public"."trips"("shareCode");

-- CreateIndex
CREATE INDEX "trips_isCollaborative_idx" ON "public"."trips"("isCollaborative");

-- AddForeignKey
ALTER TABLE "public"."trip_votes" ADD CONSTRAINT "trip_votes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."navigation_menus" ADD CONSTRAINT "navigation_menus_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."navigation_menus"("id") ON DELETE CASCADE ON UPDATE CASCADE;
