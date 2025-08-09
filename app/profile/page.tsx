import { Profile } from '@/components/profile/profile';
import { BottomNavigation } from '@/components/layout/bottom-navigation';

export default function ProfilePage() {
  return (
    <div className="min-h-screen pb-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Profile />
      <BottomNavigation />
    </div>
  );
}