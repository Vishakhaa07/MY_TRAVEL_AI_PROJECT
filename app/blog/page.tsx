import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { BlogList } from '@/components/blog/blog-list';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navigation />
      <div className="pt-20">
        <BlogList />
      </div>
      <Footer />
    </div>
  );
}