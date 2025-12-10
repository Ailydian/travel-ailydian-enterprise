import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { InteractiveSlider } from '../ui/InteractiveSlider';
import { MapPin, Star, TrendingUp, Heart } from 'lucide-react';

export interface Destination {
  id: number;
  name: string;
  country: string;
  image: string;
  experiences: string;
  rating: number;
  badge?: string;
  description: string;
  price?: string;
}

export interface DestinationsSliderProps {
  destinations: Destination[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export const DestinationsSlider: React.FC<DestinationsSliderProps> = ({
  destinations,
  title = 'Featured Destinations',
  subtitle = 'Explore the world\'s most amazing places',
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
          <h2 className="text-4xl md:text-5xl font-bold text-ailydian-text mb-4">
            {title}
          </h2>
          <p className="text-xl text-ailydian-text-muted max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Destinations Slider */}
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
            autoPlayInterval={5000}
            showArrows={true}
            showDots={true}
            pauseOnHover={true}
            infinite={true}
          >
            {destinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
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
          <Link href="/destinations">
            <motion.button
              className="bg-gradient-to-r from-ailydian-primary to-ailydian-secondary text-white px-8 py-4 rounded-xl font-semibold shadow-neon hover:shadow-neon-lg transition-all inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Destinations
              <TrendingUp className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const DestinationCard: React.FC<{ destination: Destination }> = ({ destination }) => {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

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
        <div className="relative h-64 overflow-hidden">
          {/* Image */}
          <motion.img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ duration: 0.6 }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-ailydian-bg via-transparent to-transparent opacity-60" />

          {/* Badge */}
          {destination.badge && (
            <motion.div
              className="absolute top-4 left-4 bg-ailydian-primary/90 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-semibold shadow-neon"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {destination.badge}
            </motion.div>
          )}

          {/* Favorite Button */}
          <motion.button
            className="absolute top-4 right-4 bg-ailydian-bg-card/80 backdrop-blur-md p-2 rounded-full border border-ailydian-primary/30 hover:bg-ailydian-primary/20 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isFavorite ? 'fill-ailydian-primary text-ailydian-primary' : 'text-ailydian-text-muted'
              }`}
            />
          </motion.button>

          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-ailydian-primary/20 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link href={`/destinations/${destination.name.toLowerCase()}`}>
              <motion.button
                className="bg-white text-ailydian-primary px-6 py-3 rounded-xl font-semibold shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Now
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 flex-grow flex flex-col">
          {/* Location */}
          <div className="flex items-center gap-2 text-ailydian-text-muted mb-3">
            <MapPin className="w-4 h-4 text-ailydian-primary" />
            <span className="text-sm">{destination.country}</span>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-ailydian-text mb-2">
            {destination.name}
          </h3>

          {/* Description */}
          <p className="text-ailydian-text-muted mb-4 line-clamp-2 flex-grow">
            {destination.description}
          </p>

          {/* Stats Row */}
          <div className="flex items-center justify-between pt-4 border-t border-ailydian-primary/10">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-ailydian-neon-yellow text-ailydian-neon-yellow" />
                <span className="text-ailydian-text font-semibold">{destination.rating}</span>
              </div>
              <span className="text-ailydian-text-muted text-sm">
                {destination.experiences} experiences
              </span>
            </div>

            {destination.price && (
              <div className="text-right">
                <div className="text-sm text-ailydian-text-muted">From</div>
                <div className="text-lg font-bold text-ailydian-primary">{destination.price}</div>
              </div>
            )}
          </div>
        </div>

        {/* Animated Border Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: 'linear-gradient(45deg, transparent, rgba(255, 33, 77, 0.3), transparent)',
            backgroundSize: '200% 200%'
          }}
          animate={{
            backgroundPosition: isHovered ? ['0% 0%', '100% 100%'] : '0% 0%'
          }}
          transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
        />
      </div>
    </motion.div>
  );
};

export default DestinationsSlider;
