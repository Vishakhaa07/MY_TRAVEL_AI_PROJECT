'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { useAuth } from '@/contexts/auth-context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Users,
  Clock,
  Star,
  Share2,
  Edit3,
  Crown
} from 'lucide-react';
import Link from 'next/link';

const mockTrips = [
  {
    id: 1,
    title: 'Romantic Santorini Escape',
    destination: 'Santorini, Greece',
    startDate: '2024-06-15',
    endDate: '2024-06-22',
    status: 'upcoming',
    image: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=600',
    totalCost: 15000,
    travelers: 2,
    rating: null,
    isLuxury: true,
    itinerary: {
      days: 7,
      activities: 12,
      restaurants: 8,
    }
  },
  {
    id: 2,
    title: 'Tokyo Cultural Immersion',
    destination: 'Tokyo, Japan',
    startDate: '2024-04-10',
    endDate: '2024-04-17',
    status: 'completed',
    image: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=600',
    totalCost: 12000,
    travelers: 1,
    rating: 4.9,
    isLuxury: true,
    itinerary: {
      days: 7,
      activities: 15,
      restaurants: 10,
    }
  },
  {
    id: 3,
    title: 'Swiss Alps Luxury Retreat',
    destination: 'Zermatt, Switzerland',
    startDate: '2024-08-20',
    endDate: '2024-08-27',
    status: 'saved',
    image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=600',
    totalCost: 18000,
    travelers: 2,
    rating: null,
    isLuxury: true,
    itinerary: {
      days: 7,
      activities: 10,
      restaurants: 6,
    }
  },
];

export function MyTrips() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const { t } = useLanguage();
  const { user } = useAuth();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'saved': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'upcoming': return t('trips.upcoming');
      case 'completed': return 'Completed';
      case 'saved': return t('trips.saved');
      default: return status;
    }
  };

  const filteredTrips = mockTrips.filter(trip => {
    if (activeTab === 'upcoming') return trip.status === 'upcoming';
    if (activeTab === 'past') return trip.status === 'completed';
    if (activeTab === 'saved') return trip.status === 'saved';
    return true;
  });

  const stats = {
    total: mockTrips.length,
    upcoming: mockTrips.filter(t => t.status === 'upcoming').length,
    completed: mockTrips.filter(t => t.status === 'completed').length,
    saved: mockTrips.filter(t => t.status === 'saved').length,
    totalSpent: mockTrips.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.totalCost, 0),
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-2">
            {t('trips.title')}
          </h1>
          {user?.isPremium && (
            <Badge className="premium-badge">
              <Crown className="w-3 h-3 mr-1" />
              Premium Member
            </Badge>
          )}
        </div>
        <Button asChild className="arca-gradient text-white">
          <Link href="/concierge">
            <Plus className="w-4 h-4 mr-2" />
            {t('trips.createNew')}
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="luxury-card p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Trips</div>
        </Card>
        <Card className="luxury-card p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{stats.upcoming}</div>
          <div className="text-sm text-gray-600">Upcoming</div>
        </Card>
        <Card className="luxury-card p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{stats.completed}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </Card>
        <Card className="luxury-card p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">${stats.totalSpent.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Invested</div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
          <TabsTrigger value="upcoming">{t('trips.upcoming')}</TabsTrigger>
          <TabsTrigger value="past">{t('trips.past')}</TabsTrigger>
          <TabsTrigger value="saved">{t('trips.saved')}</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filteredTrips.length === 0 ? (
            <Card className="luxury-card p-12 text-center">
              <div className="text-6xl mb-4">✈️</div>
              <h3 className="text-2xl font-display font-bold text-gray-800 mb-4">
                No {activeTab} trips
              </h3>
              <p className="text-gray-600 mb-6">
                {activeTab === 'upcoming' && "You don't have any upcoming trips planned."}
                {activeTab === 'past' && "You haven't completed any trips yet."}
                {activeTab === 'saved' && "You haven't saved any trip ideas yet."}
              </p>
              <Button asChild className="arca-gradient text-white">
                <Link href="/concierge">
                  <Plus className="w-4 h-4 mr-2" />
                  Plan Your First Luxury Trip
                </Link>
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrips.map((trip) => (
                <Card key={trip.id} className="luxury-card overflow-hidden group cursor-pointer zoom-hover">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={trip.image} 
                      alt={trip.title}
                      className="w-full h-full object-cover parallax-zoom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className={`${getStatusColor(trip.status)} zoom-hover`}>
                        {getStatusLabel(trip.status)}
                      </Badge>
                      {trip.isLuxury && (
                        <Badge className="premium-badge zoom-hover">
                          <Crown className="w-3 h-3 mr-1" />
                          Luxury
                        </Badge>
                      )}
                    </div>
                    
                    {trip.rating && (
                      <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-full zoom-hover">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-semibold">{trip.rating}</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-lg font-display font-bold mb-1">
                        {trip.title}
                      </h3>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="w-3 h-3" />
                        <span>{trip.destination}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-3 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        <span>${trip.totalCost.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{trip.travelers} traveler{trip.travelers > 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{trip.itinerary.days} days, {trip.itinerary.activities} activities</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 zoom-hover">
                        <Edit3 className="w-4 h-4 mr-2" />
                        {trip.status === 'saved' ? 'Plan' : 'View'}
                      </Button>
                      <Button variant="outline" size="sm" className="zoom-hover">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Floating Action Button */}
      <Button asChild className="floating-fab">
        <Link href="/concierge">
          <Plus className="w-6 h-6" />
        </Link>
      </Button>
    </div>
  );
}