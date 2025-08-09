'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const moodSuggestions = [
  {
    mood: 'Feeling Overwhelmed?',
    emoji: '😰',
    title: 'Gentle Coastal Escapes',
    description: 'Calm your mind with peaceful beach destinations and soothing ocean sounds.',
    destinations: ['Maldives', 'Seychelles', 'Amalfi Coast'],
    color: 'from-blue-300 to-cyan-400',
  },
  {
    mood: 'Need Adventure?',
    emoji: '🤠',
    title: 'Thrilling Mountain Expeditions',
    description: 'Challenge yourself with exciting outdoor activities and breathtaking views.',
    destinations: ['Nepal', 'Patagonia', 'Swiss Alps'],
    color: 'from-orange-400 to-red-500',
  },
  {
    mood: 'Seeking Inspiration?',
    emoji: '✨',
    title: 'Cultural & Artistic Cities',
    description: 'Immerse yourself in art, history, and creative energy.',
    destinations: ['Florence', 'Kyoto', 'Paris'],
    color: 'from-purple-400 to-pink-500',
  },
];

export function MoodBasedSuggestions() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold arca-text-gradient mb-6">
            Travel Based on How You Feel
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI understands your emotional needs and suggests the perfect destinations to match your current state of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {moodSuggestions.map((suggestion, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white border-0">
              <div className={`h-2 bg-gradient-to-r ${suggestion.color}`}></div>
              
              <div className="p-8">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">{suggestion.emoji}</div>
                  <Badge variant="secondary" className="mb-3">
                    {suggestion.mood}
                  </Badge>
                  <h3 className="text-xl font-display font-bold text-gray-800 mb-3">
                    {suggestion.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {suggestion.description}
                  </p>
                </div>
                
                <div className="space-y-2 mb-6">
                  <p className="text-sm font-semibold text-gray-700">Perfect for:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestion.destinations.map((dest) => (
                      <Badge key={dest} variant="outline" className="text-xs">
                        {dest}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button className={`w-full bg-gradient-to-r ${suggestion.color} text-white border-0 hover:opacity-90`}>
                  Explore These Destinations
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}