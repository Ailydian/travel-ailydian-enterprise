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
    commands
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
        {!isMinimized && (
          <motion.div
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-2xl shadow-2xl p-6 backdrop-blur-lg">
              <div className="flex items-center justify-between gap-4">
                {/* Left Side - Avatar & Info */}
                <div className="flex items-center gap-4">
                  {/* Lydian Avatar with Animation */}
                  <motion.div
                    animate={isListening ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="relative"
                  >
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl relative overflow-hidden">
                      {isListening ? (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500"
                          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      ) : null}
                      <span className="text-4xl relative z-10">🎙️</span>
                    </div>
                    {isListening && (
                      <>
                        <motion.div
                          className="absolute inset-0 rounded-full border-4 border-green-400"
                          animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.div
                          className="absolute inset-0 rounded-full border-4 border-green-300"
                          animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                        />
                      </>
                    )}
                  </motion.div>

                  {/* Message & Status */}
                  <div className="text-white">
                    <h3 className="font-bold text-xl flex items-center gap-2 mb-1">
                      <span>🌟 Lydian - Sesli Asistanınız</span>
                      {isProcessing && (
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="inline-block"
                        >
                          ⚡
                        </motion.span>
                      )}
                    </h3>
                    <p className="text-sm text-white/90 font-medium">
                      {isListening ? (
                        <span className="flex items-center gap-2">
                          <Waves className="w-4 h-4 animate-pulse" />
                          Sizi dinliyorum... Ne söylemek istersiniz?
                        </span>
                      ) : (
                        "🎯 Benimle konuşmak için mikrofon butonuna tıklayın!"
                      )}
                    </p>
                    {transcript && isListening && (
                      <motion.p
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-white/80 mt-1 bg-white/10 rounded px-2 py-1 inline-block"
                      >
                        📝 "{transcript}"
                      </motion.p>
                    )}
                  </div>
                </div>

                {/* Right Side - Action Buttons */}
                <div className="flex items-center gap-3">
                  {/* Main Mic Button */}
                  <motion.button
                    onClick={toggleListening}
                    className={`relative w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all ${
                      isListening
                        ? 'bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                        : 'bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isListening ? (
                      <MicOff className="w-8 h-8 text-white" />
                    ) : (
                      <Mic className="w-8 h-8 text-white" />
                    )}
                    {isProcessing && (
                      <motion.div
                        className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full border-2 border-white"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                  </motion.button>

                  {/* Info Button */}
                  <motion.button
                    onClick={() => setShowCommands(!showCommands)}
                    className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center text-white transition-colors backdrop-blur"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="Komutları göster"
                  >
                    <Info className="w-5 h-5" />
                  </motion.button>

                  {/* Minimize Button */}
                  <motion.button
                    onClick={() => setIsMinimized(true)}
                    className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center text-white transition-colors backdrop-blur"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="Küçült"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Feedback Display */}
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 bg-white/20 backdrop-blur rounded-xl p-3 border border-white/30"
                >
                  <div className="flex items-center gap-2 text-white text-sm font-medium">
                    <Sparkles className="w-4 h-4" />
                    {feedback}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized Floating Button */}
      <AnimatePresence>
        {isMinimized && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsMinimized(false)}
            className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full shadow-2xl flex items-center justify-center text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Mic className="w-8 h-8" />
            {isListening && (
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-green-400"
                animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Commands Modal */}
      <AnimatePresence>
        {showCommands && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCommands(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
                      <Volume2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">🎙️ Lydian Sesli Komutlar</h2>
                      <p className="text-white/90 text-sm">Tüm özellikleri sesinizle kontrol edin</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowCommands(false)}
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Commands List */}
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
                <div className="grid gap-6">
                  {Object.entries(
                    commands.reduce((acc, cmd) => {
                      if (!acc[cmd.category]) {
                        acc[cmd.category] = [];
                      }
                      acc[cmd.category].push(cmd);
                      return acc;
                    }, {} as Record<string, typeof commands>)
                  ).map(([category, cmds]) => (
                    <div key={category}>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <div className="w-1 h-6 bg-gradient-to-b from-purple-600 to-blue-600 rounded-full" />
                        {category}
                      </h3>
                      <div className="grid gap-3">
                        {cmds.map((cmd, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 hover:from-purple-100 hover:to-blue-100 transition-colors border border-purple-200"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 mb-1">
                                  "{cmd.command}"
                                </h4>
                                <p className="text-sm text-gray-600 mb-2">{cmd.description}</p>
                                <div className="flex flex-wrap gap-2">
                                  {cmd.patterns.map((pattern, i) => (
                                    <span
                                      key={i}
                                      className="text-xs px-2 py-1 bg-white rounded-lg text-gray-700 border border-purple-200"
                                    >
                                      💬 {pattern}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <Mic className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Usage Tips */}
                <div className="mt-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-4">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    💡 Kullanım İpuçları
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                    <li>Mikrofon butonuna tıklayın ve komutunuzu net bir şekilde söyleyin</li>
                    <li>Türkçe veya İngilizce komut kullanabilirsiniz</li>
                    <li>Komutları doğal bir dille söyleyebilirsiniz (örn: "Antalya otelleri")</li>
                    <li>Her komut sonrası Lydian size sesli geri bildirim verecek</li>
                    <li>Benzer komutları da anlayabilirim -걱정하지 마세요!</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VoiceCommandWidget;
