import { motion, useReducedMotion } from 'framer-motion';

interface SplitTextProps {
  text: string;
  type?: 'chars' | 'words';
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
}

export function SplitText({ 
  text, 
  type = 'words', 
  className = '', 
  delay = 0,
  stagger = 0.05,
  duration = 0.6
}: SplitTextProps) {
  const shouldReduceMotion = useReducedMotion();
  
  if (shouldReduceMotion || !text) {
    return <span className={className}>{text}</span>;
  }
  
  const isChars = type === 'chars';
  // Split correctly handling spaces for words, or individual characters
  const elements = isChars ? text.split('') : text.split(/(\s+)/);
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };
  
  const child = {
    hidden: { 
      opacity: 0, 
      y: 30, 
      rotateX: -15,
      filter: 'blur(4px)'
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        duration,
        ease: [0.22, 1, 0.36, 1] as const // Cubic bezier out
      }
    },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      aria-label={text}
    >
      {elements.map((element, index) => {
        // For words, preserve space characters literally
        if (element === ' ' || element === '\n') {
          return <span key={index} aria-hidden="true" className="whitespace-pre">{element}</span>;
        }
        
        // Handle empty strings from regex split
        if (!element) return null;
        
        return (
          <motion.span
            key={index}
            variants={child}
            className={`inline-block ${className.match(/text-gradient-\w+/)?.[0] || ''}`}
            aria-hidden="true"
            style={{ 
              transformOrigin: '50% 100%',
              // Ensure elements with spaces are properly handled if any sneak in
              whiteSpace: 'pre-wrap'
            }}
          >
            {element}
          </motion.span>
        );
      })}
    </motion.span>
  );
}
