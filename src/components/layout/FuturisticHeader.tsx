/**
 * 🚀 FUTURISTIC HEADER 2025
 * Apple Vision Pro Spatial Design + Awwwards Winner Aesthetics
 * Features: Floating Orbs, Magnetic Hover, 3D Depth, Aurora Glow
 */

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import {
  Hotel,
  Plane,
  Car,
  Compass,
  Bus,
  Home,
  User,
  Heart,
  ShoppingCart,
  Menu,
  X,
  HelpCircle,
  Globe,
  Users,
  Search,
  Sparkles,
  Zap } from
'lucide-react';
import { useCart } from '../../context/CartContext';
import LanguageSwitcher from '../LanguageSwitcher';
import { LyDianLogo } from '../branding/LyDianLogo';
import { ThemeToggle } from '../theme/ThemeToggle';

export const FuturisticHeader: React.FC = () => {
  const router = useRouter();
  const { getItemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const headerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for magnetic effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const navigation = [
  { name: 'Turlar', href: '/tours', icon: Compass, color: '#667EEA' },
  { name: 'Transferler', href: '/transfers', icon: Bus, color: '#00BAFF' },
  { name: 'Araç Kiralama', href: '/car-rentals', icon: Car, color: '#FF9500' },
  { name: 'Oteller', href: '/hotels', icon: Hotel, color: '#EC4899' },
  { name: 'Konaklama', href: '/rentals', icon: Home, color: '#10B981' }];


  const isActive = (href: string) => router.pathname === href || router.pathname.startsWith(href + '/');

  return (
    <>
      {/* 🌌 FLOATING HEADER - Spatial Design */}
      <motion.header
        ref={headerRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="fixed top-0 left-0 right-0 z-50">

        {/* Aurora Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00BAFF]/5 via-[#667EEA]/5 to-[#FF9500]/5 backdrop-blur-3xl" />

        {/* Animated Glow Orbs */}
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[#00BAFF]/10 to-[#667EEA]/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }} />

        <motion.div
          className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-r from-[#FF9500]/10 to-[#EC4899]/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut'
          }} />


        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* 🎨 Logo with 3D Depth */}
            <motion.div
              whileHover={{ scale: 1.05, rotateY: 5 }}
              style={{ transformStyle: 'preserve-3d' }}>

              <Link href="/">
                <LyDianLogo variant="full" size="md" animated={true} />
              </Link>
            </motion.div>

            {/* 🔮 Floating Navigation Orbs */}
            <nav className="hidden lg:flex items-center gap-4">
              {navigation.map((item, index) =>
              <FloatingNavOrb
                key={item.name}
                item={item}
                isActive={isActive(item.href)}
                index={index}
                mouseX={mouseX}
                mouseY={mouseY} />

              )}
            </nav>

            {/* 🎯 Right Actions - Spatial Ornaments */}
            <div className="flex items-center gap-3">
              {/* AI Search */}
              <motion.button
                onClick={() => setSearchOpen(!searchOpen)}
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#667EEA]/20 to-[#00BAFF]/20 backdrop-blur-xl border border-lydian-border-light rounded-2xl shadow-lg group">

                <Search className="w-5 h-5 text-[#667EEA]" />
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#667EEA]/30 to-[#00BAFF]/30 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }} />

                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400" />
              </motion.button>

              {/* Theme Toggle - Always Visible */}
              <ThemeToggle variant="icon" />

              {/* Partner Button - Prominent */}
              <Link href="/partner">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#667EEA] to-[#00BAFF] rounded-xl shadow-lg cursor-pointer group relative overflow-hidden"
                >
                  <Users className="w-5 h-5 text-white" />
                  <span className="text-sm font-bold text-white">Partner Ol</span>
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              </Link>

              {/* Favorites */}
              <FloatingOrb icon={Heart} href="/favorites" color="#EC4899" badge={0} />

              {/* Cart */}
              <FloatingOrb icon={ShoppingCart} href="/cart" color="#FF9500" badge={getItemCount()} />

              {/* Profile */}
              <Link href="/profile/dashboard">
                <motion.div
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-gradient-to-br from-[#00BAFF] to-[#667EEA] rounded-2xl flex items-center justify-center shadow-lg cursor-pointer">

                  <User className="w-5 h-5 text-lydian-text-inverse" />
                </motion.div>
              </Link>

              {/* Mobile Menu */}
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="lg:hidden w-12 h-12 flex items-center justify-center bg-lydian-glass-dark-medium backdrop-blur-xl border border-lydian-border-light rounded-2xl">

                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* 🔍 AI-Powered Search Panel */}
        <AnimatePresence>
          {searchOpen &&
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="relative border-t border-lydian-border-light bg-lydian-glass-dark backdrop-blur-2xl">

              <div className="max-w-4xl mx-auto px-6 py-6">
                <div className="relative">
                  <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="AI destekli arama... (örn: Antalya'da lüks otel)"
                  className="w-full px-6 py-4 pl-14 bg-lydian-glass-dark-medium backdrop-blur-xl border-2 border-lydian-border-light rounded-3xl text-lydian-text-inverse placeholder-white/60 focus:border-[#667EEA] focus:ring-4 focus:ring-[#667EEA]/20 outline-none transition-all"
                  autoFocus />

                  <Sparkles className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-[#667EEA] animate-pulse" />

                  {/* Aurora Glow Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#667EEA]/20 via-[#00BAFF]/20 to-[#FF9500]/20 blur-xl opacity-50 -z-10" />
                </div>

                {/* Quick Suggestions */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Antalya Turları', 'Havalimanı Transfer', 'Lüks Araç', 'Kapadokya Otel'].map((suggestion) =>
                <motion.button
                  key={suggestion}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-lydian-glass-dark backdrop-blur-sm border border-lydian-border-light rounded-full text-lydian-text-inverse/80 text-sm hover:bg-lydian-glass-dark-medium transition-all">

                      <Zap className="w-3 h-3 inline mr-1" />
                      {suggestion}
                    </motion.button>
                )}
                </div>
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </motion.header>

      {/* Spacer to prevent content jump */}
      <div className="h-20" />
    </>);

};

// 🔮 Floating Navigation Orb Component with Magnetic Effect
interface FloatingNavOrbProps {
  item: any;
  isActive: boolean;
  index: number;
  mouseX: any;
  mouseY: any;
}

const FloatingNavOrb: React.FC<FloatingNavOrbProps> = ({ item, isActive, index, mouseX, mouseY }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Magnetic effect
  const distance = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 15 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    const unsubscribe = mouseX.on('change', (latest) => {
      if (ref.current && isHovered) {
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distX = latest - centerX;
        const distY = mouseY.get() - centerY;
        const dist = Math.sqrt(distX * distX + distY * distY);
        distance.set(dist);

        // Magnetic pull within 100px
        if (dist < 100) {
          x.set(distX * 0.3);
          y.set(distY * 0.3);
        } else {
          x.set(0);
          y.set(0);
        }
      }
    });

    return () => unsubscribe();
  }, [mouseX, mouseY, isHovered, distance, x, y]);

  const Icon = item.icon;

  return (
    <Link href={item.href}>
      <motion.a
        ref={ref}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={{ x, y }}
        className="relative group cursor-pointer">

        <motion.div
          whileHover={{ scale: 1.1, rotateZ: isActive ? 0 : 5 }}
          whileTap={{ scale: 0.95 }}
          className={`
            relative flex items-center gap-3 px-5 py-3 rounded-2xl backdrop-blur-xl border transition-all
            ${isActive ?
          'bg-gradient-to-br from-white/20 to-white/10 border-white/40 shadow-lg' :
          'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30'}
          `
          }>

          {/* Icon with color */}
          <motion.div
            animate={isActive ? { rotate: [0, 360] } : {}}
            transition={{ duration: 0.5 }}>

            <Icon className="w-5 h-5" style={{ color: isActive ? item.color : '#fff' }} />
          </motion.div>

          {/* Text */}
          <span className={`font-semibold text-sm ${isActive ? 'text-white' : 'text-white/80'}`}>
            {item.name}
          </span>

          {/* Active Indicator */}
          {isActive &&
          <motion.div
            layoutId="activeOrb"
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
            style={{ backgroundColor: item.color }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }} />

          }

          {/* Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"
            style={{
              background: `radial-gradient(circle at center, ${item.color}40, transparent)`,
              filter: 'blur(20px)'
            }} />

        </motion.div>

        {/* Floating animation */}
        <motion.div
          animate={{
            y: [0, -5, 0]
          }}
          transition={{
            duration: 2 + index * 0.2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute inset-0 pointer-events-none" />

      </motion.a>
    </Link>);

};

// 🎯 Floating Orb for Actions
interface FloatingOrbProps {
  icon: any;
  href: string;
  color: string;
  badge?: number;
}

const FloatingOrb: React.FC<FloatingOrbProps> = ({ icon: Icon, href, color, badge }) => {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-12 h-12 flex items-center justify-center bg-lydian-glass-dark-medium backdrop-blur-xl border border-lydian-border-light rounded-2xl shadow-lg cursor-pointer group">

        <Icon className="w-5 h-5 text-lydian-text-inverse" />

        {/* Badge */}
        {badge !== undefined && badge > 0 &&
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center bg-gradient-to-br from-lydian-primary to-lydian-primary rounded-full text-lydian-text-inverse text-xs font-bold shadow-lg">

            {badge}
          </motion.div>
        }

        {/* Glow on Hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"
          style={{
            background: `radial-gradient(circle at center, ${color}40, transparent)`,
            filter: 'blur(20px)'
          }} />

      </motion.div>
    </Link>);

};


// Default export for compatibility
export default FuturisticHeader;