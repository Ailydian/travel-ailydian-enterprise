import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';

interface VoiceCommand {
  command: string;
  patterns: string[];
  action: () => void;
  description: string;
  category: string;
}

interface VoiceCommandContextType {
  isListening: boolean;
  isSupported: boolean;
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
  lastCommand: string;
  isProcessing: boolean;
  feedback: string;
  commands: VoiceCommand[];
}

const VoiceCommandContext = createContext<VoiceCommandContextType | undefined>(undefined);

export const useVoiceCommand = () => {
  const context = useContext(VoiceCommandContext);
  if (!context) {
    throw new Error('useVoiceCommand must be used within VoiceCommandProvider');
  }
  return context;
};

export const VoiceCommandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [lastCommand, setLastCommand] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedback, setFeedback] = useState('');

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<any>(null);

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const SpeechSynthesis = window.speechSynthesis;

      if (SpeechRecognition && SpeechSynthesis) {
        setIsSupported(true);

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'tr-TR'; // Turkish language
        recognition.maxAlternatives = 3;

        recognition.onstart = () => {
          console.log('Voice recognition started');
          setIsListening(true);
          speak('Merhaba arkadaşım! Ben Lydian. Sizi dinliyorum, buyurun söyleyin.');
        };

        recognition.onend = () => {
          console.log('Voice recognition ended');
          setIsListening(false);
        };

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);

          if (event.error === 'no-speech') {
            setFeedback('Ses algılanamadı');
          } else if (event.error === 'audio-capture') {
            setFeedback('Mikrofon erişimi reddedildi');
          } else if (event.error === 'not-allowed') {
            setFeedback('Mikrofon izni verilmedi');
          } else {
            setFeedback('Bir hata oluştu');
          }
        };

        recognition.onresult = (event: any) => {
          const current = event.resultIndex;
          const transcriptText = event.results[current][0].transcript;

          setTranscript(transcriptText);
          console.log('Transcript:', transcriptText);

          if (event.results[current].isFinal) {
            processCommand(transcriptText);
          }
        };

        recognitionRef.current = recognition;
        synthRef.current = SpeechSynthesis;
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Text-to-speech function with Lydian character - Male voice guaranteed
  const speak = useCallback((text: string) => {
    if (synthRef.current && typeof window !== 'undefined') {
      synthRef.current.cancel(); // Cancel any ongoing speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'tr-TR';
      utterance.rate = 0.9; // Slower for more natural, conversational speech
      utterance.pitch = 0.7; // Much lower pitch for distinctly male voice
      utterance.volume = 1.0;

      // Get all available voices
      const voices = synthRef.current.getVoices();

      // Priority 1: Look for Turkish male voices
      let selectedVoice = voices.find((voice: SpeechSynthesisVoice) => {
        const name = voice.name.toLowerCase();
        const lang = voice.lang.toLowerCase();
        return (lang.includes('tr') || lang.includes('turkish')) &&
               (name.includes('male') || name.includes('erkek'));
      });

      // Priority 2: Look for any Turkish voice (we'll adjust pitch anyway)
      if (!selectedVoice) {
        selectedVoice = voices.find((voice: SpeechSynthesisVoice) =>
          voice.lang.toLowerCase().includes('tr') ||
          voice.lang.toLowerCase().includes('turkish')
        );
      }

      // Priority 3: Look for voices with male-sounding names
      if (!selectedVoice) {
        selectedVoice = voices.find((voice: SpeechSynthesisVoice) => {
          const name = voice.name.toLowerCase();
          return name.includes('daniel') ||
                 name.includes('thomas') ||
                 name.includes('alex') ||
                 name.includes('male');
        });
      }

      // Priority 4: Use any available voice with low pitch
      if (!selectedVoice && voices.length > 0) {
        // Prefer voices from index 0-3 which are usually male on most systems
        selectedVoice = voices[0];
      }

      if (selectedVoice) {
        utterance.voice = selectedVoice;
        console.log('Selected voice:', selectedVoice.name, selectedVoice.lang);
      }

      // Ensure male-sounding voice with low pitch regardless
      utterance.pitch = 0.7; // Very low pitch for male voice

      synthRef.current.speak(utterance);
    }
  }, []);

  // Define voice commands
  const commands: VoiceCommand[] = [
    // Navigation Commands
    {
      command: 'ana sayfa',
      patterns: ['ana sayfa', 'ana sayfaya git', 'anasayfa', 'home', 'ev'],
      action: () => {
        router.push('/');
        speak('Tabii! Hemen ana sayfaya götürüyorum.');
      },
      description: 'Ana sayfaya git',
      category: 'Navigasyon'
    },
    {
      command: 'oteller',
      patterns: ['oteller', 'otellere git', 'otel ara', 'hotels', 'otel bul'],
      action: () => {
        router.push('/hotels');
        speak('Harika! Size en iyi otelleri gösteriyorum.');
      },
      description: 'Oteller sayfasına git',
      category: 'Navigasyon'
    },
    {
      command: 'uçuşlar',
      patterns: ['uçuşlar', 'uçuş ara', 'uçuşlara git', 'flights', 'uçak bileti'],
      action: () => {
        router.push('/flights');
        speak('Uygun uçuşları hemen buluyorum!');
      },
      description: 'Uçuşlar sayfasına git',
      category: 'Navigasyon'
    },
    {
      command: 'turlar',
      patterns: ['turlar', 'turlara git', 'tur ara', 'tours', 'gezi turları'],
      action: () => {
        router.push('/tours');
        speak('Muhteşem turları gösteriyorum.');
      },
      description: 'Turlar sayfasına git',
      category: 'Navigasyon'
    },
    {
      command: 'aktiviteler',
      patterns: ['aktiviteler', 'aktivitelere git', 'aktivite ara', 'activities', 'etkinlikler'],
      action: () => {
        router.push('/activities');
        speak('Heyecan verici aktiviteleri keşfedelim!');
      },
      description: 'Aktiviteler sayfasına git',
      category: 'Navigasyon'
    },
    {
      command: 'destinasyonlar',
      patterns: ['destinasyonlar', 'destinasyonlara git', 'destinations', 'şehirler', 'yerler'],
      action: () => {
        router.push('/destinations');
        speak('Harika destinasyonları gösteriyorum.');
      },
      description: 'Destinasyonlar sayfasına git',
      category: 'Navigasyon'
    },
    {
      command: 'sepet',
      patterns: ['sepet', 'sepete git', 'sepetim', 'cart', 'alışveriş sepeti'],
      action: () => {
        router.push('/cart');
        speak('Sepetinizi kontrol edelim.');
      },
      description: 'Sepete git',
      category: 'Navigasyon'
    },
    {
      command: 'rezervasyonlar',
      patterns: ['rezervasyonlar', 'rezervasyonlarım', 'bookings', 'my bookings', 'randevularım'],
      action: () => {
        router.push('/bookings');
        speak('Rezervasyonlarınızı gösteriyorum.');
      },
      description: 'Rezervasyonlar sayfasına git',
      category: 'Navigasyon'
    },
    {
      command: 'profil',
      patterns: ['profil', 'profilim', 'profile', 'hesabım', 'hesap'],
      action: () => {
        router.push('/profile/dashboard');
        speak('Hemen profilinize götürüyorum.');
      },
      description: 'Profil sayfasına git',
      category: 'Navigasyon'
    },
    {
      command: 'yapay zeka asistan',
      patterns: ['yapay zeka', 'ai asistan', 'asistan', 'yardım', 'assistant', 'yapay zeka yardımcısı'],
      action: () => {
        router.push('/ai-assistant');
        speak('Yapay zeka asistanını başlatıyorum. Size nasıl yardımcı olabilirim?');
      },
      description: 'AI Asistan\'ı aç',
      category: 'Özellikler'
    },
    {
      command: 'gezi planlayıcı',
      patterns: ['gezi planla', 'planlayıcı', 'trip planner', 'plan yap', 'tatil planla'],
      action: () => {
        router.push('/trip-planner');
        speak('Harika! Gezi planlayıcınızı açıyorum. Hayalinizdeki tatili planlayalım!');
      },
      description: 'Gezi planlayıcısını aç',
      category: 'Özellikler'
    },
    {
      command: 'sanal tur',
      patterns: ['sanal tur', 'virtual tour', 'vr', 'sanal gezinti', 'sanal gezi'],
      action: () => {
        router.push('/virtual-tours');
        speak('Sanal turlarla dünyayı keşfedelim!');
      },
      description: 'Sanal turları aç',
      category: 'Özellikler'
    },

    // Search Commands
    {
      command: 'istanbul ara',
      patterns: ['istanbul', 'istanbul ara', 'istanbula git', 'istanbul otelleri', 'istanbul otel'],
      action: () => {
        router.push('/hotels?destination=istanbul');
        speak('İstanbul için en güzel otelleri buluyorum!');
      },
      description: 'İstanbul\'da ara',
      category: 'Arama'
    },
    {
      command: 'ankara ara',
      patterns: ['ankara', 'ankara ara', 'ankaraya git', 'ankara otelleri', 'ankara otel'],
      action: () => {
        router.push('/hotels?destination=ankara');
        speak('Ankara için harika otel seçenekleri getiriyorum!');
      },
      description: 'Ankara\'da ara',
      category: 'Arama'
    },
    {
      command: 'antalya ara',
      patterns: ['antalya', 'antalya ara', 'antalyaya git', 'antalya otelleri', 'antalya otel'],
      action: () => {
        router.push('/hotels?destination=antalya');
        speak('Antalya için muhteşem otel fırsatlarını gösteriyorum!');
      },
      description: 'Antalya\'da ara',
      category: 'Arama'
    },

    // Action Commands
    {
      command: 'giriş yap',
      patterns: ['giriş yap', 'login', 'oturum aç', 'giriş'],
      action: () => {
        router.push('/auth/signin');
        speak('Giriş sayfasına yönlendiriyorum. Hoş geldiniz!');
      },
      description: 'Giriş yap',
      category: 'Hesap'
    },
    {
      command: 'kayıt ol',
      patterns: ['kayıt ol', 'üye ol', 'register', 'sign up', 'hesap aç'],
      action: () => {
        router.push('/auth/signup');
        speak('Kayıt sayfasına götürüyorum. Ailydian ailesine hoş geldiniz!');
      },
      description: 'Kayıt ol',
      category: 'Hesap'
    },
    {
      command: 'yardım',
      patterns: ['yardım', 'help', 'destek', 'support', 'yardım et'],
      action: () => {
        router.push('/support');
        speak('Destek ekibimiz size yardımcı olmak için hazır!');
      },
      description: 'Yardım al',
      category: 'Destek'
    },

    // System Commands
    {
      command: 'dinlemeyi durdur',
      patterns: ['dur', 'durdur', 'dinleme', 'stop', 'kapat', 'sus'],
      action: () => {
        stopListening();
        speak('Anlaşıldı! İhtiyacınız olduğunda tekrar buradayım.');
      },
      description: 'Dinlemeyi durdur',
      category: 'Sistem'
    },
    {
      command: 'komutlar',
      patterns: ['komutlar', 'neler yapabilirsin', 'yardım', 'commands', 'ne yaparsın'],
      action: () => {
        speak('Size yardımcı olabileceğim tüm komutları gösteriyorum!');
        // Open commands modal
      },
      description: 'Komutları göster',
      category: 'Sistem'
    }
  ];

  // Helper function to normalize Turkish text
  const normalizeTurkish = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/ı/g, 'i')
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .trim();
  };

  // Helper function to calculate similarity between two strings
  const calculateSimilarity = (str1: string, str2: string): number => {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;

    if (longer.length === 0) return 1.0;

    // Check if one string contains the other
    if (longer.includes(shorter)) {
      return 0.8 + (shorter.length / longer.length) * 0.2;
    }

    // Calculate edit distance
    const editDistance = (s1: string, s2: string): number => {
      const costs: number[] = [];
      for (let i = 0; i <= s2.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= s1.length; j++) {
          if (i === 0) {
            costs[j] = j;
          } else if (j > 0) {
            let newValue = costs[j - 1];
            if (s1.charAt(j - 1) !== s2.charAt(i - 1)) {
              newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
            }
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
        if (i > 0) costs[s1.length] = lastValue;
      }
      return costs[s1.length];
    };

    const distance = editDistance(shorter, longer);
    return (longer.length - distance) / longer.length;
  };

  // Process voice command with improved matching
  const processCommand = useCallback((text: string) => {
    setIsProcessing(true);
    const lowerText = text.toLowerCase().trim();
    const normalizedText = normalizeTurkish(lowerText);

    console.log('Processing command:', lowerText);
    console.log('Normalized:', normalizedText);

    // Find matching command with exact match first
    let matchedCommand = commands.find(cmd =>
      cmd.patterns.some(pattern =>
        lowerText.includes(pattern.toLowerCase()) ||
        normalizedText.includes(normalizeTurkish(pattern))
      )
    );

    // If no exact match, try fuzzy matching
    if (!matchedCommand) {
      let bestMatch: { cmd: typeof commands[0], score: number } | null = null;

      commands.forEach(cmd => {
        cmd.patterns.forEach(pattern => {
          const normalizedPattern = normalizeTurkish(pattern);
          const score = calculateSimilarity(normalizedText, normalizedPattern);

          // Accept if similarity is above 70%
          if (score > 0.7 && (!bestMatch || score > bestMatch.score)) {
            bestMatch = { cmd, score };
          }
        });
      });

      if (bestMatch) {
        matchedCommand = bestMatch.cmd;
        console.log('Fuzzy match found with score:', bestMatch.score);
      }
    }

    if (matchedCommand) {
      setLastCommand(matchedCommand.command);
      setFeedback(`✓ ${matchedCommand.description}`);

      // Execute command
      setTimeout(() => {
        matchedCommand.action();
        setIsProcessing(false);
      }, 500);
    } else {
      setFeedback('Komut anlaşılamadı');
      speak('Pardon, tam anlayamadım. Bir daha söyler misiniz? Ya da komutlar diyerek, neler yapabileceğimi öğrenebilirsiniz.');
      setIsProcessing(false);
    }

    // Clear feedback after 3 seconds
    setTimeout(() => {
      setFeedback('');
    }, 3000);
  }, [commands, speak]);

  const startListening = useCallback(() => {
    if (recognitionRef.current && isSupported) {
      try {
        recognitionRef.current.start();
        setTranscript('');
        setLastCommand('');
        setFeedback('Dinleniyor...');
      } catch (error) {
        console.error('Error starting recognition:', error);
      }
    }
  }, [isSupported]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      setFeedback('');
    }
  }, []);

  return (
    <VoiceCommandContext.Provider
      value={{
        isListening,
        isSupported,
        transcript,
        startListening,
        stopListening,
        lastCommand,
        isProcessing,
        feedback,
        commands
      }}
    >
      {children}
    </VoiceCommandContext.Provider>
  );
};
