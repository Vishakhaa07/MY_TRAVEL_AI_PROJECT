import { Favorites } from '@/components/favorites/favorites';
import { BottomNavigation } from '@/components/layout/bottom-navigation';

export default function FavoritesPage() {
  return (
    <div className="min-h-screen pb-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Favorites />
      <BottomNavigation />
    </div>
  );
}