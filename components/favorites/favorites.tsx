'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, 
  MapPin, 
  Star, 
  Crown,
  Utensils,
  Building,
  Plane,
  Share2,
  Plus
} from 'lucide-react';

const mockFavorites = {
  destinations: [
    {
      id: 1,
      name: 'Santorini, Greece',
      type: 'destination',
      image: 'https://images.pexels.com/photos/161901/santorini-oia-greece-island-161901.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      category: 'Luxury Resort',
      price: 'From $2,500/night',
      savedDate: '2024-01-15',
      isExclusive: true,
    },
    {
      id: 2,
      name: 'Kyoto, Japan',
      type: 'destination',
      image: 'https://images.pexels.com/photos/1829980/pexels-photo-1829980.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      category: 'Cultural Heritage',
      price: 'From $1,800/night',
      savedDate: '2024-01-12',
      isExclusive: false,
    },
  ],
  experiences: [
    {
      id: 3,
      name: 'Private Chef Experience in Tuscany',
      type: 'experience',
      image: 'https://images.pexels.com/photos/1125262/pexels-photo-1125262.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      category: 'Culinary',
      price: 'From $800/person',
      savedDate: '2024-01-10',
      isExclusive: true,
    },
    {
      id: 4,
      name: 'Private Museum Tour - Louvre',
      type: 'experience',
      image: 'https://images.pexels.com/photos/2675266/pexels-photo-2675266.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.7,
      category: 'Cultural',
      price: 'From $1,200/group',
      savedDate: '2024-01-08',
      isExclusive: true,
    },
  ],
  accommodations: [
    {
      id: 5,
      name: 'Aman Tokyo',
      type: 'accommodation',
      image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      category: 'Luxury Hotel',
      price: 'From $1,500/night',
      savedDate: '2024-01-05',
      isExclusive: true,
    },
  ],
  restaurants: [
    {
      id: 6,
      name: 'Sukiyabashi Jiro',
      type: 'restaurant',
      image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      category: 'Michelin 3-Star',
      price: 'From $400/person',
      savedDate: '2024-01-03',
      isExclusive: true,
    },
  ],
};

const getIcon = (type: string) => {
  switch (type) {
    case 'destination': return MapPin;
    case 'experience': return Star;
    case 'accommodation': return Building;
    case 'restaurant': return Utensils;
    default: return Heart;
  }
};

export function Favorites() {
  const [activeTab, setActiveTab] = useState('all');
  const { t } = useLanguage();

  const allFavorites = [
    ...mockFavorites.destinations,
    ...mockFavorites.experiences,
    ...mockFavorites.accommodations,
    ...mockFavorites.restaurants,
  ].sort((a, b) => new Date(b.savedDate).getTime() - new Date(a.savedDate).getTime());

  const getFilteredFavorites = () => {
    if (activeTab === 'all') return allFavorites;
    return allFavorites.filter(item => item.type === activeTab);
  };

  const filteredFavorites = getFilteredFavorites();

  const stats = {
    total: allFavorites.length,
    destinations: mockFavorites.destinations.length,
    experiences: mockFavorites.experiences.length,
    accommodations: mockFavorites.accommodations.length,
    restaurants: mockFavorites.restaurants.length,
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-2">
          {t('nav.favorites')}
        </h1>
        <p className="text-gray-600">
          Your curated collection of luxury travel inspirations
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <Card className="luxury-card p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Saved</div>
        </Card>
        <Card className="luxury-card p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{stats.destinations}</div>
          <div className="text-sm text-gray-600">Destinations</div>
        </Card>
        <Card className="luxury-card p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{stats.experiences}</div>
          <div className="text-sm text-gray-600">Experiences</div>
        </Card>
        <Card className="luxury-card p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">{stats.accommodations}</div>
          <div className="text-sm text-gray-600">Hotels</div>
        </Card>
        <Card className="luxury-card p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{stats.restaurants}</div>
          <div className="text-sm text-gray-600">Restaurants</div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="destination">Places</TabsTrigger>
          <TabsTrigger value="experience">Experiences</TabsTrigger>
          <TabsTrigger value="accommodation">Hotels</TabsTrigger>
          <TabsTrigger value="restaurant">Dining</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filteredFavorites.length === 0 ? (
            <Card className="luxury-card p-12 text-center">
              <div className="text-6xl mb-4">💝</div>
              <h3 className="text-2xl font-display font-bold text-gray-800 mb-4">
                No favorites yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start exploring and save the luxury experiences that inspire you.
              </p>
              <Button asChild className="arca-gradient text-white">
                <a href="/explore">
                  <Plus className="w-4 h-4 mr-2" />
                  Explore Destinations
                </a>
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFavorites.map((item) => {
                const Icon = getIcon(item.type);
                return (
                  <Card key={item.id} className="luxury-card overflow-hidden group cursor-pointer zoom-hover">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover parallax-zoom"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      <div className="absolute top-4 left-4 flex gap-2">
                        <Badge className="bg-white/90 text-gray-800 font-medium capitalize zoom-hover">
                          {item.type}
                        </Badge>
                        {item.isExclusive && (
                          <Badge className="premium-badge zoom-hover">
                            <Crown className="w-3 h-3 mr-1" />
                            Exclusive
                          </Badge>
                        )}
                      </div>
                      
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`h-8 w-8 p-0 ${item.isBookmarked ? 'text-red-500' : 'text-white'} hover:bg-white/20 zoom-hover`}
                        >
                          <Heart className="w-4 h-4 fill-current" />
                        </Button>
                        <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full zoom-hover">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-semibold text-gray-800">{item.rating}</span>
                        </div>
                      </div>
                      
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="w-4 h-4" />
                          <h3 className="text-lg font-display font-bold">
                            {item.name}
                          </h3>
                        </div>
                        <p className="text-sm text-white/90">{item.category}</p>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-semibold text-gray-900">{item.price}</span>
                        <span className="text-xs text-gray-500">
                          Saved {new Date(item.savedDate).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 zoom-hover">
                          <Plane className="w-4 h-4 mr-2" />
                          Plan Trip
                        </Button>
                        <Button variant="outline" size="sm" className="zoom-hover">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Call to Action */}
      {filteredFavorites.length > 0 && (
        <Card className="mt-12 p-8 text-center arca-gradient text-white rounded-3xl">
          <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
            Ready to Experience Your Favorites?
          </h3>
          <p className="text-lg mb-6 text-white/90">
            Let ARCA turn your saved inspirations into a perfectly planned luxury journey.
          </p>
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            <a href="/concierge">
              <Crown className="w-5 h-5 mr-2" />
              Plan with ARCA Concierge
            </a>
          </Button>
        </Card>
      )}
    </div>
  );
}