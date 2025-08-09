'use client';

import { useLanguage } from '@/contexts/language-context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const destinations = [
  {
    id: 1,
    name: 'Santorini, Greece',
    description: 'Exclusive cliffside villas with private infinity pools',
    image: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    price: 'From $2,500/night',
    category: 'Luxury Resort',
    highlights: ['Private Villa', 'Infinity Pool', 'Butler Service'],
  },
  {
    id: 2,
    name: 'Kyoto, Japan',
    description: 'Traditional ryokans with modern luxury amenities',
    image: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    price: 'From $1,800/night',
    category: 'Cultural Heritage',
    highlights: ['Traditional Ryokan', 'Private Onsen', 'Tea Ceremony'],
  },
  {
    id: 3,
    name: 'Maldives',
    description: 'Overwater bungalows in pristine turquoise waters',
    image: 'https://images.pexels.com/photos/3250613/pexels-photo-3250613.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    price: 'From $3,200/night',
    category: 'Tropical Paradise',
    highlights: ['Overwater Villa', 'Private Beach', 'Spa Treatments'],
  },
];

export function FeaturedDestinations() {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6 drop-shadow-sm">
            {t('destinations.title')}
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
            {t('destinations.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {destinations.map((destination, index) => (
            <Card key={destination.id} className={`destination-card group zoom-hover ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
              <div className={`relative ${index === 0 ? 'h-96 lg:h-full' : 'h-80'} overflow-hidden`}>
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="destination-image parallax-zoom"
                />
                
                {/* Overlay Content */}
                <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <Badge className="bg-white/90 text-gray-800 font-medium">
                      {destination.category}
                    </Badge>
                    <div className="flex items-center gap-1 bg-white/90 px-3 py-1 rounded-full zoom-hover">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-gray-800">{destination.rating}</span>
                    </div>
                  </div>
                  
                  <div className="text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-5 h-5" />
                      <h3 className={`font-display font-bold ${index === 0 ? 'text-3xl' : 'text-xl'} drop-shadow-lg`}>
                        {destination.name}
                      </h3>
                    </div>
                    <p className={`mb-4 ${index === 0 ? 'text-lg' : 'text-sm'} text-white drop-shadow-md font-medium`}>
                      {destination.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {destination.highlights.map((highlight) => (
                        <Badge key={highlight} variant="secondary" className="bg-white/20 text-white border-white/30">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`font-bold ${index === 0 ? 'text-lg' : 'text-sm'} drop-shadow-md`}>
                        {destination.price}
                      </span>
                      <Button size="sm" className="liquid-button text-white font-semibold zoom-hover">
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="liquid-button zoom-hover">
            <Link href="/explore">
              {t('destinations.viewAll')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}