import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import SimplifiedHeader from '../components/layout/SimplifiedHeader';
import {
  AnimatedPlane,
  AnimatedGlobe,
  AnimatedPriceChart,
  LoadingSpinner,
  LoadingPlane,
  LoadingDots,
  StatusIcon,
  MapPinAnimated,
  CompassAnimated,
  SuitcaseAnimated } from
'../components/ui/AnimatedSVG';
import {
  InteractiveSlider,
  CardSlider,
  TestimonialSlider,
  ImageGallerySlider } from
'../components/ui/InteractiveSlider';

const AnimatedShowcase: React.FC = () => {
  const [statusType, setStatusType] = useState<'success' | 'error' | 'warning'>('success');

  // Sample data for sliders
  const destinationCards = [
  {
    id: 1,
    content:
    <div className="bg-glass-dark rounded-2xl overflow-hidden border border-lydian-primary/20 h-full">
          <img
        src="https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&h=300&q=90"
        alt="Istanbul"
        className="w-full h-48 object-cover" />

          <div className="p-6">
            <h3 className="text-xl font-bold text-lydian-text mb-2">Istanbul</h3>
            <p className="text-lydian-text-muted mb-4">
              Explore the magical city where East meets West
            </p>
            <div className="flex items-center justify-between">
              <span className="text-lydian-primary font-bold text-lg">From $299</span>
              <button className="bg-lydian-primary hover:bg-lydian-dark text-lydian-text-inverse px-4 py-2 rounded-lg transition-colors">
                Book Now
              </button>
            </div>
          </div>
        </div>

  },
  {
    id: 2,
    content:
    <div className="bg-glass-dark rounded-2xl overflow-hidden border border-lydian-primary/20 h-full">
          <img
        src="https://images.unsplash.com/photo-1548013146-72479768bada?w=400&h=300&q=90"
        alt="Cappadocia"
        className="w-full h-48 object-cover" />

          <div className="p-6">
            <h3 className="text-xl font-bold text-lydian-text mb-2">Cappadocia</h3>
            <p className="text-lydian-text-muted mb-4">
              Hot air balloon adventures and fairy chimneys
            </p>
            <div className="flex items-center justify-between">
              <span className="text-lydian-primary font-bold text-lg">From $399</span>
              <button className="bg-lydian-primary hover:bg-lydian-dark text-lydian-text-inverse px-4 py-2 rounded-lg transition-colors">
                Book Now
              </button>
            </div>
          </div>
        </div>

  },
  {
    id: 3,
    content:
    <div className="bg-glass-dark rounded-2xl overflow-hidden border border-lydian-primary/20 h-full">
          <img
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&q=90"
        alt="Antalya"
        className="w-full h-48 object-cover" />

          <div className="p-6">
            <h3 className="text-xl font-bold text-lydian-text mb-2">Antalya</h3>
            <p className="text-lydian-text-muted mb-4">
              Mediterranean paradise with ancient ruins
            </p>
            <div className="flex items-center justify-between">
              <span className="text-lydian-primary font-bold text-lg">From $249</span>
              <button className="bg-lydian-primary hover:bg-lydian-dark text-lydian-text-inverse px-4 py-2 rounded-lg transition-colors">
                Book Now
              </button>
            </div>
          </div>
        </div>

  },
  {
    id: 4,
    content:
    <div className="bg-glass-dark rounded-2xl overflow-hidden border border-lydian-primary/20 h-full">
          <img
        src="https://images.unsplash.com/photo-1609322537228-f710d846310a?w=400&h=300&q=90"
        alt="Pamukkale"
        className="w-full h-48 object-cover" />

          <div className="p-6">
            <h3 className="text-xl font-bold text-lydian-text mb-2">Pamukkale</h3>
            <p className="text-lydian-text-muted mb-4">
              Cotton castle terraces and thermal pools
            </p>
            <div className="flex items-center justify-between">
              <span className="text-lydian-primary font-bold text-lg">From $199</span>
              <button className="bg-lydian-primary hover:bg-lydian-dark text-lydian-text-inverse px-4 py-2 rounded-lg transition-colors">
                Book Now
              </button>
            </div>
          </div>
        </div>

  }];


  const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Travel Blogger',
    content: 'The AI-powered recommendations were spot on! I discovered hidden gems I would have never found on my own.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Adventure Traveler',
    content: 'Virtual tours helped me plan my entire trip. The interactive sliders made browsing destinations a joy!',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=2'
  },
  {
    id: 3,
    name: 'Emma Wilson',
    role: 'Digital Nomad',
    content: 'Best travel platform I have used. The animations are smooth and the booking process is seamless.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=3'
  }];


  const galleryImages = [
  {
    url: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1200&h=800&q=90',
    alt: 'Istanbul Bosphorus',
    caption: 'Stunning views of the Bosphorus at sunset'
  },
  {
    url: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&h=800&q=90',
    alt: 'Cappadocia Balloons',
    caption: 'Hot air balloons over fairy chimneys'
  },
  {
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&q=90',
    alt: 'Antalya Coast',
    caption: 'Crystal clear waters of the Mediterranean'
  },
  {
    url: 'https://images.unsplash.com/photo-1609322537228-f710d846310a?w=1200&h=800&q=90',
    alt: 'Pamukkale Terraces',
    caption: 'Natural travertine terraces of Pamukkale'
  }];


  return (
    <>
      <Head>
        <title>Animated Components Showcase | Holiday.AILYDIAN</title>
        <meta name="description" content="Interactive showcase of animated SVG components and sliders" />
      </Head>

      <SimplifiedHeader />

      <main className="min-h-screen bg-lydian-bg pt-20">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>

            <h1 className="text-5xl md:text-6xl font-bold text-lydian-text mb-4 text-neon">
              Animated Components Showcase
            </h1>
            <p className="text-xl text-lydian-text-muted max-w-3xl mx-auto">
              Beautiful, performant, and accessible animated SVG components built with Framer Motion
            </p>
          </motion.div>

          {/* Animated SVG Components */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-lydian-text mb-8">Travel-Themed Animations</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Animated Plane */}
              <motion.div
                className="bg-glass-dark rounded-2xl p-8 border border-lydian-primary/20 flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}>

                <h3 className="text-xl font-semibold text-lydian-text mb-6">Animated Plane</h3>
                <AnimatedPlane size={120} />
                <p className="text-lydian-text-muted mt-4 text-center">
                  Perfect for flight bookings and travel sections
                </p>
              </motion.div>

              {/* Animated Globe */}
              <motion.div
                className="bg-glass-dark rounded-2xl p-8 border border-lydian-primary/20 flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}>

                <h3 className="text-xl font-semibold text-lydian-text mb-6">Rotating Globe</h3>
                <AnimatedGlobe size={120} />
                <p className="text-lydian-text-muted mt-4 text-center">
                  Ideal for international destinations
                </p>
              </motion.div>

              {/* Animated Price Chart */}
              <motion.div
                className="bg-glass-dark rounded-2xl p-8 border border-lydian-primary/20 flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}>

                <h3 className="text-xl font-semibold text-lydian-text mb-6">Price Trends</h3>
                <AnimatedPriceChart size={120} />
                <p className="text-lydian-text-muted mt-4 text-center">
                  Show price analytics and trends
                </p>
              </motion.div>

              {/* Map Pin */}
              <motion.div
                className="bg-glass-dark rounded-2xl p-8 border border-lydian-primary/20 flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}>

                <h3 className="text-xl font-semibold text-lydian-text mb-6">Map Pin</h3>
                <MapPinAnimated size={60} />
                <p className="text-lydian-text-muted mt-4 text-center">
                  Location markers with pulse effect
                </p>
              </motion.div>

              {/* Compass */}
              <motion.div
                className="bg-glass-dark rounded-2xl p-8 border border-lydian-primary/20 flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}>

                <h3 className="text-xl font-semibold text-lydian-text mb-6">Compass</h3>
                <CompassAnimated size={100} />
                <p className="text-lydian-text-muted mt-4 text-center">
                  Navigation and exploration themes
                </p>
              </motion.div>

              {/* Suitcase */}
              <motion.div
                className="bg-glass-dark rounded-2xl p-8 border border-lydian-primary/20 flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}>

                <h3 className="text-xl font-semibold text-lydian-text mb-6">Suitcase</h3>
                <SuitcaseAnimated size={80} />
                <p className="text-lydian-text-muted mt-4 text-center">
                  Packing and travel preparation
                </p>
              </motion.div>
            </div>
          </section>

          {/* Loading States */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-lydian-text mb-8">Loading Indicators</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="bg-glass-dark rounded-2xl p-8 border border-lydian-primary/20 flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}>

                <h3 className="text-xl font-semibold text-lydian-text mb-6">Spinner</h3>
                <LoadingSpinner size={60} />
                <p className="text-lydian-text-muted mt-4 text-center">
                  Classic loading spinner
                </p>
              </motion.div>

              <motion.div
                className="bg-glass-dark rounded-2xl p-8 border border-lydian-primary/20 flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}>

                <h3 className="text-xl font-semibold text-lydian-text mb-6">Plane Loader</h3>
                <LoadingPlane size={40} />
                <p className="text-lydian-text-muted mt-4 text-center">
                  Animated plane loading state
                </p>
              </motion.div>

              <motion.div
                className="bg-glass-dark rounded-2xl p-8 border border-lydian-primary/20 flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}>

                <h3 className="text-xl font-semibold text-lydian-text mb-6">Dots</h3>
                <LoadingDots size={12} />
                <p className="text-lydian-text-muted mt-4 text-center">
                  Bouncing dots loader
                </p>
              </motion.div>
            </div>
          </section>

          {/* Status Icons */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-lydian-text mb-8">Status Icons</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="bg-glass-dark rounded-2xl p-8 border border-lydian-primary/20 flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}>

                <h3 className="text-xl font-semibold text-lydian-text mb-6">Success</h3>
                <StatusIcon type="success" size={100} />
                <p className="text-lydian-text-muted mt-4 text-center">
                  Booking confirmed
                </p>
              </motion.div>

              <motion.div
                className="bg-glass-dark rounded-2xl p-8 border border-lydian-primary/20 flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}>

                <h3 className="text-xl font-semibold text-lydian-text mb-6">Error</h3>
                <StatusIcon type="error" size={100} />
                <p className="text-lydian-text-muted mt-4 text-center">
                  Booking failed
                </p>
              </motion.div>

              <motion.div
                className="bg-glass-dark rounded-2xl p-8 border border-lydian-primary/20 flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}>

                <h3 className="text-xl font-semibold text-lydian-text mb-6">Warning</h3>
                <StatusIcon type="warning" size={100} />
                <p className="text-lydian-text-muted mt-4 text-center">
                  Action required
                </p>
              </motion.div>
            </div>
          </section>

          {/* Interactive Sliders */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-lydian-text mb-8">Interactive Sliders</h2>

            {/* Destination Cards Slider */}
            <div className="mb-16">
              <h3 className="text-2xl font-semibold text-lydian-text mb-6">Destination Cards</h3>
              <InteractiveSlider
                slidesToShow={3}
                gap={20}
                autoPlay={true}
                autoPlayInterval={4000}
                showArrows={true}
                showDots={true}
                pauseOnHover={true}
                className="mb-8">

                {destinationCards.map((card) =>
                <div key={card.id}>{card.content}</div>
                )}
              </InteractiveSlider>
            </div>

            {/* Testimonials Slider */}
            <div className="mb-16">
              <h3 className="text-2xl font-semibold text-lydian-text mb-6">Customer Testimonials</h3>
              <TestimonialSlider testimonials={testimonials} autoPlay={true} />
            </div>

            {/* Image Gallery Slider */}
            <div className="mb-16">
              <h3 className="text-2xl font-semibold text-lydian-text mb-6">Image Gallery</h3>
              <ImageGallerySlider images={galleryImages} aspectRatio="16/9" />
            </div>
          </section>

          {/* Code Examples */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-lydian-text mb-8">Usage Examples</h2>

            <div className="bg-glass-dark rounded-2xl p-8 border border-lydian-primary/20">
              <pre className="text-lydian-text-muted overflow-x-auto">
                <code>{`// Import components
import {
  AnimatedPlane,
  AnimatedGlobe,
  LoadingSpinner,
  StatusIcon
} from '@/components/ui/AnimatedSVG';

import {
  InteractiveSlider,
  TestimonialSlider
} from '@/components/ui/InteractiveSlider';

// Use in your components
<AnimatedPlane size={100} color="#FF214D" speed={3} />

<InteractiveSlider
  slidesToShow={3}
  autoPlay={true}
  showArrows={true}
>
  {items.map(item => <Card key={item.id} {...item} />)}
</InteractiveSlider>

<StatusIcon type="success" size={80} />
`}</code>
              </pre>
            </div>
          </section>
        </div>
      </main>
    </>);

};

export default AnimatedShowcase;