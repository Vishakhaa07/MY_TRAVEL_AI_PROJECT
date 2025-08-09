'use client';

import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Sparkles, Users, Map, Calendar, Download, Share2 } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'Intelligent Emotional AI',
    description: 'Meet ARIA - your caring AI buddy who understands your feelings and creates trips that match your emotional needs. Perfect for all ages, from kids to grandparents! 🤗',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Users,
    title: 'Squad Travel Planning',
    description: 'Plan like the crew from "Friends" or "The Hangover"! Create travel groups inspired by your favorite shows - from "Emily in Paris" adventures to "Zindagi Na Milegi Dobara" road trips! 🎬',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Map,
    title: '3D Interactive World Maps',
    description: 'Explore destinations with stunning 3D maps and aesthetic views. Zoom, rotate, and discover hidden gems with our immersive mapping experience! 🌍',
    color: 'from-green-500 to-teal-500',
  },
  {
    icon: Calendar,
    title: 'Budget & Time Optimizer',
    description: 'Smart scheduling that optimizes both your budget AND time! Get the most value from every moment and rupee spent on your adventure! 💰⏰',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Download,
    title: 'Share Your Adventures',
    description: 'Create stunning travel stories and share them with your squad! Download beautiful PDFs or create interactive posts for social media! 📱✨',
    color: 'from-indigo-500 to-purple-500',
  },
];

export function FeatureCards() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.feature-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-in');
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardsRef.current) {
      observer.observe(cardsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-warm-orange-50 to-sunset-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-warm-brown-900 mb-4 font-playfair">
            Everything you need to plan
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features that make travel planning effortless and enjoyable
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="feature-card p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-warm-brown-900 mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}