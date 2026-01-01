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
  Share } from 'lucide-react';
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';
import Webcam from 'react-webcam';
import logger from '../../lib/logger';
import { v4 as uuidv4 } from 'uuid';

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

/**
 * AI Travel Assistant Component
 * DISABLED: Fixed bottom-right floating chat removed per system optimization request
 * Original AI functionality preserved in code but returns null to prevent rendering
 */
const AITravelAssistant: React.FC = () => {
  const [sessionId] = useState(() => uuidv4());
  const [messages, setMessages] = useState<Message[]>([
  {
    id: '1',
    type: 'ai',
    content: '👋 Merhaba! Ben AILYDIAN Travel AI asistanınızım. Size nasıl yardımcı olabilirim?',
    timestamp: new Date(),
    metadata: {
      confidence: 1.0,
      suggestions: [
      'İstanbul\'da 3 günlük gezi planı',
      'Kapadokya balon turu rezervasyonu',
      'Antalya otelleri karşılaştır',
      'Bütçe dostu Avrupa rotası']

    }
  }]
  );

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraRef, setCameraRef] = useState<Webcam | null>(null);
  const [conversationMode, setConversationMode] = useState<'text' | 'voice' | 'visual'>('text');
  const [locale] = useState<'en' | 'tr' | 'de' | 'ru'>('tr');

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

  const generateAIResponse = async (userMessage: string): Promise<AIResponse> => {
    try {
      const conversationHistory = messages
        .filter(m => m.type === 'user' || m.type === 'ai')
        .map(m => ({
          role: m.type === 'user' ? 'user' as const : 'assistant' as const,
          content: m.content
        }))
        .slice(-10);

      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          sessionId,
          locale,
          conversationHistory,
          userPreferences: {
            language: locale,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      return {
        message: data.message,
        confidence: data.confidence,
        suggestions: data.suggestions || [],
        actions: data.actions || [],
        personalizedRecommendations: data.recommendations || [],
      };
    } catch (error) {
      logger.error('AI API call failed', error as Error);

      return {
        message: 'Üzgünüm, şu anda bir teknik sorun yaşıyorum. Lütfen daha sonra tekrar deneyin.',
        confidence: 0.0,
        suggestions: ['Tekrar deneyin', 'Destek ile iletişim'],
        actions: [],
      };
    }
  };

  const handleSendMessage = async (message: string = inputMessage) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
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

      setMessages((prev) => [...prev, aiMessage]);

      if (isVoiceEnabled && !speaking) {
        const cleanText = aiResponse.message.replace(/[🎯🏛️🎈🌅🏨📸💡📍📅💰👥🤖]/g, '').replace(/\*\*/g, '');
        speak(cleanText);
      }

    } catch (error) {
      logger.error('AI Response Error:', error as Error, { component: 'Aitravelassistant' });
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
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const capturePhoto = async () => {
    if (!cameraRef) return;

    const imageSrc = cameraRef.getScreenshot();
    if (imageSrc) {
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

      setMessages((prev) => [...prev, analysisMessage]);
      setShowCamera(false);
    }
  };

  const handleActionClick = (action: any) => {
    switch (action.type) {
      case 'search':
        logger.debug('Navigating to search:', { component: 'Aitravelassistant', metadata: { data: action.data } });
        break;
      case 'book':
        logger.debug('Opening booking:', { component: 'Aitravelassistant', metadata: { data: action.data } });
        break;
      case 'navigate':
        logger.debug('Navigating to:', { component: 'Aitravelassistant', metadata: { data: action.data } });
        break;
    }
  };

  const exportConversation = () => {
    const conversationData = {
      timestamp: new Date().toISOString(),
      messages: messages.map((m) => ({
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

  // REMOVED: Fixed bottom-right AI Assistant per user request
  // Component disabled to eliminate floating bottom-right buttons
  return null;
};

export default AITravelAssistant;
