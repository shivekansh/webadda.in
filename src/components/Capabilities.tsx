import { motion } from 'framer-motion';
import {
  Globe, FileCode2, Code2, Calendar, ShoppingCart,
  CreditCard, Package, LayoutDashboard, Search, MapPin, Smartphone, Gauge
} from 'lucide-react';
import { useRef } from 'react';
import SwipeHint from './SwipeHint';
import { useTilt } from '../hooks/useTilt';
import { GlowingEffect } from './ui/glowing-effect';
import { SplitText } from '../utils/textSplitter';

const capabilities = [
  {
    icon: Globe,
    title: 'Static Websites',
    desc: 'Fast, secure, beautifully designed sites for businesses needing clean online presence.',
    tags: ['HTML/CSS', 'React', 'Vite'],
    color: 'text-blue-400',
    bg: 'from-blue-500/10 to-blue-600/5',
    border: 'border-blue-500/15',
  },
  {
    icon: FileCode2,
    title: 'WordPress Sites',
    desc: 'Easy-to-manage WordPress sites. Update your content yourself, no technical knowledge needed.',
    tags: ['WordPress', 'WooCommerce', 'Elementor'],
    color: 'text-emerald-400',
    bg: 'from-emerald-500/10 to-emerald-600/5',
    border: 'border-emerald-500/15',
  },
  {
    icon: Code2,
    title: 'Next.js Custom Builds',
    desc: 'High-performance web apps built with Next.js for businesses needing full custom systems.',
    tags: ['Next.js', 'TypeScript', 'Tailwind'],
    color: 'text-violet-400',
    bg: 'from-violet-500/10 to-violet-600/5',
    border: 'border-violet-500/15',
  },
  {
    icon: Calendar,
    title: 'Booking Systems',
    desc: 'Online appointment booking for clinics, salons, gyms, integrated directly into your website.',
    tags: ['Appointments', 'Calendar Sync', 'Reminders'],
    color: 'text-amber-400',
    bg: 'from-amber-500/10 to-amber-600/5',
    border: 'border-amber-500/15',
  },
  {
    icon: ShoppingCart,
    title: 'Online Ordering',
    desc: 'Let customers place orders directly from your website: for restaurants, bakeries, and stores.',
    tags: ['Menu Management', 'Order Alerts', 'WhatsApp Orders'],
    color: 'text-rose-400',
    bg: 'from-rose-500/10 to-rose-600/5',
    border: 'border-rose-500/15',
  },
  {
    icon: CreditCard,
    title: 'Payment Integration',
    desc: 'Accept payments online via UPI, cards, and wallets: Razorpay, PhonePe, Stripe.',
    tags: ['Razorpay', 'UPI', 'PhonePe'],
    color: 'text-green-400',
    bg: 'from-green-500/10 to-green-600/5',
    border: 'border-green-500/15',
  },
  {
    icon: Package,
    title: 'Inventory Management',
    desc: 'Track stock, manage products, and get low-stock alerts: perfect for kirana and retail stores.',
    tags: ['Stock Tracking', 'Product Catalog', 'Alerts'],
    color: 'text-cyan-400',
    bg: 'from-cyan-500/10 to-cyan-600/5',
    border: 'border-cyan-500/15',
  },
  {
    icon: LayoutDashboard,
    title: 'Admin Dashboards',
    desc: 'Custom control panels to manage orders, bookings, customers, and content all in one place.',
    tags: ['Custom Panel', 'Reports', 'User Roles'],
    color: 'text-indigo-400',
    bg: 'from-indigo-500/10 to-indigo-600/5',
    border: 'border-indigo-500/15',
  },
  {
    icon: Search,
    title: 'SEO Setup',
    desc: 'Technical SEO, meta tags, sitemap, and on-page optimization to help Google find you.',
    tags: ['On-page SEO', 'Schema Markup', 'Sitemap'],
    color: 'text-orange-400',
    bg: 'from-orange-500/10 to-orange-600/5',
    border: 'border-orange-500/15',
  },
  {
    icon: MapPin,
    title: 'Google Business Profile',
    desc: 'Set up and optimize your GBP so you appear in local searches and Google Maps.',
    tags: ['GBP Setup', 'Reviews', 'Local SEO'],
    color: 'text-emerald-300',
    bg: 'from-emerald-400/10 to-emerald-500/5',
    border: 'border-emerald-400/15',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    desc: 'Every website we build looks and works perfectly on mobile, where most of your customers are.',
    tags: ['Responsive', 'Touch-Optimized', 'PWA Ready'],
    color: 'text-pink-400',
    bg: 'from-pink-500/10 to-pink-600/5',
    border: 'border-pink-500/15',
  },
  {
    icon: Gauge,
    title: 'Speed & Performance',
    desc: 'Fast-loading websites that score well on Core Web Vitals for better experience and better rankings.',
    tags: ['Core Web Vitals', 'Image Optimization', 'CDN'],
    color: 'text-blue-300',
    bg: 'from-blue-400/10 to-blue-500/5',
    border: 'border-blue-400/15',
  },
];

function CapabilityCard({ cap, index }: { cap: typeof capabilities[0]; index: number }) {
  const { ref, rotateX, rotateY, handleMouseMove, handleMouseLeave } = useTilt(5);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.01, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)', transition: { type: 'spring', stiffness: 300, damping: 20 } }}
      className={`relative p-5 rounded-2xl border ${cap.border} group cursor-default transition-colors duration-300`}
      style={{ background: 'var(--color-bg-glass)', rotateX, rotateY, transformPerspective: 1000 }}
    >
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        variant="blue"
        borderWidth={1.5}
      />
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${cap.bg} bg-[length:200%_200%] bg-left-top group-hover:bg-right-bottom opacity-0 group-hover:opacity-100 transition-all duration-500`} />
      <div className="relative z-10">
        <motion.div 
          className={`w-10 h-10 rounded-xl border ${cap.border} flex items-center justify-center mb-4 bg-gradient-to-br ${cap.bg}`}
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
        >
          <cap.icon className={`w-5 h-5 ${cap.color}`} />
        </motion.div>
        <h3 className="text-foreground font-semibold text-[15px] mb-2">
          {cap.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{cap.desc}</p>
        <div className="flex flex-wrap gap-1.5">
          {cap.tags.map((tag) => (
            <span key={tag} className={`text-[11px] font-medium px-2 py-1 rounded-lg border ${cap.border} ${cap.color} opacity-70`}
              style={{ background: 'var(--color-bg-secondary)' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Horizontal scroll section for capabilities on mobile
export default function Capabilities() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="capabilities" className="section-padding section-mesh relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/15 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/15 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
          whileInView={{ opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            className="flex justify-center mb-4"
          >
            <span className="tag tag-emerald">What We Build</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tighter"
          >
            <SplitText text="Every capability your" type="words" delay={0.1} />
            <br />
            <SplitText className="text-gradient-mixed" text="business might need" type="words" delay={0.4} />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            We combine these building blocks into a custom solution designed exactly for your business.
            only what you need, nothing you don't.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, perspective: 1000 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.08 }
            }
          }}
          className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {capabilities.map((cap, i) => (
            <motion.div key={i} variants={{ 
              hidden: { opacity: 0, y: 40, rotateX: -20, scale: 0.95 }, 
              show: { opacity: 1, y: 0, rotateX: 0, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 20 } } 
            }}>
              <CapabilityCard cap={cap} index={i} />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile horizontal scroll */}
        <div className="md:hidden">
          <div
            ref={scrollRef}
            className="horizontal-scroll-container pb-4"
          >
            {capabilities.map((cap, i) => (
              <div key={i} className="horizontal-scroll-item w-[72vw] max-w-[280px]">
                <div
                  className={`relative p-5 rounded-2xl border ${cap.border} h-full`}
                  style={{ background: 'var(--color-bg-glass)' }}
                >
                  <div className={`w-10 h-10 rounded-xl border ${cap.border} flex items-center justify-center mb-4`}
                    style={{ background: 'var(--color-border)' }}>
                    <cap.icon className={`w-5 h-5 ${cap.color}`} />
                  </div>
                  <h3 className="text-foreground font-semibold text-[15px] mb-2">{cap.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{cap.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cap.tags.map((tag) => (
                      <span key={tag} className={`text-[11px] font-medium px-2 py-1 rounded-lg border ${cap.border} ${cap.color} opacity-70`}
                        style={{ background: 'var(--color-bg-secondary)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 gap-1.5">
            {[...Array(3)].map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all ${i === 0 ? 'w-6 bg-blue-500' : 'w-2 bg-slate-700'}`} />
            ))}
          </div>
          <SwipeHint />
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-14 glass rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <div className="text-foreground font-bold text-xl mb-1">
              Not sure what you need?
            </div>
            <div className="text-muted-foreground">Tell us about your business and we'll recommend the right solution.</div>
          </div>
          <motion.a
            href="https://wa.me/919997954148?text=Hi!%20I%27d%20like%20to%20discuss%20what%20kind%20of%20website%20would%20work%20best%20for%20my%20business."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp px-6 py-3 text-sm flex-shrink-0 flex items-center gap-2 group"
            whileHover="hover"
            whileTap={{ scale: 0.97, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
            variants={{ hover: { scale: 1.03 } }}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Let's Chat
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
