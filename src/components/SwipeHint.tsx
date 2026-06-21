import { motion } from 'framer-motion';
import { MousePointer2 } from 'lucide-react';

export default function SwipeHint() {
  return (
    <div className="md:hidden flex items-center justify-center gap-2 text-[var(--text-secondary)] text-xs font-medium mt-6">
      <motion.div
        animate={{ x: [-10, 10, -10], opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
      >
        <MousePointer2 className="w-3.5 h-3.5 rotate-90" />
      </motion.div>
      <span>Swipe to see more</span>
    </div>
  );
}
