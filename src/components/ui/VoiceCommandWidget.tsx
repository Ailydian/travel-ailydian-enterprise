import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, X, Info, Sparkles, Waves } from 'lucide-react';
import { useVoiceCommand } from '../../context/VoiceCommandContext';

export const VoiceCommandWidget: React.FC = () => {
  const {
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
  } = useVoiceCommand();

  const [showCommands, setShowCommands] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isSupported) {
    return null;
  }

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <>
      {/* Prominent Voice Assistant Banner - Top Center */}
      <AnimatePresence>
        {!isMinimized &&
        <motion.div
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}>

            <div className="bg-gradient-to-r from-lydian-secondary via-lydian-primary to-cyan-600 rounded-2xl shadow-2xl p-6 backdrop-blur-lg">
              <div className="flex items-center justify-between gap-4">
                {/* Left Side - Avatar & Info */}
                <div className="flex items-center gap-4">
                  {/* Lydian Avatar with Animation */}
                  <motion.div
                  animate={isListening ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="relative">

                    <div className="w-20 h-20 bg-lydian-glass-dark rounded-full flex items-center justify-center shadow-xl relative overflow-hidden">
                      {isListening ?
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }} /> :

                    null}
                      <span className="text-4xl relative z-10">🎙️</span>
                    </div>
                    {isListening &&
                  <>
                        <motion.div
                      className="absolute inset-0 rounded-full border-4 border-green-400"
                      animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity }} />

                        <motion.div
                      className="absolute inset-0 rounded-full border-4 border-green-300"
                      animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }} />

                      </>
                  }
                  </motion.div>

                  {/* Message & Status */}
                  <div className="text-lydian-text-inverse">
                    <h3 className="font-bold text-xl flex items-center gap-2 mb-1">
                      <span>🌟 Lydian - Sesli Asistanınız</span>
                      {isProcessing &&
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="inline-block">

                          ⚡
                        </motion.span>
                    }
                    </h3>
                    <p className="text-sm text-lydian-text-inverse/90 font-medium">
                      {isListening ?
                    <span className="flex items-center gap-2">
                          <Waves className="w-4 h-4 animate-pulse" />
                          Sizi dinliyorum... Ne söylemek istersiniz?
                        </span> :

                    "🎯 Benimle konuşmak için mikrofon butonuna tıklayın!"
                    }
                    </p>
                    {transcript && isListening &&
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-lydian-text-inverse/80 mt-1 bg-lydian-glass-dark-medium rounded px-2 py-1 inline-block">

                        📝 "{transcript}"
                      </motion.p>
                  }
                  </div>
                </div>

                {/* Right Side - Action Buttons */}
                <div className="flex items-center gap-3">
                  {/* Main Mic Button */}
                  <motion.button
                  onClick={toggleListening}
                  className={`relative w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all ${
                  isListening ?
                  'bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' :
                  'bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'}`
                  }
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}>

                    {isListening ?
                  <MicOff className="w-8 h-8 text-lydian-text-inverse" /> :

                  <Mic className="w-8 h-8 text-lydian-text-inverse" />
                  }
                    {isProcessing &&
                  <motion.div
                    className="absolute -top-1 -right-1 w-5 h-5 bg-lydian-warning rounded-full border-2 border-lydian-border-light"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }} />

                  }
                  </motion.button>

                  {/* Info Button */}
                  <motion.button
                  onClick={() => setShowCommands(!showCommands)}
                  className="w-12 h-12 bg-lydian-glass-dark-heavy hover:bg-lydian-bg/30 rounded-xl flex items-center justify-center text-lydian-text-inverse transition-colors backdrop-blur"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title="Komutları göster">

                    <Info className="w-5 h-5" />
                  </motion.button>

                  {/* Minimize Button */}
                  <motion.button
                  onClick={() => setIsMinimized(true)}
                  className="w-12 h-12 bg-lydian-glass-dark-heavy hover:bg-lydian-bg/30 rounded-xl flex items-center justify-center text-lydian-text-inverse transition-colors backdrop-blur"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title="Küçült">

                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Feedback Display */}
              {feedback &&
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 bg-lydian-glass-dark-heavy backdrop-blur rounded-xl p-3 border border-lydian-border-light">

                  <div className="flex items-center gap-2 text-lydian-text-inverse text-sm font-medium">
                    <Sparkles className="w-4 h-4" />
                    {feedback}
                  </div>
                </motion.div>
            }
            </div>
          </motion.div>
        }
      </AnimatePresence>

      {/* Minimized Floating Button - REMOVED: Fixed bottom-right button per user request */}
      {false && (
      <AnimatePresence>
        {isMinimized &&
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          onClick={() => setIsMinimized(false)}
          className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-gradient-to-br from-lydian-secondary to-lydian-primary rounded-full shadow-2xl flex items-center justify-center text-lydian-text-inverse"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}>

            <Mic className="w-8 h-8" />
            {isListening &&
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-green-400"
            animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }} />

          }
          </motion.button>
        }
      </AnimatePresence>
      )}

      {/* Quick Commands Panel - Opens at Top */}
      <AnimatePresence>
        {showCommands &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
          onClick={() => setShowCommands(false)}>

            <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-lydian-glass-dark rounded-b-3xl shadow-2xl max-w-6xl mx-auto overflow-hidden"
            onClick={(e) => e.stopPropagation()}>

              {/* Lydian Introduction Header */}
              <div className="bg-gradient-to-r from-lydian-secondary via-lydian-primary to-cyan-600 p-8">
                <div className="flex items-start justify-between gap-6">
                  {/* Lydian Avatar & Intro */}
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-lydian-glass-dark rounded-full flex items-center justify-center shadow-2xl relative">
                      <span className="text-5xl">🎙️</span>
                      <div className="absolute -bottom-2 -right-2 bg-lydian-success w-8 h-8 rounded-full border-4 border-lydian-border-light flex items-center justify-center">
                        <span className="text-xs">AI</span>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-lydian-text-inverse mb-2">Merhaba! Ben Lydian 👋</h2>
                      <p className="text-lydian-text-inverse/90 text-lg leading-relaxed max-w-2xl">
                        Sesli asistanınızım. Seyahat planlamanızda size yardımcı olmak için buradayım.
                        Oteller, uçuşlar, turlar - ne ararsanız, sadece söyleyin!
                      </p>
                    </div>
                  </div>
                  <button
                  onClick={() => setShowCommands(false)}
                  className="w-12 h-12 bg-lydian-glass-dark-heavy hover:bg-lydian-bg/30 rounded-xl flex items-center justify-center transition-colors flex-shrink-0">

                    <X className="w-6 h-6 text-lydian-text-inverse" />
                  </button>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="bg-lydian-glass-dark-medium backdrop-blur rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-lydian-text-inverse">25+</div>
                    <div className="text-lydian-text-inverse/80 text-sm mt-1">Sesli Komut</div>
                  </div>
                  <div className="bg-lydian-glass-dark-medium backdrop-blur rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-lydian-text-inverse">TR/EN</div>
                    <div className="text-lydian-text-inverse/80 text-sm mt-1">Dil Desteği</div>
                  </div>
                  <div className="bg-lydian-glass-dark-medium backdrop-blur rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-lydian-text-inverse">7/24</div>
                    <div className="text-lydian-text-inverse/80 text-sm mt-1">Her Zaman Hazır</div>
                  </div>
                </div>
              </div>

              {/* Quick Commands Section */}
              <div className="p-8 bg-gradient-to-b from-gray-50 to-white">
                {/* Popular Commands - Quick Access */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-lydian-text-inverse mb-4 flex items-center gap-2">
                    ⚡ Popüler Komutlar
                    <span className="text-sm font-normal text-lydian-text-muted">(En çok kullanılanlar)</span>
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                  { cmd: 'oteller', icon: '🏨', desc: 'Otel ara' },
                  { cmd: 'uçuşlar', icon: '✈️', desc: 'Uçuş bul' },
                  { cmd: 'istanbul ara', icon: '🌆', desc: 'İstanbul' },
                  { cmd: 'turlar', icon: '🗺️', desc: 'Tur keşfet' },
                  { cmd: 'sepet', icon: '🛒', desc: 'Sepetim' },
                  { cmd: 'rezervasyonlar', icon: '📅', desc: 'Rezervasyonlarım' },
                  { cmd: 'yapay zeka asistan', icon: '🤖', desc: 'AI Asistan' },
                  { cmd: 'profil', icon: '👤', desc: 'Profilim' }].
                  map((item, i) =>
                  <motion.button
                    key={i}
                    onClick={() => speak(`"${item.cmd}" diyerek ${item.desc} sayfasına gidebilirsiniz`)}
                    className="bg-gradient-to-br from-purple-100 to-blue-100 hover:from-purple-200 hover:to-blue-200 rounded-xl p-4 text-left transition-all border-2 border-purple-200 hover:border-purple-400 hover:scale-105"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}>

                        <div className="text-3xl mb-2">{item.icon}</div>
                        <div className="font-bold text-lydian-text-inverse text-sm mb-1">"{item.cmd}"</div>
                        <div className="text-xs text-lydian-text-dim">{item.desc}</div>
                      </motion.button>
                  )}
                  </div>
                </div>

                {/* All Commands by Category */}
                <div className="grid gap-6">
                  {Object.entries(
                  commands.reduce((acc, cmd) => {
                    if (!acc[cmd.category]) {
                      acc[cmd.category] = [];
                    }
                    acc[cmd.category].push(cmd);
                    return acc;
                  }, {} as Record<string, typeof commands>)
                ).map(([category, cmds]) =>
                <div key={category}>
                      <h3 className="text-lg font-bold text-lydian-text-inverse mb-3 flex items-center gap-2">
                        <div className="w-1 h-6 bg-gradient-to-b from-lydian-secondary to-lydian-primary rounded-full" />
                        {category}
                      </h3>
                      <div className="grid gap-3">
                        {cmds.map((cmd, index) =>
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 hover:from-purple-100 hover:to-blue-100 transition-colors border border-purple-200">

                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h4 className="font-semibold text-lydian-text-inverse mb-1">
                                  "{cmd.command}"
                                </h4>
                                <p className="text-sm text-lydian-text-dim mb-2">{cmd.description}</p>
                                <div className="flex flex-wrap gap-2">
                                  {cmd.patterns.map((pattern, i) =>
                            <span
                              key={i}
                              className="text-xs px-2 py-1 bg-lydian-glass-dark rounded-lg text-lydian-text-muted border border-purple-200">

                                      💬 {pattern}
                                    </span>
                            )}
                                </div>
                              </div>
                              <Mic className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                            </div>
                          </motion.div>
                    )}
                      </div>
                    </div>
                )}
                </div>

                {/* Pro Tips & Features */}
                <div className="mt-8 grid md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6">
                    <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2 text-lg">
                      <Sparkles className="w-5 h-5" />
                      💡 Nasıl Kullanılır?
                    </h4>
                    <ul className="text-sm text-blue-800 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-lydian-primary font-bold">1.</span>
                        <span>Mikrofon butonuna tıklayın</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-lydian-primary font-bold">2.</span>
                        <span>Komutunuzu net ve açık bir şekilde söyleyin</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-lydian-primary font-bold">3.</span>
                        <span>Lydian komutunuzu işleyip size rehberlik edecek</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
                    <h4 className="font-bold text-purple-900 mb-3 flex items-center gap-2 text-lg">
                      <Volume2 className="w-5 h-5" />
                      🎯 Lydian'ın Yetenekleri
                    </h4>
                    <ul className="text-sm text-purple-800 space-y-2">
                      <li className="flex items-start gap-2">
                        <span>✨</span>
                        <span><strong>Türkçe & İngilizce</strong> komutları anlıyor</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>✨</span>
                        <span><strong>Akıllı eşleştirme</strong> - Benzer ifadeleri de anlıyor</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>✨</span>
                        <span><strong>Doğal dil</strong> - "Antalya otelleri" gibi söyleyebilirsiniz</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>✨</span>
                        <span><strong>Sesli geri bildirim</strong> - Her komutta size yanıt veriyor</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Footer Message */}
                <div className="mt-6 text-center p-6 bg-gradient-to-r from-purple-100 via-blue-100 to-cyan-100 rounded-xl border-2 border-purple-200">
                  <p className="text-lydian-text-muted text-lg">
                    🌟 <strong>İpucu:</strong> "Komutlar" diyerek bu paneli istediğiniz zaman açabilirsiniz!
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </>);

};

export default VoiceCommandWidget;