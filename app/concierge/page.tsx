import { ConciergeChat } from '@/components/concierge/concierge-chat';
import { BottomNavigation } from '@/components/layout/bottom-navigation';

export default function ConciergePage() {
  return (
    <div className="min-h-screen pb-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <ConciergeChat />
      <BottomNavigation />
    </div>
  );
}