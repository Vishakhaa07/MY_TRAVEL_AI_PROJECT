'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Menu, 
  X, 
  Compass, 
  User, 
  Settings, 
  Globe,
  ChevronDown 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-white/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative">
              <div className="w-10 h-10 arca-gradient rounded-full flex items-center justify-center">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-xs">✨</span>
              </div>
            </div>
            <span className="text-2xl font-display font-bold arca-text-gradient">ARCA</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-arca-teal transition-colors">
              {t('nav.home')}
            </Link>
            <Link href="/explore" className="text-gray-700 hover:text-arca-teal transition-colors">
              {t('nav.explore')}
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-arca-teal transition-colors">
              {t('nav.blog')}
            </Link>
            <Link href="/trips" className="text-gray-700 hover:text-arca-teal transition-colors">
              {t('nav.trips')}
            </Link>
            <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">
              Dashboard
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Globe className="w-4 h-4" />
                  <span>{currentLanguage?.flag}</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as any)}
                    className="gap-3"
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button asChild variant="outline" size="sm">
              <Link href="/auth/login">
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Link>
            </Button>
            
            <Button asChild className="arca-gradient text-white">
              <Link href="/create-trip">
                {t('nav.createTrip')}
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <Card className="glass-card p-6 space-y-4">
              <Link 
                href="/" 
                className="block text-gray-700 hover:text-arca-teal transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.home')}
              </Link>
              <Link 
                href="/explore" 
                className="block text-gray-700 hover:text-arca-teal transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.explore')}
              </Link>
              <Link 
                href="/blog" 
                className="block text-gray-700 hover:text-arca-teal transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.blog')}
              </Link>
              <Link 
                href="/trips" 
                className="block text-gray-700 hover:text-arca-teal transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.trips')}
              </Link>
              
              <div className="border-t pt-4 space-y-3">
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/auth/login">
                    <User className="w-4 h-4 mr-2" />
                    Sign In
                  </Link>
                </Button>
                <Button asChild className="arca-gradient text-white w-full">
                  <Link href="/create-trip">
                    {t('nav.createTrip')}
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </nav>
  );
}