import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, X, Info, Sparkles } from 'lucide-react';
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
      {/* Floating Voice Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <div className="relative">
          {/* Pulse Animation when listening */}
          {isListening && (
            <motion.div
              className="absolute inset-0 rounded-full bg-ailydian-primary"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          )}

          {/* Main Button */}
          <motion.button
            onClick={toggleListening}
            className={`relative w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all ${
              isListening
                ? 'bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                : 'bg-gradient-to-br from-ailydian-primary to-ailydian-secondary hover:from-ailydian-secondary hover:to-ailydian-primary'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isListening ? (
              <MicOff className="w-8 h-8 text-white" />
            ) : (
              <Mic className="w-8 h-8 text-white" />
            )}

            {/* Processing Indicator */}
            {isProcessing && (
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </motion.button>

          {/* Info Button */}
          <motion.button
            onClick={() => setShowCommands(!showCommands)}
            className="absolute -top-2 -left-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-ailydian-primary hover:bg-gray-50 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Info className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Feedback Bubble */}
        <AnimatePresence>
          {(feedback || transcript) && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-20 right-0 min-w-64 max-w-sm"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-4 border border-gray-200">
                {feedback && (
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-2">
                    <Sparkles className="w-4 h-4 text-ailydian-primary" />
                    {feedback}
                  </div>
                )}
                {transcript && isListening && (
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Dinleniyor:</span> {transcript}
                  </div>
                )}
                {lastCommand && !isListening && (
                  <div className="text-xs text-gray-500 mt-1">
                    Son komut: {lastCommand}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

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
              <div className="bg-gradient-to-r from-ailydian-primary to-ailydian-secondary p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Volume2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Sesli Komutlar</h2>
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
                        <div className="w-1 h-6 bg-ailydian-primary rounded-full" />
                        {category}
                      </h3>
                      <div className="grid gap-3">
                        {cmds.map((cmd, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors"
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
                                      className="text-xs px-2 py-1 bg-white rounded-lg text-gray-700 border border-gray-200"
                                    >
                                      {pattern}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <Mic className="w-5 h-5 text-ailydian-primary flex-shrink-0 mt-1" />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Usage Tips */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    Kullanım İpuçları
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                    <li>Mikrofon butonuna tıklayın ve komutunuzu net bir şekilde söyleyin</li>
                    <li>Türkçe veya İngilizce komut kullanabilirsiniz</li>
                    <li>Komutları doğal bir dille söyleyebilirsiniz (örn: "Antalya otelleri")</li>
                    <li>Her komut sonrası sesli geri bildirim alacaksınız</li>
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
