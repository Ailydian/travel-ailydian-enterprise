/**
 * Global Page Loader Component
 * Ultra-fast loading indicator for page transitions
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Sparkles } from 'lucide-react';

interface PageLoaderProps {
  isLoading: boolean;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-white/80 backdrop-blur-sm"
        >
          <div className="relative">
            {/* Animated Plane */}
            <motion.div
              animate={{
                x: [0, 100, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative z-10"
            >
              <Plane className="w-16 h-16 text-lydian-primary" />
            </motion.div>

            {/* Sparkles */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -top-2 -right-2"
            >
              <Sparkles className="w-6 h-6 text-lydian-secondary" />
            </motion.div>

            {/* Loading Bar */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32">
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="h-full w-1/2 bg-gradient-to-r from-lydian-primary to-lydian-secondary rounded-full"
                />
              </div>
            </div>

            {/* Loading Text */}
            <motion.p
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-medium text-gray-300"
            >
              Yükleniyor...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
