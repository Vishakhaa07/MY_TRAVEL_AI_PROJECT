import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { TripDashboard } from '@/components/dashboard/trip-dashboard';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Navigation />
      <div className="pt-20">
        <TripDashboard />
      </div>
      <Footer />
    </div>
  );
}