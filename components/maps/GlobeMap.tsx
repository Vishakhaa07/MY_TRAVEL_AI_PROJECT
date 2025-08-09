'use client';

import React, { useEffect, useState, useRef } from 'react';
import { MapPoint } from './MapDisplay';

interface GlobeMapProps {
  center: { lat: number; lng: number };
  zoom: number;
  points: MapPoint[];
  height: string;
  autoRotate: boolean;
  onMarkerClick?: (point: MapPoint) => void;
}

const GlobeMap: React.FC<GlobeMapProps> = ({
  center,
  zoom,
  points,
  height,
  autoRotate,
  onMarkerClick,
}) => {
  const [Globe, setGlobe] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);
  const globeRef = useRef<any>();

  useEffect(() => {
    setIsClient(true);
    
    // Dynamically import Globe component
    const loadGlobe = async () => {
      try {
        const globeModule = await import('react-globe.gl');
        setGlobe(globeModule.default);
      } catch (error) {
        console.error('Failed to load Globe:', error);
      }
    };

    loadGlobe();
  }, []);

  useEffect(() => {
    if (globeRef.current && center) {
      // Point camera to center coordinates
      globeRef.current.pointOfView({
        lat: center.lat,
        lng: center.lng,
        altitude: 2.5 - (zoom / 10), // Convert zoom to altitude
      }, 1000);
    }
  }, [center, zoom]);

  if (!isClient || !Globe) {
    return (
      <div 
        className="flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-900 animate-pulse"
        style={{ height }}
      >
        <div className="text-white">Loading 3D Globe...</div>
      </div>
    );
  }

  // Convert points to globe format
  const globePoints = points.map(point => ({
    lat: point.lat,
    lng: point.lng,
    label: point.label,
    title: point.title,
    description: point.description,
    size: 0.5,
    color: '#ff6b6b',
  }));

  return (
    <div style={{ height }} className="relative overflow-hidden bg-black">
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        
        // Points layer
        pointsData={globePoints}
        pointAltitude={0.01}
        pointRadius={0.5}
        pointColor="color"
        pointLabel={(d: any) => `
          <div style="
            background: rgba(0,0,0,0.8); 
            padding: 8px 12px; 
            border-radius: 8px; 
            color: white;
            font-family: system-ui;
            max-width: 200px;
          ">
            <strong>${d.title || d.label}</strong>
            ${d.description ? `<br/><small>${d.description}</small>` : ''}
          </div>
        `}
        onPointClick={(point: any) => {
          const mapPoint: MapPoint = {
            lat: point.lat,
            lng: point.lng,
            label: point.label,
            title: point.title,
            description: point.description,
          };
          onMarkerClick?.(mapPoint);
        }}
        
        // Animation
        enablePointerInteraction={true}
        animateIn={true}
        
        // Auto rotation
        controls={{
          autoRotate,
          autoRotateSpeed: 0.5,
          enableZoom: true,
          enablePan: true,
          minDistance: 200,
          maxDistance: 800,
        }}
        
        // Styling
        width={undefined}
        height={parseInt(height)}
      />
      
      {/* Controls overlay */}
      <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-2 text-white text-xs">
        <p>🌍 3D Globe View</p>
        <p>Drag to rotate • Scroll to zoom</p>
        {autoRotate && <p>Auto-rotating...</p>}
      </div>
    </div>
  );
};

export default GlobeMap;