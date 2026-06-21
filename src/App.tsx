import { useEffect, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import { SmoothCursor } from './components/ui/smooth-cursor';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import SectionDivider from './components/SectionDivider';

// Lazy load below-the-fold components
const ProblemSolution = lazy(() => import('./components/ProblemSolution'));
const Packages = lazy(() => import('./components/Packages'));
const Capabilities = lazy(() => import('./components/Capabilities'));
const Industries = lazy(() => import('./components/Industries'));
const CarePlans = lazy(() => import('./components/CarePlans'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const Process = lazy(() => import('./components/Process'));
const Calculator = lazy(() => import('./components/Calculator'));
const FAQ = lazy(() => import('./components/FAQ'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const WhatsAppWidget = lazy(() => import('./components/WhatsAppWidget'));
const StatsBar = lazy(() => import('./components/StatsBar'));
const TrustBar = lazy(() => import('./components/TrustBar'));
const WhyUs = lazy(() => import('./components/WhyUs'));
const MobileCTA = lazy(() => import('./components/MobileCTA'));
const BackToTop = lazy(() => import('./components/BackToTop').then(module => ({ default: module.BackToTop })));

export let lenis: Lenis | null = null;

export default function App() {
  // Initialize Lenis
  useEffect(() => {
    // Check if the user prefers reduced motion. If so, skip smooth scrolling.
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      return;
    }

    lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    } as any);

    function raf(time: number) {
      lenis?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // Smooth scroll for anchor links
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement;
      if (anchor) {
        e.preventDefault();
        const id = anchor.getAttribute('href')?.slice(1);
        if (id) {
          const el = document.getElementById(id);
          if (el) {
            if (lenis) {
              lenis.scrollTo(el, { offset: -80 });
            } else {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="min-h-screen text-foreground bg-background antialiased">
      <SmoothCursor />
      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main>
        {/* 1. Hero */}
        <Hero />

        {/* Suspense boundary for below-the-fold content */}
        <Suspense fallback={<div className="h-screen bg-background" />}>
          {/* 1.5 Stats Bar */}
          <StatsBar />
          <SectionDivider type="wave" color="text-[var(--color-bg-secondary)]" />

          {/* 2. Problem / Solution */}
          <ProblemSolution />
          <SectionDivider type="slant" color="text-[var(--color-bg-primary)]" />

          {/* 3. Service Packages */}
          <Packages />
          <SectionDivider type="curve" color="text-[var(--color-bg-secondary)]" />

          {/* Technology Trust Bar */}
          <TrustBar />

          {/* 4. Capabilities */}
          <Capabilities />
          <SectionDivider type="wave" color="text-[var(--color-bg-primary)]" />

          {/* 5. Industries */}
          <Industries />
          <SectionDivider type="slant" color="text-[var(--color-bg-primary)]" />

          {/* 6. Care Plans */}
          <CarePlans />
          <SectionDivider type="curve" color="text-[var(--color-bg-secondary)]" />

          {/* 6.5 Why Us */}
          <WhyUs />
          <SectionDivider type="wave" color="text-[var(--color-bg-secondary)]" />

          {/* 7. Portfolio / Case Studies */}
          <Portfolio />
          <SectionDivider type="slant" color="text-[var(--color-bg-primary)]" />

          {/* 8. How We Work */}
          <Process />
          <SectionDivider type="curve" color="text-[var(--color-bg-primary)]" />

          {/* 9. Service Calculator */}
          <Calculator />
          <SectionDivider type="wave" color="text-[var(--color-bg-secondary)]" />

          {/* 10. FAQ */}
          <FAQ />
          <SectionDivider type="slant" color="text-[var(--color-bg-secondary)]" />

          {/* 11. Contact */}
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        {/* Footer */}
        <Footer />

        {/* Floating WhatsApp Widget */}
        <WhatsAppWidget />

        {/* Sticky Mobile CTA */}
        <MobileCTA />

        {/* Back to top FAB */}
        <BackToTop />
      </Suspense>
    </div>
  );
}
