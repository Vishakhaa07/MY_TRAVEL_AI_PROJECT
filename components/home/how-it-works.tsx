'use client';

import { useLanguage } from '@/contexts/language-context';
import { Card } from '@/components/ui/card';
import { Heart, Brain, Calendar } from 'lucide-react';

export function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: Heart,
      title: t('howItWorks.step1.title'),
      description: t('howItWorks.step1.description'),
      color: 'from-pink-400 to-red-500',
    },
    {
      icon: Brain,
      title: t('howItWorks.step2.title'),
      description: t('howItWorks.step2.description'),
      color: 'from-purple-400 to-pink-500',
    },
    {
      icon: Calendar,
      title: t('howItWorks.step3.title'),
      description: t('howItWorks.step3.description'),
      color: 'from-blue-400 to-purple-500',
    },
  ];

  return (
    <section className="py-20 px-4 travel-bg-mountain">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            {t('howItWorks.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="glass-card p-8 text-center hover:scale-105 transition-all duration-300">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} mx-auto mb-6 flex items-center justify-center`}>
                <step.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-4">
                {step.title}
              </h3>
              <p className="text-white/80 leading-relaxed">
                {step.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}