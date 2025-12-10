# Price Tracking System - Usage Guide

## For Developers

### Adding Price Tracking to a Page

#### Step 1: Import Components
```tsx
import PriceChart from '@/components/pricing/PriceChart';
import WatchPriceButton from '@/components/pricing/WatchPriceButton';
```

#### Step 2: Add to Your Page
```tsx
export default function HotelPage({ hotel }) {
  return (
    <div>
      {/* Price and Watch Button */}
      <div className="flex items-center gap-4">
        <h2>TRY {hotel.price}</h2>
        <WatchPriceButton
          entityType="HOTEL"
          entityId={hotel.id}
          entityName={hotel.name}
          currentPrice={hotel.price}
          currency="TRY"
          metadata={{
            checkInDate: '2024-06-15',
            checkOutDate: '2024-06-20',
            roomType: 'Deluxe'
          }}
        />
      </div>

      {/* Price Chart */}
      <PriceChart
        entityType="HOTEL"
        entityId={hotel.id}
        days={30}
        showPredictions={true}
      />
    </div>
  );
}
```

### Collecting Price Data

#### Option 1: Manual Collection
```typescript
import { savePriceData } from '@/lib/services/price-data-collector';

await savePriceData({
  entityType: 'HOTEL',
  entityId: 'hotel-123',
  price: 1500,
  currency: 'TRY',
  source: 'BOOKING_API',
  metadata: { roomType: 'Deluxe' }
});
```

#### Option 2: Auto-Collection in Search APIs
```typescript
import { collectHotelPrices } from '@/lib/services/price-data-collector';

// In your hotel search API
export default async function handler(req, res) {
  const hotels = await searchHotels(req.query);

  // Collect prices (non-blocking)
  collectHotelPrices(hotels, req.query).catch(console.error);

  return res.json({ hotels });
}
```

### Using ML Predictions

```typescript
import { predictPrices } from '@/lib/services/ml-price-predictor';

// Fetch historical data
const priceHistory = await prisma.priceHistory.findMany({
  where: { entityType: 'HOTEL', entityId: 'hotel-123' }
});

// Format for ML
const historicalData = priceHistory.map(h => ({
  date: h.createdAt,
  price: parseFloat(h.price.toString()),
  dayOfWeek: h.createdAt.getDay(),
  dayOfMonth: h.createdAt.getDate(),
}));

// Get predictions
const predictions = await predictPrices(historicalData, 7);
// Returns: [{ date, price, confidence }, ...]
```

## For Users

### Setting Up Price Alerts

1. **Find a Hotel/Flight/Tour** you want to track
2. **Click "Watch Price"** button
3. **Set Your Alert**:
   - Enter target price OR
   - Set percentage drop threshold
   - Choose alert duration (7-90 days)
4. **Get Notified** via email when price drops!

### Managing Your Alerts

1. Go to **Dashboard** → **Price Alerts**
2. View all your active alerts
3. **Enable/Disable** alerts as needed
4. **Delete** alerts you no longer need
5. See **notification history** and savings

### Understanding Price Charts

- **Green Line**: Actual historical prices
- **Blue Dashed Line**: ML predicted prices
- **Green Reference**: Lowest price recorded
- **Red Reference**: Highest price recorded
- **Cards**: Current, Min, Max, Average prices

### Reading ML Predictions

- **Confidence**: How reliable the prediction is (50-95%)
- **Best Day to Buy**: Predicted lowest price day
- **Trend**: Price direction (increasing/decreasing/stable)
- **Volatility**: How much prices fluctuate

## For Administrators

### Setting Up Email Notifications

1. **Get SMTP Credentials**:
   - Gmail: Enable 2FA, create App Password
   - Other: Get SMTP host, port, credentials

2. **Add to .env**:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   SMTP_FROM=noreply@ailydian.com
   ```

3. **Test Email**:
   ```bash
   curl -X POST http://localhost:3100/api/test-email \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com"}'
   ```

### Setting Up Cron Jobs

#### Vercel (Recommended)
1. Merge `vercel-price-tracking.json` into your `vercel.json`
2. Deploy to Vercel
3. Cron runs automatically every 6 hours

#### External Service (Alternative)
1. Use cron-job.org or similar
2. URL: `https://travel.ailydian.com/api/cron/check-price-alerts`
3. Schedule: `0 */6 * * *` (every 6 hours)
4. Add header: `x-cron-secret: YOUR_SECRET`

### Monitoring

#### Check Cron Job Status
```bash
curl https://travel.ailydian.com/api/cron/check-price-alerts \
  -H "x-cron-secret: YOUR_SECRET"
```

#### View Price Statistics
```bash
curl http://localhost:3100/api/test-price-tracking?action=stats
```

#### Database Queries
```sql
-- Active alerts count
SELECT COUNT(*) FROM price_alerts WHERE status = 'ACTIVE';

-- Price history count
SELECT COUNT(*) FROM price_history;

-- Notifications sent today
SELECT COUNT(*) FROM notifications
WHERE type = 'PRICE_DROP'
AND created_at >= CURRENT_DATE;
```

## Testing

### 1. Seed Test Data
```bash
curl http://localhost:3100/api/test-price-tracking?action=seed
```
Creates 30 days of realistic price data

### 2. Test Predictions
```bash
curl http://localhost:3100/api/test-price-tracking?action=predict
```
Generates ML predictions

### 3. View Demo
Navigate to: http://localhost:3100/price-tracking-demo

### 4. Create Test Alert
```bash
curl -X POST http://localhost:3100/api/prices/track \
  -H "Content-Type: application/json" \
  -d '{
    "entityType": "HOTEL",
    "entityId": "test-hotel-001",
    "entityName": "Test Hotel",
    "targetPrice": 100,
    "currentPrice": 120,
    "currency": "TRY"
  }'
```

### 5. Check Alert Status
```bash
curl http://localhost:3100/api/prices/alerts
```

## API Reference

### POST /api/prices/track
**Create or update price alert**

Request:
```json
{
  "entityType": "HOTEL",
  "entityId": "hotel-123",
  "entityName": "Luxury Resort",
  "targetPrice": 150.00,
  "currentPrice": 180.00,
  "currency": "TRY",
  "priceDropPercentage": 10,
  "expiresAt": "2024-12-31T00:00:00Z",
  "metadata": {}
}
```

### GET /api/prices/history
**Get price history**

Query: `?entityType=HOTEL&entityId=hotel-123&days=30`

### POST /api/prices/predict
**Get ML predictions**

Request:
```json
{
  "entityType": "HOTEL",
  "entityId": "hotel-123",
  "daysAhead": 7
}
```

### GET /api/prices/alerts
**Get user's alerts**

Query: `?status=ACTIVE&entityType=HOTEL`

### PATCH /api/prices/alerts
**Update alert status**

Request:
```json
{
  "alertId": "alert-123",
  "status": "DISABLED"
}
```

### DELETE /api/prices/alerts
**Delete alert**

Query: `?alertId=alert-123`

## Component Props

### PriceChart
```tsx
<PriceChart
  entityType="HOTEL"          // HOTEL | FLIGHT | TOUR
  entityId="hotel-123"        // Entity identifier
  days={30}                   // History days (default: 30)
  showPredictions={true}      // Show ML predictions
  height={400}                // Chart height in px
  currency="TRY"              // Currency symbol
/>
```

### WatchPriceButton
```tsx
<WatchPriceButton
  entityType="HOTEL"          // HOTEL | FLIGHT | TOUR
  entityId="hotel-123"        // Entity identifier
  entityName="Hotel Name"     // Display name
  currentPrice={180}          // Current price
  currency="TRY"              // Currency
  metadata={{}}               // Additional data
  variant="default"           // default | icon | compact
  onSuccess={() => {}}        // Success callback
  className=""                // Additional CSS classes
/>
```

### PriceAlertsDashboard
```tsx
<PriceAlertsDashboard />
// No props - uses session for user data
```

## Troubleshooting

### Charts Not Showing
**Problem**: Empty chart or no data
**Solution**:
1. Check if price history exists: `/api/test-price-tracking?action=stats`
2. Seed test data: `/api/test-price-tracking?action=seed`
3. Verify entityId matches

### Predictions Missing
**Problem**: No blue dashed line on chart
**Solution**:
1. Need minimum 7 days of data
2. Check browser console for errors
3. Verify TensorFlow.js loaded

### Emails Not Sending
**Problem**: No email notifications
**Solution**:
1. Check SMTP credentials in `.env`
2. For Gmail: Use App Password, not regular password
3. Check spam folder
4. Test: `priceAlertNotificationService.sendTestEmail('test@example.com')`

### Cron Not Running
**Problem**: Alerts not checking automatically
**Solution**:
1. Verify Vercel cron is set up
2. Check `CRON_SECRET` matches
3. Test manually: `curl /api/cron/check-price-alerts`
4. Check Vercel logs

### Button Not Working
**Problem**: Watch Price button doesn't respond
**Solution**:
1. Check if user is logged in (session required)
2. Verify API endpoints are accessible
3. Check browser console for errors
4. Test API: `POST /api/prices/track`

## Best Practices

### For Performance
- Cache price history for 1 hour
- Batch save price data
- Run predictions asynchronously
- Index database queries

### For Accuracy
- Collect prices consistently
- Clean old data (>90 days)
- Monitor ML prediction accuracy
- Update models periodically

### For Users
- Set reasonable alert durations
- Prevent notification spam (6hr minimum)
- Show confidence scores
- Provide clear statistics

## FAQ

**Q: How often are prices checked?**
A: Every 6 hours via cron job

**Q: How long is price history stored?**
A: Recommended 90 days (configurable)

**Q: How accurate are ML predictions?**
A: 50-95% confidence, depends on data quality

**Q: Can I track multiple items?**
A: Yes, unlimited alerts per user

**Q: What notifications are supported?**
A: Currently email, push/SMS ready for future

**Q: How do I cancel an alert?**
A: Dashboard → Price Alerts → Delete

**Q: Can I change target price?**
A: Yes, create new alert (auto-updates existing)

**Q: Is my data secure?**
A: Yes, user authentication required, encrypted in transit

## Support

- **Documentation**: See `PRICE_TRACKING_SETUP.md`
- **Demo**: http://localhost:3100/price-tracking-demo
- **API Test**: Use `/api/test-price-tracking` endpoints
- **Issues**: Check server logs and browser console

---

**Last Updated**: 2024
**Version**: 1.0.0
