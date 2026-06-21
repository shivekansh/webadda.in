import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate, animate, useReducedMotion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { lenis } from '../App';
import { ArrowRight, TrendingUp, Globe, Star } from 'lucide-react';
import { SplitText } from '../utils/textSplitter';
import { FlipWords } from './ui/flip-words';
import { useMagnetic } from '../hooks/useMagnetic';

const stats = [
  { value: '3–7 Days', label: 'Avg. Launch Time', icon: '⚡' },
  { value: '₹3,500', label: 'Starting Price', icon: '💰' },
  { value: '100%', label: 'Remote Delivery', icon: '🌏' },
  { value: '24/7', label: 'WhatsApp Support', icon: '💬' },
];

const floatingCards = [
  {
    id: 1,
    icon: TrendingUp,
    title: 'More Walk-ins & Calls',
    sub: '+240% avg. visibility boost',
    color: 'from-blue-500/20 to-blue-600/10',
    border: 'border-blue-500/20',
    iconColor: 'text-blue-400',
    delay: 0,
    parallax: ['0%', '-30%'] // fastest parallax
  },
  {
    id: 2,
    icon: Globe,
    title: 'Rank on Google',
    sub: 'SEO + GBP Setup included',
    color: 'from-emerald-500/20 to-emerald-600/10',
    border: 'border-emerald-500/20',
    iconColor: 'text-emerald-400',
    delay: 0.8,
    parallax: ['0%', '-20%']
  },
  {
    id: 3,
    icon: Star,
    title: 'Instant Credibility',
    sub: 'Look premium online',
    color: 'from-violet-500/20 to-violet-600/10',
    border: 'border-violet-500/20',
    iconColor: 'text-violet-400',
    delay: 1.6,
    parallax: ['0%', '-10%']
  },
];

// Canvas particle background
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    
    // Detect mobile to disable for performance
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let lastTime = performance.now();
    
    interface Particle {
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; 
      hue: number; hueSpeed: number;
      isBg: boolean;
      spark?: boolean;
      life?: number;
    }
    
    const particles: Particle[] = [];

    const resize = () => {
      // Handle high DPI
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    let mouseX = -1000;
    let mouseY = -1000;
    let lastMouseX = -1000;
    let lastMouseY = -1000;
    let velocityAverages: number[] = [0,0,0,0,0];

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const baseHues = [217, 262, 160]; // Blue, Violet, Emerald

    const init = () => {
      particles.length = 0;
      // Increased density for fg, and added bg
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const fgCount = Math.floor((w * h) / 12000);
      const bgCount = Math.floor((w * h) / 10000);
      
      // Foreground
      for (let i = 0; i < fgCount; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.4 + 0.1,
          hue: baseHues[Math.floor(Math.random() * baseHues.length)],
          hueSpeed: (Math.random() - 0.5) * 20, // deg per sec
          isBg: false
        });
      }
      
      // Background
      for (let i = 0; i < bgCount; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.05,
          vy: (Math.random() - 0.5) * 0.05,
          size: Math.random() * 2 + 1, // larger
          opacity: Math.random() * 0.1 + 0.02, // much fainter
          hue: baseHues[Math.floor(Math.random() * baseHues.length)],
          hueSpeed: (Math.random() - 0.5) * 10,
          isBg: true
        });
      }
    };

      let isRunning = true;

      const draw = (time: number) => {
        if (!isRunning) return;
        
        const dt = (time - lastTime) / 1000;
        lastTime = time;
        
        const w = canvas.offsetWidth;
        const h = canvas.offsetHeight;
        ctx.clearRect(0, 0, w, h);

      // Track mouse velocity
      let mouseVel = 0;
      if (lastMouseX !== -1000 && mouseX !== -1000) {
        const dx = mouseX - lastMouseX;
        const dy = mouseY - lastMouseY;
        mouseVel = Math.sqrt(dx * dx + dy * dy);
      }
      lastMouseX = mouseX;
      lastMouseY = mouseY;
      
      velocityAverages.shift();
      velocityAverages.push(mouseVel);
      const avgVel = velocityAverages.reduce((a, b) => a + b) / velocityAverages.length;

      // Draw background first
      const bgParticles = particles.filter(p => p.isBg);
      const fgParticles = particles.filter(p => !p.isBg && !p.spark);
      
      bgParticles.forEach(p => {
        p.hue += p.hueSpeed * dt;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, ${p.opacity})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      });

      // Draw fg connections
      fgParticles.forEach((p, i) => {
        fgParticles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            const avgHue = (p.hue + p2.hue) / 2;
            
            // Check if near mouse for brightness bump
            let lineOp = 0.08 * (1 - dist / 150);
            if (mouseX !== -1000) {
              const dMouse = Math.min(
                Math.hypot(p.x - mouseX, p.y - mouseY),
                Math.hypot(p2.x - mouseX, p2.y - mouseY)
              );
              if (dMouse < 100) lineOp *= 2.5;
            }
            
            ctx.strokeStyle = `hsla(${avgHue}, 80%, 60%, ${lineOp})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      // Draw fg particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        if (p.isBg) continue;
        
        p.hue += p.hueSpeed * dt;
        
        // Mouse interaction
        let drawOp = p.opacity;
        if (mouseX !== -1000 && !p.spark) {
          const dxMouse = mouseX - p.x;
          const dyMouse = mouseY - p.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          
          if (distMouse < 150) {
            p.vx += dxMouse * 0.0003;
            p.vy += dyMouse * 0.0003;
            
            if (avgVel > 30 && distMouse < 50) {
              drawOp = Math.min(0.8, p.opacity + 0.5);
              // Emit spark occasionally
              if (Math.random() < 0.05) {
                particles.push({
                  x: p.x, y: p.y,
                  vx: (Math.random() - 0.5) * 5 + dxMouse * 0.05,
                  vy: (Math.random() - 0.5) * 5 + dyMouse * 0.05,
                  size: Math.random() * 2 + 1,
                  opacity: 1,
                  hue: p.hue,
                  hueSpeed: 0,
                  isBg: false,
                  spark: true,
                  life: 1.0
                });
              }
            }
          }
        }

        // Sparks
        if (p.spark) {
          p.life! -= dt * 2;
          drawOp = p.life!;
          if (p.life! <= 0) {
            particles.splice(i, 1);
            continue;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, ${drawOp})`;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (!p.spark) {
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > 1.5) {
            p.vx = (p.vx / speed) * 1.5;
            p.vy = (p.vy / speed) * 1.5;
          }
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    init();
    animId = requestAnimationFrame(draw);

    let resizeTimeout: NodeJS.Timeout;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resize();
        init();
      }, 200);
    });
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (!isRunning) {
          isRunning = true;
          lastTime = performance.now();
          animId = requestAnimationFrame(draw);
        }
      } else {
        isRunning = false;
        cancelAnimationFrame(animId);
      }
    });
    intersectionObserver.observe(canvas);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-60 hidden md:block"
      style={{ pointerEvents: 'none' }}
    />
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  
  // Base scroll progress for the section
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  
  // Parallax layers
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Magnetic buttons
  const btnWhatsApp = useMagnetic();
  const btnPackages = useMagnetic();

  const hue1 = useMotionValue(0);
  const hue2 = useMotionValue(0);
  const hue3 = useMotionValue(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const controls1 = animate(hue1, 360, { duration: 20, repeat: Infinity, ease: 'linear' });
    const controls2 = animate(hue2, -360, { duration: 25, repeat: Infinity, ease: 'linear' });
    const controls3 = animate(hue3, 360, { duration: 30, repeat: Infinity, ease: 'linear' });
    return () => {
      controls1.stop();
      controls2.stop();
      controls3.stop();
    };
  }, [shouldReduceMotion]);

  const filter1 = useMotionTemplate`blur(120px) hue-rotate(${hue1}deg)`;
  const filter2 = useMotionTemplate`blur(100px) hue-rotate(${hue2}deg)`;
  const filter3 = useMotionTemplate`blur(100px) hue-rotate(${hue3}deg)`;

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
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden mesh-bg grid-bg"
    >
      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Gradient overlays with parallax */}
      <motion.div style={{ y: shouldReduceMotion ? 0 : yBg }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-background" />
        
        {!shouldReduceMotion && (
          <>
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.15, 0.25, 0.15] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ filter: filter1 }}
              className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-600/8"
            />
            <motion.div
              animate={{ scale: [1, 1.12, 1], opacity: [0.1, 0.18, 0.1] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              style={{ filter: filter2 }}
              className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-violet-600/8"
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.14, 0.08] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
              style={{ filter: filter3 }}
              className="absolute top-1/2 right-1/3 w-[400px] h-[400px] rounded-full bg-emerald-600/6"
            />
          </>
        )}
      </motion.div>

      {/* Floating Cards - Desktop with Parallax */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        {floatingCards.map((card) => {
          const cardY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0%', '0%'] : card.parallax);
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + card.delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                y: cardY,
                ...(card.id === 1 ? { top: '22%', right: '6%' } : {}),
                ...(card.id === 2 ? { top: '55%', right: '4%' } : {}),
                ...(card.id === 3 ? { top: '38%', left: '3%' } : {}),
              }}
              className={`animate-float${card.id === 2 ? '-delayed' : ''}`}
            >
              <div className={`glass rounded-2xl px-4 py-3 flex items-center gap-3 border ${card.border} bg-gradient-to-br ${card.color} min-w-[200px]`}>
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${card.color} border ${card.border} flex items-center justify-center flex-shrink-0`}>
                  <card.icon className={`w-4.5 h-4.5 ${card.iconColor}`} />
                </div>
                <div>
                  <p className="text-foreground text-sm font-semibold leading-tight">{card.title}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{card.sub}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

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
          className="text-[clamp(2.6rem,6vw,5.2rem)] font-extrabold leading-[1.05] tracking-tighter mb-6"
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
          className="text-xl md:text-2xl lg:text-3xl font-semibold text-muted-foreground mb-6 flex items-center justify-center flex-wrap gap-x-1"
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
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10"
        >
          We build modern, conversion-focused websites for local businesses across India.
          <span className="text-foreground font-semibold ml-1">Starting at ₹3,500.</span>
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
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp Us Free
          </motion.button>
          <motion.button
            ref={btnPackages.ref as unknown as React.Ref<HTMLButtonElement>}
            onMouseMove={btnPackages.handleMouseMove}
            onMouseLeave={btnPackages.handleMouseLeave}
            style={{ x: btnPackages.springX, y: btnPackages.springY }}
            onClick={scrollToPackages}
            className="btn-ghost px-7 py-4 text-[15px] flex items-center gap-2 w-full sm:w-auto justify-center group"
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

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="glass rounded-2xl p-4 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 + i * 0.1 }}
              className="flex flex-col items-center text-center py-2"
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-lg md:text-xl font-bold text-foreground mb-0.5">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="mt-8 flex items-center justify-center gap-3 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            ))}
          </div>
          <span>No upfront payment · Quote in 24 hrs · Pan-India delivery</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <button
          onClick={() => {
            const el = document.getElementById('problem');
            if (el) {
              if (lenis) {
                lenis.scrollTo(el, { offset: -80 });
              } else {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }}
          className="flex flex-col items-center gap-2 text-muted-foreground cursor-pointer hover:text-foreground transition-colors border-none bg-transparent"
          aria-label="Scroll down"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-current">
              <rect x="2" y="2" width="20" height="32" rx="10" strokeWidth="2" strokeOpacity="0.5" />
              <motion.path
                d="M12 10L12 16"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0, y: 0 }}
                animate={{ pathLength: 1, opacity: [0, 1, 0], y: [0, 6] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
              />
            </svg>
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
}
