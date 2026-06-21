import { motion } from 'framer-motion';
import { Shield, Zap, HeartHandshake, Globe, DollarSign, Star, Palette, Code, LineChart } from 'lucide-react';
import { useTilt } from '../hooks/useTilt';
import { SplitText } from '../utils/textSplitter';

const reasons = [
  {
    icon: DollarSign,
    title: 'Transparent Pricing',
    desc: 'You get a clear, fixed quote before anything starts. No hidden charges, no billing surprises. Ever.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
  },
  {
    icon: Zap,
    title: 'Fast Delivery',
    desc: 'Starter websites in 3–5 days. We work efficiently without cutting corners on quality.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
  },
  {
    icon: HeartHandshake,
    title: 'Human Communication',
    desc: 'WhatsApp, email, or call: we speak your language, not developer jargon. You\'re always informed.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/20',
  },
  {
    icon: Globe,
    title: 'Pan-India Remote Service',
    desc: 'Doesn\'t matter where in India you are. We work with businesses from J&K to Kerala, fully remote.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
  },
  {
    icon: Shield,
    title: 'You Own Everything',
    desc: 'Your domain, your hosting, your code. We hand it all over when we\'re done. No lock-in, no dependency.',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10 border-rose-500/20',
  },
  {
    icon: Star,
    title: 'Built for Real Outcomes',
    desc: 'We measure success by more calls, more customers, and better visibility. Not just pretty designs.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
  },
];

function WhyUsCard({ reason }: { reason: typeof reasons[0] }) {
  const { ref, rotateX, rotateY, handleMouseMove, handleMouseLeave } = useTilt(5);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      variants={{
        hidden: { opacity: 0, y: 40, rotateX: -20, scale: 0.95 },
        show: { opacity: 1, y: 0, rotateX: 0, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 20 } }
      }}
      whileHover={{ y: -4, scale: 1.01, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)', transition: { type: 'spring', stiffness: 300, damping: 20 } }}
      className={`p-5 rounded-2xl border ${reason.bg} cursor-default`}
      style={{ background: 'var(--color-bg-glass)', rotateX, rotateY, transformPerspective: 1000 }}
    >
      <div className={`w-10 h-10 rounded-xl border ${reason.bg} flex items-center justify-center mb-4`}>
        <reason.icon className={`w-5 h-5 ${reason.color}`} />
      </div>
      <h3 className="text-foreground font-semibold text-[15px] mb-2">
        {reason.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{reason.desc}</p>
    </motion.div>
  );
}

export default function WhyUs() {
  return (
    <section className="section-padding relative overflow-hidden bg-background">
      <div className="absolute inset-0 pointer-events-none dot-grid opacity-50" />

      <div className="max-w-7xl mx-auto px-5 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
            whileInView={{ opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="mb-4"
            >
              <span className="tag tag-blue">Why Choose Us</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extrabold text-foreground mb-5 tracking-tighter leading-tight"
            >
              <SplitText text="We're not just" type="words" delay={0.1} />
              <br />
              <SplitText text="another web agency." type="words" delay={0.4} />
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground leading-relaxed mb-8"
            >
              We're a small, focused team that genuinely cares about helping local businesses 
              grow online. We understand your market, speak your language, and build solutions 
              that actually make a difference to your bottom line.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {[
                  { icon: Palette, color: 'text-pink-500', bg: 'bg-pink-500/10' },
                  { icon: Code, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                  { icon: LineChart, color: 'text-emerald-500', bg: 'bg-emerald-500/10' }
                ].map((item, i) => (
                  <div key={i} className={`w-10 h-10 rounded-full border-2 border-background ${item.bg} flex items-center justify-center`}>
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                ))}
              </div>
              <div>
                <div className="text-foreground font-semibold text-sm">Small team, big results</div>
                <div className="text-muted-foreground text-xs">Design · Development · Strategy</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Reasons grid */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            variants={{
              hidden: { opacity: 0, perspective: 1000 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.08 }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {reasons.map((reason, i) => (
              <WhyUsCard key={i} reason={reason} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
