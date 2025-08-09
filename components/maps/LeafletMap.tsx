'use client';

import React, { useEffect, useState } from 'react';
import { MapPoint } from './MapDisplay';

interface LeafletMapProps {
  center: { lat: number; lng: number };
  zoom: number;
  points: MapPoint[];
  height: string;
  onMarkerClick?: (point: MapPoint) => void;
}

const LeafletMap: React.FC<LeafletMapProps> = ({
  center,
  zoom,
  points,
  height,
  onMarkerClick,
}) => {
  const [isClient, setIsClient] = useState(false);
  const [MapContainer, setMapContainer] = useState<any>(null);
  const [TileLayer, setTileLayer] = useState<any>(null);
  const [Marker, setMarker] = useState<any>(null);
  const [Popup, setPopup] = useState<any>(null);
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);
    
    // Dynamically import Leaflet components
    const loadLeaflet = async () => {
      try {
        const leaflet = await import('leaflet');
        const reactLeaflet = await import('react-leaflet');
        
        setL(leaflet.default);
        setMapContainer(reactLeaflet.MapContainer);
        setTileLayer(reactLeaflet.TileLayer);
        setMarker(reactLeaflet.Marker);
        setPopup(reactLeaflet.Popup);

        // Fix for default markers
        delete (leaflet.default.Icon.Default.prototype as any)._getIconUrl;
        leaflet.default.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });
      } catch (error) {
        console.error('Failed to load Leaflet:', error);
      }
    };

    loadLeaflet();
  }, []);

  if (!isClient || !MapContainer || !TileLayer || !Marker || !Popup || !L) {
    return (
      <div 
        className="flex items-center justify-center bg-gray-100 animate-pulse"
        style={{ height }}
      >
        <div className="text-gray-500">Loading Leaflet map...</div>
      </div>
    );
  }

  const createCustomIcon = (iconUrl?: string) => {
    if (!iconUrl) return undefined;
    
    return new L.Icon({
      iconUrl,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
  };

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={zoom}
      style={{ height, width: '100%' }}
      className="z-10"
      scrollWheelZoom={true}
      dragging={true}
      touchZoom={true}
      doubleClickZoom={true}
      boxZoom={true}
      keyboard={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        maxZoom={19}
      />
      
      {points.map((point, index) => (
        <Marker
          key={index}
          position={[point.lat, point.lng]}
          icon={createCustomIcon(point.iconUrl)}
          eventHandlers={{
            click: () => onMarkerClick?.(point),
          }}
        >
          <Popup>
            <div className="text-center p-2 min-w-[200px]">
              <h3 className="font-bold text-lg mb-2 text-gray-800">
                {point.title || point.label}
              </h3>
              {point.description && (
                <p className="text-sm text-gray-600 mb-2">
                  {point.description}
                </p>
              )}
              <p className="text-xs text-gray-500">
                {point.lat.toFixed(4)}, {point.lng.toFixed(4)}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMap;