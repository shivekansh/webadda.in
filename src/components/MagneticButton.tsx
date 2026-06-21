import { motion } from 'framer-motion';
import { useMagnetic } from '../hooks/useMagnetic';
import { ReactNode } from 'react';

interface MagneticButtonProps extends React.ComponentPropsWithoutRef<typeof motion.button> {
  children: ReactNode;
  className?: string;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
}

export function MagneticButton({ children, className, as = 'button', href, target, rel, ...props }: MagneticButtonProps) {
  const { ref, handleMouseMove, handleMouseLeave, springX, springY } = useMagnetic();

  if (as === 'a') {
    return (
      <motion.a
        ref={ref as unknown as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: springX, y: springY }}
        className={className}
        {...(props as unknown as React.ComponentPropsWithoutRef<typeof motion.a>)}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as unknown as React.Ref<HTMLButtonElement>}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}
