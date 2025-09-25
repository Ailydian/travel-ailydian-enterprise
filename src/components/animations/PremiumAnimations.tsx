import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text3D, Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Premium Card with 3D Tilt Effect
export interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  tiltEnabled?: boolean;
  style?: React.CSSProperties;
}

export const PremiumCard: React.FC<PremiumCardProps> = ({ 
  children, 
  className = '', 
  glowColor = '#FF214D',
  tiltEnabled = true,
  style = {}
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true });
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!tiltEnabled || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    
    setMousePosition({ x: x * 20, y: y * 20 });
  };
  
  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl backdrop-blur-xl border border-white/20 ${className}`}
      style={{
        background: `linear-gradient(135deg, 
          rgba(255, 255, 255, 0.1) 0%, 
          rgba(255, 255, 255, 0.05) 100%)`,
        boxShadow: `0 8px 32px 0 rgba(31, 38, 135, 0.37),
                    0 0 20px 0 ${glowColor}33`,
        ...style
      }}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        rotateX: mousePosition.y,
        rotateY: mousePosition.x
      } : {}}
      transition={{ 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] // Custom easing
      }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: `0 12px 40px 0 rgba(31, 38, 135, 0.5),
                    0 0 30px 0 ${glowColor}66`
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glassmorphism Background Effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x + 50}% ${mousePosition.y + 50}%, 
                      rgba(255, 255, 255, 0.2) 0%, 
                      transparent 50%)`
        }}
      />
      
      {/* Animated Border */}
      <div className="absolute inset-0 rounded-2xl">
        <div 
          className="absolute inset-0 rounded-2xl animate-pulse"
          style={{
            background: `linear-gradient(90deg, transparent, ${glowColor}44, transparent)`,
            backgroundSize: '200% 100%',
            animation: 'borderGlow 3s ease-in-out infinite'
          }}
        />
      </div>
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

// Parallax Container
export interface ParallaxContainerProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export const ParallaxContainer: React.FC<ParallaxContainerProps> = ({ 
  children, 
  speed = 0.5, 
  className = '' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);
  
  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
};

// 3D Floating Element
const Float3D: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial 
          color="#FF214D" 
          metalness={0.8} 
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
};

// 3D Background Scene
export const Scene3D: React.FC = () => {
  return (
    <Canvas 
      className="absolute inset-0 -z-10" 
      camera={{ position: [0, 0, 10], fov: 75 }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#FF214D" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FF6A45" />
      
      <Float3D position={[-3, 2, -2]} />
      <Float3D position={[3, -1, -3]} />
      <Float3D position={[0, 3, -5]} />
      
      <Environment preset="night" />
    </Canvas>
  );
};

// Interactive Particle System
export interface ParticleSystemProps {
  particleCount?: number;
  color?: string;
  interactive?: boolean;
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({ 
  particleCount = 50,
  color = '#FF214D',
  interactive = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Interactive mouse effect
        if (interactive) {
          const dx = mousePos.x - particle.x;
          const dy = mousePos.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const force = (100 - distance) / 100;
            particle.vx += (dx / distance) * force * 0.01;
            particle.vy += (dy / distance) * force * 0.01;
          }
        }
        
        // Boundary collision
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
        
        // Connect nearby particles
        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 80) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `${color}${Math.floor(((80 - distance) / 80) * 50).toString(16).padStart(2, '0')}`;
            ctx.stroke();
          }
        });
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [particleCount, color, interactive, mousePos.x, mousePos.y]);
  
  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10"
      style={{ background: 'transparent' }}
    />
  );
};

// Premium Loading Spinner
export const PremiumLoader: React.FC<{ size?: number; color?: string }> = ({ 
  size = 40, 
  color = '#FF214D' 
}) => {
  return (
    <motion.div 
      className="flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="rounded-full border-2 border-transparent"
        style={{
          width: size,
          height: size,
          borderTopColor: color,
          borderRightColor: `${color}66`,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </motion.div>
  );
};

// Stagger Animation Container
export interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({ 
  children, 
  staggerDelay = 0.1,
  className = '' 
}) => {
  return (
    <motion.div 
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
              }
            }
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Magnetic Button Effect
export interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  onClick?: () => void;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 20,
  className = '',
  onClick
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * (strength / 100);
    const deltaY = (e.clientY - centerY) * (strength / 100);
    
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`relative transition-transform ${className}`}
      animate={{
        x: position.x,
        y: position.y
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};