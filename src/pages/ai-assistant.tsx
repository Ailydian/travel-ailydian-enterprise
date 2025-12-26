import React, { useState, useRef, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  Send,
  Mic,
  MapPin,
  Calendar,
  Users,
  Plane,
  Building,
  Star,
  Sparkles,
  Brain,
  Clock,
  Globe,
  Camera,
  Coffee,
  Car,
  Heart,
  TrendingUp,
  Zap
} from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  suggestions?: string[];
}

interface TravelSuggestion {
  type: 'destination' | 'activity' | 'hotel' | 'flight';
  title: string;
  subtitle: string;
  price?: string;
  rating?: number;
  image: string;
  highlights: string[];
}

const AIAssistantPage: NextPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Merhaba! Ben Travel LyDian AI asistanınızım. Size mükemmel bir seyahat planı hazırlamak için buradayım. Nereye gitmek istiyorsunuz ve hangi tür deneyimler arıyorsunuz?",
      sender: 'ai',
      timestamp: new Date(),
      suggestions: [
        "İstanbul'da 3 gün geçirmek istiyorum",
        "Kapadokya için romantik bir hafta sonu planı",
        "Aile ile Antalya tatili önerileri",
        "Kış sporları için destinasyon öner"
      ]
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const aiFeatures = [
    {
      icon: Brain,
      title: "Akıllı Planlama",
      description: "Kişisel tercihlerinize göre optimize edilmiş seyahat rotaları"
    },
    {
      icon: Globe,
      title: "Gerçek Zamanlı Bilgiler",
      description: "Hava durumu, trafik ve etkinlik güncellemeleri"
    },
    {
      icon: TrendingUp,
      title: "Dinamik Fiyatlandırma",
      description: "En uygun fiyatları yakalar ve size önerir"
    },
    {
      icon: Heart,
      title: "Kişisel Öneriler",
      description: "Geçmiş seyahatlerinizden öğrenerek daha iyi öneriler"
    }
  ];

  const quickActions = [
    { icon: MapPin, label: "Destinasyon Öner", query: "Bana yeni bir destinasyon öner" },
    { icon: Calendar, label: "Tarih Planla", query: "En uygun seyahat tarihini söyle" },
    { icon: Plane, label: "Uçuş Ara", query: "En ucuz uçak biletlerini bul" },
    { icon: Building, label: "Otel Bul", query: "Bütçeme uygun otel öner" },
    { icon: Star, label: "Aktivite Öner", query: "Özel aktiviteler öner" },
    { icon: Coffee, label: "Yerel Lezzetler", query: "Yerel restoran ve lezzetleri söyle" }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: generateAIResponse(newMessage),
        sender: 'ai',
        timestamp: new Date(),
        suggestions: generateSuggestions(newMessage)
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      "Harika bir seçim! Bu destinasyon için size özel bir plan hazırlayabilirim. Hangi tarihler arasında seyahat etmeyi planlıyorsunuz?",
      "Bu konuda size yardımcı olabilirim! Bütçeniz ve grup büyüklüğünüz hakkında bilgi verebilir misiniz?",
      "Mükemmel! Size en uygun seçenekleri bulmak için birkaç soru sormam gerekiyor. Konaklama tercihiniz nedir?",
      "Size özel öneriler hazırlıyorum! Macera sporları mı yoksa kültürel geziler mi tercih edersiniz?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateSuggestions = (userMessage: string): string[] => {
    const suggestionSets = [
      ["5-7 gün arası", "10 günden fazla", "Sadece hafta sonu", "Esnek tarihlerim var"],
      ["1000₺ altı", "1000-3000₺ arası", "3000₺ üzeri", "Bütçem yok"],
      ["Lüks oteller", "Butik oteller", "Ekonomik seçenekler", "Özel villalar"],
      ["Macera sporları", "Kültürel geziler", "Gastronomi turları", "Rahatlama tatili"]
    ];
    return suggestionSets[Math.floor(Math.random() * suggestionSets.length)];
  };

  const handleSuggestionClick = (suggestion: string) => {
    setNewMessage(suggestion);
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice recognition implementation would go here
  };

  const travelSuggestions: TravelSuggestion[] = [
    {
      type: 'destination',
      title: 'Kapadokya Balon Turu',
      subtitle: 'Nevşehir, Türkiye',
      price: '₺450',
      rating: 4.9,
      image: '/images/cappadocia.jpg',
      highlights: ['Gündoğumu', 'Sıcak hava balonu', 'UNESCO']
    },
    {
      type: 'hotel',
      title: 'Ciragan Palace Kempinski',
      subtitle: 'İstanbul, Beşiktaş',
      price: '₺2,500/gece',
      rating: 4.8,
      image: '/images/ciragan.jpg',
      highlights: ['Boğaz manzarası', 'Lüks spa', 'Tarihi saray']
    },
    {
      type: 'activity',
      title: 'Pamukkale Termal Turları',
      subtitle: 'Denizli, Türkiye',
      price: '₺195',
      rating: 4.6,
      image: '/images/pamukkale.jpg',
      highlights: ['Beyaz travertenler', 'Antik Hierapolis', 'Termal havuz']
    }
  ];

  return (
    <>
      <Head>
        <title>AI Asistan - Travel LyDian</title>
        <meta name="description" content="Yapay zeka destekli seyahat asistanı ile mükemmel tatil planları oluşturun. Kişiselleştirilmiş öneriler ve akıllı planlama." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <div className="bg-transparent shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#667EEA] via-[#764BA2] to-[#667EEA] rounded-full flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white">AI Seyahat Asistanı</h1>
              </div>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Yapay zeka destekli asistanınız ile mükemmel seyahat planları oluşturun. 
                Size özel öneriler alın ve hayalinizdeki tatili planlayın.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chat Interface */}
            <div className="lg:col-span-2 bg-transparent rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-[#667EEA] via-[#764BA2] to-[#667EEA] text-white p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Travel AI Assistant</h3>
                    <p className="text-sm opacity-90">Her zaman aktif • Türkçe destekli</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                        message.sender === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-white'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-2 ${
                          message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString('tr-TR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* AI Suggestions */}
                {messages[messages.length - 1]?.sender === 'ai' && 
                 messages[messages.length - 1]?.suggestions && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex flex-wrap gap-2">
                    {messages[messages.length - 1].suggestions?.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-sm transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                    </div>
                  </motion.div>
                )}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="flex justify-start">
                    <div className="bg-white/10 px-4 py-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t p-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Seyahat planınız için bir şeyler yazın..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <button
                    onClick={handleVoiceInput}
                    className={`p-3 rounded-xl transition-colors ${
                      isListening 
                        ? 'bg-red-500 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-300'
                    }`}
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-xl transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>

                {/* Quick Actions */}
                <div className="mt-4">
                  <p className="text-sm text-gray-300 mb-2">Hızlı Eylemler:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickActions.map((action, index) => {
                      const Icon = action.icon;
                      return (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(action.query)}
                          className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-gray-100 rounded-lg text-sm transition-colors"
                        >
                          <Icon className="w-4 h-4" />
                          {action.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* AI Features */}
              <div className="bg-transparent rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  AI Özellikleri
                </h3>
                <div className="space-y-4">
                  {aiFeatures.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{feature.title}</h4>
                          <p className="text-sm text-gray-300">{feature.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* AI Suggestions */}
              <div className="bg-transparent rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-white mb-4">AI Önerileri</h3>
                <div className="space-y-4">
                  {travelSuggestions.map((suggestion, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="aspect-[3/2] bg-gradient-to-r from-blue-400 to-purple-500"></div>
                      <div className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm">{suggestion.title}</h4>
                          {suggestion.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs">{suggestion.rating}</span>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-gray-300 mb-2">{suggestion.subtitle}</p>
                        {suggestion.price && (
                          <p className="font-bold text-blue-600 text-sm">{suggestion.price}</p>
                        )}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {suggestion.highlights.slice(0, 2).map((highlight, idx) => (
                            <span key={idx} className="bg-white/10 text-gray-300 px-2 py-1 rounded text-xs">
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIAssistantPage;