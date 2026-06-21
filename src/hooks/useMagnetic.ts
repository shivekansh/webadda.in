import { useRef, useEffect, useState } from 'react';
import { useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

export function useMagnetic(maxDisplacement = 8) {
  const ref = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 250, damping: 25, mass: 0.3 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouchDevice || shouldReduceMotion || !ref.current) return;
    
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Normalize offset from -1 to 1
    const normalizedX = (clientX - centerX) / (width / 2);
    const normalizedY = (clientY - centerY) / (height / 2);
    
    x.set(normalizedX * maxDisplacement);
    y.set(normalizedY * maxDisplacement);
  };

  const handleMouseLeave = () => {
    if (isTouchDevice || shouldReduceMotion) return;
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    if (isTouchDevice || shouldReduceMotion) return;
    setIsHovered(true);
  };

  return { 
    ref, 
    springX: isTouchDevice || shouldReduceMotion ? 0 : springX, 
    springY: isTouchDevice || shouldReduceMotion ? 0 : springY, 
    handleMouseMove, 
    handleMouseLeave,
    handleMouseEnter,
    isHovered
  };
}
