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
  speak: (text: string) => void;
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

  // 🎙️ ULTIMATE MALE VOICE - Text-to-speech with Lydian character
  const speak = useCallback((text: string) => {
    if (synthRef.current && typeof window !== 'undefined') {
      synthRef.current.cancel(); // Cancel any ongoing speech

      const utterance = new SpeechSynthesisUtterance(text);

      // Get all available voices - wait for them to load if needed
      let voices = synthRef.current.getVoices();

      // If voices aren't loaded yet, wait for them
      if (voices.length === 0) {
        synthRef.current.onvoiceschanged = () => {
          voices = synthRef.current.getVoices();
          selectAndSpeak(voices);
        };
        return;
      }

      const selectAndSpeak = (availableVoices: SpeechSynthesisVoice[]) => {
        console.log('🔍 SCANNING', availableVoices.length, 'VOICES FOR ULTIMATE MALE VOICE...');

        // Log ALL voices for debugging
        availableVoices.forEach((v, i) => {
          console.log(`Voice ${i}: ${v.name} | Lang: ${v.lang} | Local: ${v.localService}`);
        });

        // 🏆 ULTIMATE VOICE SELECTION ALGORITHM
        // Priority 1: Turkish Male Voices (Premium Quality)
        let selectedVoice = availableVoices.find((voice: SpeechSynthesisVoice) => {
          const name = voice.name.toLowerCase();
          const lang = voice.lang.toLowerCase();
          // Specific Turkish male voice names
          return (lang.startsWith('tr') && (
            name.includes('erkek') ||
            name.includes('male') ||
            name.includes('ahmet') ||
            name.includes('mehmet') ||
            name.includes('murat') ||
            name.includes('cem') ||
            name.includes('kemal')
          ));
        });

        // Priority 2: Microsoft/Google Turkish voices (Will adjust with pitch)
        if (!selectedVoice) {
          selectedVoice = availableVoices.find((voice: SpeechSynthesisVoice) => {
            const name = voice.name.toLowerCase();
            const lang = voice.lang.toLowerCase();
            return lang.startsWith('tr') && (
              name.includes('microsoft') ||
              name.includes('google') ||
              name.includes('premium')
            ) && !name.includes('female') && !name.includes('kadın');
          });
        }

        // Priority 3: ANY Turkish voice (we'll masculinize with pitch)
        if (!selectedVoice) {
          selectedVoice = availableVoices.find((voice: SpeechSynthesisVoice) => {
            return voice.lang.toLowerCase().startsWith('tr');
          });
        }

        // Priority 4: Deep International Male Voices
        if (!selectedVoice) {
          const deepMaleVoices = [
            'daniel', 'thomas', 'alex', 'david', 'aaron', 'bruce',
            'fred', 'gordon', 'ralph', 'jorge', 'luca', 'diego'
          ];
          selectedVoice = availableVoices.find((voice: SpeechSynthesisVoice) => {
            const name = voice.name.toLowerCase();
            return deepMaleVoices.some(male => name.includes(male)) &&
                   !name.includes('female');
          });
        }

        // Priority 5: Any non-female voice
        if (!selectedVoice) {
          selectedVoice = availableVoices.find((voice: SpeechSynthesisVoice) => {
            const name = voice.name.toLowerCase();
            const femaleKeywords = ['female', 'woman', 'girl', 'kadın', 'kız',
              'samantha', 'victoria', 'susan', 'karen', 'moira', 'fiona',
              'kate', 'alice', 'amelie', 'anna', 'alice', 'melina'];
            return !femaleKeywords.some(keyword => name.includes(keyword));
          });
        }

        // Priority 6: Use FIRST voice (desktop Safari typically has good male voices first)
        if (!selectedVoice && availableVoices.length > 0) {
          selectedVoice = availableVoices[0];
        }

        if (selectedVoice) {
          utterance.voice = selectedVoice;
          utterance.lang = selectedVoice.lang.startsWith('tr') ? selectedVoice.lang : 'tr-TR';

          console.log('✅ SELECTED VOICE:', selectedVoice.name);
          console.log('🌍 Language:', utterance.lang);
        } else {
          utterance.lang = 'tr-TR';
        }

        // 🎚️ OPTIMIZED MALE VOICE SETTINGS FOR TURKISH
        // Balanced for natural, fluid Turkish speech
        utterance.pitch = 0.7;  // Natural male pitch - not too deep, more intelligible
        utterance.rate = 0.95;  // Near-normal speed for fluid Turkish
        utterance.volume = 1.0; // Full volume

        console.log('🎚️ VOICE PARAMETERS:');
        console.log('   Pitch: 0.1 (EXTREME DEEP - Maximum Masculine)');
        console.log('   Rate: 0.75 (Slower, Authoritative)');
        console.log('   Volume: 1.0 (Full)');

        // Add natural Turkish speech patterns with pauses
        const naturalText = text
          .replace(/\./g, '... ')     // Longer pause after periods
          .replace(/,/g, ', ')         // Short pause after commas
          .replace(/\?/g, '?.. ')      // Pause after questions
          .replace(/!/g, '!.. ')       // Pause after exclamations
          .replace(/:/g, ':. ');       // Pause after colons

        utterance.text = naturalText;

        // Start speaking
        synthRef.current.speak(utterance);

        console.log('🗣️ Speaking:', text.substring(0, 50) + '...');
      };

      selectAndSpeak(voices);
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
        speak('Kayıt sayfasına götürüyorum. LyDian ailesine hoş geldiniz!');
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
    },

    // Additional Search Commands - More Cities
    {
      command: 'izmir ara',
      patterns: ['izmir', 'izmir ara', 'izmire git', 'izmir otelleri', 'izmir otel'],
      action: () => {
        router.push('/hotels?destination=izmir');
        speak('İzmir için harika otel seçenekleri buluyorum!');
      },
      description: 'İzmir\'de ara',
      category: 'Arama'
    },
    {
      command: 'bodrum ara',
      patterns: ['bodrum', 'bodrum ara', 'bodruma git', 'bodrum otelleri', 'bodrum otel'],
      action: () => {
        router.push('/hotels?destination=bodrum');
        speak('Bodrum için mükemmel otel fırsatları getiriyorum!');
      },
      description: 'Bodrum\'da ara',
      category: 'Arama'
    },
    {
      command: 'çeşme ara',
      patterns: ['çeşme', 'cesme', 'çeşme ara', 'çeşmeye git', 'çeşme otelleri'],
      action: () => {
        router.push('/hotels?destination=cesme');
        speak('Çeşme için muhteşem oteller buluyorum!');
      },
      description: 'Çeşme\'de ara',
      category: 'Arama'
    },
    {
      command: 'kapadokya ara',
      patterns: ['kapadokya', 'kapadokya ara', 'kapadokyaya git', 'kapadokya otelleri'],
      action: () => {
        router.push('/hotels?destination=cappadocia');
        speak('Kapadokya için eşsiz otel seçenekleri gösteriyorum!');
      },
      description: 'Kapadokya\'da ara',
      category: 'Arama'
    },

    // Advanced Features
    {
      command: 'favorilerim',
      patterns: ['favorilerim', 'favorites', 'beğendiklerim', 'favori', 'kaydettiklerim'],
      action: () => {
        router.push('/favorites');
        speak('Favori listenizi gösteriyorum.');
      },
      description: 'Favorileri göster',
      category: 'Navigasyon'
    },
    {
      command: 'restaurant ara',
      patterns: ['restaurant', 'restaurant ara', 'restoranlar', 'yemek', 'restoran bul'],
      action: () => {
        router.push('/destinations');
        speak('Size en iyi restoranları buluyorum!');
      },
      description: 'Restaurant ara',
      category: 'Arama'
    },
    {
      command: 'transfer',
      patterns: ['transfer', 'araç kirala', 'car rental', 'transfer ara', 'ulaşım'],
      action: () => {
        router.push('/transfers');
        speak('Transfer ve araç kiralama seçeneklerini gösteriyorum.');
      },
      description: 'Transfer/Araç Kiralama',
      category: 'Navigasyon'
    },
    {
      command: 'deneyimler',
      patterns: ['deneyimler', 'experiences', 'deneyim ara', 'yerel deneyimler'],
      action: () => {
        router.push('/experiences');
        speak('Unutulmaz deneyimler sizi bekliyor!');
      },
      description: 'Deneyimleri keşfet',
      category: 'Navigasyon'
    },
    {
      command: 'premium üyelik',
      patterns: ['premium', 'premium üyelik', 'premium ol', 'özel avantajlar'],
      action: () => {
        router.push('/premium');
        speak('Premium üyelik avantajlarını gösteriyorum!');
      },
      description: 'Premium üyelik',
      category: 'Özellikler'
    },
    {
      command: 'sosyal',
      patterns: ['sosyal', 'paylaş', 'social', 'arkadaşlarımla paylaş'],
      action: () => {
        router.push('/social');
        speak('Sosyal özelliklere erişiyorsunuz.');
      },
      description: 'Sosyal özellikler',
      category: 'Özellikler'
    },
    {
      command: 'blockchain',
      patterns: ['blockchain', 'kripto', 'crypto', 'blockchain özelliği'],
      action: () => {
        router.push('/blockchain');
        speak('Blockchain tabanlı güvenli rezervasyon sistemine hoş geldiniz!');
      },
      description: 'Blockchain özellikleri',
      category: 'Özellikler'
    },
    {
      command: 'görsel arama',
      patterns: ['görsel arama', 'resim ara', 'visual search', 'fotoğraf ara'],
      action: () => {
        router.push('/visual-search');
        speak('Görsel arama özelliğini başlatıyorum!');
      },
      description: 'Görsel arama',
      category: 'Arama'
    },
    {
      command: 'hakkımızda',
      patterns: ['hakkımızda', 'about', 'about us', 'bilgi'],
      action: () => {
        router.push('/about');
        speak('Travel LyDian hakkında bilgi sayfasına götürüyorum.');
      },
      description: 'Hakkımızda',
      category: 'Bilgi'
    },
    {
      command: 'iletişim',
      patterns: ['iletişim', 'contact', 'bize ulaşın', 'iletişime geç'],
      action: () => {
        router.push('/contact');
        speak('İletişim sayfasına yönlendiriyorum.');
      },
      description: 'İletişim',
      category: 'Destek'
    },
    {
      command: 'değerlendirmeler',
      patterns: ['değerlendirmeler', 'reviews', 'yorumlar', 'review'],
      action: () => {
        router.push('/reviews');
        speak('Kullanıcı değerlendirmelerini gösteriyorum.');
      },
      description: 'Değerlendirmeler',
      category: 'Bilgi'
    },
    {
      command: 'seyahatlerim',
      patterns: ['seyahatlerim', 'my trips', 'gezilerim', 'trip', 'planlarım'],
      action: () => {
        router.push('/my-trips');
        speak('Seyahat planlarınızı gösteriyorum.');
      },
      description: 'Seyahatlerim',
      category: 'Navigasyon'
    },
    {
      command: 'ödeme',
      patterns: ['ödeme', 'checkout', 'ödeme yap', 'satın al'],
      action: () => {
        router.push('/checkout');
        speak('Ödeme sayfasına yönlendiriyorum. Güvenli ödeme için hazırız!');
      },
      description: 'Ödeme sayfası',
      category: 'İşlem'
    },
    {
      command: 'grup seyahati',
      patterns: ['grup seyahati', 'group travel', 'grup rezervasyon', 'grup tatili'],
      action: () => {
        router.push('/group-travel');
        speak('Grup seyahati organizasyonuna hoş geldiniz!');
      },
      description: 'Grup seyahati',
      category: 'Özellikler'
    },
    {
      command: 'kurumsal',
      patterns: ['kurumsal', 'business', 'iş seyahati', 'corporate'],
      action: () => {
        router.push('/business');
        speak('Kurumsal seyahat çözümlerimize göz atıyorsunuz.');
      },
      description: 'Kurumsal seyahat',
      category: 'Özellikler'
    },
    {
      command: 'animasyon',
      patterns: ['animasyon', 'animated', 'showcase', 'görsel tur'],
      action: () => {
        router.push('/animated-showcase');
        speak('Harika animasyon showcase\'umuzu gösteriyorum!');
      },
      description: 'Animasyon Showcase',
      category: 'Özellikler'
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
        commands,
        speak
      }}
    >
      {children}
    </VoiceCommandContext.Provider>
  );
};
