import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Search, Plane, Calendar, Users, ArrowRight, Clock, Zap, Star, Filter } from 'lucide-react';

const flights = [
  {
    id: 1,
    airline: 'Turkish Airlines',
    logo: '🇹🇷',
    from: 'İstanbul (IST)',
    to: 'Antalya (AYT)',
    departure: '08:30',
    arrival: '10:15',
    duration: '1s 45d',
    price: 450,
    originalPrice: 580,
    type: 'Direkt',
    aircraft: 'Boeing 737-800',
    amenities: ['WiFi', 'Yemek', 'Eğlence']
  },
  {
    id: 2,
    airline: 'Pegasus Airlines',
    logo: '✈️',
    from: 'İstanbul (SAW)',
    to: 'İzmir (ADB)',
    departure: '14:20',
    arrival: '15:35',
    duration: '1s 15d',
    price: 320,
    originalPrice: 420,
    type: 'Direkt',
    aircraft: 'Airbus A320',
    amenities: ['WiFi', 'İkram']
  },
  {
    id: 3,
    airline: 'Turkish Airlines',
    logo: '🇹🇷',
    from: 'Ankara (ESB)',
    to: 'Trabzon (TZX)',
    departure: '11:45',
    arrival: '13:20',
    duration: '1s 35d',
    price: 380,
    originalPrice: 480,
    type: 'Direkt',
    aircraft: 'Boeing 737-900',
    amenities: ['WiFi', 'Yemek', 'Eğlence']
  },
  {
    id: 4,
    airline: 'Anadolu Jet',
    logo: '🟡',
    from: 'İstanbul (IST)',
    to: 'Bodrum (BJV)',
    departure: '16:10',
    arrival: '17:35',
    duration: '1s 25d',
    price: 390,
    originalPrice: null,
    type: 'Direkt',
    aircraft: 'Boeing 737-800',
    amenities: ['İkram']
  },
  {
    id: 5,
    airline: 'SunExpress',
    logo: '☀️',
    from: 'İzmir (ADB)',
    to: 'Antalya (AYT)',
    departure: '09:15',
    arrival: '10:25',
    duration: '1s 10d',
    price: 280,
    originalPrice: 350,
    type: 'Direkt',
    aircraft: 'Boeing 737-800',
    amenities: ['WiFi', 'İkram']
  },
  {
    id: 6,
    airline: 'Turkish Airlines',
    logo: '🇹🇷',
    from: 'İstanbul (IST)',
    to: 'Kayseri (ASR)',
    departure: '12:30',
    arrival: '14:05',
    duration: '1s 35d',
    price: 420,
    originalPrice: 520,
    type: 'Direkt',
    aircraft: 'Airbus A321',
    amenities: ['WiFi', 'Yemek', 'Eğlence']
  }
];

const airlines = ['Tümü', 'Turkish Airlines', 'Pegasus Airlines', 'SunExpress', 'Anadolu Jet'];
const timeFilters = ['Tümü', 'Sabah (06-12)', 'Öğleden Sonra (12-18)', 'Akşam (18-00)'];

export default function Flights() {
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    departure: '',
    return: '',
    passengers: '1'
  });
  const [selectedAirline, setSelectedAirline] = useState('Tümü');
  const [selectedTime, setSelectedTime] = useState('Tümü');
  const [sortBy, setSortBy] = useState('price');

  const filteredFlights = flights.filter(flight => {
    if (selectedAirline !== 'Tümü' && flight.airline !== selectedAirline) return false;
    return true;
  });

  return (
    <>
      <Head>
        <title>Uçak Biletleri - Ailydian Travel</title>
        <meta name="description" content="En uygun uçak biletlerini bulun. Türkiye'nin her yerine direkt uçuşlar..." />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <Link href="/" className="text-2xl font-bold text-blue-600">
                  Ailydian Travel
                </Link>
              </div>
              <Link
                href="/"
                className="text-gray-600 hover:text-blue-600 flex items-center"
              >
                <ArrowRight className="h-5 w-5 mr-2 rotate-180" />
                Ana Sayfa&apos;ya Dön
              </Link>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center mb-8">
              Uçak Bileti Ara
            </h1>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nereden</label>
                  <input
                    type="text"
                    placeholder="İstanbul, Ankara..."
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg placeholder-white/70 text-white focus:ring-2 focus:ring-white focus:border-transparent"
                    value={searchData.from}
                    onChange={(e) => setSearchData({...searchData, from: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Nereye</label>
                  <input
                    type="text"
                    placeholder="Antalya, İzmir..."
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg placeholder-white/70 text-white focus:ring-2 focus:ring-white focus:border-transparent"
                    value={searchData.to}
                    onChange={(e) => setSearchData({...searchData, to: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Gidiş</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:ring-2 focus:ring-white focus:border-transparent"
                    value={searchData.departure}
                    onChange={(e) => setSearchData({...searchData, departure: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Yolcu</label>
                  <select 
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:ring-2 focus:ring-white focus:border-transparent"
                    value={searchData.passengers}
                    onChange={(e) => setSearchData({...searchData, passengers: e.target.value})}
                  >
                    <option value="1">1 Yolcu</option>
                    <option value="2">2 Yolcu</option>
                    <option value="3">3 Yolcu</option>
                    <option value="4">4+ Yolcu</option>
                  </select>
                </div>
              </div>
              <button className="w-full md:w-auto bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors mt-4">
                Uçak Bileti Ara
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {airlines.map((airline) => (
                <button
                  key={airline}
                  onClick={() => setSelectedAirline(airline)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedAirline === airline
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600'
                  }`}
                >
                  {airline}
                </button>
              ))}
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
            >
              <option value="price">Fiyata Göre</option>
              <option value="duration">Süreye Göre</option>
              <option value="departure">Kalkış Saatine Göre</option>
            </select>
          </div>

          {/* Results */}
          <div className="space-y-4">
            {filteredFlights.map((flight) => (
              <div key={flight.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <span className="text-2xl mr-3">{flight.logo}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{flight.airline}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{flight.aircraft}</p>
                      </div>
                      <div className="ml-auto">
                        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-sm font-medium">
                          {flight.type}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                      <div className="text-center">
                        <div className="font-bold text-xl text-gray-900 dark:text-white">{flight.departure}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{flight.from}</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Plane className="h-4 w-4 text-blue-600 rotate-90" />
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {flight.duration}
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="font-bold text-xl text-gray-900 dark:text-white">{flight.arrival}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{flight.to}</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {flight.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 md:ml-8 text-center md:text-right">
                    <div className="mb-2">
                      {flight.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          ₺{flight.originalPrice}
                        </div>
                      )}
                      <div className="text-2xl font-bold text-blue-600">
                        ₺{flight.price}
                      </div>
                      <div className="text-xs text-gray-500">kişi başına</div>
                    </div>
                    
                    <button className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                      Seç
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}