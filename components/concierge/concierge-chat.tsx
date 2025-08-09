'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { useAuth } from '@/contexts/auth-context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  Send, 
  Sparkles, 
  Crown,
  Calendar,
  MapPin,
  DollarSign,
  Users,
  Clock,
  Loader2
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'arca';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  moodCheck?: boolean;
}

interface TripPreferences {
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  travelType: string;
  budget: string;
  currency: string;
  interests: string[];
  dailyFreeTime: number;
  mood: string;
}

const moods = [
  { emoji: '✨', label: 'Relaxed', value: 'relaxed' },
  { emoji: '🎉', label: 'Excited', value: 'excited' },
  { emoji: '🧭', label: 'Curious', value: 'curious' },
  { emoji: '🤔', label: 'Confused', value: 'confused' },
];

export function ConciergeChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [preferences, setPreferences] = useState<Partial<TripPreferences>>({
    dailyFreeTime: 4,
    currency: 'USD',
    travelers: 2,
  });
  const [showPreferences, setShowPreferences] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { t } = useLanguage();
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initial ARCA greeting
    const welcomeMessage: Message = {
      id: '1',
      type: 'arca',
      content: `Welcome to your personal luxury travel concierge! I'm ARCA, and I'm delighted to help you craft an extraordinary journey.

${user?.isPremium ? '✨ As a Premium member, you have access to exclusive experiences and priority booking.' : ''}

Before we begin planning your perfect escape, I'd love to understand your current mood and travel aspirations.`,
      timestamp: new Date(),
      moodCheck: true,
    };

    setMessages([welcomeMessage]);
  }, [user]);

  const handleMoodSelect = (mood: string) => {
    setPreferences(prev => ({ ...prev, mood }));
    
    const moodMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: `I'm feeling ${mood} about this trip`,
      timestamp: new Date(),
    };

    const response = generateARCAResponse('', mood);
    
    setMessages(prev => [...prev, moodMessage, response]);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const arcaResponse = generateARCAResponse(input);
      setMessages(prev => [...prev, arcaResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const generateARCAResponse = (userMessage: string, currentMood?: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Mood selection response
    if (currentMood) {
      return {
        id: Date.now().toString(),
        type: 'arca',
        content: `Perfect! I can sense you're feeling ${currentMood} about this upcoming journey. This helps me understand exactly what kind of experience will resonate with you.

Now, let me gather a few essential details to craft your bespoke itinerary:

**Essential Information:**
• Where would you like to travel? (or shall I suggest destinations based on your mood?)
• When are you planning to travel?
• How many travelers will be joining you?
• What's your preferred budget range?

**Your Travel Style:**
• What experiences call to you? (luxury relaxation, cultural immersion, adventure, culinary exploration)
• How much free time do you prefer each day? (currently set to ${preferences.dailyFreeTime} hours)

Once I have these details, I'll present you with 2-3 curated luxury options, each with a different vibe and one exclusive upgrade suggestion.`,
        timestamp: new Date(),
        suggestions: [
          'Suggest destinations for my mood',
          'I want to go to Japan',
          'Plan a European luxury tour',
          'Surprise me with something unique'
        ]
      };
    }

    // Destination suggestions
    if (lowerMessage.includes('suggest') || lowerMessage.includes('recommend')) {
      const moodDestinations = {
        relaxed: [
          { name: 'Amalfi Coast, Italy', vibe: 'Serene coastal luxury', price: '$3,500/night' },
          { name: 'Maldives', vibe: 'Ultimate tropical tranquility', price: '$4,200/night' },
          { name: 'Napa Valley, USA', vibe: 'Wine country serenity', price: '$2,800/night' }
        ],
        excited: [
          { name: 'Tokyo, Japan', vibe: 'Vibrant cultural immersion', price: '$2,200/night' },
          { name: 'Dubai, UAE', vibe: 'Futuristic luxury playground', price: '$3,800/night' },
          { name: 'New York City, USA', vibe: 'Urban sophistication', price: '$1,900/night' }
        ],
        curious: [
          { name: 'Morocco', vibe: 'Exotic cultural discovery', price: '$2,100/night' },
          { name: 'Peru', vibe: 'Ancient mysteries & luxury', price: '$2,600/night' },
          { name: 'Iceland', vibe: 'Natural wonders & wellness', price: '$2,400/night' }
        ]
      };

      const selectedMood = preferences.mood || 'relaxed';
      const destinations = moodDestinations[selectedMood as keyof typeof moodDestinations] || moodDestinations.relaxed;

      return {
        id: Date.now().toString(),
        type: 'arca',
        content: `Based on your ${selectedMood} mood, here are three exquisite destinations I've curated for you:

${destinations.map((dest, i) => `**Option ${i + 1}: ${dest.name}**
• Vibe: ${dest.vibe}
• Starting from: ${dest.price}
• Perfect for your current emotional state`).join('\n\n')}

Each option includes:
✨ Luxury accommodations with premium amenities
🍽️ Private dining experiences with renowned chefs
🚗 Premium transportation and transfers
👨‍💼 Dedicated concierge service throughout your stay

Which destination speaks to your heart? Or would you like me to explore different regions?`,
        timestamp: new Date(),
        suggestions: [
          'Tell me more about Option 1',
          'I love Option 2',
          'Show me different destinations',
          'What about budget-friendly luxury?'
        ]
      };
    }

    // Specific destination planning
    if (lowerMessage.includes('japan') || lowerMessage.includes('tokyo')) {
      return {
        id: Date.now().toString(),
        type: 'arca',
        content: `Excellent choice! Japan offers an extraordinary blend of ancient tradition and cutting-edge luxury. Let me craft three distinct Tokyo experiences:

**Option 1: Traditional Luxury (7 days)**
• Stay: Aman Tokyo - minimalist luxury in the heart of the city
• Experiences: Private tea ceremonies, exclusive temple visits, kaiseki dining
• Estimated cost: $15,000 for 2 travelers
• Luxury upgrade: Private helicopter tour of Mount Fuji with champagne service

**Option 2: Modern Sophistication (5 days)**
• Stay: The Ritz-Carlton Tokyo - sky-high luxury with city views
• Experiences: Michelin-starred dining tour, private shopping with stylist, sake tastings
• Estimated cost: $12,000 for 2 travelers
• Luxury upgrade: Private sushi masterclass with renowned chef Jiro's protégé

**Option 3: Cultural Immersion (10 days)**
• Stay: Hoshinoya Tokyo - traditional ryokan experience in the city
• Experiences: Sumo training, geisha performances, artisan workshops
• Estimated cost: $18,000 for 2 travelers
• Luxury upgrade: Private bullet train with personal guide to Kyoto

All options include:
• Private airport transfers in luxury vehicles
• 24/7 bilingual concierge service
• Exclusive access to normally closed venues
• Premium travel insurance

Which experience resonates with your vision for Japan?`,
        timestamp: new Date(),
        suggestions: [
          'I love the Traditional Luxury option',
          'Tell me more about the Modern option',
          'Can you combine elements from different options?',
          'What about cherry blossom season?'
        ]
      };
    }

    // Budget discussions
    if (lowerMessage.includes('budget') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
      return {
        id: Date.now().toString(),
        type: 'arca',
        content: `I understand that even luxury travel requires thoughtful budgeting. Let me break down flexible investment levels:

**Accessible Luxury ($5,000-$10,000 per person)**
• Boutique luxury hotels with premium amenities
• Private transfers and selected exclusive experiences
• Curated dining at acclaimed restaurants
• Personal concierge support

**Premium Experience ($10,000-$20,000 per person)**
• 5-star luxury resorts and city hotels
• Private guides and exclusive access experiences
• Michelin-starred dining and wine pairings
• Luxury transportation (first-class flights, private cars)

**Ultra-Luxury ($20,000+ per person)**
• The world's finest hotels and private villas
• Private jets and yacht charters
• Completely bespoke experiences and private events
• 24/7 dedicated concierge team

**Payment Flexibility:**
• 30% deposit to secure bookings
• Flexible payment plans available
• Premium members receive exclusive rates and upgrades

What investment level feels comfortable for your dream journey? I'll tailor everything accordingly while maximizing value and exclusivity.`,
        timestamp: new Date(),
        suggestions: [
          'Show me Accessible Luxury options',
          'I\'m interested in Premium Experience',
          'Tell me about Ultra-Luxury',
          'What\'s included in each level?'
        ]
      };
    }

    // Generate itinerary
    if (lowerMessage.includes('generate') || lowerMessage.includes('create') || lowerMessage.includes('plan')) {
      return {
        id: Date.now().toString(),
        type: 'arca',
        content: `Perfect! I'm now crafting your bespoke luxury itinerary. This process involves:

🔍 **Analyzing your preferences** - mood, destination, travel style, and budget
🏨 **Securing exclusive accommodations** - often with complimentary upgrades
🍽️ **Arranging private dining** - reservations at fully-booked restaurants
🎭 **Curating unique experiences** - access to private events and closed venues
🚗 **Coordinating luxury transport** - seamless transfers and premium flights

**Your Itinerary Will Include:**
• Day-by-day schedule with optimal pacing (${preferences.dailyFreeTime} hours free time daily)
• Estimated costs for each experience
• Alternative options for weather or preference changes
• Emergency contacts and 24/7 support
• Digital itinerary accessible offline

This usually takes 2-3 minutes to perfect. Shall I proceed with generating your complete luxury travel experience?`,
        timestamp: new Date(),
        suggestions: [
          'Yes, generate my itinerary!',
          'I want to adjust my preferences first',
          'Can you show me a sample itinerary?',
          'What if I need to make changes later?'
        ]
      };
    }

    // Default response
    return {
      id: Date.now().toString(),
      type: 'arca',
      content: `I'm here to create an extraordinary travel experience tailored specifically to you. As your luxury travel concierge, I can help with:

✨ **Bespoke Itinerary Creation** - Custom day-by-day plans based on your mood and preferences
🏨 **Exclusive Accommodations** - Access to the world's finest hotels and private villas
🍽️ **Culinary Experiences** - Private chefs, exclusive restaurants, and wine tastings
🎭 **Unique Access** - Private museum tours, closed venues, and VIP cultural experiences
🚁 **Luxury Transportation** - Private jets, yacht charters, and premium transfers

${user?.isPremium ? '👑 **Premium Benefits**: Priority booking, exclusive rates, and 24/7 concierge support' : ''}

What aspect of your luxury travel experience would you like to explore first? I'm here to make your travel dreams a reality.`,
      timestamp: new Date(),
      suggestions: [
        'Plan a romantic getaway',
        'I need a business & leisure trip',
        'Surprise me with unique destinations',
        'Show me exclusive experiences'
      ]
    };
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 arca-gradient rounded-2xl flex items-center justify-center pulse-glow zoom-hover">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900">
              {t('concierge.title')}
            </h1>
            {user?.isPremium && (
              <Badge className="premium-badge mt-1 zoom-hover">
                <Crown className="w-3 h-3 mr-1" />
                Premium Concierge
              </Badge>
            )}
          </div>
        </div>
        <p className="text-gray-600">{t('concierge.subtitle')}</p>
      </div>

      {/* Preferences Panel */}
      {showPreferences && (
        <Card className="luxury-card p-6 mb-6 zoom-hover">
          <h3 className="text-lg font-semibold mb-4">Travel Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Daily Free Time</label>
              <Slider
                value={[preferences.dailyFreeTime || 4]}
                onValueChange={(value) => setPreferences(prev => ({ ...prev, dailyFreeTime: value[0] }))}
                max={8}
                min={2}
                step={1}
                className="mb-2"
              />
              <p className="text-xs text-gray-500">{preferences.dailyFreeTime} hours per day</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Number of Travelers</label>
              <Input
                type="number"
                value={preferences.travelers}
                onChange={(e) => setPreferences(prev => ({ ...prev, travelers: parseInt(e.target.value) }))}
                min={1}
                max={20}
              />
            </div>
          </div>
        </Card>
      )}

      {/* Chat Messages */}
      <Card className="luxury-card mb-6 h-96 overflow-y-auto zoom-hover">
        <div className="p-6 space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-3xl ${message.type === 'user' ? 'chat-bubble-user' : 'chat-bubble-assistant'}`}>
                {message.type === 'arca' && (
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-blue-600 zoom-hover" />
                    <span className="text-sm font-medium text-blue-600">ARCA Concierge</span>
                    {user?.isPremium && (
                      <Badge className="premium-badge text-xs zoom-hover">Premium</Badge>
                    )}
                  </div>
                )}
                
                <div className="whitespace-pre-wrap leading-relaxed">
                  {message.content}
                </div>

                {/* Mood Selection */}
                {message.moodCheck && (
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-3">{t('concierge.moodCheck')}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {moods.map((mood) => (
                        <Button
                          key={mood.value}
                          variant="outline"
                          onClick={() => handleMoodSelect(mood.value)}
                          className="w-full text-left justify-start text-sm border-blue-200 hover:bg-blue-50 zoom-hover"
                        >
                          <span className="text-2xl mr-2">{mood.emoji}</span>
                          <span className="text-sm">{mood.label}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggestions */}
                {message.suggestions && (
                  <div className="mt-4 space-y-2">
                    {message.suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setInput(suggestion)}
                        className="w-full text-left justify-start text-sm border-blue-200 hover:bg-blue-50"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="chat-bubble-assistant">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-blue-600 zoom-hover" />
                  <span className="text-sm font-medium text-blue-600">ARCA Concierge</span>
                </div>
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                  <span className="text-sm">{t('concierge.generating')}</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </Card>

      {/* Input Area */}
      <Card className="luxury-card p-4 zoom-hover">
        <div className="flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('concierge.placeholder')}
            className="flex-1"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSend} 
            disabled={isLoading || !input.trim()}
            className="arca-gradient text-white zoom-hover"
          >
            <Send className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowPreferences(!showPreferences)}
            className="zoom-hover"
          >
            <Clock className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setInput("Plan a romantic luxury getaway")}
            className="text-xs zoom-hover"
          >
            <MapPin className="w-3 h-3 mr-1" />
            Romantic getaway
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setInput("I need exclusive dining experiences")}
            className="text-xs zoom-hover"
          >
            <Sparkles className="w-3 h-3 mr-1" />
            Exclusive dining
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setInput("Show me luxury accommodations")}
            className="text-xs zoom-hover"
          >
            <Crown className="w-3 h-3 mr-1" />
            Luxury stays
          </Button>
        </div>
      </Card>
    </div>
  );
}