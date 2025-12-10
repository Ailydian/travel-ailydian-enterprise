/**
 * Weather data service for trip planning
 */

interface WeatherData {
  date: Date;
  temperature: {
    min: number;
    max: number;
    avg: number;
  };
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'partly-cloudy';
  precipitation: number; // percentage
  humidity: number; // percentage
  windSpeed: number; // km/h
  uvIndex: number;
  sunrise: string;
  sunset: string;
}

interface WeatherForecast {
  location: string;
  forecasts: WeatherData[];
  alerts?: string[];
}

/**
 * Fetch weather forecast for destination
 * In production, integrate with OpenWeatherMap, WeatherAPI, or similar
 */
export async function getWeatherForecast(
  location: string,
  startDate: Date,
  endDate: Date
): Promise<WeatherForecast> {
  try {
    // Mock implementation - replace with actual API call
    const forecasts = generateMockForecast(startDate, endDate);

    return {
      location,
      forecasts,
      alerts: []
    };

    // Example API integration:
    // const apiKey = process.env.WEATHER_API_KEY;
    // const response = await fetch(
    //   `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=14`
    // );
    // const data = await response.json();
    // return parseWeatherData(data);

  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
}

/**
 * Get weather-appropriate activity suggestions
 */
export function getWeatherAppropriateActivities(
  weather: WeatherData,
  allActivities: any[]
): any[] {
  const { condition, precipitation, temperature } = weather;

  return allActivities.filter(activity => {
    // Indoor activities for rainy weather
    if (condition === 'rainy' || precipitation > 50) {
      return activity.type === 'indoor' ||
             ['museum', 'gallery', 'shopping', 'restaurant'].includes(activity.category);
    }

    // Outdoor activities for good weather
    if (condition === 'sunny' && precipitation < 20) {
      return true; // All activities suitable
    }

    // Cold weather activities
    if (temperature.avg < 10) {
      return activity.category !== 'beach' && activity.category !== 'water-sports';
    }

    return true;
  });
}

/**
 * Determine best time of day for outdoor activities
 */
export function getBestTimeForActivity(
  weather: WeatherData,
  activityType: 'outdoor' | 'indoor'
): string {
  if (activityType === 'indoor') {
    // Suggest midday during bad weather
    if (weather.condition === 'rainy' || weather.precipitation > 50) {
      return '12:00-15:00';
    }
  }

  // Outdoor activities
  if (activityType === 'outdoor') {
    // Early morning or late afternoon for sunny days to avoid heat
    if (weather.condition === 'sunny' && weather.temperature.max > 30) {
      return 'Early morning (8:00-10:00) or late afternoon (16:00-18:00)';
    }

    // Midday for pleasant weather
    if (weather.temperature.avg > 15 && weather.temperature.avg < 25) {
      return 'Any time (weather is perfect!)';
    }
  }

  return 'Flexible';
}

/**
 * Generate packing list based on weather
 */
export function generatePackingList(forecasts: WeatherData[]): string[] {
  const items: string[] = ['Passport', 'Phone charger', 'Medications'];

  const avgTemp = forecasts.reduce((sum, f) => sum + f.temperature.avg, 0) / forecasts.length;
  const maxTemp = Math.max(...forecasts.map(f => f.temperature.max));
  const minTemp = Math.min(...forecasts.map(f => f.temperature.min));
  const rainyDays = forecasts.filter(f => f.precipitation > 40).length;

  // Temperature-based items
  if (avgTemp < 10) {
    items.push('Winter coat', 'Warm sweaters', 'Gloves', 'Scarf', 'Warm socks');
  } else if (avgTemp < 20) {
    items.push('Light jacket', 'Long pants', 'Comfortable shoes');
  } else {
    items.push('Light clothing', 'Shorts', 'Sunglasses', 'Sunscreen', 'Hat');
  }

  // Rain protection
  if (rainyDays > 0) {
    items.push('Umbrella', 'Rain jacket', 'Waterproof shoes');
  }

  // UV protection
  const highUvDays = forecasts.filter(f => f.uvIndex > 6).length;
  if (highUvDays > 0) {
    items.push('High SPF sunscreen', 'Sun hat', 'Sunglasses');
  }

  // General items
  items.push('Comfortable walking shoes', 'Day backpack', 'Water bottle', 'Camera');

  return [...new Set(items)]; // Remove duplicates
}

/**
 * Check if weather is suitable for specific activity
 */
export function isWeatherSuitable(
  weather: WeatherData,
  activityType: string
): { suitable: boolean; reason?: string } {
  const { condition, precipitation, temperature, windSpeed } = weather;

  // Beach activities
  if (activityType === 'beach' || activityType === 'swimming') {
    if (temperature.avg < 20) {
      return { suitable: false, reason: 'Too cold for beach activities' };
    }
    if (precipitation > 30) {
      return { suitable: false, reason: 'High chance of rain' };
    }
  }

  // Hiking
  if (activityType === 'hiking' || activityType === 'trekking') {
    if (precipitation > 50) {
      return { suitable: false, reason: 'Too much rain, trails may be slippery' };
    }
    if (windSpeed > 40) {
      return { suitable: false, reason: 'Strong winds, potentially dangerous' };
    }
  }

  // Water sports
  if (activityType === 'water-sports' || activityType === 'sailing') {
    if (windSpeed > 30) {
      return { suitable: false, reason: 'Winds too strong for water activities' };
    }
    if (condition === 'stormy') {
      return { suitable: false, reason: 'Storm conditions' };
    }
  }

  // Photography
  if (activityType === 'photography') {
    if (condition === 'cloudy' || condition === 'partly-cloudy') {
      return { suitable: true, reason: 'Great diffused light for photos!' };
    }
  }

  return { suitable: true };
}

/**
 * Get clothing recommendations
 */
export function getClothingRecommendations(weather: WeatherData): string[] {
  const recommendations: string[] = [];
  const temp = weather.temperature.avg;

  if (temp < 0) {
    recommendations.push('Heavy winter coat', 'Thermal underwear', 'Winter boots');
  } else if (temp < 10) {
    recommendations.push('Warm jacket', 'Sweater', 'Long pants');
  } else if (temp < 20) {
    recommendations.push('Light jacket', 'Long or short pants', 'Layers');
  } else if (temp < 30) {
    recommendations.push('T-shirts', 'Shorts', 'Light clothing');
  } else {
    recommendations.push('Very light clothing', 'Hat for sun protection', 'Breathable fabrics');
  }

  if (weather.precipitation > 30) {
    recommendations.push('Rain jacket or umbrella');
  }

  if (weather.uvIndex > 6) {
    recommendations.push('Sun protection (hat, sunscreen)');
  }

  return recommendations;
}

/**
 * Generate mock weather forecast
 */
function generateMockForecast(startDate: Date, endDate: Date): WeatherData[] {
  const forecasts: WeatherData[] = [];
  const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  for (let i = 0; i <= daysDiff; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    const conditions: WeatherData['condition'][] = ['sunny', 'cloudy', 'rainy', 'partly-cloudy'];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];

    const baseTemp = 20 + Math.random() * 10;

    forecasts.push({
      date,
      temperature: {
        min: baseTemp - 5,
        max: baseTemp + 5,
        avg: baseTemp
      },
      condition,
      precipitation: condition === 'rainy' ? 60 + Math.random() * 40 : Math.random() * 30,
      humidity: 50 + Math.random() * 40,
      windSpeed: 10 + Math.random() * 20,
      uvIndex: Math.floor(Math.random() * 11),
      sunrise: '06:30',
      sunset: '19:30'
    });
  }

  return forecasts;
}

/**
 * Get weather icon
 */
export function getWeatherIcon(condition: WeatherData['condition']): string {
  const icons: Record<WeatherData['condition'], string> = {
    'sunny': '☀️',
    'cloudy': '☁️',
    'rainy': '🌧️',
    'snowy': '❄️',
    'partly-cloudy': '⛅'
  };

  return icons[condition] || '🌤️';
}

/**
 * Calculate comfort index
 */
export function calculateComfortIndex(weather: WeatherData): {
  score: number;
  description: string;
} {
  let score = 100;

  // Temperature comfort
  const temp = weather.temperature.avg;
  if (temp < 10 || temp > 30) {
    score -= 30;
  } else if (temp < 15 || temp > 25) {
    score -= 15;
  }

  // Precipitation impact
  if (weather.precipitation > 50) {
    score -= 25;
  } else if (weather.precipitation > 25) {
    score -= 10;
  }

  // Wind impact
  if (weather.windSpeed > 30) {
    score -= 15;
  }

  // Humidity impact
  if (weather.humidity > 80) {
    score -= 10;
  }

  let description: string;
  if (score >= 80) {
    description = 'Perfect weather for outdoor activities!';
  } else if (score >= 60) {
    description = 'Good weather, some activities may be affected';
  } else if (score >= 40) {
    description = 'Fair weather, plan indoor alternatives';
  } else {
    description = 'Poor weather, mostly indoor activities recommended';
  }

  return { score: Math.max(0, score), description };
}
