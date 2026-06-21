import { useEffect, lazy, Suspense, useState } from 'react';
import Lenis from 'lenis';
import { SmoothCursor } from './components/ui/smooth-cursor';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import SectionDivider from './components/SectionDivider';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Skeleton } from './components/ui/skeleton';
import NotFound from './components/NotFound';

// Legal pages
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./components/TermsOfService'));

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
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Initialize Lenis
  useEffect(() => {
    // Check if the user prefers reduced motion. If so, skip smooth scrolling.
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      return;
    }

    // Pass standard options, avoiding deprecated ones without breaking types
    lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

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
        const id = anchor.getAttribute('href')?.slice(1);
        if (id) {
          // If it's skip-to-content, handle focus explicitly
          if (id === 'main-content') {
            const mainContent = document.getElementById(id);
            if (mainContent) {
              e.preventDefault();
              mainContent.focus();
              mainContent.scrollIntoView();
            }
            return;
          }
          
          e.preventDefault();
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

  if (currentPath === '/privacy-policy') {
    return (
      <Suspense fallback={<Skeleton className="w-full h-screen rounded-none opacity-20" />}>
        <ErrorBoundary>
          <PrivacyPolicy />
        </ErrorBoundary>
      </Suspense>
    );
  }

  if (currentPath === '/terms-of-service') {
    return (
      <Suspense fallback={<Skeleton className="w-full h-screen rounded-none opacity-20" />}>
        <ErrorBoundary>
          <TermsOfService />
        </ErrorBoundary>
      </Suspense>
    );
  }

  if (currentPath !== '/') {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen text-foreground bg-background antialiased">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:font-bold focus:rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        Skip to content
      </a>
      
      <SmoothCursor />
      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        {/* 1. Hero */}
        <Hero />

        {/* Suspense boundary for below-the-fold content */}
        <Suspense fallback={<Skeleton className="w-full h-[50vh] rounded-none opacity-20" />}>
          <ErrorBoundary>
            <StatsBar />
            <SectionDivider type="wave" color="text-[var(--color-bg-secondary)]" />
          </ErrorBoundary>

          <ErrorBoundary>
            <ProblemSolution />
            <SectionDivider type="slant" color="text-[var(--color-bg-primary)]" />
          </ErrorBoundary>

          <ErrorBoundary>
            <Packages />
            <SectionDivider type="curve" color="text-[var(--color-bg-secondary)]" />
          </ErrorBoundary>

          <ErrorBoundary>
            <TrustBar />
          </ErrorBoundary>

          <ErrorBoundary>
            <Capabilities />
            <SectionDivider type="wave" color="text-[var(--color-bg-primary)]" />
          </ErrorBoundary>

          <ErrorBoundary>
            <Industries />
            <SectionDivider type="slant" color="text-[var(--color-bg-primary)]" />
          </ErrorBoundary>

          <ErrorBoundary>
            <CarePlans />
            <SectionDivider type="curve" color="text-[var(--color-bg-secondary)]" />
          </ErrorBoundary>

          <ErrorBoundary>
            <WhyUs />
            <SectionDivider type="wave" color="text-[var(--color-bg-secondary)]" />
          </ErrorBoundary>

          <ErrorBoundary>
            <Portfolio />
            <SectionDivider type="slant" color="text-[var(--color-bg-primary)]" />
          </ErrorBoundary>

          <ErrorBoundary>
            <Process />
            <SectionDivider type="curve" color="text-[var(--color-bg-primary)]" />
          </ErrorBoundary>

          <ErrorBoundary>
            <Calculator />
            <SectionDivider type="wave" color="text-[var(--color-bg-secondary)]" />
          </ErrorBoundary>

          <ErrorBoundary>
            <FAQ />
            <SectionDivider type="slant" color="text-[var(--color-bg-secondary)]" />
          </ErrorBoundary>

          <ErrorBoundary>
            <Contact />
          </ErrorBoundary>
        </Suspense>
      </main>

      <Suspense fallback={<Skeleton className="w-full h-24 mt-auto rounded-none opacity-10" />}>
        <ErrorBoundary>
          <Footer />
        </ErrorBoundary>

        <ErrorBoundary>
          <WhatsAppWidget />
        </ErrorBoundary>

        <ErrorBoundary>
          <MobileCTA />
        </ErrorBoundary>

        <ErrorBoundary>
          <BackToTop />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}
