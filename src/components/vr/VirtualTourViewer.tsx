import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Html, 
  Environment,
  Text,
  Sphere,
  useCursor
} from '@react-three/drei';

// Module augmentation for React Three Fiber JSX elements
declare module '@react-three/fiber' {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      sphereGeometry: any;
      meshBasicMaterial: any;
    }
  }
}
import * as ThreeTypes from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  VolumeX, 
  Volume2, 
  Maximize, 
  Minimize, 
  RotateCcw,
  MapPin,
  Info,
  Camera,
  Share2,
  Eye,
  Navigation,
  Compass,
  Move3D,
  Settings,
  X
} from 'lucide-react';

// Add global JSX types for Three.js elements used by React Three Fiber
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      sphereGeometry: any;
      meshBasicMaterial: any;
    }
  }
}

interface Hotspot {
  id: string;
  position: [number, number, number];
  title: string;
  description: string;
  type: 'info' | 'navigation' | 'media' | 'poi';
  action?: {
    type: 'navigate' | 'showMedia' | 'showInfo';
    data: any;
  };
  icon?: React.ComponentType;
}

interface VirtualScene {
  id: string;
  title: string;
  description: string;
  panoramaUrl: string;
  audioUrl?: string;
  hotspots: Hotspot[];
  initialPosition: {
    rotation: [number, number, number];
    zoom: number;
  };
}

// Sample 360° tour data
const virtualScenes: VirtualScene[] = [
  {
    id: 'sultanahmet',
    title: 'Sultanahmet Meydanı',
    description: 'İstanbul\'un kalbi, tarihi Sultanahmet Meydanı\'nı keşfedin',
    panoramaUrl: '/images/360/sultanahmet-square.jpg',
    audioUrl: '/audio/sultanahmet-guide.mp3',
    initialPosition: {
      rotation: [0, 0, 0],
      zoom: 1
    },
    hotspots: [
      {
        id: 'ayasofya',
        position: [50, 10, 0],
        title: 'Ayasofya',
        description: 'Bizans ve Osmanlı mimarisinin muhteşem eseri',
        type: 'navigation',
        icon: Navigation,
        action: {
          type: 'navigate',
          data: { sceneId: 'ayasofya' }
        }
      },
      {
        id: 'sultanahmet-mosque',
        position: [-40, 5, 20],
        title: 'Sultanahmet Camii',
        description: 'Mavi Cami olarak da bilinen 6 minareli eser',
        type: 'navigation',
        icon: Navigation
      },
      {
        id: 'info-point',
        position: [0, 20, 40],
        title: 'Tarihi Bilgi',
        description: 'Bu meydan Roma İmparatorluğu döneminden beri şehrin merkezi',
        type: 'info',
        icon: Info
      }
    ]
  },
  {
    id: 'cappadocia-balloon',
    title: 'Kapadokya Balon Turu',
    description: 'Peri bacalarının üstünde unutulmaz bir balon deneyimi',
    panoramaUrl: '/images/360/cappadocia-balloon.jpg',
    audioUrl: '/audio/cappadocia-guide.mp3',
    initialPosition: {
      rotation: [0.2, 0, 0],
      zoom: 1.2
    },
    hotspots: [
      {
        id: 'fairy-chimneys',
        position: [30, -10, 30],
        title: 'Peri Bacaları',
        description: 'Doğanın milyonlarca yılda şekillendirdiği eşsiz formasyonlar',
        type: 'poi',
        icon: MapPin
      },
      {
        id: 'goreme-valley',
        position: [-35, -5, 25],
        title: 'Göreme Vadisi',
        description: 'UNESCO Dünya Mirası listesindeki büyüleyici vadi',
        type: 'poi',
        icon: MapPin
      }
    ]
  }
];

// 3D Hotspot Component
const HotspotMarker: React.FC<{
  hotspot: Hotspot;
  onClick: (hotspot: Hotspot) => void;
  isActive: boolean;
}> = ({ hotspot, onClick, isActive }) => {
  const meshRef = useRef<any>(null);
  const [hovered, setHovered] = useState(false);
  
  useCursor(hovered);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.scale.setScalar(
        (hovered ? 1.2 : 1) * (isActive ? 1.3 : 1)
      );
    }
  });

  const getHotspotColor = (type: string) => {
    switch (type) {
      case 'navigation': return '#FF214D';
      case 'info': return '#3B82F6';
      case 'media': return '#10B981';
      case 'poi': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  // @ts-ignore - Bypassing Three.js JSX type checking
  return React.createElement('group', { position: hotspot.position },
    React.createElement('mesh', {
      ref: meshRef,
      onClick: () => onClick(hotspot),
      onPointerOver: () => setHovered(true),
      onPointerOut: () => setHovered(false)
    },
      React.createElement('sphereGeometry', { args: [0.5, 16, 16] }),
      React.createElement('meshBasicMaterial', {
        color: getHotspotColor(hotspot.type),
        transparent: true,
        opacity: hovered ? 0.9 : 0.7
      })
    ),
    
    // Pulse Effect
    React.createElement('mesh', {},
      React.createElement('sphereGeometry', { args: [0.8, 16, 16] }),
      React.createElement('meshBasicMaterial', {
        color: getHotspotColor(hotspot.type),
        transparent: true,
        opacity: 0.2
      })
    ),
    
    // Label
    (hovered || isActive) && (
      <Html position={[0, 1, 0]} center>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="bg-black/80 text-white px-3 py-2 rounded-lg text-sm font-medium backdrop-blur-sm pointer-events-none">
            {hotspot.title}
          </div>
        </motion.div>
      </Html>
    )
  );
};

// 360° Panorama Sphere
const PanoramaSphere: React.FC<{ 
  imageUrl: string; 
  onLoad?: () => void;
}> = ({ imageUrl, onLoad }) => {
  // Use the standard THREE.TextureLoader approach
  const texture = useLoader((() => {
    const THREE = require('three');
    return THREE.TextureLoader;
  })(), imageUrl);
  
  useEffect(() => {
    if (texture && onLoad) {
      onLoad();
    }
  }, [texture, onLoad]);

  return (
    <Sphere args={[100, 64, 32]}>
      {React.createElement('meshBasicMaterial', {
        map: texture,
        side: (() => {
          const THREE = require('three');
          return THREE.BackSide;
        })()
      })}
    </Sphere>
  );
};

// Main VR Viewer Component
const VirtualTourViewer: React.FC = () => {
  const [currentSceneId, setCurrentSceneId] = useState(virtualScenes[0].id);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVRMode, setIsVRMode] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [audioLoaded, setAudioLoaded] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentScene = virtualScenes.find(scene => scene.id === currentSceneId) || virtualScenes[0];

  // Auto-hide controls
  useEffect(() => {
    const resetControlsTimer = () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      setShowControls(true);
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    };

    const handleMouseMove = () => resetControlsTimer();
    
    if (containerRef.current) {
      containerRef.current.addEventListener('mousemove', handleMouseMove);
      resetControlsTimer();
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
      }
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  // Handle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Handle audio
  useEffect(() => {
    if (audioRef.current && currentScene.audioUrl) {
      audioRef.current.src = currentScene.audioUrl;
      audioRef.current.load();
      setAudioLoaded(true);
      
      if (isPlaying && !isMuted) {
        audioRef.current.play().catch(console.error);
      }
    }
  }, [currentScene.audioUrl, isPlaying, isMuted]);

  const handleHotspotClick = (hotspot: Hotspot) => {
    setSelectedHotspot(hotspot);
    
    if (hotspot.action) {
      switch (hotspot.action.type) {
        case 'navigate':
          if (hotspot.action.data.sceneId) {
            setCurrentSceneId(hotspot.action.data.sceneId);
            setSelectedHotspot(null);
          }
          break;
        case 'showMedia':
          // Handle media display
          console.log('Show media:', hotspot.action.data);
          break;
        case 'showInfo':
          // Info is already shown in selectedHotspot
          break;
      }
    }
  };

  const handleSceneNavigation = (sceneId: string) => {
    setIsLoading(true);
    setCurrentSceneId(sceneId);
    setSelectedHotspot(null);
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full ${isFullscreen ? 'h-screen' : 'h-96 md:h-[600px]'} bg-black rounded-2xl overflow-hidden group`}
    >
      {/* 360° Canvas */}
      <Canvas
        className="absolute inset-0"
        camera={{ position: [0, 0, 0.1], fov: 75 }}
        onCreated={({ gl }) => {
          gl.xr.enabled = true;
        }}
      >
        <Suspense fallback={null}>
          <PanoramaSphere 
            imageUrl={currentScene.panoramaUrl}
            onLoad={() => setIsLoading(false)}
          />
          
          {/* Hotspots */}
          {currentScene.hotspots.map((hotspot) => (
            <HotspotMarker
              key={hotspot.id}
              hotspot={hotspot}
              onClick={handleHotspotClick}
              isActive={selectedHotspot?.id === hotspot.id}
            />
          ))}
          
          <OrbitControls 
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            minDistance={0.1}
            maxDistance={10}
            rotateSpeed={-0.5}
          />
        </Suspense>
      </Canvas>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20">
              <div className="text-center text-white">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full mx-auto mb-4" />
                </motion.div>
                <p className="text-lg font-medium">360° Sahne Yükleniyor...</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls Overlay */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 pointer-events-none z-10">
            {/* Top Bar */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
              <div className="bg-black/50 backdrop-blur-md rounded-xl px-4 py-2 text-white">
                <h3 className="font-semibold">{currentScene.title}</h3>
                <p className="text-sm text-gray-300">{currentScene.description}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <button
                    onClick={() => setIsVRMode(!isVRMode)}
                    className="p-3 bg-black/50 backdrop-blur-md rounded-xl text-white hover:bg-black/70 transition-colors"
                    title="VR Modu"
                  >
                    <Move3D className="w-5 h-5" />
                  </button>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <button
                    onClick={toggleFullscreen}
                    className="p-3 bg-black/50 backdrop-blur-md rounded-xl text-white hover:bg-black/70 transition-colors"
                  >
                    {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                  </button>
                </motion.button>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
              {/* Scene Navigation */}
              <div className="flex items-center gap-2">
                {virtualScenes.map((scene) => (
                  <motion.button
                    key={scene.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      onClick={() => handleSceneNavigation(scene.id)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                        currentSceneId === scene.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-black/50 backdrop-blur-md text-white hover:bg-black/70'
                      }`}
                    >
                      {scene.title}
                    </button>
                  </motion.button>
                ))}
              </div>

              {/* Media Controls */}
              <div className="flex items-center gap-2">
                {currentScene.audioUrl && audioLoaded && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-3 bg-black/50 backdrop-blur-md rounded-xl text-white hover:bg-black/70 transition-colors"
                    >
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                  </motion.button>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <button
                    onClick={() => navigator.share?.({ 
                      title: currentScene.title,
                      text: currentScene.description,
                      url: window.location.href
                    })}
                    className="p-3 bg-black/50 backdrop-blur-md rounded-xl text-white hover:bg-black/70 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </motion.button>
              </div>
            </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hotspot Info Panel */}
      <AnimatePresence>
        {selectedHotspot && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
          >
            <div className="absolute top-4 right-4 w-80 bg-white/5 rounded-2xl shadow-2xl overflow-hidden z-20">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{selectedHotspot.title}</h3>
                <button
                  onClick={() => setSelectedHotspot(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <p className="text-gray-700 mb-6">{selectedHotspot.description}</p>
              
              {selectedHotspot.action && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() => handleHotspotClick(selectedHotspot)}
                    className="w-full p-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                  >
                    {selectedHotspot.action.type === 'navigate' ? 'Buraya Git' : 'Devamını Gör'}
                  </button>
                </motion.button>
              )}
            </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audio Element */}
      {currentScene.audioUrl && (
        <audio
          ref={audioRef}
          loop
          muted={isMuted}
          onLoadedData={() => setAudioLoaded(true)}
        />
      )}

      {/* VR Mode Indicator */}
      {isVRMode && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium z-30">
          🥽 VR Modu Aktif
        </div>
      )}
    </div>
  );
};

export default VirtualTourViewer;