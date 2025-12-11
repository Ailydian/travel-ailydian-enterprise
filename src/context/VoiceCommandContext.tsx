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
          speak('Dinliyorum, komutunuzu söyleyebilirsiniz');
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

  // Text-to-speech function
  const speak = useCallback((text: string) => {
    if (synthRef.current && typeof window !== 'undefined') {
      synthRef.current.cancel(); // Cancel any ongoing speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'tr-TR';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      synthRef.current.speak(utterance);
    }
  }, []);

  // Define voice commands
  const commands: VoiceCommand[] = [
    // Navigation Commands
    {
      command: 'ana sayfa',
      patterns: ['ana sayfa', 'ana sayfaya git', 'anasayfa', 'home'],
      action: () => {
        router.push('/');
        speak('Ana sayfaya gidiyorum');
      },
      description: 'Ana sayfaya git',
      category: 'Navigasyon'
    },
    {
      command: 'oteller',
      patterns: ['oteller', 'otellere git', 'otel ara', 'hotels'],
      action: () => {
        router.push('/hotels');
        speak('Oteller sayfasına gidiyorum');
      },
      description: 'Oteller sayfasına git',
      category: 'Navigasyon'
    },
    {
      command: 'uçuşlar',
      patterns: ['uçuşlar', 'uçuş ara', 'uçuşlara git', 'flights'],
      action: () => {
        router.push('/flights');
        speak('Uçuşlar sayfasına gidiyorum');
      },
      description: 'Uçuşlar sayfasına git',
      category: 'Navigasyon'
    },
    {
      command: 'turlar',
      patterns: ['turlar', 'turlara git', 'tur ara', 'tours'],
      action: () => {
        router.push('/tours');
        speak('Turlar sayfasına gidiyorum');
      },
      description: 'Turlar sayfasına git',
      category: 'Navigasyon'
    },
    {
      command: 'aktiviteler',
      patterns: ['aktiviteler', 'aktivitelere git', 'aktivite ara', 'activities'],
      action: () => {
        router.push('/activities');
        speak('Aktiviteler sayfasına gidiyorum');
      },
      description: 'Aktiviteler sayfasına git',
      category: 'Navigasyon'
    },
    {
      command: 'destinasyonlar',
      patterns: ['destinasyonlar', 'destinasyonlara git', 'destinations'],
      action: () => {
        router.push('/destinations');
        speak('Destinasyonlar sayfasına gidiyorum');
      },
      description: 'Destinasyonlar sayfasına git',
      category: 'Navigasyon'
    },
    {
      command: 'sepet',
      patterns: ['sepet', 'sepete git', 'sepetim', 'cart'],
      action: () => {
        router.push('/cart');
        speak('Sepetinize gidiyorum');
      },
      description: 'Sepete git',
      category: 'Navigasyon'
    },
    {
      command: 'rezervasyonlar',
      patterns: ['rezervasyonlar', 'rezervasyonlarım', 'bookings', 'my bookings'],
      action: () => {
        router.push('/bookings');
        speak('Rezervasyonlarınıza gidiyorum');
      },
      description: 'Rezervasyonlar sayfasına git',
      category: 'Navigasyon'
    },
    {
      command: 'profil',
      patterns: ['profil', 'profilim', 'profile', 'hesabım'],
      action: () => {
        router.push('/profile/dashboard');
        speak('Profilinize gidiyorum');
      },
      description: 'Profil sayfasına git',
      category: 'Navigasyon'
    },
    {
      command: 'yapay zeka asistan',
      patterns: ['yapay zeka', 'ai asistan', 'asistan', 'yardım', 'assistant'],
      action: () => {
        router.push('/ai-assistant');
        speak('Yapay zeka asistanını açıyorum');
      },
      description: 'AI Asistan\'ı aç',
      category: 'Özellikler'
    },
    {
      command: 'gezi planlayıcı',
      patterns: ['gezi planla', 'planlayıcı', 'trip planner', 'plan yap'],
      action: () => {
        router.push('/trip-planner');
        speak('Gezi planlayıcısını açıyorum');
      },
      description: 'Gezi planlayıcısını aç',
      category: 'Özellikler'
    },
    {
      command: 'sanal tur',
      patterns: ['sanal tur', 'virtual tour', 'vr', 'sanal gezinti'],
      action: () => {
        router.push('/virtual-tours');
        speak('Sanal turları açıyorum');
      },
      description: 'Sanal turları aç',
      category: 'Özellikler'
    },

    // Search Commands
    {
      command: 'istanbul ara',
      patterns: ['istanbul', 'istanbul ara', 'istanbula git', 'istanbul otelleri'],
      action: () => {
        router.push('/hotels?destination=istanbul');
        speak('İstanbul\'da oteller arıyorum');
      },
      description: 'İstanbul\'da ara',
      category: 'Arama'
    },
    {
      command: 'ankara ara',
      patterns: ['ankara', 'ankara ara', 'ankaraya git', 'ankara otelleri'],
      action: () => {
        router.push('/hotels?destination=ankara');
        speak('Ankara\'da oteller arıyorum');
      },
      description: 'Ankara\'da ara',
      category: 'Arama'
    },
    {
      command: 'antalya ara',
      patterns: ['antalya', 'antalya ara', 'antalyaya git', 'antalya otelleri'],
      action: () => {
        router.push('/hotels?destination=antalya');
        speak('Antalya\'da oteller arıyorum');
      },
      description: 'Antalya\'da ara',
      category: 'Arama'
    },

    // Action Commands
    {
      command: 'giriş yap',
      patterns: ['giriş yap', 'login', 'oturum aç'],
      action: () => {
        router.push('/auth/signin');
        speak('Giriş sayfasına yönlendiriyorum');
      },
      description: 'Giriş yap',
      category: 'Hesap'
    },
    {
      command: 'kayıt ol',
      patterns: ['kayıt ol', 'üye ol', 'register', 'sign up'],
      action: () => {
        router.push('/auth/signup');
        speak('Kayıt sayfasına yönlendiriyorum');
      },
      description: 'Kayıt ol',
      category: 'Hesap'
    },
    {
      command: 'yardım',
      patterns: ['yardım', 'help', 'destek', 'support'],
      action: () => {
        router.push('/support');
        speak('Destek sayfasına yönlendiriyorum');
      },
      description: 'Yardım al',
      category: 'Destek'
    },

    // System Commands
    {
      command: 'dinlemeyi durdur',
      patterns: ['dur', 'durdur', 'dinleme', 'stop', 'kapat'],
      action: () => {
        stopListening();
        speak('Sesli komutu kapatıyorum');
      },
      description: 'Dinlemeyi durdur',
      category: 'Sistem'
    },
    {
      command: 'komutlar',
      patterns: ['komutlar', 'neler yapabilirsin', 'yardım', 'commands'],
      action: () => {
        speak('Sesli komutlar menüsünü açıyorum');
        // Open commands modal
      },
      description: 'Komutları göster',
      category: 'Sistem'
    }
  ];

  // Process voice command
  const processCommand = useCallback((text: string) => {
    setIsProcessing(true);
    const lowerText = text.toLowerCase().trim();

    console.log('Processing command:', lowerText);

    // Find matching command
    const matchedCommand = commands.find(cmd =>
      cmd.patterns.some(pattern => lowerText.includes(pattern.toLowerCase()))
    );

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
      speak('Üzgünüm, bu komutu anlayamadım');
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
