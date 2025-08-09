'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Loader2, Map, Globe } from 'lucide-react';

export interface MapTilerMapProps {
  apiKey: string;
  mode: 'leaflet' | 'sdk';
  center: { lat: number; lng: number };
  zoom?: number;
  pitch?: number; // For SDK mode (3D tilt)
  bearing?: number; // For SDK mode (rotation)
  marker?: {
    lat: number;
    lng: number;
    label: string;
    description?: string;
  };
  className?: string;
  height?: string;
  onMarkerClick?: (marker: { lat: number; lng: number; label: string }) => void;
}

// Loading component
const MapLoader = ({ height = '400px', mode }: { height?: string; mode: string }) => (
  <div 
    className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-lg border border-gray-200"
    style={{ height }}
  >
    <div className="text-center">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-3" />
      <p className="text-gray-600 font-medium">
        Loading MapTiler {mode === 'leaflet' ? 'Leaflet' : 'SDK'} map...
      </p>
    </div>
  </div>
);

// Error component
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
      <p className="text-red-600 text-sm">{error || 'Failed to load MapTiler map'}</p>
    </div>
  </div>
);

// Leaflet Map Component
const LeafletMapTiler: React.FC<MapTilerMapProps> = ({
  apiKey,
  center,
  zoom = 10,
  marker,
  height = '400px',
  onMarkerClick,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<any>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    const loadLeafletMap = async () => {
      try {
        // Dynamically import Leaflet and MapTiler plugin
        const L = await import('leaflet');
        
        // Import MapTiler Leaflet plugin
        await import('@maptiler/leaflet-maptilersdk');

        // Fix for default markers
        delete (L.default.Icon.Default.prototype as any)._getIconUrl;
        L.default.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });

        if (mapRef.current && !mapInstanceRef.current) {
          // Initialize map
          const map = L.default.map(mapRef.current).setView([center.lat, center.lng], zoom);

          // Add MapTiler raster tiles
          L.default.tileLayer(`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${apiKey}`, {
            attribution: '© MapTiler © OpenStreetMap contributors',
            maxZoom: 18,
          }).addTo(map);

          // Add marker if provided
          if (marker) {
            const leafletMarker = L.default.marker([marker.lat, marker.lng]).addTo(map);
            
            if (marker.label || marker.description) {
              leafletMarker.bindPopup(`
                <div class="p-2 min-w-[200px]">
                  <h3 class="font-bold text-lg mb-2 text-gray-800">${marker.label}</h3>
                  ${marker.description ? `<p class="text-sm text-gray-600 mb-2">${marker.description}</p>` : ''}
                  <p class="text-xs text-gray-500">${marker.lat.toFixed(4)}, ${marker.lng.toFixed(4)}</p>
                </div>
              `);
            }

            leafletMarker.on('click', () => {
              onMarkerClick?.(marker);
            });
          }

          mapInstanceRef.current = map;
        }

        setIsLoaded(true);
      } catch (err) {
        console.error('Failed to load Leaflet MapTiler:', err);
        setError('Failed to load Leaflet map. Please check your API key.');
      }
    };

    loadLeafletMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [apiKey, center.lat, center.lng, zoom, marker, onMarkerClick]);

  if (error) {
    return <MapError height={height} error={error} />;
  }

  if (!isLoaded) {
    return <MapLoader height={height} mode="leaflet" />;
  }

  return (
    <div 
      ref={mapRef} 
      style={{ height, width: '100%' }}
      className="rounded-2xl shadow-lg border border-gray-200 z-10"
    />
  );
};

// SDK Map Component
const SDKMapTiler: React.FC<MapTilerMapProps> = ({
  apiKey,
  center,
  zoom = 10,
  pitch = 0,
  bearing = 0,
  marker,
  height = '400px',
  onMarkerClick,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    const loadSDKMap = async () => {
      try {
        // Dynamically import MapTiler SDK
        const { Map } = await import('@maptiler/sdk');
        const { Marker, Popup } = await import('@maptiler/sdk');

        if (mapRef.current && !mapInstanceRef.current) {
          // Initialize SDK map
          const map = new Map({
            container: mapRef.current,
            style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${apiKey}`,
            center: [center.lng, center.lat],
            zoom: zoom,
            pitch: pitch,
            bearing: bearing,
          });

          map.on('load', () => {
            // Add marker if provided
            if (marker) {
              const sdkMarker = new Marker()
                .setLngLat([marker.lng, marker.lat])
                .addTo(map);

              if (marker.label || marker.description) {
                const popup = new Popup({ offset: 25 })
                  .setHTML(`
                    <div class="p-2 min-w-[200px]">
                      <h3 class="font-bold text-lg mb-2 text-gray-800">${marker.label}</h3>
                      ${marker.description ? `<p class="text-sm text-gray-600 mb-2">${marker.description}</p>` : ''}
                      <p class="text-xs text-gray-500">${marker.lat.toFixed(4)}, ${marker.lng.toFixed(4)}</p>
                    </div>
                  `);

                sdkMarker.setPopup(popup);
              }

              sdkMarker.getElement().addEventListener('click', () => {
                onMarkerClick?.(marker);
              });
            }

            setIsLoaded(true);
          });

          map.on('error', (e) => {
            console.error('MapTiler SDK error:', e);
            setError('Failed to load SDK map. Please check your API key.');
          });

          mapInstanceRef.current = map;
        }
      } catch (err) {
        console.error('Failed to load MapTiler SDK:', err);
        setError('Failed to load MapTiler SDK. Please check your API key.');
      }
    };

    loadSDKMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [apiKey, center.lat, center.lng, zoom, pitch, bearing, marker, onMarkerClick]);

  if (error) {
    return <MapError height={height} error={error} />;
  }

  if (!isLoaded) {
    return <MapLoader height={height} mode="sdk" />;
  }

  return (
    <div 
      ref={mapRef} 
      style={{ height, width: '100%' }}
      className="rounded-2xl shadow-lg border border-gray-200"
    />
  );
};

// Main MapTiler Component
export const MapTilerMap: React.FC<MapTilerMapProps> = (props) => {
  const { mode, className = '', height = '400px', ...otherProps } = props;

  if (!props.apiKey) {
    return (
      <MapError 
        height={height} 
        error="MapTiler API key is required. Get one at https://maptiler.com" 
      />
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Mode Indicator */}
      <div className="absolute top-4 right-4 z-50 bg-white/90 backdrop-blur-sm rounded-lg shadow-md px-3 py-1">
        <div className="flex items-center gap-2">
          {mode === 'leaflet' ? (
            <Map className="w-4 h-4 text-blue-600" />
          ) : (
            <Globe className="w-4 h-4 text-purple-600" />
          )}
          <span className="text-xs font-medium text-gray-700">
            {mode === 'leaflet' ? 'Leaflet' : 'SDK'} Mode
          </span>
        </div>
      </div>

      {/* Attribution */}
      <div className="absolute bottom-2 right-2 z-50 bg-white/80 backdrop-blur-sm rounded px-2 py-1">
        <p className="text-xs text-gray-600">
          © MapTiler © OpenStreetMap contributors
        </p>
      </div>

      {/* Render appropriate map */}
      {mode === 'leaflet' ? (
        <LeafletMapTiler {...otherProps} height={height} />
      ) : (
        <SDKMapTiler {...otherProps} height={height} />
      )}
    </div>
  );
};

export default MapTilerMap;