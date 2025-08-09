'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Plus, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users,
  Calendar,
  Download,
  Share2,
  Save,
  GripVertical
} from 'lucide-react';

interface Activity {
  id: string;
  title: string;
  description: string;
  time: string;
  duration: string;
  cost: string;
  location: string;
  type: 'attraction' | 'restaurant' | 'hotel' | 'transport' | 'activity';
}

interface Day {
  id: string;
  date: string;
  activities: Activity[];
}

const sampleItinerary: Day[] = [
  {
    id: 'day-1',
    date: '2025-06-15',
    activities: [
      {
        id: 'act-1',
        title: 'Arrive in Paris',
        description: 'Check into hotel and explore the neighborhood',
        time: '14:00',
        duration: '3 hours',
        cost: '$0',
        location: 'Hotel Le Marais',
        type: 'hotel'
      },
      {
        id: 'act-2',
        title: 'Seine River Cruise',
        description: 'Romantic evening cruise with dinner',
        time: '19:00',
        duration: '2 hours',
        cost: '$85',
        location: 'Pont Neuf',
        type: 'activity'
      }
    ]
  },
  {
    id: 'day-2',
    date: '2025-06-16',
    activities: [
      {
        id: 'act-3',
        title: 'Louvre Museum',
        description: 'Skip-the-line tickets and guided tour',
        time: '09:00',
        duration: '4 hours',
        cost: '$65',
        location: 'Louvre Museum',
        type: 'attraction'
      },
      {
        id: 'act-4',
        title: 'Lunch at Café de Flore',
        description: 'Classic Parisian bistro experience',
        time: '13:30',
        duration: '1.5 hours',
        cost: '$45',
        location: 'Saint-Germain-des-Prés',
        type: 'restaurant'
      }
    ]
  }
];

const activityTypes = {
  attraction: { color: 'bg-blue-500', icon: '🏛️' },
  restaurant: { color: 'bg-orange-500', icon: '🍽️' },
  hotel: { color: 'bg-purple-500', icon: '🏨' },
  transport: { color: 'bg-green-500', icon: '🚗' },
  activity: { color: 'bg-pink-500', icon: '🎯' },
};

export function ItineraryBuilder() {
  const [itinerary, setItinerary] = useState<Day[]>(sampleItinerary);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [tripTitle, setTripTitle] = useState('Paris Adventure');
  const [isEditing, setIsEditing] = useState(false);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('travel-itinerary', JSON.stringify(itinerary));
  }, [itinerary]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('travel-itinerary');
    if (saved) {
      try {
        setItinerary(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved itinerary');
      }
    }
  }, []);

  const handleDragStart = (e: React.DragEvent, activityId: string) => {
    setDraggedItem(activityId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetDayId: string, targetIndex: number) => {
    e.preventDefault();
    
    if (!draggedItem) return;

    // Find the dragged activity
    let draggedActivity: Activity | null = null;
    let sourceDayId: string | null = null;
    let sourceIndex: number = -1;

    for (const day of itinerary) {
      const activityIndex = day.activities.findIndex(act => act.id === draggedItem);
      if (activityIndex !== -1) {
        draggedActivity = day.activities[activityIndex];
        sourceDayId = day.id;
        sourceIndex = activityIndex;
        break;
      }
    }

    if (!draggedActivity || !sourceDayId) return;

    // Create new itinerary with moved activity
    const newItinerary = itinerary.map(day => {
      if (day.id === sourceDayId) {
        // Remove from source
        return {
          ...day,
          activities: day.activities.filter(act => act.id !== draggedItem)
        };
      } else if (day.id === targetDayId) {
        // Add to target
        const newActivities = [...day.activities];
        newActivities.splice(targetIndex, 0, draggedActivity);
        return {
          ...day,
          activities: newActivities
        };
      }
      return day;
    });

    setItinerary(newItinerary);
    setDraggedItem(null);
  };

  const addNewActivity = (dayId: string) => {
    const newActivity: Activity = {
      id: `act-${Date.now()}`,
      title: 'New Activity',
      description: 'Add description...',
      time: '10:00',
      duration: '2 hours',
      cost: '$0',
      location: 'Location',
      type: 'activity'
    };

    setItinerary(prev => prev.map(day => 
      day.id === dayId 
        ? { ...day, activities: [...day.activities, newActivity] }
        : day
    ));
  };

  const addNewDay = () => {
    const lastDay = itinerary[itinerary.length - 1];
    const nextDate = new Date(lastDay.date);
    nextDate.setDate(nextDate.getDate() + 1);

    const newDay: Day = {
      id: `day-${Date.now()}`,
      date: nextDate.toISOString().split('T')[0],
      activities: []
    };

    setItinerary(prev => [...prev, newDay]);
  };

  const getTotalCost = () => {
    return itinerary.reduce((total, day) => {
      return total + day.activities.reduce((dayTotal, activity) => {
        const cost = parseFloat(activity.cost.replace('$', '')) || 0;
        return dayTotal + cost;
      }, 0);
    }, 0);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          {isEditing ? (
            <Input
              value={tripTitle}
              onChange={(e) => setTripTitle(e.target.value)}
              onBlur={() => setIsEditing(false)}
              onKeyPress={(e) => e.key === 'Enter' && setIsEditing(false)}
              className="text-3xl font-bold border-none p-0 h-auto bg-transparent"
              autoFocus
            />
          ) : (
            <h1 
              className="text-3xl font-bold text-navy-900 cursor-pointer hover:text-teal-600 transition-colors"
              onClick={() => setIsEditing(true)}
            >
              {tripTitle}
            </h1>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="outline" className="px-3 py-1">
            <DollarSign className="w-4 h-4 mr-1" />
            ${getTotalCost().toFixed(0)} total
          </Badge>
          
          <Button variant="outline" size="sm">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Trip Summary */}
      <Card className="p-6 mb-8 bg-gradient-to-r from-teal-50 to-coral-50 border-0">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-teal-600" />
            <div>
              <p className="text-sm text-gray-600">Duration</p>
              <p className="font-semibold">{itinerary.length} days</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-teal-600" />
            <div>
              <p className="text-sm text-gray-600">Destination</p>
              <p className="font-semibold">Paris, France</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-teal-600" />
            <div>
              <p className="text-sm text-gray-600">Travelers</p>
              <p className="font-semibold">2 people</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <DollarSign className="w-5 h-5 text-teal-600" />
            <div>
              <p className="text-sm text-gray-600">Budget</p>
              <p className="font-semibold">${getTotalCost().toFixed(0)}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Itinerary Days */}
      <div className="space-y-8">
        {itinerary.map((day, dayIndex) => (
          <Card key={day.id} className="p-6 shadow-lg border-0">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-navy-900">
                  Day {dayIndex + 1}
                </h2>
                <p className="text-gray-600">{formatDate(day.date)}</p>
              </div>
              
              <Button
                onClick={() => addNewActivity(day.id)}
                size="sm"
                className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Activity
              </Button>
            </div>

            {/* Activities */}
            <div 
              className="space-y-4"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, day.id, day.activities.length)}
            >
              {day.activities.map((activity, activityIndex) => {
                const activityType = activityTypes[activity.type];
                return (
                  <div
                    key={activity.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, activity.id)}
                    className="group relative"
                  >
                    <Card className="p-4 hover:shadow-md transition-all duration-200 cursor-move border border-gray-200 hover:border-teal-300">
                      <div className="flex items-start gap-4">
                        <div className="flex items-center gap-3">
                          <GripVertical className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                          <div className={`w-10 h-10 rounded-xl ${activityType.color} flex items-center justify-center text-white text-lg`}>
                            {activityType.icon}
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-navy-900">{activity.title}</h3>
                            <Badge variant="outline" className="ml-2">
                              {activity.cost}
                            </Badge>
                          </div>
                          
                          <p className="text-gray-600 mb-3">{activity.description}</p>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{activity.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{activity.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{activity.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                    
                    {/* Drop zone */}
                    <div
                      className="absolute -bottom-2 left-0 right-0 h-4 opacity-0 hover:opacity-100 transition-opacity"
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, day.id, activityIndex + 1)}
                    >
                      <div className="h-1 bg-teal-400 rounded-full mx-4" />
                    </div>
                  </div>
                );
              })}
              
              {day.activities.length === 0 && (
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-500 hover:border-teal-400 hover:text-teal-600 transition-colors"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, day.id, 0)}
                >
                  <Plus className="w-8 h-8 mx-auto mb-2" />
                  <p>Drop activities here or click "Add Activity" to get started</p>
                </div>
              )}
            </div>
          </Card>
        ))}
        
        {/* Add New Day */}
        <Card className="p-8 border-2 border-dashed border-gray-300 hover:border-teal-400 transition-colors">
          <div className="text-center">
            <Button
              onClick={addNewDay}
              variant="ghost"
              size="lg"
              className="text-gray-600 hover:text-teal-600"
            >
              <Plus className="w-6 h-6 mr-2" />
              Add Another Day
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}