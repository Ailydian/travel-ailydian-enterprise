import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  X,
  Send,
  Mic,
  MicOff,
  Sparkles,
  Volume2
} from 'lucide-react';

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
      content: 'Merhaba! Ben Travel.Ailydian AI asistanınızım. 🌟\n\nSize nasıl yardımcı olabilirim? Türkiye\'nin en güzel destinasyonları, oteller, aktiviteler ve seyahat planlaması hakkında her şeyi sorabilirsiniz!',
      timestamp: new Date(),
      suggestions: [
        'İstanbul\'da 3 günlük bir plan öner',
        'Kapadokya balon turu fiyatları',
        'Bodrum\'da en iyi oteller',
        'Antalya\'da yapılacak aktiviteler'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  // Premium AI responses for Turkish tourism
  const getAIResponse = async (userMessage: string): Promise<string> => {
    const message = userMessage.toLowerCase();
    
    // İstanbul related
    if (message.includes('istanbul') || message.includes('İstanbul')) {
      return `🏛️ **İstanbul için harika önerilerim var!**\n\n📍 **3 Günlük Premium Plan:**\n\n**1. Gün - Tarihi Yarımada:**\n• Ayasofya Müzesi (09:00-11:00)\n• Sultanahmet Camii (11:15-12:00)\n• Kapalıçarşı alışverişi (14:00-16:00)\n• AI rehberli Boğaz turu (18:00-20:00) - ₺120\n\n**2. Gün - Modern İstanbul:**\n• Galata Kulesi (10:00-11:30)\n• Taksim-Beyoğlu gezisi (12:00-15:00)\n• Blockchain şehir turu (16:00-20:00) - ₺240\n\n**3. Gün - Bosphorus:**\n• Dolmabahçe Sarayı (09:00-11:00)\n• Ortaköy ve Bebek (12:00-14:00)\n• VR destekli teknoloji müzesi (15:00-17:00)\n\n💰 **Toplam tahmini bütçe:** ₺1,500-2,000 kişi başı\n⭐ **En çok tavsiye edilen:** AI rehberli Boğaz turu!`;
    }
    
    // Kapadokya related
    if (message.includes('kapadokya') || message.includes('balon')) {
      return `🎈 **Kapadokya Balon Turu - Premium Deneyim!**\n\n**VR Teknolojili Balon Turu:**\n• Fiyat: ₺320 (Normal: ₺400)\n• Süre: 3 saat\n• Gündoğumu uçuşu\n• VR deneyimi eklentisi\n• Şampanyalı kahvaltı dahil\n• Otel transferi dahil\n\n⭐ Rating: 4.9/5 (1,856 değerlendirme)\n\n**En İyi Zamanlar:**\n• Nisan-Haziran: Mükemmel hava\n• Eylül-Kasım: Altın mevsim\n• Rezervasyon: 3 gün önceden\n\n**Ek Öneriler:**\n• Peri bacaları trekking\n• Yeraltı şehri turu\n• Göreme Açık Hava Müzesi\n\n🚁 **VIP Seçenek:** Helikopter turu da mevcut!`;
    }
    
    // Bodrum related
    if (message.includes('bodrum')) {
      return `🏖️ **Bodrum - Eğlence Başkenti!**\n\n**En İyi Oteller:**\n• Four Seasons Bodrum - ₺3,500/gece\n• Mandarin Oriental - ₺4,200/gece\n• Bodrum EDITION - ₺2,800/gece\n\n**Gece Hayatı & Marina Turu:**\n• Fiyat: ₺85 (Normal: ₺110)\n• Süre: 4 saat\n• VIP giriş dahil\n• Welcome drinks\n• Marina turu\n• En iyi gece kulüpleri\n\n⭐ Rating: 4.8/5\n\n**Aktiviteler:**\n• Sualtı dalma - ₺180\n• Tekne partisi\n• Antik tiyatro gezisi\n• Su sporları\n\n🌊 **Premium Tip:** Yazlık sezon için erken rezervasyon yapın!`;
    }
    
    // Antalya related  
    if (message.includes('antalya')) {
      return `🌅 **Antalya - Akdeniz İncisi!**\n\n**Yapılacak Aktiviteler:**\n\n🏛️ **Kültürel:**\n• Aspendos Antik Tiyatrosu\n• Perge Antik Kenti\n• Kaleiçi tarihi merkez\n\n🌊 **Su Sporları:**\n• Sualtı dalma - ₺180 (5 saat)\n• Rafting turu - ₺220\n• Yamaç paraşütü - ₺450\n• Tekne turu - ₺120\n\n🏨 **En İyi Resortlar:**\n• Antalya Beach Resort - ₺1,200/gece\n• Rixos Premium - ₺2,100/gece\n• Regnum Carya - ₺1,800/gece\n\n⛰️ **Doğa:**\n• Düden Şelalesi\n• Köprülü Kanyon\n• Olympos Antik Kenti\n\n🎯 **Premium Paket:** 5 gün 4 gece all-inclusive!`;
    }
    
    // General travel advice
    if (message.includes('plan') || message.includes('öneri')) {
      return `✨ **Kişiselleştirilmiş Seyahat Planı Önerisi:**\n\n🎯 **Size Özel AI Analiz:**\n\n📊 **En Popüler Destinasyonlar:**\n1. İstanbul (⭐4.8) - Kültür + Teknoloji\n2. Kapadokya (⭐4.9) - Doğa + Macera\n3. Antalya (⭐4.7) - Deniz + Tarih\n4. Bodrum (⭐4.8) - Eğlence + Lüks\n\n💡 **Akıllı Öneriler:**\n• Blockchain ödemelerle güvenli rezervasyon\n• VR önizleme ile destinasyonları keşfedin\n• AI rehberli turlar ile derinlemesine deneyim\n\n🎁 **Özel Fırsatlar:**\n• Erken rezervasyon %25 indirim\n• Premium üyelik avantajları\n• NFT seyahat anıları\n\n🤖 Hangi destinasyon daha detaylı bilgi istiyorsunuz?`;
    }
    
    // Default response
    return `🤖 **AI Asistanınız her zaman burada!**\n\nSize şu konularda yardımcı olabilirim:\n\n🏛️ **Destinasyon Önerileri**\n• İstanbul, Kapadokya, Antalya, Bodrum\n• Gizli cennetler ve yerel deneyimler\n\n🎯 **Aktivite Planlaması**\n• AI rehberli turlar\n• VR destekli deneyimler\n• Blockchain seyahat teknolojisi\n\n🏨 **Rezervasyon Yardımı**\n• En iyi fiyat garantisi\n• Premium otel önerileri\n• Anlık onay sistemi\n\n💎 **VIP Hizmetler**\n• Özel tur düzenlemeleri\n• Lüks transfer hizmetleri\n• Kişiselleştirilmiş deneyimler\n\nHangi konuda detaylı bilgi istiyorsunuz? 😊`;
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(async () => {
      const aiResponse = await getAIResponse(userMessage.content);
      const aiMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date(),
        suggestions: [
          'Daha fazla bilgi ver',
          'Fiyat karşılaştırması yap', 
          'Rezervasyon yap',
          'Başka destinasyon öner'
        ]
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
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
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100] flex items-start justify-center pt-20 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl h-[75vh] max-h-[600px] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">AI Seyahat Asistanı</h3>
                    <p className="text-blue-100 text-sm flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Premium Turizm Uzmanı • Gerçek Zamanlı
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                    <Volume2 className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={onClose}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 border border-gray-300 text-gray-800'} rounded-2xl p-4 shadow-sm`}>
                    {message.type === 'ai' && (
                      <div className="flex items-center gap-2 mb-2">
                        <Bot className="w-4 h-4 text-blue-600" />
                        <span className="text-xs text-gray-500 font-medium">AI Asistan</span>
                      </div>
                    )}
                    <div className="whitespace-pre-line text-sm leading-relaxed">
                      {message.content}
                    </div>
                    {message.suggestions && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs rounded-full transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                    <div className="text-xs opacity-60 mt-2">
                      {message.timestamp.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-blue-600" />
                      <span className="text-xs text-gray-500 font-medium">AI Asistan yazıyor...</span>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 bg-white border-t border-gray-200">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Seyahat planınız hakkında soru sorun... (örn: İstanbul'da 3 günlük plan)"
                    className="w-full pl-4 pr-12 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-800 placeholder-gray-500"
                    disabled={isTyping}
                  />
                  <button
                    onClick={toggleListening}
                    className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-colors ${
                      isListening ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  <span className="hidden sm:inline font-medium">Gönder</span>
                </motion.button>
              </div>
              
              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="text-xs text-gray-500 font-medium">Hızlı sorular:</span>
                {['İstanbul planı', 'Kapadokya fiyatları', 'Bodrum otelleri', 'Antalya aktiviteleri'].map((quick, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(quick)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-full transition-colors"
                  >
                    {quick}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIAssistantPopup;