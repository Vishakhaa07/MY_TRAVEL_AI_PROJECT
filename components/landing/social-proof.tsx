'use client';

import { useEffect, useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Users, MapPin, Calendar, Star } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: 50000,
    label: 'Happy Travelers',
    suffix: '+',
  },
  {
    icon: MapPin,
    value: 1200,
    label: 'Destinations',
    suffix: '+',
  },
  {
    icon: Calendar,
    value: 25000,
    label: 'Trips Planned',
    suffix: '+',
  },
  {
    icon: Star,
    value: 4.9,
    label: 'Average Rating',
    suffix: '',
    decimal: true,
  },
];

function AnimatedCounter({ 
  value, 
  suffix = '', 
  decimal = false, 
  duration = 2000 
}: { 
  value: number; 
  suffix?: string; 
  decimal?: boolean; 
  duration?: number; 
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const startValue = 0;
    const endValue = value;

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (endValue - startValue) * easeOutCubic;
      
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isVisible, value, duration]);

  const displayValue = decimal 
    ? count.toFixed(1) 
    : Math.floor(count).toLocaleString();

  return (
    <span ref={ref} className="font-bold text-3xl md:text-4xl text-navy-900">
      {displayValue}{suffix}
    </span>
  );
}

export function SocialProof() {
  return (
    <section className="py-20 bg-gradient-to-br from-teal-50 to-coral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4 font-playfair">
            Trusted by travelers worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of happy travelers who have discovered their perfect trips with us
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className="text-center p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-teal-500 to-coral-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <div className="mb-2">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimal={stat.decimal}
                  />
                </div>
                
                <p className="text-gray-600 font-medium">
                  {stat.label}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Testimonials */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                location: 'New York, USA',
                text: 'Travel Arca made planning our European honeymoon so easy! The AI suggestions were spot-on.',
                avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
              },
              {
                name: 'Marcus Chen',
                location: 'Singapore',
                text: 'Love how I can collaborate with friends in real-time. We planned our Japan trip in just one evening!',
                avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150',
              },
              {
                name: 'Elena Rodriguez',
                location: 'Madrid, Spain',
                text: 'The interactive maps and smart scheduling saved us hours of research. Highly recommend!',
                avatar: 'https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=150',
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-0"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-navy-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
                <div className="flex items-center mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}