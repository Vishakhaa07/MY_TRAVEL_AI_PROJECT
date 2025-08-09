'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Star, Crown, Filter, Heart } from 'lucide-react';

const destinations = [
  {
    id: 1,
    name: 'Santorini, Greece',
    country: 'Greece',
    category: 'Luxury Resort',
    description: 'Exclusive cliffside villas with infinity pools and sunset views',
    image: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    priceRange: '$$$',
    startingPrice: 2500,
    highlights: ['Private Villa', 'Infinity Pool', 'Butler Service', 'Sunset Views'],
    experiences: ['Wine Tasting', 'Private Yacht', 'Helicopter Tours'],
    bestMonths: ['Apr', 'May', 'Sep', 'Oct'],
    isExclusive: true,
  },
  {
    id: 2,
    name: 'Kyoto, Japan',
    country: 'Japan',
    category: 'Cultural Heritage',
    description: 'Traditional ryokans with modern luxury and private onsen',
    image: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    priceRange: '$$',
    startingPrice: 1800,
    highlights: ['Traditional Ryokan', 'Private Onsen', 'Tea Ceremony', 'Garden Views'],
    experiences: ['Geisha Performance', 'Temple Tours', 'Kaiseki Dining'],
    bestMonths: ['Mar', 'Apr', 'Nov', 'Dec'],
    isExclusive: false,
  },
  {
    id: 3,
    name: 'Maldives',
    country: 'Maldives',
    category: 'Tropical Paradise',
    description: 'Overwater bungalows in pristine turquoise waters',
    image: 'https://images.pexels.com/photos/3250613/pexels-photo-3250613.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    priceRange: '$$$',
    startingPrice: 3200,
    highlights: ['Overwater Villa', 'Private Beach', 'Spa Treatments', 'Snorkeling'],
    experiences: ['Dolphin Watching', 'Underwater Dining', 'Seaplane Tours'],
    bestMonths: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
    isExclusive: true,
  },
  {
    id: 4,
    name: 'Swiss Alps',
    country: 'Switzerland',
    category: 'Mountain Luxury',
    description: 'Alpine chalets with panoramic mountain views and ski access',
    image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    priceRange: '$$$',
    startingPrice: 2800,
    highlights: ['Mountain Chalet', 'Ski Access', 'Spa Wellness', 'Panoramic Views'],
    experiences: ['Helicopter Skiing', 'Mountain Dining', 'Alpine Hiking'],
    bestMonths: ['Dec', 'Jan', 'Feb', 'Mar', 'Jun', 'Jul', 'Aug'],
    isExclusive: true,
  },
  {
    id: 5,
    name: 'Tuscany, Italy',
    country: 'Italy',
    category: 'Wine Country',
    description: 'Historic villas surrounded by vineyards and olive groves',
    image: 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.6,
    priceRange: '$$',
    startingPrice: 1500,
    highlights: ['Historic Villa', 'Wine Cellar', 'Cooking Classes', 'Art Tours'],
    experiences: ['Wine Tasting', 'Truffle Hunting', 'Art Workshops'],
    bestMonths: ['Apr', 'May', 'Sep', 'Oct'],
    isExclusive: false,
  },
  {
    id: 6,
    name: 'Dubai, UAE',
    country: 'UAE',
    category: 'Urban Luxury',
    description: 'Futuristic luxury hotels with world-class amenities',
    image: 'https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    priceRange: '$$$',
    startingPrice: 2200,
    highlights: ['Luxury Hotel', 'City Views', 'Shopping Access', 'Fine Dining'],
    experiences: ['Desert Safari', 'Yacht Charter', 'Helicopter Tours'],
    bestMonths: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    isExclusive: true,
  },
  {
    id: 7,
    name: 'Bora Bora, French Polynesia',
    country: 'French Polynesia',
    category: 'Tropical Paradise',
    description: 'Luxury overwater resorts with crystal-clear lagoons and coral reefs',
    image: 'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    priceRange: '$$$',
    startingPrice: 4500,
    highlights: ['Overwater Bungalow', 'Private Lagoon', 'Coral Reef', 'Sunset Views'],
    experiences: ['Shark Swimming', 'Pearl Farm Tours', 'Polynesian Culture'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    isExclusive: true,
  },
  {
    id: 8,
    name: 'Aspen, Colorado',
    country: 'USA',
    category: 'Mountain Luxury',
    description: 'World-class ski resort with luxury lodges and mountain spas',
    image: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    priceRange: '$$$',
    startingPrice: 3500,
    highlights: ['Ski Resort', 'Mountain Lodge', 'Luxury Spa', 'Gourmet Dining'],
    experiences: ['Powder Skiing', 'Hot Air Balloon', 'Wine Tastings'],
    bestMonths: ['Dec', 'Jan', 'Feb', 'Mar', 'Jun', 'Jul', 'Aug'],
    isExclusive: true,
  },
  {
    id: 9,
    name: 'Amalfi Coast, Italy',
    country: 'Italy',
    category: 'Coastal Luxury',
    description: 'Dramatic cliffside hotels overlooking the Mediterranean Sea',
    image: 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    priceRange: '$$$',
    startingPrice: 2800,
    highlights: ['Cliffside Hotel', 'Sea Views', 'Italian Cuisine', 'Historic Towns'],
    experiences: ['Boat Tours', 'Limoncello Tasting', 'Cooking Classes'],
    bestMonths: ['Apr', 'May', 'Jun', 'Sep', 'Oct'],
    isExclusive: true,
  },
  {
    id: 10,
    name: 'Serengeti, Tanzania',
    country: 'Tanzania',
    category: 'Safari Luxury',
    description: 'Exclusive safari lodges with front-row seats to the Great Migration',
    image: 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    priceRange: '$$$',
    startingPrice: 3800,
    highlights: ['Safari Lodge', 'Wildlife Viewing', 'Great Migration', 'Bush Dining'],
    experiences: ['Hot Air Balloon Safari', 'Night Game Drives', 'Maasai Culture'],
    bestMonths: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Dec'],
    isExclusive: true,
  },
  {
    id: 11,
    name: 'Banff, Canada',
    country: 'Canada',
    category: 'Mountain Luxury',
    description: 'Luxury mountain resorts surrounded by pristine wilderness and glacial lakes',
    image: 'https://images.pexels.com/photos/1006293/pexels-photo-1006293.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.6,
    priceRange: '$$',
    startingPrice: 2200,
    highlights: ['Mountain Resort', 'Glacial Lakes', 'Wildlife', 'Hiking Trails'],
    experiences: ['Helicopter Tours', 'Ice Walking', 'Aurora Viewing'],
    bestMonths: ['Jun', 'Jul', 'Aug', 'Sep', 'Dec', 'Jan'],
    isExclusive: false,
  },
];

const categories = ['All', 'Luxury Resort', 'Cultural Heritage', 'Tropical Paradise', 'Mountain Luxury', 'Wine Country', 'Urban Luxury', 'Coastal Luxury', 'Safari Luxury'];
const priceRanges = ['All', '$', '$$', '$$$'];
const countries = ['All', ...new Set(destinations.map(d => d.country))];

export function ExploreDestinations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [showExclusiveOnly, setShowExclusiveOnly] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  
  // Mock translation function to handle missing useLanguage hook
  const t = (key: string) => {
    const translations: Record<string, string> = {
      'destinations.title': 'Explore Luxury Destinations',
      'destinations.subtitle': 'Discover extraordinary places and create unforgettable experiences with our curated collection of luxury destinations.'
    };
    return translations[key] || key;
  };

  const filteredDestinations = destinations.filter(destination => {
    const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         destination.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || destination.category === selectedCategory;
    const matchesPrice = selectedPrice === 'All' || destination.priceRange === selectedPrice;
    const matchesCountry = selectedCountry === 'All' || destination.country === selectedCountry;
    const matchesExclusive = !showExclusiveOnly || destination.isExclusive;
    
    return matchesSearch && matchesCategory && matchesPrice && matchesCountry && matchesExclusive;
  });

  const toggleFavorite = (destinationId: number) => {
    setFavorites(prev => 
      prev.includes(destinationId) 
        ? prev.filter(id => id !== destinationId)
        : [...prev, destinationId]
    );
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedPrice('All');
    setSelectedCountry('All');
    setShowExclusiveOnly(false);
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {t('destinations.title')}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t('destinations.subtitle')}
        </p>
      </div>

      {/* Filters */}
      <Card className="p-6 mb-8 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search luxury destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Price Filter */}
          <Select value={selectedPrice} onValueChange={setSelectedPrice}>
            <SelectTrigger>
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              {priceRanges.map(price => (
                <SelectItem key={price} value={price}>{price}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Country Filter */}
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger>
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map(country => (
                <SelectItem key={country} value={country}>{country}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Additional Filters */}
        <div className="flex items-center gap-4">
          <Button
            variant={showExclusiveOnly ? "default" : "outline"}
            onClick={() => setShowExclusiveOnly(!showExclusiveOnly)}
            size="sm"
            className="gap-2"
          >
            <Crown className="w-4 h-4" />
            Exclusive Only
          </Button>
          <span className="text-sm text-gray-600">
            Showing {filteredDestinations.length} destinations
          </span>
        </div>
      </Card>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDestinations.map((destination) => (
          <Card key={destination.id} className="luxury-card group overflow-hidden zoom-hover">
            <div className="relative h-64 overflow-hidden">
              <img 
                src={destination.image} 
                alt={destination.name}
                className="w-full h-full object-cover parallax-zoom"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Overlay Content */}
              <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="flex gap-2">
                    <Badge className="bg-white/90 text-gray-800 font-medium">
                      {destination.category}
                    </Badge>
                    {destination.isExclusive && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
                        <Crown className="w-3 h-3 mr-1" />
                        Exclusive
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(destination.id)}
                      className={`h-8 w-8 p-0 ${
                        favorites.includes(destination.id) 
                          ? 'text-red-500 hover:text-red-600 scale-110' 
                          : 'text-white hover:text-red-500'
                      } hover:bg-white/20 zoom-hover`}
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(destination.id) ? 'fill-current' : ''}`} />
                    </Button>
                    <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full zoom-hover">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-semibold text-gray-800">{destination.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4" />
                    <h3 className="text-xl font-bold">
                      {destination.name}
                    </h3>
                  </div>
                  <p className="text-sm text-white/90 mb-3">
                    {destination.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">
                      From ${destination.startingPrice.toLocaleString()}/night
                    </span>
                    <span className="text-sm">{destination.priceRange}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">Highlights</p>
                  <div className="flex flex-wrap gap-1">
                    {destination.highlights.slice(0, 3).map(highlight => (
                      <Badge key={highlight} variant="secondary" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">Best Time to Visit</p>
                  <div className="flex gap-1">
                    {destination.bestMonths.slice(0, 4).map(month => (
                      <Badge key={month} variant="outline" className="text-xs">
                        {month}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 mt-6">
                <Button className="flex-1 arca-gradient text-white zoom-hover">
                  <MapPin className="w-4 h-4 mr-2" />
                  Plan Trip
                </Button>
                <Button variant="outline" size="icon" className="zoom-hover">
                  <Star className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredDestinations.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🌍</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            No destinations found
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your filters or search for different terms.
          </p>
          <Button 
            onClick={clearAllFilters}
            className="arca-gradient text-white zoom-hover"
          >
            Clear All Filters
          </Button>
        </div>
      )}

      {/* Call to Action */}
      <Card className="mt-16 p-8 md:p-12 text-center arca-gradient text-white rounded-3xl zoom-in-out">
        <h3 className="text-3xl md:text-4xl font-bold mb-4">
          Ready for Your Luxury Escape?
        </h3>
        <p className="text-xl mb-6 text-white/90 text-pretty">
          Let our AI concierge create a completely personalized luxury experience just for you.
        </p>
        <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 zoom-hover">
          <a href="/concierge">
            <Crown className="w-5 h-5 mr-2" />
            Start Planning with ARCA
          </a>
        </Button>
      </Card>
    </div>
  );
}