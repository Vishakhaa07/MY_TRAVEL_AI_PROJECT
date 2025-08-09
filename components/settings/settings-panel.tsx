'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  Globe, 
  Bell, 
  Shield, 
  Palette, 
  Brain, 
  Camera, 
  Mic,
  Calendar,
  DollarSign,
  User,
  Save
} from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

export function SettingsPanel() {
  const { language, setLanguage } = useLanguage();
  const [settings, setSettings] = useState({
    // Privacy & Consent
    moodDetection: true,
    voiceInput: false,
    imageAnalysis: true,
    locationTracking: false,
    
    // Personalization
    astrologyInsights: false,
    numerologyInsights: false,
    ageBasedSuggestions: true,
    
    // Notifications
    tripReminders: true,
    dealAlerts: true,
    weatherUpdates: false,
    
    // Preferences
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    theme: 'light',
    
    // Profile
    birthDate: '',
    travelStyle: 'balanced',
    budgetRange: 'moderate',
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
  ];

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-2">
          Settings
        </h1>
        <p className="text-gray-600">
          Customize your ARCA experience and privacy preferences
        </p>
      </div>

      <div className="space-y-8">
        {/* Language & Localization */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold">Language & Localization</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Language</Label>
              <Select value={language} onValueChange={(value) => setLanguage(value as any)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map(lang => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <div className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Currency</Label>
              <Select value={settings.currency} onValueChange={(value) => handleSettingChange('currency', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="JPY">JPY (¥)</SelectItem>
                  <SelectItem value="INR">INR (₹)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Date Format</Label>
              <Select value={settings.dateFormat} onValueChange={(value) => handleSettingChange('dateFormat', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Theme</Label>
              <Select value={settings.theme} onValueChange={(value) => handleSettingChange('theme', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="auto">Auto</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Privacy & Consent */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold">Privacy & Consent</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-gray-500" />
                  <Label>Mood Detection</Label>
                </div>
                <p className="text-sm text-gray-600">
                  Allow ARCA to analyze your text input for emotional insights
                </p>
              </div>
              <Switch
                checked={settings.moodDetection}
                onCheckedChange={(checked) => handleSettingChange('moodDetection', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Mic className="w-4 h-4 text-gray-500" />
                  <Label>Voice Input</Label>
                </div>
                <p className="text-sm text-gray-600">
                  Enable voice messages for trip planning conversations
                </p>
              </div>
              <Switch
                checked={settings.voiceInput}
                onCheckedChange={(checked) => handleSettingChange('voiceInput', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-gray-500" />
                  <Label>Image Analysis</Label>
                </div>
                <p className="text-sm text-gray-600">
                  Allow ARCA to analyze uploaded images for destination suggestions
                </p>
              </div>
              <Switch
                checked={settings.imageAnalysis}
                onCheckedChange={(checked) => handleSettingChange('imageAnalysis', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-500" />
                  <Label>Location Tracking</Label>
                </div>
                <p className="text-sm text-gray-600">
                  Share your location for personalized local recommendations
                </p>
              </div>
              <Switch
                checked={settings.locationTracking}
                onCheckedChange={(checked) => handleSettingChange('locationTracking', checked)}
              />
            </div>
          </div>
        </Card>

        {/* AI Personalization */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold">AI Personalization</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Astrology Insights</Label>
                <p className="text-sm text-gray-600">
                  Include astrological considerations in travel recommendations
                </p>
              </div>
              <Switch
                checked={settings.astrologyInsights}
                onCheckedChange={(checked) => handleSettingChange('astrologyInsights', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Numerology Insights</Label>
                <p className="text-sm text-gray-600">
                  Factor in numerological patterns for trip timing
                </p>
              </div>
              <Switch
                checked={settings.numerologyInsights}
                onCheckedChange={(checked) => handleSettingChange('numerologyInsights', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Age-Based Suggestions</Label>
                <p className="text-sm text-gray-600">
                  Tailor recommendations based on your age group preferences
                </p>
              </div>
              <Switch
                checked={settings.ageBasedSuggestions}
                onCheckedChange={(checked) => handleSettingChange('ageBasedSuggestions', checked)}
              />
            </div>
            
            {(settings.astrologyInsights || settings.numerologyInsights) && (
              <div className="space-y-2">
                <Label>Birth Date</Label>
                <Input
                  type="date"
                  value={settings.birthDate}
                  onChange={(e) => handleSettingChange('birthDate', e.target.value)}
                  className="max-w-xs"
                />
                <p className="text-xs text-gray-500">
                  Used only for astrological and numerological insights
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold">Notifications</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <Label>Trip Reminders</Label>
                </div>
                <p className="text-sm text-gray-600">
                  Get notified about upcoming trips and important dates
                </p>
              </div>
              <Switch
                checked={settings.tripReminders}
                onCheckedChange={(checked) => handleSettingChange('tripReminders', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <Label>Deal Alerts</Label>
                </div>
                <p className="text-sm text-gray-600">
                  Receive notifications about flight deals and discounts
                </p>
              </div>
              <Switch
                checked={settings.dealAlerts}
                onCheckedChange={(checked) => handleSettingChange('dealAlerts', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Weather Updates</Label>
                <p className="text-sm text-gray-600">
                  Get weather alerts for your planned destinations
                </p>
              </div>
              <Switch
                checked={settings.weatherUpdates}
                onCheckedChange={(checked) => handleSettingChange('weatherUpdates', checked)}
              />
            </div>
          </div>
        </Card>

        {/* Travel Preferences */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold">Travel Preferences</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Travel Style</Label>
              <Select value={settings.travelStyle} onValueChange={(value) => handleSettingChange('travelStyle', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">Budget Traveler</SelectItem>
                  <SelectItem value="balanced">Balanced</SelectItem>
                  <SelectItem value="comfort">Comfort Focused</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Default Budget Range</Label>
              <Select value={settings.budgetRange} onValueChange={(value) => handleSettingChange('budgetRange', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">Budget ($0-$1000)</SelectItem>
                  <SelectItem value="moderate">Moderate ($1000-$3000)</SelectItem>
                  <SelectItem value="premium">Premium ($3000-$7000)</SelectItem>
                  <SelectItem value="luxury">Luxury ($7000+)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button className="arca-gradient text-white">
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}