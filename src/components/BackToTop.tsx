import { useEffect, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowUp } from 'lucide-react';

interface BackToTopProps {
  /** Scroll progress (0–1) after which the button appears. */
  threshold?: number;
  /** Extra Tailwind classes. Useful for overriding position, e.g. "right-6". */
  className?: string;
}

const DEFAULT_THRESHOLD = 0.1;

/**
 * A floating “back to top” button with a scroll-progress ring.
 *
 * Features:
 * - Appears after scrolling past the configured threshold.
 * - Animated scroll-progress indicator.
 * - Respects `prefers-reduced-motion`.
 * - Fully accessible: visible focus ring, aria-label, keyboard operable.
 */
export function BackToTop({
  threshold = DEFAULT_THRESHOLD,
  className = '',
}: BackToTopProps) {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Drive the progress ring (0 → 1) based on page scroll.
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Toggle visibility once the user has scrolled past the threshold.
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setIsVisible(latest > threshold);
  });

  // Detect reduced-motion preference so we can skip entrance/hover animations
  // and use instant scrolling.
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  // Disable enter/exit/hover animations for users who prefer reduced motion.
  const motionVariants = reducedMotion
    ? {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    }
    : {
      initial: { opacity: 0, scale: 0.5, y: 20 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.5, y: 20 },
    };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          initial={motionVariants.initial}
          animate={motionVariants.animate}
          exit={motionVariants.exit}
          whileHover={reducedMotion ? undefined : { scale: 1.1 }}
          whileTap={reducedMotion ? undefined : { scale: 0.9 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={handleClick}
          className={[
            'fixed bottom-6 left-6 z-50',
            'p-3 rounded-full',
            'bg-background border border-border',
            'text-foreground shadow-2xl',
            'overflow-hidden group',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
            className,
          ].join(' ')}
          aria-label="Back to top"
          title="Back to top"
        >
          {/* Scroll progress ring */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            {/* Background track */}
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="text-primary/20"
            />
            {/* Animated progress indicator */}
            <motion.circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              className="text-primary"
              style={{ pathLength }}
            />
          </svg>

          {/* Icon container */}
          <div className="relative z-10 w-8 h-8 flex items-center justify-center bg-muted rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
            <ArrowUp className="w-4 h-4" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
