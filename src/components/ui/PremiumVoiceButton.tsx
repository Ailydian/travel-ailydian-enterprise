/**
 * Premium Voice Assistant Button
 * Animated voice button for header with attention-grabbing pulse every 10 seconds
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Waves } from 'lucide-react';
import { useVoiceCommand } from '../../context/VoiceCommandContext';

const PremiumVoiceButton: React.FC = () => {
  const { isListening, startListening, stopListening } = useVoiceCommand();
  const [showPulse, setShowPulse] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Attention pulse every 10 seconds
  useEffect(() => {
    if (!isListening) {
      const interval = setInterval(() => {
        setShowPulse(true);
        setTimeout(() => setShowPulse(false), 2000);
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [isListening]);

  const handleClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  if (!mounted) return null;

  return (
    <div className="relative">
      {/* Attention Pulse Rings (every 10 seconds) */}
      <AnimatePresence>
        {showPulse && !isListening && (
          <>
            <motion.div
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 2.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 pointer-events-none"
            />
            <motion.div
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 pointer-events-none"
            />
            <motion.div
              initial={{ scale: 1, opacity: 0.4 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.4 }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 pointer-events-none"
            />
          </>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        onClick={handleClick}
        className={`relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all touch-target group ${
          isListening
            ? 'bg-gradient-to-br from-red-500 to-pink-500 shadow-lg shadow-red-500/50'
            : 'bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500 shadow-lg hover:shadow-xl hover:shadow-purple-500/50'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={
          isListening
            ? {
                scale: [1, 1.1, 1],
                transition: {
                  duration: 1,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }
              }
            : showPulse
            ? {
                scale: [1, 1.15, 1],
                transition: {
                  duration: 0.6,
                  repeat: 2,
                  ease: 'easeInOut'
                }
              }
            : {}
        }
        aria-label={isListening ? 'Dinlemeyi Durdur' : 'Sesli Asistan'}
      >
        {/* Background Glow */}
        <div
          className={`absolute inset-0 rounded-full blur-md transition-opacity ${
            isListening
              ? 'bg-gradient-to-br from-red-400 to-pink-400 opacity-75'
              : 'bg-gradient-to-br from-purple-400 to-pink-400 opacity-50 group-hover:opacity-75'
          }`}
        />

        {/* Icon Container */}
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {isListening ? (
              <motion.div
                key="listening"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center"
              >
                {/* Animated Sound Waves */}
                <div className="relative w-7 h-7 md:w-8 md:h-8">
                  <motion.div
                    animate={{
                      scaleY: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                    className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-3 bg-white rounded-full"
                  />
                  <motion.div
                    animate={{
                      scaleY: [1, 2, 1],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.1
                    }}
                    className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-1 h-5 bg-white rounded-full"
                  />
                  <motion.div
                    animate={{
                      scaleY: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.2
                    }}
                    className="absolute right-1 top-1/2 -translate-y-1/2 w-1 h-3 bg-white rounded-full"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Mic className="w-6 h-6 md:w-7 md:h-7 text-white drop-shadow-lg" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Active Ring */}
        {isListening && (
          <motion.div
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.8, 0, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute inset-0 rounded-full border-2 border-white pointer-events-none"
          />
        )}
      </motion.button>

      {/* Status Indicator Dot */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full border-2 border-red-500 shadow-lg z-20"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="w-full h-full rounded-full bg-red-500"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tooltip - Always visible on desktop */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="hidden sm:block absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none"
      >
        <div className={`px-3 py-1.5 rounded-lg text-xs font-medium shadow-lg transition-colors ${
          isListening
            ? 'bg-red-500 text-white'
            : 'bg-gray-900 text-white'
        }`}>
          <div className="flex items-center gap-1.5">
            <Mic className="w-3 h-3" />
            <span>{isListening ? 'Dinliyorum...' : 'Sesli Asistan'}</span>
          </div>
          <div className={`absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 ${
            isListening ? 'bg-red-500' : 'bg-gray-900'
          }`} />
        </div>
      </motion.div>

      {/* Mobile: Status Text */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="lg:hidden absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap"
          >
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-2 h-2 bg-white rounded-full"
              />
              <span>Dinliyorum...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PremiumVoiceButton;
