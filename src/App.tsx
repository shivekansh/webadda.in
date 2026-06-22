import { useEffect, lazy, Suspense, useState } from 'react';
import Lenis from 'lenis';
import { SmoothCursor } from './components/ui/smooth-cursor';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import SectionDivider from './components/SectionDivider';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoaderOne } from './components/ui/loader';
import NotFound from './components/NotFound';
import { RenderOnScroll } from './components/RenderOnScroll';

// Legal pages
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./components/TermsOfService'));
const ClassLink = lazy(() => import('./components/ClassLink'));

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

export const navigate = (path: string) => {
  const url = new URL(window.location.href);
  if (path === '/') {
    url.searchParams.delete('p');
  } else {
    url.searchParams.set('p', path.replace(/^\//, ''));
  }
  // Keep the hash if navigating to home so scrolling works
  if (path !== '/' && url.hash) {
    url.hash = '';
  }
  window.history.pushState({}, '', url.toString());
  window.dispatchEvent(new Event('pushstate'));
};

export default function App() {
  const getInitialPath = () => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get('p');
    return p ? `/${p}` : '/';
  };

  const [currentPath, setCurrentPath] = useState(getInitialPath());

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(getInitialPath());
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('pushstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('pushstate', handleLocationChange);
    };
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
      <Suspense fallback={<LoaderOne className="w-full h-screen" />}>
        <ErrorBoundary>
          <PrivacyPolicy />
        </ErrorBoundary>
      </Suspense>
    );
  }

  if (currentPath === '/terms-of-service') {
    return (
      <Suspense fallback={<LoaderOne className="w-full h-screen" />}>
        <ErrorBoundary>
          <TermsOfService />
        </ErrorBoundary>
      </Suspense>
    );
  }

  const classRoutes = ['/class6', '/class7', '/class8', '/class9', '/class10', '/class11', '/class12'];
  if (classRoutes.includes(currentPath)) {
    return (
      <Suspense fallback={<LoaderOne className="min-h-[200px]" />}>
        <ErrorBoundary>
          <ClassLink />
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
        <ErrorBoundary>
          <Hero />
        </ErrorBoundary>
        {/* 2. Problem/Solution */}
        <RenderOnScroll fallback={<LoaderOne className="h-[200px]" />}>
          <ErrorBoundary>
            <StatsBar />
            <SectionDivider type="wave" color="text-[var(--color-bg-secondary)]" />
          </ErrorBoundary>
        </RenderOnScroll>

        <RenderOnScroll fallback={<LoaderOne className="h-[200px]" />}>
          <ErrorBoundary>
            <ProblemSolution />
            <SectionDivider type="slant" color="text-[var(--color-bg-primary)]" />
          </ErrorBoundary>
        </RenderOnScroll>

        <RenderOnScroll fallback={<div className="min-h-[40vh]" />}>
          <ErrorBoundary>
            <Packages />
            <SectionDivider type="curve" color="text-[var(--color-bg-secondary)]" />
          </ErrorBoundary>
        </RenderOnScroll>

        <RenderOnScroll fallback={<div className="min-h-[10vh]" />}>
          <ErrorBoundary>
            <TrustBar />
          </ErrorBoundary>
        </RenderOnScroll>

        <RenderOnScroll fallback={<div className="min-h-[40vh]" />}>
          <ErrorBoundary>
            <Capabilities />
            <SectionDivider type="wave" color="text-[var(--color-bg-primary)]" />
          </ErrorBoundary>
        </RenderOnScroll>

        <RenderOnScroll fallback={<div className="min-h-[40vh]" />}>
          <ErrorBoundary>
            <Industries />
            <SectionDivider type="slant" color="text-[var(--color-bg-primary)]" />
          </ErrorBoundary>
        </RenderOnScroll>

        <RenderOnScroll fallback={<div className="min-h-[40vh]" />}>
          <ErrorBoundary>
            <CarePlans />
            <SectionDivider type="curve" color="text-[var(--color-bg-secondary)]" />
          </ErrorBoundary>
        </RenderOnScroll>

        <RenderOnScroll fallback={<div className="min-h-[40vh]" />}>
          <ErrorBoundary>
            <WhyUs />
            <SectionDivider type="wave" color="text-[var(--color-bg-secondary)]" />
          </ErrorBoundary>
        </RenderOnScroll>

        <RenderOnScroll fallback={<div className="min-h-[40vh]" />}>
          <ErrorBoundary>
            <Portfolio />
            <SectionDivider type="slant" color="text-[var(--color-bg-primary)]" />
          </ErrorBoundary>
        </RenderOnScroll>

        <RenderOnScroll fallback={<div className="min-h-[40vh]" />}>
          <ErrorBoundary>
            <Process />
            <SectionDivider type="curve" color="text-[var(--color-bg-primary)]" />
          </ErrorBoundary>
        </RenderOnScroll>

        <RenderOnScroll fallback={<div className="min-h-[40vh]" />}>
          <ErrorBoundary>
            <Calculator />
            <SectionDivider type="wave" color="text-[var(--color-bg-secondary)]" />
          </ErrorBoundary>
        </RenderOnScroll>

        <RenderOnScroll fallback={<div className="min-h-[40vh]" />}>
          <ErrorBoundary>
            <FAQ />
            <SectionDivider type="slant" color="text-[var(--color-bg-secondary)]" />
          </ErrorBoundary>
        </RenderOnScroll>

        <RenderOnScroll fallback={<div className="min-h-[40vh]" />}>
          <ErrorBoundary>
            <Contact />
          </ErrorBoundary>
        </RenderOnScroll>
      </main>

      <Suspense fallback={<LoaderOne className="h-24 mt-auto" />}>
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
