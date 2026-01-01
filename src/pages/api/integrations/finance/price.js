// Finance price integration endpoint
import { logger } from '../../../../lib/logger/winston';
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { 
      service, 
      destination, 
      checkIn, 
      checkOut, 
      guests = 1, 
      currency = 'TRY',
      language = 'tr' 
    } = req.body

    if (!service || !destination) {
      return res.status(400).json({ error: 'Service and destination are required' })
    }

    // Mock pricing data based on service type
    const generateMockPrice = (service, destination) => {
      const basePrices = {
        'hotel': { min: 500, max: 3000 },
        'flight': { min: 800, max: 2500 },
        'activity': { min: 100, max: 800 },
        'car': { min: 200, max: 600 },
        'restaurant': { min: 50, max: 300 }
      }

      const base = basePrices[service] || basePrices['hotel']
      const price = Math.floor(Math.random() * (base.max - base.min) + base.min)
      
      return {
        price: price,
        currency: currency,
        originalPrice: Math.floor(price * 1.2), // Show discount
        discount: 20,
        taxesIncluded: true,
        cancellationFree: true
      }
    }

    const priceData = generateMockPrice(service, destination)
    
    const response = {
      success: true,
      data: {
        service: service,
        destination: destination,
        dates: {
          checkIn: checkIn,
          checkOut: checkOut
        },
        guests: guests,
        pricing: priceData,
        availability: 'available',
        lastUpdated: new Date().toISOString(),
        provider: 'Holiday.AILYDIAN',
        features: language === 'tr' ? [
          'Ücretsiz iptal',
          'En iyi fiyat garantisi',
          'Anında onay',
          '7/24 destek'
        ] : [
          'Free cancellation',
          'Best price guarantee',
          'Instant confirmation',
          '24/7 support'
        ]
      }
    }

    res.status(200).json(response)

  } catch (error) {
    logger.error('Finance Price Error:', error)
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Pricing service temporarily unavailable'
    })
  }
}