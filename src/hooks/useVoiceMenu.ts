import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';

// Voice command types
export interface VoiceCommand {
  patterns: string[];
  action: () => void;
  description: string;
  category: 'navigation' | 'search' | 'action';
}

export interface VoiceMenuState {
  isListening: boolean;
  isSupported: boolean;
  transcript: string;
  confidence: number;
  error: string | null;
  lastCommand: string | null;
  suggestions: string[];
}

export const useVoiceMenu = () => {
  const router = useRouter();
  const [state, setState] = useState<VoiceMenuState>({
    isListening: false,
    isSupported: false,
    transcript: '',
    confidence: 0,
    error: null,
    lastCommand: null,
    suggestions: []
  });

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Voice commands configuration for travel website
  const voiceCommands: VoiceCommand[] = [
    // Navigation commands
    {
      patterns: ['anasayfa', 'ana sayfa', 'home', 'anasayfaya git', 'eve git'],
      action: () => router.push('/'),
      description: 'Anasayfaya git',
      category: 'navigation'
    },
    {
      patterns: ['oteller', 'otel ara', 'konaklama', 'hotels'],
      action: () => router.push('/hotels'),
      description: 'Oteller sayfasına git',
      category: 'navigation'
    },
    {
      patterns: ['uçak bileti', 'uçak ara', 'flights', 'uçuş ara'],
      action: () => router.push('/flights'),
      description: 'Uçak biletleri sayfasına git',
      category: 'navigation'
    },
    {
      patterns: ['araç kiralama', 'rent a car', 'araba kirala', 'car rental'],
      action: () => router.push('/car-rental'),
      description: 'Araç kiralama sayfasına git',
      category: 'navigation'
    },
    {
      patterns: ['deneyimler', 'aktiviteler', 'experiences', 'turlar'],
      action: () => router.push('/experiences'),
      description: 'Deneyimler sayfasına git',
      category: 'navigation'
    },
    {
      patterns: ['blog', 'blog yazıları', 'seyahat rehberi'],
      action: () => router.push('/blog'),
      description: 'Blog sayfasına git',
      category: 'navigation'
    },
    {
      patterns: ['profil', 'hesabım', 'profile', 'dashboard'],
      action: () => router.push('/profile/dashboard'),
      description: 'Profil sayfasına git',
      category: 'navigation'
    },
    // Search commands
    {
      patterns: ['istanbul ara', 'istanbul otelleri', 'istanbul turu'],
      action: () => router.push('/search?destination=istanbul'),
      description: 'İstanbul\'da ara',
      category: 'search'
    },
    {
      patterns: ['antalya ara', 'antalya otelleri', 'antalya turu'],
      action: () => router.push('/search?destination=antalya'),
      description: 'Antalya\'da ara',
      category: 'search'
    },
    {
      patterns: ['kapadokya ara', 'kapadokya otelleri', 'kapadokya turu'],
      action: () => router.push('/search?destination=kapadokya'),
      description: 'Kapadokya\'da ara',
      category: 'search'
    },
    {
      patterns: ['bodrum ara', 'bodrum otelleri', 'bodrum turu'],
      action: () => router.push('/search?destination=bodrum'),
      description: 'Bodrum\'da ara',
      category: 'search'
    },
    // Action commands
    {
      patterns: ['sepet', 'sepetim', 'cart', 'alışveriş sepeti'],
      action: () => router.push('/cart'),
      description: 'Sepeti göster',
      category: 'action'
    },
    {
      patterns: ['yardım', 'help', 'nasıl kullanırım', 'komutlar'],
      action: () => showVoiceHelp(),
      description: 'Sesli komutları göster',
      category: 'action'
    },
    {
      patterns: ['dil değiştir', 'language', 'english', 'türkçe'],
      action: () => toggleLanguage(),
      description: 'Dili değiştir',
      category: 'action'
    }
  ];

  // Check browser support on mount
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    const speechSynthesis = window.speechSynthesis;

    if (SpeechRecognition && speechSynthesis) {
      setState(prev => ({ ...prev, isSupported: true }));
      synthRef.current = speechSynthesis;
      
      // Initialize recognition
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'tr-TR';
      recognition.maxAlternatives = 1;

      recognitionRef.current = recognition;
    } else {
      setState(prev => ({ 
        ...prev, 
        isSupported: false,
        error: 'Bu tarayıcı sesli komutları desteklemiyor'
      }));
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  // Setup recognition event handlers
  useEffect(() => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    recognition.onstart = () => {
      setState(prev => ({ 
        ...prev, 
        isListening: true, 
        error: null,
        transcript: '',
        suggestions: getRandomSuggestions()
      }));
    };

    recognition.onend = () => {
      setState(prev => ({ ...prev, isListening: false }));
    };

    recognition.onerror = (event) => {
      let errorMessage = 'Sesli komut hatası';
      
      switch (event.error) {
        case 'no-speech':
          errorMessage = 'Ses algılanamadı. Lütfen tekrar deneyin.';
          break;
        case 'audio-capture':
          errorMessage = 'Mikrofon erişimi reddedildi.';
          break;
        case 'not-allowed':
          errorMessage = 'Mikrofon izni gerekli.';
          break;
        case 'network':
          errorMessage = 'Ağ bağlantısı hatası.';
          break;
        default:
          errorMessage = `Sesli komut hatası: ${event.error}`;
      }

      setState(prev => ({ 
        ...prev, 
        isListening: false, 
        error: errorMessage 
      }));
      
      // Auto-clear error after 3 seconds
      setTimeout(() => {
        setState(prev => ({ ...prev, error: null }));
      }, 3000);
    };

    recognition.onresult = (event) => {
      const result = event.results[0];
      const transcript = result[0].transcript.toLowerCase().trim();
      const confidence = result[0].confidence;

      setState(prev => ({ 
        ...prev, 
        transcript,
        confidence,
        lastCommand: transcript
      }));

      // Process voice command
      processVoiceCommand(transcript, confidence);
    };

    return () => {
      recognition.onstart = null;
      recognition.onend = null;
      recognition.onerror = null;
      recognition.onresult = null;
    };
  }, []);

  // Process recognized voice command
  const processVoiceCommand = useCallback((transcript: string, confidence: number) => {
    // Only process if confidence is above threshold
    if (confidence < 0.6) {
      speak('Komutu net anlayamadım, lütfen tekrar deneyin.');
      return;
    }

    // Find matching command
    const matchedCommand = voiceCommands.find(command =>
      command.patterns.some(pattern => 
        transcript.includes(pattern) || 
        pattern.includes(transcript) ||
        levenshteinDistance(transcript, pattern) <= 2
      )
    );

    if (matchedCommand) {
      speak(`${matchedCommand.description} komutu çalıştırılıyor.`);
      
      // Small delay to let the speech finish
      setTimeout(() => {
        matchedCommand.action();
      }, 1000);
      
      setState(prev => ({ 
        ...prev, 
        lastCommand: matchedCommand.description,
        error: null 
      }));
    } else {
      const suggestions = getClosestCommands(transcript, 3);
      speak('Komutu anlayamadım. Size yardımcı olabilecek komutları gösteriyorum.');
      
      setState(prev => ({ 
        ...prev, 
        suggestions: suggestions.map(cmd => cmd.description),
        error: 'Komut bulunamadı'
      }));
    }
  }, [voiceCommands]);

  // Start voice recognition
  const startListening = useCallback(() => {
    if (!recognitionRef.current || !state.isSupported) {
      setState(prev => ({ 
        ...prev, 
        error: 'Sesli komutlar desteklenmiyor' 
      }));
      return;
    }

    try {
      recognitionRef.current.start();
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: 'Mikrofon başlatılamadı',
        isListening: false 
      }));
    }
  }, [state.isSupported]);

  // Stop voice recognition
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, []);

  // Text-to-speech function
  const speak = useCallback((text: string) => {
    if (!synthRef.current || !state.isSupported) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'tr-TR';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;

    synthRef.current.speak(utterance);
  }, [state.isSupported]);

  // Get random command suggestions
  const getRandomSuggestions = useCallback(() => {
    const shuffled = [...voiceCommands].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4).map(cmd => cmd.description);
  }, [voiceCommands]);

  // Get closest matching commands using similarity
  const getClosestCommands = useCallback((transcript: string, limit: number = 3) => {
    const scored = voiceCommands.map(command => {
      const minDistance = Math.min(...command.patterns.map(pattern => 
        levenshteinDistance(transcript, pattern)
      ));
      return { command, distance: minDistance };
    });

    return scored
      .sort((a, b) => a.distance - b.distance)
      .slice(0, limit)
      .map(item => item.command);
  }, [voiceCommands]);

  // Helper functions
  const showVoiceHelp = () => {
    speak('Sesli komutlar listesi açılıyor. Ana sayfa, oteller, uçak bileti, araç kiralama diyebilirsiniz.');
    // Could open a modal with voice commands
  };

  const toggleLanguage = () => {
    speak('Dil değiştirme özelliği yakında gelecek.');
    // Language switching logic
  };

  // Calculate Levenshtein distance for fuzzy matching
  const levenshteinDistance = (str1: string, str2: string): number => {
    const matrix = Array(str2.length + 1).fill(null).map(() => 
      Array(str1.length + 1).fill(null)
    );

    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1, // deletion
          matrix[j - 1][i] + 1, // insertion
          matrix[j - 1][i - 1] + indicator // substitution
        );
      }
    }

    return matrix[str2.length][str1.length];
  };

  // Get available commands grouped by category
  const getCommandsByCategory = useCallback(() => {
    return voiceCommands.reduce((acc, command) => {
      if (!acc[command.category]) {
        acc[command.category] = [];
      }
      acc[command.category].push(command);
      return acc;
    }, {} as Record<string, VoiceCommand[]>);
  }, [voiceCommands]);

  return {
    ...state,
    startListening,
    stopListening,
    speak,
    getCommandsByCategory,
    voiceCommands
  };
};

// Extend Window interface for speech recognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default useVoiceMenu;