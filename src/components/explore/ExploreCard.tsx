import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Users, Heart } from 'lucide-react';

interface ExploreCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
  location?: string;
  duration?: string;
  category: string;
  href: string;
}

export const ExploreCard: React.FC<ExploreCardProps> = ({
  id, title, image, price, rating, reviewCount, location, duration, category, href
}) => {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ y: -4 }}
        className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
      >
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute top-3 right-3">
            <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
              <Heart className="w-5 h-5 text-gray-700 hover:text-red-500" />
            </button>
          </div>
          <div className="absolute bottom-3 left-3">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-900">
              {category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <h3 className="font-bold text-lg text-gray-900 group-hover:text-lydian-primary transition-colors line-clamp-2">
            {title}
          </h3>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
            {location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{location}</span>
              </div>
            )}
            {duration && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{duration}</span>
              </div>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-lydian-primary text-white px-2 py-1 rounded-lg">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-bold text-sm">{rating.toFixed(1)}</span>
            </div>
            <span className="text-sm text-gray-600">({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})</span>
          </div>

          {/* Price */}
          <div className="flex items-end justify-between pt-3 border-t border-gray-200">
            <div>
              <span className="text-sm text-gray-600">From</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-lydian-primary">₺{price}</span>
                <span className="text-sm text-gray-600">/person</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
