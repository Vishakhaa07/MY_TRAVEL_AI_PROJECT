'use client';

import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Send, 
  X, 
  Minimize2, 
  Maximize2, 
  Bot,
  User,
  MapPin,
  Calendar,
  DollarSign,
  Plane
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface AIChatAssistantProps {
  isOpen: boolean;
  onToggle: () => void;
  isMinimized: boolean;
  onMinimize: () => void;
}

export function AIChatAssistant({ isOpen, onToggle, isMinimized, onMinimize }: AIChatAssistantProps) {
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
    if (isOpen && messages.length === 0) {
      // Initial greeting
      const welcomeMessage: Message = {
        id: '1',
        type: 'assistant',
        content: `Hey there, travel buddy! 🌟 I'm ARIA - your super chill, emotional AI travel companion! 

I'm like that cool friend who always knows the best spots and gets your vibe! Whether you're feeling adventurous, need some chill time, or want to explore with your squad - I've got you covered! 😎

What's your travel mood today? Let's create some epic memories together! ✈️💫`,
        timestamp: new Date(),
        suggestions: [
          'I need a chill weekend escape 🏖️',
          'Plan an epic adventure with friends 🎒',
          'Surprise me with something cool! ✨',
          'Help me plan on a budget 💰'
        ]
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  const generateResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Travel planning responses
    if (lowerMessage.includes('plan') || lowerMessage.includes('trip') || lowerMessage.includes('itinerary')) {
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: `Yesss! Let's plan something absolutely amazing! 🎉 I'm literally buzzing with excitement to help you create the perfect adventure!

Tell me about your dream trip, bestie:

🌍 **Where's calling your heart?** (or let me suggest based on your vibe!)
📅 **When are we making this happen?**
⏰ **How long can you escape reality?**
💸 **What's your budget looking like?**
👥 **Flying solo or bringing the squad?**

**What's your energy?**
😌 Chill and relaxed | 🤠 Adventure seeker | 💕 Romance mode | 🎨 Culture vulture

I'll craft you a day-by-day itinerary that's so perfectly YOU, it'll feel like I read your mind! Ready to make some magic happen? ✨`,
        timestamp: new Date(),
        suggestions: [
          'Surprise me with destinations! 🎲',
          'I want a beach paradise 🏝️',
          'Show me mountain adventures 🏔️',
          'City vibes please! 🏙️'
        ]
      };
    }

    if (lowerMessage.includes('budget') || lowerMessage.includes('cheap') || lowerMessage.includes('affordable')) {
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: `Honey, I totally get it! Traveling on a budget doesn't mean compromising on fun - it just means being smart about it! 💪✨

**Budget Travel Hacks (from your savvy AI bestie):**

🏠 **Stay Smart**: Hostels, Airbnb, or even house-sitting! 
✈️ **Fly Clever**: Book Tuesday flights, use incognito mode, be flexible with dates
🍜 **Eat Local**: Street food tours > fancy restaurants (trust me on this!)
🎯 **Free Fun**: Walking tours, beaches, hiking, local festivals

**Budget Ranges That Actually Work:**
💰 **Backpacker Vibes**: $30-50/day (Southeast Asia, Eastern Europe)
💸 **Comfort Zone**: $50-100/day (Most places with smart choices)
💎 **Treat Yourself**: $100-200/day (Splurge moments included!)

**My Fave Budget Destinations:**
🌴 Thailand - Street food paradise & stunning beaches
🏰 Portugal - European charm without breaking the bank  
🌮 Mexico - Amazing culture, food, and beaches
🏔️ Nepal - Adventure seeker's dream on a dime

What's your target daily budget, adventure buddy? Let's make every penny count! 🎯`,
        timestamp: new Date(),
        suggestions: [
          'Under $50/day please! 🙏',
          'Show me $50-100/day options 💫',
          'Thailand sounds amazing! 🇹🇭',
          'European budget adventures 🇪🇺'
        ]
      };
    }

    if (lowerMessage.includes('romantic') || lowerMessage.includes('couple') || lowerMessage.includes('honeymoon')) {
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: `Aww, planning something special! 💕 I love helping couples create magical memories.

**Top Romantic Destinations:**

🏖️ **Beach Romance**
• Santorini, Greece - Stunning sunsets and intimate dinners
• Maldives - Private overwater bungalows
• Bali, Indonesia - Couples spa treatments and rice terrace walks

🏔️ **Mountain Romance**
• Swiss Alps - Cozy chalets and scenic train rides
• Tuscany, Italy - Wine tastings and countryside drives
• Banff, Canada - Lake views and mountain lodges

🏛️ **City Romance**
• Paris, France - Classic romance with art and cuisine
• Prague, Czech Republic - Fairy-tale architecture
• Kyoto, Japan - Traditional ryokans and zen gardens

**Romantic Activities I Can Plan:**
• Private sunset dinners
• Couples spa experiences
• Scenic helicopter/hot air balloon rides
• Wine tasting tours
• Photography sessions in beautiful locations

What type of romantic vibe are you going for? Beach relaxation, mountain adventure, or cultural city exploration?`,
        timestamp: new Date(),
        suggestions: [
          'Beach honeymoon ideas',
          'European romantic cities',
          'Couples spa retreats',
          'Anniversary trip planning'
        ]
      };
    }

    if (lowerMessage.includes('mood') || lowerMessage.includes('feeling') || lowerMessage.includes('suggest')) {
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: `Perfect! I specialize in mood-based travel recommendations. 🎭

**Tell me how you're feeling:**

😢 **Feeling Overwhelmed/Sad?**
→ Peaceful beaches, spa retreats, quiet mountain towns

😌 **Need to Relax/Recharge?**
→ Wellness destinations, hot springs, meditation retreats

🤩 **Excited & Energetic?**
→ Vibrant cities, festivals, adventure activities

😕 **Confused/Need Clarity?**
→ Cultural immersion, spiritual journeys, solo travel

🤠 **Adventurous & Bold?**
→ Extreme sports, remote destinations, challenging hikes

**Seasonal Mood Matches:**
• **Spring Energy**: Japan (cherry blossoms), Netherlands (tulips)
• **Summer Vibes**: Mediterranean coast, Scandinavia
• **Autumn Reflection**: New England, Germany, South Korea
• **Winter Cozy**: Christmas markets, Northern Lights, ski resorts

What's your current emotional state? I'll match you with destinations that will either complement your mood or help shift it in the direction you want!`,
        timestamp: new Date(),
        suggestions: [
          'I need to relax and recharge',
          'I want adventure and excitement',
          'Help me find clarity',
          'Seasonal destination ideas'
        ]
      };
    }

    // Default helpful response
    return {
      id: Date.now().toString(),
      type: 'assistant',
      content: `Hey beautiful soul! 💫 I'm here to be your ultimate travel buddy and make your wanderlust dreams come true!

**What I'm amazing at:**
✨ **Reading Your Vibe**: Tell me your mood, I'll find your perfect destination
🎯 **Budget Wizardry**: Making your money stretch like yoga pants
🗺️ **Hidden Gems**: I know spots that aren't on every Instagram feed
👥 **Squad Goals**: Planning group trips that everyone will love
💝 **Surprise Factor**: Unexpected experiences that'll blow your mind

Think of me as that friend who's been everywhere, knows everyone, and always has the best recommendations! I'm here to make your travel planning as fun as the actual trip! 

What adventure shall we cook up together? 🚀💕`,
      timestamp: new Date(),
      suggestions: [
        'I need a mood boost trip! 🌈',
        'Plan something with my besties 👯‍♀️',
        'Solo adventure recommendations 🎒',
        'Surprise me with something unique! 🎭'
      ]
    };
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
      const assistantResponse = generateResponse(input);
      setMessages(prev => [...prev, assistantResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        className="floating-chat-button"
        size="lg"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <Card className={`fixed bottom-6 right-6 z-50 bg-white border-0 shadow-2xl transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold">ARIA - Your Travel Bestie</h3>
            <p className="text-xs text-blue-100">Chill, funny & always helpful! 😎</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMinimize}
            className="text-white hover:bg-white/20 h-8 w-8 p-0"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-white hover:bg-white/20 h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[440px]">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[280px] ${message.type === 'user' ? 'chat-bubble-user' : 'chat-bubble-assistant'}`}>
                  {message.type === 'assistant' && (
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-medium text-blue-600">ARIA ✨</span>
                    </div>
                  )}
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content}
                  </div>
                  {message.suggestions && (
                    <div className="mt-3 space-y-2">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full text-left justify-start text-xs h-8 border-blue-200 hover:bg-blue-50"
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
                    <Bot className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-medium text-blue-600">ARIA ✨</span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-gray-50 rounded-b-lg">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="What's on your travel wishlist? ✈️"
                className="flex-1 text-sm"
                disabled={isLoading}
              />
              <Button 
                onClick={handleSend} 
                disabled={isLoading || !input.trim()}
                size="sm"
                className="bg-gradient-to-r from-warm-orange-500 to-sunset-pink-500 text-white hover:scale-105 transition-all duration-300"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-1 mt-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setInput("Plan a chill weekend escape")}
                className="text-xs h-6 px-2"
              >
                Weekend vibes
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setInput("Budget travel hacks")}
                className="text-xs h-6 px-2"
              >
                Budget magic
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setInput("Squad trip ideas")}
                className="text-xs h-6 px-2"
              >
                Squad goals
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}