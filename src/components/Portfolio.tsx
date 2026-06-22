import { motion } from 'framer-motion';
import { Clock, ShoppingBag } from 'lucide-react';
import { SplitText } from '../utils/textSplitter';
import { ImageWithSkeleton } from './ImageWithSkeleton';
import AnimatedTestimonialsDemo from './animated-testimonials-demo';
const caseStudy = {
  title: 'Premium Multi-Vendor E-Commerce Platform',
  client: 'Confidential | Retail & Fashion Sector',
  status: 'In Production',
  stack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Razorpay', 'MongoDB', 'Prisma'],
  description: 'A fully custom multi-vendor e-commerce marketplace serving thousands of products across multiple categories. Built with a real-time inventory management system, vendor portal, customer dashboards, and integrated payment processing.',
  problem: 'The client was managing their entire business via WhatsApp and phone calls: no centralized system, no online sales, and losing customers to organized competitors with polished platforms.',
  solution: 'We built a complete e-commerce ecosystem: a beautiful storefront for customers, a vendor management portal for suppliers, a full admin dashboard, and a mobile-optimized checkout with UPI, cards, and wallets.',
  metrics: [
    { label: 'Products Managed', value: '2,000+' },
    { label: 'Estimated Vendors', value: '15+' },
    { label: 'System Modules', value: '8' },
    { label: 'Launch ETA', value: 'Q1 2025' },
  ],
};

const comingSoonProjects = [
  {
    type: 'Restaurant Chain',
    title: 'Multi-Location Ordering System',
    desc: 'Online ordering, table booking, and kitchen management for a chain of 4 restaurants.',
    status: 'In Discussion',
    color: 'text-sky-400',
    border: 'border-sky-500/20',
    icon: '🍽️',
  },
  {
    type: 'Medical Clinic',
    title: 'Patient & Appointment Portal',
    desc: 'Doctor profiles, appointment scheduling, and teleconsultation integration for a 6-doctor clinic.',
    status: 'Scoping',
    color: 'text-blue-400',
    border: 'border-blue-500/20',
    icon: '🏥',
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="section-padding section-mesh relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/15 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-4"
          >
            <span className="tag tag-blue">Our Work</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tighter"
          >
            <SplitText text="Real projects," type="words" delay={0.1} />
            <br />
            <SplitText className="text-gradient-blue" text="real results" type="words" delay={0.4} />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            We're a growing studio with ambitious projects already in production.
            Here's a look at what we're building.
          </motion.p>
        </div>

        {/* Main Case Study */}
        <motion.div
          initial={{ opacity: 0, y: 30, clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' }}
          whileInView={{ opacity: 1, y: 0, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl border border-blue-500/25 overflow-hidden mb-8"
          style={{ background: 'var(--color-bg-glass)' }}
        >
          {/* Status ribbon */}
          <div className="flex items-center gap-3 px-7 pt-7 mb-6">
            <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-2">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-blue-400 text-sm font-medium">In Production</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500 text-sm">
              <Clock className="w-3.5 h-3.5" />
              <span>Currently building</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left: Info */}
            <div className="px-7 pb-7">
              <div className="flex items-center gap-2 mb-3">
                <ShoppingBag className="w-5 h-5 text-blue-400" />
                <span className="text-muted-foreground text-sm">{caseStudy.client}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4">
                {caseStudy.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">{caseStudy.description}</p>

              {/* Problem / Solution */}
              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-xl bg-sky-500/5 border border-sky-500/15">
                  <div className="text-sky-400 text-xs font-semibold uppercase tracking-wider mb-2">The Challenge</div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{caseStudy.problem}</p>
                </div>
                <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/15">
                  <div className="text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">Our Solution</div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{caseStudy.solution}</p>
                </div>
              </div>

              {/* Tech stack */}
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-wider mb-3 font-medium">Tech Stack</div>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.stack.map((tech) => (
                    <span key={tech} className="text-xs font-medium px-3 py-1.5 rounded-lg border border-blue-500/20 text-blue-300"
                      style={{ background: 'rgba(59, 130, 246, 0.06)' }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Visual mock */}
            <div className="p-7 relative flex items-center justify-center border-t lg:border-t-0 lg:border-l border-border"
              style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.06) 0%, rgba(59, 130, 246, 0.04) 100%)' }}>
              
              {/* Browser mock */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, scale: 1.05, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)', transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                className="w-full max-w-sm rounded-2xl border border-border overflow-hidden shadow-2xl"
                style={{ background: 'var(--color-bg-glass)' }}>
                {/* Browser bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-sky-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500/60" />
                  </div>
                  <div className="flex-1 mx-3 rounded-md bg-transparent border border-border px-3 py-1 text-xs text-slate-500">
                    yourstore.in
                  </div>
                </div>
                {/* Mock content */}
                <div className="p-4 space-y-3">
                  {/* Nav mock */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-20 h-3 bg-blue-500/40 rounded-full" />
                    <div className="flex gap-2">
                      {[1,2,3].map(i => <div key={i} className="w-10 h-2 bg-white/10 rounded-full" />)}
                    </div>
                    <div className="w-14 h-6 bg-blue-500/30 rounded-lg" />
                  </div>
                  {/* Hero mock */}
                  <div className="rounded-xl bg-gradient-to-br from-blue-500/15 to-cyan-500/10 p-4 border border-blue-500/20">
                    <div className="w-3/4 h-3 bg-white/20 rounded mb-2" />
                    <div className="w-1/2 h-2 bg-white/10 rounded mb-4" />
                    <div className="flex gap-2">
                      <div className="w-20 h-7 bg-blue-500/50 rounded-lg" />
                      <div className="w-20 h-7 bg-white/8 rounded-lg border border-border" />
                    </div>
                  </div>
                  {/* Products mock */}
                  <div className="relative w-full h-32 rounded-xl overflow-hidden mt-2 group">
                    <ImageWithSkeleton 
                      src="https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&q=80&w=600" 
                      alt="Project mockup" 
                      className="group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-3">
                      <div className="w-24 h-2 bg-white/60 rounded mb-1" />
                      <div className="w-16 h-2 bg-white/40 rounded" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Coming soon overlay badge */}
              <div className="absolute top-4 right-4">
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl px-3 py-2 text-xs text-blue-300 font-medium backdrop-blur-sm">
                  🚀 Launching Soon
                </div>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-border">
            {caseStudy.metrics.map((m, i) => (
              <div key={i} className={`p-5 text-center ${i < 3 ? 'border-r border-border' : ''}`}>
                <div className="text-2xl font-bold text-foreground mb-1">
                  {m.value}
                </div>
                <div className="text-slate-500 text-xs">{m.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Coming soon projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {comingSoonProjects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, scale: 1.01, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)', transition: { type: 'spring', stiffness: 300, damping: 20 } }}
              className={`p-6 rounded-2xl border ${project.border}`}
              style={{ background: 'var(--color-bg-glass)' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{project.icon}</span>
                <div>
                  <div className={`text-xs font-semibold ${project.color} uppercase tracking-wider`}>{project.type}</div>
                  <div className="text-foreground font-bold text-base">{project.title}</div>
                </div>
                <div className="ml-auto">
                  <span className={`tag text-[10px] border ${project.border} ${project.color} px-2 py-1`}>{project.status}</span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">{project.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonial Carousel */}
        <AnimatedTestimonialsDemo />
      </div>
    </section>
  );
}
