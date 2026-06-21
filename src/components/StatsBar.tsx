import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

import { Store, Zap, Wallet, Globe, Star } from 'lucide-react';

const stats = [
  { value: 50, suffix: '+', label: 'Local Businesses\nServed', icon: Store, color: 'text-blue-400' },
  { value: 7, suffix: ' Days', label: 'Average Website\nDelivery', icon: Zap, color: 'text-amber-400' },
  { value: 3500, prefix: '₹', suffix: '', label: 'Starting\nPrice', icon: Wallet, color: 'text-emerald-400' },
  { value: 100, suffix: '%', label: 'Remote Delivery\nAcross India', icon: Globe, color: 'text-violet-400' },
  { value: 4.9, suffix: '', label: 'Average Client\nSatisfaction', icon: Star, color: 'text-yellow-400', decimal: true },
];

function AnimatedNumber({
  value, prefix = '', suffix = '', decimal = false, started,
}: {
  value: number; prefix?: string; suffix?: string; decimal?: boolean; started: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(eased * value);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, value]);

  const display = decimal
    ? count.toFixed(1)
    : value >= 3000
    ? count.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    : Math.floor(count).toString();

  return (
    <span>
      {prefix}{display}{suffix}
    </span>
  );
}

export default function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative py-12 overflow-hidden bg-secondary/50 border-y border-border">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/15 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center group"
            >
              <div className={`mb-3 flex items-center justify-center w-12 h-12 rounded-xl bg-transparent border border-border ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <motion.div 
                initial={{ scale: 1 }}
                animate={inView ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.4, delay: 2 }}
                className="text-3xl md:text-4xl font-extrabold text-foreground mb-2 tabular-nums flex items-center">
                <AnimatedNumber
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimal={stat.decimal}
                  started={inView}
                />
              </motion.div>
              <div className="text-slate-500 text-xs leading-tight text-center whitespace-pre-line font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
