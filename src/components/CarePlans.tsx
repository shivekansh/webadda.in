import { motion } from 'framer-motion';
import { Check, RefreshCw, Shield, TrendingUp } from 'lucide-react';
import { SplitText } from '../utils/textSplitter';

const plans = [
  {
    name: 'Basic Care',
    price: '₹999',
    period: '/month',
    tagline: 'Keep your site running smoothly',
    color: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-500/25',
    bg: 'from-blue-500/8 to-blue-600/3',
    icon: Shield,
    features: [
      'Hosting & domain management',
      'Security monitoring',
      'Monthly backups',
      'Minor text/image updates (2/mo)',
      'Uptime monitoring',
      'Email support',
    ],
    notIncluded: ['SEO updates', 'Google Business Profile', 'New page creation'],
    cta: 'Start Basic',
    whatsappMsg: 'Hi! I\'m interested in the Basic Care Plan at ₹999/month. Can you share details?',
  },
  {
    name: 'Growth Care',
    price: '₹2,999',
    period: '/month',
    tagline: 'Grow your visibility month by month',
    color: 'text-cyan-400',
    border: 'border-cyan-500/30',
    bg: 'from-cyan-500/10 to-blue-600/5',
    icon: TrendingUp,
    badgeText: 'Most Value',
    features: [
      'Everything in Basic Care',
      'Monthly SEO improvements',
      'Google Business Profile updates',
      'Content updates (5/mo)',
      'Performance optimization',
      'Monthly analytics report',
      'Priority WhatsApp support',
      'New blog post (1/mo)',
    ],
    notIncluded: ['Custom feature builds'],
    cta: 'Get Growth Care',
    whatsappMsg: 'Hi! I\'m interested in the Growth Care Plan at ₹2,999/month. Can you share details?',
  },
  {
    name: 'Premium Care',
    price: '₹4,999+',
    period: '/month',
    tagline: 'Full digital support, ongoing',
    color: 'text-sky-600 dark:text-sky-400',
    border: 'border-sky-500/30',
    bg: 'from-sky-500/10 to-sky-600/5',
    icon: RefreshCw,
    features: [
      'Everything in Growth Care',
      'Unlimited content updates',
      'Custom feature builds (small)',
      'Advanced SEO strategy',
      'Competitor monitoring',
      'WhatsApp priority line',
      'Monthly strategy call',
      'Social media link updates',
      'Lead tracking setup',
    ],
    notIncluded: [],
    cta: 'Contact for Pricing',
    whatsappMsg: 'Hi! I\'m interested in the Premium Care Plan. Can you share custom pricing?',
  },
];

export default function CarePlans() {
  return (
    <section id="care-plans" className="section-padding mesh-bg relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent" />
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
            <span className="tag tag-cyan">Monthly Plans</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tighter"
          >
            <SplitText text="Your website, always" type="words" delay={0.1} />
            <br />
            <SplitText className="text-gradient-cyan" text="fresh and growing" type="words" delay={0.4} />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            A website is not a one-time thing. Our recurring care plans keep your site updated, 
            secure, and improving, every single month.
          </motion.p>
        </motion.div>

        {/* Value props */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14"
        >
          {[
            { icon: '🛡️', title: 'Always Secure', desc: 'Backups & monitoring' },
            { icon: '📈', title: 'Always Growing', desc: 'Monthly SEO work' },
            { icon: '🔄', title: 'Always Updated', desc: 'Fresh content & fixes' },
            { icon: '💬', title: 'Always Supported', desc: 'WhatsApp help line' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="glass rounded-2xl p-4 text-center"
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="text-foreground font-semibold text-sm mb-1">{item.title}</div>
              <div className="text-slate-500 text-xs">{item.desc}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, rotateX: -20, scale: 0.95, perspective: 1000 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, type: 'spring', stiffness: 200, damping: 20 }}
              whileHover={{ y: -4, scale: 1.01, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)', transition: { type: 'spring', stiffness: 300, damping: 20 } }}
              className={`relative rounded-3xl border ${plan.border} overflow-hidden`}
              style={{ background: 'var(--color-bg-glass)' }}
            >
              {plan.badgeText && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />
              )}
              <div className="p-7">
                {/* Icon */}
                <div className={`w-11 h-11 rounded-2xl border ${plan.border} flex items-center justify-center mb-5 bg-gradient-to-br ${plan.bg}`}>
                  <plan.icon className={`w-5 h-5 ${plan.color}`} />
                </div>

                {/* Name + badge */}
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-foreground font-bold text-xl">
                    {plan.name}
                  </h3>
                  {plan.badgeText && (
                    <span className="tag tag-cyan text-[10px] px-2 py-0.5">{plan.badgeText}</span>
                  )}
                </div>
                <p className={`text-sm mb-5 ${plan.color}`}>{plan.tagline}</p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>

                {/* Included */}
                <motion.ul 
                  className="space-y-2.5 mb-6"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.05 }
                    }
                  }}
                >
                  {plan.features.map((f, j) => (
                    <motion.li 
                      key={j} 
                      variants={{
                        hidden: { opacity: 0, x: -10 },
                        show: { opacity: 1, x: 0 }
                      }}
                      transition={{ duration: 0.3 }}
                      className="flex items-start gap-2.5 text-sm text-muted-foreground"
                    >
                      <Check className={`w-4 h-4 ${plan.color} flex-shrink-0 mt-0.5`} />
                      <span>{f}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* Not included */}
                {plan.notIncluded.length > 0 && (
                  <div className="mb-6 pt-4 border-t border-white/5">
                    <div className="text-xs text-slate-600 mb-2 uppercase tracking-wider font-medium">Not included</div>
                    {plan.notIncluded.map((f, j) => (
                      <div key={j} className="text-sm text-slate-600 flex items-center gap-2 mb-1">
                        <span className="w-1 h-1 rounded-full bg-slate-700 flex-shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA */}
                <motion.button
                  onClick={() => window.open(`https://wa.me/919997954148?text=${encodeURIComponent(plan.whatsappMsg)}`, '_blank')}
                  className={`w-full py-3.5 text-sm font-semibold rounded-xl transition-all duration-200 border ${plan.border} ${plan.color} hover:bg-transparent border border-border group`}
                  whileHover="hover"
                  whileTap={{ scale: 0.98, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
                  variants={{ hover: { scale: 1.02 } }}
                >
                  {plan.cta}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-slate-500 text-sm"
        >
          All care plans are month-to-month. Cancel anytime. No long-term contracts.
        </motion.p>
      </div>
    </section>
  );
}
