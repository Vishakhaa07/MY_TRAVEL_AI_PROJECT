import { ExploreDestinations } from '@/components/explore/explore-destinations';
import { BottomNavigation } from '@/components/layout/bottom-navigation';

export default function ExplorePage() {
  return (
    <div className="min-h-screen pb-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <ExploreDestinations />
      <BottomNavigation />
    </div>
  );
}