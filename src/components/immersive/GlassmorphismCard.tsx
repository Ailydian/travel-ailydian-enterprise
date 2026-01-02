import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, MapPin, Users, Calendar } from 'lucide-react';
import { immersiveAnimations } from '@/utils/immersiveAnimations';

export interface GlassmorphismCardProps {
  image: string;
  title: string;
  description?: string;
  location?: string;
  price: number | string;
  originalPrice?: number | string;
  rating?: number;
  reviews?: number;
  duration?: string;
  category?: string;
  badge?: string;
  onAddToCart?: () => void;
  onClick?: () => void;
  glowOnHover?: boolean;
  perspective?: boolean;
  index?: number;
}

/**
 * 💎 GLASSMORPHISM CARD COMPONENT
 * Premium card design with blur backdrop and glow effects
 * Perfect for tours, hotels, and experiences
 */
export const GlassmorphismCard: React.FC<GlassmorphismCardProps> = ({
  image,
  title,
  description,
  location,
  price,
  originalPrice,
  rating = 0,
  reviews = 0,
  duration,
  category,
  badge,
  onAddToCart,
  onClick,
  glowOnHover = true,
  perspective = true,
  index = 0
}) => {
  const formattedPrice = typeof price === 'string' ? price : `₺${price}`;
  const formattedOriginalPrice =
  originalPrice && typeof originalPrice === 'string' ? originalPrice : originalPrice ? `₺${originalPrice}` : null;

  return (
    <motion.div
      className="group relative h-full"
      {...immersiveAnimations.stagger.animate(index)}
      initial={immersiveAnimations.stagger.initial}
      {...perspective ? immersiveAnimations.perspective : {}}>

      <motion.div
        className="relative h-full rounded-2xl overflow-hidden cursor-pointer"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--lydian-glass-light)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}
        {...glowOnHover ? immersiveAnimations.cardHover : {}}
        onClick={onClick}>

        {/* Image Section */}
        <div className="relative h-64 overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }} />


          {/* Gradient Overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
            style={{ pointerEvents: 'none' }} />


          {/* Badge */}
          {badge &&
          <motion.div
            className="absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-md"
            style={{
              background: 'rgba(86, 204, 242, 0.9)',
              color: 'white',
              boxShadow: '0 4px 12px rgba(86, 204, 242, 0.4)'
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}>

              {badge}
            </motion.div>
          }

          {/* Category */}
          {category &&
          <motion.div
            className="absolute top-4 right-4 px-3 py-1.5 rounded-lg text-xs font-medium backdrop-blur-md"
            style={{
              background: 'var(--lydian-glass-medium)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}>

              {category}
            </motion.div>
          }

          {/* Rating Badge */}
          {rating > 0 &&
          <motion.div
            className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg backdrop-blur-md"
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}>

              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-white font-semibold text-sm">{rating.toFixed(1)}</span>
              {reviews > 0 && <span className="text-white/80 text-xs">({reviews})</span>}
            </motion.div>
          }
        </div>

        {/* Content Section */}
        <div className="p-5 space-y-4">
          {/* Location */}
          {location &&
          <div className="flex items-center gap-2 text-white/70">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{location}</span>
            </div>
          }

          {/* Title */}
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300 line-clamp-2">
            {title}
          </h3>

          {/* Description */}
          {description &&
          <p className="text-white/70 text-sm line-clamp-2 leading-relaxed">{description}</p>
          }

          {/* Duration */}
          {duration &&
          <div className="flex items-center gap-2 text-white/60">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{duration}</span>
            </div>
          }

          {/* Price & Action */}
          <div className="flex items-end justify-between pt-4 border-t border-white/20/10">
            <div className="flex flex-col">
              {formattedOriginalPrice &&
              <span className="text-white/50 text-sm line-through">{formattedOriginalPrice}</span>
              }
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">{formattedPrice}</span>
                <span className="text-white/60 text-sm">/ kişi</span>
              </div>
            </div>

            {/* Add to Cart Button */}
            {onAddToCart &&
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart();
              }}
              className="p-3 rounded-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(86, 204, 242, 0.8) 0%, rgba(59, 159, 217, 0.8) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 4px 12px rgba(86, 204, 242, 0.3)'
              }}
              whileHover={{
                scale: 1.1,
                boxShadow: '0 6px 20px rgba(86, 204, 242, 0.5)',
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}>

                <ShoppingCart className="w-5 h-5 text-white" />
              </motion.button>
            }
          </div>
        </div>

        {/* Hover Glow Border Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: 'transparent',
            boxShadow: '0 0 0 0 rgba(86, 204, 242, 0)'
          }}
          whileHover={
          glowOnHover ?
          {
            boxShadow: '0 0 30px 2px rgba(86, 204, 242, 0.4), inset 0 0 20px rgba(86, 204, 242, 0.1)',
            transition: { duration: 0.3 }
          } :
          {}
          } />

      </motion.div>
    </motion.div>);

};