'use client';

import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Send, Compass, Download, Share2, Save } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'arca';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  selectedMood: string;
  preferences: any;
  onBack: () => void;
}

export function ChatInterface({ selectedMood, preferences, onBack }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
      content: `Hello! I'm ARCA, your emotional travel buddy! 🌟

I can see you're feeling ${selectedMood} and looking for a ${preferences.travelStyle} trip with a ${preferences.budget} budget for ${preferences.duration}. 

Based on your mood and preferences, here are three personalized trip suggestions:

🏖️ **Option 1: Tranquil Beach Retreat in Santorini**
- Perfect for your current emotional state
- 5 days of peaceful sunsets and gentle healing
- Includes: Luxury hotel, spa treatments, sunset sailing
- Budget: $1,200 per person

🏔️ **Option 2: Mountain Wellness Escape in Swiss Alps**  
- Fresh mountain air to clear your mind
- 4 days of hiking, meditation, and Alpine spas
- Includes: Boutique mountain lodge, guided hikes, wellness treatments
- Budget: $1,400 per person

🌸 **Option 3: Cultural Healing Journey in Kyoto**
- Zen temples and peaceful gardens for inner peace
- 6 days of mindful exploration and traditional experiences
- Includes: Traditional ryokan, tea ceremonies, temple visits
- Budget: $1,100 per person

Which option resonates with your heart? Or would you like me to explore different destinations? I'm here to craft the perfect emotional journey for you! ✈️💙`,
      timestamp: new Date(),
    };

    setMessages([welcomeMessage]);
  }, [selectedMood, preferences]);

  const generateARCAResponse = (userMessage: string): string => {
    // Simple AI-like responses based on keywords
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('option 1') || lowerMessage.includes('santorini') || lowerMessage.includes('beach')) {
      return `Wonderful choice! Santorini will be perfect for your soul right now. 🏖️

Here's your personalized 5-day itinerary:

**Day 1 - Arrival & Gentle Settling**
- Arrive at Santorini Airport
- Check into your luxury cliff-side hotel in Oia
- Evening: Quiet dinner with sunset views
- Emotional focus: Letting go of stress

**Day 2 - Healing Waters**
- Morning: Private spa session with ocean views
- Afternoon: Gentle beach time at Red Beach
- Evening: Sunset sailing with wine tasting
- Emotional focus: Inner peace and renewal

**Day 3 - Cultural Serenity**
- Morning: Visit peaceful Akrotiri archaeological site
- Afternoon: Wine tasting in traditional wineries
- Evening: Meditation session on the cliff
- Emotional focus: Connecting with history and yourself

**Day 4 & 5 - Personal Reflection**
- Flexible days for personal exploration
- Optional: Photography workshop, cooking class, or simply beach relaxation
- Emotional focus: Self-discovery and joy

Would you like me to book this trip or would you prefer to customize any part of it? I can also suggest specific restaurants that match your dietary preferences! 🍷✨`;
    }
    
    if (lowerMessage.includes('option 2') || lowerMessage.includes('alps') || lowerMessage.includes('mountain')) {
      return `Perfect! The Swiss Alps will rejuvenate your spirit! 🏔️

Here's your healing mountain retreat:

**Day 1 - Mountain Welcome**
- Arrive in Zermatt
- Check into boutique eco-lodge
- Gentle evening walk and Alpine dinner
- Emotional focus: Grounding with nature

**Day 2 - Mindful Hiking**
- Guided sunrise hike to Gornergrat
- Afternoon: Alpine spa with mountain herb treatments  
- Evening: Meditation under the stars
- Emotional focus: Physical and mental strength

**Day 3 - Wellness & Reflection**
- Morning yoga with Matterhorn views
- Traditional Swiss wellness treatments
- Afternoon: Cable car to Klein Matterhorn
- Emotional focus: Clarity and perspective

**Day 4 - Personal Journey**
- Choose your own mountain adventure
- Options: Advanced hiking, glacier tour, or village exploration
- Evening: Farewell dinner with local specialties
- Emotional focus: Confidence and renewed energy

This trip includes all mountain transport, wellness treatments, and emotional coaching sessions via our app. Ready to book your mountain healing journey? 🌟`;
    }
    
    if (lowerMessage.includes('option 3') || lowerMessage.includes('kyoto') || lowerMessage.includes('japan')) {
      return `Beautiful choice! Kyoto's spiritual energy will nurture your soul perfectly. 🌸

Your mindful Japanese journey:

**Day 1-2 - Spiritual Arrival**
- Traditional ryokan in Gion district
- Tea ceremony and meditation introduction
- Visit to Kinkaku-ji (Golden Pavilion) at sunrise
- Emotional focus: Mindfulness and presence

**Day 3-4 - Inner Wisdom**
- Zen meditation at Tofuku-ji Temple
- Traditional kaiseki dining experiences
- Bamboo grove walking meditation in Arashiyama
- Emotional focus: Finding inner balance

**Day 5-6 - Cultural Healing**
- Participate in traditional arts (calligraphy or ikebana)
- Visit to peaceful Ryoan-ji rock garden
- Farewell ceremony at Fushimi Inari shrine
- Emotional focus: Gratitude and transformation

This journey includes cultural guides who understand emotional wellness, traditional accommodations, and daily meditation sessions. Plus, you'll receive a personalized wellness journal to continue your practice at home.

Shall we begin booking your transformative Kyoto experience? 🏮✨`;
    }
    
    if (lowerMessage.includes('book') || lowerMessage.includes('yes') || lowerMessage.includes('perfect')) {
      return `Fantastic! I'm so excited to help you begin this transformative journey! 🎉

Here's what happens next:

**Booking Process:**
1. I'll connect you with our verified local partners
2. All accommodations are personally vetted for emotional comfort
3. You'll receive a pre-trip wellness kit delivered to your home
4. Download our ARCA companion app for daily check-ins during your trip

**What's Included:**
✅ All accommodations and activities mentioned
✅ 24/7 emotional support via chat
✅ Personalized daily affirmations based on your journey
✅ Digital travel journal for reflection
✅ Mood tracking and wellness insights

**Investment:** Your trip total is $1,200 per person (as discussed)
**Next Step:** Click the "Book Now" button below to secure your dates

Remember, this isn't just a vacation - it's an investment in your emotional well-being and personal growth. I'll be with you every step of the way! 

Are you ready to transform how you feel about yourself and the world? 🌟💙`;
    }

    if (lowerMessage.includes('different') || lowerMessage.includes('other') || lowerMessage.includes('more options')) {
      return `Of course! Let me suggest some other destinations that match your ${selectedMood} mood:

🌺 **Bali Spiritual Retreat** - Rice terraces, yoga, temples ($900)
🗻 **Iceland Healing Journey** - Hot springs, Northern Lights, solitude ($1,300)  
🏛️ **Morocco Cultural Discovery** - Riads, souks, desert meditation ($800)
🌿 **Costa Rica Nature Immersion** - Rainforest, wildlife, eco-lodges ($1,000)
🏰 **Portugal Coastal Reflection** - Historic towns, ocean views, wine ($750)

Each destination is carefully chosen to support your emotional journey. Which of these calls to your heart? Or would you like me to explore a completely different region?

I can also adjust any of the original options - perhaps a shorter trip, different activities, or a different budget range? I'm here to create exactly what your soul needs right now. 💫`;
    }

    if (lowerMessage.includes('budget') || lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return `I completely understand budget considerations! Let me break down flexible pricing options:

**Budget-Friendly Alternatives:**
- Santorini: $800 (mid-range hotel, shared activities)
- Swiss Alps: $950 (mountain hostel, group hiking tours)  
- Kyoto: $700 (traditional guesthouse, self-guided temples)

**Payment Plans Available:**
- 50% deposit, 50% before travel
- Monthly payment plans (3-6 months)
- Group discounts if traveling with others

**What's Always Included (regardless of budget):**
✅ My personal guidance and emotional support
✅ ARCA app with daily check-ins
✅ Curated experiences for your emotional needs
✅ 24/7 support during your trip

Remember, investing in your emotional well-being is priceless. Even a budget-friendly trip can be transformative when planned with heart and intention.

Which budget range works best for you? I'll customize everything accordingly! 💙`;
    }

    // Default response
    return `I hear you, and I want to make sure this trip truly serves your emotional needs right now. 💙

Your feelings and concerns are completely valid. Travel should heal, not stress you further. Let me ask a few questions to better understand:

- What aspect of travel usually brings you the most joy?
- Are there any destinations you've always dreamed of visiting?
- What would make you feel most supported during this journey?
- Is there anything specific you're hoping to heal or discover about yourself?

I'm not just a travel planner - I'm your emotional companion who wants to understand your heart. Take your time, and tell me what you're really feeling. Sometimes the best trips come from the most honest conversations.

I'm here to listen and create something beautiful together. ✨`;
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
      const arcaResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'arca',
        content: generateARCAResponse(input),
        timestamp: new Date(),
      };

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

  return (
    <div className="container mx-auto max-w-4xl px-4 h-screen flex flex-col">
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to preferences
        </Button>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 arca-gradient rounded-full flex items-center justify-center">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold arca-text-gradient">
                Chat with ARCA
              </h1>
              <p className="text-gray-600">Your emotional travel companion</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save Trip
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <Card className="flex-1 flex flex-col bg-white/80 backdrop-blur-lg border-0 shadow-2xl overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-3xl rounded-2xl px-6 py-4 ${
                  message.type === 'user'
                    ? 'arca-gradient text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.type === 'arca' && (
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 arca-gradient rounded-full flex items-center justify-center mr-3">
                      <Compass className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-arca-teal">ARCA</span>
                  </div>
                )}
                <div className="whitespace-pre-wrap leading-relaxed">
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl px-6 py-4 max-w-3xl">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 arca-gradient rounded-full flex items-center justify-center mr-3">
                    <Compass className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold text-arca-teal">ARCA</span>
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-6 border-t bg-white/50">
          <div className="flex space-x-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tell ARCA how you're feeling or ask about your trip..."
              className="flex-1 text-lg p-4 rounded-xl"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSend} 
              disabled={isLoading || !input.trim()}
              className="arca-gradient text-white px-6"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setInput("Can you suggest activities for my first day?")}
            >
              Daily activities
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setInput("What should I pack for this trip?")}
            >
              Packing list
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setInput("I need budget-friendly alternatives")}
            >
              Budget options
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setInput("Can you book this trip for me?")}
            >
              Book trip
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}