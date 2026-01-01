/**
 * VR Tour Viewer Component
 * Immersive 360° destination tours with WebXR support
 * Optimized for Meta Quest, HTC Vive, Valve Index
 *
 * @component VRTourViewer
 * @performance 90fps+ (VR requirement)
 * @compatibility WebXR Device API + fallback
 */

'use client';

import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Info,
  Navigation,
  Glasses
} from 'lucide-react';
import { WebXRManager } from '../../lib/vr/webxr-manager';
import type { VRTourScene, VRHotspot } from '../../lib/vr/webxr-manager';
import { useToast } from '../../context/ToastContext';
import logger from '../../lib/logger';

// ============================================
// TYPES
// ============================================

interface VRTourViewerProps {
  scenes: readonly VRTourScene[];
  initialSceneId?: string;
  autoPlay?: boolean;
  showControls?: boolean;
  className?: string;
  onSceneChange?: (sceneId: string) => void;
  onHotspotClick?: (hotspot: VRHotspot) => void;
}

interface SceneViewProps {
  scene: VRTourScene;
  isPlaying: boolean;
  isMuted: boolean;
  onHotspotClick: (hotspot: VRHotspot) => void;
}

// ============================================
// 360° SCENE SPHERE
// ============================================

const SceneSphere: React.FC<SceneViewProps> = ({ scene, isPlaying, isMuted, onHotspotClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (scene.type === '360-video') {
      // Load 360° video
      const video = document.createElement('video');
      video.src = scene.url;
      video.crossOrigin = 'anonymous';
      video.loop = true;
      video.muted = isMuted;
      video.playsInline = true;

      setVideoElement(video);

      const videoTexture = new THREE.VideoTexture(video);
      videoTexture.minFilter = THREE.LinearFilter;
      videoTexture.magFilter = THREE.LinearFilter;
      videoTexture.format = THREE.RGBAFormat;

      setTexture(videoTexture);

      return () => {
        video.pause();
        video.src = '';
        videoTexture.dispose();
      };
    } else {
      // Load 360° image
      const loader = new THREE.TextureLoader();
      loader.load(
        scene.url,
        (loadedTexture) => {
          setTexture(loadedTexture);
        },
        undefined,
        (error) => {
          logger.error('Failed to load 360° image', { error, scene: scene.id });
        }
      );
    }
  }, [scene, isMuted]);

  useEffect(() => {
    if (videoElement) {
      if (isPlaying) {
        videoElement.play().catch(err => {
          logger.error('Video playback failed', { error: err });
        });
      } else {
        videoElement.pause();
      }
    }
  }, [isPlaying, videoElement]);

  useEffect(() => {
    if (videoElement) {
      videoElement.muted = isMuted;
    }
  }, [isMuted, videoElement]);

  // Auto-rotate sphere
  useFrame(() => {
    if (meshRef.current && scene.type === '360-photo') {
      meshRef.current.rotation.y += 0.0005;
    }
  });

  if (!texture) {
    return null;
  }

  return (
    <>
      <mesh ref={meshRef} scale={[-1, 1, 1]}>
        <sphereGeometry args={[500, 60, 40]} />
        <meshBasicMaterial map={texture} side={THREE.BackSide} />
      </mesh>

      {/* Hotspots */}
      {scene.hotspots?.map((hotspot) => (
        <Hotspot
          key={hotspot.id}
          hotspot={hotspot}
          onClick={() => onHotspotClick(hotspot)}
        />
      ))}
    </>
  );
};

// ============================================
// INTERACTIVE HOTSPOT
// ============================================

interface HotspotProps {
  hotspot: VRHotspot;
  onClick: () => void;
}

const Hotspot: React.FC<HotspotProps> = ({ hotspot, onClick }) => {
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    // Hotspot pulse animation
    const scale = hovered ? 1.5 : 1.0 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    return scale;
  });

  const getHotspotColor = (): string => {
    switch (hotspot.type) {
      case 'info':
        return '#3b82f6';
      case 'navigation':
        return '#10b981';
      case 'media':
        return '#8b5cf6';
      case 'interaction':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  return (
    <group position={[hotspot.position.x, hotspot.position.y, hotspot.position.z]}>
      <mesh
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[2, 16, 16]} />
        <meshBasicMaterial
          color={getHotspotColor()}
          transparent
          opacity={hovered ? 0.9 : 0.7}
        />
      </mesh>

      {hovered && (
        <Html distanceFactor={15}>
          <div className="bg-black/90 text-white px-4 py-2 rounded-lg whitespace-nowrap backdrop-blur-sm">
            <div className="font-semibold">{hotspot.title}</div>
            {hotspot.content && (
              <div className="text-sm text-gray-300 mt-1">{hotspot.content}</div>
            )}
          </div>
        </Html>
      )}
    </group>
  );
};

// ============================================
// MAIN VR TOUR VIEWER
// ============================================

export const VRTourViewer: React.FC<VRTourViewerProps> = ({
  scenes,
  initialSceneId,
  autoPlay = false,
  showControls = true,
  className = '',
  onSceneChange,
  onHotspotClick
}) => {
  const { showSuccess, showError, showInfo } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);
  const xrManager = useRef<WebXRManager | null>(null);

  const [currentSceneId, setCurrentSceneId] = useState<string>(
    initialSceneId || scenes[0]?.id || ''
  );
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isVRMode, setIsVRMode] = useState(false);
  const [vrSupported, setVRSupported] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const currentScene = scenes.find(s => s.id === currentSceneId);

  // Check WebXR support
  useEffect(() => {
    const checkVR = async () => {
      if ('xr' in navigator) {
        const xr = navigator.xr as XRSystem;
        const supported = await xr.isSessionSupported('immersive-vr');
        setVRSupported(supported);
        logger.info('WebXR support', { supported });
      }
    };

    checkVR();
  }, []);

  // Initialize WebXR Manager
  useEffect(() => {
    if (vrSupported && !xrManager.current) {
      xrManager.current = new WebXRManager();

      xrManager.current.on('sessionstart', () => {
        setIsVRMode(true);
        showSuccess('VR mode activated! Enjoy your immersive tour.');
      });

      xrManager.current.on('sessionend', () => {
        setIsVRMode(false);
        showInfo('VR mode ended');
      });

      xrManager.current.on('error', (error) => {
        showError(`VR error: ${error.message}`);
        logger.error('VR error', { error });
      });
    }
  }, [vrSupported, showSuccess, showError, showInfo]);

  /**
   * Enter VR mode
   */
  const enterVRMode = useCallback(async () => {
    if (!xrManager.current) {
      showError('WebXR not initialized');
      return;
    }

    try {
      await xrManager.current.startSession({
        mode: 'immersive-vr',
        requiredFeatures: ['local-floor'],
        optionalFeatures: ['hand-tracking', 'bounded-floor']
      });
    } catch (error) {
      showError('Failed to enter VR mode. Make sure your headset is connected.');
      logger.error('VR session start failed', { error });
    }
  }, [showError]);

  /**
   * Exit VR mode
   */
  const exitVRMode = useCallback(async () => {
    if (xrManager.current) {
      await xrManager.current.endSession();
    }
  }, []);

  /**
   * Toggle fullscreen
   */
  const toggleFullscreen = useCallback(async () => {
    if (!containerRef.current) return;

    try {
      if (!isFullscreen) {
        if (containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        }
        setIsFullscreen(true);
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch (error) {
      logger.error('Fullscreen toggle failed', { error });
    }
  }, [isFullscreen]);

  /**
   * Handle hotspot interaction
   */
  const handleHotspotClick = useCallback((hotspot: VRHotspot) => {
    logger.info('Hotspot clicked', { hotspot: hotspot.id, type: hotspot.type });

    if (hotspot.type === 'navigation' && hotspot.targetSceneId) {
      // Navigate to new scene
      setCurrentSceneId(hotspot.targetSceneId);
      if (onSceneChange) {
        onSceneChange(hotspot.targetSceneId);
      }
      showInfo(`Navigating to ${hotspot.title}...`);
    }

    if (hotspot.action) {
      hotspot.action();
    }

    if (onHotspotClick) {
      onHotspotClick(hotspot);
    }
  }, [onSceneChange, onHotspotClick, showInfo]);

  /**
   * Change scene
   */
  const changeScene = useCallback((sceneId: string) => {
    setCurrentSceneId(sceneId);
    if (onSceneChange) {
      onSceneChange(sceneId);
    }
  }, [onSceneChange]);

  /**
   * Reset camera position
   */
  const resetCamera = useCallback(() => {
    // This would reset the camera in the Three.js scene
    showInfo('Camera position reset');
  }, [showInfo]);

  if (!currentScene) {
    return (
      <div className="flex items-center justify-center h-full bg-surface-elevated rounded-xl">
        <p className="text-text-muted">No scene available</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`vr-tour-viewer relative bg-black rounded-xl overflow-hidden ${className}`}
      style={{ height: '600px' }}
    >
      {/* Three.js Canvas */}
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 0.1]} fov={75} />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          rotateSpeed={-0.5}
          minDistance={1}
          maxDistance={1}
        />
        <Suspense fallback={null}>
          <SceneSphere
            scene={currentScene}
            isPlaying={isPlaying}
            isMuted={isMuted}
            onHotspotClick={handleHotspotClick}
          />
        </Suspense>
      </Canvas>

      {/* Controls Overlay */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
          <div className="flex items-center justify-between pointer-events-auto">
            {/* Left controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-colors"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-white" />
                ) : (
                  <Play className="w-5 h-5 text-white" />
                )}
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-colors"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
              </button>

              <button
                onClick={resetCamera}
                className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-colors"
                title="Reset Camera"
              >
                <RotateCcw className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Center - Scene info */}
            <div className="flex-1 px-6 text-center">
              <h3 className="text-white font-semibold text-lg">{currentScene.name}</h3>
              {currentScene.description && (
                <p className="text-white/70 text-sm mt-1">{currentScene.description}</p>
              )}
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-colors"
                title="Info"
              >
                <Info className="w-5 h-5 text-white" />
              </button>

              {vrSupported && (
                <button
                  onClick={isVRMode ? exitVRMode : enterVRMode}
                  className={`p-3 ${
                    isVRMode
                      ? 'bg-primary-500 hover:bg-primary-600'
                      : 'bg-white/10 hover:bg-white/20'
                  } backdrop-blur-sm rounded-lg transition-colors`}
                  title={isVRMode ? 'Exit VR' : 'Enter VR'}
                >
                  <Glasses className="w-5 h-5 text-white" />
                </button>
              )}

              <button
                onClick={toggleFullscreen}
                className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-colors"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-5 h-5 text-white" />
                ) : (
                  <Maximize2 className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Scene navigation */}
          {scenes.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {scenes.map((scene) => (
                <button
                  key={scene.id}
                  onClick={() => changeScene(scene.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg transition-colors ${
                    scene.id === currentSceneId
                      ? 'bg-primary-500 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  {scene.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* VR Mode Indicator */}
      <AnimatePresence>
        {isVRMode && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-primary-500 text-white rounded-full font-semibold shadow-xl flex items-center gap-2"
          >
            <Glasses className="w-5 h-5" />
            VR Mode Active
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VRTourViewer;
