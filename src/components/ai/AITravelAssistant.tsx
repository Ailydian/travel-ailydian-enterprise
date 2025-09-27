import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Send, 
  Mic, 
  MicOff, 
  Camera, 
  Image as ImageIcon, 
  MapPin, 
  Calendar, 
  DollarSign,
  Users,
  Star,
  Sparkles,
  Brain,
  Zap,
  Globe,
  X,
  Minimize2,
  Maximize2,
  Volume2,
  VolumeX,
  Settings,
  Download,
  Share
} from 'lucide-react';
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';
import Webcam from 'react-webcam';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  metadata?: {
    confidence?: number;
    suggestions?: string[];
    actions?: Array<{
      type: 'search' | 'book' | 'navigate';
      label: string;
      data: any;
    }>;
    attachments?: Array<{
      type: 'image' | 'location' | 'itinerary';
      url?: string;
      data: any;
    }>;
  };
}

interface AIResponse {
  message: string;
  confidence: number;
  suggestions: string[];
  actions: Array<{
    type: 'search' | 'book' | 'navigate';
    label: string;
    data: any;
  }>;
  personalizedRecommendations?: Array<{
    type: 'destination' | 'hotel' | 'activity';
    name: string;
    score: number;
    reason: string;
  }>;
}

const AITravelAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: '👋 Merhaba! Ben AILYDIAN Travel AI asistanınızım. Size nasıl yardımcı olabilirim? İstanbul\'da gezilecek yerler, otel önerileri, ya da seyahat planlaması konularında size yardımcı olabilirim!',
      timestamp: new Date(),
      metadata: {
        confidence: 1.0,
        suggestions: [
          'İstanbul\'da 3 günlük gezi planı',
          'Kapadokya balon turu rezervasyonu', 
          'Antalya otelleri karşılaştır',
          'Bütçe dostu Avrupa rotası'
        ]
      }
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraRef, setCameraRef] = useState<Webcam | null>(null);
  const [conversationMode, setConversationMode] = useState<'text' | 'voice' | 'visual'>('text');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { speak, cancel: cancelSpeech, speaking, voices } = useSpeechSynthesis();
  const { listen, listening, stop: stopListening } = useSpeechRecognition({
    onResult: (result: string) => {
      setInputMessage(result);
      if (result.length > 5) {
        handleSendMessage(result);
      }
    }
  });

  // AI Response Simulation - In real app, this would call OpenAI API
  const generateAIResponse = async (userMessage: string, context?: any): Promise<AIResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Smart response generation based on keywords
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('istanbul') || lowerMessage.includes('istanbul')) {
      return {
        message: `İstanbul için harika bir seçim! 🏛️ Size özel olarak hazırladığım öneriler:\n\n🎯 **En Popüler Rotalar:**\n• Sultanahmet Camii → Ayasofya → Topkapı Sarayı\n• Galata Kulesi → Taksim → İstiklal Caddesi\n• Boğaziçi Turu → Çamlıca Tepesi\n\n🏨 **Premium Oteller:**\n• Çırağan Palace Kempinski (Lüks)\n• Four Seasons Sultanahmet (Tarihi)\n• Raffles Istanbul (Modern)\n\n💡 **Pro İpuçları:**\n• Müze geçidi alın (3 gün geçerli)\n• Yerel lezzetler: Balık ekmek, künefe, Türk kahvesi\n• En iyi fotoğraf zamanı: Gün batımı`,
        confidence: 0.95,
        suggestions: [
          'İstanbul 3 günlük detay plan',
          'En iyi İstanbul otelleri',
          'İstanbul ulaşım rehberi',
          'Yerel lezzetler haritası'
        ],
        actions: [
          { type: 'search', label: 'İstanbul Otelleri Ara', data: { destination: 'istanbul', type: 'hotels' } },
          { type: 'search', label: 'Müze Biletleri', data: { destination: 'istanbul', type: 'tickets' } },
          { type: 'navigate', label: 'Harita Göster', data: { lat: 41.0082, lng: 28.9784 } }
        ],
        personalizedRecommendations: [
          { type: 'destination', name: 'Sultanahmet Meydanı', score: 0.98, reason: 'Tarih severlerin favorisi' },
          { type: 'hotel', name: 'Çırağan Palace', score: 0.92, reason: 'Boğaz manzaralı lüks konaklama' },
          { type: 'activity', name: 'Boğaziçi Turu', score: 0.89, reason: 'Eşsiz manzara deneyimi' }
        ]
      };
    }
    
    if (lowerMessage.includes('kapadokya') || lowerMessage.includes('balon')) {
      return {
        message: `Kapadokya balon turu - mükemmel bir seçim! 🎈\n\n🌅 **Balon Turu Detayları:**\n• En iyi zaman: Nisan-Kasım arası\n• Uçuş süresi: 60-90 dakika\n• Fiyat aralığı: ₺800-2000\n• Rezervasyon: 48 saat önceden\n\n🏨 **Önerilen Oteller:**\n• Argos in Cappadocia (Cave Hotel)\n• Sultan Cave Suites (Manzaralı)\n• Kelebek Special Cave Hotel (Bütçe dostu)\n\n📸 **Fotoğraf İpuçları:**\n• Sunrise flight tercih edin\n• GoPro veya geniş açı lens kullanın\n• Güvenlik talimatlarına uyun`,
        confidence: 0.93,
        suggestions: [
          'Balon turu rezervasyon',
          'Kapadokya cave otel önerileri',
          'Jeep safari + balon paketi',
          'Kapadokya hava durumu'
        ],
        actions: [
          { type: 'book', label: 'Balon Turu Rezerve Et', data: { service: 'balloon-tour', location: 'cappadocia' } },
          { type: 'search', label: 'Cave Oteller', data: { destination: 'cappadocia', type: 'cave-hotels' } }
        ]
      };
    }
    
    // Default intelligent response
    return {
      message: `Anlıyorum! "${userMessage}" konusunda size yardımcı olmaktan mutluluk duyarım. 🤖\n\nSize daha spesifik öneriler verebilmem için lütfen bana şunları söyleyin:\n\n📍 **Nereyi ziyaret etmek istiyorsunuz?**\n📅 **Seyahat tarihiniz nedir?**\n💰 **Bütçeniz ne kadar?**\n👥 **Kaç kişi seyahat edeceksiniz?**\n\nBu bilgiler ile size kişiselleştirilmiş öneriler hazırlayabilirim!`,
      confidence: 0.75,
      suggestions: [
        'Popüler destinasyonlar',
        'Bütçe dostu seyahat ipuçları',
        'Aile seyahatleri önerileri',
        'Macera turları'
      ],
      actions: [
        { type: 'search', label: 'Popüler Destinasyonlar', data: { type: 'popular-destinations' } },
        { type: 'navigate', label: 'Seyahat Planlayıcı', data: { page: 'trip-planner' } }
      ]
    };
  };

  const handleSendMessage = async (message: string = inputMessage) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const aiResponse = await generateAIResponse(message);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse.message,
        timestamp: new Date(),
        metadata: {
          confidence: aiResponse.confidence,
          suggestions: aiResponse.suggestions,
          actions: aiResponse.actions
        }
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Text-to-speech for AI response
      if (isVoiceEnabled && !speaking) {
        const cleanText = aiResponse.message.replace(/[🎯🏛️🎈🌅🏨📸💡📍📅💰👥🤖]/g, '').replace(/\*\*/g, '');
        speak(cleanText);
      }
      
    } catch (error) {
      console.error('AI Response Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Üzgünüm, şu anda bir teknik sorun yaşıyorum. Lütfen daha sonra tekrar deneyin. 🔧',
        timestamp: new Date(),
        metadata: {
          confidence: 0.0,
          suggestions: ['Tekrar deneyin', 'Destek ile iletişim']
        }
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const capturePhoto = async () => {
    if (!cameraRef) return;
    
    const imageSrc = cameraRef.getScreenshot();
    if (imageSrc) {
      // Here you would typically send the image to an AI vision service
      const analysisMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: `📸 Fotoğrafınızı analiz ediyorum...\n\n🔍 **Tespit Edilen Özellikler:**\n• Lokasyon: Muhtemelen bir tarihi alan\n• Mimari: Osmanlı/Bizans tarzı\n• Öneriler: Yakındaki müzeler ve restoranlar\n\n💡 Bu lokasyon hakkında daha fazla bilgi ister misiniz?`,
        timestamp: new Date(),
        metadata: {
          confidence: 0.88,
          suggestions: ['Yakın müzeler', 'Restoran önerileri', 'Tarihi bilgiler'],
          attachments: [{ type: 'image', url: imageSrc, data: {} }]
        }
      };
      
      setMessages(prev => [...prev, analysisMessage]);
      setShowCamera(false);
    }
  };

  const handleActionClick = (action: any) => {
    switch (action.type) {
      case 'search':
        console.log('Navigating to search:', action.data);
        // Navigate to search results
        break;
      case 'book':
        console.log('Opening booking:', action.data);
        // Open booking modal
        break;
      case 'navigate':
        console.log('Navigating to:', action.data);
        // Navigate to specified page/location
        break;
    }
  };

  const exportConversation = () => {
    const conversationData = {
      timestamp: new Date().toISOString(),
      messages: messages.map(m => ({
        type: m.type,
        content: m.content,
        timestamp: m.timestamp.toISOString()
      }))
    };
    
    const blob = new Blob([JSON.stringify(conversationData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `travel-conversation-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ duration: 0.3 }}
            style={{
              width: 384, // w-96
              height: 600,
              backgroundColor: 'white',
              borderRadius: '1rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid #e5e7eb',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            } as any}
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <Bot className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-semibold">AILYDIAN AI</h3>
                    <p className="text-sm text-blue-100">Travel Assistant</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
                  >
                    {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </button>
                  
                  <button
                    onClick={exportConversation}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => setIsMinimized(true)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Mode Selector */}
              <div className="flex gap-1 mt-3">
                {[
                  { key: 'text', icon: Bot, label: 'Metin' },
                  { key: 'voice', icon: Mic, label: 'Ses' },
                  { key: 'visual', icon: Camera, label: 'Görsel' }
                ].map((mode) => {
                  const Icon = mode.icon;
                  return (
                    <button
                      key={mode.key}
                      onClick={() => setConversationMode(mode.key as any)}
                      className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors flex flex-col items-center ${
                        conversationMode === mode.key
                          ? 'bg-white text-purple-600'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <Icon className="w-3 h-3 mb-1" />
                      {mode.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-premium">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: 'flex',
                    justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                    
                    {/* AI Confidence & Suggestions */}
                    {message.type === 'ai' && message.metadata && (
                      <div className="mt-3 space-y-2">
                        {message.metadata.confidence && (
                          <div className="flex items-center gap-2">
                            <Brain className="w-3 h-3 text-purple-600" />
                            <div className="text-xs text-gray-600">
                              Güven: %{Math.round(message.metadata.confidence * 100)}
                            </div>
                          </div>
                        )}
                        
                        {/* Quick Actions */}
                        {message.metadata.actions && (
                          <div className="flex flex-wrap gap-1">
                            {message.metadata.actions.map((action, index) => (
                              <button
                                key={index}
                                onClick={() => handleActionClick(action)}
                                className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-lg hover:bg-purple-200 transition-colors"
                              >
                                {action.label}
                              </button>
                            ))}
                          </div>
                        )}
                        
                        {/* Suggestions */}
                        {message.metadata.suggestions && (
                          <div className="space-y-1">
                            <p className="text-xs text-gray-500">Öneriler:</p>
                            {message.metadata.suggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                onClick={() => handleSendMessage(suggestion)}
                                className="block w-full text-left px-2 py-1 text-xs text-gray-600 hover:bg-gray-200 rounded transition-colors"
                              >
                                💡 {suggestion}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {/* Loading Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ display: 'flex', justifyContent: 'flex-start' }}
                >
                  <div className="bg-gray-100 p-3 rounded-2xl">
                    <div className="flex space-x-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                          style={{
                            width: '8px',
                            height: '8px',
                            backgroundColor: '#9333EA',
                            borderRadius: '50%'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Camera View */}
            {showCamera && conversationMode === 'visual' && (
              <div className="absolute inset-0 bg-black z-10">
                <div className="relative w-full h-full">
                  <Webcam
                    ref={setCameraRef}
                    className="w-full h-full object-cover"
                    screenshotFormat="image/jpeg"
                  />
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                    <button
                      onClick={capturePhoto}
                      className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                    >
                      <Camera className="w-6 h-6 text-gray-900" />
                    </button>
                    <button
                      onClick={() => setShowCamera(false)}
                      className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                    >
                      <X className="w-6 h-6 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2">
                {conversationMode === 'voice' ? (
                  <button
                    onClick={() => listening ? stopListening() : listen()}
                    className={`flex-1 p-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${
                      listening
                        ? 'bg-red-500 text-white'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}
                  >
                    {listening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    {listening ? 'Dinleniyor...' : 'Sesle Konuş'}
                  </button>
                ) : conversationMode === 'visual' ? (
                  <button
                    onClick={() => setShowCamera(!showCamera)}
                    className="flex-1 p-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Camera className="w-4 h-4" />
                    {showCamera ? 'Kamerayı Kapat' : 'Kamerayı Aç'}
                  </button>
                ) : (
                  <>
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                      placeholder="Seyahat planlarınızı sorun..."
                      className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      disabled={isLoading}
                    />
                    <button
                      onClick={() => handleSendMessage()}
                      disabled={isLoading || !inputMessage.trim()}
                      className="p-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized State */}
      <AnimatePresence>
        {isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1, y: -5 }}
            style={{ cursor: 'pointer' }}
          >
            <button
              onClick={() => setIsMinimized(false)}
              style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(to right, #9333ea, #2563eb)',
                borderRadius: '50%',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                position: 'relative',
                cursor: 'pointer',
                border: 'none'
              }}
            >
              <div style={{
                width: '100%',
                height: '100%', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <Bot className="w-6 h-6" />
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  width: '16px',
                  height: '16px',
                  backgroundColor: '#4ade80',
                  borderRadius: '50%',
                  border: '2px solid white'
                }}
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AITravelAssistant;