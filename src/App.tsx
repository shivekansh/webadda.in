import { useEffect } from 'react';
import Lenis from 'lenis';
import { SmoothCursor } from './components/ui/smooth-cursor';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import Packages from './components/Packages';
import Capabilities from './components/Capabilities';
import Industries from './components/Industries';
import CarePlans from './components/CarePlans';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import Calculator from './components/Calculator';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import StatsBar from './components/StatsBar';
import TrustBar from './components/TrustBar';
import WhyUs from './components/WhyUs';
import SectionDivider from './components/SectionDivider';
import MobileCTA from './components/MobileCTA';
import { BackToTop } from './components/BackToTop';

export let lenis: Lenis | null = null;

export default function App() {
  // Initialize Lenis
  useEffect(() => {
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
          if (el && lenis) lenis.scrollTo(el, { offset: -80 });
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
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Widget */}
      <WhatsAppWidget />

      {/* Sticky Mobile CTA */}
      <MobileCTA />

      {/* Back to top FAB */}
      <BackToTop />
    </div>
  );
}
