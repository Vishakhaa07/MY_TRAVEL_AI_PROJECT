'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Heart,
  Share2,
  Download,
  Edit3,
  Trash2,
  Star,
  Clock
} from 'lucide-react';

const savedTrips = [
  {
    id: 1,
    title: 'Peaceful Bali Retreat',
    destination: 'Bali, Indonesia',
    duration: '7 days',
    budget: 1200,
    savedDate: '2024-01-15',
    image: 'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['Wellness', 'Beach', 'Spa'],
    mood: 'Calm',
    rating: 4.8,
    isBookmarked: true,
  },
  {
    id: 2,
    title: 'European Art & Culture Tour',
    destination: 'Paris, Rome, Barcelona',
    duration: '14 days',
    budget: 3500,
    savedDate: '2024-01-10',
    image: 'https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['Culture', 'Art', 'History'],
    mood: 'Curious',
    rating: 4.9,
    isBookmarked: false,
  },
  {
    id: 3,
    title: 'Adventure in New Zealand',
    destination: 'New Zealand',
    duration: '10 days',
    budget: 2800,
    savedDate: '2024-01-08',
    image: 'https://images.pexels.com/photos/1006293/pexels-photo-1006293.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['Adventure', 'Nature', 'Hiking'],
    mood: 'Adventurous',
    rating: 4.7,
    isBookmarked: true,
  },
  {
    id: 4,
    title: 'Romantic Santorini Getaway',
    destination: 'Santorini, Greece',
    duration: '5 days',
    budget: 1800,
    savedDate: '2024-01-05',
    image: 'https://images.pexels.com/photos/161901/santorini-oia-greece-island-161901.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['Romance', 'Sunset', 'Wine'],
    mood: 'Romantic',
    rating: 4.9,
    isBookmarked: true,
  },
];

export function SavedTrips() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('all');

  const allTags = ['all', ...new Set(savedTrips.flatMap(trip => trip.tags))];

  const filteredTrips = savedTrips.filter(trip => {
    const matchesSearch = trip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trip.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = filterTag === 'all' || trip.tags.includes(filterTag);
    return matchesSearch && matchesTag;
  });

  const getMoodColor = (mood: string) => {
    const colors = {
      'Calm': 'bg-blue-100 text-blue-800',
      'Curious': 'bg-purple-100 text-purple-800',
      'Adventurous': 'bg-green-100 text-green-800',
      'Romantic': 'bg-pink-100 text-pink-800',
    };
    return colors[mood as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-2">
          Your Saved Trips
        </h1>
        <p className="text-gray-600">
          Keep track of your favorite travel plans and inspiration
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Saved</p>
              <p className="text-2xl font-bold text-blue-900">{savedTrips.length}</p>
            </div>
            <Heart className="w-8 h-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Bookmarked</p>
              <p className="text-2xl font-bold text-green-900">
                {savedTrips.filter(trip => trip.isBookmarked).length}
              </p>
            </div>
            <Star className="w-8 h-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Total Budget</p>
              <p className="text-2xl font-bold text-purple-900">
                ${savedTrips.reduce((sum, trip) => sum + trip.budget, 0).toLocaleString()}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-600" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Avg Rating</p>
              <p className="text-2xl font-bold text-orange-900">
                {(savedTrips.reduce((sum, trip) => sum + trip.rating, 0) / savedTrips.length).toFixed(1)}
              </p>
            </div>
            <Star className="w-8 h-8 text-orange-600" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search saved trips..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {allTags.map(tag => (
            <Button
              key={tag}
              variant={filterTag === tag ? 'default' : 'outline'}
              onClick={() => setFilterTag(tag)}
              size="sm"
              className="capitalize"
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>

      {/* Trips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrips.map((trip) => (
          <Card key={trip.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-white border-0 shadow-md">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={trip.image} 
                alt={trip.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className={getMoodColor(trip.mood)}>
                  {trip.mood}
                </Badge>
              </div>
              <div className="absolute top-4 right-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-8 w-8 p-0 ${trip.isBookmarked ? 'text-yellow-500' : 'text-white'} hover:bg-white/20`}
                >
                  <Heart className={`w-4 h-4 ${trip.isBookmarked ? 'fill-current' : ''}`} />
                </Button>
              </div>
              <div className="absolute bottom-4 right-4 bg-white/90 px-2 py-1 rounded-full">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-semibold">{trip.rating}</span>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {trip.title}
              </h3>
              
              <div className="space-y-2 mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{trip.destination}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{trip.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span>${trip.budget.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Saved {new Date(trip.savedDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {trip.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Plan Trip
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredTrips.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">💾</div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            No saved trips found
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm ? 'Try adjusting your search terms.' : 'Start exploring and save trips you love!'}
          </p>
          <Button asChild className="arca-gradient text-white">
            <a href="/explore">
              Explore Destinations
            </a>
          </Button>
        </div>
      )}
    </div>
  );
}