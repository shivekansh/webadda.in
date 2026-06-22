import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef, useEffect, useState, lazy, Suspense } from 'react';
import { lenis } from '../App';
import { ArrowRight, Star } from 'lucide-react';
import { SplitText } from '../utils/textSplitter';
import { FlipWords } from './ui/flip-words';
import { useMagnetic } from '../hooks/useMagnetic';

const Hero3DCanvas = lazy(() => import('./Hero3DCanvas'));

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Base scroll progress for the section
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const [isMobile, setIsMobile] = useState(false);

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Magnetic buttons
  const btnWhatsApp = useMagnetic();
  const btnPackages = useMagnetic();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // init
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleWhatsApp = () => {
    window.open(
      'https://wa.me/919997954148?text=Hi!%20I%27m%20interested%20in%20getting%20a%20website%20for%20my%20business.%20Can%20you%20share%20more%20details%3F',
      '_blank'
    );
  };

  const scrollToPackages = () => {
    const el = document.getElementById('packages');
    if (el) {
      if (lenis) {
        lenis.scrollTo(el, { offset: -80 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden mesh-bg grid-bg dark"
    >
      {/* ShaderGradient Canvas - Lazy Loaded for Desktop only */}
      {!shouldReduceMotion && !isMobile && (
        <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent" />}>
          <Hero3DCanvas />
        </Suspense>
      )}

      {/* Main Content */}
      <motion.div style={{ opacity }} className="relative z-10 max-w-5xl mx-auto px-5 text-center pt-24 pb-16">

        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="tag tag-blue flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Trusted by Local Businesses Across India
          </div>
        </motion.div>

        {/* Main Headline with Split Text */}
        <h1
          className="text-[clamp(2.2rem,8vw,5.2rem)] font-extrabold leading-[1.05] tracking-tighter mb-6 text-white"
        >
          <SplitText text="Your Business Deserves" type="words" delay={0.4} />
          <br />
          <SplitText className="text-gradient-mixed" text="a Website That Works" type="words" delay={0.8} />
        </h1>

        {/* Value Proposition Flip Words */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="text-xl md:text-2xl lg:text-3xl font-semibold text-white/90 mb-6 flex items-center justify-center flex-wrap gap-x-1"
        >
          <span>Get More</span>
          <FlipWords
            words={["Calls", "Leads", "Customers", "Bookings", "Walk-ins"]}
            className="text-blue-400 font-bold"
          />
        </motion.div>

        {/* Subheadline with fade stagger */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          We build modern, conversion-focused websites for local businesses across India.
          <span className="text-white font-semibold ml-1">Starting at ₹3,500.</span>
        </motion.p>

        {/* CTA Buttons with Magnetic effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
        >
          <motion.button
            ref={btnWhatsApp.ref as unknown as React.Ref<HTMLButtonElement>}
            onMouseMove={btnWhatsApp.handleMouseMove}
            onMouseLeave={btnWhatsApp.handleMouseLeave}
            style={{ x: btnWhatsApp.springX, y: btnWhatsApp.springY }}
            onClick={handleWhatsApp}
            className="btn-whatsapp px-7 py-4 text-[15px] flex items-center gap-2.5 w-full sm:w-auto justify-center group"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp Us
          </motion.button>
          <motion.button
            ref={btnPackages.ref as unknown as React.Ref<HTMLButtonElement>}
            onMouseMove={btnPackages.handleMouseMove}
            onMouseLeave={btnPackages.handleMouseLeave}
            style={{ x: btnPackages.springX, y: btnPackages.springY }}
            onClick={scrollToPackages}
            className="btn-ghost !bg-white/5 !text-white !border-white/20 hover:!bg-white/10 px-7 py-4 text-[15px] flex items-center gap-2 w-full sm:w-auto justify-center group"
            whileHover="hover"
            whileTap={{ scale: 0.97, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
            variants={{ hover: { scale: 1.03 } }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            View Packages
            <motion.span variants={{ hover: { x: 4 } }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </motion.button>
        </motion.div>



        {/* Trust line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="mt-8 flex items-center justify-center gap-3 text-sm text-white/60"
        >
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
            ))}
          </div>
          <span>No upfront payment · Quote in 24 hrs · Pan-India delivery</span>
        </motion.div>
      </motion.div>


    </section>
  );
}
