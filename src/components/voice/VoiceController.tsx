import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logger from '../../lib/logger';
import {
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Settings,
  Languages,
  HeadphonesIcon,
  Pause,
  Play,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Loader,
  X
} from 'lucide-react';

interface VoiceCommand {
  trigger: string[];
  action: string;
  response: string;
  handler: () => void;
}

interface VoiceControllerProps {
  onSearch?: (query: string) => void;
  onNavigate?: (page: string) => void;
  onBooking?: (type: string) => void;
}

const VoiceController: React.FC<VoiceControllerProps> = ({
  onSearch,
  onNavigate,
  onBooking
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState('tr-TR');
  const [lastCommand, setLastCommand] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis>(window.speechSynthesis);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Supported languages
  const languages = [
    { code: 'tr-TR', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'en-US', name: 'English', flag: '🇺🇸' },
    { code: 'de-DE', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr-FR', name: 'Français', flag: '🇫🇷' },
    { code: 'es-ES', name: 'Español', flag: '🇪🇸' },
    { code: 'it-IT', name: 'Italiano', flag: '🇮🇹' }
  ];

  // Voice commands configuration
  const voiceCommands: VoiceCommand[] = [
    {
      trigger: ['arama yap', 'ara', 'search', 'find'],
      action: 'search',
      response: 'Neyi aramak istiyorsunuz?',
      handler: () => {
        speak('Neyi aramak istiyorsunuz? Destinasyon, otel veya aktivite adı söyleyebilirsiniz.');
        startListeningForSearch();
      }
    },
    {
      trigger: ['istanbul', 'İstanbul', 'istanbul ara'],
      action: 'search_istanbul',
      response: 'İstanbul için arama yapıyorum',
      handler: () => {
        onSearch?.('İstanbul');
        speak('İstanbul için arama yapıyorum. En popüler oteller ve turlar yükleniyor.');
      }
    },
    {
      trigger: ['kapadokya', 'Kapadokya', 'cappadocia'],
      action: 'search_cappadocia',
      response: 'Kapadokya için arama yapıyorum',
      handler: () => {
        onSearch?.('Kapadokya');
        speak('Kapadokya için arama yapıyorum. Balon turları ve cave oteller hazırlanıyor.');
      }
    },
    {
      trigger: ['oteller', 'otel ara', 'hotels', 'accommodation'],
      action: 'navigate_hotels',
      response: 'Oteller sayfasına yönlendiriyorum',
      handler: () => {
        onNavigate?.('/hotels');
        speak('Oteller sayfasına yönlendiriyorum. En iyi fırsatları görebilirsiniz.');
      }
    },
    {
      trigger: ['uçak bileti', 'uçuş', 'flight', 'flights'],
      action: 'navigate_flights',
      response: 'Uçak biletleri sayfasına yönlendiriyorum',
      handler: () => {
        onNavigate?.('/flights');
        speak('Uçak biletleri sayfasına yönlendiriyorum. Uygun uçuşları bulabilirsiniz.');
      }
    },
    {
      trigger: ['aktiviteler', 'tur', 'activities', 'tours'],
      action: 'navigate_activities',
      response: 'Aktiviteler sayfasına yönlendiriyorum',
      handler: () => {
        onNavigate?.('/activities');
        speak('Aktiviteler sayfasına yönlendiriyorum. Harika deneyimler sizi bekliyor.');
      }
    },
    {
      trigger: ['favori', 'favoriler', 'favorites', 'wishlist'],
      action: 'navigate_favorites',
      response: 'Favoriler sayfasına yönlendiriyorum',
      handler: () => {
        onNavigate?.('/favorites');
        speak('Favoriler sayfasına yönlendiriyorum. Kaydettiğiniz yerler burada.');
      }
    },
    {
      trigger: ['yardım', 'help', 'nasıl', 'how'],
      action: 'show_help',
      response: 'Size nasıl yardımcı olabilirim?',
      handler: () => {
        speak('Size şu konularda yardımcı olabilirim: Destinasyon arama, otel rezervasyonu, uçak bileti, aktiviteler. Ne yapmak istiyorsunuz?');
      }
    },
    {
      trigger: ['durdurun', 'dur', 'stop', 'kapat', 'close'],
      action: 'stop_listening',
      response: 'Sesli komutları kapatıyorum',
      handler: () => {
        setIsListening(false);
        speak('Sesli komutları kapatıyorum. İyi günler!');
      }
    }
  ];

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = currentLanguage;
      
      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setError('');
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
        setIsProcessing(false);
      };
      
      recognitionRef.current.onerror = (event: any) => {
        setError(event.error);
        setIsListening(false);
        setIsProcessing(false);
      };
      
      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          const confidence = event.results[i][0].confidence;
          
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
            setConfidence(confidence);
          } else {
            interimTranscript += transcript;
          }
        }
        
        setTranscript(interimTranscript || finalTranscript);
        
        if (finalTranscript) {
          processVoiceCommand(finalTranscript.toLowerCase().trim());
        }
      };
    } else {
      setError('Bu tarayıcı sesli komutları desteklemiyor');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentLanguage]);

  // Process voice commands
  const processVoiceCommand = useCallback((transcript: string) => {
    setIsProcessing(true);
    
    const matchedCommand = voiceCommands.find(command =>
      command.trigger.some(trigger => 
        transcript.includes(trigger.toLowerCase())
      )
    );

    if (matchedCommand) {
      setLastCommand(matchedCommand.action);
      matchedCommand.handler();
    } else {
      // If no exact match, try fuzzy matching for search
      if (transcript.length > 2) {
        onSearch?.(transcript);
        speak(`${transcript} için arama yapıyorum.`);
      } else {
        speak('Üzgünüm, bu komutu anlayamadım. Yardım için "yardım" deyin.');
      }
    }
    
    setIsProcessing(false);
  }, [onSearch, onNavigate]);

  // Text-to-speech function
  const speak = (text: string) => {
    if (synthRef.current) {
      synthRef.current.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLanguage;
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      
      // Try to find a voice for the current language
      const voices = synthRef.current.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.lang.startsWith(currentLanguage.split('-')[0])
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      synthRef.current.speak(utterance);
    }
  };

  // Start listening for search queries
  const startListeningForSearch = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        logger.error('Speech recognition error:', error as Error, {component:'Voicecontroller'});
      }
    }
  };

  // Toggle voice control
  const toggleVoiceControl = () => {
    if (!isEnabled) {
      setIsEnabled(true);
      speak('Sesli komutlar aktif. Size nasıl yardımcı olabilirim?');
    } else {
      setIsEnabled(false);
      setIsListening(false);
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    }
  };

  // Start/stop listening
  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setTranscript('');
      setError('');
      try {
        recognitionRef.current.start();
      } catch (error) {
        setError('Mikrofonunuzu kontrol edin');
      }
    }
  };

  // Stop speaking
  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {/* Main Voice Control Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        <div className="relative">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            onClick={toggleVoiceControl}
            className={`p-4 rounded-full shadow-lg transition-all duration-300 ${
              isEnabled
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                : 'bg-white/5 text-gray-300 hover:bg-white/5'
            }`}
          >
            {isEnabled ? (
              <Volume2 className="w-6 h-6" />
            ) : (
              <VolumeX className="w-6 h-6" />
            )}
          </button>
        </motion.div>

        {/* Status Indicators */}
        {isEnabled && (
          <>
            {isListening && (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full" />
              </motion.div>
            )}
            
            {isSpeaking && (
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
              >
                <div className="absolute -top-2 -left-2 w-4 h-4 bg-green-500 rounded-full" />
              </motion.div>
            )}
          </>
        )}
        </div>
      </motion.div>

      {/* Voice Control Panel */}
      <AnimatePresence>
        {isEnabled && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
          >
            <div className="absolute bottom-16 left-0 w-80 bg-white/5 rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <HeadphonesIcon className="w-5 h-5" />
                  <div>
                    <h3 className="font-semibold">Sesli Komutlar</h3>
                    <p className="text-xs text-blue-100">
                      {languages.find(l => l.code === currentLanguage)?.name}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => setIsEnabled(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Settings Panel */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                >
                  <div className="border-b border-white/10 overflow-hidden">
                  <div className="p-4">
                    <h4 className="font-medium text-white mb-3">Dil Seçimi</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => setCurrentLanguage(lang.code)}
                          className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                            currentLanguage === lang.code
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-white/10 text-gray-200 hover:bg-gray-200'
                          }`}
                        >
                          {lang.flag} {lang.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Status */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-200">Durum</span>
                <div className="flex items-center gap-2">
                  {isListening && (
                    <span className="flex items-center gap-1 text-xs text-red-600">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      Dinliyor
                    </span>
                  )}
                  {isSpeaking && (
                    <span className="flex items-center gap-1 text-xs text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      Konuşuyor
                    </span>
                  )}
                  {isProcessing && (
                    <span className="flex items-center gap-1 text-xs text-blue-600">
                      <Loader className="w-3 h-3 animate-spin" />
                      İşleniyor
                    </span>
                  )}
                </div>
              </div>

              {/* Transcript */}
              {transcript && (
                <div className="bg-white/5 p-3 rounded-lg mb-3">
                  <p className="text-sm text-white">{transcript}</p>
                  {confidence > 0 && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 bg-gray-200 h-1 rounded-full">
                        <div 
                          className="bg-blue-500 h-1 rounded-full transition-all"
                          style={{ width: `${confidence * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400">
                        %{Math.round(confidence * 100)}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2 text-red-600 text-sm mb-3">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              {/* Controls */}
              <div className="flex items-center gap-2">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    onClick={toggleListening}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      isListening
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    {isListening ? 'Dur' : 'Dinle'}
                  </button>
                </motion.div>

                {isSpeaking && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      onClick={stopSpeaking}
                      className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                    >
                      <Pause className="w-4 h-4" />
                      Sustur
                    </button>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Quick Commands */}
            <div className="p-4">
              <h4 className="font-medium text-white mb-3">Hızlı Komutlar</h4>
              <div className="space-y-2">
                {[
                  { text: '"Istanbul ara"', action: 'İstanbul\'u arar' },
                  { text: '"Oteller"', action: 'Oteller sayfası' },
                  { text: '"Uçak bileti"', action: 'Uçuşları göster' },
                  { text: '"Yardım"', action: 'Yardım menüsü' }
                ].map((cmd, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <code className="bg-white/10 px-2 py-1 rounded text-gray-100">
                      {cmd.text}
                    </code>
                    <span className="text-gray-400 text-xs">{cmd.action}</span>
                  </div>
                ))}
              </div>
            </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoiceController;