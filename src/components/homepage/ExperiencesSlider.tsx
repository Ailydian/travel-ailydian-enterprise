import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { InteractiveSlider } from '../ui/InteractiveSlider';
import { MapPin, Star, Clock, Users, ShoppingCart, Sparkles, BadgeCheck } from 'lucide-react';
import { LoadingDots } from '../ui/AnimatedSVG';

export interface Experience {
  id: number;
  title: string;
  location: string;
  image: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviews: number;
  duration: string;
  category: string;
  badges?: string[];
  highlights?: string[];
}

export interface ExperiencesSliderProps {
  experiences: Experience[];
  title?: string;
  subtitle?: string;
  onAddToCart?: (experience: Experience) => void;
  className?: string;
}

export const ExperiencesSlider: React.FC<ExperiencesSliderProps> = ({
  experiences,
  title = 'Top Experiences',
  subtitle = 'Handpicked activities and tours for unforgettable moments',
  onAddToCart,
  className = ''
}) => {
  return (
    <section className={`py-20 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-ailydian-primary" />
            <h2 className="text-4xl md:text-5xl font-bold text-ailydian-text">
              {title}
            </h2>
            <Sparkles className="w-8 h-8 text-ailydian-secondary" />
          </div>
          <p className="text-xl text-ailydian-text-muted max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Experiences Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <InteractiveSlider
            slidesToShow={3}
            gap={24}
            autoPlay={true}
            autoPlayInterval={4000}
            showArrows={true}
            showDots={true}
            pauseOnHover={true}
            infinite={true}
          >
            {experiences.map((experience) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                onAddToCart={onAddToCart}
              />
            ))}
          </InteractiveSlider>
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link href="/tours">
            <motion.button
              className="bg-glass-dark backdrop-blur-md border-2 border-ailydian-primary text-ailydian-primary px-8 py-4 rounded-xl font-semibold hover:bg-ailydian-primary/10 transition-all inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Browse All Experiences
              <Sparkles className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const ExperienceCard: React.FC<{
  experience: Experience;
  onAddToCart?: (experience: Experience) => void;
}> = ({ experience, onAddToCart }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isAddingToCart, setIsAddingToCart] = React.useState(false);

  const handleAddToCart = async () => {
    if (onAddToCart) {
      setIsAddingToCart(true);
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API call
      onAddToCart(experience);
      setIsAddingToCart(false);
    }
  };

  // Calculate discount percentage
  const discountPercent = experience.originalPrice
    ? Math.round(
        ((parseFloat(experience.originalPrice.replace(/[^0-9.]/g, '')) -
          parseFloat(experience.price.replace(/[^0-9.]/g, ''))) /
          parseFloat(experience.originalPrice.replace(/[^0-9.]/g, ''))) *
          100
      )
    : 0;

  return (
    <motion.div
      className="relative group h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-glass-dark backdrop-blur-xl rounded-2xl overflow-hidden border border-ailydian-primary/20 shadow-lg hover:shadow-neon transition-all h-full flex flex-col">
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
          {/* Image */}
          <motion.img
            src={experience.image}
            alt={experience.title}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ duration: 0.6 }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-ailydian-bg via-ailydian-bg/50 to-transparent" />

          {/* Category Badge */}
          <div className="absolute top-4 left-4 bg-ailydian-bg-card/90 backdrop-blur-md text-ailydian-primary px-3 py-1.5 rounded-full text-xs font-semibold border border-ailydian-primary/30">
            {experience.category}
          </div>

          {/* Discount Badge */}
          {discountPercent > 0 && (
            <motion.div
              className="absolute top-4 right-4 bg-ailydian-neon-green/90 backdrop-blur-md text-ailydian-bg px-3 py-1.5 rounded-full text-xs font-bold shadow-lg"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              -{discountPercent}% OFF
            </motion.div>
          )}

          {/* Badges Row */}
          {experience.badges && experience.badges.length > 0 && (
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
              {experience.badges.slice(0, 3).map((badge, idx) => (
                <motion.div
                  key={idx}
                  className="bg-ailydian-bg-card/80 backdrop-blur-md text-ailydian-text-muted px-2 py-1 rounded text-xs border border-ailydian-primary/20 flex items-center gap-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * idx }}
                >
                  <BadgeCheck className="w-3 h-3 text-ailydian-neon-blue" />
                  {badge}
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex-grow flex flex-col">
          {/* Location */}
          <div className="flex items-center gap-2 text-ailydian-text-muted mb-2">
            <MapPin className="w-4 h-4 text-ailydian-primary" />
            <span className="text-sm">{experience.location}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-ailydian-text mb-3 line-clamp-2 min-h-[3.5rem]">
            {experience.title}
          </h3>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-ailydian-neon-yellow text-ailydian-neon-yellow" />
              <span className="text-ailydian-text font-semibold text-sm">
                {experience.rating}
              </span>
            </div>
            <span className="text-ailydian-text-muted text-sm">
              ({experience.reviews.toLocaleString()} reviews)
            </span>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-2 text-ailydian-text-muted mb-4">
            <Clock className="w-4 h-4 text-ailydian-secondary" />
            <span className="text-sm">{experience.duration}</span>
          </div>

          {/* Highlights */}
          {experience.highlights && experience.highlights.length > 0 && (
            <div className="mb-4 flex-grow">
              <ul className="space-y-1">
                {experience.highlights.slice(0, 2).map((highlight, idx) => (
                  <li key={idx} className="text-xs text-ailydian-text-muted flex items-start gap-2">
                    <span className="text-ailydian-primary mt-0.5">•</span>
                    <span className="line-clamp-1">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Price & CTA */}
          <div className="mt-auto pt-4 border-t border-ailydian-primary/10">
            <div className="flex items-end justify-between mb-3">
              <div>
                <div className="text-xs text-ailydian-text-muted mb-1">From</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-ailydian-primary">
                    {experience.price}
                  </span>
                  {experience.originalPrice && (
                    <span className="text-sm text-ailydian-text-muted line-through">
                      {experience.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Link href={`/tours/${experience.id}`} className="flex-1">
                <motion.button
                  className="w-full bg-glass border border-ailydian-primary/30 text-ailydian-text px-4 py-2.5 rounded-lg font-medium hover:bg-ailydian-primary/10 transition-all text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Details
                </motion.button>
              </Link>

              <motion.button
                className="flex-1 bg-gradient-to-r from-ailydian-primary to-ailydian-secondary text-white px-4 py-2.5 rounded-lg font-medium shadow-neon hover:shadow-neon-lg transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                whileHover={!isAddingToCart ? { scale: 1.02 } : {}}
                whileTap={!isAddingToCart ? { scale: 0.98 } : {}}
              >
                {isAddingToCart ? (
                  <>
                    <LoadingDots size={4} color="white" />
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    Book
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Animated Border Glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(255, 33, 77, 0.4), transparent)',
            backgroundSize: '200% 100%'
          }}
          animate={{
            backgroundPosition: isHovered ? ['200% 0%', '-200% 0%'] : '0% 0%'
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            ease: 'linear'
          }}
        />
      </div>
    </motion.div>
  );
};

export default ExperiencesSlider;
