'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Star, ArrowRight } from 'lucide-react';

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-gradient-to-br from-warm-orange-100 to-sunset-pink-100 animate-pulse rounded-3xl" />
});
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

const destinations = [
  {
    id: 1,
    name: 'Paris, France',
    description: 'City of Light and Romance',
    rating: 4.9,
    image: 'https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg?auto=compress&cs=tinysrgb&w=400',
    position: { lat: 48.8566, lng: 2.3522 },
    price: 'From $1,200',
  },
  {
    id: 2,
    name: 'Tokyo, Japan',
    description: 'Modern metropolis meets tradition',
    rating: 4.8,
    image: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=400',
    position: { lat: 35.6762, lng: 139.6503 },
    price: 'From $1,800',
  },
  {
    id: 3,
    name: 'Santorini, Greece',
    description: 'Stunning sunsets and white architecture',
    rating: 4.9,
    image: 'https://images.pexels.com/photos/161901/santorini-oia-greece-island-161901.jpeg?auto=compress&cs=tinysrgb&w=400',
    position: { lat: 36.3932, lng: 25.4615 },
    price: 'From $2,500',
  },
  {
    id: 4,
    name: 'Bali, Indonesia',
    description: 'Tropical paradise and culture',
    rating: 4.7,
    image: 'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=400',
    position: { lat: -8.4095, lng: 115.1889 },
    price: 'From $800',
  },
  {
    id: 5,
    name: 'New York, USA',
    description: 'The city that never sleeps',
    rating: 4.6,
    image: 'https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=400',
    position: { lat: 40.7128, lng: -74.0060 },
    price: 'From $1,500',
  },
];

export function InteractiveMap() {
  const [selectedDestination, setSelectedDestination] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Preload Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);
  }, []);

  const selectedDest = destinations.find(d => d.id === selectedDestination);

  const handleMapReady = () => {
    setMapReady(true);
  };
  return (
    <section className="py-20 bg-gradient-to-br from-white to-warm-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-warm-brown-900 mb-4 font-playfair">
            Explore the world
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Click on any destination to discover amazing experiences and start planning your journey
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            {isClient ? (
              <MapContainer
                center={[20, 0]}
                zoom={2}
                style={{ height: '100%', width: '100%' }}
                className="z-10 leaflet-container"
                scrollWheelZoom={false}
                dragging={mapReady}
                touchZoom={true}
                doubleClickZoom={true}
                boxZoom={false}
                keyboard={false}
                zoomControl={true}
                attributionControl={true}
                whenReady={handleMapReady}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
                  maxZoom={18}
                  minZoom={2}
                />
                
                {destinations.map((destination) => (
                  <Marker
                    key={destination.id}
                    position={[destination.position.lat, destination.position.lng]}
                    eventHandlers={{
                      click: () => setSelectedDestination(destination.id),
                      mouseover: (e) => {
                        e.target.openPopup();
                      },
                    }}
                  >
                    <Popup>
                      <div className="text-center p-3 min-w-[200px]">
                        <img 
                          src={destination.image} 
                          alt={destination.name}
                          className="w-24 h-20 object-cover rounded-lg mb-3 mx-auto shadow-md"
                        />
                        <h3 className="font-bold text-base text-gray-800 mb-2">{destination.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{destination.description}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-warm-orange-600">{destination.price}</p>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-medium">{destination.rating}</span>
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-warm-orange-100 to-sunset-pink-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-warm-orange-500 mx-auto mb-4"></div>
                  <p className="text-warm-brown-700">Loading interactive world map...</p>
                </div>
              </div>
            )}

            {/* Destination Info Card */}
            {selectedDest && (
              <Card className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-auto md:w-96 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border-0 p-6 animate-in slide-in-from-bottom-4 duration-500 z-30">
                <div className="flex items-start gap-4">
                  <img
                    src={selectedDest.image}
                    alt={selectedDest.name}
                    className="w-20 h-20 rounded-xl object-cover shadow-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">
                      {selectedDest.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {selectedDest.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{selectedDest.rating}</span>
                      </div>
                      <span className="text-sm font-semibold text-warm-orange-600">
                        {selectedDest.price}
                      </span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => setSelectedDestination(null)}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
                >
                  ×
                </button>
                
                <Button
                  className="w-full mt-4 bg-gradient-to-r from-warm-orange-500 to-warm-orange-600 hover:from-warm-orange-600 hover:to-warm-orange-700 text-white rounded-xl transform hover:scale-105 transition-all duration-300"
                  onClick={() => window.location.href = '/itinerary'}
                >
                  Plan Trip Here
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}