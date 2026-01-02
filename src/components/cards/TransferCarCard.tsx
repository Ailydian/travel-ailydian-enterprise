'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Users, Star, ArrowRight, Clock } from 'lucide-react';
import { AnimatedCarIcon } from '../icons/AnimatedCarIcon';

interface TransferCarCardProps {
  id: string | number;
  slug: string;
  title: string;
  route?: string;
  from?: string;
  to?: string;
  price: string;
  duration?: string;
  capacity?: number;
  rating?: number;
  reviews?: number;
  category?: string;
  popular?: boolean;
  href: string;
  className?: string;
}

export const TransferCarCard: React.FC<TransferCarCardProps> = ({
  slug,
  title,
  route,
  from,
  to,
  price,
  duration,
  capacity,
  rating = 4.8,
  reviews = 0,
  category,
  popular,
  href,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
      transition={{ duration: 0.3 }}
      className={`group relative bg-gradient-to-br from-slate-900 via-black to-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${className}`}>

      {/* Popular Badge */}
      {popular &&
      <div className="absolute top-4 right-4 z-10">
          <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">

            ⭐ POPÜLER
          </motion.div>
        </div>
      }

      {/* Category Badge */}
      {category &&
      <div className="absolute top-4 left-4 z-10">
          <div className="bg-white/10 backdrop-blur-sm text-gray-400 px-3 py-1 rounded-full text-xs font-semibold shadow-md">
            {category}
          </div>
        </div>
      }

      {/* Animated Car Icon - Premium */}
      <div className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8 flex items-center justify-center min-h-[280px]">
        <AnimatedCarIcon size="lg" className="w-full max-w-xs" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-500 transition-colors">
          {title}
        </h3>

        {/* Route Info */}
        {(from || to || route) &&
        <div className="flex items-start gap-2 mb-4 text-sm text-gray-400">
            <MapPin className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
            <div className="flex-1">
              {route ||
            <>
                  <span className="font-medium">{from}</span>
                  {to &&
              <>
                      <ArrowRight className="w-3 h-3 inline mx-1" />
                      <span className="font-medium">{to}</span>
                    </>
              }
                </>
            }
            </div>
          </div>
        }

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {duration &&
          <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>{duration}</span>
            </div>
          }
          {capacity &&
          <div className="flex items-center gap-2 text-sm text-gray-400">
              <Users className="w-4 h-4 text-blue-500" />
              <span>{capacity} Kişi</span>
            </div>
          }
        </div>

        {/* Rating */}
        {rating &&
        <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-white">{rating.toFixed(1)}</span>
            </div>
            {reviews > 0 &&
          <span className="text-sm text-gray-300">({reviews} değerlendirme)</span>
          }
          </div>
        }

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-white/20">
          <div>
            <div className="text-sm text-gray-300">Başlangıç fiyatı</div>
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700">
              {price}
            </div>
          </div>
          <Link href={href}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group">

              Detay Gör
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Hover Effect Gradient Border */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 opacity-20 blur-xl" />
      </div>
    </motion.div>);

};