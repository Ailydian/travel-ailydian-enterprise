import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  AnimatedPlane,
  AnimatedGlobe,
  MapPinAnimated,
  CompassAnimated } from
'../ui/AnimatedSVG';
import { Sparkles } from 'lucide-react';

// Dynamic import for VideoBackground to avoid SSR issues
const VideoBackground = dynamic(() => import('../ui/VideoBackground'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-lydian-primary/20 to-lydian-secondary/20" />
});

export interface AnimatedHeroSectionProps {
  onSearch?: (query: string) => void;
}

export const AnimatedHeroSection: React.FC<AnimatedHeroSectionProps> = ({ onSearch }) => {

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background - Changes every 60 seconds */}
      <div className="absolute inset-0 z-0">
        <VideoBackground
          autoPlay={true}
          muted={true}
          loop={true}
          overlay={true}
          overlayOpacity={0.6}
          changeInterval={60000} />

        {/* Additional animated gradient overlay for premium effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-lydian-primary/20 via-transparent to-lydian-secondary/20"
          animate={{
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 5,
            repeat: Infinity
          }} />

      </div>

      {/* Animated decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Flying planes */}
        <motion.div
          className="absolute top-1/4 left-0"
          animate={{
            x: ['0%', '100%'],
            y: [0, -50, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}>

          <AnimatedPlane size={60} color="#FF214D40" speed={2} />
        </motion.div>

        <motion.div
          className="absolute top-2/3 right-0"
          animate={{
            x: ['0%', '-100%'],
            y: [0, 30, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
            delay: 5
          }}>

          <AnimatedPlane size={50} color="#00D4FF40" speed={2.5} />
        </motion.div>

        {/* Floating decorations */}
        <motion.div
          className="absolute top-20 right-20 opacity-20"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}>

          <AnimatedGlobe size={200} />
        </motion.div>

        <motion.div
          className="absolute bottom-40 left-40 opacity-30"
          animate={{
            y: [-20, 20, -20]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}>

          <CompassAnimated size={150} />
        </motion.div>

        {/* Floating map pins */}
        {[
        { top: '20%', left: '15%' },
        { top: '40%', right: '20%' },
        { bottom: '30%', left: '25%' },
        { top: '60%', right: '30%' }].
        map((pos, i) =>
        <motion.div
          key={i}
          className="absolute opacity-40"
          style={pos}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scale: 1,
            y: [-10, 10, -10]
          }}
          transition={{
            opacity: { duration: 3, repeat: Infinity, delay: i * 0.5 },
            y: { duration: 4, repeat: Infinity, delay: i * 0.3 }
          }}>

            <MapPinAnimated size={30} color="#FF214D" />
          </motion.div>
        )}

        {/* Particle effects */}
        {[...Array(30)].map((_, i) =>
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-lydian-primary/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            y: [-20, -60, -20],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 5
          }} />

        )}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8">

            <div className="flex items-center justify-center gap-4 mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}>

                <Sparkles className="w-12 h-12 text-lydian-primary" />
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-bold text-lydian-text">
                Discover Your Next
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-lydian-primary via-lydian-secondary to-lydian-neon-blue animate-gradient-shift">
                  Adventure
                </span>
              </h1>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}>

                <Sparkles className="w-12 h-12 text-lydian-secondary" />
              </motion.div>
            </div>

            <motion.p
              className="text-xl md:text-2xl text-lydian-text-muted max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}>

              AI-powered travel platform with VR previews, blockchain security,
              and personalized recommendations
            </motion.p>
          </motion.div>


          {/* Feature Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4 mb-8">

            {[
            { icon: '🤖', text: 'AI-Powered' },
            { icon: '🎮', text: 'VR Previews' },
            { icon: '🔐', text: 'Blockchain Secure' },
            { icon: '⚡', text: 'Instant Booking' }].
            map((feature, i) =>
            <motion.div
              key={i}
              className="flex items-center gap-2 bg-glass-dark backdrop-blur-md px-6 py-3 rounded-full border border-lydian-primary/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + i * 0.1 }}
              whileHover={{ scale: 1.1, borderColor: 'rgba(255, 33, 77, 0.5)' }}>

                <span className="text-2xl">{feature.icon}</span>
                <span className="text-lydian-text font-medium">{feature.text}</span>
              </motion.div>
            )}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4">

            <Link href="/destinations">
              <motion.button
                className="bg-gradient-to-r from-lydian-primary to-lydian-secondary text-lydian-text-inverse px-8 py-4 rounded-xl font-semibold shadow-neon hover:shadow-neon-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>

                Explore Destinations
              </motion.button>
            </Link>

            <Link href="/ai-planner">
              <motion.button
                className="bg-glass-dark backdrop-blur-md border-2 border-lydian-primary text-lydian-primary px-8 py-4 rounded-xl font-semibold hover:bg-lydian-primary/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>

                Try AI Planner
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">

            {[
            { value: '10K+', label: 'Destinations' },
            { value: '50K+', label: 'Happy Travelers' },
            { value: '4.9', label: 'Average Rating' },
            { value: '24/7', label: 'Support' }].
            map((stat, i) =>
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 + i * 0.1 }}>

                <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lydian-primary to-lydian-secondary mb-2">
                  {stat.value}
                </div>
                <div className="text-lydian-text-muted">{stat.label}</div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}>

        <div className="w-6 h-10 border-2 border-lydian-primary/50 rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 bg-lydian-primary rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }} />

        </div>
      </motion.div>
    </section>);

};

export default AnimatedHeroSection;