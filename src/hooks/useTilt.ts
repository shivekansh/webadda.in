import { useMotionValue, useSpring, useTransform, useMotionTemplate, useReducedMotion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export function useTilt(intensity = 6, springConfig = { stiffness: 300, damping: 25 }) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const isHovered = useMotionValue(0);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Smooth out the motion values
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);
  const hoverSpring = useSpring(isHovered, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-intensity, intensity]);

  // Dynamic shadow moving opposite to light source
  const shadowX = useTransform(mouseXSpring, [-0.5, 0.5], [20, -20]);
  const shadowY = useTransform(mouseYSpring, [-0.5, 0.5], [20, -20]);
  const opacity = useTransform(hoverSpring, [0, 1], [0.3, 0.6]); // Base to max opacity
  
  const boxShadow = useMotionTemplate`${shadowX}px ${shadowY}px 40px -10px rgba(0,0,0,${opacity})`;
  
  // Highlight moves with light source (cursor)
  const highlightX = useTransform(mouseXSpring, [-0.5, 0.5], [100, 0]);
  const highlightY = useTransform(mouseYSpring, [-0.5, 0.5], [100, 0]);
  const background = useMotionTemplate`radial-gradient(circle at ${highlightX}% ${highlightY}%, rgba(255,255,255,0.08) 0%, transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || isTouchDevice || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
    isHovered.set(1);
  };

  const handleMouseLeave = () => {
    if (shouldReduceMotion || isTouchDevice) return;
    x.set(0);
    y.set(0);
    isHovered.set(0);
  };

  if (shouldReduceMotion || isTouchDevice) {
    return { 
      ref, 
      rotateX: 0, 
      rotateY: 0, 
      boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)', 
      background: 'none',
      handleMouseMove: () => {}, 
      handleMouseLeave: () => {} 
    };
  }

  return { ref, rotateX, rotateY, boxShadow, background, handleMouseMove, handleMouseLeave };
}
