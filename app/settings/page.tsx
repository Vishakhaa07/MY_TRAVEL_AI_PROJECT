import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { SettingsPanel } from '@/components/settings/settings-panel';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Navigation />
      <div className="pt-20">
        <SettingsPanel />
      </div>
      <Footer />
    </div>
  );
}