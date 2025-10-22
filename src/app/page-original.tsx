import { Suspense, lazy } from 'react';
import { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import CollectionsSection from '@/components/sections/CollectionsSection';
import MetricsSection from '@/components/sections/MetricsSection';
import AIAssistantBanner from '@/components/sections/AIAssistantBanner';
import HomepageAnnouncements from '@/components/homepage/HomepageAnnouncements';

// Lazy load components for better performance
const FeaturedProducts = lazy(() => import('@/components/sections/FeaturedProducts'));
const EcommerceSection = lazy(() => import('@/components/sections/EcommerceSection'));
const AboutSection = lazy(() => import('@/components/sections/AboutSection'));
const TestimonialsSection = lazy(() => import('@/components/sections/TestimonialsSection'));
const ContactSection = lazy(() => import('@/components/sections/ContactSection'));
const FloatingChat = lazy(() => import('@/components/ui/FloatingChat'));

// Loading component
const SectionLoader = ({ className = "h-96" }: { className?: string }) => (
  <div className={`${className} bg-gradient-to-r from-gray-900/50 to-black/50 animate-pulse flex items-center justify-center`}>
    <div className="text-gold/50 text-sm">Cargando...</div>
  </div>
);

export const metadata: Metadata = {
  title: 'SEVÁN PERFUM - Fragancias de Lujo Inspiradas | Perfumes Premium',
  description: 'Descubre nuestra exclusiva colección de 213 fragancias de lujo inspiradas en los mejores perfumes del mundo. Calidad premium, precios accesibles y envío gratis a toda Colombia.',
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black pt-20">
      {/* Anuncios dinámicos del CMS */}
      <div className="container mx-auto px-4 py-4">
        <HomepageAnnouncements 
          audience="all" 
          maxAnnouncements={3}
          className="mb-6"
        />
      </div>
      
      {/* Critical above-the-fold content */}
      <HeroSection />
      <CollectionsSection />
      <MetricsSection />
      <AIAssistantBanner />
      
      {/* Lazy loaded sections */}
      <Suspense fallback={<SectionLoader />}>
        <FeaturedProducts />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <EcommerceSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <AboutSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <TestimonialsSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <ContactSection />
      </Suspense>
      
      {/* Floating Chat - Load last */}
      <Suspense fallback={null}>
        <FloatingChat />
      </Suspense>
    </main>
  );
}