'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sparkles, MapPin, Calendar, Users, DollarSign, Loader2 } from 'lucide-react';

interface AIItineraryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const moods = [
  { emoji: '🏖️', label: 'Relaxation', value: 'relaxation' },
  { emoji: '🎒', label: 'Adventure', value: 'adventure' },
  { emoji: '🏛️', label: 'Culture', value: 'culture' },
  { emoji: '🍷', label: 'Food & Wine', value: 'food' },
  { emoji: '💕', label: 'Romance', value: 'romance' },
  { emoji: '👨‍👩‍👧‍👦', label: 'Family', value: 'family' },
];

const budgetRanges = [
  { label: 'Budget ($500-1500)', value: 'budget' },
  { label: 'Mid-range ($1500-3000)', value: 'mid' },
  { label: 'Luxury ($3000+)', value: 'luxury' },
];

export function AIItineraryModal({ isOpen, onClose }: AIItineraryModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: '',
    duration: '',
    travelers: '',
    budget: '',
    mood: '',
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsGenerating(false);
    onClose();
    
    // Redirect to itinerary page with generated data
    window.location.href = '/itinerary?generated=true';
  };

  const isStepComplete = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return formData.destination && formData.duration && formData.travelers;
      case 2:
        return formData.budget && formData.mood;
      default:
        return false;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="w-6 h-6 text-teal-600" />
            AI Itinerary Generator
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              step >= 1 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              1
            </div>
            <div className={`flex-1 h-2 rounded-full ${step >= 2 ? 'bg-teal-600' : 'bg-gray-200'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              step >= 2 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              2
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Tell us about your trip</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Where do you want to go?
                  </label>
                  <Input
                    placeholder="e.g., Paris, Tokyo, or surprise me!"
                    value={formData.destination}
                    onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Duration
                    </label>
                    <Input
                      placeholder="e.g., 7 days"
                      value={formData.duration}
                      onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Users className="w-4 h-4 inline mr-1" />
                      Travelers
                    </label>
                    <Input
                      placeholder="e.g., 2 people"
                      value={formData.travelers}
                      onChange={(e) => setFormData(prev => ({ ...prev, travelers: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              <Button
                onClick={() => setStep(2)}
                disabled={!isStepComplete(1)}
                className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
              >
                Next Step
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Customize your experience</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3">
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    Budget Range
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {budgetRanges.map((budget) => (
                      <button
                        key={budget.value}
                        onClick={() => setFormData(prev => ({ ...prev, budget: budget.value }))}
                        className={`p-3 rounded-xl border-2 text-left transition-all ${
                          formData.budget === budget.value
                            ? 'border-teal-500 bg-teal-50'
                            : 'border-gray-200 hover:border-teal-300'
                        }`}
                      >
                        {budget.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">
                    What's your travel mood?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {moods.map((mood) => (
                      <button
                        key={mood.value}
                        onClick={() => setFormData(prev => ({ ...prev, mood: mood.value }))}
                        className={`p-4 rounded-xl border-2 text-center transition-all ${
                          formData.mood === mood.value
                            ? 'border-teal-500 bg-teal-50'
                            : 'border-gray-200 hover:border-teal-300'
                        }`}
                      >
                        <div className="text-2xl mb-2">{mood.emoji}</div>
                        <div className="text-sm font-medium">{mood.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleGenerate}
                  disabled={!isStepComplete(2) || isGenerating}
                  className="flex-1 bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Itinerary
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}