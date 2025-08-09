'use client';

import { useLanguage } from '@/contexts/language-context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const moods = [
  {
    key: 'sad',
    emoji: '😢',
    color: 'mood-sad',
    title: 'Feeling Blue',
    description: 'Need comfort and gentle healing experiences',
    suggestions: ['Peaceful beaches', 'Spa retreats', 'Quiet mountains'],
  },
  {
    key: 'calm',
    emoji: '😌',
    color: 'mood-calm',
    title: 'Seeking Peace',
    description: 'Want tranquil and meditative experiences',
    suggestions: ['Zen gardens', 'Lakeside retreats', 'Meditation centers'],
  },
  {
    key: 'excited',
    emoji: '🤩',
    color: 'mood-excited',
    title: 'Full of Energy',
    description: 'Ready for vibrant and dynamic adventures',
    suggestions: ['Festivals', 'City exploration', 'Theme parks'],
  },
  {
    key: 'confused',
    emoji: '😕',
    color: 'mood-confused',
    title: 'Feeling Lost',
    description: 'Need clarity and inspiring experiences',
    suggestions: ['Cultural sites', 'Art museums', 'Spiritual journeys'],
  },
  {
    key: 'adventurous',
    emoji: '🤠',
    color: 'mood-adventurous',
    title: 'Ready to Explore',
    description: 'Craving thrilling and unique experiences',
    suggestions: ['Hiking trails', 'Extreme sports', 'Remote destinations'],
  },
];

interface MoodSelectorProps {
  onMoodSelect: (mood: string) => void;
}

export function MoodSelector({ onMoodSelect }: MoodSelectorProps) {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto max-w-6xl px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-display font-bold arca-text-gradient mb-6">
          How are you feeling today?
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your emotional state helps us craft the perfect travel experience just for you. Be honest – there's no wrong answer.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {moods.map((mood) => (
          <Card
            key={mood.key}
            className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer bg-white border-0"
            onClick={() => onMoodSelect(mood.key)}
          >
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">{mood.emoji}</div>
              <h3 className="text-xl font-display font-bold text-gray-800 mb-2">
                {mood.title}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {mood.description}
              </p>
              
              <div className="space-y-2 mb-6">
                <p className="text-sm font-semibold text-gray-700">Perfect for:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {mood.suggestions.map((suggestion) => (
                    <span
                      key={suggestion}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                    >
                      {suggestion}
                    </span>
                  ))}
                </div>
              </div>
              
              <Button className="w-full arca-gradient text-white hover:opacity-90">
                I'm feeling {mood.title.toLowerCase()}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}