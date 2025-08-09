'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Sparkles, MapPin } from 'lucide-react';
import { AIItineraryModal } from './ai-itinerary-modal';

const headlines = [
  {
    title: "Wander further. Plan simpler.",
    subtitle: "Create shareable itineraries in minutes.",
  },
  {
    title: "Your trip, made effortless.",
    subtitle: "AI suggestions, live collaboration, and instant maps.",
  },
  {
    title: "Go somewhere you'll remember.",
    subtitle: "Organize, invite, and book — all in one place.",
  },
  {
    title: "From idea to checked-in.",
    subtitle: "Plan beautiful trips with friends in minutes.",
  },
  {
    title: "See the world. Stress-free.",
    subtitle: "Smart itineraries, interactive maps, travel-ready PDFs.",
  },
  {
    title: "Pack less planning in. Travel more.",
    subtitle: "Create flexible plans that move with you.",
  },
];

export function Hero() {
  const [currentHeadline, setCurrentHeadline] = useState(0);
  const [showAIModal, setShowAIModal] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % headlines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleStartPlanning = () => {
    window.location.href = '/itinerary';
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video/Animation */}
      <div className="absolute inset-0 z-0">
        {/* Travel Friends Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="travel-video-bg"
          onLoadedData={() => setVideoLoaded(true)}
          poster="https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=1920"
        >
          <source src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4" type="video/mp4" />
          <source src="https://videos.pexels.com/video-files/4009409/4009409-uhd_2560_1440_30fps.mp4" type="video/mp4" />
        </video>
        
        {/* Warm Gradient Overlay */}
        <div className="video-overlay" />
        
        {/* Animated Particles */}
        <div className="absolute inset-0 z-20">
          <div className="floating-particles">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-30 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Logo/Brand */}
          <div className="mb-8 hero-logo">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-warm-orange-400 to-sunset-pink-400 rounded-2xl flex items-center justify-center shadow-2xl">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white font-playfair">Travel Arca</h1>
            </div>
          </div>

          {/* Dynamic Headlines */}
          <div className="hero-content">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-playfair">
              <span className="headline-text" key={currentHeadline}>
                {headlines[currentHeadline].title}
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
              <span className="subtitle-text" key={`sub-${currentHeadline}`}>
                {headlines[currentHeadline].subtitle}
              </span>
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={handleStartPlanning}
                size="lg"
                className="bg-gradient-to-r from-warm-orange-500 to-warm-orange-600 hover:from-warm-orange-600 hover:to-warm-orange-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start Planning
              </Button>
              
              <Button
                onClick={() => setShowAIModal(true)}
                variant="outline"
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-2xl backdrop-blur-sm hover:backdrop-blur-md transition-all duration-300 hover:scale-105"
              >
                <Play className="w-5 h-5 mr-2" />
                Get AI Itinerary
              </Button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="scroll-indicator">
              <div className="scroll-dot"></div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Modal */}
      <AIItineraryModal 
        isOpen={showAIModal} 
        onClose={() => setShowAIModal(false)} 
      />
    </section>
  );
}