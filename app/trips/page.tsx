import { MyTrips } from '@/components/trips/my-trips';
import { BottomNavigation } from '@/components/layout/bottom-navigation';

export default function TripsPage() {
  return (
    <div className="min-h-screen pb-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <MyTrips />
      <BottomNavigation />
    </div>
  );
}