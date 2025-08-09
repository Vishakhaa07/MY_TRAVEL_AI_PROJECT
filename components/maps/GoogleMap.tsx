'use client';

import React, { useCallback, useState, useEffect } from 'react';
import { MapPoint } from './MapDisplay';

interface GoogleMapProps {
  center: { lat: number; lng: number };
  zoom: number;
  points: MapPoint[];
  height: string;
  apiKey: string;
  onMarkerClick?: (point: MapPoint) => void;
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  center,
  zoom,
  points,
  height,
  apiKey,
  onMarkerClick,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [GoogleMapComponent, setGoogleMapComponent] = useState<any>(null);
  const [MarkerComponent, setMarkerComponent] = useState<any>(null);
  const [InfoWindowComponent, setInfoWindowComponent] = useState<any>(null);
  const [LoadScript, setLoadScript] = useState<any>(null);
  const [selectedMarker, setSelectedMarker] = useState<MapPoint | null>(null);

  useEffect(() => {
    // Dynamically import Google Maps components
    const loadGoogleMaps = async () => {
      try {
        const googleMaps = await import('@react-google-maps/api');
        setLoadScript(googleMaps.LoadScript);
        setGoogleMapComponent(googleMaps.GoogleMap);
        setMarkerComponent(googleMaps.Marker);
        setInfoWindowComponent(googleMaps.InfoWindow);
      } catch (error) {
        console.error('Failed to load Google Maps:', error);
      }
    };

    loadGoogleMaps();
  }, []);

  const onLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const onMarkerClickHandler = useCallback((point: MapPoint) => {
    setSelectedMarker(point);
    onMarkerClick?.(point);
  }, [onMarkerClick]);

  const mapStyles = {
    height,
    width: '100%',
  };

  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: true,
    fullscreenControl: true,
  };

  if (!LoadScript || !GoogleMapComponent || !MarkerComponent || !InfoWindowComponent) {
    return (
      <div 
        className="flex items-center justify-center bg-gray-100 animate-pulse"
        style={{ height }}
      >
        <div className="text-gray-500">Loading Google Maps...</div>
      </div>
    );
  }

  return (
    <LoadScript googleMapsApiKey={apiKey} onLoad={onLoad}>
      <GoogleMapComponent
        mapContainerStyle={mapStyles}
        center={center}
        zoom={zoom}
        options={mapOptions}
      >
        {points.map((point, index) => (
          <MarkerComponent
            key={index}
            position={{ lat: point.lat, lng: point.lng }}
            title={point.title || point.label}
            icon={point.iconUrl ? {
              url: point.iconUrl,
              scaledSize: new window.google.maps.Size(32, 32),
            } : undefined}
            onClick={() => onMarkerClickHandler(point)}
          />
        ))}

        {selectedMarker && (
          <InfoWindowComponent
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div className="p-2 min-w-[200px]">
              <h3 className="font-bold text-lg mb-2 text-gray-800">
                {selectedMarker.title || selectedMarker.label}
              </h3>
              {selectedMarker.description && (
                <p className="text-sm text-gray-600 mb-2">
                  {selectedMarker.description}
                </p>
              )}
              <p className="text-xs text-gray-500">
                {selectedMarker.lat.toFixed(4)}, {selectedMarker.lng.toFixed(4)}
              </p>
            </div>
          </InfoWindowComponent>
        )}
      </GoogleMapComponent>
    </LoadScript>
  );
};

export default GoogleMap;