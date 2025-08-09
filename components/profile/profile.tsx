'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useLanguage } from '@/contexts/language-context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Crown, 
  Settings, 
  Globe, 
  Bell, 
  Shield,
  CreditCard,
  LogOut,
  Edit3,
  Save
} from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
];

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
];

export function Profile() {
  const { user, logout, updateProfile } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currency: user?.preferences?.currency || 'USD',
    interests: user?.preferences?.interests || [],
  });
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: true,
    moodDetection: true,
    locationTracking: false,
    astrologyInsights: false,
  });

  const handleSave = async () => {
    try {
      await updateProfile({
        name: formData.name,
        preferences: {
          ...user?.preferences,
          currency: formData.currency,
          language,
          interests: formData.interests,
        }
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const currentLanguage = languages.find(lang => lang.code === language);
  const currentCurrency = currencies.find(curr => curr.code === formData.currency);

  const travelStats = {
    tripsCompleted: 3,
    countriesVisited: 8,
    totalSpent: 45000,
    favoriteDestination: 'Santorini, Greece',
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="relative inline-block mb-4">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user?.name?.charAt(0) || 'U'}
          </div>
          {user?.isPremium && (
            <div className="absolute -top-2 -right-2">
              <Badge className="premium-badge">
                <Crown className="w-3 h-3" />
              </Badge>
            </div>
          )}
        </div>
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
          {user?.name || 'User'}
        </h1>
        <p className="text-gray-600">{user?.email}</p>
        {user?.isPremium && (
          <Badge className="premium-badge mt-2">
            <Crown className="w-3 h-3 mr-1" />
            Premium Member
          </Badge>
        )}
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="stats">Travel Stats</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card className="luxury-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Personal Information</h2>
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
                size="sm"
              >
                {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit3 className="w-4 h-4 mr-2" />}
                {isEditing ? 'Save' : 'Edit'}
              </Button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Language</Label>
                  <Select value={language} onValueChange={(value) => setLanguage(value as any)} disabled={!isEditing}>
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
                <div>
                  <Label>Preferred Currency</Label>
                  <Select 
                    value={formData.currency} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, currency: value }))}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map(curr => (
                        <SelectItem key={curr.code} value={curr.code}>
                          {curr.symbol} {curr.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSave} className="arca-gradient text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <Card className="luxury-card p-6">
            <h2 className="text-xl font-semibold mb-6">Travel Preferences</h2>
            
            <div className="space-y-6">
              <div>
                <Label className="text-base font-medium mb-3 block">Travel Interests</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Luxury', 'Culture', 'Adventure', 'Relaxation', 'Food & Wine', 'Art & Museums', 'Nature', 'Shopping', 'Wellness', 'History'].map((interest) => (
                    <Button
                      key={interest}
                      variant={formData.interests.includes(interest) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          interests: prev.interests.includes(interest)
                            ? prev.interests.filter(i => i !== interest)
                            : [...prev.interests, interest]
                        }));
                      }}
                      className="justify-start"
                    >
                      {interest}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Mood Detection</Label>
                    <p className="text-sm text-gray-600">Allow ARCA to analyze your preferences for better recommendations</p>
                  </div>
                  <Switch
                    checked={settings.moodDetection}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, moodDetection: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Astrology Insights</Label>
                    <p className="text-sm text-gray-600">Include astrological considerations in travel planning</p>
                  </div>
                  <Switch
                    checked={settings.astrologyInsights}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, astrologyInsights: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Location Tracking</Label>
                    <p className="text-sm text-gray-600">Share location for personalized local recommendations</p>
                  </div>
                  <Switch
                    checked={settings.locationTracking}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, locationTracking: checked }))}
                  />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Travel Stats Tab */}
        <TabsContent value="stats">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="luxury-card p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{travelStats.tripsCompleted}</div>
              <div className="text-gray-600">Trips Completed</div>
            </Card>
            <Card className="luxury-card p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{travelStats.countriesVisited}</div>
              <div className="text-gray-600">Countries Visited</div>
            </Card>
            <Card className="luxury-card p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">${travelStats.totalSpent.toLocaleString()}</div>
              <div className="text-gray-600">Total Invested</div>
            </Card>
            <Card className="luxury-card p-6 text-center">
              <div className="text-lg font-semibold text-orange-600 mb-2">{travelStats.favoriteDestination}</div>
              <div className="text-gray-600">Favorite Destination</div>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <div className="space-y-6">
            <Card className="luxury-card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-gray-600">Receive notifications about your trips and deals</p>
                  </div>
                  <Switch
                    checked={settings.notifications}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, notifications: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Updates</Label>
                    <p className="text-sm text-gray-600">Receive travel inspiration and exclusive offers</p>
                  </div>
                  <Switch
                    checked={settings.emailUpdates}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, emailUpdates: checked }))}
                  />
                </div>
              </div>
            </Card>

            {!user?.isPremium && (
              <Card className="luxury-card p-6 arca-gradient text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Crown className="w-6 h-6" />
                  <h3 className="text-lg font-semibold">Upgrade to Premium</h3>
                </div>
                <p className="mb-4 text-white/90">
                  Unlock exclusive experiences, priority booking, and personalized concierge service.
                </p>
                <Button className="bg-white text-blue-600 hover:bg-gray-100">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Upgrade Now
                </Button>
              </Card>
            )}

            <Card className="luxury-card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Account Actions
              </h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Privacy Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Globe className="w-4 h-4 mr-2" />
                  Data Export
                </Button>
                <Button 
                  variant="destructive" 
                  className="w-full justify-start"
                  onClick={logout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}