'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/contexts/language-context';
import { 
  Compass, 
  Calendar, 
  MessageCircle, 
  Heart, 
  User 
} from 'lucide-react';

export function BottomNavigation() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    {
      href: '/explore',
      icon: Compass,
      label: t('nav.explore'),
      active: pathname === '/explore',
    },
    {
      href: '/trips',
      icon: Calendar,
      label: t('nav.myTrips'),
      active: pathname === '/trips',
    },
    {
      href: '/concierge',
      icon: MessageCircle,
      label: t('nav.concierge'),
      active: pathname === '/concierge',
    },
    {
      href: '/favorites',
      icon: Heart,
      label: t('nav.favorites'),
      active: pathname === '/favorites',
    },
    {
      href: '/profile',
      icon: User,
      label: t('nav.profile'),
      active: pathname === '/profile',
    },
  ];

  return (
    <nav className="bottom-nav">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-300 zoom-hover ${
                item.active
                  ? 'text-blue-600 bg-blue-50 scale-110'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 hover:scale-105'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 transition-transform ${item.active ? 'text-blue-600 scale-110' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}