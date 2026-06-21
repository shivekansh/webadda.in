import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setIsVisible(latest > 0.1);
    });
  }, [scrollYProgress]);

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 left-6 z-50 p-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-foreground shadow-2xl overflow-hidden group"
          aria-label="Back to top"
        >
          {/* Progress circle SVG */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="rgba(59, 130, 246, 0.2)"
              strokeWidth="4"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              className="text-blue-500"
              style={{ pathLength }}
            />
          </svg>
          <div className="relative z-10 w-8 h-8 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
            <ArrowUp className="w-4 h-4" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
