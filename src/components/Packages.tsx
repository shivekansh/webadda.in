import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, Zap, Crown, ChevronDown } from 'lucide-react';
import { GlowingEffect } from './ui/glowing-effect';
import SwipeHint from './SwipeHint';

interface Package {
  id: string;
  name: string;
  tagline: string;
  priceRange: string;
  priceNote: string;
  idealFor: string;
  icon: React.ElementType;
  color: string;
  borderColor: string;
  bgGrad: string;
  iconBg: string;
  badgeText?: string;
  badgeColor?: string;
  features: string[];
  highlight: string;
  cta: string;
  ctaClass: string;
  whatsappMsg: string;
}

const packages: Package[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Get online quickly',
    priceRange: '₹3,500 – ₹7,000',
    priceNote: 'One-time project cost',
    idealFor: 'New businesses, freelancers, shops wanting a basic online presence',
    icon: Zap,
    color: 'text-blue-400',
    borderColor: 'border-blue-500/25',
    bgGrad: 'from-blue-500/8 to-blue-600/3',
    iconBg: 'bg-blue-500/15 border-blue-500/25',
    features: [
      'Up to 5 professional pages',
      'Mobile-responsive design',
      'Contact form + WhatsApp button',
      'Google Maps integration',
      'Basic SEO setup',
      'Social media links',
      'Delivered in 3–5 days',
      'Free 30-day support',
    ],
    highlight: 'Perfect for getting your first professional website up fast.',
    cta: 'Get Started',
    ctaClass: 'btn-ghost',
    whatsappMsg: "Hi! I'm interested in the Starter website package. Can you share more details?",
  },
  {
    id: 'growth',
    name: 'Growth',
    tagline: 'Grow your business online',
    priceRange: '₹10,000 – ₹20,000',
    priceNote: 'One-time project cost',
    idealFor: 'Restaurants, clinics, salons, gyms wanting more leads & better visibility',
    icon: Sparkles,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    bgGrad: 'from-emerald-500/10 to-blue-600/5',
    iconBg: 'bg-emerald-500/15 border-emerald-500/25',
    badgeText: 'Most Popular',
    badgeColor: 'tag-emerald',
    features: [
      'Everything in Starter',
      'Up to 10 custom-designed pages',
      'Online booking or order form',
      'Photo gallery & testimonials',
      'Advanced SEO + Google Business Profile',
      'WhatsApp chat widget',
      'Speed optimization',
      'Blog / news section',
      'Analytics setup',
      'Delivered in 7–10 days',
    ],
    highlight: 'The most popular choice: built for real lead generation and local visibility.',
    cta: 'WhatsApp Us',
    ctaClass: 'btn-whatsapp',
    whatsappMsg: "Hi! I'm interested in the Growth website package. Can you share more details?",
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'A complete digital system',
    priceRange: '₹25,000 – ₹50,000+',
    priceNote: 'Custom scoped project',
    idealFor: 'Established businesses needing full systems: ordering, bookings, dashboards',
    icon: Crown,
    color: 'text-violet-400',
    borderColor: 'border-violet-500/30',
    bgGrad: 'from-violet-500/10 to-violet-600/5',
    iconBg: 'bg-violet-500/15 border-violet-500/25',
    badgeText: 'Full System',
    badgeColor: 'tag-violet',
    features: [
      'Everything in Growth',
      'Custom web application (Next.js)',
      'Online ordering + payment gateway',
      'Inventory management panel',
      'Admin dashboard',
      'Customer login portal',
      'Multi-location support',
      'Advanced analytics & reporting',
      'Priority support & SLA',
      'Custom API integrations',
      'Delivered in 15–30 days',
    ],
    highlight: 'A full digital growth system: not just a website, but a business platform.',
    cta: 'Request Quote',
    ctaClass: 'btn-primary',
    whatsappMsg: "Hi! I'm interested in the Premium website package. Can you share a custom quote?",
  },
];

import { useTilt } from '../hooks/useTilt';
import { SplitText } from '../utils/textSplitter';

function PackageCard({ pkg, index }: { pkg: Package; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const isPopular = !!pkg.badgeText;

  const tilt = useTilt(6, { stiffness: 300, damping: 25 });

  const handleCTA = () => {
    const msg = encodeURIComponent(pkg.whatsappMsg);
    window.open(`https://wa.me/919997954148?text=${msg}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={`relative rounded-[25px] p-[1px] ${isPopular ? 'lg:-mt-4 lg:mb-4' : ''} group`}
      style={{ perspective: 1000 }}
    >
      {/* Glowing Effect Background layer */}
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        variant={pkg.id === 'growth' ? 'emerald' : pkg.id === 'premium' ? 'violet' : 'blue'}
      />
      
      {/* Static border layer beneath */}
      <div className={`absolute inset-0 rounded-[25px] border ${pkg.borderColor} transition-colors duration-500`} />

      {/* Popular badge */}
      {pkg.badgeText && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
          <span className={`tag ${pkg.badgeColor} px-4 py-1.5 text-xs shadow-lg`}>
            ⭐ {pkg.badgeText}
          </span>
        </div>
      )}

      <motion.div
        ref={tilt.ref as unknown as React.Ref<HTMLDivElement>}
        onMouseMove={tilt.handleMouseMove}
        onMouseLeave={() => { tilt.handleMouseLeave(); setFlipped(false); }}
        onMouseEnter={() => setFlipped(true)}
        style={{ 
          rotateX: tilt.rotateX, 
          rotateY: tilt.rotateY,
          boxShadow: tilt.boxShadow
        }}
        whileHover={{ scale: isPopular ? 1.01 : 1.015 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`relative bg-gradient-to-br ${pkg.bgGrad} rounded-[24px] overflow-hidden z-10`}
      >
        <motion.div 
          className="absolute inset-0 pointer-events-none z-0" 
          style={{ background: tilt.background }} 
        />
        
        {/* Shimmer sweep */}
        <div className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-0 group-hover:animate-shimmer" style={{ background: 'linear-gradient(to right, transparent, var(--color-border), transparent)' }} />

        
        {/* Front face */}
        <div
          className="relative p-7 cursor-pointer"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className={`w-12 h-12 rounded-2xl border ${pkg.iconBg} flex items-center justify-center`}>
              <pkg.icon className={`w-6 h-6 ${pkg.color}`} />
            </div>
            <div className="text-right">
              <div className={`text-xs font-medium ${pkg.color} mb-1`}>{pkg.tagline}</div>
              <div className="text-foreground font-bold text-2xl tracking-tighter">
                {pkg.name}
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="text-3xl font-extrabold text-foreground mb-1 tracking-tighter">
              {pkg.priceRange}
            </div>
            <div className="text-xs text-slate-500">{pkg.priceNote}</div>
          </div>

          {/* Ideal for */}
          <div className={`rounded-xl p-3 mb-6 bg-gradient-to-r ${pkg.bgGrad} border ${pkg.borderColor}`}>
            <div className="text-xs text-slate-500 mb-1 font-medium uppercase tracking-wider">Ideal for</div>
            <div className="text-sm text-muted-foreground">{pkg.idealFor}</div>
          </div>

          {/* Features */}
          <motion.ul 
            className="space-y-2.5 mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.05 }
              }
            }}
          >
            {pkg.features.map((f, i) => (
              <motion.li 
                key={i} 
                className="flex items-start gap-2.5 text-sm text-muted-foreground"
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <Check className={`w-4 h-4 ${pkg.color} flex-shrink-0 mt-0.5`} />
                <span>{f}</span>
              </motion.li>
            ))}
          </motion.ul>

          {/* Highlight reveal on hover */}
          <AnimatePresence>
            {flipped && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 8 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.2 }}
                className={`rounded-xl overflow-hidden`}
              >
                <div className={`p-3 bg-gradient-to-br ${pkg.bgGrad} border ${pkg.borderColor} rounded-xl overflow-hidden break-words`}>
                  <p className={`text-sm font-medium ${pkg.color} whitespace-normal break-words leading-relaxed`}>💡 {pkg.highlight}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA */}
          <motion.button
            onClick={handleCTA}
            className={`${pkg.ctaClass} w-full py-3.5 text-sm font-semibold flex items-center justify-center gap-2 group`}
            whileHover="hover"
            whileTap={{ scale: 0.98, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
            variants={{ hover: { scale: 1.02 } }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            {pkg.id === 'growth' && (
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            )}
            {pkg.cta}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Packages() {
  const [compareOpen, setCompareOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(1); // Set default active to center package if needed, but 0 is safer. Let's use 0.

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollPosition = container.scrollLeft;
    // Calculate the width of one full card including gap. Approximate by scrollWidth / count
    const itemWidth = container.scrollWidth / packages.length;
    const newActive = Math.round(scrollPosition / itemWidth);
    if (newActive !== activeTab && newActive >= 0 && newActive < packages.length) {
      setActiveTab(newActive);
    }
  };

  return (
    <section id="packages" className="section-padding mesh-bg relative overflow-hidden dot-grid">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
          whileInView={{ opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            className="flex justify-center mb-4"
          >
            <span className="tag tag-blue">Simple Pricing</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tighter"
          >
            <SplitText text="Transparent packages," type="words" delay={0.1} />
            <br />
            <SplitText className="text-gradient-emerald" text="no hidden surprises" type="words" delay={0.4} />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-lg text-muted-foreground max-w-xl mx-auto"
          >
            Every package is custom-built for your business. Pay once, own it forever.
            No contracts, no lock-ins.
          </motion.p>
        </motion.div>

        {/* Cards - Desktop grid */}
        <div className="hidden md:grid grid-cols-3 gap-8 mb-12 items-start">
          {packages.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </div>

        {/* Mobile horizontal scroll */}
        <div className="md:hidden mb-10">
          <div className="horizontal-scroll-container" onScroll={handleScroll}>
            {packages.map((pkg, i) => (
              <div key={pkg.id} className="horizontal-scroll-item w-[85vw] max-w-[340px]">
                <PackageCard pkg={pkg} index={i} />
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 gap-1.5">
            {packages.map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === activeTab ? 'w-6 bg-emerald-500' : 'w-2 bg-slate-700'}`} />
            ))}
          </div>
          <SwipeHint />
        </div>

        {/* Compare toggle */}
        <div className="max-w-4xl mx-auto">
          <motion.button
            onClick={() => setCompareOpen(!compareOpen)}
            className="w-full glass rounded-2xl p-4 flex items-center justify-between text-muted-foreground hover:text-foreground transition-colors duration-200 group"
            whileHover={{ scale: 1.005 }}
          >
            <span className="font-medium">Compare all packages side by side</span>
            <motion.div animate={{ rotate: compareOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {compareOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="glass rounded-2xl mt-3 p-6 overflow-x-auto">
                  <table className="w-full text-sm min-w-[500px]">
                    <thead>
                      <tr>
                        <th className="text-left text-muted-foreground font-medium pb-4 pr-6">Feature</th>
                        <th className="text-center text-blue-400 font-semibold pb-4 px-4">Starter</th>
                        <th className="text-center text-emerald-400 font-semibold pb-4 px-4">Growth</th>
                        <th className="text-center text-violet-400 font-semibold pb-4 px-4">Premium</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {[
                        ['Professional Website', '✓', '✓', '✓'],
                        ['Mobile Responsive', '✓', '✓', '✓'],
                        ['WhatsApp Integration', '✓', '✓', '✓'],
                        ['SEO Setup', 'Basic', 'Advanced', 'Advanced'],
                        ['Google Business Profile', '–', '✓', '✓'],
                        ['Online Booking / Orders', '–', '✓', '✓'],
                        ['Payment Gateway', '–', '–', '✓'],
                        ['Admin Dashboard', '–', '–', '✓'],
                        ['Custom Web App', '–', '–', '✓'],
                        ['Pages', 'Up to 5', 'Up to 10', 'Unlimited'],
                        ['Delivery Time', '3–5 days', '7–10 days', '15–30 days'],
                        ['Support Period', '30 days', '60 days', 'Priority SLA'],
                      ].map(([feature, starter, growth, premium], i) => (
                        <tr key={i}>
                          <td className="py-3 pr-6 text-muted-foreground">{feature}</td>
                          <td className="py-3 px-4 text-center">
                            <span className={starter === '–' ? 'text-slate-600' : 'text-blue-400'}>{starter}</span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className={growth === '–' ? 'text-slate-600' : 'text-emerald-400'}>{growth}</span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className={premium === '–' ? 'text-slate-600' : 'text-violet-400'}>{premium}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500"
        >
          {[
            '✅ No upfront payment required',
            '✅ Quote within 24 hours',
            '✅ Pan-India remote delivery',
            '✅ WhatsApp support included',
            '✅ Revisions included',
          ].map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
