import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageCircle, FileText, Code2, Rocket, HeartHandshake } from 'lucide-react';
import { useRef } from 'react';
import { SplitText } from '../utils/textSplitter';

const steps = [
  {
    num: '01',
    icon: MessageCircle,
    title: 'Discovery Call',
    desc: 'We start with a free conversation to understand your business, goals, and what you need from your website. No technical knowledge required from you.',
    deliverable: 'Clear understanding of your requirements',
    duration: 'Day 1',
    color: 'text-blue-400',
    border: 'border-blue-500/25',
    bg: 'from-blue-500/10 to-blue-600/5',
    iconBg: 'bg-blue-500/15 border-blue-500/25',
  },
  {
    num: '02',
    icon: FileText,
    title: 'Custom Quote',
    desc: 'Within 24 hours, we send you a clear proposal with the recommended package, exact price, timeline, and everything that\'s included.',
    deliverable: 'Detailed quote in your inbox',
    duration: 'Within 24 hours',
    color: 'text-emerald-400',
    border: 'border-emerald-500/25',
    bg: 'from-emerald-500/10 to-emerald-600/5',
    iconBg: 'bg-emerald-500/15 border-emerald-500/25',
  },
  {
    num: '03',
    icon: Code2,
    title: 'We Build It',
    desc: 'Once you approve, we get to work. We share progress updates via WhatsApp so you always know what\'s happening. You can request tweaks anytime.',
    deliverable: 'Working website preview link',
    duration: '3–30 days depending on plan',
    color: 'text-violet-400',
    border: 'border-violet-500/25',
    bg: 'from-violet-500/10 to-violet-600/5',
    iconBg: 'bg-violet-500/15 border-violet-500/25',
  },
  {
    num: '04',
    icon: Rocket,
    title: 'Launch',
    desc: 'We do final testing, connect your domain, and go live. We also make sure Google can find your website and your Google Business Profile is set up.',
    deliverable: 'Live website on your domain',
    duration: 'Launch day',
    color: 'text-amber-400',
    border: 'border-amber-500/25',
    bg: 'from-amber-500/10 to-amber-600/5',
    iconBg: 'bg-amber-500/15 border-amber-500/25',
  },
  {
    num: '05',
    icon: HeartHandshake,
    title: 'Ongoing Support',
    desc: 'After launch, we stay by your side. Whether it\'s a small update, a new page, or monthly SEO work — we\'re just a WhatsApp message away.',
    deliverable: 'Reliable support whenever you need it',
    duration: 'Ongoing (optional care plans)',
    color: 'text-rose-400',
    border: 'border-rose-500/25',
    bg: 'from-rose-500/10 to-rose-600/5',
    iconBg: 'bg-rose-500/15 border-rose-500/25',
  },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="section-padding mesh-bg relative overflow-hidden dot-grid">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/15 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-5">
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
            <span className="tag tag-blue">How It Works</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tighter"
          >
            <SplitText text="Simple process," type="words" delay={0.1} />
            <br />
            <SplitText className="text-gradient-blue" text="zero hassle" type="words" delay={0.4} />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-xl mx-auto"
          >
            Getting your website built should be easy. Here's exactly how we work — no technical jargon, no surprises.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div ref={containerRef} className="relative">
          {/* Connecting line background */}
          <div className="absolute left-7 top-8 bottom-8 w-px bg-transparent border border-border hidden md:block" />
          {/* Animated line */}
          <motion.div 
            className="absolute left-7 top-8 bottom-8 w-px bg-gradient-to-b from-blue-500 via-violet-500 to-rose-500 hidden md:block origin-top"
            style={{ scaleY }}
          />

          <motion.div 
            className="space-y-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={{
              hidden: { opacity: 0, perspective: 1000 },
              show: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
          >
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={{ 
                  hidden: { opacity: 0, x: -30, rotateY: 20, scale: 0.95 }, 
                  show: { opacity: 1, x: 0, rotateY: 0, scale: 1 } 
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="relative flex items-start gap-5 md:gap-8"
              >
                {/* Step number circle */}
                <div className={`relative flex-shrink-0 w-14 h-14 rounded-2xl border ${step.iconBg} flex items-center justify-center z-10`}>
                  <step.icon className={`w-6 h-6 ${step.color}`} />
                  <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
                    <span className="text-[9px] font-bold text-muted-foreground">{step.num}</span>
                  </div>
                </div>

                {/* Content card */}
                <motion.div
                  whileHover={{ x: 4, scale: 1.005 }}
                  transition={{ duration: 0.2 }}
                  className={`flex-1 p-6 rounded-2xl border ${step.border} bg-gradient-to-br ${step.bg} group`}
                  style={{ background: 'var(--color-bg-glass)' }}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
                    <h3 className="text-foreground font-bold text-lg">
                      {step.title}
                    </h3>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-lg border ${step.border} ${step.color} md:ml-auto flex-shrink-0`}
                      style={{ background: 'var(--color-border)' }}>
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{step.desc}</p>
                  <div className={`flex items-center gap-2 text-xs font-medium ${step.color}`}>
                    <div className={`w-1.5 h-1.5 rounded-full bg-current`} />
                    You get: {step.deliverable}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-14 text-center"
        >
          <div className="glass rounded-2xl p-8 max-w-xl mx-auto">
            <p className="text-xl font-bold text-foreground mb-2">
              Ready to start Step 1?
            </p>
            <p className="text-muted-foreground text-sm mb-6">
              It's completely free — just a quick conversation about your business and what you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.a
                href="https://wa.me/919997954148?text=Hi!%20I%27d%20like%20to%20start%20the%20process%20of%20getting%20a%20website%20for%20my%20business."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp px-6 py-3.5 text-sm flex items-center justify-center gap-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Start on WhatsApp
              </motion.a>
              <motion.a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="btn-ghost px-6 py-3.5 text-sm flex items-center justify-center group"
                whileHover="hover"
                whileTap={{ scale: 0.97, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
                variants={{ hover: { scale: 1.03 } }}
              >
                Send an Email Instead
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
