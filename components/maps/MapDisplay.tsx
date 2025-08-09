'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Loader2, Globe, Map, Satellite } from 'lucide-react';

// Types
export interface MapPoint {
  lat: number;
  lng: number;
  label: string;
  title?: string;
  description?: string;
  iconUrl?: string;
}

export interface MapDisplayProps {
  mapType?: 'leaflet' | 'google' | 'globe';
  center: { lat: number; lng: number };
  zoom?: number;
  points?: MapPoint[];
  googleApiKey?: string;
  autoRotate?: boolean;
  className?: string;
  height?: string;
  onMarkerClick?: (point: MapPoint) => void;
}

// Lazy load map components
const LeafletMap = React.lazy(() => import('./LeafletMap'));
const GoogleMap = React.lazy(() => import('./GoogleMap'));
const GlobeMap = React.lazy(() => import('./GlobeMap'));

// Loading component
const MapLoader = ({ height = '400px' }: { height?: string }) => (
  <div 
    className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-lg border border-gray-200"
    style={{ height }}
  >
    <div className="text-center">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-3" />
      <p className="text-gray-600 font-medium">Loading interactive map...</p>
    </div>
  </div>
);

// Error boundary component
const MapError = ({ height = '400px', error }: { height?: string; error?: string }) => (
  <div 
    className="flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 rounded-2xl shadow-lg border border-red-200"
    style={{ height }}
  >
    <div className="text-center p-6">
      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
        <Map className="w-6 h-6 text-red-600" />
      </div>
      <h3 className="text-lg font-semibold text-red-800 mb-2">Map Loading Error</h3>
      <p className="text-red-600 text-sm">{error || 'Failed to load map component'}</p>
    </div>
  </div>
);

export const MapDisplay: React.FC<MapDisplayProps> = ({
  mapType = 'leaflet',
  center,
  zoom = 10,
  points = [],
  googleApiKey,
  autoRotate = true,
  className = '',
  height = '400px',
  onMarkerClick,
}) => {
  const [currentMapType, setCurrentMapType] = useState(mapType);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setCurrentMapType(mapType);
    setError(null);
  }, [mapType]);

  // Validate Google Maps requirements
  useEffect(() => {
    if (currentMapType === 'google' && !googleApiKey) {
      setError('Google Maps API key is required for Google Maps view');
    }
  }, [currentMapType, googleApiKey]);

  const mapTypeIcons = {
    leaflet: Map,
    google: Satellite,
    globe: Globe,
  };

  const mapTypeLabels = {
    leaflet: 'Street Map',
    google: 'Satellite',
    globe: '3D Globe',
  };

  const renderMap = () => {
    if (!isClient) {
      return <MapLoader height={height} />;
    }

    if (error) {
      return <MapError height={height} error={error} />;
    }

    const mapProps = {
      center,
      zoom,
      points,
      height,
      onMarkerClick,
    };

    try {
      switch (currentMapType) {
        case 'google':
          return (
            <Suspense fallback={<MapLoader height={height} />}>
              <GoogleMap {...mapProps} apiKey={googleApiKey!} />
            </Suspense>
          );
        case 'globe':
          return (
            <Suspense fallback={<MapLoader height={height} />}>
              <GlobeMap {...mapProps} autoRotate={autoRotate} />
            </Suspense>
          );
        case 'leaflet':
        default:
          return (
            <Suspense fallback={<MapLoader height={height} />}>
              <LeafletMap {...mapProps} />
            </Suspense>
          );
      }
    } catch (err) {
      console.error('Map rendering error:', err);
      return <MapError height={height} error="Failed to render map" />;
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Map Type Selector */}
      <div className="absolute top-4 right-4 z-50 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-1">
        <div className="flex gap-1">
          {Object.entries(mapTypeLabels).map(([type, label]) => {
            const Icon = mapTypeIcons[type as keyof typeof mapTypeIcons];
            const isActive = currentMapType === type;
            const isDisabled = type === 'google' && !googleApiKey;
            
            return (
              <button
                key={type}
                onClick={() => !isDisabled && setCurrentMapType(type as any)}
                disabled={isDisabled}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : isDisabled
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
                title={isDisabled ? 'API key required' : label}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Map Container */}
      <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
        {renderMap()}
      </div>

      {/* Map Info */}
      {points.length > 0 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Showing {points.length} location{points.length !== 1 ? 's' : ''} • Click markers for details
          </p>
        </div>
      )}
    </div>
  );
};

export default MapDisplay;