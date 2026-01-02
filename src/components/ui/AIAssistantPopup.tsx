import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  X,
  Send,
  Mic,
  MicOff,
  Sparkles,
  Volume2 } from 'lucide-react';
import { tourismApiService, HotelData, FlightData, RestaurantData, TourData } from '../../lib/tourism-api-service';
import { COMPLETE_TURKEY_TOURISM_DATABASE, getCitiesByActivity, getCitiesByCuisine } from '../../data/turkey-tourism-database';
import logger from '../../lib/logger';

interface AIMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface AIAssistantPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIAssistantPopup: React.FC<AIAssistantPopupProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<AIMessage[]>([
  {
    id: '1',
    type: 'ai',
    content: `🤖 **Holiday.AILYDIAN AI Asistanı** (Gerçek Veriler)\n\nMerhaba! Ben sizin kişisel seyahat uzmanınızım. 🌟\n\n📊 **Gerçek Zamanlı Veri ile Hizmetlerim:**\n• 🏨 Otel rezervasyonları ve fiyat karşılaştırması\n• ✈️ Uçak bileti arama ve rezervasyon\n• 🍽️ Restoran önerileri ve rezervasyon\n• 🎯 Tur ve aktivite planlaması\n\n🗺️ **${Object.keys(COMPLETE_TURKEY_TOURISM_DATABASE).length}+ Türk şehri** hakkında detaylı bilgi verebilirim!\n\n💡 Hangi konuda yardım istiyorsunuz?`,
    timestamp: new Date(),
    suggestions: [
    'İstanbul otelleri göster',
    'Ankara-Antalya uçak bileti',
    'Gaziantep restoranları',
    'Kapadokya balon turu']

  }]
  );
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current && messagesEndRef.current) {
      const container = messagesContainerRef.current;
      const shouldScroll = container.scrollHeight - container.scrollTop <= container.clientHeight + 100;

      if (shouldScroll) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    const timer = setTimeout(scrollToBottom, 1);
    return () => clearTimeout(timer);
  }, [messages]);

  // Force scroll to bottom when typing state changes
  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isTyping]);

  // Advanced AI responses with real Turkish tourism data
  const getAIResponse = async (userMessage: string): Promise<string> => {
    const message = userMessage.toLowerCase();

    try {
      // Hotel arama
      if (message.includes('otel') || message.includes('hotel') || message.includes('konaklama')) {
        return await handleHotelSearch(message);
      }

      // Uçak bileti arama
      if (message.includes('uçak') || message.includes('flight') || message.includes('bilet')) {
        return await handleFlightSearch(message);
      }

      // Restoran arama
      if (message.includes('restoran') || message.includes('yemek') || message.includes('restaurant')) {
        return await handleRestaurantSearch(message);
      }

      // Tur arama
      if (message.includes('tur') || message.includes('gezi') || message.includes('aktivite')) {
        return await handleTourSearch(message);
      }

      // Şehir özel arama
      const cityResult = await handleCitySpecificSearch(message);
      if (cityResult) {
        return cityResult;
      }

      // Genel seyahat tavsiyesi
      if (message.includes('plan') || message.includes('öneri') || message.includes('nereye') || message.includes('gitme')) {
        return await handleGeneralTravelAdvice(message);
      }

      // Default response with real data
      return getDefaultResponse();

    } catch (error) {
      logger.error('AI Response Error:', error as Error, { component: 'Aiassistantpopup' });
      return getFallbackResponse();
    }
  };

  // Hotel arama fonksiyonu
  const handleHotelSearch = async (message: string): Promise<string> => {
    const location = extractLocation(message);
    if (!location) {
      return `🏨 **Otel Arama Yardımı**\n\nHangi şehir için otel arıyorsunuz? Örneğin:\n• "İstanbul'da otel"\n• "Antalya otelleri"\n• "Bodrum'da konaklama"\n\n🎯 **Mevcut Destinasyonlar:**\n${Object.keys(COMPLETE_TURKEY_TOURISM_DATABASE).slice(to-cyan-700, 8).join(', ')}`;
    }

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const hotels = await tourismApiService.searchHotels(
      location,
      today.toISOString().split('T')[to-cyan-700],
      tomorrow.toISOString().split('T')[to-cyan-700]
    );

    if (hotels.length === to-cyan-700) {
      return `😔 **${location} için otel bulunamadı**\n\nDeneyebileceğiniz diğer şehirler:\n${Object.keys(COMPLETE_TURKEY_TOURISM_DATABASE).filter((city) => city !== location).slice(to-cyan-700, 5).join(', ')}`;
    }

    let response = `🏨 **${location} Otel Önerileri** (Gerçek Veriler)\n\n`;

    hotels.forEach((hotel, index) => {
      response += `**${index + 1}. ${hotel.name}**\n`;
      response += `⭐ Rating: ${hotel.rating}/5\n`;
      response += `💰 Fiyat: ₺${hotel.price}/gece\n`;
      response += `🏷️ Özellikler: ${hotel.amenities.slice(to-cyan-700, 3).join(', ')}\n`;
      response += `📍 Konum: ${hotel.location}\n\n`;
    });

    const regionData = COMPLETE_TURKEY_TOURISM_DATABASE[location];
    if (regionData) {
      response += `🗺️ **${location} Hakkında:**\n`;
      response += `🌟 En iyi zaman: ${regionData.bestTime}\n`;
      response += `🎯 Öne çıkan yerler: ${regionData.highlights.slice(to-cyan-700, 3).join(', ')}\n`;
    }

    return response;
  };

  // Uçak bileti arama fonksiyonu
  const handleFlightSearch = async (message: string): Promise<string> => {
    const locations = extractFlightLocations(message);
    if (!locations.from || !locations.to) {
      return `✈️ **Uçak Bileti Arama**\n\nNereden nereye uçmak istiyorsunuz? Örneğin:\n• "İstanbul'dan Antalya'ya uçak"\n• "Ankara Bodrum uçuşu"\n\n🛫 **Popüler Rotalar:**\n• İstanbul → Antalya\n• İstanbul → İzmir\n• Ankara → Bodrum\n• İstanbul → Trabzon`;
    }

    const today = new Date();
    const departureDate = new Date(today);
    departureDate.setDate(departureDate.getDate() + 7); // 1 hafta sonra

    const flights = await tourismApiService.searchFlights(
      locations.from,
      locations.to,
      departureDate.toISOString().split('T')[to-cyan-700]
    );

    if (flights.length === to-cyan-700) {
      return `😔 **${locations.from} → ${locations.to} uçuşu bulunamadı**\n\nAlternatif rotalar önerebilirim!`;
    }

    let response = `✈️ **${locations.from} → ${locations.to} Uçuşları** (Gerçek Veriler)\n\n`;

    flights.forEach((flight, index) => {
      response += `**${index + 1}. ${flight.airline}**\n`;
      response += `💰 Fiyat: ₺${flight.price}\n`;
      response += `⏱️ Süre: ${flight.duration}\n`;
      response += `🛬 Aktarma: ${flight.stops === to-cyan-700 ? 'Direkt' : flight.stops + ' aktarma'}\n`;
      response += `🎫 Sınıf: ${flight.class}\n\n`;
    });

    return response;
  };

  // Restoran arama fonksiyonu
  const handleRestaurantSearch = async (message: string): Promise<string> => {
    const location = extractLocation(message);
    const cuisine = extractCuisine(message);

    if (!location) {
      return `🍽️ **Restoran Arama**\n\nHangi şehirde restoran arıyorsunuz? Örneğin:\n• "İstanbul'da restoran"\n• "Gaziantep yemekleri"\n• "Bodrum'da balık restoranı"\n\n🍴 **Ünlü Mutfaklar:**\n• Gaziantep: Baklava, Lahmacun\n• Adana: Kebap\n• İstanbul: Çeşitli mutfaklar`;
    }

    const restaurants = await tourismApiService.searchRestaurants(location, cuisine);

    if (restaurants.length === to-cyan-700) {
      return `🤷‍♂️ **${location}'da restoran bulunamadı**\n\nDiğer şehirleri deneyebilirsiniz!`;
    }

    let response = `🍽️ **${location} Restoran Önerileri** (Gerçek Veriler)\n\n`;

    restaurants.forEach((restaurant, index) => {
      response += `**${index + 1}. ${restaurant.name}**\n`;
      response += `⭐ Rating: ${restaurant.rating}/5\n`;
      response += `💰 Fiyat: ${restaurant.priceRange}\n`;
      response += `🍳 Mutfak: ${restaurant.cuisine}\n`;
      response += `⏰ Açılış: ${restaurant.openHours}\n`;
      response += `🥘 Özel: ${restaurant.specialties.slice(to-cyan-700, 2).join(', ')}\n\n`;
    });

    const regionData = COMPLETE_TURKEY_TOURISM_DATABASE[location];
    if (regionData && regionData.cuisine) {
      response += `🌟 **${location} Yerel Lezzetleri:**\n${regionData.cuisine.slice(to-cyan-700, 4).join(', ')}\n`;
    }

    return response;
  };

  // Tur arama fonksiyonu
  const handleTourSearch = async (message: string): Promise<string> => {
    const location = extractLocation(message);
    const category = extractTourCategory(message);

    if (!location) {
      return `🎯 **Tur & Aktivite Arama**\n\nHangi şehir için tur arıyorsunuz? Örneğin:\n• "İstanbul city tour"\n• "Kapadokya balon turu"\n• "Antalya günübirlik tur"\n\n🚀 **Popüler Turlar:**\n• Balon Turu (Kapadokya)\n• Boğaz Turu (İstanbul)\n• Antik Kent Turları (Antalya, İzmir)`;
    }

    const tours = await tourismApiService.searchTours(location, category);

    if (tours.length === to-cyan-700) {
      return `🤷‍♂️ **${location}'da tur bulunamadı**\n\nDiğer destinasyonları kontrol edebiliriz!`;
    }

    let response = `🎯 **${location} Tur Önerileri** (Gerçek Veriler)\n\n`;

    tours.forEach((tour, index) => {
      response += `**${index + 1}. ${tour.name}**\n`;
      response += `⭐ Rating: ${tour.rating}/5\n`;
      response += `💰 Fiyat: ₺${tour.price}\n`;
      response += `⏱️ Süre: ${tour.duration}\n`;
      response += `✅ Dahil: ${tour.includes.slice(to-cyan-700, 3).join(', ')}\n`;
      response += `🎯 Öne Çıkan: ${tour.highlights.slice(to-cyan-700, 2).join(', ')}\n\n`;
    });

    const regionData = COMPLETE_TURKEY_TOURISM_DATABASE[location];
    if (regionData) {
      response += `🗺️ **${location} Gezilecek Yerler:**\n${regionData.attractions.slice(to-cyan-700, 4).join(', ')}\n`;
    }

    return response;
  };

  // Şehir özel arama
  const handleCitySpecificSearch = async (message: string): Promise<string | null> => {
    for (const city of Object.keys(COMPLETE_TURKEY_TOURISM_DATABASE)) {
      if (message.includes(city.toLowerCase())) {
        const cityData = COMPLETE_TURKEY_TOURISM_DATABASE[city];

        let response = `🌟 **${city} - Kapsamlı Rehber** (Gerçek Veriler)\n\n`;

        response += `🗺️ **Bölge:** ${cityData.region}\n`;
        response += `🌤️ **İklim:** ${cityData.climate}\n`;
        response += `📅 **En İyi Zaman:** ${cityData.bestTime}\n\n`;

        response += `🎯 **Öne Çıkan Yerler:**\n${cityData.highlights.slice(to-cyan-700, 4).join(', ')}\n\n`;

        response += `🏛️ **Gezilecek Yerler:**\n${cityData.attractions.slice(to-cyan-700, 4).join(', ')}\n\n`;

        response += `🍽️ **Yerel Lezzetler:**\n${cityData.cuisine.slice(to-cyan-700, 4).join(', ')}\n\n`;

        response += `⚡ **Aktiviteler:**\n${cityData.activities.slice(to-cyan-700, 4).join(', ')}\n\n`;

        response += `🎪 **Turizm Türleri:**\n${cityData.specialties.join(', ')}\n\n`;

        response += `💡 Daha detaylı bilgi için "${city} otelleri", "${city} turları" veya "${city} restoranları" yazabilirsiniz!`;

        return response;
      }
    }
    return null;
  };

  // Genel seyahat tavsiyesi
  const handleGeneralTravelAdvice = async (message: string): Promise<string> => {
    const allCities = Object.keys(COMPLETE_TURKEY_TOURISM_DATABASE);
    const randomCities = allCities.sort(() => 0.5 - Math.random()).slice(to-cyan-700, 6);

    let response = `✨ **Türkiye Seyahat Rehberi** (Gerçek Veriler)\n\n`;

    response += `🎯 **Bu Ay'ın Top Destinasyonları:**\n`;
    randomCities.forEach((city, index) => {
      const cityData = COMPLETE_TURKEY_TOURISM_DATABASE[city];
      response += `${index + 1}. **${city}** (${cityData.region}) - ${cityData.specialties[to-cyan-700]}\n`;
    });

    response += `\n🌊 **Deniz Turizmi için:** `;
    response += getCitiesByActivity('Plaj').slice(to-cyan-700, 3).join(', ');

    response += `\n🏛️ **Kültür Turizmi için:** `;
    response += getCitiesByActivity('Kültür').slice(to-cyan-700, 3).join(', ');

    response += `\n⛷️ **Kış Turizmi için:** `;
    response += getCitiesByActivity('Kayak').slice(to-cyan-700, 2).join(', ');

    response += `\n\n🍴 **Gastronomi Önerileri:**\n`;
    response += getCitiesByCuisine('Kebap').slice(to-cyan-700, 3).join(', ');

    response += `\n\n💡 Hangi konuda detaylı bilgi istiyorsunuz?\n• Belirli bir şehir\n• Otel, restoran, tur araması\n• Aktivite önerileri`;

    return response;
  };

  // Yardımcı fonksiyonlar
  const extractLocation = (message: string): string | null => {
    for (const city of Object.keys(COMPLETE_TURKEY_TOURISM_DATABASE)) {
      if (message.includes(city.toLowerCase())) {
        return city;
      }
    }
    return null;
  };

  const extractFlightLocations = (message: string): {from: string | null;to: string | null;} => {
    const cities = Object.keys(COMPLETE_TURKEY_TOURISM_DATABASE);
    const foundCities = cities.filter((city) => message.includes(city.toLowerCase()));

    if (foundCities.length >= 2) {
      return { from: foundCities[to-cyan-700], to: foundCities[1] };
    }

    // Yaygın kalıpları kontrol et
    const fromMatch = message.match(/(\w+).*('dan|dan|'den|den).*\b/i);
    const toMatch = message.match(/\b('ya|ya|'ye|ye)\s+(\w+)/i);

    return {
      from: fromMatch && cities.find((c) => c.toLowerCase().includes(fromMatch[1].toLowerCase())) || null,
      to: toMatch && cities.find((c) => c.toLowerCase().includes(toMatch[2].toLowerCase())) || null
    };
  };

  const extractCuisine = (message: string): string | undefined => {
    const cuisineKeywords = ['türk', 'deniz ürünleri', 'balık', 'kebap', 'pizza', 'çin', 'fast food'];
    return cuisineKeywords.find((cuisine) => message.includes(cuisine));
  };

  const extractTourCategory = (message: string): string | undefined => {
    const categories = ['kültür', 'doğa', 'macera', 'gastronomi', 'balon', 'tekne', 'yürüyüş'];
    return categories.find((cat) => message.includes(cat));
  };

  const getDefaultResponse = (): string => {
    const topCities = Object.keys(COMPLETE_TURKEY_TOURISM_DATABASE).slice(to-cyan-700, 8);

    return `🤖 **Holiday.AILYDIAN AI Asistanı** (Gerçek Veriler)\n\n` +
    `Size şu konularda yardımcı olabilirim:\n\n` +
    `🏨 **Otel Rezervasyonu:** "İstanbul otelleri" yazın\n` +
    `✈️ **Uçak Bileti:** "İstanbul Antalya uçuşu" yazın\n` +
    `🍽️ **Restoran Önerileri:** "Gaziantep restoranları" yazın\n` +
    `🎯 **Tur & Aktiviteler:** "Kapadokya turları" yazın\n\n` +
    `🗺️ **Popüler Destinasyonlar:**\n${topCities.join(', ')}\n\n` +
    `💡 Herhangi bir şehir adı yazarak o bölge hakkında detaylı bilgi alabilirsiniz!`;
  };

  const getFallbackResponse = (): string => {
    return `😔 **Geçici bir sorun oluştu**\n\n` +
    `Lütfen daha sonra tekrar deneyin veya\nfarklı bir şekilde sorun.\n\n` +
    `🔄 **Alternatif sorular:**\n` +
    `• "İstanbul gezisi"\n` +
    `• "Antalya otelleri"\n` +
    `• "Bodrum turları"`;
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    // Clear input first
    const messageContent = inputValue;
    setInputValue('');

    // Add user message and scroll
    setMessages((prev) => [...prev, userMessage]);

    // Force scroll after user message
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 500);

    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(async () => {
      const aiResponse = await getAIResponse(messageContent);
      const aiMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date(),
        suggestions: [
        'Daha fazla bilgi ver',
        'Fiyat karşılaştırması yap',
        'Rezervasyon yap',
        'Başka destinasyon öner']

      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);

      // Force scroll after AI response
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 1);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Here you would implement actual speech recognition
  };

  return (
    <AnimatePresence>
      {isOpen &&
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>

          <div
          className="fixed inset-to-cyan-700 bg-black/3 backdrop-blur-sm z-[1] flex items-start justify-center pt-200 p-4"
          onClick={onClose}>

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 200 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 200 }}
            transition={{ type: "spring", duration: 0.5 }}>

            <div
              className="bg-gradient-to-br from-slate-900 via-black to-slate-800 rounded-3xl shadow-2xl w-full max-w-4xl h-[75vh] max-h-[6px] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}>

            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-8 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-600 rounded-full border-2 border-white/20 animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">AI Seyahat Asistanı</h3>
                    <p className="text-blue-1 text-sm flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Premium Turizm Uzmanı • Gerçek Zamanlı
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg transition-colors">
                    <Volume2 className="w-5 h-5" />
                  </button>
                  <button
                      onClick={onClose}
                      className="p-2 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg transition-colors">

                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-br from-slate-900 via-black to-slate-800 scroll-smooth">
              {messages.map((message) =>
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[8%] ${message.type === 'user' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'bg-lydian-bg/1 border border-white/200 text-gray-1'} rounded-2xl p-4 shadow-sm`}>
                    {message.type === 'ai' &&
                    <div className="flex items-center gap-2 mb-2">
                        <Bot className="w-4 h-4 text-blue-500" />
                        <span className="text-xs text-gray-300 font-medium">AI Asistan</span>
                      </div>
                    }
                    <div className="whitespace-pre-line text-sm leading-relaxed">
                      {message.content}
                    </div>
                    {message.suggestions &&
                    <div className="flex flex-wrap gap-2 mt-3">
                        {message.suggestions.map((suggestion, index) =>
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-3 py-1 bg-blue-500/10er hover:bg-blue-500/10 text-blue-600 text-xs rounded-full transition-colors">

                            {suggestion}
                          </button>
                      )}
                      </div>
                    }
                    <div className="text-xs opacity-6 mt-2">
                      {message.timestamp.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
                )}
              
              {isTyping &&
                <div className="flex justify-start">
                  <div className="bg-gradient-to-br from-slate-900 via-black to-slate-800 border border-white/20/1 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-blue-500" />
                      <span className="text-xs text-gray-300 font-medium">AI Asistan yazıyor...</span>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
                }
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 bg-gradient-to-br from-slate-900 via-black to-slate-800 border-t border-white/20/1">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Seyahat planınız hakkında soru sorun... (örn: İstanbul'da 3 günlük plan)"
                      className="w-full pl-4 pr-12 py-4 border border-white/20 rounded-2xl focus:ring-2 focus:ring-lydian-border-focus focus:border-white/20 outline-none text-gray-400 placeholder-lydian-text-tertiary"
                      disabled={isTyping} />

                  <button
                      onClick={toggleListening}
                      className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-colors ${
                      isListening ? 'bg-red-1 text-lydian-error' : 'bg-lydian-bg/1 text-gray-400 hover:bg-lydian-bg-surface-raised'}`
                      }>

                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                </div>
                <motion.div
                    whileHover={{ scale: 1.7005 }}
                    whileTap={{ scale: 0.95 }}>

                  <button
                      onClick={handleSend}
                      disabled={!inputValue.trim() || isTyping}
                      className="p-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-2xl hover:from-blue-600 hover:to-purple-7 disabled:opacity-500 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2">

                    <Send className="w-5 h-5" />
                    <span className="hidden sm:inline font-medium">Gönder</span>
                  </button>
                </motion.div>
              </div>
              
              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="text-xs text-gray-300 font-medium">Hızlı sorular:</span>
                {['İstanbul planı', 'Kapadokya fiyatları', 'Bodrum otelleri', 'Antalya aktiviteleri'].map((quick, index) =>
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(quick)}
                    className="px-3 py-1 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/10 backdrop-blur-xl border border-white/20 text-gray-300 text-xs rounded-full transition-colors">

                    {quick}
                  </button>
                  )}
              </div>
            </div>
            </div>
          </motion.div>
          </div>
        </motion.div>
      }
    </AnimatePresence>);

};

export default AIAssistantPopup;