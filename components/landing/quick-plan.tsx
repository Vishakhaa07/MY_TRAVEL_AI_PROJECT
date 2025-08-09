'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Calendar, Users } from 'lucide-react';

const travelStyles = [
  'Adventure', 'Relaxation', 'Culture', 'Food & Wine', 
  'Romance', 'Family', 'Business', 'Solo', 'Luxury', 'Budget'
];

const suggestions = [
  'Paris, France', 'Tokyo, Japan', 'Bali, Indonesia', 
  'New York, USA', 'Rome, Italy', 'Barcelona, Spain'
];

export function QuickPlan() {
  const [destination, setDestination] = useState('');
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const toggleStyle = (style: string) => {
    setSelectedStyles(prev => 
      prev.includes(style) 
        ? prev.filter(s => s !== style)
        : [...prev, style]
    );
  };

  const filteredSuggestions = suggestions.filter(s => 
    s.toLowerCase().includes(destination.toLowerCase())
  );

  return (
    <section className="py-20 bg-gradient-to-br from-sand-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4 font-playfair">
              Where to next?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tell us your dream destination and travel style, and we'll create the perfect itinerary
            </p>
          </div>

          <div className="quick-plan-form bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            {/* Destination Input */}
            <div className="relative mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Where do you want to go?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="pl-12 pr-4 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-teal-500 focus:ring-0 transition-all duration-300"
                />
              </div>
              
              {/* Suggestions Dropdown */}
              {showSuggestions && (destination || filteredSuggestions.length > 0) && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 max-h-60 overflow-y-auto">
                  {(filteredSuggestions.length > 0 ? filteredSuggestions : suggestions).map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => {
                        setDestination(suggestion);
                        setShowSuggestions(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 transition-colors duration-200"
                    >
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{suggestion}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Travel Style Pills */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                What's your travel style?
              </label>
              <div className="flex flex-wrap gap-3">
                {travelStyles.map((style) => (
                  <Badge
                    key={style}
                    variant={selectedStyles.includes(style) ? "default" : "outline"}
                    className={`cursor-pointer px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 hover:scale-105 ${
                      selectedStyles.includes(style)
                        ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg'
                        : 'border-gray-300 text-gray-700 hover:border-teal-500 hover:text-teal-600'
                    }`}
                    onClick={() => toggleStyle(style)}
                  >
                    {style}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Quick Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                <Calendar className="w-5 h-5 text-teal-600" />
                <div>
                  <p className="font-medium text-gray-800">Duration</p>
                  <p className="text-sm text-gray-600">5-7 days</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                <Users className="w-5 h-5 text-teal-600" />
                <div>
                  <p className="font-medium text-gray-800">Travelers</p>
                  <p className="text-sm text-gray-600">2 people</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                <MapPin className="w-5 h-5 text-teal-600" />
                <div>
                  <p className="font-medium text-gray-800">Budget</p>
                  <p className="text-sm text-gray-600">$2,000-5,000</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white px-12 py-4 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                onClick={() => window.location.href = '/itinerary'}
              >
                Create My Trip
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}