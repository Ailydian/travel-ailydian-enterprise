import type { NextApiRequest, NextApiResponse } from 'next';
import Groq from 'groq-sdk';
import { addDays, differenceInDays, format } from 'date-fns';
import { withRateLimit, groqRateLimiter } from '@/lib/middleware/rate-limiter';
import logger from '../../../lib/logger';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

interface TripPreferences {
  destination: string;
  startDate: Date;
  endDate: Date;
  travelers: number;
  budget: number;
  interests: string[];
  travelStyle: string;
}

interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  type: 'attraction' | 'activity' | 'transportation' | 'free-time';
  location: string;
  coordinates?: { lat: number; lng: number };
  duration: number;
  cost: number;
  currency: string;
  bookingUrl?: string;
  availability: 'available' | 'limited' | 'unavailable';
  rating?: number;
  reviews?: number;
  aiConfidence: number;
  alternatives?: Activity[];
}

interface ItineraryDay {
  day: number;
  date: Date;
  title: string;
  activities: Activity[];
  meals: any[];
  accommodation?: any;
  weather?: any;
  totalCost: number;
  travelTime: number;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const preferences: TripPreferences = req.body;

    // Validate inputs
    if (!preferences.destination || !preferences.startDate || !preferences.endDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const startDate = new Date(preferences.startDate);
    const endDate = new Date(preferences.endDate);
    const numberOfDays = differenceInDays(endDate, startDate) + 1;

    // Generate itinerary using OpenAI GPT-4
    const prompt = `Create a detailed ${numberOfDays}-day travel itinerary for ${preferences.destination}.

Trip Details:
- Travelers: ${preferences.travelers} people
- Budget: $${preferences.budget} total
- Travel Style: ${preferences.travelStyle}
- Interests: ${preferences.interests.join(', ')}
- Dates: ${format(startDate, 'MMM dd, yyyy')} to ${format(endDate, 'MMM dd, yyyy')}

Requirements:
1. Create a detailed hourly schedule for each day
2. Include breakfast, lunch, and dinner recommendations with estimated costs
3. Balance activities based on interests and budget
4. Optimize travel time between locations
5. Consider opening hours and typical crowd levels
6. Include estimated costs for each activity
7. Suggest 2-3 alternative options for major activities
8. Provide weather-appropriate activities

Return the itinerary as a structured JSON with the following format:
{
  "itinerary": [
    {
      "day": 1,
      "title": "Day title",
      "activities": [
        {
          "time": "09:00",
          "title": "Activity name",
          "description": "Detailed description",
          "type": "attraction|activity|transportation|free-time",
          "location": "Specific location",
          "coordinates": {"lat": 0, "lng": 0},
          "duration": 120,
          "cost": 25,
          "currency": "USD",
          "availability": "available",
          "rating": 4.5,
          "reviews": 1200,
          "aiConfidence": 0.95
        }
      ],
      "meals": [
        {
          "type": "breakfast|lunch|dinner",
          "time": "08:00",
          "restaurant": "Restaurant name",
          "cuisine": "Cuisine type",
          "cost": 15,
          "rating": 4.3,
          "mustTry": true
        }
      ],
      "totalCost": 150,
      "travelTime": 45
    }
  ],
  "budgetBreakdown": {
    "accommodation": 500,
    "food": 400,
    "activities": 600,
    "transportation": 300,
    "miscellaneous": 200,
    "total": 2000
  },
  "tips": ["Tip 1", "Tip 2"],
  "warnings": ["Warning 1"]
}`;

    // Model mapping for obfuscation
    const modelMap: Record<string, string> = {
      'nx-primary-v3': process.env.GROQ_PRIMARY_MODEL || 'llama-3.3-70b-versatile',
      'nx-fast-v1': process.env.GROQ_FAST_MODEL || 'llama-3.1-8b-instant',
    };

    const completion = await groq.chat.completions.create({
      model: modelMap['nx-primary-v3'],
      messages: [
        {
          role: 'system',
          content: 'You are an expert travel planner with deep knowledge of destinations worldwide. Create practical, well-researched itineraries optimized for time, budget, and traveler preferences. Always return valid JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' }
    });

    const aiResponse = completion.choices[0].message.content;

    if (!aiResponse) {
      throw new Error('No response from Groq');
    }

    let itineraryData;
    try {
      itineraryData = JSON.parse(aiResponse);
    } catch (parseError) {
      logger.error('Failed to parse Groq response:', aiResponse as Error, { component: 'GenerateItinerary' });
      // Fallback to mock data if parsing fails
      itineraryData = generateMockItinerary(preferences, numberOfDays);
    }

    // Enrich with real-time data
    const enrichedItinerary = await enrichItineraryWithRealtimeData(
      itineraryData.itinerary,
      preferences
    );

    return res.status(200).json({
      itinerary: enrichedItinerary,
      budgetBreakdown: itineraryData.budgetBreakdown,
      tips: itineraryData.tips || [],
      warnings: itineraryData.warnings || [],
      metadata: {
        generatedAt: new Date().toISOString(),
        destination: preferences.destination,
        duration: numberOfDays,
        travelers: preferences.travelers
      }
    });

  } catch (error: any) {
    logger.error('Error generating itinerary:', error as Error, { component: 'GenerateItinerary' });

    // If Groq fails, return mock data
    const preferences: TripPreferences = req.body;
    const startDate = new Date(preferences.startDate);
    const endDate = new Date(preferences.endDate);
    const numberOfDays = differenceInDays(endDate, startDate) + 1;

    const mockData = generateMockItinerary(preferences, numberOfDays);

    return res.status(200).json(mockData);
  }
}

// Helper function to enrich itinerary with real-time data
async function enrichItineraryWithRealtimeData(
  itinerary: ItineraryDay[],
  preferences: TripPreferences
): Promise<ItineraryDay[]> {
  // Add IDs and dates to activities
  return itinerary.map((day, index) => ({
    ...day,
    date: addDays(new Date(preferences.startDate), index),
    activities: day.activities.map((activity, actIndex) => ({
      ...activity,
      id: `${day.day}-${actIndex}`,
      currency: 'USD'
    })),
    // Add mock weather data (in production, use a weather API)
    weather: {
      temp: 20 + Math.random() * 10,
      condition: ['Sunny', 'Partly Cloudy', 'Clear'][Math.floor(Math.random() * 3)],
      icon: 'sun',
      humidity: 50 + Math.random() * 30,
      precipitation: Math.random() * 20
    }
  }));
}

// Fallback mock data generator
function generateMockItinerary(preferences: TripPreferences, numberOfDays: number) {
  const itinerary: ItineraryDay[] = [];
  const budgetPerDay = preferences.budget / numberOfDays;

  for (let day = 1; day <= numberOfDays; day++) {
    const dayDate = addDays(new Date(preferences.startDate), day - 1);

    itinerary.push({
      day,
      date: dayDate,
      title: `Day ${day}: Exploring ${preferences.destination}`,
      activities: [
        {
          id: `${day}-1`,
          time: '09:00',
          title: 'Morning Attraction',
          description: `Visit the iconic landmarks of ${preferences.destination}`,
          type: 'attraction',
          location: `Main Tourist Area, ${preferences.destination}`,
          coordinates: { lat: 41.0082, lng: 28.9784 },
          duration: 120,
          cost: budgetPerDay * 0.2,
          currency: 'USD',
          availability: 'available',
          rating: 4.5,
          reviews: 1200,
          aiConfidence: 0.85
        },
        {
          id: `${day}-2`,
          time: '12:00',
          title: 'Lunch Break',
          description: 'Enjoy local cuisine at a recommended restaurant',
          type: 'free-time',
          location: `Restaurant District, ${preferences.destination}`,
          duration: 90,
          cost: budgetPerDay * 0.15,
          currency: 'USD',
          availability: 'available',
          aiConfidence: 0.9
        },
        {
          id: `${day}-3`,
          time: '14:00',
          title: 'Afternoon Activity',
          description: `Experience the culture and ${preferences.interests[0] || 'history'} of ${preferences.destination}`,
          type: 'activity',
          location: `Cultural Center, ${preferences.destination}`,
          coordinates: { lat: 41.0082, lng: 28.9784 },
          duration: 150,
          cost: budgetPerDay * 0.25,
          currency: 'USD',
          availability: 'available',
          rating: 4.7,
          reviews: 850,
          aiConfidence: 0.88
        },
        {
          id: `${day}-4`,
          time: '18:00',
          title: 'Evening Experience',
          description: 'Sunset views and local evening activities',
          type: 'activity',
          location: `Scenic Viewpoint, ${preferences.destination}`,
          duration: 120,
          cost: budgetPerDay * 0.1,
          currency: 'USD',
          availability: 'available',
          rating: 4.8,
          reviews: 2100,
          aiConfidence: 0.92
        }
      ],
      meals: [
        {
          type: 'breakfast',
          time: '08:00',
          restaurant: 'Local Breakfast Spot',
          cuisine: 'Local',
          cost: budgetPerDay * 0.08,
          rating: 4.3,
          mustTry: false
        },
        {
          type: 'lunch',
          time: '12:00',
          restaurant: 'Popular Local Restaurant',
          cuisine: 'Traditional',
          cost: budgetPerDay * 0.15,
          rating: 4.5,
          mustTry: true
        },
        {
          type: 'dinner',
          time: '19:30',
          restaurant: 'Dinner Restaurant',
          cuisine: 'International',
          cost: budgetPerDay * 0.17,
          rating: 4.4,
          mustTry: false
        }
      ],
      accommodation: day === 1 ? {
        name: `Hotel in ${preferences.destination}`,
        type: preferences.travelStyle === 'luxury' ? '5-star' : preferences.travelStyle === 'budget' ? '3-star' : '4-star',
        rating: preferences.travelStyle === 'luxury' ? 4.8 : 4.2,
        pricePerNight: (preferences.budget * 0.3) / numberOfDays,
        amenities: ['WiFi', 'Breakfast', 'Air Conditioning'],
        location: `Central ${preferences.destination}`,
        bookingUrl: 'https://booking.com'
      } : undefined,
      weather: {
        temp: 20 + Math.random() * 10,
        condition: 'Sunny',
        icon: 'sun',
        humidity: 60,
        precipitation: 10
      },
      totalCost: budgetPerDay,
      travelTime: 30 + Math.random() * 30
    });
  }

  return {
    itinerary,
    budgetBreakdown: {
      accommodation: preferences.budget * 0.3,
      food: preferences.budget * 0.25,
      activities: preferences.budget * 0.3,
      transportation: preferences.budget * 0.1,
      miscellaneous: preferences.budget * 0.05,
      total: preferences.budget
    },
    tips: [
      `Best time to visit ${preferences.destination} attractions is early morning`,
      'Consider purchasing a city pass for discounts',
      'Local SIM cards available at the airport'
    ],
    warnings: [
      'Check visa requirements before travel',
      'Travel insurance recommended'
    ]
  };
}

// Export handler with rate limiting
export default withRateLimit(handler, groqRateLimiter);
