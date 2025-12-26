# ML-Based Price Tracking & Alert System

Complete implementation of an intelligent price tracking and alert system for travel.lydian.com

## Features Implemented

### 1. Database Schema (Prisma)
- **PriceHistory**: Stores historical price data for hotels, flights, and tours
- **PriceAlert**: Manages user price alerts with customizable thresholds
- **NotificationType**: Added PRICE_DROP and PRICE_ALERT notification types
- **PriceAlertStatus**: Enum for alert states (ACTIVE, TRIGGERED, EXPIRED, DISABLED)

### 2. API Endpoints

#### POST `/api/prices/track`
Start tracking a price for a hotel, flight, or tour.

**Request Body:**
```json
{
  "entityType": "HOTEL",
  "entityId": "hotel-123",
  "entityName": "Luxury Resort Istanbul",
  "targetPrice": 150.00,
  "currentPrice": 180.00,
  "currency": "TRY",
  "priceDropPercentage": 10,
  "expiresAt": "2024-12-31T00:00:00Z",
  "notificationMethod": ["EMAIL"],
  "metadata": {
    "checkInDate": "2024-06-15",
    "checkOutDate": "2024-06-20",
    "roomType": "Deluxe"
  }
}
```

**Response:**
```json
{
  "success": true,
  "alert": { /* PriceAlert object */ },
  "message": "Price tracking started successfully"
}
```

#### GET `/api/prices/history`
Get price history for an entity.

**Query Parameters:**
- `entityType`: HOTEL | FLIGHT | TOUR
- `entityId`: Entity identifier
- `days`: Number of days (default: 30)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "price": 180.00,
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ],
  "stats": {
    "count": 30,
    "min": 150.00,
    "max": 200.00,
    "avg": "175.50",
    "current": 180.00,
    "trend": "decreasing",
    "priceDiffPercentage": "-5.50",
    "bestTimeToBook": {
      "date": "2024-01-10T10:00:00Z",
      "price": 150.00
    }
  }
}
```

#### POST `/api/prices/predict`
Get ML-based price predictions for the next 7 days.

**Request Body:**
```json
{
  "entityType": "HOTEL",
  "entityId": "hotel-123",
  "daysAhead": 7
}
```

**Response:**
```json
{
  "success": true,
  "predictions": [
    {
      "date": "2024-01-16T00:00:00Z",
      "price": 175.50,
      "confidence": 90
    }
  ],
  "confidence": 85,
  "bestDayToBuy": {
    "day": 3,
    "date": "2024-01-18T00:00:00Z",
    "price": 165.00,
    "savings": 15.00
  },
  "currentPrice": 180.00,
  "stats": {
    "historicalDataPoints": 30,
    "meanPrice": "175.50",
    "priceVolatility": "low"
  }
}
```

#### GET `/api/prices/alerts`
Get user's price alerts.

**Query Parameters:**
- `status`: ACTIVE | TRIGGERED | EXPIRED | DISABLED (optional)
- `entityType`: HOTEL | FLIGHT | TOUR (optional)

**Response:**
```json
{
  "success": true,
  "alerts": [/* Array of PriceAlert objects */],
  "count": 5
}
```

#### PATCH `/api/prices/alerts`
Update alert status.

**Request Body:**
```json
{
  "alertId": "alert-123",
  "status": "DISABLED"
}
```

#### DELETE `/api/prices/alerts`
Delete a price alert.

**Query Parameters:**
- `alertId`: Alert ID to delete

### 3. ML Prediction Service

**Location:** `/src/lib/services/ml-price-predictor.ts`

**Features:**
- Time-series price prediction using moving averages and trend analysis
- Seasonal pattern detection (day of week analysis)
- Advanced LSTM model option (TensorFlow.js)
- Confidence scoring based on data variance
- Price pattern analysis with recommendations

**Functions:**
```typescript
// Simple prediction (fast)
predictPrices(historicalData, daysAhead): Promise<Prediction[]>

// Advanced LSTM prediction (slower, more accurate)
predictPricesLSTM(historicalData, daysAhead): Promise<Prediction[]>

// Pattern analysis
analyzePricePatterns(historicalData): {
  trend, volatility, bestDayOfWeek, worstDayOfWeek, recommendation
}
```

### 4. Email Notification Service

**Location:** `/src/lib/services/price-alert-notification.ts`

**Features:**
- Automated email notifications on price drops
- Beautiful HTML email templates
- Spam prevention (minimum 6 hours between notifications)
- Notification history tracking
- Auto-cleanup of expired alerts

**Environment Variables Required:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@lydian.com
NEXT_PUBLIC_APP_URL=https://travel.lydian.com
```

**Functions:**
```typescript
// Check all alerts and send notifications
priceAlertNotificationService.checkAndNotify()

// Send test email
priceAlertNotificationService.sendTestEmail(email)
```

### 5. React Components

#### PriceChart Component
**Location:** `/src/components/pricing/PriceChart.tsx`

Interactive price history chart with ML predictions.

**Usage:**
```tsx
import PriceChart from '@/components/pricing/PriceChart';

<PriceChart
  entityType="HOTEL"
  entityId="hotel-123"
  days={30}
  showPredictions={true}
  height={400}
  currency="TRY"
/>
```

**Features:**
- 30-day price history visualization
- ML predictions overlay (dotted line)
- Min/Max price reference lines
- Best time to book highlighting
- Interactive tooltips with dates and prices
- Statistics cards (current, lowest, highest, average)
- AI prediction insights with confidence scores
- Responsive design with dark mode support

#### WatchPriceButton Component
**Location:** `/src/components/pricing/WatchPriceButton.tsx`

Button to track prices with customizable alert settings.

**Usage:**
```tsx
import WatchPriceButton from '@/components/pricing/WatchPriceButton';

<WatchPriceButton
  entityType="HOTEL"
  entityId="hotel-123"
  entityName="Luxury Resort Istanbul"
  currentPrice={180}
  currency="TRY"
  metadata={{
    checkInDate: "2024-06-15",
    checkOutDate: "2024-06-20"
  }}
  variant="default" // or "icon" or "compact"
  onSuccess={() => console.log('Alert created!')}
/>
```

**Features:**
- Three variants: default (full button), icon (icon only), compact (small button)
- Modal with customizable alert settings
- Target price input
- Price drop percentage threshold
- Alert duration selection
- Real-time watch status
- Session-based authentication check

#### PriceAlertsDashboard Component
**Location:** `/src/components/pricing/PriceAlertsDashboard.tsx`

Complete dashboard for managing price alerts.

**Usage:**
```tsx
import PriceAlertsDashboard from '@/components/pricing/PriceAlertsDashboard';

<PriceAlertsDashboard />
```

**Features:**
- Filter alerts by status (ALL, ACTIVE, TRIGGERED, EXPIRED)
- View all active alerts with statistics
- Enable/disable alerts
- Delete alerts
- See notification history
- Potential savings calculator
- Expiration tracking
- Responsive grid layout

### 6. Cron Job Setup

**Location:** `/src/pages/api/cron/check-price-alerts.ts`

Automated price checking endpoint.

#### Option 1: Vercel Cron Jobs

Create `vercel.json` in project root:
```json
{
  "crons": [{
    "path": "/api/cron/check-price-alerts",
    "schedule": "0 */6 * * *"
  }]
}
```

#### Option 2: External Cron Service

Use services like cron-job.org or EasyCron:
- URL: `https://travel.lydian.com/api/cron/check-price-alerts`
- Schedule: Every 6 hours
- Add header: `x-cron-secret: YOUR_SECRET`

**Environment Variable:**
```env
CRON_SECRET=your-secure-random-string
```

## Installation & Setup

### 1. Database Migration

```bash
# Generate Prisma client with new schema
npm run db:generate

# Push schema to database
npm run db:push

# Or create a migration
npx prisma migrate dev --name add_price_tracking
```

### 2. Environment Variables

Add to `.env`:
```env
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/lydian"

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@lydian.com

# App
NEXT_PUBLIC_APP_URL=https://travel.lydian.com

# Cron Security
CRON_SECRET=your-secure-random-string
```

### 3. Install Dependencies

Already included in package.json:
- `@tensorflow/tfjs` - ML predictions
- `recharts` - Price charts
- `nodemailer` - Email notifications
- `date-fns` - Date formatting

### 4. Test the System

```bash
# Start development server
npm run dev

# Test email service
curl -X POST http://localhost:3100/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Test price tracking
curl -X POST http://localhost:3100/api/prices/track \
  -H "Content-Type: application/json" \
  -d '{
    "entityType":"HOTEL",
    "entityId":"test-123",
    "entityName":"Test Hotel",
    "targetPrice":100,
    "currentPrice":120,
    "currency":"TRY"
  }'
```

## Integration Examples

### Hotel Listing Page

```tsx
import PriceChart from '@/components/pricing/PriceChart';
import WatchPriceButton from '@/components/pricing/WatchPriceButton';

export default function HotelDetailPage({ hotel }) {
  return (
    <div>
      <h1>{hotel.name}</h1>
      <div className="flex items-center gap-4">
        <p className="text-2xl font-bold">TRY {hotel.price}</p>
        <WatchPriceButton
          entityType="HOTEL"
          entityId={hotel.id}
          entityName={hotel.name}
          currentPrice={hotel.price}
          currency="TRY"
          metadata={{
            checkInDate: searchParams.checkIn,
            checkOutDate: searchParams.checkOut,
            roomType: hotel.roomType
          }}
          variant="compact"
        />
      </div>

      <div className="mt-8">
        <h2>Price History & Predictions</h2>
        <PriceChart
          entityType="HOTEL"
          entityId={hotel.id}
          days={30}
          showPredictions={true}
          currency="TRY"
        />
      </div>
    </div>
  );
}
```

### Flight Search Results

```tsx
import WatchPriceButton from '@/components/pricing/WatchPriceButton';

export default function FlightCard({ flight }) {
  return (
    <div className="flight-card">
      <div className="flight-info">
        <h3>{flight.airline} - {flight.flightNumber}</h3>
        <p>{flight.route}</p>
      </div>
      <div className="flight-price">
        <p className="price">TRY {flight.price}</p>
        <WatchPriceButton
          entityType="FLIGHT"
          entityId={flight.id}
          entityName={`${flight.airline} ${flight.route}`}
          currentPrice={flight.price}
          currency="TRY"
          metadata={{
            departureDate: flight.departureDate,
            returnDate: flight.returnDate,
            class: flight.class
          }}
          variant="icon"
        />
      </div>
    </div>
  );
}
```

### User Dashboard

```tsx
import PriceAlertsDashboard from '@/components/pricing/PriceAlertsDashboard';

export default function UserDashboard() {
  return (
    <div className="dashboard">
      <h1>My Dashboard</h1>

      <section>
        <PriceAlertsDashboard />
      </section>
    </div>
  );
}
```

## Price Data Collection

To populate price history, integrate with your existing search/booking APIs:

```typescript
// Example: After fetching hotel prices
import { prisma } from '@/lib/prisma';

async function saveHotelPrice(hotelId: string, price: number, metadata: any) {
  await prisma.priceHistory.create({
    data: {
      entityType: 'HOTEL',
      entityId: hotelId,
      price: price,
      currency: 'TRY',
      metadata: metadata,
      source: 'BOOKING_API',
      checkInDate: metadata.checkInDate,
      checkOutDate: metadata.checkOutDate,
    },
  });
}

// Call this whenever you fetch prices from external APIs
```

## ML Model Training (Optional)

For better predictions with the LSTM model:

1. Collect at least 30 days of price data
2. Use the `predictPricesLSTM` function instead of `predictPrices`
3. The model auto-trains on historical data (may take 5-10 seconds)

```typescript
import { predictPricesLSTM } from '@/lib/services/ml-price-predictor';

// In your API endpoint
const predictions = await predictPricesLSTM(historicalPrices, 7);
```

## Performance Optimization

### Caching

Add Redis caching for frequently accessed data:

```typescript
// Example with node-cache
import NodeCache from 'node-cache';
const priceCache = new NodeCache({ stdTTL: 3600 }); // 1 hour

// In API endpoint
const cacheKey = `price-history-${entityType}-${entityId}`;
let data = priceCache.get(cacheKey);

if (!data) {
  data = await prisma.priceHistory.findMany({ /* ... */ });
  priceCache.set(cacheKey, data);
}
```

### Background Jobs

For production, use a job queue (Bull, BullMQ) instead of cron:

```typescript
import { Queue } from 'bullmq';

const priceCheckQueue = new Queue('price-check');

// Add job
await priceCheckQueue.add('check-alerts', {}, {
  repeat: { cron: '0 */6 * * *' }
});
```

## Monitoring & Analytics

Track important metrics:

```typescript
// Add to your analytics service
analytics.track('price_alert_created', {
  entityType,
  targetPrice,
  currentPrice,
  discount: ((currentPrice - targetPrice) / currentPrice * 100)
});

analytics.track('price_drop_notification_sent', {
  alertId,
  priceDropPercentage,
  notificationMethod
});
```

## Troubleshooting

### Email not sending
- Check SMTP credentials in .env
- For Gmail, use App Password (not regular password)
- Enable "Less secure app access" or use OAuth2

### Predictions not showing
- Ensure at least 7 days of price history exists
- Check browser console for errors
- Verify TensorFlow.js is loaded

### Cron job not running
- Test manually: `curl https://your-app.com/api/cron/check-price-alerts`
- Check Vercel cron logs
- Verify CRON_SECRET matches

## Security Best Practices

1. Always validate user input
2. Rate limit API endpoints
3. Use CRON_SECRET for cron endpoints
4. Sanitize email content
5. Implement CSRF protection
6. Add request authentication

## Future Enhancements

- [ ] Push notifications (Web Push API)
- [ ] SMS notifications (Twilio integration)
- [ ] Price comparison across multiple sources
- [ ] AI-powered booking recommendations
- [ ] Historical price trends analysis
- [ ] Price freeze feature (book at current price)
- [ ] Group alerts (multiple destinations)
- [ ] Dynamic pricing alerts (adjust based on demand)

## Support

For issues or questions:
- Check logs in `/var/log/price-alerts.log`
- Review API responses for error details
- Test individual components in isolation
- Verify database schema is up to date

## License

Part of travel.lydian.com - All rights reserved
