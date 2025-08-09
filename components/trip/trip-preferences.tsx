'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Calendar, DollarSign, Users, MapPin } from 'lucide-react';

interface TripPreferencesProps {
  selectedMood: string;
  onComplete: (preferences: any) => void;
  onBack: () => void;
}

const budgetRanges = [
  { value: 'budget', label: 'Budget-friendly ($)', range: '$0 - $500' },
  { value: 'moderate', label: 'Moderate ($$)', range: '$500 - $1,500' },
  { value: 'luxury', label: 'Luxury ($$$)', range: '$1,500 - $5,000' },
  { value: 'ultra-luxury', label: 'Ultra Luxury ($$$$)', range: '$5,000+' },
];

const travelStyles = [
  { value: 'solo', label: 'Solo Adventure', icon: '🧳' },
  { value: 'couple', label: 'Romantic Getaway', icon: '💕' },
  { value: 'family', label: 'Family Fun', icon: '👨‍👩‍👧‍👦' },
  { value: 'friends', label: 'Friends Trip', icon: '👫' },
  { value: 'group', label: 'Group Travel', icon: '👥' },
];

const durations = [
  { value: 'weekend', label: 'Weekend (2-3 days)' },
  { value: 'short', label: 'Short Trip (4-7 days)' },
  { value: 'medium', label: 'Medium Trip (1-2 weeks)' },
  { value: 'long', label: 'Extended Trip (3+ weeks)' },
];

export function TripPreferences({ selectedMood, onComplete, onBack }: TripPreferencesProps) {
  const [preferences, setPreferences] = useState({
    destination: '',
    budget: '',
    duration: '',
    travelStyle: '',
    startDate: '',
    travelers: '1',
    interests: [] as string[],
  });

  const { t } = useLanguage();

  const interests = [
    'Culture & History', 'Adventure Sports', 'Food & Cuisine', 'Art & Museums',
    'Nature & Wildlife', 'Beach & Relaxation', 'Nightlife & Entertainment', 'Shopping',
    'Wellness & Spa', 'Photography', 'Local Experiences', 'Architecture'
  ];

  const handleInterestToggle = (interest: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = () => {
    if (!preferences.budget || !preferences.duration || !preferences.travelStyle) {
      alert('Please fill in all required fields');
      return;
    }
    onComplete({ ...preferences, mood: selectedMood });
  };

  return (
    <div className="container mx-auto max-w-4xl px-4">
      <div className="mb-8">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to mood selection
        </Button>
        
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-display font-bold arca-text-gradient mb-4">
            Let's plan your perfect trip
          </h1>
          <p className="text-lg text-gray-600">
            Share a few details to help ARCA craft your personalized itinerary
          </p>
        </div>
      </div>

      <Card className="p-8 bg-white/80 backdrop-blur-lg border-0 shadow-2xl">
        <div className="space-y-8">
          {/* Destination */}
          <div className="space-y-2">
            <Label className="flex items-center text-lg font-semibold">
              <MapPin className="w-5 h-5 mr-2 text-arca-teal" />
              Where would you like to go? (Optional)
            </Label>
            <Input
              placeholder="Any specific destination in mind? Leave blank for suggestions"
              value={preferences.destination}
              onChange={(e) => setPreferences(prev => ({ ...prev, destination: e.target.value }))}
              className="text-lg p-4"
            />
          </div>

          {/* Budget */}
          <div className="space-y-3">
            <Label className="flex items-center text-lg font-semibold">
              <DollarSign className="w-5 h-5 mr-2 text-arca-teal" />
              Budget Range *
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {budgetRanges.map((budget) => (
                <Card
                  key={budget.value}
                  className={`p-4 cursor-pointer transition-all border-2 ${
                    preferences.budget === budget.value
                      ? 'border-arca-teal bg-arca-teal/10'
                      : 'border-gray-200 hover:border-arca-teal/50'
                  }`}
                  onClick={() => setPreferences(prev => ({ ...prev, budget: budget.value }))}
                >
                  <div className="font-semibold">{budget.label}</div>
                  <div className="text-sm text-gray-600">{budget.range}</div>
                </Card>
              ))}
            </div>
          </div>

          {/* Travel Style */}
          <div className="space-y-3">
            <Label className="flex items-center text-lg font-semibold">
              <Users className="w-5 h-5 mr-2 text-arca-teal" />
              Travel Style *
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {travelStyles.map((style) => (
                <Card
                  key={style.value}
                  className={`p-4 cursor-pointer transition-all border-2 text-center ${
                    preferences.travelStyle === style.value
                      ? 'border-arca-teal bg-arca-teal/10'
                      : 'border-gray-200 hover:border-arca-teal/50'
                  }`}
                  onClick={() => setPreferences(prev => ({ ...prev, travelStyle: style.value }))}
                >
                  <div className="text-2xl mb-2">{style.icon}</div>
                  <div className="text-sm font-medium">{style.label}</div>
                </Card>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label className="flex items-center text-lg font-semibold">
              <Calendar className="w-5 h-5 mr-2 text-arca-teal" />
              Trip Duration *
            </Label>
            <Select value={preferences.duration} onValueChange={(value) => setPreferences(prev => ({ ...prev, duration: value }))}>
              <SelectTrigger className="text-lg p-4">
                <SelectValue placeholder="How long will your trip be?" />
              </SelectTrigger>
              <SelectContent>
                {durations.map((duration) => (
                  <SelectItem key={duration.value} value={duration.value}>
                    {duration.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Dates and Travelers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-lg font-semibold">Preferred Start Date</Label>
              <Input
                type="date"
                value={preferences.startDate}
                onChange={(e) => setPreferences(prev => ({ ...prev, startDate: e.target.value }))}
                className="text-lg p-4"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-lg font-semibold">Number of Travelers</Label>
              <Input
                type="number"
                min="1"
                value={preferences.travelers}
                onChange={(e) => setPreferences(prev => ({ ...prev, travelers: e.target.value }))}
                className="text-lg p-4"
              />
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold">What interests you? (Select all that apply)</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {interests.map((interest) => (
                <Button
                  key={interest}
                  variant={preferences.interests.includes(interest) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleInterestToggle(interest)}
                  className={preferences.interests.includes(interest) ? "arca-gradient text-white" : ""}
                >
                  {interest}
                </Button>
              ))}
            </div>
          </div>

          <Button onClick={handleSubmit} size="lg" className="w-full arca-gradient text-white text-lg py-6">
            Start Planning with ARCA 🚀
          </Button>
        </div>
      </Card>
    </div>
  );
}