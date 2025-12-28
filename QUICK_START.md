# Travel Ailydian - Quick Start Guide

Quick reference for common database operations and commands.

## Essential Commands

### Database Operations
```bash
# Generate Prisma Client
npx prisma generate

# Push schema changes to database
npx prisma db push

# Seed database with test data
npx prisma db seed

# Open Prisma Studio (visual database browser)
npx prisma studio

# Create migration
npx prisma migrate dev --name your_migration_name
```

### Test Accounts

**Admin Account**:
- Email: `admin@ailydian.com`
- Password: `Admin123!`

**Test Users**:
- Email: `ayse@example.com`, `mehmet@example.com`, `zeynep@example.com`
- Password: `User123!`

**Partner Account**:
- Email: `partner@example.com`
- Password: `Partner123!`

## Database Connection

### Local PostgreSQL
```env
DATABASE_URL="postgresql://sardag@localhost:5432/travel_ailydian_dev"
```

### Supabase (Cloud)
```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:6543/postgres?pgbouncer=true"
```

## Common Queries

### Using Prisma Client
```typescript
import { prisma } from '@/lib/database/client';

// Get all active hotels
const hotels = await prisma.hotel.findMany({
  where: { isActive: true },
  orderBy: { rating: 'desc' },
  take: 10,
});

// Get user with relationships
const user = await prisma.user.findUnique({
  where: { email: 'admin@ailydian.com' },
  include: {
    milesAccount: true,
    bookings: true,
  },
});

// Create new booking
const booking = await prisma.booking.create({
  data: {
    userId: user.id,
    bookingType: 'HOTEL',
    totalAmount: 2500,
    currency: 'TRY',
    // ... more fields
  },
});
```

### Using Query Helpers
```typescript
import { paginatedQuery } from '@/lib/database/queries';

// Paginated hotel search
const { data, pagination } = await paginatedQuery(
  'hotel',
  {
    where: { city: 'Istanbul', isActive: true },
    orderBy: { rating: 'desc' },
  },
  { page: 1, limit: 20 }
);
```

## Database Stats

- **Total Tables**: 48
- **Seed Users**: 5
- **Seed Hotels**: 32
- **Seed Cars**: 18
- **Seed Tours**: 3
- **SEO Pages**: 3

## Useful Links

- [Full Setup Guide](./DATABASE_SETUP.md)
- [Integration Report](./DATABASE_INTEGRATION_REPORT.md)
- [Prisma Schema](./prisma/schema.prisma)
- [Seed Script](./prisma/seed.ts)

## Troubleshooting

### Can't connect to database
```bash
# Check if PostgreSQL is running
brew services list | grep postgresql

# Test connection
psql -d travel_ailydian_dev -c "SELECT version();"
```

### Prisma Client not generated
```bash
npx prisma generate
```

### Schema out of sync
```bash
npx prisma db push
```

### Need fresh data
```bash
npx prisma migrate reset  # ⚠️ Deletes all data
npx prisma db seed
```

## File Locations

- **Prisma Schema**: `/prisma/schema.prisma`
- **Migrations**: `/prisma/migrations/`
- **Seed File**: `/prisma/seed.ts`
- **Database Client**: `/src/lib/database/client.ts`
- **Query Helpers**: `/src/lib/database/queries.ts`

---

**Status**: ✅ Ready for Development
**Last Updated**: December 28, 2024
