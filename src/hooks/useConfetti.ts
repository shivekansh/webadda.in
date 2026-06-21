import { useState, useCallback } from 'react';

type Particle = {
  id: string;
  x: number;
  y: number;
  scale: number;
  color: string;
  rotation: number;
  shape: 'circle' | 'square' | 'triangle' | 'star';
  duration: number;
  delay: number;
};

const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ec4899'];
const shapes: ('circle' | 'square' | 'triangle' | 'star')[] = ['circle', 'square', 'triangle', 'star'];

export function useConfetti() {
  const [particles, setParticles] = useState<Particle[]>([]);

  const fire = useCallback((count = 25) => {
    const newParticles: Particle[] = Array.from({ length: count }).map((_, i) => {
      // Randomize direction and distance
      const angle = Math.random() * Math.PI * 2;
      const velocity = 50 + Math.random() * 150;
      
      // We'll calculate the end coordinates based on angle and velocity
      return {
        id: `particle-${Date.now()}-${i}`,
        x: Math.cos(angle) * velocity,
        y: Math.sin(angle) * velocity - 100, // Bias upwards slightly
        scale: 0.5 + Math.random() * 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        duration: 1 + Math.random() * 1.5,
        delay: Math.random() * 0.2
      };
    });
    setParticles(current => [...current, ...newParticles]);
    
    // Auto cleanup after max duration for this specific batch
    setTimeout(() => {
      setParticles(current => current.filter(p => !newParticles.some(np => np.id === p.id)));
    }, 3000);
  }, []);

  return { particles, fire };
}
