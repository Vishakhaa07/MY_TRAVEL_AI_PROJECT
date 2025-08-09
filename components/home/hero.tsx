'use client';

import { useLanguage } from '@/contexts/language-context';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Crown, Sparkles } from 'lucide-react';

export function Hero() {
  const { t } = useLanguage();
  const { user } = useAuth();

  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=1920")'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-blue-700/80" />
      
      {/* Logo */}
      <div className="absolute top-8 left-8 z-20">
        <div className="flex items-center space-x-3 zoom-hover">
          <div className="relative">
            <div className="w-12 h-12 arca-gradient rounded-2xl flex items-center justify-center pulse-glow">
              <div className="w-8 h-8 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center smooth-bounce">
              <Sparkles className="w-2 h-2 text-white" />
            </div>
          </div>
          <span className="text-2xl font-bold text-white" style={{ fontFamily: 'cursive' }}>Travel Arca</span>
        </div>
      </div>

      {/* Premium Badge */}
      {user?.isPremium && (
        <div className="absolute top-8 right-8 z-20">
          <Badge className="premium-badge zoom-hover">
            <Crown className="w-3 h-3 mr-1" />
            Premium
          </Badge>
        </div>
      )}

      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <div className="liquid-glass-surface p-8 md:p-12 zoom-in-out">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight drop-shadow-lg">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-md font-medium text-pretty">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="arca-gradient text-white text-lg px-8 py-6 rounded-2xl zoom-hover">
              <Link href="/concierge">
                <Sparkles className="w-5 h-5 mr-2" />
                {t('hero.cta')}
              </Link>
            </Button>
            
            {!user?.isPremium && (
              <Button asChild variant="outline" size="lg" className="liquid-button text-white text-lg px-8 py-6 zoom-hover">
                <Link href="/premium">
                  <Crown className="w-5 h-5 mr-2" />
                  {t('hero.premium')}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}