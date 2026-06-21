import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function SectionDivider({ type = 'wave', color = 'text-[#050a14]' }: { type?: 'wave' | 'curve' | 'slant', color?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  const ease = [0.22, 1, 0.36, 1] as const;

  let fillPath = "";
  let strokePath = "";

  if (type === 'curve') {
    fillPath = "M0,0 C300,100 900,100 1200,0 L1200,120 L0,120 Z";
    strokePath = "M0,0 C300,100 900,100 1200,0";
  } else if (type === 'slant') {
    fillPath = "M0,0 L1200,120 L0,120 Z";
    strokePath = "M0,0 L1200,120";
  } else {
    // default wave
    fillPath = "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C71.39,23.51,146.43,45.47,219.7,53.4,253.51,57.06,288.58,58.82,321.39,56.44Z";
    strokePath = "M0,0 C71.39,23.51,146.43,45.47,219.7,53.4,253.51,57.06,288.58,58.82,321.39,56.44 c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39 C823.78,31,906.67,72,985.66,92.83 c70.05,18.48,146.53,26.09,214.34,3";
  }

  return (
    <div ref={ref} className={`w-full overflow-hidden leading-none ${color} -mt-1 relative z-10`}>
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={`relative block w-full fill-current ${type === 'wave' ? 'h-[40px] md:h-[70px]' : type === 'slant' ? 'h-[40px] md:h-[60px]' : 'h-[50px] md:h-[80px]'}`}>
        <motion.path
          d={fillPath}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />
        <motion.path
          d={strokePath}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="opacity-50"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.2, ease }}
        />
      </svg>
    </div>
  );
}
