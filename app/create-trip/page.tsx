'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { ChatInterface } from '@/components/trip/chat-interface';
import { MoodSelector } from '@/components/trip/mood-selector';
import { TripPreferences } from '@/components/trip/trip-preferences';
import { useLanguage } from '@/contexts/language-context';

export default function CreateTripPage() {
  const [currentStep, setCurrentStep] = useState<'mood' | 'preferences' | 'chat'>('mood');
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [preferences, setPreferences] = useState<any>(null);
  const searchParams = useSearchParams();
  const { t } = useLanguage();

  useEffect(() => {
    const moodFromUrl = searchParams.get('mood');
    if (moodFromUrl) {
      setSelectedMood(moodFromUrl);
      setCurrentStep('preferences');
    }
  }, [searchParams]);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    setCurrentStep('preferences');
  };

  const handlePreferencesComplete = (prefs: any) => {
    setPreferences(prefs);
    setCurrentStep('chat');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navigation />
      
      <div className="pt-20 pb-8">
        {currentStep === 'mood' && (
          <MoodSelector onMoodSelect={handleMoodSelect} />
        )}
        
        {currentStep === 'preferences' && (
          <TripPreferences
            selectedMood={selectedMood}
            onComplete={handlePreferencesComplete}
            onBack={() => setCurrentStep('mood')}
          />
        )}
        
        {currentStep === 'chat' && (
          <ChatInterface
            selectedMood={selectedMood}
            preferences={preferences}
            onBack={() => setCurrentStep('preferences')}
          />
        )}
      </div>
      
      <Footer />
    </div>
  );
}