'use client';

import { useLanguage } from '@/contexts/language-context';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Crown, 
  Utensils, 
  Plane, 
  Gem, 
  Calendar,
  Users
} from 'lucide-react';

const experiences = [
  {
    id: 1,
    title: 'Private Chef Experiences',
    description: 'Michelin-starred chefs create personalized dining experiences in exclusive locations',
    icon: Utensils,
    category: 'Culinary',
    color: 'from-orange-400 to-red-500',
  },
  {
    id: 2,
    title: 'Private Jet Charters',
    description: 'Skip the lines with luxury private aviation to any destination worldwide',
    icon: Plane,
    category: 'Transportation',
    color: 'from-blue-400 to-blue-600',
  },
  {
    id: 3,
    title: 'Exclusive Access',
    description: 'Private museum tours, closed venues, and VIP cultural experiences',
    icon: Crown,
    category: 'Cultural',
    color: 'from-purple-400 to-purple-600',
  },
  {
    id: 4,
    title: 'Luxury Shopping',
    description: 'Personal shopping with exclusive access to designer collections',
    icon: Gem,
    category: 'Shopping',
    color: 'from-pink-400 to-pink-600',
  },
  {
    id: 5,
    title: 'Event Planning',
    description: 'Bespoke celebrations and special occasions in extraordinary settings',
    icon: Calendar,
    category: 'Events',
    color: 'from-green-400 to-green-600',
  },
  {
    id: 6,
    title: 'Group Experiences',
    description: 'Curated group adventures with like-minded luxury travelers',
    icon: Users,
    category: 'Social',
    color: 'from-indigo-400 to-indigo-600',
  },
];

export function LuxuryExperiences() {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6 drop-shadow-sm">
            {t('experiences.title')}
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
            {t('experiences.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((experience) => {
            const Icon = experience.icon;
            return (
              <Card key={experience.id} className="luxury-card p-8 text-center group cursor-pointer zoom-hover">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${experience.color} mx-auto mb-6 flex items-center justify-center zoom-hover`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <Badge variant="secondary" className="mb-4 zoom-hover">
                  {experience.category}
                </Badge>
                
                <h3 className="text-xl font-display font-bold text-gray-900 mb-4">
                  {experience.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-pretty">
                  {experience.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}