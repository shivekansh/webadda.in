import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { Menu, X, Sparkles, Crown, Shield, ArrowRight, Sun, Moon } from 'lucide-react';
import { lenis } from '../App';
import { MagneticButton } from './MagneticButton';
import { useTheme } from './theme-provider';
import { AnimatedThemeToggler } from './ui/animated-theme-toggler';

function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-violet-500 origin-left z-[60]"
      style={{ scaleX }}
    />
  );
}

const navLinks = [
  { label: 'Services', href: '#packages' },
  { label: 'What We Build', href: '#capabilities' },
  { label: 'Industries', href: '#industries' },
  { label: 'Care Plans', href: '#care-plans' },
  { label: 'Process', href: '#process' },
  { label: 'FAQ', href: '#faq' },
];

const sectionColors: Record<string, string> = {
  packages: 'bg-emerald-500/12 border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.15)]',
  capabilities: 'bg-blue-500/12 border-blue-500/20 shadow-[0_0_12px_rgba(59,130,246,0.15)]',
  industries: 'bg-indigo-500/12 border-indigo-500/20 shadow-[0_0_12px_rgba(99,102,241,0.15)]',
  'care-plans': 'bg-emerald-500/12 border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.15)]',
  process: 'bg-violet-500/12 border-violet-500/20 shadow-[0_0_12px_rgba(139,92,246,0.15)]',
  faq: 'bg-amber-500/12 border-amber-500/20 shadow-[0_0_12px_rgba(245,158,11,0.15)]',
  contact: 'bg-blue-500/12 border-blue-500/20 shadow-[0_0_12px_rgba(59,130,246,0.15)]',
  hero: 'bg-blue-500/12 border-blue-500/20 shadow-[0_0_12px_rgba(59,130,246,0.15)]',
};

const servicesDropdown = [
  { icon: Zap, name: 'Starter', desc: 'Basic online presence', price: '₹3,500', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { icon: Sparkles, name: 'Growth', desc: 'Lead generation site', price: '₹10,000', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { icon: Crown, name: 'Premium', desc: 'Full digital system', price: '₹25,000+', color: 'text-violet-400', bg: 'bg-violet-500/10' },
  { icon: Shield, name: 'Care Plans', desc: 'Monthly maintenance', price: '₹999/mo', color: 'text-amber-400', bg: 'bg-amber-500/10' }
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const hideMegaMenuTimeout = useRef<NodeJS.Timeout | null>(null);
  const { theme, setTheme } = useTheme();

  const { scrollY } = useScroll();
  
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const updateTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Continuous scroll morphing
  const navWidth = useTransform(scrollY, [0, 200], ['92%', '96%']);
  const bgOpacity = useTransform(scrollY, [0, 200], [0, 0.85]);
  const blur = useTransform(scrollY, [0, 200], [0, 24]);
  const borderOpacity = useTransform(scrollY, [0, 200], [0, 0.12]);
  
  const bgDark = useMotionTemplate`rgba(17, 24, 39, ${bgOpacity})`;
  const bgLight = useMotionTemplate`rgba(255, 255, 255, ${bgOpacity})`;
  const backgroundColor = isDark ? bgDark : bgLight;

  const backdropFilter = useMotionTemplate`blur(${blur}px)`;

  const borderDark = useMotionTemplate`rgba(148, 163, 184, ${borderOpacity})`;
  const borderLight = useMotionTemplate`rgba(226, 232, 240, ${borderOpacity})`;
  const borderColor = isDark ? borderDark : borderLight;

  const shadowDark = useTransform(scrollY, [0, 200], ['none', '0 25px 50px -12px rgba(0, 0, 0, 0.4)']);
  const shadowLight = useTransform(scrollY, [0, 200], ['none', '0 25px 50px -12px rgba(0, 0, 0, 0.1)']);
  const boxShadow = isDark ? shadowDark : shadowLight;

  useEffect(() => {
    const sections = navLinks.map(l => l.href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -60% 0px' }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    }
    return () => {
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    setShowMegaMenu(false);
    const el = document.querySelector(href);
    if (el) {
      if (lenis) {
        lenis.scrollTo(el as HTMLElement, { offset: -80 });
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleMouseEnterServices = () => {
    if (hideMegaMenuTimeout.current) clearTimeout(hideMegaMenuTimeout.current);
    setShowMegaMenu(true);
  };

  const handleMouseLeaveServices = () => {
    hideMegaMenuTimeout.current = setTimeout(() => {
      setShowMegaMenu(false);
    }, 150);
  };

  const ThemeToggle = () => (
    <AnimatedThemeToggler
      theme={theme}
      onThemeChange={setTheme}
      variant="circle"
      className="p-2 rounded-xl text-slate-400 hover:text-foreground hover:bg-slate-800/50 dark:hover:bg-white/10 transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center relative z-[60]"
    />
  );

  return (
    <>
      <ReadingProgress />
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: navWidth }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-6xl"
      >
        <motion.div 
          style={{ backgroundColor, backdropFilter, borderColor, borderWidth: 1, boxShadow }}
          className="rounded-2xl px-5 py-3 flex items-center justify-between relative"
        >
          {/* Logo */}
          <motion.a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2.5 group z-10"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img src="/favicon.png" alt="webadda.in logo" className="w-8 h-8 object-contain rounded-lg" />
            <div>
              <span className="font-bold text-foreground text-[15px] tracking-tight">
                webadda.in
              </span>
            </div>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 z-10">
            {navLinks.map((link) => {
              const isServices = link.label === 'Services';
              
              return (
                <div 
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => {
                    setHoveredSection(link.href.replace('#', ''));
                    if (isServices) handleMouseEnterServices();
                  }}
                  onMouseLeave={() => {
                    setHoveredSection(null);
                    if (isServices) handleMouseLeaveServices();
                  }}
                >
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={`relative px-3.5 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                      activeSection === link.href.replace('#', '')
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    aria-expanded={isServices ? showMegaMenu : undefined}
                  >
                    {/* Active Indicator */}
                    {activeSection === link.href.replace('#', '') && (
                      <motion.div
                        layoutId="nav-pill"
                        className={`absolute inset-0 rounded-xl border ${sectionColors[activeSection] || 'bg-blue-500/12 border-blue-500/20 shadow-[0_0_12px_rgba(59,130,246,0.08)]'}`}
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    
                    {/* Hover Preview Indicator */}
                    {hoveredSection === link.href.replace('#', '') && activeSection !== link.href.replace('#', '') && (
                      <motion.div
                        layoutId="nav-pill-preview"
                        className="absolute inset-0 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    
                    <span className="relative">{link.label}</span>
                  </button>

                  {/* Mega Dropdown for Services */}
                  {isServices && (
                    <AnimatePresence>
                      {showMegaMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, x: "-100px" }}
                          animate={{ opacity: 1, y: 0, x: "-100px" }}
                          exit={{ opacity: 0, y: 8, x: "-100px" }}
                          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                          className="absolute top-[calc(100%+16px)] left-0 w-[700px] lg:w-[800px] bg-background border border-border rounded-2xl p-6 shadow-2xl z-50 cursor-default"
                          onMouseEnter={handleMouseEnterServices}
                          onMouseLeave={handleMouseLeaveServices}
                        >
                          <div className="absolute -top-3 left-[140px] w-6 h-6 rotate-45 border-l border-t border-border bg-background z-[-1]" />
                          
                          <div className="grid grid-cols-4 gap-4">
                            {servicesDropdown.map((service, idx) => (
                              <button 
                                key={idx}
                                onClick={() => handleNavClick('#packages')}
                                className="group text-left p-4 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200 border border-transparent hover:border-black/10 dark:hover:border-white/10"
                              >
                                <div className={`w-10 h-10 rounded-lg ${service.bg} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                                  <service.icon className={`w-5 h-5 ${service.color}`} />
                                </div>
                                <h4 className="text-foreground font-bold mb-1">{service.name}</h4>
                                <p className="text-xs text-muted-foreground mb-4">{service.desc}</p>
                                <div className="flex items-center justify-between text-sm">
                                  <span className={service.color}>{service.price}</span>
                                  <ArrowRight className={`w-4 h-4 text-slate-500 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 ${service.color}`} />
                                </div>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-2.5 z-10">
            <ThemeToggle />
            <MagneticButton
              as="a"
              href="https://wa.me/919997954148?text=Hi!%20I'm%20interested%20in%20learning%20more%20about%20your%20website%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp px-4 py-2 text-sm flex items-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Us
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2 z-10">
            <ThemeToggle />
            <button
              className="p-2 rounded-xl text-slate-400 hover:text-foreground hover:bg-slate-800/50 dark:hover:bg-white/10 transition-all duration-200 min-h-[48px] min-w-[48px] flex items-center justify-center"
              onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
          </div>
        </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-2 glass-nav rounded-2xl p-4 shadow-2xl shadow-black/50 relative z-10"
            >
              <div className="flex flex-col gap-1 mb-4">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleNavClick(link.href)}
                    className="text-left px-4 py-3 min-h-[48px] flex items-center text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl transition-all duration-200"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>
              <a
                href="https://wa.me/919997954148?text=Hi!%20I'm%20interested%20in%20learning%20more%20about%20your%20website%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp px-4 py-3 text-sm flex items-center justify-center gap-2 w-full"
                onClick={() => setMenuOpen(false)}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us Now
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};
