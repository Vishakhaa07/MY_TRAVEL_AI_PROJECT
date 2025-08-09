import { Hero } from '@/components/landing/hero';
import { QuickPlan } from '@/components/landing/quick-plan';
import { FeatureCards } from '@/components/landing/feature-cards';
import { InteractiveMap } from '@/components/landing/interactive-map';
import { SocialProof } from '@/components/landing/social-proof';
import { Footer } from '@/components/landing/footer';

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <QuickPlan />
      <FeatureCards />
      <InteractiveMap />
      <SocialProof />
      <Footer />
    </main>
  );
}