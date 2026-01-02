import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Maximize,
  Minimize,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCw,
  Info,
  Navigation,
  Eye,
  X,
  ChevronLeft,
  ChevronRight } from 'lucide-react';
import type { VirtualTour, VirtualTourScene, VirtualTourHotspot } from '@/lib/videoReviews';

interface VirtualTourViewerProps {
  tour: VirtualTour;
  onClose?: () => void;
  autoPlay?: boolean;
}

const VirtualTourViewer: React.FC<VirtualTourViewerProps> = ({
  tour,
  onClose,
  autoPlay = false
}) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showHotspots, setShowHotspots] = useState(true);
  const [selectedHotspot, setSelectedHotspot] = useState<VirtualTourHotspot | null>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [rotation, setRotation] = useState({ pitch: 0, yaw: 0 });
  const [zoom, setZoom] = useState(90);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentScene = tour.scenes[currentSceneIndex];

  useEffect(() => {
    if (currentScene) {
      setRotation({
        pitch: currentScene.initialView.pitch,
        yaw: currentScene.initialView.yaw
      });
      setZoom(currentScene.initialView.fov);
    }
  }, [currentScene]);

  // Auto-rotation when playing
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setRotation((prev) => ({
          ...prev,
          yaw: (prev.yaw + 0.5) % 360
        }));
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const handleFullscreen = () => {
    if (!isFullscreen && containerRef.current) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleSceneChange = (index: number) => {
    if (index >= 0 && index < tour.scenes.length) {
      setCurrentSceneIndex(index);
      setSelectedHotspot(null);
    }
  };

  const handleHotspotClick = (hotspot: VirtualTourHotspot) => {
    if (hotspot.type === 'link' && hotspot.linkToScene) {
      const sceneIndex = tour.scenes.findIndex((s) => s.id === hotspot.linkToScene);
      if (sceneIndex !== -1) {
        handleSceneChange(sceneIndex);
      }
    } else {
      setSelectedHotspot(hotspot);
    }
  };

  const resetView = () => {
    if (currentScene) {
      setRotation({
        pitch: currentScene.initialView.pitch,
        yaw: currentScene.initialView.yaw
      });
      setZoom(currentScene.initialView.fov);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-black">

      {/* 360° Viewer Canvas */}
      <div className="relative w-full h-full overflow-hidden">
        {/* In production, this would be a WebGL/Three.js 360° viewer */}
        {/* For now, showing static panorama with simulated rotation */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-100"
          style={{
            backgroundImage: `url(${currentScene.panoramaUrl})`,
            transform: `rotateY(${rotation.yaw}deg) rotateX(${rotation.pitch}deg) scale(${zoom / 90})`
          }}>

          {/* Hotspots */}
          {showHotspots && currentScene.hotspots.map((hotspot) =>
          <button
            key={hotspot.id}
            onClick={() => handleHotspotClick(hotspot)}
            className="absolute w-12 h-12 bg-white/10 hover:bg-gradient-to-br from-slate-900 via-black to-slate-800 rounded-full shadow-lg flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-all"
            style={{
              left: `${50 + hotspot.position.yaw / 180 * 50}%`,
              top: `${50 - hotspot.position.pitch / 90 * 50}%`
            }}>

              {hotspot.icon === 'info' && <Info className="h-6 w-6 text-blue-500" />}
              {hotspot.icon === 'arrow-right' && <ChevronRight className="h-6 w-6 text-purple-600" />}
              {hotspot.icon === 'play' && <Play className="h-6 w-6 text-green-500" />}
            </button>
          )}
        </div>
      </div>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent">
        <div className="flex items-center justify-between">
          <div className="text-white">
            <h2 className="text-xl font-bold">{tour.title}</h2>
            <p className="text-sm text-gray-400">{currentScene.title}</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-3 py-2 rounded-lg">
              <Eye className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-white">{tour.views.toLocaleString()}</span>
            </div>

            {onClose &&
            <button
              onClick={onClose}
              className="p-2 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white rounded-lg transition-colors">

                <X className="h-6 w-6" />
              </button>
            }
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
        {/* Scene Navigation */}
        <div className="flex items-center justify-center gap-2 mb-4">
          {tour.scenes.map((scene, index) =>
          <button
            key={scene.id}
            onClick={() => handleSceneChange(index)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
            index === currentSceneIndex ?
            'bg-purple-600 text-white' :
            'bg-lydian-bg/20 backdrop-blur-sm text-white hover:bg-lydian-bg/30'}`
            }>

              {scene.title}
            </button>
          )}
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 bg-white/10 backdrop-blur-xl border border-white/20 backdrop-blur-sm hover:bg-lydian-bg/30 text-white rounded-lg transition-colors">

              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>

            <button
              onClick={resetView}
              className="p-3 bg-white/10 backdrop-blur-xl border border-white/20 backdrop-blur-sm hover:bg-lydian-bg/30 text-white rounded-lg transition-colors"
              title="Reset View">

              <RotateCw className="h-5 w-5" />
            </button>

            <button
              onClick={() => setShowHotspots(!showHotspots)}
              className={`p-3 backdrop-blur-sm text-white rounded-lg transition-colors ${
              showHotspots ? 'bg-purple-600' : 'bg-lydian-bg/20 hover:bg-lydian-bg/30'}`
              }
              title="Toggle Hotspots">

              <Navigation className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleFullscreen}
              className="p-3 bg-white/10 backdrop-blur-xl border border-white/20 backdrop-blur-sm hover:bg-lydian-bg/30 text-white rounded-lg transition-colors">

              {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Scene Navigation Arrows */}
      {currentSceneIndex > 0 &&
      <button
        onClick={() => handleSceneChange(currentSceneIndex - 1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white rounded-lg transition-colors">

          <ChevronLeft className="h-6 w-6" />
        </button>
      }

      {currentSceneIndex < tour.scenes.length - 1 &&
      <button
        onClick={() => handleSceneChange(currentSceneIndex + 1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white rounded-lg transition-colors">

          <ChevronRight className="h-6 w-6" />
        </button>
      }

      {/* Hotspot Info Modal */}
      <AnimatePresence>
        {selectedHotspot &&
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="absolute inset-0 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setSelectedHotspot(null)}>

            <motion.div
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-slate-900 via-black to-slate-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white">
                    {selectedHotspot.title}
                  </h3>
                  <button
                  onClick={() => setSelectedHotspot(null)}
                  className="p-2 hover:bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg transition-colors">

                    <X className="h-6 w-6 text-gray-400" />
                  </button>
                </div>

                {selectedHotspot.type === 'info' && selectedHotspot.content &&
              <p className="text-gray-300">{selectedHotspot.content}</p>
              }

                {selectedHotspot.type === 'image' && selectedHotspot.imageUrl &&
              <img
                src={selectedHotspot.imageUrl}
                alt={selectedHotspot.title}
                className="w-full rounded-lg" />

              }

                {selectedHotspot.type === 'video' && selectedHotspot.videoUrl &&
              <video
                src={selectedHotspot.videoUrl}
                controls
                className="w-full rounded-lg" />

              }
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>

      {/* Loading Indicator */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
        <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm">
          360° Sanal Tur • {currentSceneIndex + 1}/{tour.scenes.length} Sahne
        </div>
      </div>
    </div>);

};

export default VirtualTourViewer;