# Travel Ailydian - Database Setup Guide

Complete guide for setting up, managing, and troubleshooting the database for the Travel Ailydian platform.

## Table of Contents

- [Overview](#overview)
- [Database Schema](#database-schema)
- [Quick Start](#quick-start)
- [Detailed Setup Instructions](#detailed-setup-instructions)
- [Environment Configuration](#environment-configuration)
- [Database Migrations](#database-migrations)
- [Seeding Data](#seeding-data)
- [Common Operations](#common-operations)
- [Troubleshooting](#troubleshooting)
- [Production Deployment](#production-deployment)

---

## Overview

**Database**: PostgreSQL 14+
**ORM**: Prisma 6.19.1
**Total Models**: 48 models
**Connection**: Local PostgreSQL or Supabase

### Key Features

- 50+ database models covering all platform features
- Prisma ORM with TypeScript support
- Comprehensive seed data for testing
- Transaction support with retry logic
- Full-text search capabilities
- Automated migrations

---

## Database Schema

### Core Models (48 Total)

#### Authentication & Users
- `User` - User accounts and profiles
- `Account` - OAuth provider accounts (NextAuth)
- `Session` - User sessions
- `VerificationToken` - Email verification tokens
- `Admin` - Admin user accounts

#### Travel Services
- `Hotel` - Hotel listings (48+ models with rooms, amenities)
- `HotelRoom` - Room types and pricing
- `Flight` - Flight schedules and pricing
- `TourPackage` - Tour packages and itineraries
- `CarRental` - Rental car inventory
- `CarRentalBooking` - Car rental reservations
- `AirportTransfer` - Airport transfer services
- `TransferVehicle` - Transfer vehicle types
- `TransferBooking` - Transfer reservations
- `RentalProperty` - Vacation rental properties
- `RentalPropertyBooking` - Property bookings

#### Bookings & Transactions
- `Booking` - General booking records
- `Review` - User reviews for all services
- `Favorite` - User saved favorites
- `WalletTransaction` - Payment transactions
- `PriceHistory` - Price tracking over time
- `PriceAlert` - User price alerts

#### Trip Planning
- `Trip` - User trip plans
- `TripItinerary` - Daily trip schedules
- `TripCollaborator` - Collaborative trip planning
- `TripActivity` - Activities in trips
- `TripComment` - Trip comments
- `TripVote` - Voting on trip activities

#### Loyalty Program
- `AilydianMilesAccount` - Miles account balances
- `MilesTransaction` - Miles earning/spending history

#### Partner System
- `PartnerProfile` - Partner business profiles
- `PartnerListing` - Partner listings
- `PartnerPayout` - Partner payment records

#### Content & SEO
- `NavigationMenu` - Dynamic navigation menus
- `FeaturedContent` - Homepage featured items
- `SEOLandingPage` - Auto-generated SEO pages
- `VirtualTour` - 360° virtual tours
- `VirtualTourScene` - Tour scenes
- `VirtualTourHotspot` - Interactive hotspots
- `VideoReview` - Video reviews
- `VideoLike` - Video review likes

#### Communication
- `WhatsAppConversation` - WhatsApp chat threads
- `WhatsAppMessage` - WhatsApp messages
- `Notification` - User notifications

#### System
- `SystemSettings` - Platform configuration
- `AIPreference` - AI-based user preferences
- `Airport` - Global airport database

---

## Quick Start

### Prerequisites

```bash
# Install PostgreSQL (macOS)
brew install postgresql@14
brew services start postgresql@14

# Or use Docker
docker run --name travel-postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:14

# Verify installation
psql --version
```

### Setup Steps

```bash
# 1. Navigate to project
cd /Users/sardag/Desktop/projeler/travel.ailydian.com

# 2. Install dependencies
npm install

# 3. Create local database
createdb travel_ailydian_dev

# 4. Generate Prisma Client
npx prisma generate

# 5. Push schema to database
npx prisma db push

# 6. Seed database with test data
npx prisma db seed

# 7. Open Prisma Studio (optional)
npx prisma studio
```

---

## Detailed Setup Instructions

### Option 1: Local PostgreSQL

#### Step 1: Install PostgreSQL

**macOS (Homebrew)**:
```bash
brew install postgresql@14
brew services start postgresql@14
```

**Ubuntu/Debian**:
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**Windows**:
Download from [postgresql.org/download/windows](https://www.postgresql.org/download/windows/)

#### Step 2: Create Database

```bash
# Create database
createdb travel_ailydian_dev

# Test connection
psql -d travel_ailydian_dev -c "SELECT version();"
```

#### Step 3: Configure Environment

Create/update `.env` file:

```env
DATABASE_URL="postgresql://USERNAME@localhost:5432/travel_ailydian_dev"
```

Replace `USERNAME` with your PostgreSQL username (usually your system username).

### Option 2: Supabase (Cloud)

#### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new account or sign in
3. Click "New Project"
4. Choose organization and set project name
5. Generate a strong password
6. Select region (closest to your users)
7. Click "Create new project"

#### Step 2: Get Connection String

1. Go to Project Settings > Database
2. Copy "Connection string" under "Connection pooling"
3. Replace `[YOUR-PASSWORD]` with your database password

#### Step 3: Configure Environment

Update `.env` file:

```env
# Supabase PostgreSQL Connection
DATABASE_URL="postgresql://postgres.xxxxxxxxxxxxx:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"

# For migrations, use direct connection
DIRECT_URL="postgresql://postgres.xxxxxxxxxxxxx:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:5432/postgres"
```

---

## Environment Configuration

### Required Variables

```env
# === DATABASE ===
DATABASE_URL="postgresql://user@localhost:5432/travel_ailydian_dev"

# === AUTHENTICATION ===
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3100"

# === APPLICATION ===
NODE_ENV="development"
NEXT_PUBLIC_SITE_URL="http://localhost:3100"
```

### Optional Variables

```env
# Redis (for caching)
REDIS_URL="redis://localhost:6379"

# File uploads
CLOUDINARY_CLOUD_NAME="your-cloudinary-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Payment
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLIC_KEY="pk_test_..."
```

---

## Database Migrations

### Create New Migration

```bash
# Create migration after schema changes
npx prisma migrate dev --name descriptive_migration_name

# Example
npx prisma migrate dev --name add_user_preferences
```

### Apply Migrations

```bash
# Development
npx prisma migrate dev

# Production
npx prisma migrate deploy
```

### Reset Database

```bash
# ⚠️ WARNING: This deletes all data!
npx prisma migrate reset
```

### Migration Status

```bash
# Check migration status
npx prisma migrate status
```

---

## Seeding Data

### Run Seed Script

```bash
# Seed database with test data
npx prisma db seed
```

### Seed Data Includes

- **4 Test Users**:
  - Admin: `admin@ailydian.com` / `Admin123!`
  - Users: `ayse@example.com`, `mehmet@example.com`, `zeynep@example.com` / `User123!`
  - Partner: `partner@example.com` / `Partner123!`

- **3 Hotels**: Istanbul and Antalya properties
- **3 Rental Cars**: Various categories
- **3 Tour Packages**: Historical, Adventure, Nature
- **4 Reviews**: Sample reviews for services
- **3 Miles Accounts**: Different loyalty tiers
- **3 SEO Landing Pages**: Istanbul, Antalya pages
- **1 Virtual Tour**: 360° hotel tour with 2 scenes

### Custom Seed

Edit `prisma/seed.ts` and add your data:

```typescript
// Example: Add more hotels
const hotels = [
  {
    name: 'Your Hotel Name',
    slug: 'your-hotel-slug',
    city: 'Istanbul',
    region: 'Taksim',
    // ... more fields
  },
];
```

---

## Common Operations

### Prisma Studio

Visual database browser:

```bash
npx prisma studio
```

Access at: [http://localhost:5555](http://localhost:5555)

### Generate Prisma Client

After schema changes:

```bash
npx prisma generate
```

### Format Schema

```bash
npx prisma format
```

### Validate Schema

```bash
npx prisma validate
```

### Database Pull

Introspect existing database:

```bash
npx prisma db pull
```

### Direct SQL Queries

```bash
# PostgreSQL CLI
psql -d travel_ailydian_dev

# Example queries
SELECT COUNT(*) FROM users;
SELECT * FROM hotels WHERE city = 'Istanbul';
SELECT * FROM bookings WHERE status = 'CONFIRMED';
```

---

## Troubleshooting

### Connection Issues

#### Error: "Can't reach database server"

**Solution 1**: Check PostgreSQL is running
```bash
# macOS
brew services list | grep postgresql

# Ubuntu/Debian
sudo systemctl status postgresql
```

**Solution 2**: Verify DATABASE_URL
```bash
# Test connection
psql $DATABASE_URL -c "SELECT 1"
```

**Solution 3**: Check PostgreSQL is listening
```bash
# Check PostgreSQL config
psql -c "SHOW listen_addresses;"

# Should return: *  or  localhost
```

#### Error: "password authentication failed"

**Solution**: Update `.env` with correct credentials
```env
DATABASE_URL="postgresql://correct_user:correct_password@localhost:5432/travel_ailydian_dev"
```

### Migration Issues

#### Error: "Database schema is not in sync"

**Solution**:
```bash
# Option 1: Push schema changes
npx prisma db push

# Option 2: Create new migration
npx prisma migrate dev
```

#### Error: "Unique constraint violation"

**Solution**: Clear duplicate data
```bash
# Reset database (⚠️ deletes all data)
npx prisma migrate reset

# Or manually fix duplicates
psql -d travel_ailydian_dev
DELETE FROM tablename WHERE id IN (
  SELECT id FROM (
    SELECT id, ROW_NUMBER() OVER(PARTITION BY unique_field ORDER BY id) AS row_num
    FROM tablename
  ) t WHERE t.row_num > 1
);
```

### Seed Issues

#### Error: "Prisma Client not generated"

**Solution**:
```bash
npx prisma generate
npx prisma db seed
```

#### Error: "TypeScript compilation failed"

**Solution**: Check seed.ts syntax
```bash
# Install ts-node if missing
npm install -D ts-node

# Run seed again
npx prisma db seed
```

### Performance Issues

#### Slow Queries

**Solution 1**: Add indexes
```prisma
model Hotel {
  city String

  @@index([city])
}
```

**Solution 2**: Use connection pooling

```env
DATABASE_URL="postgresql://user@localhost:5432/db?connection_limit=10"
```

**Solution 3**: Enable query logging
```typescript
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
```

---

## Production Deployment

### Pre-deployment Checklist

- [ ] Update `DATABASE_URL` to production database
- [ ] Run migrations: `npx prisma migrate deploy`
- [ ] Set `NODE_ENV=production`
- [ ] Configure connection pooling
- [ ] Set up database backups
- [ ] Enable SSL for database connections
- [ ] Configure monitoring and alerts

### Supabase Production

```env
# Production environment
NODE_ENV=production
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
```

### Database Backups

**Automated Backups** (Supabase):
- Daily automatic backups (free tier: 7 days retention)
- Manual snapshots available

**Manual Backup**:
```bash
# Backup database
pg_dump -h localhost -U username -d travel_ailydian_dev > backup.sql

# Restore database
psql -h localhost -U username -d travel_ailydian_dev < backup.sql
```

### Connection Pooling

**PgBouncer** (recommended for serverless):

```env
DATABASE_URL="postgresql://user:pass@host:6543/db?pgbouncer=true"
```

**Prisma Connection Limits**:

```typescript
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: process.env.NODE_ENV === 'production' ? ['error'] : ['query', 'error', 'warn'],
});
```

---

## Database Service Layer

### Import and Use

```typescript
import { prisma } from '@/lib/database/client';
import { paginatedQuery, transactionWithRetry } from '@/lib/database/queries';

// Basic query
const hotels = await prisma.hotel.findMany({
  where: { city: 'Istanbul', isActive: true },
  take: 10,
});

// Paginated query
const { data, pagination } = await paginatedQuery(
  'hotel',
  {
    where: { city: 'Istanbul' },
    orderBy: { rating: 'desc' },
  },
  { page: 1, limit: 20 }
);

// Transaction with retry
await transactionWithRetry(async (tx) => {
  const user = await tx.user.create({ data: userData });
  await tx.ailydianMilesAccount.create({
    data: { userId: user.id, currentBalance: 1000 },
  });
});
```

### Health Check API

```typescript
import { healthCheck } from '@/lib/database/client';

// pages/api/health.ts
export default async function handler(req, res) {
  const health = await healthCheck();
  res.status(health.status === 'healthy' ? 200 : 503).json(health);
}
```

---

## Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Database Guide](https://nextjs.org/docs/basic-features/data-fetching)

---

## Support

For issues or questions:

1. Check this documentation
2. Review Prisma logs: `npx prisma studio`
3. Check database logs: `psql -d travel_ailydian_dev`
4. Verify environment variables
5. Contact development team

---

**Last Updated**: December 28, 2024
**Prisma Version**: 6.19.1
**PostgreSQL Version**: 14.19
