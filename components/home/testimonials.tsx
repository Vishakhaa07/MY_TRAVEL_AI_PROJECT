'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    title: 'CEO, Tech Startup',
    location: 'San Francisco',
    rating: 5,
    text: "ARCA transformed our anniversary trip into something magical. The attention to detail and personalized recommendations were beyond our expectations. Every moment felt curated just for us.",
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    trip: 'Romantic Santorini Escape',
    isPremium: true,
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    title: 'Investment Banker',
    location: 'London',
    rating: 5,
    text: "The AI concierge understood exactly what I needed - a perfect balance of business and leisure. The private jet arrangements and exclusive restaurant bookings were flawless.",
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150',
    trip: 'Tokyo Business & Culture',
    isPremium: true,
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    title: 'Art Collector',
    location: 'Madrid',
    rating: 5,
    text: "ARCA's cultural insights and exclusive museum access made my art tour of Europe absolutely extraordinary. The private viewings and curator meetings were priceless.",
    avatar: 'https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=150',
    trip: 'European Art Discovery',
    isPremium: true,
  },
];

export function Testimonials() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6 drop-shadow-sm">
            Trusted by Discerning Travelers
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
            Join our exclusive community of luxury travelers who trust ARCA for their most important journeys.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="luxury-card p-8 relative zoom-hover">
              <Quote className="w-8 h-8 text-blue-200 mb-4 zoom-hover" />
              
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400 zoom-hover" />
                ))}
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed italic text-pretty">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4 zoom-hover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    {testimonial.isPremium && (
                      <Badge className="premium-badge text-xs zoom-hover">Premium</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{testimonial.title}</p>
                  <p className="text-xs text-gray-500">{testimonial.location}</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 font-medium">{testimonial.trip}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}