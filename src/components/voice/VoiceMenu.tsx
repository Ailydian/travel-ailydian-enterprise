import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Zap,
  Brain,
  Command,
  X,
  ChevronDown,
  AlertCircle,
  CheckCircle,
  Loader } from
'lucide-react';
import useVoiceMenu from '@/hooks/useVoiceMenu';

interface VoiceMenuProps {
  className?: string;
}

export const VoiceMenu: React.FC<VoiceMenuProps> = ({ className = '' }) => {
  const {
    isListening,
    isSupported,
    transcript,
    confidence,
    error,
    lastCommand,
    suggestions,
    startListening,
    stopListening,
    speak,
    getCommandsByCategory,
    voiceCommands
  } = useVoiceMenu();

  const [showModal, setShowModal] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(true);
  const [displaySuggestions, setDisplaySuggestions] = useState<string[]>([]);

  // Initialize with default suggestions on mount
  useEffect(() => {
    const defaultSuggestions = [
    'Otellere git',
    'Uçak bileti ara',
    'Sepeti göster',
    'Anasayfaya git'];

    setDisplaySuggestions(defaultSuggestions);
  }, []);

  // Update display suggestions when suggestions change
  useEffect(() => {
    if (suggestions.length > 0) {
      setDisplaySuggestions(suggestions);
    }
  }, [suggestions]);

  // Auto-hide suggestions after some time
  useEffect(() => {
    if (displaySuggestions.length > 0 && !showModal) {
      setShowSuggestions(true);
      const timer = setTimeout(() => {
        setShowSuggestions(false);
      }, 8000); // Increased time to 8 seconds
      return () => clearTimeout(timer);
    }
  }, [displaySuggestions, showModal]);

  // Handle voice toggle
  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Handle speech enable/disable
  const handleSpeechToggle = () => {
    setIsSpeechEnabled(!isSpeechEnabled);
    if (!isSpeechEnabled) {
      speak('Sesli geri bildirim etkinleştirildi.');
    }
  };

  // Voice command categories
  const commandsByCategory = getCommandsByCategory();

  // Get status info
  const getStatusInfo = () => {
    if (!isSupported) {
      return {
        status: 'Desteklenmiyor',
        color: 'text-red-500',
        bgColor: 'bg-red-100',
        icon: AlertCircle
      };
    }

    if (isListening) {
      return {
        status: 'Dinliyor...',
        color: 'text-green-500',
        bgColor: 'bg-green-100',
        icon: Loader
      };
    }

    if (lastCommand) {
      return {
        status: 'Hazır',
        color: 'text-blue-500',
        bgColor: 'bg-blue-100',
        icon: CheckCircle
      };
    }

    return {
      status: 'Hazır',
      color: 'text-gray-400',
      bgColor: 'bg-white/10',
      icon: Mic
    };
  };

  const statusInfo = getStatusInfo();

  return (
    <div className={`relative ${className}`}>
      {/* Voice Control Button */}
      <div className="flex items-center gap-2">
        {/* Main Voice Button */}
        <div className="relative">
          <button
            onClick={handleVoiceToggle}
            disabled={!isSupported}
            className={`p-3 rounded-xl transition-all duration-200 transform hover:scale-105 ${
            isListening ?
            'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg animate-pulse' :
            isSupported ?
            'bg-white/10 hover:bg-gray-200 text-gray-200' :
            'bg-white/5 text-gray-400 cursor-not-allowed'}`
            }
            title={isSupported ? 'Sesli komutları başlat/durdur' : 'Tarayıcı desteklemiyor'}>

            {isListening ?
            <div className="relative">
                <Mic className="w-5 h-5" />
                {/* Listening animation */}
                <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}>

                  <div className="absolute -inset-1 border-2 border-lydian-border-light rounded-xl" />
                </motion.div>
              </div> :

            <MicOff className="w-5 h-5" />
            }
          </button>

          {/* Status Indicator */}
          {isSupported &&
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${statusInfo.bgColor} rounded-full flex items-center justify-center`}>
              <statusInfo.icon className={`w-2 h-2 ${statusInfo.color} ${isListening ? 'animate-spin' : ''}`} />
            </div>
          }
        </div>

        {/* Speech Toggle */}
        <button
          onClick={handleSpeechToggle}
          className={`p-2 rounded-lg transition-colors ${
          isSpeechEnabled ?
          'text-blue-600 hover:bg-blue-100' :
          'text-gray-400 hover:bg-white/10'}`
          }
          title="Sesli geri bildirimi aç/kapat">

          {isSpeechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Help/Commands Button */}
        <button
          onClick={() => setShowModal(true)}
          className="p-2 rounded-lg text-lydian-text-dim hover:bg-lydian-glass-dark-medium transition-colors"
          title="Sesli komutları görüntüle">

          <Command className="w-4 h-4" />
        </button>
      </div>

      {/* Real-time Status Display */}
      {(transcript || error || isListening) &&
      <div className="absolute top-full left-0 mt-2 z-50">
          <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}>

            <div className={`px-4 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap ${
          error ?
          'bg-red-100 text-red-700 border border-red-200' :
          'bg-blue-100 text-blue-700 border border-blue-200'}`
          }>
            
            {error ?
            <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div> :
            isListening ?
            <div className="flex items-center gap-2">
                <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}>

                  <Mic className="w-4 h-4" />
                </motion.div>
                Dinliyor...
              </div> :
            transcript ?
            <div className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                &quot;{transcript}&quot; {confidence && `(${Math.round(confidence * 100)}%)`}
              </div> :
            null}
            </div>
          </motion.div>
        </div>
      }

      {/* Quick Suggestions Popup */}
      <AnimatePresence>
        {showSuggestions && displaySuggestions.length > 0 &&
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}>

            <div className="absolute top-full right-0 mt-2 w-72 bg-lydian-glass-dark rounded-xl shadow-xl border border-lydian-border-light/10 p-4 z-50">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-lydian-text-inverse flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                Deneyebileceğiniz komutlar
              </h4>
              <button
                onClick={() => setShowSuggestions(false)}
                className="p-1 hover:bg-lydian-glass-dark-medium rounded">

                <X className="w-4 h-4 text-lydian-text-muted" />
              </button>
            </div>

            <div className="space-y-2">
              {displaySuggestions.slice(0, 4).map((suggestion, index) =>
              <button
                key={index}
                onClick={() => {
                  speak(suggestion);
                  setShowSuggestions(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-colors text-sm font-medium text-lydian-text-muted border border-blue-100">

                  💡 {suggestion}
                </button>
              )}
            </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>

      {/* Voice Commands Modal */}
      <AnimatePresence>
        {showModal &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>

            <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowModal(false)}>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}>

              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-lydian-glass-dark rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-y-auto">

              {/* Modal Header */}
              <div className="sticky top-0 bg-lydian-glass-dark border-b border-lydian-border-light/10 px-6 py-4 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-lydian-text-inverse flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-purple-500 to-lydian-primary rounded-xl">
                        <Brain className="w-6 h-6 text-lydian-text-inverse" />
                      </div>
                      Sesli Komutlar Rehberi
                    </h2>
                    <p className="text-lydian-text-dim mt-1">
                      {isSupported ?
                        'Aşağıdaki komutları söyleyerek siteyi kontrol edebilirsiniz' :
                        'Bu tarayıcı sesli komutları desteklemiyor'
                        }
                    </p>
                  </div>
                  <button
                      onClick={() => setShowModal(false)}
                      className="p-2 hover:bg-lydian-glass-dark-medium rounded-lg transition-colors">

                    <X className="w-6 h-6 text-lydian-text-muted" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {!isSupported ?
                  <div className="text-center py-8">
                    <AlertCircle className="w-16 h-16 text-lydian-error mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-lydian-text-inverse mb-2">
                      Tarayıcı Desteklemiyor
                    </h3>
                    <p className="text-lydian-text-dim">
                      Bu tarayıcı Web Speech API&apos;sini desteklemiyor.
                      Chrome, Edge veya Safari kullanmayı deneyin.
                    </p>
                  </div> :

                  <div className="space-y-6">
                    {/* Status */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <statusInfo.icon className={`w-5 h-5 ${statusInfo.color}`} />
                        <div>
                          <div className="font-medium text-lydian-text-inverse">Durum: {statusInfo.status}</div>
                          {lastCommand &&
                          <div className="text-sm text-lydian-text-dim">
                              Son komut: {lastCommand}
                            </div>
                          }
                        </div>
                      </div>
                    </div>

                    {/* Commands by Category */}
                    {Object.entries(commandsByCategory).map(([category, commands]) =>
                    <div key={category} className="space-y-3">
                        <h3 className="text-lg font-semibold text-lydian-text-inverse capitalize flex items-center gap-2">
                          {category === 'navigation' && '🧭 Navigasyon'}
                          {category === 'search' && '🔍 Arama'}
                          {category === 'action' && '⚡ Aksiyon'}
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {commands.map((command, index) =>
                        <div
                          key={index}
                          className="bg-lydian-glass-dark border border-lydian-border-light/10 rounded-xl p-4 hover:shadow-md transition-shadow">

                              <div className="font-medium text-lydian-text-inverse mb-2">
                                {command.description}
                              </div>
                              <div className="flex flex-wrap gap-1 mb-2">
                                {command.patterns.slice(0, 3).map((pattern, pIndex) =>
                            <span
                              key={pIndex}
                              className="px-2 py-1 bg-lydian-glass-dark-medium text-lydian-text-muted text-xs rounded-lg">

                                    &quot;{pattern}&quot;
                                  </span>
                            )}
                                {command.patterns.length > 3 &&
                            <span className="px-2 py-1 bg-lydian-glass-dark text-lydian-text-muted text-xs rounded-lg">
                                    +{command.patterns.length - 3} daha
                                  </span>
                            }
                              </div>
                              <button
                            onClick={() => command.action()}
                            className="text-sm text-lydian-primary hover:text-lydian-primary-dark font-medium">

                                Komut Çalıştır →
                              </button>
                            </div>
                        )}
                        </div>
                      </div>
                    )}

                    {/* Usage Tips */}
                    <div className="bg-lydian-warning-lighter border border-yellow-200 rounded-xl p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Kullanım İpuçları
                      </h4>
                      <ul className="text-sm text-lydian-warning-text space-y-1">
                        <li>• Mikrofon butonuna tıklayıp konuşmaya başlayın</li>
                        <li>• Net ve açık bir şekilde konuşun</li>
                        <li>• Komutlar Türkçe ve İngilizce olarak çalışır</li>
                        <li>• Mikrofon izni gereklidir</li>
                        <li>• Sesli geri bildirimi kapatabilirsiniz</li>
                      </ul>
                    </div>
                  </div>
                  }
              </div>
              </div>
            </motion.div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

};

export default VoiceMenu;